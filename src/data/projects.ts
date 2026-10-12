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
      "Super Tic Tac Toe is nine games of tic tac toe happening at once. The square you choose determines which board the next player has to use. It supports two players with custom names, colors, and icons.",
    href: "/games/tictactoe",
  },
  {
    slug: "connections-hints",
    title: "Connections Hints",
    description:
      "A hint-giver for the NYT Connections puzzle. It reveals one word at a time, working through the categories from easiest to hardest. Once you solve a category, mark it complete and move on.",
    href: "/tools/connections",
  },
  {
    slug: "wordle-hints",
    title: "Wordle Hints",
    description:
      "A hint-giver for Wordle. Ask for a yellow hint (a letter in the word) or a green hint (a letter and its position). You can enter what you already know as you go.",
    href: "/tools/wordle",
  },
  {
    slug: "personal-site",
    title: "Personal Site",
    description: "Where you are right now! I built it with Next.js and TypeScript.",
    href: "https://github.com/ifitstrue/site",
  },
];
