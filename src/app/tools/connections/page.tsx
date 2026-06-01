"use client";

import { useEffect, useMemo, useState } from "react";
import { usePuzzle } from "@/games/connections/hooks/usePuzzle";
import { LEVEL_COLORS } from "@/games/connections/levelColors";
import { DateNav } from "@/components/DateNav";

const LEVEL_META: Record<number, { label: string; bg: string; text: string }> = {
  0: { label: "Yellow", ...LEVEL_COLORS[0] },
  1: { label: "Green",  ...LEVEL_COLORS[1] },
  2: { label: "Blue",   ...LEVEL_COLORS[2] },
  3: { label: "Purple", ...LEVEL_COLORS[3] },
};

export default function ConnectionsHintPage() {
  const today = new Date().toISOString().split("T")[0];
  const [selectedDate, setSelectedDate] = useState(today);
  const { puzzle, loading, error } = usePuzzle(selectedDate);

  const [hintCounts, setHintCounts] = useState<Record<number, number>>({});
  const [solved, setSolved] = useState<Set<number>>(new Set());

  useEffect(() => {
    setHintCounts({});
    setSolved(new Set());
  }, [selectedDate]);

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
    setHintCounts((prev) => ({
      ...prev,
      [target.level]: (prev[target.level] ?? 0) + 1,
    }));
  };

  const toggleSolved = (level: number) => {
    setSolved((prev) => {
      const next = new Set(prev);
      if (next.has(level)) next.delete(level);
      else next.add(level);
      return next;
    });
  };

  const hintDisabled =
    !puzzle ||
    categories.every(
      (cat) =>
        solved.has(cat.level) ||
        (hintCounts[cat.level] ?? 0) >= cat.words.length
    );

  return (
    <main id="main-content" className="min-h-screen bg-surface pt-24 pb-20 px-6 max-w-105 w-full mx-auto flex flex-col gap-6">
      <DateNav date={selectedDate} today={today} onDateChange={setSelectedDate} />

      {loading && (
        <div className="animate-pulse flex flex-col gap-3 pt-4">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="h-20 rounded-sm bg-surface-container-high" />
          ))}
        </div>
      )}

      {error && (
        <p className="font-body text-on-surface-variant text-center pt-12">{error}</p>
      )}

      {!loading && !error && puzzle && (
        <>
          <div className="flex flex-col gap-2" role="list" aria-label="Connections categories">
            {categories.map((cat) => {
              const meta = LEVEL_META[cat.level] ?? LEVEL_META[0];
              const revealedCount = hintCounts[cat.level] ?? 0;
              const revealed = cat.words.slice(0, revealedCount);
              const isSolved = solved.has(cat.level);

              return (
                <div
                  key={cat.level}
                  role="listitem"
                  className={`rounded-sm overflow-hidden transition-opacity duration-200 ${isSolved ? "opacity-40" : ""}`}
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
                      <p className="font-body text-sm text-on-surface-variant/40 italic select-none">
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
        </>
      )}
    </main>
  );
}
