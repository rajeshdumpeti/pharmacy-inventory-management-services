from sqlalchemy import Column, Integer, String, Float, ForeignKey
from sqlalchemy.orm import relationship
from .database import Base

class Pharmacy(Base):
    __tablename__ = "pharmacies"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    address = Column(String)
    phone = Column(String)
    email = Column(String)
    is_active = Column(Integer, default=1)
    
    inventory = relationship("InventoryItem", back_populates="pharmacy")

class InventoryItem(Base):
    __tablename__ = "inventory"
    
    id = Column(Integer, primary_key=True, index=True)
    pharmacy_id = Column(Integer, ForeignKey("pharmacies.id"))
    name = Column(String, index=True)
    description = Column(String)
    quantity = Column(Integer)
    price = Column(Float)
    last_updated = Column(String)  # Could be DateTime in production
    
    pharmacy = relationship("Pharmacy", back_populates="inventory")

class User(Base):
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True)
    pharmacy_id = Column(Integer, ForeignKey("pharmacies.id"))
    username = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    role = Column(String)  # 'admin', 'manager', 'staff'
    is_active = Column(Integer, default=1)
    
    