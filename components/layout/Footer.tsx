"use client";

import React from "react";
import Link from "next/link";
import { NiramayLogo } from "@/components/brand/NiramayLogo";
import { ShieldAlert, Heart, Sparkles, AlertTriangle } from "lucide-react";
import { useNiramayStore } from "@/lib/store";
import { useMounted } from "@/hooks/useMounted";
import { UI_TRANSLATIONS } from "@/lib/i18n";

export const Footer: React.FC = () => {
  const { languageMode } = useNiramayStore();
  const mounted = useMounted();
  const currentMode = mounted ? languageMode : "bilingual";

  const isAs = currentMode === "as";

  return (
    <footer className="w-full bg-stone-900 text-stone-300 mt-20 no-print">
      {/* Persistent safety strip */}
      <div className="bg-amber-500/10 border-y border-amber-500/20 py-3 px-4">
        <div className="max-w-6xl mx-auto flex items-center justify-center gap-2 text-xs sm:text-sm font-medium text-amber-300 text-center">
          <AlertTriangle className="w-4 h-4 shrink-0 text-amber-400" />
          <span>
            {isAs
              ? "⚠️ শিক্ষণীয় আৰু পৰম্পৰাগত জ্ঞানৰ বাবেহে — কোনো পেছাদাৰী চিকিৎসা পৰামৰ্শৰ বিকল্প নহয়।"
              : currentMode === "en"
              ? "⚠️ For informational purposes only — not a substitute for professional medical advice."
              : "⚠️ For informational purposes only • পৰম্পৰাগত শিক্ষণীয় তথ্য — চিকিৎসকৰ পৰামৰ্শৰ বিকল্প নহয়।"}
          </span>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand blurb */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-3">
              <NiramayLogo size={36} />
              <div>
                <span className="text-xl font-serif font-bold text-white">Niramay</span>
                <span className="ml-2 text-xs font-semibold text-emerald-400">নিৰাময়</span>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-stone-400 leading-relaxed max-w-md">
              {isAs
                ? "“ঘৰৰ মছলাত, স্বস্তি নিৰাময়” — অসমীয়া আৰু ভাৰতীয় পৰম্পৰাগত পাকঘৰৰ চিকিৎসা জ্ঞান, বয়স অনুযায়ী মাত্ৰা আৰু বিপদ সংকেতৰ সৈতে।"
                : currentMode === "en"
                ? "“Ghoror mosolat, sasti niramoy” — Rediscover centuries-old Assamese and Indian kitchen wisdom with clinically validated age dosages, spice safety warnings, and live pantry matching."
                : "“Ghoror mosolat, sasti niramoy” (ঘৰৰ মছলাত, স্বস্তি নিৰাময়) — Centuries-old Assamese and Indian kitchen wisdom with age dosages, safety warnings, and pantry matching."}
            </p>
            <div className="flex items-center gap-2 text-xs text-amber-400/90 pt-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>
                {isAs
                  ? "১০০% ঘৰুৱা, ব্যক্তিগত আৰু অফলাইন ব্যৱহাৰৰ বাবে সাজু"
                  : "100% Local, Private, and Offline-Ready • ১০০% অফলাইন ব্যৱহাৰোপযোগী"}
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-200">
              {isAs ? "সূচীপত্ৰ" : "Navigation / সূচীপত্ৰ"}
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-stone-400">
              <li>
                <Link href="/" className="hover:text-amber-400 transition">
                  {isAs ? "গৃহ" : "Home"}
                </Link>
              </li>
              <li>
                <Link href="/symptoms" className="hover:text-amber-400 transition">
                  {isAs ? "সকলো লক্ষণ (১০৫টা বিভাগ)" : "Symptoms (105 Categories)"}
                </Link>
              </li>
              <li>
                <Link href="/knowledge-bank" className="hover:text-amber-400 transition">
                  {isAs ? "পৰম্পৰাগত জ্ঞান ভঁৰাল" : "Traditional Knowledge Bank"}
                </Link>
              </li>
              <li>
                <Link href="/saved" className="hover:text-amber-400 transition">
                  {isAs ? "সংৰক্ষিত উপচাৰ" : "Saved Remedies"}
                </Link>
              </li>
            </ul>
          </div>

          {/* Medical Guidance */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
              <ShieldAlert className="w-4 h-4 text-amber-400" />
              <span>{isAs ? "জৰুৰীকালীন সাহায্য" : "Emergency Care"}</span>
            </h4>
            <p className="text-xs text-stone-400 leading-relaxed">
              {isAs
                ? "যদি হঠাৎ উশাহৰ কষ্ট, বুকুৰ বিষ, তীব্ৰ জ্বৰ (১০৩°F তকৈ বেছি) বা তেজ ওলোৱা দেখা দিয়ে, তৎকালীনভাৱে জৰুৰীকালীন এম্বুলেন্স (১০৮) বা হাস্পাতালত যোগাযোগ কৰক।"
                : "In case of crushing chest pain, difficulty breathing, severe bleeding, or high fever >103°F, immediately contact national emergency services (108 / 112)."}
            </p>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <p>© {new Date().getFullYear()} Niramay (নিৰাময়). Preserving authentic herbal heritage.</p>
          <p className="flex items-center gap-1">
            <span>{isAs ? "অসমীয়া ঘৰুৱা চিকিৎসাৰ সংৰক্ষণ" : "Preserving Indian domestic herbal heritage"}</span>
            <Heart className="w-3 h-3 text-red-500 fill-red-500" />
          </p>
        </div>
      </div>
    </footer>
  );
};
