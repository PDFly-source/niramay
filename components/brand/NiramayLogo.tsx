import React from "react";

interface NiramayLogoProps {
  size?: number;
  className?: string;
}

export const NiramayLogo: React.FC<NiramayLogoProps> = ({
  size = 40,
  className = "",
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 ${className}`}
      aria-label="Niramay Emblem: Holy Basil and Kadha Mortar"
    >
      {/* Outer circular medallion */}
      <circle
        cx="50"
        cy="50"
        r="47"
        fill="#FFFBEB"
        stroke="#D97706"
        strokeWidth="3"
        strokeDasharray="2 1"
      />
      
      {/* Inner ring */}
      <circle
        cx="50"
        cy="50"
        r="42"
        fill="#FEF3C7"
        stroke="#166534"
        strokeWidth="1.5"
      />

      {/* Steaming Kadha Vapours */}
      <path
        d="M44 26 C43 21 47 18 45 13"
        stroke="#D97706"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.8"
      />
      <path
        d="M52 24 C51 19 55 16 53 11"
        stroke="#D97706"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.9"
      />
      <path
        d="M60 27 C59 22 63 19 61 14"
        stroke="#D97706"
        strokeWidth="1.75"
        strokeLinecap="round"
        opacity="0.75"
      />

      {/* Traditional Mortar / Kadha Bowl */}
      <path
        d="M26 50 C26 70 38 78 50 78 C62 78 74 70 74 50 L77 46 C77 44 75 43 72 43 L28 43 C25 43 23 44 23 46 Z"
        fill="#D97706"
      />
      {/* Bowl Rim highlight */}
      <ellipse
        cx="50"
        cy="45"
        rx="24"
        ry="4"
        fill="#F59E0B"
      />
      {/* Bowl base pedestal */}
      <path
        d="M39 77 L37 83 C37 84 39 85 41 85 L59 85 C61 85 63 84 63 83 L61 77 Z"
        fill="#B45309"
      />

      {/* Sacred Tulsi Leaves emerging from the healing bowl */}
      {/* Central upright leaf */}
      <path
        d="M50 45 C48 34 50 25 50 25 C50 25 56 34 50 45 Z"
        fill="#166534"
      />
      <path
        d="M50 45 L50 26"
        stroke="#22C55E"
        strokeWidth="1"
        strokeLinecap="round"
      />

      {/* Left Tulsi leaf */}
      <path
        d="M48 44 C40 37 36 30 36 30 C36 30 46 32 48 44 Z"
        fill="#15803D"
      />

      {/* Right Tulsi leaf */}
      <path
        d="M52 44 C60 37 64 30 64 30 C64 30 54 32 52 44 Z"
        fill="#15803D"
      />

      {/* Pestle angle handle */}
      <rect
        x="58"
        y="30"
        width="6"
        height="28"
        rx="3"
        transform="rotate(32 58 30)"
        fill="#92400E"
        stroke="#78350F"
        strokeWidth="1"
      />

      {/* Traditional Sun/Turmeric Seed dot */}
      <circle cx="50" cy="62" r="3" fill="#FEF3C7" />
    </svg>
  );
};
