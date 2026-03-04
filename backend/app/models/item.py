from __future__ import annotations

# TODO: Import Column types from sqlalchemy (Integer, String, Float, Text)
# TODO: Import Base from app.database


class Item:
    """
    ORM model representing a product in the store catalog.
    Maps to the 'items' table in PostgreSQL.
    """

    # TODO: Declare table columns
    # id          — Integer, primary key, indexed
    # name        — String, not null
    # description — Text, not null
    # category    — String, not null, indexed  (used for filtering)
    # brand       — String, not null, indexed  (used for filtering)
    # price       — Float, not null
    # quantity    — Integer, not null, default 0  (inventory count)
    # image_url   — String, nullable

    pass
