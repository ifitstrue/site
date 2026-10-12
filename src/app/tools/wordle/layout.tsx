import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Wordle Hints",
  description: "Get yellow or green hints for the daily Wordle puzzle.",
  alternates: { canonical: "/tools/wordle" },
  openGraph: { title: "Wordle Hints", url: "/tools/wordle" },
  twitter: { card: "summary", title: "Wordle Hints" },
};

export default function WordleLayout({ children }: { children: React.ReactNode }) {
  return children;
}
