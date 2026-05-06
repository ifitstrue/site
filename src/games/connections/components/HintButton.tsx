"use client";

import { useConnectionsStore } from "../store";

export const HintButton = () => {
  const gameStatus = useConnectionsStore((s) => s.gameStatus);
  const hintStep = useConnectionsStore((s) => s.hintStep);
  const useHint = useConnectionsStore((s) => s.useHint);

  const disabled = gameStatus !== "playing" || hintStep >= 4;

  return (
    <button
      type="button"
      onClick={useHint}
      disabled={disabled}
      className={`font-label text-sm tracking-widest uppercase px-5 py-2.5 rounded-sm transition-colors duration-200 ${
        disabled
          ? "text-on-surface-variant/30 cursor-not-allowed"
          : "text-on-surface-variant hover:text-primary hover:bg-surface-container"
      }`}
    >
      Hint
    </button>
  );
};
