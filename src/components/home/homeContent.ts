export type DestinationKey = "projects" | "recipes" | "candles";

export type HomeDestination = {
  key: DestinationKey;
  title: string;
  description: string;
  transformedDescription: string;
  href: string;
  preview: "projects" | "recipes" | "candles";
};

export const INITIAL_COPY = {
  heading: "Hi, I'm Andrew!",
  body: "I'm a software engineer, baker, and candlemaker living in Philadelphia. You can find links to my projects, recipes, and candles here! You can also move all of these words around, if you want.",
} as const;

export const TRANSFORMED_COPY = {
  heading: "Hi, you're Andrew!",
  body: "You're a software engineer, baker, and candlemaker living in Philadelphia. I can find links to your projects, recipes, and candles here! I can also move all of these words around, if I want.",
} as const;

export const HOME_DESTINATIONS: HomeDestination[] = [
  {
    key: "projects",
    title: "If It’s True",
    description: "My games, tools, and other projects.",
    transformedDescription: "Your games, tools, and other projects.",
    href: "https://ifitstrue.dev",
    preview: "projects",
  },
  {
    key: "recipes",
    title: "Edge Case Recipes",
    description: "My baking and cocktail recipes.",
    transformedDescription: "Your baking and cocktail recipes.",
    href: "https://edgecase.recipes",
    preview: "recipes",
  },
  {
    key: "candles",
    title: "Sleeping Stone",
    description: "Candle company I started, with candles inspired by poetry and nature.",
    transformedDescription:
      "Candle company you started, with candles inspired by poetry and nature.",
    href: "https://www.sleepingstonecandles.com/",
    preview: "candles",
  },
];
