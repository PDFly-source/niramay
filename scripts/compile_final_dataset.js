const fs = require('fs');
const path = require('path');
const { z } = require('zod');

// Schemas
const DosageSchema = z.object({
  child: z.string(),
  adult: z.string(),
  elderly: z.string(),
});

const IngredientSchema = z.object({
  item: z.string(),
  qty: z.string(),
});

const RemedySchema = z.object({
  id: z.string(),
  symptom: z.string(),
  symptomSlug: z.string().optional(),
  name: z.string(),
  name_assamese: z.string(),
  ingredients: z.array(IngredientSchema),
  prepTimeMinutes: z.number(),
  steps: z.array(z.string()),
  dosage: DosageSchema,
  dos: z.array(z.string()),
  donts: z.array(z.string()),
  redFlags: z.array(z.string()),
  culturalContext: z.string().optional(),
  primarySpice: z.string().optional(),
  difficulty: z.enum(["Easy", "Moderate"]).optional(),
  suitableTime: z.string().optional(),
});

const SymptomCategorySchema = z.object({
  slug: z.string(),
  title: z.string(),
  assameseTitle: z.string(),
  description: z.string(),
  iconName: z.string(),
  commonSpices: z.array(z.string()),
  redFlagsSummary: z.string(),
  categoryId: z.string().optional(),
});

const { SYMPTOM_GROUPS } = require('./data/symptom_groups');
const digestive = require('./data/remedies_digestive');
const respiratory = require('./data/remedies_respiratory');
const pain = require('./data/remedies_pain');
const skin = require('./data/remedies_skin');
const lifestyle = require('./data/remedies_lifestyle');

// Icon mapping per category / symptom
const symptomMeta = {
  // Digestive
  "acidity": {
    iconName: "Flame",
    commonSpices: ["Ginger (Aada)", "Ajwain (Carom seeds)", "Fennel (Mouri)", "Cumin (Jeera)", "Lemon (Kaji Nemu)", "Clove (Long)", "Mint (Podina)"],
    description: "Soothing kitchen infusions to balance stomach bile and alleviate heartburn naturally.",
    redFlagsSummary: "Severe chest pain radiating to left arm/jaw, vomiting coffee-ground blood, or black tarry stools."
  },
  "indigestion": {
    iconName: "Wind",
    commonSpices: ["Asafoetida (Hing)", "Cumin (Jeera)", "Black Salt (Kola Nimokh)", "Ginger (Aada)", "Curd / Yogurt"],
    description: "Time-tested carminative seeds and digestive buttermilk to stimulate sluggish gastric agni.",
    redFlagsSummary: "Rigid, board-like abdomen, inability to pass gas or stool, or sudden unbearable colicky pain."
  },
  "bloating-gas": {
    iconName: "Wind",
    commonSpices: ["Ajwain (Carom seeds)", "Black Salt", "Mint (Podina)", "Lemon (Kaji Nemu)", "Asafoetida (Hing)"],
    description: "Antispasmodic seed chews and herbal infusions to rapidly expel trapped gastrointestinal flatulence.",
    redFlagsSummary: "Board-like abdominal rigidity, sudden severe distention with high fever, or complete bowel stoppage."
  },
  "constipation": {
    iconName: "RefreshCw",
    commonSpices: ["Black Raisin (Kismis)", "Pure Desi Ghee", "Milk", "Flaxseed (Tisi)", "Lemon (Kaji Nemu)"],
    description: "Natural bulk and osmotic lubricators to gently restore smooth bowel peristalsis without dependency.",
    redFlagsSummary: "Severe abdominal distention with no bowel movements for over 5 days, or rectal bleeding."
  },
  "mild-diarrhea": {
    iconName: "Activity",
    commonSpices: ["Cumin (Jeera)", "Nutmeg (Jaiphal)", "Rock Salt", "Curd / Yogurt", "Pomegranate Peel"],
    description: "Electrolyte-replenishing binding fluids and gentle gut-soothing astringent broths.",
    redFlagsSummary: "High fever with bloody/mucus stools (dysentery), severe dehydration, or confusion."
  },
  "loss-of-appetite": {
    iconName: "Sparkles",
    commonSpices: ["Ginger (Aada)", "Rock Salt (Saindhava)", "Lemon (Kaji Nemu)", "Cumin (Jeera)"],
    description: "Traditional Agni-awakening pre-meal appetizers to stimulate saliva and digestive juices naturally.",
    redFlagsSummary: "Unexplained significant weight loss, chronic low-grade fever, or persistent jaundice signs."
  },
  "nausea": {
    iconName: "Compass",
    commonSpices: ["Lemon (Kaji Nemu)", "Black Salt", "Cardamom (Elaichi)", "Clove (Long)", "Ginger (Aada)"],
    description: "Aromatic citrus rubs and soothing spice chews to reset vestibular nausea and calm gag reflexes.",
    redFlagsSummary: "Nausea following head trauma, accompanied by chest pressure, or inability to retain fluids."
  },
  "mild-vomiting": {
    iconName: "Compass",
    commonSpices: ["Mint (Podina)", "Honey (Mou)", "Coriander seeds (Dhania)", "Cumin (Jeera)", "Rock Sugar"],
    description: "Gentle spoonful sips and cooling infusions to quiet gastric contractions safely.",
    redFlagsSummary: "Vomiting blood or coffee-ground material, stiff neck with fever, or severe dehydration."
  },
  "stomach-cramps": {
    iconName: "Activity",
    commonSpices: ["Ajwain (Carom seeds)", "Jaggery (Gur)", "Ginger (Aada)", "Fennel (Mouri)"],
    description: "Warm antispasmodic decoctions to relax visceral intestinal smooth muscle tension.",
    redFlagsSummary: "Severe sharp pain in the lower right abdomen, board-like abdomen, or high fever with chills."
  },
  "nocturnal-acid-reflux": {
    iconName: "Moon",
    commonSpices: ["Licorice (Mulethi)", "Milk", "Fennel (Mouri)", "Basil Seeds (Sabja)", "Mishri"],
    description: "Mucilaginous bedtime protectors and cooling alkaline drinks to prevent sleep-disrupting acid wash.",
    redFlagsSummary: "Waking up choking on acid, pain radiating to left arm/jaw, or chronic difficulty swallowing."
  },

  // Respiratory
  "common-cold": {
    iconName: "ThermometerSnowflake",
    commonSpices: ["Tulsi (Holy Basil)", "Ginger (Aada)", "Black pepper (Jaluk)", "Honey (Mou)", "Cinnamon (Dalchini)"],
    description: "Traditional Assamese warming kadha and throat linctuses to clear chills and head colds.",
    redFlagsSummary: "Stridor, breathing difficulty, coughing blood, or fever above 102°F lasting > 3 days."
  },
  "cough-dry": {
    iconName: "Flame",
    commonSpices: ["Clove (Long)", "Honey (Mou)", "Licorice (Mulethi)", "Pure Desi Ghee", "Black pepper (Jaluk)"],
    description: "Demulcent lozenges, roasted spice balms, and mucosal coaters to halt parched hacking coughing fits.",
    redFlagsSummary: "Barking croup cough with chest retractions, coughing blood, or cough lasting > 3 weeks."
  },
  "cough-wet": {
    iconName: "Activity",
    commonSpices: ["Black pepper (Jaluk)", "Ginger (Aada)", "Tulsi (Holy Basil)", "Cinnamon (Dalchini)", "Rock Salt"],
    description: "Warming mucolytics and expectorants that liquefy thick phlegm for easy natural expulsion.",
    redFlagsSummary: "Rust-colored or blood-streaked sputum, high fever > 103°F with shaking chills, or wheezing."
  },
  "sore-throat": {
    iconName: "Sparkles",
    commonSpices: ["Salt (Nimokh)", "Turmeric (Haldi)", "Licorice (Mulethi)", "Clove (Long)", "Ginger (Aada)"],
    description: "Saline-curcuminoid gargles and soothing coating teas to relieve raw, inflamed pharyngeal tissues.",
    redFlagsSummary: "Inability to swallow own saliva (drooling), muffled voice, or asymmetric throat swelling."
  },
  "nasal-congestion": {
    iconName: "Wind",
    commonSpices: ["Ajwain (Carom seeds)", "Tulsi (Holy Basil)", "Mustard Oil (Mitha Tel)", "Garlic (Nohoru)"],
    description: "Aromatic potli inhalations and traditional chest rubs to open blocked nasal passages naturally.",
    redFlagsSummary: "Severe difficulty breathing, nostril flaring in infants, or clear fluid continuous leak after injury."
  },
  "sinus-pressure": {
    iconName: "Activity",
    commonSpices: ["Turmeric (Haldi)", "Mint (Podina)", "Black pepper (Jaluk)", "Garlic (Nohoru)", "Ginger (Aada)"],
    description: "Herbal steam vapors and clear pepper broths to drain maxillary and frontal sinus cavities.",
    redFlagsSummary: "Periorbital eye swelling/redness, vision changes, or severe forehead pain with high fever."
  },
  "mild-fever": {
    iconName: "Thermometer",
    commonSpices: ["Tulsi (Holy Basil)", "Coriander seeds (Dhania)", "Raisins (Kismis)", "Ginger (Aada)", "Mishri"],
    description: "Cooling diaphoretic teas and nourishing hydration broths to support natural immune febrifuge action.",
    redFlagsSummary: "Fever in infants under 3 months, fever > 103°F, petechial purple rash, or stiff neck."
  },
  "body-ache": {
    iconName: "Bone",
    commonSpices: ["Mustard Oil (Mitha Tel)", "Garlic (Nohoru)", "Turmeric (Haldi)", "Ginger (Aada)", "Camphor"],
    description: "Warm herbal oil rubs and anti-inflammatory golden decoctions to melt away flu-related muscle soreness.",
    redFlagsSummary: "Severe calf pain/redness on one side, extreme muscle breakdown (dark urine), or high fever."
  },
  "chest-congestion": {
    iconName: "Wind",
    commonSpices: ["Mustard Oil (Mitha Tel)", "Garlic (Nohoru)", "Tulsi (Holy Basil)", "Black pepper (Jaluk)"],
    description: "Warming transdermal chest compresses and bronchial steam to loosen stubborn catarrh.",
    redFlagsSummary: "Blue lips/fingertips (hypoxia), gasping for breath, or coughing up frank blood."
  },
  "seasonal-allergies": {
    iconName: "Sun",
    commonSpices: ["Turmeric (Haldi)", "Black pepper (Jaluk)", "Honey (Mou)", "Tulsi (Holy Basil)", "Mint (Podina)"],
    description: "Natural mast-cell stabilizing honey pastes and antihistaminic herbal teas for pollen and dust sensitivity.",
    redFlagsSummary: "Swelling of lips/tongue, difficulty breathing, or severe wheezing (anaphylaxis warning)."
  },

  // Pain & Ache
  "headache-tension": {
    iconName: "Brain",
    commonSpices: ["Ginger (Aada)", "Clove (Long)", "Tea Leaves", "Cardamom (Elaichi)", "Sandalwood"],
    description: "Ginger infusions and cooling forehead compresses to soothe tight cranial and neck muscles.",
    redFlagsSummary: "Sudden explosive 'thunderclap' headache, slurred speech/weakness, or stiff neck with fever."
  },
  "mild-migraine": {
    iconName: "Brain",
    commonSpices: ["Coriander seeds (Dhania)", "Cardamom (Elaichi)", "Ginger (Aada)", "Mint (Podina)", "Mishri"],
    description: "Cooling Pitta brews and cold herbal compresses to quiet pulsating vascular headache waves.",
    redFlagsSummary: "Worst headache of life, sudden vision loss, or headache lasting continuously > 72 hours."
  },
  "joint-pain": {
    iconName: "Bone",
    commonSpices: ["Mustard Oil (Mitha Tel)", "Garlic (Nohoru)", "Fenugreek (Methi)", "Turmeric (Haldi)"],
    description: "Warm garlic-infused oil rubs and soaked fenugreek waters to ease stiffness and nourish joints.",
    redFlagsSummary: "Joint fiery red, hot to touch with high fever (septic arthritis), or inability to bear weight after fall."
  },
  "muscle-cramps": {
    iconName: "Activity",
    commonSpices: ["Sesame Oil (Til Tel)", "Rock Salt (Saindhava)", "Cumin (Jeera)", "Jaggery (Gur)"],
    description: "Warm transdermal mineral rubs and restorative electrolyte waters to release painful muscular spasms.",
    redFlagsSummary: "Calf swollen, red, hot and painful (deep vein thrombosis), or dark cola-colored urine."
  },
  "back-pain": {
    iconName: "Bone",
    commonSpices: ["Mustard Oil (Mitha Tel)", "Garlic (Nohoru)", "Ajwain (Carom seeds)", "Ginger (Aada)", "Fenugreek"],
    description: "Penetrating warm oil massage and moist herbal poultices for strained paraspinal muscles.",
    redFlagsSummary: "Loss of bowel/bladder control, groin numbness, or shooting pain below knee with foot drop."
  },
  "toothache": {
    iconName: "Sparkles",
    commonSpices: ["Clove (Long)", "Rock Salt", "Turmeric (Haldi)", "Warm Water"],
    description: "Direct whole clove eugenol pressure and osmotic warm saline baths for temporary dental nerve comfort.",
    redFlagsSummary: "Spreading swelling of cheek/jaw/neck, difficulty swallowing or breathing (Ludwig's angina)."
  },
  "earache": {
    iconName: "Sparkles",
    commonSpices: ["Garlic (Nohoru)", "Mustard Oil (Mitha Tel)", "Rock Salt", "Sesame Oil"],
    description: "External warm garlic rubs and dry salt thermal compresses around the ear contour (strictly outside canal).",
    redFlagsSummary: "Fluid, pus, or blood draining from ear canal (eardrum rupture), or mastoid bone swelling behind ear."
  },
  "menstrual-cramps": {
    iconName: "HeartPulse",
    commonSpices: ["Ajwain (Carom seeds)", "Jaggery (Gur)", "Ginger (Aada)", "Cinnamon (Dalchini)"],
    description: "Warming antispasmodic decoctions to relax uterine contractions and encourage smooth circulation.",
    redFlagsSummary: "Bleeding soaking > 1 pad/hour for 2 hours, massive clots, or sudden agonizing pelvic pain with fever."
  },

  // Skin & External
  "minor-burns": {
    iconName: "Flame",
    commonSpices: ["Pure Honey (Mou)", "Aloe Vera (Sal-Kuwari)", "Turmeric (Haldi)", "Cool Water"],
    description: "Sterile raw honey dressings and fresh soothing aloe after mandatory 10-minute cool water flushing.",
    redFlagsSummary: "Burn larger than patient's palm, on face/hands/groin, charred white/black, or yellow pus infection."
  },
  "insect-bites": {
    iconName: "Sparkles",
    commonSpices: ["Tulsi (Holy Basil)", "Salt (Nimokh)", "Water", "Ice"],
    description: "Fresh crushed tulsi juice and osmotic salt pastes to neutralize stinging itch and localized swelling.",
    redFlagsSummary: "Difficulty breathing, lip/tongue swelling after sting (anaphylaxis), or bullseye expanding red rash."
  },
  "dry-skin": {
    iconName: "Sparkles",
    commonSpices: ["Pure Desi Ghee", "Coconut Oil (Narikol Tel)", "Raw Turmeric (Kesa Haldi)", "Rose Water"],
    description: "Deeply nourishing traditional lipid balms and botanical oils to restore cracked epidermal moisture.",
    redFlagsSummary: "Deep bleeding skin fissures with yellow crusts, generalized peeling with fever, or jaundice."
  },
  "minor-cuts": {
    iconName: "ShieldCheck",
    commonSpices: ["Turmeric (Haldi)", "Pure Honey (Mou)", "Clean Water"],
    description: "Clean antiseptic turmeric dusting and protective raw honey barriers for washed surface abrasions.",
    redFlagsSummary: "Pulsing spurting blood, gaping wound needing stitches, dirty rusty puncture, or spreading red streaks."
  },
  "acne-mild": {
    iconName: "Sun",
    commonSpices: ["Neem Leaves", "Turmeric (Haldi)", "Besan (Gram Flour)", "Rose Water"],
    description: "Purifying neem spot pastes and traditional besan ubtans to absorb excess oil and soothe blemishes.",
    redFlagsSummary: "Deep painful cystic nodules, pimples in facial danger triangle with high fever, or scarring."
  },
  "sunburn": {
    iconName: "Sun",
    commonSpices: ["Cucumber (Tiyoh)", "Mint (Podina)", "Aloe Vera (Sal-Kuwari)", "Coconut Oil"],
    description: "Chilled cucumber compresses and fresh botanical gels to dissipate trapped solar heat from delicate skin.",
    redFlagsSummary: "Extensive skin blistering, sun poisoning (high fever, chills, dizziness), or severe dehydration."
  },
  "chapped-lips": {
    iconName: "HeartPulse",
    commonSpices: ["Pure Desi Ghee", "Pure Honey (Mou)", "Milk Cream (Malai)"],
    description: "Pure edible lipid barriers and soothing honey creams to heal cracked winter lips naturally.",
    redFlagsSummary: "Bleeding cracks at corners of mouth not healing, severe lip blisters, or persistent white scaly patch."
  },
  "dandruff": {
    iconName: "Sparkles",
    commonSpices: ["Fenugreek (Methi)", "Sour Curd (Doi)", "Lemon (Kaji Nemu)", "Coconut Oil"],
    description: "Traditional probiotic fenugreek masks and citrus-infused coconut oil to eliminate scalp flakes.",
    redFlagsSummary: "Thick greasy yellow crusts with raw sores, circular bald patches (ringworm), or lymph node swelling."
  },

  // Sleep, Stress & Energy
  "insomnia": {
    iconName: "Moon",
    commonSpices: ["Nutmeg (Jaiphal)", "Cardamom (Elaichi)", "Milk", "Tulsi (Holy Basil)", "Chamomile"],
    description: "Warm calming spiced milks and adaptogenic evening draughts to ease racing thoughts and encourage deep sleep.",
    redFlagsSummary: "Severe chronic insomnia > 1 month, waking up gasping/choking (apnea), or severe depression."
  },
  "stress-anxiety": {
    iconName: "HeartPulse",
    commonSpices: ["Cardamom (Elaichi)", "Rose Petals", "Sesame Oil (Til Tel)", "Water"],
    description: "Uplifting floral cardamomic infusions and grounding warm sesame foot therapies to settle anxious flutter.",
    redFlagsSummary: "Severe chest tightness with impending doom (panic vs heart), thoughts of self-harm, or severe trembling."
  },
  "fatigue": {
    iconName: "Sparkles",
    commonSpices: ["Almonds (Badam)", "Raisins (Kismis)", "Fresh Amla (Indian Gooseberry)", "Cardamom (Elaichi)"],
    description: "Nutritious soaked almond-raisin tonics and fresh vitamin-C rich gooseberry shots to replenish vitality.",
    redFlagsSummary: "Extreme exhaustion with shortness of breath on mild steps (severe anemia), sudden weight loss, or high fevers."
  },
  "eye-strain": {
    iconName: "Compass",
    commonSpices: ["Rose Water", "Cucumber (Tiyoh)", "Clean Cotton"],
    description: "Chilled pure rose water pads and cucumber slices to refresh overheated, screen-fatigued eyes.",
    redFlagsSummary: "Sudden loss of vision, severe eye pain with rainbow halos (glaucoma), or thick yellow pus discharge."
  },

  // Women's Health
  "menstrual-bloating": {
    iconName: "HeartPulse",
    commonSpices: ["Fennel (Mouri)", "Coriander seeds (Dhania)", "Ginger (Aada)", "Ajwain (Carom seeds)"],
    description: "Gentle natural diuretic seed teas to release hormonal fluid retention and ease sluggish bowel transit.",
    redFlagsSummary: "Abrupt severe abdominal distention not resolving after period, shortness of breath, or one-sided leg swelling."
  },
  "morning-sickness": {
    iconName: "Compass",
    commonSpices: ["Ginger (Aada)", "Lemon (Kaji Nemu)", "Cumin (Jeera)", "Mishri (Rock Sugar)"],
    description: "Gentle ginger and roasted cumin sips strictly formulated for safe relief of early pregnancy queasiness.",
    redFlagsSummary: "Inability to keep any fluids down for 24 hours (Hyperemesis Gravidarum), dark urine, or fainting."
  },
  "postpartum-recovery": {
    iconName: "HeartPulse",
    commonSpices: ["Fenugreek (Methi)", "Pure Desi Ghee", "Garlic (Nohoru)", "Jaggery (Gur)", "Ginger (Aada)"],
    description: "Traditional warming Assamese postpartum foods to aid uterine involution, restore strength, and support lactation.",
    redFlagsSummary: "Postpartum hemorrhage soaking > 1 pad/hour, high fever with foul discharge (sepsis), or severe chest pain."
  },

  // Seasonal & Immunity
  "seasonal-flu-prevention": {
    iconName: "ShieldCheck",
    commonSpices: ["Tulsi (Holy Basil)", "Black pepper (Jaluk)", "Ginger (Aada)", "Cinnamon (Dalchini)", "Garlic"],
    description: "Potent heritage Assamese kadha and five-spice cleansing broths to fortify mucosal immunity against seasonal viruses.",
    redFlagsSummary: "Sudden high fever > 103°F with extreme prostration, respiratory difficulty, or cyanosis."
  },
  "low-immunity": {
    iconName: "ShieldCheck",
    commonSpices: ["Black Cumin (Kolajira)", "Pure Honey (Mou)", "Fresh Amla", "Ginger (Aada)", "Turmeric"],
    description: "Black cumin rejuvenation pastes and fresh wild Amla shots to enhance cellular defense and energy.",
    redFlagsSummary: "Chronic fevers with night sweats and rapid weight loss, recurrent pneumonia, or hard enlarged lymph nodes."
  },
  "mild-dehydration": {
    iconName: "Activity",
    commonSpices: ["Lemon (Kaji Nemu)", "Rock Salt (Saindhava)", "Mishri (Rock Sugar)", "Tender Coconut Water"],
    description: "Balanced oral sodium-glucose and potassium hydration waters for rapid cellular fluid replenishment.",
    redFlagsSummary: "Sunken eyes, lack of tears, absence of urination for > 8 hours, confusion, or loss of skin turgor."
  },
  "hangover": {
    iconName: "RefreshCw",
    commonSpices: ["Ginger (Aada)", "Lemon (Kaji Nemu)", "Pure Honey (Mou)", "Mint (Podina)", "Cumin (Jeera)"],
    description: "Electrolyte-fructose flushes and cooling digestive buttermilk to soothe hepatic stress and post-feast headache.",
    redFlagsSummary: "Persistent vomiting > 12 hours, vomiting blood, severe confusion, or slow irregular breathing (< 8/min)."
  },
  "motion-sickness": {
    iconName: "Compass",
    commonSpices: ["Ginger (Aada)", "Mishri (Rock Sugar)", "Lemon (Kaji Nemu)", "Black Pepper (Jaluk)"],
    description: "Traditional ginger chews and salted citrus wedges to quiet motion-induced vestibular disturbance during travel.",
    redFlagsSummary: "Symptoms persisting days after trip, severe true vertigo with hearing loss, or continuous vomiting."
  },
  "hiccups": {
    iconName: "Activity",
    commonSpices: ["Sugar / Mishri", "Cardamom (Elaichi)", "Warm Water"],
    description: "Neurophysiological vagal reflex resets and antispasmodic cardamom sips to halt diaphragmatic flutter.",
    redFlagsSummary: "Hiccups lasting continuously > 48 hours, accompanied by chest pain, slurred speech, or weakness."
  },
  "bad-breath": {
    iconName: "Sparkles",
    commonSpices: ["Fennel (Mouri)", "Clove (Long)", "Cardamom (Elaichi)", "Mint (Podina)", "Guava Leaves"],
    description: "Antimicrobial spice chews and astringent herbal rinses that eradicate oral odor bacteria and support gums.",
    redFlagsSummary: "Breath smelling of fruit/acetone (diabetic emergency), ammonia breath, or loose teeth with deep pus pockets."
  },

  // Children-Specific
  "child-mild-cold": {
    iconName: "HeartPulse",
    commonSpices: ["Mustard Oil (Mitha Tel)", "Garlic (Nohoru)", "Tulsi (Holy Basil)", "Mishri"],
    description: "Ultra-gentle pediatric sole warmers and mild tulsi waters with strict age-appropriate safeguards.",
    redFlagsSummary: "Chest indrawing, grunting, flaring nostrils, extreme lethargy, or any fever in an infant < 3 months."
  },
  "teething-discomfort": {
    iconName: "Sparkles",
    commonSpices: ["Cucumber (Tiyoh)", "Carrot", "Virgin Coconut Oil", "Cold Water"],
    description: "Safe natural chilled vegetable teethers and gentle clean-finger counter-pressure under continuous supervision.",
    redFlagsSummary: "High fever > 101°F (teething does NOT cause true high fever), severe diarrhea, or baby refusing all fluids > 12 hrs."
  }
};

// Build the 52 SYMPTOM_CATEGORIES
const SYMPTOM_CATEGORIES = [];
SYMPTOM_GROUPS.forEach(group => {
  group.symptoms.forEach(sym => {
    const meta = symptomMeta[sym.id] || {
      iconName: "Activity",
      commonSpices: ["Ginger", "Tulsi", "Turmeric"],
      description: "Traditional home remedy support.",
      redFlagsSummary: "Consult a doctor if symptoms persist or worsen."
    };

    const categoryObj = {
      slug: sym.id,
      title: sym.label,
      assameseTitle: sym.label_assamese || "",
      description: meta.description,
      iconName: meta.iconName,
      commonSpices: meta.commonSpices,
      redFlagsSummary: meta.redFlagsSummary,
      categoryId: group.id
    };

    // Validate with Zod
    SymptomCategorySchema.parse(categoryObj);
    SYMPTOM_CATEGORIES.push(categoryObj);
  });
});

console.log("Successfully validated", SYMPTOM_CATEGORIES.length, "symptoms.");

// Combine and validate all remedies
const allRemedies = [
  ...digestive,
  ...respiratory,
  ...pain,
  ...skin,
  ...lifestyle
];

// Validate each remedy with Zod
const validatedRemedies = [];
const seenIds = new Set();

allRemedies.forEach((r, idx) => {
  if (seenIds.has(r.id)) {
    throw new Error(`Duplicate remedy id found: ${r.id}`);
  }
  seenIds.add(r.id);
  
  // Parse with Zod
  const parsed = RemedySchema.parse(r);
  validatedRemedies.push(parsed);
});

console.log("Successfully validated", validatedRemedies.length, "remedies.");

// Check coverage: every symptom has at least 2 remedies
const symptomRemedyCounts = {};
SYMPTOM_CATEGORIES.forEach(s => {
  symptomRemedyCounts[s.slug] = 0;
});
validatedRemedies.forEach(r => {
  if (symptomRemedyCounts[r.symptomSlug] !== undefined) {
    symptomRemedyCounts[r.symptomSlug]++;
  } else {
    console.warn("Remedy has unknown symptomSlug:", r.id, r.symptomSlug);
  }
});

const undercovered = Object.entries(symptomRemedyCounts).filter(([slug, count]) => count < 2);
if (undercovered.length > 0) {
  console.error("Undercovered symptoms:", undercovered);
  process.exit(1);
} else {
  console.log("ALL 52 symptoms have at least 2 validated remedies! Perfect!");
}

// 1. Generate lib/data/symptoms.ts
const symptomsFileContent = `import { SymptomCategory as SymptomCategoryType, SymptomCategorySchema, SymptomCategoryGroup } from "@/lib/schema";

export interface SymptomCategory {
  id: string;
  label: string;
  description?: string;
  symptoms: { id: string; label: string; label_assamese?: string }[];
}

export const symptomCategories: SymptomCategory[] = ${JSON.stringify(SYMPTOM_GROUPS, null, 2)};

export const SYMPTOM_CATEGORIES: SymptomCategoryType[] = ${JSON.stringify(SYMPTOM_CATEGORIES, null, 2)};

// Backward compatibility alias map for Part 1 legacy route links
export const LEGACY_SLUG_MAP: Record<string, string> = {
  "cough-cold": "common-cold",
  "indigestion-gas": "bloating-gas",
  "headache": "headache-tension",
  "blocked-nose-sinus": "nasal-congestion",
  "nausea-motion-sickness": "nausea",
  "joint-muscle-pain": "joint-pain",
  "insomnia-sleep": "insomnia",
  "skin-minor": "acne-mild",
  "weak-immunity": "low-immunity",
};

export function resolveSymptomSlug(slug: string): string {
  return LEGACY_SLUG_MAP[slug] || slug;
}
`;

fs.writeFileSync(path.join(__dirname, '../lib/data/symptoms.ts'), symptomsFileContent, 'utf8');
console.log("Wrote /lib/data/symptoms.ts");

// 2. Generate lib/data/remedies.ts
const remediesFileContent = `import { Remedy, RemedySchema } from "@/lib/schema";

export const REMEDIES: Remedy[] = ${JSON.stringify(validatedRemedies, null, 2)};

// Fast indexed lookups
export const REMEDIES_BY_ID = new Map<string, Remedy>(
  REMEDIES.map((r) => [r.id, r])
);

export function getRemediesForSymptom(symptomSlug: string): Remedy[] {
  return REMEDIES.filter(
    (r) => r.symptomSlug === symptomSlug
  );
}

// Safe runtime validation assertion
if (process.env.NODE_ENV !== "production") {
  try {
    REMEDIES.forEach((remedy) => RemedySchema.parse(remedy));
  } catch (err) {
    console.error("Zod Remedy Validation Error:", err);
  }
}
`;

fs.writeFileSync(path.join(__dirname, '../lib/data/remedies.ts'), remediesFileContent, 'utf8');
console.log("Wrote /lib/data/remedies.ts");
console.log("All done!");
