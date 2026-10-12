import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Resume from "./page";

describe("resume page", () => {
  it("renders the public profile without an email address or phone number", () => {
    render(<Resume />);

    expect(screen.getByText("Technical Lead | Full-Stack Engineer")).toBeTruthy();
    expect(screen.getByText("Philadelphia, PA")).toBeTruthy();
    expect(document.querySelector('a[href^="mailto:"]')).toBeNull();
    expect(document.querySelector('a[href^="tel:"]')).toBeNull();
  });

  it("renders the updated experience, skills, and education", () => {
    render(<Resume />);

    expect(screen.getByText("Feb 2025 – Present")).toBeTruthy();
    expect(screen.getByText(/Mentored 70\+ bootcamp graduates/)).toBeTruthy();
    expect(screen.getAllByRole("heading", { name: /Full-Stack Engineer/ })).toHaveLength(4);
    expect(screen.queryByText("Full-Stack Web3 Engineer")).toBeNull();
    expect(screen.getByRole("heading", { name: "Skills" })).toBeTruthy();
    expect(screen.getByText(/JavaScript, TypeScript, React, Next.js/)).toBeTruthy();
    expect(screen.getByRole("heading", { name: "Education" })).toBeTruthy();
    expect(screen.getByText("BS in Computer Engineering")).toBeTruthy();
    expect(screen.getByText("Drexel University")).toBeTruthy();
  });
});
