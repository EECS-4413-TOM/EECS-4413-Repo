from __future__ import annotations

from sqlalchemy import create_engine
from sqlalchemy.orm import DeclarativeBase, sessionmaker

from app.config import settings

# pool_pre_ping: validate connections before checkout (stale connections in Docker/NAT).
# pool_recycle: recycle connections before typical idle timeouts (seconds).
# pool_size / max_overflow: explicit caps per process; scale with uvicorn --workers if needed.
engine = create_engine(
    settings.DATABASE_URL,
    pool_pre_ping=True,
    pool_recycle=280,
    pool_size=10,
    max_overflow=20,
    pool_timeout=30,
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


class Base(DeclarativeBase):
    pass


if __name__ == "__main__":
    from app.models.item import Item

    db = SessionLocal()

    try:
        items = db.query(Item).limit(5).all()
        print("Successfully retrieved items:", items)
    except Exception as e:
        print("Error querying DB:", e)
    finally:
        db.close()
