import type { Metadata } from "next";
import { RetroButtonLink } from "@/components/retro/RetroButtonLink";
import { RetroDocument } from "@/components/retro/RetroDocument";
import { RetroPageShell } from "@/components/retro/RetroPageShell";

export const metadata: Metadata = {
  title: "About",
  description: "About Andrew Hachten, a software engineer, baker, cocktail maker, and candlemaker in Philadelphia.",
  alternates: { canonical: "/about" },
  openGraph: { title: "About Andrew Hachten", description: "About Andrew Hachten, a software engineer, baker, cocktail maker, and candlemaker in Philadelphia.", url: "/about", type: "website", siteName: "Andrew Hachten" },
  twitter: { card: "summary", title: "About Andrew Hachten", description: "About Andrew Hachten, a software engineer, baker, cocktail maker, and candlemaker in Philadelphia." },
};

export default function About() {
  return (
    <RetroPageShell>
      <main id="main-content" className="retro-internal-main">
        <nav
          className="retro-internal-actions retro-about-actions"
          aria-label="About page actions"
        >
          <RetroButtonLink href="/">← Home</RetroButtonLink>
          <div className="retro-internal-actions__group">
            <RetroButtonLink href="/resume">View résumé →</RetroButtonLink>
          </div>
        </nav>
        <RetroDocument className="retro-about-document">
          <section
            className="retro-about-essay retro-about-readable-copy"
            aria-labelledby="about-andrew"
          >
            <h1 id="about-andrew" className="sr-only">About Andrew</h1>
            {/* Temporary copy: review before publication because it references removed site content. */}
            <p>
              Hi! My name is Andrew Hachten. I&apos;m a professional software engineer
              and a semi-professional baker, cocktail maker, and candlemaker. I live
              in Philadelphia with my wife, Hannah, and our dog, Duke.
            </p>
            <p>
              I made this site as a home for the things I make and the occasional
              silly idea I wanted to turn into a real thing. Right now, that mostly
              means recipes, puzzle hints, and an unnecessarily complicated version
              of tic tac toe.
            </p>
            <p>
              Feel free to reach out if you&apos;re looking for a software engineer,
              baker, cocktail maker, candlemaker, or someone named Andrew.
            </p>
          </section>
        </RetroDocument>
      </main>
    </RetroPageShell>
  );
}
