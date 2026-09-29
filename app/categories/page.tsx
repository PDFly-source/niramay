"use client";

import React, { useState } from "react";
import Link from "next/link";
import { SYMPTOM_CATEGORIES } from "@/lib/data/symptoms";
import { REMEDIES } from "@/lib/data/remedies";
import { useNiramayStore } from "@/lib/store";
import { useMounted } from "@/hooks/useMounted";
import {
  Layers,
  ArrowRight,
  Search,
  Activity,
  Heart,
  Flame,
  Droplet,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

export default function CategoriesPage() {
  const mounted = useMounted();
  const { languageMode } = useNiramayStore();
  const isAs = mounted && languageMode === "as";
  const [search, setSearch] = useState("");

  const filtered = SYMPTOM_CATEGORIES.filter((cat) => {
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    return (
      cat.title.toLowerCase().includes(q) ||
      cat.assameseTitle.toLowerCase().includes(q) ||
      cat.description.toLowerCase().includes(q) ||
      cat.commonSpices.some((s) => s.toLowerCase().includes(q))
    );
  });

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12 pb-24">
      {/* Header */}
      <div className="max-w-2xl mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold mb-2">
          <Layers className="w-3.5 h-3.5 text-amber-700" />
          <span>{isAs ? "লক্ষণ শ্ৰেণীবিভাজন" : "Symptom Categories"}</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-serif font-black text-stone-900">
          {isAs ? "সকলো ৰোগ আৰু লক্ষণৰ বিভাগ" : "Browse by Symptom Category"}
        </h1>
        <p className="text-xs sm:text-sm text-stone-600 mt-2 leading-relaxed">
          {isAs
            ? `মুঠ ${SYMPTOM_CATEGORIES.length}টা প্ৰধান বিভাগত ভাগ কৰা অসমীয়া আৰু ভাৰতীয় ঘৰুৱা উপচাৰ। আপোনাৰ সমস্যাৰ বিভাগটো বাছক আৰু সুৰক্ষিত প্ৰণালী অনুসৰণ কৰক।`
            : `Explore our organized categories spanning respiratory, digestion, pain relief, pediatric, and seasonal care. Each category features verified multi-step kitchen remedies with pediatric & adult dosages.`}
        </p>

        {/* Filter Input */}
        <div className="relative mt-5 max-w-md">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-3.5" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={
              isAs
                ? "বিভাগ বা লক্ষণ সন্ধান কৰক..."
                : "Search categories or ailments..."
            }
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-white border border-stone-200 text-stone-900 text-xs sm:text-sm focus:outline-none focus:border-amber-500 shadow-2xs"
          />
        </div>
      </div>

      {/* Grid of Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((cat) => {
          const remedyCount = REMEDIES.filter(
            (r) => r.symptomSlug === cat.slug
          ).length;

          return (
            <Link
              key={cat.slug}
              href={`/symptoms/${cat.slug}`}
              className="bg-white rounded-3xl p-6 border border-stone-200/90 hover:border-amber-400 hover:shadow-lg transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-900 border border-amber-200">
                    {remedyCount} {isAs ? "প্ৰামাণিক উপচাৰ" : "Remedies"}
                  </span>
                  <span className="text-xs font-semibold text-stone-400">
                    #{cat.categoryId}
                  </span>
                </div>

                <h3 className="text-lg font-serif font-bold text-stone-900 group-hover:text-amber-800 transition">
                  {isAs ? cat.assameseTitle : cat.title}
                </h3>
                {isAs ? (
                  <div className="text-xs font-medium text-stone-500 mt-0.5">
                    {cat.title}
                  </div>
                ) : (
                  <div className="text-xs font-semibold text-emerald-800 mt-0.5">
                    {cat.assameseTitle}
                  </div>
                )}

                <p className="text-xs text-stone-600 mt-3 line-clamp-2 leading-relaxed">
                  {cat.description}
                </p>

                {/* Common Spices Preview */}
                <div className="mt-4 pt-3 border-t border-stone-100 flex flex-wrap gap-1.5">
                  {cat.commonSpices.slice(0, 3).map((spice) => (
                    <span
                      key={spice}
                      className="text-[10px] bg-stone-100 text-stone-700 px-2 py-0.5 rounded-md"
                    >
                      {spice.split("(")[0].trim()}
                    </span>
                  ))}
                  {cat.commonSpices.length > 3 && (
                    <span className="text-[10px] text-stone-400 self-center">
                      +{cat.commonSpices.length - 3} {isAs ? "আৰু" : "more"}
                    </span>
                  )}
                </div>
              </div>

              <div className="mt-6 pt-3 border-t border-stone-100 flex items-center justify-between text-xs font-bold text-amber-800 group-hover:text-amber-700">
                <span>{isAs ? "উপচাৰসমূহ চাওক" : "View Remedies"}</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition" />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
