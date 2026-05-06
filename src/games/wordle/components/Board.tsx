"use client";

import { LetterRow } from "./LetterRow";
import type { LetterStatus } from "../hooks/useWordleGame";

interface BoardProps {
  guesses: string[];
  currentGuess: string;
  feedbacks: LetterStatus[][];
  isSubmitting: boolean;
  maxGuesses?: number;
}

export const Board = ({ guesses, currentGuess, feedbacks, isSubmitting, maxGuesses = 6 }: BoardProps) => {
  // When submitting, the hook already moved the word into `guesses` and cleared `currentGuess`.
  // Show `currentGuess` (the submitting word passed from page) in the current row,
  // and skip the last entry of `guesses` (the same word, being animated).
  const displayGuesses = isSubmitting ? guesses.slice(0, -1) : guesses;
  const displayCurrent = currentGuess;

  const rows = Array.from({ length: maxGuesses }, (_, i) => {
    if (i < displayGuesses.length) {
      return {
        letters: displayGuesses[i],
        feedback: feedbacks[i],
        isCurrentRow: false,
        isSubmitting: false,
      };
    }
    if (i === displayGuesses.length) {
      return {
        letters: displayCurrent,
        feedback: isSubmitting ? feedbacks[guesses.length - 1] : undefined,
        isCurrentRow: true,
        isSubmitting,
      };
    }
    return {
      letters: "",
      feedback: undefined,
      isCurrentRow: false,
      isSubmitting: false,
    };
  });

  return (
    <div className="flex flex-col gap-1.5 items-center mx-auto" style={{ maxWidth: "380px" }}>
      {rows.map((row, i) => (
        <LetterRow
          key={i}
          letters={row.letters}
          feedback={row.feedback}
          isCurrentRow={row.isCurrentRow}
          isSubmitting={row.isSubmitting}
        />
      ))}
    </div>
  );
};
