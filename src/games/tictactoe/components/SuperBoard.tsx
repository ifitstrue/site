"use client";

import { useEffect, useRef, useState } from "react";
import { useGameStore } from "../store";
import SubBoard from "./SubBoard";

export default function SuperBoard() {
  const boards = useGameStore((state) => state.boards);
  const eligibleBoards = useGameStore((state) => state.eligibleBoards);
  const firstPlayableKey = () => {
    for (const boardIndex of eligibleBoards) {
      const cellIndex = boards[boardIndex].cells.findIndex((cell) => cell.claimedBy === null);
      if (cellIndex >= 0) return `${boardIndex}-${cellIndex}`;
    }
    return "";
  };
  const [focusedCell, setFocusedCell] = useState(firstPlayableKey);
  const refs = useRef(new Map<string, HTMLButtonElement>());

  const isPlayable = (boardIndex: number, cellIndex: number) =>
    eligibleBoards.includes(boardIndex) &&
    boards[boardIndex].cells[cellIndex].claimedBy === null;

  const [focusedBoardIndex, focusedCellIndex] = focusedCell.split("-").map(Number);
  const effectiveFocusedCell =
    focusedCell && isPlayable(focusedBoardIndex, focusedCellIndex)
      ? focusedCell
      : firstPlayableKey();

  useEffect(() => {
    if (effectiveFocusedCell === focusedCell) return;
    const rafId = requestAnimationFrame(() => refs.current.get(effectiveFocusedCell)?.focus());
    return () => cancelAnimationFrame(rafId);
  }, [effectiveFocusedCell, focusedCell]);

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLButtonElement>,
    boardIndex: number,
    cellIndex: number,
  ) => {
    const movement = {
      ArrowLeft: [0, -1],
      ArrowRight: [0, 1],
      ArrowUp: [-1, 0],
      ArrowDown: [1, 0],
    }[event.key];
    if (!movement) return;
    event.preventDefault();

    const row = Math.floor(boardIndex / 3) * 3 + Math.floor(cellIndex / 3);
    const column = (boardIndex % 3) * 3 + (cellIndex % 3);
    let nextRow = row + movement[0];
    let nextColumn = column + movement[1];
    while (nextRow >= 0 && nextRow < 9 && nextColumn >= 0 && nextColumn < 9) {
      const nextBoard = Math.floor(nextRow / 3) * 3 + Math.floor(nextColumn / 3);
      const nextCell = (nextRow % 3) * 3 + (nextColumn % 3);
      if (isPlayable(nextBoard, nextCell)) {
        const key = `${nextBoard}-${nextCell}`;
        setFocusedCell(key);
        refs.current.get(key)?.focus();
        return;
      }
      nextRow += movement[0];
      nextColumn += movement[1];
    }
  };

  return (
    <div className="grid grid-cols-3 gap-3 p-3 rounded-lg" role="group" aria-label="Super Tic Tac Toe board. Use arrow keys to move between playable squares.">
      {Array.from({ length: 9 }, (_, i) => (
        <SubBoard
          key={i}
          boardIndex={i}
          focusedCell={effectiveFocusedCell}
          registerCell={(key, element) => {
            if (element) refs.current.set(key, element);
            else refs.current.delete(key);
          }}
          onCellFocus={setFocusedCell}
          onCellKeyDown={handleKeyDown}
        />
      ))}
    </div>
  );
}
