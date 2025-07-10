from fastapi import FastAPI, Depends, HTTPException, Body
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import text  # <-- Add this import
from sqlalchemy.orm import Session
from sqlalchemy.orm import joinedload
from . import models, database
from pydantic import BaseModel
from typing import List, Optional
from .schemas import InventoryUpdate
from datetime import datetime
from app.models import Base
from app.database import engine


app = FastAPI()
# Database setup
Base.metadata.create_all(bind=engine)

# Middleware for CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",  # Local React dev server
        "https://pharmacy-frontend-sanj.onrender.com"  # Deployed frontend
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


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
    batch_number: str = ""
    expiry_date: str = ""
    supplier: str = ""
    category: str = ""
    unit: str = ""
    reorder_level: int = 0
    location: str = ""

class InventoryCreate(InventoryBase):
    pharmacy_id: int

class InventoryResponse(InventoryBase):
    id: int
    pharmacy_id: int
    last_updated: Optional[str]  # <-- allow None

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
def get_inventory(pharmacy_id: Optional[int] = None, db: Session = Depends(get_db)):
    query = db.query(models.InventoryItem)
    if pharmacy_id:
        query = query.filter(models.InventoryItem.pharmacy_id == pharmacy_id)
    return query.all()

# POST endpoint for creating inventory
@app.post("/api/inventory/", response_model=InventoryResponse)
def create_inventory_item(item: InventoryCreate, db: Session = Depends(get_db)):
    db_item = models.InventoryItem(**item.dict())
    db_item.last_updated = datetime.utcnow()  # <-- Ensure this line is present
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item

@app.get("/api/reports/inventory-summary")
def inventory_summary(db: Session = Depends(get_db)):
    try:
        summary = db.execute(
            text(
                """
                SELECT 
                    p.name as pharmacy_name,
                    COUNT(i.id) as item_count,
                    COALESCE(SUM(i.quantity), 0) as total_quantity,
                    COALESCE(SUM(i.quantity * i.price), 0) as total_value
                FROM pharmacies p
                LEFT JOIN inventory i ON p.id = i.pharmacy_id
                GROUP BY p.id, p.name
                """
            )
        ).fetchall()
        # Convert SQLAlchemy Row objects to dicts
        return [
            {
                "pharmacy_name": row.pharmacy_name,
                "item_count": row.item_count,
                "total_quantity": row.total_quantity,
                "total_value": float(row.total_value),
            }
            for row in summary
        ]
    except Exception as e:
        print("Error generating report:", e)
        raise HTTPException(status_code=500, detail=f"Error generating report: {e}")
        
# Add these new endpoints
@app.put("/api/pharmacies/{pharmacy_id}", response_model=PharmacyResponse)
def update_pharmacy(
    pharmacy_id: int,
    name: str = Body(None),
    address: str = Body(None),
    phone: str = Body(None),
    email: str = Body(None),
    db: Session = Depends(get_db)
):
    db_pharmacy = db.query(models.Pharmacy).filter(models.Pharmacy.id == pharmacy_id).first()
    if not db_pharmacy:
        raise HTTPException(status_code=404, detail="Pharmacy not found")
    
    if name is not None: db_pharmacy.name = name
    if address is not None: db_pharmacy.address = address
    if phone is not None: db_pharmacy.phone = phone
    if email is not None: db_pharmacy.email = email
    
    db.commit()
    db.refresh(db_pharmacy)
    return db_pharmacy

@app.delete("/api/pharmacies/{pharmacy_id}")
def delete_pharmacy(pharmacy_id: int, db: Session = Depends(get_db)):
    db_pharmacy = db.query(models.Pharmacy).filter(models.Pharmacy.id == pharmacy_id).first()
    if not db_pharmacy:
        raise HTTPException(status_code=404, detail="Pharmacy not found")
    
    db.delete(db_pharmacy)
    db.commit()
    return {"message": "Pharmacy deleted successfully"}

@app.put("/api/inventory/{item_id}", response_model=InventoryResponse)
def update_inventory_item(item_id: int, item: InventoryUpdate, db: Session = Depends(get_db)):
    db_item = db.query(models.InventoryItem).filter(models.InventoryItem.id == item_id).first()
    if not db_item:
        raise HTTPException(status_code=404, detail="Item not found")
    
    for key, value in item.dict(exclude_unset=True).items():
        setattr(db_item, key, value)
    db_item.last_updated = datetime.utcnow()  # <-- Always update timestamp!
    
    db.commit()
    db.refresh(db_item)
    return db_item

@app.delete("/api/inventory/{item_id}")
def delete_inventory_item(item_id: int, db: Session = Depends(get_db)):
    db_item = db.query(models.InventoryItem).filter(models.InventoryItem.id == item_id).first()
    if not db_item:
        raise HTTPException(status_code=404, detail="Item not found")
    
    db.delete(db_item)
    db.commit()
    return {"message": "Item deleted successfully"}

@app.get("/api/reports/monthly-summary")
def monthly_summary(db: Session = Depends(get_db)):
    """
    Returns a list of months and total inventory value for each month.
    Assumes 'last_updated' is a datetime column in inventory table.
    """
    try:
        result = db.execute(
            text("""
               SELECT 
                    strftime('%Y-%m', i.last_updated) as month,
                    COALESCE(SUM(i.quantity * i.price), 0) as total_value
                FROM inventory i
                GROUP BY month
                ORDER BY month
            """)
        ).fetchall()
        return [
            {
                "month": row.month,
                "total_value": float(row.total_value)
            }
            for row in result if row.month is not None
        ]
    except Exception as e:
        print("Error generating monthly report:", e)
        raise HTTPException(status_code=500, detail=f"Error generating monthly report: {e}")

