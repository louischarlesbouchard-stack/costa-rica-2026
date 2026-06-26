import re
import os

def analyze_file(path):
    if not os.path.exists(path):
        print(f"File not found: {path}")
        return
    with open(path, 'rb') as f:
        data = f.read()
    
    print(f"\n==================================================")
    print(f"Analyzing: {path}")
    print(f"File size: {len(data)} bytes")
    
    # Let's find all UUIDs
    uuid_pattern = re.compile(br'[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}')
    uuids = uuid_pattern.findall(data)
    unique_uuids = sorted(list(set(uuids)))
    print(f"Total UUIDs found: {len(uuids)}")
    print(f"Unique UUIDs found: {len(unique_uuids)}")
    
    # Let's find conversation titles.
    # Usually in protobuf, a string field is preceded by a length byte.
    # Let's extract printable ASCII strings of length >= 4
    printable = re.compile(br'[a-zA-Z0-9_\-\s\.\:\/\,\?\!]{4,}')
    all_strings = [s.decode('utf-8', errors='ignore').strip() for s in printable.findall(data)]
    all_strings = [s for s in all_strings if s]
    
    # Filter for things that look like conversation titles (e.g. not paths, not UUIDs, not git urls)
    titles = []
    for s in all_strings:
        if len(s) < 4:
            continue
        if uuid_pattern.match(s.encode('utf-8')):
            continue
        if "file://" in s or "http" in s or "git" in s or "Users" in s or "AppData" in s:
            continue
        if s in ["master", "main", "my_fixes", "iJW", " Costa", "Steph"]:
            continue
        titles.append(s)
        
    unique_titles = sorted(list(set(titles)))
    print(f"Some detected titles (sample of 15):")
    for t in unique_titles[:15]:
        print(f"  - {t}")
    print(f"Total unique titles detected: {len(unique_titles)}")

analyze_file(r"C:\Users\lcbouchard\.gemini\antigravity\agyhub_summaries_proto.pb")
analyze_file(r"C:\Users\lcbouchard\.gemini\antigravity\conversations\agyhub_summaries_proto.pb")
analyze_file(r"C:\Users\lcbouchard\.gemini\antigravity\brain\agyhub_summaries_proto.pb")
analyze_file(r"K:\9-PROJET AMÉLIORATION\agyhub_summaries_proto.pb")
