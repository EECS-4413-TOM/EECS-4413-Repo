from __future__ import annotations

from sqlalchemy import Column, Integer, String, Boolean, ForeignKey
from sqlalchemy.orm import relationship
from app.database import Base


class User(Base):
    """
    ORM model representing a registered customer or admin.
    Maps to the 'users' table in PostgreSQL.
    """

    __tablename__ = "users"

    id = Column(Integer, primary_key = True, index = True)
    email = Column(String, unique = True, index = True, nullable = False)
    hashed_password = Column(String, nullable=True)
    first_name = Column(String, nullable=False)
    last_name = Column(String, nullable=False)
    is_admin = Column(Boolean, default = False)
    address_id = Column(Integer, nullable=True)  # Add "ForeignKey("addresses.id")" when table ready

    relationship("Address", back_populates="users") #back_populates is a two way relationship. It allows us to access the user from the address and the address from the user.
    orders = relationship("PurchaseOrder", back_populates="customer")
    #cart = relationship("ShoppingCart", back_populates="user", uselist=False) #uselist=False means that the user can only have one shopping cart.
