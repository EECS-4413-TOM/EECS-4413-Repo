from __future__ import annotations

# TODO: Import Session from sqlalchemy.orm
# TODO: Import PurchaseOrder from app.models.order
# TODO: Import BaseRepository from app.repositories.base_repository


class OrderRepository:
    """
    DAO for the PurchaseOrder model.
    Inherits generic CRUD from BaseRepository[PurchaseOrder].
    """

    def __init__(self, db):
        """
        Call super().__init__(PurchaseOrder, db) to bind model and session.
        """
        pass

    def get_by_customer_id(self, customer_id: int):
        """
        Return all orders placed by a specific customer.
        Results must be ordered by created_at descending (newest first).
        Used to populate a user's purchase history page.
        """
        pass
