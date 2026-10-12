import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import { useGameStore } from "../store";
import SuperBoard from "./SuperBoard";

describe("SuperBoard keyboard navigation", () => {
  beforeEach(() => useGameStore.getState().resetGame());

  it("keeps one playable square in the tab order and moves with arrow keys", () => {
    render(<SuperBoard />);
    const first = screen.getByRole("button", { name: "Board 1, square 1: empty" });
    const second = screen.getByRole("button", { name: "Board 1, square 2: empty" });

    expect(first.getAttribute("tabindex")).toBe("0");
    expect(second.getAttribute("tabindex")).toBe("-1");

    first.focus();
    fireEvent.keyDown(first, { key: "ArrowRight" });
    expect(document.activeElement).toBe(second);
    expect(second.getAttribute("tabindex")).toBe("0");
  });
});
