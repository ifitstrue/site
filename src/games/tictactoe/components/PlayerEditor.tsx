"use client";

import { IconContext } from "react-icons";
import { useGameStore } from "../store";
import { Player } from "../types";
import IconPicker from "./IconPicker";

export default function PlayerEditor({ 
  playerId, 
  index 
}: { 
  playerId: number;
  index: number;
}) {
  const player = useGameStore((s) => s.players[playerId]);
  const updatePlayer = useGameStore((s) => s.updatePlayer);

  const update = (patch: Partial<Player>) =>
    updatePlayer({ ...player, ...patch });

  const displayIndex = String(index + 1).padStart(2, "0");

  return (
    <div className="group flex items-center gap-6 py-6 border-b border-outline-variant/30 last:border-b-0">
      <span className="font-headline text-5xl italic leading-none text-tertiary-fixed-dim/20 group-hover:text-tertiary-fixed-dim/40 transition-colors duration-500 select-none w-14 shrink-0 pt-1 text-right">
        {displayIndex}
      </span>

      <div className="flex-1 flex flex-col gap-1 min-w-0">
        <label className="font-label text-[10px] tracking-[0.2em] uppercase text-on-surface/40 group-hover:text-tertiary/60 transition-colors">
          Player Name
        </label>
        <input
          value={player.name}
          onChange={(e) => update({ name: e.target.value })}
          className="bg-transparent text-on-surface font-headline italic text-2xl border-none focus:ring-0 p-0 w-full transition-colors group-hover:text-tertiary focus:text-tertiary placeholder:opacity-20"
          placeholder="Enter name..."
        />
      </div>

      <div className="flex items-center gap-4 shrink-0">
        <div className="flex flex-col gap-2 items-center">
          <label className="font-label text-[10px] tracking-[0.2em] uppercase text-on-surface/40">
            Color
          </label>
          <div className="relative w-8 h-8 rounded-full overflow-hidden border border-outline-variant/30 group-hover:border-tertiary-fixed-dim/50 transition-colors">
            <input
              type="color"
              value={player.color}
              onChange={(e) => update({ color: e.target.value })}
              className="absolute inset-[-50%] w-[200%] h-[200%] cursor-pointer p-0 border-none"
              title="Player color"
            />
          </div>
        </div>

        <div className="flex flex-col gap-2 items-center">
          <label className="font-label text-[10px] tracking-[0.2em] uppercase text-on-surface/40">
            Icon
          </label>
          <div className="group/icon">
            <IconPicker value={player.icon} onChange={(icon) => update({ icon })} />
          </div>
        </div>
      </div>
    </div>
  );
}
