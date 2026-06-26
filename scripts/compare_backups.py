import os
import re

local_dir = r"C:\Users\lcbouchard\.gemini\antigravity\conversations"
backup_dir = r"K:\9-PROJET AMÉLIORATION\conversations"

def get_uuids(directory):
    if not os.path.exists(directory):
        print(f"Directory not found: {directory}")
        return set(), set(), set()
    all_files = os.listdir(directory)
    db_uuids = set()
    pb_uuids = set()
    for f in all_files:
        match = re.match(r'^([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})', f)
        if match:
            uuid = match.group(1)
            if f.endswith('.db'):
                db_uuids.add(uuid)
            elif f.endswith('.pb'):
                pb_uuids.add(uuid)
    return db_uuids, pb_uuids, db_uuids.union(pb_uuids)

local_db, local_pb, local_all = get_uuids(local_dir)
backup_db, backup_pb, backup_all = get_uuids(backup_dir)

print(f"Local directory: {len(local_all)} unique IDs ({len(local_db)} db, {len(local_pb)} pb)")
print(f"Backup directory: {len(backup_all)} unique IDs ({len(backup_db)} db, {len(backup_pb)} pb)")

in_backup_not_local = backup_all - local_all
in_local_not_backup = local_all - backup_all

print(f"\nDifferences:")
print(f"  - In backup but NOT in local: {len(in_backup_not_local)}")
print(f"  - In local but NOT in backup: {len(in_local_not_backup)}")

if in_backup_not_local:
    print(f"\nSample of UUIDs in backup but NOT local (up to 10):")
    for u in list(in_backup_not_local)[:10]:
        print(f"  - {u}")
