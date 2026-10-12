"use client";

import { IconContext } from "react-icons";
import { useGameStore } from "../store";

export default function Cell({
  boardIndex,
  cellIndex,
  isEligible,
  tabIndex = 0,
  cellRef,
  onFocus,
  onKeyDown,
}: {
  boardIndex: number;
  cellIndex: number;
  isEligible: boolean;
  tabIndex?: number;
  cellRef?: (element: HTMLButtonElement | null) => void;
  onFocus?: () => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLButtonElement>) => void;
}) {
  const cell = useGameStore((s) => s.boards[boardIndex].cells[cellIndex]);
  const players = useGameStore((s) => s.players);
  const claimCell = useGameStore((s) => s.claimCell);

  const isDisabled = !isEligible || cell.claimedBy !== null;
  const player = cell.claimedBy !== null ? players[cell.claimedBy] : null;

  return (
    <button
      type="button"
      ref={cellRef}
      tabIndex={isDisabled ? -1 : tabIndex}
      disabled={isDisabled}
      aria-label={`Board ${boardIndex + 1}, square ${cellIndex + 1}: ${player ? `claimed by ${player.name}` : "empty"}`}
      className={[
        "flex justify-center items-center aspect-square transition-colors",
        isEligible ? "bg-surface-container/40" : "bg-surface-dim/10",
        !isDisabled ? "cursor-pointer hover:bg-primary-fixed/40" : "",
        "focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-primary disabled:cursor-not-allowed",
      ].join(" ")}
      style={{
        margin: "1px",
      }}
      onClick={() => claimCell(boardIndex, cellIndex)}
      onFocus={onFocus}
      onKeyDown={onKeyDown}
    >
      {player && (
        <IconContext.Provider value={{ color: player.color, size: "3rem" }}>
          <player.icon aria-hidden="true" />
        </IconContext.Provider>
      )}
    </button>
  );
}
