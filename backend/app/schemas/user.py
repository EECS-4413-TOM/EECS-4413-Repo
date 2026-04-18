from __future__ import annotations

from pydantic import BaseModel, EmailStr #BaseModel allows for the creation of Pydantic models. EmailStr allows for the validation of email addresses.

from app.schemas.address import AddressCreate, AddressResponse, AddressUpdate


class UserCreate(BaseModel):
    """
    Request body for POST /api/auth/register.
    Creates an Address row first, then the User linked to it.
    """

    email: EmailStr
    password: str
    first_name: str
    last_name: str
    address: AddressCreate


class UserLogin(BaseModel):
    """
    Request body for POST /api/auth/login.
    """

    email: EmailStr
    password: str


class UserUpdate(BaseModel):
    """
    Request body for PUT /api/users/me.
    All fields optional — only provided fields are updated.
    Use `address` to patch the linked Address row or create one if missing.
    """

    first_name: str | None = None
    last_name: str | None = None
    email: EmailStr | None = None
    address_id: int | None = None
    address: AddressUpdate | None = None


class UserResponse(BaseModel):
    """
    Response body returned when a user is read.
    Never exposes hashed_password.
    Requires model_config = {"from_attributes": True} for ORM serialization.
    """

    id: int
    email: EmailStr
    first_name: str
    last_name: str
    is_admin: bool
    address_id: int | None = None
    address: AddressResponse | None = None

    model_config = {"from_attributes": True}#This tells Pydantic to convert the SQLAlchemy model to a Pydantic model. This makes reading the attributes of the sqlalchemy model easier.
    #Pydantic can build UserResponse from ORM objects (like SQLAlchemy model instances), not just dicts.



class Token(BaseModel):
    """
    Response body returned after a successful login.
    The client must store access_token and send it as
    'Authorization: Bearer <token>' on protected routes.
    """

    access_token: str
    token_type: str = "bearer"
