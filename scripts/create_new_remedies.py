# 106 Unique Remedies for 53 New Symptoms
def generate_new_remedies(new_symptoms, get_assamese_ingredient, get_assamese_qty):
    remedies = []
    
    for s in new_symptoms:
        slug = s["slug"]
        title = s["title"]
        as_title = s["assameseTitle"]
        spices = s["commonSpices"]
        cat = s["categoryId"]
        red_flag_text = s["redFlagsSummary"]
        
        spice1 = spices[0] if len(spices) > 0 else "Ginger (Aada)"
        spice2 = spices[1] if len(spices) > 1 else "Turmeric (Haldi)"
        spice3 = spices[2] if len(spices) > 2 else "Warm Water"
        spice4 = spices[3] if len(spices) > 3 else "Black Salt (Kola Nimokh)"

        # --- Remedy 1 (Decoction / Infusion / Primary) ---
        r1_id = f"{slug}-primary-infusion"
        r1_name_en = f"{title} Soothing Decoction with {spice1.split('(')[0].strip()}"
        r1_name_as = f"{as_title}ৰ বাবে {get_assamese_ingredient(spice1).split('(')[0].strip()}ৰ ক্বাথ"
        
        r1_steps = [
            {
                "en": f"Take 1.5 cups of fresh filtered water in a clean stainless steel saucepan.",
                "as": f"এটা পৰিষ্কাৰ ষ্টেইনলেছ ষ্টিলৰ চচপেনত ১.৫ কাপ পৰিশোধিত পানী লওক।"
            },
            {
                "en": f"Crush {spice1} lightly using a stone mortar and pestle to release active phytochemicals.",
                "as": f"এটা শিলৰ পটা বা উৰালত {get_assamese_ingredient(spice1)} লঘুভাৱে থেতেলিয়াই লওক যাতে প্ৰাকৃতিক গুণ ওলাই আহে।"
            },
            {
                "en": f"Add the crushed {spice1} and {spice2} into the water over medium heat and bring to an active boil.",
                "as": f"উতলা পানীত থেতেলিয়াই লোৱা {get_assamese_ingredient(spice1)} আৰু {get_assamese_ingredient(spice2)} দি মধ্যমীয়া জুইত উতলাওক।"
            },
            {
                "en": f"Lower the heat to a gentle simmer for 4 to 5 minutes until reduced to approximately 1 cup.",
                "as": f"জুইৰ উত্তাপ কমাই মৃদুভাৱে ৪-৫ মিনিট উতলিবলৈ দিয়ক যাতে পানী কমি ১ কাপ জোখৰ হয়।"
            },
            {
                "en": f"Strain through a fine-mesh stainless steel strainer into a ceramic or clay cup.",
                "as": f"মিহি ষ্টেইনলেছ ষ্টিলৰ চালনীৰে চেকি কাঁচৰ বা মাটিৰ কাপত ক্বাথখিনি বাকি লওক।"
            },
            {
                "en": f"Stir in a small pinch of {spice4} or raw honey once comfortably lukewarm.",
                "as": f"ক্বাথখিনি মুখত সহিব পৰা কুহুমীয়া অৱস্থালৈ জুৰালে তাত এচিকুট {get_assamese_ingredient(spice4)} মিহলাওক।"
            },
            {
                "en": f"Sip slowly in calm, measured mouthfuls while seated upright 20 minutes after meals.",
                "as": f"খোৱাৰ ২০ মিনিট পিছত পোন হৈ বহি কুহুমীয়া অৱস্থাত লাহে লাহে চুমুক দি খাওক।"
            }
        ]

        r1 = {
            "id": r1_id,
            "symptom": {"en": title, "as": as_title},
            "symptom_assamese": as_title,
            "symptomSlug": slug,
            "name": {"en": r1_name_en, "as": r1_name_as},
            "name_assamese": r1_name_as,
            "ingredients": [
                {"item": {"en": spice1, "as": get_assamese_ingredient(spice1)}, "item_assamese": get_assamese_ingredient(spice1), "qty": {"en": "1 tsp / 1 inch", "as": "১ চাহ চামুচ বা ১ ইঞ্চি"}, "qty_assamese": "১ চামুচ"},
                {"item": {"en": spice2, "as": get_assamese_ingredient(spice2)}, "item_assamese": get_assamese_ingredient(spice2), "qty": {"en": "1/2 tsp", "as": "১/২ চাহ চামুচ"}, "qty_assamese": "১/২ চামুচ"},
                {"item": {"en": "Water", "as": "পানী"}, "item_assamese": "পানী", "qty": {"en": "1.5 cups", "as": "১.৫ কাপ"}, "qty_assamese": "১.৫ কাপ"},
                {"item": {"en": spice4, "as": get_assamese_ingredient(spice4)}, "item_assamese": get_assamese_ingredient(spice4), "qty": {"en": "Tiny pinch", "as": "এচিকুট"}, "qty_assamese": "এচিকুট"}
            ],
            "prepTimeMinutes": 8,
            "steps": r1_steps,
            "dosage": {
                "child": {
                    "en": "Not recommended under 5 yrs. For ages 6-12: 2 tbsp diluted in warm water once daily.",
                    "as": "৫ বছৰৰ তলৰ শিশুৰ বাবে নহয়। ৬-১২ বছৰৰ বাবে ২ চাহ চামুচ কুহুমীয়া পানীত মিহলাই দিনত এবাৰ।"
                },
                "adult": {
                    "en": "1 cup (150ml) sipped slowly 20-30 min after meals, max twice daily.",
                    "as": "১ মজলীয়া কাপ (১৫০ মিলিলিটাৰ) আহাৰৰ ২০-৩০ মিনিট পিছত লাহে লাহে চুমুক দি দিনত দুবাৰ।"
                },
                "elderly": {
                    "en": "1/2 cup once daily after lunch. Monitor with existing digestive medications.",
                    "as": "১/২ কাপ দুপৰীয়াৰ আহাৰৰ পিছত দিনত এবাৰ। নিয়মিত ঔষধ থাকিলে সাৱধানতা লব।"
                }
            },
            "dos": [
                {"en": "Drink lukewarm, never scalding hot", "as": "কুহুমীয়া অৱস্থাত খাব, অতি গৰমকৈ নাখাব"},
                {"en": "Consume freshly prepared within 30 minutes", "as": "সতেজভাৱে প্ৰস্তুত কৰি ৩০ মিনিটৰ ভিতৰত খাব"},
                {"en": "Stay seated comfortably while sipping", "as": "খাওঁতে আৰামেৰে পোন হৈ বহিব"}
            ],
            "donts": [
                {"en": "Don't consume on an empty hyper-acidic stomach", "as": "খালী পেটত বা পেটত তীব্ৰ জ্বলা-পোৰা থাকিলে নাখাব"},
                {"en": "Don't exceed 2 cups per day", "as": "দিনত দুকাপতকৈ অধিক পৰিমাণে কেতিয়াও ব্যৱহাৰ নকৰিব"}
            ],
            "redFlags": [
                {"en": f"Emergency caution: {red_flag_text}", "as": f"জৰুৰী সতৰ্কবাণী: {red_flag_text} দেখা পালে পলম নকৰি চিকিৎসকৰ পৰামৰ্শ লওক।"}
            ],
            "tip": {
                "en": f"Grandmother's Tip: Simmering covered preserves the aromatic volatile oils of {spice1.split('(')[0].strip()}.",
                "as": f"আইতাৰ দিহা: পাত্ৰৰ ঢাকনিখন মাৰি সিজালে {get_assamese_ingredient(spice1).split('(')[0].strip()}ৰ সুগন্ধি আৰু কাৰ্যকৰী গুণ নষ্ট নহয়।"
            },
            "culturalContext": {
                "en": f"Traditional Assamese households rely on {spice1.split('(')[0].strip()} to bring gentle balance to daily seasonal discomforts.",
                "as": f"অসমীয়া ঘৰুৱা সংস্কৃতিত {get_assamese_ingredient(spice1).split('(')[0].strip()}ক স্বাস্থ্য ৰক্ষাৰ অন্যতম প্ৰধান উপাদান হিচাপে গণ্য কৰা হয়।"
            },
            "primarySpice": spice1,
            "difficulty": "Easy",
            "suitableTime": {"en": "After meals", "as": "আহাৰ গ্ৰহণৰ পিছত"}
        }
        remedies.append(r1)

        # --- Remedy 2 (Balm / Soak / Gentle Alternative) ---
        r2_id = f"{slug}-secondary-care"
        is_topical = any(k in slug for k in ["heel", "neck", "strain", "knee", "calf", "back", "joint", "skin", "rash", "cheeks", "hair", "scalp", "burns", "eyes", "ear", "creaks", "soreness"])
        
        if is_topical:
            r2_name_en = f"{title} Warm Restorative Compress with {spice2.split('(')[0].strip()}"
            r2_name_as = f"{as_title}ৰ বাবে {get_assamese_ingredient(spice2).split('(')[0].strip()}ৰ কুহুমীয়া সেক"
            r2_steps = [
                {
                    "en": f"Measure 2 tablespoons of {spice1} or {spice2} in a clean ceramic bowl.",
                    "as": f"এটা পৰিষ্কাৰ বাটিত ২ ডাঙৰ চামুচ {get_assamese_ingredient(spice1)} বা {get_assamese_ingredient(spice2)} জুখি লওক।"
                },
                {
                    "en": f"Warm gently in a small pan over very low heat for 1 to 2 minutes until comfortably warm to the touch.",
                    "as": f"এখন সৰু কেৰাহীত ১-২ মিনিট অতি মৃদু জুইত সহিব পৰাকৈ কুহুমীয়া কৰি লওক।"
                },
                {
                    "en": f"Clean the target area with a warm damp cloth and pat completely dry.",
                    "as": f"প্ৰভাৱিত অংশটো কুহুমীয়া সেমেকা কাপোৰেৰে চাফা কৰি ভালদৰে মচি লওক।"
                },
                {
                    "en": f"Apply the warm preparation evenly using clean fingertips in gentle circular strokes.",
                    "as": f"পৰিষ্কাৰ আঙুলিৰ মূৰেৰে কুহুমীয়া মিশ্ৰণটো লঘুভাৱে বৃত্তাকাৰে মালিচ কৰি লগাওক।"
                },
                {
                    "en": f"Cover with a warm dry cotton cloth and allow the warmth to penetrate for 15 minutes.",
                    "as": f"এখন শুকান কুহুমীয়া কপাহী কাপোৰ মেৰিয়াই ১৫ মিনিটৰ বাবে জিৰণি লওক।"
                },
                {
                    "en": f"Wipe away any excess residue gently with a soft towel; avoid exposure to cold drafts.",
                    "as": f"কোমল কাপোৰেৰে অতিৰিক্ত অংশ মচি পেলাওক আৰু পোনে পোনে ঠাণ্ডা বতাহৰ পৰা আঁতৰি থাকক।"
                }
            ]
        else:
            r2_name_en = f"{title} Soothing Elixir with {spice3.split('(')[0].strip()} & {spice2.split('(')[0].strip()}"
            r2_name_as = f"{as_title}ৰ বাবে {get_assamese_ingredient(spice3).split('(')[0].strip()} আৰু {get_assamese_ingredient(spice2).split('(')[0].strip()}ৰ মিশ্ৰণ"
            r2_steps = [
                {
                    "en": f"In a clean glass cup, take 1 cup of warm room-temperature filtered water.",
                    "as": f"এটা পৰিষ্কাৰ কাঁচৰ গিলাচত ১ কাপ কুহুমীয়া পৰিশোধিত পানী লওক।"
                },
                {
                    "en": f"Add 1/2 teaspoon of finely powdered {spice2} and stir continuously for 30 seconds.",
                    "as": f"তাত ১/২ চাহ চামুচ {get_assamese_ingredient(spice2)}ৰ মিহি গুড়ি দি ৩০ চেকেণ্ড ভালদৰে লৰাওক।"
                },
                {
                    "en": f"Infuse for 3 minutes to allow the natural botanical bio-actives to dissolve.",
                    "as": f"মছলাৰ গুণ পানীত দ্ৰৱীভূত হ'বলৈ ৩ মিনিট স্থিৰভাৱে ৰাখক।"
                },
                {
                    "en": f"Add a few drops of fresh Assam lemon or a micro-pinch of rock salt as needed.",
                    "as": f"প্ৰয়োজন অনুসাৰে কেইটোপালমান কাজী নেমুৰ ৰস বা এচিকুট সৈন্ধৱ নিমখ মিহলাওক।"
                },
                {
                    "en": f"Stir thoroughly with a stainless steel spoon until completely uniform.",
                    "as": f"এটা ষ্টেইনলেছ ষ্টিলৰ চামুচেৰে মিশ্ৰণটো সুন্দৰকৈ মিহলাই লওক।"
                },
                {
                    "en": f"Sip slowly in small mouthfuls whenever acute discomfort arises.",
                    "as": f"যেতিয়াই অস্বস্তি অনুভৱ হয়, লাহে লাহে সৰু সৰু চুমুক দি ইয়াক পান কৰক।"
                }
            ]

        r2 = {
            "id": r2_id,
            "symptom": {"en": title, "as": as_title},
            "symptom_assamese": as_title,
            "symptomSlug": slug,
            "name": {"en": r2_name_en, "as": r2_name_as},
            "name_assamese": r2_name_as,
            "ingredients": [
                {"item": {"en": spice2, "as": get_assamese_ingredient(spice2)}, "item_assamese": get_assamese_ingredient(spice2), "qty": {"en": "1 tsp", "as": "১ চাহ চামুচ"}, "qty_assamese": "১ চামুচ"},
                {"item": {"en": spice3, "as": get_assamese_ingredient(spice3)}, "item_assamese": get_assamese_ingredient(spice3), "qty": {"en": "1 cup", "as": "১ কাপ"}, "qty_assamese": "১ কাপ"},
                {"item": {"en": spice1, "as": get_assamese_ingredient(spice1)}, "item_assamese": get_assamese_ingredient(spice1), "qty": {"en": "Pinch", "as": "এচিকুট"}, "qty_assamese": "এচিকুট"}
            ],
            "prepTimeMinutes": 5,
            "steps": r2_steps,
            "dosage": {
                "child": {
                    "en": "Apply a small test spot on forearm first. Use gentle, light amount only under adult supervision.",
                    "as": "প্ৰথমে হাতৰ আগভাগত অলপ লগাই পৰীক্ষা কৰক। অভিভাৱকৰ তত্ত্বাৱধানত কেৱল লঘু পৰিমাণে ব্যৱহাৰ কৰিব।"
                },
                "adult": {
                    "en": "Use as directed up to twice daily for localized symptomatic relief.",
                    "as": "উপশম নোপোৱালৈকে দিনত সৰ্বাধিক দুবাৰ নিৰ্দেশনা অনুযায়ী ব্যৱহাৰ কৰিব পাৰে।"
                },
                "elderly": {
                    "en": "Safe for regular use. Keep skin protected from cold drafts following application.",
                    "as": "বয়োজ্যেষ্ঠৰ বাবে সুৰক্ষিত। ব্যৱহাৰৰ পিছত ঠাণ্ডা বতাহৰ পৰা গা ঢাকি ৰাখিব।"
                }
            },
            "dos": [
                {"en": "Test temperature on the back of your wrist before application", "as": "ব্যৱহাৰ কৰাৰ আগতে হাতৰ পিঠিত উষ্ণতা পৰীক্ষা কৰি লব"},
                {"en": "Keep the area warm and rested afterwards", "as": "ব্যৱহাৰৰ পিছত অংশটো আৰামত আৰু গৰমত ৰাখিব"}
            ],
            "donts": [
                {"en": "Do not apply on broken skin or active bleeding wounds", "as": "কটা বা তেজ ওলাই থকা অংশত কেতিয়াও প্ৰয়োগ নকৰিব"},
                {"en": "Do not reheat multiple times", "as": "একে মিশ্ৰণ বাৰে বাৰে গৰম কৰি ব্যৱহাৰ নকৰিব"}
            ],
            "redFlags": [
                {"en": f"Emergency caution: {red_flag_text}", "as": f"জৰুৰী সতৰ্কবাণী: {red_flag_text} অনুভৱ কৰিলে পলম নকৰি চিকিৎসকৰ পৰামৰ্শ লওক।"}
            ],
            "tip": {
                "en": f"Grandmother's Tip: A gentle touch works better than heavy pressure when soothing inflamed tissues.",
                "as": f"আইতাৰ দিহা: জ্বলন বা বিষ হোৱা অংশত জোৰেৰে হেঁচা মৰাতকৈ কোমল হাতেৰে লঘু মালিচহে অধিক ফলপ্ৰসূ।"
            },
            "culturalContext": {
                "en": f"Gentle compresses and herbal touch therapies form an ancient core of rural Assamese wellness wisdom.",
                "as": f"গাঁৱলীয়া অসমীয়া সমাজত এনে ধৰণৰ প্ৰাকৃতিক সেক আৰু লঘু মালিচে বিষ আৰু ক্লান্তি দূৰ কৰাত যুগ যুগ ধৰি সহায় কৰি আহিছে।"
            },
            "primarySpice": spice2,
            "difficulty": "Easy",
            "suitableTime": {"en": "Evening or as needed", "as": "সন্ধিয়া বা প্ৰয়োজন অনুযায়ী"}
        }
        remedies.append(r2)

    return remedies
