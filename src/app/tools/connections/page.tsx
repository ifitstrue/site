"use client";

import { useMemo, useState } from "react";
import { usePuzzle } from "@/games/connections/hooks/usePuzzle";
import { LEVEL_COLORS } from "@/games/connections/levelColors";
import { DateNav } from "@/components/DateNav";
import { formatLocalDate } from "@/lib/date";

const LEVEL_META: Record<number, { label: string; bg: string; text: string }> = {
  0: { label: "Yellow", ...LEVEL_COLORS[0] },
  1: { label: "Green",  ...LEVEL_COLORS[1] },
  2: { label: "Blue",   ...LEVEL_COLORS[2] },
  3: { label: "Purple", ...LEVEL_COLORS[3] },
};

export default function ConnectionsHintPage() {
  const today = formatLocalDate();
  const [selectedDate, setSelectedDate] = useState(today);
  const [retryKey, setRetryKey] = useState(0);

  return (
    <main id="main-content" className="min-h-screen bg-surface pt-24 pb-20 px-6 max-w-105 w-full mx-auto flex flex-col gap-6">
      <div>
        <h1 className="font-headline text-5xl italic text-on-surface">
          Connections Hints
        </h1>
        <p className="mt-3 font-body text-sm leading-relaxed text-on-surface-variant">
          Reveal one word at a time, starting with the easiest unsolved category.
        </p>
      </div>
      <DateNav date={selectedDate} today={today} onDateChange={setSelectedDate} />
      <ConnectionsHints
        key={`${selectedDate}-${retryKey}`}
        date={selectedDate}
        onRetry={() => setRetryKey((key) => key + 1)}
      />
    </main>
  );
}

function ConnectionsHints({ date, onRetry }: { date: string; onRetry: () => void }) {
  const { puzzle, loading, error } = usePuzzle(date);

  const [hintCounts, setHintCounts] = useState<Record<number, number>>({});
  const [solved, setSolved] = useState<Set<number>>(new Set());
  const [announcement, setAnnouncement] = useState("");

  const categories = useMemo(
    () =>
      (puzzle?.categories ?? [])
        .map((cat, i) => ({
          ...cat,
          level: cat.level ?? i,
          words: cat.cards
            .map((c) => c.content ?? c.image_alt_text ?? "")
            .filter(Boolean),
        }))
        .sort((a, b) => a.level - b.level),
    [puzzle]
  );

  const handleHint = () => {
    const target = categories.find(
      (cat) =>
        !solved.has(cat.level) &&
        (hintCounts[cat.level] ?? 0) < cat.words.length
    );
    if (!target) return;
    const nextWord = target.words[hintCounts[target.level] ?? 0];
    setHintCounts((prev) => ({
      ...prev,
      [target.level]: (prev[target.level] ?? 0) + 1,
    }));
    setAnnouncement(`Hint revealed: ${nextWord}.`);
  };

  const toggleSolved = (level: number) => {
    const next = new Set(solved);
    if (next.has(level)) next.delete(level);
    else next.add(level);
    setSolved(next);
    const category = categories.find((item) => item.level === level);
    setAnnouncement(`${category?.title ?? "Category"} marked ${next.has(level) ? "solved" : "unsolved"}.`);
  };

  const hintDisabled =
    !puzzle ||
    categories.every(
      (cat) =>
        solved.has(cat.level) ||
        (hintCounts[cat.level] ?? 0) >= cat.words.length
    );

  return (
    <>
      {loading && (
        <div className="animate-pulse flex flex-col gap-3 pt-4" role="status" aria-label="Loading puzzle">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="h-20 rounded-sm bg-surface-container-high" />
          ))}
        </div>
      )}

      {error && (
        <div className="text-center pt-12">
          <p role="alert" className="font-body text-on-surface-variant">{error}</p>
          <button type="button" onClick={onRetry} className="mt-4 font-label text-xs tracking-widest uppercase text-primary underline underline-offset-4">
            Try again
          </button>
        </div>
      )}

      {!loading && !error && puzzle && (
        <>
          <div className="flex flex-col gap-2" role="list" aria-label="Connections categories" aria-live="polite">
            {categories.map((cat) => {
              const meta = LEVEL_META[cat.level] ?? LEVEL_META[0];
              const revealedCount = hintCounts[cat.level] ?? 0;
              const revealed = cat.words.slice(0, revealedCount);
              const isSolved = solved.has(cat.level);

              return (
                <div
                  key={cat.level}
                  role="listitem"
                  className="rounded-sm overflow-hidden"
                >
                  <div
                    className="px-4 py-2 flex items-center justify-between"
                    style={{ backgroundColor: meta.bg, color: meta.text }}
                  >
                    <span className="font-label text-xs tracking-widest uppercase font-semibold">
                      {isSolved || revealedCount >= cat.words.length ? cat.title : meta.label}
                    </span>
                    <button
                      type="button"
                      onClick={() => toggleSolved(cat.level)}
                      aria-pressed={isSolved}
                      aria-label={isSolved ? "Mark unsolved" : "Mark solved"}
                      className="font-label text-xs tracking-widest uppercase opacity-70 hover:opacity-100 transition-opacity"
                      style={{ color: meta.text }}
                    >
                      {isSolved ? "✓ Solved" : "Mark solved"}
                    </button>
                  </div>

                  <div className="px-4 py-3 bg-surface-container min-h-12 flex items-center">
                    {revealed.length > 0 ? (
                      <p className="font-body text-base text-on-surface leading-snug">
                        {revealed.join(", ")}
                      </p>
                    ) : (
                      <p className="font-body text-sm text-on-surface-variant italic select-none">
                        No hints yet
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              onClick={handleHint}
              disabled={hintDisabled}
              className="font-label text-sm tracking-widest uppercase px-6 py-2.5 rounded-sm bg-primary text-on-primary hover:bg-primary-fixed-dim transition-colors duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
            >
              Hint
            </button>
          </div>
          <p className="sr-only" role="status" aria-live="polite" aria-atomic="true">{announcement}</p>
        </>
      )}
    </>
  );
}
