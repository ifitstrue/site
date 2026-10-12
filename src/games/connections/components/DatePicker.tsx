"use client";

import { useReducer, useEffect, useRef } from "react";
import {
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
  const text = isCurrentMonth ? "text-on-surface" : "text-on-surface-variant/40";

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
  | { type: "PREV_MONTH" }
  | { type: "NEXT_MONTH" }
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
    case "PREV_MONTH":
      return state.viewMonth === 0
        ? { ...state, viewMonth: 11, viewYear: state.viewYear - 1 }
        : { ...state, viewMonth: state.viewMonth - 1 };
    case "NEXT_MONTH":
      return state.viewMonth === 11
        ? { ...state, viewMonth: 0, viewYear: state.viewYear + 1 }
        : { ...state, viewMonth: state.viewMonth + 1 };
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
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      dispatch({
        type: "RESET",
        year: Number(value.split("-")[0]),
        month: Number(value.split("-")[1]) - 1,
      });
      requestAnimationFrame(() => {
        ref.current
          ?.querySelector<HTMLElement>('[aria-current="date"]')
          ?.focus();
      });
    }
  }, [isOpen, value]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key !== "Tab") return;
      const buttons = ref.current?.querySelectorAll<HTMLButtonElement>(
        "button:not([disabled])",
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
              onClick={() => dispatch({ type: "PREV_MONTH" })}
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
              onClick={() => dispatch({ type: "NEXT_MONTH" })}
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
                className="text-center font-label text-[10px] tracking-widest text-on-surface-variant/50 py-1"
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
                  type="button"
                  aria-label={formatDisplayDate(date)}
                  aria-current={date === value ? "date" : undefined}
                  disabled={style.isFuture}
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
                type="button"
                disabled={y > todayYear}
                onClick={() => dispatch({ type: "SET_YEAR", year: y })}
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
