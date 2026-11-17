export type DraggableToken = {
  id: string;
  text: string;
  kind: "word" | "punctuation";
};

export type Position = { x: number; y: number };

export type MovementKey =
  | "ArrowLeft"
  | "ArrowRight"
  | "ArrowUp"
  | "ArrowDown"
  | "Home";

const TOKEN_PATTERN = /[\p{L}\p{N}]+(?:['’][\p{L}\p{N}]+)*|[,.;:!?]/gu;
const PUNCTUATION_PATTERN = /^[,.;:!?]$/;

export function tokenizeDraggableText(text: string, prefix: string): DraggableToken[] {
  return [...text.matchAll(TOKEN_PATTERN)].map(([token], index) => ({
    id: `${prefix}-${index}`,
    text: token,
    kind: PUNCTUATION_PATTERN.test(token) ? "punctuation" : "word",
  }));
}

export function movePosition(
  position: Position,
  key: MovementKey,
  shifted: boolean,
): Position {
  if (key === "Home") return { x: 0, y: 0 };

  const distance = shifted ? 20 : 5;
  const movement = {
    ArrowLeft: { x: -distance, y: 0 },
    ArrowRight: { x: distance, y: 0 },
    ArrowUp: { x: 0, y: -distance },
    ArrowDown: { x: 0, y: distance },
  }[key];

  return {
    x: position.x + movement.x,
    y: position.y + movement.y,
  };
}
