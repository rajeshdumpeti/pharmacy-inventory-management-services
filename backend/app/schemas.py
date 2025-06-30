from pydantic import BaseModel
from typing import Optional

class PharmacyBase(BaseModel):
    name: str
    address: str
    phone: str
    email: str

class PharmacyCreate(PharmacyBase):
    pass

class PharmacyResponse(PharmacyBase):
    id: int
    is_active: int
    class Config:
        orm_mode = True

class InventoryBase(BaseModel):
    name: str
    description: str
    quantity: int
    price: float
    batch_number: str = ""
    expiry_date: str = ""
    supplier: str = ""
    category: str = ""
    unit: str = ""
    reorder_level: int = 0
    location: str = ""

class InventoryCreate(InventoryBase):
    pharmacy_id: int

class InventoryUpdate(BaseModel):
    name: Optional[str]
    description: Optional[str]
    quantity: Optional[int]
    price: Optional[float]
    batch_number: Optional[str]
    expiry_date: Optional[str]
    supplier: Optional[str]
    category: Optional[str]
    unit: Optional[str]
    reorder_level: Optional[int]
    location: Optional[str]

class InventoryResponse(InventoryBase):
    id: int
    pharmacy_id: int
    last_updated: Optional[str]
    class Config:
        orm_mode = True

class MessageResponse(BaseModel):
    message: str