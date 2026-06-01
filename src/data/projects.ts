export type Project = {
  slug: string;
  title: string;
  description: string;
  href: string;
};

export const PROJECTS: Project[] = [
  {
    slug: "super-tic-tac-toe",
    title: "Super Tic Tac Toe",
    description:
      "A nested 3×3 strategy game where each move determines which board your opponent must play on next. Supports multiple players with customizable names, colors, and icons.",
    href: "/games/tictactoe",
  },
  {
    slug: "connections-hints",
    title: "Connections Hints",
    description:
      "A hint-giver for the NYT Connections puzzle. Reveals one word per category at a time, from easiest to hardest. Mark categories solved to skip them.",
    href: "/tools/connections",
  },
  {
    slug: "wordle-hints",
    title: "Wordle Hints",
    description:
      "A hint-giver for Wordle. Request a yellow hint (letter in the word) or a green hint (letter + position). Enter what you already know to keep track.",
    href: "/tools/wordle",
  },
  {
    slug: "liars-dice",
    title: "Liar's Dice",
    description:
      "A companion app for the classic bluffing dice game. Replaces physical cups and dice; shake your phone to roll!",
    href: "/games/liarsdice",
  },
  {
    slug: "personal-site",
    title: "Personal Site",
    description: "Where you are, right now! Written in Next.js + TypeScript",
    href: "https://github.com/ifitstrue/site",
  },
];
