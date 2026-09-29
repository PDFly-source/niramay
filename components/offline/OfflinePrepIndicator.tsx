"use client";

import React, { useEffect, useState } from "react";
import { niramayDB } from "@/lib/db";
import { REMEDIES } from "@/lib/data/remedies";
import { ASSAMESE_MEDICINAL_PLANTS } from "@/lib/plantLibrary";
import { CheckCircle2, CloudOff, RefreshCw } from "lucide-react";
import { useNiramayStore } from "@/lib/store";
import { useMounted } from "@/hooks/useMounted";

export const OfflinePrepIndicator: React.FC = () => {
  const [showBanner, setShowBanner] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);
  const mounted = useMounted();
  const { languageMode } = useNiramayStore();
  const isAs = (mounted ? languageMode : "bilingual") === "as";

  useEffect(() => {
    if (typeof window === "undefined") return;

    const alreadyPrepared = localStorage.getItem("niramay_offline_cache_v1");
    if (alreadyPrepared) return;

    // First time visitor: show offline preparation
    const timer = setTimeout(() => {
      setShowBanner(true);
      setProgress(25);

      // Perform background indexing into IndexedDB
      niramayDB
        .cacheCatalog(REMEDIES, ASSAMESE_MEDICINAL_PLANTS)
        .then(() => {
          setProgress(75);
          setTimeout(() => {
            setProgress(100);
            setIsDone(true);
            localStorage.setItem("niramay_offline_cache_v1", "true");
            setTimeout(() => {
              setShowBanner(false);
            }, 2500);
          }, 600);
        })
        .catch(() => {
          setShowBanner(false);
        });
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-[calc(var(--niramay-float-lift)+var(--niramay-assistant-space))] left-4 right-4 sm:left-auto sm:right-6 sm:w-96 z-50 animate-in fade-in slide-in-from-bottom-4 duration-300">
      <div className="bg-stone-900/95 backdrop-blur-md text-onbrand rounded-2xl p-4 shadow-2xl border border-stone-700">
        <div className="flex items-center gap-3">
          {isDone ? (
            <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          ) : (
            <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
              <CloudOff className="w-5 h-5 animate-pulse" />
            </div>
          )}
          <div className="flex-1 min-w-0">
            <div className="text-xs font-bold text-stone-100 flex items-center justify-between">
              <span>
                {isDone
                  ? isAs
                    ? "অফলাইন ব্যৱহাৰৰ বাবে সাজু!"
                    : "Ready for 100% Offline Use!"
                  : isAs
                  ? "অফলাইন সংৰক্ষণ প্ৰস্তুত হৈছে..."
                  : "Preparing Niramay for offline use..."}
              </span>
              <span className="text-[10px] font-mono text-stone-400">{progress}%</span>
            </div>
            <p className="text-[10px] text-stone-400 mt-0.5 truncate">
              {isDone
                ? isAs
                  ? "সকলো উপচাৰ আৰু বনৌষধি সংৰক্ষিত হ'ল"
                  : "Cached 100% remedy & plant databases locally"
                : isAs
                ? "ইণ্টাৰনেট নোহোৱাকৈও চলাব পৰাকৈ সংৰক্ষণ হৈছে"
                : "Caching verified remedies & botanical catalog"}
            </p>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-2.5 w-full bg-stone-800 rounded-full h-1.5 overflow-hidden">
          <div
            className={`h-full transition-all duration-300 rounded-full ${
              isDone ? "bg-emerald-500" : "bg-amber-500"
            }`}
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
};
