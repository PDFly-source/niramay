"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { SYMPTOM_CATEGORIES, symptomCategories } from "@/lib/data/symptoms";
import { REMEDIES } from "@/lib/data/remedies";
import { useNiramayStore } from "@/lib/store";
import { useMounted } from "@/hooks/useMounted";
import { extractString } from "@/lib/utils";
import { UI_TRANSLATIONS, getLocalizedText } from "@/lib/i18n";
import { searchRemedies, getDidYouMean } from "@/lib/search";
import {
  Search,
  ArrowRight,
  Flame,
  Wind,
  ThermometerSnowflake,
  Brain,
  Sparkles,
  Activity,
  Thermometer,
  RefreshCw,
  Compass,
  Bone,
  HeartPulse,
  Moon,
  Sun,
  ShieldCheck,
  AlertTriangle,
  X,
  SlidersHorizontal,
  Eye,
  Droplet,
  CloudRain,
  ShieldAlert,
} from "lucide-react";

const iconMap: Record<string, React.ElementType> = {
  Flame,
  ThermometerSnowflake,
  Wind,
  Brain,
  Sparkles,
  Activity,
  Thermometer,
  RefreshCw,
  Compass,
  Bone,
  HeartPulse,
  Moon,
  Sun,
  ShieldCheck,
  Eye,
  Droplet,
  CloudRain,
  ShieldAlert,
};

export default function SymptomsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  // Honor ?category= deep-links (e.g. from the Interactive Body Map on Home).
  useEffect(() => {
    const param = new URLSearchParams(window.location.search).get("category");
    if (param && symptomCategories.some((c) => c.id === param)) {
      // One-time deep-link sync; the URL is only readable post-hydration.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSelectedCategory(param);
    }
  }, []);
  const { languageMode } = useNiramayStore();
  const mounted = useMounted();

  const currentMode = mounted ? languageMode : "bilingual";
  const isEn = currentMode === "en";
  const isAs = currentMode === "as";
  const isBi = currentMode === "bilingual";

  const categoriesWithCounts = useMemo(() => {
    return [
      {
        id: "all",
        label: isAs ? "সকলো লক্ষণ" : isEn ? "All Symptoms" : "All Symptoms / সকলো",
        count: SYMPTOM_CATEGORIES.length,
      },
      ...symptomCategories.map((g) => ({
        id: g.id,
        label: isAs ? g.label_assamese || g.label : isEn ? g.label : `${g.label} (${g.label_assamese || ""})`,
        count: g.symptoms.length,
        description: isAs ? g.description_assamese || g.description : g.description,
      })),
    ];
  }, [isAs, isEn]);

  const activeGroup = useMemo(() => {
    return symptomCategories.find((g) => g.id === selectedCategory);
  }, [selectedCategory]);

  const didYouMean = useMemo(() => {
    return getDidYouMean(searchTerm);
  }, [searchTerm]);

  const filteredSymptoms = useMemo(() => {
    const q = searchTerm.toLowerCase().trim();
    if (!q) {
      if (selectedCategory === "all") return SYMPTOM_CATEGORIES;
      return SYMPTOM_CATEGORIES.filter((cat) => cat.categoryId === selectedCategory);
    }

    // 1. Fuzzy match via Fuse.js (Feature 1)
    const fuzzyResults = searchRemedies(q, { threshold: 0.42, limit: 30 });
    const matchedSlugs = new Set(
      fuzzyResults.map((r) => r.remedy.symptomSlug).filter(Boolean)
    );

    return SYMPTOM_CATEGORIES.filter((cat) => {
      // Category filter
      if (selectedCategory !== "all" && cat.categoryId !== selectedCategory) {
        return false;
      }

      // If matched fuzzy search
      if (matchedSlugs.has(cat.slug)) return true;

      const titleMatch = cat.title.toLowerCase().includes(q);
      const assameseMatch = cat.assameseTitle.toLowerCase().includes(q);
      const descMatch = cat.description.toLowerCase().includes(q);
      const spiceMatch = cat.commonSpices.some((s) => s.toLowerCase().includes(q));

      return titleMatch || assameseMatch || descMatch || spiceMatch;
    });
  }, [searchTerm, selectedCategory]);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
      {/* Header */}
      <div className="max-w-3xl mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider mb-3">
          <SlidersHorizontal className="w-3.5 h-3.5 text-amber-700" />
          <span>
            {isAs
              ? `মুঠ ${SYMPTOM_CATEGORIES.length}টা লক্ষণৰ সূচী`
              : `Complete ${SYMPTOM_CATEGORIES.length}-Symptom Directory`}
          </span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-serif font-black text-stone-900 tracking-tight">
          {isAs ? "আপোনাৰ সমস্যা বাছনি কৰক" : "Select Your Ailment"}
        </h1>
        <p className="text-base sm:text-lg text-stone-600 mt-2 leading-relaxed">
          {isAs
            ? "প্ৰামাণিক অসমীয়া আৰু আয়ুৰ্বেদিক ঘৰুৱা চিকিৎসাৰ সবিশেষ জানক। তলত এটা সমস্যা নিৰ্বাচন কৰক আৰু আপোনাৰ ঘৰত থকা মছলা পৰীক্ষা কৰি সুৰক্ষিত উপচাৰ প্ৰস্তুত কৰক।"
            : "Explore authentic Ayurvedic & Assamese kitchen preparations. Choose an ailment below to check your available spices and receive safe, dosage-tested remedies."}
        </p>

        {/* Search Input */}
        <div className="relative mt-6 max-w-xl">
          <Search className="w-5 h-5 text-amber-700 absolute left-4 top-3.5" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={
              isAs
                ? "লক্ষণ বা মছলাৰ নামেৰে সন্ধান কৰক (যেনে- কাহ, অমলপিত্ত, তুলসী)..."
                : isEn
                ? "Search by ailment, spice (e.g. Tulsi, Ginger), or name..."
                : "Search by ailment or spice / ৰোগ বা মছলা সন্ধান কৰক..."
            }
            className="w-full pl-12 pr-10 py-3 rounded-2xl bg-white border-2 border-amber-200 focus:border-amber-600 focus:ring-4 focus:ring-amber-500/20 text-stone-900 text-sm outline-none transition shadow-xs"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="absolute right-3.5 top-3.5 text-stone-400 hover:text-stone-700 p-0.5 rounded-full hover:bg-stone-100"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Feature 1: Did You Mean Suggestion */}
        {didYouMean && (
          <div className="mt-2.5 text-xs flex items-center gap-1.5 text-stone-600 animate-in fade-in">
            <span className="text-amber-800 font-semibold">
              {isAs ? "আপুনি এইটো বিচাৰিছে নেকি?" : "Did you mean:"}
            </span>
            <button
              onClick={() => setSearchTerm(isAs ? didYouMean.as : didYouMean.en)}
              className="text-amber-800 underline font-bold hover:text-amber-950 cursor-pointer bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200"
            >
              {isAs ? didYouMean.as : didYouMean.en}
            </button>
          </div>
        )}
      </div>

      {/* Category Pills Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none no-scrollbar">
        {categoriesWithCounts.map((cat) => {
          const isSelected = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`whitespace-nowrap px-4 py-2 rounded-2xl text-xs sm:text-sm font-semibold transition shrink-0 flex items-center gap-2 cursor-pointer ${
                isSelected
                  ? "bg-amber-700 text-white shadow-sm ring-2 ring-amber-600/30"
                  : "bg-white text-stone-700 border border-stone-200 hover:border-amber-300 hover:bg-amber-50/50"
              }`}
            >
              <span>{cat.label}</span>
              <span
                className={`text-[11px] px-1.5 py-0.2 rounded-full font-bold ${
                  isSelected ? "bg-amber-800 text-amber-100" : "bg-stone-100 text-stone-500"
                }`}
              >
                {cat.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Selected Category Header Banner (if filtered) */}
      {activeGroup && (
        <div className="mb-6 p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 flex items-start gap-3 animate-in fade-in">
          <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0 mt-0.5 font-bold">
            🌿
          </div>
          <div>
            <div className="text-xs font-bold text-amber-900 uppercase tracking-wide">
              {isAs ? activeGroup.label_assamese || activeGroup.label : activeGroup.label}
            </div>
            <p className="text-xs text-stone-700 mt-0.5 leading-relaxed">
              {isAs
                ? activeGroup.description_assamese || activeGroup.description
                : activeGroup.description}
            </p>
          </div>
        </div>
      )}

      {/* Grid of Symptoms */}
      {filteredSymptoms.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-3xl border border-stone-200 p-8 max-w-md mx-auto">
          <AlertTriangle className="w-12 h-12 text-amber-600 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-stone-900">
            {isAs ? "কোনো লক্ষণ পোৱা নগ'ল" : "No symptoms found"}
          </h3>
          <p className="text-xs text-stone-600 mt-1">
            {isAs
              ? `"${searchTerm}" ৰ বাবে কোনো লক্ষণ পোৱা নগ'ল। বেলেগ শব্দেৰে চেষ্টা কৰক।`
              : `No ailment matching "${searchTerm}". Try checking your spelling or clearing filters.`}
          </p>
          <button
            onClick={() => {
              setSearchTerm("");
              setSelectedCategory("all");
            }}
            className="mt-4 px-4 py-2 rounded-xl bg-amber-700 text-white text-xs font-semibold hover:bg-amber-800 transition"
          >
            {isAs ? "ফিল্টাৰ ৰিছেট কৰক" : "Reset Filters"}
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredSymptoms.map((symptom) => {
            const Icon = iconMap[symptom.iconName] || Activity;
            const categoryRemediesCount = REMEDIES.filter(
              (r) => r.symptomSlug === symptom.slug
            ).length;

            const cardTitle = isAs ? symptom.assameseTitle : symptom.title;
            const cardSecondary = isBi ? symptom.assameseTitle : undefined;

            return (
              <Link
                key={symptom.slug}
                href={`/symptoms/${symptom.slug}`}
                className="group relative bg-white hover:bg-[#FFFDF9] rounded-3xl p-6 border border-stone-200 hover:border-amber-500 shadow-2xs hover:shadow-xl transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-amber-100 group-hover:bg-amber-600 text-amber-800 group-hover:text-white flex items-center justify-center transition-colors">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-bold text-amber-900 bg-amber-50 border border-amber-200/80 px-2.5 py-1 rounded-full">
                      {categoryRemediesCount} {isAs ? "উপচাৰ" : "Remedies"}
                    </span>
                  </div>

                  <h3 className="text-lg font-serif font-bold text-stone-900 group-hover:text-amber-800 transition">
                    {cardTitle}
                  </h3>
                  {cardSecondary && (
                    <div className="text-xs font-semibold text-emerald-800 mt-0.5">
                      {cardSecondary}
                    </div>
                  )}

                  <p className="text-xs text-stone-600 mt-2 line-clamp-2 leading-relaxed">
                    {symptom.description}
                  </p>

                  {/* Common Spices Preview */}
                  <div className="mt-4 pt-3 border-t border-stone-100 flex flex-wrap gap-1.5">
                    {symptom.commonSpices.slice(0, 3).map((sp) => (
                      <span
                        key={sp}
                        className="text-[10px] font-medium bg-stone-100 text-stone-700 px-2 py-0.5 rounded-md"
                      >
                        {sp.split("(")[0].trim()}
                      </span>
                    ))}
                    {symptom.commonSpices.length > 3 && (
                      <span className="text-[10px] text-stone-400 self-center">
                        +{symptom.commonSpices.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                <div className="mt-6 pt-3 flex items-center justify-between text-xs font-bold text-amber-800 group-hover:text-amber-700">
                  <span>{isAs ? "পাকঘৰৰ মছলা পৰীক্ষা কৰক" : "Check kitchen ingredients"}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
