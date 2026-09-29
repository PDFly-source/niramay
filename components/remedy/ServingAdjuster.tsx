"use client";

import React from "react";
import { Users, Plus, Minus, Sparkles } from "lucide-react";

interface Props {
  servingCount: number;
  onServingChange: (count: number) => void;
  languageMode?: "en" | "as" | "bilingual";
}

/**
 * Multiplies an ingredient quantity string by the serving factor.
 * Handles English and Assamese fractions and numbers safely.
 */
export function scaleQuantity(
  qtyStr: string,
  servingCount: number,
  isAssamese = false
): string {
  if (servingCount === 1) return qtyStr;

  // Assamese fraction and number replacements
  const asDigitMap: Record<string, string> = {
    "0": "০",
    "1": "১",
    "2": "২",
    "3": "৩",
    "4": "৪",
    "5": "৫",
    "6": "৬",
    "7": "৭",
    "8": "৮",
    "9": "৯",
  };

  const toAsDigits = (num: number | string): string => {
    return num.toString().replace(/\d/g, (d) => asDigitMap[d] || d);
  };

  // Convert Assamese numerals to English for math
  let normalized = qtyStr
    .replace(/১/g, "1")
    .replace(/২/g, "2")
    .replace(/৩/g, "3")
    .replace(/৪/g, "4")
    .replace(/৫/g, "5")
    .replace(/৬/g, "6")
    .replace(/৭/g, "7")
    .replace(/৮/g, "8")
    .replace(/৯/g, "9")
    .replace(/০/g, "0");

  // Common fraction parsing
  if (normalized.includes("1/4")) {
    const val = 0.25 * servingCount;
    return formatFraction(val, normalized.replace("1/4", "").trim(), isAssamese);
  }
  if (normalized.includes("1/2")) {
    const val = 0.5 * servingCount;
    return formatFraction(val, normalized.replace("1/2", "").trim(), isAssamese);
  }
  if (normalized.includes("3/4")) {
    const val = 0.75 * servingCount;
    return formatFraction(val, normalized.replace("3/4", "").trim(), isAssamese);
  }

  // Range parsing like 4-5 leaves
  const rangeMatch = normalized.match(/(\d+)\s*-\s*(\d+)/);
  if (rangeMatch) {
    const low = Math.round(parseInt(rangeMatch[1], 10) * servingCount);
    const high = Math.round(parseInt(rangeMatch[2], 10) * servingCount);
    const rest = normalized.replace(rangeMatch[0], "").trim();
    if (isAssamese) {
      return `${toAsDigits(low)}-${toAsDigits(high)} ${rest}`;
    }
    return `${low}-${high} ${rest}`;
  }

  // Single number parsing like 1 cup, 2 inches
  const singleMatch = normalized.match(/(\d+(?:\.\d+)?)/);
  if (singleMatch) {
    const originalNum = parseFloat(singleMatch[1]);
    const scaled = originalNum * servingCount;
    const formattedNum = scaled % 1 === 0 ? scaled.toFixed(0) : scaled.toFixed(1);
    const rest = normalized.replace(singleMatch[0], "").trim();
    if (isAssamese) {
      return `${toAsDigits(formattedNum)} ${rest}`;
    }
    return `${formattedNum} ${rest}`;
  }

  return qtyStr;
}

function formatFraction(val: number, unit: string, isAssamese: boolean): string {
  let display = "";
  if (val === 0.25) display = "1/4";
  else if (val === 0.5) display = "1/2";
  else if (val === 0.75) display = "3/4";
  else if (val === 1) display = "1";
  else if (val === 1.5) display = "1 1/2";
  else if (val === 2) display = "2";
  else if (val === 2.5) display = "2 1/2";
  else if (val === 3) display = "3";
  else if (val === 4) display = "4";
  else display = val.toFixed(1);

  if (isAssamese) {
    display = display
      .replace(/1\/4/g, "১/৪")
      .replace(/1\/2/g, "১/২")
      .replace(/3\/4/g, "৩/৪")
      .replace(/1/g, "১")
      .replace(/2/g, "২")
      .replace(/3/g, "৩")
      .replace(/4/g, "৪");
  }

  return `${display} ${unit}`.trim();
}

export const ServingAdjuster: React.FC<Props> = ({
  servingCount,
  onServingChange,
  languageMode = "bilingual",
}) => {
  const isAs = languageMode === "as";

  return (
    <div className="bg-amber-50/70 border border-amber-200/80 rounded-2xl p-3.5 sm:p-4 my-4 no-print flex flex-col sm:flex-row sm:items-center justify-between gap-3">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-amber-700 text-onbrand flex items-center justify-center shrink-0 shadow-xs">
          <Users className="w-5 h-5" />
        </div>
        <div>
          <div className="text-xs font-bold text-stone-900">
            {isAs ? "জোখ আৰু পৰিমাণ নিৰ্ধাৰক" : "Serving & Batch Scaler"}
          </div>
          <div className="text-[11px] text-stone-500">
            {isAs
              ? "প্ৰয়োজন অনুসৰি ১ জন, ২ জন বা পৰিয়ালৰ বাবে উপাদানৰ জোখ স্বয়ংক্রিয়ভাৱে সলনি কৰক।"
              : "Dynamically recalculates spice measures & water volume for your batch size."}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 self-start sm:self-auto flex-wrap">
        {/* Quick Batch Buttons */}
        <div className="flex items-center bg-white rounded-xl p-0.5 border border-stone-200 text-xs">
          <button
            onClick={() => onServingChange(1)}
            className={`px-3 py-1.5 rounded-lg font-bold transition ${
              servingCount === 1
                ? "bg-amber-700 text-onbrand shadow-xs"
                : "text-stone-700 hover:text-stone-900"
            }`}
          >
            {isAs ? "১ জন" : "1 Person"}
          </button>
          <button
            onClick={() => onServingChange(2)}
            className={`px-3 py-1.5 rounded-lg font-bold transition ${
              servingCount === 2
                ? "bg-amber-700 text-onbrand shadow-xs"
                : "text-stone-700 hover:text-stone-900"
            }`}
          >
            {isAs ? "২ জন" : "2 People"}
          </button>
          <button
            onClick={() => onServingChange(4)}
            className={`px-3 py-1.5 rounded-lg font-bold transition ${
              servingCount === 4
                ? "bg-amber-700 text-onbrand shadow-xs"
                : "text-stone-700 hover:text-stone-900"
            }`}
          >
            {isAs ? "৪ জন (পৰিয়াল)" : "4 (Family Batch)"}
          </button>
        </div>

        {/* Stepper (+ / -) */}
        <div className="flex items-center bg-white rounded-xl border border-stone-200 px-2 py-1 gap-2 text-xs font-bold text-stone-800">
          <button
            onClick={() => onServingChange(Math.max(1, servingCount - 1))}
            disabled={servingCount <= 1}
            className="w-6 h-6 rounded-md hover:bg-stone-100 flex items-center justify-center disabled:opacity-30"
          >
            <Minus className="w-3.5 h-3.5" />
          </button>
          <span className="w-6 text-center font-mono">
            {servingCount}
          </span>
          <button
            onClick={() => onServingChange(Math.min(8, servingCount + 1))}
            disabled={servingCount >= 8}
            className="w-6 h-6 rounded-md hover:bg-stone-100 flex items-center justify-center disabled:opacity-30"
          >
            <Plus className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
