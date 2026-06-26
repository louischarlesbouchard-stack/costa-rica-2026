import json

with open("budget_data.json", "r", encoding="utf-8") as f:
    data = json.load(f)

# Fix J8 activity name to match data.js text
j8_activities = data["itinerary"]["J8"]["activities"]
if j8_activities and "Snorkeling" in j8_activities[0]["name"]:
    j8_activities[0]["name"] = "Full Day: Corcovado - Sirena Ranger Station"

# Add Bateau Retour to J9
j9_activities = data["itinerary"]["J9"]["activities"]
has_bateau = any("Bateau Drake" in act["name"] for act in j9_activities)
if not has_bateau:
    j9_activities.insert(0, {
        "name": "11h30: Bateau Drake -> Sierpe",
        "price": 100
    })

with open("budget_data.json", "w", encoding="utf-8") as f:
    json.dump(data, f, indent=2, ensure_ascii=False)
