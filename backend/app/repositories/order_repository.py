from __future__ import annotations

from sqlalchemy.orm import Session
from app.models.order import PurchaseOrder
from app.repositories.base_repository import BaseRepository


class OrderRepository(BaseRepository):
    """
    DAO for the PurchaseOrder model.
    Inherits generic CRUD from BaseRepository[PurchaseOrder].
    """

    def __init__(self, db: Session):
        """
        Call super().__init__(PurchaseOrder, db) to bind model and session.
        """
        super().__init__(PurchaseOrder, db)

    def get_by_customer_id(self, customer_id: int):
        """
        Return all orders placed by a specific customer.
        Results must be ordered by created_at descending (newest first).
        Used to populate a user's purchase history page.
        """
        return  (self.db.query(PurchaseOrder)
        .filter(PurchaseOrder.customer_id == customer_id)
        .order_by(PurchaseOrder.created_at.desc())
        .all()
         )
