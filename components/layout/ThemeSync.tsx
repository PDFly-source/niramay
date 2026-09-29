"use client";

import { useEffect } from "react";
import { useNiramayStore } from "@/lib/store";
import { useMounted } from "@/hooks/useMounted";

/**
 * Keeps <html> in sync with the user's Niramay appearance preference.
 * - "system" (default): dark vars activate via prefers-color-scheme
 *   (no class needed), with nr-light/nr-dark only pinning the opposite.
 * - "light" / "dark": pins html.nr-light / html.nr-dark.
 * System-dark users get the dark palette from the media query even
 * before hydration (no flash).
 */
export const ThemeSync: React.FC = () => {
  const themeMode = useNiramayStore((s) => s.themeMode);
  const mounted = useMounted();

  useEffect(() => {
    if (!mounted) return;
    const root = document.documentElement;
    const dark = themeMode === "dark";
    const light = themeMode === "light";
    root.classList.toggle("nr-dark", dark);
    root.classList.toggle("nr-light", light);
  }, [mounted, themeMode]);

  return null;
};
