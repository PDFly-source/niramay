// scripts/data/remedies_skin.js

module.exports = [
  // 29. Minor Burns (kitchen burns)
  {
    id: "raw-honey-burn-dressing",
    symptom: "Minor Burns (kitchen burns)",
    symptomSlug: "minor-burns",
    name: "Pure Raw Honey Sterile Kitchen Burn Dressing (Mou-Lep)",
    name_assamese: "কেঁচা মৌৰ পোৰা ছালৰ প্ৰলেপ",
    ingredients: [
      { item: "Pure Raw Honey (Mou)", qty: "1 tsp" },
      { item: "Cold Running Water", qty: "For initial cooling (10 minutes)" },
      { item: "Clean Sterile Gauze / Cloth", qty: "1 piece" },
    ],
    prepTimeMinutes: 2,
    steps: [
      "FIRST STEP (CRITICAL): Immediately hold the minor burn under cool running tap water for a full 10-15 minutes to halt thermal tissue destruction.",
      "Gently pat the cooled skin dry with a clean cotton swab; do NOT rub.",
      "Smear a thin layer of pure raw honey over the minor superficial burn (first-degree or small unblistered surface).",
      "Cover loosely with a clean dry gauze or leave open to the air.",
      "Reapply 2 to 3 times daily."
    ],
    dosage: {
      child: "Ages 1+: Topically safe for minor superficial kitchen burns.",
      adult: "Apply topically 2-3 times daily.",
      elderly: "Apply topically. Accelerates epithelialization and prevents bacterial dressing adherence."
    },
    dos: ["Cool with running tap water for 10-15 minutes BEFORE applying anything", "Use sterile gauze and keep dressing clean and dry"],
    donts: ["NEVER apply ice directly (ice causes secondary frostbite tissue damage)", "NEVER apply butter, toothpaste, oil, or flour onto fresh burns", "Never pop or burst blisters"],
    redFlags: [
      "Burn is larger than the palm of the patient's hand",
      "Burn on face, hands, feet, groin, or major joint",
      "Burn is charred white, black, or completely painless (third-degree full-thickness burn - hospital emergency)",
      "Signs of wound infection: yellow pus, foul odor, or red streaks spreading outward"
    ],
    culturalContext: "Medical honey is globally documented in wound clinics: high osmolarity, low pH (3.2-4.5), and enzymatic hydrogen peroxide generation make it the ultimate sterile burn balm.",
    primarySpice: "Honey (Mou)",
    difficulty: "Easy",
    suitableTime: "Immediately after cooling burn"
  },
  {
    id: "aloe-turmeric-burn-soother",
    symptom: "Minor Burns (kitchen burns)",
    symptomSlug: "minor-burns",
    name: "Fresh Aloe Vera & Pinch of Turmeric Cooling Gel (Sal-Kuwari Haldi)",
    name_assamese: "চাল-কুঁৱৰী আৰু হালধিৰ শীতল মলম",
    ingredients: [
      { item: "Fresh Aloe Vera Gel (Sal-Kuwari)", qty: "1 tbsp, fresh scrape" },
      { item: "Turmeric Powder (Haldi)", qty: "1 tiny pinch (microscopic)" },
    ],
    prepTimeMinutes: 3,
    steps: [
      "First cool the burn under tap water for 10 minutes.",
      "Cut open a fresh leaf of Aloe Vera (Sal-Kuwari) and scoop out the clear inner translucent gel.",
      "Mix with a tiny, microscopic pinch of pure turmeric powder.",
      "Gently smooth over the minor superficial burn.",
      "Provides instant cooling relief and anti-inflammatory support."
    ],
    dosage: {
      child: "Ages 2+: Safe for minor superficial skin burns.",
      adult: "Apply topically 3 times daily.",
      elderly: "Safe for delicate elderly skin."
    },
    dos: ["Ensure aloe leaf outer yellow latex (aloin) is drained off and discarded", "Wash hands thoroughly before touching burned skin"],
    donts: ["Do not apply to open weeping flesh or broken blisters", "Do not bandage tightly"],
    redFlags: [
      "Chemical burn from acids or drain cleaners (flush with continuous water for 20 mins and call emergency)",
      "Electrical burn from power outlet",
      "Burn in an infant or frail elderly person"
    ],
    culturalContext: "Sal-Kuwari (Aloe Vera) grows in almost every courtyard in Assam, treasured for its instant cooling polysaccharidic gel.",
    primarySpice: "Turmeric (Haldi)",
    difficulty: "Easy",
    suitableTime: "After running under cool water"
  },

  // 30. Insect Bites
  {
    id: "fresh-tulsi-crush-insect-bite",
    symptom: "Insect Bites",
    symptomSlug: "insect-bites",
    name: "Crushed Fresh Tulsi Leaf Antiseptic Rub (Tulsi Patar Ros)",
    name_assamese: "তুলসী পাতৰ ৰসৰ কামোৰাৰ মলম",
    ingredients: [
      { item: "Fresh Tulsi Leaves", qty: "4-5 leaves" },
      { item: "Clean Water", qty: "To rinse bite area" },
    ],
    prepTimeMinutes: 2,
    steps: [
      "Wash the insect bite with clean water and mild soap.",
      "Crush 4-5 fresh tulsi leaves vigorously between clean palms or with a pestle until dark green juice exudes.",
      "Rub the crushed leaf pulp and juice directly over the mosquito or ant bite.",
      "Let dry naturally on the skin. The itching and swelling subside within minutes."
    ],
    dosage: {
      child: "All ages: Completely safe for topical application.",
      adult: "Apply as needed when bitten.",
      elderly: "Safe and effective."
    },
    dos: ["Wash the bite area with soap and water first", "Keep nails trimmed to prevent scratching and secondary skin infections"],
    donts: ["Do not scratch aggressively (scratching introduces staph bacteria causing cellulitis)", "Do not apply inside mouth or near eyes"],
    redFlags: [
      "Swelling of lips, tongue, or difficulty breathing after a bee/wasp sting (anaphylaxis - emergency)",
      "Target-shaped expanding red 'bullseye' rash developing days later (Lyme disease risk)",
      "Bite surrounded by spreading red streaks and high fever"
    ],
    culturalContext: "Tulsi leaves contain natural eugenol and ursolic acid which act as mild topical anesthetics and anti-pruritics, arresting mosquito bite itching instantly.",
    primarySpice: "Tulsi (Holy Basil)",
    difficulty: "Easy",
    suitableTime: "Immediately after an insect bite"
  },
  {
    id: "baking-soda-salt-bite-compress",
    symptom: "Insect Bites",
    symptomSlug: "insect-bites",
    name: "Alkaline Salt & Water Anti-Itch Paste (Nimokh-Pani Lep)",
    name_assamese: "নিমখ আৰু পানীৰ খজুৱতি নাশক লেপ",
    ingredients: [
      { item: "Fine Table Salt or Rock Salt", qty: "1/2 tsp" },
      { item: "Water", qty: "A few drops to form a thick paste" },
      { item: "Ice Cube (Optional)", qty: "Wrapped in cloth" },
    ],
    prepTimeMinutes: 2,
    steps: [
      "Mix salt with 3-4 drops of water to form a gritty paste.",
      "Dab directly onto the swollen insect bite.",
      "The osmotic pull of the hypertonic salt draws out the mosquito venom/salivary irritants from the skin pore.",
      "Leave for 10 minutes, then rinse off. Follow with an ice cube wrapped in cloth for 5 minutes."
    ],
    dosage: {
      child: "Ages 2+: Dab on bite.",
      adult: "Apply as needed.",
      elderly: "Safe for all ages."
    },
    dos: ["Apply early before swelling expands", "Use a cloth-wrapped cold pack for numbing itch"],
    donts: ["Do not apply over skin that has already been scratched raw and bleeding", "Avoid open mucous membranes"],
    redFlags: [
      "Multiple bee or hornet stings (> 10 stings) causing dizziness or nausea",
      "Bite becoming a dark necrotic black ulcer (spider bite suspicion)",
      "Extreme swelling of an entire limb following a single bite"
    ],
    culturalContext: "Common household salt paste neutralizes the localized acid histamine reaction of ant and insect bites by rapid osmotic transdermal exchange.",
    primarySpice: "Salt (Nimokh)",
    difficulty: "Easy",
    suitableTime: "Immediately upon itching"
  },

  // 31. Dry Skin
  {
    id: "pure-desi-ghee-night-moisturizer",
    symptom: "Dry Skin",
    symptomSlug: "dry-skin",
    name: "Pure Desi Cow Ghee Night Emollient (Shata Dhauta / Ghee Lep)",
    name_assamese: "ঘিউৰ প্ৰাকৃতিক মইশ্বুৰাইজাৰ",
    ingredients: [
      { item: "Pure Desi Cow Ghee", qty: "3-4 drops" },
      { item: "Rose Water or Pure Water", qty: "2 drops" },
    ],
    prepTimeMinutes: 2,
    steps: [
      "Wash face or dry skin area with lukewarm water; leave slightly damp.",
      "Take 3-4 drops of pure cow ghee on your palm.",
      "Add 2 drops of rose water and rub palms together vigorously until the ghee turns into a light, fluffy cream.",
      "Gently massage into dry facial patches, elbows, or heels before bed.",
      "Leave overnight to deeply nourish cellular lipid barriers."
    ],
    dosage: {
      child: "Safe for children with chapped cheeks in winter.",
      adult: "Apply at bedtime onto dry areas.",
      elderly: "Excellent for thin, dry parchment-like elderly skin."
    },
    dos: ["Apply on slightly damp skin to lock in moisture", "Use pure traditional bilona cow ghee"],
    donts: ["Do not use if you have severe cystic active acne (ghee is comedogenic on oily pore-clogged skin)", "Do not use rancid or spiced cooking ghee"],
    redFlags: [
      "Skin cracking deeply with yellow crusted exudate and bacterial infection",
      "Generalized severe skin peeling all over body accompanied by fever (erythroderma)",
      "Dry skin accompanied by severe jaundice, dark urine, and persistent unyielding itch"
    ],
    culturalContext: "Cow ghee is known in classical Ayurveda as the supreme skin unctuous (Snigdha) substance, possessing fatty acids identical to natural human epidermal lipids.",
    primarySpice: "Pure Desi Ghee",
    difficulty: "Easy",
    suitableTime: "Bedtime"
  },
  {
    id: "coconut-oil-turmeric-body-rub",
    symptom: "Dry Skin",
    symptomSlug: "dry-skin",
    name: "Virgin Coconut Oil & Raw Turmeric Bath Rub (Narikol Tel-Haldi)",
    name_assamese: "নাৰিকল তেল আৰু কেঁচা হালধিৰ স্নান লেপ",
    ingredients: [
      { item: "Cold-Pressed Coconut Oil (Narikol Tel)", qty: "2 tbsp" },
      { item: "Raw Turmeric Juice (Kesa Haldi)", qty: "1/2 tsp" },
    ],
    prepTimeMinutes: 4,
    steps: [
      "Blend cold-pressed virgin coconut oil with fresh raw turmeric juice in a small cup.",
      "Massage generously over dry legs, arms, and torso 15 minutes before taking a warm bath.",
      "Wash off using gentle besan (gram flour) or warm water without harsh chemical soaps.",
      "Pat skin dry with a soft towel, leaving a nourishing hydrophobic shield."
    ],
    dosage: {
      child: "Ages 1+: Safe for winter skin massage before bath.",
      adult: "Apply before bathing 2 to 3 times a week during dry winter seasons.",
      elderly: "Apply before warm bath. Restores lost skin elasticity."
    },
    dos: ["Apply 15 minutes before bathing", "Use warm water, never scalding hot water which strips skin lipids"],
    donts: ["Do not use harsh detergent soaps that wash away all protective oils", "Avoid walking on slippery bathroom tiles with oily feet"],
    redFlags: [
      "Dry skin forming silvery thick plaques with bleeding underneath (psoriasis)",
      "Severe eczema with extensive cracked weeping lesions",
      "Sudden onset dry itchy skin with yellowing of the eyes"
    ],
    culturalContext: "Assamese 'Kesa Haldi-Narikol Tel' ritual bath is a heritage pre-Bihu beauty and health tradition that protects the skin against harsh winter river dry winds.",
    primarySpice: "Turmeric (Haldi)",
    difficulty: "Easy",
    suitableTime: "Before morning bath"
  },

  // 32. Minor Cuts (cleaning/first aid support)
  {
    id: "clean-turmeric-styptic-powder",
    symptom: "Minor Cuts (cleaning/first aid support)",
    symptomSlug: "minor-cuts",
    name: "Pure Turmeric Antiseptic & Styptic Seal (Haldi Lep)",
    name_assamese: "হালধিৰ তেজ বন্ধ কৰা প্ৰলেপ",
    ingredients: [
      { item: "Pure Organic Turmeric Powder (Haldi)", qty: "1/2 tsp" },
      { item: "Clean Drinking Water", qty: "To rinse wound" },
      { item: "Clean Gauze or Cotton", qty: "For direct pressure" },
    ],
    prepTimeMinutes: 2,
    steps: [
      "FIRST: Wash the small superficial cut under clean running water with mild soap to flush out all dirt and gravel.",
      "Apply steady direct pressure with a clean cloth for 2-3 minutes until active bleeding stops.",
      "Dust a pinch of pure, clean turmeric powder directly onto the superficial abrasion or paper cut.",
      "Turmeric acts as a natural styptic (stops microscopic capillary oozing) and broad-spectrum antiseptic.",
      "Cover loosely with a clean adhesive bandage."
    ],
    dosage: {
      child: "Safe for small superficial scrapes and paper cuts.",
      adult: "Apply once to clean superficial minor cuts.",
      elderly: "Safe for minor surface cuts."
    },
    dos: ["Wash out all grit and dirt with running water FIRST", "Apply direct steady pressure to stop bleeding before dusting turmeric"],
    donts: ["NEVER put turmeric into deep, gaping, puncture wounds or animal bites", "Do not use contaminated or old kitchen spice jar turmeric that touched chili powder"],
    redFlags: [
      "Blood spurting rhythmically in pulses or not stopping after 10 minutes of continuous direct pressure (arterial bleeding emergency)",
      "Cut is deep, gaping open with exposed fat or muscle (requires medical stitches)",
      "Puncture wound from rusty nail or dirty animal bite (tetanus and rabies risk - see doctor immediately)",
      "Numbness or inability to move the finger or toe below the cut"
    ],
    culturalContext: "Every grandmother in Assam instinctively reaches for Haldi when a vegetable knife nicks a finger; curcumin promotes rapid fibrin clot stabilization.",
    primarySpice: "Turmeric (Haldi)",
    difficulty: "Easy",
    suitableTime: "Immediately after washing minor cut"
  },
  {
    id: "raw-honey-antiseptic-dab-cut",
    symptom: "Minor Cuts (cleaning/first aid support)",
    symptomSlug: "minor-cuts",
    name: "Raw Honey Antibacterial Barrier Dab (Mou Dab)",
    name_assamese: "কেঁচা মৌৰ এণ্টিচেপ্টিক প্ৰলেপ",
    ingredients: [
      { item: "Pure Raw Honey (Mou)", qty: "1 small drop" },
      { item: "Sterile Bandage", qty: "1 piece" },
    ],
    prepTimeMinutes: 2,
    steps: [
      "Wash minor scrape with clean water and pat dry.",
      "Place 1 small drop of pure raw honey on the pad of a sterile adhesive bandage.",
      "Apply the bandage over the scrape so honey rests directly over the wound.",
      "Change bandage daily. Prevents wound dressing from sticking to newly healing tissue."
    ],
    dosage: {
      child: "Ages 1+: Safe for superficial scrapes.",
      adult: "Apply daily under clean bandage.",
      elderly: "Gentle on fragile skin; painless dressing removal."
    },
    dos: ["Wash hands before dressing the wound", "Keep bandage clean and dry"],
    donts: ["Do not apply to deep puncture wounds", "Do not reuse bandages"],
    redFlags: [
      "Redness spreading outward in streaks towards the heart (lymphangitis - urgent doctor visit)",
      "Pus oozing from cut accompanied by throbbing pain and fever",
      "Dirty wound if your last tetanus shot was more than 5-10 years ago"
    ],
    culturalContext: "Honey creates a moist wound-healing environment while releasing slow concentrations of antimicrobial hydrogen peroxide.",
    primarySpice: "Honey (Mou)",
    difficulty: "Easy",
    suitableTime: "Once daily"
  },

  // 33. Acne (mild)
  {
    id: "neem-turmeric-purifying-paste",
    symptom: "Acne (mild)",
    symptomSlug: "acne-mild",
    name: "Neem & Turmeric Spot Cleanser (Neem-Haldi Lep)",
    name_assamese: "নিম আৰু হালধিৰ শালমইনা নাশক লেপ",
    ingredients: [
      { item: "Fresh Neem Leaves", qty: "8-10 leaves (or 1/2 tsp pure neem powder)" },
      { item: "Turmeric Powder (Haldi)", qty: "1/4 tsp" },
      { item: "Clean Water or Rose Water", qty: "1 tsp" },
    ],
    prepTimeMinutes: 5,
    steps: [
      "Crush fresh neem leaves with a few drops of water into a fine green paste.",
      "Mix in 1/4 tsp pure turmeric powder.",
      "Dab specifically onto active red pimples or acne spots (not the whole face).",
      "Leave on for 15-20 minutes until dry.",
      "Rinse off gently with cool water. Pat dry with a clean towel."
    ],
    dosage: {
      child: "Adolescents/Teens: Apply as a spot treatment once daily.",
      adult: "Spot treatment once daily in the evening.",
      elderly: "Safe for occasional breakouts."
    },
    dos: ["Use as a targeted spot treatment on pimples", "Use a dedicated clean face towel to prevent transferring bacteria"],
    donts: ["NEVER pop, squeeze, or pick pimples (pushes infection deeper and creates permanent scars)", "Do not leave paste on overnight if you have sensitive skin"],
    redFlags: [
      "Deep, painful, cystic nodules under the skin that do not come to a head (cystic acne requires dermatologist)",
      "Pimples forming in the 'danger triangle' of the face (bridge of nose to corners of mouth) with high fever and eye swelling",
      "Severe widespread acne accompanied by irregular periods and excess facial hair (PCOS screening indicated)"
    ],
    culturalContext: "Neem (Mahanim) is celebrated across Assam as 'Nimba' — the bitter blood-purifier that possesses formidable antibacterial properties against Cutibacterium acnes.",
    primarySpice: "Turmeric (Haldi)",
    difficulty: "Easy",
    suitableTime: "Evening"
  },
  {
    id: "besan-haldi-rosewater-pack",
    symptom: "Acne (mild)",
    symptomSlug: "acne-mild",
    name: "Gram Flour, Turmeric & Rose Water Balancing Pack (Besan-Haldi Lep)",
    name_assamese: "বেচন আৰু হালধিৰ মুখৰ উবটন",
    ingredients: [
      { item: "Besan (Bengal Gram Flour)", qty: "1 tbsp" },
      { item: "Turmeric Powder (Haldi)", qty: "1/4 tsp" },
      { item: "Rose Water (or Plain Water)", qty: "1 to 2 tbsp to make paste" },
      { item: "Lemon Juice", qty: "2-3 drops (optional, for oily skin)" },
    ],
    prepTimeMinutes: 4,
    steps: [
      "Mix besan and turmeric powder in a small glass bowl.",
      "Add rose water gradually until a smooth, spreadable paste forms.",
      "Apply evenly over face avoiding the delicate eye area.",
      "Leave for 12-15 minutes until semi-dry.",
      "Wet hands and gently massage off in circular motions using lukewarm water. Pat dry."
    ],
    dosage: {
      child: "Adolescents: Apply 2 times a week.",
      adult: "Apply 2 to 3 times weekly.",
      elderly: "Apply once weekly for gentle dead skin exfoliation."
    },
    dos: ["Wash off when semi-dry; do not let it crack completely into powdery dryness", "Follow with light hydration"],
    donts: ["Do not scrub harshly onto active inflamed red acne pustules", "Do not use contaminated kitchen besan containing chili spice residue"],
    redFlags: [
      "Sudden acute eruption of pustules accompanied by facial swelling and fever",
      "Acne leaving deep pitted ice-pick scars despite gentle care",
      "Acne flaring severely after starting a new oral medication"
    ],
    culturalContext: "The traditional Indian 'Ubtan' cleanses excess sebum and dead skin cells gently without stripping the skin's acidic mantle.",
    primarySpice: "Turmeric (Haldi)",
    difficulty: "Easy",
    suitableTime: "Twice a week before bath"
  },

  // 34. Sunburn
  {
    id: "chilled-cucumber-mint-sunburn-compress",
    symptom: "Sunburn",
    symptomSlug: "sunburn",
    name: "Chilled Cucumber & Mint Thermal Soother (Tiyoh-Podina Lep)",
    name_assamese: "তিয়ঁহ আৰু পদিনাৰ ৰ’দত পোৰা ছালৰ শীতল লেপ",
    ingredients: [
      { item: "Fresh Cucumber (Tiyoh)", qty: "1/2 cucumber, grated or pureed" },
      { item: "Fresh Mint Leaves (Podina)", qty: "6 leaves, crushed" },
      { item: "Clean Gauze or Cotton Pad", qty: "1 piece" },
    ],
    prepTimeMinutes: 5,
    steps: [
      "Grate a chilled fresh cucumber and crush with mint leaves.",
      "Apply the cold juicy pulp directly over red, sun-exposed shoulders, neck, or face.",
      "Alternatively, soak a clean cotton cloth in the extracted chilled juice and lay over sunburned skin.",
      "Rest for 20 minutes while the natural phytochemicals absorb heat.",
      "Rinse gently with cool water."
    ],
    dosage: {
      child: "Ages 2+: Safe and gentle cooling for sunburned skin.",
      adult: "Apply topically 2 to 3 times daily as needed.",
      elderly: "Safe and comforting."
    },
    dos: ["Drink abundant water to rehydrate the body from within", "Stay indoors in cool shade until redness calms"],
    donts: ["NEVER apply petroleum jelly (Vaseline) or heavy butter to fresh sunburn (traps heat inside skin)", "Do not peel off flaking sunburnt skin with fingernails"],
    redFlags: [
      "Severe sunburn covering large portions of body with widespread blistering",
      "Sunburn accompanied by high fever, severe chills, nausea, confusion, or dizziness (sun poisoning / heat stroke)",
      "Severe blistering on an infant under 1 year old"
    ],
    culturalContext: "Cucumber is 96% structured water rich in caffeic acid and silica, rapidly cooling down the microvascular dilation caused by UV radiation.",
    primarySpice: "Mint (Podina)",
    difficulty: "Easy",
    suitableTime: "After sun exposure"
  },
  {
    id: "aloe-coconut-sunburn-cooler",
    symptom: "Sunburn",
    symptomSlug: "sunburn",
    name: "Fresh Aloe Vera & Coconut Skin Restorer (Sal-Kuwari Narikol)",
    name_assamese: "চাল-কুঁৱৰী আৰু নাৰিকলৰ শীতল মলম",
    ingredients: [
      { item: "Fresh Aloe Vera Gel (Sal-Kuwari)", qty: "2 tbsp" },
      { item: "Virgin Coconut Oil (Narikol Tel)", qty: "1 tsp" },
    ],
    prepTimeMinutes: 3,
    steps: [
      "Scrape clear fresh gel from an aloe vera leaf.",
      "Whisk lightly with virgin coconut oil until emulsified.",
      "Gently smooth over sunburnt skin without rubbing.",
      "Reapply every 4 to 6 hours."
    ],
    dosage: {
      child: "Ages 2+: Apply topically.",
      adult: "Apply 2-3 times daily.",
      elderly: "Safe for dry sun-damaged skin."
    },
    dos: ["Apply gently like a soothing lotion", "Wear loose, soft cotton clothing over sunburn"],
    donts: ["Do not expose freshly treated skin back into intense midday sun", "Avoid perfumed commercial lotions containing alcohol"],
    redFlags: [
      "Blisters breaking and draining cloudy, foul-smelling pus",
      "Inability to tolerate any fluids by mouth with dark concentrated urine",
      "Rapid heart rate and fainting sensation upon standing"
    ],
    culturalContext: "Aloe vera contains aloin and bradykinase which suppress UV-induced skin inflammation and stimulate rapid fibroblasts.",
    primarySpice: "Aloe Vera (Sal-Kuwari)",
    difficulty: "Easy",
    suitableTime: "Morning and evening"
  },

  // 35. Chapped Lips
  {
    id: "pure-cow-ghee-lip-balm",
    symptom: "Chapped Lips",
    symptomSlug: "chapped-lips",
    name: "Pure Desi Cow Ghee Lip Salve (Ghee Oothor Lep)",
    name_assamese: "ঘিউৰ প্ৰাকৃতিক ওঁঠৰ মলম",
    ingredients: [
      { item: "Pure Desi Cow Ghee", qty: "1 drop" },
    ],
    prepTimeMinutes: 1,
    steps: [
      "Take 1 tiny drop of pure cow ghee on your clean fingertip.",
      "Gently massage into dry, cracked lips in small circular motions before sleeping.",
      "Allow the protective lipid layer to soak in overnight.",
      "Wake up to soft, replenished lips without petroleum chemicals."
    ],
    dosage: {
      child: "Safe for all ages including toddlers (completely non-toxic if licked).",
      adult: "Apply morning and night.",
      elderly: "Safe and effective for dry lips."
    },
    dos: ["Apply before bedtime and after morning wash", "Drink plenty of water to hydrate mucous membranes"],
    donts: ["Do NOT lick your chapped lips (saliva contains digestive enzymes that worsen cracking when water evaporates)", "Do not peel off dry lip skin flakes with fingers or teeth"],
    redFlags: [
      "Persistent cracks at the corners of mouth that bleed and do not heal (angular cheilitis / B-vitamin deficiency)",
      "Lips swollen, blistered, and crusting with painful sores",
      "Persistent white or scaly patch on lip lasting more than a month"
    ],
    culturalContext: "In Assamese tradition, mothers dab pure cow ghee onto children's lips and belly button (Nabhi) to heal chapped winter lips from the inside out.",
    primarySpice: "Pure Desi Ghee",
    difficulty: "Easy",
    suitableTime: "Bedtime"
  },
  {
    id: "honey-malai-lip-nourisher",
    symptom: "Chapped Lips",
    symptomSlug: "chapped-lips",
    name: "Raw Honey & Fresh Milk Cream Salve (Mou-Malai Ooth Lep)",
    name_assamese: "মৌ আৰু গাখীৰৰ সৰৰ ওঁঠৰ মলম",
    ingredients: [
      { item: "Pure Honey (Mou)", qty: "1/4 tsp" },
      { item: "Fresh Milk Cream (Malai)", qty: "1/4 tsp" },
    ],
    prepTimeMinutes: 2,
    steps: [
      "Blend equal parts pure honey and fresh milk cream on the back of a spoon.",
      "Gently apply a generous layer onto cracked lips.",
      "Leave on for 15-20 minutes to deeply hydrate dry tissues.",
      "Gently wipe off with a soft damp cotton ball."
    ],
    dosage: {
      child: "Ages 1+: Safe. (Avoid in infants under 1 year due to honey rule).",
      adult: "Apply once daily.",
      elderly: "Safe and deeply hydrating."
    },
    dos: ["Wipe off with a warm damp cloth", "Apply consistently for 3-4 days in dry winter weather"],
    donts: ["Never administer honey to infants under 12 months", "Avoid spicy chili foods that sting chapped lips"],
    redFlags: [
      "Severe swelling of lips with hives (allergic reaction)",
      "Deep fissures that continually bleed and show no improvement after 10 days",
      "Ulcers on inside and outside of lips with high fever"
    ],
    culturalContext: "Honey acts as a humectant that pulls moisture into lip tissue, while milk cream provides natural milk fats that seal the surface.",
    primarySpice: "Honey (Mou)",
    difficulty: "Easy",
    suitableTime: "Evening"
  },

  // 36. Dandruff
  {
    id: "methi-curd-scalp-mask",
    symptom: "Dandruff",
    symptomSlug: "dandruff",
    name: "Fenugreek & Sour Curd Anti-Dandruff Mask (Methi-Doi Lep)",
    name_assamese: "মেথি আৰু দৈৰ উফি নাশক লেপ",
    ingredients: [
      { item: "Fenugreek Seeds (Methi)", qty: "2 tbsp, soaked overnight" },
      { item: "Sour Curd / Yogurt (Doi)", qty: "2 tbsp" },
      { item: "Lemon Juice", qty: "1 tsp" },
    ],
    prepTimeMinutes: 8,
    steps: [
      "Soak fenugreek seeds in water overnight until soft and swollen.",
      "Grind the soaked seeds with sour curd into a smooth, creamy paste.",
      "Mix in 1 tsp fresh lemon juice.",
      "Part hair into sections and apply the paste directly onto the scalp roots.",
      "Leave on for 30 minutes, then rinse thoroughly with lukewarm water (use mild shampoo if needed).",
      "Repeat once weekly."
    ],
    dosage: {
      child: "Ages 6+: Apply on scalp once weekly.",
      adult: "Apply once weekly for 3 to 4 weeks.",
      elderly: "Safe and soothing for dry flaky scalp."
    },
    dos: ["Apply directly to the scalp rather than hair lengths", "Wash out thoroughly with plenty of water"],
    donts: ["Do not scratch scalp with fingernails while washing (use soft finger pads)", "Do not leave paste on scalp for more than 40 minutes (can cause a head chill)"],
    redFlags: [
      "Scalp has thick, yellow, greasy scales with intense itching and raw oozing sores (severe seborrheic dermatitis)",
      "Dandruff accompanied by circular bald patches (fungal ringworm / tinea capitis)",
      "Scalp redness spreading down onto forehead, ears, and eyebrows with painful cracks"
    ],
    culturalContext: "Methi contains natural antifungal saponins and mucilage that detach stubborn flakes, while lactic acid in sour curd restores scalp acid mantle.",
    primarySpice: "Fenugreek (Methi)",
    difficulty: "Moderate",
    suitableTime: "Weekend morning before bath"
  },
  {
    id: "lemon-warm-coconut-oil-scalp-rub",
    symptom: "Dandruff",
    symptomSlug: "dandruff",
    name: "Warm Coconut Oil & Lemon Scalp Therapy (Narikol Tel-Nemu)",
    name_assamese: "নাৰিকল তেল আৰু নেমুৰ উফি নাশক মালিশ",
    ingredients: [
      { item: "Virgin Coconut Oil (Narikol Tel)", qty: "2 tbsp" },
      { item: "Fresh Lemon Juice (Kaji Nemu)", qty: "1 tbsp" },
    ],
    prepTimeMinutes: 3,
    steps: [
      "Gently warm coconut oil in a small bowl (comfortably warm, never hot).",
      "Stir in fresh lemon juice until mixed.",
      "Dip fingertips in the mixture and massage directly into scalp for 5-7 minutes.",
      "Leave on for 20-30 minutes before shampooing with a mild herbal cleanser."
    ],
    dosage: {
      child: "Ages 5+: Massage lightly on scalp once weekly.",
      adult: "Apply twice a week before hair wash.",
      elderly: "Safe and relieves dry scalp itch."
    },
    dos: ["Massage gently with soft fingertips", "Wash out within 30 minutes to prevent citric acid dryness"],
    donts: ["Never apply neat undiluted lemon juice to a cracked, raw, or bleeding scalp (will burn fiercely)", "Do not keep on overnight"],
    redFlags: [
      "Severe hair loss occurring alongside scalp flaking",
      "Scalp swelling, tenderness, and swollen lymph nodes in neck",
      "No improvement after 4 weeks of consistent care"
    ],
    culturalContext: "Lauric acid in coconut oil inhibits Malassezia globosa yeast proliferation, while the citric acid in Kaji Nemu normalizes epidermal cell turnover.",
    primarySpice: "Lemon (Kaji Nemu)",
    difficulty: "Easy",
    suitableTime: "30 minutes before hair wash"
  }
];
