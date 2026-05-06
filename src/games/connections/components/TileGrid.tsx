"use client";

import { useMemo } from "react";
import { AnimatePresence } from "framer-motion";
import { useConnectionsStore } from "../store";
import { Tile } from "./Tile";
import { CategoryRow } from "./CategoryRow";

interface TileGridProps {
  animatingIds: string[];
  animPhase: "idle" | "shaking" | "flying" | "morphing";
}

export const TileGrid = ({ animatingIds, animPhase }: TileGridProps) => {
  const tiles = useConnectionsStore((s) => s.tiles);
  const revealedCategories = useConnectionsStore((s) => s.revealedCategories);
  const selections = useConnectionsStore((s) => s.selections);
  const highlightedTileIds = useConnectionsStore((s) => s.highlightedTileIds);
  const toggleTile = useConnectionsStore((s) => s.toggleTile);
  const gameStatus = useConnectionsStore((s) => s.gameStatus);

  const shakingSet = new Set(animPhase === "shaking" ? animatingIds : []);
  const highlightedSet = new Set(highlightedTileIds);
  const canInteract = gameStatus === "playing" && animPhase === "idle";

  const tilesBySlot = useMemo(() => {
    const map = new Map<number, (typeof tiles)[number]>();
    tiles.forEach((t) => map.set(t.slotIndex, t));
    return map;
  }, [tiles]);

  const occupiedSlots = useMemo(() => {
    const set = new Set<number>();
    revealedCategories.forEach((cat) => {
      for (let i = 0; i < 4; i++) set.add(cat.rowIndex * 4 + i);
    });
    return set;
  }, [revealedCategories]);

  return (
    <div
      id="connections-grid"
      className="grid grid-cols-[repeat(4,minmax(70px,130px))] gap-2 mx-auto"
      style={{ maxWidth: "100%" }}
    >
      <AnimatePresence mode="popLayout">
        {revealedCategories.map((cat) => (
          <CategoryRow
            key={cat.level}
            category={cat}
            style={{ gridColumn: "1 / -1", gridRow: cat.rowIndex + 1 }}
          />
        ))}

        {Array.from({ length: 16 }, (_, slotIndex) => {
          if (occupiedSlots.has(slotIndex)) return null;

          const tile = tilesBySlot.get(slotIndex);
          if (!tile) return null;

          return (
            <Tile
              key={tile.id}
              tile={tile}
              isSelected={selections.includes(tile.id)}
              isShaking={shakingSet.has(tile.id)}
              isHighlighted={highlightedSet.has(tile.id)}
              onSelect={canInteract ? toggleTile : () => {}}
            />
          );
        })}
      </AnimatePresence>
    </div>
  );
};
