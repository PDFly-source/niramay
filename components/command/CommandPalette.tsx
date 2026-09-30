"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, MotionConfig } from "motion/react";
import { useRouter } from "next/navigation";
import { useBodyScrollLock } from "@/hooks/useBodyScrollLock";
import { useNiramayStore } from "@/lib/store";
import { useMounted } from "@/hooks/useMounted";
import {
  searchPalette,
  PaletteFilter,
  PaletteItem,
} from "@/lib/commandPalette";
import {
  Search,
  Activity,
  FlaskConical,
  Leaf,
  Wrench,
  BookOpen,
  Sun,
  CornerDownLeft,
  X,
} from "lucide-react";

const TYPE_ICON: Record<PaletteItem["type"], React.ElementType> = {
  symptom: Activity,
  remedy: FlaskConical,
  plant: Leaf,
  tool: Wrench,
  library: BookOpen,
  seasonal: Sun,
};

const FILTERS: { id: PaletteFilter; en: string; as: string }[] = [
  { id: "all", en: "All", as: "সকলো" },
  { id: "symptom", en: "Symptoms", as: "লক্ষণ" },
  { id: "remedy", en: "Remedies", as: "উপচাৰ" },
  { id: "plant", en: "Plants", as: "গছ-গছনি" },
  { id: "tool", en: "Tools", as: "সঁজুলি" },
  { id: "library", en: "Library", as: "জ্ঞান ভঁৰাল" },
  { id: "seasonal", en: "Seasonal", as: "বতৰীয়া" },
];

const TYPE_LABEL: Record<PaletteItem["type"], { en: string; as: string }> = {
  symptom: { en: "Symptom", as: "লক্ষণ" },
  remedy: { en: "Remedy", as: "উপচাৰ" },
  plant: { en: "Plant", as: "ঔষধি গছ" },
  tool: { en: "Tool", as: "সঁজুলি" },
  library: { en: "Library", as: "জ্ঞান ভঁৰাল" },
  seasonal: { en: "Seasonal Guide", as: "বতৰীয়া পথ প্ৰদৰ্শক" },
};

const SUGGESTIONS = ["turmeric", "acidity", "ginger", "scanner", "plants"];

function isTypingTarget(target: EventTarget | null): boolean {
  const el = target as HTMLElement | null;
  if (!el || !el.tagName) return false;
  const tag = el.tagName.toLowerCase();
  return tag === "input" || tag === "textarea" || tag === "select" || el.isContentEditable;
}

/**
 * Global Niramay Command Palette — the app-wide quick search surface.
 * Opened via Cmd/Ctrl+K, "/" or any CommandTrigger button.
 */
export const CommandPalette: React.FC = () => {
  const router = useRouter();
  const { isPaletteOpen, setPaletteOpen, languageMode } = useNiramayStore();
  const mounted = useMounted();
  const currentMode = mounted ? languageMode : "bilingual";
  const isAs = currentMode === "as";
  const isBi = currentMode === "bilingual";

  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<PaletteFilter>("all");
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const restoreFocusRef = useRef<HTMLElement | null>(null);

  useBodyScrollLock(isPaletteOpen);

  const results = React.useMemo(
    () => searchPalette(query, filter, 30),
    [query, filter]
  );

  /* Global shortcuts: Cmd/Ctrl+K toggles, "/" opens when not typing. */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setPaletteOpen(!isPaletteOpen);
        return;
      }
      if (!isPaletteOpen && e.key === "/" && !isTypingTarget(e.target)) {
        e.preventDefault();
        setPaletteOpen(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isPaletteOpen, setPaletteOpen]);

  /* Focus management: enter the input, restore the trigger afterwards. */
  useEffect(() => {
    if (isPaletteOpen) {
      restoreFocusRef.current = document.activeElement as HTMLElement | null;
      setQuery("");
      setFilter("all");
      setActiveIndex(0);
      const t = window.setTimeout(() => inputRef.current?.focus(), 30);
      return () => window.clearTimeout(t);
    }
    const el = restoreFocusRef.current;
    restoreFocusRef.current = null;
    if (el && document.contains(el)) {
      try { el.focus({ preventScroll: true }); } catch { /* noop */ }
    }
  }, [isPaletteOpen]);

  useEffect(() => {
    setActiveIndex(0);
  }, [query, filter]);

  const close = React.useCallback(() => setPaletteOpen(false), [setPaletteOpen]);

  const openResult = React.useCallback(
    (href: string) => {
      close();
      router.push(href);
    },
    [close, router]
  );

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      e.preventDefault();
      e.stopPropagation();
      close();
      return;
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => (results.length ? (i + 1) % results.length : 0));
      return;
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) =>
        results.length ? (i - 1 + results.length) % results.length : 0
      );
      return;
    }
    if (e.key === "Enter") {
      e.preventDefault();
      const item = results[activeIndex];
      if (item) openResult(item.href);
    }
  };

  /* Keep the highlighted result in view while navigating by keyboard. */
  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const el = list.querySelector<HTMLElement>(`[data-index="${activeIndex}"]`);
    el?.scrollIntoView({ block: "nearest" });
  }, [activeIndex, results]);

  if (!isPaletteOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[70]"
      role="dialog"
      aria-modal="true"
      aria-label={isAs ? "নিৰাময় সন্ধান" : "Niramay quick search"}
      onKeyDown={onKeyDown}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-stone-950/45 backdrop-blur-[2px] animate-in fade-in duration-150"
        onClick={close}
        aria-hidden="true"
      />

      {/* Palette surface */}
      <MotionConfig reducedMotion="user">
      <motion.div
        initial={{ opacity: 0, scale: 0.98, y: 8 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 420, damping: 34 }}
        className="
          relative mx-auto mt-[max(4vh,1.5rem)] w-[min(92vw,38rem)]
          flex flex-col overflow-hidden rounded-2xl
          bg-parchment text-ink border border-amber-300/70
          shadow-niramay-lg
          max-h-[calc(100dvh-2*max(4vh,1.5rem))]
        "
      >
        {/* Search input row */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-stone-200/80 shrink-0">
          <Search className="w-5 h-5 text-amber-700 shrink-0" aria-hidden="true" />
          <input
            ref={inputRef}
            type="text"
            role="combobox"
            aria-expanded="true"
            aria-controls="palette-results"
            aria-label={isAs ? "সন্ধান কৰক" : "Search Niramay"}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={
              isAs
                ? "লক্ষণ, উপচাৰ, গছ, সঁজুলি সন্ধান কৰক…"
                : isBi
                ? "Search symptoms, remedies, plants, tools… / সন্ধান কৰক…"
                : "Search symptoms, remedies, plants, tools…"
            }
            className="w-full bg-transparent text-sm sm:text-base placeholder:text-stone-400 focus:outline-none"
          />
          <button
            onClick={close}
            aria-label={isAs ? "বন্ধ কৰক" : "Close search"}
            className="shrink-0 rounded-lg p-1.5 text-stone-500 hover:text-stone-800 hover:bg-stone-100 transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Category filter chips */}
        <div className="flex gap-1.5 px-3 py-2 border-b border-stone-200/60 overflow-x-auto shrink-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {FILTERS.map((f) => {
            const active = filter === f.id;
            return (
              <button
                key={f.id}
                onClick={() => setFilter(f.id)}
                aria-pressed={active}
                className={`shrink-0 rounded-full px-3 py-1 text-[11px] font-bold border transition ${
                  active
                    ? "bg-emerald-800 text-onbrand border-emerald-800"
                    : "bg-transparent text-stone-600 border-stone-300 hover:border-amber-400 hover:text-amber-800"
                }`}
              >
                {isAs ? f.as : f.en}
              </button>
            );
          })}
        </div>

        {/* Results / empty state */}
        <div
          id="palette-results"
          role="listbox"
          ref={listRef}
          className="flex-1 min-h-0 overflow-y-auto overscroll-contain px-2 py-2"
        >
          {results.length === 0 ? (
            <div className="px-4 py-8 text-center">
              <p className="text-sm font-semibold text-stone-700">
                {isAs ? "কোনো ফলাফল পোৱা নগ'ল" : "No results found"}
              </p>
              <p className="mt-1 text-xs text-stone-500">
                {isAs ? "এইবোৰ চেষ্টা কৰক:" : "Try:"}
              </p>
              <div className="mt-3 flex flex-wrap justify-center gap-1.5">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    onClick={() => setQuery(s)}
                    className="rounded-full bg-stone-100 border border-stone-300 px-3 py-1 text-xs font-semibold text-stone-700 hover:border-amber-400 hover:text-amber-800 transition"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            results.map((item, index) => {
              const Icon = TYPE_ICON[item.type];
              const typeLabel = TYPE_LABEL[item.type];
              const active = index === activeIndex;
              const title = isAs
                ? item.titleAs
                : isBi && item.titleAs !== item.titleEn
                ? `${item.titleEn} / ${item.titleAs}`
                : item.titleEn;
              const desc = isAs ? item.descAs : item.descEn;
              return (
                <button
                  key={item.id}
                  data-index={index}
                  role="option"
                  aria-selected={active}
                  onClick={() => openResult(item.href)}
                  onMouseMove={() => setActiveIndex(index)}
                  className={`w-full text-left flex items-center gap-3 rounded-xl px-3 py-2.5 transition ${
                    active
                      ? "bg-amber-100"
                      : "bg-transparent hover:bg-stone-100"
                  }`}
                >
                  <span
                    className={`shrink-0 w-9 h-9 rounded-xl flex items-center justify-center border ${
                      active
                        ? "bg-emerald-800 border-emerald-800 text-onbrand"
                        : "bg-stone-100 border-stone-200 text-amber-800"
                    }`}
                  >
                    <Icon className="w-4 h-4" aria-hidden="true" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-semibold text-ink">
                      {title}
                    </span>
                    {desc && (
                      <span className="block truncate text-xs text-stone-500">
                        {desc}
                      </span>
                    )}
                  </span>
                  <span className="shrink-0 rounded-full border border-stone-300 bg-stone-50 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-stone-500">
                    {isAs ? typeLabel.as : typeLabel.en}
                  </span>
                </button>
              );
            })
          )}
        </div>

        {/* Footer hint bar */}
        <div className="flex items-center justify-between gap-3 px-4 py-2 border-t border-stone-200/80 text-[10px] text-stone-500 bg-stone-50/60 shrink-0 pb-[max(0.5rem,env(safe-area-inset-bottom))]">
          <span className="flex items-center gap-1.5">
            <kbd className="rounded border border-stone-300 bg-stone-50 px-1 py-0.5 font-mono">↑</kbd>
            <kbd className="rounded border border-stone-300 bg-stone-50 px-1 py-0.5 font-mono">↓</kbd>
            {isAs ? "নেভিগেট কৰক" : "navigate"}
            <kbd className="ml-1 rounded border border-stone-300 bg-stone-50 px-1 py-0.5 font-mono">↵</kbd>
            <span className="inline-flex items-center gap-0.5">
              {isAs ? "খোলক" : "open"}
              <CornerDownLeft className="w-2.5 h-2.5" aria-hidden="true" />
            </span>
          </span>
          <span className="hidden sm:inline">
            <kbd className="rounded border border-stone-300 bg-stone-50 px-1 py-0.5 font-mono">Esc</kbd>{" "}
            {isAs ? "বন্ধ কৰক" : "close"}
          </span>
        </div>
      </motion.div>
      </MotionConfig>
    </div>
  );
};
