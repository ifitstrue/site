import type { Metadata } from "next";

export const metadata: Metadata = { title: "Wordle" };

export default function WordleLayout({ children }: { children: React.ReactNode }) {
  return children;
}
