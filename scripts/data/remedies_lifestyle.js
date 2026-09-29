// scripts/data/remedies_lifestyle.js

module.exports = [
  // ==========================================
  // E. SLEEP, STRESS & ENERGY
  // ==========================================

  // 37. Insomnia / Trouble Sleeping
  {
    id: "spiced-nutmeg-cardamom-bedtime-milk",
    symptom: "Insomnia / Trouble Sleeping",
    symptomSlug: "insomnia",
    name: "Nutmeg & Cardamom Tranquility Milk (Jaiphal-Elaichi Gakhir)",
    name_assamese: "জয়ফল আৰু ইলাচীযুক্ত নিশাৰ গাখীৰ",
    ingredients: [
      { item: "Pure Cow Milk", qty: "1 cup (200ml)" },
      { item: "Nutmeg Powder (Jaiphal)", qty: "1 tiny pinch (about 1/16 tsp)" },
      { item: "Green Cardamom (Elaichi)", qty: "1 pod, crushed" },
      { item: "Mishri or Jaggery", qty: "1 tsp" },
    ],
    prepTimeMinutes: 5,
    steps: [
      "Bring cow milk to a gentle boil with crushed green cardamom.",
      "Add a tiny pinch of freshly grated nutmeg powder (keep dose strictly minimal).",
      "Stir in unrefined rock sugar or jaggery until melted.",
      "Pour into a warm cup; drink slowly 30-45 minutes before sleep."
    ],
    dosage: {
      child: "Ages 5+: 1/2 cup with a microscopic speck of nutmeg.",
      adult: "1 cup 45 minutes before bed.",
      elderly: "1 cup warm milk. Deeply grounding for Vata-type restless insomnia."
    },
    dos: ["Drink warm, 30-45 minutes before bedtime", "Turn off digital phone/TV screens at least 1 hour before bed"],
    donts: ["NEVER use more than a tiny pinch of nutmeg (high doses are toxic and cause stupor/nausea)", "Do not drink if severely lactose intolerant"],
    redFlags: [
      "Severe chronic insomnia lasting > 1 month causing cognitive impairment or hallucinations",
      "Waking up gasping or choking repeatedly through the night (obstructive sleep apnea)",
      "Severe depression, panic attacks, or thoughts of self-harm associated with sleep loss"
    ],
    culturalContext: "Nutmeg (Jaiphal / Jatiphala) is celebrated in Ayurveda as a 'Nidrajanana' (sleep-inducing) herb that calms erratic cranial prana.",
    primarySpice: "Nutmeg (Jaiphal)",
    difficulty: "Easy",
    suitableTime: "45 minutes before sleep"
  },
  {
    id: "chamomile-tulsi-evening-draught",
    symptom: "Insomnia / Trouble Sleeping",
    symptomSlug: "insomnia",
    name: "Tulsi & Chamomile Calming Night Draught (Tulsi-Nidra Chah)",
    name_assamese: "তুলসী আৰু বনফুলৰ নিশাৰ প্ৰশান্তিদায়ক চাহ",
    ingredients: [
      { item: "Fresh Tulsi Leaves", qty: "6-8 leaves" },
      { item: "Chamomile Flowers (or Fennel Seeds)", qty: "1 tsp" },
      { item: "Water", qty: "1.5 cups" },
      { item: "Pure Honey (Mou)", qty: "1/2 tsp (optional)" },
    ],
    prepTimeMinutes: 6,
    steps: [
      "Boil water with tulsi and chamomile/fennel for 4 minutes.",
      "Cover and steep for 3 minutes to preserve relaxing terpenes.",
      "Strain into a cup; sweeten with 1/2 tsp honey once warm.",
      "Sip quietly in a dimly lit room."
    ],
    dosage: {
      child: "Ages 4+: 1/3 cup warm tea.",
      adult: "1 cup 1 hour before bed.",
      elderly: "1 cup warm. Soothes agitated evening nerves without morning grogginess."
    },
    dos: ["Sip slowly in peaceful surroundings", "Keep bedroom cool, dark, and well-ventilated"],
    donts: ["Do not consume caffeine or black tea after 3 PM", "Do not eat heavy, greasy meals within 3 hours of sleep"],
    redFlags: [
      "Restless legs syndrome so severe that legs thrash uncontrollably every night",
      "Falling asleep unexpectedly while driving or eating during daytime (narcolepsy)",
      "Insomnia accompanied by rapid irregular heartbeat and unexplained weight loss (hyperthyroidism)"
    ],
    culturalContext: "Tulsi acts as an adaptogen that lowers evening salivary cortisol levels, allowing natural melatonin production to rise smoothly.",
    primarySpice: "Tulsi (Holy Basil)",
    difficulty: "Easy",
    suitableTime: "1 hour before sleep"
  },

  // 38. Stress / Mild Anxiety (relaxation remedies)
  {
    id: "cardamom-rose-soothing-infusion",
    symptom: "Stress / Mild Anxiety (relaxation remedies)",
    symptomSlug: "stress-anxiety",
    name: "Cardamom & Rose Petal Soothing Tea (Elaichi-Golap Chah)",
    name_assamese: "ইলাচী আৰু গোলাপৰ সুগন্ধি চাহ",
    ingredients: [
      { item: "Green Cardamom (Elaichi)", qty: "2 pods, cracked" },
      { item: "Dried Edible Rose Petals", qty: "1 tsp" },
      { item: "Water", qty: "1.5 cups" },
      { item: "Mishri (Rock Sugar)", qty: "1/2 tsp" },
    ],
    prepTimeMinutes: 5,
    steps: [
      "Bring water to a boil with cracked cardamom pods.",
      "Turn off flame; drop in dried fragrant rose petals.",
      "Cover with a lid and steep for 5 minutes (do not boil rose petals).",
      "Strain into a teacup and sweeten with crushed rock sugar.",
      "Breathe in the uplifting floral aroma deeply before every sip."
    ],
    dosage: {
      child: "Ages 6+: 1/2 cup warm tea.",
      adult: "1 cup twice daily during stressful periods.",
      elderly: "1 cup twice daily. Cools nervous tension and settles emotional flutter."
    },
    dos: ["Inhale the aromatic vapor deeply through the nose", "Practice slow 4-7-8 rhythmic breathing while drinking"],
    donts: ["Do not use florists' roses (they are heavily treated with toxic pesticides; use certified culinary/edible petals)", "Do not rush while drinking"],
    redFlags: [
      "Severe chest tightness, palpitations, and impending sense of doom (panic attack vs cardiac event)",
      "Thoughts of self-harm or deep overwhelming hopelessness (seek immediate mental health crisis support)",
      "Severe trembling, hallucinations, or detachment from reality"
    ],
    culturalContext: "Cardamom and rose (Taruni) are classical 'Hridya' (heart-strengthening and mind-soothing) botanicals in traditional Indian pharmacopoeia.",
    primarySpice: "Cardamom (Elaichi)",
    difficulty: "Easy",
    suitableTime: "Late afternoon or during work breaks"
  },
  {
    id: "warm-sesame-oil-foot-massage",
    symptom: "Stress / Mild Anxiety (relaxation remedies)",
    symptomSlug: "stress-anxiety",
    name: "Warm Sesame Oil Foot Grounding Therapy (Pada Abhyanga)",
    name_assamese: "ভৰিৰ তলুৱাত তিল তেলৰ মালিশ",
    ingredients: [
      { item: "Pure Sesame Oil (Til Tel) or Mustard Oil", qty: "1 tbsp, comfortably warm" },
      { item: "Clean Cotton Socks", qty: "1 pair" },
    ],
    prepTimeMinutes: 4,
    steps: [
      "Wash feet with warm water and pat dry.",
      "Warm 1 tbsp of pure sesame oil.",
      "Sit comfortably and massage the soles of your feet with firm thumb pressure, especially the central depression (solar plexus reflex point).",
      "Rub between all toes and around ankles for 5 minutes on each foot.",
      "Slip into cotton socks and relax in bed."
    ],
    dosage: {
      child: "Ages 3+: Gentle foot rub before sleep.",
      adult: "Apply every evening before bed.",
      elderly: "Apply nightly. Grounding therapy for restlessness and dry nervous system."
    },
    dos: ["Wear socks after massage to prevent slipping on floors", "Focus on slow, rhythmic thumb strokes"],
    donts: ["Do not walk barefoot on tiles with oily feet (severe fall hazard)", "Do not use cold oil"],
    redFlags: [
      "Chronic anxiety rendering you unable to leave home or eat for days",
      "Sudden onset paranoia or hearing voices",
      "Severe hyperventilation leading to fainting"
    ],
    culturalContext: "Known as 'Pada Abhyanga' in classical Ayurveda, foot massage stimulates terminal nerve plexuses that switch the autonomic nervous system into parasympathetic relaxation.",
    primarySpice: "Pure Sesame Oil",
    difficulty: "Easy",
    suitableTime: "Bedtime"
  },

  // 39. Fatigue / Low Energy
  {
    id: "soaked-almond-raisin-energy-tonic",
    symptom: "Fatigue / Low Energy",
    symptomSlug: "fatigue",
    name: "Soaked Almond & Raisin Vitality Tonic (Badam-Kismis Balya)",
    name_assamese: "তিওঁৱা বাদাম আৰু কিচমিচৰ বলকাৰক মিশ্ৰণ",
    ingredients: [
      { item: "Almonds (Badam)", qty: "5 pieces, soaked overnight and peeled" },
      { item: "Black Raisins (Kismis)", qty: "10 pieces, soaked overnight" },
      { item: "Cardamom (Elaichi)", qty: "1 pod, crushed" },
      { item: "Warm Milk or Water", qty: "1 cup" },
    ],
    prepTimeMinutes: 5,
    steps: [
      "Soak almonds and raisins in separate bowls of water overnight.",
      "In the morning, peel off the brown almond skins (skins contain enzyme-inhibiting tannins).",
      "Crush peeled almonds and plump raisins into a paste or chew them thoroughly.",
      "Wash down with 1 cup of warm milk or warm water infused with crushed cardamom."
    ],
    dosage: {
      child: "Ages 3+: 2-3 peeled almonds and 5 raisins every morning.",
      adult: "5 almonds + 10 raisins every morning.",
      elderly: "Peeled almonds blended into warm milk. Restores ojas and physical stamina."
    },
    dos: ["Always peel almond skins after soaking", "Chew each bite 30 times for optimal enzymatic absorption"],
    donts: ["Do not eat unsoaked, unpeeled almonds if digestion is weak", "Avoid relying on energy drinks or high-sugar sodas"],
    redFlags: [
      "Extreme exhaustion not relieved by sleep, accompanied by paleness and shortness of breath upon climbing 3 steps (severe anemia)",
      "Unexplained sudden weight loss, excessive thirst, and frequent urination (diabetes onset)",
      "Fatigue accompanied by lymph node swelling and persistent night fevers"
    ],
    culturalContext: "Almonds and Munakka raisins are classical 'Ojas-building' foods that nourish all seven bodily tissue layers (Dhatus) according to Charaka Samhita.",
    primarySpice: "Cardamom (Elaichi)",
    difficulty: "Easy",
    suitableTime: "Morning with breakfast"
  },
  {
    id: "fresh-amla-jaggery-rejuvenator",
    symptom: "Fatigue / Low Energy",
    symptomSlug: "fatigue",
    name: "Fresh Amla & Jaggery Revitalizing Shot (Amlakhi-Gur Ras)",
    name_assamese: "আমলখি আৰু গুড়ৰ সজীৱকাৰী ৰস",
    ingredients: [
      { item: "Fresh Amla (Indian Gooseberry)", qty: "1 fruit, deseeded and grated" },
      { item: "Organic Jaggery (Gur)", qty: "1 tsp" },
      { item: "Ginger (Aada)", qty: "1/4 inch, grated" },
      { item: "Water", qty: "1/2 cup" },
    ],
    prepTimeMinutes: 4,
    steps: [
      "Grate fresh Amla fruit and ginger.",
      "Squeeze out 2 tablespoons of fresh vitamin-C rich juice through a strainer.",
      "Mix with 1 tsp organic iron-rich jaggery and 1/2 cup room temperature water.",
      "Drink immediately after preparation to prevent vitamin C oxidation."
    ],
    dosage: {
      child: "Ages 4+: 2 tablespoons diluted in water once daily.",
      adult: "1/2 cup once daily in the morning.",
      elderly: "1/2 cup once daily. Natural antioxidant booster."
    },
    dos: ["Consume fresh within 15 minutes of juicing", "Take after light breakfast"],
    donts: ["Do not boil fresh amla juice (heat destroys heat-labile ascorbic acid)", "Avoid taking at midnight"],
    redFlags: [
      "Profound weakness with irregular pulse or heart fluttering",
      "Yellowing of skin or eyes with extreme exhaustion",
      "Fatigue with inability to lift arms above head or comb hair (myopathy signs)"
    ],
    culturalContext: "Amlakhi (Amla) is the cornerstone of the ancient Chyawanprash formulation in Assam, offering twenty times the natural ascorbic acid of citrus fruits.",
    primarySpice: "Ginger (Aada)",
    difficulty: "Easy",
    suitableTime: "Morning after breakfast"
  },

  // 40. Eye Strain
  {
    id: "pure-rose-water-eye-pads",
    symptom: "Eye Strain",
    symptomSlug: "eye-strain",
    name: "Chilled Pure Rose Water Eye Compresses (Golap-Jol Netra Tarpan)",
    name_assamese: "গোলাপ জলৰ চকুৰ শীতল পট্টি",
    ingredients: [
      { item: "Pure Steam-Distilled Rose Water (Gulab Jal)", qty: "2 tbsp, chilled" },
      { item: "Sterile Cotton Pads", qty: "2 round pads" },
    ],
    prepTimeMinutes: 3,
    steps: [
      "Soak two clean, sterile cotton pads in chilled steam-distilled rose water.",
      "Lie down on your back and place the soaked pads over closed eyelids.",
      "Rest in a quiet room with lights turned off for 15-20 minutes.",
      "Do NOT open eyes or drop liquid into the eyeball directly unless certified ophthalmic grade.",
      "Remove pads and allow skin around eyes to air dry."
    ],
    dosage: {
      child: "Ages 6+: Safe for relaxing strained eyes after schoolwork.",
      adult: "Apply once or twice daily after long computer screen exposure.",
      elderly: "Safe and deeply refreshing for dry, burning tired eyes."
    },
    dos: ["Ensure rose water is pure, 100% steam-distilled without alcohol or artificial fragrance", "Apply over CLOSED eyelids only"],
    donts: ["NEVER drop non-ophthalmic rose water into the open eyeball (can introduce bacterial contamination)", "Do not rub eyes vigorously"],
    redFlags: [
      "Sudden loss or blurriness of vision in one or both eyes",
      "Severe eye pain with rainbow halos around lights (acute angle-closure glaucoma - hospital emergency)",
      "Copious thick green or yellow pus gluing eyelashes shut with redness (bacterial conjunctivitis)"
    ],
    culturalContext: "Classical Ayurveda terms cooling the eyes 'Netra Prasadan' — soothing 'Alochaka Pitta' that overheats during prolonged visual focus.",
    primarySpice: "Rose Water",
    difficulty: "Easy",
    suitableTime: "After work or screen time"
  },
  {
    id: "chilled-cucumber-eye-slices",
    symptom: "Eye Strain",
    symptomSlug: "eye-strain",
    name: "Chilled Cucumber Slices for Digital Eye Burn (Tiyoh Netra Shanti)",
    name_assamese: "তিয়ঁহৰ শীতল চকল চকুৰ ওপৰত ৰখা",
    ingredients: [
      { item: "Fresh Cucumber (Tiyoh)", qty: "2 thick round slices (chilled)" },
    ],
    prepTimeMinutes: 2,
    steps: [
      "Cut two 1/2-inch thick round slices from a clean, chilled cucumber.",
      "Lie down comfortably with eyes closed.",
      "Place one chilled slice over each closed eyelid, ensuring complete coverage from brow bone to upper cheek.",
      "Rest quietly for 15 minutes. When the slices warm up, flip them to the cold side.",
      "Wash face with fresh cool water."
    ],
    dosage: {
      child: "Safe for all ages.",
      adult: "Apply for 15 minutes whenever eyes burn from screens.",
      elderly: "Safe and relieves periorbital puffiness."
    },
    dos: ["Follow the 20-20-20 screen rule: every 20 minutes look 20 feet away for 20 seconds", "Keep eyes relaxed and closed"],
    donts: ["Do not use dirty unwashed cucumbers", "Do not ignore deteriorating vision"],
    redFlags: [
      "Flashing lights or sudden shower of floating black specks in vision (retinal detachment warning)",
      "Double vision when looking with both eyes",
      "Foreign body sensation with intense tearing following grinding/woodworking"
    ],
    culturalContext: "The moisture content and caffeic acid in fresh Tiyoh rapidly absorb thermal inflammation generated by prolonged staring at radiant screens.",
    primarySpice: "Cucumber (Tiyoh)",
    difficulty: "Easy",
    suitableTime: "Evening"
  },

  // ==========================================
  // F. WOMEN'S HEALTH
  // ==========================================

  // 41. Menstrual Bloating
  {
    id: "fennel-coriander-seed-bloat-infusion",
    symptom: "Menstrual Bloating",
    symptomSlug: "menstrual-bloating",
    name: "Fennel & Coriander Diuretic Fluid Balancer (Mouri-Dhania Kadha)",
    name_assamese: "মৌৰি আৰু ধনিয়াৰ মাহেকীয়াৰ পেট ফুলা প্ৰশমক চাহ",
    ingredients: [
      { item: "Fennel Seeds (Mouri)", qty: "1 tsp" },
      { item: "Coriander Seeds (Dhania)", qty: "1 tsp, bruised" },
      { item: "Water", qty: "2 cups" },
      { item: "Fresh Ginger (Aada)", qty: "1/2 inch, sliced" },
    ],
    prepTimeMinutes: 7,
    steps: [
      "Bring water to a boil with bruised coriander, fennel, and ginger.",
      "Simmer for 4 minutes until golden and aromatic.",
      "Strain into a mug.",
      "Drink warm 2-3 days before expected period and during menstruation to gently flush excess water retention."
    ],
    dosage: {
      child: "Not applicable for young children; adolescent girls: 1/2 cup warm.",
      adult: "1 cup twice daily.",
      elderly: "Not applicable."
    },
    dos: ["Drink warm throughout the premenstrual week", "Reduce dietary sodium and processed salty snacks"],
    donts: ["Do not consume heavy cold carbonated sodas which worsen gas accumulation", "Avoid excess caffeine"],
    redFlags: [
      "Abrupt severe abdominal distention that does not resolve after period ends",
      "Severe breathlessness when lying flat accompanying abdominal swelling",
      "One-sided rapid leg swelling"
    ],
    culturalContext: "Coriander and fennel seeds are mild Ayurvedic 'Mutrala' (natural water balance) spices that stimulate kidney filtration without potassium depletion.",
    primarySpice: "Fennel (Mouri)",
    difficulty: "Easy",
    suitableTime: "Mid-morning and 4 PM"
  },
  {
    id: "ginger-ajwain-premenstrual-tea",
    symptom: "Menstrual Bloating",
    symptomSlug: "menstrual-bloating",
    name: "Ginger & Carom Premenstrual Warm Tea (Aada-Ajwain)",
    name_assamese: "আদা আৰু জৱাইনৰ মাহেকীয়াৰ আৰামদায়ক চাহ",
    ingredients: [
      { item: "Fresh Ginger (Aada)", qty: "1 inch, crushed" },
      { item: "Ajwain (Carom seeds)", qty: "1/2 tsp" },
      { item: "Water", qty: "1.5 cups" },
      { item: "Black Salt (Kola Nimokh)", qty: "1 tiny pinch" },
    ],
    prepTimeMinutes: 6,
    steps: [
      "Simmer crushed ginger and ajwain in water for 4 minutes.",
      "Strain into a cup; add a tiny pinch of black salt.",
      "Sip lukewarm to dispel hormonal bowel sluggishness."
    ],
    dosage: {
      child: "Not applicable.",
      adult: "1 cup once or twice daily during bloating phase.",
      elderly: "Not applicable."
    },
    dos: ["Drink after meals", "Take a gentle 15-minute walk after meals to encourage intestinal peristalsis"],
    donts: ["Do not take if stomach is actively burning with acid", "Do not take excessive black salt if retaining excess fluid"],
    redFlags: [
      "Severe pelvic pain causing fainting",
      "Abnormal bleeding between periods",
      "Fever with severe lower abdomen tenderness"
    ],
    culturalContext: "Progesterone slows gut motility before menstruation; ginger and ajwain naturally accelerate gastric emptying.",
    primarySpice: "Ajwain (Carom seeds)",
    difficulty: "Easy",
    suitableTime: "After lunch"
  },

  // 42. Morning Sickness (mild, pregnancy — extra caution flagged)
  {
    id: "fresh-ginger-lemon-sucking-slice-pregnancy",
    symptom: "Morning Sickness (mild, pregnancy — extra caution flagged)",
    symptomSlug: "morning-sickness",
    name: "Fresh Ginger & Lemon Sucking Slice (Aada-Nemu Chaki)",
    name_assamese: "আদা আৰু নেমুৰ প্ৰাতঃকালীন বমিভাৱ নাশক",
    ingredients: [
      { item: "Fresh Young Ginger (Aada)", qty: "1 wafer-thin slice (coin size)" },
      { item: "Lemon / Kaji Nemu Juice", qty: "3-4 drops" },
      { item: "Rock Salt (Saindhava)", qty: "1 microscopic grain" },
    ],
    prepTimeMinutes: 2,
    steps: [
      "Peel fresh ginger and cut a wafer-thin, translucent slice.",
      "Squeeze 3 drops of lemon juice and a microscopic grain of rock salt onto it.",
      "Keep on the tongue and gently suck on it before getting out of bed in the morning.",
      "Do NOT chew aggressively or swallow big pieces. The mild gingerol aroma resets morning vestibular nausea."
    ],
    dosage: {
      child: "Not applicable.",
      adult: "Pregnant women with mild morning queasiness: 1 thin slice sucked slowly upon waking. Max twice daily. (Always inform obstetrician).",
      elderly: "Not applicable."
    },
    dos: ["Keep dry crackers or plain biscuits at bedside to nibble BEFORE rising from bed", "Keep ginger doses very small (under 1 gram raw ginger daily is safe in pregnancy)"],
    donts: ["NEVER consume large therapeutic doses of ginger or concentrated supplements during pregnancy", "Do not let stomach stay completely empty for long periods (eat small frequent snacks)"],
    redFlags: [
      "Inability to keep any water or food down for 24 hours (Hyperemesis Gravidarum - requires IV hydration)",
      "Weight loss, dark brown urine, or extreme dizziness upon standing",
      "Vomiting blood or severe abdominal/pelvic cramping"
    ],
    culturalContext: "Traditional Assamese Daais (midwives) advised expectant mothers to keep a small slice of tender green ginger near their bedside to counter morning bile waves.",
    primarySpice: "Ginger (Aada)",
    difficulty: "Easy",
    suitableTime: "Before getting out of bed"
  },
  {
    id: "roasted-cumin-mishri-morning-water",
    symptom: "Morning Sickness (mild, pregnancy — extra caution flagged)",
    symptomSlug: "morning-sickness",
    name: "Roasted Cumin & Rock Sugar Soother (Bhoja Jeera-Misri Pani)",
    name_assamese: "ভজা জিৰা আৰু মিচিৰিৰ গৰ্ভকালীন শীতল পানী",
    ingredients: [
      { item: "Cumin Seeds (Jeera)", qty: "1/2 tsp, lightly roasted" },
      { item: "Mishri (Rock Sugar)", qty: "1/2 tsp, crushed" },
      { item: "Cool Boiled Water", qty: "1 cup" },
    ],
    prepTimeMinutes: 4,
    steps: [
      "Dry-roast cumin seeds lightly for 30 seconds (do not burn); crush coarsely.",
      "Stir with crushed rock sugar into 1 cup of cool pre-boiled water.",
      "Let steep for 5 minutes, then strain.",
      "Take small sips whenever nausea surges."
    ],
    dosage: {
      child: "Not applicable.",
      adult: "Sip 1/2 to 1 cup slowly throughout the morning.",
      elderly: "Not applicable."
    },
    dos: ["Drink cool or at room temperature in tiny spoonfuls", "Rest in a well-ventilated room free of strong cooking smells"],
    donts: ["Do not drink large volumes all at once (stretches the sensitive stomach triggering vomiting)", "Avoid oily, greasy breakfast preparations"],
    redFlags: [
      "Fainting or severe confusion",
      "Vomiting accompanied by fever or pain while urinating (possible urinary tract infection)",
      "Absence of urination for more than 8 hours"
    ],
    culturalContext: "Roasted jeera has safe, gentle carminative properties that calm gastric spasms without stimulating uterine muscles.",
    primarySpice: "Cumin (Jeera)",
    difficulty: "Easy",
    suitableTime: "Mid-morning"
  },

  // 43. Postpartum Recovery Warmth Foods (traditional, clearly marked cultural practice)
  {
    id: "assamese-methi-laddoo-postpartum",
    symptom: "Postpartum Recovery Warmth Foods (traditional, clearly marked cultural practice)",
    symptomSlug: "postpartum-recovery",
    name: "Traditional Assamese Postpartum Fenugreek Warmth Bite (Methi-Gur Balya)",
    name_assamese: "প্ৰসূতিৰ মেথি আৰু গুড়ৰ বলকাৰক লাড়ু",
    ingredients: [
      { item: "Fenugreek Powder (Methi)", qty: "1/2 tsp" },
      { item: "Pure Desi Cow Ghee", qty: "1 tsp" },
      { item: "Organic Jaggery (Gur)", qty: "1 tbsp, grated" },
      { item: "Dry Ginger Powder (Xunth)", qty: "1 pinch" },
    ],
    prepTimeMinutes: 5,
    steps: [
      "Warm pure cow ghee in a small pan.",
      "Add fenugreek powder and a pinch of dry ginger; sauté on low flame for 60 seconds until aromatic.",
      "Add grated jaggery and stir until melted into a warm paste.",
      "Roll into a small bite-sized ball (or eat warm from the spoon).",
      "Take once daily in the morning with a cup of warm cow milk."
    ],
    dosage: {
      child: "Not applicable.",
      adult: "Nursing mothers in postpartum recovery (Sutika stage): 1 small bite daily with warm milk.",
      elderly: "Not applicable."
    },
    dos: ["Consume warm with a glass of warm milk", "Maintain strict postpartum perineal and personal hygiene"],
    donts: ["Do NOT consume during active pregnancy (fenugreek stimulates uterine contractions; safe ONLY after child delivery)", "Do not overconsume if experiencing postpartum fever or infection"],
    redFlags: [
      "Postpartum hemorrhage: soaking more than one maxi-pad an hour, passing large fist-sized clots (hospital emergency)",
      "High fever > 100.4°F with foul-smelling lochia discharge (puerperal sepsis risk)",
      "Severe calf pain, redness, or sudden chest pain / breathlessness (pulmonary embolism risk)"
    ],
    culturalContext: "In Assamese tradition, postpartum women are given 'Methi-Gur' and 'Jalukia' preparations by elders to encourage uterine involution, clear lochia, and support breastmilk lactation.",
    primarySpice: "Fenugreek (Methi)",
    difficulty: "Easy",
    suitableTime: "Morning with warm milk"
  },
  {
    id: "garlic-dry-ginger-postpartum-broth",
    symptom: "Postpartum Recovery Warmth Foods (traditional, clearly marked cultural practice)",
    symptomSlug: "postpartum-recovery",
    name: "Garlic & Dry Ginger Postpartum Warming Broth (Nohoru-Xunth Pani)",
    name_assamese: "নহৰু আৰু শুঁঠৰ প্ৰসূতিৰ আৰামদায়ক ঝোল",
    ingredients: [
      { item: "Garlic (Nohoru)", qty: "4 cloves, crushed" },
      { item: "Dry Ginger Powder (Xunth) or Fresh Ginger", qty: "1/2 tsp" },
      { item: "Cumin Seeds (Jeera)", qty: "1/2 tsp" },
      { item: "Pure Cow Ghee", qty: "1/2 tsp" },
      { item: "Water", qty: "2 cups" },
      { item: "Rock Salt", qty: "1/4 tsp" },
    ],
    prepTimeMinutes: 8,
    steps: [
      "Heat ghee in a small pan; sauté cumin and crushed garlic until golden.",
      "Add dry ginger powder, rock salt, and 2 cups of water.",
      "Simmer for 5 minutes to create a clear, aromatic warming broth.",
      "Drink warm once daily with lunch or in the evening."
    ],
    dosage: {
      child: "Not applicable.",
      adult: "Postpartum nursing mothers: 1 cup warm broth daily.",
      elderly: "Not applicable."
    },
    dos: ["Drink comfortably warm", "Pair with light, easily digestible rice gruel (Jawo)"],
    donts: ["Do not make overly hot with extreme green chilies (can upset the nursing infant's stomach)", "Do not ignore high postpartum fevers"],
    redFlags: [
      "Severe headache with vision changes and high blood pressure (postpartum preeclampsia)",
      "Severe mood swings, crying spells, or thoughts of harming baby or oneself (postpartum depression/psychosis)",
      "Red, hard, exquisitely painful lump in breast with high fever (mastitis requiring antibiotics)"
    ],
    culturalContext: "Garlic (Nohoru) is regarded across Assam as a potent galactagogue (milk stimulator) and deep Vata-dispeller during the critical 40-day postpartum resting period.",
    primarySpice: "Garlic (Nohoru)",
    difficulty: "Easy",
    suitableTime: "With lunch"
  },

  // ==========================================
  // G. SEASONAL / GENERAL IMMUNITY
  // ==========================================

  // 44. Seasonal Flu Prevention
  {
    id: "assamese-morisa-tulsi-flu-kadha",
    symptom: "Seasonal Flu Prevention",
    symptomSlug: "seasonal-flu-prevention",
    name: "Assamese Tulsi & Black Pepper Immunity Shield (Morisa-Tulsi Kadha)",
    name_assamese: "তুলসী আৰু জালুকৰ ঋতুজনিত প্ৰতিৰোধক ক্বাথ",
    ingredients: [
      { item: "Krishna Tulsi Leaves", qty: "10-12 leaves" },
      { item: "Black Peppercorns (Jaluk)", qty: "5 seeds, cracked" },
      { item: "Fresh Ginger (Aada)", qty: "1 inch, crushed" },
      { item: "Cinnamon (Dalchini)", qty: "1 small piece (1 inch)" },
      { item: "Water", qty: "2.5 cups" },
    ],
    prepTimeMinutes: 10,
    steps: [
      "Combine water, tulsi, black pepper, crushed ginger, and cinnamon in a pot.",
      "Boil vigorously until reduced to roughly 1 cup.",
      "Strain into a cup; drink hot once daily during seasonal weather changes or flu outbreaks.",
      "Promotes respiratory resistance and cellular defense."
    ],
    dosage: {
      child: "Ages 4+: 1/4 cup warm with a little jaggery.",
      adult: "1 cup daily during flu season.",
      elderly: "1 cup daily. Enhances mucosal immunity."
    },
    dos: ["Drink warm once daily in the morning", "Combine with good handwashing and adequate sleep"],
    donts: ["Do not take more than twice daily (can overheat digestion in sensitive Pitta individuals)", "Do not neglect clinical flu vaccinations recommended by public health"],
    redFlags: [
      "Sudden high fever > 103°F with extreme prostration and severe dry cough",
      "Difficulty breathing or chest tightness",
      "Bluish discoloration around lips or tongue"
    ],
    culturalContext: "Assamese households prepare this aromatic kadha whenever the rainy monsoon yields to chilly winter winds, strengthening the upper mucosal barrier.",
    primarySpice: "Tulsi (Holy Basil)",
    difficulty: "Easy",
    suitableTime: "Morning"
  },
  {
    id: "panch-phuron-cleansing-broth",
    symptom: "Seasonal Flu Prevention",
    symptomSlug: "seasonal-flu-prevention",
    name: "Five-Spice Cleansing Infusion (Panch Phuron Jhol)",
    name_assamese: "পাঁচ ফোৰণৰ বিশোধনকাৰী ঝোল",
    ingredients: [
      { item: "Assamese Panch Phuron (Fenugreek, Nigella, Cumin, Mustard, Fennel)", qty: "1 tsp" },
      { item: "Garlic (Nohoru)", qty: "2 cloves, crushed" },
      { item: "Turmeric Powder (Haldi)", qty: "1/4 tsp" },
      { item: "Pure Cow Ghee or Mustard Oil", qty: "1/2 tsp" },
      { item: "Water", qty: "2 cups" },
    ],
    prepTimeMinutes: 8,
    steps: [
      "Heat ghee/mustard oil in a small pan; crackle the panch phuron spices for 30 seconds until fragrant.",
      "Add crushed garlic and turmeric powder.",
      "Pour in water and simmer for 5 minutes.",
      "Season with a pinch of rock salt; strain and sip warm like a light clear broth."
    ],
    dosage: {
      child: "Ages 5+: 1/3 cup warm broth.",
      adult: "1 cup warm broth, 2 to 3 times weekly.",
      elderly: "1 cup. Stimulates appetite and broad-spectrum immunity."
    },
    dos: ["Sip warm before lunch", "Inhale the aromatic spice vapors while drinking"],
    donts: ["Do not burn the spices during crackling (burnt methi turns bitterly unpalatable)", "Avoid if experiencing severe hyperacidity"],
    redFlags: [
      "Rapidly worsening fever with severe throat pain preventing swallowing",
      "Shortness of breath on mild exertion",
      "Persistent vomiting preventing fluid intake"
    ],
    culturalContext: "Panch Phuron (five whole spices) blends five distinct antimicrobial volatile oil profiles, balancing all three Ayurvedic doshas in seasonal transitions.",
    primarySpice: "Five-Spice (Panch Phuron)",
    difficulty: "Easy",
    suitableTime: "Before lunch"
  },

  // 45. Low Immunity / General Weakness
  {
    id: "kolajira-honey-vitality-tonic",
    symptom: "Low Immunity / General Weakness",
    symptomSlug: "low-immunity",
    name: "Black Cumin & Raw Honey Rejuvenator (Kolajira-Mou)",
    name_assamese: "ক’লাজিৰা আৰু মৌৰ বলকাৰক মিশ্ৰণ",
    ingredients: [
      { item: "Black Cumin / Nigella Seeds (Kolajira)", qty: "1/4 tsp, dry roasted and powdered" },
      { item: "Pure Raw Honey (Mou)", qty: "1 tsp" },
    ],
    prepTimeMinutes: 3,
    steps: [
      "Dry roast black cumin (kolajira / kalonji) seeds on a clean pan for 45 seconds.",
      "Grind into a fine black aromatic powder.",
      "Mix 1/4 tsp of this powder thoroughly with 1 tsp of pure raw honey.",
      "Lick slowly in the morning on an empty stomach."
    ],
    dosage: {
      child: "Ages 6+: 1/8 tsp powder with honey. (STRICT WARNING: Never give honey under 1 year).",
      adult: "1 tsp honey with 1/4 tsp kolajira powder once daily.",
      elderly: "Once daily. Thymoquinone in black cumin strengthens cellular immunity."
    },
    dos: ["Take first thing in the morning with warm water", "Ensure black cumin is authentic Nigella sativa (Kolajira)"],
    donts: ["Never exceed 1/2 tsp kolajira daily (concentrated seeds can be heating)", "Never give honey to infants under 1 year"],
    redFlags: [
      "Chronic low-grade fever with unexplained weight loss and drenching night sweats (requires clinical rule-out of TB or lymphoma)",
      "Recurrent severe bacterial infections requiring frequent antibiotics",
      "Persistent swollen, hard, non-tender lymph nodes in neck, armpits, or groin"
    ],
    culturalContext: "Kalonji (Kolajira) is hailed across traditional medicine as 'the seed of blessing' capable of reversing debility and restoring cellular vitality.",
    primarySpice: "Black Cumin (Kolajira)",
    difficulty: "Easy",
    suitableTime: "Morning upon waking"
  },
  {
    id: "amla-ginger-daily-shot",
    symptom: "Low Immunity / General Weakness",
    symptomSlug: "low-immunity",
    name: "Fresh Amla & Ginger Immunity Shot (Amlakhi-Aada Ras)",
    name_assamese: "আমলখি আৰু আদাৰ ৰোগ প্ৰতিৰোধক ৰস",
    ingredients: [
      { item: "Fresh Amla (Indian Gooseberry)", qty: "1 fruit, grated" },
      { item: "Fresh Ginger (Aada)", qty: "1/2 inch, grated" },
      { item: "Turmeric Powder", qty: "1 tiny pinch" },
      { item: "Warm Water", qty: "1/4 cup" },
    ],
    prepTimeMinutes: 4,
    steps: [
      "Grate fresh amla and ginger.",
      "Squeeze to extract 2 tablespoons of fresh juice.",
      "Mix with 1/4 cup warm water and a tiny pinch of turmeric.",
      "Drink as a morning wellness shot."
    ],
    dosage: {
      child: "Ages 4+: 2 tbsp diluted juice.",
      adult: "1/4 cup shot every morning.",
      elderly: "1/4 cup shot daily. Packed with polyphenols and bioavailable vitamin C."
    },
    dos: ["Drink immediately upon extraction", "Take after breakfast if stomach is sensitive to sour foods"],
    donts: ["Do not store extracted juice in metal containers or leave exposed to air", "Do not add white sugar"],
    redFlags: [
      "Frequent fainting episodes or severe dizziness upon standing",
      "Extreme pallor with brittle spoon-shaped fingernails (koilonychia)",
      "Sudden jaundice or dark tea-colored urine"
    ],
    culturalContext: "Amlakhi is the paramount 'Rasayana' (rejuvenator) of Indian traditional medicine, stimulating phagocytosis and immune surveillance.",
    primarySpice: "Ginger (Aada)",
    difficulty: "Easy",
    suitableTime: "Morning after breakfast"
  },

  // 46. Dehydration (mild)
  {
    id: "traditional-nimbu-pani-hydration",
    symptom: "Dehydration (mild)",
    symptomSlug: "mild-dehydration",
    name: "Traditional Indian Oral Rehydration Water (Nimbu-Nimokh-Misri Pani)",
    name_assamese: "নেমু, নিমখ আৰু মিচিৰিৰ পুনৰ্সজলীকৰণ পানী",
    ingredients: [
      { item: "Clean Boiled & Cooled Water", qty: "1 tall glass (250ml)" },
      { item: "Fresh Lemon / Kaji Nemu Juice", qty: "1 tbsp" },
      { item: "Rock Salt (Saindhava)", qty: "1/4 tsp (essential sodium)" },
      { item: "Mishri or Jaggery", qty: "1 tsp (essential glucose for sodium co-transport)" },
    ],
    prepTimeMinutes: 3,
    steps: [
      "Pour clean drinking water into a glass tumbler.",
      "Add fresh lemon juice, rock salt, and crushed rock sugar.",
      "Stir briskly until salt and sugar crystals are 100% dissolved.",
      "Sip slowly in small mouthfuls over 10-15 minutes.",
      "The sodium-glucose ratio enables rapid osmotic hydration through intestinal mucosal cells."
    ],
    dosage: {
      child: "Ages 1+: 1/2 to 1 cup slowly after sun exposure or mild activity.",
      adult: "1 to 2 glasses sipped slowly throughout hot afternoons or after sweat loss.",
      elderly: "1 glass daily in summer heat. Prevents silent geriatric dehydration."
    },
    dos: ["Sip slowly in small mouthfuls rather than gulping", "Use clean, boiled and cooled drinking water"],
    donts: ["Do not make overly salty or overly sweet (must taste like mild tears)", "Do not drink chilled with artificial ice cubes"],
    redFlags: [
      "Severe dehydration signs: sunken eyes, no tears when crying, no urination for > 8 hours",
      "Extreme confusion, lethargy, or loss of consciousness",
      "Pinching skin on abdomen stays tented up and does not snap back (loss of skin turgor)"
    ],
    culturalContext: "Before commercial ORS sachets existed, Indian mothers saved lives during summer heatwaves using the exact physiological ratio of Nimbu, Nimokh, and Misri.",
    primarySpice: "Lemon (Kaji Nemu)",
    difficulty: "Easy",
    suitableTime: "Mid-day or post-sweat"
  },
  {
    id: "tender-coconut-water-cardamom",
    symptom: "Dehydration (mild)",
    symptomSlug: "mild-dehydration",
    name: "Tender Coconut Water with Cardamom (Dab-Elaichi Pani)",
    name_assamese: "নাৰিকলৰ পানী আৰু ইলাচী",
    ingredients: [
      { item: "Fresh Tender Coconut Water", qty: "1 cup (200ml)" },
      { item: "Green Cardamom (Elaichi)", qty: "1 pod, crushed" },
      { item: "Rock Salt", qty: "1 tiny pinch" },
    ],
    prepTimeMinutes: 2,
    steps: [
      "Pour fresh tender coconut water into a glass.",
      "Add freshly crushed cardamom seeds and a microscopic pinch of rock salt.",
      "Stir and drink immediately at room temperature.",
      "Provides natural bio-identical potassium, magnesium, and natural electrolytes."
    ],
    dosage: {
      child: "Ages 1+: 1/2 cup fresh.",
      adult: "1 full coconut water daily during heat exhaustion.",
      elderly: "1 cup. Gentle natural electrolyte balancer. (Caution: monitor potassium in chronic kidney disease)."
    },
    dos: ["Drink immediately upon opening the fresh coconut", "Consume at room temperature"],
    donts: ["Do not consume if you have severe chronic kidney disease with hyperkalemia without doctor permission", "Avoid bottled commercial versions with added artificial sugars"],
    redFlags: [
      "Rapid thready pulse with low blood pressure upon standing",
      "Inability to swallow or keep fluids down due to continuous vomiting",
      "High fever with complete absence of sweating in high ambient heat (heat stroke emergency)"
    ],
    culturalContext: "Tender coconut water has an osmotic pressure nearly isotonic to human blood plasma, making it nature's supreme rehydration beverage.",
    primarySpice: "Cardamom (Elaichi)",
    difficulty: "Easy",
    suitableTime: "Afternoon"
  },

  // 47. Hangover / Overindulgence
  {
    id: "ginger-lemon-honey-hangover-recovery",
    symptom: "Hangover / Overindulgence",
    symptomSlug: "hangover",
    name: "Ginger, Lemon & Honey Rehydration Flush (Aada-Nemu-Mou)",
    name_assamese: "আদা, নেমু আৰু মৌৰ পুনৰুদ্ধাৰক পানী",
    ingredients: [
      { item: "Fresh Ginger (Aada)", qty: "1 inch, crushed" },
      { item: "Lemon / Kaji Nemu Juice", qty: "1 tbsp" },
      { item: "Pure Honey (Mou)", qty: "1 tsp" },
      { item: "Water", qty: "1.5 cups" },
      { item: "Black Salt (Kola Nimokh)", qty: "1/4 tsp" },
    ],
    prepTimeMinutes: 5,
    steps: [
      "Boil water with crushed ginger for 3 minutes.",
      "Strain into a tall glass and let cool until lukewarm.",
      "Stir in fresh lemon juice, black salt, and honey.",
      "Drink in slow sips to restore liver glycogen, rehydrate brain tissues, and clear acetaldehyde nausea."
    ],
    dosage: {
      child: "Not applicable.",
      adult: "1 to 2 glasses upon waking after dietary or alcohol overindulgence.",
      elderly: "1 glass for dietary sluggishness after heavy wedding feasts."
    },
    dos: ["Drink plenty of plain water alongside", "Rest in a quiet room and eat a light breakfast of fruit or toast"],
    donts: ["Do NOT drink coffee or alcoholic 'hair of the dog' drinks (worsens dehydration and gastric acidity)", "Do not take acetaminophen/paracetamol with alcohol (severe liver toxicity risk)"],
    redFlags: [
      "Persistent uncontrollable vomiting with inability to keep any water down for > 12 hours",
      "Vomiting blood or black coffee-ground material",
      "Severe confusion, seizures, or irregular slow breathing (< 8 breaths per min - acute alcohol poisoning emergency)"
    ],
    culturalContext: "Fructose in honey speeds up alcohol breakdown in the liver, while ginger settles gastric distress and lemon replenishes electrolytes.",
    primarySpice: "Ginger (Aada)",
    difficulty: "Easy",
    suitableTime: "Morning upon waking"
  },
  {
    id: "mint-roasted-jeera-buttermilk-cooler",
    symptom: "Hangover / Overindulgence",
    symptomSlug: "hangover",
    name: "Cooling Mint & Roasted Cumin Buttermilk (Podina-Jeera Ghol)",
    name_assamese: "পদিনা আৰু ভজা জিৰাৰ শীতল ঘোল",
    ingredients: [
      { item: "Fresh Curd/Yogurt", qty: "3 tbsp" },
      { item: "Cool Water", qty: "1 cup" },
      { item: "Roasted Cumin Powder (Jeera)", qty: "1/2 tsp" },
      { item: "Fresh Mint Leaves (Podina)", qty: "6 leaves, crushed" },
      { item: "Black Salt", qty: "1 pinch" },
    ],
    prepTimeMinutes: 5,
    steps: [
      "Whisk curd and cool water together until thin and frothy.",
      "Add roasted cumin powder, crushed mint leaves, and black salt.",
      "Drink at room temperature.",
      "Calms heated stomach bile and restores gut microbiome balance."
    ],
    dosage: {
      child: "Not applicable.",
      adult: "1 glass with light lunch.",
      elderly: "1 glass. Settles digestive heat after heavy eating."
    },
    dos: ["Drink slowly at room temperature", "Eat light foods like khichdi or clear dal"],
    donts: ["Do not drink iced", "Avoid rich, fried, oily foods while recovering"],
    redFlags: [
      "Severe pain radiating from upper abdomen to back (acute pancreatitis risk)",
      "Yellowing of skin or eyes",
      "Fainting or severe palpitations"
    ],
    culturalContext: "Assamese 'Ghol' neutralizes digestive Pitta fire and quenches intense post-party thirst naturally.",
    primarySpice: "Cumin (Jeera)",
    difficulty: "Easy",
    suitableTime: "Midday"
  },

  // 48. Motion Sickness
  {
    id: "crystallized-ginger-travel-chew",
    symptom: "Motion Sickness",
    symptomSlug: "motion-sickness",
    name: "Ginger & Rock Sugar Travel Chew (Aada-Misri Chobon)",
    name_assamese: "আদা আৰু মিচিৰিৰ যাত্ৰাকালীন চোবোৱা",
    ingredients: [
      { item: "Fresh Ginger (Aada)", qty: "1 thin coin, washed and peeled" },
      { item: "Mishri (Rock Sugar)", qty: "1 small crystal" },
    ],
    prepTimeMinutes: 1,
    steps: [
      "Cut a small, thin coin of fresh ginger and pair with a small crystal of rock sugar.",
      "Pop into your mouth 15 minutes BEFORE boarding a car, bus, boat, or plane.",
      "Chew very slowly and swallow the fragrant, sweet-spicy saliva.",
      "Gingerols interrupt the vestibular-gastrointestinal emetic pathway naturally."
    ],
    dosage: {
      child: "Ages 6+: A tiny paper-thin ginger shaving with rock sugar.",
      adult: "Chew 1 slice 15 minutes before travel, and another 2 hours later if needed.",
      elderly: "Safe travel aid without the extreme sedation caused by commercial antihistamine pills."
    },
    dos: ["Chew 15-20 minutes before departure", "Look at the distant horizon through the front window while traveling"],
    donts: ["Do NOT read books or look down at smartphones in a moving vehicle", "Do not eat a heavy, greasy meal right before travel"],
    redFlags: [
      "Motion sickness symptoms persisting days after travel has stopped (mal de debarquement syndrome)",
      "Severe room-spinning vertigo accompanied by sudden hearing loss or double vision",
      "Persistent vomiting leading to extreme weakness and dehydration"
    ],
    culturalContext: "Scientific trials confirm traditional maritime lore: ginger is superior to dimenhydrinate in reducing motion-induced nausea without causing drowsiness.",
    primarySpice: "Ginger (Aada)",
    difficulty: "Easy",
    suitableTime: "15 minutes before travel"
  },
  {
    id: "lemon-wedge-black-pepper-travel-suck",
    symptom: "Motion Sickness",
    symptomSlug: "motion-sickness",
    name: "Lemon Wedge & Black Pepper Sucking Slice (Nemu-Jaluk Chakal)",
    name_assamese: "নেমু আৰু জালুকৰ যাত্ৰাকালীন চকল",
    ingredients: [
      { item: "Fresh Lemon / Kaji Nemu", qty: "1 small wedge" },
      { item: "Black Pepper Powder (Jaluk)", qty: "1 tiny pinch" },
      { item: "Black Salt (Kola Nimokh)", qty: "1 tiny pinch" },
    ],
    prepTimeMinutes: 2,
    steps: [
      "Sprinkle black pepper and black salt onto a fresh lemon wedge.",
      "Carry in a clean small travel container.",
      "When winding mountain roads cause stomach queasiness, smell the citrus rind and gently suck the wedge.",
      "Restores normal gastric rhythm immediately."
    ],
    dosage: {
      child: "Ages 4+: Licking the wedge is safe and comforting for car sickness.",
      adult: "Suck as needed during winding road trips.",
      elderly: "Safe and effective."
    },
    dos: ["Inhale the essential citrus oils from the peel", "Keep windows cracked open for fresh air in the car"],
    donts: ["Do not sit facing backward in buses or trains", "Do not smoke inside the vehicle"],
    redFlags: [
      "Vomiting accompanied by severe chest tightness or cold sweats",
      "Inability to walk straight or severe ataxia",
      "Headache with pupil size discrepancy"
    ],
    culturalContext: "Long bus journeys through the winding hill tracts of Northeast India always feature elders carrying salted Kaji Nemu wedges in handkerchiefs.",
    primarySpice: "Lemon (Kaji Nemu)",
    difficulty: "Easy",
    suitableTime: "During travel"
  },

  // 49. Hiccups
  {
    id: "granulated-sugar-instant-swallow-hiccups",
    symptom: "Hiccups",
    symptomSlug: "hiccups",
    name: "Granulated Sugar / Mishri Instant Swallow (Sini/Misri Nigal)",
    name_assamese: "চেনি বা মিচিৰি পোনপটীয়াভাৱে গিলা",
    ingredients: [
      { item: "Granulated Sugar or Powdered Mishri", qty: "1 level tsp" },
    ],
    prepTimeMinutes: 1,
    steps: [
      "Place 1 level teaspoon of dry granulated white sugar or powdered rock sugar on the back of your tongue.",
      "Swallow it down immediately in one gulp WITHOUT water.",
      "The coarse sugar granules stimulate the sensory nerve endings in the back of the nasopharynx.",
      "This sensory surge overloads and resets the phrenic nerve arc, stopping diaphragm spasms instantly."
    ],
    dosage: {
      child: "Ages 4+: 1/2 tsp dry sugar. (Supervise carefully so child does not inhale sugar).",
      adult: "1 tsp dry sugar swallowed dry.",
      elderly: "1 tsp swallowed dry. Quick, drug-free reflex interruption."
    },
    dos: ["Swallow in one clean gulp", "Take a deep breath and hold it for 10 seconds right after swallowing"],
    donts: ["Do NOT inhale while sugar is in mouth (can aspirate into trachea)", "Do not give dry sugar to infants under 3 years"],
    redFlags: [
      "Hiccups lasting continuously for more than 48 hours (intractable hiccups require medical investigation for central or diaphragmatic causes)",
      "Hiccups accompanied by chest pain, shortness of breath, or numbness in arms",
      "Hiccups causing severe difficulty swallowing or vomiting food"
    ],
    culturalContext: "Published in the New England Journal of Medicine, this age-old kitchen trick has a validated neurophysiological basis: vagal reflex resetting.",
    primarySpice: "Sugar / Mishri",
    difficulty: "Easy",
    suitableTime: "Immediately when hiccups begin"
  },
  {
    id: "cardamom-water-hiccup-sip",
    symptom: "Hiccups",
    symptomSlug: "hiccups",
    name: "Warm Cardamom Water Inverted Sip (Elaichi Pani)",
    name_assamese: "ইলাচীৰ পানী আৰু উশাহ নিয়ন্ত্ৰণ",
    ingredients: [
      { item: "Green Cardamom (Elaichi)", qty: "1 pod, crushed" },
      { item: "Warm Water", qty: "1/2 cup" },
    ],
    prepTimeMinutes: 3,
    steps: [
      "Steep crushed cardamom pod in warm water for 2 minutes.",
      "Strain into a cup.",
      "Take small sips continuously without breathing in between sips (take 7 continuous swallows).",
      "Alternatively, bend forward at the waist and drink from the 'opposite' rim of the glass.",
      "Relaxes diaphragmatic flutter."
    ],
    dosage: {
      child: "Ages 4+: Small continuous sips.",
      adult: "1/2 cup sipped continuously.",
      elderly: "Safe and soothing."
    },
    dos: ["Swallow in a continuous rhythm", "Breathe into a paper bag for 1 minute if hiccups persist (increases CO2 to calm diaphragm)"],
    donts: ["Do not drink iced water which can shock vagus nerve into further spasms", "Never frighten an elderly person as a hiccup cure"],
    redFlags: [
      "Hiccups accompanied by sudden slurred speech or facial droop (stroke)",
      "Hiccups that prevent sleeping or eating for days",
      "Hiccups accompanied by severe heartburn and regurgitation of blood"
    ],
    culturalContext: "Cardamom has antispasmodic volatile oils that soothe upper esophageal and diaphragmatic nervous irritability.",
    primarySpice: "Cardamom (Elaichi)",
    difficulty: "Easy",
    suitableTime: "When hiccups strike"
  },

  // 50. Bad Breath
  {
    id: "fennel-clove-mouth-freshener-chew",
    symptom: "Bad Breath",
    symptomSlug: "bad-breath",
    name: "Fennel & Clove Aromatic Mouth Freshener (Mouri-Long Mukhwas)",
    name_assamese: "মৌৰি আৰু লংৰ মুখশুদ্ধি",
    ingredients: [
      { item: "Fennel Seeds (Mouri)", qty: "1/2 tsp" },
      { item: "Clove (Long)", qty: "1 bud" },
      { item: "Cardamom Seeds (Elaichi)", qty: "2-3 seeds" },
    ],
    prepTimeMinutes: 1,
    steps: [
      "Combine fennel seeds, 1 clove, and cardamom seeds in the palm of your hand.",
      "Chew slowly and thoroughly after meals for 1-2 minutes.",
      "The antimicrobial volatile oils (anethole, eugenol, cineole) eradicate odor-producing anaerobic mouth bacteria.",
      "Swallow the chewed seeds and juices for digestive freshness."
    ],
    dosage: {
      child: "Ages 6+: 1/4 tsp fennel seeds to chew.",
      adult: "Chew after every main meal.",
      elderly: "Safe, stimulates salivary flow, and counters dry mouth (xerostomia)."
    },
    dos: ["Chew thoroughly to stimulate cleansing salivary flow", "Brush teeth twice daily and clean the white coating off the tongue with a tongue cleaner"],
    donts: ["Do not substitute with sugary artificial mint candies (sugar feeds oral bacteria)", "Do not swallow whole"],
    redFlags: [
      "Fruity, acetone-like breath odor (diabetic ketoacidosis emergency)",
      "Breath smelling strongly of ammonia/urine (end-stage kidney disease sign)",
      "Severe foul breath with loose teeth, receding gums, and bleeding pockets (periodontitis requiring dentist)"
    ],
    culturalContext: "The traditional post-meal 'Mukhwas' or 'Paan-tamul' tradition in Assam used wild spices to cleanse the palate and arrest anaerobic oral decay naturally.",
    primarySpice: "Fennel (Mouri)",
    difficulty: "Easy",
    suitableTime: "After lunch and dinner"
  },
  {
    id: "guava-mint-leaf-warm-rinse",
    symptom: "Bad Breath",
    symptomSlug: "bad-breath",
    name: "Tender Guava & Mint Leaf Astringent Mouthwash (Madhuri-Podina Kuli)",
    name_assamese: "মধূৰী আৰু পদিনা পাতৰ মুখ কুলকুচা",
    ingredients: [
      { item: "Tender Guava Leaves (Madhuri Aam)", qty: "4-5 leaves" },
      { item: "Fresh Mint Leaves (Podina)", qty: "6 leaves" },
      { item: "Water", qty: "1.5 cups" },
      { item: "Rock Salt", qty: "1/4 tsp" },
    ],
    prepTimeMinutes: 7,
    steps: [
      "Wash tender young guava leaves and mint leaves.",
      "Boil in water for 5 minutes until water turns pale green and astringent.",
      "Strain, add rock salt, and let cool until pleasantly warm.",
      "Swish vigorously around teeth and gums for 45 seconds, then spit out.",
      "Use morning and night."
    ],
    dosage: {
      child: "Ages 6+: Swishing and spitting under supervision.",
      adult: "Rinse twice daily.",
      elderly: "Rinse twice daily. Natural tannins tighten loose, bleeding gums."
    },
    dos: ["Swish vigorously between teeth before spitting", "Scrape the tongue gently every morning"],
    donts: ["Do not swallow the rinse", "Do not ignore persistent dental decay"],
    redFlags: [
      "Persistent mouth sores or painless white/red patches lasting > 3 weeks (oral screening needed)",
      "Unexplained chronic tonsil stones with foul cheesy chunks in throat",
      "Bad breath accompanied by difficulty swallowing and regurgitation of undigested food"
    ],
    culturalContext: "Guava leaves (Madhuri Pat) are packed with astringent tannins and flavonoids that clinical research has confirmed match chlorhexidine in oral plaque reduction.",
    primarySpice: "Mint (Podina)",
    difficulty: "Easy",
    suitableTime: "Morning and evening"
  },

  // ==========================================
  // H. CHILDREN-SPECIFIC
  // ==========================================

  // 51. Mild Cold in Children (age-appropriate remedies only)
  {
    id: "child-warm-mustard-oil-foot-touch",
    symptom: "Mild Cold in Children (age-appropriate remedies only)",
    symptomSlug: "child-mild-cold",
    name: "Gentle Warm Mustard Oil Sole Touch for Children (Mitha Tel Khol)",
    name_assamese: "শিশুৰ ভৰিৰ তলুৱাত কুহুমীয়া মিঠাতেলৰ পৰশ",
    ingredients: [
      { item: "Pure Mustard Oil (Mitha Tel)", qty: "1 tbsp" },
      { item: "Garlic (Nohoru)", qty: "1 clove, lightly bruised (for mild scent only)" },
      { item: "Warm Cotton Socks", qty: "1 pair" },
    ],
    prepTimeMinutes: 4,
    steps: [
      "Warm mustard oil with 1 bruised garlic clove in a small steel bowl for 60 seconds.",
      "Remove garlic clove completely. Let oil cool down until barely lukewarm.",
      "TEST CRITICALLY: Test temperature on the delicate inner aspect of your own wrist before touching child.",
      "Gently rub a small amount onto the SOLES OF THE CHILD'S FEET only (not on sensitive facial skin or raw chest).",
      "Put on warm cotton socks. Put child to bed in comfortable sleeping clothes."
    ],
    dosage: {
      child: "Ages 1+: Rub gently on soles of feet before bedtime only.",
      adult: "Not applicable (designed specifically for gentle pediatric comfort).",
      elderly: "Safe and comforting."
    },
    dos: ["Apply ONLY to the soles of feet, not the face or chest", "Always test oil on your own inner wrist first to ensure it is not too hot"],
    donts: ["NEVER put oil inside child's nostrils or ears", "NEVER apply hot oil", "Do not give aspirin to children or teenagers (Reye's syndrome risk)"],
    redFlags: [
      "Child is breathing rapidly with chest pulling inward under the ribs (chest indrawing)",
      "Grunting with each breath, flaring nostrils, or blue lips/tongue (emergency hospital transfer)",
      "Child is abnormally drowsy, refusing all fluids, or cannot be woken easily",
      "Fever in a baby under 3 months old (requires immediate hospital evaluation)"
    ],
    culturalContext: "Assamese mothers have traditionally protected toddlers from damp winter drafts by warming their foot reflex zones with garlic-kissed mustard oil.",
    primarySpice: "Mustard Oil (Mitha Tel)",
    difficulty: "Easy",
    suitableTime: "Bedtime"
  },
  {
    id: "child-tulsi-warm-sip",
    symptom: "Mild Cold in Children (age-appropriate remedies only)",
    symptomSlug: "child-mild-cold",
    name: "Gentle Tulsi & Warm Water Soother for Children (Tulsi Pani)",
    name_assamese: "শিশুৰ বাবে মৃদু তুলসীৰ কুহুমীয়া পানী",
    ingredients: [
      { item: "Fresh Tulsi Leaves", qty: "3-4 clean leaves" },
      { item: "Water", qty: "1/2 cup" },
      { item: "Mishri (Rock Sugar) or Honey (Mou)", qty: "1/2 tsp (STRICTLY NO HONEY UNDER 1 YEAR)" },
    ],
    prepTimeMinutes: 5,
    steps: [
      "Boil 3-4 clean tulsi leaves in 1/2 cup of water for 3 minutes until pale golden.",
      "Strain through a fine tea strainer into a child's cup.",
      "Let cool until lukewarm (pleasantly warm to touch).",
      "Sweeten with a pinch of rock sugar, or 1/2 tsp honey ONLY if child is older than 12 months.",
      "Offer in small sips using a spoon."
    ],
    dosage: {
      child: "Ages 1 to 2 yrs: 1 to 2 tablespoons lukewarm. Ages 3 to 7 yrs: 3 to 4 tablespoons twice daily. (CRITICAL SAFETY RULE: STRICTLY NEVER give honey to infants under 1 year due to fatal infant botulism risk).",
      adult: "Not applicable.",
      elderly: "Not applicable."
    },
    dos: ["Check temperature before offering to child", "Keep child well hydrated with breastmilk, water, or warm soups"],
    donts: ["ABSOLUTE RULE: NEVER give honey to infants under 1 year of age (Clostridium botulinum spores)", "Do not force fluids if child is gagging"],
    redFlags: [
      "Barking cough resembling a seal with stridor (Croup emergency)",
      "High fever lasting over 48 hours without decrease",
      "No wet diapers for over 6-8 hours in an infant"
    ],
    culturalContext: "Tulsi provides mild pediatric-safe expectorant properties, gently clearing toddler nasal drip without harsh synthetic decongestants.",
    primarySpice: "Tulsi (Holy Basil)",
    difficulty: "Easy",
    suitableTime: "Morning and afternoon"
  },

  // 52. Teething Discomfort (traditional soothing practices, non-medicinal)
  {
    id: "chilled-cucumber-carrot-safe-teether",
    symptom: "Teething Discomfort (traditional soothing practices, non-medicinal)",
    symptomSlug: "teething-discomfort",
    name: "Chilled Carrot / Cucumber Natural Cold Gum Soother (Tiyoh/Gajor)",
    name_assamese: "কেঁচুৱাৰ দাঁত গজাৰ বাবে শীতল শসা বা গাজৰ",
    ingredients: [
      { item: "Large Thick Peeled Carrot or Cucumber", qty: "1 large piece (must be too large to swallow whole)" },
      { item: "Clean Cold Water", qty: "To wash and chill" },
    ],
    prepTimeMinutes: 3,
    steps: [
      "Wash and peel a large, thick carrot or cold cucumber (or use a clean, chilled silicone teething ring).",
      "Ensure the piece is substantial enough that the baby cannot bite off or choke on small chunks.",
      "STRICT MANDATORY SAFETY RULE: An adult MUST sit directly in front of the baby and maintain continuous, unbroken visual supervision.",
      "Allow the baby to gnaw and rub their swollen gums against the smooth, cold surface for 5-10 minutes.",
      "Cold temperature naturally numbs inflamed gingival nerve endings and relieves pressure."
    ],
    dosage: {
      child: "Babies 6+ months (teething age): 5 to 10 minutes of gnawing under continuous direct adult supervision.",
      adult: "Not applicable.",
      elderly: "Not applicable."
    },
    dos: ["An adult MUST maintain continuous 100% visual supervision throughout", "Use a large, hard cold vegetable that cannot break into choke-hazard chunks, or use a chilled damp washcloth"],
    donts: ["NEVER leave a teething baby unattended with any food item", "NEVER use teething gels containing benzocaine or belladonna (can cause fatal methemoglobinemia)", "Never freeze solid into ice (ice can stick and tear delicate gums; chill in refrigerator only)"],
    redFlags: [
      "High fever > 101°F (teething does NOT cause true high fevers - investigate other pediatric infections)",
      "Severe persistent diarrhea, lethargy, or vomiting",
      "Gums bleeding profusely or showing white ulcerations"
    ],
    culturalContext: "Cold natural compresses and smooth root vegetables have comforted teething infants for centuries before plastic chemical rings existed.",
    primarySpice: "Cucumber (Tiyoh)",
    difficulty: "Easy",
    suitableTime: "During fussy teething spells"
  },
  {
    id: "clean-finger-coconut-oil-gum-massage",
    symptom: "Teething Discomfort (traditional soothing practices, non-medicinal)",
    symptomSlug: "teething-discomfort",
    name: "Clean Finger Cold Gum Massage (Anguli Malish)",
    name_assamese: "পৰিস্কাৰ আঙুলিৰে আলুৰ মৃদু মালিশ",
    ingredients: [
      { item: "Cold Virgin Coconut Oil (Narikol Tel)", qty: "1 tiny drop" },
      { item: "Soap and Warm Water", qty: "To wash parent's hands thoroughly" },
    ],
    prepTimeMinutes: 2,
    steps: [
      "Thoroughly wash your hands with warm water and soap for 20 seconds, especially scrubbing under nails.",
      "Place 1 tiny drop of edible virgin coconut oil on your clean index fingertip.",
      "Gently but firmly rub your fingertip across the baby's swollen, aching gums.",
      "The firm counter-pressure temporarily overrides the erupting tooth's pain signals traveling to the brain.",
      "Massage for 2-3 minutes while speaking soothingly to the baby."
    ],
    dosage: {
      child: "Teething babies (6+ months): 2-3 minutes as needed when fussy.",
      adult: "Not applicable.",
      elderly: "Not applicable."
    },
    dos: ["Wash hands thoroughly before touching baby's mouth", "Apply gentle, firm counter-pressure to the swollen ridge"],
    donts: ["NEVER apply alcohol, brandy, or crushed aspirin to baby gums", "Do not use amber teething necklaces (serious choking and strangulation hazard)"],
    redFlags: [
      "Baby refuses all nursing or bottle feeds for more than 12 hours",
      "Extreme irritability that cannot be comforted by holding or rocking",
      "Ear pulling accompanied by high fever (middle ear infection)"
    ],
    culturalContext: "Counter-pressure is the clinically proven physiological remedy for teething pain; virgin coconut oil adds gentle natural lauric acid lubrication.",
    primarySpice: "Virgin Coconut Oil",
    difficulty: "Easy",
    suitableTime: "Before nap or bedtime"
  }
];
