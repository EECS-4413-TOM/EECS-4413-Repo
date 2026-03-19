from __future__ import annotations

from fastapi import HTTPException, status
from sqlalchemy.orm import Session

from app.repositories.user_repository import UserRepository   
from app.schemas.user import UserCreate, Token 
from app.utils.security import hash_password, verify_password, create_access_token 
from app.models.user import User


class AuthService:
    """
    Handles all authentication business logic:
    user registration, login, and JWT token creation.
    """

    def __init__(self, db):
        """
        Instantiate UserRepository with the provided DB session.
        Store it as self.user_repo for use across methods.
        """
        self.user_repo = UserRepository(db)

    def register(self, data):
        """
        Create a new user account.

        Steps:
        1. Call self.user_repo.get_by_email(data.email)
           — if a user already exists, raise HTTP 400 "Email already registered"
        2. Hash the plain-text password using hash_password()
        3. Construct a new User model instance with hashed password and other fields
        4. Save it via self.user_repo.create(user)
        5. Return the created User ORM object (router will serialize via UserResponse)
        """
        existing_user = self.user_repo.get_by_email(data.email)

        if existing_user:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Email already registered"
            )


        new_user = User(
                email = data.email,
                hashed_password = hash_password(data.password),
                first_name = data.first_name,
                last_name = data.last_name,

            )

        return self.user_repo.create(new_user)

    def login(self, email: str, password: str):
        """
        Authenticate a user and return a JWT access token.

        Steps:
        1. Look up user by email via self.user_repo.get_by_email(email)
        2. If user not found OR verify_password() returns False,
           raise HTTP 401 "Invalid email or password"
        3. Build JWT payload {"sub": str(user.id)}
        4. Call create_access_token(payload) to get the signed token string
        5. Return a Token schema instance with the access_token
        """
        user = self.user_repo.get_by_email(email)

        if not user:
            raise HTTPException(
                status_code = status.HTTP_401_UNAUTHORIZED,
                detail = "Invalid email or password"
            )

        if not verify_password(password, user.hashed_password): #if unable to verify password, raise HTTP 401 error
            raise HTTPException(
                status_code = status.HTTP_401_UNAUTHORIZED,
                detail = "Invalid email or password"
            )    

        token = create_access_token({"sub": str(user.id)})

        return Token(access_token = token)
