import type { Metadata } from "next";

export const metadata: Metadata = { title: "Liar's Dice" };

export default function LiarsDiceLayout({ children }: { children: React.ReactNode }) {
  return children;
}
