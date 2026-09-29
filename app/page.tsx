"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SYMPTOM_CATEGORIES, symptomCategories } from "@/lib/data/symptoms";
import { REMEDIES } from "@/lib/data/remedies";
import { useNiramayStore } from "@/lib/store";
import { useMounted } from "@/hooks/useMounted";
import { SpiceIcon } from "@/components/brand/SpiceIcon";
import { extractString } from "@/lib/utils";
import { getLocalizedText, UI_TRANSLATIONS } from "@/lib/i18n";
import { searchRemedies, getDidYouMean } from "@/lib/search";
import { InteractiveBodyMap } from "@/components/home/InteractiveBodyMap";
import { SeasonalRemedyGuide } from "@/components/home/SeasonalRemedyGuide";
import { SeasonalHealthRadar } from "@/components/home/SeasonalHealthRadar";
import { ActiveTreatmentCourseWidget } from "@/components/home/ActiveTreatmentCourseWidget";
import { EmergencySpeedDial } from "@/components/emergency/EmergencySpeedDial";
import { Bot, Camera, FileText, Leaf, Calendar, Sprout, BookHeart,
  Search,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  Heart,
  Flame,
  Wind,
  ThermometerSnowflake,
  Brain,
  Activity,
  Thermometer,
  RefreshCw,
  Compass,
  Bone,
  HeartPulse,
  Moon,
  Sun,
  Layers,
  Bookmark,
  Check,
  TrendingUp,
  Eye,
  Droplet,
  CloudRain,
  ShieldAlert,
} from "lucide-react";

// Icon mapping for symptom cards
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

// Hand-picked curated shortcuts: Common this season / Most searched
const COMMON_THIS_SEASON = [
  { label: "Common Cold", assamese: "চৰ্দি", slug: "common-cold", icon: ThermometerSnowflake },
  { label: "Acidity / Heartburn", assamese: "অমলপিত্ত", slug: "acidity", icon: Flame },
  { label: "Sore Throat", assamese: "ডিঙিৰ বিষ", slug: "sore-throat", icon: Sparkles },
  { label: "Indigestion & Gas", assamese: "বদহজম", slug: "indigestion", icon: Wind },
  { label: "Headache", assamese: "মূৰৰ বিষ", slug: "headache-tension", icon: Brain },
  { label: "Joint Pain", assamese: "গাঁঠিৰ বিষ", slug: "joint-pain", icon: Bone },
];

export default function HomePage() {
  const router = useRouter();
  const mounted = useMounted();
  const [query, setQuery] = useState("");
  const [activeCategoryFilter, setActiveCategoryFilter] = useState("all");
  const { pantry, togglePantryItem, savedRemedyIds, languageMode, setAssistantOpen, completedHabitsByDate } = useNiramayStore();

  const currentMode = mounted ? languageMode : "bilingual";
  const isEn = currentMode === "en";
  const isAs = currentMode === "as";
  const isBi = currentMode === "bilingual";

  const didYouMean = React.useMemo(() => {
    return getDidYouMean(query);
  }, [query]);

  // Compute daily habit streak for hero badge
  const habitStreak = React.useMemo(() => {
    if (!mounted || !completedHabitsByDate) return 0;
    const now = new Date();
    let streak = 0;
    let checkDate = new Date(now);
    const yToday = now.getFullYear();
    const mToday = (now.getMonth() + 1).toString().padStart(2, "0");
    const dToday = now.getDate().toString().padStart(2, "0");
    const todayStr = `${yToday}-${mToday}-${dToday}`;
    const todayCount = (completedHabitsByDate[todayStr] || []).length;

    if (todayCount === 0) {
      checkDate.setDate(checkDate.getDate() - 1);
    }

    while (true) {
      const y = checkDate.getFullYear();
      const m = (checkDate.getMonth() + 1).toString().padStart(2, "0");
      const d = checkDate.getDate().toString().padStart(2, "0");
      const str = `${y}-${m}-${d}`;
      const count = (completedHabitsByDate[str] || []).length;
      if (count > 0) {
        streak++;
        checkDate.setDate(checkDate.getDate() - 1);
      } else {
        break;
      }
    }
    return streak;
  }, [mounted, completedHabitsByDate]);

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

  // Filter symptoms based on search query and category
  const filteredSymptoms = SYMPTOM_CATEGORIES.filter((cat) => {
    if (activeCategoryFilter !== "all" && cat.categoryId !== activeCategoryFilter) {
      return false;
    }
    if (!query.trim()) return true;
    const q = query.toLowerCase();
    return (
      cat.title.toLowerCase().includes(q) ||
      cat.assameseTitle.toLowerCase().includes(q) ||
      cat.description.toLowerCase().includes(q) ||
      cat.commonSpices.some((s) => s.toLowerCase().includes(q))
    );
  });

  // Feature 1: Filter remedies directly matching query via Fuse.js
  const matchingRemedies = React.useMemo(() => {
    if (!query.trim()) return [];
    const results = searchRemedies(query, { threshold: 0.42, limit: 4 });
    return results.map((r) => r.remedy);
  }, [query]);

  // 4 Featured remedies for the showcase
  const featuredRemedies = REMEDIES.filter((r) =>
    [
      "aada-tulsi-jaluk-kadha",
      "ginger-ajwain-acidity-water",
      "spiced-nutmeg-cardamom-bedtime-milk",
      "haldi-salt-warm-gargle",
    ].includes(r.id)
  );

  const topKitchenPantrySpices = [
    "Ginger (Aada)",
    "Tulsi (Holy Basil)",
    "Black pepper (Jaluk)",
    "Honey (Mou)",
    "Turmeric (Haldi)",
    "Ajwain (Carom seeds)",
    "Cumin (Jeera)",
    "Lemon (Kaji Nemu)",
    "Clove (Long)",
    "Fennel (Mouri)",
  ];

  return (
    <div className="w-full pb-12 sm:pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#FEF3C7]/60 via-[#FFF8F0] to-[#FFF8F0] pt-12 pb-16 sm:pt-20 sm:pb-24 border-b border-amber-200/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
            {/* Tagline Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-100/90 border border-amber-300/80 text-amber-900 text-xs sm:text-sm font-semibold mb-6 shadow-xs">
              <Sparkles className="w-4 h-4 text-amber-700" />
              <span>
                {isAs
                  ? "ঘৰৰ মছলাত, সুস্থ নিৰাময় — পৰম্পৰাগত জ্ঞান আৰু আধুনিক যত্ন"
                  : isEn
                  ? "Traditional Kitchen Wisdom, Modern Care"
                  : "ঘৰৰ মছলাত, সুস্থ নিৰাময় — Traditional Wisdom, Modern Care"}
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-black tracking-tight text-stone-900 leading-[1.15]">
              {isAs ? (
                <>
                  আপোনাৰ পাকঘৰত থকা মছলাৰে{" "}
                  <span className="text-amber-700 underline decoration-amber-400 decoration-wavy decoration-2">
                    সুস্থ হৈ উঠক
                  </span>
                  ।
                </>
              ) : isEn ? (
                <>
                  Heal with spices already in your{" "}
                  <span className="text-amber-700 underline decoration-amber-400 decoration-wavy decoration-2">
                    kitchen
                  </span>
                  .
                </>
              ) : (
                <>
                  Heal with spices already in your{" "}
                  <span className="text-amber-700 underline decoration-amber-400 decoration-wavy decoration-2">
                    kitchen
                  </span>
                  . <span className="block text-xl sm:text-2xl text-emerald-900 font-sans font-bold mt-2">ঘৰুৱা মছলাৰে সহজ নিৰাময়</span>
                </>
              )}
            </h1>

            {/* Subheading */}
            <p className="mt-5 text-base sm:text-xl text-stone-700 leading-relaxed max-w-2xl font-sans">
              {isAs
                ? "দৈনন্দিন ৰোগ আৰু শাৰীৰিক সমস্যাৰ বাবে প্ৰাচীন অসমীয়া আৰু ভাৰতীয় ঘৰুৱা নিৰাময়। আপোনাৰ পাকঘৰত মজুত থকা মছলা পৰীক্ষা কৰক, ৫-৮ খোজৰ প্ৰস্তুত প্ৰণালী আৰু বয়স অনুযায়ী সুৰক্ষিত মাত্ৰা জানক।"
                : isEn
                ? "Traditional Assamese & Indian kitchen remedies for everyday ailments. Check the ingredients you have at home, discover instant preparations, and follow clinically mindful age-group dosages."
                : "Traditional Assamese & Indian kitchen remedies for everyday ailments with live pantry matching, 5–8 granular preparation steps, and clinical age-group dosages. (অসমীয়া আৰু ভাৰতীয় ঘৰুৱা চিকিৎসা)"}
            </p>

            {/* Search Box */}
            <div className="w-full max-w-xl mt-8">
              <div className="relative flex items-center shadow-lg rounded-2xl bg-white border-2 border-amber-300 focus-within:border-amber-600 focus-within:ring-4 focus-within:ring-amber-500/20 transition-all">
                <Search className="w-5 h-5 text-amber-700 ml-4 shrink-0" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={
                    isAs
                      ? "ৰোগৰ লক্ষণ বা মছলাৰ নাম সন্ধান কৰক (যেনে- কাহ, অমলপিত্ত, আদা, তুলসী)..."
                      : isEn
                      ? "Search symptom, ailment, or spice (e.g. Cough, Acidity, Tulsi, Ginger)..."
                      : "Search symptom, ailment, or spice / ৰোগ বা মছলা সন্ধান কৰক..."
                  }
                  className="w-full py-4 px-3 text-stone-900 placeholder:text-stone-400 bg-transparent text-sm sm:text-base focus:outline-none"
                  aria-label="Search remedies or symptoms"
                />
                {query && (
                  <button
                    onClick={() => setQuery("")}
                    className="mr-3 text-xs text-stone-400 hover:text-stone-700 bg-stone-100 px-2 py-1 rounded-md"
                  >
                    {isAs ? "মচক" : "Clear"}
                  </button>
                )}
              </div>
            </div>

            {/* Feature 1: Did You Mean Suggestion */}
            {didYouMean && (
              <div className="w-full max-w-xl mt-2 text-xs flex items-center justify-center gap-1.5 text-stone-600 animate-in fade-in">
                <span className="text-amber-800 font-semibold">
                  {isAs ? "আপুনি এইটো বিচাৰিছে নেকি?" : "Did you mean:"}
                </span>
                <button
                  onClick={() => setQuery(isAs ? didYouMean.as : didYouMean.en)}
                  className="text-amber-800 underline font-bold hover:text-amber-950 cursor-pointer bg-white px-2.5 py-0.5 rounded-full border border-amber-300 shadow-2xs"
                >
                  {isAs ? didYouMean.as : didYouMean.en}
                </button>
              </div>
            )}

            {/* Quick Signature Features Shortcut Bar */}
            <div className="flex flex-wrap items-center justify-center gap-2 mt-5 max-w-4xl mx-auto">
              {habitStreak > 0 && (
                <Link
                  href="/daily-habits"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-orange-500 text-white text-xs font-black shadow-xs hover:bg-orange-600 transition animate-bounce cursor-pointer touch-manipulation"
                >
                  <Flame className="w-3.5 h-3.5 fill-white" />
                  <span>🔥 {habitStreak} {isAs ? "দিনীয়া ধাৰাবাহিকতা!" : "-Day Streak!"}</span>
                </Link>
              )}

              <Link
                href="/spice-scanner"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-orange-100 hover:bg-orange-200 text-orange-950 text-xs font-bold transition shadow-2xs border border-orange-300 cursor-pointer touch-manipulation"
              >
                <Camera className="w-3.5 h-3.5 text-orange-700" />
                <span>{isAs ? "মছলা স্কেনাৰ" : "Spice Box Scanner"}</span>
                <span className="text-[9px] uppercase px-1 rounded-sm bg-orange-600 text-white font-black">AI</span>
              </Link>

              <Link
                href="/dosha-assessment"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-100/90 hover:bg-emerald-200 text-emerald-950 text-xs font-bold transition shadow-2xs border border-emerald-300 cursor-pointer touch-manipulation"
              >
                <HeartPulse className="w-3.5 h-3.5 text-emerald-700" />
                <span>{isAs ? "দোষ পৰীক্ষা" : "Dosha Quiz"}</span>
              </Link>

              <Link
                href="/plant-scanner"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-100/90 hover:bg-emerald-200 text-emerald-950 text-xs font-bold transition shadow-2xs border border-emerald-200 cursor-pointer touch-manipulation"
              >
                <Leaf className="w-3.5 h-3.5 text-emerald-700" />
                <span>{isAs ? "বনৌষধি স্কেনাৰ" : "Plant Scanner"}</span>
              </Link>

              <button
                type="button"
                onClick={() => setAssistantOpen(true)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-200/90 hover:bg-amber-300 text-amber-950 text-xs font-bold transition shadow-2xs border border-amber-300 cursor-pointer touch-manipulation"
              >
                <Bot className="w-3.5 h-3.5 text-amber-800" />
                <span>{isAs ? "নিৰাময় এআই সহায়ক" : "Niramay AI"}</span>
              </button>

              <Link
                href="/ritucharya"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-teal-100/90 hover:bg-teal-200 text-teal-950 text-xs font-bold transition shadow-2xs border border-teal-200 cursor-pointer touch-manipulation"
              >
                <Calendar className="w-3.5 h-3.5 text-teal-700" />
                <span>{isAs ? "ঋতুচৰ্যা" : "Ritucharya"}</span>
              </Link>

              <Link
                href="/kitchen-garden"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-lime-100/90 hover:bg-lime-200 text-lime-950 text-xs font-bold transition shadow-2xs border border-lime-200 cursor-pointer touch-manipulation"
              >
                <Sprout className="w-3.5 h-3.5 text-lime-800" />
                <span>{isAs ? "পাকঘৰৰ বাৰী" : "Kitchen Garden"}</span>
              </Link>

              <Link
                href="/daily-habits"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-100/90 hover:bg-amber-200 text-amber-950 text-xs font-bold transition shadow-2xs border border-amber-300 cursor-pointer touch-manipulation"
              >
                <TrendingUp className="w-3.5 h-3.5 text-amber-700" />
                <span>{isAs ? "দিনচৰ্যা" : "Daily Habits"}</span>
              </Link>

              <Link
                href="/aitas-diha"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-100/90 hover:bg-rose-200 text-rose-950 text-xs font-bold transition shadow-2xs border border-rose-200 cursor-pointer touch-manipulation"
              >
                <BookHeart className="w-3.5 h-3.5 text-rose-700" />
                <span>{isAs ? "আইতাৰ দিহা" : "Aita's Diha"}</span>
              </Link>

              <Link
                href="/fridge-card"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-900 text-xs font-bold transition shadow-2xs border border-stone-300 cursor-pointer touch-manipulation"
              >
                <FileText className="w-3.5 h-3.5 text-stone-700" />
                <span>{isAs ? "ফ্ৰিজ কাৰ্ড (PDF)" : "Fridge Card (PDF)"}</span>
              </Link>
            </div>

            {/* Direct Remedy Search Results Dropdown */}
            {Boolean(query.trim()) && matchingRemedies.length > 0 && (
              <div className="w-full max-w-xl mt-3 bg-white rounded-2xl border border-amber-200 shadow-xl p-3 text-left animate-in fade-in duration-150">
                <div className="text-[11px] font-bold uppercase tracking-wider text-amber-800 px-2 py-1">
                  {isAs ? "মিলা উপচাৰসমূহ" : "Matching Kitchen Remedies"} ({matchingRemedies.length})
                </div>
                <div className="divide-y divide-stone-100">
                  {matchingRemedies.map((remedy) => {
                    const rTitle = isAs
                      ? remedy.name_assamese || extractString(remedy.name)
                      : extractString(remedy.name);
                    const rSecondary = isBi ? remedy.name_assamese : undefined;

                    return (
                      <Link
                        key={remedy.id}
                        href={`/remedy/${remedy.id}`}
                        className="flex items-center justify-between p-3 hover:bg-amber-50/70 rounded-xl transition group"
                      >
                        <div>
                          <div className="text-sm font-semibold text-stone-900 group-hover:text-amber-800">
                            {rTitle}
                          </div>
                          <div className="text-xs text-stone-500 font-sans">
                            {rSecondary ? `${rSecondary} • ` : ""}
                            {getLocalizedText(remedy.symptom, currentMode, remedy.symptom_assamese)}
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-stone-400 group-hover:text-amber-700 group-hover:translate-x-1 transition" />
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Most Searched / Common This Season Curated Section */}
            <div className="w-full max-w-3xl mt-6">
              <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-amber-900 mb-2.5">
                <TrendingUp className="w-3.5 h-3.5 text-amber-700" />
                <span>
                  {isAs
                    ? "এই ঋতুত সততে হোৱা সমস্যাসমূহ:"
                    : isEn
                    ? "Common This Season / Most Searched:"
                    : "Common This Season / সততে সন্ধান কৰা:"}
                </span>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-2">
                {COMMON_THIS_SEASON.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.slug}
                      href={`/symptoms/${item.slug}`}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/90 hover:bg-amber-700 hover:text-white border border-amber-200 text-stone-700 text-xs font-medium transition shadow-2xs group"
                    >
                      <Icon className="w-3.5 h-3.5 text-amber-700 group-hover:text-white transition-colors" />
                      <span>{isAs ? item.assamese : item.label}</span>
                      {isBi && <span className="text-[10px] opacity-75 font-sans">({item.assamese})</span>}
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Key Trust Badges */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs font-semibold text-stone-600">
              <span className="flex items-center gap-1.5 bg-white/70 px-3 py-1.5 rounded-full border border-stone-200">
                <ShieldCheck className="w-4 h-4 text-emerald-700" />
                <span>{isAs ? "বয়স অনুযায়ী মাত্ৰা নিৰ্দেশনা" : "Age Safety Guides"}</span>
              </span>
              <span className="flex items-center gap-1.5 bg-white/70 px-3 py-1.5 rounded-full border border-stone-200">
                <CheckCircle2 className="w-4 h-4 text-amber-700" />
                <span>{isAs ? `${REMEDIES.length}+ প্ৰামাণিক উপচাৰ` : `${REMEDIES.length}+ Authentic Remedies`}</span>
              </span>
              <span className="flex items-center gap-1.5 bg-white/70 px-3 py-1.5 rounded-full border border-stone-200">
                <Sparkles className="w-4 h-4 text-amber-700" />
                <span>{isAs ? `${SYMPTOM_CATEGORIES.length}টা লক্ষণৰ বিভাগ` : `${SYMPTOM_CATEGORIES.length} Symptom Categories`}</span>
              </span>
              <span className="flex items-center gap-1.5 bg-white/70 px-3 py-1.5 rounded-full border border-stone-200">
                <ShieldCheck className="w-4 h-4 text-emerald-700" />
                <span>{isAs ? "১০০% অফলাইন আৰু ব্যক্তিগত" : "100% Offline & Private"}</span>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* New Feature 5 & 6: Active Treatment Course & Seasonal Health Radar */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-4">
        <ActiveTreatmentCourseWidget />
        <SeasonalHealthRadar />
      </section>

      {/* Quick Pantry Bar Widget */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 -mt-2">
        <div className="bg-white rounded-3xl p-5 sm:p-6 border border-amber-200/80 shadow-md">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-stone-100">
            <div>
              <h3 className="text-sm sm:text-base font-bold text-stone-900 flex items-center gap-2">
                <span className="text-amber-700">🌿</span>
                <span>{isAs ? "পাকঘৰৰ মছলা পৰীক্ষা" : "Quick Kitchen Pantry Check"}</span>
              </h3>
              <p className="text-xs text-stone-600">
                {isAs
                  ? "আপোনাৰ ঘৰত বৰ্তমান থকা মছলাসমূহত টিপক যাতে তৎক্ষণাত তৈয়াৰ কৰিব পৰা উপচাৰসমূহ দেখা পায়:"
                  : "Tap the spices you currently have in your kitchen to auto-filter remedies you can prepare right now:"}
              </p>
            </div>
            <div className="text-xs text-stone-500 shrink-0">
              <span className="font-bold text-amber-700">{activePantry.length}</span>{" "}
              {isAs ? "মছলা নিৰ্বাচিত" : "spices selected"}
            </div>
          </div>

          <div className="flex flex-wrap gap-2 pt-4">
            {topKitchenPantrySpices.map((spice) => {
              const inStock = activePantry.includes(spice);
              return (
                <button
                  key={spice}
                  onClick={() => togglePantryItem(spice)}
                  className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium transition cursor-pointer ${
                    inStock
                      ? "bg-amber-700 text-white font-semibold shadow-xs ring-2 ring-amber-600/30"
                      : "bg-[#FFF8F0] text-stone-800 border border-amber-200/90 hover:border-amber-400 hover:bg-amber-100/50"
                  }`}
                  aria-pressed={inStock}
                >
                  <SpiceIcon name={spice} className="w-3.5 h-3.5" />
                  <span>{spice}</span>
                  {inStock && <Check className="w-3.5 h-3.5 ml-0.5" />}
                </button>
              );
            })}
          </div>

          <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
            <span>{isAs ? "বাছনিসমূহ আপোনাৰ ব্ৰাউজাৰত স্বয়ংক্ৰিয়ভাৱে সংৰক্ষিত হয়।" : "Selections are saved directly in your browser."}</span>
            <Link
              href="/symptoms"
              className="text-amber-800 font-semibold hover:underline flex items-center gap-1"
            >
              <span>{isAs ? "মজুত মছলাৰে উপচাৰ চাওক" : "View remedies with your pantry"}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Main Symptom Selector Directory Preview */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs uppercase tracking-wider font-bold text-amber-800 bg-amber-100 px-3 py-1 rounded-full">
              {isAs ? "লক্ষণ সূচী" : "Symptom Directory"}
            </span>
            <h2 className="text-2xl sm:text-4xl font-serif font-black text-stone-900 mt-2">
              {isAs ? "আপোনাৰ কি সমস্যা হৈছে?" : "What seems to be troubling you?"}
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 mt-1 max-w-xl">
              {isAs
                ? `মুঠ ${SYMPTOM_CATEGORIES.length}টা পৰম্পৰাগত লক্ষণৰ বিভাগ। তলত বাছনি কৰি প্ৰস্তুত প্ৰণালী আৰু সাৱধানতা চাওক।`
                : `Covering ${SYMPTOM_CATEGORIES.length} traditional ailment categories. Choose below to view tailored preparations and safety dos/don'ts.`}
            </p>
          </div>

          <Link
            href="/symptoms"
            className="inline-flex items-center gap-2 text-sm font-bold text-amber-800 hover:text-amber-950 group"
          >
            <span>{isAs ? `সকলো ${SYMPTOM_CATEGORIES.length}টা লক্ষণ চাওক` : `Explore All ${SYMPTOM_CATEGORIES.length} Symptoms Directory`}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
          </Link>
        </div>

        {/* Category Quick Filter Chips on Homepage */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 scrollbar-none no-scrollbar">
          <button
            onClick={() => setActiveCategoryFilter("all")}
            className={`whitespace-nowrap px-3.5 py-1.5 rounded-full text-xs font-semibold transition shrink-0 ${
              activeCategoryFilter === "all"
                ? "bg-amber-700 text-white"
                : "bg-white text-stone-700 border border-stone-200 hover:bg-amber-50"
            }`}
          >
            {isAs ? "সকলো বিভাগ" : "All Categories"} ({SYMPTOM_CATEGORIES.length})
          </button>
          {symptomCategories.map((group) => (
            <button
              key={group.id}
              onClick={() => setActiveCategoryFilter(group.id)}
              className={`whitespace-nowrap px-3.5 py-1.5 rounded-full text-xs font-semibold transition shrink-0 ${
                activeCategoryFilter === group.id
                  ? "bg-amber-700 text-white"
                  : "bg-white text-stone-700 border border-stone-200 hover:bg-amber-50"
              }`}
            >
              {isAs ? group.label_assamese || group.label : group.label} ({group.symptoms.length})
            </button>
          ))}
        </div>

        {/* Symptoms Grid Preview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filteredSymptoms.slice(0, 12).map((symptom) => {
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
                className="group relative bg-white hover:bg-[#FFFDF9] rounded-3xl p-6 border border-amber-200/70 hover:border-amber-500/80 shadow-xs hover:shadow-xl transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-amber-100 group-hover:bg-amber-600 text-amber-800 group-hover:text-white flex items-center justify-center transition-colors">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-bold text-amber-800 bg-amber-50 border border-amber-200/80 px-2.5 py-1 rounded-full">
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

                  <p className="text-xs text-stone-600 mt-2.5 line-clamp-2 leading-relaxed">
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

                <div className="mt-5 pt-3 flex items-center justify-between text-xs font-bold text-amber-800 group-hover:text-amber-700">
                  <span>{isAs ? "উপাদান পৰীক্ষা কৰক" : "Check kitchen ingredients"}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition" />
                </div>
              </Link>
            );
          })}
        </div>

        {/* View All Button */}
        <div className="mt-10 text-center">
          <Link
            href="/symptoms"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-amber-700 hover:bg-amber-800 text-white font-semibold text-sm shadow-md transition transform hover:-translate-y-0.5"
          >
            <span>{isAs ? `সম্পূৰ্ণ ${SYMPTOM_CATEGORIES.length}টা লক্ষণ চাওক` : `Browse Complete ${SYMPTOM_CATEGORIES.length}-Symptom Directory`}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Feature 6: Interactive Body Map Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <InteractiveBodyMap />
      </section>

      {/* Feature 8: Seasonal Assamese Calendar / Ritucharya Guide */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-12 sm:pb-16">
        <SeasonalRemedyGuide />
      </section>

      {/* How Niramay Works: 3 Steps */}
      <section className="bg-amber-100/40 border-y border-amber-200/60 py-16 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs uppercase tracking-wider font-bold text-amber-800">
              {isAs ? "৩টা সহজ পদক্ষেপ" : "Simple 3-Step Process"}
            </span>
            <h2 className="text-2xl sm:text-4xl font-serif font-black text-stone-900 mt-1">
              {isAs ? "নিৰাময় কেনেদৰে ব্যৱহাৰ কৰিব" : "How Niramay Works"}
            </h2>
            <p className="text-sm text-stone-600 mt-2">
              {isAs
                ? "প্ৰাচীন অসমীয়া পাকঘৰৰ জ্ঞান আৰু আধুনিক সুৰক্ষা নীতিৰ এক অপূৰ্ব সমন্বয়।"
                : "Combining age-old Assamese kitchen wisdom with strict modern safety standards."}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-amber-200/70 shadow-xs relative">
              <div className="w-12 h-12 rounded-2xl bg-amber-600 text-white font-serif font-black text-xl flex items-center justify-center mb-5">
                1
              </div>
              <h3 className="text-lg font-bold text-stone-900 mb-2">
                {isAs ? "লক্ষণ বাছনি কৰক" : "Pick Your Symptom"}
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                {isAs
                  ? `মুঠ ${SYMPTOM_CATEGORIES.length}টা সুবিন্যস্ত লক্ষণৰ পৰা আপোনাৰ সমস্যা নিৰ্বাচন কৰক (হজম, চৰ্দি, বিষ, ছাল ইত্যাদি)।`
                  : `Choose from ${SYMPTOM_CATEGORIES.length} carefully categorized ailments across digestive, respiratory, pain, skin, and wellness.`}
              </p>
            </div>

            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-amber-200/70 shadow-xs relative">
              <div className="w-12 h-12 rounded-2xl bg-amber-700 text-white font-serif font-black text-xl flex items-center justify-center mb-5">
                2
              </div>
              <h3 className="text-lg font-bold text-stone-900 mb-2">
                {isAs ? "পাকঘৰৰ মছলা পৰীক্ষা কৰক" : "Check What You Have"}
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                {isAs
                  ? "আপোনাৰ পাকঘৰত থকা মছলাত টিক মাৰক (আদা, তুলসী, জালুক, হালধি)। তৎক্ষণাত কি সাজিব পাৰি এপে জনাই দিব।"
                  : "Tick the spices in your spice box (Aada, Tulsi, Jaluk, Haldi, Jeera). The app ranks what you can make right now."}
              </p>
            </div>

            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-amber-200/70 shadow-xs relative">
              <div className="w-12 h-12 rounded-2xl bg-emerald-800 text-white font-serif font-black text-xl flex items-center justify-center mb-5">
                3
              </div>
              <h3 className="text-lg font-bold text-stone-900 mb-2">
                {isAs ? "সুৰক্ষিত প্ৰস্তুত প্ৰণালী" : "Safe Step-by-Step Care"}
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                {isAs
                  ? "৫-৮ খোজৰ সবিশেষ প্ৰস্তুত প্ৰণালী, বয়স অনুযায়ী মাত্ৰা (শিশু/প্ৰাপ্তবয়স্ক/বয়োজ্যেষ্ঠ) আৰু বিপদ সংকেত মানি চলক।"
                  : "Follow exact 5–8 granular steps, age-specific dosages (child/adult/elderly), and clear red-flag medical warnings."}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Preparations Showcase */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-xs uppercase tracking-wider font-bold text-amber-800 bg-amber-100 px-3 py-1 rounded-full">
              {isAs ? "ঐতিহ্যমণ্ডিত উপচাৰ" : "Time-Tested Recipes"}
            </span>
            <h2 className="text-2xl sm:text-4xl font-serif font-black text-stone-900 mt-2">
              {isAs ? "বিশেষ পৰম্পৰাগত প্ৰস্তুতিসমূহ" : "Featured Traditional Preparations"}
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 mt-1">
              {isAs
                ? "আইতাৰ যুগ যুগ ধৰি সমাদৃত ক্বাথ, পাচক পানী আৰু নিৰাময় চাহ।"
                : "Grandmother's most relied-upon infusions, decoctions, and soothing teas."}
            </p>
          </div>
          <Link
            href="/knowledge-bank"
            className="inline-flex items-center gap-2 text-sm font-bold text-amber-800 hover:text-amber-950"
          >
            <span>{isAs ? `জ্ঞান ভঁৰালত সকলো ${REMEDIES.length}+ উপচাৰ চাওক` : `Explore All ${REMEDIES.length}+ in Knowledge Bank`}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {featuredRemedies.map((remedy) => {
            const fTitle = isAs
              ? remedy.name_assamese || extractString(remedy.name)
              : extractString(remedy.name);
            const fSecondary = isBi ? remedy.name_assamese : undefined;
            const cultText = getLocalizedText(remedy.culturalContext, currentMode);

            return (
              <div
                key={remedy.id}
                className="bg-white rounded-3xl p-6 sm:p-7 border border-amber-200/80 shadow-xs hover:shadow-lg transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200/60 font-sans">
                      {getLocalizedText(remedy.symptom, currentMode, remedy.symptom_assamese)}
                    </span>
                    <span className="text-xs text-stone-400 font-medium">
                      ⏱ {remedy.prepTimeMinutes} {isAs ? "মিনিট" : "mins"}
                    </span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-serif font-bold text-stone-900">
                    {fTitle}
                  </h3>
                  {fSecondary && (
                    <p className="text-xs sm:text-sm font-medium text-emerald-800 mt-0.5 font-sans">
                      {fSecondary}
                    </p>
                  )}

                  <p className="text-xs sm:text-sm text-stone-600 mt-3 line-clamp-2 leading-relaxed">
                    {cultText}
                  </p>

                  {/* Ingredients Preview */}
                  <div className="mt-4 pt-4 border-t border-stone-100">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400 block mb-2">
                      {isAs ? "প্ৰধান উপাদানসমূহ:" : "Key Ingredients:"}
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {remedy.ingredients.map((ing, idx) => {
                        const rawItem = extractString(ing.item);
                        const displayItem = isAs ? ing.item_assamese || rawItem : rawItem;
                        const displayQty = getLocalizedText(ing.qty, currentMode, ing.qty_assamese);
                        return (
                          <span
                            key={idx}
                            className="text-xs bg-[#FFF8F0] border border-amber-200 text-stone-700 px-2.5 py-1 rounded-lg"
                          >
                            {displayItem} ({displayQty})
                          </span>
                        );
                      })}
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-stone-100 flex items-center justify-between">
                  <Link
                    href={`/remedy/${remedy.id}`}
                    className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-amber-800 hover:text-amber-950"
                  >
                    <span>{isAs ? "সম্পূৰ্ণ প্ৰণালী আৰু মাত্ৰা চাওক" : "View Full Recipe & Dosages"}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>

                  <span className="text-[11px] text-stone-400 font-medium">
                    {remedy.difficulty || "Easy"}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
