"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useNiramayStore } from "@/lib/store";
import { useMounted } from "@/hooks/useMounted";
import {
  Sprout,
  Sun,
  Droplets,
  Bug,
  Calendar,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Search,
  BookOpen,
  Leaf,
  Layers,
} from "lucide-react";

interface GardenPlant {
  id: string;
  plantLibraryId: string;
  nameEn: string;
  nameAs: string;
  botanicalName: string;
  potType: { en: string; as: string };
  soilNeeds: { en: string; as: string };
  sunlight: { en: string; as: string };
  watering: { en: string; as: string };
  harvestTime: { en: string; as: string };
  pestSolution: { en: string; as: string };
  aitasTip: { en: string; as: string };
  difficulty: "easy" | "medium";
}

const GARDEN_PLANTS: GardenPlant[] = [
  {
    id: "tulsi",
    plantLibraryId: "tulsi",
    nameEn: "Krishna Tulsi (Holy Basil)",
    nameAs: "কৃষ্ণ তুলসী",
    botanicalName: "Ocimum sanctum",
    potType: { en: "Earthen pot (10-12 inch) or dooryard raised mound (তুলসীৰ ভেটি)", as: "মাটিৰ টাব (১০-১২ ইঞ্চি) বা পদূলিৰ তুলসীৰ ভেটি" },
    soilNeeds: { en: "Well-drained sandy loam enriched with aged cow dung manure", as: "পানী ওলাই যাব পৰা বালিমহীয়া মাটি আৰু শুকান গোবৰ সাৰ" },
    sunlight: { en: "Full sun; requires 4-6 hours direct morning sunlight", as: "পূৰ্ণ ৰ'দ; পুৱাৰ ৪-৬ ঘণ্টা সূৰ্যৰ পোহৰ প্ৰয়োজন" },
    watering: { en: "Moderate; water when top inch of soil feels dry. Never waterlog roots.", as: "পৰিমিত; মাটিৰ ওপৰভাগ শুকান হ'লেহে পানী দিব। গুৰিত পানী জমাব নালাগে।" },
    harvestTime: { en: "Pinch top shoots in early morning before high heat for peak eugenol content.", as: "পুৱাৰ ভাগত ওপৰৰ কচি পাত চিঙিব; মাজে মাজে ফুলৰ থোপা (মঞ্জৰী) কাটি দিলে গছ ঘন হয়।" },
    pestSolution: { en: "Spray wood ash water or diluted cow urine/neem oil for aphids.", as: "ছাই গুড়ি ছটিয়াব বা নিমতেল মিহলাই স্প্ৰে কৰিলে পোক-পৰুৱা নালাগে।" },
    aitasTip: { en: "Regularly pinch off purple flower spikes to keep foliage bushy and long-lived.", as: "আইতাৰ দিহা: তুলসীৰ ফুলৰ থোপা (মঞ্জৰী) কাটি থাকিলে গছজোপা বহুবছৰলৈ জোপোহা আৰু সতেজ হৈ থাকে।" },
    difficulty: "easy",
  },
  {
    id: "manimuni",
    plantLibraryId: "manimuni",
    nameEn: "Manimuni (Indian Pennywort)",
    nameAs: "মানিমুনি",
    botanicalName: "Centella asiatica",
    potType: { en: "Wide shallow earthen trough or shady garden corner", as: "বহল চাপৰ টাব বা বাৰীৰ সেমেকা চুক" },
    soilNeeds: { en: "Humus-rich, damp, organically fertile garden soil", as: "সেমেকা, পলসুৱা আৰু জৈৱিক সাৰেৰে চহকী মাটি" },
    sunlight: { en: "Partial shade to filtered dappled light; avoid harsh scorching sun", as: "পাতল ছাঁ বা পুৱাৰ সামান্য ৰ'দ; দুপৰীয়াৰ প্ৰখৰ ৰ'দত পাত জ্বলি যায়" },
    watering: { en: "High moisture; keep the root zone consistently moist.", as: "বেছি আৰ্দ্ৰতা লাগে; মাটিডৰা সদায় সেমেকাকৈ ৰাখিব।" },
    harvestTime: { en: "Pick outer fully formed coin leaves leaving runner roots intact.", as: "গুৰিৰ লতাডাল অক্ষত ৰাখি বাহিৰৰ ডাঙৰ মুদ্ৰা আকৃতিৰ পাতবোৰ চিঙিব।" },
    pestSolution: { en: "Slug barrier: sprinkle crushed eggshells or wood ash around border.", as: "শামুকৰ উপদ্ৰৱ ৰোধ কৰিবলৈ টাবৰ চাৰিওফালে কণীৰ বাকলিৰ গুড়ি ছটিয়াব।" },
    aitasTip: { en: "Plant near your kitchen water drain or wash area where soil stays naturally humid.", as: "আইতাৰ দিহা: বাৰীৰ পানী ওলোৱা নলাৰ কাষত ৰোপণ কৰিলে ই নিজে নিজেই গোটেই মাটিখিনি ঢাকি পেলায়।" },
    difficulty: "easy",
  },
  {
    id: "pasotia",
    plantLibraryId: "pasotia",
    nameEn: "Pasotia (Chaste Tree)",
    nameAs: "পচতীয়া",
    botanicalName: "Vitex negundo",
    potType: { en: "Large heavy drum or backyard fence boundary", as: "ডাঙৰ ডাষ্টবিন/ড্ৰাম বা বাৰীৰ জেওৰাৰ কাষ" },
    soilNeeds: { en: "Tolerates poor clay soils; very hardy and low maintenance", as: "যিকোনো সাধাৰণ মাটি; অতিপাত টান মাটিতেও সহজে বাঢ়ে" },
    sunlight: { en: "Full open direct sun", as: "মুকলি প্ৰখৰ ৰ'দ" },
    watering: { en: "Low; only water during extended drought periods once established.", as: "অতি কম; এজোপাৰ গুৰি টান হ'লে বিশেষ পানী দিয়াৰ প্ৰয়োজন নাই।" },
    harvestTime: { en: "Harvest mature 5-finger leaves in morning for joint oil preparation.", as: "গাঁঠিৰ তেল আৰু ভাপৰ বাবে পুৱাৰ ভাগত পূৰঠ পাঁচপতীয়া পাত ছিঙিব।" },
    pestSolution: { en: "Naturally pest resistant; acts as a natural pesticide itself.", as: "পচতীয়াত সাধাৰণতে পোক নালাগে; ইয়াৰ পাত আন গছৰ বাবেও প্ৰাকৃতিক কীটনাশক।" },
    aitasTip: { en: "Prune heavily after monsoon to encourage vibrant new shoots in spring.", as: "আইতাৰ দিহা: বাৰিষাৰ শেষত ডালবোৰ কাটি ছাঁটি দিলে বসন্তকালত নতুন কচি পাতেৰে গছ উপচি পৰে।" },
    difficulty: "easy",
  },
  {
    id: "tengesi",
    plantLibraryId: "tengesi",
    nameEn: "Tengesi Tenga (Wood Sorrel)",
    nameAs: "টেঙেচী টেঙা",
    botanicalName: "Oxalis corniculata",
    potType: { en: "Medium hanging basket or border cover around larger pots", as: "ওলোমোৱা টাব বা ডাঙৰ গছৰ টাবৰ চাৰিওফালৰ ঠাই" },
    soilNeeds: { en: "Light, well-draining garden soil", as: "পাতল, পানী নোৰোৱা সাধাৰণ মাটি" },
    sunlight: { en: "Morning sun or bright indirect light", as: "পুৱাৰ ৰ'দ বা মুকলি পোহৰ" },
    watering: { en: "Regular moderate watering", as: "নিয়মীয়া সামান্য পানী" },
    harvestTime: { en: "Snip tender heart-shaped leaflets before flowering for maximum sour tang.", as: "হালধীয়া ফুল ফুলাৰ আগতে টেঙা পাতবোৰ কাঁচিৰে কাটি সংগ্ৰহ কৰিব।" },
    pestSolution: { en: "Practically immune to insects; watch out for excessive weed choking.", as: "পোক-পৰুৱা নালাগে; কাষৰ বন-বাত চিকুণাই ৰাখিব।" },
    aitasTip: { en: "Grows vigorously without care; once planted in a pot corner, it self-seeds annually.", as: "আইতাৰ দিহা: এবাৰ বাৰীৰ চুকত বা টাবত ৰুলে ইয়াৰ বীজ পৰি বছৰি নিজে নিজেই গজি থাকে।" },
    difficulty: "easy",
  },
  {
    id: "ada",
    plantLibraryId: "ada_plant",
    nameEn: "Aada (Ginger Rhizome)",
    nameAs: "আদা",
    botanicalName: "Zingiber officinale",
    potType: { en: "Wide crate, grow bag, or raised garden ridge (depth 12+ inches)", as: "বহল গ্ৰো-বেগ বা বাৰীৰ ওখ ভেটি (১২ ইঞ্চি গভীৰ)" },
    soilNeeds: { en: "Rich, loose compost-mixed soil that stays loose so roots can swell", as: "ঢিলা, পলসুৱা আৰু পচন সাৰেৰে ভৰপূৰ মাটি যাতে আদাৰ আলু মেলিব পাৰে" },
    sunlight: { en: "Dappled semi-shade; thrives under the light canopy of banana trees", as: "পাতল ছাঁ; কলগছৰ ছাঁত আদা বৰ ভাল হয়" },
    watering: { en: "Consistent light moisture; never allow water stagnation which rots rhizome.", as: "সদায় পাতল সেমেকা ভাব; গুৰিত পানী জমা হ'লে আদা পচি যায়।" },
    harvestTime: { en: "Harvest after 8-9 months when outer foliage turns yellow and dies down.", as: "৮-৯ মাহৰ পিছত পাতবোৰ হালধীয়া হৈ শুকাই গ'লে মাটি খান্দি আদা উলিয়াব।" },
    pestSolution: { en: "Dust planting nodes with wood ash and dry turmeric to stop fungal rot.", as: "ৰোপণ কৰোঁতে আদাৰ টুকুৰাত হালধি আৰু কাঠৰ ছাই সানিলে ভেঁকুৰে নষ্ট নকৰে।" },
    aitasTip: { en: "Select plump ginger nodes with visible green eyes (sprouts) during Bohag season.", as: "আইতাৰ দিহা: ব'হাগ মাহত চকু থকা পুৰঠ আদা মাটিৰ তলত তিনি ইঞ্চি গভীৰতাত পুতি থ'ব।" },
    difficulty: "medium",
  },
  {
    id: "narasingha",
    plantLibraryId: "narasingha",
    nameEn: "Narasingha (Curry Leaf Tree)",
    nameAs: "নৰসিংহ",
    botanicalName: "Murraya koenigii",
    potType: { en: "Large earthen pot (14-16 inch) or open sunny yard", as: "ডাঙৰ মাটিৰ টাব (১৪-১৬ ইঞ্চি) বা মুকলি বাৰী" },
    soilNeeds: { en: "Slightly acidic, well-draining garden soil enriched with vermicompost", as: "পানী নোৰোৱা সাৰুৱা মাটি আৰু কেঁচুসাৰ" },
    sunlight: { en: "Full sun (minimum 5 hours daily)", as: "পূৰ্ণ ৰ'দ (দিনত কমেও ৫ ঘণ্টা)" },
    watering: { en: "Allow soil to dry slightly between waterings; avoid overwatering in winter.", as: "মাটি শুকোৱাৰ পিছতহে পানী দিব; শীতকালত অতি কম পানী লাগে।" },
    harvestTime: { en: "Harvest whole leaf stalks from top stems rather than plucking individual leaflets.", as: "এটা এটা পাত নিছিঙি ওপৰৰ পৰা গোটেই ঠাৰিডাল কাটিলে নতুন ডাল সোনকালে ওলায়।" },
    pestSolution: { en: "Spray sour fermented buttermilk (টেঙা ঘোল) diluted 1:10 with water against whiteflies.", as: "টেঙা ঘোল পানীৰ লগত মিহলাই স্প্ৰে কৰিলে পাত কোঁচ খোৱা আৰু বগা মাখি নাশ হয়।" },
    aitasTip: { en: "Feed with sour curd water or rice-washing water once a fortnight for lush deep-green aroma.", as: "আইতাৰ দিহা: মাহত দুবাৰকৈ চাউল ধোৱা পানী বা অলপ টেঙা দৈ পানী গুৰিত দিলে পাত সুগন্ধি আৰু গাঢ় সেউজীয়া হয়।" },
    difficulty: "medium",
  },
  {
    id: "pudina",
    plantLibraryId: "pudina",
    nameEn: "Pudina (Field Mint)",
    nameAs: "পদিনা",
    botanicalName: "Mentha arvensis",
    potType: { en: "Wide shallow planter or kitchen windowsill box", as: "বহল চাপৰ টাব বা পাকঘৰৰ খিৰিকীৰ বক্স" },
    soilNeeds: { en: "Moist organic potting mix rich in leaf compost", as: "সেমেকা সাৰুৱা মাটি আৰু পাত-পচা সাৰ" },
    sunlight: { en: "Morning sun with afternoon shade", as: "পুৱাৰ ৰ'দ আৰু দুপৰীয়া ছাঁ" },
    watering: { en: "High; keep soil moist daily especially in hot months.", as: "নিয়মীয়া পানী; খৰাং বতৰত নিতৌ পানী দিব।" },
    harvestTime: { en: "Snip stem tops regularly; frequent trimming stimulates bushy spread.", as: "ওপৰৰ আগবোৰ সঘনাই কাটি থাকিব; যিমানে কাটিব সিমানে বেছি জোপোহা হ'ব।" },
    pestSolution: { en: "Spray mild neem decoction for tiny green aphids.", as: "পাতল নিমপাতৰ পানী স্প্ৰে কৰিলে পোক নালাগে।" },
    aitasTip: { en: "You can root market-bought fresh mint stems in a glass of water for 4 days before planting!", as: "আইতাৰ দিহা: বজাৰৰ পৰা অনা সতেজ পদিনাৰ ঠাৰি পানীত ৪ দিন তিয়াই থ'লেই শিপা ওলায়, তাৰ পিছত টাবত ৰুই দিব পাৰে।" },
    difficulty: "easy",
  },
  {
    id: "lemongrass",
    plantLibraryId: "lemongrass",
    nameEn: "Gandhamalati (Lemongrass)",
    nameAs: "গন্ধমালতী / চাহপাত বন",
    botanicalName: "Cymbopogon citratus",
    potType: { en: "Sturdy earthen pot (12-14 inch) or sunny garden edge", as: "মজবুত মাটিৰ টাব (১২-১৪ ইঞ্চি) বা বাৰীৰ ৰ'দঘাই চুক" },
    soilNeeds: { en: "Loamy or sandy soil; highly drought-resilient once rooted", as: "বালিমহীয়া মাটি; টান খৰাঙতো মৰি নাযায়" },
    sunlight: { en: "Direct sunlight all day long", as: "গোটেই দিন মুকলি ৰ'দ" },
    watering: { en: "Moderate; water twice weekly in winter, every other day in hot summer.", as: "পৰিমিত; মাটি শুকান হ'লেহে পানী দিব।" },
    harvestTime: { en: "Cut outer leaves near the base using sharp shears, leaving inner cluster growing.", as: "তীক্ষ্ণ কাঁচিৰে গুৰিৰ পৰা বাহিৰৰ পাতবোৰ কাটিব; ভিতৰৰ কচি পাত বাঢ়িবলৈ দিব।" },
    pestSolution: { en: "Natural insect deterrent; requires zero pesticides.", as: "ইয়াৰ তীব্ৰ সুবাসে মহ-পোক খেদি পঠায়; কোনো কীটনাশকৰ প্ৰয়োজন নাই।" },
    aitasTip: { en: "Divide the dense root clump every two years to plant new pots or share with neighbors.", as: "আইতাৰ দিহা: দুবছৰৰ মূৰে মূৰে গুৰিৰ শিপাৰ থোপা ভাগ কৰি নতুন টাবত ৰুলে গছ সদায় সতেজ হৈ থাকে।" },
    difficulty: "easy",
  },
];

export default function KitchenGardenPage() {
  const mounted = useMounted();
  const { languageMode } = useNiramayStore();
  const currentMode = mounted ? languageMode : "bilingual";
  const isAs = currentMode === "as";
  const isEn = currentMode === "en";

  const [search, setSearch] = useState("");
  const [filterDifficulty, setFilterDifficulty] = useState<string>("all");

  const filteredPlants = GARDEN_PLANTS.filter((plant) => {
    const q = search.toLowerCase().trim();
    const matchesSearch =
      !q ||
      plant.nameEn.toLowerCase().includes(q) ||
      plant.nameAs.toLowerCase().includes(q) ||
      plant.botanicalName.toLowerCase().includes(q);

    const matchesDiff =
      filterDifficulty === "all" || plant.difficulty === filterDifficulty;

    return matchesSearch && matchesDiff;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-14">
      {/* Page Header */}
      <div className="mb-8">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold">
            <Sprout className="w-3.5 h-3.5 text-emerald-700" />
            <span>
              {isAs ? "বাৰীৰ বনৌষধি ৰোপণ হাতপুথি" : "Assam Kitchen Garden Guide"}
            </span>
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold border border-amber-300">
            <Leaf className="w-3.5 h-3.5 text-amber-700" />
            <span>
              {isAs ? "পাকঘৰৰ পৰা পদূলিলৈ সঞ্জীৱনী" : "From Pot to Kitchen Remedy"}
            </span>
          </div>
        </div>

        <h1 className="text-3xl sm:text-5xl font-serif font-black text-stone-900 tracking-tight">
          {isAs
            ? "পাকঘৰৰ বাৰী: বনৌষধি ৰোপণ আৰু ঘৰুৱা যত্ন"
            : isEn
            ? "Assamese Kitchen Garden & Herbal Planting Guide"
            : "Kitchen Garden / Back-Yard Planting Guide (বাৰীৰ বনৌষধি)"}
        </h1>
        <p className="text-sm sm:text-base text-stone-600 mt-2 max-w-3xl leading-relaxed">
          {isAs
            ? "তুলসী, মানিমুনি, টেঙেচী, নৰসিংহ আৰু পদিনা আদি মহৌষধী গছ নিজৰ পদূলিত, ফুলৰ টাবত বা বাৰীৰ চুকত কেনেদৰে ৰোপণ কৰিব, কি সাৰ দিব, কি বতৰত তুলিব আৰু প্ৰাকৃতিকভাৱে পোক-পৰুৱাৰ পৰা ৰক্ষা কৰিব তাৰ সম্পূৰ্ণ আইতাৰ দিহা।"
            : "Practical horticultural wisdom tailored for Assamese households. Learn ideal pot sizes, native soil blends, organic pest fixes with buttermilk/ash, and optimal harvest timings for potent kitchen medicine."}
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl p-4 border border-amber-200/80 shadow-xs mb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={isAs ? "বনৌষধি সন্ধান কৰক..." : "Search garden herbs..."}
            className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-stone-50 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-amber-500/20"
          />
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto text-xs">
          <span className="text-stone-500 font-semibold">
            {isAs ? "ৰোপণৰ সহজতা:" : "Difficulty:"}
          </span>
          <button
            onClick={() => setFilterDifficulty("all")}
            className={`px-3 py-1 rounded-lg font-bold transition ${
              filterDifficulty === "all"
                ? "bg-amber-700 text-onbrand"
                : "bg-stone-100 text-stone-700 hover:bg-stone-200"
            }`}
          >
            {isAs ? "সকলো" : "All"}
          </button>
          <button
            onClick={() => setFilterDifficulty("easy")}
            className={`px-3 py-1 rounded-lg font-bold transition ${
              filterDifficulty === "easy"
                ? "bg-emerald-700 text-onbrand"
                : "bg-stone-100 text-stone-700 hover:bg-stone-200"
            }`}
          >
            {isAs ? "অতি সহজ" : "Beginner Easy"}
          </button>
          <button
            onClick={() => setFilterDifficulty("medium")}
            className={`px-3 py-1 rounded-lg font-bold transition ${
              filterDifficulty === "medium"
                ? "bg-amber-800 text-onbrand"
                : "bg-stone-100 text-stone-700 hover:bg-stone-200"
            }`}
          >
            {isAs ? "মজলীয়া যত্ন" : "Moderate Care"}
          </button>
        </div>
      </div>

      {/* Garden Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredPlants.map((plant) => {
          return (
            <div
              key={plant.id}
              className="bg-white rounded-3xl p-6 sm:p-7 border border-amber-200/80 shadow-xs hover:shadow-md transition flex flex-col justify-between"
            >
              <div>
                {/* Header */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div>
                    <span className="text-[11px] font-mono text-emerald-800 italic">
                      {plant.botanicalName}
                    </span>
                    <h3 className="text-lg sm:text-xl font-serif font-black text-stone-900 mt-0.5">
                      {plant.nameEn}
                    </h3>
                    <div className="text-sm font-bold text-amber-800">
                      {plant.nameAs}
                    </div>
                  </div>

                  <span
                    className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${
                      plant.difficulty === "easy"
                        ? "bg-emerald-100 text-emerald-800"
                        : "bg-amber-100 text-amber-900"
                    }`}
                  >
                    {plant.difficulty === "easy"
                      ? isAs
                        ? "সহজতে গজে"
                        : "Easy Care"
                      : isAs
                      ? "পৰিমিত যত্ন"
                      : "Moderate Care"}
                  </span>
                </div>

                {/* 4 Technical Growing Guidance Badges */}
                <div className="grid grid-cols-2 gap-2.5 my-4 bg-stone-50/80 p-3.5 rounded-2xl border border-stone-200 text-xs">
                  <div>
                    <div className="flex items-center gap-1 text-[11px] font-bold text-amber-900">
                      <Layers className="w-3 h-3 text-amber-700" />
                      <span>{isAs ? "টাব / মাটি:" : "Pot & Soil:"}</span>
                    </div>
                    <p className="text-[11px] text-stone-600 mt-0.5 line-clamp-2">
                      {isAs ? plant.potType.as : plant.potType.en}
                    </p>
                  </div>

                  <div>
                    <div className="flex items-center gap-1 text-[11px] font-bold text-amber-900">
                      <Sun className="w-3 h-3 text-amber-600" />
                      <span>{isAs ? "সূৰ্যৰ পোহৰ:" : "Sunlight:"}</span>
                    </div>
                    <p className="text-[11px] text-stone-600 mt-0.5 line-clamp-2">
                      {isAs ? plant.sunlight.as : plant.sunlight.en}
                    </p>
                  </div>

                  <div>
                    <div className="flex items-center gap-1 text-[11px] font-bold text-blue-900">
                      <Droplets className="w-3 h-3 text-blue-600" />
                      <span>{isAs ? "পানীৰ জোখ:" : "Watering:"}</span>
                    </div>
                    <p className="text-[11px] text-stone-600 mt-0.5 line-clamp-2">
                      {isAs ? plant.watering.as : plant.watering.en}
                    </p>
                  </div>

                  <div>
                    <div className="flex items-center gap-1 text-[11px] font-bold text-emerald-900">
                      <Calendar className="w-3 h-3 text-emerald-600" />
                      <span>{isAs ? "তোলাৰ সময়:" : "Best Harvest:"}</span>
                    </div>
                    <p className="text-[11px] text-stone-600 mt-0.5 line-clamp-2">
                      {isAs ? plant.harvestTime.as : plant.harvestTime.en}
                    </p>
                  </div>
                </div>

                {/* Organic Pest Fix */}
                <div className="my-3 p-3 rounded-xl bg-amber-50/70 border border-amber-200 text-xs">
                  <div className="flex items-center gap-1.5 font-bold text-amber-950 mb-0.5">
                    <Bug className="w-3.5 h-3.5 text-amber-800" />
                    <span>{isAs ? "পোক-পৰুৱাৰ প্ৰাকৃতিক প্ৰতিকাৰ:" : "Organic Pest Solution:"}</span>
                  </div>
                  <p className="text-stone-700 text-[11px] leading-relaxed">
                    {isAs ? plant.pestSolution.as : plant.pestSolution.en}
                  </p>
                </div>

                {/* Grandmother's Wisdom */}
                <div className="my-3 p-3 rounded-xl bg-emerald-50/60 border border-emerald-200 text-xs">
                  <div className="flex items-center gap-1.5 font-bold text-emerald-950 mb-0.5">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
                    <span>{isAs ? "আইতাৰ ৰোপণ দিহা:" : "Grandmother's Growing Tip:"}</span>
                  </div>
                  <p className="text-stone-700 text-[11px] leading-relaxed italic">
                    {isAs ? plant.aitasTip.as : plant.aitasTip.en}
                  </p>
                </div>
              </div>

              {/* Cross-Link to Plant Library Detail */}
              <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
                <Link
                  href="/plant-scanner"
                  className="inline-flex items-center gap-1 text-xs font-bold text-amber-800 hover:text-amber-950 group"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>
                    {isAs
                      ? "বনৌষধি জ্ঞানকোষত চাওক"
                      : "View in Plant Botanical Library"}
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition" />
                </Link>

                <span className="text-[11px] text-stone-400 font-medium">
                  100% Home Grown
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
