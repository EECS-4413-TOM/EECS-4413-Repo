from __future__ import annotations

# TODO: Import APIRouter, Depends, HTTPException, status from fastapi
# TODO: Import Session from sqlalchemy.orm
# TODO: Import get_db from app.dependencies
# TODO: Import ItemCreate, ItemUpdate, ItemResponse from app.schemas.item
# TODO: Import OrderResponse from app.schemas.order
# TODO: Import UserResponse from app.schemas.user
# TODO: Import get_current_user from app.utils.security
# TODO: Import User from app.models.user
# TODO: Import Item from app.models.item
# TODO: Import ItemRepository from app.repositories.item_repository
# TODO: Import UserRepository from app.repositories.user_repository
# TODO: Import OrderService from app.services.order_service

# router = APIRouter()


def require_admin(current_user):
    """
    Dependency used on all admin routes.
    Checks current_user.is_admin — raises HTTP 403 "Admin access required" if False.
    Returns current_user if authorized, so it can be injected into route functions.
    """
    pass


def get_sales_history(admin, db):
    """
    GET /api/admin/sales
    Requires admin role.

    Returns all purchase orders across all customers.
    Delegates to OrderService.get_all_orders().
    Returns list[OrderResponse].
    """
    pass


def get_inventory(admin, db):
    """
    GET /api/admin/inventory
    Requires admin role.

    Returns the full list of products with current quantities.
    Delegates to ItemRepository.get_all().
    Returns list[ItemResponse].
    """
    pass


def add_item(data, admin, db):
    """
    POST /api/admin/inventory
    Requires admin role.

    Accepts ItemCreate body.
    Creates a new Item model instance from the data, saves via ItemRepository.create().
    Returns the created ItemResponse.
    """
    pass


def update_item(item_id: int, data, admin, db):
    """
    PUT /api/admin/inventory/{item_id}
    Requires admin role.

    Accepts ItemUpdate body (all fields optional).
    Looks up the item — raises HTTP 404 if not found.
    Iterates over provided (non-None) fields and sets them on the Item instance.
    Saves via ItemRepository.update().
    Returns the updated ItemResponse.
    """
    pass


def get_users(admin, db):
    """
    GET /api/admin/users
    Requires admin role.

    Returns all registered user accounts.
    Delegates to UserRepository.get_all().
    Returns list[UserResponse].
    """
    pass
