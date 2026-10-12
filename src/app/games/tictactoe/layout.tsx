import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Super Tic Tac Toe",
  description: "Play a two-player game of Super Tic Tac Toe in your browser.",
  alternates: { canonical: "/games/tictactoe" },
  openGraph: { title: "Super Tic Tac Toe", url: "/games/tictactoe" },
  twitter: { card: "summary", title: "Super Tic Tac Toe" },
};

export default function TictactoeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
