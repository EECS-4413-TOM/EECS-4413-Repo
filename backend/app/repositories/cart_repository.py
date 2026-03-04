from __future__ import annotations

# TODO: Import Session from sqlalchemy.orm
# TODO: Import ShoppingCart, CartItem from app.models.cart
# TODO: Import BaseRepository from app.repositories.base_repository


class CartRepository:
    """
    DAO for ShoppingCart (and its CartItem children).
    Inherits generic CRUD from BaseRepository[ShoppingCart].
    """

    def __init__(self, db):
        """
        Call super().__init__(ShoppingCart, db) to bind model and session.
        """
        pass

    def get_by_user_id(self, user_id: int):
        """
        Find the shopping cart belonging to a specific user.
        Returns ShoppingCart if the user has one, None if not yet created.
        """
        pass

    def get_cart_item(self, cart_id: int, item_id: int):
        """
        Find a specific CartItem row by its parent cart and item ids.
        Used to check if an item already exists in the cart before adding.
        Returns CartItem if found, None otherwise.
        """
        pass

    def add_cart_item(self, cart_item):
        """
        Persist a new CartItem to the database.
        Steps: db.add(cart_item) → db.commit() → db.refresh(cart_item) → return cart_item
        """
        pass

    def remove_cart_item(self, cart_item) -> None:
        """
        Delete a single CartItem row from the database.
        Steps: db.delete(cart_item) → db.commit()
        """
        pass

    def clear_cart(self, cart) -> None:
        """
        Delete ALL CartItem rows belonging to the given cart.
        Called after a successful checkout to empty the cart.
        Query CartItem by cart_id and bulk delete.
        """
        pass
