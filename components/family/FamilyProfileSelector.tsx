"use client";

import React from "react";
import { useNiramayStore, FamilyProfileType } from "@/lib/store";
import { useMounted } from "@/hooks/useMounted";
import { User, Baby, HeartHandshake, ShieldAlert, Heart } from "lucide-react";

interface ProfileOption {
  id: FamilyProfileType;
  labelEn: string;
  labelAs: string;
  ageNoteEn: string;
  ageNoteAs: string;
  icon: React.ElementType;
}

const PROFILES: ProfileOption[] = [
  {
    id: "adult",
    labelEn: "Adult",
    labelAs: "প্ৰাপ্তবয়স্ক",
    ageNoteEn: "Age 18–60",
    ageNoteAs: "১৮-৬০ বছৰ",
    icon: User,
  },
  {
    id: "child",
    labelEn: "Child",
    labelAs: "শিশু",
    ageNoteEn: "Age 2–12",
    ageNoteAs: "২-১২ বছৰ",
    icon: Baby,
  },
  {
    id: "senior",
    labelEn: "Senior",
    labelAs: "জ্যেষ্ঠ নাগৰিক",
    ageNoteEn: "Age 60+",
    ageNoteAs: "৬০+ বছৰ",
    icon: HeartHandshake,
  },
  {
    id: "pregnancy",
    labelEn: "Pregnancy / Nursing",
    labelAs: "গৰ্ভৱতী / প্ৰসূতি",
    ageNoteEn: "Maternal Care",
    ageNoteAs: "মাতৃ যত্ন",
    icon: Heart,
  },
];

interface Props {
  compact?: boolean;
}

export const FamilyProfileSelector: React.FC<Props> = ({ compact = false }) => {
  const mounted = useMounted();
  const { familyProfile, setFamilyProfile, languageMode } = useNiramayStore();
  const currentMode = mounted ? languageMode : "bilingual";
  const isAs = currentMode === "as";

  if (!mounted) return null;

  return (
    <div className={compact ? "flex items-center gap-1" : "space-y-2"}>
      {!compact && (
        <div className="flex items-center justify-between text-xs font-bold text-stone-700">
          <span>{isAs ? "পৰিয়ালৰ সদস্য নিৰ্বাচন:" : "Family Dosage Profile:"}</span>
          <span className="text-[10px] text-emerald-800 font-semibold uppercase tracking-wider">
            {isAs ? "স্বয়ংক্ৰিয় মাত্ৰা সালসলনি" : "Auto-Adjusts Dosage"}
          </span>
        </div>
      )}

      <div
        className={
          compact
            ? "flex items-center bg-stone-100/90 rounded-xl p-1 gap-1 border border-stone-200"
            : "grid grid-cols-2 sm:grid-cols-4 gap-2"
        }
      >
        {PROFILES.map((p) => {
          const Icon = p.icon;
          const isSelected = familyProfile === p.id;

          if (compact) {
            return (
              <button
                key={p.id}
                onClick={() => setFamilyProfile(p.id)}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold transition ${
                  isSelected
                    ? "bg-amber-700 text-onbrand shadow-xs font-bold"
                    : "text-stone-600 hover:text-stone-900 hover:bg-white"
                }`}
                title={`${p.labelEn} (${p.ageNoteEn})`}
              >
                <Icon className="w-3.5 h-3.5 shrink-0" />
                <span className="hidden sm:inline">
                  {isAs ? p.labelAs : p.labelEn}
                </span>
              </button>
            );
          }

          return (
            <button
              key={p.id}
              onClick={() => setFamilyProfile(p.id)}
              className={`p-3 rounded-2xl border text-left transition flex items-start gap-2.5 ${
                isSelected
                  ? "bg-amber-50/90 border-amber-400 text-amber-950 shadow-xs"
                  : "bg-white hover:bg-stone-50 border-stone-200 text-stone-700"
              }`}
            >
              <div
                className={`w-7 h-7 rounded-xl flex items-center justify-center shrink-0 ${
                  isSelected ? "bg-amber-600 text-onbrand" : "bg-stone-100 text-stone-600"
                }`}
              >
                <Icon className="w-4 h-4" />
              </div>
              <div className="overflow-hidden">
                <div className="text-xs font-bold truncate">
                  {isAs ? p.labelAs : p.labelEn}
                </div>
                <div className="text-[10px] text-stone-500 font-medium">
                  {isAs ? p.ageNoteAs : p.ageNoteEn}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
