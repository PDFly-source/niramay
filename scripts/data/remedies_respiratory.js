// scripts/data/remedies_respiratory.js

module.exports = [
  // 11. Common Cold
  {
    id: "aada-tulsi-jaluk-kadha",
    symptom: "Common Cold",
    symptomSlug: "common-cold",
    name: "Assamese Ginger-Tulsi-Black Pepper Kadha (Aada-Tulsi-Jaluk Kadha)",
    name_assamese: "আদা, তুলসী আৰু জালুকৰ ক্বাথ",
    ingredients: [
      { item: "Tulsi Leaves (Holy Basil)", qty: "8-10 fresh leaves" },
      { item: "Fresh Ginger (Aada)", qty: "1 inch, crushed" },
      { item: "Black Peppercorns (Jaluk)", qty: "4-5 seeds, cracked" },
      { item: "Water", qty: "2 cups" },
      { item: "Pure Honey (Mou)", qty: "1 tsp (added off-heat)" },
    ],
    prepTimeMinutes: 10,
    steps: [
      "Wash fresh green or dark Krishna Tulsi leaves thoroughly.",
      "Lightly crush ginger and crack black peppercorns in a mortar.",
      "Bring 2 cups of water to a rolling boil; add tulsi, ginger, and black pepper.",
      "Simmer on medium-low until the liquid reduces to 1 cup and turns deep amber.",
      "Strain into a mug. Allow to cool to warm (never hot when adding honey).",
      "Stir in 1 tsp pure honey and sip slowly."
    ],
    dosage: {
      child: "Ages 2-5: 2-3 tbsp warm strained liquid with honey. Ages 6-12: 1/3 cup twice daily. (STRICT WARNING: Never give honey under 1 yr).",
      adult: "1 cup (150ml) twice daily, morning and evening.",
      elderly: "1/2 to 1 cup twice daily. Discontinue if gastric acidity surges."
    },
    dos: ["Drink warm while inhaling the aromatic steam", "Rest covered in a warm blanket after drinking to promote mild diaphoresis (sweating)"],
    donts: ["NEVER add honey to boiling or scalding liquids (Ayurvedic rule against Ama formation)", "Do not drink chilled water for at least 1 hour after the kadha"],
    redFlags: [
      "Shortness of breath, persistent rapid breathing, or stridor",
      "Fever spiking above 102°F (38.9°C) lasting over 3 days",
      "Coughing up rust-colored, bloody, or thick foul-smelling sputum"
    ],
    culturalContext: "The revered triumvirate of Assamese home medicine — Aada, Tulsi, and Jaluk — has protected Brahmaputra valley families across wet monsoon winters.",
    primarySpice: "Tulsi (Holy Basil)",
    difficulty: "Easy",
    suitableTime: "Morning and early evening"
  },
  {
    id: "honey-ginger-warming-linctus",
    symptom: "Common Cold",
    symptomSlug: "common-cold",
    name: "Fresh Ginger & Honey Throat Linctus (Aada-Mou Ras)",
    name_assamese: "আদাৰ ৰস আৰু মৌৰ মিশ্ৰণ",
    ingredients: [
      { item: "Fresh Ginger Juice (Aada)", qty: "1 tsp, freshly grated and squeezed" },
      { item: "Pure Raw Honey (Mou)", qty: "1 tsp" },
      { item: "Black Pepper Powder (Jaluk)", qty: "1 tiny pinch" },
    ],
    prepTimeMinutes: 3,
    steps: [
      "Grate a knob of fresh juicy ginger root.",
      "Squeeze between clean fingers or through a clean muslin cloth to extract 1 tsp fresh juice.",
      "Mix with 1 tsp raw honey and a pinch of black pepper in a small ceramic saucer.",
      "Lick the mixture slowly off the spoon so it coats the throat lining."
    ],
    dosage: {
      child: "Ages 2-5: 1/2 tsp once daily. (STRICT WARNING: Honey forbidden under 1 year).",
      adult: "1 tsp, 2 to 3 times a day as needed.",
      elderly: "1 tsp twice daily. Excellent throat protector."
    },
    dos: ["Lick slowly, allowing it to coat the back of the pharynx", "Avoid drinking water for 20 minutes after taking to let the honey barrier act"],
    donts: ["Never administer honey to infants under 12 months", "Do not dilute in water; take as a viscous linctus"],
    redFlags: [
      "Stridor (high-pitched whistling breath while resting)",
      "Bluish tint to lips or fingernails (cyanosis)",
      "Cold progressing to extreme lethargy and inability to wake"
    ],
    culturalContext: "Fresh ginger juice (Aada ras) mixed with raw village honey is the oldest documented home linctus in rural Assam.",
    primarySpice: "Ginger (Aada)",
    difficulty: "Easy",
    suitableTime: "Morning and before bed"
  },

  // 12. Cough (Dry)
  {
    id: "roasted-clove-honey-lozenge",
    symptom: "Cough (Dry)",
    symptomSlug: "cough-dry",
    name: "Tawa-Roasted Clove & Honey Lozenge (Bhoja Long-Mou)",
    name_assamese: "ভজা লং আৰু মৌৰ লেহ",
    ingredients: [
      { item: "Whole Cloves (Long)", qty: "2-3 cloves with intact round heads" },
      { item: "Pure Honey (Mou)", qty: "1 tsp" },
    ],
    prepTimeMinutes: 4,
    steps: [
      "Place cloves on a dry iron tawa or skillet on very low heat.",
      "Roast for 60 seconds until the round buds puff up slightly and emit sweet vapor.",
      "Remove and let cool until just warm.",
      "Keep 1 roasted clove in the mouth, gently pressing it against the palate.",
      "Alternatively, crush the roasted clove into a powder and mix into 1 tsp honey to lick."
    ],
    dosage: {
      child: "Ages 6+: 1/2 tsp of the honey-clove powder mixture. (Avoid whole cloves in young children to prevent choking).",
      adult: "Hold 1 whole roasted clove in the cheek or take 1 tsp honey mixture up to 3 times daily.",
      elderly: "1 whole roasted clove held in cheek pouch. Suppresses dry tickle rapidly."
    },
    dos: ["Keep near the back teeth and allow saliva to swallow slowly", "Ensure clove heads are intact before roasting"],
    donts: ["Never swallow the clove whole like a pill", "Do not give whole cloves to children under 6"],
    redFlags: [
      "Dry barking cough in children accompanied by chest wall retractions",
      "Persistent dry cough lasting more than 3 weeks (requires tuberculosis/asthma screening)",
      "Cough accompanied by sharp pleuritic chest pain upon inhalation"
    ],
    culturalContext: "Eugenol in roasted cloves acts as a natural local anesthetic, numbing hyperactive cough reflex receptors on the throat wall.",
    primarySpice: "Clove (Long)",
    difficulty: "Easy",
    suitableTime: "When coughing fits occur, especially at night"
  },
  {
    id: "mulethi-ghee-dry-cough-soother",
    symptom: "Cough (Dry)",
    symptomSlug: "cough-dry",
    name: "Licorice & Pure Desi Ghee Throat Balm (Mulethi-Ghee)",
    name_assamese: "যষ্টিমধু আৰু ঘিউৰ মলম",
    ingredients: [
      { item: "Mulethi Powder (Licorice Root)", qty: "1/2 tsp" },
      { item: "Pure Desi Cow Ghee", qty: "1/2 tsp, warm" },
      { item: "Black Pepper (Jaluk)", qty: "1 tiny pinch" },
    ],
    prepTimeMinutes: 3,
    steps: [
      "Gently warm pure cow ghee in a small spoon.",
      "Mix in fine licorice (Mulethi) powder and a pinch of black pepper.",
      "Stir into a smooth paste.",
      "Lick slowly off the spoon to lubricate irritated, parched vocal cords."
    ],
    dosage: {
      child: "Ages 4+: 1/4 tsp twice daily.",
      adult: "1/2 tsp twice daily, especially before bedtime.",
      elderly: "1/2 tsp before bed. Coats dry irritated throat tissues overnight."
    },
    dos: ["Take right before sleeping to prevent nighttime coughing spasms", "Ensure ghee is warm and pure"],
    donts: ["Do not drink water immediately afterward", "Avoid if suffering from acute diarrhea (ghee will loosen bowels)"],
    redFlags: [
      "Cough that prevents speaking full sentences without gasping",
      "Unexplained hoarseness lasting more than 3 weeks",
      "Weight loss and drenching night sweats"
    ],
    culturalContext: "Mulethi has demulcent properties that soothe mucosal irritation, while cow ghee acts as a carrier that binds to parched pharyngeal mucosa.",
    primarySpice: "Licorice (Mulethi)",
    difficulty: "Easy",
    suitableTime: "Bedtime"
  },

  // 13. Cough (Wet/Productive)
  {
    id: "ginger-tulsi-black-pepper-wet-cough",
    symptom: "Cough (Wet/Productive)",
    symptomSlug: "cough-wet",
    name: "Ginger, Tulsi & Black Pepper Expectorant (Aada-Jaluk Expectorant)",
    name_assamese: "আদা, তুলসী আৰু জালুকৰ কফনাশক মিশ্ৰণ",
    ingredients: [
      { item: "Fresh Ginger (Aada)", qty: "1 inch, crushed" },
      { item: "Tulsi Leaves", qty: "10 leaves" },
      { item: "Black Peppercorns (Jaluk)", qty: "6-8 seeds, cracked" },
      { item: "Water", qty: "2 cups" },
      { item: "Rock Salt (Saindhava)", qty: "1 small pinch" },
    ],
    prepTimeMinutes: 10,
    steps: [
      "Coarsely crush black peppercorns and ginger in a mortar.",
      "Boil together with tulsi leaves and water in a saucepan.",
      "Simmer vigorously until reduced by half.",
      "Strain into a cup, add a pinch of rock salt (acts as a mucolytic to break thick phlegm).",
      "Drink hot in sips to liquefy bronchial mucus."
    ],
    dosage: {
      child: "Ages 5+: 3 tbsp twice daily.",
      adult: "1 cup twice to thrice daily.",
      elderly: "1/2 to 1 cup twice daily. Helps clear persistent morning catarrh."
    },
    dos: ["Drink warm to hot", "Perform gentle huff coughing after drinking to expel loosened mucus"],
    donts: ["Do not take cough suppressants that stop phlegm expulsion (wet cough must clear)", "Avoid dairy and cold bananas while wet cough is active"],
    redFlags: [
      "Sputum tinged with bright red blood or pink froth",
      "High fever > 103°F with shaking chills (suspicion of pneumonia)",
      "Audible wheezing or chest indrawing while breathing"
    ],
    culturalContext: "Piperine in Assamese Jaluk combined with gingerol breaks disulfide bonds in mucus, transforming thick stagnant phlegm into thin fluid easily expectorated.",
    primarySpice: "Black pepper (Jaluk)",
    difficulty: "Easy",
    suitableTime: "Morning upon waking and 4 PM"
  },
  {
    id: "honey-cinnamon-wet-cough-glaze",
    symptom: "Cough (Wet/Productive)",
    symptomSlug: "cough-wet",
    name: "Cinnamon & Honey Warm Expectorant Glaze (Dalchini-Mou)",
    name_assamese: "ডালচেনি আৰু মৌৰ কফনাশক মিশ্ৰণ",
    ingredients: [
      { item: "Pure Ceylon Cinnamon Powder (Dalchini)", qty: "1/4 tsp" },
      { item: "Pure Honey (Mou)", qty: "1 tsp" },
      { item: "Warm Water", qty: "1 tbsp" },
    ],
    prepTimeMinutes: 3,
    steps: [
      "Mix finely ground cinnamon with 1 tsp raw honey.",
      "Add 1 tbsp lukewarm water to thin slightly into a glaze.",
      "Swallow slowly to open upper bronchial passages."
    ],
    dosage: {
      child: "Ages 2+: 1/2 tsp once daily. (STRICT WARNING: Never give honey under 1 year).",
      adult: "1 tsp twice daily for 3 days.",
      elderly: "1 tsp twice daily. Warms cold chest stagnation."
    },
    dos: ["Use authentic sweet Ceylon cinnamon (Dalchini) rather than pungent cassia", "Take on an empty stomach in the morning"],
    donts: ["Never exceed 1/2 tsp cinnamon per day (excess coumarin burdens liver)", "Never administer honey to infants under 1 year"],
    redFlags: [
      "Inability to lie flat without severe breathless coughing fits",
      "Swelling of ankles along with wet coughing fits (congestive heart sign)",
      "Foul-tasting green phlegm with pleuritic chest wall pain"
    ],
    culturalContext: "Cinnamon has gentle warming circulatory properties that disperse Kapha accumulation in the upper chest.",
    primarySpice: "Cinnamon (Dalchini)",
    difficulty: "Easy",
    suitableTime: "Morning"
  },

  // 14. Sore Throat
  {
    id: "haldi-salt-warm-gargle",
    symptom: "Sore Throat",
    symptomSlug: "sore-throat",
    name: "Turmeric & Rock Salt Warm Gargle (Haldi-Nimokh Kuli)",
    name_assamese: "হালধি আৰু নিমখৰ গৰম কুলি",
    ingredients: [
      { item: "Turmeric Powder (Haldi)", qty: "1/2 tsp" },
      { item: "Rock Salt or Sea Salt (Nimokh)", qty: "1/2 tsp" },
      { item: "Warm Water", qty: "1 cup (comfortably warm)" },
    ],
    prepTimeMinutes: 3,
    steps: [
      "Heat 1 cup of clean drinking water until pleasantly warm (test on wrist).",
      "Stir in 1/2 tsp turmeric powder and 1/2 tsp salt until completely suspended.",
      "Take a mouthful, tilt head back at 45 degrees, and gargle deep in the throat for 20-30 seconds.",
      "Spit out completely into a sink. Do NOT swallow.",
      "Repeat 3 to 4 times per session until the glass is empty."
    ],
    dosage: {
      child: "Ages 6+: Only if the child has learned how to gargle and spit without swallowing.",
      adult: "1 full cup gargled, 2 to 3 times daily.",
      elderly: "1 full cup gargled twice daily. Outstanding antiseptic and osmotic swelling reducer."
    },
    dos: ["Spit out all liquid completely", "Gargle 3 times a day: upon waking, mid-day, and before bed"],
    donts: ["Do not use scalding water (will blister inflamed pharynx mucosa)", "Do not swallow the gargle solution"],
    redFlags: [
      "Inability to swallow own saliva (drooling)",
      "Muffled, thick 'hot potato' voice",
      "Difficulty opening the mouth wide (trismus) or visible peritonsillar bulge"
    ],
    culturalContext: "The gold standard of Indian home healing: salt pulls out inflammatory interstitial fluid via osmosis while turmeric provides curcuminoid antimicrobial action.",
    primarySpice: "Turmeric (Haldi)",
    difficulty: "Easy",
    suitableTime: "Morning and evening"
  },
  {
    id: "mulethi-clove-warm-infusion",
    symptom: "Sore Throat",
    symptomSlug: "sore-throat",
    name: "Licorice & Clove Throat Tea (Mulethi-Long Rongasa)",
    name_assamese: "যষ্টিমধু আৰু লংৰ উপশমকাৰী চাহ",
    ingredients: [
      { item: "Licorice Root (Mulethi)", qty: "1 small piece (1 inch) or 1/2 tsp powder" },
      { item: "Cloves (Long)", qty: "3 buds, bruised" },
      { item: "Water", qty: "1.5 cups" },
      { item: "Ginger (Aada)", qty: "1/2 inch, crushed" },
    ],
    prepTimeMinutes: 8,
    steps: [
      "Bruise cloves and crush the mulethi piece with ginger.",
      "Boil with 1.5 cups water on gentle flame for 6 minutes.",
      "Strain into a cup. Sip hot in slow draws, letting each sip pool momentarily in the throat."
    ],
    dosage: {
      child: "Ages 5+: 1/4 cup warm tea twice daily.",
      adult: "1 cup twice daily.",
      elderly: "1 cup twice daily. Natural coating for raw vocal cords."
    },
    dos: ["Sip slowly in small mouthfuls", "Rest the voice and avoid whispering (whispering strains vocal folds more than normal speech)"],
    donts: ["Avoid cold beverages or air-conditioned blasts right after drinking", "Do not take excessive licorice if on potassium-wasting diuretics"],
    redFlags: [
      "Asymmetric tonsillar swelling pushing uvula to one side (quinsy/peritonsillar abscess)",
      "High fever > 102°F with absence of cough (possible bacterial Strep throat)",
      "Throat pain accompanied by stiff neck and inability to touch chin to chest"
    ],
    culturalContext: "Singers and classical theater performers across Assam drink Mulethi and Long brew to restore vocal brilliance and relieve pharyngeal inflammation.",
    primarySpice: "Licorice (Mulethi)",
    difficulty: "Easy",
    suitableTime: "Mid-morning and evening"
  },

  // 15. Nasal Congestion
  {
    id: "ajwain-tulsi-potli-steam",
    symptom: "Nasal Congestion",
    symptomSlug: "nasal-congestion",
    name: "Ajwain & Tulsi Potli Dry Inhalation (Ajwain-Tulsi Potli)",
    name_assamese: "জৱাইন আৰু তুলসীৰ পুটলিৰ ভাপ",
    ingredients: [
      { item: "Ajwain (Carom seeds)", qty: "2 tbsp" },
      { item: "Dried Tulsi Leaves", qty: "1 tbsp" },
      { item: "Clean Cotton Handkerchief", qty: "1 square piece" },
    ],
    prepTimeMinutes: 5,
    steps: [
      "Dry roast ajwain seeds on a clean pan for 1 minute until fragrant.",
      "Transfer hot roasted seeds and dried tulsi leaves to the center of a clean cotton cloth.",
      "Tie tightly into a small round pouch (potli) using a clean string.",
      "Warm the potli briefly against your own palm, then bring it close to each nostril and inhale deeply for 1-2 minutes.",
      "Store in a clean zip pouch; re-warm gently on a warm tawa for repeated use."
    ],
    dosage: {
      child: "Ages 1+: Place the warm potli near the child's pillow (never directly touching skin).",
      adult: "Inhale 2-3 deep breaths per nostril as needed throughout the day.",
      elderly: "Inhale as needed. Excellent non-medicinal sinus opener without chemical rebound."
    },
    dos: ["Test temperature against inside of wrist before holding close to face", "Inhale slowly through the nose and exhale through mouth"],
    donts: ["Do not make it so hot that it burns nasal tissues", "Never leave unattended within reach of infants"],
    redFlags: [
      "Unilateral foul-smelling nasal drainage in a young child (suspected foreign body in nostril)",
      "Swelling, redness, or heat around eye orbits",
      "Clear watery fluid dripping continuously from one nostril following head trauma"
    ],
    culturalContext: "The Ajwain Potli is an iconic grandmother's ritual across Assam, carried in pockets by workers during chilly morning river breezes.",
    primarySpice: "Ajwain (Carom seeds)",
    difficulty: "Easy",
    suitableTime: "Whenever nose feels blocked"
  },
  {
    id: "mustard-oil-garlic-chest-rub",
    symptom: "Nasal Congestion",
    symptomSlug: "nasal-congestion",
    name: "Warm Mustard Oil & Garlic Chest Rub (Nohoru-Mitha Tel)",
    name_assamese: "নহৰু আৰু মিঠাতেলৰ মালিশ",
    ingredients: [
      { item: "Pure Mustard Oil (Mitha Tel)", qty: "2 tbsp" },
      { item: "Garlic (Nohoru)", qty: "3-4 cloves, peeled and crushed" },
      { item: "Ajwain (Carom seeds)", qty: "1/2 tsp" },
    ],
    prepTimeMinutes: 5,
    steps: [
      "Heat mustard oil gently in a small steel bowl or iron ladle.",
      "Add crushed garlic cloves and ajwain seeds.",
      "Fry on low heat until garlic cloves turn golden brown and infuse their allicin and allylisothiocyanates into the oil.",
      "Turn off flame and let cool until pleasantly warm (lukewarm).",
      "Strain out the burnt solids. Gently massage the warm oil onto the chest, throat, back, and the soles of both feet.",
      "Cover feet with warm cotton socks."
    ],
    dosage: {
      child: "Ages 1+: Gently massage on the soles of feet only and cover with warm socks. (Avoid chest in infants to prevent skin irritation).",
      adult: "Massage onto chest, throat, back, and soles of feet before bedtime.",
      elderly: "Massage onto chest, back, and feet. Provides deep penetrating circulatory warmth."
    },
    dos: ["Always test temperature on your wrist before applying", "Put on warm socks after massaging the soles of feet"],
    donts: ["Never pour oil directly inside the nostrils", "Do not apply over broken skin or open rashes"],
    redFlags: [
      "Severe respiratory distress: flaring nostrils, grunting, or intercostal retractions",
      "Complete inability to breathe through nose while nursing in newborn",
      "High fever with intense facial headache"
    ],
    culturalContext: "Nohoru-Mitha Tel (Garlic in Kachi Ghani Mustard Oil) is the foundational chest decongestant in every Assamese rural home.",
    primarySpice: "Mustard Oil (Mitha Tel)",
    difficulty: "Easy",
    suitableTime: "Bedtime"
  },

  // 16. Sinus Pressure
  {
    id: "turmeric-mint-steam-inhalation",
    symptom: "Sinus Pressure",
    symptomSlug: "sinus-pressure",
    name: "Turmeric & Mint Herbal Steam (Haldi-Podina Bhap)",
    name_assamese: "হালধি আৰু পদিনাৰ ভাপ",
    ingredients: [
      { item: "Turmeric Powder (Haldi)", qty: "1/2 tsp" },
      { item: "Fresh Mint Leaves (or 2 drops eucalyptus oil)", qty: "8-10 leaves" },
      { item: "Boiling Water", qty: "4 cups in a wide bowl" },
    ],
    prepTimeMinutes: 5,
    steps: [
      "Pour boiling water into a sturdy heat-proof bowl.",
      "Add turmeric powder and crushed mint leaves.",
      "Sit comfortably and lean over the bowl at a safe distance of 12 inches.",
      "Drape a large towel over your head and bowl to trap the herbal steam.",
      "Close eyes tightly and inhale deeply through the nose for 5-8 minutes.",
      "Blow nose gently into a clean tissue to clear loosened mucus."
    ],
    dosage: {
      child: "Ages 7+: Under strict adult supervision with bowl kept stable on table. (Never use with toddlers due to scald burn risk).",
      adult: "Inhale for 5 to 8 minutes, twice daily.",
      elderly: "Inhale for 5 minutes while comfortably seated. Relieves intense frontal sinus pressure."
    },
    dos: ["Keep eyes closed throughout steam inhalation", "Blow nose gently one nostril at a time without forceful pressure"],
    donts: ["NEVER leave a child unattended near boiling water", "Do not go out into cold drafts immediately after steaming"],
    redFlags: [
      "Periorbital swelling, redness, or protrusion of eye",
      "Vision changes (double vision, blurred sight) alongside sinus headache",
      "Severe forehead pain accompanied by high spiking fever and confusion"
    ],
    culturalContext: "Inhalation of turmeric vapor (Haldi Dhup/Bhap) carries volatilized curcuminoids directly into congested ethmoid and maxillary sinus ostia.",
    primarySpice: "Turmeric (Haldi)",
    difficulty: "Easy",
    suitableTime: "Morning and before bed"
  },
  {
    id: "ginger-black-pepper-sinus-broth",
    symptom: "Sinus Pressure",
    symptomSlug: "sinus-pressure",
    name: "Spicy Assamese Sinus Broth (Jalukia Pani)",
    name_assamese: "জালুকীয়া পানী",
    ingredients: [
      { item: "Black Pepper (Jaluk)", qty: "1 tsp, freshly ground" },
      { item: "Fresh Ginger (Aada)", qty: "1.5 inch, grated" },
      { item: "Garlic (Nohoru)", qty: "3 cloves, crushed" },
      { item: "Water", qty: "2.5 cups" },
      { item: "Rock Salt", qty: "1/2 tsp" },
      { item: "Kaji Nemu Juice", qty: "1 tsp" },
    ],
    prepTimeMinutes: 10,
    steps: [
      "Combine water, black pepper, grated ginger, and crushed garlic in a saucepan.",
      "Boil vigorously until reduced to roughly 1.5 cups.",
      "Strain into a soup bowl, stir in rock salt and fresh Kaji Nemu juice.",
      "Sip hot like a clear spicy consommé."
    ],
    dosage: {
      child: "Ages 8+: 1/3 cup diluted with warm water.",
      adult: "1 cup hot soup broth once or twice daily.",
      elderly: "1 cup hot broth. Promotes vigorous sinus drainage."
    },
    dos: ["Sip hot while breathing in the spicy garlic-pepper vapors", "Have after a light meal"],
    donts: ["Do not take if suffering from severe acid reflux or gastritis", "Do not boil after adding lemon juice"],
    redFlags: [
      "Persistent foul-smelling green nasal discharge lasting > 12 days",
      "Intense pain tapping over cheekbones accompanied by dental pain",
      "Stiff neck or inability to flex neck forward"
    ],
    culturalContext: "'Jalukia Pani' is a heritage Assamese clear broth prepared specifically during seasonal changes to flush out sinus cavities.",
    primarySpice: "Black pepper (Jaluk)",
    difficulty: "Easy",
    suitableTime: "Lunch or early evening"
  },

  // 17. Mild Fever
  {
    id: "tulsi-dhania-cooling-kadha",
    symptom: "Mild Fever",
    symptomSlug: "mild-fever",
    name: "Tulsi & Coriander Cooling Febrifuge (Tulsi-Dhania Kadha)",
    name_assamese: "তুলসী আৰু ধনিয়াৰ জ্বৰনাশক ক্বাথ",
    ingredients: [
      { item: "Fresh Tulsi Leaves", qty: "10-12 leaves" },
      { item: "Coriander Seeds (Dhania)", qty: "1 tbsp, bruised" },
      { item: "Water", qty: "2 cups" },
      { item: "Mishri (Rock Sugar)", qty: "1 tsp" },
    ],
    prepTimeMinutes: 10,
    steps: [
      "Lightly crush coriander seeds and fresh tulsi leaves.",
      "Boil in 2 cups of water on medium flame until reduced to 1 cup.",
      "Strain, stir in rock sugar, and allow to cool until lukewarm.",
      "Drink twice daily to support natural fever reduction and hydration."
    ],
    dosage: {
      child: "Ages 3+: 1/4 cup twice daily.",
      adult: "1 cup twice daily.",
      elderly: "1 cup twice daily. Cools internal burning heat without digestive chill."
    },
    dos: ["Drink lukewarm, never iced", "Wear lightweight cotton clothing and stay well hydrated"],
    donts: ["Never bundle a feverish person in thick heavy blankets (can cause dangerous heat retention)", "Do not ignore high fevers exceeding 101°F"],
    redFlags: [
      "Fever in an infant under 3 months old (requires immediate hospital evaluation)",
      "Fever exceeding 103°F (39.4°C) or not responding to clinical antipyretics",
      "Fever accompanied by petechial purple rash, seizure, or confusion"
    ],
    culturalContext: "Coriander seeds are celebrated in Ayurveda for 'Sweda-janana' (gentle diaphoresis) and 'Jwarahara' (fever balancing) without taxing the kidneys.",
    primarySpice: "Coriander seeds (Dhania)",
    difficulty: "Easy",
    suitableTime: "Morning and afternoon"
  },
  {
    id: "ginger-raisin-hydration-water",
    symptom: "Mild Fever",
    symptomSlug: "mild-fever",
    name: "Ginger & Soaked Raisin Hydration Elixir (Aada-Kismis Pani)",
    name_assamese: "আদা আৰু কিচমিচৰ বলকাৰক পানী",
    ingredients: [
      { item: "Golden or Black Raisins (Kismis)", qty: "15 pieces" },
      { item: "Fresh Ginger (Aada)", qty: "1/2 inch, sliced thin" },
      { item: "Water", qty: "2 cups" },
      { item: "Rock Salt", qty: "1 tiny pinch" },
    ],
    prepTimeMinutes: 8,
    steps: [
      "Boil water with sliced ginger and raisins for 5 minutes.",
      "Turn off heat, cover, and let steep for 10 minutes until raisins swell.",
      "Mash raisins lightly with the back of a spoon into the broth.",
      "Strain and sip lukewarm with a pinch of rock salt for natural electrolyte replenishment."
    ],
    dosage: {
      child: "Ages 2+: 1/3 cup throughout the day.",
      adult: "1 cup twice daily.",
      elderly: "1 cup twice daily. Prevents weakness and post-viral dehydration."
    },
    dos: ["Sip small amounts frequently throughout the day", "Rest in a well-ventilated, quiet room"],
    donts: ["Do not skip fluids during a fever", "Avoid solid, oily foods while body temperature is elevated"],
    redFlags: [
      "Fever lasting more than 3 continuous days",
      "Stiff neck or inability to touch chin to chest",
      "Extreme drowsiness or inability to arouse the patient"
    ],
    culturalContext: "Munakka/raisins provide easily assimilable natural glucose and minerals that sustain energy when gastric appetite shuts down during fever.",
    primarySpice: "Ginger (Aada)",
    difficulty: "Easy",
    suitableTime: "Between rests during the day"
  },

  // 18. Body Ache
  {
    id: "mustard-oil-camphor-body-rub",
    symptom: "Body Ache (with cold/flu)",
    symptomSlug: "body-ache",
    name: "Camphor-Infused Warm Mustard Oil Rub (Karpur-Mitha Tel)",
    name_assamese: "কপূৰ আৰু মিঠাতেলৰ মালিশ",
    ingredients: [
      { item: "Pure Mustard Oil (Mitha Tel)", qty: "3 tbsp" },
      { item: "Edible Camphor (Bhimseni Karpur)", qty: "1 tiny pinch (grain of rice size)" },
      { item: "Garlic (Nohoru)", qty: "2 cloves, bruised" },
    ],
    prepTimeMinutes: 4,
    steps: [
      "Warm mustard oil with bruised garlic in a small steel pan until garlic softens.",
      "Remove from flame, discard garlic, and drop in the tiny pinch of edible camphor.",
      "Camphor will dissolve instantly in the warm oil.",
      "Gently rub onto aching calves, thighs, back, and shoulders.",
      "Rest under a warm cotton sheet."
    ],
    dosage: {
      child: "Ages 5+: Gentle rub on legs using plain warm mustard oil (omit camphor in young children).",
      adult: "Massage onto aching limbs and back before sleeping.",
      elderly: "Massage onto joints and muscles. Relieves flu-associated malaise."
    },
    dos: ["Apply gentle rhythmic downward strokes", "Keep skin covered with warm cotton clothing after massage"],
    donts: ["Never apply on face or near eyes", "Never ingest camphor internally"],
    redFlags: [
      "Body ache with unbearable calf pain, redness, or swelling on one side (deep vein thrombosis risk)",
      "Body ache accompanied by high fever, severe joint redness, and rash (dengue / chikungunya signs)",
      "Complete inability to move arms or legs"
    ],
    culturalContext: "Camphor stimulates cutaneous cold receptors while mustard oil warms deeper tissues, creating an alternating analgesic reflex that relieves flu aches.",
    primarySpice: "Mustard Oil (Mitha Tel)",
    difficulty: "Easy",
    suitableTime: "Before bedtime"
  },
  {
    id: "turmeric-ginger-golden-infusion-ache",
    symptom: "Body Ache (with cold/flu)",
    symptomSlug: "body-ache",
    name: "Golden Turmeric-Ginger Soreness Draught (Haldi-Aada Kadha)",
    name_assamese: "হালধি আৰু আদাৰ গা-বিষৰ ক্বাথ",
    ingredients: [
      { item: "Raw Turmeric (Kesa Haldi) or Powder", qty: "1 inch grated or 1/2 tsp powder" },
      { item: "Fresh Ginger (Aada)", qty: "1 inch, crushed" },
      { item: "Black Pepper (Jaluk)", qty: "3-4 seeds, cracked" },
      { item: "Water", qty: "1.5 cups" },
      { item: "Jaggery (Gur)", qty: "1 tsp" },
    ],
    prepTimeMinutes: 8,
    steps: [
      "Boil water with grated turmeric, ginger, and cracked black pepper.",
      "Simmer for 5 minutes until deep yellow-orange.",
      "Add jaggery, stir until dissolved, and strain.",
      "Drink comfortably hot before resting."
    ],
    dosage: {
      child: "Ages 4+: 1/3 cup warm with jaggery.",
      adult: "1 cup twice daily.",
      elderly: "1 cup twice daily. Curcumin and gingerols soothe systemic muscle aches."
    },
    dos: ["Drink warm before afternoon nap or nighttime sleep", "Always include black pepper (piperine multiplies curcumin bioavailability by 2000%)"],
    donts: ["Do not take cold", "Avoid if currently diagnosed with bile duct obstruction"],
    redFlags: [
      "Ache so severe that bedsheets touching skin causes screaming pain",
      "Urine turns dark brown or cola-colored after intense muscle soreness (rhabdomyolysis)",
      "High fever lasting over 4 days with retro-orbital eye pain"
    ],
    culturalContext: "Turmeric and ginger act as dual Cox-2 inhibitors in traditional pharmacology, reducing generalized inflammatory muscle soreness naturally.",
    primarySpice: "Turmeric (Haldi)",
    difficulty: "Easy",
    suitableTime: "Evening"
  },

  // 19. Chest Congestion
  {
    id: "warm-mustard-oil-garlic-chest-compress",
    symptom: "Chest Congestion",
    symptomSlug: "chest-congestion",
    name: "Warming Garlic Mustard Oil Chest Compress (Nohoru-Mitha Tel Lep)",
    name_assamese: "নহৰু আৰু মিঠাতেলৰ বুকুৰ লেপ",
    ingredients: [
      { item: "Mustard Oil (Mitha Tel)", qty: "2 tbsp" },
      { item: "Garlic (Nohoru)", qty: "4 cloves, finely crushed" },
      { item: "Ajwain (Carom seeds)", qty: "1/2 tsp" },
      { item: "Soft Cotton Flannel Cloth", qty: "1 piece" },
    ],
    prepTimeMinutes: 6,
    steps: [
      "Warm the mustard oil with garlic and ajwain until garlic browns slightly.",
      "Strain oil and let cool until safely warm (test on your own wrist).",
      "Rub the warm oil firmly over the upper chest and between the shoulder blades.",
      "Place a dry warm cotton flannel cloth over the chest and wear a snug cotton vest.",
      "Rest in bed to retain therapeutic heat."
    ],
    dosage: {
      child: "Ages 3+: Rub lightly on upper back only and cover with warm shirt. (Avoid direct heavy application on sensitive infant chest).",
      adult: "Apply to chest and upper back twice daily, especially bedtime.",
      elderly: "Apply to chest and back. Deeply penetrating circulatory comfort."
    },
    dos: ["Keep chest warmly clothed after application", "Use only lukewarm oil to prevent burns"],
    donts: ["Never apply scorching hot oil", "Do not apply if child has eczema or open skin sores on chest"],
    redFlags: [
      "Chest indrawing, tracheal tug, or gasping for breath",
      "Audible wheezing or whistling with every exhale",
      "Coughing up frank blood or dark brown sputum"
    ],
    culturalContext: "The volatile sulfur compounds from garlic and allyl-isothiocyanate in mustard oil penetrate cutaneous capillaries, creating reflex bronchial vasodilation.",
    primarySpice: "Mustard Oil (Mitha Tel)",
    difficulty: "Easy",
    suitableTime: "Bedtime"
  },
  {
    id: "tulsi-jaluk-ginger-steam-congestion",
    symptom: "Chest Congestion",
    symptomSlug: "chest-congestion",
    name: "Tulsi & Black Pepper Vapor Inhalation (Tulsi-Jaluk Bhap)",
    name_assamese: "তুলসী আৰু জালুকৰ বুকু খোলক ভাপ",
    ingredients: [
      { item: "Fresh Tulsi Leaves", qty: "15 leaves, bruised" },
      { item: "Black Pepper Powder (Jaluk)", qty: "1/4 tsp" },
      { item: "Ginger Slices (Aada)", qty: "4-5 thin slices" },
      { item: "Boiling Water", qty: "4 cups" },
    ],
    prepTimeMinutes: 5,
    steps: [
      "Place boiling water in a wide ceramic or stainless steel bowl.",
      "Drop in bruised tulsi leaves, ginger slices, and black pepper.",
      "Cover head with a towel and breathe in the rich aromatic steam through both nose and mouth.",
      "Take deep slow breaths for 6-8 minutes, then cough gently into a tissue to bring up loosened mucus."
    ],
    dosage: {
      child: "Ages 7+: Under adult supervision only.",
      adult: "Steam for 6-8 minutes twice daily.",
      elderly: "Steam for 5-6 minutes twice daily while seated upright."
    },
    dos: ["Breathe in through the mouth periodically to deliver vapor directly to bronchial tubes", "Spit out any loosened phlegm"],
    donts: ["Do not lean too close to boiling water (maintain 12 inch gap)", "Never carry boiling bowl while walking"],
    redFlags: [
      "Blue discoloration of lips, tongue, or fingertips (hypoxia emergency)",
      "Inability to speak 3 words without stopping to catch breath",
      "High fever with confusion and rapid shallow breathing"
    ],
    culturalContext: "Tulsi vapors contain eugenol and camphene which act directly on the cilia of respiratory epithelium to propel stagnant mucus upward.",
    primarySpice: "Tulsi (Holy Basil)",
    difficulty: "Easy",
    suitableTime: "Morning and evening"
  },

  // 20. Seasonal Allergies / Sneezing
  {
    id: "haldi-jaluk-golden-honey-paste",
    symptom: "Seasonal Allergies / Sneezing",
    symptomSlug: "seasonal-allergies",
    name: "Turmeric-Pepper Protective Golden Paste (Haldi-Jaluk-Mou Leha)",
    name_assamese: "হালধি, জালুক আৰু মৌৰ লেহ",
    ingredients: [
      { item: "Pure Turmeric Powder (Haldi)", qty: "1/2 tsp" },
      { item: "Black Pepper Powder (Jaluk)", qty: "1 tiny pinch" },
      { item: "Pure Honey (Mou)", qty: "1 tsp" },
    ],
    prepTimeMinutes: 2,
    steps: [
      "In a small spoon, blend pure organic turmeric powder with a tiny pinch of black pepper.",
      "Mix thoroughly into 1 tsp pure raw honey until a bright golden paste forms.",
      "Lick slowly first thing in the morning on an empty stomach."
    ],
    dosage: {
      child: "Ages 3+: 1/3 tsp of the golden paste. (STRICT WARNING: Never give honey under 1 year).",
      adult: "1 tsp every morning during seasonal pollen/weather transitions.",
      elderly: "1 tsp every morning. Natural mast cell stabilizer without antihistamine drowsiness."
    },
    dos: ["Take first thing in the morning", "Always include a pinch of black pepper for piperine absorption"],
    donts: ["Never administer honey to infants under 12 months", "Do not take cold drinks immediately after licking"],
    redFlags: [
      "Swelling of lips, tongue, or difficulty breathing (anaphylaxis emergency - call emergency services)",
      "High fever with sneezing and stiff neck",
      "Wheezing and tight whistling in the chest during seasonal flare-ups"
    ],
    culturalContext: "Curcumin has demonstrated mast-cell stabilizing action in traditional medicine, suppressing histamine release during seasonal pollen shifts.",
    primarySpice: "Turmeric (Haldi)",
    difficulty: "Easy",
    suitableTime: "First thing in the morning"
  },
  {
    id: "tulsi-mint-anti-allergy-tea",
    symptom: "Seasonal Allergies / Sneezing",
    symptomSlug: "seasonal-allergies",
    name: "Tulsi & Fresh Mint Anti-Allergy Tea (Tulsi-Podina Chah)",
    name_assamese: "তুলসী আৰু পদিনাৰ এলাৰ্জি প্ৰতিৰোধক চাহ",
    ingredients: [
      { item: "Fresh Tulsi Leaves", qty: "8 leaves" },
      { item: "Fresh Mint Leaves (Podina)", qty: "6 leaves" },
      { item: "Ginger (Aada)", qty: "1/2 inch, crushed" },
      { item: "Water", qty: "1.5 cups" },
    ],
    prepTimeMinutes: 6,
    steps: [
      "Crush tulsi, mint, and ginger lightly.",
      "Boil with 1.5 cups water for 4 minutes.",
      "Strain and sip warm.",
      "Inhale the menthol and eugenol vapors rising from the cup before sipping."
    ],
    dosage: {
      child: "Ages 4+: 1/3 cup warm tea.",
      adult: "1 cup twice daily during pollen season.",
      elderly: "1 cup twice daily. Calms nasal tickle and repetitive sneezing fits."
    },
    dos: ["Sip while comfortably warm", "Rinse face and eyes with fresh cool water after coming indoors from windy pollen air"],
    donts: ["Do not boil mint excessively (keep delicate volatile rosmarinic acid intact)", "Do not drink chilled"],
    redFlags: [
      "Allergic reaction causing hives all over body and throat tightness",
      "Severe eye pain with yellow pus discharge",
      "Uncontrollable sneezing bursts causing dizziness or fainting"
    ],
    culturalContext: "Rosmarinic acid in mint and eugenol in tulsi work synergistically to soothe irritated nasal mucosa and blunt IgE-mediated allergic sneezing.",
    primarySpice: "Tulsi (Holy Basil)",
    difficulty: "Easy",
    suitableTime: "Morning or mid-afternoon"
  }
];
