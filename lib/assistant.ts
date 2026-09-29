import { searchRemedies } from "@/lib/search";
import { REMEDIES } from "@/lib/data/remedies";
import { Remedy } from "@/lib/schema";
import { extractString } from "@/lib/utils";

export interface AssistantAnalysisResult {
  understoodSymptoms: { en: string; as: string }[];
  durationDetected?: { days: number; textEn: string; textAs: string };
  isRedFlagSeverity: boolean;
  redFlagReason?: { en: string; as: string };
  suggestedRemedies: Remedy[];
  isLowConfidence?: boolean;
  conversationalReply: {
    en: string;
    as: string;
  };
}

export interface CanonicalSymptomCategory {
  id: string;
  canonicalEn: string;
  canonicalAs: string;
  symptomSlug: string;
  keywords: string[];
}

// Comprehensive bilingual keyword dictionary covering all major symptoms in
// Assamese script, Romanized Assamese phonetic phrases, and English.
export const CANONICAL_SYMPTOMS: CanonicalSymptomCategory[] = [
  {
    id: "stomach_pain",
    canonicalEn: "Stomach Pain & Abdominal Colic",
    canonicalAs: "পেটৰ বিষ আৰু কামোৰণি",
    symptomSlug: "stomach-cramps",
    keywords: [
      // Romanized Assamese
      "pet", "pet tu", "petor", "pet bikh", "pet tu bikh", "petor bikh", "bikh hoi ase",
      "pet kamoroni", "pet kamurise", "pet jola", "pet phula", "pet gurgur", "pet kharap",
      "amashoy", "petor oshukh", "bhedailota", "loose motion", "diarrhea",
      // Assamese script
      "পেট", "পেটৰ", "পেটটো", "পেটৰ বিষ", "পেট বিষ", "পেট কামোৰণি", "পেট কামুৰিছে",
      "পেট ফুলা", "পেটৰ অসুখ", "আমাশয়", "বদহজম", "ভেদাইলতা", "শৌচ",
      // English
      "stomach", "stomach pain", "stomach ache", "belly ache", "tummy ache",
      "abdominal pain", "cramps", "gut pain", "belly pain", "colic"
    ],
  },
  {
    id: "fever",
    canonicalEn: "Fever, Body Heat & Chills",
    canonicalAs: "জ্বৰ, গাৰ উত্তাপ আৰু কঁপনি",
    symptomSlug: "mild-fever",
    keywords: [
      // Romanized Assamese
      "jor", "jwor", "jor hoi ase", "ga topa", "ga gorom", "koponi", "thanda laga",
      "ga bikh", "durbolota", "ga dhorise", "temperature ase",
      // Assamese script
      "জ্বৰ", "গা গৰম", "গাৰ উত্তাপ", "গা তপা", "কঁপনি", "গাৰ বিষ", "জ্বৰ উঠিছে", "জ্বৰ হৈছে",
      // English
      "fever", "feverish", "high temperature", "temperature", "chills", "mild fever",
      "hot body", "pyrexia", "shivering"
    ],
  },
  {
    id: "acidity",
    canonicalEn: "Acidity, Heartburn & Gastric Bloating",
    canonicalAs: "অমলপিত্ত, এচিডিটি আৰু বুকুপোৰা",
    symptomSlug: "acidity",
    keywords: [
      // Romanized Assamese
      "acidity", "acid", "gas", "gas hoi ase", "bukupora", "buku jola", "buku jolise",
      "ugar", "dhau ugar", "pet ufondi", "gastric", "heartburn",
      // Assamese script
      "এচিড", "এচিডিটি", "গেছ", "বুকুপোৰা", "বুকুৰ জ্বলা", "অমলপিত্ত", "উফন্দি", "উগাৰ",
      "টেঙা উগাৰ", "গেষ্ট্ৰিক",
      // English
      "heartburn", "acid reflux", "bloating", "belching", "sour burp", "gastritis"
    ],
  },
  {
    id: "cough",
    canonicalEn: "Cough & Chest Congestion",
    canonicalAs: "কাহ আৰু বুকুৰ কফ",
    symptomSlug: "cough-dry",
    keywords: [
      // Romanized Assamese
      "kaha", "kaah", "kahi", "kah", "kahi thoka", "koph", "buku koph", "khok",
      "sukan kah", "dry cough", "coughing", "chest congestion",
      // Assamese script
      "কাহ", "কাঁহ", "কাহি", "কাহ হৈছে", "শুকান কাহ", "কফ", "বুকুৰ কফ", "কাহৰ খচখচনি",
      // English
      "cough", "coughing", "dry cough", "wet cough", "phlegm", "mucus", "congestion",
      "bronchitis", "chest cold"
    ],
  },
  {
    id: "throat",
    canonicalEn: "Sore Throat & Tonsil Pain",
    canonicalAs: "ডিঙিৰ বিষ আৰু খচখচনি",
    symptomSlug: "sore-throat",
    keywords: [
      // Romanized Assamese
      "dingi", "dhingi", "dingir", "dingi bikh", "dingi khachkhachani", "dingi dhora",
      "gola bikh", "tonsil", "khukhuri", "swallow bikh",
      // Assamese script
      "ডিঙি", "ডিঙিৰ", "ডিঙিটো", "ডিঙিৰ বিষ", "ডিঙি খচখচনি", "টনচিল", "ডিঙি ফুলিছে",
      "ঢোক গিলিলে বিষ",
      // English
      "throat", "sore throat", "throat pain", "scratchy throat", "strep",
      "swallowing pain", "tonsillitis", "hoarse voice", "pharyngitis"
    ],
  },
  {
    id: "headache",
    canonicalEn: "Headache & Migraine",
    canonicalAs: "মূৰৰ বিষ আৰু আধকপালী",
    symptomSlug: "headache-tension",
    keywords: [
      // Romanized Assamese
      "mur", "muror", "mur bikh", "muror bikh", "mur kamoroni", "adhmuriya",
      "mur ghuroni", "mur ghoruwa", "headache", "migraine",
      // Assamese script
      "মূৰ", "মূৰৰ", "মূৰৰ বিষ", "মূৰ কামোৰণি", "আধকপালী", "মূৰ ঘূৰণি", "মূৰ গধুৰ",
      // English
      "headache", "head pain", "migraine", "throbbing head", "head heaviness",
      "tension headache"
    ],
  },
  {
    id: "cold_sinus",
    canonicalEn: "Common Cold & Sinus",
    canonicalAs: "চৰ্দি আৰু পানী লগা",
    symptomSlug: "common-cold",
    keywords: [
      // Romanized Assamese
      "sardi", "chardi", "shordi", "thanda", "pani loga", "nak bondho",
      "nakor pora pani", "hasi", "sneezing", "sinus", "runny nose",
      // Assamese script
      "চৰ্দি", "পানী লগা", "নাক বন্ধ", "নাকৰ পানী", "হাঁচি", "চাইনাছ", "ঠাণ্ডা লগা",
      // English
      "cold", "common cold", "runny nose", "blocked nose", "nasal congestion",
      "sneezing", "sinusitis", "coryza"
    ],
  },
  {
    id: "joint_pain",
    canonicalEn: "Joint, Knee & Muscle Pain",
    canonicalAs: "গাঁঠিৰ বিষ আৰু বাত বিষ",
    symptomSlug: "joint-pain",
    keywords: [
      // Romanized Assamese
      "gathi", "gathir bikh", "athur bikh", "kokal bikh", "bat bikh", "hath bikh",
      "bhori bikh", "peshi bikh", "joint pain", "knee pain", "backache",
      // Assamese script
      "গাঁঠি", "গাঁঠিৰ বিষ", "আঠুৰ বিষ", "কঁকালৰ বিষ", "বাত বিষ", "হাত-ভৰিৰ বিষ",
      "পেশীৰ টান", "গাঁঠি ফুলা",
      // English
      "joint pain", "knee pain", "back pain", "arthritis", "rheumatism",
      "muscle ache", "body ache", "stiffness"
    ],
  },
  {
    id: "skin_itch",
    canonicalEn: "Skin Itching, Rashes & Boils",
    canonicalAs: "ছালৰ খজুৱতি আৰু ফোঁহা",
    symptomSlug: "dry-skin",
    keywords: [
      // Romanized Assamese
      "chali", "sal", "chalar", "khajuwati", "chokola", "foha", "khujuti",
      "skin allergy", "rash", "boil", "itching",
      // Assamese script
      "ছাল", "ছালৰ খজুৱতি", "চকলা", "ফোঁহা", "শালমইনা", "ঘামচি", "খজুৱতি",
      // English
      "skin rash", "itch", "itching", "pruritus", "hives", "eczema", "boils",
      "acne", "pimples", "ringworm"
    ],
  },
  {
    id: "sleep_stress",
    canonicalEn: "Insomnia, Sleeplessness & Anxiety",
    canonicalAs: "টোপনি নোহোৱা আৰু মানসিক চিন্তা",
    symptomSlug: "insomnia",
    keywords: [
      // Romanized Assamese
      "toponi", "toponi nohowa", "chinta", "duchinta", "osanti", "exhaustion",
      "stress", "anxiety", "cannot sleep", "sleepless",
      // Assamese script
      "টোপনি", "টোপনি নোহোৱা", "নিদ্ৰাহীনতা", "চিন্তা", "দুশ্চিন্তা", "অশান্তি", "মানসিক উদ্বেগ",
      // English
      "insomnia", "sleeplessness", "poor sleep", "can't sleep", "stress",
      "anxiety", "nervousness", "restlessness"
    ],
  },
];

// Severity keywords that mandate doctor consultation
const SEVERE_KEYWORDS_AS = [
  "তেজ", "ৰক্ত", "অসহ্য", "গুৰুতৰ", "উশাহ লবলৈ কষ্ট", "বুকুৰ চেপা", "বেহুঁশ",
  "অজ্ঞান", "উচ্চ জ্বৰ", "ধাৰাবাহিক বমি", "ক'লা শৌচ", "বিষাক্ত"
];

const SEVERE_KEYWORDS_EN = [
  "blood", "bleeding", "unbearable", "severe", "difficulty breathing", "shortness of breath",
  "chest pressure", "chest pain", "fainting", "unconscious", "high fever",
  "continuous vomiting", "vomiting blood", "black stool", "toxic"
];

export function parseAssameseNumbers(text: string): number | null {
  const map: Record<string, number> = {
    "১": 1, "২": 2, "৩": 3, "৪": 4, "৫": 5, "৬": 6, "৭": 7, "১০": 10,
    এক: 1, দুই: 2, তিনি: 3, চাৰি: 4, পাঁচ: 5, ছয়: 6, সাত: 7,
  };
  for (const [k, v] of Object.entries(map)) {
    if (text.includes(k)) return v;
  }
  const match = text.match(/\d+/);
  return match ? parseInt(match[0], 10) : null;
}

/**
 * 100% On-Device Natural Language Symptom Matcher (FIX 1)
 * Extracts intent cleanly, checks confidence safeguards, and queries Fuse.js per message.
 */
export function analyzeUserQuery(query: string): AssistantAnalysisResult {
  const clean = query.trim().toLowerCase();

  // 1. Detect symptoms from canonical dictionary
  const matchedCategories: CanonicalSymptomCategory[] = [];
  const searchTerms: string[] = [];

  for (const item of CANONICAL_SYMPTOMS) {
    const hasMatch = item.keywords.some((kw) => {
      const lowerKw = kw.toLowerCase();
      // Match exact boundary or phrase inclusion
      if (lowerKw.includes(" ")) {
        return clean.includes(lowerKw);
      }
      // Word token check
      const regex = new RegExp(`\\b${lowerKw}\\b`, "i");
      return regex.test(clean) || clean.includes(lowerKw);
    });

    if (hasMatch) {
      matchedCategories.push(item);
      searchTerms.push(item.canonicalEn);
    }
  }

  // 2. Detect duration cues
  let daysCount: number | null = null;
  let durationEn = "";
  let durationAs = "";

  const asDurMatch = query.match(
    /([০-৯\d]+|এক|দুই|তিনি|চাৰি|পাঁচ|ছয়|সাত)\s*(দিন|সপ্তাহ)/
  );
  if (asDurMatch) {
    const rawNum = parseAssameseNumbers(asDurMatch[1]) || 1;
    const isWeek = asDurMatch[2].includes("সপ্তাহ");
    daysCount = isWeek ? rawNum * 7 : rawNum;
    durationEn = `${daysCount} day${daysCount > 1 ? "s" : ""}`;
    durationAs = `${asDurMatch[1]} ${asDurMatch[2]}`;
  } else {
    const enDurMatch = clean.match(
      /(?:for|past|since|last)?\s*(\d+|one|two|three|four|five)\s*(days?|weeks?)/
    );
    if (enDurMatch) {
      let num = parseInt(enDurMatch[1], 10);
      if (isNaN(num)) {
        const wordMap: Record<string, number> = {
          one: 1, two: 2, three: 3, four: 4, five: 5,
        };
        num = wordMap[enDurMatch[1]] || 1;
      }
      const isWeek = enDurMatch[2].startsWith("week");
      daysCount = isWeek ? num * 7 : num;
      durationEn = `${daysCount} day${daysCount > 1 ? "s" : ""}`;
      durationAs = `${daysCount} দিন`;
    }
  }

  // 3. Detect severity and red flag triggers
  const hasSevereWordAs = SEVERE_KEYWORDS_AS.some((w) => query.includes(w));
  const hasSevereWordEn = SEVERE_KEYWORDS_EN.some((w) => clean.includes(w));
  const exceedsDuration = (daysCount ?? 0) > 3;

  const isRedFlag = hasSevereWordAs || hasSevereWordEn || exceedsDuration;

  let redFlagReason: { en: string; as: string } | undefined;
  if (hasSevereWordAs || hasSevereWordEn) {
    redFlagReason = {
      en: "Severe red-flag cue detected (intense pain, bleeding, or breathing distress).",
      as: "গুৰুতৰ লক্ষণৰ ইংগিত ধৰা পৰিছে (অসহ্য বিষ, ৰক্তক্ষৰণ বা শ্বাসকষ্ট)।",
    };
  } else if (exceedsDuration) {
    redFlagReason = {
      en: `Ailment has persisted for ${durationEn} (>3 days). Home remedies are for acute mild relief; persistent symptoms require medical diagnosis.`,
      as: `সমস্যাটো ৩ দিনতকেই অধিক সময় (${durationAs}) ধৰি চলি আছে। পৰম্পৰাগত ঘৰুৱা উপচাৰ কেৱল প্ৰাথমিক উপশমৰ বাবেহে; পলম নকৰি চিকিৎসকৰ পৰামৰ্শ লোৱাটো অতি প্ৰয়োজনীয়।`,
    };
  }

  // 4. Retrieve matching remedies from database
  let remediesFound: Remedy[] = [];
  let isLowConfidence = false;

  if (matchedCategories.length > 0) {
    // Collect remedies specifically tied to matched category slugs
    const slugMatches = REMEDIES.filter((r) =>
      matchedCategories.some((c) => c.symptomSlug === r.symptomSlug)
    );

    if (slugMatches.length > 0) {
      remediesFound = slugMatches.slice(0, 3);
    } else {
      const searchStr = matchedCategories.map((c) => c.canonicalEn).join(" ");
      const results = searchRemedies(searchStr, { limit: 3 });
      remediesFound = results.map((r) => r.remedy);
    }
  } else {
    // Attempt fuzzy search directly with query
    const results = searchRemedies(clean, { limit: 3, threshold: 0.35 });
    if (results.length > 0 && results[0].score <= 0.35) {
      remediesFound = results.map((r) => r.remedy);
    } else {
      // Low confidence trigger: Do NOT guess or default silently!
      isLowConfidence = true;
    }
  }

  // 5. Formulate conversational reply
  const understoodSymptoms = matchedCategories.map((c) => ({
    en: c.canonicalEn,
    as: c.canonicalAs,
  }));

  let replyEn = "";
  let replyAs = "";

  if (isLowConfidence) {
    replyEn =
      "I'm not fully sure what symptom you're describing — could you describe it with a bit more detail (e.g. 'stomach pain since morning', 'dry cough with sore throat', or 'fever with chills')? You can also explore our complete Symptom Directory directly.";
    replyAs =
      "আপুনি কি বুজাব খুজিছে মই স্পষ্টভাৱে বুজি পোৱা নাই — অনুগ্ৰহ কৰি লক্ষণটো অলপ বহলাই কওক (যেনে- 'ৰাতিপুৱাৰ পৰা পেটৰ বিষ', 'শুকান কাহ আৰু ডিঙিৰ বিষ', বা 'গা গৰম আৰু কঁপনি')? আপুনি আমাৰ লক্ষণ সূচীৰ পৰাও বাছনি কৰিব পাৰে।";
  } else if (isRedFlag) {
    const sEn = understoodSymptoms.map((s) => s.en).join(", ") || "your discomfort";
    const sAs = understoodSymptoms.map((s) => s.as).join(", ") || "আপোনাৰ সমস্যা";

    replyEn = `⚠️ Medical Safety Notice: You described ${sEn}${
      durationEn ? ` lasting ${durationEn}` : ""
    }. Because this crosses our safe duration/severity threshold, please see a qualified doctor or contact emergency helplines before relying on home care.\n\nHere are gentle, comforting kitchen preparations from our verified archive to soothe discomfort alongside professional medical advice:`;

    replyAs = `⚠️ বিশেষ সাৱধানবাণী: আপুনি ${sAs}${
      durationAs ? ` (${durationAs} ধৰি)` : ""
    } সন্মুখীন হৈছে। এই সমস্যাটো নিৰাপদ ঘৰুৱা সময়সীমাৰ বাহিৰত, সেয়েহে অনতিপলমে এগৰাকী চিকিৎসকৰ পৰামৰ্শ লওক।\n\nচিকিৎসকৰ পৰামৰ্শৰ সমান্তৰালভাৱে আৰামৰ বাবে আমাৰ পৰীক্ষিত ভঁৰালৰ পৰা মৃদু বিধান তলত দিয়া হ'ল:`;
  } else {
    const sEn = understoodSymptoms.map((s) => s.en).join(", ") || "your symptoms";
    const sAs = understoodSymptoms.map((s) => s.as).join(", ") || "আপোনাৰ সমস্যা";

    replyEn = `Understood: It looks like you're dealing with ${sEn}${
      durationEn ? ` (duration: ~${durationEn})` : ""
    }. Based on authentic Assamese traditional kitchen wisdom, here are verified home remedies from our archive specifically for this:`;

    replyAs = `বুজিব পৰা গ'ল: আপুনি সম্ভৱতঃ ${sAs}${
      durationAs ? ` (সময়: ~${durationAs})` : ""
    }ৰ সৈতে যুঁজিছে। আমাৰ পৰম্পৰাগত অসমীয়া ঘৰুৱা উপচাৰ ভঁৰালৰ পৰা আপোনাৰ সমস্যাৰ বাবে প্ৰামাণিক বিধানসমূহ তলত আগবঢ়োৱা হ'ল:`;
  }

  return {
    understoodSymptoms,
    durationDetected: daysCount
      ? { days: daysCount, textEn: durationEn, textAs: durationAs }
      : undefined,
    isRedFlagSeverity: isRedFlag,
    redFlagReason,
    suggestedRemedies: remediesFound,
    isLowConfidence,
    conversationalReply: {
      en: replyEn,
      as: replyAs,
    },
  };
}
