"use client";

import React, { useState, useEffect } from "react";
import { useNiramayStore } from "@/lib/store";
import { useMounted } from "@/hooks/useMounted";
import { Download, X, Sparkles, WifiOff } from "lucide-react";
import { NiramayLogo } from "@/components/brand/NiramayLogo";

export const FloatingInstallBanner: React.FC = () => {
  const mounted = useMounted();
  const { languageMode, pwaBannerDismissedUntil, dismissPwaBanner } =
    useNiramayStore();
  const isAs = mounted && languageMode === "as";

  const [installPrompt, setInstallPrompt] = useState<any>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Check if dismissed recently
    if (pwaBannerDismissedUntil && Date.now() < pwaBannerDismissedUntil) {
      return;
    }

    const handler = (e: any) => {
      e.preventDefault();
      setInstallPrompt(e);
      setIsVisible(true);
    };

    window.addEventListener("beforeinstallprompt", handler);

    // Also show after 3 seconds if not installed and not dismissed
    const timer = setTimeout(() => {
      if (!window.matchMedia("(display-mode: standalone)").matches) {
        if (!pwaBannerDismissedUntil || Date.now() >= pwaBannerDismissedUntil) {
          setIsVisible(true);
        }
      }
    }, 3000);

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
      clearTimeout(timer);
    };
  }, [pwaBannerDismissedUntil]);

  const handleInstallClick = async () => {
    if (installPrompt) {
      installPrompt.prompt();
      const choice = await installPrompt.userChoice;
      if (choice.outcome === "accepted") {
        setIsVisible(false);
      }
    } else {
      // Fallback instruction
      alert(
        isAs
          ? "আপোনাৰ ব্ৰাউজাৰৰ মেনুত গৈ 'Add to Home screen' বা 'Install' টিপক।"
          : "Tap your browser menu and choose 'Add to Home Screen' or 'Install App'."
      );
    }
  };

  const handleDismiss = () => {
    dismissPwaBanner(7); // dismiss for 7 days
    setIsVisible(false);
  };

  if (!mounted || !isVisible) return null;

  return (
    <div className="fixed bottom-20 sm:bottom-24 left-3 right-3 sm:left-auto sm:right-6 sm:max-w-md z-40 bg-stone-900 text-white rounded-3xl p-4 shadow-2xl border border-stone-700 animate-in slide-in-from-bottom-4 duration-300 no-print">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <NiramayLogo size={36} />
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-bold text-amber-400">
                {isAs ? "নিৰাময় এপ ইনষ্টল কৰক" : "Install Niramay App"}
              </span>
              <span className="text-[9px] font-mono bg-emerald-500/20 text-emerald-300 px-1.5 py-0.2 rounded-md">
                ~1MB
              </span>
            </div>
            <p className="text-[11px] text-stone-300 mt-0.5 leading-snug">
              {isAs
                ? "ইণ্টাৰনেট অবিহনে গাঁৱতো চলিব। ক্ষিপ্ৰতাৰে পাকঘৰৰ উপচাৰ বিচাৰক।"
                : "Works 100% offline with zero internet in remote villages."}
            </p>
          </div>
        </div>

        <button
          onClick={handleDismiss}
          className="text-stone-400 hover:text-white p-1"
          aria-label="Dismiss"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="mt-3 flex items-center justify-end gap-2 pt-2 border-t border-stone-800">
        <button
          type="button"
          onClick={handleDismiss}
          className="px-3 py-1.5 rounded-xl text-[11px] font-semibold text-stone-400 hover:text-stone-200"
        >
          {isAs ? "পিছত কৰিম" : "Not now"}
        </button>
        <button
          type="button"
          onClick={handleInstallClick}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-bold shadow-md transition"
        >
          <Download className="w-3.5 h-3.5" />
          <span>{isAs ? "ইনষ্টল কৰক" : "Install App"}</span>
        </button>
      </div>
    </div>
  );
};
