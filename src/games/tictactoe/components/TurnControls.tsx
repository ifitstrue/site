"use client";

import { IconContext, IconType } from "react-icons";
import { FiChevronLeft, FiChevronsLeft, FiSkipForward, FiUsers } from "react-icons/fi";
import { useGameStore } from "../store";

function IconButton({
  icon: Icon,
  label,
  tooltip,
  disabled,
  onClick,
}: {
  icon: IconType;
  label: string;
  tooltip: string;
  disabled?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      title={tooltip}
      {...(disabled && { disabled: true })}
      onClick={onClick}
      className="inline-flex flex-col items-center justify-center gap-1 rounded-full border border-transparent hover:border-tertiary-fixed-dim/50 bg-surface-container-lowest px-3 py-2 text-on-surface-variant hover:text-tertiary disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300 active:scale-95 shadow-sm"
    >
      <IconContext.Provider value={{ size: "1.25rem" }}>
        <Icon />
      </IconContext.Provider>
      <span className="font-label text-[10px] tracking-[0.2em] uppercase leading-none mt-1">
        {label}
      </span>
    </button>
  );
}

export default function TurnControls({ onEditPlayers }: { onEditPlayers: () => void }) {
  const moves = useGameStore((s) => s.moves);
  const gameWinner = useGameStore((s) => s.gameWinner);
  const eligibleBoards = useGameStore((s) => s.eligibleBoards);
  const undoMove = useGameStore((s) => s.undoMove);
  const resetGame = useGameStore((s) => s.resetGame);
  const skipTurn = useGameStore((s) => s.skipTurn);

  const isGameOver = gameWinner !== null || eligibleBoards.length === 0;
  const noMoves = moves.length === 0;

  return (
    <div className="flex gap-4">
      <IconButton
        icon={FiUsers}
        label="Players"
        tooltip="Edit players"
        onClick={onEditPlayers}
      />
      <div className="w-px h-10 bg-outline-variant/30 self-center mx-1" />
      <IconButton
        icon={FiChevronLeft}
        label="Undo"
        tooltip="Undo last move"
        disabled={noMoves}
        onClick={undoMove}
      />
      <IconButton
        icon={FiChevronsLeft}
        label="Reset"
        tooltip="Reset game"
        disabled={noMoves}
        onClick={resetGame}
      />
      <IconButton
        icon={FiSkipForward}
        label="Skip"
        tooltip="Skip current turn"
        disabled={isGameOver}
        onClick={skipTurn}
      />
    </div>
  );
}
