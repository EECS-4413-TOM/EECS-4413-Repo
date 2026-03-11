from __future__ import annotations

from pydantic import BaseModel

class ItemCreate(BaseModel):
    """
    Request body for POST /api/admin/inventory.
    Used by admins when adding a new product.
    """

    name: str
    description: str
    category: str
    brand: str
    price: float
    quantity: int
    image_url: str | None = None


class ItemUpdate(BaseModel):
    """
    Request body for PUT /api/admin/inventory/{id}.
    All fields optional so admins can do partial updates
    (e.g., update only the quantity without re-sending all other fields).
    """

    name: str | None = None
    description: str | None = None
    category: str | None = None
    brand: str | None = None
    price: float | None = None
    quantity: int | None = None
    image_url: str | None = None


class ItemResponse(BaseModel):
    """
    Response body returned when an item is read.
    Requires model_config = {"from_attributes": True} for ORM serialization.
    """

    id: int
    name: str
    description: str
    category: str
    brand: str
    price: float
    quantity: int
    image_url: str | None = None

    model_config = {"from_attributes": True}#This tells Pydantic to convert the SQLAlchemy model to a Pydantic model. This makes reading the attributes of the sqlalchemy model easier.
    #Pydantic can build ItemResponse from ORM objects (like SQLAlchemy model instances), not just dicts.