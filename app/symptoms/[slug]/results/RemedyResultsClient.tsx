"use client";

import React, { useState } from "react";
import Link from "next/link";
import { SymptomCategory, Remedy } from "@/lib/schema";
import { useNiramayStore } from "@/lib/store";
import { useMounted } from "@/hooks/useMounted";
import { calculateRemedyMatch, extractString } from "@/lib/utils";
import { SpiceIcon } from "@/components/brand/SpiceIcon";
import { getLocalizedText } from "@/lib/i18n";
import {
  ChevronLeft,
  Clock,
  CheckCircle2,
  AlertCircle,
  Bookmark,
  ArrowRight,
  Filter,
  AlertTriangle,
  RotateCcw,
} from "lucide-react";

interface Props {
  symptom: SymptomCategory;
  categoryRemedies: Remedy[];
}

export const RemedyResultsClient: React.FC<Props> = ({
  symptom,
  categoryRemedies,
}) => {
  const mounted = useMounted();
  const { pantry, toggleSaved, isSaved, languageMode } = useNiramayStore();
  const [filterMode, setFilterMode] = useState<"all" | "ready" | "missing_one">(
    "all"
  );

  const currentMode = mounted ? languageMode : "bilingual";
  const isEn = currentMode === "en";
  const isAs = currentMode === "as";
  const isBi = currentMode === "bilingual";

  const defaultPantry = [
    "Ginger (Aada)",
    "Tulsi (Holy Basil)",
    "Black pepper (Jaluk)",
    "Honey (Mou)",
    "Turmeric (Haldi)",
    "Ajwain (Carom seeds)",
    "Cumin (Jeera)",
    "Lemon (Kaji Nemu)",
    "Salt (Nimokh)",
  ];

  const activePantry = mounted ? pantry : defaultPantry;

  // Score all remedies against user's current pantry
  const scoredRemedies = categoryRemedies
    .map((remedy) => ({
      remedy,
      score: calculateRemedyMatch(remedy, activePantry),
    }))
    .sort((a, b) => b.score.percentage - a.score.percentage);

  const readyCount = scoredRemedies.filter(
    (s) => s.score.status === "ready"
  ).length;
  const missingOneCount = scoredRemedies.filter(
    (s) => s.score.status === "missing_one"
  ).length;

  const filtered = scoredRemedies.filter(({ score }) => {
    if (filterMode === "ready") return score.status === "ready";
    if (filterMode === "missing_one") return score.status === "missing_one";
    return true;
  });

  const symptomTitle = isAs ? symptom.assameseTitle : symptom.title;
  const symptomSecondary = isBi ? symptom.assameseTitle : undefined;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-14">
      {/* Navigation */}
      <div className="flex items-center justify-between gap-4 mb-6">
        <Link
          href={`/symptoms/${symptom.slug}`}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-stone-600 hover:text-amber-800 transition"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>{isAs ? "মছলা পৰীক্ষকলৈ উভতি যাওক" : "Back to kitchen checklist"}</span>
        </Link>
        <Link
          href="/symptoms"
          className="text-xs text-stone-500 hover:text-stone-800"
        >
          {isAs ? "সকলো লক্ষণ" : "All Symptoms"}
        </Link>
      </div>

      {/* Header Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-amber-200/80 shadow-xs mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="text-xs uppercase tracking-wider font-bold text-amber-800 bg-amber-100 px-3 py-1 rounded-full">
              {isAs ? `${symptomTitle}ৰ বাবে ফলাফল` : `Results for ${symptom.title}`}
            </span>
            <h1 className="text-2xl sm:text-4xl font-serif font-black text-stone-900 mt-2">
              {isAs ? "মিলা ঘৰুৱা উপচাৰসমূহ" : "Matching Kitchen Remedies"}
            </h1>
            {symptomSecondary && (
              <div className="text-sm font-bold text-emerald-800 mt-1">
                {symptomSecondary}
              </div>
            )}
            <p className="text-xs sm:text-sm text-stone-600 mt-1 max-w-xl">
              {isAs
                ? "আপোনাৰ পাকঘৰত থকা উপাদানৰ ওপৰত ভিত্তি কৰি শ্ৰেণীভুক্ত কৰা হৈছে।"
                : "Ranked by how many ingredients you currently have in your kitchen pantry."}
            </p>
          </div>

          <Link
            href={`/symptoms/${symptom.slug}`}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 text-xs font-bold transition self-start"
          >
            <RotateCcw className="w-3.5 h-3.5 text-amber-700" />
            <span>{isAs ? "মছলা সলনি কৰক" : "Edit Pantry Items"}</span>
          </Link>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 pt-6 mt-6 border-t border-stone-100 overflow-x-auto">
          <button
            onClick={() => setFilterMode("all")}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition shrink-0 ${
              filterMode === "all"
                ? "bg-night text-onbrand shadow-xs"
                : "bg-stone-100 text-stone-600 hover:bg-stone-200"
            }`}
          >
            {isAs ? "সকলো উপচাৰ" : "All Remedies"} ({categoryRemedies.length})
          </button>
          <button
            onClick={() => setFilterMode("ready")}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition shrink-0 flex items-center gap-1.5 ${
              filterMode === "ready"
                ? "bg-emerald-700 text-onbrand shadow-xs"
                : "bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100"
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>{isAs ? "তৈয়াৰ কৰিবলৈ সাজু" : "Ready to Make"} ({readyCount})</span>
          </button>
          <button
            onClick={() => setFilterMode("missing_one")}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition shrink-0 flex items-center gap-1.5 ${
              filterMode === "missing_one"
                ? "bg-amber-700 text-onbrand shadow-xs"
                : "bg-amber-50 text-amber-900 border border-amber-200 hover:bg-amber-100"
            }`}
          >
            <AlertCircle className="w-3.5 h-3.5" />
            <span>{isAs ? "কেৱল ১টা মছলা বাকী" : "Missing 1 Ingredient"} ({missingOneCount})</span>
          </button>
        </div>
      </div>

      {/* Results Grid */}
      {filtered.length === 0 ? (
        <div className="bg-white rounded-3xl p-10 text-center border border-stone-200 max-w-md mx-auto">
          <AlertCircle className="w-10 h-10 text-amber-600 mx-auto mb-3" />
          <h3 className="font-bold text-stone-900">
            {isAs ? "কোনো উপচাৰ পোৱা নগ'ল" : "No remedies match this filter"}
          </h3>
          <p className="text-xs text-stone-500 mt-1">
            {isAs
              ? "সকলো উপচাৰ চাবলৈ ফিল্টাৰ আঁতৰাওক।"
              : "Try viewing all remedies or adding more ingredients to your pantry."}
          </p>
          <button
            onClick={() => setFilterMode("all")}
            className="mt-4 px-4 py-2 bg-amber-700 text-onbrand rounded-xl text-xs font-semibold"
          >
            {isAs ? "সকলো উপচাৰ দেখুৱাওক" : "Show All Remedies"}
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filtered.map(({ remedy, score }) => {
            const saved = mounted && isSaved(remedy.id);
            const rTitle = isAs
              ? remedy.name_assamese || extractString(remedy.name)
              : extractString(remedy.name);
            const rSecondary = isBi ? remedy.name_assamese : undefined;
            const cultText = getLocalizedText(remedy.culturalContext, currentMode);

            return (
              <div
                key={remedy.id}
                className="bg-white rounded-3xl p-6 sm:p-7 border border-amber-200/80 shadow-xs hover:shadow-lg transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Status header badge */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span
                      className={`text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full ${
                        score.status === "ready"
                          ? "bg-emerald-100 text-emerald-900 border border-emerald-300"
                          : score.status === "missing_one"
                          ? "bg-amber-100 text-amber-900 border border-amber-300"
                          : "bg-stone-100 text-stone-700 border border-stone-200"
                      }`}
                    >
                      {score.status === "ready"
                        ? isAs
                          ? "✓ তৈয়াৰ কৰিবলৈ সাজু (১০০%)"
                          : "✓ Ready to Make (100%)"
                        : score.status === "missing_one"
                        ? isAs
                          ? "⚠️ কেৱল ১টা উপাদান বাকী"
                          : "⚠️ Missing 1 ingredient"
                        : isAs
                        ? `${score.percentage}% উপাদান মজুত আছে`
                        : `${score.percentage}% match`}
                    </span>

                    <button
                      onClick={() => toggleSaved(remedy.id)}
                      className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-50 transition"
                      title={saved ? "Saved" : "Save this remedy"}
                    >
                      <Bookmark
                        className={`w-4 h-4 ${saved ? "fill-red-600 text-red-600" : ""}`}
                      />
                    </button>
                  </div>

                  <h3 className="text-lg sm:text-xl font-serif font-bold text-stone-900">
                    {rTitle}
                  </h3>
                  {rSecondary && (
                    <div className="text-xs sm:text-sm font-semibold text-emerald-800 mt-0.5">
                      {rSecondary}
                    </div>
                  )}

                  <div className="flex items-center gap-3 text-xs text-stone-500 mt-2 font-medium">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-amber-700" />
                      ~{remedy.prepTimeMinutes} {isAs ? "মিনিট" : "mins"}
                    </span>
                    <span>•</span>
                    <span>{remedy.difficulty || "Easy"}</span>
                  </div>

                  <p className="text-xs text-stone-600 mt-3 line-clamp-2 leading-relaxed">
                    {cultText}
                  </p>

                  {/* Pantry match breakdown */}
                  <div className="mt-4 pt-4 border-t border-stone-100 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-stone-700">
                        {isAs ? "উপাদানৰ অৱস্থা:" : "Ingredients Status:"}
                      </span>
                      <span className="text-stone-500">
                        {score.matchedCount} / {score.totalIngredients} {isAs ? "মজুত" : "in pantry"}
                      </span>
                    </div>

                    {/* Progress bar */}
                    <div className="w-full bg-stone-100 rounded-full h-2 overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-300 ${
                          score.status === "ready"
                            ? "bg-emerald-600"
                            : score.status === "missing_one"
                            ? "bg-amber-600"
                            : "bg-stone-400"
                        }`}
                        style={{ width: `${score.percentage}%` }}
                      />
                    </div>

                    {/* Missing items pill callout */}
                    {score.missingIngredients.length > 0 && (
                      <div className="text-[11px] text-amber-900 bg-amber-50/80 p-2 rounded-xl border border-amber-200/80 flex items-start gap-1.5 mt-2">
                        <AlertCircle className="w-3.5 h-3.5 text-amber-700 shrink-0 mt-0.5" />
                        <div>
                          <span className="font-semibold">{isAs ? "প্ৰয়োজনীয় মছলা:" : "Need to get:"} </span>
                          <span>{score.missingIngredients.join(", ")}</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-stone-100 flex items-center justify-between">
                  <Link
                    href={`/remedy/${remedy.id}`}
                    className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-amber-700 hover:bg-amber-800 text-onbrand text-xs font-bold transition shadow-xs"
                  >
                    <span>{isAs ? "সম্পূৰ্ণ প্ৰস্তুত প্ৰণালী চাওক" : "View Step-by-Step Recipe"}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
