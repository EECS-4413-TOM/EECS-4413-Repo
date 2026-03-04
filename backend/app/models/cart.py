from __future__ import annotations

# TODO: Import Column types from sqlalchemy (Integer, ForeignKey)
# TODO: Import relationship from sqlalchemy.orm
# TODO: Import Base from app.database


class ShoppingCart:
    """
    ORM model for a user's shopping cart.
    Each user has exactly one cart (one-to-one with User).
    Maps to the 'shopping_carts' table.
    """

    # TODO: Declare table columns
    # id      — Integer, primary key
    # user_id — Integer, ForeignKey("users.id"), unique, not null

    # TODO: Declare ORM relationships
    # user  -> User      (many-to-one, back_populates="cart")
    # items -> CartItem  (one-to-many, back_populates="cart", cascade="all, delete-orphan")

    pass


class CartItem:
    """
    ORM model for a single line item inside a ShoppingCart.
    Maps to the 'cart_items' table.
    """

    # TODO: Declare table columns
    # id       — Integer, primary key
    # cart_id  — Integer, ForeignKey("shopping_carts.id"), not null
    # item_id  — Integer, ForeignKey("items.id"), not null
    # quantity — Integer, not null, default 1

    # TODO: Declare ORM relationships
    # cart -> ShoppingCart (many-to-one, back_populates="items")
    # item -> Item         (many-to-one, no back reference needed)

    pass
