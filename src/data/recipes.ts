export type Ingredient = {
  amount: string;
  name: string;
  note?: string;
};

export type Step = {
  instruction: string;
};

export type FullRecipe = {
  slug: string;
  category: string;
  title: string;
  description: string;
  lede: string;
  yield: string;
  prepTime: string;
  cookTime?: string;
  cookTimeLabel?: string;
  ingredients: Ingredient[];
  steps: Step[];
  notes?: string;
};

export type RecipeSummary = {
  slug: string;
  title: string;
  description: string;
};

export const RECIPES: Record<string, FullRecipe> = {
  "chocolate-chip-cookies": {
    slug: "chocolate-chip-cookies",
    category: "Baking",
    title: "My Chocolate Chip Cookies",
    description:
      "Big chocolate chip cookies with a hint of almond, made to freeze and bake on demand.",
    lede:
      "My version of a classic chocolate chip cookie: substantial 60g cookies with semisweet and dark chocolate, a little almond extract, and plenty of time to chill. I usually freeze the shaped dough so warm cookies are always within reach.",
    yield: "about 22 cookies",
    prepTime: "25 min, plus chilling",
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
        amount: "5-7 oz",
        name: "semisweet chocolate chips",
        note: "adjust with the dark chocolate to no more than 12.2 oz total",
      },
      {
        amount: "5-7 oz",
        name: "dark chocolate chips",
        note: "adjust with the semisweet chocolate to no more than 12.2 oz total",
      },
    ],
    steps: [
      {
        instruction:
          "Bring the eggs to room temperature. A room-temperature water bath for 5-10 minutes works well.",
      },
      {
        instruction:
          "Whisk the flour, baking soda, baking powder, and salt together in a medium bowl; set aside.",
      },
      {
        instruction:
          "Using a hand mixer, cream the softened butter and both sugars until smooth and combined.",
      },
      {
        instruction:
          "Beat the vanilla and almond extracts into the butter mixture before adding the eggs, then beat in the eggs one at a time until the mixture is light.",
      },
      {
        instruction:
          "Add the dry ingredients and mix on low for only a few seconds, stopping while a few dry streaks remain.",
      },
      {
        instruction:
          "Add the semisweet and dark chocolate chips, then finish mixing by hand with a wooden spoon until the dry streaks disappear. Do not overmix.",
      },
      {
        instruction:
          "Form the dough into 60g balls. Freeze them on a tray until firm, then transfer to an airtight container for baking on demand. If baking the same day, chill the shaped dough for 1-2 hours in the refrigerator or 15-30 minutes in the freezer.",
      },
      {
        instruction:
          "Preheat the oven to 375°F. Arrange the chilled or frozen dough balls on a parchment-lined baking sheet.",
      },
      {
        instruction:
          "Put the cookies in the oven and immediately lower the temperature to 360°F. Bake one tray for 13-15 minutes. When the tops begin to brown, give them another 1-3 minutes before removing them. If baking two trays, swap and rotate them after 7-8 minutes.",
      },
      {
        instruction:
          "Let the cookies set on the baking sheet for 5 minutes, then transfer them to a wire rack.",
      },
    ],
    notes:
      "Adapted from The Best Chocolate Chip Cookie Recipe Ever by JoyFoodSunshine: https://joyfoodsunshine.com/the-most-amazing-chocolate-chip-cookies/\n\nChilled dough is essential here. Freezing the 60g portions makes it easy to bake only as many cookies as you want.",
  },

  "lemon-ricotta-coffee-cake": {
    slug: "lemon-ricotta-coffee-cake",
    category: "Baking",
    title: "Lemon Ricotta Coffee Cake with Sour Cherry Jam",
    description:
      "A tender lemon and ricotta coffee cake layered with sour cherry jam and cinnamon streusel.",
    lede:
      "Bright lemon, creamy ricotta, and a stripe of sour cherry jam under a cinnamon crumb topping. The streusel goes on after the cake has baked for ten minutes so it stays distinct and craggy.",
    yield: "one 8-inch square cake",
    prepTime: "35 min",
    cookTime: "40-45 min",
    cookTimeLabel: "bake",
    ingredients: [
      {
        amount: "100g",
        name: "brown sugar for the streusel",
        note: "dark or light, packed; 1/2 cup",
      },
      {
        amount: "60g",
        name: "all-purpose flour for the streusel",
        note: "1/2 cup",
      },
      { amount: "2 tsp", name: "ground cinnamon" },
      {
        amount: "42g",
        name: "butter for the streusel",
        note: "cold and cubed",
      },
      {
        amount: "166g",
        name: "all-purpose flour for the cake",
        note: "1 1/3 cups plus 1 tbsp",
      },
      { amount: "1 tsp", name: "baking powder" },
      { amount: "0.25 tsp", name: "baking soda" },
      { amount: "0.25 tsp", name: "salt" },
      {
        amount: "2 tbsp",
        name: "finely grated lemon zest",
        note: "from about 2 lemons",
      },
      { amount: "150g", name: "granulated sugar" },
      {
        amount: "56g",
        name: "butter for the cake",
        note: "softened to room temperature",
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
          "Lightly butter an 8-inch square pan, line it with parchment paper, and preheat the oven to 350°F.",
      },
      {
        instruction:
          "Make the lemon sugar: combine the lemon zest and granulated sugar in a small bowl, then rub them together with your fingers until fully combined. Cover and set aside.",
      },
      {
        instruction:
          "Make the streusel: combine the brown sugar, 60g flour, and cinnamon. Cut in the cold butter with a fork, pastry cutter, or food processor until pea-sized crumbs form. Refrigerate.",
      },
      {
        instruction:
          "In a medium bowl, whisk together the 166g flour, baking powder, baking soda, and salt.",
      },
      {
        instruction:
          "Using a handheld or stand mixer, cream the softened butter and lemon sugar on high speed until smooth and creamy, about 5-6 minutes.",
      },
      {
        instruction:
          "Add the almond oil and beat until combined, about 1 minute. Add the ricotta and beat on medium-high until visibly lighter and fluffier, about 4-5 minutes.",
      },
      {
        instruction:
          "Beat in the vanilla and almond extracts until just combined. Add the eggs one at a time, then add the lemon juice.",
      },
      {
        instruction:
          "Beat the dry ingredients into the wet ingredients on low speed until just combined, then beat in the heavy cream or almond milk.",
      },
      {
        instruction:
          "Spread half the batter evenly in the prepared pan. Carefully spread the sour cherry jam over it without disturbing the batter, then slowly spread the remaining batter over the jam.",
      },
      {
        instruction:
          "Bake for 10 minutes. Remove the streusel from the refrigerator, cover the cake evenly with it, and return the pan to the oven.",
      },
      {
        instruction:
          "Bake for another 30-35 minutes, until a toothpick inserted into the center comes out clean.",
      },
    ],
  },

  "cucumber-mint-syrup": {
    slug: "cucumber-mint-syrup",
    category: "Syrups & Shrubs & Ferments",
    title: "Cucumber Mint Syrup",
    description: "A simple 1:2 mint syrup with cucumber juice added in.",
    lede:
      "A 1:1 simple syrup with mint steeped in and cucumber juice added after. It's useful anywhere you'd use a flavored simple syrup, especially drinks that could use something fresh and green.",
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
    title: "Earl Gray Honey Syrup",
    description: "A rich honey syrup infused with Earl Grey tea.",
    lede:
      "A floral honey syrup with the citrusy edge of Earl Grey. Useful in cocktails, tea, or anywhere plain honey syrup needs a little more character.",
    yield: "about 1 cup",
    prepTime: "10 min",
    ingredients: [
      { amount: "130ml", name: "water" },
      { amount: "200g", name: "honey" },
      {
        amount: "4 bags",
        name: "Earl Grey tea",
        note: "or about 10g loose-leaf Earl Grey",
      },
    ],
    steps: [
      {
        instruction: "Heat the water until just off boiling.",
      },
      {
        instruction:
          "Add the Earl Grey tea and let it steep for 5-6 minutes.",
      },
      {
        instruction:
          "Remove the tea bags or strain out the loose tea leaves.",
      },
      {
        instruction:
          "Add the honey and stir until it is completely combined with the tea.",
      },
      {
        instruction:
          "Let cool, then transfer to a clean bottle and refrigerate.",
      },
    ],
  },

  "lemon-super-juice": {
    slug: "lemon-super-juice",
    category: "Syrups & Shrubs & Ferments",
    title: "Lemon Super Juice",
    description:
      "An extended lemon juice made from fresh peel, citric acid, and water.",
    lede:
      "A concentrated way to stretch the bright oils in lemon peel into a larger batch of juice for cocktails and other drinks.",
    yield: "about 400ml",
    prepTime: "45 min",
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
          "Cut the lemon peel into roughly fingernail-sized pieces.",
      },
      {
        instruction:
          "Combine the peel, citric acid, salt, and sugar in a bowl or jar, stirring until the peel is evenly coated.",
      },
      {
        instruction:
          "Let the peel mixture rest at room temperature for about 30 minutes so the acid can draw out the citrus oils.",
      },
      {
        instruction:
          "Add the water and blend lightly, just enough to incorporate. Avoid over-blending, which can make the juice bitter.",
      },
      {
        instruction:
          "Strain through a fine mesh strainer into a clean bottle and refrigerate.",
      },
    ],
  },

  "lime-super-juice": {
    slug: "lime-super-juice",
    category: "Syrups & Shrubs & Ferments",
    title: "Lime Super Juice",
    description:
      "An extended lime juice made from fresh peel, citric and malic acids, and water.",
    lede:
      "A concentrated way to stretch the aromatic oils in lime peel into a larger batch of juice for cocktails and other drinks.",
    yield: "about 400ml",
    prepTime: "45 min",
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
          "Cut the lime peel into roughly fingernail-sized pieces.",
      },
      {
        instruction:
          "Combine the peel, citric acid, malic acid, salt, and sugar in a bowl or jar, stirring until the peel is evenly coated.",
      },
      {
        instruction:
          "Let the peel mixture rest at room temperature for about 30 minutes so the acids can draw out the citrus oils.",
      },
      {
        instruction:
          "Add the water and blend lightly, just enough to incorporate. Avoid over-blending, which can make the juice bitter.",
      },
      {
        instruction:
          "Strain through a fine mesh strainer into a clean bottle and refrigerate.",
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
