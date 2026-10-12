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

function DraggableWord({ word, highlighted }: { word: string; highlighted: boolean }) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const offset = useRef({ x: 0, y: 0 });
  const [text, punct] = splitPunctuation(word);

  const handlePointerDown = (event: React.PointerEvent<HTMLSpanElement>) => {
    event.currentTarget.setPointerCapture(event.pointerId);
    setIsDragging(true);
    offset.current = {
      x: event.clientX - position.x,
      y: event.clientY - position.y,
    };
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLSpanElement>) => {
    if (!isDragging) return;
    setPosition({
      x: event.clientX - offset.current.x,
      y: event.clientY - offset.current.y,
    });
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLSpanElement>) => {
    const delta = event.shiftKey ? 20 : 5;
    const movement = {
      ArrowLeft: { x: -delta, y: 0 },
      ArrowRight: { x: delta, y: 0 },
      ArrowUp: { x: 0, y: -delta },
      ArrowDown: { x: 0, y: delta },
    }[event.key];
    if (movement) {
      event.preventDefault();
      setPosition((current) => ({
        x: current.x + movement.x,
        y: current.y + movement.y,
      }));
    } else if (event.key === "Home") {
      event.preventDefault();
      setPosition({ x: 0, y: 0 });
    }
  };

  return (
    <span
      role="button"
      tabIndex={0}
      aria-label={`Move the word ${word}. Use the arrow keys; press Home to reset it.`}
      className="draggable-word focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-tertiary"
      data-dragging={isDragging}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={() => setIsDragging(false)}
      onPointerCancel={() => setIsDragging(false)}
      onKeyDown={handleKeyDown}
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

  return (
    <main id="main-content" className="min-h-screen px-8 md:px-16 flex flex-col justify-center pt-24 pb-[20vh] relative overflow-hidden">
      <section className="w-full max-w-5xl z-10">
        <h1
          className="font-headline text-5xl md:text-6xl lg:text-7xl tracking-tight leading-[1.1] canvas-text"
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
              />
            );
          })}
        </h1>
      </section>
    </main>
  );
}
