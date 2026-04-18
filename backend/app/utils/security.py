from __future__ import annotations

from datetime import datetime, timedelta, timezone

from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError, jwt
from passlib.context import CryptContext
from fastapi import Request

from app.config import settings
from app.dependencies import get_db
from app.repositories.user_repository import UserRepository

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/auth/login")


def hash_password(password: str) -> str:
    """
    Hash a plain-text password using bcrypt.
    Uses pwd_context.hash(password).
    Returns the hashed string to store in the database.
    """
    return pwd_context.hash(password)


def verify_password(plain: str, hashed: str) -> bool:
    """
    Compare a plain-text password against a stored bcrypt hash.
    Uses pwd_context.verify(plain, hashed).
    Returns True if they match, False otherwise.
    """
    return pwd_context.verify(plain, hashed)


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
    to_encode = data.copy()
    expire = datetime.now(timezone.utc) + timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES) #get expiry time by adding the access token expire minutes from the config to the current time
    to_encode["exp"] = expire
    return jwt.encode(to_encode, settings.JWT_SECRET, algorithm=settings.JWT_ALGORITHM)


def get_current_user(token: str = Depends(oauth2_scheme), db = Depends(get_db)):
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
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )#this is a custom exception that is raised when the credentials are not valid

    try:
        payload = jwt.decode(
            token, 
            settings.JWT_SECRET,
            algorithms = [settings.JWT_ALGORITHM]
        )#extract the token, decode it using the secret key and the algorithm. 
        user_id = payload.get("sub")#extract the user id from the payload. sub is the subject of the token, which is the user id.
        if user_id is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception

    user = UserRepository(db).get_by_id(int(user_id))
    if user is None:
        raise credentials_exception#if the user is not found, raise the custom exception

    return user


def get_current_user_optional(request: Request, db=Depends(get_db)):
    auth = request.headers.get("Authorization")

    if not auth:
        return None

    try:
        scheme, token = auth.split()

        if scheme.lower() != "bearer":
            return None

        payload = jwt.decode(
            token,
            settings.JWT_SECRET,
            algorithms=[settings.JWT_ALGORITHM],
        )

        user_id = payload.get("sub")
        if not user_id:
            return None

        return UserRepository(db).get_by_id(int(user_id))

    except Exception:
        return None
