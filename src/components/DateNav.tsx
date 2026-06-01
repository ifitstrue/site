"use client";

import { useState } from "react";
import { DatePicker } from "@/games/connections/components/DatePicker";
import { formatDisplayDate, addDays } from "@/games/connections/utils/calendarUtils";

interface DateNavProps {
  date: string;
  today: string;
  onDateChange: (date: string) => void;
}

export function DateNav({ date, today, onDateChange }: DateNavProps) {
  const [pickerOpen, setPickerOpen] = useState(false);

  const select = (d: string) => {
    setPickerOpen(false);
    onDateChange(d);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="relative flex items-center">
        <button
          type="button"
          onClick={() => select(addDays(date, -1))}
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
              onClick={() => select(today)}
              className="font-label text-xs tracking-widest uppercase px-2 py-1 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors leading-none"
            >
              Today
            </button>
          )}
        </div>

        <button
          type="button"
          onClick={() => select(addDays(date, 1))}
          disabled={date >= today}
          aria-label="Next day"
          className="px-2 py-1.5 text-on-surface-variant hover:text-on-surface hover:bg-surface-container rounded transition-colors font-body text-2xl leading-none disabled:text-on-surface-variant/20 disabled:cursor-not-allowed"
        >
          ›
        </button>

        <DatePicker
          value={date}
          today={today}
          statuses={{}}
          isOpen={pickerOpen}
          onClose={() => setPickerOpen(false)}
          onSelect={select}
        />
      </div>

      <div className="h-px bg-tertiary-fixed-dim/50" />
    </div>
  );
}
