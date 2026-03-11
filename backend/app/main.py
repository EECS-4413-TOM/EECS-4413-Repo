from __future__ import annotations

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routers import auth, catalog, cart, orders, users, admin #importing routers in order to use them in the app.

app = FastAPI(title="E-Store API", version="0.1.0")


def configure_cors(app) -> None:
    """
    Attach CORS middleware to allow the React frontend to call the API.
    Settings:
      allow_origins=["*"]   — should be replaced with frontend url later.
      allow_credentials=True
      allow_methods=["*"]
      allow_headers=["*"]
    """
    
    app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"], #should be replaced with frontend url later.
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )



def include_routers(app) -> None:
    """
    Register all domain routers with their /api prefix:
      auth    → /api/auth
      catalog → /api/catalog
      cart    → /api/cart
      orders  → /api/orders
      users   → /api/users
      admin   → /api/admin
    """
    app.include_router(auth.router, prefix="/api/auth", tags=["auth"]) #registering routers with their /api prefix. Adding tags for the routers for better organization.
    app.include_router(catalog.router, prefix="/api/catalog", tags=["catalog"])
    app.include_router(cart.router, prefix="/api/cart", tags=["cart"])
    app.include_router(orders.router, prefix="/api/orders", tags=["orders"])
    app.include_router(users.router, prefix="/api/users", tags=["users"])
    app.include_router(admin.router, prefix="/api/admin", tags=["admin"])


@app.get("/api/health")
def health_check():
    """
    GET /api/health

    Simple endpoint for container health checks and uptime monitoring.
    Returns {"status": "ok"}.
    """
    return {"status": "ok"}

configure_cors(app)
include_routers(app)
