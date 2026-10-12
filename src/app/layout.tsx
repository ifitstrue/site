import type { Metadata } from "next";
import { Be_Vietnam_Pro, Newsreader, Space_Grotesk } from "next/font/google";
import "./globals.css";

const newsreader = Newsreader({
  variable: "--font-headline",
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: "variable",
});

const beVietnamPro = Be_Vietnam_Pro({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-label",
  subsets: ["latin"],
  weight: "variable",
});

import { NavBar } from "@/components/NavBar";
import { NavHoverProvider } from "@/context/NavHoverContext";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.andrewhachten.com"),
  title: {
    template: "%s • Andrew Hachten",
    default: "Andrew Hachten • Personal Site",
  },
  description: "Software engineer, baker, and candlemaker living in Philadelphia.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "Andrew Hachten",
    title: "Andrew Hachten",
    description: "Software engineer, baker, and candlemaker living in Philadelphia.",
  },
  twitter: {
    card: "summary",
    title: "Andrew Hachten",
    description: "Software engineer, baker, and candlemaker living in Philadelphia.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${newsreader.variable} ${beVietnamPro.variable} ${spaceGrotesk.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-body bg-surface text-on-surface selection:bg-primary-container/30 selection:text-on-primary-container">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-200 focus:px-4 focus:py-2 focus:rounded focus:bg-primary focus:text-on-primary focus:font-label focus:text-sm focus:tracking-widest focus:uppercase"
        >
          Skip to main content
        </a>
        <NavHoverProvider>
          <header className="fixed top-0 left-0 right-0 z-50 w-full px-8 md:px-16 py-5 bg-surface/95 backdrop-blur-sm">
            <NavBar />
          </header>

          {children}
        </NavHoverProvider>
      </body>
    </html>
  );
}
