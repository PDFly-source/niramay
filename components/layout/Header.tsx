"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NiramayLogo } from "@/components/brand/NiramayLogo";
import { PWAInstallButton } from "@/components/PWAInstallButton";
import { useNiramayStore } from "@/lib/store";
import { useMounted } from "@/hooks/useMounted";
import {
  Bookmark,
  BookOpen,
  Layers,
  Menu,
  X,
  Globe,
  Leaf,
  FileText,
  Bot,
  Calendar,
  Sprout,
  TrendingUp,
  BookHeart,
  PhoneCall,
  Activity,
  Sparkles,
  Ambulance,
  Compass,
} from "lucide-react";
import { LanguageMode, UI_TRANSLATIONS } from "@/lib/i18n";
import { EmergencySpeedDial } from "@/components/emergency/EmergencySpeedDial";

interface NavItem {
  href: string;
  labelEn: string;
  labelAs: string;
  icon: any;
  isNew?: boolean;
  badge?: number | string | null;
}

interface NavSection {
  groupKey: string;
  titleEn: string;
  titleAs: string;
  items: NavItem[];
}

export const Header: React.FC = () => {
  const pathname = usePathname();
  const { savedRemedyIds, languageMode, setLanguageMode, setAssistantOpen } =
    useNiramayStore();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const mounted = useMounted();

  const currentMode = mounted ? languageMode : "bilingual";
  const isAs = currentMode === "as";
  const isEn = currentMode === "en";

  // Grouped Navigation Sections (11-12 Destinations)
  const navSections: NavSection[] = [
    {
      groupKey: "discover",
      titleEn: "Discover & Health",
      titleAs: "অন্বেষণ আৰু নিৰাময়",
      items: [
        {
          href: "/symptoms",
          labelEn: "Symptom Directory",
          labelAs: "লক্ষণ সূচী",
          icon: Layers,
        },
        {
          href: "/plant-scanner",
          labelEn: "Plant & Leaf Scanner",
          labelAs: "বনৌষধি স্কেনাৰ",
          icon: Leaf,
        },
        {
          href: "/knowledge-bank",
          labelEn: "Knowledge Bank",
          labelAs: "জ্ঞান ভঁৰাল",
          icon: BookOpen,
        },
      ],
    },
    {
      groupKey: "daily",
      titleEn: "Daily Living & Wellness",
      titleAs: "দৈনন্দিন জীৱনশৈলী",
      items: [
        {
          href: "/ritucharya",
          labelEn: "Ritucharya (Seasonal Guide)",
          labelAs: "ঋতুচৰ্যা (বতৰৰ যত্ন)",
          icon: Calendar,
          isNew: true,
        },
        {
          href: "/kitchen-garden",
          labelEn: "Kitchen Garden Guide",
          labelAs: "পাকঘৰৰ বাৰী",
          icon: Sprout,
          isNew: true,
        },
        {
          href: "/daily-habits",
          labelEn: "Daily Habit Tracker",
          labelAs: "দিনচৰ্যা অভ্যাস",
          icon: TrendingUp,
          isNew: true,
        },
      ],
    },
    {
      groupKey: "wisdom",
      titleEn: "Community & Heritage",
      titleAs: "ঐতিহ্য আৰু জ্ঞান",
      items: [
        {
          href: "/aitas-diha",
          labelEn: "Aita's Diha (Family Journal)",
          labelAs: "আইতাৰ দিহা (দিনলিপি)",
          icon: BookHeart,
          isNew: true,
        },
      ],
    },
    {
      groupKey: "my_niramay",
      titleEn: "My Niramay",
      titleAs: "মোৰ নিৰাময়",
      items: [
        {
          href: "/saved",
          labelEn: "Saved Remedies",
          labelAs: "সংৰক্ষিত উপচাৰ",
          icon: Bookmark,
          badge: mounted && savedRemedyIds.length > 0 ? savedRemedyIds.length : null,
        },
        {
          href: "/fridge-card",
          labelEn: "Emergency Fridge Card",
          labelAs: "ফ্ৰিজ কাৰ্ড (PDF)",
          icon: FileText,
        },
      ],
    },
  ];

  // Quick primary desktop bar links
  const primaryDesktopLinks = [
    { href: "/symptoms", label: isAs ? "লক্ষণসমূহ" : "Symptoms", icon: Layers },
    { href: "/plant-scanner", label: isAs ? "বনৌষধি" : "Plant Scanner", icon: Leaf },
    { href: "/ritucharya", label: isAs ? "ঋতুচৰ্যা" : "Ritucharya", icon: Calendar },
    { href: "/knowledge-bank", label: isAs ? "জ্ঞান ভঁৰাল" : "Knowledge", icon: BookOpen },
    {
      href: "/saved",
      label: isAs ? "সংৰক্ষিত" : "Saved",
      icon: Bookmark,
      badge: mounted && savedRemedyIds.length > 0 ? savedRemedyIds.length : null,
    },
  ];

  const handleLanguageSelect = (mode: LanguageMode) => {
    setLanguageMode(mode);
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-amber-200/60 bg-cream/95 backdrop-blur-md transition-all">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-18 flex items-center justify-between">
          {/* Brand Logo */}
          <Link
            href="/"
            className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-amber-500 rounded-xl p-1 shrink-0"
          >
            <NiramayLogo size={40} className="transition-transform group-hover:scale-105" />
            <div className="flex flex-col">
              <div className="flex items-baseline gap-1.5">
                <span className="text-xl sm:text-2xl font-serif font-black tracking-tight text-stone-900">
                  Niramay
                </span>
                <span className="text-sm font-semibold text-emerald-800">
                  নিৰাময়
                </span>
              </div>
              <span className="text-[10px] text-amber-800 font-medium tracking-wide -mt-0.5 hidden xs:inline">
                {isAs ? "ঘৰুৱা পাকঘৰৰ চিকিৎসা" : "Traditional Kitchen Remedies"}
              </span>
            </div>
          </Link>

          {/* Desktop Primary Nav Bar */}
          <nav className="hidden lg:flex items-center gap-1">
            {primaryDesktopLinks.map((item) => {
              const Icon = item.icon;
              const isActive = pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                    isActive
                      ? "bg-amber-100 text-amber-900 shadow-2xs"
                      : "text-stone-700 hover:bg-stone-100 hover:text-stone-900"
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? "text-amber-700" : "text-stone-500"}`} />
                  <span>{item.label}</span>
                  {item.badge !== null && (
                    <span className="px-1.5 py-0.2 text-[10px] font-bold text-onbrand bg-amber-600 rounded-full">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}

            {/* Niramay AI Assistant Trigger (Desktop) */}
            <button
              onClick={() => setAssistantOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-onbrand text-xs font-bold shadow-xs transition ml-1"
            >
              <Bot className="w-3.5 h-3.5 text-amber-200" />
              <span>Niramay AI</span>
            </button>

            {/* Menu All Tabs Drawer Trigger Button */}
            <button
              onClick={() => setDrawerOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-100/80 hover:bg-amber-200/80 text-amber-950 text-xs font-bold border border-amber-300 transition ml-1"
            >
              <Menu className="w-3.5 h-3.5 text-amber-800" />
              <span>{isAs ? "সকলো মেনু" : "All Modules"}</span>
            </button>
          </nav>

          {/* Right Controls: Language Selector + Menu Trigger */}
          <div className="flex items-center gap-2">
            {/* 3-Way Language Toggle */}
            <div className="flex items-center bg-stone-100/90 p-0.5 rounded-xl border border-stone-200 text-[11px] font-bold">
              <button
                type="button"
                onClick={() => handleLanguageSelect("en")}
                className={`px-2 py-1 rounded-lg transition-all ${
                  currentMode === "en"
                    ? "bg-white text-stone-950 shadow-2xs font-black border border-stone-200/80"
                    : "text-stone-600 hover:text-stone-900"
                }`}
                title="English"
              >
                EN
              </button>
              <button
                type="button"
                onClick={() => handleLanguageSelect("as")}
                className={`px-2 py-1 rounded-lg transition-all ${
                  currentMode === "as"
                    ? "bg-emerald-700 text-onbrand shadow-2xs font-black"
                    : "text-stone-600 hover:text-stone-900"
                }`}
                title="অসমীয়া"
              >
                অসমীয়া
              </button>
              <button
                type="button"
                onClick={() => handleLanguageSelect("bilingual")}
                className={`px-2 py-1 rounded-lg transition-all ${
                  currentMode === "bilingual"
                    ? "bg-amber-700 text-onbrand shadow-2xs font-black"
                    : "text-stone-600 hover:text-stone-900"
                }`}
                title="দ্বিভাষিক (Dual)"
              >
                Dual
              </button>
            </div>

            <PWAInstallButton variant="header" />

            {/* Hamburger / Drawer Trigger */}
            <button
              onClick={() => setDrawerOpen(true)}
              className="p-2 rounded-xl text-stone-800 bg-amber-50 hover:bg-amber-100 border border-amber-200 focus:outline-none transition shrink-0"
              aria-label="Open navigation menu"
            >
              <Menu className="w-5 h-5 text-amber-800" />
            </button>
          </div>
        </div>
        {/* Woven thread accent */}
        <div aria-hidden="true" className="absolute bottom-0 inset-x-0">
          <div className="gamosa-rule opacity-60" />
        </div>
      </header>

      {/* Slide-out Navigation Drawer (Sheet) */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 flex justify-end animate-in fade-in duration-200">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-stone-950/60 backdrop-blur-xs transition-opacity"
            onClick={() => setDrawerOpen(false)}
          />

          {/* Drawer Panel */}
          <div className="relative w-full max-w-sm sm:max-w-md bg-cream h-full shadow-2xl flex flex-col justify-between border-l border-amber-200/80 z-10 overflow-hidden animate-in slide-in-from-right duration-300">
            {/* Drawer Header */}
            <div className="p-5 bg-gradient-to-r from-amber-800 to-emerald-950 text-onbrand flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <NiramayLogo size={36} />
                <div>
                  <div className="font-serif font-black text-lg leading-tight">
                    Niramay নিৰাময়
                  </div>
                  <div className="text-[10px] text-amber-200">
                    {isAs ? "পৰম্পৰাগত জ্ঞান আৰু নিৰাময়" : "Navigation & Health Modules"}
                  </div>
                </div>
              </div>

              <button
                onClick={() => setDrawerOpen(false)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-onbrand flex items-center justify-center transition"
                aria-label="Close menu"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Scrollable Navigation Groups */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-6">
              {/* Pinned Niramay AI Assistant Button */}
              <button
                onClick={() => {
                  setDrawerOpen(false);
                  setAssistantOpen(true);
                }}
                className="w-full flex items-center justify-between p-3.5 rounded-2xl bg-gradient-to-r from-amber-600 via-amber-700 to-amber-800 text-onbrand font-bold text-xs sm:text-sm shadow-md hover:shadow-lg transition transform active:scale-98"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center">
                    <Bot className="w-4 h-4 text-amber-200" />
                  </div>
                  <div className="text-left">
                    <div>{isAs ? "নিৰাময় এআই সহায়ক" : "Niramay AI Assistant"}</div>
                    <div className="text-[10px] text-amber-200 font-normal">
                      {isAs ? "কণ্ঠ আৰু পাঠ্যৰে বিধান বিচাৰক" : "Voice & Text Local Matcher"}
                    </div>
                  </div>
                </div>
                <span className="text-[10px] bg-white/25 px-2 py-0.5 rounded-full font-black uppercase">
                  100% Local
                </span>
              </button>

              {/* Grouped Section Links */}
              {navSections.map((sec) => (
                <div key={sec.groupKey} className="space-y-1.5">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-amber-800 px-3">
                    {isAs ? sec.titleAs : sec.titleEn}
                  </div>

                  <div className="space-y-1">
                    {sec.items.map((item) => {
                      const Icon = item.icon;
                      const isActive = pathname.startsWith(item.href);

                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => setDrawerOpen(false)}
                          className={`flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs sm:text-sm font-semibold transition ${
                            isActive
                              ? "bg-amber-100/90 text-amber-950 font-bold shadow-2xs border border-amber-300"
                              : "text-stone-700 hover:bg-amber-50 hover:text-stone-900"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <Icon
                              className={`w-4 h-4 ${
                                isActive ? "text-amber-800" : "text-stone-500"
                              }`}
                            />
                            <span>{isAs ? item.labelAs : item.labelEn}</span>
                          </div>

                          <div className="flex items-center gap-1.5">
                            {(item as any).isNew && (
                              <span className="text-[9px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded-md bg-emerald-100 text-emerald-800">
                                New
                              </span>
                            )}
                            {(item as any).badge !== null && (item as any).badge !== undefined && (
                              <span className="px-2 py-0.5 text-[10px] font-bold text-onbrand bg-amber-600 rounded-full">
                                {(item as any).badge}
                              </span>
                            )}
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            {/* Pinned Bottom Drawer Footer: Emergency Quick-Access Row */}
            <div className="p-4 bg-stone-100 border-t border-amber-200 shrink-0 space-y-3">
              {/* Emergency Row Pinned at bottom of menu */}
              <div className="bg-red-600 text-onbrand rounded-2xl p-3 shadow-md border border-red-500 flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <Ambulance className="w-4 h-4 text-onbrand shrink-0" />
                  <div>
                    <div className="text-[11px] font-black tracking-tight leading-tight">
                      {isAs ? "জৰুৰীকালীন সহায়" : "Emergency Speed-Dial"}
                    </div>
                    <div className="text-[9px] text-red-100 leading-tight">
                      {isAs ? "১-টিপতেই কল কৰক" : "Instant 1-tap call"}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <a
                    href="tel:108"
                    className="px-2.5 py-1.5 rounded-lg bg-white text-red-700 font-black text-xs shadow-xs"
                    title="Ambulance 108"
                  >
                    📞 108
                  </a>
                  <a
                    href="tel:112"
                    className="px-2.5 py-1.5 rounded-lg bg-red-950 text-onbrand font-black text-xs"
                    title="National Emergency 112"
                  >
                    📞 112
                  </a>
                </div>
              </div>

              {/* Language Switcher in Drawer */}
              <div className="flex items-center justify-between text-xs text-stone-600 pt-1">
                <span>{isAs ? "ভাষা সলনি কৰক:" : "Language Mode:"}</span>
                <div className="flex items-center gap-1 text-[11px] font-bold">
                  <button
                    onClick={() => handleLanguageSelect("en")}
                    className={`px-2 py-1 rounded-md ${
                      currentMode === "en" ? "bg-stone-900 text-onbrand" : "bg-white text-stone-700"
                    }`}
                  >
                    EN
                  </button>
                  <button
                    onClick={() => handleLanguageSelect("as")}
                    className={`px-2 py-1 rounded-md ${
                      currentMode === "as" ? "bg-emerald-700 text-onbrand" : "bg-white text-stone-700"
                    }`}
                  >
                    অসমীয়া
                  </button>
                  <button
                    onClick={() => handleLanguageSelect("bilingual")}
                    className={`px-2 py-1 rounded-md ${
                      currentMode === "bilingual" ? "bg-amber-700 text-onbrand" : "bg-white text-stone-700"
                    }`}
                  >
                    Dual
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
