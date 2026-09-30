import { ASSAMESE_MEDICINAL_PLANTS, MedicinalPlant } from "@/lib/plantLibrary";
import { REMEDIES } from "@/lib/data/remedies";
import { extractString } from "@/lib/utils";

/**
 * NIRAMAY AI 2.0 — LOCAL KNOWLEDGE LAYER
 *
 * Structured knowledge built ONLY from existing datasets and existing routes.
 * Never invents destinations, remedies, or medical facts.
 */

// ---------------------------------------------------------------------------
// A. NAVIGATION KNOWLEDGE (smart redirect / navigation engine)
// ---------------------------------------------------------------------------

export type AIActionType =
  | "OPEN_REMEDY"
  | "OPEN_SYMPTOM"
  | "OPEN_PLANT"
  | "OPEN_TOOL"
  | "OPEN_PAGE"
  | "OPEN_CATEGORY"
  | "OPEN_LIBRARY";

export interface AIAction {
  type: AIActionType;
  /** Stable dataset id (remedy id, symptom slug, plant id, tool id) */
  id: string;
  href: string;
  labelEn: string;
  labelAs: string;
}

export interface NavIntent {
  id: string;
  type: AIActionType;
  titleEn: string;
  titleAs: string;
  descEn: string;
  descAs: string;
  href: string;
  /** en / as / roman-assamese trigger phrases (lowercase) */
  keywords: string[];
}

/** Tools & pages with REAL existing routes — mirrors header drawer + route map. */
export const NAV_INTENTS: NavIntent[] = [
  {
    id: "spice-scanner",
    type: "OPEN_TOOL",
    titleEn: "AI Spice Box Scanner",
    titleAs: "মছলা বাকচ স্কেনাৰ",
    descEn: "Scan your spice box and get matched remedies",
    descAs: "মছলাৰ বাকচ স্কেন কৰি উপচাৰ মিলাওক",
    href: "/spice-scanner",
    keywords: [
      "spice scanner", "spice box scanner", "spice scan", "scan my spices", "scan spice",
      "masola scanner", "masala scanner", "mosola scanner", "masola scan", "spice box",
      "মছলা স্কেনাৰ", "মছলাৰ বাকচ", "মছলা স্কেন",
    ],
  },
  {
    id: "plant-scanner",
    type: "OPEN_TOOL",
    titleEn: "Plant & Leaf Scanner",
    titleAs: "বনৌষধি স্কেনাৰ",
    descEn: "Identify medicinal plants by their leaf",
    descAs: "পাতেৰে ঔষধি গছ চিনাক্ত কৰক",
    href: "/plant-scanner",
    keywords: [
      "plant scanner", "plant scan", "leaf scanner", "scan a leaf", "scan plant", "scan this plant",
      "identify plant", "identify leaf", "pat scanner", "gosh scanner", "plant identifier",
      "বনৌষধি স্কেনাৰ", "গছ চিনাকত", "পাত স্কেন", "গছ স্কেন",
    ],
  },
  {
    id: "dosha-assessment",
    type: "OPEN_TOOL",
    titleEn: "Dosha / Prakriti Assessment",
    titleAs: "দোষ / প্ৰকৃতি মূল্যায়ন",
    descEn: "Discover your Ayurvedic constitution",
    descAs: "আপোনাৰ আয়ুৰ্বেদিক গঠন জানক",
    href: "/dosha-assessment",
    keywords: [
      "dosha", "dosha test", "prakriti", "prakruti", "constitution test", "ayurveda quiz",
      "dosha quiz", "my dosha", "body type", "dosha assessment",
      "দোষ", "প্ৰকৃতি", "দোষ পৰীক্ষা", "দোষ মূল্যায়ন",
    ],
  },
  {
    id: "fridge-card",
    type: "OPEN_TOOL",
    titleEn: "Emergency Fridge Card",
    titleAs: "ফ্ৰিজ কাৰ্ড (PDF)",
    descEn: "Printable family emergency card",
    descAs: "প্ৰিণ্টযোগ্য পৰিয়ালৰ আপতকালীন কাৰ্ড",
    href: "/fridge-card",
    keywords: [
      "fridge card", "emergency card", "emergency fridge", "print emergency card",
      "family emergency card", "fridge kart", "emergency print",
      "ফ্ৰিজ কাৰ্ড", "আপতকালীন কাৰ্ড", "ফ্ৰিজ কাৰ্ড প্ৰিণ্ট",
    ],
  },
  {
    id: "daily-habits",
    type: "OPEN_TOOL",
    titleEn: "Daily Habits Tracker",
    titleAs: "দিনচৰ্যা অভ্যাস",
    descEn: "Track dinacharya wellness habits",
    descAs: "দিনচৰ্যা অভ্যাস ট্ৰেক কৰক",
    href: "/daily-habits",
    keywords: [
      "daily habits", "daily habit", "habit tracker", "habits", "dinacharya", "dinicharya",
      "daily routine", "show daily habits", "open daily habits", "dinchoriya",
      "দিনচৰ্যা", "দৈনিক অভ্যাস", "অভ্যাস",
    ],
  },
  {
    id: "aitas-diha",
    type: "OPEN_TOOL",
    titleEn: "Aita's Diha (Family Journal)",
    titleAs: "আইতাৰ দিহা (দিনলিপি)",
    descEn: "Preserve family remedy stories",
    descAs: "পৰিয়ালৰ উপচাৰৰ কাহিনী সাঁচি থওক",
    href: "/aitas-diha",
    keywords: [
      "aita", "aitas diha", "aitar diha", "aita's diha", "family journal", "grandmother journal",
      "remedy stories", "aita diary", "diha",
      "আইতাৰ দিহা", "আইতা", "দিহা", "পাৰিবাৰিক দিনলিপি",
    ],
  },
  {
    id: "symptoms",
    type: "OPEN_PAGE",
    titleEn: "Symptom Directory",
    titleAs: "লক্ষণ সূচী",
    descEn: "Browse all symptom categories",
    descAs: "সকলো লক্ষণ বিভাগ চাওক",
    href: "/symptoms",
    keywords: [
      "symptom directory", "symptom list", "all symptoms", "symptom guide", "symptom index",
      "open symptom", "show symptoms", "symptoms page",
      "লক্ষণ সূচী", "সকলো লক্ষণ", "লক্ষণৰ তালিকা",
    ],
  },
  {
    id: "saved",
    type: "OPEN_TOOL",
    titleEn: "Saved Remedies",
    titleAs: "সংৰক্ষিত উপচাৰ",
    descEn: "Your personal remedy shelf",
    descAs: "আপোনাৰ ব্যক্তিগত উপচাৰ তালিকা",
    href: "/saved",
    keywords: [
      "saved remedies", "my saved", "my shelf", "saved", "bookmark", "favorites",
      "show saved", "open saved", "my remedies",
      "সংৰক্ষিত উপচাৰ", "মোৰ উপচাৰ", "সংৰক্ষণ কৰা",
    ],
  },
  {
    id: "knowledge-bank",
    type: "OPEN_LIBRARY",
    titleEn: "Traditional Knowledge Bank",
    titleAs: "পৰম্পৰাগত জ্ঞান ভঁৰাল",
    descEn: "Foundational Ayurvedic knowledge",
    descAs: "আয়ুৰ্বেদিক মৌলিক জ্ঞান",
    href: "/knowledge-bank",
    keywords: [
      "knowledge bank", "ayurveda basics", "learn ayurveda", "traditional knowledge",
      "knowledge page", "open knowledge",
      "জ্ঞান ভঁৰাল", "পৰম্পৰাগত জ্ঞান", "আয়ুৰ্বেদ শিকা",
    ],
  },
  {
    id: "library",
    type: "OPEN_LIBRARY",
    titleEn: "Living Reference Library",
    titleAs: "জ্ঞান ভঁৰাল আৰু উদ্ভিদকোষ",
    descEn: "Plants, garden & seasonal archives",
    descAs: "গছ-গছনি, বাৰী আৰু বতৰৰ সংৰচনা",
    href: "/library",
    keywords: [
      "library", "plant library", "reference library", "plant archive", "plants archive",
      "open library", "show library",
      "উদ্ভিদকোষ", "ভঁৰাল", "গছৰ ভঁৰাল", "লাইব্ৰেৰি",
    ],
  },
  {
    id: "kitchen-garden",
    type: "OPEN_PAGE",
    titleEn: "Kitchen Garden Guide",
    titleAs: "পাকঘৰৰ বাৰী",
    descEn: "Grow your remedy garden at home",
    descAs: "ঘৰতে ঔষধি বাৰী গঢ়ক",
    href: "/kitchen-garden",
    keywords: [
      "kitchen garden", "garden guide", "grow plants", "grow remedies", "garden",
      "open garden", "show garden", "how to grow", "bari",
      "পাকঘৰৰ বাৰী", "বাৰী", "ঔষধি বাৰী",
    ],
  },
  {
    id: "ritucharya",
    type: "OPEN_PAGE",
    titleEn: "Ritucharya (Seasonal Guide)",
    titleAs: "ঋতুচৰ্যা (বতৰৰ যত্ন)",
    descEn: "Seasonal Ayurvedic living guidance",
    descAs: "বতৰ অনুসৰি আয়ুৰ্বেদিক জীৱনযাপন",
    href: "/ritucharya",
    keywords: [
      "ritucharya", "rituchorya", "seasonal guide", "seasons", "seasonal living",
      "open ritucharya", "seasonal routine",
      "ঋতুচৰ্যা", "বতৰৰ যত্ন", "ঋতু অনুসৰি",
    ],
  },
  {
    id: "explore",
    type: "OPEN_CATEGORY",
    titleEn: "Explore All Remedies",
    titleAs: "সকলো উপচাৰ চাওক",
    descEn: "Browse the full remedy collection",
    descAs: "সম্পূৰ্ণ উপচাৰ সংকলন চাওক",
    href: "/explore",
    keywords: [
      "explore", "all remedies", "show all remedies", "browse remedies", "remedy list",
      "every remedy", "open explore", "show remedies", "remedy collection",
      "সকলো উপচাৰ", "উপচাৰ চাওক", "সন্ধান কৰক",
    ],
  },
  {
    id: "categories",
    type: "OPEN_CATEGORY",
    titleEn: "Remedy Categories",
    titleAs: "উপচাৰৰ বিভাগসমূহ",
    descEn: "Browse remedies by wellness category",
    descAs: "বিভাগ অনুসৰি উপচাৰ চাওক",
    href: "/categories",
    keywords: [
      "categories", "category", "browse categories", "open categories", "show categories",
      "বিভাগ", "সামগ্ৰী", "বিভাগসমূহ",
    ],
  },
  {
    id: "menu",
    type: "OPEN_PAGE",
    titleEn: "Main Menu",
    titleAs: "মুখ্য মেনু",
    descEn: "Open the full app menu",
    descAs: "সম্পূৰ্ণ এপৰ মেনু খোলক",
    href: "/menu",
    keywords: ["menu", "main menu", "open menu", "show menu", "মেনু", "মুখ্য মেনু"],
  },
];

// ---------------------------------------------------------------------------
// B. PLANT / INGREDIENT KNOWLEDGE (entities from the verified archive)
// ---------------------------------------------------------------------------

export interface PlantConcept {
  id: string;
  /** Canonical display */
  labelEn: string;
  labelAs: string;
  /** en / as / roman-assamese trigger terms (lowercase) */
  terms: string[];
  /** Terms used to search remedies whose ingredients mention this item */
  remedySearchTerms: string[];
}

/**
 * Curated ingredient/plant concepts grounded in the actual remedy database and
 * plant library. Terms cover English, Assamese script, and Roman Assamese
 * (including common spelling variants: ada/aada, kaha/kaah, bikh/bish...).
 */
export const PLANT_CONCEPTS: PlantConcept[] = [
  {
    id: "ginger",
    labelEn: "Ginger (Aada)",
    labelAs: "আদা",
    terms: ["ginger", "ada", "aada", "adha", "আদা", "কেঁচা আদা", "ginger used for", "ada ki"],
    remedySearchTerms: ["ginger", "aada", "আদা"],
  },
  {
    id: "turmeric",
    labelEn: "Turmeric (Halodhi)",
    labelAs: "হালধি",
    terms: ["turmeric", "haldi", "halodhi", "haloid", "হালধি", "haldir"],
    remedySearchTerms: ["turmeric", "haldi", "হালধি"],
  },
  {
    id: "tulsi",
    labelEn: "Holy Basil (Tulsi)",
    labelAs: "তুলসী",
    terms: ["tulsi", "tulashi", "tulsir", "তুলসী", "holy basil"],
    remedySearchTerms: ["tulsi", "তুলসী", "holy basil"],
  },
  {
    id: "black-pepper",
    labelEn: "Black Pepper (Jaluk)",
    labelAs: "জালুক",
    terms: ["black pepper", "jaluk", "jalook", "joluk", "মৰিচ", "morich", "জালুক", "pepper"],
    remedySearchTerms: ["black pepper", "জালুক", "মৰিচ", "jaluk"],
  },
  {
    id: "honey",
    labelEn: "Honey (Mou)",
    labelAs: "মৌ",
    terms: ["honey", "mou", "mou-jol", "মৌ", "mod", "মধু", "madhu"],
    remedySearchTerms: ["honey", "মৌ", "মধু"],
  },
  {
    id: "lemon",
    labelEn: "Kaji Nemu (Assam Lemon)",
    labelAs: "কাজী নেমু",
    terms: ["lemon", "nemu", "kaji nemu", "নেমু", "কাজী নেমু", "lime"],
    remedySearchTerms: ["lemon", "nemu", "নেমু"],
  },
  {
    id: "garlic",
    labelEn: "Garlic (Nohoru)",
    labelAs: "নহৰু",
    terms: ["garlic", "nohoru", "nahoru", "নহৰু", "lasoon", "লহচুন", "lasun"],
    remedySearchTerms: ["garlic", "নহৰু", "nohoru"],
  },
  {
    id: "ajwain",
    labelEn: "Ajwain (Carom Seeds)",
    labelAs: "জৱাইন",
    terms: ["ajwain", "jowain", "javain", "carom", "জৱাইন", "jowaini"],
    remedySearchTerms: ["ajwain", "জৱাইন", "carom"],
  },
  {
    id: "manimuni",
    labelEn: "Manimuni (Indian Pennywort)",
    labelAs: "মানিমুনি",
    terms: ["manimuni", "monimuni", "মানিমুনি", "pennywort", "centella"],
    remedySearchTerms: ["manimuni", "মানিমুনি", "centella"],
  },
  {
    id: "bhedailota",
    labelEn: "Bhedailota (Skunk Vine)",
    labelAs: "ভেদাইলতা",
    terms: ["bhedailota", "bhedai lota", "ভেদাইলতা", "skunk vine", "paederia"],
    remedySearchTerms: ["bhedailota", "ভেদাইলতা", "paederia"],
  },
  {
    id: "tengesi",
    labelEn: "Tengesi Tenga (Sour Herb)",
    labelAs: "টেঙেচী টেঙা",
    terms: ["tengesi", "tengesi tenga", "টেঙেচী", "oxalis", "tenga"],
    remedySearchTerms: ["tengesi", "টেঙেচী", "oxalis"],
  },
  {
    id: "pasotia",
    labelEn: "Pasotiya (Five-Leaved Chaste Tree)",
    labelAs: "পচতীয়া",
    terms: ["pasotia", "posotia", "পচতীয়া", "vitex", "nishinda"],
    remedySearchTerms: ["pasotia", "পচতীয়া", "vitex"],
  },
  {
    id: "matikanduri",
    labelEn: "Matikanduri (Sessile Joyweed)",
    labelAs: "মাটিকান্দুৰী",
    terms: ["matikanduri", "mati kanduri", "মাটিকান্দুৰী", "alternanthera"],
    remedySearchTerms: ["matikanduri", "মাটিকান্দুৰী", "alternanthera"],
  },
  {
    id: "clove",
    labelEn: "Clove (Long)",
    labelAs: "লঙ",
    terms: ["clove", "long", "loong", "লঙ", "lavanga"],
    remedySearchTerms: ["clove", "লঙ"],
  },
  {
    id: "cinnamon",
    labelEn: "Cinnamon (Dalochini)",
    labelAs: "দালচেনি",
    terms: ["cinnamon", "dalochini", "dalchini", "দালচেনি", "daruchini"],
    remedySearchTerms: ["cinnamon", "দালচেনি", "dalchini"],
  },
];

/** Find the plant-library record for a concept (name-based, data-driven). */
export function findPlantForConcept(concept: PlantConcept): MedicinalPlant | null {
  const needles = [
    concept.labelAs,
    concept.labelEn.split(" (")[0].toLowerCase(),
    ...concept.terms.filter((t) => t.length > 3),
  ];
  for (const p of ASSAMESE_MEDICINAL_PLANTS) {
    const hay = `${p.nameEn} ${p.nameAs} ${p.botanicalName}`.toLowerCase();
    if (needles.some((n) => hay.includes(n.toLowerCase()))) return p;
  }
  return null;
}

/** Remedies whose ingredients mention the concept (searches the real data). */
export function remediesForConcept(concept: PlantConcept, limit = 3) {
  const terms = concept.remedySearchTerms.map((t) => t.toLowerCase());
  const hits = REMEDIES.filter((r) => {
    const hay = r.ingredients
      .map((i) => {
        const en = extractString(i.item);
        const as = i.item_assamese || (typeof i.item === "object" ? i.item.as : "");
        return `${en} ${as}`;
      })
      .join(" ")
      .toLowerCase();
    return terms.some((t) => hay.includes(t));
  });
  return hits.slice(0, limit);
}
