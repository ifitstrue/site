import { create } from "zustand";
import type { ConnectionsPuzzle, ConnectionsStore, TileState, RevealedCategory } from "./types";

const shuffleArray = <T>(arr: T[]): T[] => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

const buildTiles = (puzzle: ConnectionsPuzzle): TileState[] => {
  const tiles: TileState[] = [];
  puzzle.categories.forEach((cat, catIdx) => {
    const level = cat.level ?? catIdx;
    cat.cards.forEach((card, cardIdx) => {
      tiles.push({
        id: `${level}-${cardIdx}`,
        word: card.content,
        slotIndex: tiles.length,
        level,
      });
    });
  });
  return shuffleArray(tiles).map((t, i) => ({ ...t, slotIndex: i }));
};

const getEasiestRemainingLevel = (
  revealed: RevealedCategory[],
  puzzle: ConnectionsPuzzle
): number | null => {
  const revealedLevels = new Set(revealed.map((r) => r.level));
  const sorted = puzzle.categories
    .map((cat, i) => ({ level: cat.level ?? i }))
    .sort((a, b) => a.level - b.level);
  for (const { level } of sorted) {
    if (!revealedLevels.has(level)) return level;
  }
  return null;
};

export const isCorrectGuess = (
  selections: string[],
  tiles: TileState[],
  revealedCategories: RevealedCategory[]
): boolean => {
  if (selections.length !== 4) return false;
  const selectedLevels = new Set(
    selections.map((id) => tiles.find((t) => t.id === id)!.level)
  );
  if (selectedLevels.size !== 1) return false;
  const guessedLevel = [...selectedLevels][0];
  const revealedLevels = new Set(revealedCategories.map((r) => r.level));
  return !revealedLevels.has(guessedLevel);
}

export const useConnectionsStore = create<ConnectionsStore>((set, get) => ({
  puzzle: null,
  tiles: [],
  selections: [],
  revealedCategories: [],
  mistakes: 0,
  gameStatus: "playing",
  hintCategory: null,
  hintStep: 0,
  previousGuesses: [],
  highlightedTileIds: [],

  initPuzzle: (puzzle) => {
    set({
      puzzle,
      tiles: buildTiles(puzzle),
      selections: [],
      revealedCategories: [],
      mistakes: 0,
      gameStatus: "playing",
      hintCategory: null,
      hintStep: 0,
      previousGuesses: [],
    });
  },

  toggleTile: (id) => {
    const { selections, gameStatus, hintCategory, tiles } = get();
    if (gameStatus !== "playing") return;

    const tile = tiles.find((t) => t.id === id);

    if (hintCategory !== null && tile && tile.level !== hintCategory) {
      set({ hintCategory: null, hintStep: 0 });
    }

    if (selections.includes(id)) {
      const newSelections = selections.filter((s) => s !== id);
      if (hintCategory !== null && tile && tile.level === hintCategory) {
        const remainingHinted = newSelections.filter((sid) => {
          const t = tiles.find((tt) => tt.id === sid);
          return t && t.level === hintCategory;
        }).length;
        set({ selections: newSelections, hintStep: remainingHinted });
      } else {
        set({ selections: newSelections });
      }
    } else if (selections.length < 4) {
      set({ selections: [...selections, id] });
    }
  },

  clearSelections: () => {
    set({ selections: [] });
  },

  submitGuess: () => {
    const { selections, tiles, puzzle, revealedCategories, mistakes, gameStatus } = get();
    if (selections.length !== 4) return;
    if (gameStatus !== "playing") return;

    if (!isCorrectGuess(selections, tiles, revealedCategories)) {
      const words = selections
        .map((id) => tiles.find((t) => t.id === id)!.word)
        .sort();
      const alreadyStored = get().previousGuesses.some(
        (g) => g.length === words.length && g.every((w, i) => w === words[i])
      );
      set({
        mistakes: mistakes + 1,
        selections: [],
        previousGuesses: alreadyStored
          ? get().previousGuesses
          : [...get().previousGuesses, words],
      });
      if (mistakes + 1 >= 4) set({ gameStatus: "lost" });
      return;
    }

    const selectedLevels = new Set(
      selections.map((id) => tiles.find((t) => t.id === id)!.level)
    );
    const guessedLevel = [...selectedLevels][0];
    const matchedCategory = puzzle?.categories.find((c, i) => (c.level ?? i) === guessedLevel);
    if (!matchedCategory) return;

    const rowIndex = revealedCategories.length;
    const targetSlots = [rowIndex * 4, rowIndex * 4 + 1, rowIndex * 4 + 2, rowIndex * 4 + 3];

    const selectedSlots = selections.map(
      (id) => tiles.find((t) => t.id === id)!.slotIndex
    );

    const displacedTiles = targetSlots
      .map((slot) => tiles.find((t) => t.slotIndex === slot))
      .filter((t): t is TileState => !!t && !selections.includes(t.id));

    const vacantSlots = selectedSlots.filter((s) => !targetSlots.includes(s));

    const newTiles = tiles.map((t) => {
      if (selections.includes(t.id)) {
        return { ...t, slotIndex: targetSlots[selections.indexOf(t.id)] };
      }
      const dispIdx = displacedTiles.findIndex((dt) => dt.id === t.id);
      if (dispIdx !== -1) {
        return { ...t, slotIndex: vacantSlots[dispIdx] };
      }
      return t;
    });

    const rc: RevealedCategory = {
      title: matchedCategory.title,
      level: matchedCategory.level ?? guessedLevel,
      tileIds: [...selections],
      words: selections.map((id) => tiles.find((t) => t.id === id)!.word),
      rowIndex,
    };

    set({
      tiles: newTiles,
      selections: [],
      revealedCategories: [...revealedCategories, rc],
      hintCategory: null,
      hintStep: 0,
    });
  },

  finalizeAnimation: () => {
    const { tiles, revealedCategories } = get();
    if (revealedCategories.length === 0) return;
    const lastCategory = revealedCategories[revealedCategories.length - 1];
    const won = revealedCategories.length === 4;
    set({
      tiles: tiles.filter((t) => !lastCategory.tileIds.includes(t.id)),
      gameStatus: won ? "won" : "playing",
    });
  },

  swapTiles: (fromIndex, toIndex) => {
    const { tiles } = get();
    const newTiles = tiles.map((t) => {
      if (t.slotIndex === fromIndex) return { ...t, slotIndex: toIndex };
      if (t.slotIndex === toIndex) return { ...t, slotIndex: fromIndex };
      return t;
    });
    set({ tiles: newTiles });
  },

  useHint: () => {
    const { puzzle, revealedCategories, tiles, selections, gameStatus } = get();
    if (gameStatus !== "playing") return;
    if (!puzzle) return;

    let targetLevel: number | null = null;

    if (selections.length === 0) {
      targetLevel = getEasiestRemainingLevel(revealedCategories, puzzle);
    } else {
      const selectedLevels = new Set(
        selections.map((id) => tiles.find((t) => t.id === id)!.level)
      );
      if (selectedLevels.size === 1) {
        targetLevel = [...selectedLevels][0];
        const revealedLevels = new Set(revealedCategories.map((r) => r.level));
        if (revealedLevels.has(targetLevel)) targetLevel = null;
      }
    }

    if (targetLevel === null) return;

    const catTiles = tiles
      .filter((t) => t.level === targetLevel)
      .sort((a, b) => a.slotIndex - b.slotIndex);

    const alreadySelected = selections.filter((id) => {
      const tile = tiles.find((t) => t.id === id);
      return tile && tile.level === targetLevel;
    });

    const alreadySelectedSet = new Set(alreadySelected);
    const nextHintTile = catTiles.find((t) => !alreadySelectedSet.has(t.id));
    if (!nextHintTile) return;

    const hintSelections = [...alreadySelected, nextHintTile.id];

    set({
      hintCategory: targetLevel,
      hintStep: hintSelections.length,
      selections: hintSelections,
    });
  },

  shuffleTiles: () => {
    const { tiles, revealedCategories, gameStatus } = get();
    if (gameStatus !== "playing") return;

    const occupiedSlots = new Set<number>();
    revealedCategories.forEach((cat) => {
      for (let i = 0; i < 4; i++) occupiedSlots.add(cat.rowIndex * 4 + i);
    });
    const freeSlots = Array.from({ length: 16 }, (_, i) => i).filter(
      (s) => !occupiedSlots.has(s)
    );
    const shuffled = shuffleArray(freeSlots);

    const newTiles = tiles.map((t, i) => ({ ...t, slotIndex: shuffled[i] }));
    set({ tiles: newTiles });
  },

  resetGame: () => {
    set({
      puzzle: null,
      tiles: [],
      selections: [],
      revealedCategories: [],
      mistakes: 0,
      gameStatus: "playing",
      hintCategory: null,
      hintStep: 0,
      previousGuesses: [],
      highlightedTileIds: [],
    });
  },

  setHighlightedTileIds: (ids) => set({ highlightedTileIds: ids }),

  selectTilesByWords: (words) => {
    const { tiles, revealedCategories, gameStatus } = get();
    if (gameStatus !== "playing") return;
    const revealedTileIds = new Set(revealedCategories.flatMap((rc) => rc.tileIds));
    const wordSet = new Set(words);
    const ids = tiles
      .filter((t) => wordSet.has(t.word) && !revealedTileIds.has(t.id))
      .map((t) => t.id);
    set({ selections: ids });
  },
}));
