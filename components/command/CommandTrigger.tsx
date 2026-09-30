"use client";

import React from "react";
import { useNiramayStore } from "@/lib/store";
import { useMounted } from "@/hooks/useMounted";
import { Search } from "lucide-react";

/**
 * Canonical Niramay search trigger — opens the global Command Palette.
 * Premium field-style button (not an input), with platform-aware
 * keyboard hint on desktop.
 */
export const CommandTrigger: React.FC<{ className?: string }> = ({
  className = "",
}) => {
  const setPaletteOpen = useNiramayStore((s) => s.setPaletteOpen);
  const languageMode = useNiramayStore((s) => s.languageMode);
  const mounted = useMounted();
  const currentMode = mounted ? languageMode : "bilingual";
  const isAs = currentMode === "as";

  const [isMac, setIsMac] = React.useState(false);
  React.useEffect(() => {
    setIsMac(
      typeof navigator !== "undefined" &&
        /mac|iphone|ipad/i.test(navigator.platform || navigator.userAgent)
    );
  }, []);

  return (
    <button
      type="button"
      onClick={() => setPaletteOpen(true)}
      aria-label={
        isAs ? "নিৰাময় সন্ধান খোলক" : "Open Niramay quick search"
      }
      aria-keyshortcuts="Control+K Meta+K"
      className={`group flex w-full items-center gap-3 rounded-xl bg-white border border-amber-300 shadow-niramay-lg px-4 py-4 text-left transition-all hover:border-amber-600 focus:outline-none focus:ring-4 focus:ring-amber-500/20 ${className}`}
    >
      <Search
        className="w-5 h-5 text-amber-700 shrink-0 group-hover:scale-105 transition-transform"
        aria-hidden="true"
      />
      <span className="flex-1 min-w-0 truncate text-sm sm:text-base text-stone-400">
        {isAs
          ? "নিৰাময়ত সন্ধান কৰক…"
          : "Search Niramay… symptoms, remedies, plants, tools"}
      </span>
      <span className="hidden md:inline-flex items-center gap-1 shrink-0 text-[10px] font-mono font-semibold text-stone-500 border border-stone-300 rounded-md bg-stone-50 px-1.5 py-1 group-hover:border-amber-400 transition">
        {isMac ? "⌘ K" : "Ctrl K"}
      </span>
    </button>
  );
};
