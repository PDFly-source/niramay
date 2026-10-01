"use client";

import { useEffect, RefObject } from "react";
import { setFooterVisible } from "@/lib/footerVisibility";

/**
 * Observes the footer element and reports its visibility to the shared
 * footerVisibility store. Threshold 0 means "report as soon as any part
 * of the footer enters the viewport" — matching the requested behavior
 * (AI button hides the moment the footer starts entering view, and
 * returns the moment it's fully scrolled away again).
 *
 * Resets to false on unmount (route change / navigation away) so the
 * floating AI button never gets stuck hidden on a page without a footer
 * observer mounted yet.
 */
export function useFooterInView(ref: RefObject<HTMLElement | null>): void {
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      // No IntersectionObserver support (very old browser): never hide
      // the AI button rather than risk it getting stuck invisible.
      setFooterVisible(false);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setFooterVisible(entry.isIntersecting);
      },
      { threshold: 0, rootMargin: "0px" }
    );
    observer.observe(el);

    return () => {
      observer.disconnect();
      setFooterVisible(false);
    };
  }, [ref]);
}
