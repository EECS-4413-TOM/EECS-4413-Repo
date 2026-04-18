from __future__ import annotations

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.dependencies import get_db
from app.schemas.item import ItemCreate, ItemUpdate, ItemResponse
from app.schemas.order import OrderResponse
from app.schemas.user import UserResponse
from app.utils.security import get_current_user
from app.models.user import User
from app.models.item import Item
from app.repositories.item_repository import ItemRepository
from app.repositories.user_repository import UserRepository
from app.services.order_service import OrderService
from app.services.user_admin_service import delete_user_as_admin

router = APIRouter()


def require_admin(current_user: User = Depends(get_current_user)):
    """
    Dependency used on all admin routes.
    Checks current_user.is_admin — raises HTTP 403 "Admin access required" if False.
    Returns current_user if authorized, so it can be injected into route functions.
    """
    if not current_user.is_admin:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Admin access required")
    return current_user

@router.get("/sales", response_model=list[OrderResponse])
def get_sales_history(admin: User = Depends(require_admin), db: Session = Depends(get_db)):
    """
    GET /api/admin/sales
    Requires admin role.

    Returns all purchase orders across all customers.
    Delegates to OrderService.get_all_orders().
    Returns list[OrderResponse].
    """
    service = OrderService(db)
    return service.get_all_orders()

@router.get("/inventory", response_model=list[ItemResponse])
def get_inventory(admin: User = Depends(require_admin), db: Session = Depends(get_db)):
    """
    GET /api/admin/inventory
    Requires admin role.

    Returns the full list of products with current quantities.
    Delegates to ItemRepository.get_all().
    Returns list[ItemResponse].
    """
    repo = ItemRepository(db)
    return repo.get_all()


@router.post("/inventory", response_model=ItemResponse)
def add_item(data: ItemCreate, admin: User = Depends(require_admin), db: Session = Depends(get_db)):
    """
    POST /api/admin/inventory
    Requires admin role.

    Accepts ItemCreate body.
    Creates a new Item model instance from the data, saves via ItemRepository.create().
    Returns the created ItemResponse.
    """
    item = Item(**data.model_dump())
    repo = ItemRepository(db)
    repo.create(item)
    return item

@router.put("/inventory/{item_id}", response_model=ItemResponse)
def update_item(item_id: int, data: ItemUpdate, admin: User = Depends(require_admin), db: Session = Depends(get_db)):
    """
    PUT /api/admin/inventory/{item_id}
    Requires admin role.

    Accepts ItemUpdate body (all fields optional).
    Looks up the item — raises HTTP 404 if not found.
    Iterates over provided (non-None) fields and sets them on the Item instance.
    Saves via ItemRepository.update().
    Returns the updated ItemResponse.
    """
    repo = ItemRepository(db)
    item = repo.get_by_id(item_id)
    if not item:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Item not found")
    
    data_dict = data.model_dump(exclude_none=True)  # Convert model to dict without None values

    for field, value in data_dict.items():
        if hasattr(item, field):
            setattr(item, field, value)
    repo.update(item)
    return item

@router.get("/users", response_model=list[UserResponse])
def get_users(admin: User = Depends(require_admin), db: Session = Depends(get_db)):
    """
    GET /api/admin/users
    Requires admin role.

    Returns all registered user accounts.
    Delegates to UserRepository.get_all().
    Returns list[UserResponse].
    """
    repo = UserRepository(db)
    return repo.get_all()


@router.delete("/users/{user_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_user(
    user_id: int,
    admin: User = Depends(require_admin),
    db: Session = Depends(get_db),
):
    """
    DELETE /api/admin/users/{user_id}
    Requires admin. Blocks self-delete, deleting the only admin, and users with orders.
    Removes linked shopping cart and orphaned address row when safe.
    """
    delete_user_as_admin(db, admin, user_id)
