import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Resume from "./page";

describe("résumé page", () => {
  it("renders the semantic web résumé inside the retro document", async () => {
    const { container } = render(await Resume());

    expect(screen.queryByRole("link", { name: "Andrew Hachten’s Résumé" })).toBeNull();
    expect(screen.getByRole("heading", { level: 1, name: "Andrew Hachten" })).toBeTruthy();
    expect(screen.getByRole("heading", { level: 2, name: "Experience" })).toBeTruthy();
    expect(screen.getByRole("heading", { level: 2, name: "Skills" })).toBeTruthy();
    expect(screen.getByRole("heading", { level: 2, name: "Education" })).toBeTruthy();
    expect(container.querySelector(".retro-resume-document")).not.toBeNull();
    expect(container.querySelector("footer")).toBeNull();
  });

  it("preserves the supplied résumé content", async () => {
    render(await Resume());

    expect(screen.getByText("Technical Lead | Full-Stack Engineer")).toBeTruthy();
    expect(screen.getByText(/Philadelphia, PA/)).toBeTruthy();
    expect(screen.getByRole("heading", { name: "Head of Engineering | Prometheus" })).toBeTruthy();
    expect(screen.getByText("Feb 2025 – Present")).toBeTruthy();
    expect(screen.getByText(/Mentored 70\+ bootcamp graduates/)).toBeTruthy();
    expect(screen.getByText(/Mentored co-ops as the team grew from 4 to 15\+ engineers/)).toBeTruthy();
    expect(screen.getByText(/JavaScript, TypeScript, React, Next.js/)).toBeTruthy();
    expect(screen.getByRole("heading", { name: "BS in Computer Engineering | Drexel University" })).toBeTruthy();
  });

  it("keeps private contact details out of the webpage", async () => {
    const { container } = render(await Resume());

    expect(container.textContent).not.toMatch(/ajhachten@gmail\.com/i);
    expect(container.textContent).not.toMatch(/717[-–]329[-–]0741/);
    expect(container.querySelector('a[href^="mailto:"]')).toBeNull();
    expect(container.querySelector('a[href^="tel:"]')).toBeNull();
  });

  it("offers the unchanged PDF and a return to About", async () => {
    render(await Resume());

    expect(screen.getByRole("link", { name: "← Home" }).getAttribute("href")).toBe("/");
    const download = screen.getByRole("link", { name: "Download PDF ↓" });
    expect(download.getAttribute("href")).toBe("/andrew-hachten-resume.pdf");
    expect(download.hasAttribute("download")).toBe(true);
    expect(screen.getByRole("link", { name: "About Andrew →" }).getAttribute("href")).toBe("/about");
  });
});
