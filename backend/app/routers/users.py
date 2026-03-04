from __future__ import annotations

# TODO: Import APIRouter, Depends from fastapi
# TODO: Import Session from sqlalchemy.orm
# TODO: Import get_db from app.dependencies
# TODO: Import UserResponse, UserUpdate from app.schemas.user
# TODO: Import get_current_user from app.utils.security
# TODO: Import User from app.models.user
# TODO: Import UserRepository from app.repositories.user_repository

# router = APIRouter()


def get_profile(current_user):
    """
    GET /api/users/me
    Requires authentication.

    Returns the logged-in user's profile.
    No DB call needed — current_user is already loaded by get_current_user dependency.
    Returns UserResponse.
    """
    pass


def update_profile(data, current_user, db):
    """
    PUT /api/users/me
    Requires authentication.

    Accepts UserUpdate body (all fields optional).
    Updates only the fields that are provided (check for None before setting).
    Saves changes via UserRepository.update(current_user).
    Returns the updated UserResponse.
    """
    pass
