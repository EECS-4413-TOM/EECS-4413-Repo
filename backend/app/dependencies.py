from __future__ import annotations

# TODO: Import Generator from typing
# TODO: Import Session from sqlalchemy.orm
# TODO: Import SessionLocal from app.database


def get_db():
    """
    FastAPI dependency that yields a database session per request.

    Steps:
    1. Instantiate a session: db = SessionLocal()
    2. yield db  (the route handler receives this session)
    3. In the finally block: db.close()  (always close, even on exception)

    Usage in a router:
      def my_route(db: Session = Depends(get_db)):
          ...
    """
    pass
