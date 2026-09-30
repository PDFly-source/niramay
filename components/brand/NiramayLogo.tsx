import React from "react";

// Base path injected by CI when deploying to GitHub Pages (empty in dev).
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

interface NiramayLogoProps {
  size?: number;
  /**
   * emblem — square mark-only crop of the official artwork (mortar & pestle
   *          with tulsi, turmeric and black pepper), for compact/icon-class
   *          contexts (header, buttons, favicon-class surfaces, print/share
   *          card headers). Never includes the wordmark or tagline — those
   *          are illegible at these sizes.
   * full    — the complete official lockup image (mark + "NIRAMAY" wordmark
   *          + "DISCOVER • HEAL • LIVE BETTER" tagline, baked into a single
   *          artwork file). Use only where there is genuine vertical room
   *          for it to render legibly (e.g. the footer brand column).
   */
  variant?: "emblem" | "full";
  /** Extra classes for the emblem image (ring/medallion tweaks). Ignored for variant="full". */
  className?: string;
}

/**
 * Canonical Niramay brand component — the ONLY official brand source.
 * Both variants are pixel derivatives of the single uploaded official
 * artwork file — nothing here is hand-drawn or recreated with CSS/text.
 */
export const NiramayLogo: React.FC<NiramayLogoProps> = ({
  size = 40,
  variant = "emblem",
  className = "",
}) => {
  if (variant === "full") {
    return (
      <img
        src={`${BASE_PATH}/brand/niramay-logo-full.png`}
        alt="Niramay — Discover • Heal • Live Better"
        className={`w-auto object-contain rounded-xl ring-1 ring-amber-400/40 bg-cream ${className}`}
        style={{ height: size }}
      />
    );
  }

  return (
    <img
      src={`${BASE_PATH}/brand/niramay-mark.png`}
      width={size}
      height={size}
      alt="Niramay"
      className={`shrink-0 rounded-full object-cover bg-cream ring-1 ring-amber-400/40 ${className}`}
    />
  );
};
