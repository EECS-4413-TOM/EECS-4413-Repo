from __future__ import annotations

# TODO: Import BaseModel from pydantic
# TODO: Import datetime from datetime
# TODO: Import ItemResponse from app.schemas.item


class CheckoutRequest:
    """
    Request body for POST /api/orders/checkout.
    Credit card fields are passed to PaymentService (mock).
    """

    # TODO: Declare fields
    # shipping_address     — str | None = None  (if None, use saved address)
    # credit_card_number   — str
    # credit_card_expiry   — str  (e.g. "12/27")
    # credit_card_cvv      — str  (e.g. "123")

    pass


class OrderItemResponse:
    """
    A single product line within an OrderResponse.
    Stores the price at time of purchase, not the current Item price.
    Requires model_config = {"from_attributes": True}.
    """

    # TODO: Declare fields
    # id                  — int
    # item_id             — int
    # quantity            — int
    # price_at_purchase   — float
    # item                — ItemResponse  (nested)

    pass


class OrderResponse:
    """
    Full order representation returned after checkout and in order history.
    Requires model_config = {"from_attributes": True}.
    """

    # TODO: Declare fields
    # id               — int
    # customer_id      — int
    # total            — float
    # status           — str
    # shipping_address — str | None = None
    # created_at       — datetime
    # items            — list[OrderItemResponse], default []

    pass
