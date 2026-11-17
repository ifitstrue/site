import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { useState } from "react";
import { describe, expect, it } from "vitest";
import { IdentityDialog } from "./IdentityDialog";

function DialogHarness() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <a href="#main-content" data-dialog-background>Skip to main content</a>
      <header data-dialog-background>Header</header>
      <main data-retro-page-content data-dialog-background>
        <button type="button" onClick={() => setOpen(true)}>
          Trigger
        </button>
      </main>
      <IdentityDialog open={open} onClose={() => setOpen(false)} />
    </>
  );
}

describe("IdentityDialog", () => {
  it("renders the approved alert and moves focus to OK", async () => {
    render(<DialogHarness />);
    fireEvent.click(screen.getByRole("button", { name: "Trigger" }));

    expect(screen.getByRole("alertdialog", { name: "Identity Update" })).toBeTruthy();
    expect(screen.getByText("Congratulations! You are now Andrew Hachten.")).toBeTruthy();
    await waitFor(() => expect(document.activeElement).toBe(screen.getByRole("button", { name: "OK" })));
    expect(document.querySelector("[data-retro-page-content]")?.hasAttribute("inert")).toBe(true);
    expect(document.querySelector("header")?.hasAttribute("inert")).toBe(true);
    expect(document.querySelector("a")?.hasAttribute("inert")).toBe(true);
  });

  it("closes with OK and restores focus", async () => {
    render(<DialogHarness />);
    const trigger = screen.getByRole("button", { name: "Trigger" });
    trigger.focus();
    fireEvent.click(trigger);
    fireEvent.click(screen.getByRole("button", { name: "OK" }));

    expect(screen.queryByRole("alertdialog")).toBeNull();
    await waitFor(() => expect(document.activeElement).toBe(trigger));
    expect(document.querySelector("[data-retro-page-content]")?.hasAttribute("inert")).toBe(false);
  });

  it("closes with Escape", async () => {
    render(<DialogHarness />);
    const trigger = screen.getByRole("button", { name: "Trigger" });
    trigger.focus();
    fireEvent.click(trigger);
    fireEvent.keyDown(screen.getByRole("alertdialog"), { key: "Escape" });

    expect(screen.queryByRole("alertdialog")).toBeNull();
    await waitFor(() => expect(document.activeElement).toBe(trigger));
    expect(document.querySelectorAll("[inert]")).toHaveLength(0);
  });
});
