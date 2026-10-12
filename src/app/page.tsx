"use client";

import { useNavHover } from "@/context/NavHoverContext";
import { useRef, useState } from "react";

type Accent = "name" | "software" | "baker" | "candlemaker" | "location";
type Word = { text: string; accent?: Accent };

const words: Word[] = [
  { text: "Hi," }, { text: "my" }, { text: "name" }, { text: "is" },
  { text: "Andrew", accent: "name" }, { text: "Hachten.", accent: "name" },
  { text: "I'm" }, { text: "a" }, { text: "software", accent: "software" },
  { text: "engineer,", accent: "software" }, { text: "baker,", accent: "baker" },
  { text: "and" }, { text: "candlemaker", accent: "candlemaker" },
  { text: "living" }, { text: "in" }, { text: "Philadelphia.", accent: "location" },
  { text: "You" }, { text: "can" }, { text: "find" }, { text: "my" },
  { text: "projects," }, { text: "and" }, { text: "recipes" }, { text: "here!" },
  { text: "You" }, { text: "can" }, { text: "also" }, { text: "move" },
  { text: "all" }, { text: "of" }, { text: "these" }, { text: "words" },
  { text: "around," }, { text: "if" }, { text: "you" }, { text: "want." },
];

function splitPunctuation(word: string): [string, string | null] {
  const match = word.match(/^(.*?)([,\.!?]+)$/);
  if (match && match[2]) {
    return [match[1], match[2]];
  }
  return [word, null];
}

type Position = { x: number; y: number };

function DraggableWord({
  word,
  highlighted,
  position,
  onPositionChange,
  onSelect,
}: {
  word: string;
  highlighted: boolean;
  position: Position;
  onPositionChange: (position: Position) => void;
  onSelect: () => void;
}) {
  const [isDragging, setIsDragging] = useState(false);
  const offset = useRef({ x: 0, y: 0 });
  const [text, punct] = splitPunctuation(word);

  const handlePointerDown = (event: React.PointerEvent<HTMLSpanElement>) => {
    event.currentTarget.setPointerCapture(event.pointerId);
    onSelect();
    setIsDragging(true);
    offset.current = {
      x: event.clientX - position.x,
      y: event.clientY - position.y,
    };
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLSpanElement>) => {
    if (!isDragging) return;
    onPositionChange({
      x: event.clientX - offset.current.x,
      y: event.clientY - offset.current.y,
    });
  };

  return (
    <span
      aria-hidden="true"
      className="draggable-word"
      data-dragging={isDragging}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={() => setIsDragging(false)}
      onPointerCancel={() => setIsDragging(false)}
      style={{
        transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
      }}
    >
      <span className={`transition-colors duration-500 ${highlighted ? "text-[#9E7300]" : "text-primary"}`}>
        {text}
      </span>
      {punct && <span className="text-primary/40">{punct}</span>}
    </span>
  );
}

export default function Home() {
  const { hoveredLink } = useNavHover();
  const [positions, setPositions] = useState<Position[]>(() =>
    words.map(() => ({ x: 0, y: 0 })),
  );
  const [selectedWord, setSelectedWord] = useState(0);
  const [announcement, setAnnouncement] = useState("");

  const handleCanvasKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "PageDown" || event.key === "PageUp") {
      event.preventDefault();
      const direction = event.key === "PageDown" ? 1 : -1;
      const next = (selectedWord + direction + words.length) % words.length;
      setSelectedWord(next);
      setAnnouncement(`Selected ${words[next].text}`);
      return;
    }

    const delta = event.shiftKey ? 20 : 5;
    const movement = {
      ArrowLeft: { x: -delta, y: 0 },
      ArrowRight: { x: delta, y: 0 },
      ArrowUp: { x: 0, y: -delta },
      ArrowDown: { x: 0, y: delta },
    }[event.key];
    if (!movement && event.key !== "Home") return;

    event.preventDefault();
    setPositions((current) => {
      const next = [...current];
      const position = event.key === "Home"
        ? { x: 0, y: 0 }
        : {
            x: current[selectedWord].x + movement!.x,
            y: current[selectedWord].y + movement!.y,
          };
      next[selectedWord] = position;
      setAnnouncement(
        `${words[selectedWord].text} is ${position.x} pixels horizontally and ${position.y} pixels vertically from its starting point.`,
      );
      return next;
    });
  };

  return (
    <main id="main-content" className="min-h-screen px-8 md:px-16 flex flex-col justify-center pt-24 pb-[20vh] relative overflow-hidden">
      <section className="w-full max-w-5xl z-10">
        <h1 className="sr-only">{words.map(({ text }) => text).join(" ")}</h1>
        <div
          className="font-headline text-5xl md:text-6xl lg:text-7xl tracking-tight leading-[1.1] canvas-text focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-tertiary"
          tabIndex={0}
          role="group"
          aria-label={`Move words in the introduction. ${words[selectedWord].text} is selected. Use Page Up and Page Down to select a word, arrow keys to move it, Shift plus an arrow key to move farther, and Home to reset it.`}
          onKeyDown={handleCanvasKeyDown}
        >
          {words.map(({ text, accent }, i) => {
            const isAccented =
              accent === "name" ||
              (hoveredLink === "Projects" && accent === "software") ||
              (hoveredLink === "Recipes" && accent === "baker") ||
              (hoveredLink === "About" &&
                ["software", "baker", "candlemaker", "location"].includes(accent ?? "")) ||
              (hoveredLink === "Resume" && accent === "software");

            return (
              <DraggableWord
                key={i}
                word={text}
                highlighted={isAccented}
                position={positions[i]}
                onSelect={() => setSelectedWord(i)}
                onPositionChange={(position) =>
                  setPositions((current) => current.map((item, index) => index === i ? position : item))
                }
              />
            );
          })}
        </div>
        <p className="sr-only" aria-live="polite">{announcement}</p>
      </section>
    </main>
  );
}
