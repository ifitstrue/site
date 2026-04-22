import { checkWinner, checkTied } from "./engine";
import { CellState } from "./types";

const c = (id: number): CellState => ({ claimedBy: id });
const e = (): CellState => ({ claimedBy: null });

describe("checkWinner", () => {
  it("returns null with no winner", () => {
    expect(checkWinner(Array.from({ length: 9 }, e))).toBeNull();
  });

  it("detects a first-row win", () => {
    expect(
      checkWinner([c(0), c(0), c(0), e(), e(), e(), e(), e(), e()])
    ).toBe(0);
  });

  it("detects a column win", () => {
    expect(
      checkWinner([c(1), e(), e(), c(1), e(), e(), c(1), e(), e()])
    ).toBe(1);
  });

  it("detects a diagonal win", () => {
    expect(
      checkWinner([c(0), e(), e(), e(), c(0), e(), e(), e(), c(0)])
    ).toBe(0);
  });

  it("returns null when all claimed but no winning combo", () => {
    // X O X / X X O / O X O — no winner
    expect(
      checkWinner([c(0), c(1), c(0), c(0), c(0), c(1), c(1), c(0), c(1)])
    ).toBeNull();
  });
});

describe("checkTied", () => {
  it("returns false when unclaimed cells remain", () => {
    expect(checkTied([c(0), e(), ...Array.from({ length: 7 }, e)])).toBe(
      false
    );
  });

  it("returns true when all cells are claimed", () => {
    expect(
      checkTied(Array.from({ length: 9 }, (_, i) => c(i % 2)))
    ).toBe(true);
  });
});

import {
  buildInitialBoards,
  getNextEligibleBoards,
  checkGameWinner,
  checkGameTied,
  computeStateFromMoves,
} from "./engine";

describe("buildInitialBoards", () => {
  it("returns 9 boards, each with 9 empty cells", () => {
    const boards = buildInitialBoards();
    expect(boards).toHaveLength(9);
    boards.forEach((board) => {
      expect(board.cells).toHaveLength(9);
      board.cells.forEach((cell) => expect(cell.claimedBy).toBeNull());
      expect(board.winner).toBeNull();
      expect(board.tied).toBe(false);
    });
  });

  it("returns independent board instances on each call", () => {
    const a = buildInitialBoards();
    const b = buildInitialBoards();
    a[0].cells[0].claimedBy = 0;
    expect(b[0].cells[0].claimedBy).toBeNull();
  });
});

describe("getNextEligibleBoards", () => {
  it("returns [targetIndex] when the target board is available", () => {
    expect(getNextEligibleBoards(buildInitialBoards(), 4)).toEqual([4]);
  });

  it("returns all unclaimed boards when target is won", () => {
    const boards = buildInitialBoards();
    boards[4].winner = 0;
    const result = getNextEligibleBoards(boards, 4);
    expect(result).toHaveLength(8);
    expect(result).not.toContain(4);
  });

  it("returns all unclaimed boards when target is tied", () => {
    const boards = buildInitialBoards();
    boards[4].tied = true;
    const result = getNextEligibleBoards(boards, 4);
    expect(result).toHaveLength(8);
    expect(result).not.toContain(4);
  });

  it("excludes won and tied boards from the fallback set", () => {
    const boards = buildInitialBoards();
    boards[4].winner = 0;
    boards[0].winner = 1;
    boards[1].tied = true;
    const result = getNextEligibleBoards(boards, 4);
    expect(result).not.toContain(0);
    expect(result).not.toContain(1);
    expect(result).not.toContain(4);
    expect(result).toHaveLength(6);
  });
});

describe("checkGameWinner", () => {
  it("returns null when no game winner", () => {
    expect(checkGameWinner(buildInitialBoards())).toBeNull();
  });

  it("returns the winner when a player owns a winning combo of boards", () => {
    const boards = buildInitialBoards();
    boards[0].winner = 0;
    boards[1].winner = 0;
    boards[2].winner = 0;
    expect(checkGameWinner(boards)).toBe(0);
  });
});

describe("checkGameTied", () => {
  it("returns false when boards have unclaimed", () => {
    expect(checkGameTied(buildInitialBoards())).toBe(false);
  });

  it("returns true when all boards are won or tied", () => {
    const boards = buildInitialBoards();
    boards.forEach((b, i) => {
      if (i % 2 === 0) b.winner = 0;
      else b.tied = true;
    });
    expect(checkGameTied(boards)).toBe(true);
  });
});

describe("computeStateFromMoves", () => {
  it("returns initial state for an empty move list", () => {
    const state = computeStateFromMoves([], 2);
    expect(state.boards).toHaveLength(9);
    expect(state.currentPlayerId).toBe(0);
    expect(state.eligibleBoards).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8]);
    expect(state.gameWinner).toBeNull();
  });

  it("claims a cell and advances the player", () => {
    const state = computeStateFromMoves(
      [{ boardIndex: 0, cellIndex: 4, playerId: 0 }],
      2
    );
    expect(state.boards[0].cells[4].claimedBy).toBe(0);
    expect(state.currentPlayerId).toBe(1);
    expect(state.eligibleBoards).toEqual([4]);
  });

  it("advances player on a skip-turn (null) move", () => {
    const state = computeStateFromMoves(
      [{ boardIndex: null, cellIndex: null, playerId: 0 }],
      2
    );
    expect(state.currentPlayerId).toBe(1);
  });
});
