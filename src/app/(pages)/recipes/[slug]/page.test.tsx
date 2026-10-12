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

    const title = screen.getByRole("heading", {
      name: "Make the cinnamon crumb topping.",
    });
    const stage = title.parentElement;
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

  it("emits Recipe structured data", async () => {
    const { container } = render(
      await RecipePage({
        params: Promise.resolve({ slug: "chocolate-chip-cookies" }),
      }),
    );

    const script = container.querySelector('script[type="application/ld+json"]');
    expect(script).not.toBeNull();
    const recipe = JSON.parse(script!.textContent!);
    expect(recipe["@type"]).toBe("Recipe");
    expect(recipe.name).toBe("My Chocolate Chip Cookies");
    expect(recipe.recipeIngredient).toContain("227g salted butter (softened)");
    expect(recipe.recipeInstructions[0]).toEqual({
      "@type": "HowToStep",
      text: "Bring the eggs to room temperature. I like putting them in a bowl of room-temperature water for 5-10 minutes.",
    });
  });

  it("does not repeat the two-tray baking instruction", async () => {
    render(
      await RecipePage({
        params: Promise.resolve({ slug: "chocolate-chip-cookies" }),
      }),
    );

    expect(
      screen.getAllByText(/If you're baking two trays, bake them for the full 16 minutes/),
    ).toHaveLength(1);
  });
});
