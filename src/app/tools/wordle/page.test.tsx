import { fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import WordleHintPage from "./page";

describe("WordleHintPage", () => {
  afterEach(() => vi.unstubAllGlobals());

  it("uses mobile-friendly letter inputs with separately operable color controls", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(
        new Response(JSON.stringify({ solution: "rebut" }), { status: 200 }),
      ),
    );
    render(<WordleHintPage />);

    const inputs = await screen.findAllByRole("textbox", { name: /letter at position/i });
    expect(inputs).toHaveLength(5);
    expect(inputs[0].getAttribute("maxlength")).toBe("1");
    expect(inputs[0].getAttribute("inputmode")).toBe("text");

    fireEvent.change(inputs[0], { target: { value: "r" } });
    expect((inputs[0] as HTMLInputElement).value).toBe("R");

    const colorControl = screen.getByRole("button", {
      name: "Position 1 color: no color. Change color",
    });
    fireEvent.click(colorControl);
    expect(
      screen.getByRole("button", {
        name: "Position 1 color: green. Change color",
      }),
    ).toBeTruthy();
  });
});
