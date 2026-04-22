"use client";

import { useGameStore } from "../store";
import PlayerEditor from "./PlayerEditor";

export default function PlayersEditor() {
  const players = useGameStore((s) => s.players);

  return (
    <div className="flex flex-col gap-6">
      {players.map((p, i) => (
        <PlayerEditor key={p.id} playerId={p.id} index={i} />
      ))}
    </div>
  );
}
