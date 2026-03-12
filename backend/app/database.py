from __future__ import annotations
from dotenv import load_dotenv
from supabase import create_client, Client
import os


load_dotenv()

url: str = os.environ.get("SUPABASE_URL")
key: str = os.environ.get("SUPABASE_KEY")
supabase: Client = create_client(url, key)

def get_users():
    response = (
        supabase.table("users")
        .select("*")
        .execute()
    )
    return response


# TODO: Import create_engine from sqlalchemy
# TODO: Import sessionmaker, DeclarativeBase from sqlalchemy.orm
# TODO: Import settings from app.config


# TODO: Create the SQLAlchemy engine
# engine = create_engine(settings.DATABASE_URL)
# - This establishes the connection pool to PostgreSQL


# TODO: Create the session factory
# SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
# - autocommit=False: changes only committed when explicitly called
# - autoflush=False:  prevents automatic flushes before every query


# TODO: Define the declarative base class
# class Base(DeclarativeBase):
#     pass
# - All ORM models must inherit from this Base
# - Base.metadata is used by Alembic to detect table changes for migrations
if __name__ == "__main__":
    users = get_users()
    print(users)
