"use client";

import { motion } from "framer-motion";

interface LetterTileProps {
  letter: string;
  status?: "correct" | "present" | "absent";
  flipDelay?: number;
  isFlipped?: boolean;
}

const STATUS_STYLES: Record<string, { bg: string; border: string }> = {
  correct: { bg: "#6AAA64", border: "#6AAA64" },
  present: { bg: "#C9B458", border: "#C9B458" },
  absent: { bg: "#787C7E", border: "#787C7E" },
  empty: { bg: "transparent", border: "#D3D6DA" },
  typing: { bg: "transparent", border: "#878A8C" },
};

export const LetterTile = ({ letter, status, flipDelay = 0, isFlipped = false }: LetterTileProps) => {
  const frontStyle = letter ? STATUS_STYLES["typing"] : STATUS_STYLES["empty"];
  const backStyle = status ? STATUS_STYLES[status] : STATUS_STYLES["typing"];

  return (
    <div className="aspect-square" style={{ perspective: 1000 }}>
      <motion.div
        initial={isFlipped && flipDelay === 0 ? false : { rotateX: 0 }}
        animate={isFlipped ? { rotateX: 180 } : { rotateX: 0 }}
        transition={{ duration: 0.4, delay: flipDelay, ease: "easeInOut" }}
        style={{ transformStyle: "preserve-3d", width: "100%", height: "100%" }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backfaceVisibility: "hidden",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "transparent",
            border: `2px solid ${frontStyle.border}`,
            borderRadius: "4px",
            fontSize: "clamp(1.25rem, 4vw, 1.75rem)",
            fontWeight: 700,
            fontFamily: "var(--font-body), sans-serif",
            color: "var(--color-on-surface)",
          }}
        >
          {letter.toUpperCase()}
        </div>
        <div
          style={{
            position: "absolute",
            inset: 0,
            backfaceVisibility: "hidden",
            transform: "rotateX(180deg)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: backStyle.bg,
            border: `2px solid ${backStyle.border}`,
            borderRadius: "4px",
            fontSize: "clamp(1.25rem, 4vw, 1.75rem)",
            fontWeight: 700,
            fontFamily: "var(--font-body), sans-serif",
            color: "#fff",
          }}
        >
          {letter.toUpperCase()}
        </div>
      </motion.div>
    </div>
  );
};
