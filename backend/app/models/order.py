from __future__ import annotations

from sqlalchemy import Column, DateTime, Float, ForeignKey, Integer, String, func
from sqlalchemy.orm import relationship
from app.database import Base

class PurchaseOrder(Base):
    """
    ORM model representing a completed purchase by a customer.
    Created at checkout after successful payment.
    Maps to the 'purchase_orders' table.
    """
    
    __tablename__ = "purchase_orders"
    id = Column(Integer, primary_key=True, index=True)
    customer_id = Column(Integer, ForeignKey("users.id"), nullable=False, index=True)
    total = Column(Float, nullable=False)
    status = Column(String, nullable=False, default="completed")
    shipping_address = Column(String, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    customer = relationship("User", back_populates="orders")
    items = relationship("OrderItem", back_populates="order", cascade="all, delete-orphan")


class OrderItem(Base):
    """
    ORM model for a single product line within a PurchaseOrder.
    Stores a snapshot of the price at time of purchase.
    Maps to the 'order_items' table.
    """
    __tablename__ = "order_items"
    id = Column(Integer, primary_key=True, index=True)
    order_id = Column(Integer, ForeignKey("purchase_orders.id"), nullable=False)
    item_id = Column(Integer, ForeignKey("games_catalog.id"), nullable=False)
    quantity = Column(Integer, nullable=False)
    price_at_purchase = Column(Float, nullable=False)
    order = relationship("PurchaseOrder", back_populates="items")
    item = relationship("Item")
