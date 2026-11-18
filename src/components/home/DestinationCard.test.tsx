import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { DestinationCard } from "./DestinationCard";
import {
  HOME_DESTINATIONS,
  INITIAL_COPY,
  TRANSFORMED_COPY,
} from "./homeContent";

describe("homepage destination content", () => {
  it("defines the approved initial and transformed introduction copy", () => {
    expect(INITIAL_COPY).toEqual({
      heading: "Hi, I'm Andrew!",
      body: "I'm a software engineer, baker, and candlemaker living in Philadelphia. You can find links to my projects, recipes, and candles here! You can also move all of these words around, if you want.",
    });
    expect(TRANSFORMED_COPY).toEqual({
      heading: "Hi, you're Andrew!",
      body: "You're a software engineer, baker, and candlemaker living in Philadelphia. I can find links to your projects, recipes, and candles here! I can also move all of these words around, if I want.",
    });
  });

  it("defines exactly the three approved destinations", () => {
    expect(HOME_DESTINATIONS.map(({ key }) => key)).toEqual([
      "projects",
      "recipes",
      "candles",
    ]);
    expect(HOME_DESTINATIONS.map(({ title, description, href }) => ({
      title,
      description,
      href,
    }))).toEqual([
      {
        title: "If It’s True",
        description: "My games, tools, and other projects.",
        href: "https://ifitstrue.dev",
      },
      {
        title: "Edge Case Recipes",
        description: "My baking and cocktail recipes.",
        href: "https://edgecase.recipes",
      },
      {
        title: "Sleeping Stone",
        description: "Candle company I started, with candles inspired by poetry and nature.",
        href: "https://www.sleepingstonecandles.com/",
      },
    ]);
  });
});

describe("DestinationCard", () => {
  it.each(HOME_DESTINATIONS)("renders $title as a same-tab external destination", (destination) => {
    render(<DestinationCard destination={destination} transformed={false} />);

    expect(screen.getByRole("heading", { name: destination.title })).toBeTruthy();
    expect(screen.getByText(destination.description)).toBeTruthy();
    const link = screen.getByRole("link", { name: "Visit ↗" });
    expect(link.getAttribute("href")).toBe(destination.href);
    expect(link.getAttribute("target")).toBeNull();
  });

  it("puts the title and action in one row", () => {
    const { container } = render(
      <DestinationCard destination={HOME_DESTINATIONS[1]} transformed={false} />,
    );
    const row = container.querySelector(".retro-destination-heading");
    expect(row).not.toBeNull();
    expect((row as HTMLElement).style.width).toBe("");
  });

  it("links the Sleeping Stone logo to the candle site", () => {
    const { container } = render(
      <DestinationCard destination={HOME_DESTINATIONS[2]} transformed={false} />,
    );
    const logoLink = screen.getByRole("link", { name: "Sleeping Stone" });
    const logo = container.querySelector("img");

    expect(logoLink.getAttribute("href")).toBe(HOME_DESTINATIONS[2].href);
    expect(logoLink.getAttribute("target")).toBeNull();
    expect(logo?.getAttribute("alt")).toBe("");
    expect(logo?.getAttribute("src")).toContain("sleeping-stone-primary-logo.svg");
  });

  it("renders the If It’s True preview as the approved live-text wordmark", () => {
    render(<DestinationCard destination={HOME_DESTINATIONS[0]} transformed={false} />);

    const wordmark = screen.getByRole("link", { name: "If It's True" });
    expect(wordmark.getAttribute("href")).toBe("https://ifitstrue.dev/");
    expect(wordmark.classList.contains("ift-wordmark")).toBe(true);
    expect(wordmark.innerHTML).toBe("if<br>it’s<br>true.");
  });

  it("renders the Edge Case Recipes preview as the approved live-text wordmark", () => {
    render(<DestinationCard destination={HOME_DESTINATIONS[1]} transformed={false} />);

    const wordmark = screen.getByRole("link", { name: "Edge Case Recipes" });
    expect(wordmark.getAttribute("href")).toBe("https://edgecase.recipes/");
    expect(wordmark.classList.contains("ec-wordmark")).toBe(true);
    expect(wordmark.querySelector(".ec-wordmark__words")?.textContent).toBe("edgecase");
    expect(wordmark.querySelector(".ec-wordmark__descriptor")?.textContent?.trim()).toBe("recipes");
  });

  it("uses the transformed description after the identity change", () => {
    render(<DestinationCard destination={HOME_DESTINATIONS[0]} transformed />);
    expect(screen.getByText("Your games, tools, and other projects.")).toBeTruthy();
  });
});
