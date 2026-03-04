from __future__ import annotations

# TODO: Import APIRouter, Depends, Query from fastapi
# TODO: Import Session from sqlalchemy.orm
# TODO: Import get_db from app.dependencies
# TODO: Import ItemResponse from app.schemas.item
# TODO: Import CatalogService from app.services.catalog_service

# router = APIRouter()


def list_items(category, brand, search, sort_by, order, db):
    """
    GET /api/catalog

    Query parameters:
      category — filter by category (optional)
      brand    — filter by brand (optional)
      search   — keyword search across name/description/brand (optional)
      sort_by  — "price" or "name" (optional)
      order    — "asc" (default) or "desc"

    Delegates to CatalogService.list_items().
    Returns a list of ItemResponse objects.
    """
    pass


def get_item(item_id: int, db):
    """
    GET /api/catalog/{item_id}

    Path parameter: item_id — the product's ID
    Delegates to CatalogService.get_item().
    Returns a single ItemResponse, or HTTP 404 if not found.
    """
    pass
