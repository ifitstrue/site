import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import About from "./page";

describe("About page", () => {
  it("presents the current About copy in the retro document layout", () => {
    const { container } = render(<About />);

    expect(screen.queryByRole("link", { name: "Andrew Hachten’s About Page" })).toBeNull();
    expect(screen.getByRole("heading", { name: "About Andrew" }).classList.contains("sr-only")).toBe(true);
    expect(container.querySelector("section[aria-labelledby='about-andrew']")).not.toBeNull();
    expect(container.querySelector(".retro-about-readable-copy")).not.toBeNull();
    expect(screen.getByText(/Hi! My name is Andrew Hachten/)).toBeTruthy();
    expect(screen.getByText(/unnecessarily complicated version of tic tac toe/)).toBeTruthy();
    expect(screen.getByText(/someone named Andrew/)).toBeTruthy();
    expect(container.querySelector(".retro-document")).not.toBeNull();
  });

  it("links to the résumé without adding contact details or a footer", () => {
    const { container } = render(<About />);

    expect(screen.getByRole("link", { name: "← Home" }).getAttribute("href")).toBe("/");
    expect(screen.getByRole("link", { name: "View résumé →" }).getAttribute("href")).toBe("/resume");
    expect(screen.getByRole("navigation", { name: "About page actions" })).toBeTruthy();
    expect(screen.queryByText(/ajhachten@gmail\.com/i)).toBeNull();
    expect(screen.queryByText(/717[-–]329[-–]0741/)).toBeNull();
    expect(container.querySelector("footer")).toBeNull();
  });
});
