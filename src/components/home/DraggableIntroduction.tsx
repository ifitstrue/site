"use client";

import {
  movePosition,
  tokenizeDraggableText,
  type DraggableToken,
  type MovementKey,
  type Position,
} from "@/lib/draggableText";
import { useMemo, useRef, useState, type Dispatch, type SetStateAction } from "react";
import type { DestinationKey } from "./homeContent";
import { INITIAL_COPY, TRANSFORMED_COPY } from "./homeContent";

export type DraggablePositions = Record<string, Position>;
export type TargetTokenRefs = {
  current: Partial<Record<DestinationKey, HTMLSpanElement | null>>;
};

type DraggableIntroductionProps = {
  transformed: boolean;
  positions: DraggablePositions;
  onPositionsChange: Dispatch<SetStateAction<DraggablePositions>>;
  tokenRefs: TargetTokenRefs;
  onInteractionCancel?: () => void;
};

const ZERO_POSITION: Position = { x: 0, y: 0 };
const MOVEMENT_KEYS = new Set<MovementKey>([
  "ArrowLeft",
  "ArrowRight",
  "ArrowUp",
  "ArrowDown",
  "Home",
]);
const IDENTITY_WORD_TARGETS: Readonly<Record<string, DestinationKey>> = {
  engineer: "projects",
  baker: "recipes",
  candlemaker: "candles",
};

function tokenPosition(positions: DraggablePositions, token: DraggableToken) {
  return positions[token.id] ?? ZERO_POSITION;
}

export function DraggableIntroduction({
  transformed,
  positions,
  onPositionsChange,
  tokenRefs,
  onInteractionCancel,
}: DraggableIntroductionProps) {
  const copy = transformed ? TRANSFORMED_COPY : INITIAL_COPY;
  const headingTokens = useMemo(
    () => tokenizeDraggableText(copy.heading, "heading"),
    [copy.heading],
  );
  const bodyTokens = useMemo(() => tokenizeDraggableText(copy.body, "body"), [copy.body]);
  const allTokens = useMemo(
    () => [...headingTokens, ...bodyTokens],
    [headingTokens, bodyTokens],
  );
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [announcement, setAnnouncement] = useState("");
  const pointerOffset = useRef({ x: 0, y: 0 });

  const setTokenPosition = (token: DraggableToken, position: Position) => {
    onPositionsChange((current) => ({ ...current, [token.id]: position }));
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "PageDown" || event.key === "PageUp") {
      event.preventDefault();
      const direction = event.key === "PageDown" ? 1 : -1;
      const nextIndex = (selectedIndex + direction + allTokens.length) % allTokens.length;
      setSelectedIndex(nextIndex);
      setAnnouncement(`Selected ${allTokens[nextIndex].text}.`);
      return;
    }

    if (!MOVEMENT_KEYS.has(event.key as MovementKey)) return;
    event.preventDefault();
    const token = allTokens[selectedIndex];
    const next = movePosition(
      tokenPosition(positions, token),
      event.key as MovementKey,
      event.shiftKey,
    );
    setTokenPosition(token, next);
    setAnnouncement(
      `${token.text} is ${next.x} pixels horizontally and ${next.y} pixels vertically from its starting point.`,
    );
  };

  const renderToken = (token: DraggableToken, index: number, tokens: DraggableToken[]) => {
    const position = tokenPosition(positions, token);
    const identityWord = token.text.toLowerCase();
    const targetKey = token.kind === "word" ? IDENTITY_WORD_TARGETS[identityWord] : undefined;
    const isTarget = targetKey !== undefined;
    const nextIsPunctuation = tokens[index + 1]?.kind === "punctuation";

    return (
      <span
        key={token.id}
        ref={targetKey ? (element) => { tokenRefs.current[targetKey] = element; } : undefined}
        aria-hidden="true"
        data-testid={isTarget ? `identity-word-${identityWord}` : `token-${token.id}`}
        data-token-id={token.id}
        data-token-kind={token.kind}
        data-identity-word={targetKey}
        data-dragging={draggingId === token.id}
        className={`retro-draggable-token retro-draggable-token--${token.kind}${
          nextIsPunctuation ? " retro-draggable-token--attached" : ""
        }`}
        style={{ transform: `translate3d(${position.x}px, ${position.y}px, 0)` }}
        onPointerDown={(event) => {
          event.currentTarget.setPointerCapture?.(event.pointerId);
          setSelectedIndex(allTokens.findIndex(({ id }) => id === token.id));
          setDraggingId(token.id);
          pointerOffset.current = {
            x: event.clientX - position.x,
            y: event.clientY - position.y,
          };
        }}
        onPointerMove={(event) => {
          if (draggingId !== token.id) return;
          setTokenPosition(token, {
            x: event.clientX - pointerOffset.current.x,
            y: event.clientY - pointerOffset.current.y,
          });
        }}
        onPointerUp={() => setDraggingId(null)}
        onPointerCancel={() => {
          setDraggingId(null);
          onInteractionCancel?.();
        }}
      >
        {token.text}
      </span>
    );
  };

  return (
    <div
      className="retro-introduction-text"
      tabIndex={0}
      role="group"
      aria-label={`Move words in the introduction. ${allTokens[selectedIndex].text} is selected. Use Page Up and Page Down to select a word or punctuation mark, arrow keys to move it, Shift plus an arrow key to move farther, and Home to reset it.`}
      onKeyDown={handleKeyDown}
    >
      <h1>
        <span className="sr-only">{copy.heading}</span>
        {headingTokens.map(renderToken)}
      </h1>
      <p>
        <span className="sr-only">{copy.body}</span>
        {bodyTokens.map(renderToken)}
      </p>
      <span className="sr-only" role="status" aria-live="polite" aria-atomic="true">
        {announcement}
      </span>
    </div>
  );
}
