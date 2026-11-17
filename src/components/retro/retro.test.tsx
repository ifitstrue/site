import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { RetroButtonLink } from "./RetroButtonLink";
import { RetroDocument } from "./RetroDocument";
import { RetroPageShell } from "./RetroPageShell";

describe("retro page primitives", () => {
  it("renders an internal page title as a home link without adding another main landmark", () => {
    const { container } = render(
      <RetroPageShell title="Andrew Hachten’s Résumé" homeHref="/">
        <main id="main-content">Résumé content</main>
      </RetroPageShell>,
    );

    expect(container.querySelector("header")).not.toBeNull();
    expect(
      screen.getByRole("link", { name: "Andrew Hachten’s Résumé" }).getAttribute("href"),
    ).toBe("/");
    expect(container.querySelectorAll("main")).toHaveLength(1);
    expect(container.querySelector("footer")).toBeNull();
  });

  it("renders the homepage title as text when no home link is supplied", () => {
    render(
      <RetroPageShell title="Andrew Hachten’s Home Page">
        <main id="main-content">Home</main>
      </RetroPageShell>,
    );

    expect(screen.queryByRole("link", { name: "Andrew Hachten’s Home Page" })).toBeNull();
    expect(screen.getByText("Andrew Hachten’s Home Page")).toBeTruthy();
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
