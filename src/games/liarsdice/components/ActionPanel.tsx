"use client";

type Phase = "rolled" | "unrolled";

interface ActionPanelProps {
  phase: Phase;
  canRoll: boolean;
  onRoll: () => void;
  onNextRound: () => void;
  onBluffFailed: () => void;
  onChallengeFailed: () => void;
}

const topBtn = "flex items-center justify-center px-4 py-4 bg-surface-container border border-outline-variant/30 rounded font-label text-sm tracking-widest uppercase transition-colors hover:bg-surface-container-high";
const bottomBtn = "flex items-center justify-center px-3 py-3 bg-surface-container-high border border-outline-variant/30 rounded font-label text-xs tracking-wide uppercase transition-colors hover:bg-surface-container-highest text-center leading-tight";

export const ActionPanel = ({ phase, canRoll, onRoll, onNextRound, onBluffFailed, onChallengeFailed }: ActionPanelProps) => (
  <div className="flex flex-col gap-2">
    <div className="grid grid-cols-2 gap-2">
      <button type="button" onClick={onRoll} disabled={!canRoll}
        className={`${topBtn} text-on-surface disabled:opacity-30 disabled:cursor-not-allowed`}>
        Roll
      </button>
      <button type="button" onClick={onNextRound} disabled={phase !== "rolled"}
        className={`${topBtn} text-on-surface disabled:opacity-30 disabled:cursor-not-allowed`}>
        Next Round
      </button>
    </div>

    <div className="grid grid-cols-2 gap-2">
      <button type="button" onClick={onBluffFailed}
        className={`${bottomBtn} text-tertiary`}>
        Bluff Unsuccessful
      </button>
      <button type="button" onClick={onChallengeFailed}
        className={`${bottomBtn} text-tertiary`}>
        Challenge Unsuccessful
      </button>
    </div>
  </div>
);
