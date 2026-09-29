import React from "react";

interface SpiceIconProps {
  spiceName?: any;
  name?: any;
  size?: number;
  className?: string;
}

export const SpiceIcon: React.FC<SpiceIconProps> = ({
  spiceName,
  name,
  size = 32,
  className = "",
}) => {
  const raw = typeof spiceName === "object" ? (spiceName?.en || "") : (spiceName || name || "");
  const norm = String(raw).toLowerCase();

  // 1. Ginger / Aada
  if (norm.includes("ginger") || norm.includes("aada")) {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
      >
        <path
          d="M14 26 C12 21 16 16 22 17 C25 12 32 12 35 17 C39 16 43 20 40 26 C43 32 38 40 32 39 C27 42 21 40 18 36 C13 36 11 31 14 26 Z"
          fill="#D97706"
          stroke="#92400E"
          strokeWidth="2"
        />
        <path d="M20 22 C24 23 28 21 31 23" stroke="#B45309" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M18 30 C22 31 28 29 32 31" stroke="#B45309" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="28" cy="18" r="1.5" fill="#FDE68A" />
      </svg>
    );
  }

  // 2. Tulsi / Holy Basil
  if (norm.includes("tulsi") || norm.includes("basil")) {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
      >
        <path d="M24 42 L24 16" stroke="#166534" strokeWidth="2.5" strokeLinecap="round" />
        {/* Top central leaf */}
        <path
          d="M24 16 C20 9 24 4 24 4 C24 4 28 9 24 16 Z"
          fill="#166534"
          stroke="#14532D"
          strokeWidth="1.5"
        />
        {/* Left leaf */}
        <path
          d="M24 24 C14 20 10 12 10 12 C10 12 20 16 24 24 Z"
          fill="#15803D"
          stroke="#166534"
          strokeWidth="1.5"
        />
        {/* Right leaf */}
        <path
          d="M24 24 C34 20 38 12 38 12 C38 12 28 16 24 24 Z"
          fill="#15803D"
          stroke="#166534"
          strokeWidth="1.5"
        />
        {/* Lower Left leaf */}
        <path
          d="M24 33 C13 31 9 22 9 22 C9 22 21 26 24 33 Z"
          fill="#166534"
          stroke="#14532D"
          strokeWidth="1.5"
        />
        {/* Lower Right leaf */}
        <path
          d="M24 33 C35 31 39 22 39 22 C39 22 27 26 24 33 Z"
          fill="#166534"
          stroke="#14532D"
          strokeWidth="1.5"
        />
      </svg>
    );
  }

  // 3. Turmeric / Haldi
  if (norm.includes("turmeric") || norm.includes("haldi")) {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
      >
        <path
          d="M10 24 C8 18 16 12 24 15 C32 12 40 18 38 24 C40 32 30 38 24 36 C18 38 8 32 10 24 Z"
          fill="#F59E0B"
          stroke="#D97706"
          strokeWidth="2"
        />
        {/* Powder mound */}
        <path
          d="M14 26 C18 20 30 20 34 26"
          stroke="#B45309"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <circle cx="24" cy="24" r="3" fill="#FEF08A" />
        <circle cx="18" cy="27" r="1.5" fill="#FEF08A" />
        <circle cx="30" cy="27" r="1.5" fill="#FEF08A" />
      </svg>
    );
  }

  // 4. Black pepper / Jaluk
  if (norm.includes("pepper") || norm.includes("jaluk")) {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
      >
        <circle cx="18" cy="18" r="6" fill="#292524" stroke="#1C1917" strokeWidth="1.5" />
        <circle cx="30" cy="20" r="5.5" fill="#44403C" stroke="#1C1917" strokeWidth="1.5" />
        <circle cx="22" cy="30" r="7" fill="#292524" stroke="#1C1917" strokeWidth="1.5" />
        <circle cx="33" cy="31" r="5" fill="#57534E" stroke="#1C1917" strokeWidth="1.5" />
        {/* Textured speckles */}
        <circle cx="16" cy="16" r="1" fill="#78716C" />
        <circle cx="21" cy="28" r="1.5" fill="#78716C" />
      </svg>
    );
  }

  // 5. Clove / Long
  if (norm.includes("clove") || norm.includes("long")) {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
      >
        {/* Crown bud */}
        <circle cx="24" cy="15" r="5" fill="#78350F" stroke="#451A03" strokeWidth="1.5" />
        <circle cx="19" cy="16" r="3" fill="#92400E" />
        <circle cx="29" cy="16" r="3" fill="#92400E" />
        <circle cx="24" cy="12" r="3" fill="#B45309" />
        {/* Stem / nail shank */}
        <path
          d="M21 19 L21 38 C21 40 27 40 27 38 L27 19 Z"
          fill="#78350F"
          stroke="#451A03"
          strokeWidth="1.5"
        />
      </svg>
    );
  }

  // 6. Honey / Mou
  if (norm.includes("honey") || norm.includes("mou")) {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
      >
        {/* Honey pot / dipper */}
        <path
          d="M14 20 L34 20 L32 38 C32 41 16 41 16 38 Z"
          fill="#F59E0B"
          stroke="#B45309"
          strokeWidth="2"
        />
        <rect x="12" y="16" width="24" height="5" rx="2" fill="#D97706" />
        <path d="M20 25 C24 28 28 28 30 25" stroke="#FEF3C7" strokeWidth="2" strokeLinecap="round" />
        {/* Dripping honey drop */}
        <path
          d="M24 38 C22 41 22 44 24 45 C26 44 26 41 24 38 Z"
          fill="#F59E0B"
        />
      </svg>
    );
  }

  // 7. Cumin / Jeera
  if (norm.includes("cumin") || norm.includes("jeera")) {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
      >
        <ellipse cx="20" cy="18" rx="8" ry="3" transform="rotate(-30 20 18)" fill="#B45309" stroke="#78350F" strokeWidth="1.5" />
        <ellipse cx="28" cy="24" rx="8" ry="3" transform="rotate(25 28 24)" fill="#92400E" stroke="#78350F" strokeWidth="1.5" />
        <ellipse cx="18" cy="30" rx="8" ry="3" transform="rotate(-15 18 30)" fill="#B45309" stroke="#78350F" strokeWidth="1.5" />
        <path d="M15 17 L25 19" stroke="#FDE68A" strokeWidth="0.75" />
        <path d="M23 23 L33 25" stroke="#FDE68A" strokeWidth="0.75" />
      </svg>
    );
  }

  // 8. Lemon / Kaji Nemu
  if (norm.includes("lemon") || norm.includes("nemu")) {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
      >
        {/* Indigenous elongated Kaji Nemu shape */}
        <path
          d="M10 24 C10 15 18 10 24 10 C32 10 40 16 38 24 C38 32 30 38 24 38 C16 38 10 32 10 24 Z"
          fill="#FACC15"
          stroke="#CA8A04"
          strokeWidth="2"
        />
        {/* Tips */}
        <path d="M8 24 C8 23 10 22 11 23" stroke="#84CC16" strokeWidth="2" strokeLinecap="round" />
        <path d="M40 24 C40 25 38 26 37 25" stroke="#84CC16" strokeWidth="2" strokeLinecap="round" />
        <ellipse cx="24" cy="24" rx="8" ry="8" fill="#FEF08A" opacity="0.6" />
      </svg>
    );
  }

  // 9. Ajwain / Carom
  if (norm.includes("ajwain") || norm.includes("carom")) {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
      >
        <circle cx="16" cy="18" r="3" fill="#A16207" stroke="#713F12" strokeWidth="1" />
        <circle cx="24" cy="15" r="3" fill="#854D0E" stroke="#713F12" strokeWidth="1" />
        <circle cx="32" cy="19" r="3" fill="#A16207" stroke="#713F12" strokeWidth="1" />
        <circle cx="20" cy="27" r="3" fill="#713F12" stroke="#451A03" strokeWidth="1" />
        <circle cx="28" cy="26" r="3" fill="#A16207" stroke="#713F12" strokeWidth="1" />
        <circle cx="24" cy="34" r="3" fill="#854D0E" stroke="#713F12" strokeWidth="1" />
      </svg>
    );
  }

  // 10. Garlic / Nohoru
  if (norm.includes("garlic") || norm.includes("nohoru")) {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
      >
        <path
          d="M24 10 C24 10 14 18 14 28 C14 36 19 40 24 40 C29 40 34 36 34 28 C34 18 24 10 24 10 Z"
          fill="#F5F5F4"
          stroke="#A8A29E"
          strokeWidth="2"
        />
        <path d="M24 10 L24 40" stroke="#D6D3D1" strokeWidth="1.5" />
        <path d="M19 20 C18 28 20 36 21 39" stroke="#E7E5E4" strokeWidth="1.5" />
        <path d="M29 20 C30 28 28 36 27 39" stroke="#E7E5E4" strokeWidth="1.5" />
      </svg>
    );
  }

  // 11. Kalonji / Black Cumin / Kolajira
  if (norm.includes("kalonji") || norm.includes("kolajira") || norm.includes("black cumin")) {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
      >
        {/* Angular triangular seeds */}
        <polygon points="16,14 22,20 14,22" fill="#1C1917" stroke="#0C0A09" strokeWidth="1" />
        <polygon points="28,15 34,19 28,25" fill="#292524" stroke="#0C0A09" strokeWidth="1" />
        <polygon points="19,26 26,30 20,36" fill="#1C1917" stroke="#0C0A09" strokeWidth="1" />
        <polygon points="30,28 37,32 31,37" fill="#44403C" stroke="#0C0A09" strokeWidth="1" />
      </svg>
    );
  }

  // 12. Methi / Fenugreek
  if (norm.includes("methi") || norm.includes("fenugreek")) {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
      >
        {/* Angular yellowish brown seeds */}
        <rect x="14" y="16" width="7" height="6" rx="2" transform="rotate(15 14 16)" fill="#CA8A04" stroke="#854D0E" strokeWidth="1.5" />
        <rect x="26" y="17" width="8" height="6" rx="2" transform="rotate(-20 26 17)" fill="#EAB308" stroke="#854D0E" strokeWidth="1.5" />
        <rect x="18" y="27" width="7" height="7" rx="2" transform="rotate(35 18 27)" fill="#B45309" stroke="#78350F" strokeWidth="1.5" />
        <rect x="28" y="28" width="7" height="6" rx="2" transform="rotate(-10 28 28)" fill="#CA8A04" stroke="#854D0E" strokeWidth="1.5" />
      </svg>
    );
  }

  // Default: Mortar and pestle spice badge
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <circle cx="24" cy="24" r="18" fill="#FEF3C7" stroke="#D97706" strokeWidth="2" />
      <path d="M16 26 C16 33 20 36 24 36 C28 36 32 33 32 26 Z" fill="#D97706" />
      <ellipse cx="24" cy="25" rx="8" ry="2" fill="#F59E0B" />
      <rect x="26" y="16" width="3" height="12" rx="1.5" transform="rotate(25 26 16)" fill="#78350F" />
    </svg>
  );
};
