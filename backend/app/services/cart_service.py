from __future__ import annotations

from app.repositories.cart_repository import CartRepository
from app.repositories.item_repository import ItemRepository
from app.models.cart import ShoppingCart, CartItem
from fastapi import HTTPException
from app.database import SessionLocal
from sqlalchemy.orm import Session
from fastapi import status

class CartService:

    def __init__(self, db: Session):

        ##db = SessionLocal
        self.item_repo = ItemRepository(db) if db else None
        self.cart_repo = CartRepository(ShoppingCart, db) if db else None

    def get_or_create_cart(
        self,
        user_id: int,
        session_id: str | None):

        if user_id:
            cart = self.cart_repo.get_by_user_id(user_id)
        else:
            cart = self.cart_repo.get_by_session_id(session_id)

        if cart is None:
            cart = ShoppingCart(user_id=user_id | None, session_id=session_id | None)
            cart = self.cart_repo.create(cart)
        return cart;

    def add_item(
        self, user_id: int | None, session_id: str | None, item_id: int, quantity: int
    ):

        item = self.item_repo.get_by_id(item_id)

        if item is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Item {item_id} not found",
            )

        if user_id:
            cart = self.get_or_create_cart(user_id=user_id, session_id=None)
        else:
            cart = self.get_or_create_cart(user_id=None, session_id=session_id)

        cart_item = self.cart_repo.get_cart_item(cart.id, item_id)

        valid_items = [ci for ci in cart.items if ci.item.price is not None]

        if cart_item:
            cart_item.quantity += quantity
            self.cart_repo.update(cart_item)
        else:
            cart_item = CartItem(
                cart_id=cart.id, item_id=item_id, quantity=quantity, price=item.price)
            self.cart_repo.add_cart_item(cart_item)

        valid_items = [ci for ci in cart.items if ci.item.price is not None]
        cart.total_price = sum(
            (ci.quantity or 0) * (ci.item.price or 0) for ci in valid_items
        )
        self.cart_repo.update(cart_item)

        return cart

    def update_item(self, user_id: int, session_id: str | None, item_id: int, quantity: int):
        if user_id:
            cart = self.get_or_create_cart(user_id=user_id, session_id=None)
        else:
            cart = self.get_or_create_cart(user_id=None, session_id=session_id)

        cart_item = self.cart_repo.get_cart_item(cart.id, item_id)

        if not cart_item:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND, detail="Item not in cart"
            )

        if quantity <= 0:
            self.cart_repo.remove_cart_item(cart_item)
        else:
            cart_item.quantity = quantity
            self.cart_repo.update(cart_item)

        valid_items = [ci for ci in cart.items if ci.item.price is not None]
        cart.total_price = sum(
            (ci.quantity or 0) * (ci.item.price or 0) for ci in valid_items
        )
        self.cart_repo.update(cart_item)

        return self.get_or_create_cart(user_id)

    def remove_item(self, user_id: int, session_id: str | None, item_id: int ):

        if user_id:
            cart = self.get_or_create_cart(user_id=user_id, session_id=None)
        else:
            cart = self.get_or_create_cart(user_id=None, session_id=session_id)

        cart_item = self.cart_repo.get_cart_item(cart.id, item_id)

        if not cart_item:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND, detail="Item not in cart"
            )

        self.cart_repo.remove_cart_item(cart_item)
        valid_items = [ci for ci in cart.items if ci.item.price is not None]
        cart.total_price = sum(
            (ci.quantity or 0) * (ci.item.price or 0) for ci in valid_items
        )
        self.cart_repo.update(cart)

        return self.get_or_create_cart(user_id)

    def clear(self, user_id: int, session_id: str) -> None:

        if user_id:
            cart = self.cart_repo.get_by_user_id(user_id)
        else:
            cart = self.cart_repo.get_by_user_id(session_id)

        valid_items = [ci for ci in cart.items if ci.item.price is not None]

        cart.total_price = sum(
            (ci.quantity or 0) * (ci.item.price or 0) for ci in valid_items
        )

        if not cart:
            return

        self.cart_repo.clear_cart(cart)
