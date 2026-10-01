"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { ShieldAlert, AlertTriangle, FileText } from "lucide-react";
import { useNiramayStore } from "@/lib/store";
import { useMounted } from "@/hooks/useMounted";
import { useFooterInView } from "@/hooks/useFooterInView";

/**
 * Premium editorial footer — built on Niramay brand tokens so it renders
 * correctly in BOTH themes without overrides:
 *  light → parchment surface, ink-green structure, bronze/gold accents
 *  dark  → deep night surface (#0F2318), parchment typography, gold hairlines
 * Gamosa red is reserved strictly for safety/emergency semantics.
 *
 * Structure: Explore / Emergency Care / Legal (3-column on desktop, stacked
 * on mobile) → a single centered, typography-only final brand signature.
 * The in-app logo lockup lives in the header/brand surfaces; this footer's
 * final signature is deliberately wordmark-free per the product's premium
 * footer direction.
 */
export const Footer: React.FC = () => {
  const { languageMode } = useNiramayStore();
  const mounted = useMounted();
  const currentMode = mounted ? languageMode : "bilingual";
  const footerRef = useRef<HTMLElement>(null);
  useFooterInView(footerRef);

  const isAs = currentMode === "as";
  const isEn = currentMode === "en";

  return (
    <footer
      ref={footerRef}
      className="w-full bg-parchment text-ink mt-20 no-print"
      aria-label={isAs ? "ফুটাৰ" : "Site footer"}
    >
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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 md:gap-8">
          {/* Explore */}
          <nav aria-label={isAs ? "ফুটাৰ সূচী" : "Footer navigation"}>
            <h4 className="text-[11px] font-bold uppercase tracking-[0.18em] text-stone-500 pb-2 mb-4 border-b border-amber-300/60">
              {isAs ? "সূচীপত্ৰ" : isEn ? "Explore" : "Explore / সূচীপত্ৰ"}
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <Link href="/" className="text-stone-600 hover:text-amber-800 transition inline-block py-1.5 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-600">
                  {isAs ? "গৃহ" : "Home"}
                </Link>
              </li>
              <li>
                <Link href="/symptoms" className="text-stone-600 hover:text-amber-800 transition inline-block py-1.5 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-600">
                  {isAs ? "সকলো লক্ষণ (১০৫টা বিভাগ)" : "Symptoms (105 Categories)"}
                </Link>
              </li>
              <li>
                <Link href="/knowledge-bank" className="text-stone-600 hover:text-amber-800 transition inline-block py-1.5 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-600">
                  {isAs ? "পৰম্পৰাগত জ্ঞান ভঁৰাল" : "Knowledge Bank"}
                </Link>
              </li>
              <li>
                <Link href="/library" className="text-stone-600 hover:text-amber-800 transition inline-block py-1.5 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-600">
                  {isAs ? "জ্ঞান ভঁৰাল আৰু উদ্ভিদকোষ" : "Living Reference Library"}
                </Link>
              </li>
              <li>
                <Link href="/saved" className="text-stone-600 hover:text-amber-800 transition inline-block py-1.5 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-600">
                  {isAs ? "সংৰক্ষিত উপচাৰ" : "Saved Remedies"}
                </Link>
              </li>
            </ul>
          </nav>

          {/* Emergency Care — restrained safety styling (red reserved for safety) */}
          <div>
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
              className="mt-4 inline-flex items-center gap-1.5 rounded-lg border border-red-300/60 bg-red-50 px-3 py-2 text-[11px] font-bold text-red-800 hover:border-red-400 transition min-h-[36px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600"
            >
              <FileText className="w-3.5 h-3.5" aria-hidden="true" />
              {isAs ? "আপতকালীন ফ্ৰিজ কাৰ্ড (PDF)" : "Emergency Fridge Card (PDF)"}
            </Link>
          </div>

          {/* Legal */}
          <nav aria-label={isAs ? "আইনী" : "Legal"}>
            <h4 className="text-[11px] font-bold uppercase tracking-[0.18em] text-stone-500 pb-2 mb-4 border-b border-amber-300/60">
              {isAs ? "আইনী" : "Legal"}
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <Link href="/privacy" className="text-stone-600 hover:text-amber-800 transition inline-block py-1.5 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-600">
                  {isAs ? "গোপনীয়তা নীতি" : "Privacy Policy"}
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-stone-600 hover:text-amber-800 transition inline-block py-1.5 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-600">
                  {isAs ? "সেৱা চৰ্তাৱলী" : "Terms of Service"}
                </Link>
              </li>
              <li>
                <Link href="/cookies" className="text-stone-600 hover:text-amber-800 transition inline-block py-1.5 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-600">
                  {isAs ? "কুকি নীতি" : "Cookie Policy"}
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        {/* Final brand signature — typography only, no logo (lockup already
            lives in the header / in-app brand surfaces). */}
        <div className="mt-14 pt-10 border-t border-amber-300/40 flex flex-col items-center text-center gap-2.5">
          <p className="font-serif text-lg sm:text-xl font-bold tracking-tight text-ink">
            Niramay
          </p>
          <p className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.2em] text-amber-700">
            Traditional • Local • Private
          </p>
          <p className="text-xs text-stone-500 mt-2">
            Crafted &amp; Developed by <span className="font-semibold text-stone-600">PKD</span>
          </p>
          <p className="text-[11px] text-stone-400">
            © {new Date().getFullYear()} Niramay. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
