from __future__ import annotations
import os
from pathlib import Path

from dotenv import load_dotenv
from supabase import create_client, Client
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, DeclarativeBase

# Always load backend/.env (same folder as `app/`), not cwd — so it works from any terminal directory.
_BACKEND_ROOT = Path(__file__).resolve().parent.parent
load_dotenv(_BACKEND_ROOT / ".env")


# url: str = os.environ.get("SUPABASE_URL")
# key: str = os.environ.get("SUPABASE_KEY")
# supabase: Client = create_client(url, key)


# def get_users():
#     response = supabase.table("users").select("*").execute()
#     return response


# def get_games():
#     response = supabase.table("games_catalog").select("*").execute()
#     return response


# - This establishes the connection pool to PostgreSQL. Supabase used through SQLALCHEMY Engine. Best for FastAPI, doesn't use supabase API
DB_DIR_URL = os.environ.get("SUPABASE_DIRECT_URL") or os.environ.get("DATABASE_URL")
if not DB_DIR_URL:
    raise RuntimeError(
        f"Missing database URL. Add SUPABASE_DIRECT_URL or DATABASE_URL to {_BACKEND_ROOT / '.env'}"
    )
engine = create_engine(DB_DIR_URL)


SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


# TODO: Define the declarative base class

# Define supabase table
# The class `Base` is defined as a subclass of `DeclarativeBase` in Python.
class Base(DeclarativeBase):
    pass


# - All ORM models must inherit from this Base
# - Base.metadata is used by Alembic to detect table changes for migrations
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
