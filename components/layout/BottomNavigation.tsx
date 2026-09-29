"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Compass, Layers, BookOpen, Menu } from "lucide-react";
import { useNiramayStore } from "@/lib/store";
import { useMounted } from "@/hooks/useMounted";

export const BottomNavigation: React.FC = () => {
  const pathname = usePathname();
  const mounted = useMounted();
  const { languageMode, activeCourses } = useNiramayStore();
  const isAs = mounted && languageMode === "as";

  const activeTreatmentCount = activeCourses.filter((c) => c.isActive).length;

  const tabs = [
    {
      href: "/",
      labelEn: "Home",
      labelAs: "গৃহ",
      icon: Home,
      exact: true,
    },
    {
      href: "/explore",
      labelEn: "Explore",
      labelAs: "অন্বেষণ",
      icon: Compass,
      exact: false,
    },
    {
      href: "/categories",
      labelEn: "Categories",
      labelAs: "বিভাগ",
      icon: Layers,
      exact: false,
      altHrefs: ["/symptoms"],
    },
    {
      href: "/library",
      labelEn: "Library",
      labelAs: "জ্ঞানকোষ",
      icon: BookOpen,
      exact: false,
      altHrefs: ["/knowledge-bank", "/kitchen-garden"],
    },
    {
      href: "/menu",
      labelEn: "Menu",
      labelAs: "মেনু",
      icon: Menu,
      exact: false,
      badge: activeTreatmentCount > 0 ? activeTreatmentCount : undefined,
    },
  ];

  return (
    <nav
      aria-label="Bottom Navigation"
      className="fixed bottom-0 left-0 right-0 z-50 bg-[#FFFDF9]/95 backdrop-blur-md border-t border-amber-200/80 shadow-[0_-4px_20px_rgba(0,0,0,0.06)] px-2 sm:px-6 py-1.5 transition-all no-print select-none"
    >
      <div className="max-w-md mx-auto flex items-center justify-around">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = tab.exact
            ? pathname === tab.href
            : pathname.startsWith(tab.href) ||
              (tab.altHrefs && tab.altHrefs.some((h) => pathname.startsWith(h)));

          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={`relative flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all duration-150 min-w-[56px] min-h-[48px] cursor-pointer touch-manipulation focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 ${
                isActive
                  ? "text-amber-800 font-black scale-105"
                  : "text-stone-500 hover:text-stone-800 font-semibold"
              }`}
            >
              <div className="relative">
                <Icon
                  className={`w-5 h-5 transition-colors ${
                    isActive ? "text-amber-700 stroke-[2.4]" : "text-stone-500 stroke-[1.8]"
                  }`}
                />
                {tab.badge && (
                  <span className="absolute -top-1 -right-1.5 w-3.5 h-3.5 bg-emerald-600 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                    {tab.badge}
                  </span>
                )}
              </div>
              <span className="text-[10px] sm:text-[11px] mt-0.5 tracking-tight leading-tight">
                {isAs ? tab.labelAs : tab.labelEn}
              </span>
              {isActive && (
                <span className="absolute bottom-0 w-6 h-0.5 bg-amber-700 rounded-full" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
};
