import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import { useGameStore } from "../store";
import Cell from "./Cell";

describe("Cell", () => {
  beforeEach(() => useGameStore.getState().resetGame());

  it("is a named keyboard-operable button", () => {
    render(<Cell boardIndex={0} cellIndex={0} isEligible />);

    const cell = screen.getByRole("button", {
      name: "Board 1, square 1: empty",
    });
    expect(cell.hasAttribute("disabled")).toBe(false);
    fireEvent.click(cell);
    expect(useGameStore.getState().boards[0].cells[0].claimedBy).toBe(0);
  });

  it("disables ineligible cells", () => {
    render(<Cell boardIndex={0} cellIndex={0} isEligible={false} />);

    expect(
      screen.getByRole("button", { name: "Board 1, square 1: empty" }),
    ).toHaveProperty("disabled", true);
  });
});
