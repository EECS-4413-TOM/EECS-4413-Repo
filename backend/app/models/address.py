from __future__ import annotations


from sqlalchemy import Column, Integer, String, Date, Float, ForeignKey
from sqlalchemy.orm import relationship
from app.database import Base

class Address(Base):
    """
    ORM model for a physical mailing address.
    Shared by User (billing/shipping) tables.
    Maps to the 'addresses' table in PostgreSQL.
    """

    __tablename__ = "addresses"
    id = Column(Integer, primary_key=True, index=True)
    street = Column(String, nullable=False)
    city = Column(String, nullable=False)
    province = Column(String, nullable=False)
    country = Column(String, nullable=False)
    zip = Column(String, nullable=False)
    phone = Column(String, nullable=True)

    users = relationship("User", back_populates="address")
