from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from . import models, database
from pydantic import BaseModel
from typing import List, Optional

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # React's default port
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Database setup
models.Base.metadata.create_all(bind=database.engine)

# Dependency
def get_db():
    db = database.SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Pydantic Models
class MessageResponse(BaseModel):
    message: str

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

class InventoryCreate(InventoryBase):
    pharmacy_id: int

class InventoryResponse(InventoryBase):
    id: int
    pharmacy_id: int
    last_updated: str
    
    class Config:
        orm_mode = True

# Endpoints
@app.get("/", response_model=MessageResponse)
def read_root():
    return {"message": "Welcome to Centralized Pharmacy Inventory System"}

@app.get("/api/health")
def health_check():
    return {"status": "healthy"}

@app.post("/api/pharmacies/", response_model=PharmacyResponse)
def create_pharmacy(pharmacy: PharmacyCreate, db: Session = Depends(get_db)):
    db_pharmacy = models.Pharmacy(**pharmacy.dict())
    db.add(db_pharmacy)
    db.commit()
    db.refresh(db_pharmacy)
    return db_pharmacy

@app.get("/api/pharmacies/", response_model=List[PharmacyResponse])
def read_pharmacies(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    pharmacies = db.query(models.Pharmacy).offset(skip).limit(limit).all()
    return pharmacies


@app.get("/api/inventory/", response_model=List[InventoryResponse])
def read_inventory(
    pharmacy_id: Optional[int] = None, 
    skip: int = 0, 
    limit: int = 100, 
    db: Session = Depends(get_db)
):
    query = db.query(models.InventoryItem)
    if pharmacy_id:
        query = query.filter(models.InventoryItem.pharmacy_id == pharmacy_id)
    items = query.offset(skip).limit(limit).all()
    return items

@app.get("/api/reports/inventory-summary")
def inventory_summary(db: Session = Depends(get_db)):
    summary = db.execute("""
        SELECT 
            p.name as pharmacy_name,
            COUNT(i.id) as item_count,
            SUM(i.quantity) as total_quantity,
            SUM(i.quantity * i.price) as total_value
        FROM pharmacies p
        LEFT JOIN inventory i ON p.id = i.pharmacy_id
        GROUP BY p.id
    """).fetchall()
    
    return [dict(row) for row in summary]