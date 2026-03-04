from __future__ import annotations

# TODO: Import Column types from sqlalchemy (Integer, String)
# TODO: Import relationship from sqlalchemy.orm
# TODO: Import Base from app.database


class Address:
    """
    ORM model for a physical mailing address.
    Shared by User (billing/shipping) tables.
    Maps to the 'addresses' table in PostgreSQL.
    """

    # TODO: Declare table columns
    # id       — Integer, primary key, indexed
    # street   — String, not null
    # city     — String, not null
    # province — String, not null
    # country  — String, not null
    # zip      — String, not null
    # phone    — String, nullable

    # TODO: Declare ORM relationships
    # users -> User (one-to-many, back_populates="address")

    pass
