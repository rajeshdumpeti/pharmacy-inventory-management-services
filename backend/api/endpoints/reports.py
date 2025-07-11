from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import text
from ... import database

router = APIRouter()

def get_db():
    db = database.SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/inventory-summary")
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

@router.get("/monthly-summary")
def monthly_summary(db: Session = Depends(get_db)):
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