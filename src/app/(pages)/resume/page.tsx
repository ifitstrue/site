import type { Metadata } from "next";
import { readFile } from "node:fs/promises";
import path from "node:path";
import ReactMarkdown, { type Components } from "react-markdown";
import { RetroButtonLink } from "@/components/retro/RetroButtonLink";
import { RetroActionBar } from "@/components/retro/RetroActionBar";
import { RetroDocument } from "@/components/retro/RetroDocument";
import { RetroPageShell } from "@/components/retro/RetroPageShell";

export const metadata: Metadata = {
  title: "Resume",
  description: "Andrew Hachten's experience as a technical lead and full-stack engineer.",
  alternates: { canonical: "/resume" },
  openGraph: {
    title: "Andrew Hachten's Resume",
    description: "Andrew Hachten's experience as a technical lead and full-stack engineer.",
    url: "/resume",
    type: "website",
    siteName: "Andrew Hachten",
  },
  twitter: {
    card: "summary",
    title: "Andrew Hachten's Resume",
    description: "Andrew Hachten's experience as a technical lead and full-stack engineer.",
  },
};

const markdownComponents: Components = {
  h1: ({ children }) => <h1 className="retro-resume-name">{children}</h1>,
  h2: ({ children }) => <h2 className="retro-resume-section-heading">{children}</h2>,
  h3: ({ children }) => <h3 className="retro-resume-entry-heading">{children}</h3>,
  p: ({ children }) => <p className="retro-resume-paragraph">{children}</p>,
  ul: ({ children }) => <ul className="retro-resume-list">{children}</ul>,
  li: ({ children }) => <li>{children}</li>,
  a: ({ children, href }) => <a href={href} className="retro-resume-link">{children}</a>,
  strong: ({ children }) => <strong className="retro-resume-label">{children}</strong>,
};

export default async function Resume() {
  const source = await readFile(path.join(process.cwd(), "content/resume.md"), "utf8");

  return (
    <RetroPageShell>
      <main id="main-content" className="retro-internal-main">
        <RetroActionBar ariaLabel="Résumé actions" width="wide">
          <RetroButtonLink href="/andrew-hachten-resume.pdf" download>
            Download PDF ↓
          </RetroButtonLink>
          <RetroButtonLink href="/about">About Andrew →</RetroButtonLink>
        </RetroActionBar>
        <RetroDocument className="retro-resume-document">
          <article className="retro-resume-content">
            <ReactMarkdown components={markdownComponents}>{source}</ReactMarkdown>
          </article>
        </RetroDocument>
      </main>
    </RetroPageShell>
  );
}
