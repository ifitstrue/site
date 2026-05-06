export type Project = {
  slug: string;
  title: string;
  description: string;
  href: string;
};

export const PROJECTS: Project[] = [
  {
    slug: "liars-dice",
    title: "Liar's Dice",
    description:
      "A companion app for the classic bluffing dice game. Replaces physical cups and dice — shake your phone to roll.",
    href: "/games/liarsdice",
  },
  {
    slug: "super-tic-tac-toe",
    title: "Super Tic Tac Toe",
    description:
      "A nested 3×3 strategy game where each move determines which board your opponent must play on next. Supports multiple players with customizable names, colors, and icons.",
    href: "/games/tictactoe",
  },
];
