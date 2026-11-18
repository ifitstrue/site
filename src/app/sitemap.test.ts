import { describe, expect, it } from "vitest";
import sitemap from "./sitemap";

describe("sitemap", () => {
  it("contains only the personal site pages", () => {
    const urls = sitemap().map(({ url }) => url);

    expect(urls).toEqual([
      "https://www.andrewhachten.com",
      "https://www.andrewhachten.com/about",
      "https://www.andrewhachten.com/resume",
    ]);
    expect(urls.some((url) => url.includes("/projects"))).toBe(false);
    expect(urls.some((url) => url.includes("/recipes"))).toBe(false);
  });
});
