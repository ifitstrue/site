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
          "Earl Grey Honey Syrup",
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

  it("keeps the Earl Grey Honey Syrup method complete and concise", () => {
    const recipe = RECIPES["earl-gray-honey-syrup"];

    expect(recipe).not.toHaveProperty("description");
    expect(recipe).not.toHaveProperty("lede");
    expect(recipe).not.toHaveProperty("yield");
    expect(recipe).not.toHaveProperty("prepTime");
    expect(recipe.steps).toEqual([
      { instruction: "Heat the water to just off boiling." },
      { instruction: "Add the Earl Grey tea bags." },
      { instruction: "Wait 5-6 minutes for the tea to steep." },
      { instruction: "Remove the tea bags." },
      { instruction: "Add the honey and stir until combined." },
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

  it("presents the cookie recipe as a standalone web recipe", () => {
    const recipe = RECIPES["chocolate-chip-cookies"];
    const authoredText = [
      recipe.lede,
      ...recipe.steps.map((step) => step.instruction),
    ].join("\n");

    expect(authoredText).toContain(
      "I form the cookie dough balls, then freeze them to bake on demand.",
    );
    expect(authoredText).toContain(
      "Chilled dough is super important for cookies!!",
    );
    expect(authoredText).toContain(
      "I use a hand mixer because it works just as well as my stand mixer for this",
    );
    expect(authoredText).not.toContain("Hi!");
    expect(authoredText).not.toContain("the recipe says");
    expect(authoredText).not.toContain("2tsp vanilla extract:");
    expect(authoredText).not.toContain("12oz chocolate chips:");
    expect(recipe.steps[0].instruction).toContain("room temperature");
    expect(recipe.steps.at(-1)?.instruction).toContain("Bake for 13-15 minutes");
  });

  it("does not publish contradictory or text-message-only copy", () => {
    const allText = JSON.stringify(RECIPES);
    const streuselButter = RECIPES["lemon-ricotta-coffee-cake"].ingredients.find(
      (ingredient) => ingredient.amount === "42g" && ingredient.name === "butter",
    );

    expect(streuselButter?.note).toBe("cold and cubed");
    expect(allText).not.toContain("rougly");
    expect(allText).not.toContain("1.33 cups");
    expect(RECIPES["cucumber-mint-syrup"].description).toBe(
      "A mint syrup with cucumber juice added in.",
    );
    expect(RECIPES["cucumber-mint-syrup"].lede).not.toContain("1:1");
  });
});
