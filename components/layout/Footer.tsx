"use client";

import React from "react";
import Link from "next/link";
import { NiramayLogo } from "@/components/brand/NiramayLogo";
import { ShieldAlert, Heart, AlertTriangle, FileText } from "lucide-react";
import { useNiramayStore } from "@/lib/store";
import { useMounted } from "@/hooks/useMounted";

/**
 * Premium editorial footer — built on Niramay brand tokens so it renders
 * correctly in BOTH themes without overrides:
 *  light → parchment surface, ink-green structure, bronze/gold accents
 *  dark  → deep night surface (#0F2318), parchment typography, gold hairlines
 * Gamosa red is reserved strictly for safety/emergency semantics.
 */
export const Footer: React.FC = () => {
  const { languageMode } = useNiramayStore();
  const mounted = useMounted();
  const currentMode = mounted ? languageMode : "bilingual";

  const isAs = currentMode === "as";
  const isEn = currentMode === "en";

  return (
    <footer className="w-full bg-parchment text-ink mt-20 no-print">
      {/* Woven gamosa-inspired thread accent */}
      <div aria-hidden="true" className="gamosa-rule opacity-70" />

      {/* Persistent safety strip — informational-use notice */}
      <div className="border-b border-amber-300/50 bg-amber-100/60">
        <div className="max-w-6xl mx-auto flex items-center justify-center gap-2 py-3 px-4 text-xs sm:text-sm font-medium text-amber-900 text-center">
          <AlertTriangle className="w-4 h-4 shrink-0 text-amber-700" aria-hidden="true" />
          <span>
            {isAs
              ? "শিক্ষণীয় আৰু পৰম্পৰাগত জ্ঞানৰ বাবেহে — কোনো পেছাদাৰী চিকিৎসা পৰামৰ্শৰ বিকল্প নহয়।"
              : isEn
              ? "For informational purposes only — not a substitute for professional medical advice."
              : "For informational purposes only • পৰম্পৰাগত শিক্ষণীয় তথ্য — চিকিৎসকৰ পৰামৰ্শৰ বিকল্প নহয়।"}
          </span>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-14">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8">
          {/* Brand block */}
          <div className="md:col-span-5 space-y-5">
            <NiramayLogo size={128} variant="full" />
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed max-w-md">
              {isAs
                ? "“ঘৰৰ মছলাত, স্বস্তি নিৰাময়” — অসমীয়া আৰু ভাৰতীয় পৰম্পৰাগত পাকঘৰৰ চিকিৎসা জ্ঞান, বয়স অনুযায়ী মাত্ৰা আৰু বিপদ সংকেতৰ সৈতে।"
                : isEn
                ? "“Ghoror mosolat, sasti niramoy” — Rediscover centuries-old Assamese and Indian kitchen wisdom with age-group dosage guidance, spice safety warnings, and live pantry matching."
                : "“Ghoror mosolat, sasti niramoy” (ঘৰৰ মছলাত, স্বস্তি নিৰাময়) — Centuries-old Assamese and Indian kitchen wisdom with age dosages, safety warnings, and pantry matching."}
            </p>
            <p className="inline-flex items-center gap-1.5 text-[11px] font-semibold tracking-wide text-amber-800 border border-amber-400/50 rounded-full px-3 py-1">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-600" aria-hidden="true" />
              {isAs
                ? "১০০% ঘৰুৱা, ব্যক্তিগত আৰু অফলাইন"
                : "100% Local, Private & Offline-Ready"}
            </p>
          </div>

          {/* Navigation */}
          <nav className="md:col-span-3" aria-label={isAs ? "ফুটাৰ সূচী" : "Footer navigation"}>
            <h4 className="text-[11px] font-bold uppercase tracking-[0.18em] text-stone-500 pb-2 mb-4 border-b border-amber-300/60">
              {isAs ? "সূচীপত্ৰ" : isEn ? "Explore" : "Explore / সূচীপত্ৰ"}
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <Link href="/" className="text-stone-600 hover:text-amber-800 transition">
                  {isAs ? "গৃহ" : "Home"}
                </Link>
              </li>
              <li>
                <Link href="/symptoms" className="text-stone-600 hover:text-amber-800 transition">
                  {isAs ? "সকলো লক্ষণ (১০৫টা বিভাগ)" : "Symptoms (105 Categories)"}
                </Link>
              </li>
              <li>
                <Link href="/knowledge-bank" className="text-stone-600 hover:text-amber-800 transition">
                  {isAs ? "পৰম্পৰাগত জ্ঞান ভঁৰাল" : "Knowledge Bank"}
                </Link>
              </li>
              <li>
                <Link href="/library" className="text-stone-600 hover:text-amber-800 transition">
                  {isAs ? "জ্ঞান ভঁৰাল আৰু উদ্ভিদকোষ" : "Living Reference Library"}
                </Link>
              </li>
              <li>
                <Link href="/saved" className="text-stone-600 hover:text-amber-800 transition">
                  {isAs ? "সংৰক্ষিত উপচাৰ" : "Saved Remedies"}
                </Link>
              </li>
            </ul>
          </nav>

          {/* Emergency Care — restrained safety styling (red reserved for safety) */}
          <div className="md:col-span-4">
            <h4 className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-red-700 pb-2 mb-4 border-b border-red-400/30">
              <ShieldAlert className="w-3.5 h-3.5 text-red-600" aria-hidden="true" />
              {isAs ? "জৰুৰীকালীন সাহায্য" : "Emergency Care"}
            </h4>
            <p className="text-xs text-stone-600 leading-relaxed">
              {isAs
                ? "যদি হঠাৎ উশাহৰ কষ্ট, বুকুৰ বিষ, তীব্ৰ জ্বৰ (১০৩°F তকৈ বেছি) বা তেজ ওলোৱা দেখা দিয়ে, তৎকালীনভাৱে জৰুৰীকালীন এম্বুলেন্স (১০৮) বা হাস্পতালত যোগাযোগ কৰক।"
                : "In case of crushing chest pain, difficulty breathing, severe bleeding, or high fever >103°F, immediately contact national emergency services (108 / 112)."}
            </p>
            <Link
              href="/fridge-card"
              className="mt-4 inline-flex items-center gap-1.5 rounded-lg border border-red-300/60 bg-red-50 px-3 py-2 text-[11px] font-bold text-red-800 hover:border-red-400 transition"
            >
              <FileText className="w-3.5 h-3.5" aria-hidden="true" />
              {isAs ? "আপতকালীন ফ্ৰিজ কাৰ্ড (PDF)" : "Emergency Fridge Card (PDF)"}
            </Link>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-amber-300/50 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] sm:text-xs text-stone-500">
          <p>© {new Date().getFullYear()} Niramay (নিৰাময়).</p>
          <p className="flex items-center gap-1.5">
            <span>
              {isAs
                ? "অসমীয়া ঘৰুৱা চিকিৎসাৰ সংৰক্ষণ"
                : "Preserving authentic herbal heritage"}
            </span>
            <Heart className="w-3 h-3 text-red-600 fill-red-600" aria-hidden="true" />
          </p>
        </div>
      </div>
    </footer>
  );
};
