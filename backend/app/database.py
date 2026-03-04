from __future__ import annotations

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
