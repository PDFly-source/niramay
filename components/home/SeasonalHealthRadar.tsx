"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useNiramayStore } from "@/lib/store";
import { useMounted } from "@/hooks/useMounted";
import {
  CloudRain,
  Sun,
  Wind,
  ThermometerSnowflake,
  AlertTriangle,
  Sparkles,
  ArrowRight,
  ShieldAlert,
  MapPin,
  RefreshCw,
} from "lucide-react";

interface WeatherState {
  temperature: number;
  humidity: number;
  rain: number;
  district: string;
  source: "live" | "cached" | "calendar";
}

const ASSAM_DISTRICTS: Record<string, { lat: number; lon: number; nameAs: string }> = {
  Guwahati: { lat: 26.1445, lon: 91.7362, nameAs: "গুৱাহাটী" },
  Dibrugarh: { lat: 27.4728, lon: 94.912, nameAs: "ডিব্ৰুগড়" },
  Jorhat: { lat: 26.7509, lon: 94.2037, nameAs: "যোৰহাট" },
  Silchar: { lat: 24.8333, lon: 92.7789, nameAs: "শিলচৰ" },
  Tezpur: { lat: 26.6528, lon: 92.7926, nameAs: "তেজপুৰ" },
};

export const SeasonalHealthRadar: React.FC = () => {
  const mounted = useMounted();
  const { languageMode } = useNiramayStore();
  const isAs = mounted && languageMode === "as";

  const [selectedDistrict, setSelectedDistrict] = useState("Guwahati");
  const [weather, setWeather] = useState<WeatherState>({
    temperature: 24,
    humidity: 70,
    rain: 0,
    district: "Guwahati",
    source: "calendar",
  });
  const [loading, setLoading] = useState(false);

  // Fetch live weather from public keyless Open-Meteo API
  const fetchWeather = async (district: string) => {
    if (typeof window === "undefined") return;

    // Check 3-hour cache first
    const cacheKey = `niramay_weather_${district}`;
    try {
      const cached = window.localStorage.getItem(cacheKey);
      if (cached) {
        const parsed = JSON.parse(cached);
        if (Date.now() - parsed.timestamp < 3 * 3600 * 1000) {
          setWeather({
            temperature: parsed.temperature,
            humidity: parsed.humidity,
            rain: parsed.rain,
            district,
            source: "cached",
          });
          return;
        }
      }
    } catch (e) {}

    // Fallback: silently degrade if offline
    if (!navigator.onLine) {
      setWeather((prev) => ({ ...prev, district, source: "calendar" }));
      return;
    }

    setLoading(true);
    const coords = ASSAM_DISTRICTS[district] || ASSAM_DISTRICTS["Guwahati"];
    try {
      const url = `https://api.open-meteo.com/v1/forecast?latitude=${coords.lat}&longitude=${coords.lon}&current=temperature_2m,relative_humidity_2m,precipitation&timezone=Asia%2FKolkata`;
      const res = await fetch(url, { cache: "no-store" });
      if (res.ok) {
        const data = await res.json();
        const current = data.current;
        const newWeather: WeatherState = {
          temperature: Math.round(current.temperature_2m),
          humidity: Math.round(current.relative_humidity_2m),
          rain: Math.round(current.precipitation || 0),
          district,
          source: "live",
        };
        setWeather(newWeather);
        try {
          window.localStorage.setItem(
            cacheKey,
            JSON.stringify({ ...newWeather, timestamp: Date.now() })
          );
        } catch (e) {}
      }
    } catch (err) {
      // Graceful offline fallback: keep calendar default silently
      setWeather((prev) => ({ ...prev, district, source: "calendar" }));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchWeather(selectedDistrict);
    }, 0);
    return () => clearTimeout(timer);
  }, [selectedDistrict]);

  if (!mounted) return null;

  // Determine Seasonal Health Warning Alert based on conditions
  let alertTitleEn = "Seasonal Transition Care";
  let alertTitleAs = "ঋতুজনিত প্ৰতিৰোধমূলক যত্ন";
  let alertDescEn = "Moderate ambient humidity. Maintain good hydration with tulsi and coriander.";
  let alertDescAs = "সাধাৰণ বতৰ। তুলসী আৰু ধনীয়া পানীৰে পাচন সবল ৰাখক।";
  let targetSlug = "low-immunity";
  let isSevereAlert = false;

  if (weather.rain > 1 || weather.humidity > 80) {
    isSevereAlert = true;
    alertTitleEn = "Flood / High Humidity Gut Infection Alert";
    alertTitleAs = "বাৰিষা আৰু পানী-জনিত আমাশয় সতৰ্কতা";
    alertDescEn =
      "High atmospheric dampness elevates risk of amoebiasis, loose motions, and water-borne dysentery. Boil all drinking water; drink warm Paederia (Bhedailota) or ginger broth.";
    alertDescAs =
      "সেমেকা বতৰ আৰু বৰষুণে ঘোলা পানীৰ আমাশয় আৰু পেটৰ বিষ বৃদ্ধি কৰে। সদায় উতলোৱা পানী খাওক; ভেদাইলতাৰ পাতল ঝোল আৰু আদা-জৱাইনৰ পানী উপকাৰী।";
    targetSlug = "stomach-cramps";
  } else if (weather.temperature < 18) {
    isSevereAlert = true;
    alertTitleEn = "Winter Bronchial & Sinus Chill Alert";
    alertTitleAs = "শীতকালীন কফ, চাইনাছ আৰু ডিঙিৰ বিষ";
    alertDescEn =
      "Cool temperatures aggravate Vata and Kapha, triggering night coughs and sore throat. Gargle with warm turmeric-salt water and sip black pepper kadha.";
    alertDescAs =
      "শীতৰ শুকান বতাহে বুকুৰ কফ আৰু ডিঙিৰ বিষ বৃদ্ধি কৰে। কুহুমীয়া হালধি-নিমখ পানীৰে কুলকুলি কৰক আৰু জালুকৰ চাহ খাওক।";
    targetSlug = "sore-throat";
  } else if (weather.temperature > 33) {
    isSevereAlert = true;
    alertTitleEn = "High Summer Heat & Acidity Alert";
    alertTitleAs = "তীব্ৰ গ্ৰীষ্মকাল আৰু অমলপিত্ত সতৰ্কতা";
    alertDescEn =
      "High ambient heat aggravates Pitta fire, causing acute acidity, oral ulcers, and dehydration. Drink cooling Kaji Nemu water with raw honey.";
    alertDescAs =
      "চোকা ৰ'দে পিত্ত বৃদ্ধি কৰে, যাৰ ফলত বুকুপোৰা আৰু মুখত ঘা হয়। কাজী নেমু আৰু মৌৰ চৰবত খাওক।";
    targetSlug = "acidity";
  }

  return (
    <div className="bg-white rounded-3xl p-5 sm:p-6 border border-amber-200/90 shadow-md mb-8">
      {/* Top Header: Location Selector + Weather Pills */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-stone-100">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center">
            <Wind className="w-5 h-5 text-amber-700" />
          </div>
          <div>
            <div className="text-[10px] font-bold uppercase tracking-wider text-amber-800">
              {isAs ? "অসম বতৰ আৰু স্বাস্থ্য ৰাডাৰ" : "Assam Seasonal Health Radar"}
            </div>
            <div className="flex items-center gap-1.5 mt-0.5">
              <MapPin className="w-3.5 h-3.5 text-stone-400" />
              <select
                value={selectedDistrict}
                onChange={(e) => setSelectedDistrict(e.target.value)}
                className="text-xs font-bold text-stone-900 bg-stone-50 border border-stone-200 rounded-lg px-2 py-0.5 focus:outline-none"
              >
                {Object.entries(ASSAM_DISTRICTS).map(([name, val]) => (
                  <option key={name} value={name}>
                    {isAs ? val.nameAs : name}
                  </option>
                ))}
              </select>
              <span className="text-[10px] font-mono text-stone-400">
                ({weather.source === "live" ? "Open-Meteo" : isAs ? "ঋতুচৰ্যা" : "Ritucharya"})
              </span>
            </div>
          </div>
        </div>

        {/* Live Weather Metrics */}
        <div className="flex items-center gap-2 self-start sm:self-center">
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-stone-100 text-stone-800 text-xs font-bold font-mono">
            🌡️ {weather.temperature}°C
          </span>
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-stone-100 text-stone-800 text-xs font-bold font-mono">
            💧 {weather.humidity}%
          </span>
          {weather.rain > 0 && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-blue-100 text-blue-900 text-xs font-bold font-mono">
              🌧️ {weather.rain}mm
            </span>
          )}
        </div>
      </div>

      {/* Dynamic Health Warning Card */}
      <div
        className={`mt-4 p-4 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
          isSevereAlert
            ? "bg-amber-50/80 border-amber-300"
            : "bg-emerald-50/70 border-emerald-200"
        }`}
      >
        <div className="flex items-start gap-3">
          <div
            className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${
              isSevereAlert ? "bg-amber-600 text-onbrand" : "bg-emerald-700 text-onbrand"
            }`}
          >
            {isSevereAlert ? (
              <AlertTriangle className="w-5 h-5" />
            ) : (
              <Sparkles className="w-5 h-5" />
            )}
          </div>
          <div>
            <h4 className="text-sm font-bold text-stone-900">
              {isAs ? alertTitleAs : alertTitleEn}
            </h4>
            <p className="text-xs text-stone-600 mt-1 leading-relaxed max-w-xl">
              {isAs ? alertDescAs : alertDescEn}
            </p>
          </div>
        </div>

        <Link
          href={`/symptoms/${targetSlug}`}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-stone-900 hover:bg-stone-800 text-onbrand shadow-xs transition shrink-0 self-start sm:self-center"
        >
          <span>{isAs ? "উপচাৰ চাওক" : "View Remedies"}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
};
