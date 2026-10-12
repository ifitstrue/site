import { describe, expect, it } from "vitest";
import { addGreenHint, addYellowHint, type TileState } from "./hints";

const tiles = (...values: Array<[string, TileState["color"]]>): TileState[] =>
  values.map(([letter, color]) => ({ letter, color }));

describe("addGreenHint", () => {
  it("replaces an incorrect green instead of deadlocking", () => {
    const current = tiles(
      ["x", "green"],
      ["r", "green"],
      ["a", "green"],
      ["n", "green"],
      ["e", "green"],
    );

    expect(addGreenHint(current, "crane", () => 0)).toEqual(
      tiles(
        ["c", "green"],
        ["r", "green"],
        ["a", "green"],
        ["n", "green"],
        ["e", "green"],
      ),
    );
  });

  it("does not overwrite a correct green", () => {
    const current = tiles(
      ["c", "green"],
      ["", "unset"],
      ["", "unset"],
      ["", "unset"],
      ["", "unset"],
    );

    expect(addGreenHint(current, "crane", () => 0)[1]).toEqual({
      letter: "r",
      color: "green",
    });
  });
});

describe("addYellowHint", () => {
  it("does not repeat manually entered yellow letters", () => {
    const current = tiles(
      ["c", "yellow"],
      ["", "unset"],
      ["", "unset"],
      ["", "unset"],
      ["", "unset"],
    );

    expect(addYellowHint("crane", current, [], () => 0)).toEqual(["r"]);
  });
});
