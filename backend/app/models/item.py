from __future__ import annotations

from sqlalchemy import Column, Integer, String, DateTime, Float
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

    cart_items = relationship("CartItem", back_populates="item")
