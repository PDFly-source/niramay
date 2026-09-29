"use client";

import { useEffect } from "react";

/**
 * Shared body scroll lock for every full-screen overlay (modals,
 * drawers, cooking mode, share dialogs).
 *
 * Locks background scroll while `active` is true and always restores
 * the previous overflow on cleanup, so normal page scroll returns
 * when the overlay closes.
 */
export function useBodyScrollLock(active: boolean) {
  useEffect(() => {
    if (typeof document === "undefined" || !active) return;

    const body = document.body;
    const previousOverflow = body.style.overflow;
    const previousPaddingRight = body.style.paddingRight;

    // Compensate for the scrollbar disappearing so content doesn't shift.
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    if (scrollbarWidth > 0) {
      body.style.paddingRight = `${scrollbarWidth}px`;
    }
    body.style.overflow = "hidden";

    return () => {
      body.style.overflow = previousOverflow;
      body.style.paddingRight = previousPaddingRight;
    };
  }, [active]);
}
