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
