from __future__ import annotations

# TODO: Import BaseModel from pydantic
# TODO: Import ItemResponse from app.schemas.item


class CartItemAdd:
    """
    Request body for POST /api/cart/items.
    Adds a product to the current user's cart.
    """

    # TODO: Declare fields
    # item_id  — int
    # quantity — int, default 1

    pass


class CartItemUpdate:
    """
    Request body for PUT /api/cart/items/{item_id}.
    Set to 0 or less to remove the item entirely.
    """

    # TODO: Declare fields
    # quantity — int

    pass


class CartItemResponse:
    """
    A single line item within a CartResponse.
    Nests the full ItemResponse for product details.
    Requires model_config = {"from_attributes": True}.
    """

    # TODO: Declare fields
    # id       — int
    # item_id  — int
    # quantity — int
    # item     — ItemResponse  (nested)

    pass


class CartResponse:
    """
    Full cart representation returned from cart endpoints.
    Requires model_config = {"from_attributes": True}.
    """

    # TODO: Declare fields
    # id    — int
    # items — list[CartItemResponse], default []

    pass
