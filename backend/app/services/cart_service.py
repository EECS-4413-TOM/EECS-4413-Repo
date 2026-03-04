from __future__ import annotations

# TODO: Import HTTPException, status from fastapi
# TODO: Import Session from sqlalchemy.orm
# TODO: Import CartRepository from app.repositories.cart_repository
# TODO: Import ItemRepository from app.repositories.item_repository
# TODO: Import ShoppingCart, CartItem from app.models.cart


class CartService:
    """
    Handles all shopping cart business logic.
    Coordinates CartRepository and ItemRepository to manage cart state.
    """

    def __init__(self, db):
        """
        Instantiate CartRepository and ItemRepository with the provided DB session.
        Store them as self.cart_repo and self.item_repo.
        """
        pass

    def get_or_create_cart(self, user_id: int):
        """
        Retrieve the user's existing cart, or create a new empty one.

        Steps:
        1. Call self.cart_repo.get_by_user_id(user_id)
        2. If None, create a new ShoppingCart(user_id=user_id) and save via self.cart_repo.create()
        3. Return the cart (existing or newly created)
        """
        pass

    def add_item(self, user_id: int, item_id: int, quantity: int):
        """
        Add a product to the user's cart, or increment quantity if already present.

        Steps:
        1. Validate item exists via self.item_repo.get_by_id(item_id) — raise 404 if not found
        2. Call get_or_create_cart(user_id) to get/make the cart
        3. Check if item already in cart via self.cart_repo.get_cart_item(cart.id, item_id)
           - If exists: increment existing.quantity by the given amount, call self.cart_repo.update()
           - If not: create CartItem(cart_id, item_id, quantity), call self.cart_repo.add_cart_item()
        4. Return the refreshed cart via get_or_create_cart(user_id)
        """
        pass

    def update_item(self, user_id: int, item_id: int, quantity: int):
        """
        Set a cart item's quantity to an exact value, or remove it if quantity <= 0.

        Steps:
        1. Get the user's cart via get_or_create_cart(user_id)
        2. Look up the CartItem — raise 404 "Item not in cart" if not found
        3. If quantity <= 0: call self.cart_repo.remove_cart_item(cart_item)
           Else: set cart_item.quantity = quantity, call self.cart_repo.update(cart_item)
        4. Return the refreshed cart via get_or_create_cart(user_id)
        """
        pass

    def remove_item(self, user_id: int, item_id: int):
        """
        Remove a product entirely from the user's cart regardless of quantity.

        Steps:
        1. Get the user's cart via get_or_create_cart(user_id)
        2. Look up the CartItem — raise 404 if not found
        3. Call self.cart_repo.remove_cart_item(cart_item)
        4. Return the refreshed cart via get_or_create_cart(user_id)
        """
        pass

    def clear(self, user_id: int) -> None:
        """
        Remove all items from the user's cart (called after successful checkout).

        Steps:
        1. Get cart via self.cart_repo.get_by_user_id(user_id)
        2. If cart exists, call self.cart_repo.clear_cart(cart)
        """
        pass
