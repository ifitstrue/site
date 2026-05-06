import { WINNING_COMBOS } from "./constants";
import { CellState, Move, SubBoardState } from "./types";

export function checkWinner(cells: CellState[]): number | null {
  for (const [a, b, c] of WINNING_COMBOS) {
    const val = cells[a].claimedBy;
    if (
      val !== null &&
      val === cells[b].claimedBy &&
      val === cells[c].claimedBy
    ) {
      return val;
    }
  }
  return null;
}

export function checkTied(cells: CellState[]): boolean {
  return cells.every((cell) => cell.claimedBy !== null);
}

export function buildInitialBoards(): SubBoardState[] {
  return Array.from({ length: 9 }, () => ({
    cells: Array.from({ length: 9 }, () => ({ claimedBy: null })),
    winner: null,
    tied: false,
  }));
}

export function getNextEligibleBoards(
  boards: SubBoardState[],
  targetIndex: number
): number[] {
  const target = boards[targetIndex];
  if (target.winner !== null || target.tied) {
    return boards
      .map((board, i) => ({ board, i }))
      .filter(({ board }) => board.winner === null && !board.tied)
      .map(({ i }) => i);
  }
  return [targetIndex];
}

export function checkGameWinner(boards: SubBoardState[]): number | null {
  return checkWinner(boards.map((b) => ({ claimedBy: b.winner })));
}

export function checkGameTied(boards: SubBoardState[]): boolean {
  return boards.every((b) => b.winner !== null || b.tied);
}

export function computeStateFromMoves(
  moves: Move[],
  playerCount: number
): {
  boards: SubBoardState[];
  currentPlayerId: number;
  eligibleBoards: number[];
  gameWinner: number | null;
} {
  let boards = buildInitialBoards();
  let currentPlayerId = 0;
  let eligibleBoards = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  let gameWinner: number | null = null;

  for (const move of moves) {
    if (move.boardIndex === null || move.cellIndex === null) {
      currentPlayerId = (currentPlayerId + 1) % playerCount;
      continue;
    }

    const { boardIndex, cellIndex, playerId } = move;
    const newCells = boards[boardIndex].cells.map((cell, j) =>
      j === cellIndex ? { claimedBy: playerId } : cell
    );
    const boardWinner = checkWinner(newCells);
    const boardTied = boardWinner === null && checkTied(newCells);

    boards = boards.map((board, i) =>
      i === boardIndex
        ? { cells: newCells, winner: boardWinner, tied: boardTied }
        : board
    );

    gameWinner = checkGameWinner(boards);
    const isGameTied = checkGameTied(boards);

    eligibleBoards =
      gameWinner !== null || isGameTied
        ? []
        : getNextEligibleBoards(boards, cellIndex);

    currentPlayerId = (currentPlayerId + 1) % playerCount;
  }

  return { boards, currentPlayerId, eligibleBoards, gameWinner };
}
