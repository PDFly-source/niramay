#!/usr/bin/env python3
import json
import os
import sys

sys.path.append(os.path.dirname(__file__))
from new_symptoms_data import NEW_SYMPTOMS
from create_new_remedies import generate_new_remedies

with open('/tmp/symptoms_52.json', 'r') as f:
    existing_symptoms = json.load(f)

with open('/tmp/remedies_104.json', 'r') as f:
    existing_remedies = json.load(f)

print(f"Loaded existing: {len(existing_symptoms)} symptoms, {len(existing_remedies)} remedies.")
print(f"Loaded new: {len(NEW_SYMPTOMS)} symptoms.")

# 1. SPICE & INGREDIENT TRANSLATION DICTIONARY
INGREDIENT_AS_MAP = {
    "ginger": "কেঁচা আদা (Ginger)",
    "ajwain": "জৱাইন (Ajwain)",
    "tulsi": "তুলসী পাত (Tulsi)",
    "pepper": "জালুক (Black pepper)",
    "jaluk": "জালুক (Black pepper)",
    "honey": "বিশুদ্ধ মৌজোল (Honey)",
    "mou": "বিশুদ্ধ মৌজোল (Honey)",
    "turmeric": "কেঁচা বা শুকান হালধি (Turmeric)",
    "haldi": "হালধি (Turmeric)",
    "cumin": "জীৰা (Jeera)",
    "jeera": "জীৰা (Jeera)",
    "lemon": "কাজী নেমু (Assam Lemon)",
    "nemu": "কাজী নেমু (Assam Lemon)",
    "black salt": "ক'লা নিমখ (Black Salt)",
    "rock salt": "সৈন্ধৱ নিমখ (Rock Salt)",
    "salt": "নিমখ (Salt)",
    "nimokh": "নিমখ (Salt)",
    "fennel": "মৌৰি গুটি (Fennel)",
    "mouri": "মৌৰি গুটি (Fennel)",
    "sugar": "মিচিৰি বা শিল চেনি (Rock Sugar)",
    "mishri": "মিচিৰি বা শিল চেনি (Rock Sugar)",
    "clove": "লং (Clove)",
    "long": "লং (Clove)",
    "cardamom": "ইলাচী (Cardamom)",
    "elaichi": "ইলাচী (Cardamom)",
    "cinnamon": "দালচেনি (Cinnamon)",
    "dalcheni": "দালচেনি (Cinnamon)",
    "mustard oil": "বিশুদ্ধ মিঠা তেল (Mustard Oil)",
    "mitha tel": "বিশুদ্ধ মিঠা তেল (Mustard Oil)",
    "garlic": "নহৰু (Garlic)",
    "nohoru": "নহৰু (Garlic)",
    "ghee": "খাঁটি গৰুৰ ঘিউ (Pure Cow Ghee)",
    "mint": "পদিনা পাত (Mint Leaves)",
    "podina": "পদিনা পাত (Mint Leaves)",
    "coriander": "ধনিয়া গুটি বা পাত (Coriander)",
    "dhania": "ধনিয়া গুটি (Coriander)",
    "fenugreek": "মেথি গুটি (Fenugreek)",
    "methi": "মেথি গুটি (Fenugreek)",
    "nutmeg": "জয়ফল (Nutmeg)",
    "jaiphal": "জয়ফল (Nutmeg)",
    "curd": "তৰল বা ঘৰুৱা দৈ (Curd)",
    "yogurt": "তৰল বা ঘৰুৱা দৈ (Curd)",
    "pomegranate": "ডালিমৰ বাকলি বা ৰস (Pomegranate)",
    "coconut oil": "বিশুদ্ধ নাৰিকল তেল (Coconut Oil)",
    "camphor": "ভোজ্য বা শুদ্ধ কৰ্পূৰ (Camphor)",
    "water": "পানী (Water)",
    "milk": "গাখীৰ (Cow's Milk)",
    "aloe vera": "চালকুঁৱৰীৰ সতেজ জেল (Aloe Vera)",
    "rose water": "বিশুদ্ধ গোলাপ জল (Rose Water)",
    "licorice": "যষ্টিমধুৰ গুড়ি (Licorice)",
    "jestimadhu": "যষ্টিমধুৰ গুড়ি (Licorice)",
    "triphala": "ত্ৰিফলা চূৰ্ণ (Triphala)",
    "ashwagandha": "অশ্বগন্ধা (Ashwagandha)",
    "amla": "আমলখি (Amla)",
    "brahmi": "ব্ৰাহ্মী শাক (Brahmi)",
    "neem": "নিম পাত (Neem Leaves)",
    "curry": "নৰসিংহ পাত (Curry Leaves)",
    "sesame": "তিলৰ তেল বা গুটি (Sesame)",
    "castor": "এৰা তেল (Castor Oil)",
    "cucumber": "সতেজ তিয়ঁহ (Cucumber)",
    "jaggery": "পুৰণি বা শুদ্ধ গুড় (Jaggery)",
    "gur": "শুদ্ধ গুড় (Jaggery)",
    "sandalwood": "ৰক্ত বা শ্বেত চন্দন (Sandalwood)",
    "alum": "ফটকিৰি (Alum)",
    "malai": "গাখীৰৰ সৰ (Milk Cream)"
}

def get_assamese_ingredient(item_en):
    item_lower = item_en.lower()
    for key, val in INGREDIENT_AS_MAP.items():
        if key in item_lower:
            return val
    return item_en + " (প্ৰয়োজনীয় উপাদান)"

def get_assamese_qty(qty_en):
    q = qty_en
    q = q.replace("tsp", "চাহ চামুচ").replace("tbsp", "ডাঙৰ চামুচ")
    q = q.replace("cups", "কাপ").replace("cup", "কাপ")
    q = q.replace("pinch", "চিকুট").replace("drops", "টোপাল").replace("drop", "টোপাল")
    q = q.replace("inch", "ইঞ্চি").replace("slices", "টুকুৰা").replace("slice", "টুকুৰা")
    q = q.replace("crushed", "থেতেলিয়াই লোৱা").replace("powder", "গুড়ি")
    q = q.replace("warm", "কুহুমীয়া").replace("water", "পানী")
    q = q.replace("leaves", "পাত").replace("pieces", "টুকুৰা")
    q = q.replace("1/2", "১/২").replace("1/4", "১/৪").replace("3/4", "৩/৪")
    q = q.replace("1", "১").replace("2", "২").replace("3", "৩").replace("4", "৪").replace("5", "৫")
    return q

def enhance_existing_remedy(r):
    name_en = r["name"]
    name_as = r.get("name_assamese", name_en)
    symptom_en = r["symptom"]

    new_steps = [
        {
            "en": "Carefully inspect and measure all fresh ingredients. Lightly crush root spices using a clean stone mortar and pestle to rupture the essential oil cells.",
            "as": "সকলো কেঁচা উপাদান পৰিষ্কাৰকৈ জুখি লওক। মছলাৰ প্ৰাকৃতিক সুবাস আৰু গুণ ওলাই আহিবলৈ এটা শিলৰ পটা বা উৰালত লঘুভাৱে থেতেলিয়াই লওক।"
        }
    ]

    if any(k in name_en.lower() for k in ["oil", "massage", "liniment", "rub"]):
        new_steps.append({
            "en": "In a small heavy-bottomed stainless steel pan or iron ladle, pour the base oil and heat over very gentle low flame for 2 minutes.",
            "as": "এখন সৰু গধুৰ তলিৰ ষ্টেইনলেছ ষ্টিলৰ কেৰাহী বা লোৰ হেতাত তেলখিনি লৈ একেবাৰে মৃদু জুইত ২ মিনিটৰ বাবে সামান্য গৰম হ'বলৈ দিয়ক।"
        })
    elif any(k in name_en.lower() for k in ["cold", "infusion", "soak", "juice", "shorbat"]):
        new_steps.append({
            "en": "Take a clean sterilized glass container or clay earthen cup and add filtered room-temperature water or base liquid.",
            "as": "এটা পৰিষ্কাৰ কাঁচৰ বাটি বা মাটিৰ পাত্ৰত সাধাৰণ উষ্ণতাৰ পৰিশোধিত পানী বা তৰলখিনি লওক।"
        })
    else:
        new_steps.append({
            "en": "In a clean stainless steel saucepan, add the measured water and bring it to an active, rolling boil over medium-high flame.",
            "as": "এটা পৰিষ্কাৰ ষ্টেইনলেছ ষ্টিলৰ চচপেনত নিৰ্ধাৰিত জোখৰ পানীখিনি লৈ মধ্যমীয়া জুইত ভালদৰে উতলিবলৈ দিয়ক।"
        })

    new_steps.append({
        "en": "Introduce the crushed herbs and spices into the vessel. Immediately reduce the heat to a gentle simmer and let the bioactive compounds infuse for 4 to 5 minutes undisturbed.",
        "as": "থেতেলিয়াই লোৱা মছলা আৰু উপাদানসমূহ পাত্ৰত দিয়ক। লগে লগে জুইৰ উত্তাপ কমাই মৃদুভাৱে ৪-৫ মিনিট উতলিবলৈ দি মছলাৰ গুণ পানীত সম্পূৰ্ণৰূপে মিলিবলৈ দিয়ক।"
    })

    new_steps.append({
        "en": "Turn off the heat. Pour the liquid through a fine wire-mesh stainless steel strainer or clean muslin cloth into a heat-safe drinking cup to separate all coarse residue.",
        "as": "জুই বন্ধ কৰক। এটা মিহি ষ্টেইনলেছ ষ্টিলৰ চালনী বা পৰিষ্কাৰ কাপোৰেৰে চেকি সকলো ডাঠ অংশ আঁতৰাই কাঁচৰ বা মাটিৰ কাপত ক্বাথখিনি বাকি লওক।"
    })

    new_steps.append({
        "en": "Allow the mixture to cool to a soothing lukewarm drinking temperature. Stir in any finishing touches like raw honey, fresh lemon juice, or rock salt as specified.",
        "as": "মিশ্ৰণটো মুখত সহিব পৰা কুহুমীয়া অৱস্থালৈ জুৰাবলৈ দিয়ক। ইয়াৰ পিছত প্ৰয়োজন অনুযায়ী নেমুৰ ৰস, মৌজোল বা ক'লা নিমখ চামুচেৰে ভালদৰে লৰাই মিহলাওক।"
    })

    if any(k in name_en.lower() for k in ["oil", "massage", "liniment", "rub"]):
        new_steps.append({
            "en": "Apply the pleasantly warm preparation directly onto the clean affected area with rhythmic, gentle strokes for 5-7 minutes. Wipe excess with a soft dry cloth.",
            "as": "সহ্য কৰিব পৰা কুহুমীয়া অৱস্থাত পৰিষ্কাৰ আঙুলিৰে প্ৰভাৱিত অংশত ৫-৭ মিনিট লঘুভাৱে মালিচ কৰক। অতিৰিক্ত তেল কোমল কাপোৰেৰে মচি পেলাওক।"
        })
    elif any(k in name_en.lower() for k in ["gargle", "rinse"]):
        new_steps.append({
            "en": "Take a measured mouthful of the lukewarm infusion into the mouth. Gargle or swish thoroughly for 45-60 seconds, reach the deep throat, and spit out completely.",
            "as": "কুহুমীয়া ক্বাথখিনি মুখেৰে লৈ ডিঙিৰ গভীৰলৈ যোৱাকৈ ৪৫-৬০ চেকেণ্ড ভালদৰে কুলকুলি বা গাৰ্গল কৰক আৰু সম্পূৰ্ণৰূপে পেলাই দিয়ক।"
        })
    else:
        new_steps.append({
            "en": "Sip slowly in small, measured mouthfuls while pleasantly lukewarm, ideally 20 to 30 minutes following meals. Remain seated in an upright posture for 15 minutes.",
            "as": "উপচাৰখিনি কুহুমীয়া অৱস্থাত লাহে লাহে সৰু সৰু চুমুক দি খাওক। খোৱাৰ ২০-৩০ মিনিট পিছত খোৱাটো উত্তম। খোৱাৰ পিছত ১৫ মিনিট পোন হৈ বহক।"
        })

    tip_en = "Grandmother's Tip: Simmering covered preserves the volatile natural oils; never add raw honey to boiling liquids as extreme heat degrades beneficial enzymes."
    tip_as = "আইতাৰ দিহা: ঢাকনি মাৰি সিজালে মছলাৰ প্ৰাকৃতিক তেল আৰু সুবাস বাহিৰ ওলাই নাযায়। উতলি থকা গৰম পানীত কেতিয়াও মৌ নিদিব।"

    dosage_orig = r.get("dosage", {})
    child_en = dosage_orig.get("child", "Not recommended under 5 yrs. For ages 6-12: 1-2 tsp diluted in warm water once daily.")
    adult_en = dosage_orig.get("adult", "1 standard cup (150ml) sipped slowly 20-30 min after meals, max twice daily.")
    elderly_en = dosage_orig.get("elderly", "1/2 cup once daily after lunch. Monitor with existing digestive medications.")

    dosage_obj = {
        "child": {"en": child_en, "as": "৫ বছৰৰ তলৰ শিশুৰ বাবে নহয়। ৬-১২ বছৰৰ বাবে ১-২ চামুচ কুহুমীয়া পানীত দিনত এবাৰ।"},
        "adult": {"en": adult_en, "as": "১ মজলীয়া কাপ আহাৰৰ ২০-৩০ মিনিট পিছত লাহে লাহে চুমুক দি দিনত দুবাৰ।"},
        "elderly": {"en": elderly_en, "as": "১/২ কাপ দুপৰীয়াৰ আহাৰৰ পিছত দিনত এবাৰ। নিয়মীয়া ঔষধ থাকিলে সাৱধানতা লব।"}
    }

    new_ingredients = []
    for ing in r.get("ingredients", []):
        item_en = ing.get("item", "")
        qty_en = ing.get("qty", "")
        new_ingredients.append({
            "item": {"en": item_en, "as": get_assamese_ingredient(item_en)},
            "item_assamese": get_assamese_ingredient(item_en),
            "qty": {"en": qty_en, "as": get_assamese_qty(qty_en)},
            "qty_assamese": get_assamese_qty(qty_en)
        })

    new_dos = []
    for d in r.get("dos", ["Drink lukewarm, not hot", "Take 20 minutes after meals"]):
        new_dos.append({"en": d, "as": f"কুহুমীয়া অৱস্থাত নিয়মীয়াকৈ গ্ৰহণ কৰক ({d})"})

    new_donts = []
    for d in r.get("donts", ["Don't drink on an empty stomach", "Don't exceed 2 cups per day"]):
        new_donts.append({"en": d, "as": f"খালী পেটত বা জোখতকৈ অধিক নলব ({d})"})

    new_red_flags = []
    for rf in r.get("redFlags", ["Severe crushing pain or bleeding", "High fever"]):
        new_red_flags.append({"en": rf, "as": f"জৰুৰী সতৰ্কবাণী: {rf} অনুভৱ হ'লে পলম নকৰি চিকিৎসকৰ পৰামৰ্শ লওক।"})

    cult_en = r.get("culturalContext", "Traditional Assamese household preparation cherished for generations.")
    cult_as = "অসমীয়া ঘৰুৱা আৰু পৰম্পৰাগত চিকিৎসাত এই বিধ উপচাৰ যুগ যুগ ধৰি বিশ্বাসেৰে ব্যৱহাৰ হৈ আহিছে।"

    return {
        "id": r["id"],
        "symptom": {"en": symptom_en, "as": r.get("name_assamese", symptom_en)},
        "symptom_assamese": r.get("name_assamese", symptom_en),
        "symptomSlug": r.get("symptomSlug", ""),
        "name": {"en": name_en, "as": name_as},
        "name_assamese": name_as,
        "ingredients": new_ingredients,
        "prepTimeMinutes": r.get("prepTimeMinutes", 10),
        "steps": new_steps,
        "dosage": dosage_obj,
        "dos": new_dos,
        "donts": new_donts,
        "redFlags": new_red_flags,
        "tip": {"en": tip_en, "as": tip_as},
        "culturalContext": {"en": cult_en, "as": cult_as},
        "primarySpice": r.get("primarySpice", "Ginger (Aada)"),
        "difficulty": r.get("difficulty", "Easy"),
        "suitableTime": {"en": r.get("suitableTime", "After meals"), "as": "আহাৰ গ্ৰহণৰ পিছত"}
    }

print("Enhancing 104 existing remedies...")
enhanced_existing_remedies = [enhance_existing_remedy(r) for r in existing_remedies]

print("Generating 106 new remedies...")
new_remedies = generate_new_remedies(NEW_SYMPTOMS, get_assamese_ingredient, get_assamese_qty)

all_remedies = enhanced_existing_remedies + new_remedies
print(f"Total remedies: {len(all_remedies)}")

# Merge symptoms
all_symptom_taxonomies = []
for s in existing_symptoms:
    all_symptom_taxonomies.append(s)

for s in NEW_SYMPTOMS:
    all_symptom_taxonomies.append(s)

print(f"Total symptom taxonomies: {len(all_symptom_taxonomies)}")

# Build symptomCategories groups
category_map = {
    "digestive": {
        "id": "digestive",
        "label": "Digestive",
        "label_assamese": "পাচন তন্ত্ৰ আৰু পেটৰ সমস্যা",
        "description": "Soothing carminatives, cooling infusions, and digestive tonics for stomach and intestinal balance.",
        "description_assamese": "পেটৰ অমলপিত্ত, গেছ, বদহজম আৰু অন্যান্য পাচন সমস্যাৰ বাবে প্ৰাকৃতিক বনৌষধি আৰু কাঢ়া।",
        "symptoms": []
    },
    "respiratory": {
        "id": "respiratory",
        "label": "Respiratory & Cold",
        "label_assamese": "শ্বাস-প্ৰশ্বাস আৰু চৰ্দি-কাহ",
        "description": "Traditional warming kadha, chest rubs, and herbal vapors for upper respiratory relief.",
        "description_assamese": "চৰ্দি, কাহ, ডিঙিৰ বিষ আৰু বন্ধ নাকৰ পৰা উপশম পাবলৈ ঘৰুৱা চাহ আৰু ভাপৰ উপচাৰ।",
        "symptoms": []
    },
    "pain": {
        "id": "pain",
        "label": "Pain & Muscle Relief",
        "label_assamese": "বিষ আৰু মাংসপেশীৰ উপশম",
        "description": "Warming liniments, herbal compresses, and anti-inflammatory pastes for joint and body ache.",
        "description_assamese": "গাঁঠিৰ বিষ, পিঠিৰ বিষ, ডিঙি জঠৰ হোৱা আৰু মাংসপেশীৰ টানৰ বাবে তেল মালিচ আৰু সেক।",
        "symptoms": []
    },
    "skin": {
        "id": "skin",
        "label": "Skin, Hair & External Care",
        "label_assamese": "ছাল, চুলি আৰু বাহ্যিক যত্ন",
        "description": "Cooling topical poultices, antimicrobial rinses, and herbal oils for dermatological comfort.",
        "description_assamese": "চুলি সৰা, ঘামচি, মুখৰ ঘা, গোৰোহা ফটা আৰু ছালৰ ৰুক্ষতা দূৰ কৰিবলৈ প্ৰাকৃতিক প্ৰলেপ।",
        "symptoms": []
    },
    "wellness": {
        "id": "wellness",
        "label": "General Wellness & Sleep",
        "label_assamese": "সামগ্ৰিক স্বাস্থ্য আৰু নিদ্ৰা",
        "description": "Restorative herbal teas, calming evening milk drafts, and vitality balancers.",
        "description_assamese": "টোপনিৰ বিজুতি, মানসিক ক্লান্তি, চকুৰ অৱসাদ আৰু মহিলাই মাহেকীয়াত ভোগা সমস্যাৰ উপশম।",
        "symptoms": []
    },
    "seasonal": {
        "id": "seasonal",
        "label": "Seasonal & Weather Care",
        "label_assamese": "ঋতু আৰু বতৰজনিত যত্ন",
        "description": "Targeted kitchen comforts for summer heat exhaustion, winter chills, and environmental changes.",
        "description_assamese": "গৰমৰ ক্লান্তি, শীতৰ হাত-ভৰি ঠাণ্ডা হোৱা আৰু বাৰিষাৰ সেমেকা বতাহৰ বাবে উপচাৰ।",
        "symptoms": []
    },
    "children": {
        "id": "children",
        "label": "Gentle Pediatric & Senior Care",
        "label_assamese": "শিশু আৰু বয়োজ্যেষ্ঠৰ যত্ন",
        "description": "Extra gentle, age-appropriate kitchen comforts with strict safety caveats.",
        "description_assamese": "শিশুৰ মৃদু চৰ্দি, দাঁত গজাৰ অস্বস্তি আৰু বয়োজ্যেষ্ঠৰ গাঁঠিৰ শীতলতাৰ বাবে অতি কোমল উপচাৰ।",
        "symptoms": []
    }
}

for s in all_symptom_taxonomies:
    cid = s.get("categoryId", "digestive")
    if cid not in category_map:
        cid = "wellness"
    category_map[cid]["symptoms"].append({
        "id": s["slug"],
        "label": s["title"],
        "label_assamese": s["assameseTitle"]
    })

symptom_categories_grouped = list(category_map.values())

# Write lib/data/symptoms.ts
symptoms_ts = f"""import {{ SymptomCategory as SymptomCategoryType, SymptomCategorySchema, SymptomCategoryGroup }} from "@/lib/schema";

export interface SymptomCategory {{
  id: string;
  label: string;
  label_assamese?: string;
  description?: string;
  description_assamese?: string;
  symptoms: {{ id: string; label: string; label_assamese?: string }}[];
}}

export const symptomCategories: SymptomCategory[] = {json.dumps(symptom_categories_grouped, indent=2, ensure_ascii=False)};

export const SYMPTOM_CATEGORIES: SymptomCategoryType[] = {json.dumps(all_symptom_taxonomies, indent=2, ensure_ascii=False)};

export const LEGACY_SLUG_MAP: Record<string, string> = {{
  "cough-cold": "common-cold",
  "indigestion-gas": "bloating-gas",
  "headache": "headache-tension",
  "blocked-nose-sinus": "nasal-congestion",
  "nausea-motion-sickness": "nausea",
  "joint-muscle-pain": "joint-pain",
  "insomnia-sleep": "insomnia",
  "skin-minor": "acne-mild",
  "weak-immunity": "low-immunity",
}};

export function resolveSymptomSlug(slug: string): string {{
  return LEGACY_SLUG_MAP[slug] || slug;
}}
"""

with open('lib/data/symptoms.ts', 'w') as f:
    f.write(symptoms_ts)

print("Wrote lib/data/symptoms.ts successfully.")

# Write lib/data/remedies.ts
remedies_ts = f"""import {{ Remedy, RemedySchema }} from "@/lib/schema";

export const REMEDIES: Remedy[] = {json.dumps(all_remedies, indent=2, ensure_ascii=False)};

// Fast indexed lookups
export const REMEDIES_BY_ID = new Map<string, Remedy>(
  REMEDIES.map((r) => [r.id, r])
);

export function getRemediesForSymptom(symptomSlug: string): Remedy[] {{
  return REMEDIES.filter(
    (r) => r.symptomSlug === symptomSlug
  );
}}

// Runtime schema check in non-production
if (process.env.NODE_ENV !== "production") {{
  try {{
    REMEDIES.forEach((remedy) => RemedySchema.parse(remedy));
  }} catch (err) {{
    console.error("Zod Remedy Validation Error:", err);
  }}
}}
"""

with open('lib/data/remedies.ts', 'w') as f:
    f.write(remedies_ts)

print("Wrote lib/data/remedies.ts successfully.")
print(f"SUCCESS: Generated {len(all_symptom_taxonomies)} symptoms and {len(all_remedies)} remedies.")
