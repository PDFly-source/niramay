import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Remedy } from "@/lib/schema";
import { LanguageMode, getLocalizedText } from "@/lib/i18n";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface MatchScore {
  totalIngredients: number;
  matchedCount: number;
  missingIngredients: string[];
  matchedIngredients: string[];
  percentage: number;
  status: "ready" | "missing_one" | "need_more";
}

/**
 * Extracts raw English or display string from localized field
 */
export function extractString(value: any): string {
  if (!value) return "";
  if (typeof value === "string") return value;
  if (typeof value === "object" && "en" in value) return value.en;
  return String(value);
}

/**
 * Normalizes spice names for fuzzy match
 */
export function normalizeSpiceName(name: any): string {
  const str = extractString(name);
  return str
    .toLowerCase()
    .replace(/\(.*?\)/g, "") // remove parenthetical like (Aada)
    .replace(/fresh|powder|crushed|whole|leaves|stick|seeds|root|juice/gi, "")
    .trim();
}

/**
 * Calculates how well user's pantry matches a given remedy
 */
export function calculateRemedyMatch(
  remedy: Remedy,
  pantry: string[]
): MatchScore {
  const pantryNormalized = pantry.map(normalizeSpiceName);

  const matchedIngredients: string[] = [];
  const missingIngredients: string[] = [];

  remedy.ingredients.forEach((ing) => {
    const rawItem = extractString(ing.item);
    const itemNorm = normalizeSpiceName(rawItem);
    const isWater = itemNorm.includes("water") || rawItem.toLowerCase().includes("water");

    const isMatched =
      isWater ||
      pantryNormalized.some(
        (p) => p && (itemNorm.includes(p) || p.includes(itemNorm))
      );

    if (isMatched) {
      matchedIngredients.push(rawItem);
    } else {
      missingIngredients.push(rawItem);
    }
  });

  const totalIngredients = remedy.ingredients.length;
  const matchedCount = matchedIngredients.length;
  const percentage = totalIngredients > 0 ? Math.round((matchedCount / totalIngredients) * 100) : 100;

  let status: MatchScore["status"] = "need_more";
  if (missingIngredients.length === 0) {
    status = "ready";
  } else if (missingIngredients.length === 1) {
    status = "missing_one";
  }

  return {
    totalIngredients,
    matchedCount,
    missingIngredients,
    matchedIngredients,
    percentage,
    status,
  };
}

/**
 * Generates clean text summary for clipboard sharing, respecting language preference
 */
export function formatRemedyForSharing(remedy: Remedy, lang: LanguageMode = "bilingual"): string {
  const name = getLocalizedText(remedy.name, lang, remedy.name_assamese);
  const symptom = getLocalizedText(remedy.symptom, lang, remedy.symptom_assamese);

  const ingLines = remedy.ingredients
    .map((i) => {
      const item = getLocalizedText(i.item, lang, i.item_assamese);
      const qty = getLocalizedText(i.qty, lang, i.qty_assamese);
      return `• ${item}: ${qty}`;
    })
    .join("\n");

  const stepLines = remedy.steps
    .map((s, idx) => {
      const stepText = getLocalizedText(s, lang);
      return `${idx + 1}. ${stepText}`;
    })
    .join("\n");

  const childDosage = getLocalizedText(remedy.dosage.child, lang, remedy.dosage.child_assamese);
  const adultDosage = getLocalizedText(remedy.dosage.adult, lang, remedy.dosage.adult_assamese);
  const elderlyDosage = getLocalizedText(remedy.dosage.elderly, lang, remedy.dosage.elderly_assamese);

  const dosLines = remedy.dos.map((d) => `✅ ${getLocalizedText(d, lang)}`).join("\n");
  const dontsLines = remedy.donts.map((d) => `⚠️ ${getLocalizedText(d, lang)}`).join("\n");
  const redFlagsLines = remedy.redFlags.map((r) => `🚨 ${getLocalizedText(r, lang)}`).join("\n");

  const tipText = remedy.tip ? `\n💡 TIP:\n${getLocalizedText(remedy.tip, lang)}\n` : "";

  return `🌿 NIRAMAY (নিৰাময়) — Traditional Kitchen Remedy
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${name}
Ailment: ${symptom}
Prep Time: ~${remedy.prepTimeMinutes} mins

INGREDIENTS:
${ingLines}

PREPARATION:
${stepLines}
${tipText}
DOSAGE GUIDE:
• Child: ${childDosage}
• Adult: ${adultDosage}
• Elderly: ${elderlyDosage}

DOs & DON'Ts:
${dosLines}
${dontsLines}

RED FLAG WARNINGS:
${redFlagsLines}

⚠️ Note: For educational/traditional reference only. Consult a doctor for acute or worsening symptoms.`;
}
