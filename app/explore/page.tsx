"use client";

import React from "react";
import Link from "next/link";
import { useNiramayStore } from "@/lib/store";
import { useMounted } from "@/hooks/useMounted";
import {
  Compass,
  Camera,
  Leaf,
  Activity,
  Bot,
  Sparkles,
  HeartPulse,
  Sprout,
  Calendar,
  BookHeart,
  FileText,
  PhoneCall,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";
import { EmergencySpeedDial } from "@/components/emergency/EmergencySpeedDial";

export default function ExplorePage() {
  const mounted = useMounted();
  const { languageMode, setAssistantOpen, doshaProfile } = useNiramayStore();
  const isAs = mounted && languageMode === "as";

  const tools = [
    {
      id: "spice_scanner",
      href: "/spice-scanner",
      icon: Camera,
      titleEn: "AI Spice Box Scanner",
      titleAs: "মছলাৰ বাকচ স্কেনাৰ",
      descEn: "Multi-item camera scan: detects spices in your pantry and reveals instant remedies.",
      descAs: "কেমেৰাৰে মছলাৰ ফটো লওক; একেলগে একাধিক মছলা চিনাক্ত কৰি তৎকালীন বিধান জানক।",
      badgeEn: "New AI Tool",
      badgeAs: "নতুন এআই",
      accent: "from-amber-600 to-amber-800",
      isNew: true,
    },
    {
      id: "dosha_quiz",
      href: "/dosha-assessment",
      icon: HeartPulse,
      titleEn: "Prakriti / Dosha Assessment",
      titleAs: "প্ৰকৃতি আৰু দোষ পৰীক্ষা",
      descEn: "10-question Ayurvedic constitution quiz to personalize herbal heating/cooling cautions.",
      descAs: "১০টা প্ৰশ্নৰ আয়ুৰ্বেদিক কুইজেৰে আপোনাৰ বাত, পিত্ত বা কফ প্ৰকৃতি জানক।",
      badgeEn: doshaProfile ? `Dominant: ${doshaProfile}` : "Personalize",
      badgeAs: doshaProfile ? `প্ৰকৃতি: ${doshaProfile}` : "পৰীক্ষা কৰক",
      accent: "from-emerald-700 to-emerald-900",
      isNew: true,
    },
    {
      id: "plant_scanner",
      href: "/plant-scanner",
      icon: Leaf,
      titleEn: "Indigenous Plant Scanner",
      titleAs: "বনৌষধি চিনাক্তকৰণ স্কেনাৰ",
      descEn: "100% on-device leaf scanner recognizing 52+ authentic Assamese medicinal plants.",
      descAs: "অসমৰ ৫২+ বিধ থলুৱা বনৌষধিৰ পাত স্কেন কৰি পৰম্পৰাগত প্ৰয়োগ আৰু বিধান পঢ়ক।",
      badgeEn: "52+ Species",
      badgeAs: "৫২+ বনৌষধি",
      accent: "from-emerald-600 to-emerald-800",
    },
    {
      id: "assistant",
      href: "#assistant",
      onClick: () => setAssistantOpen(true),
      icon: Bot,
      titleEn: "Niramay AI Assistant",
      titleAs: "নিৰাময় এআই সহায়ক",
      descEn: "Bilingual voice & text local matcher that responds directly to your specific discomfort.",
      descAs: "কণ্ঠ আৰু পাঠ্যৰে আপোনাৰ সমস্যা বৰ্ণনা কৰক; পলকতে সঠিক উপচাৰ জানক।",
      badgeEn: "100% Local",
      badgeAs: "১০০% অফলাইন",
      accent: "from-amber-500 to-amber-700",
    },
    {
      id: "body_map",
      href: "/#body-map",
      icon: Activity,
      titleEn: "Interactive Body Map",
      titleAs: "ইণ্টাৰেক্টিভ শৰীৰৰ মানচিত্ৰ",
      descEn: "Tap affected anatomical zones (Head, Throat, Chest, Stomach, Joints) to find remedies.",
      descAs: "শৰীৰৰ অংশত স্পৰ্শ কৰি পোনে পোনে সম্পৰ্কিত লক্ষণ আৰু উপচাৰ বিচাৰক।",
      badgeEn: "Visual Triage",
      badgeAs: "দৰ্শনভিত্তিক",
      accent: "from-emerald-800 to-amber-900",
    },
    {
      id: "ritucharya",
      href: "/ritucharya",
      icon: Calendar,
      titleEn: "Ritucharya (Seasonal Radar)",
      titleAs: "ঋতুচৰ্যা (বতৰৰ স্বাস্থ্য দিশা)",
      descEn: "Living seasonal guide mapped to Assam's 6 traditional seasons with diet & herb rules.",
      descAs: "অসমৰ ঋতু অনুসাৰে পথ্য, ডাকৰ বচন আৰু সংক্ৰমণ প্ৰতিৰোধী বনৌষধি নিৰ্দেশনা।",
      badgeEn: "Seasonal",
      badgeAs: "ঋতু অনুযায়ী",
      accent: "from-amber-700 to-emerald-800",
    },
    {
      id: "kitchen_garden",
      href: "/kitchen-garden",
      icon: Sprout,
      titleEn: "Kitchen Garden Guide",
      titleAs: "বাৰীৰ বনৌষধি ৰোপণ",
      descEn: "Practical grandmother's guide to growing Tulsi, Pasotia, Manimuni and ginger at home.",
      descAs: "বাৰীৰ চুকত বা টাবত ঔষধীয় গছ ৰোপণ আৰু জৈৱিক যত্নৰ ব্যৱহাৰিক দিহা।",
      badgeEn: "Home Planting",
      badgeAs: "ঘৰুৱা বাগিচা",
      accent: "from-emerald-500 to-emerald-700",
    },
    {
      id: "aitas_diha",
      href: "/aitas-diha",
      icon: BookHeart,
      titleEn: "Aita's Diha (Wisdom Journal)",
      titleAs: "আইতাৰ দিহা (পৰিয়ালৰ দিনলিপি)",
      descEn: "Private audio-recorded wisdom journal to preserve your grandmother's oral recipes.",
      descAs: "আইতা বা বয়োবৃদ্ধৰ কণ্ঠস্বৰ আৰু পুৰণি দিহা সাঁচি ৰখাৰ ব্যক্তিগত দিনলিপি।",
      badgeEn: "Voice Notes",
      badgeAs: "কণ্ঠলিপি",
      accent: "from-amber-700 to-amber-900",
    },
    {
      id: "fridge_card",
      href: "/fridge-card",
      icon: FileText,
      titleEn: "Emergency Fridge Card",
      titleAs: "ফ্ৰিজ কাৰ্ড (প্ৰিণ্টযোগ্য)",
      descEn: "High-contrast printable kitchen reference card for burns, acidity, and colic.",
      descAs: "পাকঘৰৰ ফ্ৰিজত লগাই থব পৰা জৰুৰীকালীন প্ৰাথমিক উপচাৰ কাৰ্ড।",
      badgeEn: "Printable PDF",
      badgeAs: "প্ৰিণ্টযোগ্য",
      accent: "from-red-700 to-red-900",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12 pb-24">
      {/* Header */}
      <div className="mb-8 max-w-2xl">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold mb-2">
          <Compass className="w-3.5 h-3.5 text-amber-700" />
          <span>{isAs ? "নিৰাময় সঁজুলি সংকলন" : "Niramay Interactive Tool Suite"}</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-serif font-black text-stone-900">
          {isAs ? "অন্বেষণ আৰু প্ৰযুক্তি সঁজুলিসমূহ" : "Explore Healing Tools"}
        </h1>
        <p className="text-xs sm:text-sm text-stone-600 mt-2 leading-relaxed">
          {isAs
            ? "কেমেৰা স্কেনাৰৰ পৰা আৰম্ভ কৰি আয়ুৰ্বেদিক দোষ পৰীক্ষা আৰু পৰিয়ালৰ দিহা দিনলিপিলৈকে — আপোনাৰ স্বাস্থ্যৰ বাবে প্ৰয়োজনীয় সকলো সঁজুলি।"
            : "From on-device multi-spice camera detection to Ayurvedic Prakriti assessment and interactive anatomical body mapping — all 100% private and offline."}
        </p>
      </div>

      {/* Emergency Quick-Dial Banner */}
      <div className="mb-8 p-4 rounded-3xl bg-red-50 border-2 border-red-300">
        <EmergencySpeedDial />
      </div>

      {/* Tools Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {tools.map((t) => {
          const Icon = t.icon;
          const CardContent = (
            <div className="h-full bg-white rounded-3xl p-6 border border-amber-200/80 hover:border-amber-400 hover:shadow-lg transition-all flex flex-col justify-between group">
              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <div
                    className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${t.accent} text-onbrand flex items-center justify-center shadow-xs transition-transform group-hover:scale-105`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-900 border border-amber-200">
                    {isAs ? t.badgeAs : t.badgeEn}
                  </span>
                </div>

                <h3 className="text-lg font-serif font-bold text-stone-900 group-hover:text-amber-800 transition">
                  {isAs ? t.titleAs : t.titleEn}
                </h3>
                <p className="text-xs text-stone-600 mt-2 line-clamp-2 leading-relaxed">
                  {isAs ? t.descAs : t.descEn}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-stone-100 flex items-center justify-between text-xs font-bold text-amber-800 group-hover:text-amber-700">
                <span>{isAs ? "সঁজুলি ব্যৱহাৰ কৰক" : "Open Tool"}</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition" />
              </div>
            </div>
          );

          if (t.onClick) {
            return (
              <button
                key={t.id}
                type="button"
                onClick={t.onClick}
                className="text-left w-full cursor-pointer focus:outline-none"
              >
                {CardContent}
              </button>
            );
          }

          return (
            <Link key={t.id} href={t.href}>
              {CardContent}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
