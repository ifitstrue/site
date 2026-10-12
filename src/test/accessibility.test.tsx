import axe from "axe-core";
import { render } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import { useGameStore } from "@/games/tictactoe/store";
import SuperBoard from "@/games/tictactoe/components/SuperBoard";

describe("automated accessibility checks", () => {
  beforeEach(() => useGameStore.getState().resetGame());

  it("finds no structural violations in the game board", async () => {
    const { container } = render(<SuperBoard />);
    const { violations } = await axe.run(container);
    expect(violations.map(({ id }) => id)).toEqual([]);
  });
});
