"use client";

import { motion } from "framer-motion";
import type { RevealedCategory } from "../types";

const LEVEL_STYLES: Record<
  number,
  { bg: string; text: string; label: string }
> = {
  0: { bg: "#F9DF6D", text: "#1c1c19", label: "🟨" },
  1: { bg: "#A0C35A", text: "#1c1c19", label: "🟩" },
  2: { bg: "#B0C4EF", text: "#1c1c19", label: "🟦" },
  3: { bg: "#BA81C5", text: "#ffffff", label: "🟪" },
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
