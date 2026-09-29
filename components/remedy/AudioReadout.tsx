"use client";

import React, { useState, useEffect, useRef } from "react";
import { Remedy } from "@/lib/schema";
import { extractString } from "@/lib/utils";
import { Volume2, VolumeX, Play, Pause, Square, Globe, ShieldAlert } from "lucide-react";
import { FamilyProfileType } from "@/lib/store";

interface Props {
  remedy: Remedy;
  familyProfile?: FamilyProfileType;
  onActiveStepChange?: (stepIndex: number | null) => void;
}

export const AudioReadout: React.FC<Props> = ({
  remedy,
  familyProfile = "adult",
  onActiveStepChange,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [readoutLang, setReadoutLang] = useState<"as" | "en">("en");
  const [voiceNotice, setVoiceNotice] = useState<string | null>(null);
  const [currentStepIdx, setCurrentStepIdx] = useState<number | null>(null);

  const utterancesRef = useRef<SpeechSynthesisUtterance[]>([]);
  const currentUtteranceIndexRef = useRef<number>(0);

  const isSupported =
    typeof window !== "undefined" && "speechSynthesis" in window;

  const stopAudio = React.useCallback(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
    setIsPlaying(false);
    setIsPaused(false);
    setCurrentStepIdx(null);
    onActiveStepChange?.(null);
  }, [onActiveStepChange]);

  useEffect(() => {
    return () => {
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const getBestVoice = (lang: "as" | "en") => {
    if (typeof window === "undefined" || !("speechSynthesis" in window))
      return null;
    const voices = window.speechSynthesis.getVoices();

    if (lang === "as") {
      // Look for as-IN, then closest bn-IN or hi-IN
      const asVoice = voices.find((v) => v.lang.includes("as"));
      if (asVoice) {
        setVoiceNotice(null);
        return asVoice;
      }
      const bnVoice = voices.find((v) => v.lang.includes("bn"));
      if (bnVoice) {
        setVoiceNotice("Using Bengali voice engine for Assamese pronunciation");
        return bnVoice;
      }
      const hiVoice = voices.find((v) => v.lang.includes("hi"));
      if (hiVoice) {
        setVoiceNotice("Using Hindi voice engine for Indian phonetics");
        return hiVoice;
      }
      setVoiceNotice("Assamese voice not installed on device; reading phonetically");
      return voices.find((v) => v.lang.includes("en-IN")) || voices[0] || null;
    } else {
      setVoiceNotice(null);
      return (
        voices.find((v) => v.lang.includes("en-IN")) ||
        voices.find((v) => v.lang.startsWith("en")) ||
        voices[0] ||
        null
      );
    }
  };

  const startAudio = () => {
    if (!isSupported) return;
    window.speechSynthesis.cancel();

    const voice = getBestVoice(readoutLang);
    const utterances: SpeechSynthesisUtterance[] = [];

    // Helper to add queue item
    const addQueueItem = (text: string, stepIndex: number | null, rate = 0.95) => {
      const u = new SpeechSynthesisUtterance(text);
      if (voice) u.voice = voice;
      u.rate = rate;
      u.pitch = 1.0;

      u.onstart = () => {
        setCurrentStepIdx(stepIndex);
        onActiveStepChange?.(stepIndex);
      };

      u.onerror = (e) => {
        console.warn("Speech error:", e);
      };

      utterances.push(u);
    };

    // 1. Remedy Name
    const titleText =
      readoutLang === "as"
        ? remedy.name_assamese || extractString(remedy.name)
        : extractString(remedy.name);
    addQueueItem(
      readoutLang === "as" ? `উপচাৰ: ${titleText}` : `Remedy: ${titleText}`,
      null
    );

    // 2. Ingredients
    const ingsIntro =
      readoutLang === "as" ? "প্ৰয়োজনীয় উপাদানসমূহ:" : "Required ingredients:";
    addQueueItem(ingsIntro, null);

    remedy.ingredients.forEach((ing) => {
      const itemText =
        readoutLang === "as"
          ? ing.item_assamese || extractString(ing.item)
          : extractString(ing.item);
      const qtyText =
        readoutLang === "as"
          ? ing.qty_assamese || extractString(ing.qty)
          : extractString(ing.qty);
      addQueueItem(`${itemText}, ${qtyText}.`, null);
    });

    // 3. Step by step preparation
    const stepsIntro =
      readoutLang === "as" ? "প্ৰস্তুত প্ৰণালী:" : "Preparation steps:";
    addQueueItem(stepsIntro, null);

    remedy.steps.forEach((step, idx) => {
      const stepObj = typeof step === "object" ? step : { en: step, as: step };
      const stepText = readoutLang === "as" ? stepObj.as : stepObj.en;
      addQueueItem(
        readoutLang === "as"
          ? `পদক্ষেপ ${idx + 1}: ${stepText}`
          : `Step ${idx + 1}: ${stepText}`,
        idx
      );
    });

    // 4. Dosage recommendation for selected family profile
    const dosageProfileText =
      familyProfile === "child"
        ? readoutLang === "as"
          ? remedy.dosage.child_assamese || extractString(remedy.dosage.child)
          : extractString(remedy.dosage.child)
        : familyProfile === "senior"
        ? readoutLang === "as"
          ? remedy.dosage.elderly_assamese || extractString(remedy.dosage.elderly)
          : extractString(remedy.dosage.elderly)
        : readoutLang === "as"
        ? remedy.dosage.adult_assamese || extractString(remedy.dosage.adult)
        : extractString(remedy.dosage.adult);

    addQueueItem(
      readoutLang === "as"
        ? `নিৰাপদ মাত্ৰা: ${dosageProfileText}`
        : `Safe dosage note: ${dosageProfileText}`,
      null
    );

    // 5. Red flag warning (read slower at 0.85 rate for emphasis)
    const redFlagIntro =
      readoutLang === "as"
        ? "মনত ৰাখিব লগীয়া সাৱধানবাণী: লক্ষণ তিনি দিনতকৈ বেছি থাকিলে বা উচ্চ জ্বৰ হ'লে ততাতৈয়াকৈ চিকিৎসকৰ ওচৰলৈ যাওক।"
        : "Important warning: If symptoms persist beyond 3 days or you experience high fever, consult a doctor immediately.";
    addQueueItem(redFlagIntro, null, 0.85);

    // Chain end of last utterance to reset state
    if (utterances.length > 0) {
      const last = utterances[utterances.length - 1];
      last.onend = () => {
        setIsPlaying(false);
        setIsPaused(false);
        setCurrentStepIdx(null);
        onActiveStepChange?.(null);
      };
    }

    utterancesRef.current = utterances;
    currentUtteranceIndexRef.current = 0;
    setIsPlaying(true);
    setIsPaused(false);

    // Speak all utterances
    utterances.forEach((u) => window.speechSynthesis.speak(u));
  };

  const togglePauseResume = () => {
    if (!isSupported) return;
    if (isPaused) {
      window.speechSynthesis.resume();
      setIsPaused(false);
    } else {
      window.speechSynthesis.pause();
      setIsPaused(true);
    }
  };

  if (!isSupported) return null;

  return (
    <div className="bg-amber-50/70 border border-amber-200/80 rounded-2xl p-3.5 sm:p-4 my-4 no-print flex flex-col sm:flex-row sm:items-center justify-between gap-3">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-amber-600 text-white flex items-center justify-center shrink-0 shadow-xs">
          <Volume2 className="w-5 h-5" />
        </div>
        <div>
          <div className="text-xs font-bold text-stone-900 flex items-center gap-2">
            <span>
              {readoutLang === "as" ? "শ্ৰৱণ নিৰ্দেশনা (Audio Readout)" : "Listen to Preparation Steps"}
            </span>
            {isPlaying && (
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
            )}
          </div>
          <div className="text-[11px] text-stone-500">
            {isPlaying
              ? currentStepIdx !== null
                ? `Reading Step ${currentStepIdx + 1}...`
                : "Narrating remedy details..."
              : "Built-in voice narration of ingredients, steps, and safety."}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 shrink-0 flex-wrap">
        {/* Language selector toggle */}
        {!isPlaying && (
          <div className="flex items-center bg-white rounded-xl p-0.5 border border-stone-200 text-xs">
            <button
              onClick={() => setReadoutLang("en")}
              className={`px-2.5 py-1 rounded-lg font-bold transition ${
                readoutLang === "en"
                  ? "bg-amber-100 text-amber-900"
                  : "text-stone-600 hover:text-stone-900"
              }`}
            >
              English
            </button>
            <button
              onClick={() => setReadoutLang("as")}
              className={`px-2.5 py-1 rounded-lg font-bold transition ${
                readoutLang === "as"
                  ? "bg-amber-100 text-amber-900"
                  : "text-stone-600 hover:text-stone-900"
              }`}
            >
              অসমীয়া
            </button>
          </div>
        )}

        {/* Play / Stop controls */}
        {!isPlaying ? (
          <button
            onClick={startAudio}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-amber-700 hover:bg-amber-800 text-white shadow-xs transition"
          >
            <Play className="w-3.5 h-3.5 fill-white" />
            <span>{readoutLang === "as" ? "শুনি লওক" : "Listen"}</span>
          </button>
        ) : (
          <div className="flex items-center gap-1.5">
            <button
              onClick={togglePauseResume}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-stone-100 hover:bg-stone-200 text-stone-800 transition"
            >
              {isPaused ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
              <span>{isPaused ? "Resume" : "Pause"}</span>
            </button>

            <button
              onClick={stopAudio}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-red-100 hover:bg-red-200 text-red-800 transition"
            >
              <Square className="w-3 h-3 fill-red-800" />
              <span>Stop</span>
            </button>
          </div>
        )}
      </div>

      {voiceNotice && isPlaying && (
        <div className="w-full text-[10px] text-amber-800 italic mt-1 font-mono">
          ℹ️ {voiceNotice}
        </div>
      )}
    </div>
  );
};
