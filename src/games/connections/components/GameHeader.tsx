"use client";

import { useState } from "react";
import { useConnectionsStore } from "../store";
import { HintButton } from "./HintButton";
import { DatePicker } from "./DatePicker";
import { useDayStatuses } from "../hooks/useDayStatuses";
import { formatDisplayDate, addDays } from "../utils/calendarUtils";

interface GameHeaderProps {
  date: string;
  today: string;
  streak: number;
  onSubmit: () => void;
  onDateChange: (date: string) => void;
}

export const GameHeader = ({ date, today, streak, onSubmit, onDateChange }: GameHeaderProps) => {
  const shuffleTiles = useConnectionsStore((s) => s.shuffleTiles);
  const clearSelections = useConnectionsStore((s) => s.clearSelections);
  const selections = useConnectionsStore((s) => s.selections);
  const gameStatus = useConnectionsStore((s) => s.gameStatus);
  const [pickerOpen, setPickerOpen] = useState(false);
  const statuses = useDayStatuses(date);

  return (
    <div className="flex flex-col gap-4">
      <div className="relative flex items-center">
        <button
          type="button"
          onClick={() => { setPickerOpen(false); onDateChange(addDays(date, -1)); }}
          aria-label="Previous day"
          className="px-2 py-1.5 text-on-surface-variant hover:text-on-surface hover:bg-surface-container rounded transition-colors font-body text-2xl leading-none"
        >
          ‹
        </button>

        <div className="flex-1 flex items-center justify-center gap-2">
          <button
            type="button"
            onClick={() => setPickerOpen((o) => !o)}
            aria-label="Open date picker"
            aria-expanded={pickerOpen}
            aria-haspopup="dialog"
            className="font-label text-sm tracking-widest uppercase px-3 py-1.5 rounded text-on-surface hover:bg-surface-container transition-colors"
          >
            {formatDisplayDate(date)}
          </button>
          {date < today && (
            <button
              type="button"
              onClick={() => { setPickerOpen(false); onDateChange(today); }}
              className="font-label text-xs tracking-widest uppercase px-2 py-1 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors leading-none"
            >
              Today
            </button>
          )}
        </div>

        <button
          type="button"
          onClick={() => { setPickerOpen(false); onDateChange(addDays(date, 1)); }}
          disabled={date >= today}
          aria-label="Next day"
          className="px-2 py-1.5 text-on-surface-variant hover:text-on-surface hover:bg-surface-container rounded transition-colors font-body text-2xl leading-none disabled:text-on-surface-variant/20 disabled:cursor-not-allowed"
        >
          ›
        </button>

        <DatePicker
          value={date}
          today={today}
          statuses={statuses}
          isOpen={pickerOpen}
          onClose={() => setPickerOpen(false)}
          onSelect={onDateChange}
        />
      </div>

      <p className="text-center font-label text-xs tracking-widest text-on-surface-variant/60">
        Streak: {streak}
      </p>

      <div className="h-px bg-tertiary-fixed-dim/50" />

      <div className="flex items-center justify-end gap-3">
        <HintButton />
        <button
          type="button"
          onClick={shuffleTiles}
          disabled={gameStatus !== "playing"}
          className="font-label text-sm tracking-widest uppercase px-5 py-2.5 rounded-sm text-on-surface-variant hover:text-primary hover:bg-surface-container transition-colors duration-200 disabled:text-on-surface-variant/30 disabled:cursor-not-allowed"
        >
          Shuffle
        </button>
        <button
          type="button"
          onClick={clearSelections}
          disabled={selections.length === 0 || gameStatus !== "playing"}
          className="font-label text-sm tracking-widest uppercase px-5 py-2.5 rounded-sm text-on-surface-variant hover:text-primary hover:bg-surface-container transition-colors duration-200 disabled:text-on-surface-variant/30 disabled:cursor-not-allowed"
        >
          Deselect
        </button>
        <button
          type="button"
          onClick={onSubmit}
          disabled={selections.length !== 4 || gameStatus !== "playing"}
          className="font-label text-sm tracking-widest uppercase px-5 py-2.5 rounded-sm bg-primary text-on-primary hover:bg-primary-fixed-dim transition-colors duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
        >
          Submit
        </button>
      </div>
    </div>
  );
};
