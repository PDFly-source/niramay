"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  soundscapeEngine,
  SOUND_TRACKS,
  SoundTrackId,
} from "@/lib/soundscapes";
import {
  Volume2,
  VolumeX,
  Play,
  Pause,
  Clock,
  Music,
  X,
  ChevronUp,
  ChevronDown,
  Sparkles,
} from "lucide-react";
import { useNiramayStore } from "@/lib/store";
import { useMounted } from "@/hooks/useMounted";

interface Props {
  // If provided, highlights prompt for insomnia / stress
  suggestedAilment?: string;
  inlineOnly?: boolean;
}

export const SoundscapesPlayer: React.FC<Props> = ({ suggestedAilment, inlineOnly = false }) => {
  const mounted = useMounted();
  const { languageMode } = useNiramayStore();
  const currentMode = mounted ? languageMode : "bilingual";
  const isAs = currentMode === "as";

  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedTrack, setSelectedTrack] = useState<SoundTrackId>("rain");
  const [volume, setVolume] = useState(50);
  const [isExpanded, setIsExpanded] = useState(false);
  const [timerMinutes, setTimerMinutes] = useState<number | null>(null);
  const [remainingSeconds, setRemainingSeconds] = useState<number | null>(null);
  const [isPromptDismissed, setIsPromptDismissed] = useState(false);

  const countdownRef = useRef<any>(null);

  // Sync state with engine
  const handleTogglePlay = () => {
    if (!soundscapeEngine) return;

    if (isPlaying) {
      soundscapeEngine.stop();
      setIsPlaying(false);
      clearTimer();
    } else {
      soundscapeEngine.play(selectedTrack);
      setIsPlaying(true);
      setIsExpanded(true);
    }
  };

  const handleTrackChange = (trackId: SoundTrackId) => {
    setSelectedTrack(trackId);
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
          setIsPlaying(false);
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

  useEffect(() => {
    if (!soundscapeEngine) return;

    const syncState = () => {
      setIsPlaying(soundscapeEngine.getIsPlaying());
      setSelectedTrack(soundscapeEngine.getTrack());
      setVolume(Math.round(soundscapeEngine.getVolume() * 100));
    };

    syncState();
    const unsubscribe = soundscapeEngine.subscribe(syncState);

    return () => {
      unsubscribe();
      clearTimer();
    };
  }, []);

  const formatCountdown = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  if (!mounted) return null;

  return (
    <>
      {/* Contextual Suggestion Banner for Insomnia/Stress Remedy Pages */}
      {suggestedAilment && !isPromptDismissed && !isPlaying && (
        <div className="my-6 p-4 rounded-3xl bg-gradient-to-r from-indigo-900 to-stone-900 text-white shadow-lg border border-indigo-700/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4 animate-in fade-in">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-500/30 text-indigo-300 flex items-center justify-center shrink-0">
              <Sparkles className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <div className="text-xs sm:text-sm font-bold text-amber-200">
                {isAs ? "শান্ত নিদ্ৰাৰ বাবে প্ৰাকৃতিক শব্দপট" : "Calming Sleep Soundscape"}
              </div>
              <p className="text-xs text-indigo-200/90 mt-0.5">
                {isAs
                  ? "টোপনি আৰু মানসিক চাপৰ উপশমৰ বাবে বৰষুণ বা বাঁহীৰ মৃদু সুৰ শুনক।"
                  : "Play gentle monsoon rain, Brahmaputra stream, or bamboo flute while this remedy takes effect."}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => {
                handleTogglePlay();
              }}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold text-xs shadow-md transition"
            >
              <Play className="w-3.5 h-3.5 fill-stone-950" />
              <span>{isAs ? "শব্দপট আৰম্ভ কৰক" : "Play Soundscape"}</span>
            </button>
            <button
              onClick={() => setIsPromptDismissed(true)}
              className="p-2 text-indigo-300 hover:text-white rounded-xl transition"
              title="Dismiss"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Floating or Docked Bottom Soundscape Bar - only when active or expanded */}
      {!inlineOnly && (isPlaying || isExpanded) && (
        <div className="fixed bottom-20 left-4 sm:bottom-24 sm:left-6 z-40 pointer-events-auto">
        {!isExpanded ? (
          /* Minimized Floating Audio Pill */
          <button
            onClick={() => setIsExpanded(true)}
            className={`inline-flex items-center gap-2 px-3.5 py-2.5 rounded-full shadow-xl border text-xs font-bold transition transform hover:scale-105 active:scale-95 ${
              isPlaying
                ? "bg-amber-600 text-white border-amber-400 animate-pulse ring-4 ring-amber-500/20"
                : "bg-white/95 text-stone-800 border-amber-200 hover:bg-amber-50"
            }`}
            title="Open Ambient Soundscapes"
          >
            <Music className={`w-4 h-4 ${isPlaying ? "text-amber-200" : "text-amber-700"}`} />
            <span>
              {isPlaying
                ? isAs
                  ? "শব্দপট চলি আছে"
                  : "Playing Soundscape"
                : isAs
                ? "শান্ত শব্দপট"
                : "Ambient Sounds"}
            </span>
            {remainingSeconds && (
              <span className="text-[10px] font-mono bg-black/20 px-1.5 py-0.5 rounded-md">
                {formatCountdown(remainingSeconds)}
              </span>
            )}
          </button>
        ) : (
          /* Expanded Player Modal/Drawer */
          <div className="w-[330px] sm:w-[380px] bg-stone-900/95 backdrop-blur-md text-white rounded-3xl p-5 shadow-2xl border border-stone-700 animate-in fade-in slide-in-from-bottom-6">
            {/* Player Header */}
            <div className="flex items-center justify-between pb-3 border-b border-stone-800">
              <div className="flex items-center gap-2">
                <Music className="w-4 h-4 text-amber-400" />
                <span className="text-xs font-bold tracking-tight text-stone-100">
                  {isAs ? "প্ৰাকৃতিক শান্ত শব্দপট" : "Traditional Ambient Soundscapes"}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setIsExpanded(false)}
                  className="p-1.5 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800 transition"
                  title="Minimize"
                >
                  <ChevronDown className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Track Selector Chips */}
            <div className="mt-3.5 grid grid-cols-3 gap-1.5">
              {SOUND_TRACKS.map((t) => {
                const isCur = selectedTrack === t.id;
                return (
                  <button
                    key={t.id}
                    onClick={() => handleTrackChange(t.id)}
                    className={`flex flex-col items-center text-center p-2 rounded-2xl border transition ${
                      isCur
                        ? "bg-amber-700/80 border-amber-400 text-white shadow-xs"
                        : "bg-stone-800/80 border-stone-700/70 text-stone-300 hover:bg-stone-800"
                    }`}
                  >
                    <span className="text-lg">{t.icon}</span>
                    <span className="text-[10px] font-bold mt-1 line-clamp-1">
                      {isAs ? t.nameAs : t.nameEn}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Track Description */}
            <p className="text-[11px] text-stone-400 mt-2.5 text-center italic font-sans">
              {isAs
                ? SOUND_TRACKS.find((t) => t.id === selectedTrack)?.descAs
                : SOUND_TRACKS.find((t) => t.id === selectedTrack)?.descEn}
            </p>

            {/* Play/Pause & Volume Row */}
            <div className="mt-4 flex items-center justify-between gap-3 bg-stone-800/80 p-3 rounded-2xl border border-stone-700">
              <button
                onClick={handleTogglePlay}
                className="w-10 h-10 rounded-xl bg-amber-500 hover:bg-amber-400 active:scale-95 text-stone-950 flex items-center justify-center shrink-0 transition shadow-md"
              >
                {isPlaying ? (
                  <Pause className="w-5 h-5 fill-stone-950" />
                ) : (
                  <Play className="w-5 h-5 fill-stone-950 ml-0.5" />
                )}
              </button>

              {/* Volume Slider */}
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
                />
              </div>
            </div>

            {/* Sleep Timer Selector */}
            <div className="mt-3.5 pt-3 border-t border-stone-800 flex items-center justify-between text-xs">
              <div className="flex items-center gap-1.5 text-stone-400 text-[11px]">
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                <span>{isAs ? "টোপনি টাইমাৰ:" : "Sleep Timer:"}</span>
              </div>

              <div className="flex items-center gap-1">
                {[15, 30, 60].map((mins) => (
                  <button
                    key={mins}
                    onClick={() => setTimer(mins)}
                    className={`px-2 py-0.5 rounded-lg text-[10px] font-bold border transition ${
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
                    onClick={clearTimer}
                    className="text-[10px] text-stone-400 hover:text-red-400 underline ml-1"
                  >
                    {isAs ? "বাতিল" : "Off"}
                  </button>
                )}
              </div>
            </div>

            {remainingSeconds && (
              <div className="mt-2 text-center text-[10px] font-mono text-amber-300">
                ⏳ {isAs ? "বাকী থকা সময়:" : "Auto-stopping in:"}{" "}
                {formatCountdown(remainingSeconds)}
              </div>
            )}
          </div>
        )}
      </div>
    )}
  </>
);
};
