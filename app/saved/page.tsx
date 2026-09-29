"use client";

import React from "react";
import Link from "next/link";
import { REMEDIES } from "@/lib/data/remedies";
import { useNiramayStore } from "@/lib/store";
import { useMounted } from "@/hooks/useMounted";
import { SpiceIcon } from "@/components/brand/SpiceIcon";
import { extractString } from "@/lib/utils";
import { getLocalizedText } from "@/lib/i18n";
import {
  Bookmark,
  Trash2,
  Clock,
  ArrowRight,
  BookOpen,
  Layers,
} from "lucide-react";

export default function SavedRemediesPage() {
  const { savedRemedyIds, toggleSaved, languageMode } = useNiramayStore();
  const mounted = useMounted();

  const currentMode = mounted ? languageMode : "bilingual";
  const isEn = currentMode === "en";
  const isAs = currentMode === "as";
  const isBi = currentMode === "bilingual";

  if (!mounted) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-16 text-center text-stone-500">
        Loading saved remedies...
      </div>
    );
  }

  const savedRemedies = REMEDIES.filter((r) =>
    savedRemedyIds.includes(r.id)
  );

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-amber-200/80 mb-8">
        <div>
          <span className="text-xs uppercase tracking-wider font-bold text-amber-800 bg-amber-100 px-3 py-1 rounded-full">
            {isAs ? "আপোনাৰ ব্যক্তিগত সংকলন" : "Your Personal Apothecary"}
          </span>
          <h1 className="text-3xl sm:text-5xl font-serif font-black text-stone-900 mt-2">
            {isAs ? "সংৰক্ষিত ঘৰুৱা উপচাৰ" : "Saved Remedies"}
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 mt-1">
            {isAs
              ? "অফলাইন ব্যৱহাৰৰ বাবে আপোনাৰ ব্ৰাউজাৰৰ স্থানীয় সংগ্ৰহত সুৰক্ষিত কৰি ৰখা উপচাৰসমূহ।"
              : "Bookmarked kitchen preparations stored safely in your browser's local storage."}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold bg-amber-50 text-amber-800 px-3 py-1.5 rounded-xl border border-amber-200">
            {savedRemedies.length} {isAs ? "সংৰক্ষিত" : "Saved"}
          </span>
        </div>
      </div>

      {/* Empty State */}
      {savedRemedies.length === 0 ? (
        <div className="bg-white rounded-3xl p-10 sm:p-14 text-center border border-amber-200/80 shadow-xs max-w-lg mx-auto my-12">
          <div className="w-16 h-16 rounded-3xl bg-amber-100/80 text-amber-800 flex items-center justify-center mx-auto mb-5 shadow-xs">
            <Bookmark className="w-8 h-8 text-amber-700 stroke-[1.5]" />
          </div>
          <h2 className="text-xl font-serif font-bold text-stone-900">
            {isAs ? "কোনো সংৰক্ষিত উপচাৰ নাই" : "No saved remedies yet"}
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 mt-2 mb-8 leading-relaxed">
            {isAs
              ? `আমাৰ ${REMEDIES.length}+ ঘৰুৱা উপচাৰ বা লক্ষণ সূচীত চাওক আৰু যিকোনো কাৰ্ডৰ বুকমাৰ্ক বুটামত টিপি ইয়াত সাঁচি থওক।`
              : `Browse through our ${REMEDIES.length}+ kitchen remedies or symptom directory and tap the bookmark button on any remedy card to save it for quick offline access.`}
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <Link
              href="/symptoms"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-amber-600 hover:bg-amber-700 text-white text-xs sm:text-sm font-bold shadow-xs transition"
            >
              <Layers className="w-4 h-4" />
              <span>{isAs ? "লক্ষণ অনুসৰি চাওক" : "Browse by Symptom"}</span>
            </Link>
            <Link
              href="/knowledge-bank"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs sm:text-sm font-bold transition"
            >
              <BookOpen className="w-4 h-4" />
              <span>{isAs ? "জ্ঞান ভঁৰাল চাওক" : "Explore Knowledge Bank"}</span>
            </Link>
          </div>
        </div>
      ) : (
        /* Saved Remedies Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {savedRemedies.map((remedy) => {
            const rTitle = isAs
              ? remedy.name_assamese || extractString(remedy.name)
              : extractString(remedy.name);
            const rSecondary = isBi ? remedy.name_assamese : undefined;

            return (
              <div
                key={remedy.id}
                className="bg-white rounded-3xl p-6 border border-amber-200/80 shadow-xs hover:shadow-lg transition flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-2">
                      <SpiceIcon spiceName={remedy.primarySpice || "Ginger"} size={22} />
                      <span className="text-[11px] font-bold uppercase tracking-wider text-amber-800 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
                        {getLocalizedText(remedy.symptom, currentMode, remedy.symptom_assamese)}
                      </span>
                    </div>

                    <button
                      onClick={() => toggleSaved(remedy.id)}
                      className="p-1.5 rounded-lg text-stone-400 hover:text-red-600 hover:bg-red-50 transition"
                      title={isAs ? "সংৰক্ষণৰ পৰা আঁতৰাওক" : "Remove from saved"}
                      aria-label="Remove from saved"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <h3 className="text-lg font-serif font-bold text-stone-900 leading-snug">
                    {rTitle}
                  </h3>
                  {rSecondary && (
                    <div className="text-xs font-bold text-emerald-800 mt-0.5">
                      {rSecondary}
                    </div>
                  )}

                  <div className="flex items-center gap-1.5 text-xs text-stone-500 mt-2.5">
                    <Clock className="w-3.5 h-3.5 text-amber-700" />
                    <span>
                      {isAs ? "প্ৰস্তুত সময়:" : "Prep time:"} ~{remedy.prepTimeMinutes} {isAs ? "মিনিট" : "mins"}
                    </span>
                  </div>

                  {/* Ingredients snippet */}
                  <div className="mt-4 pt-3 border-t border-stone-100 flex flex-wrap gap-1.5">
                    {remedy.ingredients.slice(0, 3).map((ing, idx) => {
                      const rawItem = extractString(ing.item);
                      const displayItem = isAs ? ing.item_assamese || rawItem : rawItem;
                      return (
                        <span
                          key={idx}
                          className="text-[11px] bg-stone-100 text-stone-700 px-2 py-0.5 rounded-md"
                        >
                          {displayItem.split("(")[0].trim()}
                        </span>
                      );
                    })}
                    {remedy.ingredients.length > 3 && (
                      <span className="text-[10px] text-stone-400 self-center">
                        +{remedy.ingredients.length - 3} {isAs ? "আৰু" : "more"}
                      </span>
                    )}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-stone-100 flex items-center justify-between">
                  <Link
                    href={`/remedy/${remedy.id}`}
                    className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold transition shadow-xs group"
                  >
                    <span>{isAs ? "প্ৰস্তুত প্ৰণালী চাওক" : "View Preparation Guide"}</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
