import { create } from "zustand";
import { DEFAULT_PLAYERS } from "./constants";
import {
  buildInitialBoards,
  checkGameTied,
  checkGameWinner,
  checkTied,
  checkWinner,
  computeStateFromMoves,
  getNextEligibleBoards,
} from "./engine";
import { GameStore } from "./types";

export const useGameStore = create<GameStore>((set, get) => ({
  players: DEFAULT_PLAYERS.map((p) => ({ ...p })),
  boards: buildInitialBoards(),
  currentPlayerId: 0,
  eligibleBoards: [0, 1, 2, 3, 4, 5, 6, 7, 8],
  gameWinner: null,
  moves: [],

  claimCell: (boardIndex, cellIndex) => {
    const { boards, currentPlayerId, players, eligibleBoards, moves } = get();

    if (!eligibleBoards.includes(boardIndex)) return;
    if (boards[boardIndex].cells[cellIndex].claimedBy !== null) return;

    const newBoards = boards.map((board, i) => {
      if (i !== boardIndex) return board;
      const newCells = board.cells.map((cell, j) =>
        j === cellIndex ? { claimedBy: currentPlayerId } : cell
      );
      const winner = checkWinner(newCells);
      const tied = winner === null && checkTied(newCells);
      return { ...board, cells: newCells, winner, tied };
    });

    const gameWinner = checkGameWinner(newBoards);
    const isGameTied = checkGameTied(newBoards);
    const nextEligible =
      gameWinner !== null || isGameTied
        ? []
        : getNextEligibleBoards(newBoards, cellIndex);

    set({
      boards: newBoards,
      gameWinner,
      eligibleBoards: nextEligible,
      currentPlayerId: (currentPlayerId + 1) % players.length,
      moves: [...moves, { boardIndex, cellIndex, playerId: currentPlayerId }],
    });
  },

  undoMove: () => {
    const { moves, players } = get();
    if (moves.length === 0) return;
    const newMoves = moves.slice(0, -1);
    const state = computeStateFromMoves(newMoves, players.length);
    set({ moves: newMoves, ...state });
  },

  skipTurn: () => {
    const { currentPlayerId, players, moves, gameWinner, eligibleBoards } =
      get();
    if (gameWinner !== null || eligibleBoards.length === 0) return;
    set({
      currentPlayerId: (currentPlayerId + 1) % players.length,
      moves: [
        ...moves,
        { boardIndex: null, cellIndex: null, playerId: currentPlayerId },
      ],
    });
  },

  resetGame: () => {
    set({
      boards: buildInitialBoards(),
      currentPlayerId: 0,
      eligibleBoards: [0, 1, 2, 3, 4, 5, 6, 7, 8],
      gameWinner: null,
      moves: [],
    });
  },

  updatePlayer: (player) => {
    set((state) => ({
      players: state.players.map((p) => (p.id === player.id ? player : p)),
    }));
  },
}));
