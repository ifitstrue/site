import { describe, expect, it } from "vitest";
import { movePosition, tokenizeDraggableText } from "./draggableText";

describe("tokenizeDraggableText", () => {
  it("keeps contractions whole and separates trailing punctuation", () => {
    expect(tokenizeDraggableText("Hi, I'm Andrew!", "heading")).toEqual([
      { id: "heading-0", text: "Hi", kind: "word" },
      { id: "heading-1", text: ",", kind: "punctuation" },
      { id: "heading-2", text: "I'm", kind: "word" },
      { id: "heading-3", text: "Andrew", kind: "word" },
      { id: "heading-4", text: "!", kind: "punctuation" },
    ]);
  });

  it("separates every supported punctuation mark", () => {
    const punctuation = tokenizeDraggableText(
      "Wait, stop. Note: okay; Why? Yes!",
      "body",
    ).filter(({ kind }) => kind === "punctuation");

    expect(punctuation.map(({ text }) => text)).toEqual([",", ".", ":", ";", "?", "!"]);
  });

  it("uses stable ids from the prefix and token order", () => {
    expect(tokenizeDraggableText("One two", "intro").map(({ id }) => id)).toEqual([
      "intro-0",
      "intro-1",
    ]);
  });
});

describe("movePosition", () => {
  it("moves by five pixels with an arrow key", () => {
    expect(movePosition({ x: 10, y: 10 }, "ArrowLeft", false)).toEqual({ x: 5, y: 10 });
    expect(movePosition({ x: 10, y: 10 }, "ArrowDown", false)).toEqual({ x: 10, y: 15 });
  });

  it("moves by twenty pixels while Shift is held", () => {
    expect(movePosition({ x: 10, y: 10 }, "ArrowRight", true)).toEqual({ x: 30, y: 10 });
    expect(movePosition({ x: 10, y: 10 }, "ArrowUp", true)).toEqual({ x: 10, y: -10 });
  });

  it("resets the selected token with Home", () => {
    expect(movePosition({ x: 42, y: -17 }, "Home", false)).toEqual({ x: 0, y: 0 });
  });
});
