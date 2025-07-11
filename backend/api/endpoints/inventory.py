from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ... import models, schemas, database
from datetime import datetime

router = APIRouter()

def get_db():
    db = database.SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/", response_model=list[schemas.InventoryResponse])
def get_inventory(pharmacy_id: int = None, db: Session = Depends(get_db)):
    query = db.query(models.InventoryItem)
    if pharmacy_id:
        query = query.filter(models.InventoryItem.pharmacy_id == pharmacy_id)
    return query.all()

@router.post("/", response_model=schemas.InventoryResponse)
def create_inventory_item(item: schemas.InventoryCreate, db: Session = Depends(get_db)):
    db_item = models.InventoryItem(**item.dict())
    db_item.last_updated = datetime.utcnow()
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item

@router.put("/{item_id}", response_model=schemas.InventoryResponse)
def update_inventory_item(item_id: int, item: schemas.InventoryUpdate, db: Session = Depends(get_db)):
    db_item = db.query(models.InventoryItem).filter(models.InventoryItem.id == item_id).first()
    if not db_item:
        raise HTTPException(status_code=404, detail="Item not found")
    for key, value in item.dict(exclude_unset=True).items():
        setattr(db_item, key, value)
    db_item.last_updated = datetime.utcnow()
    db.commit()
    db.refresh(db_item)
    return db_item

@router.delete("/{item_id}")
def delete_inventory_item(item_id: int, db: Session = Depends(get_db)):
    db_item = db.query(models.InventoryItem).filter(models.InventoryItem.id == item_id).first()
    if not db_item:
        raise HTTPException(status_code=404, detail="Item not found")
    db.delete(db_item)
    db.commit()
    return {"message": "Item deleted successfully"}