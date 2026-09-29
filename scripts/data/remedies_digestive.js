// scripts/data/remedies_digestive.js

module.exports = [
  // 1. Acidity
  {
    id: "ginger-ajwain-acidity-water",
    symptom: "Acidity / Heartburn",
    symptomSlug: "acidity",
    name: "Ginger & Ajwain Water (Aada-Ajwain Pani)",
    name_assamese: "আদা-জৱাইন পানী",
    ingredients: [
      { item: "Ginger (Aada)", qty: "1 inch, crushed" },
      { item: "Ajwain (Carom seeds)", qty: "1/2 tsp" },
      { item: "Water", qty: "1.5 cups" },
      { item: "Black Salt (Kola Nimokh)", qty: "Tiny pinch" },
    ],
    prepTimeMinutes: 8,
    steps: [
      "Crush fresh ginger root lightly in a mortar.",
      "Bring water to a rolling boil in a stainless steel pan.",
      "Add crushed ginger and ajwain seeds. Simmer on low for 4-5 minutes.",
      "Strain into a cup and add a pinch of black salt.",
      "Sip lukewarm in small mouthfuls after meals."
    ],
    dosage: {
      child: "Not recommended under 5 yrs. Ages 6-12: 2 tbsp diluted in warm water once daily.",
      adult: "1 cup (150ml) sipped slowly 20-30 min after meals, max twice daily.",
      elderly: "1/2 cup once daily after lunch. Avoid if taking blood-thinning medication without doctor advice."
    },
    dos: ["Drink lukewarm, not hot", "Take 20 minutes after meals", "Stay seated upright for 30 minutes after drinking"],
    donts: ["Don't drink on an empty burning stomach", "Don't consume if diagnosed with bleeding stomach ulcers", "Don't exceed 2 cups per day"],
    redFlags: [
      "Crushing chest pain radiating to left shoulder or jaw (potential cardiac emergency)",
      "Vomiting dark brown coffee-ground material or bright blood",
      "Severe difficulty or pain while swallowing"
    ],
    culturalContext: "Ajwain and ginger are the foundational carminative pair in Assamese households, renowned for breaking down stagnant stomach heaviness.",
    primarySpice: "Ajwain (Carom seeds)",
    difficulty: "Easy",
    suitableTime: "After lunch or dinner"
  },
  {
    id: "cold-fennel-rock-sugar-infusion",
    symptom: "Acidity / Heartburn",
    symptomSlug: "acidity",
    name: "Cold Fennel & Rock Sugar Infusion (Mouri-Misri Sarbat)",
    name_assamese: "মৌৰি আৰু মিচিৰিৰ চৰবত",
    ingredients: [
      { item: "Fennel Seeds (Mouri)", qty: "1 tbsp" },
      { item: "Mishri (Rock Sugar)", qty: "1 tsp, crushed" },
      { item: "Water", qty: "1 cup (room temp or cool)" },
    ],
    prepTimeMinutes: 5,
    steps: [
      "Lightly bruise fennel seeds with a rolling pin to break the husks.",
      "Add bruised fennel and rock sugar into a cup of room-temperature water.",
      "Allow to steep for 2 to 3 hours (or overnight).",
      "Strain through a sieve and stir well before drinking."
    ],
    dosage: {
      child: "Ages 2+: 3-4 teaspoons of strained infusion once daily.",
      adult: "1 cup (180ml) on an empty stomach in the morning or during acute mid-day burning.",
      elderly: "1 cup daily. Excellent natural coolant with zero gastric irritation."
    },
    dos: ["Drink slowly at room temperature", "Steep properly for at least 2 hours to draw out volatile oils"],
    donts: ["Don't boil the fennel seeds (heat destroys the cooling volatile oils)", "Don't use artificial refined white sugar if rock candy is available"],
    redFlags: [
      "Persistent burning sensation lasting > 5 consecutive days without relief",
      "Unexplained sudden weight loss or chronic regurgitation of undigested food",
      "Stomach pain so severe you cannot stand straight"
    ],
    culturalContext: "Fennel (mouri) is celebrated across Northeast India as the premier 'Pitta-shamaka' spice that soothes burning mucosal walls.",
    primarySpice: "Fennel (Mouri)",
    difficulty: "Easy",
    suitableTime: "Morning on empty stomach or afternoon"
  },

  // 2. Indigestion
  {
    id: "hing-nimokh-warm-water",
    symptom: "Indigestion",
    symptomSlug: "indigestion",
    name: "Asafoetida & Rock Salt Digestive Draught (Hing-Nimokh Pani)",
    name_assamese: "হিং আৰু কলা নিমখৰ পানী",
    ingredients: [
      { item: "Asafoetida (Hing)", qty: "1 small pinch (about 1/8 tsp)" },
      { item: "Black Salt (Kola Nimokh)", qty: "1/4 tsp" },
      { item: "Warm Water", qty: "1/2 cup" },
    ],
    prepTimeMinutes: 3,
    steps: [
      "Heat 1/2 cup of pure drinking water until warm to the touch (not boiling).",
      "Add a pinch of authentic asafoetida powder and finely ground black salt.",
      "Stir briskly for 30 seconds until completely dissolved.",
      "Drink in warm sips immediately."
    ],
    dosage: {
      child: "Not recommended internally under 7 yrs (apply warm hing paste around navel externally instead). Ages 7-12: 2 tbsp only.",
      adult: "1/2 cup single draught when feeling uncomfortable fullness after heavy meals.",
      elderly: "1/2 cup, max once daily. If hypertensive, reduce black salt to a minute pinch."
    },
    dos: ["Drink warm right after noticing slow digestion", "Use pure compounded hing without synthetic additives"],
    donts: ["Never exceed a small pinch of hing (excess can cause mild nausea)", "Don't take on an empty stomach"],
    redFlags: [
      "Sudden rigid abdomen that is extremely tender to the lightest touch",
      "High fever combined with severe right lower quadrant abdominal pain",
      "Inability to pass both flatus and stool for over 36 hours"
    ],
    culturalContext: "Known in Assamese kitchens as the ultimate emergency digestive aid, hing stimulates sluggish gastric juices and pancreatic enzymes instantly.",
    primarySpice: "Asafoetida (Hing)",
    difficulty: "Easy",
    suitableTime: "Immediately after a heavy feast"
  },
  {
    id: "roasted-cumin-buttermilk-chaas",
    symptom: "Indigestion",
    symptomSlug: "indigestion",
    name: "Roasted Cumin Buttermilk (Bhoja Jeera Ghol / Chaas)",
    name_assamese: "ভজা জিৰা আৰু ঘোল",
    ingredients: [
      { item: "Fresh Homemade Curd/Yogurt", qty: "3 tbsp" },
      { item: "Water", qty: "1 cup" },
      { item: "Cumin Seeds (Jeera)", qty: "1/2 tsp, dry roasted and powdered" },
      { item: "Rock Salt (Saindhava)", qty: "1 pinch" },
      { item: "Fresh Mint or Coriander", qty: "3 leaves, torn" },
    ],
    prepTimeMinutes: 6,
    steps: [
      "Dry-roast cumin seeds on a hot tawa for 60 seconds until aromatic and dark brown, then crush finely.",
      "Whisk curd and water thoroughly using a traditional wooden churner (mathani) or fork until light and frothy.",
      "Mix in roasted cumin powder and rock salt.",
      "Garnish with torn mint leaves and consume at room temperature."
    ],
    dosage: {
      child: "Ages 2+: 1/2 cup with lunch. Excellent for children's gut flora.",
      adult: "1 tall glass (200ml) with or right after lunch.",
      elderly: "1 glass with lunch. Highly soothing for delicate digestive systems."
    },
    dos: ["Consume during daylight hours (lunchtime is ideal)", "Whisk until fat separates slightly for easiest digestion"],
    donts: ["Never drink cold or iced straight from the refrigerator", "Avoid drinking late at night as curd/buttermilk can increase mucus"],
    redFlags: [
      "Persistent nausea with projectile vomiting",
      "Yellowing of eyes or skin (jaundice signs)",
      "Unexplained prolonged indigestion lasting over a week"
    ],
    culturalContext: "Assamese 'Ghol' infused with roasted jeera is the quintessential midday digestive elixir, restoring gut microflora and balancing digestive agni.",
    primarySpice: "Cumin (Jeera)",
    difficulty: "Easy",
    suitableTime: "With lunch"
  },

  // 3. Bloating / Gas
  {
    id: "ajwain-black-salt-chew",
    symptom: "Bloating / Gas",
    symptomSlug: "bloating-gas",
    name: "Carom & Rock Salt Warm Chew (Ajwain-Nimokh Chobon)",
    name_assamese: "জৱাইন আৰু কলা নিমখ চোবোৱা",
    ingredients: [
      { item: "Ajwain (Carom seeds)", qty: "1/2 tsp" },
      { item: "Black Salt (Kola Nimokh)", qty: "1 pinch" },
      { item: "Warm Water", qty: "1/2 glass for swallowing" },
    ],
    prepTimeMinutes: 2,
    steps: [
      "Place clean ajwain seeds in the palm of your hand and rub gently with the thumb.",
      "Add a pinch of black salt.",
      "Pop into the mouth, chew slowly for 30 seconds to release the thymol oils.",
      "Wash down with 1/2 glass of warm water."
    ],
    dosage: {
      child: "Ages 6+: 1/4 tsp crushed seeds swallowed with warm water. Under 6: not recommended.",
      adult: "1/2 tsp chewed thoroughly as needed, max twice a day.",
      elderly: "1/2 tsp with warm water. Very effective for trapped wind."
    },
    dos: ["Chew seeds well before swallowing with warm water", "Keep upper body upright after ingestion"],
    donts: ["Do not swallow whole without chewing (crushing releases volatile thymol)", "Do not take on completely dehydrated stomach"],
    redFlags: [
      "Abdomen feels as hard as a wooden board",
      "Gas pain accompanied by cold sweats, fainting, or dizziness",
      "Persistent inability to pass gas or stool with progressive distention"
    ],
    culturalContext: "Thymol contained in carom seeds has potent antispasmodic and carminative actions, dispelling trapped flatulence within minutes.",
    primarySpice: "Ajwain (Carom seeds)",
    difficulty: "Easy",
    suitableTime: "Whenever feeling bloated"
  },
  {
    id: "mint-kaji-nemu-digestive-sip",
    symptom: "Bloating / Gas",
    symptomSlug: "bloating-gas",
    name: "Assamese Mint & Kaji Nemu Sip (Podina-Kaji Nemu Pani)",
    name_assamese: "পদিনা আৰু কাজী নেমুৰ পানী",
    ingredients: [
      { item: "Fresh Mint Leaves (Podina)", qty: "8-10 leaves" },
      { item: "Assamese Kaji Nemu (or Lemon)", qty: "1/2 lemon, freshly squeezed" },
      { item: "Black Pepper (Jaluk)", qty: "1 tiny pinch, freshly cracked" },
      { item: "Warm Water", qty: "1 cup" },
    ],
    prepTimeMinutes: 5,
    steps: [
      "Roughly tear fresh mint leaves and muddle lightly in the cup to release aroma.",
      "Pour warm drinking water over the mint.",
      "Squeeze fresh aromatic Kaji Nemu juice into the infusion.",
      "Add a pinch of black pepper, stir, and sip warm."
    ],
    dosage: {
      child: "Ages 5+: 1/2 cup diluted with equal parts warm water.",
      adult: "1 cup 15 minutes after food or when abdominal tightness strikes.",
      elderly: "1 cup warm. Soothes distended stomach without raising acid levels."
    },
    dos: ["Use fresh fragrant mint leaves", "Drink while comfortably warm"],
    donts: ["Do not boil fresh mint on high flame (destroys delicate menthol esters)", "Avoid if you have acute hyperchlorhydria"],
    redFlags: [
      "Gas accompanied by blood in stool or black tarry bowel movements",
      "Unexplained rapid abdominal girth expansion over several hours",
      "Pain migrating to lower right abdomen with tenderness"
    ],
    culturalContext: "The oblong Assamese Kaji Nemu is globally famous for its intense citrus aroma and gentle, alkalizing post-digestive effect.",
    primarySpice: "Lemon (Kaji Nemu)",
    difficulty: "Easy",
    suitableTime: "Mid-morning or post-dinner"
  },

  // 4. Constipation
  {
    id: "soaked-black-raisin-water",
    symptom: "Constipation",
    symptomSlug: "constipation",
    name: "Soaked Black Raisin Water (Kola Kismis Pani)",
    name_assamese: "তিওঁৱা ক’লা কিচমিচৰ পানী",
    ingredients: [
      { item: "Black Raisins (Munakka or Kismis)", qty: "10-12 pieces" },
      { item: "Water", qty: "1 cup" },
    ],
    prepTimeMinutes: 5,
    steps: [
      "Rinse black raisins thoroughly under tap water to wash away impurities.",
      "Place cleaned raisins in a glass bowl and cover with 1 cup of clean water.",
      "Leave to soak undisturbed overnight (8-10 hours).",
      "In the morning, gently mash the plump raisins in the water with clean fingers or a spoon.",
      "Strain the sweet water and drink first thing in the morning; eat the soft mashed raisins."
    ],
    dosage: {
      child: "Ages 1+: 3-4 soaked raisins and their water in the morning. Completely safe for toddlers.",
      adult: "10-12 soaked raisins and water every morning.",
      elderly: "8-10 soaked raisins and water. Gentle on elderly bowels without creating laxative dependency."
    },
    dos: ["Take first thing upon waking up before tea or coffee", "Chew the softened raisin skins thoroughly for dietary fiber"],
    donts: ["Don't discard the soaked water (it contains vital water-soluble sugars and minerals)", "Don't take if you have severe uncontrolled diabetes without medical advice"],
    redFlags: [
      "Constipation accompanied by severe cramping, vomiting, and inability to pass gas (bowel obstruction)",
      "Rectal bleeding or passing maroon clots",
      "Sudden unexplained change in bowel habits lasting over 2 weeks in people over 50"
    ],
    culturalContext: "Munakka (large seeded black raisin) is revered in Ayurvedic home science as a natural, non-habit-forming bowel lubricator and hematinic.",
    primarySpice: "Black Raisin (Kismis)",
    difficulty: "Easy",
    suitableTime: "First thing in the morning"
  },
  {
    id: "warm-milk-pure-ghee-bowel-soother",
    symptom: "Constipation",
    symptomSlug: "constipation",
    name: "Warm Milk with Pure Desi Cow Ghee (Ghee-Gakhir)",
    name_assamese: "ঘিউ আৰু গৰম গাখীৰ",
    ingredients: [
      { item: "Pure Cow Milk", qty: "1 cup (200ml)" },
      { item: "Pure Desi Cow Ghee", qty: "1 tsp" },
      { item: "Cardamom (Elaichi)", qty: "1 pod, crushed (optional)" },
    ],
    prepTimeMinutes: 5,
    steps: [
      "Heat cow milk until comfortably hot.",
      "Pour into a mug and stir in 1 teaspoon of pure desi cow ghee.",
      "Add a crushed cardamom pod for flavor and easy digestion.",
      "Stir until ghee melts completely and drink warm right before sleeping."
    ],
    dosage: {
      child: "Ages 3+: 1/2 cup warm milk with 1/2 tsp ghee at bedtime.",
      adult: "1 cup warm milk with 1 full tsp ghee at bedtime.",
      elderly: "1 cup warm milk with 1 tsp ghee. Relieves chronic dryness of colon in Vata types."
    },
    dos: ["Drink warm, 30 minutes before sleep", "Ensure pure bilona/cow ghee without vegetable adulterants"],
    donts: ["Do not take if lactose intolerant or experiencing acute dairy allergies", "Avoid taking with cold milk (ghee will solidify and hinder digestion)"],
    redFlags: [
      "Severe abdominal distention with no bowel movements for over 5 days",
      "Fever, chills, and localized abdominal pain",
      "Stools that are pencil-thin or contain streaks of fresh blood"
    ],
    culturalContext: "In Assamese and Ayurvedic tradition, warm milk and ghee act as an unctuous 'Snehana' agent that softens hardened fecal matter in the lower bowel.",
    primarySpice: "Pure Desi Ghee",
    difficulty: "Easy",
    suitableTime: "Bedtime"
  },

  // 5. Mild Diarrhea
  {
    id: "roasted-cumin-nutmeg-chaas-diarrhea",
    symptom: "Diarrhea (mild)",
    symptomSlug: "mild-diarrhea",
    name: "Roasted Cumin & Nutmeg Binding Buttermilk (Jeera-Jaiphal Ghol)",
    name_assamese: "জিৰা আৰু জয়ফলযুক্ত ঘোল",
    ingredients: [
      { item: "Fresh Yogurt/Curd", qty: "1/4 cup" },
      { item: "Boiled & Cooled Water", qty: "3/4 cup" },
      { item: "Roasted Cumin Powder (Jeera)", qty: "1/2 tsp" },
      { item: "Nutmeg Powder (Jaiphal)", qty: "1 tiny pinch (about 1/16 tsp)" },
      { item: "Rock Salt", qty: "1/4 tsp" },
    ],
    prepTimeMinutes: 5,
    steps: [
      "Whisk curd and boiled-cooled water thoroughly until fully integrated and thin.",
      "Add roasted cumin powder, a tiny pinch of nutmeg powder, and rock salt.",
      "Stir well and sip slowly in small amounts every 2 hours."
    ],
    dosage: {
      child: "Ages 4+: 1/3 cup twice daily. (Omit nutmeg for under 4 yrs).",
      adult: "1/2 to 1 cup sipped slowly after each loose stool, max 3 times daily.",
      elderly: "1/2 cup twice daily. Restores lost salts and binds loose stools."
    },
    dos: ["Drink at room temperature", "Use boiled and cooled water only to prevent secondary contamination"],
    donts: ["Never use excess nutmeg (a tiny pinch only; excess is psychoactive)", "Don't consume heavy, greasy, or spicy foods while stomach is loose"],
    redFlags: [
      "High fever, bloody stools, or severe mucus in bowel movements (dysentery)",
      "Signs of dehydration: sunken eyes, no urine output for 8 hours, extreme dizziness",
      "Diarrhea persisting more than 48 hours without slowing down"
    ],
    culturalContext: "Nutmeg (Jaiphal) contains traditional astringent tannins (Grahi) that reduce intestinal hypermotility, while curd supplies live friendly microbes.",
    primarySpice: "Cumin (Jeera)",
    difficulty: "Easy",
    suitableTime: "Between light meals"
  },
  {
    id: "pomegranate-peel-decoction",
    symptom: "Diarrhea (mild)",
    symptomSlug: "mild-diarrhea",
    name: "Pomegranate Peel & Cumin Astringent Broth (Dalim Bakoli Pani)",
    name_assamese: "ডালিমৰ বাকলি আৰু জিৰাৰ পানী",
    ingredients: [
      { item: "Clean Dried Pomegranate Peel", qty: "1 small piece (1 inch)" },
      { item: "Cumin Seeds (Jeera)", qty: "1/2 tsp" },
      { item: "Water", qty: "1.5 cups" },
      { item: "Rock Salt", qty: "1 tiny pinch" },
    ],
    prepTimeMinutes: 10,
    steps: [
      "Wash the pomegranate peel piece thoroughly to ensure it is clean of dust.",
      "Boil with 1.5 cups water and cumin seeds in a small pot.",
      "Simmer gently until reduced to roughly 1 cup.",
      "Strain, add a pinch of rock salt, and sip lukewarm."
    ],
    dosage: {
      child: "Ages 6+: 2 tablespoons twice daily.",
      adult: "1/2 cup twice daily until loose stools subside.",
      elderly: "1/2 cup twice daily. Highly effective natural astringent."
    },
    dos: ["Sip slowly in small sips", "Follow with plenty of plain boiled electrolyte water"],
    donts: ["Do not take for more than 2 days consecutively", "Do not give to infants under 3 years without pediatrician guidance"],
    redFlags: [
      "Lethargy, confusion, or inability to keep fluids down",
      "Stools that look like 'rice-water' in massive volumes",
      "Intense colicky cramping that wakes you from deep sleep"
    ],
    culturalContext: "Assamese rural elders dry Dalim (pomegranate) peels under the sun as a prized household emergency remedy for loose tummy.",
    primarySpice: "Cumin (Jeera)",
    difficulty: "Moderate",
    suitableTime: "Mid-morning"
  },

  // 6. Loss of Appetite
  {
    id: "fresh-ginger-rock-salt-appetizer",
    symptom: "Loss of Appetite",
    symptomSlug: "loss-of-appetite",
    name: "Fresh Ginger & Rock Salt Agni Awakener (Aada-Nimokh Chaki)",
    name_assamese: "আদা আৰু কলা নিমখৰ চাকি",
    ingredients: [
      { item: "Fresh Young Ginger (Aada)", qty: "1 thin slice (coin sized)" },
      { item: "Rock Salt (Saindhava / Kola Nimokh)", qty: "1 generous pinch" },
      { item: "Fresh Lemon / Kaji Nemu Juice", qty: "3-4 drops" },
    ],
    prepTimeMinutes: 2,
    steps: [
      "Peel a small knob of fresh, juicy ginger root and slice a thin coin.",
      "Sprinkle rock salt and squeeze 3-4 drops of fresh lemon juice directly onto the slice.",
      "Chew slowly 15 minutes before lunch or dinner until thoroughly masticated, then swallow the juices."
    ],
    dosage: {
      child: "Not recommended under 7 yrs due to sharpness. Ages 8-12: A very tiny paper-thin shaving.",
      adult: "1 slice chewed 15 minutes prior to meal, max twice daily.",
      elderly: "1 thin slice with extra lemon juice to soften pungency. Stimulates salivary and gastric flow."
    },
    dos: ["Take strictly 15-20 minutes before meals", "Chew slowly to stimulate salivary enzymes"],
    donts: ["Do not take if you have active mouth sores or stomach ulcers", "Do not swallow whole like a pill"],
    redFlags: [
      "Unintentional significant weight loss over 1-2 months",
      "Complete aversion to all food accompanied by chronic low-grade fever",
      "Persistent nausea and vomiting whenever swallowing solids"
    ],
    culturalContext: "Classical Ayurveda terms this 'Deepana-Pachana' — awakening the gastric digestive fire (Jatharagni) before heavy food intake.",
    primarySpice: "Ginger (Aada)",
    difficulty: "Easy",
    suitableTime: "15 minutes before main meal"
  },
  {
    id: "roasted-jeera-lemon-appetite-tonic",
    symptom: "Loss of Appetite",
    symptomSlug: "loss-of-appetite",
    name: "Roasted Cumin & Lemon Digestive Water (Bhoja Jeera-Nemu Pani)",
    name_assamese: "ভজা জিৰা আৰু কাজী নেমুৰ পানী",
    ingredients: [
      { item: "Cumin Seeds (Jeera)", qty: "1 tsp" },
      { item: "Lemon Juice (Kaji Nemu)", qty: "1 tsp" },
      { item: "Water", qty: "1 cup" },
      { item: "Black Salt", qty: "1 pinch" },
    ],
    prepTimeMinutes: 6,
    steps: [
      "Lightly roast cumin seeds in a pan until fragrant, then coarsely crush.",
      "Boil with 1 cup of water for 3 minutes.",
      "Strain into a cup and let it cool until warm.",
      "Stir in fresh lemon juice and a pinch of black salt. Drink 20 minutes before meals."
    ],
    dosage: {
      child: "Ages 3+: 1/4 cup warm before lunch.",
      adult: "1 cup before lunch and dinner.",
      elderly: "1 cup warm. Restores healthy taste buds and desire for food after illness."
    },
    dos: ["Drink warm 20 minutes prior to meal", "Use freshly crushed cumin for aromatic potency"],
    donts: ["Don't boil the lemon juice (add it only after taking off the flame)", "Don't add refined white sugar"],
    redFlags: [
      "Persistent loss of appetite with palpable abdominal mass",
      "Yellowing of sclera or severe dark tea-colored urine",
      "Night sweats and persistent hacking cough alongside appetite loss"
    ],
    culturalContext: "Extensively prepared in Assamese households for family members recovering from illness whose palate feels flat and tasteless.",
    primarySpice: "Cumin (Jeera)",
    difficulty: "Easy",
    suitableTime: "Before lunch"
  },

  // 7. Nausea
  {
    id: "kaji-nemu-black-salt-sucking-slice",
    symptom: "Nausea",
    symptomSlug: "nausea",
    name: "Assamese Lemon & Black Salt Sucking Slice (Kaji Nemu-Kola Nimokh)",
    name_assamese: "কাজী নেমু আৰু কলা নিমখৰ চকল",
    ingredients: [
      { item: "Fresh Kaji Nemu / Lemon", qty: "1 thin wedge or round slice" },
      { item: "Black Salt (Kola Nimokh)", qty: "1 pinch" },
      { item: "Black Pepper (Jaluk)", qty: "1 tiny speck of powder" },
    ],
    prepTimeMinutes: 2,
    steps: [
      "Slice a clean fresh lemon or fragrant Kaji Nemu wedge.",
      "Rub a pinch of black salt and a tiny speck of black pepper directly onto the pulp.",
      "Bring close to the nose, inhale the citrus aroma deeply, then gently suck on the slice.",
      "Let the savory tart juice coat the tongue slowly."
    ],
    dosage: {
      child: "Ages 3+: Allowed to lick the salted slice for immediate nausea relief.",
      adult: "Suck 1 wedge as needed when nausea surges.",
      elderly: "1 wedge. Excellent for overcoming post-medication nausea."
    },
    dos: ["Inhale the citrus rind scent before sucking", "Sip saliva slowly to reset gag reflexes"],
    donts: ["Don't bite into the bitter inner white pith", "Avoid if experiencing severe mouth ulcers or open sores"],
    redFlags: [
      "Nausea following a head injury or concussion (intracranial pressure sign)",
      "Nausea accompanied by severe chest pressure or shortness of breath",
      "Persistent nausea with inability to keep any fluids down for > 24 hours"
    ],
    culturalContext: "The intense scent of the Assamese Kaji Nemu rind triggers the trigeminal nerve and instantly interrupts the brain's vomiting center pathway.",
    primarySpice: "Lemon (Kaji Nemu)",
    difficulty: "Easy",
    suitableTime: "At onset of nausea"
  },
  {
    id: "green-cardamom-clove-chew",
    symptom: "Nausea",
    symptomSlug: "nausea",
    name: "Aromatic Cardamom & Clove Anti-Nausea Chew (Elaichi-Long Chobon)",
    name_assamese: "ইলাচী আৰু লং চোবোৱা",
    ingredients: [
      { item: "Green Cardamom (Elaichi)", qty: "1 pod" },
      { item: "Clove (Long)", qty: "1 whole bud" },
    ],
    prepTimeMinutes: 1,
    steps: [
      "Lightly crack open the green cardamom pod with your teeth or fingers.",
      "Place the cardamom seeds along with the single clove bud in your mouth.",
      "Do not chew aggressively; simply hold them in the cheek and gently chew every minute.",
      "Swallow the fragrant aromatic saliva continuously."
    ],
    dosage: {
      child: "Ages 6+: 1-2 cardamom seeds only (omit clove to prevent swallowing hazard).",
      adult: "1 pod cardamom + 1 clove kept in mouth as needed.",
      elderly: "1 pod cardamom seeds. Safe, effective, and refreshes mouth taste."
    },
    dos: ["Keep near the cheek pouch and allow slow saliva saturation", "Breathe through the nose while sucking"],
    donts: ["Do not swallow the whole clove bud abruptly", "Avoid chewing more than 3 cloves in a single day"],
    redFlags: [
      "Vomiting greenish-yellow bile repeatedly without relief",
      "Stiff neck, photophobia (light sensitivity), and high fever",
      "Inability to retain oral liquids resulting in fainting or lightheadedness"
    ],
    culturalContext: "Cardamom (Chhoto Elaichi) and clove are traditional traveling companions in Northeast India, kept in handkerchiefs to banish sudden queasiness.",
    primarySpice: "Cardamom (Elaichi)",
    difficulty: "Easy",
    suitableTime: "During travel or sudden nausea"
  },

  // 8. Mild Vomiting
  {
    id: "mint-honey-ice-sip",
    symptom: "Vomiting (mild, non-emergency)",
    symptomSlug: "mild-vomiting",
    name: "Cold Mint & Honey Stomach Settler (Podina-Mou Pani)",
    name_assamese: "পদিনা আৰু মৌৰ শীতল পানী",
    ingredients: [
      { item: "Fresh Mint Leaves (Podina)", qty: "10-12 leaves" },
      { item: "Pure Honey (Mou)", qty: "1/2 tsp" },
      { item: "Cold / Earthen Pot Water", qty: "1/2 cup" },
    ],
    prepTimeMinutes: 5,
    steps: [
      "Crush fresh mint leaves in a mortar to extract 1 teaspoon of green juice.",
      "Mix with 1/2 teaspoon of pure honey and 1/2 cup of cool drinking water.",
      "Do NOT gulp. Take exactly 1 teaspoon of this liquid every 5 to 10 minutes.",
      "Tiny sips prevent triggering the stomach's stretch-receptors that cause vomiting."
    ],
    dosage: {
      child: "Ages 2+: 1 teaspoon every 15 minutes. (STRICT WARNING: Never give honey under 1 year).",
      adult: "1 tablespoon every 10 minutes until stomach calms down.",
      elderly: "1 tablespoon every 10 minutes. Calms gastric spasms safely."
    },
    dos: ["Administer in spoonfuls only, never by the glass", "Wait 15-20 minutes after an episode of vomiting before starting sips"],
    donts: ["NEVER give honey to infants under 12 months due to infant botulism risk", "Do not drink warm or hot fluids immediately after vomiting"],
    redFlags: [
      "Vomiting blood or material resembling dark coffee grounds",
      "Vomiting following a head injury",
      "Signs of severe dehydration: dry mouth, sunken eyes, no urine in 8 hours"
    ],
    culturalContext: "Mint juice combined with honey has been the go-to Assamese home remedy for settled post-vomit gastric mucosal irritability for generations.",
    primarySpice: "Mint (Podina)",
    difficulty: "Easy",
    suitableTime: "After nausea/vomiting episode"
  },
  {
    id: "roasted-coriander-cumin-cold-draught",
    symptom: "Vomiting (mild, non-emergency)",
    symptomSlug: "mild-vomiting",
    name: "Roasted Coriander & Cumin Cold Draught (Dhania-Jeera Him Sarbat)",
    name_assamese: "ধনিয়া আৰু জিৰাৰ শীতল পানী",
    ingredients: [
      { item: "Coriander Seeds (Dhania)", qty: "1 tsp" },
      { item: "Cumin Seeds (Jeera)", qty: "1/2 tsp" },
      { item: "Mishri (Rock Sugar)", qty: "1/2 tsp" },
      { item: "Water", qty: "1 cup" },
    ],
    prepTimeMinutes: 5,
    steps: [
      "Lightly crush coriander and cumin seeds.",
      "Soak in 1 cup of cool water with rock sugar for 1 to 2 hours.",
      "Strain through a clean cloth.",
      "Take 1 to 2 tablespoons at a time at room temperature."
    ],
    dosage: {
      child: "Ages 3+: 1 tablespoon every 20 minutes.",
      adult: "2 tablespoons every 15 minutes.",
      elderly: "2 tablespoons every 15 minutes. Gentle gastric tonic."
    },
    dos: ["Drink slowly in tiny spoonfuls", "Keep ingredients cool without artificial ice"],
    donts: ["Don't force drinking if the patient is gagging", "Avoid dairy or solid foods for at least 4 hours"],
    redFlags: [
      "Vomiting accompanied by severe headache and neck stiffness",
      "Vomiting lasting more than 24 hours continuously",
      "Severe localized right lower abdomen tenderness (appendicitis suspicion)"
    ],
    culturalContext: "Coriander (Dhania) is an Ayurvedic 'Tridosha-hara' herb with natural anti-emetic properties that cools irritated stomach nerves.",
    primarySpice: "Coriander seeds (Dhania)",
    difficulty: "Easy",
    suitableTime: "Throughout the day in small sips"
  },

  // 9. Stomach Cramps
  {
    id: "ajwain-jaggery-antispasmodic-brew",
    symptom: "Stomach Cramps",
    symptomSlug: "stomach-cramps",
    name: "Carom & Jaggery Antispasmodic Warm Brew (Ajwain-Gur Kadha)",
    name_assamese: "জৱাইন আৰু গুড়ৰ গৰম ক্বাথ",
    ingredients: [
      { item: "Ajwain (Carom seeds)", qty: "1 tsp" },
      { item: "Jaggery (Gur)", qty: "1 tbsp, grated" },
      { item: "Water", qty: "1.5 cups" },
      { item: "Ginger (Aada)", qty: "1/2 inch, crushed" },
    ],
    prepTimeMinutes: 7,
    steps: [
      "Add water, ajwain, crushed ginger, and jaggery into a boiling pan.",
      "Boil vigorously until the jaggery dissolves and water reduces to 1 cup.",
      "Strain into a cup and drink comfortably warm.",
      "Wrap a warm cloth around the abdomen for complementary thermal relief."
    ],
    dosage: {
      child: "Ages 6+: 3 tablespoons of warm brew.",
      adult: "1 cup warm, taken slowly when cramping begins.",
      elderly: "1/2 cup warm. Relieves spasmodic contractions of smooth intestinal muscle."
    },
    dos: ["Sip while comfortably warm", "Rest lying on your left side with knees bent toward chest"],
    donts: ["Do not take if cramps are located on the far lower right side (must rule out appendicitis)", "Don't boil till syrup stage; keep it as a light tea"],
    redFlags: [
      "Severe sharp, stabbing pain localized to the right lower abdomen (appendicitis)",
      "Cramping accompanied by high fever, vomiting, and chills",
      "Stomach wall feels rigid, hard, or hurts intensely when hand pressure is released (rebound tenderness)"
    ],
    culturalContext: "The combination of carom thymol and warming jaggery relaxes visceral smooth muscle fibers, easing painful intestinal spasms rapidly.",
    primarySpice: "Ajwain (Carom seeds)",
    difficulty: "Easy",
    suitableTime: "When experiencing cramps"
  },
  {
    id: "fennel-ginger-tincture-cramps",
    symptom: "Stomach Cramps",
    symptomSlug: "stomach-cramps",
    name: "Fennel & Ginger Smooth Muscle Ease (Mouri-Aada Kadha)",
    name_assamese: "মৌৰি আৰু আদাৰ উপশমকাৰী চাহ",
    ingredients: [
      { item: "Fennel Seeds (Mouri)", qty: "1 tsp" },
      { item: "Fresh Ginger (Aada)", qty: "1/2 inch, thinly sliced" },
      { item: "Water", qty: "1.5 cups" },
      { item: "Honey (Mou)", qty: "1/2 tsp (optional)" },
    ],
    prepTimeMinutes: 6,
    steps: [
      "Crush fennel seeds lightly and place with sliced ginger in boiling water.",
      "Simmer covered for 4 minutes so steam condensate drops back into the pot.",
      "Strain and let cool to warm. Stir in 1/2 tsp honey if desired.",
      "Drink in slow calming sips."
    ],
    dosage: {
      child: "Ages 4+: 1/4 cup warm tea.",
      adult: "1 cup warm, twice a day as needed.",
      elderly: "1 cup warm. Highly soothing for spastic colon."
    },
    dos: ["Drink warm, not scalding hot", "Keep abdominal area covered and warm"],
    donts: ["Never add honey to boiling water (honey should only be mixed below 40°C)", "Do not ignore persistent severe pain"],
    redFlags: [
      "Cramping pain radiating into the back accompanied by blood in urine (kidney stone suspicion)",
      "Pain in a woman of reproductive age with missed menstrual period (ectopic pregnancy risk)",
      "Fainting or severe dizziness accompanying stomach cramps"
    ],
    culturalContext: "Fennel contains anethole which acts directly on intestinal smooth musculature to reduce painful hyperperistalsis without drowsiness.",
    primarySpice: "Fennel (Mouri)",
    difficulty: "Easy",
    suitableTime: "Afternoon or evening"
  },

  // 10. Acid Reflux at Night
  {
    id: "cold-milk-licorice-night-reflux",
    symptom: "Acid Reflux at Night",
    symptomSlug: "nocturnal-acid-reflux",
    name: "Cold Milk with Licorice Draught (Mulethi-Sital Gakhir)",
    name_assamese: "যষ্টিমধু আৰু শীতল গাখীৰ",
    ingredients: [
      { item: "Boiled and Chilled Milk", qty: "1/2 cup (room temp or cool)" },
      { item: "Licorice Root Powder (Mulethi)", qty: "1/4 tsp" },
      { item: "Mishri (Rock Sugar)", qty: "1/2 tsp, powdered" },
    ],
    prepTimeMinutes: 3,
    steps: [
      "Take 1/2 cup of pre-boiled cow milk cooled to room temperature.",
      "Stir in 1/4 teaspoon of fine Mulethi (licorice) root powder and powdered rock sugar.",
      "Whisk with a spoon until completely dissolved.",
      "Drink 45 minutes before lying down in bed."
    ],
    dosage: {
      child: "Ages 6+: 3-4 tablespoons if suffering nighttime heartburn.",
      adult: "1/2 cup at bedtime.",
      elderly: "1/2 cup at bedtime. Note: avoid large amounts of licorice if diagnosed with chronic severe hypertension."
    },
    dos: ["Elevate your head and torso by 6 inches with an extra pillow or wedge", "Finish drinking at least 45 minutes before lying horizontal"],
    donts: ["Do not eat heavy, spicy, or fried meals within 3 hours of sleeping", "Do not drink massive volumes of liquid right before bed"],
    redFlags: [
      "Waking up choking with acid burning the trachea or coughing uncontrollably",
      "Nighttime pain radiating down the left arm or into the back",
      "Chronic nighttime reflux causing progressive hoarseness or difficulty swallowing"
    ],
    culturalContext: "Mulethi coats the lower esophageal sphincter with protective mucilage, while calcium in cold milk neutralizes gastric acid pools before recumbency.",
    primarySpice: "Licorice (Mulethi)",
    difficulty: "Easy",
    suitableTime: "45 minutes before bedtime"
  },
  {
    id: "soaked-fennel-basil-seed-night-soother",
    symptom: "Acid Reflux at Night",
    symptomSlug: "nocturnal-acid-reflux",
    name: "Soaked Fennel & Basil Seed Soother (Mouri-Sabja Sarbat)",
    name_assamese: "মৌৰি আৰু সবজা গুটিৰ চৰবত",
    ingredients: [
      { item: "Sweet Basil Seeds (Sabja)", qty: "1 tsp" },
      { item: "Fennel Seed Water (pre-soaked)", qty: "1/2 cup" },
      { item: "Water", qty: "1/2 cup" },
    ],
    prepTimeMinutes: 10,
    steps: [
      "Soak 1 tsp of sweet basil seeds (sabja) in 1/2 cup water for 10 minutes until they swell into gelatinous beads.",
      "Mix with 1/2 cup of pre-strained fennel seed water.",
      "Drink 1 hour before sleeping.",
      "The mucilaginous seeds create a physical soothing barrier in the upper stomach."
    ],
    dosage: {
      child: "Ages 5+: 1/4 cup strained and diluted.",
      adult: "1 cup 1 hour before sleep.",
      elderly: "1 cup. Safe, cooling, and eliminates nighttime burning naturally."
    },
    dos: ["Drink 1 hour before sleep", "Sleep on your left side to keep the gastroesophageal junction above gastric acid level"],
    donts: ["Do not lie flat immediately after drinking", "Do not consume raw unsoaked basil seeds (must be fully gelatinized)"],
    redFlags: [
      "Chronic cough awakening from sleep accompanied by wheezing",
      "Vomiting dark blood or waking up with bile in the mouth nightly",
      "Unexplained rapid weight loss alongside heartburn"
    ],
    culturalContext: "Sabja (tukmaria / holy basil seeds) expand into gel pearls that absorb free acid and lubricate the stomach cardia through the night.",
    primarySpice: "Fennel (Mouri)",
    difficulty: "Easy",
    suitableTime: "1 hour before sleeping"
  }
];
