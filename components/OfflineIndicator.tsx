"use client";

import React from "react";
import { useOnlineStatus } from "@/hooks/useOnlineStatus";
import { WifiOff } from "lucide-react";

export const OfflineIndicator: React.FC = () => {
  const isOnline = useOnlineStatus();

  if (isOnline) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-14 left-4 z-50 flex items-center gap-2.5 rounded-xl bg-amber-800 text-amber-50 px-3.5 py-2 text-xs font-medium shadow-xl border border-amber-600 no-print animate-pulse"
    >
      <WifiOff className="w-4 h-4 text-amber-300 shrink-0" />
      <span>Offline Mode — All 50+ traditional remedies are stored locally and accessible without internet.</span>
    </div>
  );
};
