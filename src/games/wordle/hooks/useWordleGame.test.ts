import { describe, it, expect, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useWordleGame } from "./useWordleGame";

describe("useWordleGame", () => {
  beforeEach(() => {
    const { result } = renderHook(() => useWordleGame());
    act(() => result.current.initGame("plume"));
  });

  it("addLetter appends up to 5 letters", () => {
    const { result } = renderHook(() => useWordleGame());
    act(() => result.current.initGame("plume"));

    act(() => result.current.addLetter("c"));
    act(() => result.current.addLetter("l"));
    act(() => result.current.addLetter("o"));
    act(() => result.current.addLetter("u"));
    act(() => result.current.addLetter("d"));
    act(() => result.current.addLetter("x")); // 6th letter ignored
    expect(result.current.currentGuess).toBe("cloud");
  });

  it("deleteLetter removes the last letter", () => {
    const { result } = renderHook(() => useWordleGame());
    act(() => result.current.initGame("plume"));
    act(() => result.current.addLetter("c"));
    act(() => result.current.addLetter("l"));
    act(() => result.current.deleteLetter());
    expect(result.current.currentGuess).toBe("c");
  });

  it("submitGuess with correct word wins the game", () => {
    const { result } = renderHook(() => useWordleGame());
    act(() => result.current.initGame("plume"));
    "plume".split("").forEach((ch) => act(() => result.current.addLetter(ch)));
    act(() => result.current.submitGuess());
    expect(result.current.gameStatus).toBe("won");
  });

  it("submitGuess with wrong word updates guesses and stays playing", () => {
    const { result } = renderHook(() => useWordleGame());
    act(() => result.current.initGame("plume"));
    "cloud".split("").forEach((ch) => act(() => result.current.addLetter(ch)));
    act(() => result.current.submitGuess());
    expect(result.current.guesses).toHaveLength(1);
    expect(result.current.currentGuess).toBe("");
    expect(result.current.gameStatus).toBe("playing");
  });

  it("submitGuess after 6 wrong guesses loses the game", () => {
    const { result } = renderHook(() => useWordleGame());
    act(() => result.current.initGame("plume"));
    const words = ["cloud", "drain", "brick", "fault", "shamp", "xyzzy"];
    words.forEach((w) => {
      w.split("").forEach((ch) => act(() => result.current.addLetter(ch)));
      act(() => result.current.submitGuess());
    });
    expect(result.current.gameStatus).toBe("lost");
  });

  it("submitGuess is no-op with fewer than 5 letters", () => {
    const { result } = renderHook(() => useWordleGame());
    act(() => result.current.initGame("plume"));
    act(() => result.current.addLetter("a"));
    const before = result.current.guesses.length;
    act(() => result.current.submitGuess());
    expect(result.current.guesses.length).toBe(before);
  });

  it("submitGuess is no-op when game is won or lost", () => {
    const { result } = renderHook(() => useWordleGame());
    act(() => result.current.initGame("plume"));
    "plume".split("").forEach((ch) => act(() => result.current.addLetter(ch)));
    act(() => result.current.submitGuess());
    expect(result.current.gameStatus).toBe("won");

    // try submitting again, should not change anything
    act(() => result.current.addLetter("c"));
    act(() => result.current.submitGuess());
    expect(result.current.guesses).toHaveLength(1);
  });

  it("keyboardState is updated after a guess", () => {
    const { result } = renderHook(() => useWordleGame());
    act(() => result.current.initGame("plume"));
    "puled".split("").forEach((ch) => act(() => result.current.addLetter(ch)));
    act(() => result.current.submitGuess());
    // p=correct, u=present, l=present, e=present, d=absent
    expect(result.current.keyboardState["p"]).toBe("correct");
    expect(result.current.keyboardState["u"]).toBe("present");
    expect(result.current.keyboardState["d"]).toBe("absent");
  });

  it("duplicate letters handled correctly (standard Wordle rules)", () => {
    const { result } = renderHook(() => useWordleGame());
    act(() => result.current.initGame("plume"));
    // guess "puppy" — p appears twice in guess but once in solution
    "puppy".split("").forEach((ch) => act(() => result.current.addLetter(ch)));
    act(() => result.current.submitGuess());
    // positions: p=correct, u=present, p=absent(extra), p=absent(extra), y=absent
    expect(result.current.keyboardState["p"]).toBe("correct");
    expect(result.current.keyboardState["u"]).toBe("present");
    expect(result.current.keyboardState["y"]).toBe("absent");
  });

  it("initGame resets all state", () => {
    const { result } = renderHook(() => useWordleGame());
    act(() => result.current.initGame("plume"));
    "plume".split("").forEach((ch) => act(() => result.current.addLetter(ch)));
    act(() => result.current.submitGuess());
    expect(result.current.gameStatus).toBe("won");

    act(() => result.current.initGame("crane"));
    expect(result.current.gameStatus).toBe("playing");
    expect(result.current.guesses).toHaveLength(0);
    expect(result.current.currentGuess).toBe("");
    expect(result.current.solution).toBe("crane");
  });

  it("feedbacks starts empty and populates after submitGuess", () => {
    const { result } = renderHook(() => useWordleGame());
    act(() => result.current.initGame("plume"));
    expect(result.current.feedbacks).toHaveLength(0);

    "cloud".split("").forEach((ch) => act(() => result.current.addLetter(ch)));
    act(() => result.current.submitGuess());
    expect(result.current.feedbacks).toHaveLength(1);
    // c=absent, l=correct, o=absent, u=present, d=absent
    expect(result.current.feedbacks[0]).toEqual(["absent", "correct", "absent", "present", "absent"]);
  });

  it("initGame resets feedbacks to empty", () => {
    const { result } = renderHook(() => useWordleGame());
    act(() => result.current.initGame("plume"));
    "cloud".split("").forEach((ch) => act(() => result.current.addLetter(ch)));
    act(() => result.current.submitGuess());
    expect(result.current.feedbacks).toHaveLength(1);

    act(() => result.current.initGame("crane"));
    expect(result.current.feedbacks).toHaveLength(0);
  });
});
