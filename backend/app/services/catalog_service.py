from __future__ import annotations

# TODO: Import HTTPException, status from fastapi
# TODO: Import Session from sqlalchemy.orm
# TODO: Import ItemRepository from app.repositories.item_repository


class CatalogService:
    """
    Handles business logic for browsing the product catalog.
    Applies filtering, searching, and sorting on top of the repository layer.
    """

    def __init__(self, db):
        """
        Instantiate ItemRepository with the provided DB session.
        Store it as self.item_repo for use across methods.
        """
        pass

    def list_items(self, category=None, brand=None, search=None, sort_by=None, order="asc"):
        """
        Return a filtered and sorted list of products.

        Steps:
        1. Choose the retrieval strategy (only one filter applies at a time):
           - If search is provided: call self.item_repo.search(search)
           - Elif category is provided: call self.item_repo.get_by_category(category)
           - Elif brand is provided: call self.item_repo.get_by_brand(brand)
           - Else: call self.item_repo.get_all()
        2. Sort in Python (after retrieval) if sort_by is provided:
           - sort_by="price" → sort by item.price
           - sort_by="name"  → sort by item.name.lower() (case-insensitive)
           - order="desc" → reverse=True, order="asc" → reverse=False
        3. Return the final list
        """
        pass

    def get_item(self, item_id: int):
        """
        Retrieve a single product by ID for the product detail page.

        Steps:
        1. Call self.item_repo.get_by_id(item_id)
        2. If None, raise HTTP 404 "Item not found"
        3. Return the Item ORM object
        """
        pass
