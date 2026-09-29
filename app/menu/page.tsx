"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useNiramayStore, FamilyProfileType } from "@/lib/store";
import { useMounted } from "@/hooks/useMounted";
import { LanguageMode } from "@/lib/i18n";
import {
  Menu as MenuIcon,
  Globe,
  Users,
  ShieldAlert,
  ShieldCheck,
  Bookmark,
  Calendar,
  HeartPulse,
  BookHeart,
  FileText,
  RotateCcw,
  Info,
  Heart,
  ArrowRight,
  ExternalLink,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Clock,
  Sparkles,
  Download,
  Music,
  Play,
  Pause,
  Volume2,
  VolumeX,
} from "lucide-react";
import { EmergencySpeedDial } from "@/components/emergency/EmergencySpeedDial";
import { NiramayLogo } from "@/components/brand/NiramayLogo";
import {
  soundscapeEngine,
  SOUND_TRACKS,
  SoundTrackId,
} from "@/lib/soundscapes";

function AmbientSoundsMenuRow() {
  const mounted = useMounted();
  const { languageMode } = useNiramayStore();
  const isAs = mounted && languageMode === "as";

  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState<SoundTrackId>("rain");
  const [volume, setVolume] = useState(50);
  const [timerMinutes, setTimerMinutes] = useState<number | null>(null);
  const [remainingSeconds, setRemainingSeconds] = useState<number | null>(null);

  const countdownRef = useRef<any>(null);

  useEffect(() => {
    if (!soundscapeEngine) return;

    const syncState = () => {
      setIsPlaying(soundscapeEngine.getIsPlaying());
      setCurrentTrack(soundscapeEngine.getTrack());
      setVolume(Math.round(soundscapeEngine.getVolume() * 100));
    };

    syncState();
    const unsubscribe = soundscapeEngine.subscribe(syncState);
    return () => {
      unsubscribe();
    };
  }, []);

  const handleTogglePlay = () => {
    if (!soundscapeEngine) return;
    if (isPlaying) {
      soundscapeEngine.stop();
      clearTimer();
    } else {
      soundscapeEngine.play(currentTrack);
      setIsOpen(true);
    }
  };

  const handleTrackSelect = (trackId: SoundTrackId) => {
    setCurrentTrack(trackId);
    if (soundscapeEngine && isPlaying) {
      soundscapeEngine.play(trackId);
    }
  };

  const handleVolumeChange = (newVol: number) => {
    setVolume(newVol);
    if (soundscapeEngine) {
      soundscapeEngine.setVolume(newVol / 100);
    }
  };

  const setTimer = (mins: number) => {
    clearTimer();
    setTimerMinutes(mins);
    setRemainingSeconds(mins * 60);

    countdownRef.current = setInterval(() => {
      setRemainingSeconds((prev) => {
        if (prev === null || prev <= 1) {
          clearTimer();
          if (soundscapeEngine) {
            soundscapeEngine.stop();
          }
          return null;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const clearTimer = () => {
    if (countdownRef.current) {
      clearInterval(countdownRef.current);
      countdownRef.current = null;
    }
    setTimerMinutes(null);
    setRemainingSeconds(null);
  };

  const formatCountdown = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  if (!mounted) return null;

  return (
    <div className="py-2">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="w-full flex items-center justify-between py-2 text-left hover:text-amber-800 group cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 rounded-xl"
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-3">
          <div
            className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all ${
              isPlaying
                ? "bg-indigo-600 text-white shadow-sm ring-2 ring-indigo-400/50"
                : "bg-indigo-50 text-indigo-700"
            }`}
          >
            <Music className={`w-4 h-4 ${isPlaying ? "animate-pulse" : ""}`} />
          </div>
          <div>
            <div className="text-sm font-bold text-stone-900 group-hover:text-indigo-800 flex items-center gap-2">
              <span>{isAs ? "🎵 শান্ত শব্দপট (Ambient Sounds)" : "🎵 Ambient Sounds"}</span>
              {isPlaying && (
                <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full border border-emerald-300 animate-pulse">
                  {isAs ? "চলি আছে" : "Active"}
                </span>
              )}
            </div>
            <div className="text-xs text-stone-500 mt-0.5">
              {isAs
                ? "টোপনি আৰু মানসিক চাপৰ বাবে প্ৰাকৃতিক শব্দ (বৰষুণ, নৈ, বাঁহী)"
                : "Calming background audio for sleep & stress relief"}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {remainingSeconds && (
            <span className="text-[10px] font-mono text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
              ⏳ {formatCountdown(remainingSeconds)}
            </span>
          )}
          <span className="text-stone-400 group-hover:text-stone-700 p-1">
            {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </span>
        </div>
      </button>

      {isOpen && (
        <div className="mt-3 p-4 bg-stone-900 text-white rounded-2xl border border-stone-700 shadow-md animate-in fade-in duration-200">
          <div className="flex items-center justify-between pb-3 border-b border-stone-800">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span className="text-xs font-bold text-stone-100">
                {isAs ? "প্ৰাকৃতিক শান্ত শব্দপট নিয়ন্ত্ৰণ" : "Sleep & Stress Soundscape Controls"}
              </span>
            </div>
            <span className="text-[10px] text-stone-400 uppercase tracking-wider font-semibold">
              100% Offline
            </span>
          </div>

          <div className="mt-3 grid grid-cols-3 gap-2">
            {SOUND_TRACKS.map((track) => {
              const isCur = currentTrack === track.id;
              return (
                <button
                  key={track.id}
                  type="button"
                  onClick={() => handleTrackSelect(track.id)}
                  className={`flex flex-col items-center text-center p-2.5 rounded-xl border transition cursor-pointer ${
                    isCur
                      ? "bg-amber-700/80 border-amber-400 text-white shadow-sm ring-1 ring-amber-400/40"
                      : "bg-stone-800/80 border-stone-700 text-stone-300 hover:bg-stone-800"
                  }`}
                >
                  <span className="text-xl mb-1">{track.icon}</span>
                  <span className="text-[11px] font-bold line-clamp-1">
                    {isAs ? track.nameAs : track.nameEn}
                  </span>
                </button>
              );
            })}
          </div>

          <p className="text-[11px] text-stone-400 mt-2.5 text-center italic">
            {isAs
              ? SOUND_TRACKS.find((t) => t.id === currentTrack)?.descAs
              : SOUND_TRACKS.find((t) => t.id === currentTrack)?.descEn}
          </p>

          <div className="mt-3.5 flex items-center justify-between gap-3 bg-stone-800/90 p-3 rounded-xl border border-stone-700">
            <button
              type="button"
              onClick={handleTogglePlay}
              className="w-10 h-10 rounded-xl bg-amber-500 hover:bg-amber-400 active:scale-95 text-stone-950 flex items-center justify-center shrink-0 transition shadow-md cursor-pointer"
              aria-label={isPlaying ? "Pause ambient sound" : "Play ambient sound"}
            >
              {isPlaying ? (
                <Pause className="w-5 h-5 fill-stone-950" />
              ) : (
                <Play className="w-5 h-5 fill-stone-950 ml-0.5" />
              )}
            </button>

            <div className="flex-1 flex items-center gap-2">
              {volume === 0 ? (
                <VolumeX className="w-4 h-4 text-stone-400 shrink-0" />
              ) : (
                <Volume2 className="w-4 h-4 text-amber-400 shrink-0" />
              )}
              <input
                type="range"
                min="0"
                max="100"
                value={volume}
                onChange={(e) => handleVolumeChange(Number(e.target.value))}
                className="w-full h-1.5 bg-stone-700 rounded-lg appearance-none cursor-pointer accent-amber-500"
                aria-label="Volume slider"
              />
              <span className="text-[10px] text-stone-400 font-mono w-7 text-right">
                {volume}%
              </span>
            </div>
          </div>

          <div className="mt-3 pt-3 border-t border-stone-800 flex items-center justify-between text-xs">
            <div className="flex items-center gap-1.5 text-stone-400 text-[11px]">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              <span>{isAs ? "টোপনি টাইমাৰ:" : "Sleep Timer:"}</span>
            </div>

            <div className="flex items-center gap-1.5">
              {[15, 30, 60].map((mins) => (
                <button
                  key={mins}
                  type="button"
                  onClick={() => setTimer(mins)}
                  className={`px-2.5 py-1 rounded-lg text-[10px] font-bold border transition cursor-pointer ${
                    timerMinutes === mins
                      ? "bg-amber-600 text-white border-amber-400"
                      : "bg-stone-800 text-stone-300 border-stone-700 hover:text-white"
                  }`}
                >
                  {mins}m
                </button>
              ))}
              {timerMinutes && (
                <button
                  type="button"
                  onClick={clearTimer}
                  className="text-[10px] text-stone-400 hover:text-red-400 underline ml-1 cursor-pointer"
                >
                  {isAs ? "বন্ধ কৰক" : "Off"}
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function MenuPage() {
  const mounted = useMounted();
  const {
    languageMode,
    setLanguageMode,
    familyProfile,
    setFamilyProfile,
    savedRemedyIds,
    careLogs,
    activeCourses,
    doshaProfile,
    clearAllLocalData,
  } = useNiramayStore();

  const [confirmClear, setConfirmClear] = useState(false);
  const isAs = mounted && languageMode === "as";

  const handleClearData = () => {
    clearAllLocalData();
    setConfirmClear(false);
  };

  const familyProfiles: { id: FamilyProfileType; labelEn: string; labelAs: string }[] = [
    { id: "adult", labelEn: "Adult (General)", labelAs: "প্ৰাপ্তবয়স্ক" },
    { id: "child", labelEn: "Child (Gentle)", labelAs: "শিশু" },
    { id: "senior", labelEn: "Senior (Mild)", labelAs: "বয়োজ্যেষ্ঠ" },
    { id: "pregnancy", labelEn: "Maternal Care", labelAs: "মাতৃ আৰু গৰ্ভাৱস্থা" },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12 pb-28">
      {/* Friendly Non-Account Header */}
      <div className="bg-gradient-to-br from-amber-800 via-amber-900 to-emerald-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl mb-6 relative overflow-hidden">
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <NiramayLogo size={48} />
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-serif font-black">Niramay নিৰাময়</h1>
                <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-200 border border-emerald-400/30 px-2 py-0.5 rounded-full">
                  100% Offline
                </span>
              </div>
              <p className="text-xs text-amber-200/90 mt-1 max-w-md">
                {isAs
                  ? "আপোনাৰ নিৰাময়: সম্পূৰ্ণ ব্যক্তিগত আৰু অফলাইন। কোনো একাউণ্ট বা চাৰ্ভাৰৰ প্ৰয়োজন নাই।"
                  : "Your Niramay: Fully private, local & offline. No account, login, or cloud servers required."}
              </p>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 text-xs border border-white/15 self-start sm:self-center">
            <div className="text-[10px] text-amber-200 uppercase font-bold tracking-wider">
              {isAs ? "সাঁচিপাত অৱস্থা" : "Local Storage"}
            </div>
            <div className="font-bold mt-0.5">
              {savedRemedyIds.length} {isAs ? "উপচাৰ সংৰক্ষিত" : "Remedies Saved"}
            </div>
          </div>
        </div>
      </div>

      {/* Emergency Speed Dial Pinned */}
      <div className="mb-6 p-4 rounded-3xl bg-red-50 border-2 border-red-300">
        <EmergencySpeedDial />
      </div>

      {/* Group 1: App Settings */}
      <div className="bg-white rounded-3xl p-6 border border-stone-200/80 shadow-xs mb-6 space-y-6">
        <h2 className="text-sm font-bold uppercase tracking-wider text-amber-900 flex items-center gap-2">
          <Globe className="w-4 h-4 text-amber-700" />
          <span>{isAs ? "ভাষা আৰু প্ৰ'ফাইল নিৰ্বাচন" : "App Settings & Language"}</span>
        </h2>

        {/* Language Selection */}
        <div>
          <label className="text-xs font-bold text-stone-700 block mb-2">
            {isAs ? "ভাষাৰ মোড বাছক (Language Mode):" : "Display Language:"}
          </label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: "en" as LanguageMode, label: "English" },
              { id: "as" as LanguageMode, label: "অসমীয়া" },
              { id: "bilingual" as LanguageMode, label: "Dual (দ্বিভাষিক)" },
            ].map((lang) => (
              <button
                key={lang.id}
                type="button"
                onClick={() => setLanguageMode(lang.id)}
                className={`py-2 px-3 rounded-xl text-xs font-bold transition border ${
                  languageMode === lang.id
                    ? "bg-amber-700 text-white border-amber-800 shadow-2xs"
                    : "bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100"
                }`}
              >
                {lang.label}
              </button>
            ))}
          </div>
        </div>

        {/* Family Profile Mode */}
        <div>
          <label className="text-xs font-bold text-stone-700 block mb-2">
            {isAs ? "সক্ৰিয় পৰিয়াল প্ৰ'ফাইল (প্ৰস্তুত মাত্ৰা নিৰ্ধাৰণ):" : "Active Family Dosage Profile:"}
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {familyProfiles.map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => setFamilyProfile(p.id)}
                className={`py-2 px-3 rounded-xl text-xs font-bold transition border text-left flex flex-col justify-between ${
                  familyProfile === p.id
                    ? "bg-emerald-700 text-white border-emerald-800 shadow-2xs"
                    : "bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100"
                }`}
              >
                <span>{p.labelEn}</span>
                <span className="text-[10px] opacity-80 mt-0.5">{p.labelAs}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Group 2: My Niramay Navigation */}
      <div className="bg-white rounded-3xl p-6 border border-stone-200/80 shadow-xs mb-6 space-y-3">
        <h2 className="text-sm font-bold uppercase tracking-wider text-amber-900 mb-2">
          {isAs ? "মোৰ সংৰক্ষিত তথ্য আৰু যত্ন" : "My Niramay Health Hub"}
        </h2>

        <div className="divide-y divide-stone-100">
          <Link
            href="/saved"
            className="flex items-center justify-between py-3 hover:text-amber-800 group"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
                <Bookmark className="w-4 h-4" />
              </div>
              <div>
                <div className="text-sm font-bold text-stone-900 group-hover:text-amber-800">
                  {isAs ? "সংৰক্ষিত উপচাৰসমূহ" : "Saved Kitchen Remedies"}
                </div>
                <div className="text-xs text-stone-500">
                  {savedRemedyIds.length} {isAs ? "টা সংৰক্ষিত" : "saved for offline use"}
                </div>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-stone-400 group-hover:translate-x-1 transition" />
          </Link>

          <Link
            href="/dosha-assessment"
            className="flex items-center justify-between py-3 hover:text-amber-800 group"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
                <HeartPulse className="w-4 h-4" />
              </div>
              <div>
                <div className="text-sm font-bold text-stone-900 group-hover:text-amber-800">
                  {isAs ? "আয়ুৰ্বেদিক দোষ আৰু প্ৰকৃতি" : "Ayurvedic Prakriti Profile"}
                </div>
                <div className="text-xs text-stone-500">
                  {doshaProfile ? `Dominant: ${doshaProfile}` : isAs ? "পৰীক্ষা কৰা হোৱা নাই" : "Not yet tested"}
                </div>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-stone-400 group-hover:translate-x-1 transition" />
          </Link>

          <Link
            href="/aitas-diha"
            className="flex items-center justify-between py-3 hover:text-amber-800 group"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-rose-50 text-rose-700 flex items-center justify-center">
                <BookHeart className="w-4 h-4" />
              </div>
              <div>
                <div className="text-sm font-bold text-stone-900 group-hover:text-amber-800">
                  {isAs ? "আইতাৰ দিহা (পৰিয়ালৰ দিনলিপি)" : "Aita's Diha (Family Wisdom)"}
                </div>
                <div className="text-xs text-stone-500">
                  {isAs ? "কণ্ঠ আৰু পাঠ্য দিহা সংৰক্ষণ" : "Private voice notes & oral heritage"}
                </div>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-stone-400 group-hover:translate-x-1 transition" />
          </Link>

          <Link
            href="/fridge-card"
            className="flex items-center justify-between py-3 hover:text-amber-800 group"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-stone-100 text-stone-700 flex items-center justify-center">
                <FileText className="w-4 h-4" />
              </div>
              <div>
                <div className="text-sm font-bold text-stone-900 group-hover:text-amber-800">
                  {isAs ? "জৰুৰীকালীন ফ্ৰিজ কাৰ্ড" : "Printable Emergency Fridge Card"}
                </div>
                <div className="text-xs text-stone-500">
                  {isAs ? "পাকঘৰৰ বাবে উচ্চ কনট্ৰাষ্ট পিডিএফ" : "Instant high-contrast kitchen PDF"}
                </div>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-stone-400 group-hover:translate-x-1 transition" />
          </Link>
          <AmbientSoundsMenuRow />
        </div>
      </div>

      {/* Group 3: Privacy & Data Reset */}
      <div className="bg-white rounded-3xl p-6 border border-stone-200/80 shadow-xs mb-6 space-y-4">
        <h2 className="text-sm font-bold uppercase tracking-wider text-amber-900 flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-700" />
          <span>{isAs ? "গোপনীয়তা আৰু অফলাইন নিশ্চয়তা" : "Privacy & Zero Cloud Tracking"}</span>
        </h2>
        <p className="text-xs text-stone-600 leading-relaxed">
          {isAs
            ? "নিৰাময়ে কোনো ব্যক্তিগত তথ্য, কণ্ঠ বা কেমেৰাৰ ছবি কোনো বহিঃৰাজ্যিক চাৰ্ভাৰলৈ প্ৰেৰণ নকৰে। সকলো তথ্য কেৱল আপোনাৰ নিজৰ মোবাইল বা কম্পিউটাৰৰ ব্ৰাউজাৰতে সংৰক্ষিত থাকে।"
            : "Niramay operates 100% on your device. Your voice queries, camera scans, care logs, and habit streaks never leave this device. No advertising trackers, no user profiles, and no external AI servers."}
        </p>

        <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
          {!confirmClear ? (
            <button
              type="button"
              onClick={() => setConfirmClear(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-red-700 bg-red-50 hover:bg-red-100 border border-red-200 transition"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{isAs ? "স্থানীয় তথ্য মচক" : "Clear All Local Data"}</span>
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <span className="text-xs text-red-700 font-bold">
                {isAs ? "নিশ্চিতনে?" : "Are you sure?"}
              </span>
              <button
                type="button"
                onClick={handleClearData}
                className="px-3 py-1.5 rounded-xl text-xs font-bold text-white bg-red-600 hover:bg-red-700 transition"
              >
                {isAs ? "হয়, সকলো মচক" : "Yes, reset everything"}
              </button>
              <button
                type="button"
                onClick={() => setConfirmClear(false)}
                className="px-3 py-1.5 rounded-xl text-xs font-bold text-stone-700 bg-stone-100 hover:bg-stone-200 transition"
              >
                {isAs ? "বাতিল" : "Cancel"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
