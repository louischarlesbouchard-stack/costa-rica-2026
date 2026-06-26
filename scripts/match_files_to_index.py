import os
import re
import glob

pb_path = r"C:\Users\lcbouchard\.gemini\antigravity\agyhub_summaries_proto.pb"
conv_dir = r"C:\Users\lcbouchard\.gemini\antigravity\conversations"

# Read PB data
if os.path.exists(pb_path):
    with open(pb_path, 'rb') as f:
        pb_data = f.read()
else:
    pb_data = b""

# Find all UUIDs in the index
uuid_pattern = re.compile(br'[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}')
indexed_uuids = set(uuid.decode('utf-8') for uuid in uuid_pattern.findall(pb_data))
print(f"Number of UUIDs in index: {len(indexed_uuids)}")

# Get all files in conversations directory
all_files = os.listdir(conv_dir)
db_uuids = set()
pb_uuids = set()
other_files = []

for f in all_files:
    # Match UUID prefix
    match = re.match(r'^([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})', f)
    if match:
        uuid = match.group(1)
        if f.endswith('.db'):
            db_uuids.add(uuid)
        elif f.endswith('.pb'):
            pb_uuids.add(uuid)
    else:
        if f != "agyhub_summaries_proto.pb":
            other_files.append(f)

print(f"Conversations directory has:")
print(f"  - {len(db_uuids)} conversation IDs with .db files")
print(f"  - {len(pb_uuids)} conversation IDs with .pb files")
print(f"  - {len(db_uuids.union(pb_uuids))} unique conversation IDs total in directory")

# Check which ones are in index vs directory
in_dir_not_in_index = db_uuids.union(pb_uuids) - indexed_uuids
in_index_not_in_dir = indexed_uuids - db_uuids.union(pb_uuids)

print(f"\nDiscrepancies:")
print(f"  - UUIDs in directory but NOT in index: {len(in_dir_not_in_index)}")
print(f"  - UUIDs in index but NOT in directory: {len(in_index_not_in_dir)}")

if in_dir_not_in_index:
    print(f"\nSample of UUIDs in directory but NOT in index (up to 10):")
    for u in list(in_dir_not_in_index)[:10]:
        print(f"  - {u}")
