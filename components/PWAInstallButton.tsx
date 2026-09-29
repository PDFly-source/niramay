"use client";

import React, { useState } from "react";
import { usePWAInstall } from "@/hooks/usePWAInstall";
import { useBodyScrollLock } from "@/hooks/useBodyScrollLock";
import { Download, Share2, X, Smartphone } from "lucide-react";

interface PWAInstallButtonProps {
  variant?: "header" | "banner";
}

export const PWAInstallButton: React.FC<PWAInstallButtonProps> = ({
  variant = "header",
}) => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showIOSGuide, setShowIOSGuide] = useState(false);
  useBodyScrollLock(showIOSGuide);

  // If already running as an installed PWA, hide the button
  if (isInstalled) {
    return null;
  }

  // Chromium / Android / Desktop flow
  if (isInstallable) {
    if (variant === "header") {
      return (
        <button
          onClick={install}
          aria-label="Install Niramay App"
          className="hidden sm:inline-flex items-center justify-center gap-1.5 rounded-full bg-amber-600 hover:bg-amber-700 text-onbrand sm:h-auto sm:px-3 sm:py-1.5 text-xs font-semibold shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-amber-500/40"
        >
          <Download className="w-4 h-4" />
          <span className="hidden sm:inline">Install App</span>
        </button>
      );
    }

    return (
      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-center justify-between gap-4 shadow-sm my-4 no-print">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-600 text-onbrand flex items-center justify-center shrink-0">
            <Smartphone className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-stone-900">Install Niramay on your phone</h4>
            <p className="text-xs text-stone-600">Quick offline access to traditional kitchen remedies anytime.</p>
          </div>
        </div>
        <button
          onClick={install}
          className="px-3.5 py-1.5 bg-amber-600 hover:bg-amber-700 text-onbrand text-xs font-semibold rounded-lg shrink-0 transition"
        >
          Install
        </button>
      </div>
    );
  }

  // iOS Safari flow
  if (isIOS) {
    return (
      <>
        <button
          onClick={() => setShowIOSGuide(true)}
          aria-label="Install Niramay on iPhone or iPad"
          className="inline-flex items-center gap-1.5 rounded-full border border-stone-300 hover:bg-stone-100 text-stone-700 px-3 py-1.5 text-xs font-medium transition"
        >
          <Download className="w-3.5 h-3.5 text-amber-700" />
          <span>Add to Home Screen</span>
        </button>

        {showIOSGuide && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4"
            role="dialog"
            aria-modal="true"
          >
            <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl border border-stone-200 text-stone-900 niramay-modal-fit-90 overflow-y-auto">
              <div className="flex items-center justify-between pb-3 border-b border-stone-100">
                <h3 className="text-base font-bold text-stone-900">Install on iPhone / iPad</h3>
                <button
                  onClick={() => setShowIOSGuide(false)}
                  className="p-1 text-stone-400 hover:text-stone-600 rounded-lg"
                  aria-label="Close dialog"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="mt-4 space-y-3 text-sm text-stone-600">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-amber-100 text-amber-800 text-xs font-bold flex items-center justify-center shrink-0">
                    1
                  </div>
                  <p>
                    Tap the <strong className="text-stone-900">Share</strong> button{" "}
                    <Share2 className="w-4 h-4 inline-block text-amber-700" /> in the Safari navigation bar.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-amber-100 text-amber-800 text-xs font-bold flex items-center justify-center shrink-0">
                    2
                  </div>
                  <p>
                    Scroll down and tap{" "}
                    <strong className="text-stone-900">Add to Home Screen</strong>.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-amber-100 text-amber-800 text-xs font-bold flex items-center justify-center shrink-0">
                    3
                  </div>
                  <p>Tap <strong className="text-stone-900">Add</strong> at top right to complete installation.</p>
                </div>
              </div>

              <button
                onClick={() => setShowIOSGuide(false)}
                className="mt-5 w-full rounded-xl bg-stone-900 hover:bg-stone-800 py-2.5 text-xs font-semibold text-onbrand transition"
              >
                Got it
              </button>
            </div>
          </div>
        )}
      </>
    );
  }

  return null;
};
