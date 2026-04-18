from __future__ import annotations

from fastapi import HTTPException, status
from sqlalchemy.orm import Session

from app.models.address import Address
from app.models.user import User
from app.repositories.address_repository import AddressRepository
from app.repositories.user_repository import UserRepository
from app.schemas.user import UserCreate, Token
from app.utils.security import create_access_token, hash_password, verify_password


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

    def register(self, data: UserCreate):
        """
        Create a new user account.

        Steps:
        1. Reject duplicate email.
        2. Persist Address, then User with address_id.
        3. Return the created User (UserResponse from router).
        """
        existing_user = self.user_repo.get_by_email(data.email)

        if existing_user:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Email already registered"
            )

        addr_repo = AddressRepository(self.user_repo.db)
        address_row = addr_repo.create(
            Address(
                street=data.address.street,
                city=data.address.city,
                province=data.address.province,
                country=data.address.country,
                zip=data.address.zip,
                phone=data.address.phone,
            )
        )

        new_user = User(
            email=data.email,
            hashed_password=hash_password(data.password),
            first_name=data.first_name,
            last_name=data.last_name,
            address_id=address_row.id,
        )

        created = self.user_repo.create(new_user)
        reloaded = self.user_repo.get_by_id(created.id)
        return reloaded if reloaded is not None else created

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
