from __future__ import annotations


from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.dependencies import get_db
from app.schemas.cart import CartResponse, CartItemAdd, CartItemUpdate, CartItemResponse
from app.services.cart_service import CartService
from app.utils.security import get_current_user
from app.models.user import User

router = APIRouter()


@router.get("/", response_model=CartResponse)
def get_cart(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """
    GET /api/cart
    Requires authentication.

    Returns the current user's cart (creating one if it doesn't exist).
    """
    service = CartService(db)

    cart = service.get_or_create_cart(current_user.id)

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
    data: CartItemAdd,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    service = CartService(db)

    # Add the item to the user's cart
    cart = service.add_item(current_user.id, data.item_id, data.quantity)

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
    item_id: int,
    data: CartItemUpdate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    service = CartService(db)

    # Add the item to the user's cart
    cart = service.update_item(current_user.id, item_id, data.quantity)

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
    item_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    service = CartService(db)

    # Add the item to the user's cart
    cart = service.remove_item(current_user.id, item_id)

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
