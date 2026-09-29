"use client";

import React, { useState, useEffect, useRef } from "react";
import { Remedy } from "@/lib/schema";
import { extractString } from "@/lib/utils";
import { useMounted } from "@/hooks/useMounted";
import { LanguageMode } from "@/lib/i18n";
import { useBodyScrollLock } from "@/hooks/useBodyScrollLock";
import {
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Play,
  Pause,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  X,
  Clock,
  Sparkles,
  ChefHat,
  Bell,
  CheckCircle2,
} from "lucide-react";

interface Props {
  remedy: Remedy;
  languageMode: LanguageMode;
  onClose: () => void;
}

// Procedural audio chime using Web Audio API
function playChimeSound() {
  try {
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
    osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.3); // A5

    gain.gain.setValueAtTime(0.3, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.8);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.8);
  } catch (e) {
    console.error("Audio chime error:", e);
  }
}

export const KitchenCookingMode: React.FC<Props> = ({
  remedy,
  languageMode,
  onClose,
}) => {
  const mounted = useMounted();
  const isAs = languageMode === "as";

  const [currentStepIdx, setCurrentStepIdx] = useState(0);
  const [isVoiceListening, setIsVoiceListening] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(false);
  const [voiceTranscript, setVoiceTranscript] = useState("");

  // Timer states
  const [timerSeconds, setTimerSeconds] = useState<number | null>(null);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const timerIntervalRef = useRef<any>(null);

  const recognitionRef = useRef<any>(null);

  const steps = remedy.steps || [];
  const currentStep = steps[currentStepIdx];

  const stepObj =
    typeof currentStep === "object" && currentStep !== null
      ? (currentStep as { en: string; as: string })
      : { en: String(currentStep || ""), as: String(currentStep || "") };
  const currentStepText = isAs ? stepObj.as : stepObj.en;

  const rawTip = remedy.tip;
  const tipText = isAs
    ? typeof rawTip === "object"
      ? rawTip?.as
      : rawTip
    : typeof rawTip === "object"
    ? rawTip?.en
    : rawTip;

  // Read current step aloud using Web Speech Synthesis
  const speakCurrentStep = () => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(currentStepText);
    utterance.lang = isAs ? "as-IN" : "en-IN";
    utterance.rate = 0.95;
    window.speechSynthesis.speak(utterance);
  };

  // Speak step whenever step changes
  useEffect(() => {
    speakCurrentStep();
  }, [currentStepIdx]);

  // Timer countdown
  useEffect(() => {
    if (isTimerRunning && timerSeconds !== null && timerSeconds > 0) {
      timerIntervalRef.current = setInterval(() => {
        setTimerSeconds((prev) => {
          if (prev === null || prev <= 1) {
            clearInterval(timerIntervalRef.current);
            setIsTimerRunning(false);
            playChimeSound();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    }
    return () => {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    };
  }, [isTimerRunning, timerSeconds]);

  const startTimer = (mins: number) => {
    setTimerSeconds(mins * 60);
    setIsTimerRunning(true);
  };

  const cancelTimer = () => {
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    setIsTimerRunning(false);
    setTimerSeconds(null);
  };

  // Initialize Web Speech Recognition for hands-free commands
  useEffect(() => {
    if (typeof window === "undefined") return;

    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;

    let timer: NodeJS.Timeout | null = null;
    if (SpeechRecognition) {
      timer = setTimeout(() => {
        setSpeechSupported(true);
      }, 0);
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = false;
      recognition.lang = isAs ? "as-IN" : "en-IN";

      recognition.onresult = (event: any) => {
        const last = event.results.length - 1;
        const text = event.results[last][0].transcript.trim().toLowerCase();
        setVoiceTranscript(text);

        // Command parsing:
        // "Next" / "আগলৈ"
        if (
          text.includes("next") ||
          text.includes("agoloi") ||
          text.includes("agborhok") ||
          text.includes("আগলৈ") ||
          text.includes("পৰৱৰ্তী")
        ) {
          if (currentStepIdx < steps.length - 1) {
            setCurrentStepIdx((prev) => prev + 1);
          }
        }
        // "Back" / "পিছলৈ"
        else if (
          text.includes("back") ||
          text.includes("picholoi") ||
          text.includes("পিছলৈ") ||
          text.includes("পূৰ্বৱৰ্তী")
        ) {
          if (currentStepIdx > 0) {
            setCurrentStepIdx((prev) => prev - 1);
          }
        }
        // "Repeat" / "আকৌ"
        else if (
          text.includes("repeat") ||
          text.includes("again") ||
          text.includes("akou") ||
          text.includes("আকৌ")
        ) {
          speakCurrentStep();
        }
        // "Timer" / "[N] min"
        else if (text.includes("timer") || text.includes("টাইমাৰ") || text.includes("minute")) {
          const numMatch = text.match(/\d+/);
          const mins = numMatch ? parseInt(numMatch[0], 10) : 3;
          startTimer(mins);
        }
      };

      recognition.onerror = () => {
        setIsVoiceListening(false);
      };

      recognition.onend = () => {
        // Auto restart if intended
        if (isVoiceListening) {
          try {
            recognition.start();
          } catch (e) {}
        }
      };

      recognition.onstart = () => {
        setIsVoiceListening(true);
      };

      recognitionRef.current = recognition;

      try {
        recognition.start();
      } catch (e) {}
    }

    return () => {
      if (timer) clearTimeout(timer);
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const formatTimer = (totalSecs: number) => {
    const m = Math.floor(totalSecs / 60);
    const s = totalSecs % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  useBodyScrollLock(mounted);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 z-50 bg-night text-onbrand flex flex-col justify-between p-4 sm:p-8 animate-in fade-in duration-200">
      {/* Top Bar: Remedy Name + Mic State + Exit */}
      <div className="flex items-center justify-between pb-4 border-b border-stone-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
            <ChefHat className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs uppercase font-bold text-amber-400 tracking-wider">
              {isAs ? "হাত-মুক্ত পাকঘৰ মোড" : "Hands-Free Kitchen Cooking Mode"}
            </div>
            <h2 className="text-base sm:text-lg font-serif font-black text-stone-100">
              {isAs ? remedy.name_assamese || extractString(remedy.name) : extractString(remedy.name)}
            </h2>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Voice Command Indicator */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-stone-800/90 text-xs font-semibold border border-stone-700">
            {speechSupported ? (
              <>
                <Mic className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                <span className="text-[11px] text-stone-300 hidden sm:inline">
                  {isAs ? "কণ্ঠ নিৰ্দেশনা সক্ৰিয়" : "Listening for: 'Next', 'Back', 'Repeat', 'Timer'"}
                </span>
              </>
            ) : (
              <>
                <MicOff className="w-3.5 h-3.5 text-stone-500" />
                <span className="text-[11px] text-stone-400">Manual Touch Mode</span>
              </>
            )}
          </div>

          <button
            onClick={onClose}
            className="w-10 h-10 rounded-2xl bg-stone-800 hover:bg-stone-700 text-stone-300 flex items-center justify-center transition"
            aria-label="Exit kitchen mode"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Focus: Single Giant High-Contrast Step */}
      <div className="flex-1 flex flex-col justify-center max-w-4xl mx-auto my-6 w-full text-center px-2">
        <div className="text-sm sm:text-base font-mono font-bold text-amber-400 uppercase tracking-widest mb-3">
          {isAs ? "পদক্ষেপ" : "Step"} {currentStepIdx + 1} {isAs ? "মুঠ" : "of"} {steps.length}
        </div>

        <div className="text-2xl sm:text-4xl lg:text-5xl font-serif font-black leading-tight sm:leading-snug text-amber-50">
          {currentStepText}
        </div>

        {/* Visual Tip if present */}
        {tipText && currentStepIdx === 0 && (
          <div className="mt-6 p-4 rounded-2xl bg-amber-950/40 border border-amber-500/30 text-xs sm:text-sm text-amber-200 max-w-xl mx-auto">
            💡 {isAs ? "আইতাৰ দিহা:" : "Tip:"} {tipText}
          </div>
        )}

        {/* Live Active Step Timer */}
        {timerSeconds !== null && (
          <div className="mt-8 p-4 rounded-3xl bg-stone-900 border border-amber-500/50 max-w-xs mx-auto flex items-center justify-center gap-4 animate-in zoom-in-95">
            <Clock className="w-6 h-6 text-amber-400 animate-spin" />
            <div className="text-3xl font-mono font-black text-amber-300">
              {formatTimer(timerSeconds)}
            </div>
            <button
              onClick={cancelTimer}
              className="px-2.5 py-1 text-xs font-bold text-stone-400 hover:text-onbrand"
            >
              Reset
            </button>
          </div>
        )}

        {voiceTranscript && (
          <div className="mt-4 text-[11px] font-mono text-stone-500">
            {isAs ? "শুনি পোৱা বাক্য: " : "Heard: "}&ldquo;{voiceTranscript}&rdquo;
          </div>
        )}
      </div>

      {/* Bottom Large Tap Navigation & Voice Controls */}
      <div className="max-w-4xl mx-auto w-full pt-4 border-t border-stone-800 space-y-4">
        {/* Quick Timers Bar */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto text-xs">
          <span className="text-stone-400 font-semibold">{isAs ? "টাইমাৰ:" : "Timers:"}</span>
          {[2, 3, 5, 10].map((mins) => (
            <button
              key={mins}
              onClick={() => startTimer(mins)}
              className="px-3 py-1.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 font-bold transition"
            >
              ⏱️ {mins}m
            </button>
          ))}
          <button
            onClick={speakCurrentStep}
            className="px-3 py-1.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-amber-300 font-bold transition flex items-center gap-1.5"
          >
            <Volume2 className="w-3.5 h-3.5" />
            <span>{isAs ? "আকৌ কওক" : "Repeat Audio"}</span>
          </button>
        </div>

        {/* Big Step Navigation Buttons */}
        <div className="grid grid-cols-2 gap-4">
          <button
            type="button"
            disabled={currentStepIdx === 0}
            onClick={() => setCurrentStepIdx((prev) => Math.max(0, prev - 1))}
            className="py-4 px-6 rounded-2xl bg-stone-800 hover:bg-stone-700 disabled:opacity-30 disabled:hover:bg-stone-800 text-onbrand font-bold text-sm sm:text-base flex items-center justify-center gap-2 transition"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>{isAs ? "পূৰ্বৱৰ্তী পদক্ষেপ" : "Previous Step"}</span>
          </button>

          <button
            type="button"
            onClick={() => {
              if (currentStepIdx < steps.length - 1) {
                setCurrentStepIdx((prev) => prev + 1);
              } else {
                onClose();
              }
            }}
            className="py-4 px-6 rounded-2xl bg-amber-600 hover:bg-amber-500 text-onbrand font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-lg transition"
          >
            <span>
              {currentStepIdx === steps.length - 1
                ? isAs
                  ? "সম্পূৰ্ণ হ'ল (সমাপ্ত)"
                  : "Finish Preparation"
                : isAs
                ? "পৰৱৰ্তী পদক্ষেপ"
                : "Next Step"}
            </span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
