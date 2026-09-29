"use client";

import React from "react";
import { PhoneCall, ShieldAlert, Ambulance } from "lucide-react";
import { useNiramayStore } from "@/lib/store";
import { useMounted } from "@/hooks/useMounted";

interface Props {
  compact?: boolean;
  className?: string;
}

export const EmergencySpeedDial: React.FC<Props> = ({ compact = false, className = "" }) => {
  const mounted = useMounted();
  const { languageMode } = useNiramayStore();
  const currentMode = mounted ? languageMode : "bilingual";
  const isAs = currentMode === "as";

  return (
    <div
      className={`bg-gradient-to-r from-red-600 to-red-800 text-onbrand rounded-2xl ${
        compact ? "p-2.5 sm:p-3" : "p-4 sm:p-5"
      } shadow-md border border-red-500/80 ${className}`}
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
            <ShieldAlert className="w-5 h-5 text-onbrand" />
          </div>
          <div>
            <div className="text-xs sm:text-sm font-bold tracking-tight">
              {isAs ? "জৰুৰীকালীন সহায়ৰ নম্বৰ" : "Direct Emergency Speed-Dial"}
            </div>
            <div className="text-[10px] sm:text-[11px] text-red-100">
              {isAs
                ? "গুৰুতৰ লক্ষণ দেখা দিলে অনতিপলমে কল কৰক"
                : "Zero-friction 1-tap call for severe medical distress"}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <a
            href="tel:108"
            className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-white text-red-700 hover:bg-red-50 active:scale-95 font-black text-xs sm:text-sm shadow-xs transition cursor-pointer"
            title="Call 108 Emergency Ambulance"
          >
            <Ambulance className="w-4 h-4 text-red-600 shrink-0" />
            <span>108</span>
            <span className="text-[11px] font-semibold text-stone-600 hidden sm:inline">
              ({isAs ? "এম্বুলেন্স" : "Ambulance"})
            </span>
          </a>

          <a
            href="tel:112"
            className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-red-950/80 hover:bg-red-950 active:scale-95 text-onbrand border border-red-400/50 font-black text-xs sm:text-sm shadow-xs transition cursor-pointer"
            title="Call 112 National Emergency Helpline"
          >
            <PhoneCall className="w-4 h-4 text-amber-300 shrink-0" />
            <span>112</span>
            <span className="text-[11px] font-semibold text-red-200 hidden sm:inline">
              ({isAs ? "জৰুৰী" : "Emergency"})
            </span>
          </a>
        </div>
      </div>
    </div>
  );
};
