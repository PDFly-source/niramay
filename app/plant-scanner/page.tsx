"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import { useNiramayStore } from "@/lib/store";
import { useMounted } from "@/hooks/useMounted";
import {
  ASSAMESE_MEDICINAL_PLANTS,
  MedicinalPlant,
  classifyLeafImageFromCanvas,
  ClassificationMatch,
} from "@/lib/plantLibrary";
import { REMEDIES } from "@/lib/data/remedies";
import {
  Camera,
  Upload,
  RefreshCw,
  Sparkles,
  Info,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ShieldCheck,
  Search,
  BookOpen,
  Leaf,
  ChevronRight,
  Eye,
} from "lucide-react";
import { extractString } from "@/lib/utils";

export default function PlantScannerPage() {
  const mounted = useMounted();
  const { languageMode } = useNiramayStore();
  const currentMode = mounted ? languageMode : "bilingual";
  const isEn = currentMode === "en";
  const isAs = currentMode === "as";
  const isBi = currentMode === "bilingual";

  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [results, setResults] = useState<{
    matches: ClassificationMatch[];
    isConfident: boolean;
  } | null>(null);
  const [selectedPlant, setSelectedPlant] = useState<MedicinalPlant | null>(
    ASSAMESE_MEDICINAL_PLANTS[0]
  );
  const [librarySearch, setLibrarySearch] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const src = event.target?.result as string;
      setImagePreview(src);
      runLocalClassification(src);
    };
    reader.readAsDataURL(file);
  };

  const runLocalClassification = (imgSrc: string) => {
    setAnalyzing(true);
    setResults(null);

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = async () => {
      const canvas = canvasRef.current;
      if (!canvas) {
        setAnalyzing(false);
        return;
      }

      // Draw onto downscaled canvas for fast browser analysis
      const maxDim = 320;
      let w = img.width;
      let h = img.height;
      if (w > h && w > maxDim) {
        h = Math.round((h * maxDim) / w);
        w = maxDim;
      } else if (h > maxDim) {
        w = Math.round((w * maxDim) / h);
        h = maxDim;
      }

      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.drawImage(img, 0, 0, w, h);
        // Small delay to make UX feel smooth
        setTimeout(async () => {
          const res = await classifyLeafImageFromCanvas(canvas);
          setResults({
            matches: res.topMatches,
            isConfident: res.isConfident,
          });
          if (res.topMatches.length > 0) {
            setSelectedPlant(res.topMatches[0].plant);
          }
          setAnalyzing(false);
        }, 400);
      } else {
        setAnalyzing(false);
      }
    };
    img.src = imgSrc;
  };

  const resetScanner = () => {
    setImagePreview(null);
    setResults(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Find linked remedies in database for currently selected plant
  const linkedRemedies = selectedPlant
    ? REMEDIES.filter((r) => {
        const fullText = (
          extractString(r.name) +
          " " +
          r.name_assamese +
          " " +
          r.ingredients.map((i) => extractString(i.item) + " " + (i.item_assamese || "")).join(" ") +
          " " +
          (r.culturalContext ? extractString(r.culturalContext) : "")
        ).toLowerCase();

        return selectedPlant.relatedRemedyKeywords.some((k) =>
          fullText.includes(k.toLowerCase())
        );
      }).slice(0, 3)
    : [];

  const filteredLibrary = ASSAMESE_MEDICINAL_PLANTS.filter((p) => {
    const q = librarySearch.toLowerCase().trim();
    if (!q) return true;
    return (
      p.nameEn.toLowerCase().includes(q) ||
      p.nameAs.toLowerCase().includes(q) ||
      p.botanicalName.toLowerCase().includes(q) ||
      p.family.toLowerCase().includes(q) ||
      p.traditionalUses.en.some((u) => u.toLowerCase().includes(q)) ||
      p.traditionalUses.as.some((u) => u.toLowerCase().includes(q))
    );
  });

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      {/* Hidden processing canvas */}
      <canvas ref={canvasRef} className="hidden" />

      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100/90 text-emerald-900 text-xs font-bold">
            <Leaf className="w-3.5 h-3.5 text-emerald-700" />
            <span>
              {isAs
                ? "১০০% অফলাইন আৰু ডিভাইচতে চিনাক্তকৰণ"
                : "100% On-Device & Offline Plant Classifier"}
            </span>
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100/90 text-amber-900 text-xs font-bold border border-amber-300">
            <Sparkles className="w-3.5 h-3.5 text-amber-700" />
            <span>
              {isAs
                ? `মুঠ ${ASSAMESE_MEDICINAL_PLANTS.length}+টা প্ৰামাণিক বনৌষধিৰ জ্ঞানকোষ`
                : `Expanded ${ASSAMESE_MEDICINAL_PLANTS.length}+ Species Botanical Archive`}
            </span>
          </div>
        </div>
        <h1 className="text-2xl sm:text-4xl font-serif font-black text-stone-900 leading-tight">
          {isAs
            ? "ঔষধি উদ্ভিদ আৰু বনৌষধি চিনাক্তকৰণ স্কেনাৰ"
            : isEn
            ? "Local Assamese Plant & Leaf Identifier"
            : "Assamese Medicinal Plant & Leaf Identifier / বনৌষধি চিনাক্তকৰণ"}
        </h1>
        <p className="text-xs sm:text-sm text-stone-600 max-w-3xl mt-2 leading-relaxed">
          {isAs
            ? `অসমৰ প্ৰখ্যাত ${ASSAMESE_MEDICINAL_PLANTS.length}+ বিধ থলুৱা বনৌষধি (ভেদাইলতা, মানিমুনি, মাটিকান্দুৰী, টেঙেচী, পচতীয়া, ঢেকীয়া, ভূঁই আমলখি, সোণামুখী, পিপলি, ব্ৰাহ্মী আদি)ৰ ফটো স্কেন কৰক বা বাছনি কৰি পৰম্পৰাগত প্ৰয়োগ আৰু বিধানসমূহ পঢ়ক।`
            : `Photograph a local Assamese medicinal plant leaf to analyze its chlorophyll hue, aspect ratio, and leaf structure. Browse our expanded archive of ${ASSAMESE_MEDICINAL_PLANTS.length}+ verified indigenous species with traditional preparation methods.`}
        </p>
      </div>

      {/* Main Grid: Scanner Left, Plant Card Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Camera / Upload Box */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-amber-200/80 shadow-md">
            <h2 className="text-base font-bold text-stone-900 mb-3 flex items-center justify-between">
              <span>{isAs ? "পাতৰ ফটো স্কেন কৰক" : "Scan Leaf"}</span>
              {imagePreview && (
                <button
                  onClick={resetScanner}
                  className="text-xs text-amber-800 hover:text-amber-950 font-semibold flex items-center gap-1"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>{isAs ? "পুনৰ চেষ্টা" : "Reset"}</span>
                </button>
              )}
            </h2>

            {/* Upload Area */}
            {!imagePreview ? (
              <div
                onClick={() => fileInputRef.current?.click()}
                className="cursor-pointer border-2 border-dashed border-emerald-300 hover:border-emerald-500 bg-emerald-50/40 hover:bg-emerald-50/70 rounded-2xl p-8 text-center transition flex flex-col items-center justify-center gap-3 min-h-[260px]"
              >
                <div className="w-14 h-14 rounded-2xl bg-emerald-600 text-onbrand flex items-center justify-center shadow-md">
                  <Camera className="w-7 h-7" />
                </div>
                <div className="space-y-1">
                  <div className="text-sm font-bold text-stone-900">
                    {isAs ? "কেমেৰাৰে তোলক বা ফটো বাছক" : "Take Photo or Upload Leaf"}
                  </div>
                  <div className="text-xs text-stone-500">
                    {isAs
                      ? "পোহৰ থকা ঠাইত পাতটো সমতলভাৱে ৰাখি ফটো তোলক"
                      : "Hold leaf flat against plain background in good light"}
                  </div>
                </div>

                <div className="flex items-center gap-2 mt-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-700 text-onbrand text-xs font-bold rounded-xl shadow-xs">
                    <Camera className="w-3.5 h-3.5" />
                    <span>{isAs ? "কেমেৰা খোলক" : "Open Camera"}</span>
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold rounded-xl">
                    <Upload className="w-3.5 h-3.5" />
                    <span>{isAs ? "গেলাৰীৰ পৰা" : "From Gallery"}</span>
                  </span>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="relative rounded-2xl overflow-hidden border border-stone-200 aspect-4/3 bg-night flex items-center justify-center">
                  <img
                    src={imagePreview}
                    alt="Captured Leaf"
                    className="max-h-full max-w-full object-contain"
                  />
                  {analyzing && (
                    <div className="absolute inset-0 bg-night/60 backdrop-blur-xs flex flex-col items-center justify-center text-onbrand gap-2">
                      <RefreshCw className="w-8 h-8 animate-spin text-emerald-400" />
                      <span className="text-xs font-bold">
                        {isAs
                          ? "অন-ডিভাইচ এআই-য়ে পাতটো চিনাক্ত কৰিছে..."
                          : "Analyzing leaf features locally..."}
                      </span>
                    </div>
                  )}
                </div>

                {/* Match Results */}
                {results && (
                  <div className="space-y-3 pt-2">
                    <div className="flex items-center justify-between text-xs font-bold">
                      <span className="text-stone-700">
                        {isAs ? "সম্ভাব্য উদ্ভিদ মিল:" : "Predicted Plant Matches:"}
                      </span>
                      <span className="text-emerald-700 flex items-center gap-1">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        <span>100% In-Browser</span>
                      </span>
                    </div>

                    {!results.isConfident && (
                      <div className="p-3 bg-amber-50 border border-amber-300 rounded-xl text-xs text-amber-900 flex items-start gap-2">
                        <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                        <div>
                          <div className="font-bold">
                            {isAs ? "নিশ্চিত নহয় (Not fully confident)" : "Not fully confident"}
                          </div>
                          <div className="text-[11px] mt-0.5">
                            {isAs
                              ? "আলোকোজ্জ্বল পৰিৱেশত পাতটো স্পষ্টকৈ ৰাখি পুনৰ চেষ্টা কৰক, অথবা তলৰ সংগ্ৰহৰ পৰা পোনপটীয়াভাৱে বাছনি কৰক।"
                              : "Try a clearer, well-lit photo of the leaf against a plain background, or browse the plant library manually."}
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="space-y-2">
                      {results.matches.map((m, idx) => (
                        <button
                          key={m.plant.id}
                          onClick={() => setSelectedPlant(m.plant)}
                          className={`w-full text-left p-3 rounded-xl border transition flex items-center justify-between ${
                            selectedPlant?.id === m.plant.id
                              ? "bg-emerald-50 border-emerald-400 shadow-xs"
                              : "bg-stone-50 hover:bg-stone-100 border-stone-200"
                          }`}
                        >
                          <div className="flex items-center gap-2.5">
                            <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 text-xs font-black flex items-center justify-center">
                              {idx + 1}
                            </span>
                            <div>
                              <div className="text-xs font-bold text-stone-900">
                                {m.plant.nameEn}
                              </div>
                              <div className="text-[11px] font-semibold text-emerald-800">
                                {m.plant.nameAs} · <em>{m.plant.botanicalName}</em>
                              </div>
                            </div>
                          </div>

                          <div className="text-right">
                            <span
                              className={`text-xs font-black px-2 py-0.5 rounded-full ${
                                m.confidence >= 70
                                  ? "bg-emerald-100 text-emerald-900"
                                  : "bg-amber-100 text-amber-900"
                              }`}
                            >
                              {m.confidence}%
                            </span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
              capture="environment"
              className="hidden"
            />
          </div>

          {/* Quick Plant Library Selector */}
          <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold text-stone-900 flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-emerald-700" />
                <span>
                  {isAs ? "অসমৰ চিনাকি বনৌষধি পুথি" : "Curated Plant Library"}
                </span>
              </h3>
              <span className="text-xs text-stone-500">
                {ASSAMESE_MEDICINAL_PLANTS.length} {isAs ? "বিধ" : "species"}
              </span>
            </div>

            {/* Search bar inside plant library */}
            <div className="relative mb-3">
              <Search className="w-3.5 h-3.5 absolute left-3 top-3 text-stone-400" />
              <input
                type="text"
                value={librarySearch}
                onChange={(e) => setLibrarySearch(e.target.value)}
                placeholder={
                  isAs
                    ? "উদ্ভিদৰ নাম সন্ধান কৰক (যেনে- ভেদাইলতা, মানিমুনি)..."
                    : "Search plants (Bhedailota, Manimuni)..."
                }
                className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-stone-50 border border-stone-200 focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
            </div>

            <div className="space-y-1.5 max-h-[300px] overflow-y-auto pr-1">
              {filteredLibrary.map((plant) => (
                <button
                  key={plant.id}
                  onClick={() => setSelectedPlant(plant)}
                  className={`w-full text-left p-2.5 rounded-xl text-xs transition flex items-center justify-between ${
                    selectedPlant?.id === plant.id
                      ? "bg-emerald-100/90 text-emerald-950 font-bold border border-emerald-300"
                      : "text-stone-700 hover:bg-stone-50 border border-transparent"
                  }`}
                >
                  <div>
                    <span className="font-bold">{plant.nameEn}</span>
                    <span className="ml-1.5 text-emerald-800 font-semibold">
                      ({plant.nameAs})
                    </span>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Detailed Plant Profile Card */}
        <div className="lg:col-span-7">
          {selectedPlant ? (
            <article className="bg-white rounded-3xl p-6 sm:p-8 border border-amber-200/80 shadow-md space-y-6">
              {/* Header */}
              <div className="pb-5 border-b border-stone-200">
                <div className="flex items-center gap-2 flex-wrap text-xs mb-2">
                  <span className="font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                    {selectedPlant.family}
                  </span>
                  <span className="text-stone-500">
                    Botanical: <em>{selectedPlant.botanicalName}</em>
                  </span>
                </div>

                <div className="flex items-baseline justify-between gap-4">
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-serif font-black text-stone-900">
                      {selectedPlant.nameEn}
                    </h2>
                    <div className="text-xl sm:text-2xl font-bold text-emerald-800 mt-1">
                      {selectedPlant.nameAs}
                    </div>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-stone-600 mt-3 leading-relaxed">
                  {isAs ? selectedPlant.habitat.as : selectedPlant.habitat.en}
                </p>
              </div>

              {/* Botanical Leaf Characteristics */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-amber-900 mb-3 flex items-center gap-1.5">
                  <Eye className="w-3.5 h-3.5 text-amber-700" />
                  <span>
                    {isAs
                      ? "চিনাক্তকৰণৰ লক্ষণসমূহ (Leaf Characteristics)"
                      : "Identification Characteristics"}
                  </span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded-xl bg-stone-50 border border-stone-200/80">
                    <div className="font-bold text-stone-900 mb-0.5">
                      🍃 {isAs ? "পাতৰ আকাৰ (Shape):" : "Shape:"}
                    </div>
                    <div className="text-stone-600">
                      {isAs
                        ? selectedPlant.leafCharacteristics.shape.as
                        : selectedPlant.leafCharacteristics.shape.en}
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-stone-50 border border-stone-200/80">
                    <div className="font-bold text-stone-900 mb-0.5">
                      🌿 {isAs ? "দাঁতি আৰু ঠাৰি (Margin):" : "Margin:"}
                    </div>
                    <div className="text-stone-600">
                      {isAs
                        ? selectedPlant.leafCharacteristics.margin.as
                        : selectedPlant.leafCharacteristics.margin.en}
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-stone-50 border border-stone-200/80">
                    <div className="font-bold text-stone-900 mb-0.5">
                      👃 {isAs ? "বিশেষ গোন্ধ (Aroma):" : "Aroma:"}
                    </div>
                    <div className="text-stone-600">
                      {isAs
                        ? selectedPlant.leafCharacteristics.aroma.as
                        : selectedPlant.leafCharacteristics.aroma.en}
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-stone-50 border border-stone-200/80">
                    <div className="font-bold text-stone-900 mb-0.5">
                      🎨 {isAs ? "বৰণ (Coloration):" : "Color:"}
                    </div>
                    <div className="text-stone-600">
                      {isAs
                        ? selectedPlant.leafCharacteristics.color.as
                        : selectedPlant.leafCharacteristics.color.en}
                    </div>
                  </div>
                </div>
              </div>

              {/* Traditional Uses in Assamese Folk Medicine */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-900 mb-3 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
                  <span>
                    {isAs
                      ? "পৰম্পৰাগত ঔষধি গুণ আৰু ব্যৱহাৰ"
                      : "Traditional Assamese Folk Medicine Uses"}
                  </span>
                </h3>
                <ul className="space-y-2.5 text-xs text-stone-800">
                  {(isAs
                    ? selectedPlant.traditionalUses.as
                    : selectedPlant.traditionalUses.en
                  ).map((use, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center shrink-0 mt-0.5 text-[11px]">
                        ✓
                      </span>
                      <span className="leading-relaxed">{use}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Caution */}
              <div className="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-300 text-xs text-amber-950 flex items-start gap-2.5">
                <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold">
                    {isAs ? "সাৱধানতা:" : "Usage Caution:"}
                  </span>{" "}
                  <span>
                    {isAs ? selectedPlant.caution.as : selectedPlant.caution.en}
                  </span>
                </div>
              </div>

              {/* Linked Remedies in Niramay Database */}
              {linkedRemedies.length > 0 && (
                <div className="pt-4 border-t border-stone-200">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-stone-800 mb-3 flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-amber-700" />
                    <span>
                      {isAs
                        ? "এই উদ্ভিদ ব্যৱহাৰ হোৱা পৰীক্ষিত উপচাৰসমূহ"
                        : "Verified Remedies Using This Herb"}
                    </span>
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {linkedRemedies.map((remedy) => (
                      <Link
                        key={remedy.id}
                        href={`/remedy/${remedy.id}`}
                        className="p-3.5 rounded-2xl bg-stone-50 hover:bg-amber-50 border border-stone-200 hover:border-amber-300 transition group flex flex-col justify-between"
                      >
                        <div>
                          <div className="text-xs font-bold text-stone-900 group-hover:text-amber-900">
                            {extractString(remedy.name)}
                          </div>
                          <div className="text-[11px] font-semibold text-emerald-800 mt-0.5">
                            {remedy.name_assamese}
                          </div>
                        </div>
                        <div className="mt-2 flex items-center justify-between text-[10px] text-stone-500 font-semibold">
                          <span>~{remedy.prepTimeMinutes} mins</span>
                          <span className="inline-flex items-center gap-1 text-amber-800 group-hover:translate-x-0.5 transition">
                            View <ArrowRight className="w-3 h-3" />
                          </span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </article>
          ) : (
            <div className="bg-white rounded-3xl p-12 text-center border border-stone-200 text-stone-500">
              {isAs
                ? "বাওঁফালৰ পৰা কোনো উদ্ভিদ বাছক বা ফটো স্কেন কৰক।"
                : "Select a plant from the library or scan a leaf photo."}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
