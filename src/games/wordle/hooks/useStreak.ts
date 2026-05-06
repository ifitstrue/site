export const STORAGE_KEY = "wordle_days";
const PROGRESS_KEY = "wordle_progress";

export const saveProgress = (date: string, guesses: string[]): void => {
  const raw = localStorage.getItem(PROGRESS_KEY);
  const all: Record<string, string[]> = raw ? JSON.parse(raw) : {};
  all[date] = guesses;
  localStorage.setItem(PROGRESS_KEY, JSON.stringify(all));
};

export const loadProgress = (date: string): string[] => {
  if (typeof window === "undefined") return [];
  const raw = localStorage.getItem(PROGRESS_KEY);
  if (!raw) return [];
  const all: Record<string, string[]> = JSON.parse(raw);
  return all[date] ?? [];
};

export interface WordleDayEntry {
  date: string;
  status: "won" | "lost";
  guesses: number;
}

const getDays = (): WordleDayEntry[] => {
  if (typeof window === "undefined") return [];
  return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
};

const saveDays = (days: WordleDayEntry[]): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(days));
};

export const getDayResult = (date: string): WordleDayEntry | null => {
  const days = getDays();
  return days.find((d) => d.date === date) ?? null;
};

export const recordDayResult = (date: string, status: "won" | "lost", guesses: number): void => {
  const days = getDays();
  const existing = days.findIndex((d) => d.date === date);
  if (existing >= 0) {
    if (days[existing].status === status && days[existing].guesses === guesses) return;
    days[existing] = { date, status, guesses };
  } else {
    days.push({ date, status, guesses });
  }
  days.sort((a, b) => a.date.localeCompare(b.date));
  saveDays(days);
};

export const computeStreak = (): number => {
  const today = new Date().toISOString().split("T")[0];
  const days = getDays();
  const wonSet = new Set(days.filter((d) => d.status === "won").map((d) => d.date));
  if (wonSet.size === 0) return 0;

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
