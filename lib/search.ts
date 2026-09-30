import Fuse, { IFuseOptions } from "fuse.js";
import { REMEDIES } from "@/lib/data/remedies";
import { SYMPTOM_CATEGORIES } from "@/lib/data/symptoms";
import { Remedy } from "@/lib/schema";
import { extractString } from "@/lib/utils";

export interface SearchableRemedyItem {
  id: string;
  nameEn: string;
  nameAs: string;
  symptomEn: string;
  symptomAs: string;
  symptomSlug: string;
  ingredientsEn: string;
  ingredientsAs: string;
  contextEn: string;
  contextAs: string;
  transliterations: string;
  remedy: Remedy;
}

// Common phonetic and cross-script mapping for Assamese & English traditional medical queries
export const PHONETIC_MAP: Record<string, string[]> = {
  kaha: ["cough", "কাহ", "কাঁহ", "khachkhachi"],
  cough: ["কাহ", "কাঁহ", "ডিঙি", "throat"],
  sardi: ["cold", "চৰ্দি", "জ্বৰ", "fever"],
  thanda: ["cold", "চৰ্দি", "ঠাণ্ডা", "ঠাণ্ডা লগা"],
  dingi: ["ডিঙি", "ডিঙিৰ বিষ", "sore throat", "throat"],
  cold: ["চৰ্দি", "কাহ", "জ্বৰ", "sardi"],
  jwor: ["fever", "জ্বৰ"],
  fever: ["জ্বৰ", "গাৰ উত্তাপ"],
  acidity: ["গেছ", "বুকুৰ জ্বলা-পোৰা", "অমলপিত্ত", "gas", "heartburn"],
  gas: ["পেটৰ গেছ", "উফন্দি", "acidity", "bloating"],
  bhedailota: ["ভেদাইলতা", "bhedai lota", "paederia foetida", "পেটৰ বিষ"],
  manimuni: ["মানিমুনি", "centella asiatica", "memory", "পেটৰ অসুখ"],
  matikanduri: ["মাটিকান্দুৰী", "alternanthera sessilis", "liver"],
  tengesi: ["টেঙেচী টেঙা", "oxalis corniculata", "অৰুচি", "sour herb"],
  pasotia: ["পচতীয়া", "vitex negundo", "গাঁঠিৰ বিষ", "দেহৰ বিষ"],
  tulsi: ["তুলসী", "holy basil", "কাহ", "চৰ্দি"],
  haldi: ["হালধি", "turmeric", "এণ্টিচেপ্টিক"],
  jaluk: ["জালুক", "black pepper", "কাহ"],
  aada: ["আদা", "ginger", "বদহজম"],
  nemu: ["নেমু", "কাজী নেমু", "lemon"],
  mou: ["মৌ", "honey", "মৌ-জোল"],
  pet: ["পেটৰ বিষ", "stomach", "বদহজম", "diarrhea"],
  stomach: ["পেট", "বদহজম", "গেছ", "acidity"],
  throat: ["ডিঙি", "ডিঙিৰ বিষ", "খচখচনি", "sore throat"],
  headache: ["মূৰৰ বিষ", "adhmuriya", "migraine"],
  joint: ["গাঁঠিৰ বিষ", "পেশী", "বাত বিষ", "arthritis"],
  skin: ["ছাল", "খজুৱতি", "ঘা", "rash"],
};

// Flatten remedies into search-optimized records
function buildSearchIndex(): SearchableRemedyItem[] {
  return REMEDIES.map((r) => {
    const nameEn = extractString(r.name);
    const nameAs = r.name_assamese || (typeof r.name === "object" ? r.name.as : nameEn);
    const symptomEn = extractString(r.symptom);
    const symptomAs = r.symptom_assamese || (typeof r.symptom === "object" ? r.symptom.as : symptomEn);

    const ingsEn = r.ingredients.map((i) => extractString(i.item)).join(" ");
    const ingsAs = r.ingredients
      .map((i) => i.item_assamese || (typeof i.item === "object" ? i.item.as : extractString(i.item)))
      .join(" ");

    const ctxEn = r.culturalContext ? extractString(r.culturalContext) : "";
    const ctxAs = r.culturalContext && typeof r.culturalContext === "object" ? r.culturalContext.as : "";

    // Generate phonetic transliterations
    const combinedTokens = `${nameEn} ${nameAs} ${symptomEn} ${symptomAs} ${ingsEn}`.toLowerCase();
    const matchedPhonetics: string[] = [];
    for (const [key, aliases] of Object.entries(PHONETIC_MAP)) {
      if (combinedTokens.includes(key) || aliases.some((a) => combinedTokens.includes(a.toLowerCase()))) {
        matchedPhonetics.push(key, ...aliases);
      }
    }

    return {
      id: r.id,
      nameEn,
      nameAs,
      symptomEn,
      symptomAs,
      symptomSlug: r.symptomSlug || "",
      ingredientsEn: ingsEn,
      ingredientsAs: ingsAs,
      contextEn: ctxEn,
      contextAs: ctxAs,
      transliterations: Array.from(new Set(matchedPhonetics)).join(" "),
      remedy: r,
    };
  });
}

let cachedFuse: Fuse<SearchableRemedyItem> | null = null;
let cachedItems: SearchableRemedyItem[] | null = null;

export function getFuseIndex(): Fuse<SearchableRemedyItem> {
  if (cachedFuse) return cachedFuse;

  cachedItems = buildSearchIndex();

  const options: IFuseOptions<SearchableRemedyItem> = {
    includeScore: true,
    threshold: 0.38, // Tuned for forgiving near-misses without irrelevant flood
    distance: 100,
    minMatchCharLength: 2,
    keys: [
      { name: "nameEn", weight: 0.3 },
      { name: "nameAs", weight: 0.3 },
      { name: "symptomEn", weight: 0.25 },
      { name: "symptomAs", weight: 0.25 },
      { name: "transliterations", weight: 0.2 },
      { name: "ingredientsEn", weight: 0.15 },
      { name: "ingredientsAs", weight: 0.15 },
      { name: "contextEn", weight: 0.05 },
      { name: "contextAs", weight: 0.05 },
    ],
  };

  cachedFuse = new Fuse(cachedItems, options);
  return cachedFuse;
}

export interface SearchResult {
  remedy: Remedy;
  score: number;
  matchedField?: string;
}

/**
 * Searches remedies with fuzzy matching and cross-script support.
 */
export function searchRemedies(
  query: string,
  options: { limit?: number; threshold?: number } = {}
): SearchResult[] {
  const clean = query.trim();
  if (!clean) return [];

  const fuse = getFuseIndex();
  const threshold = options.threshold ?? 0.38;

  // Augment query if known phonetic alias
  let expandedQuery = clean;
  const lower = clean.toLowerCase();
  for (const [key, aliases] of Object.entries(PHONETIC_MAP)) {
    if (lower.includes(key)) {
      expandedQuery += ` ${aliases.join(" ")}`;
    } else {
      for (const a of aliases) {
        if (lower.includes(a.toLowerCase())) {
          expandedQuery += ` ${key}`;
          break;
        }
      }
    }
  }

  const results = fuse.search(expandedQuery);

  return results
    .filter((res) => (res.score ?? 1) <= threshold)
    .slice(0, options.limit ?? 25)
    .map((res) => ({
      remedy: res.item.remedy,
      score: res.score ?? 0,
    }));
}

/**
 * Generates a "Did you mean...?" suggestion for misspelled queries
 */
const COMMON_SUGGESTIONS: { match: RegExp; suggestEn: string; suggestAs: string }[] = [
  { match: /^(kaha|kahaa|kaah|coughh|kaaha|kah)$/i, suggestEn: "Cough (Kadha)", suggestAs: "কাহ" },
  { match: /^(sardi|sardee|sordi|thanda)$/i, suggestEn: "Cold (Sardi)", suggestAs: "চৰ্দি" },
  { match: /^(acid|asidity|acidiity|ges|gastric|gas)$/i, suggestEn: "Acidity / Heartburn", suggestAs: "অমলপিত্ত / গেছ" },
  { match: /^(murot|muror|headach|headahe|hedache)$/i, suggestEn: "Headache", suggestAs: "মূৰৰ বিষ" },
  { match: /^(dingi|dingir|dhingi|throatt|sortroat)$/i, suggestEn: "Sore Throat", suggestAs: "ডিঙিৰ বিষ" },
  { match: /^(bhedai|bedailota|bhedailata|bheday)$/i, suggestEn: "Bhedailota (Skunk Vine)", suggestAs: "ভেদাইলতা" },
  { match: /^(manimuni|monimuni|brahmi)$/i, suggestEn: "Manimuni (Pennywort)", suggestAs: "মানিমুনি" },
  { match: /^(tengesi|tengasi|tengisi)$/i, suggestEn: "Tengesi (Woodsorrel)", suggestAs: "টেঙেচী টেঙা" },
  { match: /^(pasotia|posotia|pochotia)$/i, suggestEn: "Pasotia (Vitex)", suggestAs: "পচতীয়া" },
  { match: /^(tulshi|tulsii|thulsi)$/i, suggestEn: "Tulsi (Holy Basil)", suggestAs: "তুলসী" },
  { match: /^(haldi|haldhi|huldi)$/i, suggestEn: "Turmeric (Haldi)", suggestAs: "হালধি" },
  { match: /^(jaluk|jalukk|golmarich)$/i, suggestEn: "Black Pepper (Jaluk)", suggestAs: "জালুক" },
  { match: /^(petor|petar|stomachh|stomac)$/i, suggestEn: "Stomach Ache / Gas", suggestAs: "পেটৰ বিষ" },
  { match: /^(gathir|gathii|jointt|athur)$/i, suggestEn: "Joint Pain", suggestAs: "গাঁঠিৰ বিষ" },
];

export function getDidYouMean(query: string): { en: string; as: string } | null {
  const trimmed = query.trim().toLowerCase();
  if (trimmed.length < 3) return null;

  for (const item of COMMON_SUGGESTIONS) {
    if (item.match.test(trimmed)) {
      return { en: item.suggestEn, as: item.suggestAs };
    }
  }

  // If query returned 0 or very few results, check closest symptom category
  const fuse = getFuseIndex();
  const matches = fuse.search(trimmed);
  if (matches.length > 0 && (matches[0].score ?? 1) > 0.3) {
    const top = matches[0].item;
    return {
      en: top.symptomEn || top.nameEn,
      as: top.symptomAs || top.nameAs,
    };
  }

  return null;
}
