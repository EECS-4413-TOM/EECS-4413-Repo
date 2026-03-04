from __future__ import annotations

# TODO: Import datetime, timedelta, timezone from datetime
# TODO: Import Depends, HTTPException, status from fastapi
# TODO: Import OAuth2PasswordBearer from fastapi.security
# TODO: Import JWTError, jwt from jose
# TODO: Import CryptContext from passlib.context
# TODO: Import Session from sqlalchemy.orm
# TODO: Import settings from app.config
# TODO: Import get_db from app.dependencies
# TODO: Import User from app.models.user
# TODO: Import UserRepository from app.repositories.user_repository

# pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
# oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/auth/login")


def hash_password(password: str) -> str:
    """
    Hash a plain-text password using bcrypt.
    Uses pwd_context.hash(password).
    Returns the hashed string to store in the database.
    """
    pass


def verify_password(plain: str, hashed: str) -> bool:
    """
    Compare a plain-text password against a stored bcrypt hash.
    Uses pwd_context.verify(plain, hashed).
    Returns True if they match, False otherwise.
    """
    pass


def create_access_token(data: dict) -> str:
    """
    Create a signed JWT access token.

    Steps:
    1. Copy the data dict into to_encode
    2. Compute expiry: datetime.now(UTC) + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    3. Add {"exp": expire} to to_encode
    4. Encode with jwt.encode(to_encode, JWT_SECRET, algorithm=JWT_ALGORITHM)
    5. Return the token string
    """
    pass


def get_current_user(token, db):
    """
    FastAPI dependency — extracts and validates the JWT from the request header,
    then returns the corresponding User from the database.

    Steps:
    1. Decode token using jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
       — wrap in try/except JWTError, raise HTTP 401 on failure
    2. Extract user_id from payload["sub"]  — raise 401 if missing
    3. Look up user via UserRepository(db).get_by_id(int(user_id))
       — raise 401 if user does not exist
    4. Return the User ORM object

    Used as: current_user: User = Depends(get_current_user)
    """
    pass
