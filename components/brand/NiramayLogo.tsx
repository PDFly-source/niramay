import React from "react";

// Base path injected by CI when deploying to GitHub Pages (empty in dev).
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

interface NiramayLogoProps {
  size?: number;
  /**
   * emblem — official emblem only (favicon-class surfaces, tiny controls).
   * compact — emblem + "Niramay" wordmark.
   * full — emblem + "Niramay" + Assamese wordmark নিৰাময়.
   */
  variant?: "emblem" | "compact" | "full";
  /** Extra classes for the emblem image (ring/medallion tweaks). */
  className?: string;
  /** Classes for the Assamese wordmark span (e.g. responsive visibility). */
  assameseClassName?: string;
  /** Classes for the "Niramay" wordmark span (sizing/visibility control). */
  wordmarkClassName?: string;
}

/**
 * Canonical Niramay brand component — the ONLY official brand source.
 * The emblem is derived directly from the uploaded brand artwork
 * (mortar & pestle with tulsi leaves), rendered as a gold-ringed
 * medallion that sits cleanly on parchment and night surfaces.
 *
 * Rule: wherever there is space for the brand name, use variant
 * "compact" or "full" — never show the bare emblem in normal
 * header/footer branding.
 */
export const NiramayLogo: React.FC<NiramayLogoProps> = ({
  size = 40,
  variant = "emblem",
  className = "",
  assameseClassName = "",
  wordmarkClassName = "",
}) => {
  const emblem = (
    <img
      src={`${BASE_PATH}/brand/niramay-icon.png`}
      width={size}
      height={size}
      alt="Niramay emblem"
      className={`shrink-0 rounded-full object-cover bg-cream ring-1 ring-amber-400/40 ${className}`}
    />
  );

  if (variant === "emblem") return emblem;

  return (
    <span className="inline-flex items-center gap-2.5">
      {emblem}
      <span className="flex flex-col leading-none">
        <span
          className={`font-serif font-black tracking-tight text-ink ${
            size >= 36 ? "text-xl" : "text-lg"
          } ${wordmarkClassName}`}
        >
          Niramay
        </span>
        {variant === "full" && (
          <span
            className={`mt-0.5 text-[11px] font-semibold text-emerald-800 ${assameseClassName}`}
          >
            নিৰাময়
          </span>
        )}
      </span>
    </span>
  );
};
