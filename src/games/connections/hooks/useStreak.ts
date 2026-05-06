import type { DayEntry } from "../types";

export const STORAGE_KEYS = {
  days: "connections_days",
  repairsUsed: "connections_repairs_used",
};

const getDays = (): DayEntry[] => {
  if (typeof window === "undefined") return [];
  return JSON.parse(localStorage.getItem(STORAGE_KEYS.days) || "[]");
};

const saveDays = (days: DayEntry[]): void => {
  localStorage.setItem(STORAGE_KEYS.days, JSON.stringify(days));
};

export const getDayResult = (date: string): DayEntry | null => {
  const days = getDays();
  return days.find((d) => d.date === date) ?? null;
};

export const recordDayResult = (date: string, status: "won" | "lost", mistakes: number): void => {
  const days = getDays();
  const existing = days.findIndex((d) => d.date === date);
  if (existing >= 0) {
    if (days[existing].status === status && days[existing].mistakes === mistakes) return;
    days[existing] = { date, status, mistakes };
  } else {
    days.push({ date, status, mistakes });
  }
  days.sort((a, b) => a.date.localeCompare(b.date));
  saveDays(days);
};

export const getDayResults = (): DayEntry[] => getDays();

export const computeStreak = (): number => {
  const today = new Date().toISOString().split("T")[0];
  const days = getDays();
  const wonSet = new Set(days.filter((d) => d.status === "won").map((d) => d.date));
  if (wonSet.size === 0) return 0;

  // Start from today; if today hasn't been won yet, allow yesterday as the current day
  const cursor = new Date(today + "T00:00:00");
  if (!wonSet.has(today)) cursor.setDate(cursor.getDate() - 1);

  let streak = 0;
  while (true) {
    const dateStr = cursor.toISOString().split("T")[0];
    if (wonSet.has(dateStr)) {
      streak++;
      cursor.setDate(cursor.getDate() - 1);
    } else {
      break;
    }
  }
  return streak;
};

export const getRepairsAvailable = (): number => {
  const repairsUsed: string[] = JSON.parse(localStorage.getItem(STORAGE_KEYS.repairsUsed) || "[]");
  const days = getDays();
  if (days.length === 0) return 0;
  const firstDate = days[0].date;
  const daysSince = Math.floor(
    (Date.now() - new Date(firstDate + "T00:00:00").getTime()) / (1000 * 60 * 60 * 24)
  );
  const earned = Math.floor(daysSince / 28);
  return Math.max(0, earned - repairsUsed.length);
};

export const recordRepair = (): void => {
  const repairsUsed: string[] = JSON.parse(localStorage.getItem(STORAGE_KEYS.repairsUsed) || "[]");
  const today = new Date().toISOString().split("T")[0];
  localStorage.setItem(
    STORAGE_KEYS.repairsUsed,
    JSON.stringify([...repairsUsed, today])
  );
};
