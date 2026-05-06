import { useReducer, useEffect } from "react";

export interface DayStatus {
  status: "won" | "lost" | "playing";
  mistakes: number;
}

const STORAGE_KEY = "connections_progress";

export const getDayStatuses = (): Record<string, DayStatus> => {
  if (typeof window === "undefined") return {};
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return {};
  const all: Record<string, { gameStatus: string; mistakes: number }> = JSON.parse(raw);
  const result: Record<string, DayStatus> = {};
  for (const [date, snapshot] of Object.entries(all)) {
    result[date] = {
      status: snapshot.gameStatus as DayStatus["status"],
      mistakes: snapshot.mistakes,
    };
  }
  return result;
};

export const useDayStatuses = (selectedDate: string): Record<string, DayStatus> => {
  const [statuses, dispatch] = useReducer(
    (_: Record<string, DayStatus>, next: Record<string, DayStatus>) => next,
    {}
  );

  useEffect(() => {
    dispatch(getDayStatuses());
  }, [selectedDate]);

  return statuses;
};
