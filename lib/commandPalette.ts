import {
  REMEDIES,
} from "@/lib/data/remedies";
import { SYMPTOM_CATEGORIES } from "@/lib/data/symptoms";
import { ASSAMESE_MEDICINAL_PLANTS } from "@/lib/plantLibrary";
import { extractString } from "@/lib/utils";
import { PHONETIC_MAP } from "@/lib/search";

/**
 * Global command palette corpus — the single source of truth for
 * Niramay-wide quick search. Built ONLY from existing datasets and
 * existing routes; never invents destinations or duplicate data.
 */

export type PaletteFilter =
  | "all"
  | "symptom"
  | "remedy"
  | "plant"
  | "tool"
  | "library"
  | "seasonal";

export interface PaletteItem {
  id: string;
  type: Exclude<PaletteFilter, "all">;
  titleEn: string;
  titleAs: string;
  descEn: string;
  descAs: string;
  href: string;
}

/** Static modules / destinations (mirrors the header drawer, never new routes). */
const TOOL_ITEMS: PaletteItem[] = [
  {
    id: "tool-spice-scanner",
    type: "tool",
    titleEn: "AI Spice Box Scanner",
    titleAs: "মছলা বাকচ স্কেনাৰ",
    descEn: "Scan your spice box for remedy matches",
    descAs: "মছলাৰ বাকচ স্কেন কৰি উপচাৰ মিলাওক",
    href: "/spice-scanner",
  },
  {
    id: "tool-plant-scanner",
    type: "tool",
    titleEn: "Plant & Leaf Scanner",
    titleAs: "বনৌষধি স্কেনাৰ",
    descEn: "Identify medicinal plants by leaf",
    descAs: "পাতেৰে ঔষধি গছ চিনাক্ত কৰক",
    href: "/plant-scanner",
  },
  {
    id: "tool-dosha",
    type: "tool",
    titleEn: "Dosha / Prakriti Assessment",
    titleAs: "দোষ / প্ৰকৃতি মূল্যায়ন",
    descEn: "Discover your Ayurvedic constitution",
    descAs: "আপোনাৰ আয়ুৰ্বেদিক গঠন জানক",
    href: "/dosha-assessment",
  },
  {
    id: "tool-fridge-card",
    type: "tool",
    titleEn: "Emergency Fridge Card",
    titleAs: "ফ্ৰিজ কাৰ্ড (PDF)",
    descEn: "Printable family emergency card",
    descAs: "প্ৰিণ্টযোগ্য পৰিয়ালৰ আপতকালীন কাৰ্ড",
    href: "/fridge-card",
  },
  {
    id: "tool-daily-habits",
    type: "tool",
    titleEn: "Daily Habit Tracker",
    titleAs: "দিনচৰ্যা অভ্যাস",
    descEn: "Track dinacharya wellness habits",
    descAs: "দিনচৰ্যা অভ্যাস ট্ৰেক কৰক",
    href: "/daily-habits",
  },
  {
    id: "tool-aitas-diha",
    type: "tool",
    titleEn: "Aita's Diha (Family Journal)",
    titleAs: "আইতাৰ দিহা (দিনলিপি)",
    descEn: "Preserve family remedy stories",
    descAs: "পৰিয়ালৰ উপচাৰৰ কাহিনী সাঁচি থওক",
    href: "/aitas-diha",
  },
  {
    id: "tool-symptom-directory",
    type: "tool",
    titleEn: "Symptom Directory",
    titleAs: "লক্ষণ সূচী",
    descEn: "Browse all 105 symptom categories",
    descAs: "১০৫টা লক্ষণ বিভাগ চাওক",
    href: "/symptoms",
  },
  {
    id: "tool-saved",
    type: "tool",
    titleEn: "Saved Remedies",
    titleAs: "সংৰক্ষিত উপচাৰ",
    descEn: "Your personal remedy shelf",
    descAs: "আপোনাৰ ব্যক্তিগত উপচাৰ তালিকা",
    href: "/saved",
  },
];

const LIBRARY_ITEMS: PaletteItem[] = [
  {
    id: "lib-knowledge-bank",
    type: "library",
    titleEn: "Traditional Knowledge Bank",
    titleAs: "পৰম্পৰাগত জ্ঞান ভঁৰাল",
    descEn: "Foundational Ayurvedic knowledge",
    descAs: "আয়ুৰ্বেদিক মৌলিক জ্ঞান",
    href: "/knowledge-bank",
  },
  {
    id: "lib-library",
    type: "library",
    titleEn: "Living Reference Library",
    titleAs: "জ্ঞান ভঁৰাল আৰু উদ্ভিদকোষ",
    descEn: "Plants, garden & seasonal archives",
    descAs: "গছ-গছনি, বাৰী আৰু বতৰৰ সংৰচনা",
    href: "/library",
  },
];

const SEASONAL_ITEMS: PaletteItem[] = [
  {
    id: "seasonal-ritucharya",
    type: "seasonal",
    titleEn: "Ritucharya (Seasonal Guide)",
    titleAs: "ঋতুচৰ্যা (বতৰৰ যত্ন)",
    descEn: "Seasonal Ayurvedic living guidance",
    descAs: "বতৰ অনুসৰি আয়ুৰ্বেদিক জীৱনযাপন",
    href: "/ritucharya",
  },
  {
    id: "seasonal-kitchen-garden",
    type: "seasonal",
    titleEn: "Kitchen Garden Guide",
    titleAs: "পাকঘৰৰ বাৰী",
    descEn: "Grow your remedy garden at home",
    descAs: "ঘৰতে ঔষধি বাৰী গঢ়ক",
    href: "/kitchen-garden",
  },
];

let cachedCorpus: PaletteItem[] | null = null;

/** Builds (once) the full palette corpus from existing data sources. */
export function getPaletteCorpus(): PaletteItem[] {
  if (cachedCorpus) return cachedCorpus;

  const symptomItems: PaletteItem[] = SYMPTOM_CATEGORIES.map((s) => ({
    id: `symptom-${s.slug}`,
    type: "symptom" as const,
    titleEn: s.title,
    titleAs: s.assameseTitle || s.title,
    descEn: s.description || "",
    descAs: s.description || "",
    href: `/symptoms/${s.slug}`,
  }));

  const remedyItems: PaletteItem[] = REMEDIES.map((r) => {
    const nameEn = extractString(r.name);
    const nameAs = r.name_assamese || nameEn;
    const symptomEn = extractString(r.symptom);
    const symptomAs = r.symptom_assamese || symptomEn;
    return {
      id: `remedy-${r.id}`,
      type: "remedy" as const,
      titleEn: nameEn,
      titleAs: nameAs,
      descEn: symptomEn,
      descAs: symptomAs,
      href: `/remedy/${r.id}`,
    };
  });

  const plantItems: PaletteItem[] = ASSAMESE_MEDICINAL_PLANTS.map((p) => ({
    id: `plant-${p.id}`,
    type: "plant" as const,
    titleEn: p.nameEn,
    titleAs: p.nameAs || p.nameEn,
    descEn: p.botanicalName,
    descAs: p.habitat?.as || p.botanicalName,
    href: "/library",
  }));

  cachedCorpus = [
    ...symptomItems,
    ...remedyItems,
    ...plantItems,
    ...TOOL_ITEMS,
    ...LIBRARY_ITEMS,
    ...SEASONAL_ITEMS,
  ];
  return cachedCorpus;
}

const TYPE_ORDER: Record<PaletteItem["type"], number> = {
  tool: 0,
  symptom: 1,
  remedy: 2,
  plant: 3,
  seasonal: 4,
  library: 5,
};

/**
 * Tiered ranking (phase 2.1 #7):
 * 0 exact title start -> 1 title contains -> 2 synonym/phonetic title ->
 * 3 desc start/contains -> 4 synonym desc -> -1 no match.
 */
function scoreItem(item: PaletteItem, q: string, aliases: string[] = []): number {
  const tEn = item.titleEn.toLowerCase();
  const tAs = item.titleAs.toLowerCase();
  const dEn = item.descEn.toLowerCase();
  const dAs = item.descAs.toLowerCase();

  if (tEn.startsWith(q) || tAs.startsWith(q)) return 0;
  if (tEn.includes(q) || tAs.includes(q)) return 1;
  // synonym / phonetic alias tier (e.g. 'ada' -> ginger titles)
  if (aliases.length > 0) {
    if (aliases.some((a) => tEn.includes(a) || tAs.includes(a))) return 2;
  }
  if (dEn.startsWith(q) || dAs.startsWith(q)) return 3;
  if (dEn.includes(q) || dAs.includes(q)) return 4;
  if (aliases.length > 0) {
    if (aliases.some((a) => dEn.includes(a) || dAs.includes(a))) return 5;
  }
  return -1; // no match
}

/** Phonetic aliases of a query — the synonyms tier of the ranking. */
function phoneticAliases(q: string): string[] {
  const out = new Set<string>();
  const tokens = q.split(/\s+/).filter(Boolean);
  for (const tok of tokens) {
    const list = PHONETIC_MAP[tok];
    if (list) list.forEach((a) => out.add(a.toLowerCase()));
    for (const [key, aliasList] of Object.entries(PHONETIC_MAP)) {
      if (aliasList.some((a) => a.toLowerCase() === tok)) out.add(key);
    }
  }
  return [...out];
}

/** Lightweight search across the corpus (EN + Assamese). */
/**
 * Expands a query with phonetic aliases so Roman-Assamese queries
 * ("ada", "kaha", "jor") discover Assamese-script and English content.
 */
function expandQuery(q: string): string[] {
  const variants = [q];
  const tokens = q.split(/\s+/).filter(Boolean);
  for (const tok of tokens) {
    const aliases = PHONETIC_MAP[tok];
    if (aliases) {
      variants.push(aliases.join(" "));
    }
    // reverse: query token is an alias of some key -> include the key
    for (const [key, aliasList] of Object.entries(PHONETIC_MAP)) {
      if (aliasList.some((a) => a.toLowerCase() === tok)) {
        variants.push(key);
      }
    }
  }
  return [...new Set(variants.filter(Boolean))];
}

export function searchPalette(
  query: string,
  filter: PaletteFilter,
  limit = 30
): PaletteItem[] {
  const corpus = getPaletteCorpus();
  const q = query.trim().toLowerCase();
  if (!q) {
    const pool = corpus.filter((i) => filter === "all" || i.type === filter);
    return [
      ...pool.filter((i) => i.type === "tool"),
      ...pool.filter((i) => i.type === "seasonal"),
      ...pool.filter((i) => i.type !== "tool" && i.type !== "seasonal"),
    ].slice(0, limit);
  }

  // Direct scoring first (exact > normalized > description)
  const aliases = phoneticAliases(q);
  const direct = corpus
    .filter((i) => filter === "all" || i.type === filter)
    .map((i) => ({ item: i, s: scoreItem(i, q, aliases) }))
    .filter((r) => r.s >= 0)
    .sort((a, b) => a.s - b.s || TYPE_ORDER[a.item.type] - TYPE_ORDER[b.item.type])
    .slice(0, limit)
    .map((r) => r.item);
  if (direct.length > 0) return direct;

  // Fallback 1: phonetic / transliteration expansion ("ada" -> ginger content)
  const seen = new Set(direct.map((i) => i.id));
  const phonetic: PaletteItem[] = [];
  for (const variant of expandQuery(q).slice(1)) {
    for (const item of corpus) {
      if (filter !== "all" && item.type !== filter) continue;
      if (seen.has(item.id)) continue;
      if (scoreItem(item, variant) >= 0) {
        seen.add(item.id);
        phonetic.push(item);
        if (phonetic.length >= limit) break;
      }
    }
    if (phonetic.length >= limit) break;
  }
  if (phonetic.length > 0) return phonetic;

  // Fallback 2: fuzzy containment — tokens OR their phonetic aliases may
  // appear in the item text; at least half the token groups must match.
  const tokens = q.split(/\s+/).filter((t) => t.length >= 3);
  if (tokens.length === 0) return [];
  const tokenGroups = tokens.map((t) => {
    const aliases = PHONETIC_MAP[t] ?? [];
    return [t, ...aliases.map((x) => x.toLowerCase())];
  });
  const threshold = Math.ceil(tokenGroups.length / 2);
  return corpus
    .filter((i) => filter === "all" || i.type === filter)
    .map((i) => {
      const hay = `${i.titleEn} ${i.titleAs} ${i.descEn} ${i.descAs}`.toLowerCase();
      const score = tokenGroups.filter((g) => g.some((t) => hay.includes(t))).length;
      return { item: i, score };
    })
    .filter((r) => r.score >= threshold)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((r) => r.item);
}
