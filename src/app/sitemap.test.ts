import { describe, expect, it } from "vitest";
import sitemap from "./sitemap";

describe("sitemap", () => {
  it("contains only the personal pages and temporarily retained puzzle tools", () => {
    const urls = sitemap().map(({ url }) => url);

    expect(urls).toEqual([
      "https://www.andrewhachten.com",
      "https://www.andrewhachten.com/about",
      "https://www.andrewhachten.com/resume",
      "https://www.andrewhachten.com/tools/connections",
      "https://www.andrewhachten.com/tools/wordle",
    ]);
    expect(urls.some((url) => url.includes("/projects"))).toBe(false);
    expect(urls.some((url) => url.includes("/recipes"))).toBe(false);
    expect(urls.some((url) => url.includes("/games/tictactoe"))).toBe(false);
  });
});
