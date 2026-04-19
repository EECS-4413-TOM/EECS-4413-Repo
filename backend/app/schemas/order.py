from __future__ import annotations

from pydantic import BaseModel
from datetime import datetime
from app.schemas.item import ItemResponse


class CheckoutRequest(BaseModel):
    """
    Request body for POST /api/orders/checkout.
    All fields are validated here; OrderService passes only ``credit_card_number``
    and the computed total into ``PaymentService.process_payment`` (mock).
    Expiry and CVV are accepted for a realistic form but not used by the mock.
    """

    shipping_address: str | None = None
    credit_card_number: str
    credit_card_expiry: str
    credit_card_cvv: str


class OrderItemResponse(BaseModel):
    """
    A single product line within an OrderResponse.
    Stores the price at time of purchase, not the current Item price.
    Requires model_config = {"from_attributes": True}.
    """

    id: int
    item_id: int
    quantity: int
    price_at_purchase: float
    item: ItemResponse

    model_config = {"from_attributes": True}#This tells Pydantic to convert the SQLAlchemy model to a Pydantic model. This makes reading the attributes of the sqlalchemy model easier.
    #Pydantic can build OrderItemResponse from ORM objects (like SQLAlchemy model instances), not just dicts.

class OrderResponse(BaseModel):
    """
    Full order representation returned after checkout and in order history.
    Requires model_config = {"from_attributes": True}.
    """

    id: int
    customer_id: int
    total: float
    status: str
    shipping_address: str | None = None
    created_at: datetime
    items: list[OrderItemResponse] = []

    model_config = {"from_attributes": True}#This tells Pydantic to convert the SQLAlchemy model to a Pydantic model. This makes reading the attributes of the sqlalchemy model easier.
    #Pydantic can build OrderResponse from ORM objects (like SQLAlchemy model instances), not just dicts.
