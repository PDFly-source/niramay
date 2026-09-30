import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { LanguageMode } from "@/lib/i18n";

export type FamilyProfileType = "adult" | "child" | "senior" | "pregnancy";

export interface CareLogCheckin {
  day: 1 | 2 | 3;
  date: string;
  status: "better" | "same" | "worse";
  note?: string;
}

export interface CareLogEntry {
  id: string;
  remedyId: string;
  remedyNameEn: string;
  remedyNameAs: string;
  symptomEn: string;
  symptomAs: string;
  startDate: string;
  createdAt: number;
  checkins: CareLogCheckin[];
  hasRedFlagReported?: boolean;
  isArchived?: boolean;
}

export interface TreatmentCourseDose {
  doseIndex: number; // 0 to 5 for 3 days x 2 doses (morning/evening)
  day: number; // 1, 2, 3
  timeOfDay: "morning" | "evening";
  scheduledTime: string; // e.g. "08:00 AM", "08:00 PM"
  scheduledTimestamp: number;
  completed?: boolean;
  loggedAt?: number;
}

export interface TreatmentCourse {
  id: string;
  remedyId: string;
  remedyNameEn: string;
  remedyNameAs: string;
  symptomEn: string;
  startDate: string;
  startTimestamp: number;
  doses: TreatmentCourseDose[];
  isActive: boolean;
  totalDoses: number;
}

export interface DoshaScores {
  vata: number;
  pitta: number;
  kapha: number;
}

export type ThemeMode = "system" | "light" | "dark";

interface NiramayState {
  languageMode: LanguageMode;
  themeMode: ThemeMode;
  pantry: string[];
  savedRemedyIds: string[];
  hasAcceptedDisclaimer: boolean;
  searchQuery: string;
  familyProfile: FamilyProfileType;
  servingCount: number;
  isAssistantOpen: boolean;
  installBannerVisible: boolean;
  isPaletteOpen: boolean;
  completedHabitsByDate: Record<string, string[]>;

  // New Feature 3: Dosha / Prakriti Profile
  doshaProfile: string | null;
  doshaScores: DoshaScores | null;

  // New Feature 4: Clinical Triage & Care Logs
  careLogs: CareLogEntry[];

  // New Feature 5: Smart Treatment Courses
  activeCourses: TreatmentCourse[];

  // New Feature 7: Custom PWA Install State
  pwaBannerDismissedUntil: number | null;

  // Actions
  setLanguageMode: (mode: LanguageMode) => void;
  setThemeMode: (mode: ThemeMode) => void;
  toggleSaved: (remedyId: string) => void;
  isSaved: (remedyId: string) => boolean;
  togglePantryItem: (item: string) => void;
  hasPantryItem: (item: string) => boolean;
  setPantry: (items: string[]) => void;
  clearPantry: () => void;
  setAllCommonSpicesToPantry: (spices: string[]) => void;
  acceptDisclaimer: () => void;
  setSearchQuery: (query: string) => void;
  setFamilyProfile: (profile: FamilyProfileType) => void;
  setServingCount: (count: number) => void;
  setAssistantOpen: (open: boolean) => void;
  setInstallBannerVisible: (visible: boolean) => void;
  setPaletteOpen: (open: boolean) => void;
  toggleHabitForDate: (dateStr: string, habitId: string) => void;

  setDoshaProfile: (profile: string | null, scores?: DoshaScores) => void;
  addCareLog: (entry: {
    remedyId: string;
    remedyNameEn: string;
    remedyNameAs: string;
    symptomEn: string;
    symptomAs: string;
  }) => string;
  updateCareLogCheckin: (
    logId: string,
    day: 1 | 2 | 3,
    status: "better" | "same" | "worse",
    note?: string
  ) => void;
  reportRedFlagForLog: (logId: string) => void;

  startTreatmentCourse: (
    remedyId: string,
    remedyNameEn: string,
    remedyNameAs: string,
    symptomEn: string
  ) => string;
  logCourseDose: (courseId: string, doseIndex: number, completed: boolean) => void;
  cancelTreatmentCourse: (courseId: string) => void;

  dismissPwaBanner: (days?: number) => void;
  clearAllLocalData: () => void;
}

export const useNiramayStore = create<NiramayState>()(
  persist(
    (set, get) => ({
      languageMode: "bilingual",
      themeMode: "system",
      pantry: [
        "Ginger (Aada)",
        "Tulsi (Holy Basil)",
        "Black pepper (Jaluk)",
        "Honey (Mou)",
        "Turmeric (Haldi)",
        "Ajwain (Carom seeds)",
        "Cumin (Jeera)",
        "Lemon (Kaji Nemu)",
        "Salt (Nimokh)",
      ],
      savedRemedyIds: [
        "assamese-tulsi-ginger-black-pepper-kadha",
        "ginger-ajwain-acidity-water",
      ],
      hasAcceptedDisclaimer: false,
      searchQuery: "",
      familyProfile: "adult",
      servingCount: 1,
      isAssistantOpen: false,
      isPaletteOpen: false,
      installBannerVisible: false,
      completedHabitsByDate: {},

      doshaProfile: null,
      doshaScores: null,
      careLogs: [],
      activeCourses: [],
      pwaBannerDismissedUntil: null,

      setThemeMode: (mode: ThemeMode) => {
        set({ themeMode: mode });
      },
      setLanguageMode: (mode: LanguageMode) => {
        set({ languageMode: mode });
      },

      toggleSaved: (remedyId: string) => {
        const { savedRemedyIds } = get();
        if (savedRemedyIds.includes(remedyId)) {
          set({ savedRemedyIds: savedRemedyIds.filter((id) => id !== remedyId) });
        } else {
          set({ savedRemedyIds: [...savedRemedyIds, remedyId] });
        }
      },

      isSaved: (remedyId: string) => {
        return get().savedRemedyIds.includes(remedyId);
      },

      togglePantryItem: (item: string) => {
        const { pantry } = get();
        const exists = pantry.some(
          (p) => p.toLowerCase().trim() === item.toLowerCase().trim()
        );
        if (exists) {
          set({
            pantry: pantry.filter(
              (p) => p.toLowerCase().trim() !== item.toLowerCase().trim()
            ),
          });
        } else {
          set({ pantry: [...pantry, item] });
        }
      },

      hasPantryItem: (item: string) => {
        const { pantry } = get();
        const cleanItem = item.toLowerCase().trim();
        return pantry.some((p) => {
          const cleanP = p.toLowerCase().trim();
          return cleanItem.includes(cleanP) || cleanP.includes(cleanItem);
        });
      },

      setPantry: (items: string[]) => {
        set({ pantry: items });
      },

      clearPantry: () => {
        set({ pantry: [] });
      },

      setAllCommonSpicesToPantry: (spices: string[]) => {
        const { pantry } = get();
        const merged = Array.from(new Set([...pantry, ...spices]));
        set({ pantry: merged });
      },

      acceptDisclaimer: () => {
        set({ hasAcceptedDisclaimer: true });
      },

      setSearchQuery: (query: string) => {
        set({ searchQuery: query });
      },

      setFamilyProfile: (profile: FamilyProfileType) => {
        set({ familyProfile: profile });
      },

      setServingCount: (count: number) => {
        set({ servingCount: Math.max(1, Math.min(count, 8)) });
      },

      setAssistantOpen: (open: boolean) => {
        set({ isAssistantOpen: open });
      },

      setPaletteOpen: (open: boolean) => {
        set({ isPaletteOpen: open });
      },

      setInstallBannerVisible: (visible: boolean) => {
        set({ installBannerVisible: visible });
      },

      toggleHabitForDate: (dateStr: string, habitId: string) => {
        const { completedHabitsByDate } = get();
        const currentList = completedHabitsByDate[dateStr] || [];
        const nextList = currentList.includes(habitId)
          ? currentList.filter((id) => id !== habitId)
          : [...currentList, habitId];

        set({
          completedHabitsByDate: {
            ...completedHabitsByDate,
            [dateStr]: nextList,
          },
        });
      },

      setDoshaProfile: (profile, scores) => {
        set({
          doshaProfile: profile,
          doshaScores: scores || null,
        });
      },

      addCareLog: (entry) => {
        const now = new Date();
        const y = now.getFullYear();
        const m = (now.getMonth() + 1).toString().padStart(2, "0");
        const d = now.getDate().toString().padStart(2, "0");
        const startDateStr = `${y}-${m}-${d}`;
        const newId = `care_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;

        const newLog: CareLogEntry = {
          id: newId,
          remedyId: entry.remedyId,
          remedyNameEn: entry.remedyNameEn,
          remedyNameAs: entry.remedyNameAs,
          symptomEn: entry.symptomEn,
          symptomAs: entry.symptomAs,
          startDate: startDateStr,
          createdAt: Date.now(),
          checkins: [
            {
              day: 1,
              date: startDateStr,
              status: "same",
              note: "Initiated home preparation course.",
            },
          ],
        };

        set({ careLogs: [newLog, ...get().careLogs] });
        return newId;
      },

      updateCareLogCheckin: (logId, day, status, note) => {
        const now = new Date();
        const y = now.getFullYear();
        const m = (now.getMonth() + 1).toString().padStart(2, "0");
        const d = now.getDate().toString().padStart(2, "0");
        const todayStr = `${y}-${m}-${d}`;

        const updated = get().careLogs.map((log) => {
          if (log.id !== logId) return log;
          const filtered = log.checkins.filter((c) => c.day !== day);
          return {
            ...log,
            checkins: [
              ...filtered,
              {
                day,
                date: todayStr,
                status,
                note,
              },
            ].sort((a, b) => a.day - b.day),
          };
        });

        set({ careLogs: updated });
      },

      reportRedFlagForLog: (logId) => {
        const updated = get().careLogs.map((log) => {
          if (log.id === logId) {
            return { ...log, hasRedFlagReported: true };
          }
          return log;
        });
        set({ careLogs: updated });
      },

      startTreatmentCourse: (remedyId, remedyNameEn, remedyNameAs, symptomEn) => {
        const now = Date.now();
        const courseId = `course_${now}_${Math.random().toString(36).substring(2, 6)}`;
        const doses: TreatmentCourseDose[] = [];

        // 3 days x 2 doses (Morning ~8 AM, Evening ~8 PM)
        const msPerDay = 24 * 60 * 60 * 1000;
        let doseIndex = 0;
        for (let day = 1; day <= 3; day++) {
          const dayOffset = (day - 1) * msPerDay;
          doses.push({
            doseIndex: doseIndex++,
            day,
            timeOfDay: "morning",
            scheduledTime: "08:00 AM",
            scheduledTimestamp: now + dayOffset + 8 * 3600 * 1000,
            completed: false,
          });
          doses.push({
            doseIndex: doseIndex++,
            day,
            timeOfDay: "evening",
            scheduledTime: "08:00 PM",
            scheduledTimestamp: now + dayOffset + 20 * 3600 * 1000,
            completed: false,
          });
        }

        const newCourse: TreatmentCourse = {
          id: courseId,
          remedyId,
          remedyNameEn,
          remedyNameAs,
          symptomEn,
          startDate: new Date().toISOString().split("T")[0],
          startTimestamp: now,
          doses,
          isActive: true,
          totalDoses: 6,
        };

        // Deactivate older active courses for this remedy
        const existing = get().activeCourses.map((c) =>
          c.remedyId === remedyId ? { ...c, isActive: false } : c
        );

        set({ activeCourses: [newCourse, ...existing] });

        // Also initiate a Care Log entry to track adherence
        get().addCareLog({
          remedyId,
          remedyNameEn,
          remedyNameAs,
          symptomEn,
          symptomAs: remedyNameAs,
        });

        return courseId;
      },

      logCourseDose: (courseId, doseIndex, completed) => {
        const updated = get().activeCourses.map((c) => {
          if (c.id !== courseId) return c;
          const doses = c.doses.map((d) =>
            d.doseIndex === doseIndex
              ? { ...d, completed, loggedAt: Date.now() }
              : d
          );
          const allLogged = doses.every((d) => d.completed !== undefined && d.completed !== false);
          return {
            ...c,
            doses,
            isActive: !allLogged,
          };
        });
        set({ activeCourses: updated });
      },

      cancelTreatmentCourse: (courseId) => {
        const updated = get().activeCourses.map((c) =>
          c.id === courseId ? { ...c, isActive: false } : c
        );
        set({ activeCourses: updated });
      },

      dismissPwaBanner: (days = 7) => {
        const expiry = Date.now() + days * 24 * 60 * 60 * 1000;
        set({ pwaBannerDismissedUntil: expiry });
      },

      clearAllLocalData: () => {
        set({
          savedRemedyIds: [],
          completedHabitsByDate: {},
          doshaProfile: null,
          doshaScores: null,
          careLogs: [],
          activeCourses: [],
          pantry: [
            "Ginger (Aada)",
            "Tulsi (Holy Basil)",
            "Black pepper (Jaluk)",
            "Honey (Mou)",
            "Turmeric (Haldi)",
            "Ajwain (Carom seeds)",
          ],
        });
        if (typeof window !== "undefined") {
          try {
            window.localStorage.removeItem("niramay-storage");
          } catch (e) {
            console.error("Failed to clear local storage", e);
          }
        }
      },
    }),
    {
      name: "niramay-storage",
      storage: createJSONStorage(() => {
        if (typeof window !== "undefined") {
          return window.localStorage;
        }
        return {
          getItem: () => null,
          setItem: () => {},
          removeItem: () => {},
        };
      }),
      partialize: (state) => ({
        languageMode: state.languageMode,
        themeMode: state.themeMode,
        pantry: state.pantry,
        savedRemedyIds: state.savedRemedyIds,
        hasAcceptedDisclaimer: state.hasAcceptedDisclaimer,
        familyProfile: state.familyProfile,
        completedHabitsByDate: state.completedHabitsByDate,
        doshaProfile: state.doshaProfile,
        doshaScores: state.doshaScores,
        careLogs: state.careLogs,
        activeCourses: state.activeCourses,
        pwaBannerDismissedUntil: state.pwaBannerDismissedUntil,
      }),
    }
  )
);
