export type Project = {
  slug: string;
  title: string;
  description: string;
  href: string;
};

export const PROJECTS: Project[] = [
  {
    slug: "personal-site",
    title: "Personal Site",
    description: "Where you are, right now! Written in Next.js + TypeScript",
    href: "https://github.com/ifitstrue/site",
  },
  {
    slug: "super-tic-tac-toe",
    title: "Super Tic Tac Toe",
    description:
      "A nested 3×3 strategy game where each move determines which board your opponent must play on next. Supports multiple players with customizable names, colors, and icons.",
    href: "/games/tictactoe",
  },
];
