import { describe, expect, it } from "vitest";
import { CATEGORIES, RECIPES } from "./recipes";

describe("recipe catalogue", () => {
  it("publishes the approved replacement lineup", () => {
    expect(CATEGORIES.map((category) => ({
      label: category.label,
      titles: category.recipes.map((recipe) => recipe.title),
    }))).toEqual([
      {
        label: "Baking",
        titles: [
          "My Chocolate Chip Cookies",
          "Lemon Ricotta Coffee Cake with Sour Cherry Jam",
        ],
      },
      {
        label: "Syrups & Shrubs & Ferments",
        titles: [
          "Cucumber Mint Syrup",
          "Earl Gray Honey Syrup",
          "Lemon Super Juice",
          "Lime Super Juice",
        ],
      },
    ]);
  });

  it.each(["lemon-super-juice", "lime-super-juice"])(
    "%s rests the peel mixture for about 30 minutes before blending",
    (slug) => {
      const instructions = RECIPES[slug].steps.map((step) => step.instruction);
      const restStep = instructions.findIndex((instruction) =>
        instruction.includes("30 minutes"),
      );
      const blendStep = instructions.findIndex((instruction) =>
        instruction.includes("blend"),
      );

      expect(restStep).toBeGreaterThanOrEqual(0);
      expect(blendStep).toBeGreaterThan(restStep);
    },
  );

  it("preserves the Earl Gray Honey Syrup method verbatim", () => {
    const recipe = RECIPES["earl-gray-honey-syrup"];

    expect(recipe).not.toHaveProperty("description");
    expect(recipe).not.toHaveProperty("lede");
    expect(recipe).not.toHaveProperty("yield");
    expect(recipe).not.toHaveProperty("prepTime");
    expect(recipe.steps).toEqual([
      { instruction: "Heat the water to just off boiling" },
      { instruction: "Add the 4 Earl Grey tea bags" },
      { instruction: "Wait 5-6 minutes for the tea to steep" },
      { instruction: "Remove the tea bags" },
      { instruction: "Add the honey, and stir until combined" },
    ]);
  });

  it("preserves the coffee cake's authored section headings and instructions", () => {
    const recipe = RECIPES["lemon-ricotta-coffee-cake"];

    expect(recipe.steps[2]).toEqual({
      heading: "Make Lemon Sugar",
      instruction: "Combine the lemon zest with the sugar in a small bowl",
    });
    expect(recipe.steps.at(-1)).toEqual({
      heading: "Bake",
      instruction:
        "Bake for another 30-35 minutes, until a toothpick inserted into the center comes out clean",
    });
  });

  it("keeps Andrew's cookie notes in Andrew's words", () => {
    const recipe = RECIPES["chocolate-chip-cookies"];
    const authoredText = [
      recipe.lede,
      ...recipe.steps.map((step) => step.instruction),
    ].join("\n");

    expect(authoredText).toContain(
      "I make it with a few changes, form the cookie dough balls, then freeze them to bake on demand.",
    );
    expect(authoredText).toContain(
      "Chilled dough is super important for cookies!!",
    );
    expect(authoredText).toContain(
      "I use a hand mixer because it works just as well as my stand mixer for this",
    );
  });
});
