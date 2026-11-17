import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Home from "./page";

describe("personal homepage", () => {
  it("renders the approved introduction and About invitation", () => {
    const { container } = render(<Home />);

    expect(screen.getByText("Andrew Hachten’s Home Page")).toBeTruthy();
    expect(
      screen.getByText(
        "Hi, I'm Andrew! I'm a software engineer, baker, and candlemaker living in Philadelphia. You can find links to my projects, recipes, and candles here! You can also move all of these words around, if you want.",
      ),
    ).toBeTruthy();
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
