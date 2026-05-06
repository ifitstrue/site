"use client";

import { formatDisplayDate, addDays } from "@/games/connections/utils/calendarUtils";

interface GameHeaderProps {
  streak: number;
  date: string;
  today: string;
  onSubmit: () => void;
  onDateChange: (date: string) => void;
  onDelete: () => void;
  canSubmit: boolean;
  gameOver: boolean;
}

export const GameHeader = ({ streak, date, today, onSubmit, onDateChange, onDelete, canSubmit, gameOver }: GameHeaderProps) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="relative flex items-center">
        <button
          type="button"
          onClick={() => onDateChange(addDays(date, -1))}
          aria-label="Previous day"
          className="px-2 py-1.5 text-on-surface-variant hover:text-on-surface hover:bg-surface-container rounded transition-colors font-body text-2xl leading-none"
        >
          ‹
        </button>

        <div className="flex-1 flex items-center justify-center gap-2">
          <span className="font-label text-sm tracking-widest uppercase px-3 py-1.5 rounded text-on-surface">
            {formatDisplayDate(date)}
          </span>
          {date < today && (
            <button
              type="button"
              onClick={() => onDateChange(today)}
              className="font-label text-xs tracking-widest uppercase px-2 py-1 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors leading-none"
            >
              Today
            </button>
          )}
        </div>

        <button
          type="button"
          onClick={() => onDateChange(addDays(date, 1))}
          disabled={date >= today}
          aria-label="Next day"
          className="px-2 py-1.5 text-on-surface-variant hover:text-on-surface hover:bg-surface-container rounded transition-colors font-body text-2xl leading-none disabled:text-on-surface-variant/20 disabled:cursor-not-allowed"
        >
          ›
        </button>
      </div>

      <p className="text-center font-label text-xs tracking-widest text-on-surface-variant/60">
        Streak: {streak}
      </p>

      <div className="h-px bg-tertiary-fixed-dim/50" />

      {!gameOver && (
        <div className="flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onDelete}
            className="font-label text-sm tracking-widest uppercase px-5 py-2.5 rounded-sm text-on-surface-variant hover:text-primary hover:bg-surface-container transition-colors duration-200"
          >
            Delete
          </button>
          <button
            type="button"
            onClick={onSubmit}
            disabled={!canSubmit}
            className="font-label text-sm tracking-widest uppercase px-5 py-2.5 rounded-sm bg-primary text-on-primary hover:bg-primary-fixed-dim transition-colors duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
          >
            Submit
          </button>
        </div>
      )}
    </div>
  );
};
