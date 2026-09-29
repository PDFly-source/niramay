"use client";

import React from "react";
import Link from "next/link";
import { useNiramayStore } from "@/lib/store";
import { useMounted } from "@/hooks/useMounted";
import {
  Clock,
  CheckCircle2,
  AlertCircle,
  XCircle,
  ArrowRight,
  Sparkles,
  Calendar,
  Bell,
} from "lucide-react";

export const ActiveTreatmentCourseWidget: React.FC = () => {
  const mounted = useMounted();
  const { activeCourses, logCourseDose, cancelTreatmentCourse, languageMode } =
    useNiramayStore();
  const isAs = mounted && languageMode === "as";

  if (!mounted) return null;

  const currentCourse = activeCourses.find((c) => c.isActive);
  if (!currentCourse) return null;

  const completedCount = currentCourse.doses.filter((d) => d.completed).length;
  const nextPendingDose = currentCourse.doses.find(
    (d) => d.completed === undefined || d.completed === false
  );

  return (
    <div className="bg-gradient-to-br from-amber-50 to-orange-50/80 border-2 border-amber-300 rounded-3xl p-5 sm:p-6 shadow-md mb-8 animate-in fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-amber-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-amber-600 text-white flex items-center justify-center font-bold shadow-xs">
            <Bell className="w-5 h-5 text-amber-100 animate-bounce" />
          </div>
          <div>
            <div className="text-[10px] font-bold uppercase tracking-wider text-amber-800">
              {isAs ? "সক্ৰিয় ৩-দিনীয়া চিকিৎসা কাৰ্যসূচী" : "Active 3-Day Recovery Course"}
            </div>
            <h3 className="text-base sm:text-lg font-serif font-black text-stone-900 mt-0.5">
              {isAs ? currentCourse.remedyNameAs : currentCourse.remedyNameEn}
            </h3>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-center">
          <span className="text-xs font-bold text-amber-900 bg-amber-200/70 px-3 py-1 rounded-full">
            {completedCount} / {currentCourse.totalDoses} {isAs ? "মাত্ৰা সম্পন্ন" : "Doses Taken"}
          </span>
          <button
            type="button"
            onClick={() => cancelTreatmentCourse(currentCourse.id)}
            className="text-xs text-stone-400 hover:text-stone-600 px-2 py-1 rounded-lg"
            title="Cancel course"
          >
            {isAs ? "সমাপ্ত" : "Stop"}
          </button>
        </div>
      </div>

      {/* Progress Bars for the 6 Doses (3 Days x 2) */}
      <div className="py-4 space-y-2">
        <div className="flex items-center justify-between text-xs text-stone-600 font-semibold">
          <span>
            {nextPendingDose
              ? isAs
                ? `পৰৱৰ্তী মাত্ৰা: দিন ${nextPendingDose.day} (${nextPendingDose.timeOfDay === "morning" ? "ৰাতিপুৱা" : "সন্ধিয়া"})`
                : `Next due: Day ${nextPendingDose.day} (${nextPendingDose.timeOfDay}) ~${nextPendingDose.scheduledTime}`
              : isAs
              ? "সকলো মাত্ৰা সম্পন্ন হ'ল!"
              : "All 6 doses completed!"}
          </span>
          <span className="text-[11px] text-amber-800 font-bold">
            {Math.round((completedCount / currentCourse.totalDoses) * 100)}%
          </span>
        </div>

        <div className="grid grid-cols-6 gap-1.5">
          {currentCourse.doses.map((dose) => (
            <div
              key={dose.doseIndex}
              className={`h-2.5 rounded-full transition-all ${
                dose.completed
                  ? "bg-emerald-600"
                  : dose.doseIndex === nextPendingDose?.doseIndex
                  ? "bg-amber-500 animate-pulse ring-2 ring-amber-300"
                  : "bg-amber-200/80"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Action to log the next dose */}
      {nextPendingDose && (
        <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="text-xs text-stone-600">
            {isAs
              ? `আপুনি দিন ${nextPendingDose.day}ৰ ${nextPendingDose.timeOfDay === "morning" ? "ৰাতিপুৱাৰ" : "সন্ধিয়াৰ"} উপচাৰ গ্ৰহণ কৰিলেনে?`
              : `Did you take Day ${nextPendingDose.day} ${nextPendingDose.timeOfDay} dose?`}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => logCourseDose(currentCourse.id, nextPendingDose.doseIndex, true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold shadow-xs transition"
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{isAs ? "হয়, গ্ৰহণ কৰিলোঁ" : "Yes, Took Dose"}</span>
            </button>
            <button
              type="button"
              onClick={() => logCourseDose(currentCourse.id, nextPendingDose.doseIndex, false)}
              className="px-2.5 py-1.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold transition"
            >
              {isAs ? "বাদ দিলোঁ" : "Skip"}
            </button>
          </div>
        </div>
      )}

      {/* Honest Local Caveat */}
      <div className="mt-3 pt-2 border-t border-amber-200/60 text-[10px] text-amber-900/80 flex items-center gap-1.5">
        <Sparkles className="w-3 h-3 text-amber-700 shrink-0" />
        <span>
          {isAs
            ? "স্থানীয় স্মাৰক: ব্ৰাউজাৰৰ স্থানীয় টাইমাৰ ব্যৱহাৰ কৰে, কোনো ক্লাউড পুশ চাৰ্ভাৰৰ প্ৰয়োজন নাই।"
            : "Honest note: Reminders schedule locally in browser/service worker without any cloud server push."}
        </span>
      </div>
    </div>
  );
};
