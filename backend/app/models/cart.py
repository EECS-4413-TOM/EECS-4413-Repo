from __future__ import annotations

# TODO: Import Column types from sqlalchemy (Integer, ForeignKey)
# TODO: Import relationship from sqlalchemy.orm
# TODO: Import Base from app.database

from sqlalchemy import Column, Integer, String, Date, Float, ForeignKey
from app.database import Base
from sqlalchemy.orm import relationship


class ShoppingCart(Base):
    __tablename__ = "shopping_cart"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), unique=True, nullable=True)
    total_price = Column(Float, nullable=True)

    user = relationship("User", back_populates="cart")
    items = relationship(
        "CartItem", back_populates="cart", cascade="all, delete-orphan", lazy="joined"
    )


class CartItem(Base):

    __tablename__ = "cart_items"
    id = Column(Integer, primary_key=True, index=True) # ID of the game
    cart_id = Column(Integer, ForeignKey("shopping_cart.id"), nullable=False) # Cart that the game is assigned to
    item_id = Column(Integer, ForeignKey("games_catalog.id"))
    quantity = Column(Integer, nullable=False)
    price = Column(Float, nullable=False)
    cart = relationship("ShoppingCart", back_populates="items") # Represents many to one. MANY cart items for ONE shopping cart
    item = relationship("Item", back_populates="cart_items")
