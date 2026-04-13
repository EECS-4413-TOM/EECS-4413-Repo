from __future__ import annotations

from pydantic import BaseModel
from datetime import date
from datetime import datetime, timezone

# edited so that price is now shown since we get price in supabase

class ItemCreate(BaseModel):
    igdb_id: int
    name: str
    description: str
    genre: str
    brand: str
    price: float # ADD THIS WHEN WE FIND A WAY TO GET GAME PRICES
    rating: float | None = None
    release_date: datetime | None = None
    quantity: int # Number of physical copies in stock
    cover_url: str | None = None


class ItemUpdate(BaseModel):
    name: str | None = None
    description: str | None = None
    genre: str | None = None
    brand: str | None = None
    price: float | None = None # ADD THIS WHEN WE FIND A WAY TO GET GAME PRICES
    rating: float | None = None
    release_date: datetime | None = None
    quantity: int | None = None
    cover_url: str | None = None


class ItemResponse(BaseModel):
    id: int
    name: str
    description: str
    genre: str | None = None
    brand: str | None = None
    price: float | None = None # ADD THIS WHEN WE FIND A WAY TO GET GAME PRICES
    rating: float | None = None
    release_date: datetime | None = None
    quantity: int
    cover_url: str | None = None

    model_config = {
        "from_attributes": True
    }  # This tells Pydantic to convert the SQLAlchemy model to a Pydantic model. This makes reading the attributes of the sqlalchemy model easier.
    # Pydantic can build ItemResponse from ORM objects (like SQLAlchemy model instances), not just dicts.
