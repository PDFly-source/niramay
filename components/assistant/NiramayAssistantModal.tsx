"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useNiramayStore } from "@/lib/store";
import { useMounted } from "@/hooks/useMounted";
import { useBodyScrollLock } from "@/hooks/useBodyScrollLock";
import { respondToQuery, NiramayAIResponse } from "@/lib/ai/engine";
import { extractString } from "@/lib/utils";
import { EmergencySpeedDial } from "@/components/emergency/EmergencySpeedDial";
import { NiramayLogo } from "@/components/brand/NiramayLogo";
import { MotionConfig, motion, AnimatePresence } from "motion/react";
import {
  Mic,
  Send,
  X,
  ArrowRight,
  ShieldAlert,
  RefreshCw,
  Leaf,
  FlaskConical,
  WifiOff,
  Wifi,
  ChevronRight,
  Bot,
} from "lucide-react";

interface Message {
  id: string;
  sender: "user" | "assistant";
  text: string;
  response?: NiramayAIResponse;
  timestamp: string;
}

const SAMPLE_PROMPTS = [
  { as: "মোৰ পেট বেয়া", en: "I have an upset stomach" },
  { as: "আদা কেনেকৈ ব্যৱহাৰ কৰা হয়?", en: "What is ginger used for?" },
  { as: "গেছ হলে কি কৰিব?", en: "Show me remedies for gas" },
  { as: "জ্বৰ আৰু কঁপনি লাগিছে", en: "Fever and chills since morning" },
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

/** Convenience: pick text per language mode (en / as / bilingual). */
function pick(mode: string, en: string, as: string) {
  if (mode === "as") return as;
  if (mode === "en") return en;
  return `${en}\n\n${as}`;
}

export const NiramayAssistantModal: React.FC = () => {
  const mounted = useMounted();
  const {
    isAssistantOpen,
    setAssistantOpen,
    setPaletteOpen,
    languageMode,
    assistantPendingQuery,
    setAssistantPendingQuery,
  } = useNiramayStore();
  const [isOnline, setIsOnline] = useState(true);
  useEffect(() => {
    if (typeof navigator === "undefined") return;
    const update = () => setIsOnline(navigator.onLine);
    update();
    window.addEventListener("online", update);
    window.addEventListener("offline", update);
    return () => {
      window.removeEventListener("online", update);
      window.removeEventListener("offline", update);
    };
  }, []);
  const currentMode = mounted ? languageMode : "bilingual";
  const isEn = currentMode === "en";
  const isAs = currentMode === "as";

  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [thinking, setThinking] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [micLanguage, setMicLanguage] = useState<"as-IN" | "en-IN">("as-IN");
  const [voiceStatus, setVoiceStatus] = useState<"idle" | "listening" | "denied" | "error">("idle");
  const [showNewPill, setShowNewPill] = useState(false);
  const streamRef = useRef<HTMLDivElement>(null);
  const isNearBottomRef = useRef(true);

  const recognitionRef = useRef<any>(null);
  const chatBottomRef = useRef<HTMLDivElement>(null);
  const pendingHandledRef = useRef(false);

  // Voice capability probe (lazy client-only init; modal renders only when open)
  const [speechSupported] = useState(
    () =>
      typeof window !== "undefined" &&
      Boolean((window as any).SpeechRecognition || (window as any).webkitSpeechRecognition)
  );

  // Smart scroll (phase 2.1 #13): track near-bottom in a ref via a scroll
  // listener; the auto-scroll-vs-pill decision happens where messages are set.
  useEffect(() => {
    const el = streamRef.current;
    if (!el) return;
    const onScroll = () => {
      isNearBottomRef.current =
        el.scrollHeight - el.scrollTop - el.clientHeight < 80;
      if (isNearBottomRef.current) setShowNewPill(false);
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  const handleStartListening = () => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) return;
    const recognition = new SpeechRecognition();
    recognition.lang = micLanguage;
    recognition.interimResults = false;
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
      setIsListening(false);
    };
    recognition.onend = () => {
      setIsListening(false);
      if (voiceStatus === "listening") setVoiceStatus("idle");
    };
    recognition.onerror = (event: any) => {
      setIsListening(false);
      if (event?.error === "not-allowed" || event?.error === "service-not-allowed") {
        setVoiceStatus("denied");
      } else {
        setVoiceStatus("error");
      }
    };
    recognitionRef.current = recognition;
    setIsListening(true);
    setVoiceStatus("listening");
    recognition.start();
  };

  const handleStopListening = () => {
    recognitionRef.current?.stop?.();
    setIsListening(false);
    setVoiceStatus("idle");
  };

  const clearChat = () => setMessages([]);

  const sendMessage = (textToSend?: string) => {
    const q = (textToSend ?? input).trim();
    if (!q || thinking) return;

    const timeStr = getCurrentTimeString();
    const userMsg: Message = {
      id: createMessageId("user"),
      sender: "user",
      text: q,
      timestamp: timeStr,
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setThinking(true);

    // Smart scroll: user's own message always follows the stream.
    setTimeout(() => {
      chatBottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
    }, 0);

    // Local engine compute — 100% on-device. The short delay only lets the
    // honest "searching archive" indicator render; the engine is synchronous.
    setTimeout(() => {
      const response = respondToQuery(q);
      const replyText = pick(currentMode, response.replyEn, response.replyAs);
      const assistantMsg: Message = {
        id: createMessageId("assistant"),
        sender: "assistant",
        text: replyText,
        response,
        timestamp: getCurrentTimeString(),
      };
      setMessages((prev) => [...prev, assistantMsg]);
      setThinking(false);
      // Auto-scroll only if the user was already near the bottom;
      // otherwise surface the "New response" pill.
      if (isNearBottomRef.current) {
        chatBottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
      } else {
        setShowNewPill(true);
      }
    }, 550);
  };

  // Consume a quick-prompt queued from anywhere in the app (home hero, etc.)
  useEffect(() => {
    if (!isAssistantOpen || !assistantPendingQuery || pendingHandledRef.current) return;
    pendingHandledRef.current = true;
    const q = assistantPendingQuery;
    // wait one frame so the modal is mounted and the message list exists
    setTimeout(() => {
      setAssistantPendingQuery(null);
      pendingHandledRef.current = false;
      sendMessage(q);
    }, 80);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAssistantOpen, assistantPendingQuery]);

  useBodyScrollLock(isAssistantOpen);

  // Escape closes the dialog; Tab stays trapped inside it.
  const dialogRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (!isAssistantOpen) return;
    const t = setTimeout(() => inputRef.current?.focus(), 60);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        setAssistantOpen(false);
        return;
      }
      if (e.key !== "Tab") return;
      const focusables = dialogRef.current?.querySelectorAll<HTMLElement>(
        'button, input, a[href], [tabindex]:not([tabindex="-1"])'
      );
      if (!focusables || focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      clearTimeout(t);
      window.removeEventListener("keydown", onKey);
    };
  }, [isAssistantOpen, setAssistantOpen]);

  if (!isAssistantOpen) return null;

  const understandingFor = (m: Message) =>
    m.response ? pick(currentMode, m.response.understandingEn, m.response.understandingAs) : "";

  return (
    <MotionConfig reducedMotion="user">
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-900/60 backdrop-blur-xs">
        <AnimatePresence>
          <motion.div
            key="assistant-panel"
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 8 }}
            transition={{ type: "spring", stiffness: 380, damping: 32 }}
            className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl border border-amber-200 flex flex-col niramay-modal-fit-85 overflow-hidden relative"
            role="dialog"
            aria-modal="true"
            aria-label="Niramay AI assistant"
            ref={dialogRef}
          >
            {/* Header */}
            <div className="px-5 py-4 bg-gradient-to-r from-amber-800 to-emerald-900 text-onbrand flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <NiramayLogo size={56} variant="full" className="ring-amber-300/40" />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-serif font-black text-base">Niramay AI</span>
                    <span className="inline-flex items-center gap-1 text-[10px] bg-emerald-500/30 text-emerald-200 font-bold px-2 py-0.5 rounded-full border border-emerald-400/30">
                      {isOnline ? <Wifi className="w-2.5 h-2.5" /> : <WifiOff className="w-2.5 h-2.5" />}
                      {isAs ? "স্থানীয় জ্ঞান • অফলাইনতো চলে" : "Local knowledge • Works offline"}
                    </span>
                  </div>
                  <div className="text-[11px] text-amber-200/90 font-medium">
                    {isAs
                      ? "উপচাৰ, গছ-গছনি আৰু স্বাস্থ্যৰ বিষয়ে সোধক"
                      : "Ask about remedies, plants, symptoms & wellness"}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                {messages.length > 0 && (
                  <button
                    type="button"
                    onClick={clearChat}
                    title={isAs ? "কথা-বাৰ্তা পৰিষ্কাৰ কৰক" : "Clear chat"}
                    aria-label={isAs ? "কথা-বাৰ্তা পৰিষ্কাৰ কৰক" : "Clear chat"}
                    className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/25 flex items-center justify-center text-onbrand transition"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                  </button>
                )}
                <button
                  onClick={() => setAssistantOpen(false)}
                  aria-label={isAs ? "বন্ধ কৰক" : "Close"}
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/25 flex items-center justify-center text-onbrand transition"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Capability banner (honest, unchanged principle) */}
            <div className="bg-amber-50 px-4 py-2 border-b border-amber-200/80 text-[11px] text-amber-950 flex items-center gap-2 shrink-0">
              <Bot className="w-3.5 h-3.5 text-amber-800 shrink-0" />
              <span>
                {isAs
                  ? "নিৰাময় এআই-য়ে আপোনাৰ কথা পৰীক্ষিত ঘৰুৱা উপচাৰ ভঁৰালৰ সৈতে মিলাই চায় — ই কোনো নতুন চিকিৎসা উদ্ভাৱন নকৰে।"
                  : "Niramay AI matches your natural words to our verified remedy database — it does not hallucinate new medical advice."}
              </span>
            </div>

            {/* New-response pill when reading older content */}
            {showNewPill && (
              <div className="absolute right-4 bottom-24 z-10">
                <button
                  type="button"
                  onClick={() => {
                    chatBottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
                    setShowNewPill(false);
                  }}
                  className="px-3 py-1.5 text-[11px] font-bold rounded-full bg-amber-700 text-onbrand shadow-lg hover:bg-amber-800 transition"
                >
                  {isAs ? "নতুন উত্তৰ ↓" : "New response ↓"}
                </button>
              </div>
            )}
            {/* Chat message stream (announced politely to screen readers) */}
            <div
              ref={streamRef}
              role="log"
              aria-live="polite"
              aria-relevant="additions"
              className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4"
            >
              {messages.length === 0 && !thinking && (
                <div className="text-center py-8">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-amber-100 border border-amber-200 mb-3">
                    <Bot className="w-7 h-7 text-amber-800" />
                  </div>
                  <div className="font-serif font-bold text-stone-800 text-sm">
                    {isAs ? "নিৰাময় এআই-ক সোধক" : "Ask Niramay AI"}
                  </div>
                  <div className="text-[11px] text-stone-500 mt-1 max-w-xs mx-auto">
                    {isAs
                      ? "লক্ষণ, উপচাৰ, গছ-গছনি বা সঁজুলিৰ বিষয়ে যিকোনো ভাষাত সোধক — ইংৰাজী, অসমীয়া বা ৰোমান অসমীয়া।"
                      : "Ask about symptoms, remedies, plants, or tools — in English, Assamese, or Roman Assamese."}
                  </div>
                </div>
              )}

              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.22, ease: "easeOut" }}
                  className={`flex flex-col ${
                    msg.sender === "user" ? "items-end" : "items-start"
                  }`}
                >
                  <div
                    className={`max-w-[92%] sm:max-w-[85%] rounded-2xl p-4 text-xs sm:text-sm ${
                      msg.sender === "user"
                        ? "bg-amber-700 text-onbrand rounded-tr-none shadow-xs"
                        : "bg-stone-50 border border-stone-200 text-stone-900 rounded-tl-none shadow-xs w-full"
                    }`}
                  >
                    {/* Understanding headline */}
                    {msg.sender === "assistant" && msg.response && (
                      <div className="flex items-center gap-1.5 mb-2 pb-2 border-b border-stone-200/80">
                        <span className="text-[10px] font-black uppercase tracking-wider text-emerald-800">
                          {isAs ? "বুজি পোৱা গ'ল" : "Understood"}
                        </span>
                        <span className="text-[11px] font-semibold text-stone-700 truncate">
                          {understandingFor(msg)}
                        </span>
                      </div>
                    )}

                    <div className="whitespace-pre-line leading-relaxed font-sans">
                      {msg.text}
                    </div>

                    {/* Health-safety escalation — SAFETY FIRST, never buried */}
                    {msg.response?.redFlag && (
                      <div className="mt-3 p-3 bg-red-50 border-2 border-red-300 rounded-xl text-red-950 text-xs">
                        <div className="flex items-center gap-1.5 font-bold mb-1">
                          <ShieldAlert className="w-4 h-4 text-red-700 shrink-0" />
                          <span>
                            {isAs ? "চিকিৎসকৰ পৰামৰ্শ অনিবাৰ্য্য" : "Medical Consultation Urged"}
                          </span>
                        </div>
                        <p className="text-[11px] leading-relaxed">
                          {isAs ? msg.response.redFlagReason?.as : msg.response.redFlagReason?.en}
                        </p>
                        <EmergencySpeedDial compact className="mt-2.5" />
                      </div>
                    )}

                    {/* Plant / ingredient card */}
                    {msg.response?.plant && (
                      <div className="mt-3 p-3 rounded-xl bg-emerald-50/70 border border-emerald-200">
                        <div className="flex items-start gap-2">
                          <Leaf className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                          <div className="min-w-0">
                            <div className="text-xs font-bold text-emerald-950">
                              {isAs ? msg.response.plant.nameAs : msg.response.plant.nameEn}
                            </div>
                            <div className="text-[10px] italic text-emerald-800/80">
                              {msg.response.plant.botanicalName}
                            </div>
                            {(msg.response.plantCautionEn || msg.response.plantCautionAs) && (
                              <div className="text-[10px] text-stone-600 mt-1 leading-relaxed">
                                {isAs
                                  ? `সাৱধান: ${msg.response.plantCautionAs ?? msg.response.plantCautionEn}`
                                  : `Caution: ${msg.response.plantCautionEn ?? msg.response.plantCautionAs}`}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Verified remedy cards */}
                    {msg.response?.remedies && msg.response.remedies.length > 0 && (
                      <div className="mt-4 pt-3 border-t border-stone-200/80 space-y-2">
                        <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase text-stone-500 tracking-wider">
                          <FlaskConical className="w-3 h-3" />
                          <span>{isAs ? "নিৰাময়ৰ সমল:" : "Available Niramay content:"}</span>
                        </div>
                        <div className="grid grid-cols-1 gap-2">
                          {msg.response.remedies.map((remedy) => (
                            <Link
                              key={remedy.id}
                              href={`/remedy/${remedy.id}`}
                              onClick={() => setAssistantOpen(false)}
                              className="p-3 rounded-xl bg-white hover:bg-amber-50/80 border border-stone-200 hover:border-amber-300 transition flex items-center justify-between group shadow-2xs"
                            >
                              <div className="min-w-0">
                                <div className="text-xs font-bold text-stone-900 group-hover:text-amber-900 truncate">
                                  {extractString(remedy.name)}
                                </div>
                                <div className="text-[11px] font-semibold text-emerald-800 truncate">
                                  {remedy.name_assamese}
                                </div>
                              </div>
                              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-800 shrink-0">
                                <span>{isAs ? "চাওক" : "View"}</span>
                                <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition" />
                              </span>
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Navigation actions — always real routes (NEXT STEPS) */}
                    {msg.response?.actions && msg.response.actions.length > 0 && (
                      <div className="mt-3">
                        <div className="text-[11px] font-bold uppercase text-stone-500 tracking-wider mb-2">
                          {isAs ? "পৰৱৰ্তী পদক্ষেপ:" : "Next steps:"}
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {msg.response.actions.map((action) =>
                            action.type === "OPEN_SEARCH" ? (
                              <button
                                key={`${action.type}-${action.id}`}
                                type="button"
                                onClick={() => {
                                  setAssistantOpen(false);
                                  setPaletteOpen(true);
                                }}
                                className="inline-flex items-center gap-1 px-3 py-1.5 text-[11px] font-bold bg-emerald-800 text-emerald-50 rounded-xl hover:bg-emerald-900 transition shadow-2xs"
                              >
                                <span>{isAs ? action.labelAs : action.labelEn}</span>
                                <ChevronRight className="w-3 h-3" />
                              </button>
                            ) : (
                              <Link
                                key={`${action.type}-${action.id}`}
                                href={action.href}
                                onClick={() => setAssistantOpen(false)}
                                className="inline-flex items-center gap-1 px-3 py-1.5 text-[11px] font-bold bg-emerald-800 text-emerald-50 rounded-xl hover:bg-emerald-900 transition shadow-2xs"
                              >
                                <span>{isAs ? action.labelAs : action.labelEn}</span>
                                <ChevronRight className="w-3 h-3" />
                              </Link>
                            )
                          )}
                        </div>
                      </div>
                    )}

                    {/* Follow-up chips — trigger real local queries */}
                    {msg.response?.followUps && msg.response.followUps.length > 0 && (
                      <div className="mt-3 pt-3 border-t border-stone-200/80">
                        <div className="text-[11px] font-bold text-stone-600 mb-2">
                          {isAs ? "আৰু এইবোৰ সোধক:" : "You can also ask:"}
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {msg.response.followUps.map((fu) => (
                            <button
                              key={fu.en}
                              type="button"
                              onClick={() => sendMessage(fu.query)}
                              className="px-2.5 py-1 text-[11px] font-semibold bg-white border border-amber-300 text-amber-950 rounded-lg hover:bg-amber-100 transition shadow-2xs"
                            >
                              {isAs ? fu.as : fu.en}
                            </button>
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
                </motion.div>
              ))}

              {/* Thinking indicator — honest local search feedback */}
              {thinking && (
                <div className="flex items-start">
                  <div className="bg-stone-50 border border-stone-200 rounded-2xl rounded-tl-none px-4 py-3 flex items-center gap-2">
                    <span className="flex gap-1">
                      {[0, 1, 2].map((i) => (
                        <motion.span
                          key={i}
                          className="w-1.5 h-1.5 rounded-full bg-amber-700"
                          animate={{ opacity: [0.3, 1, 0.3] }}
                          transition={{ duration: 1, repeat: Infinity, delay: i * 0.18 }}
                        />
                      ))}
                    </span>
                    <span className="text-[11px] text-stone-500 font-medium">
                      {isAs ? "স্থানীয় ভঁৰাল বিচাৰি আছে…" : "Searching local archive…"}
                    </span>
                  </div>
                </div>
              )}
              <div ref={chatBottomRef} />
            </div>

            {/* Quick prompts (until first exchange) */}
            {messages.length === 0 && (
              <div className="px-4 py-2 bg-stone-50/80 border-t border-stone-200 flex items-center gap-1.5 overflow-x-auto text-[11px] shrink-0">
                <span className="text-stone-400 font-semibold shrink-0">
                  {isAs ? "চেষ্টা কৰক:" : "Try:"}
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

            {/* Input controls */}
            <div className="p-3 sm:p-4 bg-white border-t border-stone-200 shrink-0">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  sendMessage();
                }}
                className="flex items-center gap-2"
              >
                {speechSupported && (
                  <button
                    type="button"
                    onClick={isListening ? handleStopListening : handleStartListening}
                    className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 transition ${
                      isListening
                        ? "bg-red-100 border-2 border-red-400 text-red-700 animate-pulse"
                        : "bg-amber-50 border border-amber-200 text-amber-800 hover:bg-amber-100"
                    }`}
                    aria-label={isListening ? "Stop voice input" : "Start voice input"}
                  >
                    <Mic className="w-4 h-4" />
                  </button>
                )}

                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={
                    isListening
                      ? "Listening…"
                      : isAs
                      ? "লক্ষণ, উপচাৰ, গছ বা সঁজুলিৰ বিষয়ে সোধক…"
                      : "Ask in English, অসমীয়া, or Roman Assamese…"
                  }
                  className="flex-1 px-4 py-2.5 text-xs sm:text-sm bg-stone-50 border border-stone-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-amber-500"
                />

                <motion.button
                  type="submit"
                  disabled={!input.trim() || thinking}
                  whileTap={{ scale: 0.94 }}
                  className="w-10 h-10 rounded-2xl bg-amber-700 hover:bg-amber-800 disabled:opacity-40 text-onbrand flex items-center justify-center shrink-0 transition"
                  aria-label={isAs ? "পঠিয়াওক" : "Send"}
                >
                  <Send className="w-4 h-4" />
                </motion.button>
              </form>

              {/* Voice status — honest graceful states */}
              {voiceStatus === "denied" && (
                <div className="mt-2 text-[10px] text-red-700 font-semibold px-1">
                  {isAs ? "মাইক্ৰোফোনৰ অনুমতি প্ৰয়োজন।" : "Microphone permission is required."}
                </div>
              )}
              {voiceStatus === "error" && (
                <div className="mt-2 text-[10px] text-amber-800 font-semibold px-1">
                  {isAs ? "কণ্ঠ ইনপুট ব্যৰ্থ হ'ল — আকৌ চেষ্টা কৰক বা টাইপ কৰক।" : "Voice input failed — try again or type instead."}
                </div>
              )}
              {!speechSupported && (
                <div className="mt-2 text-[10px] text-stone-400 font-medium px-1">
                  {isAs ? "এই ব্ৰাউজাৰত কণ্ঠ ইনপুট সমৰ্থিত নহয় — টাইপ কৰি সোধক।" : "Voice input isn't supported on this browser — type instead."}
                </div>
              )}
              {/* Voice language switcher */}
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
          </motion.div>
        </AnimatePresence>
      </div>
    </MotionConfig>
  );
};
