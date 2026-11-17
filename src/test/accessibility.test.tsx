import axe from "axe-core";
import { render } from "@testing-library/react";
import { createElement, type ComponentType } from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import Home from "@/app/page";
import About from "@/app/(pages)/about/page";
import Resume from "@/app/(pages)/resume/page";
import { IdentityDialog } from "@/components/home/IdentityDialog";
import { DatePicker } from "@/games/connections/components/DatePicker";

const runAxe = (container: HTMLElement) =>
  axe.run(container, {
    rules: {
      "color-contrast": { enabled: false },
      "color-contrast-enhanced": { enabled: false },
    },
  });

describe("automated accessibility checks", () => {
  beforeEach(() => {
    vi.stubGlobal("matchMedia", vi.fn().mockImplementation((query: string) => ({
      media: query,
      matches: false,
      onchange: null,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      addListener: vi.fn(),
      removeListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })));
  });

  afterEach(() => vi.unstubAllGlobals());

  it.each([
    ["homepage", Home],
    ["About page", About],
  ] satisfies [string, ComponentType][]) ("finds no structural violations on the %s", async (_name, Page) => {
    const { container } = render(createElement(Page));
    const { violations } = await runAxe(container);
    expect(violations.map(({ id }) => id)).toEqual([]);
  });

  it("finds no structural violations in the rendered résumé document", async () => {
    const { container } = render(await Resume());

    expect(container.querySelector("h1")?.textContent).toBe("Andrew Hachten");
    const { violations } = await runAxe(container);
    expect(violations.map(({ id }) => id)).toEqual([]);
  });

  it("finds no structural violations in the open identity dialog", async () => {
    const { container } = render(
      <>
        <main data-retro-page-content><button type="button">Trigger</button></main>
        <IdentityDialog open onClose={vi.fn()} />
      </>,
    );
    const { violations } = await runAxe(container);
    expect(violations.map(({ id }) => id)).toEqual([]);
  });

  it("finds no structural violations in the retained date picker", async () => {
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
});
