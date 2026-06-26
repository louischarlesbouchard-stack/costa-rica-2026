import re
import os

pb_path = r"C:\Users\lcbouchard\.gemini\antigravity\agyhub_summaries_proto.pb"

if not os.path.exists(pb_path):
    print(f"File not found: {pb_path}")
    exit(1)

with open(pb_path, 'rb') as f:
    data = f.read()

print(f"File size: {len(data)} bytes")

# Let's extract all printable strings of length >= 4
strings = re.findall(b'[a-zA-Z0-9_\\-\\s\\.\\:\\/\\,\\?\\!]{4,}', data)
print(f"Found {len(strings)} printable string segments.")

# Print the first 50 extracted string segments to understand the structure
for s in strings[:100]:
    try:
        decoded = s.decode('utf-8').strip()
        if decoded:
            print(f" - {decoded}")
    except Exception:
        pass
