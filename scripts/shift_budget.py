import json
import os
import copy

def update_budget(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        data = json.load(f)
        
    itinerary = data.get('itinerary', {})
    
    # Store old J3-J7 data to shift
    old_J4 = itinerary.get('J4')
    old_J5 = itinerary.get('J5')
    old_J6 = itinerary.get('J6')
    old_J7 = itinerary.get('J7')
    old_J3 = itinerary.get('J3')
    
    # J8 becomes old J7
    if old_J7:
        itinerary['J8'] = copy.deepcopy(old_J7)
    
    # J7 becomes old J6
    if old_J6:
        itinerary['J7'] = copy.deepcopy(old_J6)
        
    # J6 becomes old J5
    if old_J5:
        itinerary['J6'] = copy.deepcopy(old_J5)
        
    # J5 becomes old J4
    if old_J4:
        itinerary['J5'] = copy.deepcopy(old_J4)
        
    # J4 becomes old J3
    if old_J3:
        itinerary['J4'] = copy.deepcopy(old_J3)
        
    # J3 becomes new empty template matching La Fortuna
    # We will copy J2 to preserve structure and clear expenses/activites
    j2_templ = itinerary.get('J2')
    new_j3 = copy.deepcopy(j2_templ)
    if new_j3:
        new_j3['activities'] = []
        new_j3['restaurants'] = []
        new_j3['expenses'] = {k: 0 for k in new_j3['expenses']}
        itinerary['J3'] = new_j3
        
    with open(file_path, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=2, ensure_ascii=False)

if __name__ == "__main__":
    update_budget("budget_data.json")
