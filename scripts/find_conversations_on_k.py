import os
import re

k_root = "K:\\"
uuid_pattern = re.compile(r'^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\.(db|pb)$', re.IGNORECASE)

print(f"Searching for conversation files on {k_root}...")

found_dirs = {}

# We will traverse K:\ but ignore certain common large or system folders if any
for root, dirs, files in os.walk(k_root):
    # Skip hidden/system directories
    dirs[:] = [d for d in dirs if not d.startswith('.') and not d.startswith('$')]
    
    # Check files in this directory
    for f in files:
        if uuid_pattern.match(f):
            found_dirs[root] = found_dirs.get(root, 0) + 1

print("\nSearch results:")
if not found_dirs:
    print("No conversation files found on K: drive.")
else:
    for path, count in found_dirs.items():
        print(f"Directory: {path} -> {count} conversation files")
