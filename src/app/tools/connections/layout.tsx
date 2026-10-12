import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Connections Hints",
  description: "Get gradual hints for the daily NYT Connections puzzle.",
  alternates: { canonical: "/tools/connections" },
  openGraph: { title: "Connections Hints", url: "/tools/connections" },
  twitter: { card: "summary", title: "Connections Hints" },
};

export default function ConnectionsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
