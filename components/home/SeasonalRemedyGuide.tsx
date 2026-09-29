"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useNiramayStore } from "@/lib/store";
import { useMounted } from "@/hooks/useMounted";
import {
  Calendar,
  Sun,
  CloudRain,
  Wind,
  ThermometerSnowflake,
  Flower2,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";

interface SeasonData {
  id: string;
  nameEn: string;
  nameAs: string;
  assameseMonths: string;
  englishMonths: string;
  icon: React.ElementType;
  folkSaying: { en: string; as: string };
  heritageAdviceEn: string;
  heritageAdviceAs: string;
  recommendedHerbs: { nameEn: string; nameAs: string; useEn: string; useAs: string }[];
  targetSymptomSlug: string;
}

const SEASONS: SeasonData[] = [
  {
    id: "basanta",
    nameEn: "Basanta (Spring / Bohag)",
    nameAs: "বসন্ত ঋতু (ব'হাগ - জেঠ)",
    assameseMonths: "ব'হাগ আৰু জেঠ",
    englishMonths: "Mid April – Mid June",
    icon: Flower2,
    folkSaying: {
      en: "“Eat bitters in Bohag to purify blood and ward off summer fevers.” (Traditional Folk Rule)",
      as: "“ব'হাগত তিতা, জেঠত টেঙা” — তেজ পৰিষ্কাৰ কৰিবলৈ আৰু বসন্তকালীন পক্স/জ্বৰ ৰোধিবলৈ তিতা শাক খোৱাৰ নিয়ম।",
    },
    heritageAdviceEn:
      "Transition from winter chill into warmth brings spring allergies, chickenpox, and pitta accumulation. Assamese tradition mandates 101 wild edible greens (এশ এবিধ শাক) and bitter tonics.",
    heritageAdviceAs:
      "শীতৰ অন্ত পৰি বসন্ত অহাৰ লগে লগে বায়ু আৰু পিত্ত বৃদ্ধি পায়। তেজ পৰিষ্কাৰ কৰিবলৈ আৰু বতৰৰ সংক্ৰমণ ৰোধিবলৈ নিমপাত, তিতাফুল আৰু শেৱালী ফুলৰ ব্যৱহাৰ অপৰিহাৰ্য।",
    recommendedHerbs: [
      { nameEn: "Tita Phool & Neem", nameAs: "তিতাফুল আৰু নিম", useEn: "Blood purifier & antiviral detox", useAs: "তেজ পৰিষ্কাৰক আৰু বসন্তৰোগ প্ৰতিৰোধক" },
      { nameEn: "Sewali Leaves", nameAs: "শেৱালী পাত", useEn: "Joint inflammation & seasonal fever", useAs: "বাত বিষ আৰু ঋতুজনিত জ্বৰ উপশম" },
      { nameEn: "Kaji Nemu", nameAs: "কাজী নেমু", useEn: "Alkalizing vitamin C hydration", useAs: "শৰীৰ শীতল ৰখা আৰু পাচন বৃদ্ধি" },
    ],
    targetSymptomSlug: "low-immunity",
  },
  {
    id: "barsha",
    nameEn: "Barsha (Monsoon / Ahar - Shaon)",
    nameAs: "বৰ্ষা ঋতু (আহাৰ - শাওণ)",
    assameseMonths: "আহাৰ আৰু শাওণ",
    englishMonths: "Mid June – Mid August",
    icon: CloudRain,
    folkSaying: {
      en: "“When river waters swell, feed the belly pungent creepers.” (Assamese Gut Wisdom)",
      as: "“আহাৰ মাহৰ পানী, বনৌষধিৰ টানি” — বাৰিষাৰ সেমেকা বতৰত পেটৰ স্বাস্থ্য ৰক্ষাৰ বাবে ভেদাইলতা আৰু আদা অপৰিহাৰ্য।",
    },
    heritageAdviceEn:
      "Damp monsoon humidity weakens digestive fire (Agni) and increases water-borne stomach infections, dysentery, and amoebiasis. Warming carminative vine broths are traditionally cooked.",
    heritageAdviceAs:
      "বাৰিষাৰ সেমেকা বতাহ আৰু ঘোলা পানীয়ে পেটৰ পাচন শক্তি দুৰ্বল কৰে আৰু আমাশয়, গ্ৰহণী বৃদ্ধি কৰে। এই সময়ত ভেদাইলতা, আদা আৰু জালুকৰ লঘু ঝোল খাব লাগে।",
    recommendedHerbs: [
      { nameEn: "Bhedailota", nameAs: "ভেদাইলতা", useEn: "Stops amoebiasis & gut cramps", useAs: "পুৰণি আমাশয় আৰু পেটৰ বিষৰ মহৌষধ" },
      { nameEn: "Matikanduri", nameAs: "মাটিকান্দুৰী", useEn: "Supports liver & urinary cooling", useAs: "যকৃৎ আৰু প্ৰস্ৰাৱৰ সংক্ৰমণ উপশম" },
      { nameEn: "Ginger & Ajwain", nameAs: "আদা আৰু জৱাইন", useEn: "Rekindles sluggish digestion", useAs: "পেটৰ গেছ আৰু বদহজম নিবাৰণ" },
    ],
    targetSymptomSlug: "acidity",
  },
  {
    id: "xorot",
    nameEn: "Xorot (Autumn / Bhado - Aahin)",
    nameAs: "শৰৎ ঋতু (ভাদ - আহিন)",
    assameseMonths: "ভাদ আৰু আহিন",
    englishMonths: "Mid August – Mid October",
    icon: Wind,
    folkSaying: {
      en: "“Clear skies, sweet waters; balance pitta with cooling citrus.”",
      as: "“ভাদৰ ৰ'দ আৰু আহিনৰ নিয়ৰ” — শৰৎ কালৰ তীব্ৰ ৰ'দৰ পিত্ত শান্ত কৰিবলৈ টেঙেচী টেঙা আৰু আমলখি উত্তম।",
    },
    heritageAdviceEn:
      "Autumn brings bright sunlight (ভাদৰ ৰ'দ) causing pitta aggravation, skin rashes, acidity, and oral ulcers. Refreshing, mildly sour, and cooling preparations restore equilibrium.",
    heritageAdviceAs:
      "শৰৎকালৰ চোকা ৰ'দে শৰীৰত পিত্ত বৃদ্ধি কৰে, যাৰ ফলত মুখত ঘা, বুকুপোৰা আৰু ছালৰ খজুৱতি হ'ব পাৰে। শীতল টেঙা আৰু ঔটেঙা পাচনৰ বাবে উত্তম।",
    recommendedHerbs: [
      { nameEn: "Tengesi Tenga", nameAs: "টেঙেচী টেঙা", useEn: "Oral ulcers & restores appetite", useAs: "মুখৰ ঘা আৰু খোৱাৰ অৰুচি দূৰীকৰণ" },
      { nameEn: "Amlakhi (Amla)", nameAs: "আমলখি", useEn: "Cooling antioxidant & hair tonic", useAs: "পিত্ত শান্ত কৰা আৰু ৰোগ প্ৰতিৰোধ" },
      { nameEn: "Manimuni", nameAs: "মানিমুনি", useEn: "Calms stomach lining inflammation", useAs: "পেটৰ অন্ত্ৰ শীতল ৰখাৰ ৰস" },
    ],
    targetSymptomSlug: "acidity",
  },
  {
    id: "hemanta",
    nameEn: "Hemanta (Late Autumn / Kati - Aghon)",
    nameAs: "হেমন্ত ঋতু (কাতি - আঘোণ)",
    assameseMonths: "কাতি আৰু আঘোণ",
    englishMonths: "Mid October – Mid December",
    icon: Calendar,
    folkSaying: {
      en: "“Kati's dew calls for earthen lamps and warming ginger teas.”",
      as: "“কাতিৰ নিয়ৰ আৰু সোণালী আঘোণ” — বতাহ শীতল হোৱাৰ লগে লগে তুলসী আৰু জালুকৰ চাহে বুকু উমাল কৰি ৰাখে।",
    },
    heritageAdviceEn:
      "As temperatures dip and dew blankets paddy fields, mornings bring sudden sneezing, dry throat tickle, and joint tightness. Warming herbal decoctions prevent winter onset illness.",
    heritageAdviceAs:
      "নিয়ৰ পৰাৰ লগে লগে পুৱা হাঁচি অহা, ডিঙি খচখচোৱা আৰু মূৰ গধুৰ হোৱাৰ সম্ভাৱনা বাঢ়ে। তুলসী আৰু জালুকৰ চাহে প্ৰতিৰোধ ক্ষমতা বঢ়ায়।",
    recommendedHerbs: [
      { nameEn: "Tulsi & Black Pepper", nameAs: "তুলসী আৰু জালুক", useEn: "Clears early morning dry cough", useAs: "পুৱাৰ হাঁচি আৰু শুকান কাহ নিবাৰণ" },
      { nameEn: "Doron Bon", nameAs: "দৰণ বন", useEn: "Clears frontal nasal blockages", useAs: "বন্ধ নাক আৰু চাইনাছ মুকলি কৰা" },
      { nameEn: "Warm Turmeric Milk", nameAs: "হালধি গাখীৰ", useEn: "Deep tissue restorative immunity", useAs: "শৰীৰৰ প্ৰতিৰোধ আৰু টোপনিৰ সহায়ক" },
    ],
    targetSymptomSlug: "sore-throat",
  },
  {
    id: "xit",
    nameEn: "Xit (Winter / Puh - Magh)",
    nameAs: "শীত ঋতু (পুহ - মাঘ)",
    assameseMonths: "পুহ আৰু মাঘ",
    englishMonths: "Mid December – Mid February",
    icon: ThermometerSnowflake,
    folkSaying: {
      en: "“In Puh eat ginger, in Magh eat pure ghee to strengthen the joints.” (Dakar Bachan)",
      as: "“পুহত আদা, মাঘত ঘিউ” — শীতকালৰ হাড় আৰু গাঁঠি মজবুত ৰাখিবলৈ মিঠাতেল আৰু গৰম মছলাৰ প্ৰয়োগ।",
    },
    heritageAdviceEn:
      "Dry cold air aggravates Vata dosha, causing acute stiffness in knees, lower back pain, cracked skin, and chest phlegm. Deep mustard oil garlic rubs and hot pepper broths are essential.",
    heritageAdviceAs:
      "শীতৰ শুকান ঠাণ্ডাই বায়ু কুপিত কৰে, যাৰ বাবে গাঁঠিৰ বিষ, কঁকালৰ কামোৰণি আৰু বুকুৰ কফ বৃদ্ধি পায়। নহৰু দিয়া গৰম মিঠাতেলৰ সেক অতি উপকাৰী।",
    recommendedHerbs: [
      { nameEn: "Mustard Oil & Garlic", nameAs: "নহৰু আৰু মিঠাতেল", useEn: "External chest and joint rub", useAs: "বুকুৰ কফ আৰু গাঁঠিৰ বিষত গৰম মালিশ" },
      { nameEn: "Black Pepper Kadha", nameAs: "জালুকৰ কাঢ়া", useEn: "Deep warming chest expectorant", useAs: "বুকুৰ গধুৰ কফ সহজে বাহিৰ কৰা" },
      { nameEn: "Pasotia Leaves", nameAs: "পচতীয়া পাত", useEn: "Warm steam for severe arthritis", useAs: "বাত বিষত গৰম ভাপ আৰু সেক" },
    ],
    targetSymptomSlug: "joint-pain",
  },
];

export const SeasonalRemedyGuide: React.FC = () => {
  const mounted = useMounted();
  const { languageMode } = useNiramayStore();
  const currentMode = mounted ? languageMode : "bilingual";
  const isEn = currentMode === "en";
  const isAs = currentMode === "as";

  // Determine current season automatically or via user selection
  const [selectedSeasonId, setSelectedSeasonId] = useState<string | null>(null);

  const activeSeason = React.useMemo<SeasonData>(() => {
    if (selectedSeasonId) {
      return SEASONS.find((s) => s.id === selectedSeasonId) || SEASONS[2];
    }
    if (mounted) {
      const month = new Date().getMonth(); // 0 to 11
      if (month >= 3 && month <= 4) return SEASONS[0]; // Spring (April/May)
      if (month >= 5 && month <= 7) return SEASONS[1]; // Monsoon (June-August)
      if (month >= 8 && month <= 9) return SEASONS[2]; // Autumn (September-October)
      if (month >= 10 && month <= 11) return SEASONS[3]; // Late Autumn (Nov-Dec)
      return SEASONS[4]; // Winter (Jan-Feb-March)
    }
    return SEASONS[2]; // Default Autumn
  }, [selectedSeasonId, mounted]);

  const setActiveSeason = (season: SeasonData) => {
    setSelectedSeasonId(season.id);
  };

  const Icon = activeSeason.icon;

  return (
    <div className="bg-gradient-to-br from-amber-50/80 via-white to-emerald-50/50 rounded-3xl p-6 sm:p-8 border border-amber-200/80 shadow-md">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-amber-200/60">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold mb-2">
            <Calendar className="w-3.5 h-3.5 text-emerald-700" />
            <span>
              {isAs ? "অসমীয়া ঋতুচৰ্যা আৰু বতৰৰ যত্ন" : "Assamese Ritucharya & Seasonal Guide"}
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-serif font-black text-stone-900">
            {isAs
              ? "ঋতু অনুসৰি ঘৰুৱা প্ৰতিৰোধ আৰু পৰম্পৰাগত নিয়ম"
              : isEn
              ? "Seasonal Assamese Kitchen Calendar & Folk Care"
              : "Seasonal Assamese Kitchen Calendar / ঋতুচৰ্যা"}
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 mt-1">
            {isAs
              ? "অসমৰ ছয়টা ঋতুৰ জলবায়ু আৰু বতৰ সলনি হোৱাৰ সময়ত শৰীৰ সুস্থ ৰাখিবলৈ পৰম্পৰাগত নিৰ্দেশনা।"
              : "Traditional dietary and herbal guidance aligned with Assam's natural seasonal cycles."}
          </p>
        </div>
      </div>

      {/* Season Selection Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto py-4 scrollbar-none">
        {SEASONS.map((season) => {
          const SIcon = season.icon;
          const isSelected = activeSeason.id === season.id;
          return (
            <button
              key={season.id}
              onClick={() => setActiveSeason(season)}
              className={`flex items-center gap-2 px-3.5 py-2.5 rounded-2xl text-xs font-bold transition shrink-0 border ${
                isSelected
                  ? "bg-amber-700 text-white border-amber-800 shadow-md"
                  : "bg-white hover:bg-stone-50 text-stone-700 border-stone-200"
              }`}
            >
              <SIcon className="w-4 h-4 shrink-0" />
              <span>{isAs ? season.nameAs.split(" ")[0] : season.nameEn.split(" ")[0]}</span>
              <span className="text-[10px] opacity-80 hidden sm:inline">
                ({season.englishMonths.split("–")[0].trim()})
              </span>
            </button>
          );
        })}
      </div>

      {/* Active Season Highlight Card */}
      <div className="bg-white rounded-2xl p-5 sm:p-6 border border-stone-200 shadow-xs space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-900 flex items-center justify-center shrink-0 shadow-xs">
              <Icon className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-amber-800">
                {activeSeason.assameseMonths} · {activeSeason.englishMonths}
              </div>
              <h3 className="text-xl sm:text-2xl font-serif font-black text-stone-900 mt-0.5">
                {activeSeason.nameEn}
              </h3>
              <div className="text-sm font-bold text-emerald-800">
                {activeSeason.nameAs}
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Link
              href="/ritucharya"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-amber-100/90 hover:bg-amber-200 text-amber-950 border border-amber-300 transition"
            >
              <Calendar className="w-3.5 h-3.5 text-amber-800" />
              <span>{isAs ? "সম্পূৰ্ণ ঋতুচৰ্যা চাওক" : "Full Ritucharya Guide"}</span>
            </Link>

            <Link
              href={`/symptoms/${activeSeason.targetSymptomSlug}`}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-amber-700 hover:bg-amber-800 text-white shadow-xs transition"
            >
              <span>{isAs ? "বতৰৰ উপচাৰসমূহ" : "Seasonal Remedies"}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Traditional Assamese Folk Saying / Dakar Bachan */}
        <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200/90 text-xs sm:text-sm text-stone-800 italic font-serif leading-relaxed">
          <span className="font-sans font-bold not-italic text-amber-900 mr-2">
            📜 {isAs ? "ডাকৰ বচন / পৰম্পৰাগত নীতি:" : "Folk Wisdom:"}
          </span>
          {isAs ? activeSeason.folkSaying.as : activeSeason.folkSaying.en}
        </div>

        {/* Detailed Advice */}
        <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-sans">
          {isAs ? activeSeason.heritageAdviceAs : activeSeason.heritageAdviceEn}
        </p>

        {/* Recommended Herbs Grid */}
        <div>
          <div className="text-xs font-bold uppercase text-stone-600 tracking-wider mb-2.5">
            {isAs ? "এই ঋতুত ব্যৱহাৰ কৰিবলগীয়া প্ৰধান বনৌষধি:" : "Key Seasonal Herbs & Tonics:"}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {activeSeason.recommendedHerbs.map((herb, i) => (
              <div
                key={i}
                className="p-3.5 rounded-xl bg-stone-50 border border-stone-200/80 flex flex-col justify-between"
              >
                <div>
                  <div className="text-xs font-bold text-stone-900">
                    {herb.nameEn}
                  </div>
                  <div className="text-[11px] font-semibold text-emerald-800">
                    {herb.nameAs}
                  </div>
                </div>
                <div className="text-[11px] text-stone-500 mt-2 font-medium">
                  {isAs ? herb.useAs : herb.useEn}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
