"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useNiramayStore } from "@/lib/store";
import { useMounted } from "@/hooks/useMounted";
import { useBodyScrollLock } from "@/hooks/useBodyScrollLock";
import { analyzeUserQuery, AssistantAnalysisResult } from "@/lib/assistant";
import { Remedy } from "@/lib/schema";
import { extractString } from "@/lib/utils";
import { EmergencySpeedDial } from "@/components/emergency/EmergencySpeedDial";
import { NiramayLogo } from "@/components/brand/NiramayLogo";
import {
  Mic,
  MicOff,
  Send,
  X,
  Sparkles,
  AlertTriangle,
  ArrowRight,
  ShieldAlert,
  Clock,
  CheckCircle2,
  RefreshCw,
  HelpCircle,
  Info,
} from "lucide-react";

interface Message {
  id: string;
  sender: "user" | "assistant";
  text: string;
  analysis?: AssistantAnalysisResult;
  timestamp: string;
}

const SAMPLE_PROMPTS = [
  {
    as: "মোৰ ২ দিন ধৰি ডিঙিটো খচখচাই আছে, কি কৰোঁ?",
    en: "My throat has been scratchy for 2 days, what can I do?",
  },
  {
    as: "খোৱাৰ পিছত পেটত খুব গেছ আৰু বুকুপোৰা হৈছে",
    en: "Severe gas and heartburn after heavy dinner",
  },
  {
    as: "৩ দিনতকৈ বেছি সময় শুকান কাহ আৰু কফ লাগি আছে",
    en: "Dry cough and chest congestion for more than 3 days",
  },
  {
    as: "হঠাতে মূৰ কামোৰণি আৰু চাইনাছ বন্ধ হৈছে",
    en: "Sudden headache and blocked sinus cold",
  },
];

function createMessageId(prefix: string) {
  return `${prefix}_${Math.random().toString(36).substring(2, 9)}`;
}

function getCurrentTimeString() {
  const d = new Date();
  const h = d.getHours().toString().padStart(2, "0");
  const m = d.getMinutes().toString().padStart(2, "0");
  return `${h}:${m}`;
}

export const NiramayAssistantModal: React.FC = () => {
  const mounted = useMounted();
  const { isAssistantOpen, setAssistantOpen, languageMode } = useNiramayStore();
  const currentMode = mounted ? languageMode : "bilingual";
  const isEn = currentMode === "en";
  const isAs = currentMode === "as";

  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome-msg",
      sender: "assistant",
      text: "Namaskar! / নমস্কাৰ! I am Niramay AI. Describe your ailment in voice or text (English or Assamese). I match your symptoms directly to our verified traditional remedy database.",
      timestamp: "Just now",
    },
  ]);
  const [isListening, setIsListening] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(false);
  const [micLanguage, setMicLanguage] = useState<"as-IN" | "en-IN">("as-IN");

  const recognitionRef = useRef<any>(null);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  // Check speech recognition support once mounted (deferred to avoid cascading render)
  useEffect(() => {
    if (typeof window !== "undefined") {
      const hasSpeech = Boolean(
        (window as any).SpeechRecognition ||
        (window as any).webkitSpeechRecognition
      );
      if (hasSpeech) {
        const frameId = requestAnimationFrame(() => {
          setSpeechSupported(true);
        });
        return () => cancelAnimationFrame(frameId);
      }
    }
  }, []);

  // Auto-scroll chat
  useEffect(() => {
    if (isAssistantOpen) {
      chatBottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isAssistantOpen]);

  const handleStartListening = () => {
    if (!speechSupported) return;

    try {
      const SpeechRecognition =
        (window as any).SpeechRecognition ||
        (window as any).webkitSpeechRecognition;

      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      // Try Assamese with fallback
      recognition.lang = micLanguage;

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        if (transcript) {
          setInput(transcript);
          sendMessage(transcript);
        }
      };

      recognition.onerror = (e: any) => {
        console.warn("Speech recognition error:", e);
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
      recognition.start();
    } catch (err) {
      console.error(err);
      setIsListening(false);
    }
  };

  const handleStopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  const sendMessage = (textToSend?: string) => {
    const q = (textToSend ?? input).trim();
    if (!q) return;

    const timeStr = getCurrentTimeString();
    const userMsg: Message = {
      id: createMessageId("user"),
      sender: "user",
      text: q,
      timestamp: timeStr,
    };

    const analysis = analyzeUserQuery(q);
    const replyText = isAs
      ? analysis.conversationalReply.as
      : isEn
      ? analysis.conversationalReply.en
      : `${analysis.conversationalReply.en}\n\n${analysis.conversationalReply.as}`;

    const assistantMsg: Message = {
      id: createMessageId("assistant"),
      sender: "assistant",
      text: replyText,
      analysis,
      timestamp: timeStr,
    };

    setMessages((prev) => [...prev, userMsg, assistantMsg]);
    setInput("");
  };

  useBodyScrollLock(isAssistantOpen);

  if (!isAssistantOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-900/60 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl border border-amber-200 flex flex-col niramay-modal-fit-85 overflow-hidden">
        {/* Header */}
        <div className="px-5 py-4 bg-gradient-to-r from-amber-800 to-emerald-900 text-onbrand flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <NiramayLogo size={56} variant="full" className="ring-amber-300/40" />
            <div>
              <div className="flex items-center gap-2">
                <span className="font-serif font-black text-base">
                  AI Assistant
                </span>
                <span className="text-[10px] bg-emerald-500/30 text-emerald-200 font-bold px-2 py-0.5 rounded-full border border-emerald-400/30">
                  100% On-Device
                </span>
              </div>
              <div className="text-[11px] text-amber-200/90 font-medium">
                {isAs
                  ? "পৰম্পৰাগত উপচাৰ ভঁৰালৰ সৈতে পোনপটীয়া সংযোগ"
                  : "Voice & Text Local Natural Language Matcher"}
              </div>
            </div>
          </div>

          <button
            onClick={() => setAssistantOpen(false)}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/25 flex items-center justify-center text-onbrand transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Transparent Capability Banner */}
        <div className="bg-amber-50 px-4 py-2 border-b border-amber-200/80 text-[11px] text-amber-950 flex items-center gap-2 shrink-0">
          <Info className="w-3.5 h-3.5 text-amber-800 shrink-0" />
          <span>
            {isAs
              ? "নিৰাময় এআই-য়ে আপোনাৰ কথা পৰীক্ষিত ঘৰুৱা উপচাৰ ভঁৰালৰ সৈতে মিলাই চায় — ই কোনো নতুন চিকিৎসা উদ্ভাৱন নকৰে।"
              : "Niramay AI matches your natural words to our verified remedy database — it does not hallucinate new medical advice."}
          </span>
        </div>

        {/* Chat Message Stream */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col ${
                msg.sender === "user" ? "items-end" : "items-start"
              }`}
            >
              <div
                className={`max-w-[88%] sm:max-w-[80%] rounded-2xl p-4 text-xs sm:text-sm ${
                  msg.sender === "user"
                    ? "bg-amber-700 text-onbrand rounded-tr-none shadow-xs"
                    : "bg-stone-50 border border-stone-200 text-stone-900 rounded-tl-none shadow-xs"
                }`}
              >
                <div className="whitespace-pre-line leading-relaxed font-sans">
                  {msg.text}
                </div>

                {/* If Assistant returned Analysis with Red Flags */}
                {msg.analysis?.isRedFlagSeverity && (
                  <div className="mt-3 p-3 bg-red-50 border-2 border-red-300 rounded-xl text-red-950 text-xs">
                    <div className="flex items-center gap-1.5 font-bold mb-1">
                      <ShieldAlert className="w-4 h-4 text-red-700 shrink-0" />
                      <span>
                        {isAs ? "চিকিৎসকৰ পৰামৰ্শ অনিবাৰ্য্য" : "Medical Consultation Urged"}
                      </span>
                    </div>
                    <p className="text-[11px] leading-relaxed">
                      {isAs
                        ? msg.analysis.redFlagReason?.as
                        : msg.analysis.redFlagReason?.en}
                    </p>
                    <EmergencySpeedDial compact className="mt-2.5" />
                  </div>
                )}

                {/* If Low Confidence Safeguard Triggered */}
                {msg.analysis?.isLowConfidence && (
                  <div className="mt-3 pt-3 border-t border-stone-200/80">
                    <div className="text-[11px] font-bold text-stone-600 mb-2">
                      {isAs ? "বা তলৰ সততে হোৱা সমস্যাসমূহৰ পৰা বাছক:" : "Or tap a common symptom:"}
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {[
                        { en: "Stomach pain", as: "পেটৰ বিষ" },
                        { en: "Fever & chills", as: "জ্বৰ" },
                        { en: "Sore throat", as: "ডিঙিৰ বিষ" },
                        { en: "Cough", as: "কাহ" },
                        { en: "Acidity & gas", as: "গেছ / বুকুপোৰা" },
                        { en: "Headache", as: "মূৰৰ বিষ" },
                      ].map((item) => (
                        <button
                          key={item.en}
                          type="button"
                          onClick={() => sendMessage(isAs ? item.as : item.en)}
                          className="px-2.5 py-1 text-[11px] font-semibold bg-white border border-amber-300 text-amber-950 rounded-lg hover:bg-amber-100 transition shadow-2xs"
                        >
                          {isAs ? item.as : item.en}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Suggested Remedies Cards */}
                {msg.analysis?.suggestedRemedies &&
                  msg.analysis.suggestedRemedies.length > 0 && (
                    <div className="mt-4 pt-3 border-t border-stone-200/80 space-y-2">
                      <div className="text-[11px] font-bold uppercase text-stone-500 tracking-wider">
                        {isAs ? "পৰামৰ্শিত পৰীক্ষিত বিধান:" : "Suggested Verified Remedies:"}
                      </div>

                      <div className="grid grid-cols-1 gap-2">
                        {msg.analysis.suggestedRemedies.map((remedy) => (
                          <Link
                            key={remedy.id}
                            href={`/remedy/${remedy.id}`}
                            onClick={() => setAssistantOpen(false)}
                            className="p-3 rounded-xl bg-white hover:bg-amber-50/80 border border-stone-200 hover:border-amber-300 transition flex items-center justify-between group shadow-2xs"
                          >
                            <div>
                              <div className="text-xs font-bold text-stone-900 group-hover:text-amber-900">
                                {extractString(remedy.name)}
                              </div>
                              <div className="text-[11px] font-semibold text-emerald-800">
                                {remedy.name_assamese}
                              </div>
                            </div>
                            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-800">
                              <span>View</span>
                              <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition" />
                            </span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}

                <div
                  className={`text-[9px] mt-2 font-mono ${
                    msg.sender === "user" ? "text-amber-200" : "text-stone-400"
                  }`}
                >
                  {msg.timestamp}
                </div>
              </div>
            </div>
          ))}
          <div ref={chatBottomRef} />
        </div>

        {/* Quick Sample Prompts */}
        {messages.length <= 2 && (
          <div className="px-4 py-2 bg-stone-50/80 border-t border-stone-200 flex items-center gap-1.5 overflow-x-auto text-[11px] shrink-0">
            <span className="text-stone-400 font-semibold shrink-0">
              Try:
            </span>
            {SAMPLE_PROMPTS.map((sample, idx) => (
              <button
                key={idx}
                onClick={() => sendMessage(isAs ? sample.as : sample.en)}
                className="px-2.5 py-1 rounded-lg bg-white border border-stone-200 text-stone-700 hover:border-amber-300 hover:text-amber-900 shrink-0 transition"
              >
                {isAs ? sample.as : sample.en}
              </button>
            ))}
          </div>
        )}

        {/* Input Controls */}
        <div className="p-3 sm:p-4 bg-white border-t border-stone-200 shrink-0">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              sendMessage();
            }}
            className="flex items-center gap-2"
          >
            {/* Mic toggle */}
            {speechSupported && (
              <button
                type="button"
                onClick={isListening ? handleStopListening : handleStartListening}
                className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 transition ${
                  isListening
                    ? "bg-red-600 text-onbrand animate-pulse"
                    : "bg-amber-100 hover:bg-amber-200 text-amber-900"
                }`}
                title={isListening ? "Listening... Click to stop" : "Speak your symptoms"}
              >
                {isListening ? (
                  <MicOff className="w-4 h-4" />
                ) : (
                  <Mic className="w-4 h-4" />
                )}
              </button>
            )}

            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={
                isListening
                  ? "Listening to voice input..."
                  : isAs
                  ? "আপোনাৰ সমস্যাটো বৰ্ণনা কৰক..."
                  : "Describe symptoms in English or Assamese..."
              }
              className="flex-1 px-4 py-2.5 text-xs sm:text-sm bg-stone-50 border border-stone-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-amber-500"
            />

            <button
              type="submit"
              disabled={!input.trim()}
              className="w-10 h-10 rounded-2xl bg-amber-700 hover:bg-amber-800 disabled:opacity-40 text-onbrand flex items-center justify-center shrink-0 transition"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

          {/* Voice Language Switcher */}
          {speechSupported && (
            <div className="flex items-center justify-between mt-2 text-[10px] text-stone-500 px-1">
              <span className="flex items-center gap-1">
                <span>Mic Engine:</span>
                <button
                  type="button"
                  onClick={() =>
                    setMicLanguage(micLanguage === "as-IN" ? "en-IN" : "as-IN")
                  }
                  className="font-bold text-amber-800 underline ml-1"
                >
                  {micLanguage === "as-IN" ? "Assamese / Indian English" : "English (India)"}
                </button>
              </span>
              <span>Web Speech API (Private & Local)</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
