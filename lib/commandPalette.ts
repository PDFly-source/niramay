import {
  REMEDIES,
} from "@/lib/data/remedies";
import { SYMPTOM_CATEGORIES } from "@/lib/data/symptoms";
import { ASSAMESE_MEDICINAL_PLANTS } from "@/lib/plantLibrary";
import { extractString } from "@/lib/utils";

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

function scoreItem(item: PaletteItem, q: string): number {
  const tEn = item.titleEn.toLowerCase();
  const tAs = item.titleAs.toLowerCase();
  const dEn = item.descEn.toLowerCase();
  const dAs = item.descAs.toLowerCase();

  if (tEn.startsWith(q) || tAs.startsWith(q)) return 0;
  if (tEn.includes(q) || tAs.includes(q)) return 1;
  if (dEn.startsWith(q) || dAs.startsWith(q)) return 2;
  if (dEn.includes(q) || dAs.includes(q)) return 3;
  return -1; // no match
}

/** Lightweight search across the corpus (EN + Assamese). */
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

  return corpus
    .filter((i) => filter === "all" || i.type === filter)
    .map((i) => ({ item: i, s: scoreItem(i, q) }))
    .filter((r) => r.s >= 0)
    .sort((a, b) => a.s - b.s || TYPE_ORDER[a.item.type] - TYPE_ORDER[b.item.type])
    .slice(0, limit)
    .map((r) => r.item);
}
