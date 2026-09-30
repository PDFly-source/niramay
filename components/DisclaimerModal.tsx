"use client";

import React from "react";
import { useNiramayStore } from "@/lib/store";
import { useMounted } from "@/hooks/useMounted";
import { useBodyScrollLock } from "@/hooks/useBodyScrollLock";
import { NiramayLogo } from "@/components/brand/NiramayLogo";
import { ShieldCheck, AlertTriangle, HeartPulse, X } from "lucide-react";

/**
 * One-time educational disclaimer shown on first visit.
 * Clarifies that Niramay shares traditional knowledge for general wellness
 * learning — it is not medical advice and never replaces professional care.
 */
export const DisclaimerModal: React.FC = () => {
  const mounted = useMounted();
  const { hasAcceptedDisclaimer, acceptDisclaimer, languageMode } =
    useNiramayStore();
  const currentMode = mounted ? languageMode : "bilingual";
  const isAs = currentMode === "as";

  const disclaimerVisible = mounted && !hasAcceptedDisclaimer;
  useBodyScrollLock(disclaimerVisible);

  if (!disclaimerVisible) return null;

  return (
    <div
      className="fixed inset-0 z-[90] flex items-center justify-center p-4 bg-stone-950/70 backdrop-blur-sm no-print"
      role="dialog"
      aria-modal="true"
      aria-label="Educational disclaimer"
    >
      <div className="max-w-md w-full bg-cream rounded-3xl shadow-2xl border border-amber-200/80 overflow-hidden niramay-modal-fit-90 overflow-y-auto">
        <div className="px-6 pt-6 pb-2 flex items-start justify-between gap-3">
          <div className="flex items-center gap-4">
            <NiramayLogo size={72} variant="full" />
            <div>
              <h2 className="text-lg font-serif font-black text-stone-900 leading-tight">
                {isAs ? "নিৰাময়লৈ স্বাগতম" : "Welcome to Niramay"}
              </h2>
              <p className="text-[11px] text-stone-500 font-medium">
                {isAs ? "পৰম্পৰাগত পাকঘৰৰ জ্ঞান" : "Traditional kitchen wisdom"}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={acceptDisclaimer}
            aria-label="Close disclaimer"
            className="text-stone-400 hover:text-stone-700 p-1 transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="px-6 pb-6 space-y-4">
          <div className="space-y-3 text-[13px] leading-relaxed text-stone-700">
            <p className="flex items-start gap-2.5">
              <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
              <span>
                {isAs
                  ? "নিৰাময়ে অসমীয়া আৰু ভাৰতীয় পৰম্পৰাগত পাকঘৰৰ জ্ঞান শিক্ষাৰ বাবে সামৰি আনে — ই চিকিৎসকৰ পৰামৰ্শৰ বিকল্প নহয়।"
                  : "Niramay shares Assamese and Indian traditional kitchen knowledge for education and general wellness. It is not a substitute for professional medical advice, diagnosis, or treatment."}
              </span>
            </p>
            <p className="flex items-start gap-2.5">
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <span>
                {isAs
                  ? "পৰম্পৰাগত উপচাৰ ব্যক্তিভেদে বেলেগ হয় — ই নিশ্চিত চিকিৎসা নহয়। গুৰুতৰ বা দীৰ্ঘদিনীয়া লক্ষণত চিকিৎসকৰ পৰামৰ্শ এৰাই নচলাব।"
                  : "Traditional remedies vary by person and are shared as cultural knowledge, not guaranteed cures. Never delay or replace professional care for serious or lasting symptoms."}
              </span>
            </p>
            <p className="flex items-start gap-2.5">
              <HeartPulse className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
              <span>
                {isAs
                  ? "গৰ্ভাৱস্থা, শিশু, বয়স্ক আৰু ৰোগীৰ বাবে প্ৰতিটো উপচাৰৰ সতৰ্কতা ভালকৈ পঢ়ি লওক।"
                  : "Always read the safety notes on each remedy. Extra care is needed during pregnancy, for children, seniors, and those with existing conditions or medication."}
              </span>
            </p>
          </div>

          <button
            type="button"
            onClick={acceptDisclaimer}
            className="w-full px-4 py-3 rounded-2xl bg-emerald-800 hover:bg-emerald-900 text-onbrand text-sm font-bold shadow-md transition focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2"
          >
            {isAs ? "বুজি পালোঁ — আগম কৰক" : "I understand — Enter Niramay"}
          </button>
          <p className="text-center text-[10px] text-stone-400">
            {isAs
              ? "আপুনি এই বাৰ্তা এবাৰহে দেখিব। আপোনাৰ সুৰক্ষাৰ বাবে দেখুওৱা হৈছে।"
              : "You will see this message only once. It is shown for your safety."}
          </p>
        </div>
      </div>
    </div>
  );
};
