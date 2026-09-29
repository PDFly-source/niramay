#!/usr/bin/env python3
"""
NIRAMAY Phase 2.5 Dataset Generator
Expands all 104 existing remedies to 5-8 granular bilingual steps with utensils, heat, durations, serving tips.
Adds 53 brand new symptoms and 106 brand new remedies with 0 duplicates.
Total: 105 symptoms, 210 remedies. All bilingual (en + as) and schema-compliant.
"""

import json
import os

with open('/tmp/symptoms_52.json', 'r') as f:
    existing_symptoms = json.load(f)

with open('/tmp/remedies_104.json', 'r') as f:
    existing_remedies = json.load(f)

print(f"Loaded {len(existing_symptoms)} existing symptoms and {len(existing_remedies)} existing remedies.")
