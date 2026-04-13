from __future__ import annotations
import httpx
from app.config import settings

# _ROOT = Path(__file__).resolve().parent.parent.parent.parent  # backend/app/utils -> repo root
# load_dotenv(_ROOT / ".env")


TWITCH_TOKEN_URL = "https://id.twitch.tv/oauth2/token"
IGDB_URL = "https://api.igdb.com/v4/games"


# load_dotenv()


class IGDBClient:
    """
    Handles authentication with Twitch and requests to IGDB API.
    """

    ## FIrst step, authenticate Twitch account
    def __init__(self):
        self.client_id = settings.TWITCH_CLIENT_ID
        self.client_secret = settings.TWITCH_CLIENT_SECRET
        self.access_token: str | None = None

    def _ensure_twitch_config(self) -> None:
        if not self.client_id or not self.client_secret:
            raise ValueError(
                "Missing TWITCH_CLIENT_ID or TWITCH_CLIENT_SECRET in environment / .env"
            )

    async def authenticate(self) -> None:
        """
        Request OAuth token from Twitch.
        """

        params = {
            "client_id": self.client_id,
            "client_secret": self.client_secret,
            "grant_type": "client_credentials",
        }

        async with httpx.AsyncClient() as client:
            res = await client.post(TWITCH_TOKEN_URL, data=params)
            res.raise_for_status()
            data = res.json()

        self.access_token = data["access_token"]

    async def get_top_games(self):
        if not self.access_token:
            await self.authenticate()  ## wait for auth response, proceed if OK

        if not self.client_id or not self.client_secret:
            raise ValueError("Missing TWITCH_CLIENT_ID or TWITCH_CLIENT_SECRET in .env")

        headers = {
            "Client-ID": self.client_id,
            "Authorization": f"Bearer {self.access_token}",
        }

        body = f"""
        fields name, summary, cover.image_id, genres, first_release_date, total_rating, age_ratings, artworks, screenshots, similar_games, videos, involved_companies, game_type, dlcs, collections;
        where rating > 70;
        sort rating desc;
        limit 40;
        """
        async with httpx.AsyncClient() as client:  ## Send query to IGDB api link
            res = await client.post(
                IGDB_URL,
                headers=headers,
                data=body,
            )

            res.raise_for_status()

            games = res.json()  ## Get game as json response

        return games

    async def search_games(self, query: str):

        if not self.access_token:
            await self.authenticate()  ## Wait for response from auth, if status OK then proceed

        headers = {
            "Client-ID": self.client_id,
            "Authorization": f"Bearer {self.access_token}",
        }

        ## IGDB return values. Change later, currently showing the first 10 games that match the query, gives name, summary, and cover
        body = f"""
        search "{query}";
        fields name, summary, cover.image_id, genres, first_release_date, total_rating, age_ratings, artworks, screenshots, similar_games, videos, involved_companies, game_type, dlcs, collections;
        limit 10;
        """

        async with httpx.AsyncClient() as client:  ## Send query to IGDB api link
            res = await client.post(
                IGDB_URL,
                headers=headers,
                data=body,
            )

            res.raise_for_status()

            games = res.json()  ## Get game as json response

        # Fixes image URLs
        for game in games:
            if "cover" in game and "url" in game["cover"]:
                game["cover"]["url"] = "https:" + game["cover"]["url"]

        return games
