import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { RetroButtonLink } from "./RetroButtonLink";
import { RetroActionBar } from "./RetroActionBar";
import { RetroDocument } from "./RetroDocument";
import { RetroPageShell } from "./RetroPageShell";

describe("retro page primitives", () => {
  it.each([
    ["narrow", "retro-internal-actions--narrow"],
    ["wide", "retro-internal-actions--wide"],
  ] as const)("renders the %s internal action bar with Home and supplied actions", (width, widthClass) => {
    render(
      <RetroActionBar ariaLabel="Page actions" width={width}>
        <RetroButtonLink href="/next">Next →</RetroButtonLink>
      </RetroActionBar>,
    );

    const navigation = screen.getByRole("navigation", { name: "Page actions" });
    expect(navigation.classList.contains(widthClass)).toBe(true);
    expect(screen.getByRole("link", { name: "← Home" }).getAttribute("href")).toBe("/");
    expect(screen.getByRole("link", { name: "Next →" }).getAttribute("href")).toBe("/next");
  });

  it("renders page content without a separate masthead", () => {
    const { container } = render(
      <RetroPageShell>
        <main id="main-content">Résumé content</main>
      </RetroPageShell>,
    );

    expect(container.querySelector("header")).toBeNull();
    expect(screen.queryByText("Andrew Hachten’s Résumé")).toBeNull();
    expect(container.querySelectorAll("main")).toHaveLength(1);
    expect(container.querySelector("footer")).toBeNull();
  });

  it("keeps external links in the same tab", () => {
    render(
      <RetroButtonLink href="https://ifitstrue.dev" external>
        Visit ↗
      </RetroButtonLink>,
    );

    const link = screen.getByRole("link", { name: "Visit ↗" });
    expect(link.getAttribute("target")).toBeNull();
    expect(link.getAttribute("rel")).toBeNull();
  });

  it("preserves the PDF download attribute", () => {
    render(
      <RetroButtonLink href="/andrew-hachten-resume.pdf" download>
        Download PDF ↓
      </RetroButtonLink>,
    );

    expect(screen.getByRole("link", { name: "Download PDF ↓" }).hasAttribute("download")).toBe(
      true,
    );
  });

  it("provides a reusable document surface", () => {
    const { container } = render(<RetroDocument>Document copy</RetroDocument>);
    expect(container.querySelector(".retro-document")?.textContent).toBe("Document copy");
  });
});
