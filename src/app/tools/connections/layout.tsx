import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Connections Hints",
  description: "Get gradual hints for the daily NYT Connections puzzle.",
  alternates: { canonical: "/tools/connections" },
  openGraph: { title: "Connections Hints", description: "Get gradual hints for the daily NYT Connections puzzle.", url: "/tools/connections", type: "website", siteName: "Andrew Hachten" },
  twitter: { card: "summary", title: "Connections Hints", description: "Get gradual hints for the daily NYT Connections puzzle." },
};

export default function ConnectionsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
