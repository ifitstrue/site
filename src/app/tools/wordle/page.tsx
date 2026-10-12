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
  green: { bg: "#6AAA64", border: "#6AAA64", text: "#ffffff" },
  yellow: { bg: "#C9B458", border: "#C9B458", text: "#1c1c19" },
};

function HintTile({
  tile,
  isFocused,
  tileRef,
  onFocus,
  onClick,
  onKeyDown,
  index,
}: {
  tile: TileState;
  isFocused: boolean;
  tileRef: (el: HTMLButtonElement | null) => void;
  onFocus: () => void;
  onClick: () => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLButtonElement>) => void;
  index: number;
}) {
  const styleKey = tile.letter ? tile.color : "empty";
  const style = TILE_STYLES[styleKey];

  return (
    <button
      type="button"
      ref={tileRef}
      onFocus={onFocus}
      onClick={onClick}
      onKeyDown={onKeyDown}
      aria-label={
        tile.letter
          ? `Position ${index + 1}: ${tile.letter.toUpperCase()}, ${tile.color === "unset" ? "no color" : tile.color}`
          : `Position ${index + 1}: empty`
      }
      className="aspect-square rounded-sm font-body font-bold transition-all duration-150 outline-none"
      style={{
        backgroundColor: style.bg,
        border: `2px solid ${isFocused ? "var(--color-primary)" : style.border}`,
        color: style.text,
        fontSize: "clamp(1.25rem, 5vw, 1.75rem)",
        width: "100%",
      }}
    >
      {tile.letter.toUpperCase()}
    </button>
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
  const [focusedTile, setFocusedTile] = useState<number | null>(null);

  const tileRefs = useRef<(HTMLButtonElement | null)[]>([]);
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

  const handleTileKeyDown = (
    e: React.KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) => {
    if (/^[a-zA-Z]$/.test(e.key)) {
      e.preventDefault();
      const letter = e.key.toLowerCase();
      setTiles((prev) => {
        const next = [...prev];
        next[index] = { letter, color: "unset" };
        return next;
      });
      if (index < 4) tileRefs.current[index + 1]?.focus();
    } else if (e.key === "Backspace") {
      e.preventDefault();
      const current = tilesRef.current[index];
      if (current.letter) {
        setTiles((prev) => {
          const next = [...prev];
          next[index] = { ...EMPTY_TILE };
          return next;
        });
      } else if (index > 0) {
        setTiles((prev) => {
          const next = [...prev];
          next[index - 1] = { ...EMPTY_TILE };
          return next;
        });
        tileRefs.current[index - 1]?.focus();
      }
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      if (index < 4) tileRefs.current[index + 1]?.focus();
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      if (index > 0) tileRefs.current[index - 1]?.focus();
    } else if (e.key === " " || e.key === "Enter") {
      e.preventDefault();
      const current = tilesRef.current[index];
      if (current.letter) cycleTileColor(index);
    }
  };

  const cycleTileColor = (index: number) => {
    setTiles((prev) => {
      const next = [...prev];
      const curr = next[index];
      if (!curr.letter) return prev;
      const newColor: TileColor =
        curr.color === "unset"
          ? "green"
          : curr.color === "green"
            ? "yellow"
            : "unset";
      next[index] = { ...curr, color: newColor };
      return next;
    });
  };

  const handleTileClick = (index: number) => {
    if (tilesRef.current[index].letter) cycleTileColor(index);
  };

  const giveGreenHint = () => {
    if (!answer) return;
    setTiles((prev) => addGreenHint(prev, answer));
  };

  const giveYellowHint = () => {
    if (!answer) return;
    setYellowPool((prev) => addYellowHint(answer, tilesRef.current, prev));
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
              Type a letter, then click its tile to change the color.
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
                  isFocused={focusedTile === i}
                  tileRef={(el) => {
                    tileRefs.current[i] = el;
                  }}
                  onFocus={() => setFocusedTile(i)}
                  onClick={() => handleTileClick(i)}
                  onKeyDown={(e) => handleTileKeyDown(e, i)}
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
              onClick={giveYellowHint}
              disabled={allLettersKnown}
              className="font-label text-sm tracking-widest uppercase px-5 py-2.5 rounded-sm transition-colors duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
              style={{ backgroundColor: "#C9B458", color: "#1c1c19" }}
            >
              Yellow hint
            </button>
            <button
              type="button"
              onClick={giveGreenHint}
              disabled={allGreenFilled}
              className="font-label text-sm tracking-widest uppercase px-5 py-2.5 rounded-sm transition-colors duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
              style={{ backgroundColor: "#6AAA64", color: "#ffffff" }}
            >
              Green hint
            </button>
          </div>
        </>
      )}
    </>
  );
}
