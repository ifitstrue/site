import { describe, expect, it } from "vitest";
import { CATEGORIES, RECIPES } from "./recipes";

describe("recipe catalogue", () => {
  const methodText = (slug: string) =>
    RECIPES[slug].steps
      .flatMap((step) => [step.instruction, ...(step.substeps ?? [])])
      .join("\n");

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
    expect(recipe.yield).toBe("about 1 cup");
    expect(recipe).not.toHaveProperty("prepTime");
    expect(methodText("earl-gray-honey-syrup")).toContain(
      "Remove the tea bags, or strain out the loose tea.",
    );
    expect(methodText("earl-gray-honey-syrup")).toContain(
      "Let cool, bottle, and refrigerate.",
    );
  });

  it("groups the coffee cake method into readable stages", () => {
    const recipe = RECIPES["lemon-ricotta-coffee-cake"];

    expect(recipe.yield).toBe("9 servings");
    expect(recipe.prepTime).toBe("30 min");
    expect(recipe.steps.length).toBeLessThan(12);
    expect(recipe.steps.find((step) => step.instruction === "Make the cinnamon crumb topping.")?.substeps).toHaveLength(4);
    expect(methodText("lemon-ricotta-coffee-cake")).toContain(
      "Some jam on the toothpick is fine; look for moist cake crumbs rather than wet batter.",
    );
    expect(methodText("lemon-ricotta-coffee-cake")).toContain(
      "Let the cake cool in the pan for at least 30 minutes before cutting.",
    );
  });

  it("presents the cookie recipe as a standalone web recipe", () => {
    const recipe = RECIPES["chocolate-chip-cookies"];
    const authoredText = [recipe.lede, methodText("chocolate-chip-cookies")].join("\n");

    expect(recipe.lede).toBe(
      "I adapted this from Laura Sandford's recipe here. This version makes larger cookies, and it's written with the goal of freezing the formed cookie dough balls to bake them on-demand!",
    );
    expect(recipe.yield).toBe("20-22 cookies");
    expect(recipe.cookTime).toBe("12-16 min");
    expect(recipe.ingredients.at(-1)).toEqual({
      amount: "12 oz",
      name: "semisweet and dark chocolate chips",
      note: "divided however you like; I stick with 5-7 oz of each",
    });
    expect(authoredText).toContain(
      "Preheat the oven to 360°F and line the baking sheets with parchment paper.",
    );
    expect(authoredText).toContain(
      "Arrange no more than 6 frozen dough balls on each sheet, leaving about 3 inches between them.",
    );
    expect(authoredText).toContain(
      "If you're baking two trays, bake them for 16 minutes total.",
    );
    expect(authoredText).toContain("Leave the cookies on the trays for 5-10 minutes, then move them to a cooling rack.");
    expect(
      recipe.steps.find((step) => step.instruction === "Combine everything.")?.aside,
    ).toBe("When making cookies, it's important to mix until just combined!");
    expect(recipe.steps[0].substeps).toBeUndefined();
    expect(recipe.steps[1].substeps).toBeUndefined();
  });

  it("does not publish contradictory or text-message-only copy", () => {
    const allText = JSON.stringify(RECIPES);
    const streuselButter = RECIPES["lemon-ricotta-coffee-cake"].ingredients.find(
      (ingredient) => ingredient.amount === "42g" && ingredient.name === "butter",
    );

    expect(streuselButter?.note).toBe("cold and cubed; 3 tbsp");
    expect(allText).not.toContain("rougly");
    expect(allText).not.toContain("1.33 cups");
    expect(RECIPES["cucumber-mint-syrup"].lede).toBe(
      "Makes a very rich cucumber mint syrup. Great for martinis or Eastsides. If it's too cucumber-y you can replace some of the cucumber juice with water.",
    );
    expect(RECIPES["cucumber-mint-syrup"].notes).toBeUndefined();
    expect(RECIPES["cucumber-mint-syrup"].cookTime).toBe("30-45 min");
    expect(RECIPES["cucumber-mint-syrup"].cookTimeLabel).toBe("steep");
    expect(RECIPES["cucumber-mint-syrup"].ingredients).toContainEqual({
      amount: "2 cups",
      name: "fresh mint leaves",
      note: "about 50g",
    });
    expect(methodText("cucumber-mint-syrup")).toContain("wash the English cucumbers");
  });

  it.each(["lemon-super-juice", "lime-super-juice"])(
    "%s identifies the no-fresh-juice method and its storage",
    (slug) => {
      const recipe = RECIPES[slug];
      const text = methodText(slug);

      expect(recipe.lede).toContain("does not use the juice from the peeled fruit");
      expect(recipe.yield).toBe("about 400 ml");
      expect(JSON.stringify(recipe.ingredients)).toContain("food-grade");
      expect(text).toContain("as little white pith as possible");
      expect(text).toContain("Save the peeled fruit for another use.");
      expect(text).toContain("best within 1 week");
      expect(text).toContain("usable for up to 2 weeks");
    },
  );

  it("marks the cookie adaptation with its source URL", () => {
    expect(RECIPES["chocolate-chip-cookies"].source).toEqual({
      label: "Laura Sandford's recipe here",
      url: "https://joyfoodsunshine.com/the-most-amazing-chocolate-chip-cookies/",
    });
  });
});
