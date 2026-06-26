import os
import glob
import sqlite3
import re

conv_dir = r"C:\Users\lcbouchard\.gemini\antigravity\conversations"
db_files = glob.glob(os.path.join(conv_dir, "*.db"))
pb_files = glob.glob(os.path.join(conv_dir, "*.pb"))

print(f"Total .db files: {len(db_files)}")
print(f"Total .pb files: {len(pb_files)}")

# Let's inspect one .db file schema
if db_files:
    db_path = db_files[0]
    print(f"\nInspecting SQLite schema for: {os.path.basename(db_path)}")
    try:
        conn = sqlite3.connect(db_path)
        cursor = conn.cursor()
        cursor.execute("SELECT name FROM sqlite_master WHERE type='table';")
        tables = cursor.fetchall()
        print(f"Tables: {tables}")
        for table in tables:
            table_name = table[0]
            cursor.execute(f"PRAGMA table_info({table_name});")
            info = cursor.fetchall()
            print(f"Table {table_name} schema:")
            for col in info:
                print(f"  {col[1]} ({col[2]})")
        conn.close()
    except Exception as e:
        print(f"Error reading DB: {e}")

# Let's see what is inside a .pb file by searching for text
if pb_files:
    pb_path = pb_files[0]
    print(f"\nInspecting .pb file: {os.path.basename(pb_path)}")
    try:
        with open(pb_path, 'rb') as f:
            data = f.read(1000)
        printable = re.findall(b'[a-zA-Z0-9_\\-\\s\\.\\:\\/\\,\\?\\!]{4,}', data)
        print("Sample strings from .pb file:")
        for s in printable[:10]:
            print(f"  - {s.decode('utf-8', errors='ignore').strip()}")
    except Exception as e:
        print(f"Error reading PB: {e}")
