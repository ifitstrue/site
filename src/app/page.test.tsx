import { act, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import Home from "./page";

type MatchMediaListener = (event: MediaQueryListEvent) => void;

function installMatchMedia(initialMatches = true) {
  let matches = initialMatches;
  const listeners = new Set<MatchMediaListener>();
  vi.stubGlobal("matchMedia", vi.fn().mockImplementation((query: string) => ({
    media: query,
    get matches() { return matches; },
    onchange: null,
    addEventListener: (_type: string, listener: MatchMediaListener) => listeners.add(listener),
    removeEventListener: (_type: string, listener: MatchMediaListener) => listeners.delete(listener),
    addListener: () => undefined,
    removeListener: () => undefined,
    dispatchEvent: () => true,
  })));
  return (nextMatches: boolean) => {
    matches = nextMatches;
    listeners.forEach((listener) => listener({ matches } as MediaQueryListEvent));
  };
}

function installIdentityRects(ratios: Record<"projects" | "recipes" | "candles", number>) {
  return vi.spyOn(HTMLElement.prototype, "getBoundingClientRect").mockImplementation(function (this: HTMLElement) {
    const identityWord = this.dataset.identityWord as keyof typeof ratios | undefined;
    if (identityWord) {
      return { left: 0, top: 0, right: 100, bottom: 20, width: 100, height: 20 } as DOMRect;
    }
    const destination = this.dataset.destination as keyof typeof ratios | undefined;
    if (destination) {
      const left = 100 - ratios[destination] * 100;
      return { left, top: 0, right: left + 100, bottom: 20, width: 100, height: 20 } as DOMRect;
    }
    return { left: 0, top: 0, right: 0, bottom: 0, width: 0, height: 0 } as DOMRect;
  });
}

beforeEach(() => {
  vi.useFakeTimers();
  installMatchMedia();
});

afterEach(() => {
  vi.useRealTimers();
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe("personal homepage", () => {
  it("renders the approved introduction and About invitation", () => {
    const { container } = render(<Home />);

    expect(screen.getByText("Andrew Hachten’s Home Page")).toBeTruthy();
    expect(screen.getByRole("heading", { name: "Hi, I'm Andrew!" })).toBeTruthy();
    expect(screen.getByText("I'm a software engineer, baker, and candlemaker living in Philadelphia. You can find links to my projects, recipes, and candles here! You can also move all of these words around, if you want.")).toBeTruthy();
    const about = screen.getByRole("link", { name: /Who’s making all this\? Meet Andrew/i });
    expect(about.getAttribute("href")).toBe("/about");
    expect(container.querySelector("footer")).toBeNull();
  });

  it("renders exactly the three external destinations without explanatory copy", () => {
    render(<Home />);

    expect(screen.getByRole("heading", { name: "If It’s True" })).toBeTruthy();
    expect(screen.getByRole("heading", { name: "Edge Case Recipes" })).toBeTruthy();
    expect(screen.getByRole("heading", { name: "Sleeping Stone" })).toBeTruthy();
    expect(screen.getAllByRole("link", { name: "Visit ↗" })).toHaveLength(3);
    expect(screen.queryByText("Elsewhere on the internet")).toBeNull();
    expect(screen.queryByText("The other places where I make things.")).toBeNull();
  });

  it("does not add conventional navigation or a Resume link", () => {
    render(<Home />);
    expect(screen.queryByRole("navigation")).toBeNull();
    expect(screen.queryByRole("link", { name: /resume|résumé/i })).toBeNull();
  });

  it("uses a responsive destination grid and wrapping card headings", () => {
    const { container } = render(<Home />);
    const grid = container.querySelector(".retro-destinations-grid");
    expect(grid?.classList.contains("retro-destinations-grid--responsive")).toBe(true);
    expect(container.querySelectorAll(".retro-destination-heading--wrapping")).toHaveLength(3);
  });
});

describe("identity Easter egg", () => {
  it("requires every word to reach sixty percent overlap for 1.5 seconds", () => {
    installIdentityRects({ projects: 0.59, recipes: 1, candles: 1 });
    render(<Home />);

    act(() => vi.advanceTimersByTime(2000));
    expect(screen.queryByRole("alertdialog")).toBeNull();
  });

  it("triggers once after the full dwell and applies the transformed copy", () => {
    installIdentityRects({ projects: 0.6, recipes: 1, candles: 1 });
    render(<Home />);

    act(() => vi.advanceTimersByTime(1499));
    expect(screen.queryByRole("alertdialog")).toBeNull();
    act(() => vi.advanceTimersByTime(1));

    expect(screen.getByRole("alertdialog")).toBeTruthy();
    expect(screen.getByRole("heading", { name: "Hi, you're Andrew!" })).toBeTruthy();
    expect(screen.getByText("You're a software engineer, baker, and candlemaker living in Philadelphia. I can find links to your projects, recipes, and candles here! I can also move all of these words around, if I want.")).toBeTruthy();
    expect(screen.getByRole("link", { name: /Meet Yourself/i })).toBeTruthy();
    expect(screen.getByText("Your games, tools, and other projects.")).toBeTruthy();

    fireEvent.click(screen.getByRole("button", { name: "OK" }));
    fireEvent.keyDown(screen.getByRole("group", { name: /Move words/i }), { key: "ArrowRight" });
    fireEvent.keyDown(screen.getByRole("group", { name: /Move words/i }), { key: "Home" });
    act(() => vi.advanceTimersByTime(2000));
    expect(screen.queryByRole("alertdialog")).toBeNull();
  });

  it("cancels the timer when a word leaves its target", () => {
    const ratios = { projects: 1, recipes: 1, candles: 1 };
    installIdentityRects(ratios);
    render(<Home />);

    ratios.projects = 0.59;
    fireEvent.keyDown(screen.getByRole("group", { name: /Move words/i }), { key: "ArrowRight" });
    act(() => vi.advanceTimersByTime(2000));
    expect(screen.queryByRole("alertdialog")).toBeNull();
  });

  it("cancels the timer when target dragging is cancelled", () => {
    installIdentityRects({ projects: 1, recipes: 1, candles: 1 });
    render(<Home />);

    fireEvent.pointerCancel(screen.getByTestId("identity-word-projects"));
    act(() => vi.advanceTimersByTime(2000));
    expect(screen.queryByRole("alertdialog")).toBeNull();
  });

  it("cancels the timer when the viewport stops matching desktop", () => {
    const setDesktop = installMatchMedia(true);
    installIdentityRects({ projects: 1, recipes: 1, candles: 1 });
    render(<Home />);

    act(() => setDesktop(false));
    act(() => vi.advanceTimersByTime(2000));
    expect(screen.queryByRole("alertdialog")).toBeNull();
  });

  it("requires overlap to remain uninterrupted through a desktop resize", () => {
    installIdentityRects({ projects: 1, recipes: 1, candles: 1 });
    render(<Home />);

    fireEvent(window, new Event("resize"));
    act(() => vi.advanceTimersByTime(2000));
    expect(screen.queryByRole("alertdialog")).toBeNull();
  });

  it("resets the three target words without resetting other words", () => {
    installIdentityRects({ projects: 1, recipes: 1, candles: 1 });
    render(<Home />);
    const projects = screen.getByTestId("identity-word-projects");
    const recipes = screen.getByTestId("identity-word-recipes");
    const candles = screen.getByTestId("identity-word-candles");
    const hi = screen.getByTestId("token-heading-0");

    for (const [index, element] of [projects, recipes, candles, hi].entries()) {
      fireEvent.pointerDown(element, { pointerId: index + 1, clientX: 0, clientY: 0 });
      fireEvent.pointerMove(element, { pointerId: index + 1, clientX: 20, clientY: 10 });
      fireEvent.pointerUp(element, { pointerId: index + 1 });
    }
    act(() => vi.advanceTimersByTime(1500));

    expect(projects.style.transform).toBe("translate3d(0px, 0px, 0)");
    expect(recipes.style.transform).toBe("translate3d(0px, 0px, 0)");
    expect(candles.style.transform).toBe("translate3d(0px, 0px, 0)");
    expect(hi.style.transform).toBe("translate3d(20px, 10px, 0)");
  });
});
