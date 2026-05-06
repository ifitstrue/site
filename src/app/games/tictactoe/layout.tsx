import type { Metadata } from "next";

export const metadata: Metadata = { title: "Super Tic Tac Toe" };

export default function TictactoeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
