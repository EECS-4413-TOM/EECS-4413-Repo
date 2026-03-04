from __future__ import annotations

# TODO: Import BaseModel from pydantic


class ItemCreate:
    """
    Request body for POST /api/admin/inventory.
    Used by admins when adding a new product.
    """

    # TODO: Declare fields
    # name        — str
    # description — str
    # category    — str
    # brand       — str
    # price       — float
    # quantity    — int
    # image_url   — str | None = None

    pass


class ItemUpdate:
    """
    Request body for PUT /api/admin/inventory/{id}.
    All fields optional so admins can do partial updates
    (e.g., update only the quantity without re-sending all other fields).
    """

    # TODO: Declare fields (all optional)
    # name        — str | None = None
    # description — str | None = None
    # category    — str | None = None
    # brand       — str | None = None
    # price       — float | None = None
    # quantity    — int | None = None
    # image_url   — str | None = None

    pass


class ItemResponse:
    """
    Response body returned when an item is read.
    Requires model_config = {"from_attributes": True} for ORM serialization.
    """

    # TODO: Declare fields
    # id          — int
    # name        — str
    # description — str
    # category    — str
    # brand       — str
    # price       — float
    # quantity    — int
    # image_url   — str | None = None

    pass
