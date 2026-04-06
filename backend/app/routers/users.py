from __future__ import annotations

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.dependencies import get_db
from app.schemas.user import UserResponse, UserUpdate
from app.utils.security import get_current_user
from app.models.user import User
from app.repositories.user_repository import UserRepository

router = APIRouter()


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
def update_profile(data: UserUpdate, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    """
    PUT /api/users/me
    Requires authentication.

    Accepts UserUpdate body (all fields optional).
    Updates only the fields that are provided (check for None before setting).
    Saves changes via UserRepository.update(current_user).
    Returns the updated UserResponse.
    """
    repo = UserRepository(db)

    user = repo.get_by_id(current_user.id)

    if data.first_name is not None:
        user.first_name = data.first_name
    if data.last_name is not None:
        user.last_name = data.last_name
    if data.email is not None:
        user.email = data.email
    repo.update(user)
    return user
