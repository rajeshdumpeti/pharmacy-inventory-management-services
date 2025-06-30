from sqlalchemy import Column, Integer, String, Float, ForeignKey
from sqlalchemy.orm import relationship
from .database import Base

class Pharmacy(Base):
    __tablename__ = "pharmacies"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
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
    batch_number = Column(String)
    expiry_date = Column(String)
    supplier = Column(String)
    category = Column(String)
    unit = Column(String)
    reorder_level = Column(Integer)
    location = Column(String)
    last_updated = Column(String)
    pharmacy = relationship("Pharmacy", back_populates="inventory")