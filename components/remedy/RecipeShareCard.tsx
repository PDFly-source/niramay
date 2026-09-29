"use client";

import React, { useState, useRef } from "react";
import { Remedy } from "@/lib/schema";
import { extractString } from "@/lib/utils";
import { NiramayLogo } from "@/components/brand/NiramayLogo";
import { Share2, Download, Check, X, Sparkles, AlertTriangle, ShieldCheck } from "lucide-react";

interface Props {
  remedy: Remedy;
  languageMode?: "en" | "as" | "bilingual";
}

export const RecipeShareCard: React.FC<Props> = ({
  remedy,
  languageMode = "bilingual",
}) => {
  const [generating, setGenerating] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [shared, setShared] = useState(false);

  const cardRef = useRef<HTMLDivElement>(null);

  const primaryTitle = extractString(remedy.name);
  const secondaryTitle = remedy.name_assamese;
  const symptomTitle = extractString(remedy.symptom);

  const handleGenerateAndShare = async () => {
    if (!cardRef.current) return;
    setGenerating(true);

    try {
      // Lazy-load the imaging library only when a share is requested.
      const { toPng } = await import("html-to-image");
      // Generate PNG data URL
      const dataUrl = await toPng(cardRef.current, {
        cacheBust: true,
        pixelRatio: 2, // High resolution for crisp WhatsApp cards
        quality: 0.95,
      });

      setImageUrl(dataUrl);
      setPreviewOpen(true);

      // Attempt native Web Share API with File
      if (
        navigator.share &&
        navigator.canShare &&
        typeof window !== "undefined"
      ) {
        const blob = await (await fetch(dataUrl)).blob();
        const file = new File([blob], `niramay-${remedy.id}.png`, {
          type: "image/png",
        });

        if (navigator.canShare({ files: [file] })) {
          await navigator.share({
            title: `Niramay Remedy: ${primaryTitle}`,
            text: `Traditional Assamese kitchen remedy for ${symptomTitle}: ${primaryTitle} (${secondaryTitle}). Verified preparation steps & dosage safety.`,
            files: [file],
          });
          setShared(true);
        }
      }
    } catch (err) {
      console.warn("Share fallback to download/preview:", err);
    } finally {
      setGenerating(false);
    }
  };

  const handleDownloadOnly = () => {
    if (!imageUrl) return;
    const link = document.createElement("a");
    link.download = `niramay-${remedy.id}.png`;
    link.href = imageUrl;
    link.click();
  };

  return (
    <>
      <button
        onClick={handleGenerateAndShare}
        disabled={generating}
        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-emerald-700 hover:bg-emerald-800 text-onbrand shadow-xs transition no-print"
        title="Share recipe card to WhatsApp"
      >
        <Share2 className="w-4 h-4" />
        <span>
          {generating
            ? "Creating Card..."
            : "WhatsApp Card / কাৰ্ড শ্বেয়াৰ"}
        </span>
      </button>

      {/* Hidden Card template that gets converted to image */}
      <div className="fixed -left-[9999px] top-0 pointer-events-none">
        <div
          ref={cardRef}
          style={{ width: "680px" }}
          className="bg-cream p-8 rounded-3xl border-4 border-amber-800/80 text-stone-900 font-sans shadow-none"
        >
          {/* Card Header */}
          <div className="flex items-center justify-between pb-4 border-b-2 border-amber-200">
            <div className="flex items-center gap-3">
              <NiramayLogo size={44} />
              <div>
                <div className="flex items-baseline gap-2">
                  <span className="font-serif font-black text-2xl text-stone-900 tracking-tight">
                    Niramay
                  </span>
                  <span className="text-base font-bold text-emerald-800">
                    নিৰাময়
                  </span>
                </div>
                <div className="text-[11px] font-medium text-amber-800 tracking-wide">
                  Traditional Assamese Kitchen Remedy · পৰম্পৰাগত জ্ঞান
                </div>
              </div>
            </div>
            <div className="text-right">
              <span className="text-xs font-black uppercase text-amber-900 bg-amber-100 px-3 py-1 rounded-full">
                {symptomTitle}
              </span>
              <div className="text-[11px] text-stone-500 font-semibold mt-1">
                ⏱ ~{remedy.prepTimeMinutes} mins prep
              </div>
            </div>
          </div>

          {/* Remedy Name */}
          <div className="my-5">
            <h1 className="text-2xl font-serif font-black text-stone-950 leading-snug">
              {primaryTitle}
            </h1>
            <div className="text-lg font-bold text-emerald-800 mt-0.5">
              {secondaryTitle}
            </div>
          </div>

          {/* Ingredients Grid */}
          <div className="my-4 p-4 rounded-2xl bg-amber-50/70 border border-amber-200">
            <div className="text-xs font-black uppercase tracking-wider text-amber-900 mb-2">
              🧂 Key Ingredients / প্ৰয়োজনীয় উপাদান
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs font-medium text-stone-800">
              {remedy.ingredients.map((ing, idx) => (
                <div key={idx} className="flex items-center gap-1.5">
                  <span className="text-emerald-700 font-bold">•</span>
                  <span>{extractString(ing.item)}</span>
                  <span className="text-stone-500 text-[11px]">
                    ({extractString(ing.qty)})
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Preparation Steps Summary */}
          <div className="my-4">
            <div className="text-xs font-black uppercase tracking-wider text-stone-900 mb-2">
              🫖 Preparation / প্ৰণালী
            </div>
            <div className="space-y-2 text-xs text-stone-800">
              {remedy.steps.slice(0, 4).map((step, idx) => {
                const s = typeof step === "object" ? step.en : step;
                return (
                  <div key={idx} className="flex items-start gap-2">
                    <span className="w-5 h-5 rounded-full bg-amber-600 text-onbrand font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span className="leading-snug">{s}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Safe Dosage Box */}
          <div className="my-4 p-3 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-between text-xs">
            <div>
              <span className="font-bold text-emerald-950">
                Adult Dosage:{" "}
              </span>
              <span className="text-stone-700">
                {extractString(remedy.dosage.adult)}
              </span>
            </div>
            <div>
              <span className="font-bold text-amber-950">Child: </span>
              <span className="text-stone-700">
                {extractString(remedy.dosage.child)}
              </span>
            </div>
          </div>

          {/* Safety Disclaimer Footer */}
          <div className="pt-3 border-t border-stone-200 text-[10px] text-stone-500 flex items-center justify-between">
            <span className="flex items-center gap-1 text-red-700 font-bold">
              <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
              <span>If symptoms persist &gt;3 days, see a qualified doctor.</span>
            </span>
            <span className="font-semibold text-stone-600">
              niramay.kitchen
            </span>
          </div>
        </div>
      </div>

      {/* Preview & Download Modal */}
      {previewOpen && imageUrl && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl p-5 max-w-lg w-full shadow-2xl border border-stone-200 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-stone-200">
              <div className="text-sm font-bold text-stone-900 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-600" />
                <span>WhatsApp Recipe Card Ready</span>
              </div>
              <button
                onClick={() => setPreviewOpen(false)}
                className="w-7 h-7 rounded-full bg-stone-100 hover:bg-stone-200 flex items-center justify-center text-stone-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="rounded-2xl overflow-hidden border border-stone-200 shadow-inner max-h-[360px] overflow-y-auto">
              <img
                src={imageUrl}
                alt="Recipe Card Preview"
                className="w-full object-contain"
              />
            </div>

            <div className="flex items-center gap-2 justify-end pt-2">
              <button
                onClick={handleDownloadOnly}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-stone-100 hover:bg-stone-200 text-stone-800 transition"
              >
                <Download className="w-4 h-4" />
                <span>Download PNG</span>
              </button>

              <button
                onClick={handleGenerateAndShare}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-emerald-700 hover:bg-emerald-800 text-onbrand shadow-xs transition"
              >
                <Share2 className="w-4 h-4" />
                <span>Share to WhatsApp</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
