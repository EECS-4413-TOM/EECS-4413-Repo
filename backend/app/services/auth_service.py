from __future__ import annotations

# TODO: Import HTTPException, status from fastapi
# TODO: Import Session from sqlalchemy.orm
# TODO: Import UserRepository from app.repositories.user_repository
# TODO: Import UserCreate, Token from app.schemas.user
# TODO: Import hash_password, verify_password, create_access_token from app.utils.security


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
        pass

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
        pass

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
        pass
