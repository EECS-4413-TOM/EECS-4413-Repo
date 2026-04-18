from __future__ import annotations

from fastapi import HTTPException, status
from sqlalchemy.orm import Session

from app.models.address import Address
from app.models.cart import ShoppingCart
from app.models.order import PurchaseOrder
from app.models.user import User


def delete_user_as_admin(db: Session, admin: User, user_id: int) -> None:
    if user_id == admin.id:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cannot delete your own account",
        )

    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found",
        )

    if (
        db.query(PurchaseOrder)
        .filter(PurchaseOrder.customer_id == user_id)
        .first()
    ):
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Cannot delete user with order history",
        )

    if user.is_admin:
        admin_count = db.query(User).filter(User.is_admin.is_(True)).count()
        if admin_count <= 1:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Cannot delete the only admin account",
            )

    address_id = user.address_id
    cart = db.query(ShoppingCart).filter(ShoppingCart.user_id == user_id).first()
    if cart:
        db.delete(cart)

    db.delete(user)
    db.flush()

    if address_id:
        if db.query(User).filter(User.address_id == address_id).count() == 0:
            addr = db.query(Address).filter(Address.id == address_id).first()
            if addr:
                db.delete(addr)

    db.commit()
