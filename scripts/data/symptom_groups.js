const fs = require('fs');
const path = require('path');

// 1. Definition of the 8 Symptom Groups
const SYMPTOM_GROUPS = [
  {
    id: "digestive",
    label: "Digestive",
    description: "Soothing carminatives, cooling infusions, and digestive tonics for stomach and intestinal balance.",
    symptoms: [
      { id: "acidity", label: "Acidity / Heartburn", label_assamese: "অমলপিত্ত / বুকুৰ জ্বলা-পোৰা" },
      { id: "indigestion", label: "Indigestion", label_assamese: "বদহজম / অপচ" },
      { id: "bloating-gas", label: "Bloating / Gas", label_assamese: "পেটৰ গেছ / উফন্দি উঠা" },
      { id: "constipation", label: "Constipation", label_assamese: "কোষ্ঠকাঠিন্য / শৌচ কচা" },
      { id: "mild-diarrhea", label: "Diarrhea (Mild)", label_assamese: "পাতল শৌচ / পেটৰ অসুখ" },
      { id: "loss-of-appetite", label: "Loss of Appetite", label_assamese: "খোৱাৰ অনিচ্ছা / অৰুচি" },
      { id: "nausea", label: "Nausea", label_assamese: "বমি বমি ভাব / গা-বেয়া লগা" },
      { id: "mild-vomiting", label: "Vomiting (Mild)", label_assamese: "বমি / পেটলৈ অস্বস্তি" },
      { id: "stomach-cramps", label: "Stomach Cramps", label_assamese: "পেটৰ কামোৰণি / শূল বেদনা" },
      { id: "nocturnal-acid-reflux", label: "Acid Reflux at Night", label_assamese: "ৰাতিৰ বুকুৰ জ্বলা-পোৰা" },
    ]
  },
  {
    id: "respiratory",
    label: "Respiratory & Cold",
    description: "Traditional warming kadha, chest rubs, and herbal vapors for upper respiratory relief.",
    symptoms: [
      { id: "common-cold", label: "Common Cold", label_assamese: "চৰ্দি / সাধাৰণ পানীলগা" },
      { id: "cough-dry", label: "Cough (Dry)", label_assamese: "শুকান কাহ" },
      { id: "cough-wet", label: "Cough (Wet/Productive)", label_assamese: "কফযুক্ত সেমেকা কাহ" },
      { id: "sore-throat", label: "Sore Throat", label_assamese: "ডিঙিৰ বিষ / খচখচনি" },
      { id: "nasal-congestion", label: "Nasal Congestion", label_assamese: "বন্ধ নাক / উশাহৰ কষ্ট" },
      { id: "sinus-pressure", label: "Sinus Pressure", label_assamese: "চাইনাছৰ চাপ আৰু বিষ" },
      { id: "mild-fever", label: "Mild Fever", label_assamese: "সামান্য জ্বৰ / গা তপত" },
      { id: "body-ache", label: "Body Ache (Cold/Flu)", label_assamese: "গা-হাতৰ বিষ / ভাগৰ" },
      { id: "chest-congestion", label: "Chest Congestion", label_assamese: "বুকুৰ কফ জমা হোৱা" },
      { id: "seasonal-allergies", label: "Seasonal Allergies / Sneezing", label_assamese: "ঋতুজনিত এলাৰ্জি আৰু হাঁচি" },
    ]
  },
  {
    id: "pain",
    label: "Pain & Ache",
    description: "Gentle natural analgesics, warm oils, and soothing compresses for aches and stiffness.",
    symptoms: [
      { id: "headache-tension", label: "Headache (Tension)", label_assamese: "টেন্সন মূৰৰ বিষ" },
      { id: "mild-migraine", label: "Migraine (Mild)", label_assamese: "আধকপালী মূৰৰ বিষ" },
      { id: "joint-pain", label: "Joint Pain (Mild/Chronic)", label_assamese: "গাঁঠিৰ বিষ / বাত বিষ" },
      { id: "muscle-cramps", label: "Muscle Cramps", label_assamese: "মাংসপেশীৰ টানি ধৰা বিষ" },
      { id: "back-pain", label: "Back Pain (Mild Strain)", label_assamese: "পিঠি আৰু কঁকালৰ বিষ" },
      { id: "toothache", label: "Toothache (Temporary Relief)", label_assamese: "দাঁতৰ বিষ" },
      { id: "earache", label: "Earache (Mild, Non-Infected)", label_assamese: "কাণৰ বিষ" },
      { id: "menstrual-cramps", label: "Menstrual Cramps", label_assamese: "মহিলাৰ মাহেকীয়াৰ বিষ" },
    ]
  },
  {
    id: "skin",
    label: "Skin & External",
    description: "Ayurvedic pastes, botanical poultices, and pure emollients for skin comfort.",
    symptoms: [
      { id: "minor-burns", label: "Minor Burns (Kitchen Burns)", label_assamese: "জুই বা তেলত সামান্য পোৰা" },
      { id: "insect-bites", label: "Insect Bites", label_assamese: "পতংগ বা পোক-পৰুৱাই কামোৰা" },
      { id: "dry-skin", label: "Dry Skin", label_assamese: "খহটা আৰু শুকান ছাল" },
      { id: "minor-cuts", label: "Minor Cuts (First Aid Support)", label_assamese: "সামান্য কটা-ছিঙা" },
      { id: "acne-mild", label: "Acne (Mild)", label_assamese: "শালমইনা / মুখৰ শাল" },
      { id: "sunburn", label: "Sunburn", label_assamese: "ৰ’দত পোৰা ছাল" },
      { id: "chapped-lips", label: "Chapped Lips", label_assamese: "ওঁঠ ফলা / শুকান ওঁঠ" },
      { id: "dandruff", label: "Dandruff", label_assamese: "মূৰৰ উফি" },
    ]
  },
  {
    id: "sleep-stress",
    label: "Sleep, Stress & Energy",
    description: "Nervine relaxants, warm restorative milks, and calming foot oils for tranquil rest.",
    symptoms: [
      { id: "insomnia", label: "Insomnia / Trouble Sleeping", label_assamese: "টোপনি নহা / অনিদ্ৰা" },
      { id: "stress-anxiety", label: "Stress / Mild Anxiety", label_assamese: "মানসিক অস্থিৰতা আৰু চাপ" },
      { id: "fatigue", label: "Fatigue / Low Energy", label_assamese: "অত্যধিক ক্লান্তি আৰু দুৰ্বলতা" },
      { id: "eye-strain", label: "Eye Strain", label_assamese: "চকুৰ ভাগৰ আৰু টান" },
    ]
  },
  {
    id: "womens-health",
    label: "Women's Health",
    description: "Gentle menstrual comfort brews, safe morning queasiness relievers, and postpartum warming practices.",
    symptoms: [
      { id: "menstrual-bloating", label: "Menstrual Bloating", label_assamese: "মাহেকীয়াৰ সময়ৰ পেট ফুলা" },
      { id: "morning-sickness", label: "Morning Sickness (Mild)", label_assamese: "গৰ্ভাৱস্থাৰ প্ৰাৰম্ভিক বমি ভাব" },
      { id: "postpartum-recovery", label: "Postpartum Recovery Warmth Foods", label_assamese: "প্ৰসূতিৰ পৰম্পৰাগত বলকাৰক খাদ্য" },
    ]
  },
  {
    id: "seasonal",
    label: "Seasonal & Immunity",
    description: "Adaptogenic broths, electrolyte replenishments, and preventative rasayanas.",
    symptoms: [
      { id: "seasonal-flu-prevention", label: "Seasonal Flu Prevention", label_assamese: "ঋতুজনিত সংক্ৰমণ প্ৰতিৰোধ" },
      { id: "low-immunity", label: "Low Immunity / General Weakness", label_assamese: "ৰোগ প্ৰতিৰোধ ক্ষমতা বৃদ্ধি" },
      { id: "mild-dehydration", label: "Dehydration (Mild)", label_assamese: "পানীৰ নাটনি / ডিহাইড্ৰেচন" },
      { id: "hangover", label: "Hangover / Overindulgence", label_assamese: "অস্বস্তি / হজমৰ বিজুতি" },
      { id: "motion-sickness", label: "Motion Sickness", label_assamese: "ভ্ৰমণজনিত বমি আৰু মূৰ ঘূৰণি" },
      { id: "hiccups", label: "Hiccups", label_assamese: "হিকটি অহা" },
      { id: "bad-breath", label: "Bad Breath", label_assamese: "মুখৰ দুৰ্গন্ধ" },
    ]
  },
  {
    id: "children",
    label: "Children-Specific",
    description: "Extra gentle, pediatric-safe kitchen comforts with strict age caveats (never honey under 1 year).",
    symptoms: [
      { id: "child-mild-cold", label: "Mild Cold in Children", label_assamese: "শিশুৰ মৃদু চৰ্দি" },
      { id: "teething-discomfort", label: "Teething Discomfort", label_assamese: "কেঁচুৱাৰ দাঁত গজাৰ অস্বস্তি" },
    ]
  }
];

module.exports = { SYMPTOM_GROUPS };
