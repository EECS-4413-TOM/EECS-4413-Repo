from __future__ import annotations

from pydantic import BaseModel
from app.schemas.item import ItemResponse #importing ItemResponse from item.py to use in CartItemAdd and CartItemUpdate. Similar to an item object in java.

class CartItemAdd(BaseModel):
    """
    Request body for POST /api/cart/items.
    Adds a product to the current user's cart.
    """

    item_id: int
    quantity: int = 1
    price: float


class CartItemUpdate(BaseModel):
    """
    Request body for PUT /api/cart/items/{item_id}.
    Set to 0 or less to remove the item entirely.
    """

    quantity: int


class CartItemResponse(BaseModel):
    """
    A single line item within a CartResponse.
    Nests the full ItemResponse for product details.
    Requires model_config = {"from_attributes": True}.
    """

    id: int
    item_id: int
    quantity: int
    price: float
    item: ItemResponse #nested item response object to get the item details.

    model_config = {"from_attributes": True}#This tells Pydantic to convert the SQLAlchemy model to a Pydantic model. This makes reading the attributes of the sqlalchemy model easier.
    #Pydantic can build CartItemResponse from ORM objects (like SQLAlchemy model instances), not just dicts.


class CartResponse(BaseModel):
    """
    Full cart representation returned from cart endpoints.
    Requires model_config = {"from_attributes": True}.
    """

    id: int
    items: list[CartItemResponse] = [] #list of cart item responses.
    total_price: float;
    model_config = {"from_attributes": True}#This tells Pydantic to convert the SQLAlchemy model to a Pydantic model. This makes reading the attributes of the sqlalchemy model easier.
    #Pydantic can build CartResponse from ORM objects (like SQLAlchemy model instances), not just dicts.