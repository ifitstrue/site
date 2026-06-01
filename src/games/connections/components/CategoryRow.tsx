"use client";

import { motion } from "framer-motion";
import type { RevealedCategory } from "../types";
import { LEVEL_COLORS } from "../levelColors";

const LEVEL_STYLES: Record<number, { bg: string; text: string; label: string; difficulty: string }> = {
  0: { ...LEVEL_COLORS[0], label: "🟨", difficulty: "Easiest" },
  1: { ...LEVEL_COLORS[1], label: "🟩", difficulty: "Easy" },
  2: { ...LEVEL_COLORS[2], label: "🟦", difficulty: "Medium" },
  3: { ...LEVEL_COLORS[3], label: "🟪", difficulty: "Hardest" },
};

interface CategoryRowProps {
  category: RevealedCategory;
  style?: React.CSSProperties;
}

export const CategoryRow = ({ category, style }: CategoryRowProps) => {
  const s = LEVEL_STYLES[category.level] || LEVEL_STYLES[0];

  return (
    <motion.div
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
      className="rounded-sm px-4 flex flex-col items-center justify-center gap-1"
      style={{
        backgroundColor: s.bg,
        aspectRatio: "4 / 1",
        color: s.text,
        ...style,
      }}
    >
      <span className="font-headline text-lg md:text-xl font-semibold tracking-wide uppercase text-center leading-tight">
        <span className="sr-only">{s.difficulty}: </span>
        {category.title}
      </span>
      <p className="font-body font-medium text-xs md:text-sm text-center leading-tight">
        {category.words.map((word, i) => (
          <span key={word}>
            <motion.span layoutId={`word-${category.tileIds[i]}`}>{word}</motion.span>
            {i < category.words.length - 1 && ", "}
          </span>
        ))}
      </p>
    </motion.div>
  );
};
