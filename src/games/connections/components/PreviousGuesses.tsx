"use client";

import { useState } from "react";
import { useConnectionsStore } from "../store";

export const PreviousGuesses = () => {
  const previousGuesses = useConnectionsStore((s) => s.previousGuesses);
  const tiles = useConnectionsStore((s) => s.tiles);
  const revealedCategories = useConnectionsStore((s) => s.revealedCategories);
  const gameStatus = useConnectionsStore((s) => s.gameStatus);
  const setHighlightedTileIds = useConnectionsStore((s) => s.setHighlightedTileIds);
  const selectTilesByWords = useConnectionsStore((s) => s.selectTilesByWords);
  const [expanded, setExpanded] = useState(true);

  if (previousGuesses.length === 0) return null;

  const revealedTileIds = new Set(revealedCategories.flatMap((rc) => rc.tileIds));

  const getActiveTileIds = (words: string[]): string[] => {
    const wordSet = new Set(words);
    return tiles
      .filter((t) => wordSet.has(t.word) && !revealedTileIds.has(t.id))
      .map((t) => t.id);
  };

  return (
    <div className="w-full">
      <button
        type="button"
        onClick={() => setExpanded((e) => !e)}
        className="font-label text-xs tracking-widest uppercase text-on-surface-variant hover:text-on-surface transition-colors flex items-center gap-1.5"
      >
        <span>{expanded ? "▾" : "▸"}</span>
        <span>Incorrect guesses ({previousGuesses.length})</span>
      </button>
      {expanded && (
        <div className="mt-3 flex flex-col gap-2">
          {previousGuesses.map((guess, i) => {
            const activeIds = getActiveTileIds(guess);
            return (
              <div
                key={i}
                className="flex gap-1.5 cursor-pointer group"
                onMouseEnter={() => setHighlightedTileIds(activeIds)}
                onMouseLeave={() => setHighlightedTileIds([])}
                onClick={() => {
                  if (gameStatus === "playing") selectTilesByWords(guess);
                }}
              >
                {guess.map((word) => (
                  <span
                    key={word}
                    className="flex-1 text-center font-body text-xs text-on-surface py-1.5 px-2 rounded-sm bg-surface-container group-hover:bg-surface-container-high transition-colors"
                  >
                    {word}
                  </span>
                ))}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
