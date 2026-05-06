import { useConnectionsStore, isCorrectGuess } from "./store";
import type { ConnectionsPuzzle, TileState, RevealedCategory } from "./types";

function makePuzzle(): ConnectionsPuzzle {
  return {
    categories: [
      { title: "Easy Yellow", level: 0, cards: [{ content: "A1", position: 0 }, { content: "A2", position: 1 }, { content: "A3", position: 2 }, { content: "A4", position: 3 }] },
      { title: "Medium Green", level: 1, cards: [{ content: "B1", position: 0 }, { content: "B2", position: 1 }, { content: "B3", position: 2 }, { content: "B4", position: 3 }] },
      { title: "Hard Blue", level: 2, cards: [{ content: "C1", position: 0 }, { content: "C2", position: 1 }, { content: "C3", position: 2 }, { content: "C4", position: 3 }] },
      { title: "Tough Purple", level: 3, cards: [{ content: "D1", position: 0 }, { content: "D2", position: 1 }, { content: "D3", position: 2 }, { content: "D4", position: 3 }] },
    ],
  };
}

beforeEach(() => {
  useConnectionsStore.setState({
    puzzle: null,
    tiles: [],
    selections: [],
    revealedCategories: [],
    mistakes: 0,
    gameStatus: "playing",
    hintCategory: null,
    hintStep: 0,
    previousGuesses: [],
  });
});

describe("ConnectionsStore", () => {
  it("initPuzzle creates 16 tiles with correct levels", () => {
    useConnectionsStore.getState().initPuzzle(makePuzzle());
    const { tiles } = useConnectionsStore.getState();
    expect(tiles).toHaveLength(16);
    const level0 = tiles.filter((t) => t.level === 0);
    expect(level0).toHaveLength(4);
    expect(level0.map((t) => t.word).sort()).toEqual(["A1", "A2", "A3", "A4"]);
  });

  it("toggleTile selects and deselects a tile", () => {
    useConnectionsStore.getState().initPuzzle(makePuzzle());
    const tileId = useConnectionsStore.getState().tiles[0].id;

    useConnectionsStore.getState().toggleTile(tileId);
    expect(useConnectionsStore.getState().selections).toEqual([tileId]);

    useConnectionsStore.getState().toggleTile(tileId);
    expect(useConnectionsStore.getState().selections).toEqual([]);
  });

  it("toggleTile enforces max 4 selections", () => {
    useConnectionsStore.getState().initPuzzle(makePuzzle());
    const ids = useConnectionsStore.getState().tiles.slice(0, 5).map((t) => t.id);

    ids.slice(0, 4).forEach((id) => useConnectionsStore.getState().toggleTile(id));
    expect(useConnectionsStore.getState().selections).toHaveLength(4);

    useConnectionsStore.getState().toggleTile(ids[4]);
    expect(useConnectionsStore.getState().selections).toHaveLength(4);
  });

  it("clearSelections empties selections", () => {
    useConnectionsStore.getState().initPuzzle(makePuzzle());
    useConnectionsStore.getState().toggleTile(useConnectionsStore.getState().tiles[0].id);
    useConnectionsStore.getState().clearSelections();
    expect(useConnectionsStore.getState().selections).toEqual([]);
  });

  it("submitGuess swaps correct tiles to row 0 slots", () => {
    useConnectionsStore.getState().initPuzzle(makePuzzle());
    const { tiles } = useConnectionsStore.getState();
    const cat0 = tiles.filter((t) => t.level === 0);
    cat0.forEach((t) => useConnectionsStore.getState().toggleTile(t.id));

    useConnectionsStore.getState().submitGuess();

    const state = useConnectionsStore.getState();
    expect(state.revealedCategories).toHaveLength(1);
    expect(state.revealedCategories[0].title).toBe("Easy Yellow");
    expect(state.revealedCategories[0].rowIndex).toBe(0);
    expect(state.mistakes).toBe(0);
    expect(state.selections).toEqual([]);

    const swapped = cat0.map((t) => state.tiles.find((tt) => tt.id === t.id)!);
    swapped.forEach((t, i) => {
      expect(t.slotIndex).toBe(i);
    });
  });

  it("finalizeAnimation removes correct tiles and updates gameStatus", () => {
    useConnectionsStore.getState().initPuzzle(makePuzzle());
    const { tiles } = useConnectionsStore.getState();
    tiles.filter((t) => t.level === 0).forEach((t) => useConnectionsStore.getState().toggleTile(t.id));
    useConnectionsStore.getState().submitGuess();

    useConnectionsStore.getState().finalizeAnimation();

    const state = useConnectionsStore.getState();
    expect(state.revealedCategories).toHaveLength(1);
    expect(state.tiles.find((t) => t.level === 0)).toBeUndefined();
    expect(state.tiles).toHaveLength(12);
  });

  it("finalizeAnimation sets won when 4 categories revealed", () => {
    useConnectionsStore.getState().initPuzzle(makePuzzle());

    for (let level = 0; level < 4; level++) {
      const { tiles } = useConnectionsStore.getState();
      tiles.filter((t) => t.level === level).forEach((t) => useConnectionsStore.getState().toggleTile(t.id));
      useConnectionsStore.getState().submitGuess();
      useConnectionsStore.getState().finalizeAnimation();
    }

    expect(useConnectionsStore.getState().gameStatus).toBe("won");
  });

  it("submitGuess increments mistakes on wrong guess", () => {
    useConnectionsStore.getState().initPuzzle(makePuzzle());
    const { tiles } = useConnectionsStore.getState();
    [tiles[0], tiles[1], tiles[2], tiles[4]].forEach((t) => useConnectionsStore.getState().toggleTile(t.id));

    useConnectionsStore.getState().submitGuess();

    expect(useConnectionsStore.getState().mistakes).toBe(1);
    expect(useConnectionsStore.getState().selections).toEqual([]);
    expect(useConnectionsStore.getState().revealedCategories).toHaveLength(0);
  });

  it("submitGuess transitions to lost after 4 mistakes", () => {
    useConnectionsStore.getState().initPuzzle(makePuzzle());
    const { tiles } = useConnectionsStore.getState();
    const wrongCombos = [
      [tiles[0], tiles[1], tiles[2], tiles[4]],
      [tiles[0], tiles[1], tiles[2], tiles[5]],
      [tiles[0], tiles[1], tiles[2], tiles[6]],
      [tiles[0], tiles[1], tiles[2], tiles[7]],
    ];
    wrongCombos.forEach((combo) => {
      combo.forEach((t) => useConnectionsStore.getState().toggleTile(t.id));
      useConnectionsStore.getState().submitGuess();
    });
    expect(useConnectionsStore.getState().gameStatus).toBe("lost");
    expect(useConnectionsStore.getState().mistakes).toBe(4);
  });

  it("submitGuess is no-op when fewer than 4 tiles selected", () => {
    useConnectionsStore.getState().initPuzzle(makePuzzle());
    useConnectionsStore.getState().toggleTile(useConnectionsStore.getState().tiles[0].id);
    useConnectionsStore.getState().submitGuess();
    expect(useConnectionsStore.getState().mistakes).toBe(0);
  });

  it("swapTiles exchanges slotIndex between two tiles", () => {
    useConnectionsStore.getState().initPuzzle(makePuzzle());
    const tileA = useConnectionsStore.getState().tiles.find((t) => t.slotIndex === 0)!;
    const tileB = useConnectionsStore.getState().tiles.find((t) => t.slotIndex === 1)!;

    useConnectionsStore.getState().swapTiles(0, 1);

    const newA = useConnectionsStore.getState().tiles.find((t) => t.id === tileA.id)!;
    const newB = useConnectionsStore.getState().tiles.find((t) => t.id === tileB.id)!;
    expect(newA.slotIndex).toBe(1);
    expect(newB.slotIndex).toBe(0);
  });

  it("shuffleTiles randomizes tile positions", () => {
    useConnectionsStore.getState().initPuzzle(makePuzzle());
    const before = useConnectionsStore.getState().tiles.map((t) => t.slotIndex);

    useConnectionsStore.getState().shuffleTiles();

    const after = useConnectionsStore.getState().tiles.map((t) => t.slotIndex);
    expect(before.sort()).toEqual(after.sort());
  });

  it("shuffleTiles only uses free slots", () => {
    useConnectionsStore.getState().initPuzzle(makePuzzle());
    const { tiles } = useConnectionsStore.getState();
    tiles.filter((t) => t.level === 0).forEach((t) => useConnectionsStore.getState().toggleTile(t.id));
    useConnectionsStore.getState().submitGuess();
    useConnectionsStore.getState().finalizeAnimation();

    useConnectionsStore.getState().shuffleTiles();

    const state = useConnectionsStore.getState();
    state.tiles.forEach((t) => {
      expect(t.slotIndex).toBeGreaterThanOrEqual(4);
      expect(t.slotIndex).toBeLessThanOrEqual(15);
    });
  });

  it("useHint auto-selects first word of easiest remaining category", () => {
    useConnectionsStore.getState().initPuzzle(makePuzzle());
    useConnectionsStore.getState().useHint();

    const { selections, hintCategory, hintStep } = useConnectionsStore.getState();
    expect(selections).toHaveLength(1);
    expect(hintCategory).toBe(0);
    expect(hintStep).toBe(1);
  });

  it("useHint reveals next word on subsequent calls", () => {
    useConnectionsStore.getState().initPuzzle(makePuzzle());
    useConnectionsStore.getState().useHint();
    useConnectionsStore.getState().useHint();

    expect(useConnectionsStore.getState().selections).toHaveLength(2);
    expect(useConnectionsStore.getState().hintStep).toBe(2);
  });

  it("toggleTile clears hint when selecting a tile outside hint category", () => {
    useConnectionsStore.getState().initPuzzle(makePuzzle());
    useConnectionsStore.getState().useHint();
    expect(useConnectionsStore.getState().hintCategory).toBe(0);

    const nonHintTile = useConnectionsStore.getState().tiles.find((t) => t.level !== 0)!;
    useConnectionsStore.getState().toggleTile(nonHintTile.id);
    expect(useConnectionsStore.getState().hintCategory).toBeNull();
    expect(useConnectionsStore.getState().hintStep).toBe(0);
  });

  it("useHint does nothing after all 4 hint words selected", () => {
    useConnectionsStore.getState().initPuzzle(makePuzzle());
    for (let i = 0; i < 4; i++) useConnectionsStore.getState().useHint();

    expect(useConnectionsStore.getState().selections).toHaveLength(4);

    useConnectionsStore.getState().useHint();

    expect(useConnectionsStore.getState().hintStep).toBe(4);
  });

  it("useHint adds next word from same category when words are selected", () => {
    useConnectionsStore.getState().initPuzzle(makePuzzle());
    const { tiles } = useConnectionsStore.getState();
    const cat0tile = tiles.find((t) => t.level === 0)!;
    useConnectionsStore.getState().toggleTile(cat0tile.id);

    useConnectionsStore.getState().useHint();

    const { selections, hintStep } = useConnectionsStore.getState();
    expect(selections).toHaveLength(2);
    expect(hintStep).toBe(2);
    selections.forEach((id) => {
      const t = useConnectionsStore.getState().tiles.find((tt) => tt.id === id)!;
      expect(t.level).toBe(0);
    });
  });

  it("useHint does nothing when selected words span multiple categories", () => {
    useConnectionsStore.getState().initPuzzle(makePuzzle());
    const { tiles } = useConnectionsStore.getState();
    const cat0tile = tiles.find((t) => t.level === 0)!;
    const cat1tile = tiles.find((t) => t.level === 1)!;
    useConnectionsStore.getState().toggleTile(cat0tile.id);
    useConnectionsStore.getState().toggleTile(cat1tile.id);

    useConnectionsStore.getState().useHint();

    const { selections, hintStep } = useConnectionsStore.getState();
    expect(selections).toHaveLength(2);
    expect(hintStep).toBe(0);
  });

  it("useHint starts with easiest category when no words selected", () => {
    useConnectionsStore.getState().initPuzzle(makePuzzle());
    const { tiles } = useConnectionsStore.getState();
    const cat0ids = tiles.filter((t) => t.level === 0).map((t) => t.id);
    cat0ids.forEach((id) => useConnectionsStore.getState().toggleTile(id));
    useConnectionsStore.getState().submitGuess();
    useConnectionsStore.getState().finalizeAnimation();

    useConnectionsStore.getState().useHint();

    const { selections } = useConnectionsStore.getState();
    expect(selections).toHaveLength(1);
    const t = useConnectionsStore.getState().tiles.find((tt) => tt.id === selections[0])!;
    expect(t.level).toBe(1);
  });

  it("tracks previous wrong guesses", () => {
    useConnectionsStore.getState().initPuzzle(makePuzzle());
    const { tiles } = useConnectionsStore.getState();
    [tiles[0], tiles[1], tiles[2], tiles[4]].forEach((t) => useConnectionsStore.getState().toggleTile(t.id));
    useConnectionsStore.getState().submitGuess();

    expect(useConnectionsStore.getState().previousGuesses).toHaveLength(1);
    expect(useConnectionsStore.getState().previousGuesses[0]).toEqual(
      [tiles[0].word, tiles[1].word, tiles[2].word, tiles[4].word].sort()
    );
  });

  it("does not duplicate identical previous guesses", () => {
    useConnectionsStore.getState().initPuzzle(makePuzzle());
    const { tiles } = useConnectionsStore.getState();
    const combo = [tiles[0], tiles[1], tiles[2], tiles[4]];
    combo.forEach((t) => useConnectionsStore.getState().toggleTile(t.id));
    useConnectionsStore.getState().submitGuess();

    combo.forEach((t) => useConnectionsStore.getState().toggleTile(t.id));
    useConnectionsStore.getState().submitGuess();

    expect(useConnectionsStore.getState().previousGuesses).toHaveLength(1);
  });

  it("resetGame clears all state", () => {
    useConnectionsStore.getState().initPuzzle(makePuzzle());
    useConnectionsStore.getState().resetGame();

    const state = useConnectionsStore.getState();
    expect(state.puzzle).toBeNull();
    expect(state.tiles).toEqual([]);
    expect(state.gameStatus).toBe("playing");
    expect(state.mistakes).toBe(0);
    expect(state.revealedCategories).toEqual([]);
  });
});

describe("isCorrectGuess", () => {
  const tiles: TileState[] = [
    { id: "0-0", word: "A1", slotIndex: 0, level: 0 },
    { id: "0-1", word: "A2", slotIndex: 1, level: 0 },
    { id: "0-2", word: "A3", slotIndex: 2, level: 0 },
    { id: "0-3", word: "A4", slotIndex: 3, level: 0 },
    { id: "1-0", word: "B1", slotIndex: 4, level: 1 },
    { id: "1-1", word: "B2", slotIndex: 5, level: 1 },
    { id: "1-2", word: "B3", slotIndex: 6, level: 1 },
    { id: "1-3", word: "B4", slotIndex: 7, level: 1 },
  ];

  it("returns true when all 4 selections share an unrevealed level", () => {
    expect(isCorrectGuess(["0-0", "0-1", "0-2", "0-3"], tiles, [])).toBe(true);
  });

  it("returns false when selections span multiple levels", () => {
    expect(isCorrectGuess(["0-0", "0-1", "0-2", "1-0"], tiles, [])).toBe(false);
  });

  it("returns false when fewer than 4 selections", () => {
    expect(isCorrectGuess(["0-0", "0-1", "0-2"], tiles, [])).toBe(false);
  });

  it("returns false when the level is already revealed", () => {
    const revealed: RevealedCategory[] = [
      { title: "Easy Yellow", level: 0, tileIds: ["0-0", "0-1", "0-2", "0-3"], words: ["A1", "A2", "A3", "A4"], rowIndex: 0 },
    ];
    expect(isCorrectGuess(["0-0", "0-1", "0-2", "0-3"], tiles, revealed)).toBe(false);
  });
});
