from __future__ import annotations

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.dependencies import get_db
from app.schemas.user import UserCreate, UserLogin, UserResponse, Token
from app.services.auth_service import AuthService

router = APIRouter()

@router.post("/register, response_model = UserResponse")#response model is the schema that will be returned to the client
def register(data: UserCreate, db: Session = Depends(get_db)):
    """
    POST /api/auth/register

    Accepts a UserCreate body.
    Delegates to AuthService.register().
    Returns the created user as UserResponse (HTTP 200).
    """
    service = AuthService(db)
    return service.register(data)

@router.post("/login, responsee_model = Token")
def login(data: UserLogin, db: Session = Depends(get_db)):
    """
    POST /api/auth/login

    Accepts a UserLogin body.
    Delegates to AuthService.login().
    Returns a Token (HTTP 200) containing the JWT access_token.
    """
    service = AuthService(db)
    return service.login(data.email, data.password)
