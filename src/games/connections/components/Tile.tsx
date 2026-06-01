"use client";

import { motion } from "framer-motion";
import type { TileState } from "../types";

interface TileProps {
  tile: TileState;
  isSelected: boolean;
  isShaking: boolean;
  isHighlighted: boolean;
  onSelect: (id: string) => void;
}

export const Tile = ({ tile, isSelected, isShaking, isHighlighted, onSelect }: TileProps) => {
  const animateValue = isShaking
    ? { x: [0, -8, 8, -8, 8, 0] }
    : {};

  const transitionValue: Parameters<typeof motion.div>[0]["transition"] = isShaking
    ? { duration: 0.4 }
    : {
        duration: 0.3,
        layout: { duration: 0.25, ease: [0.2, 0.8, 0.2, 1] },
      };

  const col = tile.slotIndex % 4;
  const row = Math.floor(tile.slotIndex / 4);

  const buttonClass = isSelected
    ? "ring-2 ring-primary bg-primary-container/20 text-on-primary-container"
    : isHighlighted
    ? "ring-2 ring-secondary bg-secondary-container/20 text-on-secondary-container"
    : "bg-surface-container text-on-surface hover:bg-surface-container-high";

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1, ...animateValue }}
      transition={transitionValue}
      exit={{ opacity: 0, scale: 0.7, transition: { duration: 0.05 } }}
      className="min-w-0"
      style={{ gridColumn: col + 1, gridRow: row + 1 }}
    >
      <button
        type="button"
        onClick={() => onSelect(tile.id)}
        aria-pressed={isSelected}
        aria-label={tile.word}
        className={`w-full aspect-square flex items-center justify-center rounded-sm text-sm md:text-base font-body font-medium transition-colors duration-200 overflow-hidden ${buttonClass}`}
      >
        {tile.imageUrl ? (
          <img
            src={tile.imageUrl}
            alt={tile.imageAlt ?? tile.word}
            className="w-3/4 h-3/4 object-contain"
            draggable={false}
          />
        ) : (
          <motion.span layoutId={`word-${tile.id}`}>{tile.word}</motion.span>
        )}
      </button>
    </motion.div>
  );
};
