from __future__ import annotations

from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session

from app.dependencies import get_db
from app.schemas.item import ItemResponse
from app.services.catalog_service import CatalogService

router = APIRouter()


# Search for games from DB first, then IGDB
@router.get("/search")
async def search_games(q: str, db: Session = Depends(get_db)):
    service = CatalogService(db)

    return await service.search_games(q)


# Get specific item id, so use get_item not list_items
@router.get("/{item_id}", response_model=ItemResponse)
def get_item(
    item_id: int,
    db: Session = Depends(get_db), #Get DB session
):
    service = CatalogService(db)

    return service.get_item(item_id) # Return item of that specific ID


# Default route should list multiple items,
@router.get("/", response_model=list[ItemResponse])
def list_items(
    genre: str | None = Query(None),
    brand: str | None = Query(None),
    search: str | None = Query(None),
    sort_by: str | None = Query(None),
    order: str = Query("asc"),
    db: Session = Depends(get_db),
):
    service = CatalogService(db)

    return service.list_items(
        genre=genre,
        brand=brand,
        search=search,
        sort_by=sort_by,
        order=order,
    )

# Initial import of top games (change limit in catalog_services.py)
@router.post("/admin/import-games")
async def import_games(
    db: Session = Depends(get_db),
):

    service = CatalogService(db)

    await service.import_top_games()

    return {"message": "Top games imported"}
