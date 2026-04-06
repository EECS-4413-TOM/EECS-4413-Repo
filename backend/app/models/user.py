from __future__ import annotations

from sqlalchemy import Column, Integer, String, Boolean, ForeignKey
from sqlalchemy.orm import relationship
from app.database import Base


class User(Base):

    __tablename__ = "users"

    id = Column(Integer, primary_key = True, index = True)
    email = Column(String, unique = True, index = True, nullable = False)
    hashed_password = Column(String, nullable=True)
    first_name = Column(String, nullable=False)
    last_name = Column(String, nullable=False)
    is_admin = Column(Boolean, default = False)
    address_id = Column(Integer, ForeignKey("addresses.id"), nullable=True) 

    relationship("Address", back_populates="users") #back_populates is a two way relationship. It allows us to access the user from the address and the address from the user.
    orders = relationship("PurchaseOrder", back_populates="customer")
    relationship("PurchaseOrder", back_populates="customer")
    relationship("ShoppingCart", back_populates="user", uselist=False) #uselist=False means that the user can only have one shopping cart.
    cart = relationship("ShoppingCart", back_populates="user", uselist=False)
