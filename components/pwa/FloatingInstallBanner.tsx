"use client";

import React, { useState, useEffect, useRef } from "react";
import { useNiramayStore } from "@/lib/store";
import { useMounted } from "@/hooks/useMounted";
import { Download, X, Sparkles, WifiOff } from "lucide-react";
import { NiramayLogo } from "@/components/brand/NiramayLogo";

export const FloatingInstallBanner: React.FC = () => {
  const mounted = useMounted();
  const {
    languageMode,
    pwaBannerDismissedUntil,
    dismissPwaBanner,
    setInstallBannerVisible,
  } = useNiramayStore();
  const isAs = mounted && languageMode === "as";

  const [installPrompt, setInstallPrompt] = useState<any>(null);
  const [isVisible, setIsVisible] = useState(false);
  const bannerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

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

  useEffect(() => {
    setInstallBannerVisible(mounted && isVisible);
    return () => setInstallBannerVisible(false);
  }, [mounted, isVisible, setInstallBannerVisible]);

  // Single owner of the shared overlay calculation: while visible,
  // publish this banner's live footprint to --niramay-dynamic-inset
  // so page content reserves its space and floating controls reposition
  // above it. Assamese text reflow and orientation changes are covered
  // by the ResizeObserver.
  useEffect(() => {
    if (!mounted || !isVisible) return;
    const root = document.documentElement;
    const el = bannerRef.current;
    if (!el) return;

    const publish = () => {
      const gapPx = 12; // --niramay-float-gap
      // Fractional height (offsetHeight rounds down) + 1px safety so the
      // reserved space is never a hair short of the rendered banner.
      const height = Math.ceil(el.getBoundingClientRect().height) + 1;
      root.style.setProperty(
        "--niramay-dynamic-inset",
        `${height + gapPx}px`
      );
    };

    publish();
    const observer = new ResizeObserver(publish);
    observer.observe(el);
    return () => {
      observer.disconnect();
      root.style.setProperty("--niramay-dynamic-inset", "0px");
    };
  }, [mounted, isVisible]);

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
    <div ref={bannerRef} className="fixed bottom-[var(--niramay-banner-lift)] left-3 right-3 sm:left-auto sm:right-6 sm:max-w-md z-40 bg-night text-onbrand rounded-3xl p-4 shadow-2xl border border-night-line animate-in slide-in-from-bottom-4 duration-300 no-print">
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
            <p className="text-[11px] text-onbrand/75 mt-0.5 leading-snug">
              {isAs
                ? "ইণ্টাৰনেট অবিহনে গাঁৱতো চলিব। ক্ষিপ্ৰতাৰে পাকঘৰৰ উপচাৰ বিচাৰক।"
                : "Works 100% offline with zero internet in remote villages."}
            </p>
          </div>
        </div>

        <button
          onClick={handleDismiss}
          className="text-stone-400 hover:text-onbrand p-2.5 -m-1.5 min-w-[44px] min-h-[44px] inline-flex items-center justify-center rounded-xl"
          aria-label="Dismiss"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="mt-3 flex items-center justify-end gap-2 pt-2 border-t border-stone-800">
        <button
          type="button"
          onClick={handleDismiss}
          className="px-4 py-2.5 -my-1 rounded-xl text-[11px] font-semibold text-stone-400 hover:text-stone-200 min-h-[44px]"
        >
          {isAs ? "পিছত কৰিম" : "Not now"}
        </button>
        <button
          type="button"
          onClick={handleInstallClick}
          className="inline-flex items-center gap-1.5 px-3.5 py-2.5 -my-1 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-bold shadow-md transition min-h-[44px]"
        >
          <Download className="w-3.5 h-3.5" />
          <span>{isAs ? "ইনষ্টল কৰক" : "Install App"}</span>
        </button>
      </div>
    </div>
  );
};
