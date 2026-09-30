"use client";

import React, { useState } from "react";
import { NiramayLogo } from "@/components/brand/NiramayLogo";
import { Printer, Download, ShieldAlert, PhoneCall, AlertTriangle } from "lucide-react";

interface EmergencyItem {
  number: number;
  conditionEn: string;
  conditionAs: string;
  quickActionEn: string;
  quickActionAs: string;
  dosageEn: string;
  dosageAs: string;
  cautionEn: string;
  cautionAs: string;
}

const EMERGENCY_ITEMS: EmergencyItem[] = [
  {
    number: 1,
    conditionEn: "Sudden Severe Acidity & Heartburn",
    conditionAs: "হঠাতে হোৱা তীব্ৰ অমলপিত্ত আৰু বুকুপোৰা",
    quickActionEn: "1/2 tsp crushed Ajwain (Carom) + pinch of Black Salt in 1 cup warm water. Sip slowly.",
    quickActionAs: "১/২ চামুচ জৱাইন আৰু এচিকুট কলা নিমখ ১ কাপ কুহুমীয়া পানীত মিহলাই লাহে লাহে খাওক।",
    dosageEn: "Adult: 1 cup; Child (6+): 1/4 cup.",
    dosageAs: "প্ৰাপ্তবয়স্ক: ১ কাপ; শিশু (৬+): ১/৪ কাপ।",
    cautionEn: "Do not lie down flat; elevate head.",
    cautionAs: "খোৱাৰ লগে লগে শুই নিদিব।",
  },
  {
    number: 2,
    conditionEn: "Persistent Night Cough Spasm",
    conditionAs: "ৰাতিৰ ভাগত সঘনাই হোৱা শুকান কাহ",
    quickActionEn: "1 tsp fresh grated Ginger juice mixed with 1 tsp raw Honey and a pinch of Black pepper.",
    quickActionAs: "১ চামুচ আদাৰ ৰসৰ লগত ১ চামুচ কেঁচা মৌ আৰু এচিকুট জালুকৰ গুড়ি মিহলাই চেলেকি খাওক।",
    dosageEn: "Lick slowly before sleeping.",
    dosageAs: "শুবৰ সময়ত লাহে লাহে চেলেকি খাব।",
    cautionEn: "Never give honey to infants under 1 yr.",
    cautionAs: "১ বছৰৰ তলৰ শিশুক মৌ নিদিব।",
  },
  {
    number: 3,
    conditionEn: "Scratchy Sore Throat & Tonsil Pain",
    conditionAs: "ডিঙিৰ খচখচনি আৰু গিলিবলৈ কষ্ট",
    quickActionEn: "1/2 tsp salt + 1/4 tsp turmeric in 1 glass comfortably warm water. Deep gargle 3 mins.",
    quickActionAs: "১ গিলাচ কুহুমীয়া পানীত ১/২ চামুচ নিমখ আৰু ১/৪ চামুচ হালধি দি দিনে ৩ বাৰ কুলকুলি কৰক।",
    dosageEn: "Gargle every 3-4 hours; do not swallow.",
    dosageAs: "প্ৰতি ৩-৪ ঘণ্টাৰ মূৰে মূৰে কুলকুলি কৰক।",
    cautionEn: "Test water heat on wrist before gargling.",
    cautionAs: "পানীৰ উত্তাপ পৰীক্ষা কৰি লওক।",
  },
  {
    number: 4,
    conditionEn: "Mild Seasonal Fever & Body Chills",
    conditionAs: "মৃদু জ্বৰ, গা গৰম আৰু কঁপনি",
    quickActionEn: "Boil 7 Tulsi leaves + 1 crushed Black pepper in 1 cup water until half. Add honey.",
    quickActionAs: "৭ খিলা তুলসী পাত আৰু ১ টা খুন্দা জালুক ১ কাপ পানীত আধা হোৱালৈ উতলাই কুহুমীয়া কৰি খাওক।",
    dosageEn: "Twice daily after light food.",
    dosageAs: "লঘু আহাৰৰ পাছত দিনত দুবাৰ।",
    cautionEn: "If fever > 102°F, see doctor.",
    cautionAs: "জ্বৰ ১০২ ডিগ্ৰীতকৈ বেছি হ'লে চিকিৎসকক দেখুৱাওক।",
  },
  {
    number: 5,
    conditionEn: "Minor Kitchen Burn or Hot Oil Splatter",
    conditionAs: "পাকঘৰত হাত পোৰা বা গৰম তেল ছিটিকি পৰা",
    quickActionEn: "Immediately flush under running room-temp water for 10 mins. Apply raw honey gently.",
    quickActionAs: "তৎক্ষণাত কমেও ১০ মিনিট সময় স্বাভাৱিক ঠাণ্ডা পানী ঢালিব। তাৰ পিছত পাতলকৈ মৌ সানি দিব।",
    dosageEn: "Leave exposed or loosely covered.",
    dosageAs: "পোৰা অংশ মুকলিকৈ ৰাখক।",
    cautionEn: "Never apply ice, butter, or toothpaste.",
    cautionAs: "বৰফ, মাখন বা টুথপেষ্ট কেতিয়াও নিদিব।",
  },
  {
    number: 6,
    conditionEn: "Severe Gas & Colicky Stomach Cramps",
    conditionAs: "পেটৰ তীব্ৰ গেছ আৰু চেপামৰা বিষ",
    quickActionEn: "Mix pinch of Hing (Asafoetida) in 1 tsp warm mustard oil/water; rub around navel.",
    quickActionAs: "এচিকুট হিং অলপ কুহুমীয়া পানী বা মিঠাতেলত গুলি নাভীৰ চাৰিওফালে ঘূৰণীয়াভাৱে মালিচ কৰক।",
    dosageEn: "External belly rub; very safe for children.",
    dosageAs: "নাভীৰ বাহিৰত লেপ; শিশুৰ বাবেও নিৰাপদ।",
    cautionEn: "Do not press deeply on tender abdomen.",
    cautionAs: "বিষোৱা পেটত জোৰকৈ চাপ নিদিব।",
  },
  {
    number: 7,
    conditionEn: "Sudden Nausea & Motion Queasiness",
    conditionAs: "বমি বমি ভাব আৰু পেটলৈ অস্বস্তি",
    quickActionEn: "Thin slice of Kaji Nemu (Assam Lemon) dipped in Black salt and dry ginger. Slowly suck.",
    quickActionAs: "এটুকুৰা কাজী নেমুত কলা নিমখ লগাই লাহে লাহে জিভাত চোবাই ৰস শুহি লওক।",
    dosageEn: "As needed during distress.",
    dosageAs: "প্ৰয়োজন অনুসাৰে ৰস শুহিব।",
    cautionEn: "Avoid large water gulps during nausea.",
    cautionAs: "বমিৰ সময়ত একেবাৰে বেছি পানী নাখাব।",
  },
  {
    number: 8,
    conditionEn: "Heat Exhaustion & Summer Dehydration",
    conditionAs: "ৰ'দৰ উত্তাপ আৰু শৰীৰৰ পানী কমি যোৱা",
    quickActionEn: "1 glass water + 1 tbsp fresh lemon juice + 1 tsp crushed Jaggery + pinch of rock salt.",
    quickActionAs: "১ গিলাচ পানীত ১ চামুচ নেমুৰ ৰস, ১ চামুচ গুড় আৰু এচিকুট নিমখ গুলি প্ৰাকৃতিক চৰবত বনাওক।",
    dosageEn: "1-2 glasses sipped calmly.",
    dosageAs: "১-২ গিলাচ লাহে লাহে খাওক।",
    cautionEn: "Provide shade and cool compresses.",
    cautionAs: "ছাঁযুক্ত ঠাইত জিৰণি ল'বলৈ দিয়ক।",
  },
];

export const PrintableFridgeCard: React.FC = () => {
  const [lang, setLang] = useState<"bilingual" | "as" | "en">("bilingual");

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-6 sm:py-10">
      {/* Controls Bar (Hidden during print) */}
      <div className="no-print bg-white p-4 rounded-2xl border border-stone-200 shadow-xs mb-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-stone-700">Display Language:</span>
          <div className="flex items-center bg-stone-100 rounded-xl p-0.5 border border-stone-200 text-xs">
            <button
              onClick={() => setLang("bilingual")}
              className={`px-3 py-1.5 rounded-lg font-bold transition ${
                lang === "bilingual"
                  ? "bg-amber-700 text-onbrand shadow-xs"
                  : "text-stone-700 hover:text-stone-900"
              }`}
            >
              Bilingual (EN + AS)
            </button>
            <button
              onClick={() => setLang("as")}
              className={`px-3 py-1.5 rounded-lg font-bold transition ${
                lang === "as"
                  ? "bg-amber-700 text-onbrand shadow-xs"
                  : "text-stone-700 hover:text-stone-900"
              }`}
            >
              অসমীয়া
            </button>
            <button
              onClick={() => setLang("en")}
              className={`px-3 py-1.5 rounded-lg font-bold transition ${
                lang === "en"
                  ? "bg-amber-700 text-onbrand shadow-xs"
                  : "text-stone-700 hover:text-stone-900"
              }`}
            >
              English
            </button>
          </div>
        </div>

        <button
          onClick={handlePrint}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-amber-700 hover:bg-amber-800 text-onbrand shadow-md transition"
        >
          <Printer className="w-4 h-4" />
          <span>Print / Save PDF (ফ্ৰিজ কাৰ্ড প্ৰিণ্ট)</span>
        </button>
      </div>

      {/* The Printable Sheet (Optimized for A4 format) */}
      <article className="printable-fridge-card bg-white p-6 sm:p-8 rounded-3xl border-2 border-stone-800 text-stone-900 shadow-md">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b-2 border-stone-800 mb-4">
          <div className="flex items-center gap-3">
            <NiramayLogo size={80} variant="full" />
            <div className="text-[11px] font-bold text-stone-600 tracking-wide uppercase">
              Emergency Kitchen Remedy Quick-Reference Sheet (ফ্ৰিজ কাৰ্ড)
            </div>
          </div>

          <div className="text-right">
            <span className="text-[10px] font-bold bg-stone-900 text-onbrand px-2.5 py-1 rounded-md">
              KITCHEN FRIDGE GUIDE
            </span>
            <div className="text-[10px] text-stone-500 mt-1 font-mono">
              Keep attached to refrigerator
            </div>
          </div>
        </div>

        {/* 8 Emergency Situations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          {EMERGENCY_ITEMS.map((item) => (
            <div
              key={item.number}
              className="p-3 rounded-xl border border-stone-400 bg-stone-50/50 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-2 font-bold text-stone-900 border-b border-stone-200 pb-1 mb-1.5">
                  <span className="w-5 h-5 rounded-full bg-stone-900 text-onbrand font-mono text-[10px] flex items-center justify-center shrink-0">
                    {item.number}
                  </span>
                  <div>
                    {lang !== "as" && <span>{item.conditionEn}</span>}
                    {lang === "bilingual" && <span className="mx-1">/</span>}
                    {lang !== "en" && (
                      <span className="text-emerald-900 font-serif">
                        {item.conditionAs}
                      </span>
                    )}
                  </div>
                </div>

                <div className="text-stone-800 font-medium leading-snug">
                  <span className="font-bold text-amber-900">Action: </span>
                  {lang === "as" ? item.quickActionAs : item.quickActionEn}
                </div>
                {lang === "bilingual" && (
                  <div className="text-[11px] text-emerald-950 mt-0.5 leading-snug">
                    {item.quickActionAs}
                  </div>
                )}
              </div>

              <div className="mt-2 pt-1.5 border-t border-stone-200/80 flex items-center justify-between text-[10px] text-stone-600">
                <span>
                  <strong>Dosage:</strong>{" "}
                  {lang === "as" ? item.dosageAs : item.dosageEn}
                </span>
                <span className="text-red-800 font-semibold">
                  ⚠️ {lang === "as" ? item.cautionAs : item.cautionEn}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Red-Flag Urgent Warnings Footer */}
        <div className="mt-4 p-3.5 rounded-xl border-2 border-red-600 bg-red-50 text-red-950 text-xs">
          <div className="flex items-start gap-2.5">
            <ShieldAlert className="w-5 h-5 text-red-700 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <div className="font-black text-red-900 uppercase tracking-wider text-[11px]">
                🚨 RED FLAGS — IMMEDIATELY RUSH TO HOSPITAL / DOCTOR:
              </div>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 text-[11px] list-disc list-inside">
                <li>High fever &gt; 102°F or shivering chills with confusion</li>
                <li>Persistent vomiting, blood in stool, or inability to keep water down</li>
                <li>Sudden severe chest tightness or difficulty breathing</li>
                <li>Symptoms failing to improve after 3 consecutive days</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Emergency Contacts Box */}
        <div className="mt-3 p-3 rounded-xl border border-stone-400 bg-white flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <PhoneCall className="w-4 h-4 text-emerald-700 shrink-0" />
            <span className="font-bold">
              Ambulance: <span className="font-mono text-red-700 font-black">108</span> · Health Helpline: <span className="font-mono text-stone-900 font-black">104</span>
            </span>
          </div>

          <div className="flex items-center gap-3 text-[11px] text-stone-500 font-mono">
            <span>Family Doctor: _______________</span>
            <span>Nearest PHC: _______________</span>
          </div>
        </div>
      </article>
    </div>
  );
};
