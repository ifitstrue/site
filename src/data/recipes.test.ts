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
});
