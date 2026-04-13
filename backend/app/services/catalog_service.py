from __future__ import annotations

from fastapi import HTTPException, status
from sqlalchemy.orm import Session

from app.repositories.item_repository import ItemRepository
from app.utils.igdb_client import IGDBClient
from app.models.item import Item
from datetime import datetime, timezone
from app.database import SessionLocal

import random

igdb = IGDBClient()

# edited to get price


class CatalogService:

    def __init__(self, db: Session | None):
        db = SessionLocal()
        self.item_repo = ItemRepository(db) if db else None

    async def import_top_games(self):
        top_games = await igdb.get_top_games()

        for game in top_games:

            existing = self.item_repo.get_by_igdb_id(
                game["id"]
            )  # Avoid duplicate game items

            if existing:
                continue

            r_date = (
                datetime.fromtimestamp(game.get("first_release_date"), tz=timezone.utc)
                if game.get("first_release_date")
                else None
            )
            cover = game.get("cover")
            artwork_ids = game.get("artworks")
            screenshot_ids = game.get("screenshots")
            video_ids = game.get("videos") or []
            companies = game.get("involved_companies", [])
            item = Item(
                igdb_id=game["id"],
                name=game["name"],
                description=game.get("summary", ""),
                genre=game.get("genres"),
                brand="IGDB",
                rating=game.get("total_rating") if game.get("total_rating") else 75.5,
                age_rating=game.get("age_ratings") or [],
                artworks=[
                    f"https://images.igdb.com/igdb/image/upload/t_1080p/{a}.jpg"
                    for a in (artwork_ids or [])
                    if isinstance(a, int)
                ],
                screenshots=[
                    f"https://images.igdb.com/igdb/image/upload/t_1080p/{s}.jpg"
                    for s in (screenshot_ids or [])
                    if isinstance(s, int)
                ],
                similar_games=game.get("similar_games"),
                videos=[
                    f"https://www.youtube.com/watch?v={v.get('video_id')}"
                    for v in (video_ids or [])
                    if isinstance(v, dict)
                ],
                involved_companies=(
                    companies[0]["company"]["name"]
                    if companies and isinstance(companies[0], dict)
                    else None
                ),
                game_type=game.get("game_type"),
                dlcs=game.get("dlcs"),
                collections=game.get("collections"),
                release_date=r_date,
                price=f"{self.randomPriceGenerator(r_date)}.99" if r_date else "79.99",
                quantity=1,
                cover_url=(
                    f"https://images.igdb.com/igdb/image/upload/t_cover_big/{cover['image_id']}.jpg"
                    if cover
                    else None
                ),
            )

            self.item_repo.create(item)

    async def search_games(self, query: str):
        local_results = self.item_repo.search(query)

        if local_results:
            return local_results

        saved_items = []

        igdb_results = await igdb.search_games(query)

        for game in igdb_results:
            existing = self.item_repo.get_by_igdb_id(game["id"])

            if existing:
                continue
            r_date = (
                datetime.fromtimestamp(game.get("first_release_date"), tz=timezone.utc)
                if game.get("first_release_date")
                else None
            )
            cover = game.get("cover")
            artwork_ids = game.get("artworks")
            screenshot_ids = game.get("screenshots")
            video_ids = game.get("videos") or []
            companies = game.get("involved_companies", [])
            item = Item(
                igdb_id=game["id"],
                name=game["name"],
                description=game.get("summary", ""),
                genre=game.get("genres"),
                brand="IGDB",
                rating=game.get("total_rating") if game.get("total_rating") else 75.5,
                age_rating=game.get("age_ratings") or [],
                artworks=[
                    f"https://images.igdb.com/igdb/image/upload/t_1080p/{a}.jpg"
                    for a in (artwork_ids or [])
                    if isinstance(a, int)
                ],
                screenshots=[
                    f"https://images.igdb.com/igdb/image/upload/t_1080p/{s}.jpg"
                    for s in (screenshot_ids or [])
                    if isinstance(s, int)
                ],
                similar_games=game.get("similar_games"),
                videos=[
                    f"https://www.youtube.com/watch?v={v.get('video_id')}"
                    for v in (video_ids or [])
                    if isinstance(v, dict)
                ],
                involved_companies=(
                    companies[0]["company"]["name"]
                    if companies and isinstance(companies[0], dict)
                    else None
                ),
                game_type=game.get("game_type"),
                dlcs=game.get("dlcs"),
                collections=game.get("collections"),
                release_date=r_date,
                price=f"{self.randomPriceGenerator(r_date)}.99" if r_date else "79.99",
                quantity=1,
                cover_url=(
                    f"https://images.igdb.com/igdb/image/upload/t_cover_big/{cover['image_id']}.jpg"
                    if cover
                    else None
                ),
            )
            saved_items.append(existing)

            saved_item = self.item_repo.create(item)

            saved_items.append(saved_item)

        return saved_items

    ## Use for listing items or filtering by genre, brand, price (not yet), release date, etc.
    def list_items(
        self, genre=None, brand=None, search=None, sort_by=None, order="asc"
    ):

        if search:
            items = self.item_repo.search(search)
        elif genre:
            items = self.item_repo.get_by_genre(genre)
        elif brand:
            items = self.item_repo.get_by_brand(brand)
        else:
            items = self.item_repo.get_all()

        if sort_by:

            reverse = order == "desc"

            if sort_by == "price":
                items.sort(key=lambda x: x.price, reverse=reverse)

            elif sort_by == "name":
                items.sort(key=lambda x: x.name.lower(), reverse=reverse)

        return items

    def get_item(self, item_id: int):

        item = self.item_repo.get_by_id(item_id)

        if not item:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Item not found",
            )

        return item

    def randomPriceGenerator(self, releaseDate: datetime):
        newGames = datetime(2025, 1, 1, tzinfo=timezone.utc)
        currentGen = datetime(2020, 1, 1, tzinfo=timezone.utc)
        lastGen = datetime(2016, 1, 1, tzinfo=timezone.utc)

        if releaseDate >= newGames:
            return random.randint(79, 94)
        if releaseDate <= newGames and releaseDate >= currentGen:
            return random.randint(49, 79)
        if releaseDate <= currentGen and releaseDate >= lastGen:
            return random.randint(29, 59)
        if releaseDate <= lastGen:
            return random.randint(5, 29)
