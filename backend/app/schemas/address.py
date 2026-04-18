from __future__ import annotations

from pydantic import BaseModel


class AddressCreate(BaseModel):
    street: str
    city: str
    province: str
    country: str
    zip: str
    phone: str | None = None


class AddressResponse(BaseModel):
    id: int
    street: str
    city: str
    province: str
    country: str
    zip: str
    phone: str | None = None

    model_config = {"from_attributes": True}


class AddressUpdate(BaseModel):
    """
    Partial fields for PUT /users/me when updating nested address.
    Omitted keys are left unchanged on the existing row.
    When the user has no address yet, all of street, city, province, country, zip must be sent.
    """

    street: str | None = None
    city: str | None = None
    province: str | None = None
    country: str | None = None
    zip: str | None = None
    phone: str | None = None
