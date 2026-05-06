"use client";

interface SetupScreenProps {
  startingCount: number;
  onCountChange: (n: number) => void;
  onRoll: () => void;
}

export const SetupScreen = ({ startingCount, onCountChange, onRoll }: SetupScreenProps) => {
  return (
    <div className="flex flex-col gap-6 py-4">
      <div
        className="w-full rounded-lg border border-outline-variant/40 flex flex-col items-center justify-center gap-6 py-12"
        style={{ backgroundColor: "var(--color-surface-container-low)", boxShadow: "0 2px 8px rgba(28,28,25,0.08)" }}
      >
        <p className="font-label text-xs tracking-widest uppercase text-on-surface-variant">
          Starting dice
        </p>
        <div className="flex items-center gap-6">
          <button
            type="button"
            onClick={() => onCountChange(Math.max(1, startingCount - 1))}
            className="w-11 h-11 rounded-full bg-surface-container text-on-surface font-body text-2xl hover:bg-surface-container-high transition-colors flex items-center justify-center"
          >
            −
          </button>
          <span className="font-headline italic text-6xl text-on-surface w-14 text-center tabular-nums">
            {startingCount}
          </span>
          <button
            type="button"
            onClick={() => onCountChange(Math.min(10, startingCount + 1))}
            className="w-11 h-11 rounded-full bg-surface-container text-on-surface font-body text-2xl hover:bg-surface-container-high transition-colors flex items-center justify-center"
          >
            +
          </button>
        </div>
      </div>

      <button
        type="button"
        onClick={onRoll}
        className="w-full py-3.5 rounded bg-primary text-on-primary font-label tracking-widest uppercase hover:bg-primary-fixed-dim transition-colors duration-200"
      >
        Roll
      </button>
    </div>
  );
};
