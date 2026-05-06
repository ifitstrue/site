"use client";

import { IconContext } from "react-icons";
import { useGameStore } from "../store";

export default function StatusMessage() {
  const gameWinner = useGameStore((s) => s.gameWinner);
  const currentPlayerId = useGameStore((s) => s.currentPlayerId);
  const eligibleBoards = useGameStore((s) => s.eligibleBoards);
  const players = useGameStore((s) => s.players);

  const isGameTied = gameWinner === null && eligibleBoards.length === 0;
  const displayPlayer =
    gameWinner !== null ? players[gameWinner] : players[currentPlayerId];

  const message = gameWinner !== null
    ? `${displayPlayer.name} won!`
    : isGameTied
    ? "It's a tie!"
    : `${displayPlayer.name}'s turn`;

  return (
    <div className="flex items-center gap-4">
      <div className="w-0.5 h-8 bg-tertiary-fixed-dim rounded-full" />
      {!isGameTied && (
        <IconContext.Provider value={{ color: displayPlayer.color, size: "1.25rem" }}>
          <displayPlayer.icon />
        </IconContext.Provider>
      )}
      <span className="font-headline italic text-xl text-on-surface">{message}</span>
    </div>
  );
}
