from __future__ import annotations

# TODO: Import Session from sqlalchemy.orm
# TODO: Import Item from app.models.item
# TODO: Import BaseRepository from app.repositories.base_repository


class ItemRepository:
    """
    DAO for the Item model.
    Inherits generic CRUD from BaseRepository[Item].
    Adds filtered query methods for the catalog.
    """

    def __init__(self, db):
        """
        Call super().__init__(Item, db) to bind model and session.
        """
        pass

    def get_by_category(self, category: str):
        """
        Return all items where Item.category matches the given value (exact match).
        Used for the category filter on the catalog page.
        """
        pass

    def get_by_brand(self, brand: str):
        """
        Return all items where Item.brand matches the given value (exact match).
        Used for the brand filter on the catalog page.
        """
        pass

    def search(self, keyword: str):
        """
        Full-text style search across name, description, and brand fields.
        Use ilike (case-insensitive LIKE) with '%keyword%' pattern on each column.
        Returns items that match on ANY of the three columns (OR condition).
        """
        pass
