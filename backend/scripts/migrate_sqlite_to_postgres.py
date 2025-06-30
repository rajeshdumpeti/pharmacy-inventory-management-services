import os
import sqlite3
from app.database import SessionLocal
from app import models

# Dynamically resolve path to SQLite file
base_dir = os.path.dirname(os.path.dirname(__file__))  # -> backend/
sqlite_path = os.path.join(base_dir, "app.db")         # -> backend/app.db
sqlite_conn = sqlite3.connect(sqlite_path)
sqlite_cursor = sqlite_conn.cursor()

# Fetch and migrate pharmacy data
sqlite_cursor.execute("SELECT * FROM pharmacies")
pharmacies = sqlite_cursor.fetchall()

sqlite_cursor.execute("SELECT * FROM inventory")
inventory_items = sqlite_cursor.fetchall()

# Insert into Postgres
db = SessionLocal()
for p in pharmacies:
    db.add(models.Pharmacy(id=p[0], name=p[1], address=p[2], phone=p[3], email=p[4]))

for i in inventory_items:
    db.add(models.Inventory(id=i[0], name=i[1], description=i[2], quantity=i[3], price=i[4], pharmacy_id=i[5]))

db.commit()
db.close()
sqlite_conn.close()

print("✅ Data migrated from SQLite to PostgreSQL")
