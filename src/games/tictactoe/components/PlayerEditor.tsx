"use client";

import { useGameStore } from "../store";
import { Player } from "../types";
import IconPicker from "./IconPicker";
import { AVAILABLE_PLAYER_COLORS } from "../constants";

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
  const nameId = `player-${playerId}-name`;
  const colorId = `player-${playerId}-color`;
  const iconId = `player-${playerId}-icon`;

  return (
    <div className="group flex items-center gap-6 py-6 border-b border-outline-variant/30 last:border-b-0">
      <span className="font-headline text-5xl italic leading-none text-tertiary-fixed-dim/20 group-hover:text-tertiary-fixed-dim/40 transition-colors duration-500 select-none w-14 shrink-0 pt-1 text-right">
        {displayIndex}
      </span>

      <div className="flex-1 flex flex-col gap-1 min-w-0">
        <label htmlFor={nameId} className="font-label text-xs tracking-[0.15em] uppercase text-on-surface-variant group-hover:text-tertiary transition-colors">
          Player Name
        </label>
        <input
          id={nameId}
          value={player.name}
          onChange={(e) => update({ name: e.target.value })}
          className="bg-transparent text-on-surface font-headline italic text-2xl border-none focus:ring-0 p-0 w-full transition-colors group-hover:text-tertiary focus:text-tertiary placeholder:opacity-20"
          placeholder="Enter name..."
        />
      </div>

      <div className="flex items-center gap-4 shrink-0">
        <div className="flex flex-col gap-2 items-center">
          <label htmlFor={colorId} className="font-label text-xs tracking-[0.15em] uppercase text-on-surface-variant">
            Color
          </label>
          <div className="flex items-center gap-2">
            <span className="h-5 w-5 rounded-full border border-outline" style={{ backgroundColor: player.color }} aria-hidden="true" />
            <select
              id={colorId}
              value={player.color}
              onChange={(e) => update({ color: e.target.value })}
              className="rounded-full border border-outline bg-surface-container-lowest px-3 py-2 font-label text-xs uppercase tracking-wide text-on-surface"
            >
              {AVAILABLE_PLAYER_COLORS.map((color) => (
                <option key={color.value} value={color.value}>{color.name}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex flex-col gap-2 items-center">
          <label htmlFor={iconId} className="font-label text-xs tracking-[0.15em] uppercase text-on-surface-variant">
            Icon
          </label>
          <div className="group/icon">
            <IconPicker id={iconId} value={player.icon} onChange={(icon) => update({ icon })} />
          </div>
        </div>
      </div>
    </div>
  );
}
