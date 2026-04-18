from __future__ import annotations


from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.dependencies import get_db
from app.schemas.cart import CartResponse, CartItemAdd, CartItemUpdate, CartItemResponse
from app.services.cart_service import CartService
from app.utils.security import get_current_user, get_current_user_optional
from app.models.user import User

import uuid
from fastapi import Request, Response

router = APIRouter()


def get_or_create_session_id(request: Request, response: Response) -> str:
    session_id = request.cookies.get("session_id")
    
    if not session_id:
        session_id = str(uuid.uuid4())
        response.set_cookie(
            key="session_id",
            value=session_id,
            httponly=True,
            samesite="lax"
        )
    return session_id


@router.get("/", response_model=CartResponse)
def get_cart(
    request: Request,
    response: Response,
    current_user: User = Depends(get_current_user_optional),
    db: Session = Depends(get_db),
):
    service = CartService(db)

    if current_user:
        cart = service.get_or_create_cart(user_id=current_user.id, session_id=None)
    else:
        session_id = get_or_create_session_id(request, response)
        cart = service.get_or_create_cart(user_id=None, session_id=session_id)

    total_price = sum(
        (item.quantity or 0) * (item.item.price or 0) for item in (cart.items or [])
    )

    return {
        "id": cart.id,
        "items": cart.items,
        "total_price": total_price,
    }


@router.post("/items", response_model=CartResponse)
def add_to_cart(
    request: Request,
    response: Response,
    data: CartItemAdd,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    service = CartService(db)

    # Add the item to the user's cart
    if current_user:
        user_id = current_user.id
        session_id = None
    else:
        session_id = get_or_create_session_id(request, response)
        user_id = None

    cart = service.add_item(
        user_id=user_id,
        session_id=session_id,
        item_id=data.item_id,
        quantity=data.quantity,
    )

    # Filter out cart items that have no linked Item
    valid_items = [ci for ci in cart.items if ci.item.price is not None]

    # Optional debug prints
    for ci in valid_items:
        print("CartItem price:", ci.price)
        print("Item price:", ci.item.price)

    # Safely calculate total price
    total_price = sum((ci.quantity or 0) * (ci.item.price or 0) for ci in valid_items)

    # Prepare items for Pydantic response
    items_response = [
        CartItemResponse(
            id=ci.id,
            item_id=ci.item_id,
            quantity=ci.quantity,
            price=ci.item.price,
            item={
                "id": ci.item.id,
                "name": ci.item.name,
                "description": ci.item.description,
                "genre": ci.item.genre,
                "brand": ci.item.brand,
                "price": ci.item.price,
                "quantity": ci.item.quantity,
            },
        )
        for ci in valid_items
    ]

    return CartResponse(id=cart.id, items=items_response, total_price=total_price)


@router.put("/items/{item_id}", response_model=CartResponse)
def update_cart_item(
    request: Request,
    response: Response,
    item_id: int,
    data: CartItemUpdate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    service = CartService(db)

    if current_user:
        user_id = current_user.id
        session_id = None
    else:
        session_id = get_or_create_session_id(request, response)
        user_id = None

    # Add the item to the user's cart
    cart = service.update_item(
        user_id=user_id,
        session_id=session_id,
        item_id=item_id,
        quantity=data.quantity,
    )

    # Filter out cart items that have no linked Item
    valid_items = [ci for ci in cart.items if ci.item.price is not None]

    # Optional debug prints
    for ci in valid_items:
        print("CartItem price:", ci.price)
        print("Item price:", ci.item.price)

    # Safely calculate total price
    total_price = sum((ci.quantity or 0) * (ci.item.price or 0) for ci in valid_items)

    # Prepare items for Pydantic response
    items_response = [
        CartItemResponse(
            id=ci.id,
            item_id=ci.item_id,
            quantity=ci.quantity,
            price=ci.item.price,
            item={
                "id": ci.item.id,
                "name": ci.item.name,
                "description": ci.item.description,
                "genre": ci.item.genre,
                "brand": ci.item.brand,
                "price": ci.item.price,
                "quantity": ci.item.quantity,
            },
        )
        for ci in valid_items
    ]

    return CartResponse(id=cart.id, items=items_response, total_price=total_price)


@router.delete("/items/{item_id}", response_model=CartResponse)
def remove_from_cart(
    request: Request,
    response: Response,
    item_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    service = CartService(db)

    if current_user:
        user_id = current_user.id
        session_id = None
    else:
        session_id = get_or_create_session_id(request, response)
        user_id = None

    # Add the item to the user's cart
    cart = service.remove_item(
        user_id=user_id,
        session_id=session_id,
        item_id=item_id,
    )

    # Filter out cart items that have no linked Item
    valid_items = [ci for ci in cart.items if ci.item.price is not None]

    # Optional debug prints
    for ci in valid_items:
        print("CartItem price:", ci.price)
        print("Item price:", ci.item.price)

    # Safely calculate total price
    total_price = sum((ci.quantity or 0) * (ci.item.price or 0) for ci in valid_items)

    # Prepare items for Pydantic response
    items_response = [
        CartItemResponse(
            id=ci.id,
            item_id=ci.item_id,
            quantity=ci.quantity,
            price=ci.item.price,
            item={
                "id": ci.item.id,
                "name": ci.item.name,
                "description": ci.item.description,
                "genre": ci.item.genre,
                "brand": ci.item.brand,
                "price": ci.item.price,
                "quantity": ci.item.quantity,
            },
        )
        for ci in valid_items
    ]

    return CartResponse(id=cart.id, items=items_response, total_price=total_price)
