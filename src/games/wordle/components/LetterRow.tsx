"use client";

import { LetterTile } from "./LetterTile";
import type { LetterStatus } from "../hooks/useWordleGame";

interface LetterRowProps {
  letters: string;
  feedback?: LetterStatus[];
  isSubmitting?: boolean;
  isCurrentRow?: boolean;
}

const STAGGER_DELAY = 0.08;

export const LetterRow = ({ letters, feedback, isSubmitting, isCurrentRow }: LetterRowProps) => {
  const paddedLetters = (letters + "     ").slice(0, 5);

  return (
    <div className="grid grid-cols-[repeat(5,minmax(45px,70px))] gap-1.5 mx-auto">
      {Array.from({ length: 5 }, (_, i) => {
        const letter = paddedLetters[i] === " " ? "" : paddedLetters[i];

        if (isCurrentRow && isSubmitting && feedback) {
          return (
            <LetterTile
              key={`flip-${i}`}
              letter={letter}
              status={feedback[i]}
              isFlipped={true}
              flipDelay={i * STAGGER_DELAY}
            />
          );
        }

        if (isCurrentRow && !isSubmitting) {
          return (
            <LetterTile
              key={`current-${i}`}
              letter={letter}
              isFlipped={false}
            />
          );
        }

        return (
          <LetterTile
            key={`${i}`}
            letter={letter}
            status={feedback ? feedback[i] : undefined}
            isFlipped={!!feedback?.[i]}
            flipDelay={0}
          />
        );
      })}
    </div>
  );
};
