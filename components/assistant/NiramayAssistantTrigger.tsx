"use client";

import React, { useSyncExternalStore } from "react";
import { useNiramayStore } from "@/lib/store";
import { useMounted } from "@/hooks/useMounted";
import { Sparkles } from "lucide-react";
import { NiramayLogo } from "@/components/brand/NiramayLogo";
import { subscribeFooterVisible, getFooterVisible } from "@/lib/footerVisibility";

export const NiramayAssistantTrigger: React.FC = () => {
  const mounted = useMounted();
  const { isAssistantOpen, setAssistantOpen, languageMode } =
    useNiramayStore();
  const currentMode = mounted ? languageMode : "bilingual";
  const isAs = currentMode === "as";

  // Footer-aware visibility: smoothly hide the floating trigger while the
  // footer is in view (so it never floats over the footer's own links/
  // signature), and restore it as soon as the user scrolls back up and
  // away from the footer. getServerSnapshot=false keeps SSR/hydration
  // consistent — the trigger renders fully visible before the client
  // observer attaches, matching its real on-mount state (footer not yet
  // observed = not visible).
  const footerVisible = useSyncExternalStore(
    subscribeFooterVisible,
    getFooterVisible,
    () => false
  );

  if (!mounted || isAssistantOpen) return null;

  const hidden = footerVisible;

  return (
    <div
      className={`fixed right-4 sm:right-6 bottom-[var(--niramay-float-lift)] z-40 no-print transition-all duration-300 ease-out ${
        hidden
          ? "opacity-0 translate-y-3 pointer-events-none"
          : "opacity-100 translate-y-0 pointer-events-auto"
      }`}
      aria-hidden={hidden}
    >
      <button
        type="button"
        onClick={() => setAssistantOpen(true)}
        tabIndex={hidden ? -1 : 0}
        className="group relative flex items-center gap-2.5 px-3.5 py-2.5 sm:px-4 sm:py-3 bg-gradient-to-r from-amber-700 to-amber-900 hover:from-amber-800 hover:to-amber-950 text-onbrand rounded-2xl shadow-xl hover:shadow-2xl border border-amber-300/40 transition-all transform hover:-translate-y-0.5 active:scale-95 cursor-pointer touch-manipulation focus:outline-none focus:ring-2 focus:ring-amber-500"
        aria-label="Open Niramay AI Assistant"
      >
        <NiramayLogo size={28} className="group-hover:scale-110 transition-transform ring-amber-300/40" />
        <div className="text-left">
          <div className="text-xs font-serif font-black leading-tight flex items-center gap-1">
            <span>Niramay AI</span>
            <Sparkles className="w-3 h-3 text-amber-200 animate-pulse" />
          </div>
          <div className="text-[10px] text-amber-200/90 font-sans font-medium">
            {isAs ? "কওক বা সোধক" : "Voice & Chat"}
          </div>
        </div>
      </button>
    </div>
  );
};
