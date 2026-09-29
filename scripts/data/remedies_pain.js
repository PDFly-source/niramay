// scripts/data/remedies_pain.js

module.exports = [
  // 21. Headache (Tension)
  {
    id: "aada-rongasa-ginger-black-tea",
    symptom: "Headache (Tension)",
    symptomSlug: "headache-tension",
    name: "Assamese Ginger Black Tea (Aada Rongasa)",
    name_assamese: "আদা দিয়া ৰঙা চাহ",
    ingredients: [
      { item: "Fresh Ginger (Aada)", qty: "1 inch, crushed" },
      { item: "Assamese CTC / Orthodox Tea Leaves", qty: "1/2 tsp" },
      { item: "Water", qty: "1.5 cups" },
      { item: "Cardamom (Elaichi)", qty: "1 pod, crushed" },
      { item: "Jaggery (Gur) or Rock Sugar", qty: "1 tsp" },
    ],
    prepTimeMinutes: 5,
    steps: [
      "Bring water to a boil with crushed ginger and cracked cardamom.",
      "Add black tea leaves; simmer for exactly 60 seconds (do not over-brew into bitterness).",
      "Strain into a cup and sweeten with jaggery or rock sugar.",
      "Sit in a dim, quiet room and sip slowly while relaxing shoulder and neck muscles."
    ],
    dosage: {
      child: "Ages 8+: 1/3 cup diluted tea with jaggery.",
      adult: "1 cup sipped slowly at the onset of a tension headache.",
      elderly: "1 cup. Relieves constriction of cranial blood vessels."
    },
    dos: ["Drink warm in a dimly lit room", "Perform slow gentle neck rolls while sipping"],
    donts: ["Do not over-boil tea leaves (excess tannins trigger stomach acidity)", "Do not drink more than 3 cups of caffeinated tea daily"],
    redFlags: [
      "Sudden, excruciating headache peaking within seconds ('thunderclap' headache - call emergency)",
      "Headache accompanied by slurred speech, facial droop, or arm weakness (stroke warning)",
      "Headache with stiff neck, high fever, and altered mental state (meningitis warning)"
    ],
    culturalContext: "A steaming cup of fresh Aada Rongasa is the undisputed home antidote across tea gardens and villages of Assam for washing away afternoon fatigue and mental tension.",
    primarySpice: "Ginger (Aada)",
    difficulty: "Easy",
    suitableTime: "Afternoon or when head feels tight"
  },
  {
    id: "clove-paste-forehead-compress",
    symptom: "Headache (Tension)",
    symptomSlug: "headache-tension",
    name: "Clove & Sandalwood Forehead Compress (Long Lep)",
    name_assamese: "লং আৰু চন্দনৰ কপালৰ লেপ",
    ingredients: [
      { item: "Cloves (Long)", qty: "2 cloves, finely ground into paste" },
      { item: "Water or Rose Water", qty: "1 tsp" },
      { item: "Sandalwood Powder (Chandan)", qty: "1/4 tsp (optional)" },
    ],
    prepTimeMinutes: 4,
    steps: [
      "Rub cloves with a few drops of water on a rough stone slab (or mix fine clove powder with water) to make a smooth paste.",
      "Add a pinch of sandalwood powder if available for cooling balance.",
      "Apply a thin layer across the forehead and temples.",
      "Lie down with closed eyes for 15-20 minutes. Wash off gently with cool water."
    ],
    dosage: {
      child: "Ages 8+: Apply a very light swipe on forehead only.",
      adult: "Apply across temples and forehead during tension episodes.",
      elderly: "Apply on forehead. Natural analgesic action without systemic drug interaction."
    },
    dos: ["Wash hands thoroughly after applying", "Keep paste away from the eye contour"],
    donts: ["NEVER get paste into the eyes (clove eugenol stings intensely)", "Do not apply on broken or scratched skin"],
    redFlags: [
      "Headache following head trauma or fall in an elderly person",
      "New headache in someone over 50 years of age with tender scalp arteries",
      "Headache awakening you from sleep every single night with projectile vomiting"
    ],
    culturalContext: "Eugenol in cloves produces a gentle warm-cool tingling sensation that overrides pain signals traveling along the trigeminal pathways.",
    primarySpice: "Clove (Long)",
    difficulty: "Easy",
    suitableTime: "When headache begins"
  },

  // 22. Migraine (mild, non-severe)
  {
    id: "coriander-cardamom-migraine-water",
    symptom: "Migraine (mild, non-severe)",
    symptomSlug: "mild-migraine",
    name: "Coriander & Cardamom Pitta-Cooling Brew (Dhania-Elaichi Sarbat)",
    name_assamese: "ধনিয়া আৰু ইলাচীৰ আধকপালী প্ৰশমক পানী",
    ingredients: [
      { item: "Coriander Seeds (Dhania)", qty: "1 tbsp, bruised" },
      { item: "Green Cardamom (Elaichi)", qty: "2 pods, cracked" },
      { item: "Water", qty: "1.5 cups" },
      { item: "Mishri (Rock Sugar)", qty: "1 tsp" },
    ],
    prepTimeMinutes: 6,
    steps: [
      "Lightly bruise coriander seeds and cardamom pods.",
      "Boil in water for 4 minutes, then turn off flame.",
      "Let cool to room temperature; strain and stir in unrefined rock sugar (mishri).",
      "Drink in a quiet, dark room at the earliest prodromal aura sign."
    ],
    dosage: {
      child: "Ages 7+: 1/2 cup at onset.",
      adult: "1 cup at the earliest sign of migraine aura or throbbing, max twice daily.",
      elderly: "1 cup. Safely pacifies hyperactive vascular Pitta without cardiac stress."
    },
    dos: ["Take at the first flicker of headache before pain becomes severe", "Rest in a quiet, darkened room away from screens"],
    donts: ["Do not skip meals or get dehydrated", "Avoid bright fluorescent lights and loud noises during onset"],
    redFlags: [
      "Worst headache of life that feels like an explosion inside the skull",
      "Sudden loss of vision in one eye or persistent neurological deficits",
      "Fever, stiff neck, and confusion"
    ],
    culturalContext: "Ayurveda classifies mild throbbing migraines under 'Ardhavabhedaka' (Pitta-Vata imbalance). Cooling coriander pacifies cranial vascular inflammation naturally.",
    primarySpice: "Coriander seeds (Dhania)",
    difficulty: "Easy",
    suitableTime: "At earliest warning sign of migraine"
  },
  {
    id: "ginger-peppermint-temple-soother",
    symptom: "Migraine (mild, non-severe)",
    symptomSlug: "mild-migraine",
    name: "Ginger Sip with Cold Peppermint Compress (Aada-Podina)",
    name_assamese: "আদাৰ পানী আৰু পদিনাৰ ঠাণ্ডা পট্টি",
    ingredients: [
      { item: "Fresh Ginger (Aada)", qty: "1/2 inch, crushed" },
      { item: "Water", qty: "1 cup" },
      { item: "Fresh Mint Leaves (Podina)", qty: "6 leaves, crushed in cold water" },
      { item: "Clean Washcloth", qty: "1 piece" },
    ],
    prepTimeMinutes: 5,
    steps: [
      "Simmer ginger in 1 cup of water for 3 minutes; strain and drink lukewarm (ginger helps block inflammatory prostaglandins).",
      "Meanwhile, soak a clean washcloth in cold water infused with crushed mint leaves.",
      "Wring out excess liquid and lay the chilled mint compress over forehead and back of the neck.",
      "Rest with eyes closed for 20 minutes."
    ],
    dosage: {
      child: "Ages 6+: Compress on forehead; 1/4 cup ginger water.",
      adult: "Drink 1 cup ginger tea; apply cold mint compress for 20 minutes.",
      elderly: "Safe and non-invasive. Reduces migraine-associated nausea."
    },
    dos: ["Apply cold compress to forehead and neck while sipping warm ginger tea", "Drink plenty of room-temperature water"],
    donts: ["Do not use ice directly on bare skin without a cloth barrier", "Do not delay clinical migraine medication if prescribed by your neurologist"],
    redFlags: [
      "Migraine accompanied by numbness or pins-and-needles spreading down one side of body",
      "Seizure or blackout",
      "Migraine lasting continuously for more than 72 hours (status migrainosus)"
    ],
    culturalContext: "Clinical research confirms traditional wisdom: ginger acts on 5-HT receptors similarly to triptans, soothing vascular spasm and nausea during migraines.",
    primarySpice: "Ginger (Aada)",
    difficulty: "Easy",
    suitableTime: "At onset of throbbing"
  },

  // 23. Joint Pain (mild/chronic)
  {
    id: "nohoru-mitha-tel-joint-deep-rub",
    symptom: "Joint Pain (mild/chronic, e.g., knee stiffness)",
    symptomSlug: "joint-pain",
    name: "Garlic & Mustard Oil Deep Rub (Nohoru-Mitha Tel)",
    name_assamese: "নহৰু আৰু মিঠাতেলৰ বাত-বিষৰ মালিশ",
    ingredients: [
      { item: "Mustard Oil (Mitha Tel)", qty: "1/4 cup" },
      { item: "Garlic (Nohoru)", qty: "6-8 cloves, peeled and crushed" },
      { item: "Methi Seeds (Fenugreek)", qty: "1 tsp" },
    ],
    prepTimeMinutes: 8,
    steps: [
      "Heat mustard oil in a heavy iron or steel pan on low flame.",
      "Add crushed garlic cloves and fenugreek seeds.",
      "Cook until garlic turns dark brown (not fully charred black).",
      "Turn off heat; let cool until pleasantly warm.",
      "Strain and gently massage into stiff knees, ankles, or wrists in circular motions for 5-10 minutes.",
      "Follow with a warm dry towel compress."
    ],
    dosage: {
      child: "Not applicable for degenerative joint pain; for growing pains, use plain warm sesame oil.",
      adult: "Massage onto stiff joints once or twice daily.",
      elderly: "Massage twice daily, especially before bed and in chilly mornings. Deeply beneficial for Vata joint stiffness."
    },
    dos: ["Massage in the direction of hair growth towards the heart", "Keep joints warm with woolens after massage"],
    donts: ["Never massage vigorously over an acutely red, hot, swollen joint (can aggravate septic or gouty arthritis)", "Do not wash skin with cold water immediately after oil massage"],
    redFlags: [
      "Joint is fiery red, extremely hot to the touch, and swollen with high fever (septic arthritis emergency)",
      "Sudden inability to bear any weight on the leg after a twist or pop (ligament tear/fracture)",
      "Joint pain accompanied by morning stiffness lasting longer than an hour with symmetrical joint swelling (rheumatoid arthritis)"
    ],
    culturalContext: "Nohoru-Mitha Tel is Assam's centuries-old household therapy for winter joint stiffness (Ghati-Bix), delivering warm diallyl sulfides straight to aching periarticular tissues.",
    primarySpice: "Mustard Oil (Mitha Tel)",
    difficulty: "Easy",
    suitableTime: "Morning after waking or before sleep"
  },
  {
    id: "soaked-methi-water-joint-nourisher",
    symptom: "Joint Pain (mild/chronic, e.g., knee stiffness)",
    symptomSlug: "joint-pain",
    name: "Soaked Fenugreek Seed Elixir (Methi Pani)",
    name_assamese: "তিওঁৱা মেথিৰ পানী",
    ingredients: [
      { item: "Fenugreek Seeds (Methi)", qty: "1 tsp" },
      { item: "Water", qty: "1 cup" },
    ],
    prepTimeMinutes: 5,
    steps: [
      "Rinse 1 tsp of fenugreek seeds in fresh water.",
      "Soak overnight in 1 cup of clean drinking water (8-10 hours).",
      "In the morning, the water will turn pale yellow and viscous.",
      "Stir, strain, and drink the golden water on an empty stomach.",
      "Chew the softened, sprouted methi seeds thoroughly."
    ],
    dosage: {
      child: "Not generally needed for children.",
      adult: "1 cup soaked water + chew the seeds every morning.",
      elderly: "1 cup every morning. Excellent for joint lubrication and blood sugar balance."
    },
    dos: ["Drink first thing in the morning", "Chew the softened seeds for maximum dietary fiber and diosgenin saponins"],
    donts: ["Do not take during pregnancy without obstetrician clearance (fenugreek can stimulate uterine contractions)", "Do not discard the softened seeds"],
    redFlags: [
      "Inability to straighten knee completely with locking of the joint",
      "Severe joint deformity developing rapidly",
      "Joint pain associated with unexplained weight loss and night sweats"
    ],
    culturalContext: "Methi seeds are rich in diosgenin and mucilaginous compounds that replenish the Ayurvedic 'Shleshaka Kapha' (synovial fluid) in aging knees.",
    primarySpice: "Fenugreek (Methi)",
    difficulty: "Easy",
    suitableTime: "Morning upon waking"
  },

  // 24. Muscle Cramps
  {
    id: "rock-salt-sesame-oil-cramp-rub",
    symptom: "Muscle Cramps",
    symptomSlug: "muscle-cramps",
    name: "Warm Sesame & Rock Salt Muscle Compress (Til Tel-Nimokh)",
    name_assamese: "তিল তেল আৰু কলা নিমখৰ মালিশ",
    ingredients: [
      { item: "Sesame Oil (Til Tel) or Mustard Oil", qty: "2 tbsp, warm" },
      { item: "Rock Salt (Saindhava)", qty: "1/4 tsp, powdered" },
    ],
    prepTimeMinutes: 3,
    steps: [
      "Mix finely powdered rock salt into comfortably warm sesame oil.",
      "Gently rub into the seizing or cramped muscle (e.g., calf or foot arch) in long sweeping strokes.",
      "Gently stretch the cramped muscle in the opposite direction (pull toes upward towards shin for calf cramps).",
      "Keep muscle warm."
    ],
    dosage: {
      child: "Ages 5+: Massage gently with plain warm sesame oil.",
      adult: "Massage into cramped area as needed.",
      elderly: "Massage onto legs before bed to prevent nocturnal 'charley horse' leg cramps."
    },
    dos: ["Gently stretch the cramped muscle while massaging", "Drink a glass of water with a pinch of rock salt for electrolyte balance"],
    donts: ["Never knead aggressively into an acute knot (can tear muscle fibers)", "Do not apply ice to a cramping muscle (cold triggers further contraction)"],
    redFlags: [
      "Calf is visibly swollen, red, hot, and exquisitely tender (deep vein thrombosis sign - seek emergency care)",
      "Muscle cramps accompanied by numbness, tingling, and loss of reflexes",
      "Persistent cramps throughout the body accompanied by dark brown urine"
    ],
    culturalContext: "Sesame oil (Til Tel) is the sovereign Vata-pacifying oil in traditional therapy, penetrating deep muscle fascias to release spasm.",
    primarySpice: "Rock Salt (Saindhava)",
    difficulty: "Easy",
    suitableTime: "When cramp occurs or before bed"
  },
  {
    id: "cumin-jaggery-restorative-drink",
    symptom: "Muscle Cramps",
    symptomSlug: "muscle-cramps",
    name: "Cumin & Jaggery Electrolyte Water (Jeera-Gur Pani)",
    name_assamese: "জিৰা আৰু গুড়ৰ খনিজযুক্ত পানী",
    ingredients: [
      { item: "Cumin Seeds (Jeera)", qty: "1 tsp" },
      { item: "Jaggery (Gur)", qty: "1 tbsp, crushed" },
      { item: "Water", qty: "2 cups" },
      { item: "Rock Salt", qty: "1/4 tsp" },
    ],
    prepTimeMinutes: 6,
    steps: [
      "Boil water with cumin seeds for 3 minutes.",
      "Stir in natural mineral-rich jaggery and rock salt until dissolved.",
      "Strain and drink warm.",
      "Restores potassium, magnesium, and natural electrolytes to fatigued muscle fibers."
    ],
    dosage: {
      child: "Ages 3+: 1/2 cup after active sports or hot weather.",
      adult: "1 to 2 cups daily after strenuous exertion or when cramps recur.",
      elderly: "1 cup daily. Natural mineral replenisher."
    },
    dos: ["Drink warm or at room temperature", "Stay well hydrated throughout the daytime"],
    donts: ["Do not substitute jaggery with refined white sugar (white sugar lacks magnesium and potassium)", "Do not drink iced"],
    redFlags: [
      "Severe cramps with disorientation and confusion (heat stroke)",
      "Cramps occurring alongside irregular heartbeat or palpitations",
      "Inability to release muscle contraction over several hours"
    ],
    culturalContext: "Traditional farmworkers in the Assam plains drink Jeera-Gur water during scorching harvest seasons to ward off severe muscular spasms.",
    primarySpice: "Cumin (Jeera)",
    difficulty: "Easy",
    suitableTime: "Post-workout or mid-afternoon"
  },

  // 25. Back Pain (mild strain)
  {
    id: "garlic-mustard-oil-back-massage",
    symptom: "Back Pain (mild strain)",
    symptomSlug: "back-pain",
    name: "Garlic Mustard Oil Lumbar Rub (Nohoru-Mitha Tel Kankal Malish)",
    name_assamese: "নহৰু আৰু মিঠাতেলৰ কঁকালৰ মালিশ",
    ingredients: [
      { item: "Mustard Oil (Mitha Tel)", qty: "3 tbsp" },
      { item: "Garlic (Nohoru)", qty: "5 cloves, bruised" },
      { item: "Ajwain (Carom seeds)", qty: "1/2 tsp" },
    ],
    prepTimeMinutes: 6,
    steps: [
      "Gently fry bruised garlic cloves and ajwain in mustard oil until aromatic and golden.",
      "Cool until safely warm.",
      "Have a family member gently rub the warm oil along both sides of the lower spine (paraspinal muscles).",
      "Apply gentle circular motions. Rest flat on a firm mattress with a pillow under the knees."
    ],
    dosage: {
      child: "Not applicable for spinal wear; consult pediatrician for back pain in young children.",
      adult: "Massage onto lower back once or twice daily.",
      elderly: "Massage onto lower back daily. Eases chronic lumbar muscle stiffness."
    },
    dos: ["Keep lower back warm with a cotton shawl after massage", "Maintain good seated posture with lumbar support"],
    donts: ["NEVER press directly on the spinal vertebrae bones with forceful pressure", "Do not bend forward with straight legs while picking up heavy objects"],
    redFlags: [
      "Back pain accompanied by loss of bowel or bladder control (cauda equina syndrome - emergency surgery needed)",
      "Numbness in the groin or inner thighs ('saddle anesthesia')",
      "Shooting electric shock pain traveling down below the knee accompanied by foot weakness ('foot drop')"
    ],
    culturalContext: "Assamese weavers working on traditional handlooms (Tat-xaal) rely on Nohoru-Mitha Tel to loosen lumbar paraspinal muscle fatigue.",
    primarySpice: "Garlic (Nohoru)",
    difficulty: "Easy",
    suitableTime: "Evening before bed"
  },
  {
    id: "ginger-fenugreek-warm-compress",
    symptom: "Back Pain (mild strain)",
    symptomSlug: "back-pain",
    name: "Ginger & Fenugreek Warm Lumbar Poultice (Aada-Methi Lep)",
    name_assamese: "আদা আৰু মেথিৰ কঁকালৰ পুটলি",
    ingredients: [
      { item: "Fresh Ginger (Aada)", qty: "2 inches, grated" },
      { item: "Fenugreek Seeds (Methi)", qty: "1 tbsp, boiled into a paste" },
      { item: "Clean Cotton Cloth", qty: "1 piece" },
    ],
    prepTimeMinutes: 10,
    steps: [
      "Simmer grated ginger and fenugreek seeds in 1/2 cup water until a thick warm mash forms.",
      "Spread the warm mash between folds of a clean cotton cloth.",
      "Check temperature on your arm, then place the warm poultice over the strained lower back muscles.",
      "Leave for 15-20 minutes while resting comfortably on your stomach."
    ],
    dosage: {
      child: "Ages 10+: Under adult supervision.",
      adult: "Apply warm compress once daily for 15-20 minutes.",
      elderly: "Apply once daily. Penetrating herbal moist heat relieves deep muscle spasm."
    },
    dos: ["Ensure poultice is comfortably warm, never scalding", "Rest quietly while poultice is applied"],
    donts: ["Do not apply to open cuts, burns, or broken skin", "Do not stay on complete bed rest for more than 48 hours (gentle walking aids recovery)"],
    redFlags: [
      "Back pain associated with unexplained fever, chills, and weight loss",
      "Back pain following high-speed fall or vehicular accident",
      "History of cancer with new onset progressive nocturnal back pain"
    ],
    culturalContext: "Methi and Aada contain anti-inflammatory alkaloids that penetrate transdermally when applied with moist thermal energy.",
    primarySpice: "Ginger (Aada)",
    difficulty: "Moderate",
    suitableTime: "After work or before bed"
  },

  // 26. Toothache (temporary relief only)
  {
    id: "whole-clove-direct-pressure",
    symptom: "Toothache (temporary relief only)",
    symptomSlug: "toothache",
    name: "Whole Clove Direct Dental Soother (Long Chapa)",
    name_assamese: "লং দাঁতত হেঁচা দি ৰখা",
    ingredients: [
      { item: "Whole Clove (Long)", qty: "1 whole bud with intact round head" },
    ],
    prepTimeMinutes: 1,
    steps: [
      "Take 1 clean whole clove with its round bud intact.",
      "Place it directly between the aching tooth and the opposing tooth (or gently bite down on it).",
      "Do NOT chew vigorously; simply hold steady pressure.",
      "The natural clove oil (eugenol) will slowly release, numbing the surrounding tooth nerve and gum within 3 to 5 minutes.",
      "Keep in place for 15-20 minutes, then discard."
    ],
    dosage: {
      child: "Ages 7+: Only under adult supervision (avoid in younger children due to choking risk).",
      adult: "Hold 1 clove as needed for temporary emergency pain relief while arranging a dental visit.",
      elderly: "Hold 1 clove. Reliable traditional local anesthetic."
    },
    dos: ["Bite down very gently to fracture the clove head and release oil", "See a qualified dentist promptly to treat underlying cavity or infection"],
    donts: ["Do not swallow the whole clove", "Do not place aspirin directly on the gums (causes severe chemical acid burns)"],
    redFlags: [
      "Swelling of cheek, jaw, or eye that is rapidly spreading",
      "Difficulty swallowing, breathing, or opening the mouth (Ludwig's angina - hospital emergency)",
      "High fever accompanied by severe facial swelling and throbbing pus"
    ],
    culturalContext: "Clove (Long) is the world's most famous dental spice; in fact, modern dental temporary fillings (ZOE - Zinc Oxide Eugenol) are derived from this exact compound.",
    primarySpice: "Clove (Long)",
    difficulty: "Easy",
    suitableTime: "Whenever tooth aches"
  },
  {
    id: "salt-turmeric-warm-mouth-rinse",
    symptom: "Toothache (temporary relief only)",
    symptomSlug: "toothache",
    name: "Salt & Turmeric Antiseptic Mouth Bath (Nimokh-Haldi Kuli)",
    name_assamese: "নিমখ আৰু হালধিৰ মুখ কুলকুচা",
    ingredients: [
      { item: "Rock Salt or Sea Salt", qty: "1/2 tsp" },
      { item: "Turmeric Powder (Haldi)", qty: "1/4 tsp" },
      { item: "Warm Water", qty: "1 cup" },
    ],
    prepTimeMinutes: 3,
    steps: [
      "Dissolve salt and turmeric powder in warm water.",
      "Take a large sip and hold it specifically over the aching tooth for 45-60 seconds.",
      "The hypertonic saline draws out inflammatory edema from the dental pulp and gum pocket.",
      "Spit out completely. Repeat until the glass is finished."
    ],
    dosage: {
      child: "Ages 6+: Rinsing and spitting only.",
      adult: "Rinse 3 to 4 times daily, especially after eating.",
      elderly: "Rinse 3 times daily. Cleans food debris from dental pockets gently."
    },
    dos: ["Hold liquid over the affected quadrant for a full minute before spitting", "Floss gently around the tooth to dislodge any trapped food particles"],
    donts: ["Do not swallow the rinse", "Do not use hot water that exacerbates pulpitis pain"],
    redFlags: [
      "Pus visibly discharging from gum with foul taste",
      "Tooth is completely loose after trauma",
      "Pain not relieved by dental analgesics accompanied by facial numbness"
    ],
    culturalContext: "Warm saline with turmeric acts as an osmotic pump, relieving pressure inside inflamed periodontal pockets safely at home.",
    primarySpice: "Turmeric (Haldi)",
    difficulty: "Easy",
    suitableTime: "After meals and before bed"
  },

  // 27. Earache (mild, non-infected)
  {
    id: "garlic-mustard-oil-external-ear-rub",
    symptom: "Earache (mild, non-infected)",
    symptomSlug: "earache",
    name: "Warm Garlic Oil External Ear Perimeter Rub (Nohoru Tel)",
    name_assamese: "নহৰু তেল কাণৰ বাহিৰত লগোৱা",
    ingredients: [
      { item: "Mustard Oil (Mitha Tel) or Sesame Oil", qty: "1 tbsp" },
      { item: "Garlic (Nohoru)", qty: "2 cloves, crushed" },
    ],
    prepTimeMinutes: 5,
    steps: [
      "Heat mustard oil with crushed garlic until garlic turns lightly golden.",
      "Let cool until lukewarm. Strain carefully to remove all solids.",
      "Dip a clean fingertip in the warm oil and gently massage the EXTERNAL cartilage of the ear, the crease behind the earlobe, and down the side of the neck.",
      "STRICT SAFETY RULE: NEVER pour or drop oil inside the ear canal (especially if there is any suspicion of a perforated eardrum).",
      "Apply a warm, dry towel over the outside of the ear for soothing heat."
    ],
    dosage: {
      child: "Ages 2+: External massage only behind the earlobe.",
      adult: "Massage externally around the ear as needed.",
      elderly: "Massage externally. Soothes jaw-joint referred pain and cold drafts."
    },
    dos: ["Apply ONLY to external skin behind the earlobe and neck", "Keep head and ears warm and protected from cold winds"],
    donts: ["NEVER put oil drops INSIDE the ear canal without a doctor looking inside with an otoscope", "Never insert cotton buds, matchsticks, or hairpins into the ear canal"],
    redFlags: [
      "Fluid, pus, or blood draining from inside the ear canal (ruptured eardrum)",
      "High fever in a child with intense ear pain and lethargy (acute otitis media)",
      "Swelling, tenderness, and redness directly behind the ear on the mastoid bone (mastoiditis emergency)"
    ],
    culturalContext: "Garlic's allicin warms local lymphatic channels and relieves tension in the stylomandibular and sternocleidomastoid neck muscles that refer pain to the ear.",
    primarySpice: "Garlic (Nohoru)",
    difficulty: "Easy",
    suitableTime: "When ear feels aching from cold exposure"
  },
  {
    id: "warm-salt-compress-ear",
    symptom: "Earache (mild, non-infected)",
    symptomSlug: "earache",
    name: "Warm Salt Cloth Thermal Compress (Nimokh Potli)",
    name_assamese: "গৰম নিমখৰ পুটলিৰে কাণৰ সেক",
    ingredients: [
      { item: "Coarse Sea Salt or Rock Salt", qty: "1/2 cup" },
      { item: "Clean Cotton Sock or Handkerchief", qty: "1 piece" },
    ],
    prepTimeMinutes: 5,
    steps: [
      "Dry-heat coarse salt on a skillet or tawa for 2-3 minutes until warm.",
      "Pour into a clean cotton sock and tie a knot.",
      "Test against your inner wrist to ensure it is comfortably warm, NOT burning hot.",
      "Hold the warm salt pouch gently against the outer ear and jaw angle for 10-15 minutes.",
      "The dry penetrating heat draws out fluid and relieves Eustachian tube congestion."
    ],
    dosage: {
      child: "Ages 3+: Under adult supervision. Test temperature carefully first.",
      adult: "Hold against outer ear for 10-15 minutes as needed.",
      elderly: "Hold against ear. Provides safe, drug-free thermal relief."
    },
    dos: ["Always test the temperature against your wrist before holding against ear", "Rest head with the affected ear facing downward onto the warm pouch"],
    donts: ["Do not allow hot salt to burn delicate ear skin", "Never pour salt grains inside the ear"],
    redFlags: [
      "Sudden hearing loss or severe ringing/dizziness (labyrinthitis/vertigo)",
      "Facial muscle weakness on the side of the earache",
      "Ear pain following swimming that has progressed to complete ear canal closure"
    ],
    culturalContext: "Dry salt holds heat longer than water and provides steady, dry warmth that equalizes Eustachian tube middle-ear pressure.",
    primarySpice: "Rock Salt (Saindhava)",
    difficulty: "Easy",
    suitableTime: "Evening"
  },

  // 28. Menstrual Cramps
  {
    id: "ajwain-jaggery-menstrual-kadha",
    symptom: "Menstrual Cramps",
    symptomSlug: "menstrual-cramps",
    name: "Ajwain & Jaggery Antispasmodic Brew (Ajwain-Gur Kadha)",
    name_assamese: "জৱাইন আৰু গুড়ৰ মাহেকীয়াৰ বিষনাশক ক্বাথ",
    ingredients: [
      { item: "Ajwain (Carom seeds)", qty: "1 tsp" },
      { item: "Jaggery (Gur)", qty: "1 tbsp, grated" },
      { item: "Fresh Ginger (Aada)", qty: "1/2 inch, crushed" },
      { item: "Water", qty: "1.5 cups" },
    ],
    prepTimeMinutes: 7,
    steps: [
      "Bring water to a boil with ajwain and crushed ginger.",
      "Simmer for 4 minutes, then add grated jaggery.",
      "Stir until jaggery dissolves into a fragrant golden tea.",
      "Strain and drink hot in small sips.",
      "Rest with a hot water bottle placed over the lower abdomen."
    ],
    dosage: {
      child: "Not applicable for young children; suitable for adolescent girls experiencing dysmenorrhea (1/2 cup warm).",
      adult: "1 cup hot brew, twice daily during the first 2-3 days of menstruation.",
      elderly: "Not applicable."
    },
    dos: ["Drink warm at the onset of menstrual cramps", "Pair with a warm water bottle compress on lower abdomen"],
    donts: ["Do not consume if you suspect you might be pregnant (ajwain-jaggery is an emmenagogue)", "Do not drink iced beverages during menstrual flow"],
    redFlags: [
      "Menstrual bleeding soaking more than 1 pad or tampon per hour for over 2 consecutive hours",
      "Passing large blood clots bigger than a 50-cent coin",
      "Sudden agonizing pelvic pain accompanied by fever and foul-smelling vaginal discharge"
    ],
    culturalContext: "Ajwain and Gur is Assam's classical 'Xonmanik' women's comfort drink, traditionally brewed by mothers for young daughters during monthly cycles.",
    primarySpice: "Ajwain (Carom seeds)",
    difficulty: "Easy",
    suitableTime: "Morning and afternoon on cycle days 1-2"
  },
  {
    id: "ginger-cinnamon-ease-tea",
    symptom: "Menstrual Cramps",
    symptomSlug: "menstrual-cramps",
    name: "Ginger & Cinnamon Uterine Ease Tea (Aada-Dalchini Chah)",
    name_assamese: "আদা আৰু ডালচেনিৰ মাহেকীয়াৰ আৰামদায়ক চাহ",
    ingredients: [
      { item: "Fresh Ginger (Aada)", qty: "1 inch, sliced" },
      { item: "Ceylon Cinnamon (Dalchini)", qty: "1 small quill (1 inch)" },
      { item: "Water", qty: "1.5 cups" },
      { item: "Pure Honey (Mou)", qty: "1/2 tsp (optional)" },
    ],
    prepTimeMinutes: 8,
    steps: [
      "Crush cinnamon quill lightly and boil with ginger slices in water for 5 minutes.",
      "Cover with a lid to trap aromatic cinnamaldehyde oils.",
      "Strain into a cup; add 1/2 tsp honey once warm.",
      "Sip slowly while resting with knees pulled slightly upward."
    ],
    dosage: {
      child: "Adolescent girls: 1/2 cup warm tea.",
      adult: "1 cup twice daily during menstrual flow.",
      elderly: "Not applicable."
    },
    dos: ["Sip hot while resting", "Keep feet and abdominal area warmly covered"],
    donts: ["Avoid caffeine and heavy dairy while experiencing uterine cramps", "Do not take excessive cassia cinnamon"],
    redFlags: [
      "Fainting or severe lightheadedness upon standing during period",
      "Severe pelvic pain not relieved by standard prescribed NSAIDs",
      "Pain during periods so debilitating that you cannot attend work or school every month (suspicion of endometriosis)"
    ],
    culturalContext: "Cinnamon has recognized antispasmodic and prostaglandin-reducing properties that ease uterine myometrial contractions naturally.",
    primarySpice: "Cinnamon (Dalchini)",
    difficulty: "Easy",
    suitableTime: "After meals on cycle days"
  }
];
