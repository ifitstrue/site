import { IconType } from "react-icons";

export type CellState = {
  claimedBy: number | null;
};

export type SubBoardState = {
  cells: CellState[];
  winner: number | null;
  tied: boolean;
};

export type Player = {
  id: number;
  name: string;
  icon: IconType;
  color: string;
};

export type Move = {
  boardIndex: number | null;
  cellIndex: number | null;
  playerId: number;
};

export type GameStore = {
  players: Player[];
  boards: SubBoardState[];
  currentPlayerId: number;
  eligibleBoards: number[];
  gameWinner: number | null;
  moves: Move[];
  claimCell: (boardIndex: number, cellIndex: number) => void;
  undoMove: () => void;
  skipTurn: () => void;
  resetGame: () => void;
  updatePlayer: (player: Player) => void;
};
