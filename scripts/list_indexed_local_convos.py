import os
import re

pb_path = r"C:\Users\lcbouchard\.gemini\antigravity\agyhub_summaries_proto.pb"
conv_dir = r"C:\Users\lcbouchard\.gemini\antigravity\conversations"

# Read PB
with open(pb_path, 'rb') as f:
    pb_data = f.read()

# Extract UUIDs in index
uuid_pattern = re.compile(br'[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}')
indexed_uuids = set(uuid.decode('utf-8').lower() for uuid in uuid_pattern.findall(pb_data))

# Get local files
all_files = os.listdir(conv_dir)
local_uuids = set()
for f in all_files:
    match = re.match(r'^([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})', f)
    if match:
        local_uuids.add(match.group(1).lower())

indexed_local_uuids = local_uuids.intersection(indexed_uuids)
not_indexed_local_uuids = local_uuids - indexed_uuids

print(f"Local UUIDs: {len(local_uuids)}")
print(f"Indexed UUIDs: {len(indexed_uuids)}")
print(f"Local UUIDs that are indexed: {len(indexed_local_uuids)}")
print(f"Local UUIDs that are NOT indexed: {len(not_indexed_local_uuids)}")

# Let's inspect the names of local UUIDs that are indexed
# We can read the titles from the PB file using regex.
# Let's find each UUID in the PB and look at surrounding bytes to find the title.
def find_title_in_pb(uuid, data):
    uuid_bytes = uuid.encode('utf-8')
    idx = data.find(uuid_bytes)
    if idx == -1:
        return None
    # Let's look at the surrounding area, say 200 bytes before or after.
    # Usually in the summary, the title comes before or after the UUID.
    # Let's extract all printable strings in data[idx-200:idx+200]
    start = max(0, idx - 300)
    end = min(len(data), idx + 300)
    window = data[start:end]
    printable = re.findall(b'[a-zA-Z0-9_\\-\\s\\.\\:\\/\\,\\?\\!]{4,}', window)
    strings = [p.decode('utf-8', errors='ignore').strip() for p in printable]
    # Filter strings
    candidates = []
    for s in strings:
        if len(s) < 4 or uuid in s.lower():
            continue
        if any(x in s for x in ["file://", "http", "git", "Users", "AppData", "master", "main"]):
            continue
        candidates.append(s)
    return candidates

print("\nSample of local conversations that are indexed:")
count = 0
for u in sorted(list(indexed_local_uuids)):
    titles = find_title_in_pb(u, pb_data)
    print(f"UUID: {u} -> Titles: {titles}")
    count += 1
    if count >= 20:
        break
