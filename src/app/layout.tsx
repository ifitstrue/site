import type { Metadata } from "next";
import { Be_Vietnam_Pro, Newsreader, Space_Grotesk } from "next/font/google";
import "./globals.css";

const newsreader = Newsreader({
  variable: "--font-headline",
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
});

const beVietnamPro = Be_Vietnam_Pro({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-label",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

import { NavBar } from "@/components/NavBar";
import { NavHoverProvider } from "@/context/NavHoverContext";

export const metadata: Metadata = {
  title: {
    template: "%s • Andrew Hachten",
    default: "Andrew Hachten • Personal Site",
  },
  description: "Software Engineer, Baker, and Candlemaker",
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
        <NavHoverProvider>
          <header className="fixed top-0 left-0 right-0 z-50 w-full px-8 md:px-16 py-5">
            <NavBar />
          </header>

          {children}
        </NavHoverProvider>
      </body>
    </html>
  );
}
