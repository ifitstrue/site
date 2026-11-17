import { describe, expect, it } from "vitest";
import { allIdentityTargetsMatched, overlapRatio, type Rect } from "./identityTrigger";

const word: Rect = { left: 0, top: 0, right: 100, bottom: 20, width: 100, height: 20 };

describe("overlapRatio", () => {
  it("returns zero when rectangles do not overlap", () => {
    expect(
      overlapRatio(word, { left: 101, top: 0, right: 201, bottom: 20, width: 100, height: 20 }),
    ).toBe(0);
  });

  it("measures intersection against the draggable word area", () => {
    expect(
      overlapRatio(word, { left: 50, top: 0, right: 150, bottom: 20, width: 100, height: 20 }),
    ).toBe(0.5);
  });

  it("distinguishes fifty-nine and sixty percent overlap", () => {
    expect(
      overlapRatio(word, { left: 41, top: 0, right: 141, bottom: 20, width: 100, height: 20 }),
    ).toBe(0.59);
    expect(
      overlapRatio(word, { left: 40, top: 0, right: 140, bottom: 20, width: 100, height: 20 }),
    ).toBe(0.6);
  });

  it("caps full containment at one", () => {
    expect(
      overlapRatio(word, { left: -10, top: -10, right: 110, bottom: 30, width: 120, height: 40 }),
    ).toBe(1);
  });
});

describe("allIdentityTargetsMatched", () => {
  it("requires every destination to meet the threshold", () => {
    expect(allIdentityTargetsMatched({ projects: 0.6, recipes: 0.75, candles: 1 })).toBe(true);
    expect(allIdentityTargetsMatched({ projects: 0.59, recipes: 0.75, candles: 1 })).toBe(false);
  });

  it("rejects a missing destination", () => {
    expect(allIdentityTargetsMatched({ projects: 1, recipes: 1 })).toBe(false);
  });
});
