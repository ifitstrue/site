"use client";

import { motion } from "framer-motion";

interface DieProps {
  value: number;
  showPips?: boolean;
  isWild?: boolean;
  animKey?: number;
}

const PIP_LAYOUTS: Record<number, [number, number][]> = {
  1: [[1, 1]],
  2: [[0, 0], [2, 2]],
  3: [[0, 0], [1, 1], [2, 2]],
  4: [[0, 0], [0, 2], [2, 0], [2, 2]],
  5: [[0, 0], [0, 2], [1, 1], [2, 0], [2, 2]],
  6: [[0, 0], [0, 2], [1, 0], [1, 2], [2, 0], [2, 2]],
};

export const Die = ({ value, showPips = false, isWild = false, animKey = 0 }: DieProps) => {
  const pips = PIP_LAYOUTS[value] ?? [];

  return (
    <motion.div
      key={animKey}
      initial={{ scale: 0.7, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 320, damping: 18 }}
      style={{
        width: "100%",
        aspectRatio: "1",
        borderRadius: "18%",
        backgroundColor: "#f5f0e8",
        boxShadow: "inset 0 1px 0 rgba(255,255,255,0.7), inset 0 -2px 0 rgba(0,0,0,0.12), 0 4px 12px rgba(0,0,0,0.2), 0 1px 3px rgba(0,0,0,0.12)",
        display: "grid",
        gridTemplateRows: "repeat(3, 1fr)",
        gridTemplateColumns: "repeat(3, 1fr)",
        padding: "12%",
        boxSizing: "border-box",
      }}
    >
      {showPips && pips.map(([row, col], i) => (
        <div
          key={i}
          style={{
            gridRow: row + 1,
            gridColumn: col + 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              width: "58%",
              aspectRatio: "1",
              borderRadius: "50%",
              backgroundColor: isWild ? "#c0392b" : "#2c2420",
              boxShadow: isWild
                ? "inset 0 1px 2px rgba(0,0,0,0.4), 0 1px 0 rgba(255,255,255,0.15)"
                : "inset 0 1px 2px rgba(0,0,0,0.5), 0 1px 0 rgba(255,255,255,0.1)",
            }}
          />
        </div>
      ))}
    </motion.div>
  );
};
