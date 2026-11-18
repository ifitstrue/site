import type { Metadata } from "next";
import {
  IBM_Plex_Serif,
  Instrument_Sans,
} from "next/font/google";
import "./globals.css";

const ibmPlexSerif = IBM_Plex_Serif({
  variable: "--font-ec-serif",
  subsets: ["latin"],
  weight: "500",
  style: "normal",
});

const instrumentSans = Instrument_Sans({
  variable: "--font-ec-sans",
  subsets: ["latin"],
  weight: "600",
  style: "normal",
});

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
      className={`${ibmPlexSerif.variable} ${instrumentSans.variable}`}
    >
      <body className="site-body">
        <a
          href="#main-content"
          data-dialog-background
          className="site-skip-link"
        >
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}
