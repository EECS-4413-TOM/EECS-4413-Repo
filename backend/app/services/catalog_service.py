from __future__ import annotations

from fastapi import HTTPException, status
from sqlalchemy.orm import Session

from app.repositories.item_repository import ItemRepository
from app.utils.igdb_client import IGDBClient

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
        self.item_repo = ItemRepository(db) if db else None

    async def search_games(self, query: str):
        return await igdb.search_games(query)

    def list_items(
        self, category=None, brand=None, search=None, sort_by=None, order="asc"
    ):

        if search:
            items = self.item_repo.search(search)
        elif category:
            items = self.item_repo.get_by_category(category)
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
