"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import { useNiramayStore } from "@/lib/store";
import { useMounted } from "@/hooks/useMounted";
import {
  Flame,
  CheckCircle2,
  Circle,
  Award,
  Calendar,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Heart,
  Droplet,
  Moon,
  Sun,
  ShieldCheck,
} from "lucide-react";

interface HabitDefinition {
  id: string;
  titleEn: string;
  titleAs: string;
  descEn: string;
  descAs: string;
  timeOfDay: "morning" | "evening" | "night" | "anytime";
  benefitEn: string;
  benefitAs: string;
  icon: string;
}

const TRADITIONAL_HABITS: HabitDefinition[] = [
  {
    id: "habit-lemon-honey",
    titleEn: "Warm Lemon-Honey Water (Ushnodaka)",
    titleAs: "কুহুমীয়া নেমু-মৌ পানী",
    descEn: "1 glass comfortably warm water + juice of half Kaji Nemu + 1 tsp raw honey on an empty stomach.",
    descAs: "পুৱা খালী পেটত ১ গিলাচ কুহুমীয়া পানীৰ লগত আধাফাল নেমুৰ ৰস আৰু ১ চামুচ কেঁচা মৌ।",
    timeOfDay: "morning",
    benefitEn: "Fires up sluggish digestion, alkalizes body pH, and clears gastrointestinal sludge.",
    benefitAs: "হজম শক্তি বৃদ্ধি কৰে, এচিডিটি শান্ত কৰে আৰু অন্ত্ৰৰ বিষাক্ত মল পৰিষ্কাৰ কৰে।",
    icon: "🍋",
  },
  {
    id: "habit-tongue-clean",
    titleEn: "Tongue Scraping & Warm Gargle",
    titleAs: "জিভা পৰিষ্কাৰ আৰু কুলকুলি",
    descEn: "Gentle copper/steel tongue scraping followed by warm salt-water oral gargle.",
    descAs: "পুৱা দাঁত ঘঁহাৰ পিছত জিভা চাফা কৰি কুহুমীয়া নিমখ পানীৰে মুখ কুলকুলি কৰক।",
    timeOfDay: "morning",
    benefitEn: "Removes toxic oral coating (Ama) and enhances taste bud sensitivity.",
    benefitAs: "মুখৰ বেক্টেৰিয়া নাশ কৰে, দুৰ্গন্ধ দূৰ কৰে আৰু জিভাৰ সোৱাদ বঢ়ায়।",
    icon: "✨",
  },
  {
    id: "habit-pranayama",
    titleEn: "5-Minute Deep Calming Pranayama",
    titleAs: "৫ মিনিট প্ৰাণায়াম আৰু গভীৰ উশাহ",
    descEn: "Slow rhythmic abdominal breathing or Anulom-Vilom (alternate nostril) in fresh air.",
    descAs: "মুকলি বতাহত বহি ৫ মিনিট শান্তভাৱে অনুলোম-বিলোম আৰু গভীৰ উশাহ-নিশাহৰ অভ্যাস।",
    timeOfDay: "morning",
    benefitEn: "Oxygenates blood vessels, reduces morning cortisol, and clarifies mental focus.",
    benefitAs: "মগজুলৈ অক্সিজেন সৰবৰাহ বঢ়ায় আৰু মানসিক উদ্বেগ শান্ত কৰে।",
    icon: "🧘",
  },
  {
    id: "habit-evening-walk",
    titleEn: "Shatapadi (100 Steps After Dinner)",
    titleAs: "এশ খোজ যাত্ৰা (ৰাতিৰ খোৱাৰ পিছত)",
    descEn: "A relaxed, slow 10-15 minute stroll after dinner; avoid sitting or lying down immediately.",
    descAs: "ৰাতিৰ আহাৰ গ্ৰহণৰ পিছত তৎক্ষণাত শুই নিদি শান্তভাৱে ১০-১৫ মিনিট খোজ কাঢ়ক।",
    timeOfDay: "evening",
    benefitEn: "Prevents acute nocturnal acid regurgitation and assists gastric emptying.",
    benefitAs: "ৰাতিৰ বুকুপোৰণি আৰু গেছ ৰোধ কৰে আৰু হজম প্ৰক্ৰিয়া ত্বৰান্বিত কৰে।",
    icon: "🚶",
  },
  {
    id: "habit-tulsi-tea",
    titleEn: "Tulsi-Ginger Bedtime Brew",
    titleAs: "তুলসী-আদাৰ কুহুমীয়া চাহ",
    descEn: "Warm infusion of 5 crushed Tulsi leaves + thin slice of fresh ginger + pinch of black pepper.",
    descAs: "শুবৰ সময়ত ৫ খিলা তুলসী পাত আৰু অলপ আদা দি উতলাই বনোৱা সুগন্ধি বনৌষধি চাহ।",
    timeOfDay: "night",
    benefitEn: "Protects respiratory passages overnight and induces deep restorative sleep.",
    benefitAs: "নিশা কাহ-চৰ্দি নোহোৱাকৈ ৰাখে আৰু শান্ত গভীৰ নিদ্ৰা আনি দিয়াত সহায় কৰে।",
    icon: "🫖",
  },
  {
    id: "habit-foot-rub",
    titleEn: "Mustard Oil Foot Massage (Pada Abhyanga)",
    titleAs: "মিঠাতেলৰ পদমালিচ",
    descEn: "Rub a few warm drops of pure Mustard oil onto the soles of both feet before sleeping.",
    descAs: "শুবৰ সময়ত কেইটোপালমান কুহুমীয়া সৰিয়হৰ মিঠাতেল দুয়োখন ভৰিৰ তলুৱাত ঘঁহক।",
    timeOfDay: "night",
    benefitEn: "Grounds excessive Vata energy, cools eye fatigue, and promotes rapid sleep onset.",
    benefitAs: "শৰীৰৰ ক্লান্তি দূৰ কৰে, চকুৰ জুৰ পেলায় আৰু সুন্দৰ টোপনি আনি দিয়ে।",
    icon: "🦶",
  },
];

export default function DailyHabitsPage() {
  const mounted = useMounted();
  const { completedHabitsByDate, toggleHabitForDate, languageMode } =
    useNiramayStore();

  const currentMode = mounted ? languageMode : "bilingual";
  const isAs = currentMode === "as";
  const isEn = currentMode === "en";

  // Today string YYYY-MM-DD
  const todayStr = useMemo(() => {
    const d = new Date();
    const y = d.getFullYear();
    const m = (d.getMonth() + 1).toString().padStart(2, "0");
    const day = d.getDate().toString().padStart(2, "0");
    return `${y}-${m}-${day}`;
  }, []);

  const todayCompleted = useMemo(() => {
    if (!mounted) return [];
    return completedHabitsByDate[todayStr] || [];
  }, [mounted, completedHabitsByDate, todayStr]);

  // Compute streak: consecutive days with at least 1 habit completed
  const { currentStreak, bestStreak, last30Days } = useMemo(() => {
    if (!mounted) return { currentStreak: 0, bestStreak: 0, last30Days: [] };

    const days: { dateStr: string; dayNum: number; completedCount: number; isToday: boolean }[] = [];
    const now = new Date();

    for (let i = 29; i >= 0; i--) {
      const d = new Date(now);
      d.setDate(d.getDate() - i);
      const y = d.getFullYear();
      const m = (d.getMonth() + 1).toString().padStart(2, "0");
      const day = d.getDate().toString().padStart(2, "0");
      const dStr = `${y}-${m}-${day}`;
      const count = (completedHabitsByDate[dStr] || []).length;
      days.push({
        dateStr: dStr,
        dayNum: d.getDate(),
        completedCount: count,
        isToday: dStr === todayStr,
      });
    }

    // Calculate current streak backwards from today (or yesterday if today not completed yet)
    let streak = 0;
    let checkDate = new Date(now);
    const todayCount = (completedHabitsByDate[todayStr] || []).length;

    if (todayCount === 0) {
      // Check if yesterday had completions
      checkDate.setDate(checkDate.getDate() - 1);
    }

    while (true) {
      const y = checkDate.getFullYear();
      const m = (checkDate.getMonth() + 1).toString().padStart(2, "0");
      const d = checkDate.getDate().toString().padStart(2, "0");
      const str = `${y}-${m}-${d}`;
      const count = (completedHabitsByDate[str] || []).length;

      if (count > 0) {
        streak++;
        checkDate.setDate(checkDate.getDate() - 1);
      } else {
        break;
      }
    }

    return {
      currentStreak: streak,
      bestStreak: Math.max(streak, 7),
      last30Days: days,
    };
  }, [mounted, completedHabitsByDate, todayStr]);

  const progressPercent = Math.round(
    (todayCompleted.length / TRADITIONAL_HABITS.length) * 100
  );

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-14">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold">
            <TrendingUp className="w-3.5 h-3.5 text-emerald-700" />
            <span>
              {isAs ? "দৈনন্দিন দিনচৰ্যা আৰু অভ্যাস" : "Daily Traditional Dinacharya"}
            </span>
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold border border-amber-300">
            <Flame className="w-3.5 h-3.5 text-amber-600" />
            <span>
              {isAs ? `${currentStreak} দিনীয়া ধাৰাবাহিকতা` : `${currentStreak}-Day Streak`}
            </span>
          </div>
        </div>

        <h1 className="text-3xl sm:text-5xl font-serif font-black text-stone-900 tracking-tight">
          {isAs
            ? "দৈনন্দিন পৰম্পৰাগত সুস্থ অভ্যাস আৰু দিনচৰ্যা"
            : isEn
            ? "Daily Traditional Habit & Dinacharya Tracker"
            : "Daily Traditional Habit Tracker (দিনচৰ্যা)"}
        </h1>
        <p className="text-sm sm:text-base text-stone-600 mt-2 max-w-3xl leading-relaxed">
          {isAs
            ? "প্ৰাচীন অসমীয়া দিনচৰ্যাৰ সহজ আৰু ফলপ্ৰসূ স্বাস্থ্য অভ্যাস। পুৱা নেমু-মৌ পানীৰ পৰা নিশাৰ পদমালিচলৈ — দৈনিক এটা টিক চিহ্ন দি নিজৰ ধাৰাবাহিকতা অক্ষুণ্ণ ৰাখক।"
            : "Small, time-tested Ayurvedic micro-habits rooted in Assamese living. Tick your daily routines to build continuous wellness streaks and earn traditional milestone badges."}
        </p>
      </div>

      {/* Streak and Today's Progress Card */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {/* Streak Counter Card */}
        <div className="bg-gradient-to-br from-amber-600 to-amber-800 text-white rounded-3xl p-6 shadow-md flex items-center justify-between">
          <div>
            <div className="text-xs uppercase font-extrabold tracking-wider text-amber-200">
              {isAs ? "বৰ্তমান ধাৰাবাহিকতা" : "Current Streak"}
            </div>
            <div className="text-4xl sm:text-5xl font-serif font-black mt-1 flex items-baseline gap-2">
              <span>{currentStreak}</span>
              <span className="text-lg font-sans font-bold text-amber-200">
                {isAs ? "দিন" : "days"}
              </span>
            </div>
            <p className="text-xs text-amber-100 mt-1">
              {currentStreak >= 7
                ? isAs
                  ? "অপূৰ্ব! আপোনাৰ ৭ দিনীয়া অভ্যাস গঢ় লৈ উঠিছে।"
                  : "Great dedication! 7-day milestone unlocked."
                : isAs
                ? "নিতৌ এটা হ'লেও নিয়ম পালন কৰি ধাৰাবাহিকতা ৰাখক।"
                : "Complete at least one habit today to keep streak active."}
            </p>
          </div>
          <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center shrink-0">
            <Flame className="w-9 h-9 text-amber-200" />
          </div>
        </div>

        {/* Today's Checklist Progress */}
        <div className="bg-white rounded-3xl p-6 border border-amber-200/80 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs font-bold text-stone-500 mb-1">
              <span>{isAs ? "আজিৰ অগ্ৰগতি" : "Today's Completion"}</span>
              <span className="text-amber-800 font-mono text-sm">{progressPercent}%</span>
            </div>
            <div className="w-full bg-stone-100 rounded-full h-2.5 overflow-hidden my-2">
              <div
                className="bg-amber-600 h-full rounded-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <div className="text-xs text-stone-700 font-semibold mt-2">
              <span className="font-bold text-stone-900">{todayCompleted.length}</span>{" "}
              {isAs ? "টা নিয়ম সম্পন্ন হৈছে (" : "of "}
              <span className="font-bold text-stone-900">{TRADITIONAL_HABITS.length}</span>{" "}
              {isAs ? "টাৰ ভিতৰত)" : "habits done"}
            </div>
          </div>

          <div className="text-[11px] text-stone-500 pt-3 border-t border-stone-100">
            {todayCompleted.length === TRADITIONAL_HABITS.length
              ? isAs
                ? "অভিনন্দন! আজিৰ সকলো অভ্যাস সম্পন্ন হ'ল।"
                : "All habits completed for today! Well done."
              : isAs
              ? "তলৰ তালিকাৰ পৰা নিয়মবোৰত টিক চিহ্ন দিয়ক।"
              : "Tap checkboxes below as you complete each routine."}
          </div>
        </div>

        {/* Milestone Badges */}
        <div className="bg-white rounded-3xl p-6 border border-amber-200/80 shadow-xs flex flex-col justify-between">
          <div>
            <div className="text-xs font-bold text-stone-500 uppercase tracking-wider mb-2">
              {isAs ? "সাফল্যৰ পদক" : "Milestone Badges"}
            </div>
            <div className="flex items-center gap-3">
              <div
                className={`p-3 rounded-2xl flex flex-col items-center text-center ${
                  currentStreak >= 7
                    ? "bg-amber-100 text-amber-900 border border-amber-300"
                    : "bg-stone-100 text-stone-400"
                }`}
              >
                <Award className="w-6 h-6 mb-1" />
                <span className="text-[10px] font-black uppercase">7 Days</span>
              </div>

              <div
                className={`p-3 rounded-2xl flex flex-col items-center text-center ${
                  currentStreak >= 30
                    ? "bg-emerald-100 text-emerald-900 border border-emerald-300"
                    : "bg-stone-100 text-stone-400"
                }`}
              >
                <Award className="w-6 h-6 mb-1" />
                <span className="text-[10px] font-black uppercase">30 Days</span>
              </div>
            </div>
          </div>
          <div className="text-[11px] text-stone-500 pt-2 border-t border-stone-100">
            {isAs
              ? "ধাৰাবাহিকতা কেতিয়াবা হেৰালেও চিন্তা নকৰিব — পুনৰ আৰম্ভ কৰক।"
              : "Never feel discouraged if a streak resets — each day is a fresh start."}
          </div>
        </div>
      </div>

      {/* Habits Checklist for Today */}
      <div className="space-y-4 mb-12">
        <div className="flex items-center justify-between pb-3 border-b border-stone-200">
          <h2 className="text-lg sm:text-xl font-serif font-black text-stone-900 flex items-center gap-2">
            <span>🌿</span>
            <span>{isAs ? "আজিৰ দিনচৰ্যাৰ তালিকা" : "Today's Habit Checklist"}</span>
          </h2>
          <span className="text-xs text-stone-500 font-mono">{todayStr}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {TRADITIONAL_HABITS.map((habit) => {
            const isDone = todayCompleted.includes(habit.id);

            return (
              <div
                key={habit.id}
                onClick={() => toggleHabitForDate(todayStr, habit.id)}
                className={`p-5 rounded-3xl border transition cursor-pointer flex items-start gap-4 ${
                  isDone
                    ? "bg-emerald-50/80 border-emerald-300 shadow-2xs"
                    : "bg-white border-amber-200/80 hover:border-amber-400 shadow-xs"
                }`}
              >
                <button
                  type="button"
                  aria-label={isDone ? "Mark habit as incomplete" : "Mark habit as complete"}
                  className="mt-1 shrink-0 transition transform active:scale-90"
                >
                  {isDone ? (
                    <CheckCircle2 className="w-6 h-6 text-emerald-600 fill-emerald-100" />
                  ) : (
                    <Circle className="w-6 h-6 text-stone-300 hover:text-amber-600" />
                  )}
                </button>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-lg">{habit.icon}</span>
                    <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-stone-100 text-stone-600">
                      {habit.timeOfDay}
                    </span>
                  </div>

                  <h3
                    className={`text-sm sm:text-base font-bold mt-1 ${
                      isDone ? "text-emerald-950 line-through opacity-85" : "text-stone-900"
                    }`}
                  >
                    {isAs ? habit.titleAs : habit.titleEn}
                  </h3>

                  <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                    {isAs ? habit.descAs : habit.descEn}
                  </p>

                  <div className="mt-2.5 pt-2 border-t border-stone-100 text-[11px] text-amber-900 font-medium">
                    💡 {isAs ? habit.benefitAs : habit.benefitEn}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 30-Day Activity History Calendar Grid */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-amber-200/80 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-amber-700" />
            <h3 className="text-sm sm:text-base font-bold text-stone-900">
              {isAs ? "বিগত ৩০ দিনৰ ধাৰাবাহিকতাৰ খতিয়ান" : "Last 30 Days Habit History"}
            </h3>
          </div>
          <span className="text-xs text-stone-500">
            {isAs ? "সেউজীয়া = সম্পন্ন অভ্যাস" : "Green = Completed Routine"}
          </span>
        </div>

        <div className="grid grid-cols-6 sm:grid-cols-10 gap-2">
          {last30Days.map((day) => {
            const hasActivity = day.completedCount > 0;
            return (
              <div
                key={day.dateStr}
                className={`flex flex-col items-center justify-center p-2 rounded-xl text-center border text-xs ${
                  day.isToday
                    ? "ring-2 ring-amber-500 font-bold"
                    : ""
                } ${
                  hasActivity
                    ? "bg-emerald-100 border-emerald-300 text-emerald-950 font-bold"
                    : "bg-stone-50 border-stone-200 text-stone-400"
                }`}
                title={`${day.dateStr}: ${day.completedCount} habits`}
              >
                <span className="text-[10px]">{day.dayNum}</span>
                {hasActivity ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mt-0.5" />
                ) : (
                  <span className="text-[9px] text-stone-300 mt-0.5">•</span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
