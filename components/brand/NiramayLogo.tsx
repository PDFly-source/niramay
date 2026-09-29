import React from "react";

// Base path injected by CI when deploying to GitHub Pages (empty in dev).
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

interface NiramayLogoProps {
  size?: number;
  className?: string;
}

/**
 * Official Niramay emblem — derived directly from the uploaded brand
 * artwork (mortar & pestle with tulsi leaves). Rendered as a medallion
 * (rounded, hairline gold ring) so it sits cleanly on both parchment
 * and dark night surfaces.
 */
export const NiramayLogo: React.FC<NiramayLogoProps> = ({
  size = 40,
  className = "",
}) => {
  return (
    <img
      src={`${BASE_PATH}/brand/niramay-icon.png`}
      width={size}
      height={size}
      alt="Niramay emblem"
      className={`shrink-0 rounded-full object-cover bg-cream ring-1 ring-amber-400/40 ${className}`}
    />
  );
};
