"use client";

import { IconContext } from "react-icons";
import { useGameStore } from "../store";

export default function Cell({
  boardIndex,
  cellIndex,
  isEligible,
}: {
  boardIndex: number;
  cellIndex: number;
  isEligible: boolean;
}) {
  const cell = useGameStore((s) => s.boards[boardIndex].cells[cellIndex]);
  const players = useGameStore((s) => s.players);
  const claimCell = useGameStore((s) => s.claimCell);

  const isDisabled = !isEligible || cell.claimedBy !== null;
  const player = cell.claimedBy !== null ? players[cell.claimedBy] : null;

  return (
    <div
      className={[
        "flex justify-center items-center aspect-square transition-colors",
        isEligible ? "bg-surface-container/40" : "bg-surface-dim/10",
        !isDisabled
          ? "cursor-pointer hover:bg-primary-fixed/40"
          : "",
      ].join(" ")}
      style={{
        margin: "1px",
      }}
      onClick={() => !isDisabled && claimCell(boardIndex, cellIndex)}
    >
      {player && (
        <IconContext.Provider value={{ color: player.color, size: "3rem" }}>
          <player.icon />
        </IconContext.Provider>
      )}
    </div>
  );
}
