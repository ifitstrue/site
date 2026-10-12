import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { DatePicker } from "./DatePicker";

describe("DatePicker keyboard navigation", () => {
  it("uses one tabbable date and arrow keys to move by day", () => {
    render(
      <DatePicker
        value="2026-10-12"
        today="2026-10-12"
        isOpen
        onClose={vi.fn()}
        onSelect={vi.fn()}
      />,
    );

    const selected = screen.getByRole("button", { name: "October 12, 2026" });
    const previous = screen.getByRole("button", { name: "October 11, 2026" });
    expect(selected.getAttribute("tabindex")).toBe("0");
    expect(previous.getAttribute("tabindex")).toBe("-1");

    selected.focus();
    fireEvent.keyDown(selected, { key: "ArrowLeft" });
    expect(document.activeElement).toBe(previous);
    expect(previous.getAttribute("tabindex")).toBe("0");
  });

  it("moves focus into the year choices when changing picker modes", async () => {
    render(
      <DatePicker
        value="2026-10-12"
        today="2026-10-12"
        isOpen
        onClose={vi.fn()}
        onSelect={vi.fn()}
      />,
    );

    fireEvent.click(screen.getByRole("button", { name: "Show year picker" }));
    await waitFor(() => expect(document.activeElement).toBe(screen.getByRole("button", { name: "2026" })));
  });
});
