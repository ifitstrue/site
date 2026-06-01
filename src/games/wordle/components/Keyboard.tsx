"use client";

import type { LetterStatus } from "../hooks/useWordleGame";

interface KeyboardProps {
  keyboardState: Record<string, LetterStatus>;
  onLetter: (letter: string) => void;
  onDelete: () => void;
  onEnter: () => void;
}

const ROWS = [
  ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
  ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
  ["Enter", "z", "x", "c", "v", "b", "n", "m", "Backspace"],
];

const KEY_STYLES: Record<string, { bg: string; text: string }> = {
  correct: { bg: "#6AAA64", text: "#fff" },
  present: { bg: "#C9B458", text: "#fff" },
  absent: { bg: "#787C7E", text: "#fff" },
  unused: { bg: "#D3D6DA", text: "#1c1c19" },
};

export const Keyboard = ({ keyboardState, onLetter, onDelete, onEnter }: KeyboardProps) => {
  const handleClick = (key: string) => {
    if (key === "Enter") { onEnter(); return; }
    if (key === "Backspace") { onDelete(); return; }
    onLetter(key);
  };

  return (
    <div className="flex flex-col items-center gap-1.5 mx-auto w-full" style={{ maxWidth: "500px" }}>
      {ROWS.map((row, i) => (
        <div key={i} className="flex gap-1.5 justify-center w-full">
          {row.map((key) => {
            const isEnterOrDel = key === "Enter" || key === "Backspace";
            const status = keyboardState[key];
            const style = status ? KEY_STYLES[status] : KEY_STYLES.unused;

            const statusLabel = status ? `, ${status}` : "";
            const ariaLabel =
              key === "Backspace"
                ? "Delete"
                : key === "Enter"
                ? "Enter"
                : `${key.toUpperCase()}${statusLabel}`;

            return (
              <button
                key={key}
                type="button"
                onClick={() => handleClick(key)}
                aria-label={ariaLabel}
                className={`flex items-center justify-center rounded-sm font-label font-bold transition-colors duration-200 ${
                  isEnterOrDel ? "text-xs px-3" : "text-sm"
                }`}
                style={{
                  backgroundColor: style.bg,
                  color: style.text,
                  height: "55px",
                  minWidth: isEnterOrDel ? "60px" : "34px",
                  flex: isEnterOrDel ? "1.5" : "1",
                  maxWidth: isEnterOrDel ? "72px" : "46px",
                  fontFamily: "var(--font-label), sans-serif",
                }}
              >
                <span aria-hidden="true">{key === "Backspace" ? "⌫" : key.toUpperCase()}</span>
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
};
