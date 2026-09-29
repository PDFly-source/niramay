"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useNiramayStore } from "@/lib/store";
import { useMounted } from "@/hooks/useMounted";
import { ASSAMESE_MEDICINAL_PLANTS } from "@/lib/plantLibrary";
import { REMEDIES } from "@/lib/data/remedies";
import {
  BookOpen,
  Search,
  Leaf,
  Sprout,
  Calendar,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Bookmark,
  CheckCircle2,
  Filter,
} from "lucide-react";
import { extractString } from "@/lib/utils";

type LibraryFilter = "all" | "remedies" | "plants" | "garden" | "seasonal" | "habits";

export default function LibraryPage() {
  const mounted = useMounted();
  const { languageMode, isSaved, toggleSaved } = useNiramayStore();
  const isAs = mounted && languageMode === "as";
  const [activeFilter, setActiveFilter] = useState<LibraryFilter>("all");
  const [query, setQuery] = useState("");

  const filterTabs: { id: LibraryFilter; labelEn: string; labelAs: string }[] = [
    { id: "all", labelEn: "All Content", labelAs: "সকলো সংকলন" },
    { id: "remedies", labelEn: "Kitchen Remedies", labelAs: "ঘৰুৱা উপচাৰ" },
    { id: "plants", labelEn: "Medicinal Plants (52+)", labelAs: "বনৌষধি (৫২+)" },
    { id: "garden", labelEn: "Kitchen Garden", labelAs: "বাৰীৰ বনৌষধি" },
    { id: "seasonal", labelEn: "Ritucharya Guides", labelAs: "ঋতুচৰ্যা" },
    { id: "habits", labelEn: "Daily Habits", labelAs: "দিনচৰ্যা" },
  ];

  // Curated featured educational reads
  const featuredGuides = [
    {
      id: "fg_ritucharya",
      tag: "Seasonal Guide",
      tagAs: "ঋতুচৰ্যা",
      titleEn: "Ritucharya: Living in Harmony with Assam's Six Seasons",
      titleAs: "ঋতুচৰ্যা: অসমৰ ৬টা ঋতু আৰু পৰম্পৰাগত পথ্য",
      descEn: "Traditional guidelines on diet, bitter tonics (তিতাপাত), and disease prevention throughout the year.",
      descAs: "ব'হাগত তিতা আৰু জেঠত টেঙাৰ পৰম্পৰাগত নিয়ম আৰু ডাকৰ বচন।",
      href: "/ritucharya",
      color: "from-amber-700 to-emerald-800",
    },
    {
      id: "fg_garden",
      tag: "Backyard Cultivation",
      tagAs: "বাৰীৰ বনৌষধি",
      titleEn: "Assamese Grandmother's Backyard Herb Cultivation Guide",
      titleAs: "আইতাৰ দিহা: বাৰীৰ চুকত বনৌষধি ৰোপণ আৰু জৈৱিক সাৰ",
      descEn: "Growing Tulsi, Manimuni, Tengesi, and Pasotia in pots or dooryard mounds with zero chemical pesticides.",
      descAs: "তুলসীৰ ভেটি, মানিমুনিৰ সেমেকা মাটি আৰু পচতীয়াৰ যত্নৰ ব্যৱহাৰিক নিৰ্দেশনা।",
      href: "/kitchen-garden",
      color: "from-emerald-500 to-emerald-700",
    },
    {
      id: "fg_habits",
      tag: "Daily Wellness",
      tagAs: "দিনচৰ্যা",
      titleEn: "Assamese Dinacharya: Daily Rituals for Strong Gut & Immunity",
      titleAs: "অসমীয়া দিনচৰ্যা: সুস্থ পেট আৰু প্ৰতিৰোধ ক্ষমতাৰ নিতৌ নিয়ম",
      descEn: "Warm water ritual (Ushnodaka), tongue scraping, and post-dinner 100-step stroll (Shatapadi).",
      descAs: "কুহুমীয়া পানী, জিভা পৰিষ্কাৰ আৰু নিশাচৰ্যাৰ ফলপ্ৰসূ দৈনন্দিন অভ্যাস।",
      href: "/daily-habits",
      color: "from-amber-500 to-amber-700",
    },
  ];

  const cleanQ = query.trim().toLowerCase();

  // Filtered plant items
  const matchedPlants = ASSAMESE_MEDICINAL_PLANTS.filter((p) => {
    if (activeFilter !== "all" && activeFilter !== "plants") return false;
    if (!cleanQ) return true;
    return (
      p.nameEn.toLowerCase().includes(cleanQ) ||
      p.nameAs.toLowerCase().includes(cleanQ) ||
      p.botanicalName.toLowerCase().includes(cleanQ) ||
      p.family.toLowerCase().includes(cleanQ)
    );
  });

  // Filtered remedy items
  const matchedRemedies = REMEDIES.filter((r) => {
    if (activeFilter !== "all" && activeFilter !== "remedies") return false;
    if (!cleanQ) return true;
    const nameStr = extractString(r.name).toLowerCase();
    const symStr = extractString(r.symptom).toLowerCase();
    return (
      nameStr.includes(cleanQ) ||
      r.name_assamese.toLowerCase().includes(cleanQ) ||
      symStr.includes(cleanQ)
    );
  });

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12 pb-24">
      {/* Header */}
      <div className="max-w-2xl mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold mb-2">
          <BookOpen className="w-3.5 h-3.5 text-amber-700" />
          <span>{isAs ? "জ্ঞান ভঁৰাল আৰু উদ্ভিদকোষ" : "Living Reference Library"}</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-serif font-black text-stone-900">
          {isAs ? "নিৰাময় জ্ঞানকোষ আৰু মাৰ্গদৰ্শিকা" : "Niramay Knowledge Hub"}
        </h1>
        <p className="text-xs sm:text-sm text-stone-600 mt-2 leading-relaxed">
          {isAs
            ? "৫২+ থলুৱা বনৌষধি, ৮০+ প্ৰামাণিক পাকঘৰৰ উপচাৰ, বাৰীৰ বাগিচা নিৰ্দেশনা আৰু ঋতুচৰ্যা পথ্যৰ এটা কেন্দ্ৰীভূত সংগ্ৰহালয়।"
            : "A centralized, browsable library uniting 52+ verified medicinal plants, 80+ kitchen remedies, back-yard gardening guides, and seasonal living archives."}
        </p>

        {/* Search Bar */}
        <div className="relative mt-5 max-w-md">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-3.5" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={
              isAs
                ? "উদ্ভিদ, মছলা, উপচাৰ বা পথ্য সন্ধান কৰক..."
                : "Search plants, remedies, spices or seasonal guides..."
            }
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-white border border-stone-200 text-stone-900 text-xs sm:text-sm focus:outline-none focus:border-amber-500 shadow-2xs"
          />
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-8 no-scrollbar">
        {filterTabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveFilter(tab.id)}
            className={`whitespace-nowrap px-4 py-2 rounded-2xl text-xs font-bold transition shrink-0 ${
              activeFilter === tab.id
                ? "bg-amber-800 text-onbrand shadow-xs"
                : "bg-white text-stone-700 border border-stone-200 hover:bg-amber-50"
            }`}
          >
            {isAs ? tab.labelAs : tab.labelEn}
          </button>
        ))}
      </div>

      {/* Section 1: Featured In-Depth Educational Guides */}
      {(activeFilter === "all" || activeFilter === "seasonal" || activeFilter === "garden" || activeFilter === "habits") && !cleanQ && (
        <div className="mb-12">
          <h2 className="text-base sm:text-lg font-serif font-black text-stone-900 mb-4 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-700" />
            <span>{isAs ? "বিশেষ মাৰ্গদৰ্শিকা আৰু আলেখ্য" : "Featured Living Guides"}</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {featuredGuides.map((guide) => (
              <Link
                key={guide.id}
                href={guide.href}
                className="bg-white rounded-3xl p-6 border border-amber-200/80 hover:border-amber-400 hover:shadow-lg transition-all flex flex-col justify-between group"
              >
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-900 border border-amber-200 mb-3 inline-block">
                    {isAs ? guide.tagAs : guide.tag}
                  </span>
                  <h3 className="text-base font-serif font-bold text-stone-900 group-hover:text-amber-800 transition leading-snug">
                    {isAs ? guide.titleAs : guide.titleEn}
                  </h3>
                  <p className="text-xs text-stone-600 mt-2 line-clamp-3 leading-relaxed">
                    {isAs ? guide.descAs : guide.descEn}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-stone-100 flex items-center justify-between text-xs font-bold text-amber-800 group-hover:text-amber-700">
                  <span>{isAs ? "সম্পূৰ্ণ পঢ়ক" : "Read Full Guide"}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Section 2: Medicinal Plants Archive */}
      {(activeFilter === "all" || activeFilter === "plants") && matchedPlants.length > 0 && (
        <div className="mb-12">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base sm:text-lg font-serif font-black text-stone-900 flex items-center gap-2">
              <Leaf className="w-4 h-4 text-emerald-700" />
              <span>{isAs ? "থলুৱা বনৌষধি সংকলন" : "Indigenous Medicinal Plants"}</span>
              <span className="text-xs font-normal text-stone-500">
                ({matchedPlants.length} {isAs ? "বিধ" : "species"})
              </span>
            </h2>
            <Link
              href="/plant-scanner"
              className="text-xs font-bold text-emerald-800 hover:text-emerald-950 flex items-center gap-1"
            >
              <span>{isAs ? "পাত স্কেন কৰক" : "Scan Leaf"}</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {matchedPlants.slice(0, activeFilter === "plants" ? 52 : 6).map((plant) => (
              <Link
                key={plant.id}
                href="/plant-scanner"
                className="bg-white rounded-2xl p-4 border border-stone-200 hover:border-emerald-400 hover:shadow-md transition flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200">
                      {plant.family}
                    </span>
                    <span className="text-[11px] font-bold text-stone-400">
                      {plant.id}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-stone-900 group-hover:text-emerald-800 transition">
                    {plant.nameEn}
                  </h4>
                  <div className="text-xs font-semibold text-emerald-800 mt-0.5">
                    {plant.nameAs} • <span className="italic font-normal">{plant.botanicalName}</span>
                  </div>
                  <p className="text-[11px] text-stone-600 mt-2 line-clamp-2">
                    {isAs ? plant.traditionalUses.as[0] : plant.traditionalUses.en[0]}
                  </p>
                </div>
                <div className="mt-3 pt-2 border-t border-stone-100 text-[11px] font-bold text-emerald-800 flex items-center justify-between">
                  <span>{isAs ? "বিৱৰণ আৰু লক্ষণ চাওক" : "Botanical Details"}</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Section 3: Kitchen Remedies Catalog */}
      {(activeFilter === "all" || activeFilter === "remedies") && matchedRemedies.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base sm:text-lg font-serif font-black text-stone-900 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-amber-700" />
              <span>{isAs ? "প্ৰামাণিক ঘৰুৱা উপচাৰ ভঁৰাল" : "Verified Kitchen Remedies"}</span>
              <span className="text-xs font-normal text-stone-500">
                ({matchedRemedies.length} {isAs ? "টা" : "remedies"})
              </span>
            </h2>
            <Link
              href="/knowledge-bank"
              className="text-xs font-bold text-amber-800 hover:text-amber-950 flex items-center gap-1"
            >
              <span>{isAs ? "সম্পূৰ্ণ আৰ্কাইভ" : "Full Archive"}</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {matchedRemedies.slice(0, activeFilter === "remedies" ? 40 : 6).map((rem) => {
              const saved = mounted && isSaved(rem.id);
              const rTitle = isAs
                ? rem.name_assamese || extractString(rem.name)
                : extractString(rem.name);

              return (
                <div
                  key={rem.id}
                  className="bg-white rounded-2xl p-4 border border-stone-200 hover:border-amber-400 hover:shadow-md transition flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-amber-50 text-amber-900 border border-amber-200">
                        {rem.symptomSlug}
                      </span>
                      <button
                        onClick={() => toggleSaved(rem.id)}
                        className="p-1 rounded-md text-stone-400 hover:text-stone-700"
                        title={saved ? "Saved" : "Save remedy"}
                      >
                        <Bookmark
                          className={`w-3.5 h-3.5 ${saved ? "fill-red-600 text-red-600" : ""}`}
                        />
                      </button>
                    </div>

                    <h4 className="text-sm font-bold text-stone-900 group-hover:text-amber-800 transition">
                      {rTitle}
                    </h4>
                    <div className="text-xs font-semibold text-emerald-800 mt-0.5">
                      {isAs ? extractString(rem.name) : rem.name_assamese}
                    </div>
                    <div className="text-[11px] text-stone-500 mt-2 font-medium">
                      ~{rem.prepTimeMinutes} mins • {rem.difficulty || "Easy"}
                    </div>
                  </div>

                  <Link
                    href={`/remedy/${rem.id}`}
                    className="mt-3 pt-2 border-t border-stone-100 text-[11px] font-bold text-amber-800 flex items-center justify-between"
                  >
                    <span>{isAs ? "প্ৰস্তুত প্ৰণালী আৰু মাত্ৰা" : "View Preparation"}</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition" />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
