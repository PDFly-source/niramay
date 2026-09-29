"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { useNiramayStore } from "@/lib/store";
import { useMounted } from "@/hooks/useMounted";
import {
  Calendar,
  Sun,
  CloudRain,
  Wind,
  Flame,
  ThermometerSnowflake,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Compass,
  Heart,
  Droplet,
  Coffee,
} from "lucide-react";
import { REMEDIES } from "@/lib/data/remedies";
import { extractString } from "@/lib/utils";

interface SeasonDetail {
  id: string;
  nameEn: string;
  nameAs: string;
  monthsEn: string;
  monthsAs: string;
  assameseMonths: string;
  dosha: { en: string; as: string };
  nature: { en: string; as: string };
  proverb: { text: string; meaningEn: string; meaningAs: string };
  guidance: {
    dietEn: string[];
    dietAs: string[];
    lifestyleEn: string[];
    lifestyleAs: string[];
    preventiveHerbsEn: string[];
    preventiveHerbsAs: string[];
  };
  recommendedSymptomSlugs: string[];
  featuredRemedyIds: string[];
  accentColor: string;
  icon: React.ElementType;
}

const RITUCHARYA_SEASONS: SeasonDetail[] = [
  {
    id: "spring",
    nameEn: "Bordoi / Bohag (Spring)",
    nameAs: "বসন্ত / ব'হাগ-জেঠ",
    monthsEn: "March – April",
    monthsAs: "চ'ত – ব'হাগ",
    assameseMonths: "চ'ত – ব'হাগ – জেঠ",
    dosha: { en: "Kapha Liquefaction & Pitta Genesis", as: "কফ প্ৰকোপ আৰু পিত্ত সঞ্চয়" },
    nature: { en: "Blooming new foliage, pollen dispersal, infectious viral transition", as: "নতুন কুঁহিপাত, ফুলৰ ৰেণু আৰু বসন্তকালীন চৰ্ম সংক্ৰমণ" },
    proverb: {
      text: "ব'হাগত তিতা, জেঠত খাৰ। শাওণত মিঠৈ, ভাদত ওল।",
      meaningEn: "Eat bitter herbs in Bohag (April) to cleanse the blood; consume alkali (khar) in Jeth (May) to regulate gut fire.",
      meaningAs: "ব'হাগ মাহত নিম, তিতা ফুল খাই তেজ চাফা কৰক; জেঠত খাৰ খাই অগ্নি সমতা ৰাখক।",
    },
    guidance: {
      dietEn: [
        "Include bitter tonics daily: Neem leaves fried with eggplant, Tita Phool, and tender Sewali shoots.",
        "Favor light, easily digestible grains and reduce heavy, oily fried sweets.",
        "Drink warm water infused with dry ginger and coriander seeds.",
      ],
      dietAs: [
        "নিতৌ খাদ্যত তিতা বস্তু ৰাখক: কচি নিমপাত, তিতা ফুল আৰু শেৱালিৰ কচি পাত।",
        "লঘু আৰু সহজপাচ্য খাদ্য খাওক; অতিপাত তেল-ঘিউ আৰু মিঠা পৰিহাৰ কৰক।",
        "শুকান আদা আৰু ধনীয়া সিজোৱা কুহুমীয়া পানী খাওক।",
      ],
      lifestyleEn: [
        "Morning dry brushing and light brisk walks to combat seasonal spring lethargy.",
        "Steam inhalation with Tulsi leaves to clear pollen allergies and sneezing.",
      ],
      lifestyleAs: [
        "পুৱা খোজ কঢ়া আৰু যোগাভ্যাসেৰে বতৰৰ এলেহুৱা ভাব আৰু কফ দূৰ কৰক।",
        "তুলসী পাতৰ ভাপ লৈ ধূলি-ৰেণুৰ এলাৰ্জি আৰু হাঁচি বন্ধ কৰক।",
      ],
      preventiveHerbsEn: ["Neem", "Tita Phool", "Krishna Tulsi", "Dhania"],
      preventiveHerbsAs: ["নিম", "তিতা ফুল", "কৃষ্ণ তুলসী", "ধনীয়া"],
    },
    recommendedSymptomSlugs: ["common-cold", "seasonal-allergies", "skin-rashes"],
    featuredRemedyIds: ["assamese-tulsi-ginger-black-pepper-kadha", "turmeric-milk-respiratory"],
    accentColor: "from-emerald-700 to-teal-800",
    icon: Sparkles,
  },
  {
    id: "summer",
    nameEn: "Grishma (Scorching Summer)",
    nameAs: "গ্ৰীষ্ম / জেঠ-আহাৰ",
    monthsEn: "May – June",
    monthsAs: "জেঠ – আহাৰ",
    assameseMonths: "জেঠ – আহাৰ",
    dosha: { en: "Pitta Aggravation & Vata Accumulation", as: "পিত্ত প্ৰকোপ আৰু ধাতু ক্ষয়" },
    nature: { en: "Extreme humid heat, dehydration risk, solar exhaustion, acid spikes", as: "প্ৰখৰ ৰ'দ, শৰীৰৰ পানী কমি যোৱা আৰু পেটৰ পোৰণি" },
    proverb: {
      text: "ডাকৰ বচন: আহাৰৰ পানী, জেঠৰ ধূলি। বতাহে কঁপে কঁঠালৰ তুলি।",
      meaningEn: "Stay hydrated with sour herbal broths and shade during intense pre-monsoon heat.",
      meaningAs: "গ্ৰীষ্মৰ প্ৰখৰ উত্তাপত টেঙা জোল আৰু প্ৰচুৰ পানীৰে শৰীৰ শীতল ৰাখক।",
    },
    guidance: {
      dietEn: [
        "Sip cooling fresh lime water with black salt (Kaji Nemu Sorbot) or tender coconut water.",
        "Cook light sour digestive broths with Tengesi Tenga, Bilahi (tomato), or raw mango.",
        "Strictly avoid heavily spiced, hot chili curries that incite internal heartburn.",
      ],
      dietAs: [
        "কাজী নেমুৰ চৰবত, কলা নিমখ বা ডাব নাৰিকলৰ পানীৰে শৰীৰ জুৰ পেলাওক।",
        "টেঙেচী টেঙা বা কেঁচা আমেৰে পাতল টেঙা আঞ্জা খাই পেট শীতল ৰাখক।",
        "অতিপাত জ্বলা-মছলা আৰু গৰম খাদ্য পৰিহাৰ কৰক যাতে বুকু নোপোৰে।",
      ],
      lifestyleEn: [
        "Avoid mid-day sun exposure between 11 AM and 3 PM.",
        "Apply cooling Jetuka (henna) or sandalwood paste to soles and palms if experiencing burning sensations.",
      ],
      lifestyleAs: [
        "দুপৰীয়া প্ৰখৰ ৰ'দত ঘূৰা-ফুৰা নকৰিব।",
        "হাত-ভৰিৰ তলুৱা জ্বলা-পোৰা কৰিলে জেতুকা বা চন্দনৰ প্ৰলেপ দিয়ক।",
      ],
      preventiveHerbsEn: ["Tengesi Tenga", "Kaji Nemu", "Ghritakumari", "Pudina"],
      preventiveHerbsAs: ["টেঙেচী টেঙা", "কাজী নেমু", "ঘৃতকুমাৰী", "পদিনা"],
    },
    recommendedSymptomSlugs: ["acidity", "indigestion", "headache-tension"],
    featuredRemedyIds: ["ginger-ajwain-acidity-water", "cumin-coriander-fennel-ccf-tea"],
    accentColor: "from-amber-600 to-orange-700",
    icon: Sun,
  },
  {
    id: "monsoon",
    nameEn: "Bordoisila / Barsha (Monsoon)",
    nameAs: "বৰ্ষা / শাওণ-ভাদ",
    monthsEn: "July – August",
    monthsAs: "শাওণ – ভাদ",
    assameseMonths: "আহাৰ – শাওণ – ভাদ",
    dosha: { en: "Vata Vitiation & Digestive Fire (Agni) Depression", as: "বাত প্ৰকোপ আৰু মন্দাগ্নি" },
    nature: { en: "Torrential Brahmaputra rains, high humidity, waterborne amoebic infections", as: "প্ৰচুৰ বৰষুণ, সেমেকা বতাহ আৰু পেটৰ বীজাণু সংক্ৰমণ" },
    proverb: {
      text: "শাওণৰ শাক, ভাদৰ ওল। ভেদাইলতাৰ আঞ্জাই কৰে নিৰ্মূল।",
      meaningEn: "During damp monsoon, cook Bhedailota vine and warm ginger fish broth to shield the gut against dysentery.",
      meaningAs: "বৰ্ষাকালত ভেদাইলতা আৰু আদাৰ জোল খালে পেটৰ আমাশয় আৰু কৃমি নাশ হয়।",
    },
    guidance: {
      dietEn: [
        "Boil all drinking water thoroughly; consume Bhedailota fish broth once weekly.",
        "Add pinch of Hing (Asafoetida) and dry roasted Jeera to all cooked lentils.",
        "Eat tender Manimuni and Matikanduri to reinforce the gut lining against amoebic dysentery.",
      ],
      dietAs: [
        "খোৱা পানী ভালদৰে উতলাই কুহুমীয়াকৈ খাওক; সপ্তাহত এবাৰ ভেদাইলতাৰ আঞ্জা খাওক।",
        "দাইল বা তৰকাৰীত হিং আৰু ভজা জিৰাৰ ব্যৱহাৰ বৃদ্ধি কৰক।",
        "মানিমুনি আৰু মাটিকান্দুৰী খাই পেটৰ ঘা আৰু আমাশয়ৰ পৰা ৰক্ষা পাওক।",
      ],
      lifestyleEn: [
        "Keep feet warm and dry; immediately wash with salt water after stepping in muddy puddle runoff.",
        "Fumigate rooms with dried Neem and Pasotia leaf smoke to repel rain-season insects.",
      ],
      lifestyleAs: [
        "ভৰি শুকানকৈ ৰাখক; বোকা পানীত নামিলে নিমখ পানীৰে ভৰি চাফা কৰক।",
        "শুকান নিম আৰু পচতীয়া পাতৰ ধোঁৱা দি মহ-ডাঁহ নিবাৰণ কৰক।",
      ],
      preventiveHerbsEn: ["Bhedailota", "Manimuni", "Matikanduri", "Hing"],
      preventiveHerbsAs: ["ভেদাইলতা", "মানিমুনি", "মাটিকান্দুৰী", "হিং"],
    },
    recommendedSymptomSlugs: ["diarrhea-dysentery", "indigestion", "bloating-gas"],
    featuredRemedyIds: ["bhedailota-fish-broth-gut-repair", "ajwain-black-salt-digestive-water"],
    accentColor: "from-blue-700 to-indigo-900",
    icon: CloudRain,
  },
  {
    id: "autumn",
    nameEn: "Xorot (Autumn / Early Festivities)",
    nameAs: "শৰৎ / আহিন-কাতি",
    monthsEn: "September – October",
    monthsAs: "আহিন – কাতি",
    assameseMonths: "আহিন – কাতি",
    dosha: { en: "Pitta Pacification & Post-Monsoon Recalibration", as: "পিত্ত প্ৰশমন" },
    nature: { en: "Clear blue skies, blooming Sewali phool, sweet evening chill", as: "নীলা আকাশ, সুগন্ধি শেৱালি ফুল আৰু ফৰকাল বতৰ" },
    proverb: {
      text: "আহিনৰ নিয়ৰ, কাতিৰ ধান। শেৱালিৰ সুবাসে জুৰায় প্ৰাণ।",
      meaningEn: "As autumn dew falls, drink bitter Sewali decoctions to cleanse summer residual bile and fortify joints.",
      meaningAs: "শৰতৰ নিয়ৰে শৰীৰ জুৰায়; শেৱালি পাতৰ ৰসে পুৰণি বিষ আৰু পিত্ত নাশ কৰে।",
    },
    guidance: {
      dietEn: [
        "Harvest fragrant Sewali leaves and fry lightly with small river fish for liver vitality.",
        "Drink warm water sweetened with a spoonful of raw golden mustard honey.",
        "Incorporate Silikha (Haritaki) with a pinch of rock salt after meals.",
      ],
      dietAs: [
        "শেৱালিৰ কচি পাত সৰু মাছৰ লগত ভাজি খাই যকৃত আৰু তেজ সতেজ ৰাখক।",
        "এচামুচ কেঁচা মৌ কুহুমীয়া পানীৰ লগত পুৱা খাওক।",
        "আহাৰৰ পিছত এটুকুৰা শিলিখা কলা নিমখৰ সৈতে চোবাই খাওক।",
      ],
      lifestyleEn: [
        "Walk in the early morning autumn dew (আহিনৰ নিয়ৰ) to refresh ocular vision.",
        "Gentle oil massage with warm sesame/mustard oil before evening baths.",
      ],
      lifestyleAs: [
        "পুৱাৰ নিয়ৰ ভৰিৰ তলুৱাত লগালে চকুৰ দৃষ্টিশক্তি উজ্জ্বল হয়।",
        "গা ধুৱাৰ আগত মিঠাতেলৰ পাতল মালিশে গাৰ বিষ কমায়।",
      ],
      preventiveHerbsEn: ["Sewali Phool", "Silikha", "Amlokhi", "Mou (Honey)"],
      preventiveHerbsAs: ["শেৱালি ফুল", "শিলিখা", "আমলখি", "কেঁচা মৌ"],
    },
    recommendedSymptomSlugs: ["joint-pain", "fever-viral", "skin-rashes"],
    featuredRemedyIds: ["haldi-salt-warm-gargle", "spiced-nutmeg-cardamom-bedtime-milk"],
    accentColor: "from-teal-700 to-emerald-900",
    icon: Wind,
  },
  {
    id: "winter",
    nameEn: "Hemonto & Xit (Chilly Winter)",
    nameAs: "হেমন্ত আৰু শীত / আঘোণ-মাঘ",
    monthsEn: "November – February",
    monthsAs: "আঘোণ – মাঘ – ফাগুন",
    assameseMonths: "আঘোণ – পুহ – মাঘ – ফাগুন",
    dosha: { en: "Vata Peak & Kapha Accumulation", as: "বাত প্ৰকোপ আৰু কফ সঞ্চয়" },
    nature: { en: "Biting fog, cold dry air, bronchial stiffness, sore throats, sluggish joints", as: "গা কঁপোৱা জাৰ, ডাঠ কুঁৱলী আৰু গাঁঠিৰ বিষ" },
    proverb: {
      text: "মাঘৰ জাৰে ম'হৰ শিঙকো ফাল। আদা-জালুকৰ ক্বাথেই আকালৰ কাল।",
      meaningEn: "Against bone-chilling Magh winter cold, sip ginger-pepper-tulsi brew and warm turmeric milk daily.",
      meaningAs: "মাঘৰ তীব্ৰ জাৰত আদা-জালুক আৰু হালধি গাখীৰে শৰীৰক সতেজ আৰু ৰোগমুক্ত কৰি ৰাখে।",
    },
    guidance: {
      dietEn: [
        "Drink restorative Golden Turmeric Milk with crushed black pepper before bed.",
        "Eat generous servings of warm Mustard greens (Sorisha Xaak) and garlic-infused lentils.",
        "Boil Tulsi, Aada (ginger), and Jaluk (black pepper) into the morning immunity kadha.",
        "Use pure cold-pressed Mustard oil (মিঠাতেল) generously in daily cooking.",
      ],
      dietAs: [
        "শুবৰ সময়ত জালুক আৰু হালধিযুক্ত গৰম গাখীৰ খাওক।",
        "নহৰু আৰু সৰিয়হ শাকৰ গৰম আঞ্জাই শীতৰ ক্লান্তি দূৰ কৰে।",
        "পুৱা তুলসী, আদা আৰু জালুকৰ ক্বাথ খাই ডিঙি আৰু হাঁওফাঁও সুস্থ ৰাখক।",
        "খাদ্যত খাঁটি সৰিয়হৰ মিঠাতেল ব্যৱহাৰ কৰক।",
      ],
      lifestyleEn: [
        "Rub warm mustard oil with a crushed garlic clove on soles of feet before sleeping.",
        "Sunbathe in mid-morning sunshine for 20 minutes to absorb natural Vitamin D.",
      ],
      lifestyleAs: [
        "নিশা শুবৰ সময়ত নহৰু দিয়া গৰম মিঠাতেল ভৰিৰ তলুৱাত মালিচ কৰক।",
        "পুৱাৰ ৰ'দত ২০ মিনিট বহি প্ৰাকৃতিক ভিটামিন ডি গ্ৰহণ কৰক।",
      ],
      preventiveHerbsEn: ["Aada (Ginger)", "Jaluk (Black Pepper)", "Haldi", "Sorisha"],
      preventiveHerbsAs: ["আদা", "জালুক", "হালধি", "সৰিয়হ শাক"],
    },
    recommendedSymptomSlugs: ["common-cold", "sore-throat", "joint-pain", "headache-tension"],
    featuredRemedyIds: ["assamese-tulsi-ginger-black-pepper-kadha", "spiced-nutmeg-cardamom-bedtime-milk"],
    accentColor: "from-sky-800 to-indigo-950",
    icon: ThermometerSnowflake,
  },
];

export default function RitucharyaPage() {
  const mounted = useMounted();
  const { languageMode } = useNiramayStore();
  const currentMode = mounted ? languageMode : "bilingual";
  const isAs = currentMode === "as";
  const isEn = currentMode === "en";

  // Automatically compute current season from local month (0 = Jan, 11 = Dec)
  const autoSeasonId = useMemo(() => {
    if (!mounted) return "autumn";
    const month = new Date().getMonth();
    if (month >= 2 && month <= 3) return "spring"; // Mar - Apr
    if (month >= 4 && month <= 5) return "summer"; // May - Jun
    if (month >= 6 && month <= 7) return "monsoon"; // Jul - Aug
    if (month >= 8 && month <= 9) return "autumn"; // Sep - Oct
    return "winter"; // Nov - Feb
  }, [mounted]);

  const [selectedSeasonId, setSelectedSeasonId] = useState<string | null>(null);
  const activeSeasonId = selectedSeasonId || autoSeasonId;

  const currentSeason = useMemo(() => {
    return (
      RITUCHARYA_SEASONS.find((s) => s.id === activeSeasonId) ||
      RITUCHARYA_SEASONS[0]
    );
  }, [activeSeasonId]);

  const isCurrentLiveSeason = activeSeasonId === autoSeasonId;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-14">
      {/* Page Header */}
      <div className="mb-8">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold">
            <Calendar className="w-3.5 h-3.5 text-emerald-700" />
            <span>
              {isAs ? "অসমীয়া পৰম্পৰাগত ঋতুচৰ্যা" : "Traditional Assamese Ritucharya"}
            </span>
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold border border-amber-300">
            <Compass className="w-3.5 h-3.5 text-amber-700" />
            <span>
              {isAs ? "১০০% স্থানীয় বতৰ অনুসৰণ" : "100% On-Device Seasonal Adaptation"}
            </span>
          </div>
        </div>

        <h1 className="text-3xl sm:text-5xl font-serif font-black text-stone-900 tracking-tight">
          {isAs
            ? "ঋতুচৰ্যা: বতৰ আৰু ঋতু অনুযায়ী ঘৰুৱা স্বাস্থ্যবিধি"
            : isEn
            ? "Ritucharya: Seasonal Wellness & Ayurvedic Calendar"
            : "Ritucharya: Live Seasonal & Weather-Adaptive Dashboard"}
        </h1>
        <p className="text-sm sm:text-base text-stone-600 mt-2 max-w-3xl leading-relaxed">
          {isAs
            ? "অসমৰ ছয় ঋতুৰ পৰিৱৰ্তনৰ লগে লগে আমাৰ শৰীৰৰ কফ, পিত্ত আৰু বাত দোষ সলনি হয়। পুৰণি অসমীয়া ডাকৰ বচন আৰু আয়ুৰ্বেদিক জ্ঞানৰ আধাৰত প্ৰতিটো ঋতুৰ বাবে উপযুক্ত পথ্য, বনৌষধি আৰু সাৱধানতা জানক।"
            : "Assam's six micro-climates bring dramatic shifts in atmospheric moisture, pollen, and internal doshas. Align your kitchen diet, herbal teas, and daily habits with ancient Assamese wisdom."}
        </p>
      </div>

      {/* Season Navigation Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-8 no-scrollbar scrollbar-none">
        {RITUCHARYA_SEASONS.map((season) => {
          const isSelected = activeSeasonId === season.id;
          const isLiveNow = autoSeasonId === season.id;
          const Icon = season.icon;

          return (
            <button
              key={season.id}
              onClick={() => setSelectedSeasonId(season.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold whitespace-nowrap transition cursor-pointer border ${
                isSelected
                  ? "bg-amber-700 text-onbrand border-amber-800 shadow-md ring-2 ring-amber-600/30"
                  : "bg-white text-stone-700 border-amber-200 hover:bg-amber-50"
              }`}
            >
              <Icon className="w-4 h-4 shrink-0" />
              <span>{isAs ? season.nameAs : season.nameEn}</span>
              {isLiveNow && (
                <span
                  className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full ${
                    isSelected
                      ? "bg-amber-950 text-amber-200"
                      : "bg-emerald-100 text-emerald-800"
                  }`}
                >
                  {isAs ? "বৰ্তমান" : "Active Now"}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Hero Banner for Selected Season */}
      <div
        className={`bg-gradient-to-r ${currentSeason.accentColor} text-onbrand rounded-3xl p-6 sm:p-10 shadow-xl mb-10 border border-white/10 relative overflow-hidden`}
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase tracking-wider font-extrabold px-3 py-1 rounded-full bg-white/20 backdrop-blur-xs">
                {currentSeason.monthsEn} ({currentSeason.assameseMonths})
              </span>
              {isCurrentLiveSeason && (
                <span className="text-xs uppercase tracking-wider font-extrabold px-3 py-1 rounded-full bg-emerald-400 text-stone-950">
                  ⚡ {isAs ? "বৰ্তমান চলিত বতৰ" : "Current Active Season in Assam"}
                </span>
              )}
            </div>

            <h2 className="text-2xl sm:text-4xl font-serif font-black">
              {isAs ? currentSeason.nameAs : currentSeason.nameEn}
            </h2>

            <p className="text-sm sm:text-base text-onbrand/90 leading-relaxed font-sans">
              {isAs ? currentSeason.nature.as : currentSeason.nature.en}
            </p>

            <div className="pt-2 text-xs font-semibold text-amber-200 flex items-center gap-2">
              <span className="font-bold text-onbrand">
                {isAs ? "প্ৰভাৱিত দোষ:" : "Dosha Dynamics:"}
              </span>
              <span>{isAs ? currentSeason.dosha.as : currentSeason.dosha.en}</span>
            </div>
          </div>

          {/* Traditional Proverb Callout */}
          <div className="bg-black/25 backdrop-blur-md p-5 rounded-2xl border border-white/15 max-w-sm shrink-0">
            <div className="text-[11px] font-bold uppercase tracking-wider text-amber-300 flex items-center gap-1.5 mb-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{isAs ? "পৰম্পৰাগত ডাকৰ বচন" : "Heritage Dakor Boson"}</span>
            </div>
            <p className="text-xs sm:text-sm font-serif font-bold text-onbrand leading-snug">
              &ldquo;{currentSeason.proverb.text}&rdquo;
            </p>
            <p className="text-[11px] text-onbrand/80 mt-1.5 leading-relaxed font-sans">
              {isAs
                ? currentSeason.proverb.meaningAs
                : currentSeason.proverb.meaningEn}
            </p>
          </div>
        </div>
      </div>

      {/* 3-Column Detailed Seasonal Guidance */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {/* Column 1: Diet & Kitchen Foods */}
        <div className="bg-white rounded-3xl p-6 border border-amber-200/80 shadow-xs">
          <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold mb-4">
            🍲
          </div>
          <h3 className="text-base font-bold text-stone-900 mb-2">
            {isAs ? "ঋতুকালীন খাদ্য আৰু পথ্য" : "Seasonal Kitchen Diet"}
          </h3>
          <p className="text-xs text-stone-500 mb-4">
            {isAs
              ? "এই বতৰত কি খাব আৰু কি খাদ্য পৰিহাৰ কৰিব:"
              : "What to cook and which foods to balance right now:"}
          </p>
          <ul className="space-y-2.5 text-xs text-stone-700 leading-relaxed">
            {(isAs ? currentSeason.guidance.dietAs : currentSeason.guidance.dietEn).map(
              (item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              )
            )}
          </ul>
        </div>

        {/* Column 2: Daily Lifestyle & Care */}
        <div className="bg-white rounded-3xl p-6 border border-amber-200/80 shadow-xs">
          <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold mb-4">
            🌿
          </div>
          <h3 className="text-base font-bold text-stone-900 mb-2">
            {isAs ? "দৈনন্দিন স্বাস্থ্যবিধি আৰু যত্ন" : "Daily Lifestyle & Care"}
          </h3>
          <p className="text-xs text-stone-500 mb-4">
            {isAs
              ? "শৰীৰ সুস্থ ৰাখিবলৈ পৰম্পৰাগত নিয়ম:"
              : "Lifestyle habits adapted to atmospheric moisture:"}
          </p>
          <ul className="space-y-2.5 text-xs text-stone-700 leading-relaxed">
            {(isAs
              ? currentSeason.guidance.lifestyleAs
              : currentSeason.guidance.lifestyleEn
            ).map((item, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3: Shielding Herbs & Teas */}
        <div className="bg-white rounded-3xl p-6 border border-amber-200/80 shadow-xs">
          <div className="w-10 h-10 rounded-2xl bg-rose-100 text-rose-800 flex items-center justify-center font-bold mb-4">
            🫖
          </div>
          <h3 className="text-base font-bold text-stone-900 mb-2">
            {isAs ? "প্ৰতিৰোধক বনৌষধি আৰু চাহ" : "Preventive Herbs & Teas"}
          </h3>
          <p className="text-xs text-stone-500 mb-4">
            {isAs
              ? "এই বতৰৰ প্ৰধান চাৰিবিধ সঞ্জীৱনী বনৌষধি:"
              : "Key indigenous herbs to stock in your pantry this season:"}
          </p>
          <div className="flex flex-wrap gap-2 mb-4">
            {(isAs
              ? currentSeason.guidance.preventiveHerbsAs
              : currentSeason.guidance.preventiveHerbsEn
            ).map((herb, idx) => (
              <span
                key={idx}
                className="px-3 py-1 rounded-full bg-stone-100 text-stone-800 text-xs font-semibold border border-stone-200"
              >
                🌿 {herb}
              </span>
            ))}
          </div>
          <p className="text-[11px] text-stone-500 leading-relaxed">
            {isAs
              ? "নিয়মীয়াকৈ এই বনৌষধিৰ পাতল কাঢ়া বা চাহ খালে বতৰৰ ৰোগৰ সংক্ৰমণৰ পৰা হাত সাৰিব পাৰি।"
              : "Drinking warm infusions of these local botanicals daily acts as a shield against seasonal immune dips."}
          </p>
        </div>
      </div>

      {/* Quick Launch Shortcuts into Verified Remedies for This Season */}
      <div className="bg-amber-50/70 rounded-3xl p-6 sm:p-8 border border-amber-200">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-800">
              {isAs ? "তাত্ক্ষণিক উপচাৰ" : "Recommended for this Season"}
            </span>
            <h3 className="text-xl sm:text-2xl font-serif font-black text-stone-900 mt-1">
              {isAs
                ? "এই বতৰৰ বিশেষ লক্ষণ আৰু নিৰাময়"
                : "Top Ailments & Verified Remedies for this Weather"}
            </h3>
          </div>
          <Link
            href="/symptoms"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-800 hover:text-amber-950"
          >
            <span>{isAs ? "সকলো লক্ষণ চাওক" : "Browse all symptom categories"}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {currentSeason.recommendedSymptomSlugs.map((slug) => {
            return (
              <Link
                key={slug}
                href={`/symptoms/${slug}`}
                className="p-4 rounded-2xl bg-white hover:bg-amber-100/50 border border-amber-200/90 shadow-2xs hover:shadow-md transition flex items-center justify-between group"
              >
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-amber-800">
                    {isAs ? "সততে হোৱা সমস্যা" : "Common Seasonal Ailment"}
                  </div>
                  <div className="text-sm font-bold text-stone-900 group-hover:text-amber-900 capitalize mt-0.5">
                    {slug.replace("-", " ")}
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-stone-400 group-hover:text-amber-800 group-hover:translate-x-1 transition" />
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
