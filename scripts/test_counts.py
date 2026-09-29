import json
import os
import sys

sys.path.append(os.path.dirname(__file__))
from new_symptoms_data import NEW_SYMPTOMS

with open('/tmp/symptoms_52.json', 'r') as f:
    existing_symptoms = json.load(f)

with open('/tmp/remedies_104.json', 'r') as f:
    existing_remedies = json.load(f)

print(f"Total symptoms will be: {len(existing_symptoms)} + {len(NEW_SYMPTOMS)} = {len(existing_symptoms) + len(NEW_SYMPTOMS)}")
