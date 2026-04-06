from __future__ import annotations

# TODO: Import Column types from sqlalchemy (Integer, String)
# TODO: Import relationship from sqlalchemy.orm
# TODO: Import Base from app.database
from sqlalchemy import Column, Integer, String, Date, Float, ForeignKey
from sqlalchemy.orm import relationship
from app.database import Base

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


    __tablename__ = "addresses"
    id = Column(Integer, primary_key=True, index=True)
    street = Column(String, nullable=False)
    city = Column(String, nullable=False)
    province = Column(String, nullable=False)
    country = Column(String, nullable=False)
    zip = Column(String, nullable=False)
    phone = Column(String, nullable=True)
    
    users = relationship("User", back_populates="address")