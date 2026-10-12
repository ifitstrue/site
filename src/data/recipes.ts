export type Ingredient = {
  amount: string;
  name: string;
  note?: string;
  group?: string;
};

export type Step = {
  instruction: string;
  heading?: string;
  substeps?: string[];
};

export type FullRecipe = {
  slug: string;
  category: string;
  title: string;
  description?: string;
  lede?: string;
  yield?: string;
  prepTime?: string;
  cookTime?: string;
  cookTimeLabel?: string;
  ingredients: Ingredient[];
  steps: Step[];
  notes?: string;
  source?: {
    label: string;
    url: string;
  };
};

export type RecipeSummary = {
  slug: string;
  title: string;
  description?: string;
};

export const RECIPES: Record<string, FullRecipe> = {
  "chocolate-chip-cookies": {
    slug: "chocolate-chip-cookies",
    category: "Baking",
    title: "My Chocolate Chip Cookies",
    lede:
      "I adapted this from Laura Sandford's recipe here. This version makes larger cookies, and it's written with the goal of freezing the formed cookie dough balls to bake them on-demand!",
    yield: "20-22 cookies",
    cookTime: "12-16 min",
    cookTimeLabel: "bake",
    ingredients: [
      { amount: "227g", name: "salted butter", note: "softened" },
      { amount: "205g", name: "granulated sugar" },
      { amount: "205g", name: "light brown sugar", note: "packed" },
      { amount: "1.75 tsp", name: "vanilla extract" },
      { amount: "0.25 tsp", name: "almond extract" },
      {
        amount: "2 large",
        name: "eggs",
        note: "at room temperature",
      },
      { amount: "360g", name: "all-purpose flour" },
      { amount: "1 tsp", name: "baking soda" },
      { amount: "0.5 tsp", name: "baking powder" },
      { amount: "1 tsp", name: "sea salt" },
      {
        amount: "12 oz",
        name: "semisweet and dark chocolate chips",
        note: "divided however you like; I stick with 5-7 oz of each",
      },
    ],
    steps: [
      {
        instruction:
          "Bring the eggs to room temperature before mixing. I like putting them in a water bath that's roughly room temp for like 5-10 minutes.",
      },
      {
        instruction:
          "Mix the flour, baking soda, baking powder, and salt together in a medium bowl.",
      },
      {
        instruction:
          "Cream together the butter and sugars until combined. I use a hand mixer because it works just as well as my stand mixer for this.",
      },
      {
        instruction:
          "Add the vanilla and almond extracts. Combine them with the butter before the eggs, so that they can bind to the butter better.",
      },
      {
        instruction: "Add the eggs one at a time and mix until just combined.",
      },
      {
        instruction:
          "When making cookies, it's important to mix until just combined. Mix the dry ingredients into the wet ingredients until they're almost combined; there should still be some dry streaks, but the hard part should be done. This usually takes just a few seconds with the hand mixer. Add the chocolate chips and finish mixing with a wooden spoon or something similar. You can also mix entirely by hand if you want to play it safe, but it takes a while.",
      },
      {
        instruction:
          "Form the dough into 60g balls. I make around 22. If you don't have a scale, that's probably like 3-4 tablespoons (4 tbsp is 1/4 cup).",
      },
      {
        instruction:
          "Freeze the dough balls to bake on demand. If you don't do that, chill the dough—formed as balls or still in the bowl—in the fridge for 1-2 hours or in the freezer for 15-30 minutes.",
      },
      {
        instruction: "Bake the cookies.",
        substeps: [
          "Preheat the oven to 375°F.",
          "Line a baking sheet with parchment paper.",
          "Arrange no more than 6 frozen dough balls per sheet, with about 3 inches between them.",
          "Right after putting the cookies in the oven, lower the oven temp to 360°F. I start high and lower it because I prefer 360°F, and opening the oven loses about 5-10 degrees.",
          "Bake for 12-16 minutes. I look to see when the tops are starting to brown, then wait another 1-3 minutes.",
          "I've never baked more than one tray at a time, but if you do, you should probably swap and rotate the trays halfway through.",
          "Leave them on the tray for 5-10 minutes, then move them to a cooling rack.",
        ],
      },
    ],
    source: {
      label: "Laura Sandford's recipe here",
      url: "https://joyfoodsunshine.com/the-most-amazing-chocolate-chip-cookies/",
    },
  },

  "lemon-ricotta-coffee-cake": {
    slug: "lemon-ricotta-coffee-cake",
    category: "Baking",
    title: "Lemon Ricotta Coffee Cake with Sour Cherry Jam",
    yield: "9 servings",
    prepTime: "30 min",
    cookTime: "40-45 min",
    cookTimeLabel: "bake",
    ingredients: [
      {
        amount: "100g",
        name: "packed dark or light brown sugar",
        note: "1/2 cup",
        group: "Streusel",
      },
      {
        amount: "60g",
        name: "all-purpose flour",
        note: "1/2 cup",
      },
      { amount: "2 tsp", name: "ground cinnamon" },
      {
        amount: "42g",
        name: "butter",
        note: "cold and cubed; 3 tbsp",
      },
      {
        amount: "166g",
        name: "all-purpose flour",
        note: "1⅓ cups + 1 tbsp",
        group: "Cake",
      },
      { amount: "1 tsp", name: "baking powder" },
      { amount: "0.25 tsp", name: "baking soda" },
      { amount: "0.25 tsp", name: "salt" },
      {
        amount: "2 tbsp",
        name: "lemon zest",
        note: "2 lemons",
      },
      { amount: "150g", name: "granulated sugar" },
      {
        amount: "56g",
        name: "butter",
        note: "softened to room temperature; 4 tbsp",
      },
      { amount: "40g", name: "almond oil", note: "3 tbsp" },
      { amount: "1.75 tsp", name: "vanilla extract" },
      { amount: "0.25 tsp", name: "almond extract" },
      {
        amount: "120g",
        name: "ricotta",
        note: "whole-milk, drained, and at room temperature; 1/2 cup",
      },
      {
        amount: "2 large",
        name: "eggs",
        note: "at room temperature",
      },
      { amount: "2 tbsp", name: "fresh lemon juice" },
      {
        amount: "15g",
        name: "heavy cream or almond milk",
        note: "1 tbsp",
      },
      { amount: "160g", name: "sour cherry jam" },
    ],
    steps: [
      {
        instruction:
          "Lightly butter an 8-inch square pan and line it with parchment paper.",
      },
      {
        instruction: "Preheat the oven to 350°F.",
      },
      {
        instruction: "Make the lemon sugar.",
        substeps: [
          "Combine the lemon zest with the sugar in a small bowl.",
          "Rub the sugar and zest together with your fingers until fully combined.",
          "Cover and set aside.",
        ],
      },
      {
        instruction: "Make the cinnamon crumb topping.",
        substeps: [
          "Combine the brown sugar, all-purpose flour, and ground cinnamon.",
          "Cut in the butter with a fork, pastry cutter, or food processor.",
          "Mix until the mixture is in pea-sized crumbs.",
          "Refrigerate.",
        ],
      },
      {
        instruction:
          "Mix together the dry ingredients—all-purpose flour, baking powder, baking soda, and salt—in a medium bowl.",
      },
      {
        instruction: "Make the wet ingredients.",
        substeps: [
          "In a large bowl using a handheld or stand mixer, cream the butter and lemon sugar on high speed until smooth and creamy, about 5-6 minutes.",
          "Add the almond oil and beat until combined, roughly 1 minute.",
          "Add the ricotta and beat on medium-high speed until the mixture is visibly lighter and fluffier, roughly 4-5 minutes.",
          "Add the vanilla and almond extracts and beat until just combined.",
          "Add the eggs one at a time, mixing after each addition.",
          "Add the lemon juice.",
        ],
      },
      {
        instruction: "Combine the wet and dry ingredients.",
        substeps: [
          "Beat the wet and dry ingredients together on low speed until just combined.",
          "Beat in the heavy cream or almond milk.",
        ],
      },
      {
        instruction: "Layer the cake.",
        substeps: [
          "Put half of the batter into the pan and spread it evenly.",
          "Carefully spread the jam, making sure not to disturb the batter.",
          "Dollop the remaining batter over the jam and carefully spread it into an even layer.",
        ],
      },
      {
        instruction: "Bake the cake.",
        substeps: [
          "Bake for 10 minutes. In the meantime, take the cinnamon crumb mixture out of the fridge.",
          "After 10 minutes, cover the top with the cinnamon crumb topping and put it back in the oven.",
          "Bake for another 30-35 minutes. Some jam on the toothpick is fine; look for moist cake crumbs rather than wet batter.",
        ],
      },
      {
        instruction:
          "Let the cake cool in the pan for at least 30 minutes before cutting.",
      },
    ],
  },

  "cucumber-mint-syrup": {
    slug: "cucumber-mint-syrup",
    category: "Syrups & Shrubs & Ferments",
    title: "Cucumber Mint Syrup",
    lede:
      "Makes a very rich cucumber mint syrup. Great for martinis or Eastsides. If it's too cucumber-y you can replace some of the cucumber juice with water.",
    yield: "about 3 cups",
    prepTime: "15 min",
    cookTime: "30-45 min",
    cookTimeLabel: "steep",
    ingredients: [
      { amount: "1 cup", name: "water" },
      { amount: "2 cups", name: "granulated white sugar" },
      {
        amount: "2 cups",
        name: "fresh mint leaves",
        note: "about 50g",
      },
      {
        amount: "1 cup",
        name: "fresh cucumber juice",
        note: "from washed English cucumbers",
      },
    ],
    steps: [
      {
        instruction: "Bring the water to a boil in a small saucepan.",
      },
      {
        instruction:
          "Add the sugar and stir until fully dissolved. Remove from heat.",
      },
      {
        instruction:
          "Add the mint to the hot syrup. Stir gently and let steep as it cools to room temperature, about 30-45 minutes.",
      },
      {
        instruction:
          "While the syrup cools, wash the English cucumbers. Juice them until you have 1 cup of cucumber juice. A fine mesh strainer or cheesecloth helps remove pulp.",
      },
      {
        instruction:
          "Once the syrup is fully cool, strain it through a fine mesh strainer to remove the mint leaves.",
      },
      {
        instruction:
          "Add the cucumber juice to the strained syrup and stir to combine. Bottle and refrigerate; keeps for up to 2 weeks.",
      },
    ],
  },

  "earl-gray-honey-syrup": {
    slug: "earl-gray-honey-syrup",
    category: "Syrups & Shrubs & Ferments",
    title: "Earl Grey Honey Syrup",
    yield: "about 1 cup",
    ingredients: [
      { amount: "130ml", name: "water" },
      { amount: "200g", name: "honey" },
      {
        amount: "4",
        name: "Earl Grey tea bags",
        note: "or roughly 10g loose-leaf Earl Grey",
      },
    ],
    steps: [
      { instruction: "Heat the water to just off boiling." },
      { instruction: "Add the Earl Grey tea bags." },
      { instruction: "Wait 5-6 minutes for the tea to steep." },
      { instruction: "Remove the tea bags, or strain out the loose tea." },
      { instruction: "Add the honey and stir until combined." },
      { instruction: "Let cool, bottle, and refrigerate." },
    ],
  },

  "lemon-super-juice": {
    slug: "lemon-super-juice",
    category: "Syrups & Shrubs & Ferments",
    title: "Lemon Super Juice",
    lede:
      "This is a no-fresh-juice version, so it does not use the juice from the peeled fruit.",
    yield: "about 400 ml",
    ingredients: [
      { amount: "24g", name: "lemon peel" },
      { amount: "24g", name: "food-grade citric acid" },
      { amount: "400g", name: "water" },
      { amount: "1g", name: "salt" },
      { amount: "1g", name: "sugar" },
    ],
    steps: [
      {
        instruction:
          "Peel the lemons, taking as little white pith as possible. Save the peeled fruit for another use.",
      },
      {
        instruction:
          "Combine the peels, citric acid, salt, and sugar in a bowl or jar. Stir to combine.",
      },
      {
        instruction:
          "Let the mixture sit at room temperature for about 30 minutes.",
      },
      {
        instruction:
          "Add the water and blend lightly, until the peels are roughly fingernail-sized. Over-blending will make it bitter.",
      },
      {
        instruction:
          "Strain through a fine mesh strainer into a sanitized bottle and refrigerate. It's best within 1 week and still usable for up to 2 weeks, but it won't be as good during the second week.",
      },
    ],
  },

  "lime-super-juice": {
    slug: "lime-super-juice",
    category: "Syrups & Shrubs & Ferments",
    title: "Lime Super Juice",
    lede:
      "This is a no-fresh-juice version, so it does not use the juice from the peeled fruit.",
    yield: "about 400 ml",
    ingredients: [
      { amount: "24g", name: "lime peel" },
      { amount: "16g", name: "food-grade citric acid" },
      { amount: "8g", name: "food-grade malic acid" },
      { amount: "400g", name: "water" },
      { amount: "1g", name: "salt" },
      { amount: "1g", name: "sugar" },
    ],
    steps: [
      {
        instruction:
          "Peel the limes, taking as little white pith as possible. Save the peeled fruit for another use.",
      },
      {
        instruction:
          "Combine the peels, citric acid, malic acid, salt, and sugar in a bowl or jar. Stir to combine.",
      },
      {
        instruction:
          "Let the mixture sit at room temperature for about 30 minutes.",
      },
      {
        instruction:
          "Add the water and blend lightly, until the peels are roughly fingernail-sized. Over-blending will make it bitter.",
      },
      {
        instruction:
          "Strain through a fine mesh strainer into a sanitized bottle and refrigerate. It's best within 1 week and still usable for up to 2 weeks, but it won't be as good during the second week.",
      },
    ],
  },
};

const CATEGORY_ORDER: Array<{ id: string; label: string }> = [
  { id: "baking", label: "Baking" },
  { id: "syrups", label: "Syrups & Shrubs & Ferments" },
];

export const CATEGORIES = CATEGORY_ORDER.map(({ id, label }) => ({
  id,
  label,
  recipes: Object.values(RECIPES)
    .filter((recipe) => recipe.category === label)
    .map(({ slug, title, description }) => ({ slug, title, description })),
}));
