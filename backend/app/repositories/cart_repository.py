from __future__ import annotations

# TODO: Import Session from sqlalchemy.orm
# TODO: Import ShoppingCart, CartItem from app.models.cart
# TODO: Import BaseRepository from app.repositories.base_repository


from sqlalchemy.orm import Session
from sqlalchemy import or_

from app.models.cart import CartItem
from app.models.cart import ShoppingCart
from app.repositories.base_repository import BaseRepository


class CartRepository(BaseRepository):

    def __init__(self, model, db):
        self.model = model
        self.db = db

    def get_by_user_id(self, user_id: int):
        return self.db.query(ShoppingCart).filter(ShoppingCart.user_id == user_id).first()

    def get_by_session_id(self, session_id: str):
        return (
            self.db.query(ShoppingCart).filter(ShoppingCart.session_id == session_id).first()
        )

    def get_cart_item(self, cart_id: int, item_id: int):
        return self.db.query(CartItem).filter(CartItem.cart_id == cart_id, CartItem.item_id == item_id).first()

    def add_cart_item(self, cart_item):
        self.db.add(cart_item)
        self.db.commit()
        self.db.refresh(cart_item)
        return cart_item

    def remove_cart_item(self, cart_item) -> None:
        self.db.delete(cart_item)
        self.db.commit()

    def clear_cart(self, cart) -> None:
        self.db.query(CartItem).filter(CartItem.cart_id == cart.id).delete()
        self.db.commit()
