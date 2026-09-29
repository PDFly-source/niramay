"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useNiramayStore } from "@/lib/store";
import { useMounted } from "@/hooks/useMounted";
import {
  Brain,
  Wind,
  Flame,
  Activity,
  Bone,
  ShieldCheck,
  ArrowRight,
  Sparkles,
} from "lucide-react";

interface BodyRegion {
  id: string;
  nameEn: string;
  nameAs: string;
  symptomSlug: string;
  categoryFilter: string;
  descriptionEn: string;
  descriptionAs: string;
  commonAilments: { en: string; as: string }[];
  color: string;
  activeColor: string;
}

const BODY_REGIONS: BodyRegion[] = [
  {
    id: "head",
    nameEn: "Head, Mind & Sinus",
    nameAs: "মূৰ, মগজু আৰু চাইনাছ",
    symptomSlug: "headache-tension",
    categoryFilter: "sleep-stress",
    descriptionEn: "Headaches, migraines, sinusitis block, brain fog, and tension relief.",
    descriptionAs: "মূৰৰ বিষ, আধকপালী, চাইনাছ আৰু মানসিক ক্লান্তিৰ প্ৰাকৃতিক উপশম।",
    commonAilments: [
      { en: "Tension Headache", as: "মূৰৰ বিষ" },
      { en: "Sinus Congestion", as: "চাইনাছ" },
      { en: "Migraine", as: "আধকপালী" },
    ],
    color: "#FDE68A", // amber-200
    activeColor: "#D97706", // amber-600
  },
  {
    id: "throat",
    nameEn: "Throat, Lungs & Chest",
    nameAs: "ডিঙি, হাওঁফাওঁ আৰু বুকু",
    symptomSlug: "sore-throat",
    categoryFilter: "respiratory",
    descriptionEn: "Sore throat, dry cough, phlegm, asthma, and chest warmth.",
    descriptionAs: "ডিঙিৰ খচখচনি, শুকান কাহ, কফ আৰু শ্বাসতন্ত্ৰৰ কাঢ়া।",
    commonAilments: [
      { en: "Sore Throat", as: "ডিঙিৰ খচখচনি" },
      { en: "Dry / Wet Cough", as: "কাহ আৰু কফ" },
      { en: "Common Cold", as: "চৰ্দি" },
    ],
    color: "#BAE6FD", // sky-200
    activeColor: "#0284C7", // sky-600
  },
  {
    id: "stomach",
    nameEn: "Stomach, Gut & Liver",
    nameAs: "পেট, পাচন আৰু যকৃৎ",
    symptomSlug: "acidity",
    categoryFilter: "digestive",
    descriptionEn: "Acidity, heartburn, gas, bloating, indigestion, and diarrhea.",
    descriptionAs: "অমলপিত্ত, গেছ, বদহজম, কোষ্ঠকাঠিন্য আৰু পেটৰ বিষৰ মহৌষধ।",
    commonAilments: [
      { en: "Acidity / Heartburn", as: "অমলপিত্ত / বুকুপোৰা" },
      { en: "Bloating & Gas", as: "পেটৰ গেছ" },
      { en: "Indigestion", as: "বদহজম" },
    ],
    color: "#FED7AA", // orange-200
    activeColor: "#EA580C", // orange-600
  },
  {
    id: "skin",
    nameEn: "Skin, Scalp & Wounds",
    nameAs: "ছাল, চুলি আৰু ক্ষতস্থান",
    symptomSlug: "dry-skin",
    categoryFilter: "skin",
    descriptionEn: "Allergic rashes, eczema, cuts, minor burns, boils, and dandruff.",
    descriptionAs: "খজুৱতি, ফোহা, সামান্য পোৰা ঘা আৰু ছালৰ পৰিষ্কাৰক লেপ।",
    commonAilments: [
      { en: "Skin Rashes / Itch", as: "খজুৱতি আৰু চৰ্মৰোগ" },
      { en: "Minor Scalds / Burns", as: "পোৰা ঘা" },
      { en: "Boils & Pimples", as: "ফোহা" },
    ],
    color: "#BBF7D0", // green-200
    activeColor: "#16A34A", // green-600
  },
  {
    id: "joints",
    nameEn: "Joints, Spine & Muscles",
    nameAs: "গাঁঠি, কঁকাল আৰু পেশী",
    symptomSlug: "joint-pain",
    categoryFilter: "pain",
    descriptionEn: "Arthritis, knee pain, lower backache, sprains, and stiffness.",
    descriptionAs: "গাঁঠিৰ বিষ, আঠুৰ বিষ, কঁকালৰ বিষ আৰু পেশীৰ মচকা খোৱা।",
    commonAilments: [
      { en: "Knee & Joint Ache", as: "গাঁঠিৰ বিষ" },
      { en: "Backache", as: "কঁকালৰ বিষ" },
      { en: "Sprain & Swelling", as: "মচকা খোৱা" },
    ],
    color: "#DDD6FE", // purple-200
    activeColor: "#7C3AED", // purple-600
  },
  {
    id: "immunity",
    nameEn: "Vitality, Fever & Immunity",
    nameAs: "সামগ্ৰিক স্বাস্থ্য আৰু ৰোগ প্ৰতিৰোধ",
    symptomSlug: "low-immunity",
    categoryFilter: "seasonal",
    descriptionEn: "Mild seasonal fever, chronic fatigue, low vitality, and detox.",
    descriptionAs: "মৃদু জ্বৰ, শৰীৰৰ দুৰ্বলতা আৰু ঋতুজনিত প্ৰতিৰোধ ক্ষমতা।",
    commonAilments: [
      { en: "Mild Fever", as: "মৃদু জ্বৰ" },
      { en: "Chronic Fatigue", as: "ক্লান্তি আৰু দুৰ্বলতা" },
      { en: "Seasonal Immunity", as: "ৰোগ প্ৰতিৰোধ" },
    ],
    color: "#FBCFE8", // pink-200
    activeColor: "#DB2777", // pink-600
  },
];

export const InteractiveBodyMap: React.FC = () => {
  const router = useRouter();
  const mounted = useMounted();
  const { languageMode } = useNiramayStore();
  const currentMode = mounted ? languageMode : "bilingual";
  const isEn = currentMode === "en";
  const isAs = currentMode === "as";

  const [activeRegion, setActiveRegion] = useState<BodyRegion>(BODY_REGIONS[0]);

  const handleSelectRegion = (region: BodyRegion) => {
    setActiveRegion(region);
  };

  const handleNavigate = (region: BodyRegion) => {
    router.push(`/symptoms?category=${region.categoryFilter}`);
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-amber-200/80 shadow-md">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-200">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold mb-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-700" />
            <span>
              {isAs ? "শৰীৰৰ অংগ অনুসৰি বিচাৰক" : "Visual Body Navigator"}
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-serif font-black text-stone-900">
            {isAs
              ? "শৰীৰৰ মানচিত্ৰ: বিষ বা অস্বস্তি হোৱা স্থানত স্পৰ্শ কৰক"
              : isEn
              ? "Interactive Body Map: Tap where it hurts"
              : "Interactive Body Map / শৰীৰৰ মানচিত্ৰ"}
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 mt-1">
            {isAs
              ? "আপোনাৰ সমস্যা থকা অংশত ক্লিক কৰি তৎক্ষণাত উপযুক্ত কাঢ়া আৰু উপচাৰ লাভ কৰক।"
              : "Touch or click any anatomical region to jump directly to authentic kitchen remedies."}
          </p>
        </div>

        <Link
          href="/symptoms"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-stone-100 hover:bg-stone-200 text-stone-800 transition self-start sm:self-auto"
        >
          <span>{isAs ? "সকলো লক্ষণ চাওক" : "Browse All Symptoms"}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-6">
        {/* SVG Interactive Body Canvas Left */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center relative">
          <div className="w-full max-w-[280px] sm:max-w-[320px] aspect-[1/1.5] relative bg-gradient-to-b from-amber-50/40 to-stone-50 rounded-3xl border border-stone-200 p-4 flex items-center justify-center">
            {/* SVG Anatomy Map */}
            <svg
              viewBox="0 0 200 320"
              className="w-full h-full drop-shadow-sm select-none"
            >
              {/* Silhouette Outline Background */}
              <path
                d="M 100 20 C 115 20, 125 32, 125 48 C 125 60, 115 68, 108 72 C 122 75, 140 82, 148 95 L 175 160 C 178 168, 172 174, 165 170 L 145 130 L 140 185 L 145 285 C 146 295, 134 298, 130 288 L 115 210 L 105 210 L 100 210 L 95 210 L 85 288 C 81 298, 69 295, 70 285 L 75 185 L 70 130 L 50 170 C 43 174, 37 168, 40 160 L 67 95 C 75 82, 93 75, 107 72 C 100 68, 90 60, 90 48 C 90 32, 100 20, 100 20 Z"
                fill="#F5F5F4"
                stroke="#D6D3D1"
                strokeWidth="2.5"
                strokeLinejoin="round"
              />

              {/* Region 1: Head & Mind */}
              <circle
                cx="100"
                cy="44"
                r="22"
                fill={activeRegion.id === "head" ? "#D97706" : "#FDE68A"}
                stroke="#B45309"
                strokeWidth="2"
                className="cursor-pointer transition-all hover:scale-105"
                onClick={() => handleSelectRegion(BODY_REGIONS[0])}
              />
              <text
                x="100"
                y="48"
                textAnchor="middle"
                fontSize="10"
                fontWeight="bold"
                fill={activeRegion.id === "head" ? "#FFFFFF" : "#78350F"}
                className="pointer-events-none"
              >
                1
              </text>

              {/* Region 2: Throat & Chest */}
              <ellipse
                cx="100"
                cy="95"
                rx="24"
                ry="16"
                fill={activeRegion.id === "throat" ? "#0284C7" : "#BAE6FD"}
                stroke="#0369A1"
                strokeWidth="2"
                className="cursor-pointer transition-all hover:scale-105"
                onClick={() => handleSelectRegion(BODY_REGIONS[1])}
              />
              <text
                x="100"
                y="99"
                textAnchor="middle"
                fontSize="10"
                fontWeight="bold"
                fill={activeRegion.id === "throat" ? "#FFFFFF" : "#0369A1"}
                className="pointer-events-none"
              >
                2
              </text>

              {/* Region 3: Stomach & Gut */}
              <ellipse
                cx="100"
                cy="142"
                rx="26"
                ry="20"
                fill={activeRegion.id === "stomach" ? "#EA580C" : "#FED7AA"}
                stroke="#C2410C"
                strokeWidth="2"
                className="cursor-pointer transition-all hover:scale-105"
                onClick={() => handleSelectRegion(BODY_REGIONS[2])}
              />
              <text
                x="100"
                y="146"
                textAnchor="middle"
                fontSize="10"
                fontWeight="bold"
                fill={activeRegion.id === "stomach" ? "#FFFFFF" : "#9A3412"}
                className="pointer-events-none"
              >
                3
              </text>

              {/* Region 4: Skin & Scalp (Arms & Outer Body) */}
              <circle
                cx="46"
                cy="148"
                r="13"
                fill={activeRegion.id === "skin" ? "#16A34A" : "#BBF7D0"}
                stroke="#15803D"
                strokeWidth="2"
                className="cursor-pointer transition-all hover:scale-105"
                onClick={() => handleSelectRegion(BODY_REGIONS[3])}
              />
              <circle
                cx="169"
                cy="148"
                r="13"
                fill={activeRegion.id === "skin" ? "#16A34A" : "#BBF7D0"}
                stroke="#15803D"
                strokeWidth="2"
                className="cursor-pointer transition-all hover:scale-105"
                onClick={() => handleSelectRegion(BODY_REGIONS[3])}
              />
              <text
                x="169"
                y="152"
                textAnchor="middle"
                fontSize="9"
                fontWeight="bold"
                fill={activeRegion.id === "skin" ? "#FFFFFF" : "#14532D"}
                className="pointer-events-none"
              >
                4
              </text>

              {/* Region 5: Joints (Knees & Limbs) */}
              <ellipse
                cx="88"
                cy="225"
                rx="11"
                ry="11"
                fill={activeRegion.id === "joints" ? "#7C3AED" : "#DDD6FE"}
                stroke="#6D28D9"
                strokeWidth="2"
                className="cursor-pointer transition-all hover:scale-105"
                onClick={() => handleSelectRegion(BODY_REGIONS[4])}
              />
              <ellipse
                cx="127"
                cy="225"
                rx="11"
                ry="11"
                fill={activeRegion.id === "joints" ? "#7C3AED" : "#DDD6FE"}
                stroke="#6D28D9"
                strokeWidth="2"
                className="cursor-pointer transition-all hover:scale-105"
                onClick={() => handleSelectRegion(BODY_REGIONS[4])}
              />
              <text
                x="127"
                y="229"
                textAnchor="middle"
                fontSize="9"
                fontWeight="bold"
                fill={activeRegion.id === "joints" ? "#FFFFFF" : "#5B21B6"}
                className="pointer-events-none"
              >
                5
              </text>

              {/* Region 6: Immunity / Vitality Ring */}
              <circle
                cx="100"
                cy="185"
                r="14"
                fill={activeRegion.id === "immunity" ? "#DB2777" : "#FBCFE8"}
                stroke="#BE185D"
                strokeWidth="2"
                className="cursor-pointer transition-all hover:scale-105"
                onClick={() => handleSelectRegion(BODY_REGIONS[5])}
              />
              <text
                x="100"
                y="189"
                textAnchor="middle"
                fontSize="9"
                fontWeight="bold"
                fill={activeRegion.id === "immunity" ? "#FFFFFF" : "#831843"}
                className="pointer-events-none"
              >
                6
              </text>
            </svg>
          </div>

          <div className="text-[11px] text-stone-500 font-semibold mt-3 flex items-center gap-1.5">
            <span>👆 Tap numbered body points to explore remedies</span>
          </div>
        </div>

        {/* Region Detail & Action Cards Right */}
        <div className="lg:col-span-7 space-y-4">
          {/* Quick Buttons Selector */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {BODY_REGIONS.map((region, idx) => (
              <button
                key={region.id}
                onClick={() => handleSelectRegion(region)}
                className={`p-2.5 rounded-xl text-left border transition ${
                  activeRegion.id === region.id
                    ? "bg-amber-100/90 border-amber-400 font-bold text-amber-950 shadow-xs"
                    : "bg-stone-50 hover:bg-stone-100 border-stone-200 text-stone-700 font-medium"
                }`}
              >
                <div className="text-[11px] font-mono text-stone-400">
                  Zone {idx + 1}
                </div>
                <div className="text-xs truncate">{region.nameEn}</div>
                <div className="text-[10px] text-emerald-800 font-semibold truncate">
                  {region.nameAs}
                </div>
              </button>
            ))}
          </div>

          {/* Detailed Region Card */}
          <div className="bg-stone-50 rounded-2xl p-5 border border-stone-200 space-y-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 bg-amber-100 px-2.5 py-0.5 rounded-full">
                  Zone Identified
                </span>
                <h3 className="text-lg sm:text-xl font-serif font-black text-stone-900 mt-1">
                  {activeRegion.nameEn}
                </h3>
                <div className="text-sm font-bold text-emerald-800">
                  {activeRegion.nameAs}
                </div>
              </div>

              <button
                onClick={() => handleNavigate(activeRegion)}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold bg-amber-700 hover:bg-amber-800 text-white shadow-xs transition shrink-0"
              >
                <span>{isAs ? "উপচাৰসমূহ খোলক" : "View Remedies"}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <p className="text-xs text-stone-600 leading-relaxed">
              {isAs ? activeRegion.descriptionAs : activeRegion.descriptionEn}
            </p>

            {/* Common ailments in this zone */}
            <div>
              <div className="text-[11px] font-bold uppercase text-stone-500 tracking-wider mb-2">
                {isAs ? "সাধাৰণতে হোৱা সমস্যাসমূহ:" : "Common Conditions in this Zone:"}
              </div>
              <div className="flex flex-wrap gap-2">
                {activeRegion.commonAilments.map((a, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1.5 text-xs bg-white border border-stone-200 px-3 py-1.5 rounded-xl text-stone-800 font-medium"
                  >
                    <span>{a.en}</span>
                    <span className="text-[11px] text-emerald-800 font-bold">
                      ({a.as})
                    </span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
