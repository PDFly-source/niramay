export type LanguageMode = "en" | "as" | "bilingual";

export interface LocalizedPair {
  en: string;
  as: string;
}

/**
 * Resolves a text value according to the current active language mode.
 */
export function getLocalizedText(
  value: string | { en: string; as: string } | undefined | null,
  mode: LanguageMode,
  fallbackAssamese?: string
): string {
  if (!value) {
    if (mode === "as" && fallbackAssamese) return fallbackAssamese;
    return "";
  }

  if (typeof value === "object" && value !== null) {
    if (mode === "en") return value.en;
    if (mode === "as") return value.as || value.en;
    // Bilingual mode
    if (!value.as || value.en === value.as) return value.en;
    return `${value.en} (${value.as})`;
  }

  // Value is string
  if (mode === "as") {
    return fallbackAssamese || value;
  }

  if (mode === "bilingual" && fallbackAssamese && fallbackAssamese !== value) {
    return `${value} (${fallbackAssamese})`;
  }

  return value;
}

/**
 * Resolves structured primary and optional secondary (for clean dual-line bilingual rendering).
 */
export function getDualText(
  value: string | { en: string; as: string } | undefined | null,
  mode: LanguageMode,
  fallbackAssamese?: string
): { primary: string; secondary?: string } {
  if (!value) {
    return {
      primary: mode === "as" && fallbackAssamese ? fallbackAssamese : "",
    };
  }

  if (typeof value === "object" && value !== null) {
    if (mode === "en") return { primary: value.en };
    if (mode === "as") return { primary: value.as || value.en };
    return {
      primary: value.en,
      secondary: value.as && value.as !== value.en ? value.as : undefined,
    };
  }

  // Value is string
  if (mode === "en") return { primary: value };
  if (mode === "as") return { primary: fallbackAssamese || value };

  return {
    primary: value,
    secondary:
      fallbackAssamese && fallbackAssamese !== value ? fallbackAssamese : undefined,
  };
}

/**
 * UI dictionary for static labels, headers, and buttons across the entire app
 */
export const UI_TRANSLATIONS = {
  nav: {
    home: { en: "Home", as: "গৃহ", bilingual: "Home / গৃহ" },
    symptoms: { en: "Symptoms", as: "লক্ষণসমূহ", bilingual: "Symptoms / লক্ষণসমূহ" },
    knowledgeBank: { en: "Knowledge Bank", as: "জ্ঞান ভঁৰাল", bilingual: "Knowledge Bank / জ্ঞান ভঁৰাল" },
    savedRemedies: { en: "Saved Remedies", as: "সংৰক্ষিত উপচাৰ", bilingual: "Saved Remedies / সংৰক্ষিত উপচাৰ" },
    tagline: {
      en: "Traditional Wisdom, Modern Care",
      as: "পৰম্পৰাগত জ্ঞান, আধুনিক যত্ন",
      bilingual: "Traditional Wisdom, Modern Care",
    },
  },
  header: {
    language: { en: "Language", as: "ভাষা", bilingual: "Language / ভাষা" },
    modeEn: { en: "English", as: "ইংৰাজী", bilingual: "English" },
    modeAs: { en: "Assamese", as: "অসমীয়া", bilingual: "অসমীয়া" },
    modeBi: { en: "Bilingual", as: "দ্বিভাষিক", bilingual: "EN + অসমীয়া" },
  },
  search: {
    placeholder: {
      en: "Search ailments (e.g. acidity, cough, pain) or kitchen spices...",
      as: "ৰোগৰ লক্ষণ (যেনে- অমলপিত্ত, কাহ, বিষ) বা পাকঘৰৰ মছলা সন্ধান কৰক...",
      bilingual: "Search ailments or spices / ৰোগ বা মছলা সন্ধান কৰক...",
    },
    filterCategories: {
      en: "Filter Categories",
      as: "শ্ৰেণীসমূহ বাছক",
      bilingual: "Filter Categories / শ্ৰেণী",
    },
    all: { en: "All Symptoms", as: "সকলো লক্ষণ", bilingual: "All Symptoms / সকলো" },
    noResults: {
      en: "No remedies or symptoms found. Try searching for ginger, cough, or digestion.",
      as: "কোনো উপচাৰ পোৱা নগ'ল। আদা, কাহ বা হজম সম্পৰ্কে সন্ধান কৰি চাওক।",
      bilingual: "No remedies found / কোনো উপচাৰ পোৱা নগ'ল",
    },
  },
  remedyDetail: {
    backTo: { en: "Back to", as: "উভতি যাওক", bilingual: "Back to / উভতি যাওক" },
    ingredientsTitle: {
      en: "Ingredients Required",
      as: "প্ৰয়োজনীয় উপাদানসমূহ",
      bilingual: "Ingredients Required / প্ৰয়োজনীয় উপাদানসমূহ",
    },
    prepGuideTitle: {
      en: "Step-by-Step Preparation Guide",
      as: "প্ৰস্তুত প্ৰণালীৰ নিৰ্দেশনা",
      bilingual: "Step-by-Step Preparation Guide / প্ৰস্তুত প্ৰণালী",
    },
    grandmothersTip: {
      en: "Grandmother's Heritage Tip",
      as: "আইতাৰ দিহা আৰু পৰামৰ্শ",
      bilingual: "Grandmother's Heritage Tip / আইতাৰ দিহা",
    },
    dosageSafetyTitle: {
      en: "Age Group Dosage Safety",
      as: "বয়স অনুযায়ী মাত্ৰা আৰু নিৰাপত্তা",
      bilingual: "Age Group Dosage Safety / মাত্ৰা নিৰাপত্তা",
    },
    dosageNotice: {
      en: "Do not exceed stated quantities. Herbal decoctions have concentrated bioactive spices.",
      as: "নিৰ্ধাৰিত পৰিমাণতকৈ অধিক নলব। বনৌষধি আৰু মছলাৰ ক্বাথ যথেষ্ট শক্তিশালী।",
      bilingual: "Do not exceed stated quantities / নিৰ্ধাৰিত পৰিমাণতকৈ অধিক নলব",
    },
    childDosage: {
      en: "Children & Toddlers",
      as: "শিশু আৰু কিশোৰ",
      bilingual: "Children & Toddlers / শিশু",
    },
    childWarning: {
      en: "Strict supervision required",
      as: "অভিভাৱকৰ চোৱা-চিতা অনিবাৰ্য্য",
      bilingual: "Strict supervision required / সাৱধানতা",
    },
    adultDosage: {
      en: "Adult Dosage",
      as: "প্ৰাপ্তবয়স্কৰ মাত্ৰা",
      bilingual: "Adult Dosage / প্ৰাপ্তবয়স্ক",
    },
    adultStandard: {
      en: "Standard therapeutic amount",
      as: "প্ৰামাণিক নিৰাময় মাত্ৰা",
      bilingual: "Standard therapeutic amount / উপযুক্ত মাত্ৰা",
    },
    elderlyDosage: {
      en: "Elderly & Medication Watch",
      as: "বয়োজ্যেষ্ঠ আৰু বিশেষ সাৱধানতা",
      bilingual: "Elderly & Medication Watch / বয়োজ্যেষ্ঠ",
    },
    elderlyWarning: {
      en: "Cross-check with prescription meds",
      as: "ঔষধৰ সৈতে পৰীক্ষা কৰি লওক",
      bilingual: "Cross-check with prescription meds / সতৰ্কতা",
    },
    dosTitle: {
      en: "DOs — Best Practices",
      as: "কৰণীয় — উত্তম নিয়ম",
      bilingual: "DOs — Best Practices / কৰণীয়",
    },
    dontsTitle: {
      en: "DON'Ts — Precautions",
      as: "বৰ্জনীয় — সতৰ্কতা",
      bilingual: "DON'Ts — Precautions / বৰ্জনীয়",
    },
    redFlagsTitle: {
      en: "RED-FLAG WARNINGS — Seek Medical Care Immediately",
      as: "বিপদ সংকেত — পলম নকৰি চিকিৎসকৰ কাষ চাপক",
      bilingual: "RED-FLAG WARNINGS / বিপদ সংকেত — জৰুৰী সতৰ্কবাণী",
    },
    redFlagsIntro: {
      en: "If you experience any of the following symptoms, stop home remedies and visit an emergency clinic or hospital right away:",
      as: "যদি তলত উল্লিখিত কোনো লক্ষণ দেখা দিয়ে, ঘৰুৱা উপচাৰ বন্ধ কৰি ততাতৈয়াকৈ চিকিৎসালয়লৈ যাওক:",
      bilingual: "Stop home remedies and seek medical help if / তলৰ লক্ষণত পলম নকৰিব:",
    },
    relatedRemedies: {
      en: "Related Alternative Remedies",
      as: "আনুষঙ্গিক আন উপচাৰসমূহ",
      bilingual: "Related Alternative Remedies / বিকল্প উপচাৰ",
    },
    save: { en: "Save", as: "সংৰক্ষণ", bilingual: "Save / সংৰক্ষণ" },
    saved: { en: "Saved", as: "সংৰক্ষিত", bilingual: "Saved / সংৰক্ষিত" },
    print: { en: "Print", as: "প্ৰিণ্ট", bilingual: "Print / প্ৰিণ্ট" },
    share: { en: "Share", as: "ভাগ-বতৰা", bilingual: "Share / শ্বেয়াৰ" },
    inPantry: { en: "In Stock", as: "মজুত আছে", bilingual: "In Stock / মজুত আছে" },
    addToPantry: { en: "+ Add to Pantry", as: "+ ভঁৰালত যোগ কৰক", bilingual: "+ Add to Pantry / যোগ কৰক" },
  },
  ingredientChecker: {
    title: {
      en: "Kitchen Spice Pantry Checker",
      as: "পাকঘৰৰ মছলা পৰীক্ষক",
      bilingual: "Kitchen Spice Pantry Checker / মছলা পৰীক্ষক",
    },
    subtitle: {
      en: "Select which spices you have in your kitchen right now to instantly find matching, ready-to-make traditional remedies.",
      as: "আপোনাৰ পাকঘৰত এই মুহূৰ্তত থকা মছলাসমূহ বাছনি কৰক আৰু তৎক্ষণাত তৈয়াৰ কৰিব পৰা উপচাৰ চাওক।",
      bilingual: "Select spices you have in your kitchen / পাকঘৰত থকা মছলা বাছক",
    },
    readyMatches: {
      en: "Ready to Prepare",
      as: "তৈয়াৰ কৰিবলৈ সাজু",
      bilingual: "Ready to Prepare / সাজু",
    },
    missingOne: {
      en: "Missing Just 1 Item",
      as: "কেৱল ১টা উপাদান বাকী",
      bilingual: "Missing 1 Item / ১টা বাকী",
    },
    viewAllRemedies: {
      en: "View All Remedies for this Symptom",
      as: "এই লক্ষণৰ সকলো উপচাৰ চাওক",
      bilingual: "View All Remedies / সকলো উপচাৰ চাওক",
    },
  },
  savedPage: {
    title: {
      en: "Your Saved Kitchen Remedies",
      as: "আপোনাৰ সংৰক্ষিত ঘৰুৱা উপচাৰ",
      bilingual: "Your Saved Kitchen Remedies / সংৰক্ষিত উপচাৰ",
    },
    subtitle: {
      en: "Personal remedies saved to this device for quick, offline kitchen access.",
      as: "দ্ৰুত আৰু অফলাইন ব্যৱহাৰৰ বাবে আপোনাৰ যন্ত্ৰত সংৰক্ষিত কৰি থোৱা উপচাৰ।",
      bilingual: "Quick, offline kitchen access / অফলাইন ব্যৱহাৰ",
    },
    empty: {
      en: "No saved remedies yet. Explore symptoms and tap 'Save' on any remedy card.",
      as: "কোনো সংৰক্ষিত উপচাৰ নাই। লক্ষণসমূহ চাওক আৰু উপচাৰ কাৰ্ডত 'Save' টিপক।",
      bilingual: "No saved remedies yet / কোনো উপচাৰ সংৰক্ষিত কৰা নাই",
    },
  },
  footer: {
    disclaimer: {
      en: "Disclaimer: Niramay is an educational digital compendium of traditional Assamese and Ayurvedic home wisdom. It is NOT medical advice, diagnosis, or prescription. In case of acute or serious symptoms, consult a qualified medical professional immediately.",
      as: "সতৰ্কবাণী: নিৰাময় হৈছে অসমীয়া আৰু আয়ুৰ্বেদিক পৰম্পৰাগত জ্ঞানৰ এক শৈক্ষিক সংকলন। ই কোনো চিকিৎসা পৰামৰ্শ, ৰোগ নিৰ্ণয় বা প্ৰেছক্ৰিপচন নহয়। গুৰুতৰ বা জটিল সমস্যাৰ ক্ষেত্ৰত তৎকালীনভাৱে যোগ্য চিকিৎসকৰ পৰামৰ্শ লওক।",
      bilingual: "Traditional Wisdom for Educational Reference Only • পৰম্পৰাগত জ্ঞান আৰু শিক্ষণীয় সংকলন",
    },
    emergency: {
      en: "Emergency Helplines: National Ambulance: 108 | Medical Helpline: 104",
      as: "জৰুৰীকালীন যোগাযোগ: এম্বুলেন্স: ১০৮ | স্বাস্থ্য সাহায্য: ১০৪",
      bilingual: "National Ambulance: 108 | Medical Helpline: 104 | এম্বুলেন্স: ১০৮",
    },
  },
};
