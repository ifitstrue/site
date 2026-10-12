export type Ingredient = {
  amount: string;
  name: string;
  note?: string;
  group?: string;
};

export type Step = {
  title: string;
  instruction?: string;
  substeps?: string[];
  aside?: string;
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
        title: "Bring the eggs to room temperature.",
        instruction:
          "I like putting them in a bowl of room-temperature water for 5-10 minutes.",
      },
      {
        title: "Mix the dry ingredients.",
        instruction:
          "In a medium bowl, mix together the dry ingredients (flour, baking soda, baking powder, and salt).",
      },
      {
        title: "Cream the butter and sugars.",
        instruction:
          "Cream together the butter and sugars (granulated sugar and brown sugar) until the mixture is noticeably lighter and fluffier but still holds its shape. I use a hand mixer because it works just as well as my stand mixer for this.",
      },
      {
        title: "Add the extracts and eggs.",
        substeps: [
          "Add the vanilla and almond extracts, and mix for 10-15 seconds.",
          "Add the eggs one at a time, mixing until just combined after each one.",
        ],
      },
      {
        title: "Combine everything.",
        substeps: [
          "Add the dry ingredients to the wet ingredients and use the hand mixer on low for 10-15 seconds, until they're almost combined. There should still be a lot of dry streaks remaining.",
          "Add the chocolate chips and finish mixing with a wooden spoon or something similar. You can also mix this part entirely by hand if you want to play it safe, but it takes a while.",
        ],
        aside: "When making cookies, it's important to mix until just combined!",
      },
      {
        title: "Form the cookies.",
        instruction:
          "Form the dough into 60g balls. This should make around 20-22 cookies. If you don't have a scale, each ball should be roughly 1/4 cup (4 tablespoons) of dough.",
      },
      {
        title: "Freeze the dough.",
        substeps: [
          "Arrange the dough balls on a tray so that they aren't touching.",
          "Freeze them on the tray for at least 30 minutes.",
          "Once they're firm, move them into a freezer Ziploc bag until you're ready to bake them.",
        ],
      },
      {
        title: "Bake the cookies.",
        substeps: [
          "Preheat the oven to 360°F and line the baking sheets with parchment paper.",
          "Arrange no more than 6 frozen dough balls on each sheet, leaving about 3 inches between them.",
          "Bake for 12-16 minutes. If you're baking two trays, bake them for the full 16 minutes; after roughly 8 minutes, rotate each tray 180 degrees and swap their positions between the oven racks.",
          "I look for the tops to start browning, then give them another 1-3 minutes if they need it.",
          "Leave the cookies on the trays for 5-10 minutes, then move them to a cooling rack.",
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
        note:
          "whole-milk and at room temperature; drain it first if it's especially wet; 1/2 cup",
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
        title: "Prepare the pan.",
        instruction:
          "Lightly butter an 8-inch square pan and line it with parchment paper.",
      },
      {
        title: "Preheat the oven to 350°F.",
      },
      {
        title: "Make the lemon sugar.",
        substeps: [
          "Combine the lemon zest with the sugar in a small bowl.",
          "Rub the sugar and zest together with your fingers until fully combined.",
          "Cover and set aside.",
        ],
      },
      {
        title: "Make the cinnamon crumb topping.",
        substeps: [
          "Combine the dry ingredients (brown sugar, all-purpose flour, and ground cinnamon).",
          "Cut in the butter with a fork, pastry cutter, or food processor.",
          "Mix until the mixture is in pea-sized crumbs.",
          "Refrigerate.",
        ],
      },
      {
        title: "Mix the dry ingredients.",
        instruction:
          "Mix together the dry ingredients (all-purpose flour, baking powder, baking soda, and salt) in a medium bowl.",
      },
      {
        title: "Make the wet ingredients.",
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
        title: "Combine the wet and dry ingredients.",
        substeps: [
          "Beat the wet and dry ingredients together on low speed until just combined.",
          "Beat in the heavy cream or almond milk.",
        ],
        aside: "Don't overmix this; stop as soon as everything is combined.",
      },
      {
        title: "Layer the cake.",
        substeps: [
          "Put half of the batter into the pan and spread it evenly.",
          "Carefully spread the jam, making sure not to disturb the batter.",
          "Dollop the remaining batter over the jam and carefully spread it into an even layer.",
        ],
      },
      {
        title: "Bake the cake.",
        substeps: [
          "Bake for 10 minutes. In the meantime, take the cinnamon crumb mixture out of the fridge.",
          "After 10 minutes, cover the top with the cinnamon crumb topping and put it back in the oven.",
          "Bake for another 30-35 minutes, until a toothpick inserted into the center comes out without any wet batter.",
        ],
        aside:
          "Some jam on the toothpick is fine; look for moist cake crumbs rather than wet batter.",
      },
      {
        title: "Let the cake cool.",
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
        note: "from washed cucumbers",
      },
    ],
    steps: [
      {
        title: "Make the mint syrup.",
        substeps: [
          "Bring the water to a boil in a small saucepan.",
          "Add the sugar and stir until fully dissolved, then remove it from the heat.",
          "Add the mint and stir gently. Let it steep as the syrup cools to room temperature, about 30-45 minutes.",
        ],
      },
      {
        title: "Make the cucumber juice.",
        substeps: [
          "Wash the cucumbers, then run them through a zester or grater; they should start releasing juice as you work.",
          "Squeeze the cucumber pulp to get as much juice out of it as possible.",
          "Strain everything through a fine-mesh strainer until you have 1 cup of cucumber juice. You don't need to worry much about the seeds; the strainer will catch them.",
        ],
      },
      {
        title: "Combine everything.",
        substeps: [
          "Once the mint syrup is fully cool, strain out the mint leaves.",
          "Add the cucumber juice and stir until combined.",
          "Bottle and refrigerate; it keeps for up to 2 weeks.",
        ],
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
      { title: "Heat the water to just off boiling." },
      { title: "Add the Earl Grey tea bags." },
      { title: "Let the tea steep for 5-6 minutes." },
      { title: "Remove the tea bags, or strain out the loose tea." },
      { title: "Add the honey and stir until combined." },
      { title: "Let cool, bottle, and refrigerate." },
    ],
  },

  "lemon-super-juice": {
    slug: "lemon-super-juice",
    category: "Syrups & Shrubs & Ferments",
    title: "Lemon Super Juice",
    lede:
      "This version skips the fresh juice; it only uses the peels.",
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
        title: "Peel the lemons.",
        instruction:
          "Use a vegetable peeler, taking as little white pith as possible. Save the peeled fruit for another use.",
      },
      {
        title: "Combine the peel mixture.",
        instruction:
          "Combine the peels and dry ingredients (citric acid, salt, and sugar) in a bowl or jar. Stir to combine.",
      },
      {
        title: "Let the mixture sit at room temperature for about 30 minutes.",
      },
      {
        title: "Add the water and blend.",
        instruction:
          "Blend lightly until the peels are roughly fingernail-sized.",
        aside:
          "Don't overblend this. Smaller pieces of peel, especially pieces with white pith, can make it bitter.",
      },
      {
        title: "Strain and bottle.",
        instruction:
          "Strain through a fine-mesh strainer into a sanitized bottle and refrigerate. It's best within 1 week, but it's still usable for another week (it just won't be as good).",
      },
    ],
  },

  "lime-super-juice": {
    slug: "lime-super-juice",
    category: "Syrups & Shrubs & Ferments",
    title: "Lime Super Juice",
    lede:
      "This version skips the fresh juice; it only uses the peels.",
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
        title: "Peel the limes.",
        instruction:
          "Use a vegetable peeler, taking as little white pith as possible. Save the peeled fruit for another use.",
      },
      {
        title: "Combine the peel mixture.",
        instruction:
          "Combine the peels and dry ingredients (citric acid, malic acid, salt, and sugar) in a bowl or jar. Stir to combine.",
      },
      {
        title: "Let the mixture sit at room temperature for about 30 minutes.",
      },
      {
        title: "Add the water and blend.",
        instruction:
          "Blend lightly until the peels are roughly fingernail-sized.",
        aside:
          "Don't overblend this. Smaller pieces of peel, especially pieces with white pith, can make it bitter.",
      },
      {
        title: "Strain and bottle.",
        instruction:
          "Strain through a fine-mesh strainer into a sanitized bottle and refrigerate. It's best within 1 week, but it's still usable for another week (it just won't be as good).",
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
