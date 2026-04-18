from __future__ import annotations

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.dependencies import get_db
from app.models.address import Address
from app.models.user import User
from app.repositories.address_repository import AddressRepository
from app.repositories.user_repository import UserRepository
from app.schemas.address import AddressUpdate
from app.schemas.user import UserResponse, UserUpdate
from app.utils.security import get_current_user

router = APIRouter()


def _apply_address_patch(orm_addr: Address, patch: AddressUpdate) -> None:
    if patch.street is not None:
        orm_addr.street = patch.street
    if patch.city is not None:
        orm_addr.city = patch.city
    if patch.province is not None:
        orm_addr.province = patch.province
    if patch.country is not None:
        orm_addr.country = patch.country
    if patch.zip is not None:
        orm_addr.zip = patch.zip
    if patch.phone is not None:
        orm_addr.phone = patch.phone


@router.get("/me", response_model=UserResponse)
def get_profile(current_user: User = Depends(get_current_user)):
    """
    GET /api/users/me
    Requires authentication.

    Returns the logged-in user's profile.
    No DB call needed — current_user is already loaded by get_current_user dependency.
    Returns UserResponse.
    """
    return current_user


@router.put("/me", response_model=UserResponse)
def update_profile(
    data: UserUpdate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """
    PUT /api/users/me
    Requires authentication.

    Accepts UserUpdate body (all fields optional).
    Nested `address` updates the user's linked Address row (partial fields),
    or creates a new Address if none exists (requires full street/city/province/country/zip).
    """
    repo = UserRepository(db)
    addr_repo = AddressRepository(db)

    user = repo.get_by_id(current_user.id)
    if user is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found",
        )

    if data.first_name is not None:
        user.first_name = data.first_name
    if data.last_name is not None:
        user.last_name = data.last_name
    if data.email is not None:
        user.email = data.email
    if data.address_id is not None:
        user.address_id = data.address_id

    if data.address is not None:
        if user.address_id:
            orm_addr = addr_repo.get_by_id(user.address_id)
            if orm_addr is None:
                user.address_id = None
            else:
                _apply_address_patch(orm_addr, data.address)
                addr_repo.update(orm_addr)

        if user.address_id is None:
            a = data.address
            required_vals = [a.street, a.city, a.province, a.country, a.zip]
            if not all(
                v is not None and str(v).strip() != "" for v in required_vals
            ):
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail=(
                        "When adding a first address, street, city, province, "
                        "country, and zip are all required."
                    ),
                )
            new_addr = addr_repo.create(
                Address(
                    street=str(a.street).strip(),
                    city=str(a.city).strip(),
                    province=str(a.province).strip(),
                    country=str(a.country).strip(),
                    zip=str(a.zip).strip(),
                    phone=str(a.phone).strip() if a.phone else None,
                )
            )
            user.address_id = new_addr.id

    repo.update(user)
    refreshed = repo.get_by_id(user.id)
    return refreshed if refreshed is not None else user
