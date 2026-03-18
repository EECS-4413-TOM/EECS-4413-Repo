from __future__ import annotations

from typing import Generator
from sqlalchemy.orm import Session
from app.database import SessionLocal


def get_db() -> Generator[Session, None, None]:
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
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
