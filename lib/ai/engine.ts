import {
  analyzeUserQuery,
  AssistantAnalysisResult,
} from "@/lib/assistant";
import { searchPalette } from "@/lib/commandPalette";
import { Remedy } from "@/lib/schema";
import {
  AIAction,
  NAV_INTENTS,
  PLANT_CONCEPTS,
  PlantConcept,
  findPlantForConcept,
  remediesForConcept,
} from "@/lib/ai/knowledge";
import { MedicinalPlant } from "@/lib/plantLibrary";

/**
 * NIRAMAY AI 2.0 — LOCAL RESPONSE ENGINE
 *
 * Pipeline: normalize -> nav-intent -> plant/ingredient entity -> symptom
 * analysis (existing verified matcher) -> fuzzy fallback -> structured answer.
 * 100% on-device; no external AI API; never invents remedies or routes.
 */

export type ResponseKind = "nav" | "entity" | "symptom" | "unknown";

export interface FollowUp {
  en: string;
  as: string;
  /** When tapped, this query is sent to the engine */
  query: string;
}

export interface NiramayAIResponse {
  kind: ResponseKind;
  /** Headline shown above the answer ("I understand you're asking about...") */
  understandingEn: string;
  understandingAs: string;
  /** Main reply body */
  replyEn: string;
  replyAs: string;
  /** Structured navigation actions — always real existing routes */
  actions: AIAction[];
  /** Related remedy cards (from the verified database) */
  remedies: Remedy[];
  /** Matched plant-library record for entity answers */
  plant?: MedicinalPlant;
  /** Plant-caution line for entity answers (from the verified plant data) */
  plantCautionEn?: string;
  plantCautionAs?: string;
  /** Contextual follow-up chips */
  followUps: FollowUp[];
  /** Health-safety escalation (mirrors the existing verified matcher) */
  redFlag?: AssistantAnalysisResult["isRedFlagSeverity"];
  redFlagReason?: { en: string; as: string };
  /** True when nothing matched — engine stays honest, no hallucination */
  isLowConfidence?: boolean;
}

// ---------------------------------------------------------------------------
// Normalization
// ---------------------------------------------------------------------------

/** Common Roman-Assamese spelling variants folded to canonical tokens. */
const ROMAN_VARIANTS: Record<string, string> = {
  bea: "beya", bia: "beya", bikh: "bish", bix: "bish",
  mur: "mor", mo: "mor", hoise: "hoi", xai: "ase", hoi: "ase",
  korim: "koribo", koribo: "koribo", koribo_parim: "koribo",
  ase: "ase", asol: "ase", diha: "diha",
};

export function normalizeQuery(raw: string): string {
  let q = raw.trim().toLowerCase();
  // remove punctuation except word chars and spaces
  q = q.replace(/[^\p{L}\p{M}\p{N}\s]/gu, " ");
  // fold roman variants (word-boundary safe)
  q = q
    .split(/\s+/)
    .map((tok) => ROMAN_VARIANTS[tok] ?? tok)
    .join(" ")
    .replace(/\s+/g, " ")
    .trim();
  return q;
}

function tokenList(q: string): string[] {
  return q.split(" ").filter(Boolean);
}

/** Loose containment check against intent keywords (phrase OR every token). */
function matchesKeywords(q: string, keywords: string[]): boolean {
  const tokens = tokenList(q);
  for (const kw of keywords) {
    if (q.includes(kw)) return true;
    // single-word keywords: token equality
    if (!kw.includes(" ") && tokens.includes(kw)) return true;
  }
  return false;
}

/** Levenshtein distance for short fuzzy token matching (phase 26 fallback). */
function editDistance(a: string, b: string): number {
  const m = a.length;
  const n = b.length;
  if (Math.abs(m - n) > 2) return 99;
  const dp = Array.from({ length: m + 1 }, (_, i) => [i, ...Array(n).fill(0)]);
  for (let j = 0; j <= n; j++) dp[0][j] = j;
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      dp[i][j] = Math.min(
        dp[i - 1][j] + 1,
        dp[i][j - 1] + 1,
        dp[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1)
      );
    }
  }
  return dp[m][n];
}

// ---------------------------------------------------------------------------
// Intent 1 — SMART NAVIGATION ("open tool X", "show daily habits"...)
// ---------------------------------------------------------------------------

const NAV_CUES = [
  "open", "show", "launch", "start", "go to", "take me", "view", "see",
  "khul", "kholog", "dekh", "dekhu", "dekhok", "dekhaw", "chao", "sandhan",
];

function detectNavIntent(q: string) {
  const hasCue = NAV_CUES.some((c) => q.includes(c));
  // Direct tool mentions (e.g. "spice scanner") don't need a cue word.
  const scored = NAV_INTENTS.map((nav) => ({
    nav,
    score: nav.keywords.reduce((best, kw) => {
      if (q.includes(kw)) return Math.max(best, kw.length);
      return best;
    }, 0),
  }))
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score);

  if (scored.length === 0) return null;
  const best = scored[0];
  // Multi-word intents always fire; single-word intents need a nav cue to
  // avoid hijacking e.g. "garden" inside a longer symptom question.
  const kw = best.nav.keywords.find((k) => q.includes(k)) ?? "";
  const needsCue = !kw.includes(" ");
  if (needsCue && !hasCue) return null;
  return best.nav;
}

// ---------------------------------------------------------------------------
// Intent 2 — PLANT / INGREDIENT ENTITY ("ginger", "আদা", "ada ki use kore")
// ---------------------------------------------------------------------------

function detectPlantConcept(q: string): PlantConcept | null {
  const tokens = tokenList(q);
  for (const concept of PLANT_CONCEPTS) {
    for (const term of concept.terms) {
      if (term.includes(" ")) {
        if (q.includes(term)) return concept;
      } else if (tokens.includes(term)) {
        return concept;
      }
    }
  }
  // fuzzy single-token fallback (e.g. "adha", "haloid", "jalook")
  for (const concept of PLANT_CONCEPTS) {
    for (const term of concept.terms) {
      if (term.length >= 4 && !term.includes(" ")) {
        if (tokens.some((t) => t.length >= 4 && editDistance(t, term) <= 1)) {
          return concept;
        }
      }
    }
  }
  return null;
}

// ---------------------------------------------------------------------------
// Follow-up helpers
// ---------------------------------------------------------------------------

const SYMPTOM_FOLLOWUPS: FollowUp[] = [
  { en: "Show kitchen remedies for digestion", as: "পাচনৰ বাবে ঘৰুৱা উপচাৰ দেখুৱাওক", query: "indigestion remedies" },
  { en: "What are the warning signs?", as: "সতৰ্ক লক্ষণসমূহ কি?", query: "when to see a doctor" },
  { en: "Show all remedies", as: "সকলো উপচাৰ দেখুৱাওক", query: "show all remedies" },
];

const ENTITY_FOLLOWUPS: FollowUp[] = [
  { en: "How is it used in remedies?", as: "ইয়াক উপচাৰত কেনেকৈ ব্যৱহাৰ কৰা হয়?", query: "remedies" },
  { en: "Show all remedies", as: "সকলো উপচাৰ দেখুৱাওক", query: "show all remedies" },
  { en: "Open Kitchen Garden", as: "পাকঘৰৰ বাৰী খোলক", query: "open kitchen garden" },
];

const UNKNOWN_FOLLOWUPS: FollowUp[] = [
  { en: "Stomach pain", as: "পেটৰ বিষ", query: "stomach pain" },
  { en: "Fever & chills", as: "জ্বৰ", query: "fever" },
  { en: "Cough", as: "কাহ", query: "cough" },
  { en: "Show all remedies", as: "সকলো উপচাৰ দেখুৱাওক", query: "show all remedies" },
];

// ---------------------------------------------------------------------------
// MAIN ENTRY
// ---------------------------------------------------------------------------

export function respondToQuery(raw: string): NiramayAIResponse {
  const q = normalizeQuery(raw);

  // --- 1. Smart navigation layer --------------------------------------------
  const nav = detectNavIntent(q);
  if (nav) {
    return {
      kind: "nav",
      understandingEn: `Opening ${nav.titleEn}.`,
      understandingAs: `${nav.titleAs} খোলা হৈছে।`,
      replyEn: `${nav.descEn}. You can go there directly:`,
      replyAs: `${nav.descAs}। আপুনি পোনপটীয়াকৈ তালৈ যাব পাৰে:`,
      actions: [
        {
          type: nav.type,
          id: nav.id,
          href: nav.href,
          labelEn: `Open ${nav.titleEn}`,
          labelAs: `${nav.titleAs} খোলক`,
        },
      ],
      remedies: [],
      followUps: ENTITY_FOLLOWUPS,
    };
  }

  // --- 2. Plant / ingredient entity layer ------------------------------------
  const concept = detectPlantConcept(q);
  if (concept) {
    const plant = findPlantForConcept(concept);
    const remedies = remediesForConcept(concept, 3);
    const useLines =
      plant?.traditionalUses?.en?.slice(0, 3).join(" • ") ??
      "traditional kitchen preparations";
    const useLinesAs =
      plant?.traditionalUses?.as?.slice(0, 3).join(" • ") ??
      "পৰম্পৰাগত পাকঘৰৰ প্ৰস্তুতি";

    return {
      kind: "entity",
      understandingEn: `You're asking about ${concept.labelEn}.`,
      understandingAs: `আপুনি ${concept.labelAs}-ৰ বিষয়ে সুধিছে।`,
      replyEn:
        `From our verified archive: ${concept.labelEn} appears in traditional preparations such as ${useLines}. ` +
        `${remedies.length > 0 ? "Here are verified remedies that use it:" : ""}`,
      replyAs:
        `আমাৰ পৰীক্ষিত ভঁৰালৰ পৰা: ${concept.labelAs} পৰম্পৰাগত প্ৰস্তুতিত ব্যৱহাৰ হয় — ${useLinesAs}। ` +
        `${remedies.length > 0 ? "ইয়াত ব্যৱহাৰ হোৱা পৰীক্ষিত বিধানসমূহ:" : ""}`,
      actions: [
        { type: "OPEN_PAGE", id: "kitchen-garden", href: "/kitchen-garden", labelEn: "Open Kitchen Garden", labelAs: "পাকঘৰৰ বাৰী খোলক" },
        { type: "OPEN_LIBRARY", id: "library", href: "/library", labelEn: "Plant Library", labelAs: "উদ্ভিদকোষ" },
      ],
      remedies,
      plant: plant ?? undefined,
      plantCautionEn: plant?.caution?.en,
      plantCautionAs: plant?.caution?.as,
      followUps: ENTITY_FOLLOWUPS,
    };
  }

  // --- 3. Symptom layer (existing verified matcher) ---------------------------
  const analysis = analyzeUserQuery(raw);
  // Red-flag severity ALWAYS surfaces — escalation is never hidden behind
  // a low-confidence or empty remedy list.
  const matchedSomething =
    analysis.isRedFlagSeverity ||
    (!analysis.isLowConfidence &&
      (analysis.understoodSymptoms.length > 0 ||
        analysis.suggestedRemedies.length > 0));

  if (matchedSomething) {
    const slug = analysis.matchedSymptomSlugs[0];
    const actions: AIAction[] = slug
      ? [
          {
            type: "OPEN_SYMPTOM",
            id: slug,
            href: `/symptoms/${slug}`,
            labelEn: "Open Symptom Guide",
            labelAs: "লক্ষণ সূচী খোলক",
          },
        ]
      : [];

    return {
      kind: "symptom",
      understandingEn:
        analysis.understoodSymptoms.length > 0
          ? `I understand you're asking about ${analysis.understoodSymptoms
              .map((s) => s.en)
              .join(", ")}.`
          : "Here's what I found in the verified archive.",
      understandingAs:
        analysis.understoodSymptoms.length > 0
          ? `আপুনি ${analysis.understoodSymptoms
              .map((s) => s.as)
              .join(", ")}-ৰ বিষয়ে সুধিছে।`
          : "আমাৰ পৰীক্ষিত ভঁৰালত এই তথ্য পোৱা গ'ল।",
      replyEn: analysis.conversationalReply.en,
      replyAs: analysis.conversationalReply.as,
      actions,
      remedies: analysis.suggestedRemedies,
      followUps: SYMPTOM_FOLLOWUPS,
      redFlag: analysis.isRedFlagSeverity,
      redFlagReason: analysis.redFlagReason,
    };
  }

  // --- 4. Fuzzy fallback: still nothing -> honest, no hallucination ----------
  // Try the palette corpus once for a did-you-mean, otherwise admit it.
  const paletteHits = searchPalette(q, "all", 3).filter(
    (i) => i.type !== "plant" || q.length > 2
  );

  return {
    kind: "unknown",
    understandingEn: "Nothing matched exactly.",
    understandingAs: "কোনো প্ৰত্যক্ষ মিল পোৱা নগ'ল।",
    replyEn:
      paletteHits.length > 0
        ? "I don't have a verified local entry for that yet, but these are the closest in Niramay:"
        : "I don't have verified information for that topic in Niramay. Try a different spelling, Assamese, or Roman Assamese.",
    replyAs:
      paletteHits.length > 0
        ? "এই বিষয়ত এতিয়ালৈ কোনো পৰীক্ষিত তথ্য নাই, তথাপি নিৰাময়ত ইয়াৰ নিকটতম সমল আছে:"
        : "এই বিষয়ত নিৰাময়ৰ পৰীক্ষিত ভঁৰালত তথ্য নাই। অন্য বানান, অসমীয়া বা ৰোমান অসমীয়াত চেষ্টা কৰক।",
    actions: paletteHits.slice(0, 3).map((i) => ({
      type: (i.type === "remedy"
        ? "OPEN_REMEDY"
        : i.type === "symptom"
          ? "OPEN_SYMPTOM"
          : i.type === "plant"
            ? "OPEN_PLANT"
            : "OPEN_TOOL") as AIAction["type"],
      id: i.id,
      href: i.href,
      labelEn: i.titleEn,
      labelAs: i.titleAs,
    })),
    remedies: [],
    followUps: UNKNOWN_FOLLOWUPS,
    isLowConfidence: true,
  };
}
