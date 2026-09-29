import { SymptomCategory as SymptomCategoryType, SymptomCategorySchema, SymptomCategoryGroup } from "@/lib/schema";

export interface SymptomCategory {
  id: string;
  label: string;
  label_assamese?: string;
  description?: string;
  description_assamese?: string;
  symptoms: { id: string; label: string; label_assamese?: string }[];
}

export const symptomCategories: SymptomCategory[] = [
  {
    "id": "digestive",
    "label": "Digestive",
    "label_assamese": "পাচন তন্ত্ৰ আৰু পেটৰ সমস্যা",
    "description": "Soothing carminatives, cooling infusions, and digestive tonics for stomach and intestinal balance.",
    "description_assamese": "পেটৰ অমলপিত্ত, গেছ, বদহজম আৰু অন্যান্য পাচন সমস্যাৰ বাবে প্ৰাকৃতিক বনৌষধি আৰু কাঢ়া।",
    "symptoms": [
      {
        "id": "acidity",
        "label": "Acidity / Heartburn",
        "label_assamese": "অমলপিত্ত / বুকুৰ জ্বলা-পোৰা"
      },
      {
        "id": "indigestion",
        "label": "Indigestion",
        "label_assamese": "বদহজম / অপচ"
      },
      {
        "id": "bloating-gas",
        "label": "Bloating / Gas",
        "label_assamese": "পেটৰ গেছ / উফন্দি উঠা"
      },
      {
        "id": "constipation",
        "label": "Constipation",
        "label_assamese": "কোষ্ঠকাঠিন্য / শৌচ কচা"
      },
      {
        "id": "mild-diarrhea",
        "label": "Diarrhea (Mild)",
        "label_assamese": "পাতল শৌচ / পেটৰ অসুখ"
      },
      {
        "id": "loss-of-appetite",
        "label": "Loss of Appetite",
        "label_assamese": "খোৱাৰ অনিচ্ছা / অৰুচি"
      },
      {
        "id": "nausea",
        "label": "Nausea",
        "label_assamese": "বমি বমি ভাব / গা-বেয়া লগা"
      },
      {
        "id": "mild-vomiting",
        "label": "Vomiting (Mild)",
        "label_assamese": "বমি / পেটলৈ অস্বস্তি"
      },
      {
        "id": "stomach-cramps",
        "label": "Stomach Cramps",
        "label_assamese": "পেটৰ কামোৰণি / শূল বেদনা"
      },
      {
        "id": "nocturnal-acid-reflux",
        "label": "Acid Reflux at Night",
        "label_assamese": "ৰাতিৰ বুকুৰ জ্বলা-পোৰা"
      },
      {
        "id": "acid-taste-mouth",
        "label": "Sour / Acid Taste in Mouth",
        "label_assamese": "মুখত টেঙা ভাব / অম্লিক স্বাদ"
      },
      {
        "id": "heavy-stomach-oily-food",
        "label": "Heaviness After Heavy / Oily Meals",
        "label_assamese": "তেলীয়া খাদ্যৰ পিছত পেট গধূৰ হোৱা"
      },
      {
        "id": "lactose-discomfort",
        "label": "Dairy & Milk Bloat Discomfort",
        "label_assamese": "গাখীৰ খোৱাৰ পিছত পেটৰ বিজুতি"
      },
      {
        "id": "chronic-belching",
        "label": "Frequent Sour Belching & Burping",
        "label_assamese": "সঘনাই টেঙা উগাৰ অহা"
      },
      {
        "id": "intestinal-rumbling",
        "label": "Abdominal Gurgling & Intestinal Gas",
        "label_assamese": "পেটৰ ভিতৰত গৰগৰণি আৰু বায়ু সঞ্চাৰ"
      },
      {
        "id": "sluggish-metabolism",
        "label": "Sluggish Digestion / Mandagni",
        "label_assamese": "মন্থৰ পাচন ক্ৰিয়া / অগ্নিমান্দ্য"
      },
      {
        "id": "post-meal-fullness",
        "label": "Postprandial Fullness & Early Satiety",
        "label_assamese": "খোৱাৰ লগে লগে পেট টান হৈ পৰা"
      },
      {
        "id": "bitter-morning-tongue",
        "label": "Bitter Taste on Tongue in Morning",
        "label_assamese": "ৰাতিপুৱা জিভাত তিতা সোৱাদ"
      },
      {
        "id": "coated-white-tongue",
        "label": "Thick White Tongue Coating",
        "label_assamese": "জিভাত বগা ডাঠ মল জমা হোৱা"
      }
    ]
  },
  {
    "id": "respiratory",
    "label": "Respiratory & Cold",
    "label_assamese": "শ্বাস-প্ৰশ্বাস আৰু চৰ্দি-কাহ",
    "description": "Traditional warming kadha, chest rubs, and herbal vapors for upper respiratory relief.",
    "description_assamese": "চৰ্দি, কাহ, ডিঙিৰ বিষ আৰু বন্ধ নাকৰ পৰা উপশম পাবলৈ ঘৰুৱা চাহ আৰু ভাপৰ উপচাৰ।",
    "symptoms": [
      {
        "id": "common-cold",
        "label": "Common Cold",
        "label_assamese": "চৰ্দি / সাধাৰণ পানীলগা"
      },
      {
        "id": "cough-dry",
        "label": "Cough (Dry)",
        "label_assamese": "শুকান কাহ"
      },
      {
        "id": "cough-wet",
        "label": "Cough (Wet/Productive)",
        "label_assamese": "কফযুক্ত সেমেকা কাহ"
      },
      {
        "id": "sore-throat",
        "label": "Sore Throat",
        "label_assamese": "ডিঙিৰ বিষ / খচখচনি"
      },
      {
        "id": "nasal-congestion",
        "label": "Nasal Congestion",
        "label_assamese": "বন্ধ নাক / উশাহৰ কষ্ট"
      },
      {
        "id": "sinus-pressure",
        "label": "Sinus Pressure",
        "label_assamese": "চাইনাছৰ চাপ আৰু বিষ"
      },
      {
        "id": "mild-fever",
        "label": "Mild Fever",
        "label_assamese": "সামান্য জ্বৰ / গা তপত"
      },
      {
        "id": "body-ache",
        "label": "Body Ache (Cold/Flu)",
        "label_assamese": "গা-হাতৰ বিষ / ভাগৰ"
      },
      {
        "id": "chest-congestion",
        "label": "Chest Congestion",
        "label_assamese": "বুকুৰ কফ জমা হোৱা"
      },
      {
        "id": "seasonal-allergies",
        "label": "Seasonal Allergies / Sneezing",
        "label_assamese": "ঋতুজনিত এলাৰ্জি আৰু হাঁচি"
      },
      {
        "id": "smoke-dust-cough",
        "label": "Smoke & Dust Irritation Cough",
        "label_assamese": "ধূলি-ধোঁৱাজনিত ডিঙিৰ খচখচনি আৰু কাহ"
      },
      {
        "id": "monsoon-damp-cold",
        "label": "Monsoon Damp Cold & Body Chill",
        "label_assamese": "বাৰিষাৰ সেমেকা বতাহৰ চৰ্দি"
      },
      {
        "id": "post-nasal-drip",
        "label": "Post-Nasal Drip Throat Clearing",
        "label_assamese": "নাকৰ পৰা ডিঙিলৈ পানী বৈ যোৱা"
      },
      {
        "id": "winter-throat-dryness",
        "label": "Winter Dry Scratchy Throat",
        "label_assamese": "শীতকালৰ শুকান ডিঙিৰ খচখচনি"
      },
      {
        "id": "ac-room-dry-throat",
        "label": "Dry Throat from AC & Fan Air",
        "label_assamese": "শীততাপ-নিয়ন্ত্ৰিত কোঠাৰ ডিঙিৰ শুকান ভাব"
      },
      {
        "id": "morning-sneezing",
        "label": "Morning Sneezing Fits",
        "label_assamese": "ৰাতিপুৱাৰ সঘনে হাঁচি অহা"
      },
      {
        "id": "vocal-hoarseness",
        "label": "Voice Strain & Hoarse Throat",
        "label_assamese": "মাত ভঙা / স্বৰভেদ"
      },
      {
        "id": "sticky-throat-phlegm",
        "label": "Sticky Morning Throat Phlegm",
        "label_assamese": "ডিঙিত লাগি ধৰা ডাঠ কফ"
      },
      {
        "id": "uvula-palate-itch",
        "label": "Itchy Palate & Deep Throat Tickle",
        "label_assamese": "তালু আৰু ডিঙিৰ ভিতৰ খজুওৱা"
      }
    ]
  },
  {
    "id": "pain",
    "label": "Pain & Muscle Relief",
    "label_assamese": "বিষ আৰু মাংসপেশীৰ উপশম",
    "description": "Warming liniments, herbal compresses, and anti-inflammatory pastes for joint and body ache.",
    "description_assamese": "গাঁঠিৰ বিষ, পিঠিৰ বিষ, ডিঙি জঠৰ হোৱা আৰু মাংসপেশীৰ টানৰ বাবে তেল মালিচ আৰু সেক।",
    "symptoms": [
      {
        "id": "headache-tension",
        "label": "Headache (Tension)",
        "label_assamese": "টেন্সন মূৰৰ বিষ"
      },
      {
        "id": "mild-migraine",
        "label": "Migraine (Mild)",
        "label_assamese": "আধকপালী মূৰৰ বিষ"
      },
      {
        "id": "joint-pain",
        "label": "Joint Pain (Mild/Chronic)",
        "label_assamese": "গাঁঠিৰ বিষ / বাত বিষ"
      },
      {
        "id": "muscle-cramps",
        "label": "Muscle Cramps",
        "label_assamese": "মাংসপেশীৰ টানি ধৰা বিষ"
      },
      {
        "id": "back-pain",
        "label": "Back Pain (Mild Strain)",
        "label_assamese": "পিঠি আৰু কঁকালৰ বিষ"
      },
      {
        "id": "toothache",
        "label": "Toothache (Temporary Relief)",
        "label_assamese": "দাঁতৰ বিষ"
      },
      {
        "id": "earache",
        "label": "Earache (Mild, Non-Infected)",
        "label_assamese": "কাণৰ বিষ"
      },
      {
        "id": "menstrual-cramps",
        "label": "Menstrual Cramps",
        "label_assamese": "মহিলাৰ মাহেকীয়াৰ বিষ"
      },
      {
        "id": "stiff-neck-sleeping",
        "label": "Wry Neck from Awkward Sleeping",
        "label_assamese": "শুই উঠি ডিঙি জঠৰ হোৱা"
      },
      {
        "id": "heel-foot-ache",
        "label": "Heel & Sole Walking Soreness",
        "label_assamese": "গোৰোহা আৰু তলুৱাৰ বিষ"
      },
      {
        "id": "wrist-hand-strain",
        "label": "Wrist & Finger Typing Strain",
        "label_assamese": "হাতৰ মণিবন্ধ আৰু আঙুলিৰ বিষ"
      },
      {
        "id": "morning-knee-stiffness",
        "label": "Morning Knee Joint Creaking",
        "label_assamese": "ৰাতিপুৱাৰ আঁঠুৰ জঠৰতা"
      },
      {
        "id": "nocturnal-calf-cramps",
        "label": "Night Calf Spasms & Twitches",
        "label_assamese": "নিশা ভৰিৰ কলাফুলৰ টান খোৱা"
      },
      {
        "id": "upper-back-knotting",
        "label": "Upper Back & Shoulder Blade Tension",
        "label_assamese": "কান্ধ আৰু পিঠিৰ ওপৰ অংশৰ খামোচ"
      },
      {
        "id": "shin-splints-heavy-legs",
        "label": "Shin Heaviness & Leg Fatigue",
        "label_assamese": "ভৰিৰ নলি আৰু ভৰিৰ গধূৰ ক্লান্তি"
      },
      {
        "id": "mouth-ulcers",
        "label": "Aphthous Mouth Ulcers & Blisters",
        "label_assamese": "মুখৰ ঘা / চাল ছিগি যোৱা"
      },
      {
        "id": "bleeding-tender-gums",
        "label": "Mild Gum Sponginess & Bleeding",
        "label_assamese": "দাঁতৰ আলু ফুলা আৰু তেজ ওলোৱা"
      },
      {
        "id": "sensitive-teeth",
        "label": "Hot & Cold Tooth Sensitivity",
        "label_assamese": "দাঁত কেঁৰকেৰাই যোৱা / শিৰশিৰণি"
      },
      {
        "id": "outer-ear-itch",
        "label": "Mild Outer Ear Dryness & Itch",
        "label_assamese": "কাণৰ বাহিৰ ভাগৰ শুকান খজুৱতি"
      },
      {
        "id": "senior-joint-creaks",
        "label": "Elderly Weather-Sensitive Joint Creaking",
        "label_assamese": "বয়োজ্যেষ্ঠৰ গাঁঠিৰ শীতলতা আৰু বিষ"
      }
    ]
  },
  {
    "id": "skin",
    "label": "Skin, Hair & External Care",
    "label_assamese": "ছাল, চুলি আৰু বাহ্যিক যত্ন",
    "description": "Cooling topical poultices, antimicrobial rinses, and herbal oils for dermatological comfort.",
    "description_assamese": "চুলি সৰা, ঘামচি, মুখৰ ঘা, গোৰোহা ফটা আৰু ছালৰ ৰুক্ষতা দূৰ কৰিবলৈ প্ৰাকৃতিক প্ৰলেপ।",
    "symptoms": [
      {
        "id": "minor-burns",
        "label": "Minor Burns (Kitchen Burns)",
        "label_assamese": "জুই বা তেলত সামান্য পোৰা"
      },
      {
        "id": "insect-bites",
        "label": "Insect Bites",
        "label_assamese": "পতংগ বা পোক-পৰুৱাই কামোৰা"
      },
      {
        "id": "dry-skin",
        "label": "Dry Skin",
        "label_assamese": "খহটা আৰু শুকান ছাল"
      },
      {
        "id": "minor-cuts",
        "label": "Minor Cuts (First Aid Support)",
        "label_assamese": "সামান্য কটা-ছিঙা"
      },
      {
        "id": "acne-mild",
        "label": "Acne (Mild)",
        "label_assamese": "শালমইনা / মুখৰ শাল"
      },
      {
        "id": "sunburn",
        "label": "Sunburn",
        "label_assamese": "ৰ’দত পোৰা ছাল"
      },
      {
        "id": "chapped-lips",
        "label": "Chapped Lips",
        "label_assamese": "ওঁঠ ফলা / শুকান ওঁঠ"
      },
      {
        "id": "dandruff",
        "label": "Dandruff",
        "label_assamese": "মূৰৰ উফি"
      },
      {
        "id": "hair-fall-support",
        "label": "Seasonal Hair Thinning & Fall",
        "label_assamese": "ঋতুগত চুলি সৰা সমস্যা"
      },
      {
        "id": "oily-greasy-scalp",
        "label": "Excess Sebum & Greasy Scalp",
        "label_assamese": "মূৰৰ ছাল অতিৰিক্ত তেলীয়া হোৱা"
      },
      {
        "id": "premature-hair-greying",
        "label": "Early Greying Traditional Care",
        "label_assamese": "অকালতে চুলি পকা প্ৰতিৰোধ"
      },
      {
        "id": "itchy-flakeless-scalp",
        "label": "Tight Itchy Scalp without Dandruff",
        "label_assamese": "মূৰৰ ছালৰ খজুৱতি আৰু টান ভাব"
      },
      {
        "id": "brittle-split-hair",
        "label": "Split Ends & Weathered Hair",
        "label_assamese": "চুলিৰ আগ ফটা আৰু ৰুক্ষতা"
      },
      {
        "id": "prickly-heat-rash",
        "label": "Prickly Heat & Summer Sweat Rash",
        "label_assamese": "ঘামচি আৰু ছালৰ ৰঙা ফুহা"
      },
      {
        "id": "cracked-dry-heels",
        "label": "Deeply Cracked Rough Heels",
        "label_assamese": "গোৰোহা ফটা আৰু খহটা হোৱা"
      },
      {
        "id": "wind-chapped-cheeks",
        "label": "Wind-Chapped Facial Roughness",
        "label_assamese": "ঠাণ্ডা বতাহত মুখৰ ছাল ফটা"
      }
    ]
  },
  {
    "id": "wellness",
    "label": "General Wellness & Sleep",
    "label_assamese": "সামগ্ৰিক স্বাস্থ্য আৰু নিদ্ৰা",
    "description": "Restorative herbal teas, calming evening milk drafts, and vitality balancers.",
    "description_assamese": "টোপনিৰ বিজুতি, মানসিক ক্লান্তি, চকুৰ অৱসাদ আৰু মহিলাই মাহেকীয়াত ভোগা সমস্যাৰ উপশম।",
    "symptoms": [
      {
        "id": "insomnia",
        "label": "Insomnia / Trouble Sleeping",
        "label_assamese": "টোপনি নহা / অনিদ্ৰা"
      },
      {
        "id": "stress-anxiety",
        "label": "Stress / Mild Anxiety",
        "label_assamese": "মানসিক অস্থিৰতা আৰু চাপ"
      },
      {
        "id": "fatigue",
        "label": "Fatigue / Low Energy",
        "label_assamese": "অত্যধিক ক্লান্তি আৰু দুৰ্বলতা"
      },
      {
        "id": "eye-strain",
        "label": "Eye Strain",
        "label_assamese": "চকুৰ ভাগৰ আৰু টান"
      },
      {
        "id": "menstrual-bloating",
        "label": "Menstrual Bloating",
        "label_assamese": "মাহেকীয়াৰ সময়ৰ পেট ফুলা"
      },
      {
        "id": "morning-sickness",
        "label": "Morning Sickness (Mild)",
        "label_assamese": "গৰ্ভাৱস্থাৰ প্ৰাৰম্ভিক বমি ভাব"
      },
      {
        "id": "postpartum-recovery",
        "label": "Postpartum Recovery Warmth Foods",
        "label_assamese": "প্ৰসূতিৰ পৰম্পৰাগত বলকাৰক খাদ্য"
      },
      {
        "id": "screen-tired-eyes",
        "label": "Screen Exhaustion & Gritty Eyes",
        "label_assamese": "কম্পিউটাৰ পৰ্দাজনিত চকুৰ অৱসাদ"
      },
      {
        "id": "puffy-morning-eyes",
        "label": "Morning Under-Eye Bags & Puffiness",
        "label_assamese": "ৰাতিপুৱা চকু ওফোন্দা / ফুলি উঠা"
      },
      {
        "id": "dry-burning-eyes",
        "label": "Burning Dry Eye Sensation",
        "label_assamese": "চকুৰ পোৰণি আৰু শুকান খৰখৰণি"
      },
      {
        "id": "pms-mood-tension",
        "label": "Premenstrual Tension & Mood Waves",
        "label_assamese": "ঋতুস্ৰাৱৰ পূৰ্বৰ মানসিক অস্বস্তি"
      },
      {
        "id": "hot-flashes-perimenopause",
        "label": "Occasional Flush & Night Heat in Mature Women",
        "label_assamese": "শৰীৰৰ হঠাতে গৰম উঠা ভাব"
      },
      {
        "id": "menstrual-pelvic-heaviness",
        "label": "Lower Pelvic Heaviness during Periods",
        "label_assamese": "মাহেকীয়াৰ তলপেটৰ গধূৰ ভাব"
      },
      {
        "id": "postpartum-back-ache",
        "label": "Postnatal Lower Back Weakness",
        "label_assamese": "প্ৰসৱোত্তৰ কঁকালৰ দুৰ্বলতা"
      },
      {
        "id": "desk-slump-lethargy",
        "label": "Midday Desk Slump & Posture Stiffness",
        "label_assamese": "দীৰ্ঘসময় বহি থকাৰ জড়তা"
      },
      {
        "id": "post-workout-soreness",
        "label": "Post-Exercise Muscle Aches",
        "label_assamese": "ব্যায়ামৰ পিছৰ মাংসপেশীৰ বিষ"
      },
      {
        "id": "afternoon-brain-fog",
        "label": "Mental Lethargy & Lack of Focus",
        "label_assamese": "দুপৰীয়াৰ মানসিক জড়তা আৰু মনোযোগহীনতা"
      },
      {
        "id": "senior-early-awakening",
        "label": "Early Dawn Senior Sleep Fragmentation",
        "label_assamese": "বয়োজ্যেষ্ঠৰ টোপনি ভাগি যোৱা"
      }
    ]
  },
  {
    "id": "seasonal",
    "label": "Seasonal & Weather Care",
    "label_assamese": "ঋতু আৰু বতৰজনিত যত্ন",
    "description": "Targeted kitchen comforts for summer heat exhaustion, winter chills, and environmental changes.",
    "description_assamese": "গৰমৰ ক্লান্তি, শীতৰ হাত-ভৰি ঠাণ্ডা হোৱা আৰু বাৰিষাৰ সেমেকা বতাহৰ বাবে উপচাৰ।",
    "symptoms": [
      {
        "id": "seasonal-flu-prevention",
        "label": "Seasonal Flu Prevention",
        "label_assamese": "ঋতুজনিত সংক্ৰমণ প্ৰতিৰোধ"
      },
      {
        "id": "low-immunity",
        "label": "Low Immunity / General Weakness",
        "label_assamese": "ৰোগ প্ৰতিৰোধ ক্ষমতা বৃদ্ধি"
      },
      {
        "id": "mild-dehydration",
        "label": "Dehydration (Mild)",
        "label_assamese": "পানীৰ নাটনি / ডিহাইড্ৰেচন"
      },
      {
        "id": "hangover",
        "label": "Hangover / Overindulgence",
        "label_assamese": "অস্বস্তি / হজমৰ বিজুতি"
      },
      {
        "id": "motion-sickness",
        "label": "Motion Sickness",
        "label_assamese": "ভ্ৰমণজনিত বমি আৰু মূৰ ঘূৰণি"
      },
      {
        "id": "hiccups",
        "label": "Hiccups",
        "label_assamese": "হিকটি অহা"
      },
      {
        "id": "bad-breath",
        "label": "Bad Breath",
        "label_assamese": "মুখৰ দুৰ্গন্ধ"
      },
      {
        "id": "mild-heat-exhaustion",
        "label": "Summer Heat Lassitude & Thirst",
        "label_assamese": "গৰমৰ ক্লান্তি আৰু অস্বস্তি"
      },
      {
        "id": "cold-extremities",
        "label": "Cold Hands & Feet in Winter",
        "label_assamese": "শীতত হাত-ভৰি ঠাণ্ডা হৈ থকা"
      }
    ]
  },
  {
    "id": "children",
    "label": "Gentle Pediatric & Senior Care",
    "label_assamese": "শিশু আৰু বয়োজ্যেষ্ঠৰ যত্ন",
    "description": "Extra gentle, age-appropriate kitchen comforts with strict safety caveats.",
    "description_assamese": "শিশুৰ মৃদু চৰ্দি, দাঁত গজাৰ অস্বস্তি আৰু বয়োজ্যেষ্ঠৰ গাঁঠিৰ শীতলতাৰ বাবে অতি কোমল উপচাৰ।",
    "symptoms": [
      {
        "id": "child-mild-cold",
        "label": "Mild Cold in Children",
        "label_assamese": "শিশুৰ মৃদু চৰ্দি"
      },
      {
        "id": "teething-discomfort",
        "label": "Teething Discomfort",
        "label_assamese": "কেঁচুৱাৰ দাঁত গজাৰ অস্বস্তি"
      },
      {
        "id": "child-bedtime-restlessness",
        "label": "Restless Bedtime Settling in Young Children",
        "label_assamese": "শিশুৰ নিশাৰ ছটফটনি আৰু টোপনিৰ বিজুতি"
      },
      {
        "id": "child-picky-appetite",
        "label": "Fussy Picky Appetite in Toddlers",
        "label_assamese": "শিশুৰ খোৱাৰ প্ৰতি অনীহা"
      }
    ]
  }
];

export const SYMPTOM_CATEGORIES: SymptomCategoryType[] = [
  {
    "slug": "acidity",
    "title": "Acidity / Heartburn",
    "assameseTitle": "অমলপিত্ত / বুকুৰ জ্বলা-পোৰা",
    "description": "Soothing kitchen infusions to balance stomach bile and alleviate heartburn naturally.",
    "iconName": "Flame",
    "commonSpices": [
      "Ginger (Aada)",
      "Ajwain (Carom seeds)",
      "Fennel (Mouri)",
      "Cumin (Jeera)",
      "Lemon (Kaji Nemu)",
      "Clove (Long)",
      "Mint (Podina)"
    ],
    "redFlagsSummary": "Severe chest pain radiating to left arm/jaw, vomiting coffee-ground blood, or black tarry stools.",
    "categoryId": "digestive"
  },
  {
    "slug": "indigestion",
    "title": "Indigestion",
    "assameseTitle": "বদহজম / অপচ",
    "description": "Time-tested carminative seeds and digestive buttermilk to stimulate sluggish gastric agni.",
    "iconName": "Wind",
    "commonSpices": [
      "Asafoetida (Hing)",
      "Cumin (Jeera)",
      "Black Salt (Kola Nimokh)",
      "Ginger (Aada)",
      "Curd / Yogurt"
    ],
    "redFlagsSummary": "Rigid, board-like abdomen, inability to pass gas or stool, or sudden unbearable colicky pain.",
    "categoryId": "digestive"
  },
  {
    "slug": "bloating-gas",
    "title": "Bloating / Gas",
    "assameseTitle": "পেটৰ গেছ / উফন্দি উঠা",
    "description": "Antispasmodic seed chews and herbal infusions to rapidly expel trapped gastrointestinal flatulence.",
    "iconName": "Wind",
    "commonSpices": [
      "Ajwain (Carom seeds)",
      "Black Salt",
      "Mint (Podina)",
      "Lemon (Kaji Nemu)",
      "Asafoetida (Hing)"
    ],
    "redFlagsSummary": "Board-like abdominal rigidity, sudden severe distention with high fever, or complete bowel stoppage.",
    "categoryId": "digestive"
  },
  {
    "slug": "constipation",
    "title": "Constipation",
    "assameseTitle": "কোষ্ঠকাঠিন্য / শৌচ কচা",
    "description": "Natural bulk and osmotic lubricators to gently restore smooth bowel peristalsis without dependency.",
    "iconName": "RefreshCw",
    "commonSpices": [
      "Black Raisin (Kismis)",
      "Pure Desi Ghee",
      "Milk",
      "Flaxseed (Tisi)",
      "Lemon (Kaji Nemu)"
    ],
    "redFlagsSummary": "Severe abdominal distention with no bowel movements for over 5 days, or rectal bleeding.",
    "categoryId": "digestive"
  },
  {
    "slug": "mild-diarrhea",
    "title": "Diarrhea (Mild)",
    "assameseTitle": "পাতল শৌচ / পেটৰ অসুখ",
    "description": "Electrolyte-replenishing binding fluids and gentle gut-soothing astringent broths.",
    "iconName": "Activity",
    "commonSpices": [
      "Cumin (Jeera)",
      "Nutmeg (Jaiphal)",
      "Rock Salt",
      "Curd / Yogurt",
      "Pomegranate Peel"
    ],
    "redFlagsSummary": "High fever with bloody/mucus stools (dysentery), severe dehydration, or confusion.",
    "categoryId": "digestive"
  },
  {
    "slug": "loss-of-appetite",
    "title": "Loss of Appetite",
    "assameseTitle": "খোৱাৰ অনিচ্ছা / অৰুচি",
    "description": "Traditional Agni-awakening pre-meal appetizers to stimulate saliva and digestive juices naturally.",
    "iconName": "Sparkles",
    "commonSpices": [
      "Ginger (Aada)",
      "Rock Salt (Saindhava)",
      "Lemon (Kaji Nemu)",
      "Cumin (Jeera)"
    ],
    "redFlagsSummary": "Unexplained significant weight loss, chronic low-grade fever, or persistent jaundice signs.",
    "categoryId": "digestive"
  },
  {
    "slug": "nausea",
    "title": "Nausea",
    "assameseTitle": "বমি বমি ভাব / গা-বেয়া লগা",
    "description": "Aromatic citrus rubs and soothing spice chews to reset vestibular nausea and calm gag reflexes.",
    "iconName": "Compass",
    "commonSpices": [
      "Lemon (Kaji Nemu)",
      "Black Salt",
      "Cardamom (Elaichi)",
      "Clove (Long)",
      "Ginger (Aada)"
    ],
    "redFlagsSummary": "Nausea following head trauma, accompanied by chest pressure, or inability to retain fluids.",
    "categoryId": "digestive"
  },
  {
    "slug": "mild-vomiting",
    "title": "Vomiting (Mild)",
    "assameseTitle": "বমি / পেটলৈ অস্বস্তি",
    "description": "Gentle spoonful sips and cooling infusions to quiet gastric contractions safely.",
    "iconName": "Compass",
    "commonSpices": [
      "Mint (Podina)",
      "Honey (Mou)",
      "Coriander seeds (Dhania)",
      "Cumin (Jeera)",
      "Rock Sugar"
    ],
    "redFlagsSummary": "Vomiting blood or coffee-ground material, stiff neck with fever, or severe dehydration.",
    "categoryId": "digestive"
  },
  {
    "slug": "stomach-cramps",
    "title": "Stomach Cramps",
    "assameseTitle": "পেটৰ কামোৰণি / শূল বেদনা",
    "description": "Warm antispasmodic decoctions to relax visceral intestinal smooth muscle tension.",
    "iconName": "Activity",
    "commonSpices": [
      "Ajwain (Carom seeds)",
      "Jaggery (Gur)",
      "Ginger (Aada)",
      "Fennel (Mouri)"
    ],
    "redFlagsSummary": "Severe sharp pain in the lower right abdomen, board-like abdomen, or high fever with chills.",
    "categoryId": "digestive"
  },
  {
    "slug": "nocturnal-acid-reflux",
    "title": "Acid Reflux at Night",
    "assameseTitle": "ৰাতিৰ বুকুৰ জ্বলা-পোৰা",
    "description": "Mucilaginous bedtime protectors and cooling alkaline drinks to prevent sleep-disrupting acid wash.",
    "iconName": "Moon",
    "commonSpices": [
      "Licorice (Mulethi)",
      "Milk",
      "Fennel (Mouri)",
      "Basil Seeds (Sabja)",
      "Mishri"
    ],
    "redFlagsSummary": "Waking up choking on acid, pain radiating to left arm/jaw, or chronic difficulty swallowing.",
    "categoryId": "digestive"
  },
  {
    "slug": "common-cold",
    "title": "Common Cold",
    "assameseTitle": "চৰ্দি / সাধাৰণ পানীলগা",
    "description": "Traditional Assamese warming kadha and throat linctuses to clear chills and head colds.",
    "iconName": "ThermometerSnowflake",
    "commonSpices": [
      "Tulsi (Holy Basil)",
      "Ginger (Aada)",
      "Black pepper (Jaluk)",
      "Honey (Mou)",
      "Cinnamon (Dalchini)"
    ],
    "redFlagsSummary": "Stridor, breathing difficulty, coughing blood, or fever above 102°F lasting > 3 days.",
    "categoryId": "respiratory"
  },
  {
    "slug": "cough-dry",
    "title": "Cough (Dry)",
    "assameseTitle": "শুকান কাহ",
    "description": "Demulcent lozenges, roasted spice balms, and mucosal coaters to halt parched hacking coughing fits.",
    "iconName": "Flame",
    "commonSpices": [
      "Clove (Long)",
      "Honey (Mou)",
      "Licorice (Mulethi)",
      "Pure Desi Ghee",
      "Black pepper (Jaluk)"
    ],
    "redFlagsSummary": "Barking croup cough with chest retractions, coughing blood, or cough lasting > 3 weeks.",
    "categoryId": "respiratory"
  },
  {
    "slug": "cough-wet",
    "title": "Cough (Wet/Productive)",
    "assameseTitle": "কফযুক্ত সেমেকা কাহ",
    "description": "Warming mucolytics and expectorants that liquefy thick phlegm for easy natural expulsion.",
    "iconName": "Activity",
    "commonSpices": [
      "Black pepper (Jaluk)",
      "Ginger (Aada)",
      "Tulsi (Holy Basil)",
      "Cinnamon (Dalchini)",
      "Rock Salt"
    ],
    "redFlagsSummary": "Rust-colored or blood-streaked sputum, high fever > 103°F with shaking chills, or wheezing.",
    "categoryId": "respiratory"
  },
  {
    "slug": "sore-throat",
    "title": "Sore Throat",
    "assameseTitle": "ডিঙিৰ বিষ / খচখচনি",
    "description": "Saline-curcuminoid gargles and soothing coating teas to relieve raw, inflamed pharyngeal tissues.",
    "iconName": "Sparkles",
    "commonSpices": [
      "Salt (Nimokh)",
      "Turmeric (Haldi)",
      "Licorice (Mulethi)",
      "Clove (Long)",
      "Ginger (Aada)"
    ],
    "redFlagsSummary": "Inability to swallow own saliva (drooling), muffled voice, or asymmetric throat swelling.",
    "categoryId": "respiratory"
  },
  {
    "slug": "nasal-congestion",
    "title": "Nasal Congestion",
    "assameseTitle": "বন্ধ নাক / উশাহৰ কষ্ট",
    "description": "Aromatic potli inhalations and traditional chest rubs to open blocked nasal passages naturally.",
    "iconName": "Wind",
    "commonSpices": [
      "Ajwain (Carom seeds)",
      "Tulsi (Holy Basil)",
      "Mustard Oil (Mitha Tel)",
      "Garlic (Nohoru)"
    ],
    "redFlagsSummary": "Severe difficulty breathing, nostril flaring in infants, or clear fluid continuous leak after injury.",
    "categoryId": "respiratory"
  },
  {
    "slug": "sinus-pressure",
    "title": "Sinus Pressure",
    "assameseTitle": "চাইনাছৰ চাপ আৰু বিষ",
    "description": "Herbal steam vapors and clear pepper broths to drain maxillary and frontal sinus cavities.",
    "iconName": "Activity",
    "commonSpices": [
      "Turmeric (Haldi)",
      "Mint (Podina)",
      "Black pepper (Jaluk)",
      "Garlic (Nohoru)",
      "Ginger (Aada)"
    ],
    "redFlagsSummary": "Periorbital eye swelling/redness, vision changes, or severe forehead pain with high fever.",
    "categoryId": "respiratory"
  },
  {
    "slug": "mild-fever",
    "title": "Mild Fever",
    "assameseTitle": "সামান্য জ্বৰ / গা তপত",
    "description": "Cooling diaphoretic teas and nourishing hydration broths to support natural immune febrifuge action.",
    "iconName": "Thermometer",
    "commonSpices": [
      "Tulsi (Holy Basil)",
      "Coriander seeds (Dhania)",
      "Raisins (Kismis)",
      "Ginger (Aada)",
      "Mishri"
    ],
    "redFlagsSummary": "Fever in infants under 3 months, fever > 103°F, petechial purple rash, or stiff neck.",
    "categoryId": "respiratory"
  },
  {
    "slug": "body-ache",
    "title": "Body Ache (Cold/Flu)",
    "assameseTitle": "গা-হাতৰ বিষ / ভাগৰ",
    "description": "Warm herbal oil rubs and anti-inflammatory golden decoctions to melt away flu-related muscle soreness.",
    "iconName": "Bone",
    "commonSpices": [
      "Mustard Oil (Mitha Tel)",
      "Garlic (Nohoru)",
      "Turmeric (Haldi)",
      "Ginger (Aada)",
      "Camphor"
    ],
    "redFlagsSummary": "Severe calf pain/redness on one side, extreme muscle breakdown (dark urine), or high fever.",
    "categoryId": "respiratory"
  },
  {
    "slug": "chest-congestion",
    "title": "Chest Congestion",
    "assameseTitle": "বুকুৰ কফ জমা হোৱা",
    "description": "Warming transdermal chest compresses and bronchial steam to loosen stubborn catarrh.",
    "iconName": "Wind",
    "commonSpices": [
      "Mustard Oil (Mitha Tel)",
      "Garlic (Nohoru)",
      "Tulsi (Holy Basil)",
      "Black pepper (Jaluk)"
    ],
    "redFlagsSummary": "Blue lips/fingertips (hypoxia), gasping for breath, or coughing up frank blood.",
    "categoryId": "respiratory"
  },
  {
    "slug": "seasonal-allergies",
    "title": "Seasonal Allergies / Sneezing",
    "assameseTitle": "ঋতুজনিত এলাৰ্জি আৰু হাঁচি",
    "description": "Natural mast-cell stabilizing honey pastes and antihistaminic herbal teas for pollen and dust sensitivity.",
    "iconName": "Sun",
    "commonSpices": [
      "Turmeric (Haldi)",
      "Black pepper (Jaluk)",
      "Honey (Mou)",
      "Tulsi (Holy Basil)",
      "Mint (Podina)"
    ],
    "redFlagsSummary": "Swelling of lips/tongue, difficulty breathing, or severe wheezing (anaphylaxis warning).",
    "categoryId": "respiratory"
  },
  {
    "slug": "headache-tension",
    "title": "Headache (Tension)",
    "assameseTitle": "টেন্সন মূৰৰ বিষ",
    "description": "Ginger infusions and cooling forehead compresses to soothe tight cranial and neck muscles.",
    "iconName": "Brain",
    "commonSpices": [
      "Ginger (Aada)",
      "Clove (Long)",
      "Tea Leaves",
      "Cardamom (Elaichi)",
      "Sandalwood"
    ],
    "redFlagsSummary": "Sudden explosive 'thunderclap' headache, slurred speech/weakness, or stiff neck with fever.",
    "categoryId": "pain"
  },
  {
    "slug": "mild-migraine",
    "title": "Migraine (Mild)",
    "assameseTitle": "আধকপালী মূৰৰ বিষ",
    "description": "Cooling Pitta brews and cold herbal compresses to quiet pulsating vascular headache waves.",
    "iconName": "Brain",
    "commonSpices": [
      "Coriander seeds (Dhania)",
      "Cardamom (Elaichi)",
      "Ginger (Aada)",
      "Mint (Podina)",
      "Mishri"
    ],
    "redFlagsSummary": "Worst headache of life, sudden vision loss, or headache lasting continuously > 72 hours.",
    "categoryId": "pain"
  },
  {
    "slug": "joint-pain",
    "title": "Joint Pain (Mild/Chronic)",
    "assameseTitle": "গাঁঠিৰ বিষ / বাত বিষ",
    "description": "Warm garlic-infused oil rubs and soaked fenugreek waters to ease stiffness and nourish joints.",
    "iconName": "Bone",
    "commonSpices": [
      "Mustard Oil (Mitha Tel)",
      "Garlic (Nohoru)",
      "Fenugreek (Methi)",
      "Turmeric (Haldi)"
    ],
    "redFlagsSummary": "Joint fiery red, hot to touch with high fever (septic arthritis), or inability to bear weight after fall.",
    "categoryId": "pain"
  },
  {
    "slug": "muscle-cramps",
    "title": "Muscle Cramps",
    "assameseTitle": "মাংসপেশীৰ টানি ধৰা বিষ",
    "description": "Warm transdermal mineral rubs and restorative electrolyte waters to release painful muscular spasms.",
    "iconName": "Activity",
    "commonSpices": [
      "Sesame Oil (Til Tel)",
      "Rock Salt (Saindhava)",
      "Cumin (Jeera)",
      "Jaggery (Gur)"
    ],
    "redFlagsSummary": "Calf swollen, red, hot and painful (deep vein thrombosis), or dark cola-colored urine.",
    "categoryId": "pain"
  },
  {
    "slug": "back-pain",
    "title": "Back Pain (Mild Strain)",
    "assameseTitle": "পিঠি আৰু কঁকালৰ বিষ",
    "description": "Penetrating warm oil massage and moist herbal poultices for strained paraspinal muscles.",
    "iconName": "Bone",
    "commonSpices": [
      "Mustard Oil (Mitha Tel)",
      "Garlic (Nohoru)",
      "Ajwain (Carom seeds)",
      "Ginger (Aada)",
      "Fenugreek"
    ],
    "redFlagsSummary": "Loss of bowel/bladder control, groin numbness, or shooting pain below knee with foot drop.",
    "categoryId": "pain"
  },
  {
    "slug": "toothache",
    "title": "Toothache (Temporary Relief)",
    "assameseTitle": "দাঁতৰ বিষ",
    "description": "Direct whole clove eugenol pressure and osmotic warm saline baths for temporary dental nerve comfort.",
    "iconName": "Sparkles",
    "commonSpices": [
      "Clove (Long)",
      "Rock Salt",
      "Turmeric (Haldi)",
      "Warm Water"
    ],
    "redFlagsSummary": "Spreading swelling of cheek/jaw/neck, difficulty swallowing or breathing (Ludwig's angina).",
    "categoryId": "pain"
  },
  {
    "slug": "earache",
    "title": "Earache (Mild, Non-Infected)",
    "assameseTitle": "কাণৰ বিষ",
    "description": "External warm garlic rubs and dry salt thermal compresses around the ear contour (strictly outside canal).",
    "iconName": "Sparkles",
    "commonSpices": [
      "Garlic (Nohoru)",
      "Mustard Oil (Mitha Tel)",
      "Rock Salt",
      "Sesame Oil"
    ],
    "redFlagsSummary": "Fluid, pus, or blood draining from ear canal (eardrum rupture), or mastoid bone swelling behind ear.",
    "categoryId": "pain"
  },
  {
    "slug": "menstrual-cramps",
    "title": "Menstrual Cramps",
    "assameseTitle": "মহিলাৰ মাহেকীয়াৰ বিষ",
    "description": "Warming antispasmodic decoctions to relax uterine contractions and encourage smooth circulation.",
    "iconName": "HeartPulse",
    "commonSpices": [
      "Ajwain (Carom seeds)",
      "Jaggery (Gur)",
      "Ginger (Aada)",
      "Cinnamon (Dalchini)"
    ],
    "redFlagsSummary": "Bleeding soaking > 1 pad/hour for 2 hours, massive clots, or sudden agonizing pelvic pain with fever.",
    "categoryId": "pain"
  },
  {
    "slug": "minor-burns",
    "title": "Minor Burns (Kitchen Burns)",
    "assameseTitle": "জুই বা তেলত সামান্য পোৰা",
    "description": "Sterile raw honey dressings and fresh soothing aloe after mandatory 10-minute cool water flushing.",
    "iconName": "Flame",
    "commonSpices": [
      "Pure Honey (Mou)",
      "Aloe Vera (Sal-Kuwari)",
      "Turmeric (Haldi)",
      "Cool Water"
    ],
    "redFlagsSummary": "Burn larger than patient's palm, on face/hands/groin, charred white/black, or yellow pus infection.",
    "categoryId": "skin"
  },
  {
    "slug": "insect-bites",
    "title": "Insect Bites",
    "assameseTitle": "পতংগ বা পোক-পৰুৱাই কামোৰা",
    "description": "Fresh crushed tulsi juice and osmotic salt pastes to neutralize stinging itch and localized swelling.",
    "iconName": "Sparkles",
    "commonSpices": [
      "Tulsi (Holy Basil)",
      "Salt (Nimokh)",
      "Water",
      "Ice"
    ],
    "redFlagsSummary": "Difficulty breathing, lip/tongue swelling after sting (anaphylaxis), or bullseye expanding red rash.",
    "categoryId": "skin"
  },
  {
    "slug": "dry-skin",
    "title": "Dry Skin",
    "assameseTitle": "খহটা আৰু শুকান ছাল",
    "description": "Deeply nourishing traditional lipid balms and botanical oils to restore cracked epidermal moisture.",
    "iconName": "Sparkles",
    "commonSpices": [
      "Pure Desi Ghee",
      "Coconut Oil (Narikol Tel)",
      "Raw Turmeric (Kesa Haldi)",
      "Rose Water"
    ],
    "redFlagsSummary": "Deep bleeding skin fissures with yellow crusts, generalized peeling with fever, or jaundice.",
    "categoryId": "skin"
  },
  {
    "slug": "minor-cuts",
    "title": "Minor Cuts (First Aid Support)",
    "assameseTitle": "সামান্য কটা-ছিঙা",
    "description": "Clean antiseptic turmeric dusting and protective raw honey barriers for washed surface abrasions.",
    "iconName": "ShieldCheck",
    "commonSpices": [
      "Turmeric (Haldi)",
      "Pure Honey (Mou)",
      "Clean Water"
    ],
    "redFlagsSummary": "Pulsing spurting blood, gaping wound needing stitches, dirty rusty puncture, or spreading red streaks.",
    "categoryId": "skin"
  },
  {
    "slug": "acne-mild",
    "title": "Acne (Mild)",
    "assameseTitle": "শালমইনা / মুখৰ শাল",
    "description": "Purifying neem spot pastes and traditional besan ubtans to absorb excess oil and soothe blemishes.",
    "iconName": "Sun",
    "commonSpices": [
      "Neem Leaves",
      "Turmeric (Haldi)",
      "Besan (Gram Flour)",
      "Rose Water"
    ],
    "redFlagsSummary": "Deep painful cystic nodules, pimples in facial danger triangle with high fever, or scarring.",
    "categoryId": "skin"
  },
  {
    "slug": "sunburn",
    "title": "Sunburn",
    "assameseTitle": "ৰ’দত পোৰা ছাল",
    "description": "Chilled cucumber compresses and fresh botanical gels to dissipate trapped solar heat from delicate skin.",
    "iconName": "Sun",
    "commonSpices": [
      "Cucumber (Tiyoh)",
      "Mint (Podina)",
      "Aloe Vera (Sal-Kuwari)",
      "Coconut Oil"
    ],
    "redFlagsSummary": "Extensive skin blistering, sun poisoning (high fever, chills, dizziness), or severe dehydration.",
    "categoryId": "skin"
  },
  {
    "slug": "chapped-lips",
    "title": "Chapped Lips",
    "assameseTitle": "ওঁঠ ফলা / শুকান ওঁঠ",
    "description": "Pure edible lipid barriers and soothing honey creams to heal cracked winter lips naturally.",
    "iconName": "HeartPulse",
    "commonSpices": [
      "Pure Desi Ghee",
      "Pure Honey (Mou)",
      "Milk Cream (Malai)"
    ],
    "redFlagsSummary": "Bleeding cracks at corners of mouth not healing, severe lip blisters, or persistent white scaly patch.",
    "categoryId": "skin"
  },
  {
    "slug": "dandruff",
    "title": "Dandruff",
    "assameseTitle": "মূৰৰ উফি",
    "description": "Traditional probiotic fenugreek masks and citrus-infused coconut oil to eliminate scalp flakes.",
    "iconName": "Sparkles",
    "commonSpices": [
      "Fenugreek (Methi)",
      "Sour Curd (Doi)",
      "Lemon (Kaji Nemu)",
      "Coconut Oil"
    ],
    "redFlagsSummary": "Thick greasy yellow crusts with raw sores, circular bald patches (ringworm), or lymph node swelling.",
    "categoryId": "skin"
  },
  {
    "slug": "insomnia",
    "title": "Insomnia / Trouble Sleeping",
    "assameseTitle": "টোপনি নহা / অনিদ্ৰা",
    "description": "Warm calming spiced milks and adaptogenic evening draughts to ease racing thoughts and encourage deep sleep.",
    "iconName": "Moon",
    "commonSpices": [
      "Nutmeg (Jaiphal)",
      "Cardamom (Elaichi)",
      "Milk",
      "Tulsi (Holy Basil)",
      "Chamomile"
    ],
    "redFlagsSummary": "Severe chronic insomnia > 1 month, waking up gasping/choking (apnea), or severe depression.",
    "categoryId": "sleep-stress"
  },
  {
    "slug": "stress-anxiety",
    "title": "Stress / Mild Anxiety",
    "assameseTitle": "মানসিক অস্থিৰতা আৰু চাপ",
    "description": "Uplifting floral cardamomic infusions and grounding warm sesame foot therapies to settle anxious flutter.",
    "iconName": "HeartPulse",
    "commonSpices": [
      "Cardamom (Elaichi)",
      "Rose Petals",
      "Sesame Oil (Til Tel)",
      "Water"
    ],
    "redFlagsSummary": "Severe chest tightness with impending doom (panic vs heart), thoughts of self-harm, or severe trembling.",
    "categoryId": "sleep-stress"
  },
  {
    "slug": "fatigue",
    "title": "Fatigue / Low Energy",
    "assameseTitle": "অত্যধিক ক্লান্তি আৰু দুৰ্বলতা",
    "description": "Nutritious soaked almond-raisin tonics and fresh vitamin-C rich gooseberry shots to replenish vitality.",
    "iconName": "Sparkles",
    "commonSpices": [
      "Almonds (Badam)",
      "Raisins (Kismis)",
      "Fresh Amla (Indian Gooseberry)",
      "Cardamom (Elaichi)"
    ],
    "redFlagsSummary": "Extreme exhaustion with shortness of breath on mild steps (severe anemia), sudden weight loss, or high fevers.",
    "categoryId": "sleep-stress"
  },
  {
    "slug": "eye-strain",
    "title": "Eye Strain",
    "assameseTitle": "চকুৰ ভাগৰ আৰু টান",
    "description": "Chilled pure rose water pads and cucumber slices to refresh overheated, screen-fatigued eyes.",
    "iconName": "Compass",
    "commonSpices": [
      "Rose Water",
      "Cucumber (Tiyoh)",
      "Clean Cotton"
    ],
    "redFlagsSummary": "Sudden loss of vision, severe eye pain with rainbow halos (glaucoma), or thick yellow pus discharge.",
    "categoryId": "sleep-stress"
  },
  {
    "slug": "menstrual-bloating",
    "title": "Menstrual Bloating",
    "assameseTitle": "মাহেকীয়াৰ সময়ৰ পেট ফুলা",
    "description": "Gentle natural diuretic seed teas to release hormonal fluid retention and ease sluggish bowel transit.",
    "iconName": "HeartPulse",
    "commonSpices": [
      "Fennel (Mouri)",
      "Coriander seeds (Dhania)",
      "Ginger (Aada)",
      "Ajwain (Carom seeds)"
    ],
    "redFlagsSummary": "Abrupt severe abdominal distention not resolving after period, shortness of breath, or one-sided leg swelling.",
    "categoryId": "womens-health"
  },
  {
    "slug": "morning-sickness",
    "title": "Morning Sickness (Mild)",
    "assameseTitle": "গৰ্ভাৱস্থাৰ প্ৰাৰম্ভিক বমি ভাব",
    "description": "Gentle ginger and roasted cumin sips strictly formulated for safe relief of early pregnancy queasiness.",
    "iconName": "Compass",
    "commonSpices": [
      "Ginger (Aada)",
      "Lemon (Kaji Nemu)",
      "Cumin (Jeera)",
      "Mishri (Rock Sugar)"
    ],
    "redFlagsSummary": "Inability to keep any fluids down for 24 hours (Hyperemesis Gravidarum), dark urine, or fainting.",
    "categoryId": "womens-health"
  },
  {
    "slug": "postpartum-recovery",
    "title": "Postpartum Recovery Warmth Foods",
    "assameseTitle": "প্ৰসূতিৰ পৰম্পৰাগত বলকাৰক খাদ্য",
    "description": "Traditional warming Assamese postpartum foods to aid uterine involution, restore strength, and support lactation.",
    "iconName": "HeartPulse",
    "commonSpices": [
      "Fenugreek (Methi)",
      "Pure Desi Ghee",
      "Garlic (Nohoru)",
      "Jaggery (Gur)",
      "Ginger (Aada)"
    ],
    "redFlagsSummary": "Postpartum hemorrhage soaking > 1 pad/hour, high fever with foul discharge (sepsis), or severe chest pain.",
    "categoryId": "womens-health"
  },
  {
    "slug": "seasonal-flu-prevention",
    "title": "Seasonal Flu Prevention",
    "assameseTitle": "ঋতুজনিত সংক্ৰমণ প্ৰতিৰোধ",
    "description": "Potent heritage Assamese kadha and five-spice cleansing broths to fortify mucosal immunity against seasonal viruses.",
    "iconName": "ShieldCheck",
    "commonSpices": [
      "Tulsi (Holy Basil)",
      "Black pepper (Jaluk)",
      "Ginger (Aada)",
      "Cinnamon (Dalchini)",
      "Garlic"
    ],
    "redFlagsSummary": "Sudden high fever > 103°F with extreme prostration, respiratory difficulty, or cyanosis.",
    "categoryId": "seasonal"
  },
  {
    "slug": "low-immunity",
    "title": "Low Immunity / General Weakness",
    "assameseTitle": "ৰোগ প্ৰতিৰোধ ক্ষমতা বৃদ্ধি",
    "description": "Black cumin rejuvenation pastes and fresh wild Amla shots to enhance cellular defense and energy.",
    "iconName": "ShieldCheck",
    "commonSpices": [
      "Black Cumin (Kolajira)",
      "Pure Honey (Mou)",
      "Fresh Amla",
      "Ginger (Aada)",
      "Turmeric"
    ],
    "redFlagsSummary": "Chronic fevers with night sweats and rapid weight loss, recurrent pneumonia, or hard enlarged lymph nodes.",
    "categoryId": "seasonal"
  },
  {
    "slug": "mild-dehydration",
    "title": "Dehydration (Mild)",
    "assameseTitle": "পানীৰ নাটনি / ডিহাইড্ৰেচন",
    "description": "Balanced oral sodium-glucose and potassium hydration waters for rapid cellular fluid replenishment.",
    "iconName": "Activity",
    "commonSpices": [
      "Lemon (Kaji Nemu)",
      "Rock Salt (Saindhava)",
      "Mishri (Rock Sugar)",
      "Tender Coconut Water"
    ],
    "redFlagsSummary": "Sunken eyes, lack of tears, absence of urination for > 8 hours, confusion, or loss of skin turgor.",
    "categoryId": "seasonal"
  },
  {
    "slug": "hangover",
    "title": "Hangover / Overindulgence",
    "assameseTitle": "অস্বস্তি / হজমৰ বিজুতি",
    "description": "Electrolyte-fructose flushes and cooling digestive buttermilk to soothe hepatic stress and post-feast headache.",
    "iconName": "RefreshCw",
    "commonSpices": [
      "Ginger (Aada)",
      "Lemon (Kaji Nemu)",
      "Pure Honey (Mou)",
      "Mint (Podina)",
      "Cumin (Jeera)"
    ],
    "redFlagsSummary": "Persistent vomiting > 12 hours, vomiting blood, severe confusion, or slow irregular breathing (< 8/min).",
    "categoryId": "seasonal"
  },
  {
    "slug": "motion-sickness",
    "title": "Motion Sickness",
    "assameseTitle": "ভ্ৰমণজনিত বমি আৰু মূৰ ঘূৰণি",
    "description": "Traditional ginger chews and salted citrus wedges to quiet motion-induced vestibular disturbance during travel.",
    "iconName": "Compass",
    "commonSpices": [
      "Ginger (Aada)",
      "Mishri (Rock Sugar)",
      "Lemon (Kaji Nemu)",
      "Black Pepper (Jaluk)"
    ],
    "redFlagsSummary": "Symptoms persisting days after trip, severe true vertigo with hearing loss, or continuous vomiting.",
    "categoryId": "seasonal"
  },
  {
    "slug": "hiccups",
    "title": "Hiccups",
    "assameseTitle": "হিকটি অহা",
    "description": "Neurophysiological vagal reflex resets and antispasmodic cardamom sips to halt diaphragmatic flutter.",
    "iconName": "Activity",
    "commonSpices": [
      "Sugar / Mishri",
      "Cardamom (Elaichi)",
      "Warm Water"
    ],
    "redFlagsSummary": "Hiccups lasting continuously > 48 hours, accompanied by chest pain, slurred speech, or weakness.",
    "categoryId": "seasonal"
  },
  {
    "slug": "bad-breath",
    "title": "Bad Breath",
    "assameseTitle": "মুখৰ দুৰ্গন্ধ",
    "description": "Antimicrobial spice chews and astringent herbal rinses that eradicate oral odor bacteria and support gums.",
    "iconName": "Sparkles",
    "commonSpices": [
      "Fennel (Mouri)",
      "Clove (Long)",
      "Cardamom (Elaichi)",
      "Mint (Podina)",
      "Guava Leaves"
    ],
    "redFlagsSummary": "Breath smelling of fruit/acetone (diabetic emergency), ammonia breath, or loose teeth with deep pus pockets.",
    "categoryId": "seasonal"
  },
  {
    "slug": "child-mild-cold",
    "title": "Mild Cold in Children",
    "assameseTitle": "শিশুৰ মৃদু চৰ্দি",
    "description": "Ultra-gentle pediatric sole warmers and mild tulsi waters with strict age-appropriate safeguards.",
    "iconName": "HeartPulse",
    "commonSpices": [
      "Mustard Oil (Mitha Tel)",
      "Garlic (Nohoru)",
      "Tulsi (Holy Basil)",
      "Mishri"
    ],
    "redFlagsSummary": "Chest indrawing, grunting, flaring nostrils, extreme lethargy, or any fever in an infant < 3 months.",
    "categoryId": "children"
  },
  {
    "slug": "teething-discomfort",
    "title": "Teething Discomfort",
    "assameseTitle": "কেঁচুৱাৰ দাঁত গজাৰ অস্বস্তি",
    "description": "Safe natural chilled vegetable teethers and gentle clean-finger counter-pressure under continuous supervision.",
    "iconName": "Sparkles",
    "commonSpices": [
      "Cucumber (Tiyoh)",
      "Carrot",
      "Virgin Coconut Oil",
      "Cold Water"
    ],
    "redFlagsSummary": "High fever > 101°F (teething does NOT cause true high fever), severe diarrhea, or baby refusing all fluids > 12 hrs.",
    "categoryId": "children"
  },
  {
    "slug": "acid-taste-mouth",
    "title": "Sour / Acid Taste in Mouth",
    "assameseTitle": "মুখত টেঙা ভাব / অম্লিক স্বাদ",
    "description": "Alkaline spice washes and cooling digestive infusions to neutralize regurgitated gastric acid lingering in the oral cavity.",
    "iconName": "Flame",
    "commonSpices": [
      "Fennel (Mouri)",
      "Cardamom (Elaichi)",
      "Mint (Podina)",
      "Mishri (Rock Sugar)",
      "Clove (Long)"
    ],
    "redFlagsSummary": "Persistent sour taste with burning difficulty swallowing, unexplained regurgitation of solid food, or unintentional weight loss.",
    "categoryId": "digestive"
  },
  {
    "slug": "heavy-stomach-oily-food",
    "title": "Heaviness After Heavy / Oily Meals",
    "assameseTitle": "তেলীয়া খাদ্যৰ পিছত পেট গধূৰ হোৱা",
    "description": "Aromatic bile-stimulating spice infusions that kickstart sluggish pancreatic enzymes and dissolve dietary fat heaviness.",
    "iconName": "Activity",
    "commonSpices": [
      "Ginger (Aada)",
      "Black pepper (Jaluk)",
      "Lemon (Kaji Nemu)",
      "Ajwain (Carom seeds)",
      "Black Salt (Kola Nimokh)"
    ],
    "redFlagsSummary": "Severe agonizing pain under right ribcage radiating to shoulder blade (gallbladder attack), clay-colored pale stool, or jaundice.",
    "categoryId": "digestive"
  },
  {
    "slug": "lactose-discomfort",
    "title": "Dairy & Milk Bloat Discomfort",
    "assameseTitle": "গাখীৰ খোৱাৰ পিছত পেটৰ বিজুতি",
    "description": "Carminative warm warming infusions with anti-fermentative spices to quiet bloating and gurgling triggered by milk proteins.",
    "iconName": "Sparkles",
    "commonSpices": [
      "Ginger (Aada)",
      "Cinnamon (Dalcheni)",
      "Nutmeg (Jaiphal)",
      "Clove (Long)",
      "Black Salt (Kola Nimokh)"
    ],
    "redFlagsSummary": "Severe bloody stools, acute fever with explosive dehydration, or anaphylactic lip/throat swelling after consuming milk.",
    "categoryId": "digestive"
  },
  {
    "slug": "chronic-belching",
    "title": "Frequent Sour Belching & Burping",
    "assameseTitle": "সঘনাই টেঙা উগাৰ অহা",
    "description": "Gentle gastric tone tonics and trapped air expellers that prevent upward gas reflux and esophagus irritation.",
    "iconName": "Activity",
    "commonSpices": [
      "Ajwain (Carom seeds)",
      "Asafoetida (Hing)",
      "Black Salt (Kola Nimokh)",
      "Cumin (Jeera)",
      "Lemon (Kaji Nemu)"
    ],
    "redFlagsSummary": "Belching accompanied by sudden squeezing chest discomfort, persistent projectile vomiting, or severe epigastric burning.",
    "categoryId": "digestive"
  },
  {
    "slug": "intestinal-rumbling",
    "title": "Abdominal Gurgling & Intestinal Gas",
    "assameseTitle": "পেটৰ ভিতৰত গৰগৰণি আৰু বায়ু সঞ্চাৰ",
    "description": "Smooth muscle soothing warming decoctions that harmonize irregular peristaltic hypermotility in the lower gut.",
    "iconName": "Activity",
    "commonSpices": [
      "Cumin (Jeera)",
      "Coriander seeds (Dhania)",
      "Fennel (Mouri)",
      "Ginger (Aada)",
      "Rock Salt (Saindhava)"
    ],
    "redFlagsSummary": "Audible high-pitched tinkling sounds accompanied by severe abdominal distension with inability to pass gas or stool (bowel obstruction).",
    "categoryId": "digestive"
  },
  {
    "slug": "sluggish-metabolism",
    "title": "Sluggish Digestion / Mandagni",
    "assameseTitle": "মন্থৰ পাচন ক্ৰিয়া / অগ্নিমান্দ্য",
    "description": "Classic trikatu-inspired digestive fire stimulators to clear heavy gut ama, revive saliva flow, and sharpen sluggish digestion.",
    "iconName": "Sparkles",
    "commonSpices": [
      "Ginger (Aada)",
      "Black pepper (Jaluk)",
      "Pure Honey (Mou)",
      "Rock Salt (Saindhava)",
      "Lemon (Kaji Nemu)"
    ],
    "redFlagsSummary": "Persistent nausea with yellowing of sclera (eyes), severe dark urine, or unprovoked rapid weight loss.",
    "categoryId": "digestive"
  },
  {
    "slug": "post-meal-fullness",
    "title": "Postprandial Fullness & Early Satiety",
    "assameseTitle": "খোৱাৰ লগে লগে পেট টান হৈ পৰা",
    "description": "Mild carminative post-meal draughts that encourage timely gastric emptying without provoking acid secretion.",
    "iconName": "Clock",
    "commonSpices": [
      "Fennel (Mouri)",
      "Cardamom (Elaichi)",
      "Mint (Podina)",
      "Ginger (Aada)",
      "Warm Water"
    ],
    "redFlagsSummary": "Feeling painfully full after eating just 2-3 bites lasting over two weeks, accompanied by anemia or chronic vomiting.",
    "categoryId": "digestive"
  },
  {
    "slug": "smoke-dust-cough",
    "title": "Smoke & Dust Irritation Cough",
    "assameseTitle": "ধূলি-ধোঁৱাজনিত ডিঙিৰ খচখচনি আৰু কাহ",
    "description": "Demulcent mucilage coatings and anti-inflammatory throat wraps to soothe particles caught on sensitive pharyngeal linings.",
    "iconName": "Wind",
    "commonSpices": [
      "Turmeric (Haldi)",
      "Pure Honey (Mou)",
      "Black pepper (Jaluk)",
      "Licorice (Jestimadhu)",
      "Warm Milk"
    ],
    "redFlagsSummary": "Audible wheezing or whistling on exhale, chest tightening with cyanotic blue lips, or coughing up blood.",
    "categoryId": "respiratory"
  },
  {
    "slug": "monsoon-damp-cold",
    "title": "Monsoon Damp Cold & Body Chill",
    "assameseTitle": "বাৰিষাৰ সেমেকা বতাহৰ চৰ্দি",
    "description": "Deeply warming spice brews formulated to expel internal moisture and restore internal thermal circulation during wet spells.",
    "iconName": "CloudRain",
    "commonSpices": [
      "Ginger (Aada)",
      "Black pepper (Jaluk)",
      "Tulsi (Holy Basil)",
      "Cinnamon (Dalcheni)",
      "Jaggery (Gur)"
    ],
    "redFlagsSummary": "High spikes of fever accompanied by rigors and violent shivering (malaria/dengue warning), or chest pain during inspiration.",
    "categoryId": "respiratory"
  },
  {
    "slug": "post-nasal-drip",
    "title": "Post-Nasal Drip Throat Clearing",
    "assameseTitle": "নাকৰ পৰা ডিঙিলৈ পানী বৈ যোৱা",
    "description": "Astringent drying herbal rinses and warming nasal steam to thicken clear excessive dripping and protect vocal folds.",
    "iconName": "Droplet",
    "commonSpices": [
      "Turmeric (Haldi)",
      "Salt (Nimokh)",
      "Ginger (Aada)",
      "Tulsi (Holy Basil)",
      "Black pepper (Jaluk)"
    ],
    "redFlagsSummary": "Foul-smelling unilateral nasal discharge (foreign body or deep sinus infection), facial swelling around eye, or high fever.",
    "categoryId": "respiratory"
  },
  {
    "slug": "winter-throat-dryness",
    "title": "Winter Dry Scratchy Throat",
    "assameseTitle": "শীতকালৰ শুকান ডিঙিৰ খচখচনি",
    "description": "Soothing demulcent lipid coats made with grass-fed ghee and mild spices to re-hydrate dry throat mucous membranes.",
    "iconName": "Sun",
    "commonSpices": [
      "Pure Ghee",
      "Black pepper (Jaluk)",
      "Turmeric (Haldi)",
      "Honey (Mou)",
      "Licorice (Jestimadhu)"
    ],
    "redFlagsSummary": "Inability to swallow even saliva or water, drooling, or high fever with white exudate patches on tonsils.",
    "categoryId": "respiratory"
  },
  {
    "slug": "ac-room-dry-throat",
    "title": "Dry Throat from AC & Fan Air",
    "assameseTitle": "শীততাপ-নিয়ন্ত্ৰিত কোঠাৰ ডিঙিৰ শুকান ভাব",
    "description": "Hydrating herbal gargles and bedtime mucosal sealants that shield the pharynx from continuous artificial dehumidified air.",
    "iconName": "Wind",
    "commonSpices": [
      "Cardamom (Elaichi)",
      "Fennel (Mouri)",
      "Mishri (Rock Sugar)",
      "Warm Water",
      "Rose Water"
    ],
    "redFlagsSummary": "Persistent pain lasting over 7 days despite humidification, tender neck lymph nodes, or high fever.",
    "categoryId": "respiratory"
  },
  {
    "slug": "morning-sneezing",
    "title": "Morning Sneezing Fits",
    "assameseTitle": "ৰাতিপুৱাৰ সঘনে হাঁচি অহা",
    "description": "Warming nasal barrier steam and immunity balancing decoctions to stabilize hypersensitive nasal mast cells on waking.",
    "iconName": "Sparkles",
    "commonSpices": [
      "Turmeric (Haldi)",
      "Ginger (Aada)",
      "Tulsi (Holy Basil)",
      "Black pepper (Jaluk)",
      "Pure Honey (Mou)"
    ],
    "redFlagsSummary": "Clear watery nasal fluid leaking continuously from one nostril after head injury (CSF leak), or severe orbital swelling.",
    "categoryId": "respiratory"
  },
  {
    "slug": "vocal-hoarseness",
    "title": "Voice Strain & Hoarse Throat",
    "assameseTitle": "মাত ভঙা / স্বৰভেদ",
    "description": "Natural vocal chord lubricators and laryngeal anti-inflammatory warm infusions to restore clear resonance after overuse.",
    "iconName": "Activity",
    "commonSpices": [
      "Licorice (Jestimadhu)",
      "Pure Ghee",
      "Black pepper (Jaluk)",
      "Warm Water",
      "Honey (Mou)"
    ],
    "redFlagsSummary": "Hoarseness persisting > 2-3 weeks in a smoker or elder (requires laryngoscopy), difficulty breathing, or lump in neck.",
    "categoryId": "respiratory"
  },
  {
    "slug": "sticky-throat-phlegm",
    "title": "Sticky Morning Throat Phlegm",
    "assameseTitle": "ডিঙিত লাগি ধৰা ডাঠ কফ",
    "description": "Gentle expectorants and mucolytic herbal infusions that thin tenacious mucus adhering to the posterior oropharynx.",
    "iconName": "Droplet",
    "commonSpices": [
      "Ginger (Aada)",
      "Black pepper (Jaluk)",
      "Honey (Mou)",
      "Tulsi (Holy Basil)",
      "Clove (Long)"
    ],
    "redFlagsSummary": "Phlegm streaked with frank blood, rust-colored sputum, shortness of breath, or night sweats.",
    "categoryId": "respiratory"
  },
  {
    "slug": "stiff-neck-sleeping",
    "title": "Wry Neck from Awkward Sleeping",
    "assameseTitle": "শুই উঠি ডিঙি জঠৰ হোৱা",
    "description": "Warming spiced oil applications and gentle compress techniques to relax acute sternocleidomastoid and trapezius spasm.",
    "iconName": "Moon",
    "commonSpices": [
      "Mustard Oil (Mitha Tel)",
      "Garlic (Nohoru)",
      "Camphor (Kopur)",
      "Turmeric (Haldi)",
      "Hot Water Compress"
    ],
    "redFlagsSummary": "Inability to touch chin to chest accompanied by high fever and light sensitivity (meningitis flag), or numbness down both arms.",
    "categoryId": "pain"
  },
  {
    "slug": "heel-foot-ache",
    "title": "Heel & Sole Walking Soreness",
    "assameseTitle": "গোৰোহা আৰু তলুৱাৰ বিষ",
    "description": "Stimulating warm herbal foot soaks with magnesium-rich salts and circulation-boosting mustard wraps for plantar fascia tension.",
    "iconName": "Activity",
    "commonSpices": [
      "Rock Salt (Saindhava)",
      "Mustard Oil (Mitha Tel)",
      "Turmeric (Haldi)",
      "Warm Water",
      "Ginger (Aada)"
    ],
    "redFlagsSummary": "Sudden sharp snap in heel followed by inability to flex foot or walk (Achilles tendon rupture), or hot red swollen ankle.",
    "categoryId": "pain"
  },
  {
    "slug": "wrist-hand-strain",
    "title": "Wrist & Finger Typing Strain",
    "assameseTitle": "হাতৰ মণিবন্ধ আৰু আঙুলিৰ বিষ",
    "description": "Warm penetrating herbal oil compresses to reduce tendon friction and nourish fatigued digital flexor sheaths from typing.",
    "iconName": "Activity",
    "commonSpices": [
      "Mustard Oil (Mitha Tel)",
      "Turmeric (Haldi)",
      "Fenugreek (Methi)",
      "Sesame Oil (Til Tel)",
      "Garlic (Nohoru)"
    ],
    "redFlagsSummary": "Constant loss of grip strength, numbness and pins-and-needles waking you up at night in thumb/first two fingers.",
    "categoryId": "pain"
  },
  {
    "slug": "morning-knee-stiffness",
    "title": "Morning Knee Joint Creaking",
    "assameseTitle": "ৰাতিপুৱাৰ আঁঠুৰ জঠৰতা",
    "description": "Traditional synovial-nourishing medicated warm oil applications to lubricate creaky knee cartilage on waking.",
    "iconName": "Activity",
    "commonSpices": [
      "Mustard Oil (Mitha Tel)",
      "Fenugreek (Methi)",
      "Turmeric (Haldi)",
      "Garlic (Nohoru)",
      "Pure Ghee"
    ],
    "redFlagsSummary": "Joint red, intensely hot to the touch with fever (septic arthritis emergency), or knee locking/inability to bear any weight.",
    "categoryId": "pain"
  },
  {
    "slug": "nocturnal-calf-cramps",
    "title": "Night Calf Spasms & Twitches",
    "assameseTitle": "নিশা ভৰিৰ কলাফুলৰ টান খোৱা",
    "description": "Pre-bed neuromuscular calming rubdowns and electrolyte-rich warm drafts to prevent involuntary nocturnal gastrocnemius lockup.",
    "iconName": "Moon",
    "commonSpices": [
      "Mustard Oil (Mitha Tel)",
      "Rock Salt (Saindhava)",
      "Warm Water",
      "Pure Ghee",
      "Black pepper (Jaluk)"
    ],
    "redFlagsSummary": "One calf significantly more swollen, warm, and red than the other (deep vein thrombosis / DVT emergency).",
    "categoryId": "pain"
  },
  {
    "slug": "upper-back-knotting",
    "title": "Upper Back & Shoulder Blade Tension",
    "assameseTitle": "কান্ধ আৰু পিঠিৰ ওপৰ অংশৰ খামোচ",
    "description": "Penetrating dry thermal fomentation and pungent garlic-mustard massage to release rhomboid trigger points.",
    "iconName": "Activity",
    "commonSpices": [
      "Mustard Oil (Mitha Tel)",
      "Garlic (Nohoru)",
      "Ajwain (Carom seeds)",
      "Coarse Salt",
      "Turmeric (Haldi)"
    ],
    "redFlagsSummary": "Pain accompanied by tightness radiating to arm or jaw, shortness of breath, or sweating (atypical cardiac ischemia).",
    "categoryId": "pain"
  },
  {
    "slug": "shin-splints-heavy-legs",
    "title": "Shin Heaviness & Leg Fatigue",
    "assameseTitle": "ভৰিৰ নলি আৰু ভৰিৰ গধূৰ ক্লান্তি",
    "description": "Revitalizing thermal soaks and cooling astringent compresses to drain lactic stagnation from overworked tibialis anterior muscles.",
    "iconName": "Activity",
    "commonSpices": [
      "Rock Salt (Saindhava)",
      "Turmeric (Haldi)",
      "Mustard Oil (Mitha Tel)",
      "Cool Water",
      "Mint (Podina)"
    ],
    "redFlagsSummary": "Severe localized bone pain point-tender to single-finger touch on the tibia bone (possible stress fracture).",
    "categoryId": "pain"
  },
  {
    "slug": "mouth-ulcers",
    "title": "Aphthous Mouth Ulcers & Blisters",
    "assameseTitle": "মুখৰ ঘা / চাল ছিগি যোৱা",
    "description": "Cooling astringent pastes and healing honey-turmeric touch-ups that insulate delicate exposed oral nerve endings.",
    "iconName": "Sparkles",
    "commonSpices": [
      "Turmeric (Haldi)",
      "Pure Honey (Mou)",
      "Licorice (Jestimadhu)",
      "Pure Ghee",
      "Triphala"
    ],
    "redFlagsSummary": "Ulcer that does not heal after 2-3 weeks, non-healing hard ulcer with painless neck lump, or difficulty opening mouth (trismus).",
    "categoryId": "pain"
  },
  {
    "slug": "bleeding-tender-gums",
    "title": "Mild Gum Sponginess & Bleeding",
    "assameseTitle": "দাঁতৰ আলু ফুলা আৰু তেজ ওলোৱা",
    "description": "Antimicrobial astringent rinses and gentle vitamin-C rich spice rubs to tone soft capillary walls in the periodontal tissue.",
    "iconName": "HeartPulse",
    "commonSpices": [
      "Turmeric (Haldi)",
      "Mustard Oil (Mitha Tel)",
      "Rock Salt (Saindhava)",
      "Alum / Guava Leaves",
      "Clove (Long)"
    ],
    "redFlagsSummary": "Teeth visibly loose or shifting position, spontaneous heavy bleeding without provocation, or facial swelling spreading to eyelid.",
    "categoryId": "pain"
  },
  {
    "slug": "bitter-morning-tongue",
    "title": "Bitter Taste on Tongue in Morning",
    "assameseTitle": "ৰাতিপুৱা জিভাত তিতা সোৱাদ",
    "description": "Biliary cleansing digestive waters and oral oil swishes to neutralize upward bile stagnation and freshen morning taste buds.",
    "iconName": "Sparkles",
    "commonSpices": [
      "Fennel (Mouri)",
      "Coriander seeds (Dhania)",
      "Lemon (Kaji Nemu)",
      "Mishri (Rock Sugar)",
      "Mint (Podina)"
    ],
    "redFlagsSummary": "Bitter taste accompanied by dark amber urine, pale stools, or yellow eyes (cholestatic jaundice alert).",
    "categoryId": "digestive"
  },
  {
    "slug": "coated-white-tongue",
    "title": "Thick White Tongue Coating",
    "assameseTitle": "জিভাত বগা ডাঠ মল জমা হোৱা",
    "description": "Traditional Ayurvedic tongue-scraping support and warming ama-cleansing digestive infusions to restore pink papillary clarity.",
    "iconName": "Sparkles",
    "commonSpices": [
      "Ginger (Aada)",
      "Lemon (Kaji Nemu)",
      "Rock Salt (Saindhava)",
      "Clove (Long)",
      "Warm Water"
    ],
    "redFlagsSummary": "White velvety patches that bleed when scraped and won't brush off (oral candidiasis/thrush requiring antifungal prescription).",
    "categoryId": "digestive"
  },
  {
    "slug": "sensitive-teeth",
    "title": "Hot & Cold Tooth Sensitivity",
    "assameseTitle": "দাঁত কেঁৰকেৰাই যোৱা / শিৰশিৰণি",
    "description": "Natural clove eugenol touch applications and mineral-rich protective mouth washes to shield exposed microscopic dentinal tubules.",
    "iconName": "ShieldAlert",
    "commonSpices": [
      "Clove (Long)",
      "Pure Coconut Oil",
      "Turmeric (Haldi)",
      "Salt (Nimokh)",
      "Warm Water"
    ],
    "redFlagsSummary": "Throbbing continuous toothache keeping you awake at night, visibly cracked tooth, or swelling beneath the jawbone.",
    "categoryId": "pain"
  },
  {
    "slug": "uvula-palate-itch",
    "title": "Itchy Palate & Deep Throat Tickle",
    "assameseTitle": "তালু আৰু ডিঙিৰ ভিতৰ খজুওৱা",
    "description": "Aromatic anti-allergic warm decoctions and salted rinses to quiet hyperactive histamine sensations on the hard and soft palate.",
    "iconName": "Wind",
    "commonSpices": [
      "Salt (Nimokh)",
      "Turmeric (Haldi)",
      "Tulsi (Holy Basil)",
      "Honey (Mou)",
      "Black pepper (Jaluk)"
    ],
    "redFlagsSummary": "Sudden swelling of the uvula with sensation of throat closing or high-pitched stridor noise on breathing (anaphylaxis 108 emergency).",
    "categoryId": "respiratory"
  },
  {
    "slug": "screen-tired-eyes",
    "title": "Screen Exhaustion & Gritty Eyes",
    "assameseTitle": "কম্পিউটাৰ পৰ্দাজনিত চকুৰ অৱসাদ",
    "description": "Cooling external floral mists and gentle eye-pad compresses to replenish lipid tear film and calm ciliary accommodation spasms.",
    "iconName": "Eye",
    "commonSpices": [
      "Rose Water",
      "Cucumber (Tiyoh)",
      "Triphala Water",
      "Cold Water",
      "Pure Ghee"
    ],
    "redFlagsSummary": "Sudden flashes of light or shower of dark floating spots (retinal detachment warning), halo around lights, or acute eye pain.",
    "categoryId": "wellness"
  },
  {
    "slug": "puffy-morning-eyes",
    "title": "Morning Under-Eye Bags & Puffiness",
    "assameseTitle": "ৰাতিপুৱা চকু ওফোন্দা / ফুলি উঠা",
    "description": "Cold tannin-rich compresses and lymphatic draining botanical touches to reduce nocturnal periorbital interstitial fluid pooling.",
    "iconName": "Eye",
    "commonSpices": [
      "Cucumber (Tiyoh)",
      "Tea Decoction (Tannin)",
      "Rose Water",
      "Cold Milk",
      "Mint (Podina)"
    ],
    "redFlagsSummary": "One eye bulging forward, severe redness with discharge sealing lids shut in morning, or fever with swollen eyelid.",
    "categoryId": "wellness"
  },
  {
    "slug": "dry-burning-eyes",
    "title": "Burning Dry Eye Sensation",
    "assameseTitle": "চকুৰ পোৰণি আৰু শুকান খৰখৰণি",
    "description": "Deeply soothing cooling external eyelid compresses to settle pitta thermal heat without placing anything irritating inside the cornea.",
    "iconName": "Flame",
    "commonSpices": [
      "Cold Milk",
      "Rose Water",
      "Cucumber (Tiyoh)",
      "Pure Ghee (on temples)",
      "Cold Water"
    ],
    "redFlagsSummary": "Foreign body sensation with acute corneal abrasion pain, photophobia where room light is intolerable, or cloudy vision.",
    "categoryId": "wellness"
  },
  {
    "slug": "outer-ear-itch",
    "title": "Mild Outer Ear Dryness & Itch",
    "assameseTitle": "কাণৰ বাহিৰ ভাগৰ শুকান খজুৱতি",
    "description": "Safe external pinna lubrication with warmed botanical oils to comfort dry, flaky cartilage without touching the ear canal.",
    "iconName": "HeartPulse",
    "commonSpices": [
      "Pure Coconut Oil",
      "Mustard Oil (Mitha Tel)",
      "Garlic (Nohoru)",
      "Camphor (Kopur)",
      "Warm Cloth"
    ],
    "redFlagsSummary": "Any fluid, pus, or blood discharging from ear canal, sudden drop in hearing, or severe pain when earlobe is gently pulled.",
    "categoryId": "pain"
  },
  {
    "slug": "hair-fall-support",
    "title": "Seasonal Hair Thinning & Fall",
    "assameseTitle": "ঋতুগত চুলি সৰা সমস্যা",
    "description": "Nourishing traditional scalp oil brews infused with amla, curry leaves, and fenugreek to stimulate follicular capillary roots.",
    "iconName": "Sparkles",
    "commonSpices": [
      "Coconut Oil",
      "Fenugreek (Methi)",
      "Curry Leaves (Narasingha)",
      "Amla (Gooseberry)",
      "Castor Oil (Era Tel)"
    ],
    "redFlagsSummary": "Hair falling out in coin-shaped smooth bald patches (alopecia areata), or accompanied by pronounced scalp sores or fever.",
    "categoryId": "skin"
  },
  {
    "slug": "oily-greasy-scalp",
    "title": "Excess Sebum & Greasy Scalp",
    "assameseTitle": "মূৰৰ ছাল অতিৰিক্ত তেলীয়া হোৱা",
    "description": "Astringent herbal clarifying rinses with lemon, neem, and green tea to balance hyperactive sebaceous glands naturally.",
    "iconName": "Sparkles",
    "commonSpices": [
      "Lemon (Kaji Nemu)",
      "Neem Leaves",
      "Aloe Vera",
      "Apple Cider Vinegar",
      "Green Tea"
    ],
    "redFlagsSummary": "Scalp weeping yellow crusts, swollen painful boils on head, or painful tender swollen lymph glands behind ears.",
    "categoryId": "skin"
  },
  {
    "slug": "premature-hair-greying",
    "title": "Early Greying Traditional Care",
    "assameseTitle": "অকালতে চুলি পকা প্ৰতিৰোধ",
    "description": "Ancient cooling iron-pot amla infusions and bhringraj-curry leaf oils formulated to preserve melanin synthesis.",
    "iconName": "Sparkles",
    "commonSpices": [
      "Amla (Gooseberry)",
      "Curry Leaves (Narasingha)",
      "Pure Coconut Oil",
      "Sesame Oil (Til Tel)",
      "Black Tea"
    ],
    "redFlagsSummary": "Rapid sudden whitening within days accompanied by autoimmune symptoms, fatigue, or vitiligo patches on skin.",
    "categoryId": "skin"
  },
  {
    "slug": "itchy-flakeless-scalp",
    "title": "Tight Itchy Scalp without Dandruff",
    "assameseTitle": "মূৰৰ ছালৰ খজুৱতি আৰু টান ভাব",
    "description": "Deeply hydrating lipid scalp soothers that restore moisture to parched skin barrier without clogging hair follicles.",
    "iconName": "Sparkles",
    "commonSpices": [
      "Aloe Vera",
      "Pure Coconut Oil",
      "Rose Water",
      "Pure Honey (Mou)",
      "Yogurt"
    ],
    "redFlagsSummary": "Intense nighttime itching with tiny crawling insects visible on hair shafts (head lice), or silver scaly plaques (psoriasis).",
    "categoryId": "skin"
  },
  {
    "slug": "brittle-split-hair",
    "title": "Split Ends & Weathered Hair",
    "assameseTitle": "চুলিৰ আগ ফটা আৰু ৰুক্ষতা",
    "description": "Rich nourishing lipid hair shaft masks with natural emollients and egg or curd to seal rough, split keratin cuticles.",
    "iconName": "Sparkles",
    "commonSpices": [
      "Pure Coconut Oil",
      "Pure Ghee",
      "Honey (Mou)",
      "Curd / Yogurt",
      "Castor Oil (Era Tel)"
    ],
    "redFlagsSummary": "Hair snapping near scalp accompanied by intense fatigue, cold intolerance, or severe weight changes (thyroid screening check).",
    "categoryId": "skin"
  },
  {
    "slug": "mild-heat-exhaustion",
    "title": "Summer Heat Lassitude & Thirst",
    "assameseTitle": "গৰমৰ ক্লান্তি আৰু অস্বস্তি",
    "description": "Cooling electrolyte electrolyte-replenishing traditional sips with raw mango, mint, and rock sugar to restore core fluid equilibrium.",
    "iconName": "Sun",
    "commonSpices": [
      "Lemon (Kaji Nemu)",
      "Mishri (Rock Sugar)",
      "Mint (Podina)",
      "Black Salt (Kola Nimokh)",
      "Cumin (Jeera)"
    ],
    "redFlagsSummary": "Body temperature exceeding 103°F (40°C), absence of sweating with hot dry skin, confusion, or passing out (Heat Stroke 108 emergency).",
    "categoryId": "seasonal"
  },
  {
    "slug": "cold-extremities",
    "title": "Cold Hands & Feet in Winter",
    "assameseTitle": "শীতত হাত-ভৰি ঠাণ্ডা হৈ থকা",
    "description": "Circulation-igniting warm foot soaks and spicy warming morning decoctions to stimulate peripheral vascular warmth.",
    "iconName": "Activity",
    "commonSpices": [
      "Ginger (Aada)",
      "Cinnamon (Dalcheni)",
      "Black pepper (Jaluk)",
      "Mustard Oil (Mitha Tel)",
      "Warm Water"
    ],
    "redFlagsSummary": "Fingers turning ghost-white then blue then red with intense pain upon cold exposure (Raynaud's), or non-healing sores on toes.",
    "categoryId": "seasonal"
  },
  {
    "slug": "prickly-heat-rash",
    "title": "Prickly Heat & Summer Sweat Rash",
    "assameseTitle": "ঘামচি আৰু ছালৰ ৰঙা ফুহা",
    "description": "Cooling botanical powders and sandalwood-rose water pastes to soothe occluded sweat ducts and relieve intense stinging.",
    "iconName": "Sun",
    "commonSpices": [
      "Sandalwood (Chandan)",
      "Rose Water",
      "Cucumber (Tiyoh)",
      "Aloe Vera",
      "Neem Leaves"
    ],
    "redFlagsSummary": "Pustules weeping yellow cloudy fluid, red spreading streaks on skin, or fever developing alongside the rash.",
    "categoryId": "skin"
  },
  {
    "slug": "cracked-dry-heels",
    "title": "Deeply Cracked Rough Heels",
    "assameseTitle": "গোৰোহা ফটা আৰু খহটা হোৱা",
    "description": "Thick occlusive night healing salves with beeswax, mustard oil, and camphor to bridge painful fissures and soften keratin.",
    "iconName": "HeartPulse",
    "commonSpices": [
      "Mustard Oil (Mitha Tel)",
      "Camphor (Kopur)",
      "Turmeric (Haldi)",
      "Pure Ghee",
      "Warm Water"
    ],
    "redFlagsSummary": "Cracks bleeding profusely, showing signs of honey-colored infection, or patient has diabetes (diabetic foot risk requires medical podiatry).",
    "categoryId": "skin"
  },
  {
    "slug": "wind-chapped-cheeks",
    "title": "Wind-Chapped Facial Roughness",
    "assameseTitle": "ঠাণ্ডা বতাহত মুখৰ ছাল ফটা",
    "description": "Rich traditional lipid balms using pure milk malai, honey, and rose water to restore protective stratum corneum barrier.",
    "iconName": "Wind",
    "commonSpices": [
      "Milk Cream (Malai)",
      "Pure Honey (Mou)",
      "Rose Water",
      "Pure Ghee",
      "Aloe Vera"
    ],
    "redFlagsSummary": "Skin forming crusty honeycomb blisters with fever, or painful swelling spreading across facial cheeks.",
    "categoryId": "skin"
  },
  {
    "slug": "pms-mood-tension",
    "title": "Premenstrual Tension & Mood Waves",
    "assameseTitle": "ঋতুস্ৰাৱৰ পূৰ্বৰ মানসিক অস্বস্তি",
    "description": "Nerve-calming antispasmodic botanical sips that ease emotional volatility, irritability, and cyclical water retention.",
    "iconName": "Moon",
    "commonSpices": [
      "Chamomile / Tulsi",
      "Fennel (Mouri)",
      "Ginger (Aada)",
      "Cardamom (Elaichi)",
      "Jaggery (Gur)"
    ],
    "redFlagsSummary": "Severe feelings of despair, self-harm thoughts, or panic attacks that completely disrupt daily functionality (PMDD).",
    "categoryId": "wellness"
  },
  {
    "slug": "hot-flashes-perimenopause",
    "title": "Occasional Flush & Night Heat in Mature Women",
    "assameseTitle": "শৰীৰৰ হঠাতে গৰম উঠা ভাব",
    "description": "Cooling Ayurvedic Pitta-pacifying infusions with coriander, fennel, and licorice to modulate sudden neurovascular surges.",
    "iconName": "Flame",
    "commonSpices": [
      "Fennel (Mouri)",
      "Coriander seeds (Dhania)",
      "Mishri (Rock Sugar)",
      "Rose Water",
      "Cardamom (Elaichi)"
    ],
    "redFlagsSummary": "Post-menopausal bleeding (any vaginal bleeding after 12 months without period requires immediate gynecologist evaluation), severe chest tightness.",
    "categoryId": "wellness"
  },
  {
    "slug": "menstrual-pelvic-heaviness",
    "title": "Lower Pelvic Heaviness during Periods",
    "assameseTitle": "মাহেকীয়াৰ তলপেটৰ গধূৰ ভাব",
    "description": "Warming pelvic decongestant teas with carom seeds and sesame to encourage free circulation and relieve lower abdominal tension.",
    "iconName": "HeartPulse",
    "commonSpices": [
      "Ajwain (Carom seeds)",
      "Sesame seeds (Til)",
      "Jaggery (Gur)",
      "Ginger (Aada)",
      "Black pepper (Jaluk)"
    ],
    "redFlagsSummary": "Soaking through more than 2 maxi-pads per hour for 2 consecutive hours, passing large blood clots larger than a coin.",
    "categoryId": "wellness"
  },
  {
    "slug": "postpartum-back-ache",
    "title": "Postnatal Lower Back Weakness",
    "assameseTitle": "প্ৰসৱোত্তৰ কঁকালৰ দুৰ্বলতা",
    "description": "Traditional restorative oil warm-ups and strengthening herbal laddoos to nourish strained sacroiliac and lumbar ligaments.",
    "iconName": "HeartPulse",
    "commonSpices": [
      "Mustard Oil (Mitha Tel)",
      "Fenugreek (Methi)",
      "Pure Ghee",
      "Garlic (Nohoru)",
      "Turmeric (Haldi)"
    ],
    "redFlagsSummary": "High fever with chills (puerperal infection), sudden foul-smelling lochia discharge, or severe urinary incontinence.",
    "categoryId": "wellness"
  },
  {
    "slug": "desk-slump-lethargy",
    "title": "Midday Desk Slump & Posture Stiffness",
    "assameseTitle": "দীৰ্ঘসময় বহি থকাৰ জড়তা",
    "description": "Invigorating spice inhalations and awakening herbal teas to oxygenate the brain, release tight hip flexors, and break sedentary stupor.",
    "iconName": "Activity",
    "commonSpices": [
      "Black pepper (Jaluk)",
      "Ginger (Aada)",
      "Mint (Podina)",
      "Lemon (Kaji Nemu)",
      "Clove (Long)"
    ],
    "redFlagsSummary": "Sudden one-sided arm or leg weakness, facial drooping, slurred speech (FAST stroke emergency 108).",
    "categoryId": "wellness"
  },
  {
    "slug": "post-workout-soreness",
    "title": "Post-Exercise Muscle Aches",
    "assameseTitle": "ব্যায়ামৰ পিছৰ মাংসপেশীৰ বিষ",
    "description": "Warm golden turmeric-black pepper milk and magnesium bath soaks to accelerate cellular repair and calm DOMS soreness.",
    "iconName": "Activity",
    "commonSpices": [
      "Turmeric (Haldi)",
      "Black pepper (Jaluk)",
      "Pure Honey (Mou)",
      "Rock Salt (Saindhava)",
      "Mustard Oil (Mitha Tel)"
    ],
    "redFlagsSummary": "Dark tea-colored or cola-colored urine after strenuous workout with extreme muscle swelling (rhabdomyolysis emergency).",
    "categoryId": "wellness"
  },
  {
    "slug": "afternoon-brain-fog",
    "title": "Mental Lethargy & Lack of Focus",
    "assameseTitle": "দুপৰীয়াৰ মানসিক জড়তা আৰু মনোযোগহীনতা",
    "description": "Nootropic Ayurvedic herbal teas with Brahmi, Tulsi, and Rosemary to sharpen synaptic clarity and dissipate afternoon mental exhaustion.",
    "iconName": "Sparkles",
    "commonSpices": [
      "Tulsi (Holy Basil)",
      "Brahmi",
      "Cardamom (Elaichi)",
      "Pure Honey (Mou)",
      "Black pepper (Jaluk)"
    ],
    "redFlagsSummary": "Sudden severe confusion, memory disorientation, inability to speak coherent sentences, or thunderclap headache.",
    "categoryId": "wellness"
  },
  {
    "slug": "child-bedtime-restlessness",
    "title": "Restless Bedtime Settling in Young Children",
    "assameseTitle": "শিশুৰ নিশাৰ ছটফটনি আৰু টোপনিৰ বিজুতি",
    "description": "Ultra-gentle warm foot massages with pure cow ghee and chamomile-scented warm compresses to quiet sensory overload in children.",
    "iconName": "Moon",
    "commonSpices": [
      "Pure Ghee",
      "Nutmeg (Jaiphal - micro pinch)",
      "Warm Milk",
      "Cardamom (Elaichi)",
      "Warm Water"
    ],
    "redFlagsSummary": "High fever, crying continuously in acute abdominal agony with knees pulled to chest, or difficult labored breathing.",
    "categoryId": "children"
  },
  {
    "slug": "child-picky-appetite",
    "title": "Fussy Picky Appetite in Toddlers",
    "assameseTitle": "শিশুৰ খোৱাৰ প্ৰতি অনীহা",
    "description": "Gentle digestive candy chews made of roasted cumin, fresh lemon, and rock sugar to awaken taste buds without stinging spices.",
    "iconName": "Sparkles",
    "commonSpices": [
      "Cumin (Jeera)",
      "Lemon (Kaji Nemu)",
      "Mishri (Rock Sugar)",
      "Pomegranate Juice",
      "Ginger (Aada - tiny drop)"
    ],
    "redFlagsSummary": "Child not gaining weight according to growth milestones, severe pale fingernails/lips (severe anemia), or frequent vomiting.",
    "categoryId": "children"
  },
  {
    "slug": "senior-joint-creaks",
    "title": "Elderly Weather-Sensitive Joint Creaking",
    "assameseTitle": "বয়োজ্যেষ্ঠৰ গাঁঠিৰ শীতলতা আৰু বিষ",
    "description": "Deep-acting warm mustard-garlic oil baths and warm dry salt compress packs to soothe chronic deep-bone cold aches in seniors.",
    "iconName": "HeartPulse",
    "commonSpices": [
      "Mustard Oil (Mitha Tel)",
      "Garlic (Nohoru)",
      "Ajwain (Carom seeds)",
      "Turmeric (Haldi)",
      "Camphor (Kopur)"
    ],
    "redFlagsSummary": "Sudden inability to bear weight after a minor fall (possible hip fracture), or sudden red hot swelling in big toe (acute gout).",
    "categoryId": "pain"
  },
  {
    "slug": "senior-early-awakening",
    "title": "Early Dawn Senior Sleep Fragmentation",
    "assameseTitle": "বয়োজ্যেষ্ঠৰ টোপনি ভাগি যোৱা",
    "description": "Nerve-grounding warm spiced bedtime milk drafts with nutmeg and poppy seeds to foster uninterrupted restorative delta sleep.",
    "iconName": "Moon",
    "commonSpices": [
      "Nutmeg (Jaiphal)",
      "Cardamom (Elaichi)",
      "Warm Milk",
      "Pure Ghee",
      "Mishri (Rock Sugar)"
    ],
    "redFlagsSummary": "Waking up gasping for air, chest pain during night, or severe daytime confusion and wandering (dementia assessment needed).",
    "categoryId": "wellness"
  }
];

export const LEGACY_SLUG_MAP: Record<string, string> = {
  "cough-cold": "common-cold",
  "indigestion-gas": "bloating-gas",
  "headache": "headache-tension",
  "blocked-nose-sinus": "nasal-congestion",
  "nausea-motion-sickness": "nausea",
  "joint-muscle-pain": "joint-pain",
  "insomnia-sleep": "insomnia",
  "skin-minor": "acne-mild",
  "weak-immunity": "low-immunity",
};

export function resolveSymptomSlug(slug: string): string {
  return LEGACY_SLUG_MAP[slug] || slug;
}
