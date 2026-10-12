import { describe, expect, it } from "vitest";
import { PROJECTS } from "./projects";

describe("project descriptions", () => {
  it("accurately describes Super Tic Tac Toe as a two-player game", () => {
    const project = PROJECTS.find((item) => item.slug === "super-tic-tac-toe");

    expect(project?.description).toContain("nine games of tic tac toe");
    expect(project?.description).toContain("two players");
    expect(project?.description).not.toContain("multiple players");
  });

  it("uses direct first-person language for the personal site", () => {
    const project = PROJECTS.find((item) => item.slug === "personal-site");

    expect(project?.description).toBe(
      "Where you are right now! I built it with Next.js and TypeScript.",
    );
  });
});
