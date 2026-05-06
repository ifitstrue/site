"use client";

import { useNavHover } from "@/context/NavHoverContext";
import { useEffect, useRef, useState } from "react";

const words = [
  "Hi,",
  "my",
  "name",
  "is",
  "Andrew",
  "Hachten.",
  "I'm",
  "a",
  "software",
  "engineer,",
  "baker,",
  "and",
  "candlemaker",
  "living",
  "in",
  "Philadelphia.",
  "You",
  "can",
  "find",
  "my",
  "projects,",
  "recipes,",
  "and",
  "thoughts",
  "here!",
  "Feel",
  "free",
  "to",
  "rearrange",
  "the",
  "preceding",
  "words",
  "however",
  "you",
  "like.",
];

function splitPunctuation(word: string): [string, string | null] {
  const match = word.match(/^(.*?)([,\.!?]+)$/);
  if (match && match[2]) {
    return [match[1], match[2]];
  }
  return [word, null];
}

function DraggableSpan({
  text,
  style,
  className,
}: {
  text: string;
  style?: React.CSSProperties;
  className?: string;
}) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const offset = useRef({ x: 0, y: 0 });

  const startDrag = (clientX: number, clientY: number) => {
    setIsDragging(true);
    offset.current = {
      x: clientX - position.x,
      y: clientY - position.y,
    };
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    startDrag(e.clientX, e.clientY);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    startDrag(touch.clientX, touch.clientY);
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      setPosition({
        x: e.clientX - offset.current.x,
        y: e.clientY - offset.current.y,
      });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDragging) return;
      e.preventDefault();
      const touch = e.touches[0];
      setPosition({
        x: touch.clientX - offset.current.x,
        y: touch.clientY - offset.current.y,
      });
    };

    const handleTouchEnd = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
      window.addEventListener("touchmove", handleTouchMove, { passive: false });
      window.addEventListener("touchend", handleTouchEnd);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [isDragging]);

  return (
    <span
      className={`draggable-word ${className || ""}`}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
      style={{
        ...style,
        transform: `translate3d(${position.x}px, ${position.y}px, 0) ${style?.transform || ""}`,
      }}
    >
      {text}
    </span>
  );
}

function DraggableWord({
  word,
  isAmber,
  isAccented,
}: {
  word: string;
  isAmber?: boolean;
  isAccented?: boolean;
}) {
  const [text, punct] = splitPunctuation(word);

  const isHighlighted = isAmber || isAccented;

  const textClassName = `transition-colors duration-500 ${
    isHighlighted ? "text-[#9E7300]" : "text-primary"
  }`;

  if (!punct) {
    return <DraggableSpan text={text} className={textClassName} />;
  }

  return (
    <span style={{ display: "inline-flex", alignItems: "baseline" }}>
      <DraggableSpan
        text={text}
        className={textClassName}
        style={{ marginRight: 0 }}
      />
      <DraggableSpan
        text={punct}
        className="text-primary/40"
        style={{ marginRight: 0 }}
      />
    </span>
  );
}

export default function Home() {
  const { hoveredLink } = useNavHover();
  const h1Ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const el = h1Ref.current;
    if (!el) return;
    const onTouchStart = (e: TouchEvent) => {
      if ((e.target as Element).closest(".draggable-word")) {
        e.preventDefault();
      }
    };
    el.addEventListener("touchstart", onTouchStart, { passive: false });
    return () => el.removeEventListener("touchstart", onTouchStart);
  }, []);

  return (
    <main className="min-h-screen px-8 md:px-16 flex flex-col justify-center pt-24 pb-[20vh] relative overflow-hidden">
      <section className="w-full max-w-5xl z-10">
        <h1
          ref={h1Ref}
          className="font-headline text-5xl md:text-6xl lg:text-7xl tracking-tight leading-[1.1] canvas-text"
        >
          {words.map((word, i) => {
            const isAndrewHachten = i === 4 || i === 5;
            const isSoftwareEngineer = i === 8 || i === 9;
            const isBaker = i === 10;
            const isCandlemaker = i === 12;
            const isPhiladelphia = i === 15;

            const isAccented =
              (hoveredLink === "Projects" && isSoftwareEngineer) ||
              (hoveredLink === "Recipes" && isBaker) ||
              (hoveredLink === "About" &&
                (isSoftwareEngineer ||
                  isBaker ||
                  isCandlemaker ||
                  isPhiladelphia)) ||
              (hoveredLink === "Resume" && isSoftwareEngineer);

            return (
              <DraggableWord
                key={i}
                word={word}
                isAmber={isAndrewHachten}
                isAccented={isAccented}
              />
            );
          })}
        </h1>
      </section>
    </main>
  );
}
