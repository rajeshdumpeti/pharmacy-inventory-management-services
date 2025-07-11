from fastapi import APIRouter, Depends, HTTPException, Body
from sqlalchemy.orm import Session
from ... import models, schemas, database

router = APIRouter()

def get_db():
    db = database.SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/", response_model=schemas.PharmacyResponse)
def create_pharmacy(pharmacy: schemas.PharmacyCreate, db: Session = Depends(get_db)):
    db_pharmacy = models.Pharmacy(**pharmacy.dict())
    db.add(db_pharmacy)
    db.commit()
    db.refresh(db_pharmacy)
    return db_pharmacy

@router.get("/", response_model=list[schemas.PharmacyResponse])
def read_pharmacies(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return db.query(models.Pharmacy).offset(skip).limit(limit).all()

@router.put("/{pharmacy_id}", response_model=schemas.PharmacyResponse)
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

@router.delete("/{pharmacy_id}")
def delete_pharmacy(pharmacy_id: int, db: Session = Depends(get_db)):
    db_pharmacy = db.query(models.Pharmacy).filter(models.Pharmacy.id == pharmacy_id).first()
    if not db_pharmacy:
        raise HTTPException(status_code=404, detail="Pharmacy not found")
    db.delete(db_pharmacy)
    db.commit()
    return {"message": "Pharmacy deleted successfully"}