"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SymptomCategory, Remedy } from "@/lib/schema";
import { useNiramayStore } from "@/lib/store";
import { useMounted } from "@/hooks/useMounted";
import { calculateRemedyMatch, extractString } from "@/lib/utils";
import { SpiceIcon } from "@/components/brand/SpiceIcon";
import { getLocalizedText, UI_TRANSLATIONS } from "@/lib/i18n";
import {
  Check,
  Sparkles,
  ArrowRight,
  AlertTriangle,
  ChevronLeft,
  RotateCcw,
  CheckCircle2,
  Clock,
  Plus,
} from "lucide-react";

interface Props {
  symptom: SymptomCategory;
  categoryRemedies: Remedy[];
}

export const IngredientCheckerClient: React.FC<Props> = ({
  symptom,
  categoryRemedies,
}) => {
  const router = useRouter();
  const mounted = useMounted();
  const { pantry, togglePantryItem, setAllCommonSpicesToPantry, clearPantry, languageMode } =
    useNiramayStore();

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

  const [customSpiceInput, setCustomSpiceInput] = useState("");

  // Extract all unique ingredients needed for this category's remedies
  const allNeededIngredients = Array.from(
    new Set(
      categoryRemedies.flatMap((r) =>
        r.ingredients.map((ing) => extractString(ing.item).split(",")[0].trim())
      )
    )
  );

  // Compute live match scores for all remedies in this category
  const scoredRemedies = categoryRemedies.map((remedy) => ({
    remedy,
    score: calculateRemedyMatch(remedy, activePantry),
  }));

  const readyToMake = scoredRemedies.filter((s) => s.score.status === "ready");
  const missingOne = scoredRemedies.filter(
    (s) => s.score.status === "missing_one"
  );
  const needMore = scoredRemedies.filter((s) => s.score.status === "need_more");

  const handleAddCustomSpice = (e: React.FormEvent) => {
    e.preventDefault();
    if (customSpiceInput.trim()) {
      togglePantryItem(customSpiceInput.trim());
      setCustomSpiceInput("");
    }
  };

  const symptomTitle = isAs ? symptom.assameseTitle : symptom.title;
  const symptomSecondary = isBi ? symptom.assameseTitle : undefined;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-14">
      {/* Back button */}
      <Link
        href="/symptoms"
        className="inline-flex items-center gap-1.5 text-xs font-bold text-stone-600 hover:text-amber-800 transition mb-6"
      >
        <ChevronLeft className="w-4 h-4" />
        <span>{isAs ? "সকলো লক্ষণলৈ উভতি যাওক" : "Back to all symptoms"}</span>
      </Link>

      {/* Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-amber-200/80 shadow-xs mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase tracking-wider font-bold text-amber-800 bg-amber-100 px-3 py-1 rounded-full">
                {isAs ? "মছলা পৰীক্ষক" : "Kitchen Ingredient Checker"}
              </span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-serif font-black text-stone-900 mt-2">
              {symptomTitle}
            </h1>
            {symptomSecondary && (
              <div className="text-sm font-bold text-emerald-800 mt-1">
                {symptomSecondary}
              </div>
            )}
            <p className="text-xs sm:text-sm text-stone-600 mt-2 max-w-2xl leading-relaxed">
              {isAs
                ? "আপোনাৰ পাকঘৰত বৰ্তমান থকা উপাদানসমূহত টিক মাৰক। নিৰাময়ে আপোনাক তৎক্ষণাত প্ৰস্তুত কৰিব পৰা সুৰক্ষিত উপচাৰসমূহ দেখুৱাই দিব।"
                : "Check the ingredients you currently have in your kitchen. Niramay will instantly filter safe home remedies you can brew right now."}
            </p>
          </div>

          {/* Live Readiness Counter Card */}
          <div className="bg-amber-50/90 rounded-2xl p-4 sm:p-5 border border-amber-200 shrink-0 text-center sm:text-left min-w-[240px]">
            <div className="text-xs font-bold uppercase tracking-wider text-amber-800 mb-1">
              {isAs ? "উপচাৰৰ প্ৰস্তুতি অৱস্থা" : "Kitchen Match Status"}
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-amber-700">
                {readyToMake.length}
              </span>
              <span className="text-xs text-stone-700 font-semibold">
                {isAs
                  ? `${categoryRemedies.length}টাৰ ভিতৰত সাজু`
                  : `of ${categoryRemedies.length} remedies ready right now`}
              </span>
            </div>
            {missingOne.length > 0 && (
              <div className="text-xs text-stone-600 mt-1">
                + <span className="font-bold text-stone-800">{missingOne.length}</span>{" "}
                {isAs ? "উপচাৰত কেৱল ১টা মছলা বাকী" : "remedies missing only 1 spice"}
              </div>
            )}
            <Link
              href={`/symptoms/${symptom.slug}/results`}
              className="mt-3.5 w-full inline-flex items-center justify-center gap-2 py-2 px-4 rounded-xl bg-amber-600 hover:bg-amber-700 text-onbrand text-xs font-bold transition shadow-xs"
            >
              <span>{isAs ? "উপচাৰসমূহ চাওক" : "View Ranked Results"}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Persistent Red Flag Warning Box */}
        <div className="mt-6 p-4 rounded-2xl bg-red-50 border border-red-200/90 text-red-900 text-xs sm:text-sm flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-red-700 shrink-0 mt-0.5" />
          <div>
            <strong className="font-bold">
              {isAs ? "জৰুৰী চিকিৎসা সতৰ্কবাণী:" : "Medical Red-Flag Notice:"}{" "}
            </strong>
            {isAs
              ? `ঘৰুৱা উপচাৰ বন্ধ কৰি জৰুৰীভাৱে হাস্পাতাললৈ যাওক যদি: ${symptom.redFlagsSummary}`
              : `Stop home treatment and seek emergency medical care if you experience: ${symptom.redFlagsSummary}`}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Cols: Interactive Kitchen Checklist */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-amber-200/80 shadow-xs">
            <div className="flex items-center justify-between pb-4 border-b border-stone-100 flex-wrap gap-2">
              <div>
                <h2 className="text-lg font-serif font-bold text-stone-900">
                  {isAs ? "আপোনাৰ ঘৰত কি কি মছলা আছে?" : "What spices do you have at home?"}
                </h2>
                <p className="text-xs text-stone-500">
                  {isAs
                    ? "পাকঘৰত মজুত থকা মছলাসমূহত টিপক:"
                    : "Tap to toggle spices in your kitchen pantry:"}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setAllCommonSpicesToPantry(allNeededIngredients)}
                  className="text-xs font-bold text-amber-800 hover:text-amber-900 bg-amber-50 hover:bg-amber-100 px-3 py-1.5 rounded-xl border border-amber-200 transition"
                >
                  {isAs ? "সকলো বাছক" : "Select All"}
                </button>
                <button
                  onClick={() => clearPantry()}
                  className="text-xs font-semibold text-stone-500 hover:text-stone-800 px-2 py-1.5 rounded-xl hover:bg-stone-100 transition"
                >
                  {isAs ? "মচক" : "Clear"}
                </button>
              </div>
            </div>

            {/* Checklist items */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-5">
              {allNeededIngredients.map((item) => {
                const isChecked = activePantry.some((p) => {
                  const cp = p.toLowerCase().trim();
                  const ci = item.toLowerCase().trim();
                  return ci.includes(cp) || cp.includes(ci);
                });

                return (
                  <button
                    key={item}
                    type="button"
                    onClick={() => togglePantryItem(item)}
                    className={`p-3.5 rounded-2xl border text-left flex items-center justify-between gap-3 transition-all cursor-pointer ${
                      isChecked
                        ? "bg-amber-50/90 border-amber-500 ring-1 ring-amber-500/20"
                        : "bg-white hover:bg-stone-50/70 border-stone-200 text-stone-700"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-amber-100/70 flex items-center justify-center shrink-0">
                        <SpiceIcon spiceName={item} size={22} />
                      </div>
                      <div>
                        <div className="text-xs sm:text-sm font-bold text-stone-900">
                          {item}
                        </div>
                        <div className="text-[10px] text-stone-500">
                          {isChecked
                            ? isAs
                              ? "পাকঘৰত মজুত আছে"
                              : "In your kitchen"
                            : isAs
                            ? "মজুত থাকিলে টিপক"
                            : "Tap if you have this"}
                        </div>
                      </div>
                    </div>

                    <div
                      className={`w-6 h-6 rounded-lg flex items-center justify-center transition-colors shrink-0 ${
                        isChecked
                          ? "bg-amber-600 text-onbrand"
                          : "border-2 border-stone-300"
                      }`}
                    >
                      {isChecked && <Check className="w-4 h-4 stroke-[3]" />}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Add Custom Spice Form */}
            <form
              onSubmit={handleAddCustomSpice}
              className="mt-6 pt-5 border-t border-stone-100 flex items-center gap-2"
            >
              <input
                type="text"
                value={customSpiceInput}
                onChange={(e) => setCustomSpiceInput(e.target.value)}
                placeholder={isAs ? "অন্য কোনো মছলা যোগ কৰক..." : "Add other custom ingredient or spice..."}
                className="flex-1 py-2 px-3.5 rounded-xl border border-stone-200 text-xs text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-amber-600"
              />
              <button
                type="submit"
                className="inline-flex items-center gap-1 py-2 px-3 rounded-xl bg-night-soft hover:bg-night text-onbrand text-xs font-semibold transition"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>{isAs ? "যোগ কৰক" : "Add"}</span>
              </button>
            </form>
          </div>
        </div>

        {/* Right Col: Instant Remedy Preview Cards */}
        <div className="space-y-4">
          <div className="flex items-center justify-between pb-2">
            <h3 className="text-sm font-serif font-bold text-stone-900">
              {isAs ? "উপচাৰসমূহৰ তালিকা" : "Matching Preparations"} ({categoryRemedies.length})
            </h3>
            <Link
              href={`/symptoms/${symptom.slug}/results`}
              className="text-xs font-semibold text-amber-800 hover:underline flex items-center gap-1"
            >
              <span>{isAs ? "সকলো চাওক" : "View All"}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-3">
            {scoredRemedies.map(({ remedy, score }) => {
              const rTitle = isAs
                ? remedy.name_assamese || extractString(remedy.name)
                : extractString(remedy.name);
              const rSecondary = isBi ? remedy.name_assamese : undefined;

              return (
                <Link
                  key={remedy.id}
                  href={`/remedy/${remedy.id}`}
                  className="block p-4 rounded-2xl bg-white hover:bg-amber-50/50 border border-stone-200 hover:border-amber-400 transition shadow-2xs group"
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md ${
                        score.status === "ready"
                          ? "bg-emerald-100 text-emerald-900"
                          : score.status === "missing_one"
                          ? "bg-amber-100 text-amber-900"
                          : "bg-stone-100 text-stone-600"
                      }`}
                    >
                      {score.status === "ready"
                        ? isAs
                          ? "তৈয়াৰ কৰিবলৈ সাজু"
                          : "Ready to Make"
                        : score.status === "missing_one"
                        ? isAs
                          ? "১টা মছলা বাকী"
                          : "Missing 1 Spice"
                        : isAs
                          ? "অধিক মছলা প্ৰয়োজন"
                          : "Need Ingredients"}
                    </span>
                    <span className="text-[11px] text-stone-400 flex items-center gap-1 font-medium">
                      <Clock className="w-3 h-3 text-amber-700" />
                      ~{remedy.prepTimeMinutes} {isAs ? "মিনিট" : "min"}
                    </span>
                  </div>

                  <h4 className="text-sm font-bold text-stone-900 group-hover:text-amber-800 transition">
                    {rTitle}
                  </h4>
                  {rSecondary && (
                    <div className="text-xs font-semibold text-emerald-800 mt-0.5">
                      {rSecondary}
                    </div>
                  )}

                  <div className="mt-3 flex items-center justify-between text-xs text-stone-500 pt-2 border-t border-stone-100">
                    <span>
                      {score.matchedCount} / {score.totalIngredients} {isAs ? "মজুত আছে" : "in pantry"}
                    </span>
                    <span className="font-semibold text-amber-800 group-hover:translate-x-1 transition flex items-center gap-1">
                      {isAs ? "প্ৰণালী চাওক" : "View Recipe"}
                      <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
