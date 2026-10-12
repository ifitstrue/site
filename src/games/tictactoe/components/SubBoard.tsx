"use client";

import { IconContext } from "react-icons";
import { useGameStore } from "../store";
import Cell from "./Cell";

export default function SubBoard({
  boardIndex,
  focusedCell,
  registerCell,
  onCellFocus,
  onCellKeyDown,
}: {
  boardIndex: number;
  focusedCell?: string;
  registerCell?: (key: string, element: HTMLButtonElement | null) => void;
  onCellFocus?: (key: string) => void;
  onCellKeyDown?: (event: React.KeyboardEvent<HTMLButtonElement>, boardIndex: number, cellIndex: number) => void;
}) {
  const board = useGameStore((s) => s.boards[boardIndex]);
  const players = useGameStore((s) => s.players);
  const eligibleBoards = useGameStore((s) => s.eligibleBoards);

  const isEligible = eligibleBoards.includes(boardIndex);
  const winner = board.winner !== null ? players[board.winner] : null;

  return (
    <div
      role="group"
      aria-label={`Board ${boardIndex + 1}${winner ? `, won by ${winner.name}` : isEligible ? ", available" : ", unavailable"}`}
      className={[
        "relative grid grid-cols-3 p-1 rounded-sm transition-all shadow-sm border",
        winner
          ? "bg-surface-container-lowest border-surface-variant/60 opacity-95"
          : isEligible
            ? "bg-primary-fixed/20 border-primary-fixed-dim/50 scale-[1.02] ring-1 ring-primary-fixed-dim/20"
            : "bg-surface-container/80 border-surface-variant/40 opacity-60",
      ].join(" ")}
    >
      {board.cells.map((_, cellIndex) => (
        <Cell
          key={cellIndex}
          boardIndex={boardIndex}
          cellIndex={cellIndex}
          isEligible={isEligible}
          tabIndex={focusedCell === `${boardIndex}-${cellIndex}` ? 0 : -1}
          cellRef={(element) => registerCell?.(`${boardIndex}-${cellIndex}`, element)}
          onFocus={() => onCellFocus?.(`${boardIndex}-${cellIndex}`)}
          onKeyDown={(event) => onCellKeyDown?.(event, boardIndex, cellIndex)}
        />
      ))}
      {winner && (
        <div
          className="absolute inset-0 flex items-center justify-center rounded-sm"
          style={{
            background: `${winner.color}15`,
            backdropFilter: "blur(1px)",
          }}
        >
          <IconContext.Provider value={{ color: winner.color, size: "4rem" }}>
          <winner.icon aria-hidden="true" />
          </IconContext.Provider>
        </div>
      )}
    </div>
  );
}
