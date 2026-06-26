import sqlite3
import os

db_path = r"C:\Users\lcbouchard\.gemini\antigravity\conversations\0104241c-cea9-4f5d-814d-d7109a7adad1.db"

if os.path.exists(db_path):
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    
    print("--- trajectory_meta ---")
    cursor.execute("SELECT * FROM trajectory_meta")
    print(cursor.fetchall())
    
    print("--- trajectory_metadata_blob ---")
    cursor.execute("SELECT * FROM trajectory_metadata_blob")
    rows = cursor.fetchall()
    for row in rows:
        print(row[0], len(row[1]) if row[1] else None)
        if row[1]:
            # Print printable parts of the blob
            import re
            printable = re.findall(b'[a-zA-Z0-9_\\-\\s\\.\\:\/\,\?\!]{4,}', row[1])
            print("Printable segments in blob:")
            for p in printable:
                print(f"  - {p.decode('utf-8', errors='ignore')}")
                
    print("--- steps (first 2) ---")
    cursor.execute("SELECT idx, step_type, status FROM steps LIMIT 2")
    print(cursor.fetchall())
    
    conn.close()
