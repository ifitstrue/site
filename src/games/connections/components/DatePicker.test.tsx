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

  it("wraps Tab from the roving date to the first dialog control", () => {
    render(
      <DatePicker
        value="2026-09-15"
        today="2026-10-12"
        isOpen
        onClose={vi.fn()}
        onSelect={vi.fn()}
      />,
    );
    const selected = screen.getByRole("button", { name: "September 15, 2026" });
    selected.focus();
    fireEvent.keyDown(selected, { key: "Tab" });
    expect(document.activeElement).toBe(screen.getByRole("button", { name: "Previous month" }));
  });

  it("retains a tabbable, focused date when changing months", async () => {
    render(
      <DatePicker
        value="2026-09-15"
        today="2026-10-12"
        isOpen
        onClose={vi.fn()}
        onSelect={vi.fn()}
      />,
    );
    fireEvent.click(screen.getByRole("button", { name: "Previous month" }));
    const augustDate = screen.getByRole("button", { name: "August 15, 2026" });
    await waitFor(() => expect(document.activeElement).toBe(augustDate));
    expect(augustDate.getAttribute("tabindex")).toBe("0");
  });

  it("retains a tabbable, focused date after choosing a year", async () => {
    render(
      <DatePicker
        value="2026-09-15"
        today="2026-10-12"
        isOpen
        onClose={vi.fn()}
        onSelect={vi.fn()}
      />,
    );
    fireEvent.click(screen.getByRole("button", { name: "Show year picker" }));
    fireEvent.click(screen.getByRole("button", { name: "2025" }));
    const priorYearDate = screen.getByRole("button", { name: "September 15, 2025" });
    await waitFor(() => expect(document.activeElement).toBe(priorYearDate));
    expect(priorYearDate.getAttribute("tabindex")).toBe("0");
  });
});
