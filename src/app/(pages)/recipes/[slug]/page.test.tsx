import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import RecipePage from "./page";

describe("recipe page", () => {
  it("renders grouped method actions as lettered substeps", async () => {
    render(
      await RecipePage({
        params: Promise.resolve({ slug: "lemon-ricotta-coffee-cake" }),
      }),
    );

    const stage = screen.getByText("Make the cinnamon crumb topping.").parentElement;
    expect(stage).not.toBeNull();
    const list = within(stage!).getByRole("list");
    expect(list.classList.contains("list-[lower-alpha]")).toBe(true);
    expect(within(list).getAllByRole("listitem")).toHaveLength(4);
  });

  it("renders a recipe source as a labeled link", async () => {
    render(
      await RecipePage({
        params: Promise.resolve({ slug: "chocolate-chip-cookies" }),
      }),
    );

    expect(
      screen
        .getByRole("link", { name: "Laura Sandford's recipe here" })
        .getAttribute("href"),
    ).toBe("https://joyfoodsunshine.com/the-most-amazing-chocolate-chip-cookies/");
  });

  it("renders method asides separately from the numbered actions", async () => {
    render(
      await RecipePage({
        params: Promise.resolve({ slug: "chocolate-chip-cookies" }),
      }),
    );

    const aside = screen.getByText(
      "When making cookies, it's important to mix until just combined!",
    );
    expect(aside.tagName).toBe("BLOCKQUOTE");
  });
});
