from __future__ import annotations

# TODO: Import FastAPI from fastapi
# TODO: Import CORSMiddleware from fastapi.middleware.cors
# TODO: Import routers: auth, catalog, cart, orders, users, admin from app.routers

# app = FastAPI(title="E-Store API", version="0.1.0")


def configure_cors(app) -> None:
    """
    Attach CORS middleware to allow the React frontend to call the API.
    Settings:
      allow_origins=["*"]   — restrict to your domain in production
      allow_credentials=True
      allow_methods=["*"]
      allow_headers=["*"]
    """
    pass


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
    pass


def health_check():
    """
    GET /api/health

    Simple endpoint for container health checks and uptime monitoring.
    Returns {"status": "ok"}.
    """
    pass
