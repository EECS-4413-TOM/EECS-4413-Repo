from __future__ import annotations

from sqlalchemy import Column, Integer, String, DateTime, Float, JSON
from app.database import Base
from sqlalchemy.orm import relationship

class Item(Base):
    __tablename__ = "games_catalog"

    id = Column(Integer, primary_key=True, index=True)
    igdb_id = Column(Integer, unique=True, index=True)
    name = Column(String, nullable=False)
    description = Column(String, nullable=False)
    genre = Column(String, index=True, nullable=True)
    brand = Column(String, index=True, nullable=True)
    release_date = Column(DateTime(timezone=True), nullable=True)
    quantity = Column(Integer, default=0)
    cover_url = Column(String, nullable=True)
    price = Column(Float, nullable=True)
    rating = Column(Float,nullable=False)
    age_rating = Column(JSON, index=True, nullable=True)
    artworks = Column(JSON, index=True, nullable=True)
    screenshots = Column(JSON, index=True, nullable=True)
    similar_games = Column(String, index=True, nullable=True)
    videos = Column(String, index=True, nullable=True)
    involved_companies = Column(String, index=True, nullable=True)
    game_type = Column(String, index=True, nullable=True)
    dlcs = Column(String, index=True, nullable=True)
    collections = Column(String, index=True, nullable=True)

    cart_items = relationship("CartItem", back_populates="item")
