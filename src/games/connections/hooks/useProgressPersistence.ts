import { useEffect } from "react";
import type { MutableRefObject } from "react";
import { useConnectionsStore } from "../store";

const STORAGE_KEY = "connections_progress";

interface GameSnapshot {
  revealedCategories: { title: string; level: number; tileIds: string[]; words: string[]; rowIndex: number }[];
  mistakes: number;
  gameStatus: "playing" | "won" | "lost";
  tilePositions: Record<string, number>;
  selections: string[];
  hintCategory: number | null;
  hintStep: number;
  previousGuesses: string[][];
}

const saveProgress = (date: string): void => {
  const state = useConnectionsStore.getState();
  if (!state.puzzle) return;

  const snapshot: GameSnapshot = {
    revealedCategories: state.revealedCategories,
    mistakes: state.mistakes,
    gameStatus: state.gameStatus,
    tilePositions: Object.fromEntries(state.tiles.map((t) => [t.id, t.slotIndex])),
    selections: state.selections,
    hintCategory: state.hintCategory,
    hintStep: state.hintStep,
    previousGuesses: state.previousGuesses,
  };

  const raw = localStorage.getItem(STORAGE_KEY);
  const all: Record<string, GameSnapshot> = raw ? JSON.parse(raw) : {};
  all[date] = snapshot;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
};

export const restoreProgress = (date: string): void => {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return;

  const all: Record<string, GameSnapshot> = JSON.parse(raw);
  const snapshot = all[date];
  if (!snapshot) return;

  const store = useConnectionsStore.getState();
  const revealedIds = new Set(snapshot.revealedCategories.flatMap((rc) => rc.tileIds));
  const remainingTiles = store.tiles
    .filter((t) => !revealedIds.has(t.id))
    .map((t) => ({
      ...t,
      slotIndex: snapshot.tilePositions[t.id] ?? t.slotIndex,
    }));

  const restoredCategories = snapshot.revealedCategories.map((rc, i) => ({
    ...rc,
    rowIndex: rc.rowIndex ?? i,
  }));

  const occupiedSlots = new Set<number>();
  restoredCategories.forEach((cat) => {
    for (let s = 0; s < 4; s++) occupiedSlots.add(cat.rowIndex * 4 + s);
  });

  const usedSlots = new Set(remainingTiles.map((t) => t.slotIndex));
  const fixedTiles = remainingTiles.map((t) => {
    if (!occupiedSlots.has(t.slotIndex)) return t;
    const freeSlot = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].find(
      (s) => !occupiedSlots.has(s) && !usedSlots.has(s)
    );
    if (freeSlot !== undefined) usedSlots.add(freeSlot);
    return freeSlot !== undefined ? { ...t, slotIndex: freeSlot } : t;
  });

  useConnectionsStore.setState({
    revealedCategories: restoredCategories,
    mistakes: snapshot.mistakes,
    gameStatus: snapshot.gameStatus,
    tiles: fixedTiles,
    selections: snapshot.selections,
    hintCategory: snapshot.hintCategory,
    hintStep: snapshot.hintStep,
    previousGuesses: snapshot.previousGuesses ?? [],
  });
};

export const useProgressPersistence = (date: string, skipRef: MutableRefObject<boolean>) => {
  useEffect(() => {
    const unsub = useConnectionsStore.subscribe((state, prevState) => {
      if (skipRef.current) return;
      if (
        state.revealedCategories !== prevState.revealedCategories ||
        state.mistakes !== prevState.mistakes ||
        state.gameStatus !== prevState.gameStatus ||
        state.selections !== prevState.selections
      ) {
        saveProgress(date);
      }
    });
    return unsub;
  }, [date, skipRef]);
};
