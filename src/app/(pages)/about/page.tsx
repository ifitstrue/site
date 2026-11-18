import type { Metadata } from "next";
import { RetroButtonLink } from "@/components/retro/RetroButtonLink";
import { RetroActionBar } from "@/components/retro/RetroActionBar";
import { RetroDocument } from "@/components/retro/RetroDocument";
import { RetroPageShell } from "@/components/retro/RetroPageShell";

export const metadata: Metadata = {
  title: "About",
  description: "About Andrew Hachten, a software engineer, baker, and candlemaker in Philadelphia.",
  alternates: { canonical: "/about" },
  openGraph: { title: "About Andrew Hachten", description: "About Andrew Hachten, a software engineer, baker, and candlemaker in Philadelphia.", url: "/about", type: "website", siteName: "Andrew Hachten" },
  twitter: { card: "summary", title: "About Andrew Hachten", description: "About Andrew Hachten, a software engineer, baker, and candlemaker in Philadelphia." },
};

export default function About() {
  return (
    <RetroPageShell>
      <main id="main-content" className="retro-internal-main">
        <RetroActionBar ariaLabel="About page actions" width="narrow">
          <RetroButtonLink href="/resume">View résumé →</RetroButtonLink>
        </RetroActionBar>
        <RetroDocument className="retro-about-document">
          <section
            className="retro-about-essay"
            aria-labelledby="about-andrew"
          >
            <h1 id="about-andrew" className="sr-only">About Andrew</h1>
            <p>
              Hi! My name is Andrew Hachten. I live in Philadelphia with my wife,
              Hannah, and our dog, Duke.
            </p>
            <p>
              I&apos;m a professional software engineer and a semi-professional baker
              and candlemaker. I&apos;ve been a full-stack engineer for over a decade;
              I&apos;ve also baked for weddings and sold baked goods and candles at
              craft fairs.
            </p>
            <p>
              I made this site to serve as a hub for my other sites and projects.
              The design is inspired by the World Wide Websites I browsed when I
              was a kid.
            </p>
            <p>
              Feel free to reach out if you&apos;re looking for a software engineer,
              baker, candlemaker, or someone named Andrew.
            </p>
            <p>P.S. See if you can find the Easter eggs ☺</p>
          </section>
        </RetroDocument>
      </main>
    </RetroPageShell>
  );
}
