"use client";

import { DiceGrid } from "./DiceGrid";

interface CupAreaProps {
  values: number[];
  cupLifted: boolean;
  rollCount: number;
  onToggle: (() => void) | undefined;
  onRoll: (() => void) | undefined;
}

export const CupArea = ({ values, cupLifted, rollCount, onToggle, onRoll }: CupAreaProps) => {
  const hasDice = values.length > 0;
  const handler = hasDice ? onToggle : onRoll;
  const isInteractive = handler !== undefined;

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label={hasDice ? (cupLifted ? "Lower cup" : "Lift cup") : "Roll dice"}
      onClick={handler}
      onKeyDown={isInteractive ? (e) => (e.key === "Enter" || e.key === " ") && handler?.() : undefined}
      className={`w-full rounded-lg border border-outline-variant/40 overflow-hidden relative flex items-center justify-center ${isInteractive ? "cursor-pointer active:scale-[0.99] transition-transform" : ""}`}
      style={{
        aspectRatio: "1",
        backgroundColor: "var(--color-surface-container-low)",
        boxShadow: "0 2px 8px rgba(28,28,25,0.08)",
      }}
    >
      {hasDice ? (
        <div className="w-full h-full flex items-center justify-center p-6">
          <DiceGrid values={values} showPips={cupLifted} rollCount={rollCount} />
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center gap-3 opacity-40">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="2" width="20" height="20" rx="4" />
            <circle cx="8.5" cy="8.5" r="1.2" fill="currentColor" stroke="none" />
            <circle cx="15.5" cy="8.5" r="1.2" fill="currentColor" stroke="none" />
            <circle cx="8.5" cy="15.5" r="1.2" fill="currentColor" stroke="none" />
            <circle cx="15.5" cy="15.5" r="1.2" fill="currentColor" stroke="none" />
            <circle cx="12" cy="12" r="1.2" fill="currentColor" stroke="none" />
          </svg>
          <p className="font-headline italic text-lg">Ready to Roll</p>
        </div>
      )}
    </div>
  );
};
