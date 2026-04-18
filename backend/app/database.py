from __future__ import annotations
import os
from pathlib import Path

from dotenv import load_dotenv
from supabase import create_client, Client
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, DeclarativeBase
from pathlib import Path
from app.config import settings


engine = create_engine(
    settings.DATABASE_URL,
    pool_pre_ping=True,
    pool_recycle=280,
)


SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)



class Base(DeclarativeBase):
    pass


if __name__ == "__main__":
    from models.item import Item

    db = SessionLocal()

    try:
        items = db.query(Item).limit(5).all()
        print("Successfully retrieved items:", items)
    except Exception as e:
        print("Error querying DB:", e)
    finally:
        db.close()
