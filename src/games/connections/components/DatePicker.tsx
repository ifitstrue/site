"use client";

import { useReducer, useEffect, useRef, useState } from "react";
import {
  addDays,
  formatDisplayDate,
  getCalendarCells,
  formatMonthYear,
} from "../utils/calendarUtils";

interface DatePickerProps {
  value: string;
  today: string;
  isOpen: boolean;
  onClose: () => void;
  onSelect: (date: string) => void;
}

const DAY_LABELS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

interface CellStyle {
  bg: string;
  text: string;
  ring: string;
  cursor: string;
  isFuture: boolean;
}

const getCellStyle = (
  date: string,
  today: string,
  isCurrentMonth: boolean,
  selected: string
): CellStyle => {
  const isFuture = date > today;
  const isToday = date === today;
  const isSelected = date === selected;

  if (isFuture) {
    return {
      bg: "bg-transparent",
      text: isCurrentMonth ? "text-on-surface-variant/25" : "text-on-surface-variant/12",
      ring: "",
      cursor: "cursor-not-allowed",
      isFuture: true,
    };
  }

  const bg = "bg-transparent hover:bg-surface-container";
  const text = isCurrentMonth ? "text-on-surface" : "text-on-surface-variant/70";

  const ring = isToday || isSelected ? "ring-2 ring-primary ring-inset" : "";

  return { bg, text, ring, cursor: "cursor-pointer", isFuture: false };
};

type PickerState = {
  viewYear: number;
  viewMonth: number;
  mode: "month" | "year";
  decadeStart: number;
};

type PickerAction =
  | { type: "RESET"; year: number; month: number }
  | { type: "SET_MODE"; mode: "month" | "year" }
  | { type: "SET_YEAR"; year: number }
  | { type: "SHIFT_DECADE"; delta: number };

const pickerReducer = (state: PickerState, action: PickerAction): PickerState => {
  switch (action.type) {
    case "RESET":
      return {
        viewYear: action.year,
        viewMonth: action.month,
        mode: "month",
        decadeStart: Math.floor(action.year / 10) * 10,
      };
    case "SET_MODE":
      return { ...state, mode: action.mode };
    case "SET_YEAR":
      return { ...state, viewYear: action.year, mode: "month" };
    case "SHIFT_DECADE":
      return { ...state, decadeStart: state.decadeStart + action.delta };
  }
};

const initState = (value: string): PickerState => {
  const year = Number(value.split("-")[0]);
  const month = Number(value.split("-")[1]) - 1;
  return { viewYear: year, viewMonth: month, mode: "month", decadeStart: Math.floor(year / 10) * 10 };
};

export const DatePicker = ({
  value,
  today,
  isOpen,
  onClose,
  onSelect,
}: DatePickerProps) => {
  const [picker, dispatch] = useReducer(pickerReducer, value, initState);
  const [focusedDate, setFocusedDate] = useState(value);
  const ref = useRef<HTMLDivElement>(null);
  const dateRefs = useRef(new Map<string, HTMLButtonElement>());
  const yearRefs = useRef(new Map<number, HTMLButtonElement>());

  useEffect(() => {
    if (!isOpen) return;
    const rafId = requestAnimationFrame(() => {
      if (picker.mode === "year") yearRefs.current.get(picker.viewYear)?.focus();
      else dateRefs.current.get(focusedDate)?.focus();
    });
    return () => cancelAnimationFrame(rafId);
  }, [focusedDate, isOpen, picker.mode, picker.viewMonth, picker.viewYear]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key !== "Tab") return;
      const buttons = ref.current?.querySelectorAll<HTMLButtonElement>(
        'button:not([disabled]):not([tabindex="-1"])',
      );
      if (!buttons?.length) return;
      const first = buttons[0];
      const last = buttons[buttons.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    const onMouseDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onMouseDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onMouseDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const { viewYear, viewMonth, mode, decadeStart } = picker;
  const cells = getCalendarCells(viewYear, viewMonth);
  const years = Array.from({ length: 12 }, (_, i) => decadeStart + i);
  const [todayYear, todayMonth] = today.split("-").map(Number);
  const showingCurrentMonth =
    viewYear === todayYear && viewMonth === todayMonth - 1;

  const moveFocus = (date: string) => {
    if (date > today) return;
    const [year, month] = date.split("-").map(Number);
    setFocusedDate(date);
    if (year !== viewYear || month - 1 !== viewMonth) {
      dispatch({ type: "RESET", year, month: month - 1 });
    } else {
      dateRefs.current.get(date)?.focus();
    }
  };

  const shiftMonth = (date: string, amount: number) => {
    const [year, month, day] = date.split("-").map(Number);
    const target = new Date(year, month - 1 + amount, 1);
    const lastDay = new Date(target.getFullYear(), target.getMonth() + 1, 0).getDate();
    return `${target.getFullYear()}-${String(target.getMonth() + 1).padStart(2, "0")}-${String(Math.min(day, lastDay)).padStart(2, "0")}`;
  };

  const showAdjacentMonth = (amount: number) => {
    const target = shiftMonth(focusedDate, amount);
    if (target > today) return;
    const [year, month] = target.split("-").map(Number);
    setFocusedDate(target);
    dispatch({ type: "RESET", year, month: month - 1 });
  };

  const chooseYear = (year: number) => {
    const [, month, day] = focusedDate.split("-").map(Number);
    const lastDay = new Date(year, month, 0).getDate();
    setFocusedDate(`${year}-${String(month).padStart(2, "0")}-${String(Math.min(day, lastDay)).padStart(2, "0")}`);
    dispatch({ type: "SET_YEAR", year });
  };

  const handleDateKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>, date: string) => {
    const day = new Date(`${date}T00:00:00`).getDay();
    const target = {
      ArrowLeft: addDays(date, -1),
      ArrowRight: addDays(date, 1),
      ArrowUp: addDays(date, -7),
      ArrowDown: addDays(date, 7),
      Home: addDays(date, -day),
      End: addDays(date, 6 - day),
      PageUp: shiftMonth(date, -1),
      PageDown: shiftMonth(date, 1),
    }[event.key];
    if (!target) return;
    event.preventDefault();
    moveFocus(target > today ? today : target);
  };

  return (
    <div
      ref={ref}
      role="dialog"
      aria-modal="true"
      aria-label="Choose a puzzle date"
      className="absolute z-50 top-full mt-2 right-0 bg-surface border border-outline-variant/30 rounded-md shadow-lg p-3 w-72 select-none"
    >
      {mode === "month" ? (
        <>
          <div className="flex items-center justify-between mb-2">
            <button
              type="button"
              onClick={() => showAdjacentMonth(-1)}
              aria-label="Previous month"
              className="p-1.5 rounded hover:bg-surface-container text-on-surface-variant hover:text-on-surface transition-colors text-lg leading-none"
            >
              ‹
            </button>
            <button
              type="button"
              onClick={() => dispatch({ type: "SET_MODE", mode: "year" })}
              aria-label="Show year picker"
              className="font-label text-sm tracking-wide text-on-surface hover:text-primary transition-colors px-2 py-1 rounded hover:bg-surface-container"
            >
              {formatMonthYear(viewYear, viewMonth)}
            </button>
            <button
              type="button"
              disabled={showingCurrentMonth}
              onClick={() => showAdjacentMonth(1)}
              aria-label="Next month"
              className="p-1.5 rounded hover:bg-surface-container text-on-surface-variant hover:text-on-surface transition-colors text-lg leading-none disabled:opacity-25 disabled:cursor-not-allowed"
            >
              ›
            </button>
          </div>

          <div className="grid grid-cols-7 mb-1">
            {DAY_LABELS.map((d) => (
              <div
                key={d}
                className="text-center font-label text-xs tracking-wide text-on-surface-variant py-1"
              >
                {d}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-y-0.5">
            {cells.map(({ date, dayNum, isCurrentMonth }) => {
              const style = getCellStyle(date, today, isCurrentMonth, value);

              return (
                <button
                  key={date}
                  ref={(element) => {
                    if (element) dateRefs.current.set(date, element);
                    else dateRefs.current.delete(date);
                  }}
                  type="button"
                  tabIndex={!style.isFuture && date === focusedDate ? 0 : -1}
                  aria-label={formatDisplayDate(date)}
                  aria-current={date === value ? "date" : undefined}
                  disabled={style.isFuture}
                  onFocus={() => setFocusedDate(date)}
                  onKeyDown={(event) => handleDateKeyDown(event, date)}
                  onClick={() => onSelect(date)}
                  className={`flex flex-col items-center justify-center h-11 w-full rounded text-sm font-body transition-colors ${style.bg} ${style.text} ${style.ring} ${style.cursor}`}
                >
                  <span className="leading-none">{dayNum}</span>
                </button>
              );
            })}
          </div>
        </>
      ) : (
        <>
          <div className="flex items-center justify-between mb-3">
            <button
              type="button"
              onClick={() => dispatch({ type: "SHIFT_DECADE", delta: -12 })}
              aria-label="Previous years"
              className="p-1.5 rounded hover:bg-surface-container text-on-surface-variant hover:text-on-surface transition-colors text-lg leading-none"
            >
              ‹
            </button>
            <span className="font-label text-sm tracking-wide text-on-surface">
              {decadeStart}–{decadeStart + 11}
            </span>
            <button
              type="button"
              onClick={() => dispatch({ type: "SHIFT_DECADE", delta: 12 })}
              aria-label="Next years"
              className="p-1.5 rounded hover:bg-surface-container text-on-surface-variant hover:text-on-surface transition-colors text-lg leading-none"
            >
              ›
            </button>
          </div>

          <div className="grid grid-cols-3 gap-1">
            {years.map((y) => (
              <button
                key={y}
                ref={(element) => {
                  if (element) yearRefs.current.set(y, element);
                  else yearRefs.current.delete(y);
                }}
                type="button"
                disabled={y > todayYear}
                onClick={() => chooseYear(y)}
                className={`py-2 rounded text-sm font-body transition-colors disabled:opacity-25 disabled:cursor-not-allowed ${
                  y === viewYear
                    ? "bg-primary text-on-primary"
                    : "hover:bg-surface-container text-on-surface"
                }`}
              >
                {y}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};
