"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useNiramayStore, DoshaScores } from "@/lib/store";
import { useMounted } from "@/hooks/useMounted";
import {
  HeartPulse,
  Sparkles,
  ArrowRight,
  RotateCcw,
  CheckCircle2,
  ShieldCheck,
  Flame,
  Wind,
  Droplets,
  BookOpen,
} from "lucide-react";

interface Question {
  id: number;
  questionEn: string;
  questionAs: string;
  options: {
    textEn: string;
    textAs: string;
    dosha: "vata" | "pitta" | "kapha";
  }[];
}

const DOSHA_QUESTIONS: Question[] = [
  {
    id: 1,
    questionEn: "Body Frame & Physical Build",
    questionAs: "শৰীৰৰ গঠন আৰু দৈহিক আৱয়ব:",
    options: [
      { textEn: "Slender, light bones, difficulty gaining weight", textAs: "ক্ষীণ, পাতল হাড়, ওজন সহজে নবঢ়া", dosha: "vata" },
      { textEn: "Medium, athletic, moderate muscle development", textAs: "মধ্যমীয়া, সুগঠিত পেশী আৰু সক্ৰিয় শৰীৰ", dosha: "pitta" },
      { textEn: "Broad, heavy bones, easy weight gain and fluid retention", textAs: "বহল, গধুৰ শৰীৰ, সহজে ওজন বৃদ্ধি পোৱা", dosha: "kapha" },
    ],
  },
  {
    id: 2,
    questionEn: "Skin Texture & Sensation",
    questionAs: "ছালৰ প্ৰকৃতি আৰু অনুভূতি:",
    options: [
      { textEn: "Dry, rough, thin, easily chapped in winter", textAs: "শুকান, খহটা, শীতকালত সহজে ফাটি যোৱা", dosha: "vata" },
      { textEn: "Warm, reddish/fair, prone to moles, freckles, rashes", textAs: "উষ্ণ, অলপ ৰঙচুৱা, শালমইনা বা খজুৱতি প্ৰৱণ", dosha: "pitta" },
      { textEn: "Thick, oily, smooth, cool, soft and well-hydrated", textAs: "মসৃণ, ডাঠ, তেলীয়া, শীতল আৰু কোমল", dosha: "kapha" },
    ],
  },
  {
    id: 3,
    questionEn: "Appetite & Digestive Pattern",
    questionAs: "ভোক আৰু পাচন শক্তিৰ ধৰণ:",
    options: [
      { textEn: "Irregular: sometimes very hungry, sometimes forget to eat; prone to gas", textAs: "অস্থিৰ: কেতিয়াবা বৰ ভোক, কেতিয়াবা অৰুচি; গেছ হোৱা", dosha: "vata" },
      { textEn: "Intense, sharp: cannot skip meals without irritability or acidity", textAs: "তীব্ৰ ক্ষুধা: আহাৰ পলম হ'লে খং উঠা বা বুকুপোৰা", dosha: "pitta" },
      { textEn: "Steady, slow: can skip meals comfortably; digestion is heavy/slow", textAs: "মৃদু ক্ষুধা: আহাৰ এৰিলেও কষ্ট নহয়; লাহে লাহে হজম হোৱা", dosha: "kapha" },
    ],
  },
  {
    id: 4,
    questionEn: "Weather & Climate Preference",
    questionAs: "বতৰ আৰু জলবায়ু সহনশীলতা:",
    options: [
      { textEn: "Averse to cold and windy weather; loves warmth and sun", textAs: "ঠাণ্ডা আৰু বতাহ সহ্য নহয়; ৰ'দ আৰু উমাল ভালপোৱা", dosha: "vata" },
      { textEn: "Averse to heat, bright summer sun, and humidity; loves cool air", textAs: "প্ৰখৰ ৰ'দ আৰু গৰম সহ্য নহয়; শীতল বতাহ ভালপোৱা", dosha: "pitta" },
      { textEn: "Averse to damp, cloudy, humid chill; loves warm dry climates", textAs: "সেমেকা ঠাণ্ডা আৰু মেঘালী বতৰ অপ্ৰিয়; শুকান ৰ'দ পছন্দ", dosha: "kapha" },
    ],
  },
  {
    id: 5,
    questionEn: "Sleep Patterns & Dreams",
    questionAs: "টোপনি আৰু নিদ্ৰাৰ ধৰণ:",
    options: [
      { textEn: "Light, easily interrupted, waking up early; vivid or flying dreams", textAs: "পাতল টোপনি, সহজে সাৰ পোৱা, উৰণ বা অস্থিৰ সপোন", dosha: "vata" },
      { textEn: "Moderate (6-7 hrs), uninterrupted; wake up feeling alert; fiery dreams", textAs: "মধ্যমীয়া (৬-৭ ঘণ্টা), পুৱা সতেজ অনুভৱ, উজ্জ্বল সপোন", dosha: "pitta" },
      { textEn: "Deep, heavy, hard to wake up in morning; peaceful water/nature dreams", textAs: "গভীৰ, গধুৰ টোপনি, পুৱা সোনকালে উঠিবলৈ টান পোৱা", dosha: "kapha" },
    ],
  },
  {
    id: 6,
    questionEn: "Response to Stress & Tension",
    questionAs: "মানসিক চাপ আৰু উদ্বেগৰ প্ৰতিক্ৰিয়া:",
    options: [
      { textEn: "Anxiety, worry, racing thoughts, restlessness", textAs: "ভয়, উদ্বেগ, অস্থিৰ চিন্তা আৰু ব্যাকুলতা", dosha: "vata" },
      { textEn: "Frustration, short temper, impatience, sharp speech", textAs: "অসহনশীলতা, খং উঠা আৰু বিৰক্তি প্ৰকাশ", dosha: "pitta" },
      { textEn: "Withdrawal, stubbornness, procrastination, complacency", textAs: "নীৰৱ হৈ পৰা, এলেহুৱা ভাব আৰু কথা স্থগিত ৰখা", dosha: "kapha" },
    ],
  },
  {
    id: 7,
    questionEn: "Joints & Physical Movement",
    questionAs: "গাঁঠি আৰু শাৰীৰিক গতিবিধি:",
    options: [
      { textEn: "Cracking popping joints, quick brisk walking, fidgety", textAs: "গাঁঠি ফুটাৰ শব্দ, খৰকৈ খোজ কঢ়া, হাত-ভৰি লৰাই থকা", dosha: "vata" },
      { textEn: "Loose flexible joints, purposeful steady stride, energetic", textAs: "নমনীয় গাঁঠি, দৃঢ় খোজ, আত্মবিশ্বাসী চলাচল", dosha: "pitta" },
      { textEn: "Strong, well-lubricated large joints, graceful slow movement", textAs: "মজবুত টান গাঁঠি, ধীৰ-স্থিৰ আৰু শান্ত চলাচল", dosha: "kapha" },
    ],
  },
  {
    id: 8,
    questionEn: "Bowel Elimination",
    questionAs: "শৌচ আৰু পেট চাফা হোৱাৰ প্ৰকৃতি:",
    options: [
      { textEn: "Prone to dry constipation, gas, irregularity", textAs: "শুকান শৌচ, শৌচ কঠিন হোৱা আৰু গেছৰ সমস্যা", dosha: "vata" },
      { textEn: "Soft, loose, frequent; burning sensation if spicy food eaten", textAs: "নৰম শৌচ, মছলা খালে পেট পোৰা আৰু লৰচৰ হোৱা", dosha: "pitta" },
      { textEn: "Heavy, sluggish, regular once daily without strain", textAs: "গধুৰ, নিয়মিত দিনে এবাৰ, কোনো ধৰণৰ টান নোপোৱা", dosha: "kapha" },
    ],
  },
  {
    id: 9,
    questionEn: "Speech & Communication",
    questionAs: "কথা-বতৰা আৰু যোগাযোগৰ ভংগী:",
    options: [
      { textEn: "Fast, talkative, changes topics rapidly, expressive", textAs: "দ্ৰুত, বহু কথা কোৱা, সহজে বিষয় সলনি কৰা", dosha: "vata" },
      { textEn: "Clear, precise, convincing, passionate, direct", textAs: "স্পষ্ট, যুক্তিবাদী, পোনপটীয়া আৰু আত্মবিশ্বাসী", dosha: "pitta" },
      { textEn: "Slow, melodious, calm, thoughtful, speaks only when needed", textAs: "ধীৰ, শান্ত, চিন্তা কৰি কোৱা আৰু কম কথা কোৱা", dosha: "kapha" },
    ],
  },
  {
    id: 10,
    questionEn: "Memory & Learning Speed",
    questionAs: "স্মৰণ শক্তি আৰু শিকিব পৰা ক্ষমতা:",
    options: [
      { textEn: "Grasps new ideas quickly, but forgets quickly too", textAs: "সোনকালে বুজি পায়, কিন্তু সহজে পাহৰি যায়", dosha: "vata" },
      { textEn: "Sharp intellect, good organized memory, analytical", textAs: "তীক্ষ্ণ বুদ্ধি, সুসংগঠিত স্মৃতি আৰু বিশ্লেষণমূলক", dosha: "pitta" },
      { textEn: "Takes time to learn, but retains knowledge permanently once grasped", textAs: "শিকিবলৈ অলপ সময় লাগে, কিন্তু পাহৰি নাযায়", dosha: "kapha" },
    ],
  },
];

export default function DoshaAssessmentPage() {
  const mounted = useMounted();
  const { languageMode, doshaProfile, doshaScores, setDoshaProfile } = useNiramayStore();
  const isAs = mounted && languageMode === "as";

  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<number, "vata" | "pitta" | "kapha">>({});
  const [isCompleted, setIsCompleted] = useState(Boolean(doshaProfile));

  const currentQ = DOSHA_QUESTIONS[currentIdx];

  const handleSelectOption = (dosha: "vata" | "pitta" | "kapha") => {
    const updated = { ...answers, [currentQ.id]: dosha };
    setAnswers(updated);

    if (currentIdx < DOSHA_QUESTIONS.length - 1) {
      setCurrentIdx((prev) => prev + 1);
    } else {
      // Calculate scores
      calculateAndSaveResult(updated);
    }
  };

  const calculateAndSaveResult = (ans: Record<number, "vata" | "pitta" | "kapha">) => {
    let vCount = 0, pCount = 0, kCount = 0;
    Object.values(ans).forEach((val) => {
      if (val === "vata") vCount++;
      if (val === "pitta") pCount++;
      if (val === "kapha") kCount++;
    });

    const scores: DoshaScores = { vata: vCount, pitta: pCount, kapha: kCount };

    let dominant = "Vata";
    if (pCount > vCount && pCount >= kCount) dominant = "Pitta";
    else if (kCount > vCount && kCount > pCount) dominant = "Kapha";

    // Dual dosha check
    if (Math.abs(vCount - pCount) <= 1 && vCount >= 4) dominant = "Vata-Pitta";
    else if (Math.abs(pCount - kCount) <= 1 && pCount >= 4) dominant = "Pitta-Kapha";
    else if (Math.abs(vCount - kCount) <= 1 && vCount >= 4) dominant = "Vata-Kapha";

    setDoshaProfile(dominant, scores);
    setIsCompleted(true);
  };

  const handleRetake = () => {
    setAnswers({});
    setCurrentIdx(0);
    setIsCompleted(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12 pb-24">
      {/* Header */}
      <div className="max-w-2xl mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold mb-2">
          <HeartPulse className="w-3.5 h-3.5 text-emerald-700" />
          <span>{isAs ? "আয়ুৰ্বেদিক প্ৰকৃতি পৰীক্ষা" : "Ayurvedic Constitution Analysis"}</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-serif font-black text-stone-900">
          {isAs ? "আপোনাৰ দোষ আৰু প্ৰকৃতি পৰীক্ষা" : "Prakriti & Dosha Assessment"}
        </h1>
        <p className="text-xs sm:text-sm text-stone-600 mt-2 leading-relaxed">
          {isAs
            ? "আয়ুৰ্বেদ অনুসাৰে প্ৰতিগৰাকী ব্যক্তিৰ দেহত বাত, পিত্ত আৰু কফৰ এক অনন্য সমাহাৰ থাকে। ১০টা সহজ প্ৰশ্নৰ উত্তৰ দি আপোনাৰ প্ৰকৃতি জানক আৰু ঘৰুৱা উপচাৰত গৰম-শীতল মছলাৰ সঠিক মাত্ৰা বাছক।"
            : "According to traditional Ayurveda, every human body has a unique balance of Vata (Wind), Pitta (Fire), and Kapha (Water/Earth). Complete this 10-question assessment to receive personalized spice substitution notes on all kitchen remedies."}
        </p>
      </div>

      {isCompleted && doshaProfile ? (
        /* Results View */
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-emerald-200/90 shadow-lg space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-100">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                {isAs ? "আপোনাৰ প্ৰধান প্ৰকৃতি:" : "Your Dominant Constitution:"}
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif font-black text-stone-900 mt-2">
                {doshaProfile} {isAs ? "প্ৰকৃতি" : "Constitution"}
              </h2>
              <p className="text-xs sm:text-sm text-stone-600 mt-1 max-w-lg leading-relaxed">
                {doshaProfile.includes("Pitta")
                  ? isAs
                    ? "আপোনাৰ দেহত অগ্নি আৰু পিত্তৰ প্ৰভাৱ অধিক। প্ৰখৰ মছলা (জালুক, আদা, শুকান জলকীয়া)ৰ পৰিমাণ কমাই শীতল মছলা (মৌৰি, ধনীয়া, পুদিনা) ব্যৱহাৰ কৰক।"
                    : "Your body constitution has high Pitta (Fire). You benefit from cooling carminatives (fennel, coriander, mint) and should moderate intense heating spices (excess black pepper, dry ginger)."
                  : doshaProfile.includes("Vata")
                  ? isAs
                    ? "আপোনাৰ দেহত বায়ুৰ প্ৰভাৱ অধিক। শুকান আৰু ঠাণ্ডা আহাৰ পৰিহাৰ কৰি কুহুমীয়া, উমাল আৰু স্নেহযুক্ত ঝোল (ভেদাইলতা, আদা, মিঠাতেল) গ্ৰহণ কৰক।"
                    : "Your constitution is dominated by Vata (Air/Ether). You benefit from warming, well-cooked moist broths (bhedailota, fresh ginger, mustard oil rubs) and warm foot massages."
                  : isAs
                  ? "আপোনাৰ দেহত কফ আৰু স্থিৰতাৰ প্ৰভাৱ অধিক। গধুৰ আৰু শীতল আহাৰ কমাই শুকান আৰু উমাল কাঢ়া (তুলসী, জালুক, আদা)ৰ ব্যৱহাৰ কৰক।"
                  : "Your constitution is dominated by Kapha (Water/Earth). You thrive with warming expectorant decoctions (tulsi, black pepper, dry ginger) and light bitter greens."}
              </p>
            </div>

            <button
              type="button"
              onClick={handleRetake}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-stone-100 hover:bg-stone-200 text-stone-800 transition self-start sm:self-center"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{isAs ? "পুনৰ পৰীক্ষা কৰক" : "Retake Quiz"}</span>
            </button>
          </div>

          {/* Dosha Scores Bar */}
          {doshaScores && (
            <div className="space-y-3">
              <span className="text-xs font-bold text-stone-700 block">
                {isAs ? "আপোনাৰ উত্তৰৰ বিশ্লেষণ:" : "Constitution Distribution:"}
              </span>
              <div className="grid grid-cols-3 gap-3">
                <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-center">
                  <div className="text-xs font-bold text-amber-900 flex items-center justify-center gap-1">
                    <Wind className="w-3.5 h-3.5 text-amber-700" />
                    <span>Vata (বায়ু)</span>
                  </div>
                  <div className="text-2xl font-mono font-black text-amber-800 mt-1">
                    {doshaScores.vata}/10
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-center">
                  <div className="text-xs font-bold text-rose-900 flex items-center justify-center gap-1">
                    <Flame className="w-3.5 h-3.5 text-rose-700" />
                    <span>Pitta (অগ্নি)</span>
                  </div>
                  <div className="text-2xl font-mono font-black text-rose-800 mt-1">
                    {doshaScores.pitta}/10
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-blue-50 border border-blue-200 text-center">
                  <div className="text-xs font-bold text-blue-900 flex items-center justify-center gap-1">
                    <Droplets className="w-3.5 h-3.5 text-blue-700" />
                    <span>Kapha (জল/স্থিৰতা)</span>
                  </div>
                  <div className="text-2xl font-mono font-black text-blue-800 mt-1">
                    {doshaScores.kapha}/10
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Prakriti Note Explanation */}
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-300 text-xs text-emerald-950 flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
            <div>
              <div className="font-bold">
                {isAs ? "স্বয়ংক্ৰিয় উপচাৰ ব্যক্তিগতকৰণ সক্ৰিয়!" : "Automatic Prakriti Notes Activated!"}
              </div>
              <p className="mt-0.5 leading-relaxed">
                {isAs
                  ? "আপোনাৰ প্ৰকৃতি নিৰাময় ভঁৰালৰ প্ৰতিটো উপচাৰ পৃষ্ঠাৰ সৈতে সংযুক্ত হৈছে। যিবোৰ উপচাৰত তীব্ৰ গৰম বা শীতল মছলা আছে, তাত স্বয়ংক্ৰিয়ভাৱে আপোনাৰ বাবে বিকল্প আৰু সাৱধানবাণী দেখা পাব।"
                  : "All remedy detail pages will now surface a tailored 'Prakriti Note' whenever a preparation contains potent heating or cooling spices relevant to your constitution."}
              </p>
            </div>
          </div>

          <div className="pt-2">
            <Link
              href="/categories"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-emerald-700 hover:bg-emerald-800 text-onbrand text-xs font-bold transition shadow-xs"
            >
              <span>{isAs ? "উপচাৰসমূহ অন্বেষণ কৰক" : "Explore Tailored Remedies"}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      ) : (
        /* Quiz Question View */
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-md space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-stone-100">
            <span className="text-xs font-mono font-bold text-emerald-800">
              {isAs ? "প্ৰশ্ন" : "Question"} {currentIdx + 1} / {DOSHA_QUESTIONS.length}
            </span>
            <div className="w-32 h-2 bg-stone-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-emerald-600 transition-all duration-300"
                style={{ width: `${((currentIdx + 1) / DOSHA_QUESTIONS.length) * 100}%` }}
              />
            </div>
          </div>

          <div>
            <h3 className="text-lg sm:text-xl font-serif font-black text-stone-900 leading-snug">
              {isAs ? currentQ.questionAs : currentQ.questionEn}
            </h3>
            <div className="text-xs font-semibold text-emerald-800 mt-1">
              {isAs ? currentQ.questionEn : currentQ.questionAs}
            </div>
          </div>

          <div className="space-y-3">
            {currentQ.options.map((opt, i) => (
              <button
                key={i}
                type="button"
                onClick={() => handleSelectOption(opt.dosha)}
                className="w-full text-left p-4 rounded-2xl bg-stone-50 hover:bg-amber-50/80 border border-stone-200 hover:border-amber-400 transition-all group flex items-center justify-between shadow-2xs"
              >
                <div>
                  <div className="text-xs sm:text-sm font-bold text-stone-900 group-hover:text-amber-950">
                    {isAs ? opt.textAs : opt.textEn}
                  </div>
                  <div className="text-[11px] text-stone-500 mt-0.5">
                    {isAs ? opt.textEn : opt.textAs}
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-stone-400 group-hover:text-amber-700 group-hover:translate-x-1 transition shrink-0 ml-3" />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
