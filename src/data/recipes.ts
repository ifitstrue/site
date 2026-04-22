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
  "chocolate-chip-shortbread-cookies": {
    slug: "chocolate-chip-shortbread-cookies",
    category: "Baking",
    title: "Salted Chocolate Chunk Shortbread Cookies",
    description: "My take on the New York Times' popular recipe",
    lede: "My take on the NYT recipe, incorporating tweaks from the comments and my own testing. The dough slices much cleaner after a full night in the fridge; two hours is the minimum but overnight is better.",
    yield: "24 cookies",
    prepTime: "20 min",
    cookTime: "20-25 min",
    cookTimeLabel: "bake",
    ingredients: [
      { amount: "255g", name: "salted butter", note: "cold" },
      { amount: "90g", name: "powdered sugar" },
      { amount: "60g", name: "light brown sugar" },
      { amount: "1 tbsp", name: "vanilla extract" },
      { amount: "325g", name: "pastry flour" },
      {
        amount: "180g",
        name: "chocolate",
        note: "bittersweet, semi-sweet, or both",
      },
      { amount: "1 large", name: "egg", note: "for egg wash" },
      { amount: "75g", name: "demerara sugar", note: "for coating" },
      { amount: "20g", name: "flaky sea salt", note: "for finishing" },
    ],
    steps: [
      {
        instruction:
          "Using a stand mixer fitted with the paddle attachment, beat the butter, sugars, and vanilla on medium-high until very light and fluffy, 3-5 minutes.",
      },
      {
        instruction:
          "Turn the mixer off and scrape down the sides. Set the mixer to low.",
      },
      {
        instruction:
          "Add the flour in about 8 increments, letting each addition become fully incorporated before adding more.",
      },
      {
        instruction:
          "Turn the mixer off. Add the chocolate to the dough and fold in by hand or with a wooden spoon; don't mix too aggressively.",
      },
      {
        instruction:
          'Divide the dough into two equal halves and shape each into a log roughly 8" (20cm) long. Wrap in plastic and refrigerate overnight, or for at least 2 hours.',
      },
      {
        instruction: "When ready to bake, preheat the oven to 350°F (180°C).",
      },
      {
        instruction:
          "Lightly beat the egg in a small bowl. Pour the demerara sugar into a separate shallow bowl. Line two baking sheets with parchment.",
      },
      {
        instruction:
          "Remove one log from the fridge and use a straight-edge knife to cut it into 12 equal slices.",
      },
      {
        instruction:
          "Roll the edge of each slice in the egg wash, then press into the demerara sugar to coat.",
      },
      {
        instruction: "Repeat with the second log.",
      },
      {
        instruction:
          "Place both trays in the oven. After 10 minutes, check and rotate the trays if baking unevenly. Bake another 10-15 minutes for 20-25 minutes total.",
      },
      {
        instruction:
          "Immediately out of the oven, sprinkle each cookie with flaky sea salt. Cool on the tray for 3-5 minutes, then transfer to a rack for another 10 minutes.",
      },
    ],
  },

  "chocolate-chip-cookies": {
    slug: "chocolate-chip-cookies",
    category: "Baking",
    title: "Classic Chocolate Chip Cookies",
    description:
      "Substantial 60g cookies with a hint of almond and a blend of dark and semi-sweet chocolate.",
    lede: "A classic chocolate chip cookie, with a hint of almond and a blend of dark and semi-sweet chocolate. Designed to be portioned, frozen, and baked on demand.",
    yield: "18-20 cookies",
    prepTime: "20 min",
    cookTime: "8-10 min",
    cookTimeLabel: "bake",
    ingredients: [
      { amount: "227g", name: "salted butter", note: "softened" },
      { amount: "205g", name: "granulated sugar" },
      { amount: "205g", name: "light brown sugar", note: "packed" },
      { amount: "1.5 tsp", name: "pure vanilla extract" },
      { amount: "0.5 tsp", name: "almond extract" },
      { amount: "2 large", name: "eggs" },
      { amount: "360g", name: "all-purpose flour" },
      { amount: "1 tsp", name: "baking soda" },
      { amount: "0.5 tsp", name: "baking powder" },
      { amount: "1 tsp", name: "sea salt" },
      { amount: "200g", name: "dark chocolate chips", note: "7 oz" },
      { amount: "140g", name: "semi-sweet chocolate chips", note: "5 oz" },
    ],
    steps: [
      {
        instruction:
          "Whisk the flour, baking soda, baking powder, and salt together in a medium bowl; set aside.",
      },
      {
        instruction:
          "In a stand mixer, cream the butter and both sugars until light and fluffy. Do not overbeat, but ensure no large sugar grains remain.",
      },
      {
        instruction:
          "Add the vanilla and almond extracts, then beat in the eggs one at a time for about 1 minute until the mixture is light and aerated.",
      },
      {
        instruction:
          "Mix in the dry ingredients on low speed until just barely combined. Finish the last few folds by hand to avoid toughening the dough.",
      },
      {
        instruction: "Fold in the chocolate chips until evenly distributed.",
      },
      {
        instruction:
          "Portion the dough into 60g balls. For the best texture, freeze the dough balls on a tray until solid, then transfer to a freezer bag for storage.",
      },
      {
        instruction:
          "When ready to bake, preheat your oven to 375°F (190°C). Arrange up to 8 dough balls on a parchment-lined sheet.",
      },
      {
        instruction:
          "Bake for 8-10 minutes (add 1-2 minutes if baking from frozen). Remove when the edges are just golden; the centers should still look soft.",
      },
      {
        instruction:
          "Cool on the pan for 5-10 minutes to set before moving to a wire rack.",
      },
    ],
    notes:
      "Adding the extracts before the eggs allows the fat in the butter to better trap and carry the aromatics. Baking from frozen also controls the spread, resulting in a thicker cookie with a chewier center.",
  },

  "sun-scented-hour": {
    slug: "sun-scented-hour",
    category: "Cocktails",
    title: "Sun-Scented Hour",
    description: "A gin drink with orange, allspice, and banana.",
    lede: "The banana is more for body and a hint of sweetness than flavor, but it makes a big difference. The allspice dram is strong, so measure carefully. This works with mezcal too!",
    yield: "1 cocktail",
    prepTime: "5 min",
    ingredients: [
      { amount: "1.5 oz", name: "gin" },
      { amount: "1 oz", name: "Tempus Fugit Crème de Banane" },
      { amount: "0.5 oz", name: "Cointreau" },
      { amount: "0.25 oz", name: "St. Elizabeth Allspice Dram" },
      { amount: "0.5 oz", name: "fresh orange juice" },
      { amount: "0.5 oz", name: "fresh lemon juice" },
    ],
    steps: [
      {
        instruction: "Add all ingredients to a cocktail shaker with ice.",
      },
      {
        instruction: "Shake vigorously until well-chilled, about 15 seconds.",
      },
      {
        instruction: "Strain into a coupe or your glass of choice.",
      },
    ],
  },

  "cucumber-mint-martini": {
    slug: "cucumber-mint-martini",
    category: "Cocktails",
    title: "Cucumber Mint Martini",
    description: "Inspired by our favorite cocktail in Cooperstown, NY",
    lede: "This is my attempt at our favorite cocktail in Cooperstown, NY: the Norbu Martini. If you're planning on making multiple I recommend the syrup, but in a pinch you can muddle fresh mint and cucumber with simple syrup and lemon juice.",
    yield: "1 cocktail",
    prepTime: "5 min",
    ingredients: [
      { amount: "2 oz", name: "Hendricks Gin" },
      { amount: "¾ oz", name: "fresh lemon juice" },
      {
        amount: "¾ oz",
        name: "cucumber mint syrup",
        note: "see recipe, or use simple syrup and muddle fresh",
      },
    ],
    steps: [
      {
        instruction:
          "Chill a martini glass by filling it with ice water while you build the drink.",
      },
      {
        instruction:
          "Add the gin, lemon juice, and cucumber mint syrup to a cocktail shaker.",
      },
      {
        instruction:
          "Fill the shaker with ice and shake vigorously until well-chilled, about 15 seconds.",
      },
      {
        instruction:
          "Discard the ice water from the glass. Double-strain into the chilled martini glass.",
      },
    ],
    notes:
      "For the muddled version: muddle 4 mint leaves and 3 cucumber slices with the lemon and simple syrup before you add ice and gin. You can do both for an extra minty, cucumbery drink.",
  },

  "lapsang-souchong-syrup": {
    slug: "lapsang-souchong-syrup",
    category: "Syrups & Shrubs & Ferments",
    title: "Lapsang Souchong Simple Syrup",
    description:
      "Smoky and sweet, made by infusing lapsang souchong tea into a simple syrup.",
    lede: "Simple syrup infused with lapsang souchong. I love pairing it with mezcal, but it's very versatile.",
    yield: "about 3 cups",
    prepTime: "5 min",
    cookTime: "15 min",
    ingredients: [
      { amount: "1 cup", name: "loose lapsang souchong tea" },
      { amount: "4 cups", name: "water" },
      {
        amount: "equal volume",
        name: "granulated white sugar",
        note: "roughly 3-4 cups; measured after straining",
      },
    ],
    steps: [
      {
        instruction:
          "Bring the water to a gentle simmer in a medium saucepan; don't let it reach a rolling boil.",
      },
      {
        instruction:
          "Add the tea and steep for 10 minutes, stirring occasionally.",
      },
      {
        instruction:
          "Strain through a fine mesh strainer into a large measuring cup. Note the volume of the liquid.",
      },
      {
        instruction:
          "Return the strained tea to the saucepan over low heat. Add an equal volume of sugar (1:1 ratio) and stir until fully dissolved.",
      },
      {
        instruction:
          "Remove from heat and let cool, then bottle and refrigerate. Keeps for up to 2 weeks.",
      },
    ],
  },

  "cucumber-mint-syrup": {
    slug: "cucumber-mint-syrup",
    category: "Syrups & Shrubs & Ferments",
    title: "Cucumber Mint Syrup",
    description: "A simple 1:2 mint syrup with cucumber juice added in.",
    lede: "A 1:1 simple syrup with mint steeped in and cucumber juice added after. Mostly I make this for the Cucumber Mint Martini, but it's useful anywhere you'd use a flavored simple.",
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

  "fruit-shrub": {
    slug: "fruit-shrub",
    category: "Syrups & Shrubs & Ferments",
    title: "Fruit Shrub",
    description:
      "A vinegar-based syrup that's great in cocktails or mocktails.",
    lede: "Fruit, sugar, vinegar. Good mixed with sparkling water, good in cocktails. The berry version is the easy entry point; the roasted peach one is worth the extra effort.",
    yield: "about 2 cups",
    prepTime: "10 min",
    cookTime: "24 hr",
    cookTimeLabel: "macerate",
    ingredients: [
      { amount: "600g", name: "frozen berries" },
      { amount: "300g", name: "white cane sugar" },
      {
        amount: "2 cups",
        name: "vinegar",
        note: "cane + red wine, or red wine + white balsamic",
      },
      { amount: "a few sprigs", name: "fresh thyme", note: "or another herb" },
    ],
    steps: [
      {
        instruction:
          "Combine the frozen berries and sugar in a large bowl or container. Leave at room temperature, uncovered, for 24 hours. The berries will thaw and release their juice as the sugar dissolves into a thick syrup.",
      },
      {
        instruction:
          "Meanwhile, combine the vinegar and thyme sprigs in a separate jar. Let them infuse alongside the berries.",
      },
      {
        instruction:
          "After 24 hours, pour the herb-infused vinegar over the berry mixture and stir to combine.",
      },
      {
        instruction:
          "Strain through a fine mesh strainer, pressing the berries firmly to extract all the juice.",
      },
      {
        instruction: "Bottle and refrigerate. Keeps for several months.",
      },
    ],
    notes:
      "For the roasted peach version: halve and roast a batch of peaches (throw a few halved lemons in the pan too). Weigh the roasted fruit, then blend and strain. Add sugar at half the fruit weight (demerara is best here) and apple cider vinegar at 1 cup per 500g. Rest a day, then bottle.\n\nOn the vinegar: cane and red wine is what I use, but red wine alone is excellent. Red wine and white balsamic also works well with berries. Champagne vinegar is lighter and more floral if you want to go that direction.",
  },

  "lemon-super-juice": {
    slug: "lemon-super-juice",
    category: "Syrups & Shrubs & Ferments",
    title: "Lemon Super Juice",
    description:
      "A shelf-stable lemon juice concentrate made with citric and malic acid.",
    lede: "Easy to make, and highly recommended if you're making cocktails for a party. One batch covers a lot of drinks and keeps for two weeks.",
    yield: "about 2 cups (16oz)",
    prepTime: "2 hr 15 min",
    ingredients: [
      { amount: "500g", name: "water" },
      { amount: "15g", name: "sugar" },
      { amount: "30g", name: "lemon peel", note: "from 1-3 lemons" },
      { amount: "27g", name: "citric acid" },
      { amount: "3g", name: "malic acid" },
      { amount: "1g", name: "salt" },
    ],
    steps: [
      {
        instruction:
          "Peel the lemons, keeping the peels in roughly fingernail-sized pieces.",
      },
      {
        instruction:
          "Combine the peels, sugar, citric acid, malic acid, and salt in a bowl or jar. Stir to combine.",
      },
      {
        instruction:
          "Let the mixture sit at room temperature, stirring once every 30 minutes, for 2 hours. The acids will draw the oils out of the peels.",
      },
      {
        instruction:
          "Add the water and blend lightly, just enough to incorporate. The peels should still be roughly fingernail-sized when you're done; over-blending will make it bitter.",
      },
      {
        instruction:
          "Strain through a fine mesh strainer into a sanitized bottle. Keeps refrigerated for up to 2 weeks.",
      },
    ],
  },

  "lime-super-juice": {
    slug: "lime-super-juice",
    category: "Syrups & Shrubs & Ferments",
    title: "Lime Super Juice",
    description:
      "A shelf-stable lime juice concentrate made with citric and malic acid.",
    lede: "Easy to make, and highly recommended if you're making cocktails for a party. One batch covers a lot of drinks and keeps for two weeks.",
    yield: "about 2 cups (16oz)",
    prepTime: "2 hr 15 min",
    ingredients: [
      { amount: "500g", name: "water" },
      { amount: "15g", name: "sugar" },
      { amount: "20g", name: "lime peel", note: "from 2-4 limes" },
      { amount: "24g", name: "citric acid" },
      { amount: "12g", name: "malic acid" },
      { amount: "1g", name: "sea salt" },
    ],
    steps: [
      {
        instruction:
          "Peel the limes, keeping the peels in roughly fingernail-sized pieces.",
      },
      {
        instruction:
          "Combine the peels, sugar, citric acid, malic acid, and sea salt in a bowl or jar. Stir to combine.",
      },
      {
        instruction:
          "Let the mixture sit at room temperature, stirring once every 30 minutes, for 2 hours. The acids will draw the oils out of the peels.",
      },
      {
        instruction:
          "Add the water and blend lightly, just enough to incorporate. The peels should still be roughly fingernail-sized when you're done; over-blending will make it bitter.",
      },
      {
        instruction:
          "Strain through a fine mesh strainer into a sanitized bottle. Keeps refrigerated for up to 2 weeks.",
      },
    ],
  },

  tepache: {
    slug: "tepache",
    category: "Syrups & Shrubs & Ferments",
    title: "Tepache",
    description: "A traditional Mexican fermented drink made from pineapple.",
    lede: "Fermented pineapple drink made from the rinds and core. Takes about 3 days, most of which is just waiting. This is very hard to mess up, so it's a great intro to fermentation! The flavor is lightly sweet, mildly tangy, and faintly fizzy. Store in the fridge for up to two weeks; it will continue to ferment and become more sour over time.",
    yield: "about 1.5 L",
    prepTime: "20 min",
    cookTime: "2-3 days",
    cookTimeLabel: "ferment",
    ingredients: [
      {
        amount: "1 whole",
        name: "pineapple",
        note: "overripe, organic preferred",
      },
      {
        amount: "100g",
        name: "piloncillo or brown sugar",
        note: "reduce to 50g if you prefer less sweet",
      },
      {
        amount: "to fill",
        name: "water",
        note: "about 1.8 L for a 2 L jar; leave ~5 cm headspace",
      },
      {
        amount: "2-3",
        name: "cinnamon sticks",
        note: "added after the first 24 hours",
      },
      {
        amount: "1 pod",
        name: "star anise",
        note: "optional",
      },
      {
        amount: "6",
        name: "allspice berries",
        note: "optional",
      },
      {
        amount: "4g",
        name: "active dry yeast",
        note: "optional; only if fermentation is slow to start",
      },
    ],
    steps: [
      {
        instruction:
          "Wash the exterior of the pineapple thoroughly, especially if it's not organic.",
      },
      {
        instruction:
          "Cut the rind and core away in large pieces, leaving some flesh attached. Set the pineapple flesh aside for another use.",
      },
      {
        instruction:
          "Warm about 500 mL of the water in a saucepan over medium heat. Add the piloncillo or sugar, plus the star anise and allspice if using. Stir until the sugar is fully dissolved. Remove from heat and let cool to lukewarm.",
      },
      {
        instruction:
          "Pack the rind and core pieces into a 2 L jar. Pour in the spiced sugar water, then add remaining water to fill, leaving about 5 cm of headspace. If using yeast, sprinkle it in now.",
      },
      {
        instruction:
          "Cover with a clean cloth or cheesecloth secured with a rubber band or string. Do not seal airtight. Place in a warm spot, ideally 27-32°C.",
      },
      {
        instruction:
          "After 24 hours, fermentation should be visible: white bubbles forming on the surface. Add the cinnamon sticks.",
      },
      {
        instruction:
          "Continue fermenting for another 1-2 days, tasting as you go. The tepache is ready when it's lightly sweet, mildly tangy, and faintly fizzy. Total time is typically 2-3 days.",
      },
      {
        instruction:
          "Strain through a fine mesh strainer into a swing-top bottle or large jar.",
      },
      {
        instruction:
          "Optional: seal the bottle and leave at room temperature for another 12 hours to build additional carbonation.",
      },
      {
        instruction:
          "Refrigerate for at least 24 hours before opening. Open slowly and over a sink.",
      },
    ],
    notes:
      "Don't go past 3 days or it turns to vinegar (not bad, just different). Temperature is the main variable; warmer means faster. You can run a second batch with the same rinds and core; it'll go faster the second time.\n\nWhite bubbles on the surface after 24 hours are normal fermentation activity. If you don't see any bubbles after 48 hours, you can add a pinch of active dry yeast to kickstart it. If you see pink or orange discoloration, or if it smells off (like rotten fruit), discard and start over.",
  },
};

const CATEGORY_ORDER: Array<{ id: string; label: string }> = [
  { id: "baking", label: "Baking" },
  { id: "cocktails", label: "Cocktails" },
  { id: "syrups", label: "Syrups & Shrubs & Ferments" },
];

export const CATEGORIES = CATEGORY_ORDER.map(({ id, label }) => ({
  id,
  label,
  recipes: Object.values(RECIPES)
    .filter((r) => r.category === label)
    .map(({ slug, title, description }) => ({ slug, title, description })),
}));
