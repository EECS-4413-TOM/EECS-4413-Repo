from __future__ import annotations

# TODO: Import Column types from sqlalchemy (Integer, String, Float, Text)
# TODO: Import Base from app.database
from sqlalchemy import Column, Integer, String, Date, Float
from database import Base


class Item(Base):
    """
    ORM model representing a product in the store catalog.
    Maps to the 'items' table in PostgreSQL.
    """
    __tablename__ = "games_catalog"
    # TODO: Declare table columns
    # id          — Integer, primary key, indexed
    # name        — String, not null
    # description — Text, not null
    # genre    — String, not null, indexed  (used for filtering)
    # brand       — String, not null, indexed  (used for filtering)
    # price       — Float, not null
    # quantity    — Integer, not null, default 0  (inventory count)
    # image_url   — String, nullable

    id = Column(Integer, primary_key=True, index=True)
    igdb_id = Column(Integer, unique=True, index=True)
    name = Column(String, nullable=False)
    description = Column(String, nullable=False)
    genre = Column(String, index=True, nullable=True)
    brand = Column(String, index=True, nullable=True)
    release_date = Column(Date, nullable=True)
    quantity = Column(Integer, default=0)
    cover_url = Column(String, nullable=True)
    rating = Column(Float,nullable=False)
