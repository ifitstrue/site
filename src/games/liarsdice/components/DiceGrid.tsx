"use client";

import { Die } from "./Die";

interface DiceGridProps {
  values: number[];
  showPips: boolean;
  rollCount: number;
}

export const DiceGrid = ({ values, showPips, rollCount }: DiceGridProps) => {
  if (values.length === 0) return null;

  const cols = values.length <= 3 ? values.length : values.length <= 6 ? 3 : 4;

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${cols}, 1fr)`,
        gap: "clamp(10px, 3vw, 18px)",
        width: "100%",
      }}
    >
      {values.map((v, i) => (
        <Die
          key={i}
          value={v}
          showPips={showPips}
          isWild={v === 1}
          animKey={rollCount}
        />
      ))}
    </div>
  );
};
