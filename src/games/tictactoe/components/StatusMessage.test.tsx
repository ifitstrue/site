import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import { useGameStore } from "../store";
import StatusMessage from "./StatusMessage";

describe("StatusMessage", () => {
  beforeEach(() => useGameStore.getState().resetGame());

  it("announces turn changes without interrupting the user", () => {
    render(<StatusMessage />);
    const status = screen.getByRole("status");
    expect(status.getAttribute("aria-live")).toBe("polite");
    expect(status.textContent).toContain("Player 1's turn");
  });
});
