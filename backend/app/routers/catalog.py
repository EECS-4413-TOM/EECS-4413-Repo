from __future__ import annotations

from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session

from app.dependencies import get_db
from app.schemas.item import ItemResponse
from app.services.catalog_service import CatalogService

# TODO: Import APIRouter, Depends, Query from fastapi
# TODO: Import Session from sqlalchemy.orm
# TODO: Import get_db from app.dependencies
# TODO: Import ItemResponse from app.schemas.item
# TODO: Import CatalogService from app.services.catalog_service

router = APIRouter()


@router.get("/search")
async def search_games(q: str):
    """
    Search games from IGDB.
    """

    service = CatalogService(None)

    return await service.search_games(q)


@router.get("/{item_id}")
def list_items(
    category: str | None = Query(None),
    brand: str | None = Query(None),
    search: str | None = Query(None),
    sort_by: str | None = Query(None),
    order: str = Query("asc"),
    db: Session = Depends(get_db),
):

    service = CatalogService(db)

    return service.list_items(
        category=category,
        brand=brand,
        search=search,
        sort_by=sort_by,
        order=order,
    )


@router.get("/")
def get_item(
    item_id: int,
    db: Session = Depends(get_db),
):

    service = CatalogService(db)

    return service.get_item(item_id)
