from __future__ import annotations

from fastapi import HTTPException, status
from sqlalchemy.orm import Session

from app.repositories.item_repository import ItemRepository
from app.utils.igdb_client import IGDBClient
from app.models.item import Item
from datetime import datetime
from app.database import SessionLocal


# TODO: Import HTTPException, status from fastapi
# TODO: Import Session from sqlalchemy.orm
# TODO: Import ItemRepository from app.repositories.item_repository

igdb = IGDBClient()


class CatalogService:
    """
    Handles business logic for browsing the product catalog.
    Applies filtering, searching, and sorting on top of the repository layer.
    """
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
            release_date = None,
            # if timestamp:
            #     release_date = datetime.fromtimestamp(timestamp).date()
            # timestamp = game.get("first_release_date")
            item = Item(
                igdb_id=game["id"],
                name=game["name"],
                description=game.get("summary", ""),
                genre=game.get("genres"),
                brand="IGDB",
                rating=game.get("rating"),
                quantity=0,
                cover_url=game.get("cover.url"),
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
                saved_items.append(existing)
                continue

            item = Item(
                igdb_id=game["id"],
                name=game["name"],
                description=game.get("summary", ""),
                genre=game.get("genres"),
                brand="IGDB",
                rating=game.get("rating"),
                quantity=0,
                cover_url=game.get("cover.url"),
            )
            saved_item = self.item_repo.create(item)

            saved_items.append(saved_item)

        return saved_items

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
