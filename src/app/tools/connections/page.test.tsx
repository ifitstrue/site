import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import ConnectionsHintPage from "./page";

vi.mock("@/games/connections/hooks/usePuzzle", () => ({
  usePuzzle: () => ({
    loading: false,
    error: null,
    puzzle: {
      categories: [
        { level: 0, title: "TEST GROUP", cards: [{ content: "ALPHA" }, { content: "BETA" }] },
      ],
    },
  }),
}));

describe("ConnectionsHintPage", () => {
  it("announces the word revealed by a hint", () => {
    render(<ConnectionsHintPage />);
    fireEvent.click(screen.getByRole("button", { name: "Hint" }));
    expect(screen.getByRole("status").textContent).toContain("ALPHA");
  });
});
