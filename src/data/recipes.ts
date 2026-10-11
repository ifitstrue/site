export type Ingredient = {
  amount: string;
  name: string;
  note?: string;
  group?: string;
};

export type Step = {
  instruction: string;
  heading?: string;
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
      "I form the cookie dough balls, then freeze them to bake on demand. I highly recommend doing that haha, but if you don't do that then you should chill the dough in the fridge for 1-2 hours or in the freezer for 15-30 minutes. Chilled dough is super important for cookies!!",
    yield: "around 22 cookies",
    cookTime: "13-15 min",
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
        amount: "up to 12.2 oz total",
        name: "semisweet and dark chocolate chips",
        note: "I use 5-7 oz of each, depending on mood",
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
        instruction:
          "Preheat the oven to 375°F. Right after putting the cookies in the oven, lower the oven temp to 360°F. Bake for 13-15 minutes. I look to see when the tops are starting to brown, then wait another 1-3 minutes. I've never baked more than one tray at a time, but if you do, you should probably swap and rotate the trays after roughly 7-8 minutes. I start high and lower it because I prefer 360°F, and opening the oven loses about 5-10 degrees.",
      },
    ],
    notes:
      "https://joyfoodsunshine.com/the-most-amazing-chocolate-chip-cookies/#wprm-recipe-container-8678",
  },

  "lemon-ricotta-coffee-cake": {
    slug: "lemon-ricotta-coffee-cake",
    category: "Baking",
    title: "Lemon Ricotta Coffee Cake with Sour Cherry Jam",
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
        note: "cold and cubed",
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
        note: "at room temperature; 1/2 cup",
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
          "Lightly butter an 8-inch square pan and line it with parchment paper",
      },
      {
        instruction: "Preheat the oven to 350°F",
      },
      {
        heading: "Make Lemon Sugar",
        instruction: "Combine the lemon zest with the sugar in a small bowl",
      },
      {
        heading: "Make Lemon Sugar",
        instruction:
          "Rub the sugar and zest together with your fingers, until fully combined",
      },
      {
        heading: "Make Lemon Sugar",
        instruction: "Cover and set aside",
      },
      {
        heading: "Make cinnamon crumb topping",
        instruction:
          "Combine the brown sugar, all-purpose flour, and ground cinnamon",
      },
      {
        heading: "Make cinnamon crumb topping",
        instruction:
          "Cut in the butter with a fork, pastry cutter, or food processor",
      },
      {
        heading: "Make cinnamon crumb topping",
        instruction: "Mix until the mixture is in pea-sized crumbs",
      },
      {
        heading: "Make cinnamon crumb topping",
        instruction: "Refrigerate",
      },
      {
        heading: "Mix together dry ingredients",
        instruction:
          "Mix together the dry ingredients (all-purpose flour, baking powder, baking soda, salt) in a medium bowl",
      },
      {
        heading: "Make wet ingredients",
        instruction:
          "In a large bowl using a handheld or stand mixer, cream the butter & lemon sugar on high speed until smooth and creamy, about 5-6 minutes",
      },
      {
        heading: "Make wet ingredients",
        instruction:
          "Add the almond oil and beat until combined, roughly one minute",
      },
      {
        heading: "Make wet ingredients",
        instruction:
          "Add the ricotta and beat on medium-high speed until the mixture is visibly lighter and fluffier; roughly 4-5 minutes",
      },
      {
        heading: "Make wet ingredients",
        instruction:
          "Add the vanilla and almond extracts and beat until just combined",
      },
      {
        heading: "Make wet ingredients",
        instruction: "Add the eggs one at a time",
      },
      { heading: "Make wet ingredients", instruction: "Add the lemon juice" },
      {
        heading: "Combine wet & dry ingredients",
        instruction:
          "Beat the wet & dry ingredients together on low speed until just combined",
      },
      {
        heading: "Combine wet & dry ingredients",
        instruction: "Beat in the heavy cream / almond milk",
      },
      {
        heading: "Layer",
        instruction:
          "Put half of the batter into the pan, and spread it evenly",
      },
      {
        heading: "Layer",
        instruction:
          "Carefully spread the jam, making sure not to disturb the batter",
      },
      {
        heading: "Layer",
        instruction:
          "Slowly pour the remaining batter over the jam layer",
      },
      {
        heading: "Bake",
        instruction:
          "Put in oven, and bake for 10 minutes; in the meantime, take the cinnamon crumb mixture out of the fridge",
      },
      {
        heading: "Bake",
        instruction:
          "After 10 minutes, cover the top with the cinnamon crumb topping, and put it back in the oven",
      },
      {
        heading: "Bake",
        instruction:
          "Bake for another 30-35 minutes, until a toothpick inserted into the center comes out clean",
      },
    ],
  },

  "cucumber-mint-syrup": {
    slug: "cucumber-mint-syrup",
    category: "Syrups & Shrubs & Ferments",
    title: "Cucumber Mint Syrup",
    description: "A mint syrup with cucumber juice added in.",
    lede:
      "A rich simple syrup with mint steeped in and cucumber juice added after. Mostly I make this for the Cucumber Mint Martini, but it's useful anywhere you'd use a flavored simple.",
    yield: "about 3 cups",
    prepTime: "15 min",
    cookTime: "10 min",
    ingredients: [
      { amount: "1 cup", name: "water" },
      { amount: "2 cups", name: "granulated white sugar" },
      { amount: "1 large bunch", name: "fresh mint" },
      {
        amount: "1 cup",
        name: "fresh cucumber juice",
        note: "about 1-2 medium cucumbers",
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
          "While the syrup cools, peel, halve, and deseed the cucumbers. Juice them until you have 1 cup of cucumber juice. A fine mesh strainer or cheesecloth helps remove pulp.",
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
    notes:
      "As written, very cucumber-forward. If it's too much, dial the juice back and replace with water. The mint is quieter than you'd expect; steep longer or add more leaves if you want it louder.",
  },

  "earl-gray-honey-syrup": {
    slug: "earl-gray-honey-syrup",
    category: "Syrups & Shrubs & Ferments",
    title: "Earl Grey Honey Syrup",
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
      { instruction: "Remove the tea bags." },
      { instruction: "Add the honey and stir until combined." },
    ],
  },

  "lemon-super-juice": {
    slug: "lemon-super-juice",
    category: "Syrups & Shrubs & Ferments",
    title: "Lemon Super Juice",
    ingredients: [
      { amount: "24g", name: "lemon peel" },
      { amount: "24g", name: "citric acid" },
      { amount: "400g", name: "water" },
      { amount: "1g", name: "salt" },
      { amount: "1g", name: "sugar" },
    ],
    steps: [
      {
        instruction:
          "Peel the lemons, keeping the peels in roughly fingernail-sized pieces.",
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
          "Add the water and blend lightly, just enough to incorporate. The peels should still be roughly fingernail-sized when you're done; over-blending will make it bitter.",
      },
      {
        instruction:
          "Strain through a fine mesh strainer into a sanitized bottle.",
      },
    ],
  },

  "lime-super-juice": {
    slug: "lime-super-juice",
    category: "Syrups & Shrubs & Ferments",
    title: "Lime Super Juice",
    ingredients: [
      { amount: "24g", name: "lime peel" },
      { amount: "16g", name: "citric acid" },
      { amount: "8g", name: "malic acid" },
      { amount: "400g", name: "water" },
      { amount: "1g", name: "salt" },
      { amount: "1g", name: "sugar" },
    ],
    steps: [
      {
        instruction:
          "Peel the limes, keeping the peels in roughly fingernail-sized pieces.",
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
          "Add the water and blend lightly, just enough to incorporate. The peels should still be roughly fingernail-sized when you're done; over-blending will make it bitter.",
      },
      {
        instruction:
          "Strain through a fine mesh strainer into a sanitized bottle.",
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
