"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";

const RecipeShareCard = dynamic(
  () => import("@/components/remedy/RecipeShareCard").then((m) => m.RecipeShareCard),
  { ssr: false }
);
import Link from "next/link";
import { Remedy } from "@/lib/schema";
import { useNiramayStore } from "@/lib/store";
import { useMounted } from "@/hooks/useMounted";
import { formatRemedyForSharing, extractString } from "@/lib/utils";
import { SpiceIcon } from "@/components/brand/SpiceIcon";
import { NiramayLogo } from "@/components/brand/NiramayLogo";
import {
  ChevronLeft,
  Clock,
  Printer,
  Share2,
  Bookmark,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  ShieldAlert,
  Baby,
  User,
  HeartHandshake,
  Check,
  Sparkles,
  ArrowRight,
  Info,
  Lightbulb,
  ChefHat,
  Bell,
  FileText,
  HeartPulse,
} from "lucide-react";
import { UI_TRANSLATIONS, getLocalizedText, getDualText } from "@/lib/i18n";
import { AudioReadout } from "@/components/remedy/AudioReadout";
import { ServingAdjuster, scaleQuantity } from "@/components/remedy/ServingAdjuster";
import { FamilyProfileSelector } from "@/components/family/FamilyProfileSelector";
import { EmergencySpeedDial } from "@/components/emergency/EmergencySpeedDial";
import { SoundscapesPlayer } from "@/components/ambient/SoundscapesPlayer";
import { KitchenCookingMode } from "@/components/remedy/KitchenCookingMode";
import { CareLogModal } from "@/components/care/CareLogModal";

interface Props {
  remedy: Remedy;
  relatedRemedies: Remedy[];
}

export const RemedyDetailClient: React.FC<Props> = ({
  remedy,
  relatedRemedies,
}) => {
  const mounted = useMounted();
  const {
    toggleSaved,
    isSaved,
    hasPantryItem,
    togglePantryItem,
    languageMode,
    familyProfile,
    servingCount,
    setServingCount,
    doshaProfile,
    startTreatmentCourse,
    addCareLog,
  } = useNiramayStore();
  const saved = mounted && isSaved(remedy.id);
  const [copied, setCopied] = useState(false);
  const [activeAudioStepIndex, setActiveAudioStepIndex] = useState<number | null>(null);
  const [isKitchenModeOpen, setIsKitchenModeOpen] = useState(false);
  const [isCareLogOpen, setIsCareLogOpen] = useState(false);
  const [courseToast, setCourseToast] = useState(false);

  const currentMode = mounted ? languageMode : "bilingual";
  const isEn = currentMode === "en";
  const isAs = currentMode === "as";
  const isBi = currentMode === "bilingual";

  const handleCopyShare = async () => {
    const text = formatRemedyForSharing(remedy, currentMode);
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch {
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  // Resolved titles and text
  const primaryTitle = isAs
    ? remedy.name_assamese || extractString(remedy.name)
    : extractString(remedy.name);
  const secondaryTitle = isBi ? remedy.name_assamese : undefined;

  const symptomTitle = getLocalizedText(remedy.symptom, currentMode, remedy.symptom_assamese);
  const suitableTimeText = getLocalizedText(remedy.suitableTime, currentMode);
  const culturalContextText = getLocalizedText(remedy.culturalContext, currentMode);
  const tipText = getLocalizedText(remedy.tip, currentMode);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-14">
      {/* Navigation Breadcrumbs */}
      <div className="flex items-center justify-between gap-4 mb-6 no-print">
        <Link
          href={
            remedy.symptomSlug
              ? `/symptoms/${remedy.symptomSlug}`
              : "/symptoms"
          }
          className="inline-flex items-center gap-1.5 text-xs font-bold text-stone-600 hover:text-amber-800 transition"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>
            {isAs ? "উভতি যাওক:" : isEn ? "Back to" : "Back to / উভতি যাওক:"} {symptomTitle}
          </span>
        </Link>
        <Link
          href="/knowledge-bank"
          className="text-xs text-stone-500 hover:text-stone-800"
        >
          {isAs ? "জ্ঞান ভঁৰাল" : "Knowledge Bank"}
        </Link>
      </div>

      {/* Main Printable Remedy Card Container */}
      <article className="printable-card bg-white rounded-3xl p-6 sm:p-10 border border-amber-200/80 shadow-md">
        {/* Print Only Header Logo */}
        <div className="hidden print:flex items-center justify-between pb-4 mb-6 border-b border-stone-300">
          <div className="flex items-center gap-2">
            <NiramayLogo size={36} />
            <div>
              <span className="font-serif font-bold text-lg">Niramay</span>
              <span className="text-xs ml-2 text-stone-600">নিৰাময়</span>
            </div>
          </div>
          <span className="text-xs text-stone-500">Traditional Kitchen Remedy Card</span>
        </div>

        {/* Remedy Header */}
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 pb-6 border-b border-stone-100">
          <div className="space-y-2">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-800 bg-amber-100 px-3 py-1 rounded-full">
                {symptomTitle}
              </span>
              <span className="text-xs font-medium text-stone-500 bg-stone-100 px-2.5 py-1 rounded-full flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-amber-700" />
                ~{remedy.prepTimeMinutes} {isAs ? "মিনিট" : "mins"}
              </span>
              {suitableTimeText && (
                <span className="text-xs text-stone-500 bg-stone-100 px-2.5 py-1 rounded-full">
                  🕒 {suitableTimeText}
                </span>
              )}
            </div>

            <h1 className="text-2xl sm:text-4xl font-serif font-black text-stone-900 leading-tight">
              {primaryTitle}
            </h1>
            {secondaryTitle && (
              <div className="text-base sm:text-lg font-bold text-emerald-800">
                {secondaryTitle}
              </div>
            )}
          </div>

          {/* Action buttons (Print, Save, Share) */}
          <div className="flex items-center gap-2 shrink-0 no-print">
            <button
              onClick={() => toggleSaved(remedy.id)}
              className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold border transition ${
                saved
                  ? "bg-red-50 text-red-600 border-red-200"
                  : "bg-stone-50 text-stone-700 hover:bg-stone-100 border-stone-200"
              }`}
              title={saved ? "Saved" : "Save this remedy"}
            >
              <Bookmark className={`w-4 h-4 ${saved ? "fill-red-600" : ""}`} />
              <span>
                {saved
                  ? isAs
                    ? "সংৰক্ষিত"
                    : isEn
                    ? "Saved"
                    : "Saved / সংৰক্ষিত"
                  : isAs
                  ? "সংৰক্ষণ"
                  : isEn
                  ? "Save"
                  : "Save / সংৰক্ষণ"}
              </span>
            </button>

            {/* New Feature 2: Hands-Free Kitchen Cooking Mode */}
            <button
              onClick={() => setIsKitchenModeOpen(true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-amber-700 hover:bg-amber-800 text-white shadow-xs transition"
              title="Start hands-free voice guided cooking mode"
            >
              <ChefHat className="w-4 h-4 text-amber-200" />
              <span>{isAs ? "পাকঘৰ মোড" : "Kitchen Mode"}</span>
            </button>

            {/* New Feature 5: Start 3-Day Course */}
            <button
              onClick={() => {
                startTreatmentCourse(
                  remedy.id,
                  extractString(remedy.name),
                  remedy.name_assamese || extractString(remedy.name),
                  extractString(remedy.symptom)
                );
                setCourseToast(true);
                setTimeout(() => setCourseToast(false), 4000);
              }}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-amber-100 hover:bg-amber-200 text-amber-950 border border-amber-300 transition"
              title="Schedule twice-daily reminders for 3 days"
            >
              <Bell className="w-4 h-4 text-amber-700" />
              <span>{isAs ? "৩-দিনীয়া কাৰ্যসূচী" : "3-Day Course"}</span>
            </button>

            {/* New Feature 4: Clinical Triage & Care Log */}
            <button
              onClick={() => {
                addCareLog({
                  remedyId: remedy.id,
                  remedyNameEn: extractString(remedy.name),
                  remedyNameAs: remedy.name_assamese || extractString(remedy.name),
                  symptomEn: extractString(remedy.symptom),
                  symptomAs: remedy.symptom_assamese || extractString(remedy.symptom),
                });
                setIsCareLogOpen(true);
              }}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-stone-100 hover:bg-stone-200 text-stone-800 border border-stone-200 transition"
              title="Track progress and export a symptom summary"
            >
              <FileText className="w-4 h-4 text-stone-600" />
              <span>{isAs ? "স্বাস্থ্য দিনলিপি" : "Care Log"}</span>
            </button>

            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-stone-50 text-stone-700 hover:bg-stone-100 border border-stone-200 transition"
              title="Print clean remedy card"
            >
              <Printer className="w-4 h-4 text-stone-600" />
              <span>{isAs ? "প্ৰিণ্ট" : "Print"}</span>
            </button>

            {/* Feature 5: WhatsApp-Shareable Recipe Card */}
            <RecipeShareCard remedy={remedy} languageMode={currentMode} />

            <button
              onClick={handleCopyShare}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-amber-600 hover:bg-amber-700 text-white shadow-xs transition"
              title="Copy text summary to share"
            >
              <Share2 className="w-4 h-4" />
              <span>
                {copied
                  ? isAs
                    ? "কপীকৃত!"
                    : "Copied!"
                  : isAs
                  ? "শ্বেয়াৰ"
                  : "Share"}
              </span>
            </button>
          </div>
        </div>

        {/* Course Schedule Feedback Alert */}
        {courseToast && (
          <div className="mt-4 p-3 bg-amber-50 border border-amber-300 rounded-2xl text-xs text-amber-950 flex items-center justify-between gap-2 no-print animate-in fade-in">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-amber-700 shrink-0" />
              <span>
                {isAs
                  ? "৩-দিনীয়া চিকিৎসা কাৰ্যসূচী আৰম্ভ হ'ল! দিনৰ ২ বাৰকৈ স্থানীয় স্মাৰক নিৰ্ধাৰণ কৰা হৈছে।"
                  : "3-Day Course scheduled! Twice-daily local dose reminders are now active on your Home tab."}
              </span>
            </div>
            <Link href="/" className="font-bold underline text-amber-900 shrink-0">
              {isAs ? "গৃহত চাওক" : "View on Home"}
            </Link>
          </div>
        )}

        {/* Copy Feedback Alert */}
        {copied && (
          <div className="mt-4 p-3 bg-emerald-50 border border-emerald-300 rounded-2xl text-xs text-emerald-900 flex items-center gap-2 no-print animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
            <span>
              {isAs
                ? "উপচাৰ কাৰ্ড ক্লিপবৰ্ডত কপি কৰা হ'ল! আপুনি পৰিয়াল বা বন্ধু-বান্ধৱীলৈ প্ৰেৰণ কৰিব পাৰে।"
                : "Remedy card copied to clipboard! You can now paste and send it to family or friends."}
            </span>
          </div>
        )}

        {/* Feature 4: Bilingual Audio Readout (TTS) */}
        <AudioReadout
          remedy={remedy}
          familyProfile={familyProfile}
          onActiveStepChange={setActiveAudioStepIndex}
        />

        {/* Cultural Context / Heritage Wisdom */}
        {culturalContextText && (
          <div className="my-6 p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0 mt-0.5">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-amber-800">
                {isAs
                  ? "পৰম্পৰাগত জ্ঞান আৰু মছলাৰ ঐতিহ্য"
                  : isEn
                  ? "Traditional Heritage & Spice Wisdom"
                  : "Traditional Heritage & Spice Wisdom / পৰম্পৰাগত জ্ঞান"}
              </div>
              <p className="text-xs sm:text-sm text-stone-700 mt-1 leading-relaxed">
                {culturalContextText}
              </p>
            </div>
          </div>
        )}

        {/* Feature 9: Dynamic Serving & Batch Adjuster */}
        <ServingAdjuster
          servingCount={servingCount}
          onServingChange={setServingCount}
          languageMode={currentMode}
        />

        {/* Section 1: Ingredients */}
        <section className="my-8">
          <div className="flex items-center justify-between pb-3 border-b border-stone-100 mb-4">
            <h2 className="text-lg font-serif font-bold text-stone-900 flex items-center gap-2">
              <span className="text-amber-700">🧂</span>
              <span>
                {isAs
                  ? UI_TRANSLATIONS.remedyDetail.ingredientsTitle.as
                  : isEn
                  ? UI_TRANSLATIONS.remedyDetail.ingredientsTitle.en
                  : UI_TRANSLATIONS.remedyDetail.ingredientsTitle.bilingual}
              </span>
            </h2>
            <div className="flex items-center gap-2 text-xs text-stone-500">
              {servingCount > 1 && (
                <span className="bg-amber-100 text-amber-900 font-bold px-2 py-0.5 rounded-full text-[11px]">
                  {servingCount}x {isAs ? "জোখ" : "batch"}
                </span>
              )}
              <span>
                {remedy.ingredients.length} {isAs ? "টা উপাদান" : "items"}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {remedy.ingredients.map((ing, idx) => {
              const rawName = extractString(ing.item);
              const inPantry = mounted && hasPantryItem(rawName);

              const itemText = isAs
                ? ing.item_assamese || (typeof ing.item === "object" ? ing.item.as : rawName)
                : rawName;
              const secondaryItem =
                isBi && ing.item_assamese && ing.item_assamese !== rawName
                  ? ing.item_assamese
                  : isBi && typeof ing.item === "object" && ing.item.as !== ing.item.en
                  ? ing.item.as
                  : undefined;

              const rawQtyText = getLocalizedText(ing.qty, currentMode, ing.qty_assamese);
              const scaledQtyText = scaleQuantity(rawQtyText, servingCount, isAs);

              return (
                <div
                  key={idx}
                  className={`p-3.5 rounded-2xl border flex items-center justify-between gap-3 ${
                    inPantry
                      ? "bg-emerald-50/60 border-emerald-300/80 text-emerald-950"
                      : "bg-stone-50/80 border-stone-200 text-stone-800"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <SpiceIcon spiceName={rawName} size={22} />
                    <div>
                      <div className="text-xs sm:text-sm font-bold">
                        {itemText}
                      </div>
                      {secondaryItem && (
                        <div className="text-[11px] font-medium text-emerald-800">
                          {secondaryItem}
                        </div>
                      )}
                      <div className="text-[11px] text-stone-500 font-semibold mt-0.5">
                        {isAs ? "জোখ:" : "Qty:"}{" "}
                        <span className="font-bold text-stone-800">
                          {scaledQtyText}
                        </span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => togglePantryItem(rawName)}
                    className="no-print text-[11px] font-semibold px-2 py-1 rounded-md transition hover:bg-white shrink-0"
                    title="Toggle in your pantry"
                  >
                    {inPantry ? (
                      <span className="inline-flex items-center gap-1 text-emerald-700 font-bold">
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                        <span>{isAs ? "মজুত আছে" : "In Stock"}</span>
                      </span>
                    ) : (
                      <span className="text-stone-400 hover:text-stone-700">
                        {isAs ? "+ যোগ কৰক" : "+ Add to Pantry"}
                      </span>
                    )}
                  </button>
                </div>
              );
            })}
          </div>
        </section>

        {/* Section 2: Step-by-Step Preparation Guide (5-8 granular steps) */}
        <section className="my-8">
          <div className="pb-3 border-b border-stone-100 mb-4">
            <h2 className="text-lg font-serif font-bold text-stone-900 flex items-center gap-2">
              <span className="text-amber-700">🫖</span>
              <span>
                {isAs
                  ? UI_TRANSLATIONS.remedyDetail.prepGuideTitle.as
                  : isEn
                  ? UI_TRANSLATIONS.remedyDetail.prepGuideTitle.en
                  : UI_TRANSLATIONS.remedyDetail.prepGuideTitle.bilingual}
              </span>
            </h2>
            <p className="text-xs text-stone-500 mt-1">
              {isAs
                ? "প্ৰতিটো পদক্ষেপ সঠিক পাত্ৰ, উত্তাপৰ জোখ আৰু সময় অনুসৰি নিখুঁতভাৱে পালন কৰক।"
                : "Follow each step precisely with specified utensils, flame levels, and timed durations."}
            </p>
          </div>

          <div className="space-y-3.5">
            {remedy.steps.map((step, idx) => {
              const stepObj = typeof step === "object" ? step : { en: step, as: step };
              const primaryStep = isAs ? stepObj.as : stepObj.en;
              const secondaryStep = isBi && stepObj.as && stepObj.as !== stepObj.en ? stepObj.as : undefined;
              const isCurrentStep = activeAudioStepIndex === idx;

              return (
                <div
                  key={idx}
                  className={`flex items-start gap-4 p-4 rounded-2xl border transition-all ${
                    isCurrentStep
                      ? "bg-amber-100/90 border-amber-500 shadow-md ring-2 ring-amber-400 scale-[1.01]"
                      : "bg-[#FFFDF9] border-stone-200/90 shadow-2xs"
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-xl font-serif font-bold text-sm flex items-center justify-center shrink-0 mt-0.5 shadow-xs transition-colors ${
                      isCurrentStep
                        ? "bg-amber-800 text-white animate-pulse"
                        : "bg-amber-600 text-white"
                    }`}
                  >
                    {idx + 1}
                  </div>
                  <div className="flex-1 space-y-1 pt-0.5">
                    <p className="text-xs sm:text-sm text-stone-900 leading-relaxed font-sans font-medium">
                      {primaryStep}
                    </p>
                    {secondaryStep && (
                      <p className="text-xs text-emerald-900/90 leading-relaxed font-sans font-semibold pt-1 border-t border-amber-100/60">
                        {secondaryStep}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Optional Chef's / Grandmother's Tip */}
          {tipText && (
            <div className="mt-4 p-4 rounded-2xl bg-amber-50/80 border border-amber-300/80 flex items-start gap-3">
              <div className="w-7 h-7 rounded-lg bg-amber-200 text-amber-900 flex items-center justify-center shrink-0 mt-0.5">
                <Lightbulb className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-bold text-amber-950 uppercase tracking-wide">
                  {isAs
                    ? UI_TRANSLATIONS.remedyDetail.grandmothersTip.as
                    : isEn
                    ? UI_TRANSLATIONS.remedyDetail.grandmothersTip.en
                    : UI_TRANSLATIONS.remedyDetail.grandmothersTip.bilingual}
                </div>
                <p className="text-xs text-stone-800 mt-1 leading-relaxed font-medium">
                  {tipText}
                </p>
              </div>
            </div>
          )}
        </section>

        {/* Section 3: Age Group Dosage Safety Table */}
        <section className="my-8">
          <div className="pb-3 border-b border-stone-100 mb-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-serif font-bold text-stone-900 flex items-center gap-2">
                <span className="text-emerald-700">⚖️</span>
                <span>
                  {isAs
                    ? UI_TRANSLATIONS.remedyDetail.dosageSafetyTitle.as
                    : isEn
                    ? UI_TRANSLATIONS.remedyDetail.dosageSafetyTitle.en
                    : UI_TRANSLATIONS.remedyDetail.dosageSafetyTitle.bilingual}
                </span>
              </h2>
              <span className="text-[11px] font-bold uppercase text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                {isAs ? "নিৰাপত্তা নিৰ্দেশনা" : "Mandatory Safety"}
              </span>
            </div>
            <p className="text-xs text-stone-500 mt-1">
              {isAs
                ? UI_TRANSLATIONS.remedyDetail.dosageNotice.as
                : UI_TRANSLATIONS.remedyDetail.dosageNotice.en}
            </p>
          </div>

          {/* Feature 7: Family Profile Switcher */}
          <div className="mb-6 no-print bg-stone-50/70 p-4 rounded-2xl border border-stone-200">
            <FamilyProfileSelector />
          </div>

          {/* New Feature 3: Prakriti / Dosha Personalization Note */}
          {doshaProfile ? (
            <div className="mb-6 p-4 rounded-2xl bg-emerald-50/80 border border-emerald-300 text-emerald-950 flex items-start gap-3">
              <div className="w-8 h-8 rounded-xl bg-emerald-700 text-white flex items-center justify-center shrink-0 mt-0.5">
                <HeartPulse className="w-4 h-4" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-900">
                    {isAs ? `প্ৰকৃতি পৰামৰ্শ (${doshaProfile} প্ৰকৃতি):` : `Prakriti Note (${doshaProfile} Constitution):`}
                  </span>
                  <span className="text-[10px] bg-emerald-200/70 text-emerald-900 font-bold px-2 py-0.5 rounded-full">
                    Personalized
                  </span>
                </div>
                <p className="text-xs text-emerald-900/90 leading-relaxed font-medium">
                  {doshaProfile.includes("Pitta")
                    ? isAs
                      ? "আপোনাৰ দেহত পিত্তৰ মাত্ৰা অধিক। যদি এই উপচাৰত জালুক বা শুকান আদা আছে, জালুকৰ পৰিমাণ মাত্ৰ এচিমুটলৈ হ্ৰাস কৰক আৰু এচামুচ মৌৰি (Fennel) গুড়ি মিহলাই লওক।"
                      : "Your constitution is Pitta-dominant (Fire). If sensitive to heat or acidity, reduce black pepper/chili to a mild pinch and optionally stir in 1/2 tsp crushed cooling Fennel (Mouri)."
                    : doshaProfile.includes("Vata")
                    ? isAs
                      ? "আপোনাৰ দেহত বায়ুৰ মাত্ৰা অধিক। উপচাৰটো সদায় কুহুমীয়া আৰু উমালকৈ খাব; পৰাপক্ষত আধা চামুচ খাঁটি গৰুৰ ঘিউ বা মিঠাতেল মিহলাই ল'লে স্নায়ু শান্ত হয়।"
                      : "Your constitution is Vata-dominant (Air/Dryness). Consume this preparation comfortably warm; adding 1/4 tsp pure cow ghee or warming ginger helps soothe nervous agitation."
                    : isAs
                    ? "আপোনাৰ দেহত কফৰ মাত্ৰা অধিক। উপচাৰটো গৰমে গৰমে খাওক আৰু অধিক মিঠা বা গাখীৰ যোগ কৰাৰ পৰা বিৰত থাকক যাতে কফ সোনকালে পমি যায়।"
                    : "Your constitution is Kapha-dominant (Water/Sluggishness). Sip this preparation hot; avoid heavy sweeteners or dairy additions to rapidly liquefy chest and throat mucus."}
                </p>
              </div>
            </div>
          ) : (
            <div className="mb-6 p-3.5 rounded-2xl bg-amber-50/60 border border-amber-200 text-xs flex items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-stone-700">
                <HeartPulse className="w-4 h-4 text-amber-700 shrink-0" />
                <span>
                  {isAs
                    ? "আপোনাৰ আয়ুৰ্বেদিক দোষ পৰীক্ষা কৰা নাইনে? আপোনাৰ শৰীৰৰ বাবে বিশেষ পৰামৰ্শ পাবলৈ কুইজটো লওক।"
                    : "Discover your Ayurvedic constitution (Vata/Pitta/Kapha) for personalized heating & cooling herbal tips."}
                </span>
              </div>
              <Link
                href="/dosha-assessment"
                className="px-3 py-1.5 rounded-xl bg-amber-700 hover:bg-amber-800 text-white font-bold text-xs shrink-0 transition"
              >
                {isAs ? "কুইজ লওক" : "Take Quiz"}
              </Link>
            </div>
          )}

          {/* Maternal Warning when Pregnancy profile is active */}
          {familyProfile === "pregnancy" && (
            <div className="mb-6 p-4 rounded-2xl bg-pink-50 border-2 border-pink-300 text-pink-950 flex items-start gap-3">
              <span className="text-xl">🤰</span>
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-pink-900">
                  {isAs ? "মাতৃ আৰু গৰ্ভাৱস্থাৰ বিশেষ সাৱধানতা" : "Maternal & Pregnancy Safety Notice"}
                </div>
                <p className="text-xs text-stone-800 mt-1 leading-relaxed">
                  {isAs
                    ? "গৰ্ভাৱস্থা আৰু স্তনপান কৰোৱা সময়ত মেথি, অধিক জৱাইন বা হিং আদি তীব্ৰ গৰম মছলাৰ প্ৰয়োগ কৰাৰ পূৰ্বে ধাত্ৰী বা স্ত্ৰীৰোগ বিশেষজ্ঞৰ পৰামৰ্শ লোৱাটো বাধ্যতামূলক।"
                    : "During pregnancy and lactation, concentrated warm spices (especially heavy Fenugreek, Ajwain, or Asafoetida) should only be consumed after consulting your gynecologist or midwife."}
                </p>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Child Card */}
            <div
              className={`rounded-2xl p-4 sm:p-5 border flex flex-col justify-between transition ${
                familyProfile === "child"
                  ? "bg-amber-100/80 border-amber-500 ring-2 ring-amber-400 shadow-md"
                  : "bg-amber-50/60 border-amber-200"
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2 text-amber-900 font-bold text-sm">
                    <Baby className="w-4 h-4 text-amber-700" />
                    <span>
                      {isAs
                        ? UI_TRANSLATIONS.remedyDetail.childDosage.as
                        : UI_TRANSLATIONS.remedyDetail.childDosage.en}
                    </span>
                  </div>
                  {familyProfile === "child" && (
                    <span className="text-[10px] font-black uppercase tracking-wider bg-amber-800 text-white px-2 py-0.5 rounded-full">
                      {isAs ? "নিৰ্বাচিত" : "Selected"}
                    </span>
                  )}
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-stone-800 leading-relaxed font-medium">
                    {isAs
                      ? typeof remedy.dosage.child === "object"
                        ? remedy.dosage.child.as
                        : remedy.dosage.child_assamese || extractString(remedy.dosage.child)
                      : extractString(remedy.dosage.child)}
                  </p>
                  {isBi && (
                    <p className="text-[11px] text-amber-900/90 leading-relaxed font-semibold pt-1 border-t border-amber-200/50">
                      {typeof remedy.dosage.child === "object"
                        ? remedy.dosage.child.as
                        : remedy.dosage.child_assamese}
                    </p>
                  )}
                </div>
              </div>
              <div className="mt-4 pt-2 border-t border-amber-200/60 text-[10px] text-amber-900 font-semibold">
                ⚠️ {isAs ? "অভিভাৱকৰ চোৱা-চিতা অনিবাৰ্য্য" : "Strict supervision required"}
              </div>
            </div>

            {/* Adult Card */}
            <div
              className={`rounded-2xl p-4 sm:p-5 border flex flex-col justify-between transition ${
                familyProfile === "adult"
                  ? "bg-emerald-100/80 border-emerald-500 ring-2 ring-emerald-400 shadow-md"
                  : "bg-emerald-50/60 border-emerald-200"
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2 text-emerald-900 font-bold text-sm">
                    <User className="w-4 h-4 text-emerald-700" />
                    <span>
                      {isAs
                        ? UI_TRANSLATIONS.remedyDetail.adultDosage.as
                        : UI_TRANSLATIONS.remedyDetail.adultDosage.en}
                    </span>
                  </div>
                  {familyProfile === "adult" && (
                    <span className="text-[10px] font-black uppercase tracking-wider bg-emerald-800 text-white px-2 py-0.5 rounded-full">
                      {isAs ? "নিৰ্বাচিত" : "Selected"}
                    </span>
                  )}
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-stone-800 leading-relaxed font-medium">
                    {isAs
                      ? typeof remedy.dosage.adult === "object"
                        ? remedy.dosage.adult.as
                        : remedy.dosage.adult_assamese || extractString(remedy.dosage.adult)
                      : extractString(remedy.dosage.adult)}
                  </p>
                  {isBi && (
                    <p className="text-[11px] text-emerald-900/90 leading-relaxed font-semibold pt-1 border-t border-emerald-200/50">
                      {typeof remedy.dosage.adult === "object"
                        ? remedy.dosage.adult.as
                        : remedy.dosage.adult_assamese}
                    </p>
                  )}
                </div>
              </div>
              <div className="mt-4 pt-2 border-t border-emerald-200/60 text-[10px] text-emerald-900 font-semibold">
                ✓ {isAs ? "প্ৰামাণিক নিৰাময় মাত্ৰা" : "Standard therapeutic amount"}
              </div>
            </div>

            {/* Elderly Card */}
            <div
              className={`rounded-2xl p-4 sm:p-5 border flex flex-col justify-between transition ${
                familyProfile === "senior"
                  ? "bg-stone-200/90 border-stone-500 ring-2 ring-stone-400 shadow-md"
                  : "bg-stone-100/80 border-stone-200"
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2 text-stone-900 font-bold text-sm">
                    <HeartHandshake className="w-4 h-4 text-stone-700" />
                    <span>
                      {isAs
                        ? UI_TRANSLATIONS.remedyDetail.elderlyDosage.as
                        : UI_TRANSLATIONS.remedyDetail.elderlyDosage.en}
                    </span>
                  </div>
                  {familyProfile === "senior" && (
                    <span className="text-[10px] font-black uppercase tracking-wider bg-stone-800 text-white px-2 py-0.5 rounded-full">
                      {isAs ? "নিৰ্বাচিত" : "Selected"}
                    </span>
                  )}
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-stone-800 leading-relaxed font-medium">
                    {isAs
                      ? typeof remedy.dosage.elderly === "object"
                        ? remedy.dosage.elderly.as
                        : remedy.dosage.elderly_assamese || extractString(remedy.dosage.elderly)
                      : extractString(remedy.dosage.elderly)}
                  </p>
                  {isBi && (
                    <p className="text-[11px] text-stone-800 leading-relaxed font-semibold pt-1 border-t border-stone-200/70">
                      {typeof remedy.dosage.elderly === "object"
                        ? remedy.dosage.elderly.as
                        : remedy.dosage.elderly_assamese}
                    </p>
                  )}
                </div>
              </div>
              <div className="mt-4 pt-2 border-t border-stone-200/60 text-[10px] text-stone-600 font-semibold">
                ⚠️ {isAs ? "ঔষধৰ সৈতে পৰীক্ষা কৰি লওক" : "Cross-check with prescription meds"}
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Dos & Don'ts */}
        <section className="my-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* DOs */}
            <div className="bg-emerald-50/40 rounded-2xl p-4 sm:p-5 border border-emerald-200">
              <h3 className="text-sm font-bold text-emerald-900 flex items-center gap-2 mb-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                <span>
                  {isAs
                    ? UI_TRANSLATIONS.remedyDetail.dosTitle.as
                    : isEn
                    ? UI_TRANSLATIONS.remedyDetail.dosTitle.en
                    : UI_TRANSLATIONS.remedyDetail.dosTitle.bilingual}
                </span>
              </h3>
              <ul className="space-y-2.5 text-xs text-stone-800">
                {remedy.dos.map((item, idx) => {
                  const itemObj = typeof item === "object" ? item : { en: item, as: item };
                  const text = isAs ? itemObj.as : itemObj.en;
                  const secondary = isBi && itemObj.as !== itemObj.en ? itemObj.as : undefined;

                  return (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-emerald-700 shrink-0 font-bold">✓</span>
                      <div>
                        <span>{text}</span>
                        {secondary && (
                          <div className="text-[11px] text-emerald-900/80 font-semibold mt-0.5">
                            {secondary}
                          </div>
                        )}
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* DON'Ts */}
            <div className="bg-amber-50/40 rounded-2xl p-4 sm:p-5 border border-amber-200">
              <h3 className="text-sm font-bold text-amber-900 flex items-center gap-2 mb-3">
                <XCircle className="w-4 h-4 text-amber-700" />
                <span>
                  {isAs
                    ? UI_TRANSLATIONS.remedyDetail.dontsTitle.as
                    : isEn
                    ? UI_TRANSLATIONS.remedyDetail.dontsTitle.en
                    : UI_TRANSLATIONS.remedyDetail.dontsTitle.bilingual}
                </span>
              </h3>
              <ul className="space-y-2.5 text-xs text-stone-800">
                {remedy.donts.map((item, idx) => {
                  const itemObj = typeof item === "object" ? item : { en: item, as: item };
                  const text = isAs ? itemObj.as : itemObj.en;
                  const secondary = isBi && itemObj.as !== itemObj.en ? itemObj.as : undefined;

                  return (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-amber-700 shrink-0 font-bold">✕</span>
                      <div>
                        <span>{text}</span>
                        {secondary && (
                          <div className="text-[11px] text-amber-950 font-semibold mt-0.5">
                            {secondary}
                          </div>
                        )}
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </section>

        {/* Section 5: High-Contrast Red-Flag Warning Box */}
        <section className="my-8">
          <div className="rounded-2xl bg-red-50/90 border-2 border-red-300 p-5 sm:p-6">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-red-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <div className="space-y-2">
                <h3 className="text-sm sm:text-base font-bold text-red-950 flex items-center gap-2">
                  <span>
                    {isAs
                      ? UI_TRANSLATIONS.remedyDetail.redFlagsTitle.as
                      : isEn
                      ? UI_TRANSLATIONS.remedyDetail.redFlagsTitle.en
                      : UI_TRANSLATIONS.remedyDetail.redFlagsTitle.bilingual}
                  </span>
                </h3>
                <p className="text-xs text-red-900 leading-relaxed font-medium">
                  {isAs
                    ? UI_TRANSLATIONS.remedyDetail.redFlagsIntro.as
                    : UI_TRANSLATIONS.remedyDetail.redFlagsIntro.en}
                </p>

                <ul className="space-y-2 pt-2 border-t border-red-200">
                  {remedy.redFlags.map((flag, idx) => {
                    const flagObj = typeof flag === "object" ? flag : { en: flag, as: flag };
                    const text = isAs ? flagObj.as : flagObj.en;
                    const secondary = isBi && flagObj.as !== flagObj.en ? flagObj.as : undefined;

                    return (
                      <li key={idx} className="flex items-start gap-2 text-xs text-red-950 font-medium">
                        <AlertTriangle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                        <div>
                          <span>{text}</span>
                          {secondary && (
                            <div className="text-[11px] font-semibold text-red-900 mt-0.5">
                              {secondary}
                            </div>
                          )}
                        </div>
                      </li>
                    );
                  })}
                </ul>

                {/* Direct Emergency 108 / 112 Speed-Dial Row */}
                <div className="pt-3 border-t border-red-200">
                  <EmergencySpeedDial compact />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Ambient Soundscapes for Sleep & Stress */}
        {(remedy.symptomSlug === "insomnia" ||
          remedy.symptomSlug === "stress-anxiety" ||
          symptomTitle.toLowerCase().includes("sleep") ||
          symptomTitle.toLowerCase().includes("stress")) && (
          <SoundscapesPlayer suggestedAilment={symptomTitle} inlineOnly />
        )}

        {/* Related Remedies */}
        {relatedRemedies.length > 0 && (
          <section className="mt-12 pt-8 border-t border-stone-200 no-print">
            <h3 className="text-base sm:text-lg font-serif font-bold text-stone-900 mb-4">
              {isAs
                ? UI_TRANSLATIONS.remedyDetail.relatedRemedies.as
                : isEn
                ? UI_TRANSLATIONS.remedyDetail.relatedRemedies.en
                : UI_TRANSLATIONS.remedyDetail.relatedRemedies.bilingual}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {relatedRemedies.map((rel) => {
                const relTitle = isAs
                  ? rel.name_assamese || extractString(rel.name)
                  : extractString(rel.name);
                const relSecondary = isBi ? rel.name_assamese : undefined;

                return (
                  <Link
                    key={rel.id}
                    href={`/remedy/${rel.id}`}
                    className="p-4 rounded-2xl bg-stone-50 hover:bg-amber-50/70 border border-stone-200 hover:border-amber-300 transition group flex items-start justify-between gap-3"
                  >
                    <div>
                      <span className="text-[11px] font-bold text-amber-800 uppercase tracking-wide">
                        {getLocalizedText(rel.symptom, currentMode, rel.symptom_assamese)}
                      </span>
                      <h4 className="text-sm font-bold text-stone-900 group-hover:text-amber-900 transition mt-0.5">
                        {relTitle}
                      </h4>
                      {relSecondary && (
                        <div className="text-xs text-emerald-800 font-medium">
                          {relSecondary}
                        </div>
                      )}
                      <span className="text-xs text-stone-500 mt-1 block">
                        ~{rel.prepTimeMinutes} {isAs ? "মিনিট" : "mins"} • {rel.ingredients.length} {isAs ? "উপাদান" : "ingredients"}
                      </span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-stone-400 group-hover:text-amber-700 transition shrink-0 mt-2" />
                  </Link>
                );
              })}
            </div>
          </section>
        )}
      </article>

      {/* Hands-Free Kitchen Cooking Mode Modal */}
      {isKitchenModeOpen && (
        <KitchenCookingMode
          remedy={remedy}
          languageMode={currentMode}
          onClose={() => setIsKitchenModeOpen(false)}
        />
      )}

      {/* Clinical Triage & Doctor Care Log Modal */}
      <CareLogModal
        isOpen={isCareLogOpen}
        onClose={() => setIsCareLogOpen(false)}
      />
    </div>
  );
};
