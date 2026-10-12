"use client";

import { DateNav } from "@/components/DateNav";
import { formatLocalDate } from "@/lib/date";
import {
  addGreenHint,
  addYellowHint,
  areAllLettersKnown,
  isSolved,
  type TileColor,
  type TileState,
} from "@/games/wordle/hints";
import { useEffect, useRef, useState } from "react";

const EMPTY_TILE: TileState = { letter: "", color: "unset" };

const TILE_STYLES: Record<
  TileColor | "empty",
  { bg: string; border: string; text: string }
> = {
  empty: {
    bg: "transparent",
    border: "#D3D6DA",
    text: "var(--color-on-surface)",
  },
  unset: {
    bg: "transparent",
    border: "#878A8C",
    text: "var(--color-on-surface)",
  },
  green: { bg: "#3E713B", border: "#3E713B", text: "#ffffff" },
  yellow: { bg: "#C9B458", border: "#C9B458", text: "#1c1c19" },
};

function HintTile({
  tile,
  tileRef,
  onLetterChange,
  onCycleColor,
  index,
}: {
  tile: TileState;
  tileRef: (el: HTMLInputElement | null) => void;
  onLetterChange: (letter: string) => void;
  onCycleColor: () => void;
  index: number;
}) {
  const styleKey = tile.letter ? tile.color : "empty";
  const style = TILE_STYLES[styleKey];

  return (
    <div className="flex min-w-0 flex-col gap-1">
      <input
        ref={tileRef}
        type="text"
        inputMode="text"
        autoComplete="off"
        autoCapitalize="characters"
        maxLength={1}
        value={tile.letter.toUpperCase()}
        onChange={(event) => onLetterChange(event.target.value)}
        aria-label={`Letter at position ${index + 1}`}
        className="aspect-square w-full rounded-sm text-center font-body font-bold uppercase transition-colors"
        style={{
          backgroundColor: style.bg,
          border: `2px solid ${style.border}`,
          color: style.text,
          fontSize: "clamp(1.25rem, 5vw, 1.75rem)",
        }}
      />
      <button
        type="button"
        disabled={!tile.letter}
        onClick={onCycleColor}
        aria-label={`Position ${index + 1} color: ${tile.color === "unset" ? "no color" : tile.color}. Change color`}
        className="min-h-6 rounded-sm border border-outline bg-surface-container text-[0.7rem] font-label uppercase tracking-wide text-on-surface disabled:cursor-not-allowed disabled:opacity-50"
      >
        {tile.color === "unset" ? "Color" : tile.color}
      </button>
    </div>
  );
}

export default function WordleHintPage() {
  const today = formatLocalDate();
  const [selectedDate, setSelectedDate] = useState(today);
  const [retryKey, setRetryKey] = useState(0);

  return (
    <main
      id="main-content"
      className="min-h-screen bg-surface pt-24 pb-20 px-8 md:px-16 max-w-xl mx-auto flex flex-col gap-6"
    >
      <div>
        <h1 className="font-headline text-5xl italic text-on-surface">
          Wordle Hints
        </h1>
        <p className="mt-3 font-body text-sm leading-relaxed text-on-surface-variant">
          Enter any letters you already know, then ask for a yellow or green hint.
        </p>
      </div>
      <DateNav
        date={selectedDate}
        today={today}
        onDateChange={setSelectedDate}
      />
      <WordleHints
        key={`${selectedDate}-${retryKey}`}
        date={selectedDate}
        onRetry={() => setRetryKey((key) => key + 1)}
      />
    </main>
  );
}

function WordleHints({ date, onRetry }: { date: string; onRetry: () => void }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [answer, setAnswer] = useState("");
  const [tiles, setTiles] = useState<TileState[]>(() =>
    Array.from({ length: 5 }, () => ({ ...EMPTY_TILE })),
  );
  const [yellowPool, setYellowPool] = useState<string[]>([]);
  const [announcement, setAnnouncement] = useState("");

  const tileRefs = useRef<(HTMLInputElement | null)[]>([]);
  const tilesRef = useRef(tiles);
  useEffect(() => {
    tilesRef.current = tiles;
  }, [tiles]);

  useEffect(() => {
    const controller = new AbortController();
    fetch(`/api/wordle/${date}`, { signal: controller.signal })
      .then((r) => {
        if (!r.ok)
          throw new Error(
            r.status === 404
              ? "No puzzle found for this date."
              : "I couldn't load the puzzle. Try again in a minute.",
          );
        return r.json();
      })
      .then((data) => {
        setAnswer((data.solution ?? "").toLowerCase());
        setLoading(false);
      })
      .catch((e) => {
        if (e instanceof DOMException && e.name === "AbortError") return;
        setError(
          e instanceof Error
            ? e.message
            : "I couldn't load the puzzle. Try again in a minute.",
        );
        setLoading(false);
      });

    return () => {
      controller.abort();
    };
  }, [date]);

  const setTileLetter = (index: number, rawValue: string) => {
    const letter = rawValue.replace(/[^a-z]/gi, "").slice(-1).toLowerCase();
    setTiles((prev) => {
      const next = [...prev];
      next[index] = letter ? { ...prev[index], letter } : { ...EMPTY_TILE };
      return next;
    });
    if (letter && index < 4) tileRefs.current[index + 1]?.focus();
  };

  const cycleTileColor = (index: number) => {
    const current = tilesRef.current[index];
    if (!current.letter) return;
    const newColor: TileColor =
      current.color === "unset"
        ? "green"
        : current.color === "green"
          ? "yellow"
          : "unset";
    setTiles((previous) => previous.map((tile, tileIndex) =>
      tileIndex === index ? { ...tile, color: newColor } : tile,
    ));
    setAnnouncement(`Position ${index + 1} is now ${newColor === "unset" ? "unmarked" : newColor}.`);
  };

  const giveGreenHint = () => {
    if (!answer) return;
    const previous = tilesRef.current;
    const next = addGreenHint(previous, answer);
    const index = next.findIndex((tile, i) =>
      tile.color === "green" &&
      (previous[i].color !== "green" || previous[i].letter !== tile.letter),
    );
    setTiles(next);
    if (index >= 0) setAnnouncement(`Green hint: ${next[index].letter.toUpperCase()} is correct at position ${index + 1}.`);
  };

  const giveYellowHint = () => {
    if (!answer) return;
    const next = addYellowHint(answer, tilesRef.current, yellowPool);
    const letter = next.find((item) => !yellowPool.includes(item));
    setYellowPool(next);
    if (letter) setAnnouncement(`Yellow hint: the word contains ${letter.toUpperCase()}.`);
  };

  const allGreenFilled = answer ? isSolved(tiles, answer) : false;
  const allLettersKnown = answer
    ? areAllLettersKnown(tiles, answer, yellowPool)
    : false;

  return (
    <>
      {loading && (
        <div className="animate-pulse pt-4 flex flex-col gap-6" role="status" aria-label="Loading puzzle">
          <div className="grid grid-cols-5 gap-2 max-w-xs mx-auto w-full">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="aspect-square rounded-sm bg-surface-container-high"
              />
            ))}
          </div>
          <div className="h-10 w-48 rounded-sm bg-surface-container-high mx-auto" />
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

      {!loading && !error && (
        <>
          <div className="flex flex-col gap-3 items-center">
            <p className="font-label text-xs tracking-widest uppercase text-on-surface-variant/60">
              Enter a letter, then use its color control to mark what you know.
            </p>
            <div
              className="grid grid-cols-5 gap-2 w-full max-w-xs"
              role="group"
              aria-label="Word tiles"
            >
              {tiles.map((tile, i) => (
                <HintTile
                  key={i}
                  index={i}
                  tile={tile}
                  tileRef={(el) => {
                    tileRefs.current[i] = el;
                  }}
                  onLetterChange={(letter) => setTileLetter(i, letter)}
                  onCycleColor={() => cycleTileColor(i)}
                />
              ))}
            </div>
          </div>

          {yellowPool.length > 0 && (
            <div className="flex flex-col gap-2 items-center">
              <p className="font-label text-xs tracking-widest uppercase text-on-surface-variant/60">
                Letters in the word
              </p>
              <div role="list" aria-live="polite" className="flex flex-wrap gap-2 justify-center">
                {yellowPool.map((letter, i) => (
                  <span
                    key={i}
                    role="listitem"
                    className="w-9 h-9 rounded-sm font-body font-bold text-base flex items-center justify-center"
                    style={{ backgroundColor: "#C9B458", color: "#1c1c19" }}
                  >
                    {letter.toUpperCase()}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="flex gap-3 justify-center pt-2">
            <button
              type="button"
              onClick={() => { if (!allLettersKnown) giveYellowHint(); }}
              aria-disabled={allLettersKnown}
              aria-describedby={allLettersKnown ? "yellow-hint-unavailable" : undefined}
              className="font-label text-sm tracking-widest uppercase px-5 py-2.5 rounded-sm transition-colors duration-200 aria-disabled:opacity-50 aria-disabled:cursor-not-allowed"
              style={{ backgroundColor: "#C9B458", color: "#1c1c19" }}
            >
              Yellow hint
            </button>
            <button
              type="button"
              onClick={() => { if (!allGreenFilled) giveGreenHint(); }}
              aria-disabled={allGreenFilled}
              aria-describedby={allGreenFilled ? "green-hint-unavailable" : undefined}
              className="font-label text-sm tracking-widest uppercase px-5 py-2.5 rounded-sm transition-colors duration-200 aria-disabled:opacity-50 aria-disabled:cursor-not-allowed"
              style={{ backgroundColor: "#3E713B", color: "#ffffff" }}
            >
              Green hint
            </button>
          </div>
          <p id="yellow-hint-unavailable" className="sr-only">All letters in the answer are already known.</p>
          <p id="green-hint-unavailable" className="sr-only">Every letter is already in its correct position.</p>
          <p className="sr-only" role="status" aria-live="polite" aria-atomic="true">{announcement}</p>
        </>
      )}
    </>
  );
}
