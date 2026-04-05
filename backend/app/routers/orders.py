from __future__ import annotations

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.dependencies import get_db
from app.schemas.order import OrderResponse, CheckoutRequest
from app.services.order_service import OrderService
from app.utils.security import get_current_user
from app.models.user import User

router = APIRouter()

@router.post("/checkout", response_model=OrderResponse)
def checkout(data: CheckoutRequest, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    """
    POST /api/orders/checkout
    Requires authentication.

    Accepts CheckoutRequest body (shipping_address, credit card fields).
    Delegates to OrderService.checkout().
    On success: returns the created OrderResponse (HTTP 200).
    On empty cart: HTTP 400.
    On inventory error: HTTP 400.
    On payment failure: HTTP 402 "Credit Card Authorization Failed."
    """
    service = OrderService(db)
    order = service.checkout(current_user.id, data.shipping_address, data.credit_card_number)
    return order

@router.get("", response_model=list[OrderResponse])
def get_my_orders(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    """
    GET /api/orders
    Requires authentication.

    Returns the current user's full purchase history.
    Delegates to OrderService.get_orders(current_user.id).
    Returns list[OrderResponse].
    """
    service = OrderService(db)
    orders = service.get_orders(current_user.id)
    return orders
