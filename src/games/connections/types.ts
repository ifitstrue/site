export interface ConnectionsPuzzle {
  categories: Category[];
}

export interface CardsItem {
  content?: string;
  image_url?: string;
  image_alt_text?: string;
  position: number;
}

export interface Category {
  title: string;
  level: number;
  cards: CardsItem[];
}

export interface TileState {
  id: string;
  word: string;
  imageUrl?: string;
  imageAlt?: string;
  slotIndex: number;
  level: number;
}

export interface RevealedCategory {
  title: string;
  level: number;
  tileIds: string[];
  words: string[];
  rowIndex: number;
}

export type GameStatus = "playing" | "won" | "lost";

export interface ConnectionsStore {
  puzzle: ConnectionsPuzzle | null;
  tiles: TileState[];
  selections: string[];
  revealedCategories: RevealedCategory[];
  mistakes: number;
  gameStatus: GameStatus;
  hintCategory: number | null;
  hintStep: number;
  previousGuesses: string[][];

  highlightedTileIds: string[];

  initPuzzle: (data: ConnectionsPuzzle) => void;
  toggleTile: (id: string) => void;
  clearSelections: () => void;
  submitGuess: () => void;
  finalizeAnimation: () => void;
  swapTiles: (fromIndex: number, toIndex: number) => void;
  useHint: () => void;
  shuffleTiles: () => void;
  resetGame: () => void;
  setHighlightedTileIds: (ids: string[]) => void;
  selectTilesByWords: (words: string[]) => void;
}

export interface DayEntry {
  date: string;
  status: "won" | "lost";
  mistakes: number;
}
