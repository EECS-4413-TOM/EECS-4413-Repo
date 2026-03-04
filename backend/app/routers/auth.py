from __future__ import annotations

# TODO: Import APIRouter from fastapi
# TODO: Import Depends from fastapi
# TODO: Import Session from sqlalchemy.orm
# TODO: Import get_db from app.dependencies
# TODO: Import UserCreate, UserLogin, UserResponse, Token from app.schemas.user
# TODO: Import AuthService from app.services.auth_service

# router = APIRouter()


def register(data, db):
    """
    POST /api/auth/register

    Accepts a UserCreate body.
    Delegates to AuthService.register().
    Returns the created user as UserResponse (HTTP 200).
    """
    pass


def login(data, db):
    """
    POST /api/auth/login

    Accepts a UserLogin body.
    Delegates to AuthService.login().
    Returns a Token (HTTP 200) containing the JWT access_token.
    """
    pass
