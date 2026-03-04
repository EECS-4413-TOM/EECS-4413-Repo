from __future__ import annotations

# TODO: Import Column types from sqlalchemy (Integer, String, Boolean, ForeignKey)
# TODO: Import relationship from sqlalchemy.orm
# TODO: Import Base from app.database


class User:
    """
    ORM model representing a registered customer or admin.
    Maps to the 'users' table in PostgreSQL.
    """

    # TODO: Declare table columns
    # id          — Integer, primary key, indexed
    # email       — String, unique, indexed, not null
    # hashed_password — String, not null
    # first_name  — String, not null
    # last_name   — String, not null
    # is_admin    — Boolean, default False
    # address_id  — Integer, ForeignKey("addresses.id"), nullable

    # TODO: Declare ORM relationships
    # address  -> Address       (many-to-one,  back_populates="users")
    # orders   -> PurchaseOrder (one-to-many,  back_populates="customer")
    # cart     -> ShoppingCart  (one-to-one,   back_populates="user", uselist=False)

    pass
