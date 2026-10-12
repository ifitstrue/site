import axe from "axe-core";
import { render } from "@testing-library/react";
import { afterAll, beforeAll, beforeEach, describe, expect, it, vi } from "vitest";
import { useGameStore } from "@/games/tictactoe/store";
import SuperBoard from "@/games/tictactoe/components/SuperBoard";
import PlayerEditor from "@/games/tictactoe/components/PlayerEditor";
import { DatePicker } from "@/games/connections/components/DatePicker";
import { Modal } from "@/components/ui/Modal";

const runAxe = (container: HTMLElement) =>
  axe.run(container, {
    rules: {
      "color-contrast": { enabled: false },
      "color-contrast-enhanced": { enabled: false },
    },
  });

const originalCanvasContext = Object.getOwnPropertyDescriptor(
  HTMLCanvasElement.prototype,
  "getContext",
);

beforeAll(() => {
  Object.defineProperty(HTMLCanvasElement.prototype, "getContext", {
    configurable: true,
    value() {
      return {
        canvas: this,
        measureText: (text: string) => ({ width: text.length * 10 }),
      };
    },
  });
});

afterAll(() => {
  if (originalCanvasContext) {
    Object.defineProperty(HTMLCanvasElement.prototype, "getContext", originalCanvasContext);
  }
});

describe("automated accessibility checks", () => {
  beforeEach(() => useGameStore.getState().resetGame());

  it("finds no structural violations in the game board", async () => {
    const { container } = render(<SuperBoard />);
    const { violations } = await runAxe(container);
    expect(violations.map(({ id }) => id)).toEqual([]);
  });

  it("finds no structural violations in the date picker", async () => {
    const { container } = render(
      <DatePicker
        value="2026-10-12"
        today="2026-10-12"
        isOpen
        onClose={vi.fn()}
        onSelect={vi.fn()}
      />,
    );
    const { violations } = await runAxe(container);
    expect(violations.map(({ id }) => id)).toEqual([]);
  });

  it("finds no structural violations in player settings", async () => {
    const { container } = render(<PlayerEditor playerId={0} index={0} />);
    const { violations } = await runAxe(container);
    expect(violations.map(({ id }) => id)).toEqual([]);
  });

  it("labels a modal even when no visible title is supplied", async () => {
    const { container } = render(
      <Modal isOpen onClose={vi.fn()}><button type="button">Action</button></Modal>,
    );
    const { violations } = await runAxe(container);
    expect(violations.map(({ id }) => id)).toEqual([]);
  });
});
