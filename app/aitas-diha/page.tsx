"use client";

import React, { useState, useEffect, useRef } from "react";
import { niramayDB, JournalEntry } from "@/lib/db";
import { useNiramayStore } from "@/lib/store";
import { useMounted } from "@/hooks/useMounted";
import {
  BookHeart,
  Mic,
  Square,
  Play,
  Pause,
  Trash2,
  Share2,
  Download,
  Plus,
  Heart,
  ShieldCheck,
  Sparkles,
  Info,
  Calendar,
  User,
  Tag,
  CheckCircle2,
} from "lucide-react";

export default function AitasDihaPage() {
  const mounted = useMounted();
  const { languageMode } = useNiramayStore();
  const currentMode = mounted ? languageMode : "bilingual";
  const isAs = currentMode === "as";
  const isEn = currentMode === "en";

  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  // Form states
  const [title, setTitle] = useState("");
  const [contributor, setContributor] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("Digestive Care");
  const [tags, setTags] = useState("");

  // Audio recording states
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [recordingSeconds, setRecordingSeconds] = useState(0);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const timerRef = useRef<any>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  // Audio playback states for saved entries
  const [playingEntryId, setPlayingEntryId] = useState<string | null>(null);
  const audioElementRef = useRef<HTMLAudioElement | null>(null);

  // Copy/Share feedback
  const [sharedId, setSharedId] = useState<string | null>(null);

  const loadEntries = React.useCallback(async () => {
    const list = await niramayDB.getAllJournalEntries();
    setEntries(list);
    setLoading(false);
  }, []);

  // Load existing entries from IndexedDB on mount
  useEffect(() => {
    let active = true;
    niramayDB.getAllJournalEntries().then((list) => {
      if (active) {
        setEntries(list);
        setLoading(false);
      }
    });
    return () => {
      active = false;
    };
  }, []);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      mediaRecorderRef.current = recorder;
      audioChunksRef.current = [];

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          audioChunksRef.current.push(e.data);
        }
      };

      recorder.onstop = () => {
        const blob = new Blob(audioChunksRef.current, { type: "audio/webm" });
        setAudioBlob(blob);
        const url = URL.createObjectURL(blob);
        setAudioUrl(url);
        stream.getTracks().forEach((track) => track.stop());
      };

      recorder.start();
      setIsRecording(true);
      setRecordingSeconds(0);

      timerRef.current = setInterval(() => {
        setRecordingSeconds((prev) => prev + 1);
      }, 1000);
    } catch (err) {
      console.warn("Microphone access denied or unsupported:", err);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }
  };

  const handleSaveEntry = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    const newEntry: JournalEntry = {
      id: "diha_" + Math.random().toString(36).slice(2, 9),
      title: title.trim(),
      contributor: contributor.trim() || (isAs ? "আইতাৰ দিহা" : "Aita's Wisdom"),
      content: content.trim(),
      category,
      createdAt: Date.now(),
      hasAudio: Boolean(audioBlob),
      audioBlob: audioBlob || undefined,
      audioMimeType: audioBlob ? "audio/webm" : undefined,
      tags: tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
    };

    await niramayDB.saveJournalEntry(newEntry);

    // Reset form
    setTitle("");
    setContributor("");
    setContent("");
    setTags("");
    setAudioBlob(null);
    if (audioUrl) {
      URL.revokeObjectURL(audioUrl);
      setAudioUrl(null);
    }
    setIsFormOpen(false);
    loadEntries();
  };

  const handleDelete = async (id: string) => {
    await niramayDB.deleteJournalEntry(id);
    loadEntries();
  };

  const handlePlayAudio = (entry: JournalEntry) => {
    if (!entry.audioBlob) return;

    if (playingEntryId === entry.id) {
      audioElementRef.current?.pause();
      setPlayingEntryId(null);
    } else {
      const url = URL.createObjectURL(entry.audioBlob);
      const audio = new Audio(url);
      audioElementRef.current = audio;
      setPlayingEntryId(entry.id);

      audio.onended = () => {
        setPlayingEntryId(null);
        URL.revokeObjectURL(url);
      };

      audio.play().catch(() => setPlayingEntryId(null));
    }
  };

  const handleShare = async (entry: JournalEntry) => {
    const text = `🌿 *${entry.title}*\n_${entry.contributor}_\n\n${entry.content}\n\n— Niramay Aita's Diha (পৰিয়ালৰ দিহা)`;
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(text);
        setSharedId(entry.id);
        setTimeout(() => setSharedId(null), 2500);
      } catch {
        // ignore
      }
    }
  };

  const formatSecs = (s: number) => {
    const mins = Math.floor(s / 60);
    const rem = s % 60;
    return `${mins}:${rem < 10 ? "0" : ""}${rem}`;
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-14">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold">
              <BookHeart className="w-3.5 h-3.5 text-amber-700" />
              <span>{isAs ? "আইতাৰ দিহা আৰু পৰিয়ালৰ জ্ঞান" : "Aita's Diha Journal"}</span>
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
              <span>{isAs ? "১০০% ব্যক্তিগত আৰু ডিভাইচত সংৰক্ষিত" : "100% Private to Your Device"}</span>
            </div>
          </div>

          <h1 className="text-3xl sm:text-5xl font-serif font-black text-stone-900 tracking-tight">
            {isAs
              ? "আইতাৰ দিহা: পৰিয়াল আৰু গাঁৱৰ বনৌষধি দিনলিপি"
              : isEn
              ? "Aita's Diha: Private Family Wisdom Journal"
              : "Aita's Diha / Local Wisdom Journal (আইতাৰ দিহা)"}
          </h1>
          <p className="text-sm sm:text-base text-stone-600 mt-2 max-w-2xl leading-relaxed">
            {isAs
              ? "আপোনাৰ আইতা, মা বা গাঁৱৰ বয়োজ্যেষ্ঠসকলে কোৱা ঘৰুৱা বিধান, মাত্ৰা আৰু দিহাসমূহ নিজৰ ফোনত ভয়েচ ৰেকৰ্ডিং বা লিখিতভাৱে সংৰক্ষণ কৰি ৰাখক।"
              : "Record voice notes and write private family remedies passed down through generations. Stored 100% locally on your device in offline IndexedDB."}
          </p>
        </div>

        <button
          onClick={() => setIsFormOpen(!isFormOpen)}
          className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-amber-700 hover:bg-amber-800 text-white font-bold text-xs sm:text-sm shadow-md transition shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>{isAs ? "+ নতুন দিহা যোগ কৰক" : "+ Add Family Remedy"}</span>
        </button>
      </div>

      {/* Honest Privacy Notice Banner */}
      <div className="bg-amber-50 rounded-2xl p-4 border border-amber-200 mb-8 flex items-start gap-3 text-xs text-amber-950">
        <Info className="w-4 h-4 text-amber-800 shrink-0 mt-0.5" />
        <div className="leading-relaxed">
          <span className="font-bold">
            {isAs ? "ব্যক্তিগত দিনলিপি নীতি:" : "Private Keepsake Note:"}{" "}
          </span>
          {isAs
            ? "আপোনাৰ ইয়াত লিখা বা ৰেকৰ্ড কৰা সকলো দিহা কেৱল আপোনাৰ ব্ৰাউজাৰৰ নিৰাপদ IndexedDB মেমৰীত সংৰক্ষিত থাকে। কোনো ছাৰ্ভাৰ বা বাহিৰৰ ব্যক্তিলৈ আপলোড নহয়।"
            : "All journal entries and voice recordings stay 100% private in your device's local IndexedDB. They are never transmitted or published to any external server."}
        </div>
      </div>

      {/* Add New Remedy Modal / Form */}
      {isFormOpen && (
        <form
          onSubmit={handleSaveEntry}
          className="bg-white rounded-3xl p-6 sm:p-8 border border-amber-300 shadow-xl mb-10 space-y-4 animate-in fade-in"
        >
          <h2 className="text-lg font-serif font-black text-stone-900 pb-2 border-b border-stone-100 flex items-center gap-2">
            <span>✍️</span>
            <span>{isAs ? "নতুন পৰম্পৰাগত দিহা লিপিবদ্ধ কৰক" : "Write a New Family Remedy"}</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">
                {isAs ? "বিধানৰ নাম / শিৰোনাম *" : "Remedy Title *"}
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder={isAs ? "যেনে- কাহৰ বাবে আদা আৰু জালুকৰ ৰস" : "e.g., Ginger & Pepper syrup for dry cough"}
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">
                {isAs ? "কাৰ পৰা পোৱা? (আইতা, মা, আদি)" : "Passed down by (Who told you?)"}
              </label>
              <input
                type="text"
                value={contributor}
                onChange={(e) => setContributor(e.target.value)}
                placeholder={isAs ? "যেনে- আইতা (মালতী বৰুৱা)" : "e.g., Aita (Grandmother)"}
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1">
              {isAs ? "প্ৰস্তুত প্ৰণালী আৰু মাত্ৰা *" : "Preparation Method & Dosages *"}
            </label>
            <textarea
              required
              rows={4}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder={
                isAs
                  ? "উপাদানৰ জোখ, কেনেকৈ ৰান্ধিব বা বটা কৰিব, আৰু কিমান বাৰ খাব..."
                  : "Detail the ingredients, preparation steps, and dosage cautions..."
              }
              className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20"
            />
          </div>

          {/* Voice Note Recorder */}
          <div className="bg-amber-50/60 p-4 rounded-2xl border border-amber-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-amber-950 flex items-center gap-1.5">
                <Mic className="w-4 h-4 text-amber-700" />
                <span>{isAs ? "আইতাৰ মুখৰ কথন (ভয়েচ ৰেকৰ্ডিং):" : "Record Voice Note (Optional):"}</span>
              </span>
              {isRecording && (
                <span className="text-xs font-mono font-bold text-red-600 animate-pulse">
                  ● Recording: {formatSecs(recordingSeconds)}
                </span>
              )}
            </div>

            <div className="flex items-center gap-3">
              {!isRecording ? (
                <button
                  type="button"
                  onClick={startRecording}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold transition"
                >
                  <Mic className="w-3.5 h-3.5" />
                  <span>{isAs ? "ৰেকৰ্ড আৰম্ভ কৰক" : "Start Recording"}</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={stopRecording}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold transition animate-pulse"
                >
                  <Square className="w-3.5 h-3.5" />
                  <span>{isAs ? "ৰেকৰ্ড বন্ধ কৰক" : "Stop Recording"}</span>
                </button>
              )}

              {audioUrl && (
                <div className="flex items-center gap-2">
                  <audio src={audioUrl} controls className="h-8 max-w-[200px]" />
                  <span className="text-xs font-semibold text-emerald-800">✓ Recorded</span>
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-3">
            <button
              type="button"
              onClick={() => setIsFormOpen(false)}
              className="px-4 py-2 rounded-xl border border-stone-300 text-stone-700 font-bold text-xs"
            >
              {isAs ? "বাতিল" : "Cancel"}
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-amber-700 hover:bg-amber-800 text-white font-bold text-xs shadow-md transition"
            >
              {isAs ? "দিনলিপিত সংৰক্ষণ কৰক" : "Save to Journal"}
            </button>
          </div>
        </form>
      )}

      {/* Journal Entries List */}
      {loading ? (
        <div className="text-center py-12 text-stone-400 text-xs">
          Loading your journal...
        </div>
      ) : entries.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-3xl border border-dashed border-amber-300 p-8">
          <BookHeart className="w-12 h-12 text-amber-300 mx-auto mb-3" />
          <h3 className="text-base font-bold text-stone-800">
            {isAs ? "আপোনাৰ দিনলিপিত কোনো দিহা নাই" : "Your family journal is empty"}
          </h3>
          <p className="text-xs text-stone-500 max-w-md mx-auto mt-1 leading-relaxed">
            {isAs
              ? "ওপৰৰ '+ নতুন দিহা যোগ কৰক' বুটামত টিপি আপোনাৰ পৰিয়ালৰ প্ৰাচীন ঘৰুৱা চিকিৎসা সংৰক্ষণ কৰক।"
              : "Tap '+ Add Family Remedy' above to preserve your grandmother's secret home remedies before they fade from memory."}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {entries.map((item) => {
            const isPlaying = playingEntryId === item.id;
            const dateStr = new Date(item.createdAt).toLocaleDateString();

            return (
              <div
                key={item.id}
                className="bg-white rounded-3xl p-6 border border-amber-200/90 shadow-xs hover:shadow-md transition flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 bg-amber-100 px-2.5 py-0.5 rounded-full">
                        {item.contributor}
                      </span>
                      <h3 className="text-base sm:text-lg font-bold text-stone-900 mt-1">
                        {item.title}
                      </h3>
                    </div>

                    <button
                      onClick={() => handleDelete(item.id)}
                      className="p-1.5 text-stone-300 hover:text-red-500 rounded-lg transition"
                      title="Delete entry"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <p className="text-xs text-stone-700 leading-relaxed whitespace-pre-line mt-2">
                    {item.content}
                  </p>

                  {/* Audio Player if entry has recorded voice */}
                  {item.hasAudio && (
                    <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between bg-amber-50/50 p-2.5 rounded-2xl">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handlePlayAudio(item)}
                          className="w-8 h-8 rounded-xl bg-amber-700 text-white flex items-center justify-center transition shadow-2xs hover:bg-amber-800"
                        >
                          {isPlaying ? (
                            <Pause className="w-4 h-4" />
                          ) : (
                            <Play className="w-4 h-4 fill-white ml-0.5" />
                          )}
                        </button>
                        <span className="text-xs font-bold text-amber-950">
                          {isPlaying
                            ? isAs
                              ? "কথা শুনি থকা হৈছে..."
                              : "Playing Voice Note..."
                            : isAs
                            ? "আইতাৰ কথা শুনক"
                            : "Listen to Voice Note"}
                        </span>
                      </div>
                      <Mic className="w-4 h-4 text-amber-600" />
                    </div>
                  )}
                </div>

                {/* Footer with date & share */}
                <div className="mt-5 pt-3 border-t border-stone-100 flex items-center justify-between text-xs text-stone-400">
                  <span className="flex items-center gap-1 font-mono text-[11px]">
                    <Calendar className="w-3.5 h-3.5 text-stone-400" />
                    <span>{dateStr}</span>
                  </span>

                  <button
                    onClick={() => handleShare(item)}
                    className="inline-flex items-center gap-1 text-xs font-bold text-amber-800 hover:text-amber-950"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                    <span>
                      {sharedId === item.id
                        ? isAs
                          ? "কপীকৃত!"
                          : "Copied!"
                        : isAs
                        ? "পৰিয়াললৈ শ্বেয়াৰ"
                        : "Share with Family"}
                    </span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
