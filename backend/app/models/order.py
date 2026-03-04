from __future__ import annotations

# TODO: Import Column types from sqlalchemy (Integer, Float, String, DateTime, ForeignKey)
# TODO: Import func from sqlalchemy.sql for server_default timestamps
# TODO: Import relationship from sqlalchemy.orm
# TODO: Import Base from app.database


class PurchaseOrder:
    """
    ORM model representing a completed purchase by a customer.
    Created at checkout after successful payment.
    Maps to the 'purchase_orders' table.
    """

    # TODO: Declare table columns
    # id               — Integer, primary key, indexed
    # customer_id      — Integer, ForeignKey("users.id"), not null
    # total            — Float, not null
    # status           — String, not null, default "completed"
    # shipping_address — String, nullable  (snapshot of address at time of order)
    # created_at       — DateTime(timezone=True), server_default=func.now()

    # TODO: Declare ORM relationships
    # customer -> User       (many-to-one, back_populates="orders")
    # items    -> OrderItem  (one-to-many, back_populates="order", cascade="all, delete-orphan")

    pass


class OrderItem:
    """
    ORM model for a single product line within a PurchaseOrder.
    Stores a snapshot of the price at time of purchase.
    Maps to the 'order_items' table.
    """

    # TODO: Declare table columns
    # id                  — Integer, primary key
    # order_id            — Integer, ForeignKey("purchase_orders.id"), not null
    # item_id             — Integer, ForeignKey("items.id"), not null
    # quantity            — Integer, not null
    # price_at_purchase   — Float, not null  (snapshot — never changes even if Item.price changes)

    # TODO: Declare ORM relationships
    # order -> PurchaseOrder (many-to-one, back_populates="items")
    # item  -> Item          (many-to-one, no back reference needed)

    pass
