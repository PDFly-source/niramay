"use client";

import React, { useState } from "react";
import { useNiramayStore, CareLogEntry } from "@/lib/store";
import { useMounted } from "@/hooks/useMounted";
import {
  FileText,
  Download,
  AlertTriangle,
  CheckCircle2,
  Clock,
  X,
  Plus,
  ShieldAlert,
  ArrowRight,
} from "lucide-react";
import { EmergencySpeedDial } from "@/components/emergency/EmergencySpeedDial";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  highlightLogId?: string;
}

export const CareLogModal: React.FC<Props> = ({
  isOpen,
  onClose,
  highlightLogId,
}) => {
  const mounted = useMounted();
  const {
    languageMode,
    careLogs,
    updateCareLogCheckin,
    reportRedFlagForLog,
  } = useNiramayStore();
  const isAs = mounted && languageMode === "as";

  const [selectedLogId, setSelectedLogId] = useState<string | null>(
    highlightLogId || (careLogs.length > 0 ? careLogs[0].id : null)
  );
  const [checkinNote, setCheckinNote] = useState("");

  if (!isOpen || !mounted) return null;

  const activeLog = careLogs.find((l) => l.id === selectedLogId) || careLogs[0];

  const handleStatusUpdate = (day: 1 | 2 | 3, status: "better" | "same" | "worse") => {
    if (!activeLog) return;
    updateCareLogCheckin(activeLog.id, day, status, checkinNote || undefined);
    setCheckinNote("");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/70 backdrop-blur-xs animate-in fade-in">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-5 bg-gradient-to-r from-amber-800 to-stone-900 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center font-bold">
              <FileText className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-serif font-black">
                {isAs ? "ঘৰুৱা চিকিৎসা ডায়েৰী আৰু চিকিৎসকৰ সাৰাংশ" : "Clinical Triage & Doctor Care Log"}
              </h2>
              <p className="text-[11px] text-amber-200">
                {isAs ? "উপচাৰৰ দিনলিপি আৰু ৩-দিনীয়া স্বাস্থ্য পৰ্যবেক্ষণ" : "Day-by-day progress tracking & doctor-ready PDF export"}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body Content */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 flex-1">
          {careLogs.length === 0 ? (
            <div className="text-center py-10 space-y-3">
              <Clock className="w-10 h-10 text-stone-300 mx-auto" />
              <h3 className="text-base font-bold text-stone-800">
                {isAs ? "বৰ্তমান কোনো সক্ৰিয় উপচাৰ নাই" : "No Active Care Logs Yet"}
              </h3>
              <p className="text-xs text-stone-500 max-w-sm mx-auto">
                {isAs
                  ? "যিকোনো উপচাৰ পৃষ্ঠাত 'মই এই উপচাৰ গ্ৰহণ কৰিছোঁ' বটন টিপিলে ইয়াত ৩ দিনীয়া পৰ্যবেক্ষণ আৰম্ভ হ'ব।"
                  : "Tap 'Start Tracking This Remedy' on any remedy detail page to begin your 3-day recovery log."}
              </p>
            </div>
          ) : activeLog ? (
            <div className="space-y-6">
              {/* Active Log Selector Tabs */}
              {careLogs.length > 1 && (
                <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-stone-100">
                  {careLogs.map((log) => (
                    <button
                      key={log.id}
                      onClick={() => setSelectedLogId(log.id)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition shrink-0 ${
                        activeLog.id === log.id
                          ? "bg-amber-800 text-white shadow-2xs"
                          : "bg-stone-100 text-stone-700 hover:bg-stone-200"
                      }`}
                    >
                      {log.symptomEn} (~{log.startDate})
                    </button>
                  ))}
                </div>
              )}

              {/* Remedy Banner */}
              <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-amber-800">
                    {isAs ? "অনুগ্ৰহ কৰি পৰ্যবেক্ষণ কৰা উপচাৰ:" : "Tracked Intervention:"}
                  </div>
                  <div className="text-sm font-serif font-black text-stone-900 mt-0.5">
                    {isAs ? activeLog.remedyNameAs || activeLog.remedyNameEn : activeLog.remedyNameEn}
                  </div>
                  <div className="text-xs text-stone-500">
                    {activeLog.symptomEn} • {isAs ? "আৰম্ভ:" : "Started:"} {activeLog.startDate}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={async () => {
                    const { generateDoctorSummaryPdf } = await import(
                      "@/components/care/DoctorSummaryPdf"
                    );
                    generateDoctorSummaryPdf(activeLog);
                  }}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-amber-700 hover:bg-amber-800 text-white shadow-xs transition self-start sm:self-center"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>{isAs ? "চিকিৎসকৰ বাবে PDF এক্সপোৰ্ট" : "Export Summary to Doctor (PDF)"}</span>
                </button>
              </div>

              {/* 3-Day Checkin Tracker */}
              <div className="space-y-3">
                <div className="text-xs font-bold uppercase tracking-wider text-stone-600">
                  {isAs ? "৩-দিনীয়া স্থিতি পৰীক্ষা (Day-by-Day Check-in):" : "3-Day Clinical Progress Check-in:"}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[1, 2, 3].map((d) => {
                    const checkin = activeLog.checkins.find((c) => c.day === d);
                    return (
                      <div
                        key={d}
                        className={`p-3.5 rounded-2xl border flex flex-col justify-between ${
                          checkin
                            ? checkin.status === "better"
                              ? "bg-emerald-50 border-emerald-300"
                              : checkin.status === "worse"
                              ? "bg-red-50 border-red-300"
                              : "bg-amber-50 border-amber-300"
                            : "bg-stone-50 border-stone-200"
                        }`}
                      >
                        <div>
                          <div className="text-xs font-bold text-stone-800">
                            {isAs ? `দিন ${d}` : `Day ${d}`}
                          </div>
                          {checkin ? (
                            <div className="mt-1">
                              <span
                                className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full ${
                                  checkin.status === "better"
                                    ? "bg-emerald-200 text-emerald-950"
                                    : checkin.status === "worse"
                                    ? "bg-red-200 text-red-950"
                                    : "bg-amber-200 text-amber-950"
                                }`}
                              >
                                {checkin.status}
                              </span>
                              <p className="text-[10px] text-stone-500 mt-1 line-clamp-1">
                                {checkin.date}
                              </p>
                            </div>
                          ) : (
                            <div className="text-[11px] text-stone-400 mt-1">
                              {isAs ? "এতিয়াও ল'গ কৰা নাই" : "Not yet recorded"}
                            </div>
                          )}
                        </div>

                        {/* Quick Action to log today */}
                        <div className="mt-3 pt-2 border-t border-stone-200/60 flex items-center justify-between gap-1">
                          <button
                            type="button"
                            onClick={() => handleStatusUpdate(d as 1 | 2 | 3, "better")}
                            className="px-2 py-1 text-[10px] font-bold rounded-md bg-emerald-700 text-white hover:bg-emerald-800"
                          >
                            Better
                          </button>
                          <button
                            type="button"
                            onClick={() => handleStatusUpdate(d as 1 | 2 | 3, "same")}
                            className="px-2 py-1 text-[10px] font-bold rounded-md bg-amber-600 text-white hover:bg-amber-700"
                          >
                            Same
                          </button>
                          <button
                            type="button"
                            onClick={() => handleStatusUpdate(d as 1 | 2 | 3, "worse")}
                            className="px-2 py-1 text-[10px] font-bold rounded-md bg-red-600 text-white hover:bg-red-700"
                          >
                            Worse
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Triage Safety Warning if Worse or Day 3 Same */}
              {(activeLog.checkins.some((c) => c.status === "worse") ||
                (activeLog.checkins.length >= 3 &&
                  activeLog.checkins.every((c) => c.status === "same"))) && (
                <div className="p-4 rounded-2xl bg-red-50 border-2 border-red-300 space-y-3">
                  <div className="flex items-start gap-2.5">
                    <ShieldAlert className="w-5 h-5 text-red-700 shrink-0 mt-0.5" />
                    <div>
                      <div className="text-xs font-bold text-red-950 uppercase tracking-wide">
                        {isAs ? "চিকিৎসকৰ পৰামৰ্শৰ সময় আহি পৰিছে" : "Clinical Consultation Strongly Advised"}
                      </div>
                      <p className="text-xs text-red-900 mt-1 leading-relaxed">
                        {isAs
                          ? "আপোনাৰ সমস্যাটো একাধিক দিন ধৰি উন্নতি হোৱা নাই বা অধিক হৈছে। ঘৰুৱা উপচাৰ কেৱল প্ৰাথমিক আৰামৰ বাবেহে; অনুগ্রহ কৰি অনতিপলমে এগৰাকী চিকিৎসকৰ ওচৰলৈ যাওক। ওপৰৰ পৰা সাৰাংশ PDF ডাউনল'ড কৰি চিকিৎসকক দেখুৱাব পাৰে।"
                          : "Your symptoms have persisted for 3+ days without meaningful improvement. Home botanical remedies are intended for acute mild comfort; please consult a qualified physician. You can export the summary PDF above to give your doctor immediate context."}
                      </p>
                    </div>
                  </div>
                  <EmergencySpeedDial compact />
                </div>
              )}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};
