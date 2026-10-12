import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import { useGameStore } from "../store";
import PlayerEditor from "./PlayerEditor";

describe("PlayerEditor", () => {
  beforeEach(() => useGameStore.getState().resetGame());

  it("offers a named palette instead of an unrestricted color input", () => {
    render(<PlayerEditor playerId={0} index={0} />);
    const color = screen.getByLabelText("Color");
    expect(color.tagName).toBe("SELECT");
    expect(color.querySelectorAll("option").length).toBeGreaterThanOrEqual(4);
  });
});
