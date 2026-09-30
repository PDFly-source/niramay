"use client";

import React, { useState } from "react";
import Link from "next/link";
import { REMEDIES } from "@/lib/data/remedies";
import { SYMPTOM_CATEGORIES } from "@/lib/data/symptoms";
import { SpiceIcon } from "@/components/brand/SpiceIcon";
import { useNiramayStore } from "@/lib/store";
import { useMounted } from "@/hooks/useMounted";
import { extractString } from "@/lib/utils";
import { getLocalizedText } from "@/lib/i18n";
import { searchRemedies, getDidYouMean } from "@/lib/search";
import {
  Search,
  BookOpen,
  Filter,
  Clock,
  ArrowRight,
  Bookmark,
  Sparkles,
  Info,
} from "lucide-react";

export default function KnowledgeBankPage() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedSpice, setSelectedSpice] = useState<string>("all");
  const { toggleSaved, isSaved, languageMode } = useNiramayStore();
  const mounted = useMounted();

  const currentMode = mounted ? languageMode : "bilingual";
  const isEn = currentMode === "en";
  const isAs = currentMode === "as";
  const isBi = currentMode === "bilingual";

  const keySpices = [
    "Ginger",
    "Tulsi",
    "Turmeric",
    "Ajwain",
    "Cumin",
    "Black pepper",
    "Clove",
    "Fennel",
    "Mint",
    "Garlic",
    "Lemon",
    "Honey",
  ];

  const didYouMean = React.useMemo(() => {
    return getDidYouMean(search);
  }, [search]);

  const filteredRemedies = React.useMemo(() => {
    let baseList = REMEDIES;

    // 1. Search query filter using Feature 1 Fuse.js fuzzy search
    if (search.trim()) {
      const fuzzyResults = searchRemedies(search, { threshold: 0.42, limit: 100 });
      baseList = fuzzyResults.map((r) => r.remedy);
    }

    return baseList.filter((remedy) => {
      // 2. Category filter
      if (selectedCategory !== "all" && remedy.symptomSlug !== selectedCategory) {
        return false;
      }

      // 3. Spice filter
      if (selectedSpice !== "all") {
        const matchSpice =
          (remedy.primarySpice &&
            remedy.primarySpice.toLowerCase().includes(selectedSpice.toLowerCase())) ||
          remedy.ingredients.some((i) =>
            extractString(i.item).toLowerCase().includes(selectedSpice.toLowerCase())
          );
        if (!matchSpice) return false;
      }

      return true;
    });
  }, [search, selectedCategory, selectedSpice]);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
      {/* Header */}
      <div className="max-w-3xl mb-8">
        <span className="text-xs uppercase tracking-wider font-bold text-amber-800 bg-amber-100 px-3 py-1 rounded-full">
          {isAs ? "পৰম্পৰাগত জ্ঞান সংকলন" : "Traditional Living Archive"}
        </span>
        <h1 className="text-3xl sm:text-5xl font-serif font-black text-stone-900 mt-2">
          {isAs ? "পৰম্পৰাগত জ্ঞান ভঁৰাল" : "Traditional Knowledge Bank"}
        </h1>
        <p className="text-sm sm:text-base text-stone-600 mt-2 leading-relaxed">
          {isAs
            ? `মুঠ ${REMEDIES.length}+ প্ৰামাণিক অসমীয়া আৰু ভাৰতীয় ঘৰুৱা উপচাৰৰ সংকলন। লক্ষণ অনুসৰি বাছনি কৰক, মছলা অনুসৰি বিচাৰক বা নিৰ্দিষ্ট চিকিৎসা সন্ধান কৰক।`
            : `Explore our complete reference archive of ${REMEDIES.length}+ authentic Assamese and Indian kitchen remedies. Filter by ailment, browse by kitchen spice, or search specific medicinal preparations.`}
        </p>

        {/* Search bar */}
        <div className="relative mt-6 max-w-xl">
          <Search className="w-5 h-5 text-amber-700 absolute left-4 top-3.5" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={
              isAs
                ? "মছলা, উপচাৰ বা লক্ষণৰ নামেৰে সন্ধান কৰক..."
                : isEn
                ? "Search by ingredient, remedy name, or symptom..."
                : "Search by ingredient, remedy or symptom / সন্ধান কৰক..."
            }
            className="w-full pl-12 pr-4 py-3 rounded-2xl bg-white border-2 border-amber-200 focus:border-amber-600 focus:ring-4 focus:ring-amber-500/20 text-stone-900 text-sm outline-none transition shadow-xs"
          />
        </div>

        {/* Feature 1: Did You Mean Suggestion */}
        {didYouMean && (
          <div className="mt-2.5 text-xs flex items-center gap-1.5 text-stone-600">
            <span className="text-amber-800 font-semibold">
              {isAs ? "আপুনি এইটো বিচাৰিছে নেকি?" : "Did you mean:"}
            </span>
            <button
              onClick={() => setSearch(isAs ? didYouMean.as : didYouMean.en)}
              className="text-amber-800 underline font-bold hover:text-amber-950 cursor-pointer bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200"
            >
              {isAs ? didYouMean.as : didYouMean.en}
            </button>
          </div>
        )}
      </div>

      {/* Filters Section */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-amber-200/80 shadow-xs mb-8 space-y-4">
        {/* Spice Filter Chips */}
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-stone-500 block mb-2">
            {isAs ? "মছলা অনুসৰি বাছক:" : "Filter by Spice:"}
          </span>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedSpice("all")}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold transition ${
                selectedSpice === "all"
                  ? "bg-amber-700 text-onbrand"
                  : "bg-stone-100 text-stone-700 hover:bg-stone-200"
              }`}
            >
              {isAs ? "সকলো মছলা" : "All Spices"}
            </button>
            {keySpices.map((spice) => {
              const active = selectedSpice.toLowerCase() === spice.toLowerCase();
              return (
                <button
                  key={spice}
                  onClick={() => setSelectedSpice(active ? "all" : spice)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition ${
                    active
                      ? "bg-amber-700 text-onbrand ring-2 ring-amber-600/30"
                      : "bg-parchment border border-amber-200 text-stone-800 hover:bg-amber-100/50"
                  }`}
                >
                  <SpiceIcon spiceName={spice} size={16} />
                  <span>{spice}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Category Filter Dropdown */}
        <div className="pt-3 border-t border-stone-100 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2 min-w-0">
            <Filter className="w-4 h-4 text-stone-500 shrink-0" />
            <span className="text-xs font-bold text-stone-700">
              {isAs ? "লক্ষণৰ শ্ৰেণী:" : "Ailment Category:"}
            </span>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="min-w-0 max-w-[60vw] sm:max-w-xs truncate text-xs bg-stone-100 border border-stone-200 rounded-xl px-3 py-1.5 font-semibold text-stone-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
            >
              <option value="all">
                {isAs ? "সকলো লক্ষণ" : "All Categories"} ({REMEDIES.length})
              </option>
              {SYMPTOM_CATEGORIES.map((cat) => {
                const count = REMEDIES.filter((r) => r.symptomSlug === cat.slug).length;
                const label = isAs ? cat.assameseTitle : cat.title;
                return (
                  <option key={cat.slug} value={cat.slug}>
                    {label} ({count})
                  </option>
                );
              })}
            </select>
          </div>

          <div className="text-xs text-stone-500">
            {isAs
              ? `${filteredRemedies.length}টা উপচাৰ উপলব্ধ`
              : `Showing ${filteredRemedies.length} of ${REMEDIES.length} remedies`}
          </div>
        </div>
      </div>

      {/* Grid of Remedy Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRemedies.map((remedy) => {
          const saved = mounted && isSaved(remedy.id);
          const rTitle = isAs
            ? remedy.name_assamese || extractString(remedy.name)
            : extractString(remedy.name);
          const rSecondary = isBi ? remedy.name_assamese : undefined;
          const cultText = getLocalizedText(remedy.culturalContext, currentMode);

          return (
            <div
              key={remedy.id}
              className="bg-white rounded-3xl p-6 border border-stone-200/90 hover:border-amber-400 hover:shadow-lg transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-900 border border-amber-200">
                    {getLocalizedText(remedy.symptom, currentMode, remedy.symptom_assamese)}
                  </span>
                  <button
                    onClick={() => toggleSaved(remedy.id)}
                    className="p-1 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-50 transition"
                    title={saved ? "Saved" : "Save this remedy"}
                  >
                    <Bookmark
                      className={`w-4 h-4 ${saved ? "fill-red-600 text-red-600" : ""}`}
                    />
                  </button>
                </div>

                <h3 className="text-lg font-serif font-bold text-stone-900 group-hover:text-amber-800 transition">
                  {rTitle}
                </h3>
                {rSecondary && (
                  <div className="text-xs font-semibold text-emerald-800 mt-0.5">
                    {rSecondary}
                  </div>
                )}

                <div className="flex items-center gap-3 text-xs text-stone-400 mt-2 font-medium">
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

                {/* Ingredients Pills */}
                <div className="mt-4 pt-3 border-t border-stone-100 flex flex-wrap gap-1.5">
                  {remedy.ingredients.slice(0, 3).map((ing, idx) => {
                    const rawItem = extractString(ing.item);
                    const itemDisplay = isAs ? ing.item_assamese || rawItem : rawItem;
                    return (
                      <span
                        key={idx}
                        className="text-[10px] bg-stone-100 text-stone-700 px-2 py-0.5 rounded-md"
                      >
                        {itemDisplay.split("(")[0].trim()}
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
                  className="w-full inline-flex items-center justify-center gap-2 py-2 px-4 rounded-xl bg-amber-50 group-hover:bg-amber-700 text-amber-900 group-hover:text-onbrand text-xs font-bold transition"
                >
                  <span>{isAs ? "সবিশেষ প্ৰণালী আৰু মাত্ৰা" : "View Full Recipe & Dosages"}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
