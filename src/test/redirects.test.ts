import { describe, expect, it } from "vitest";
import nextConfig from "../../next.config";

describe("permanent route redirects", () => {
  it("sends migrated sections to their new homes", async () => {
    const redirects = await nextConfig.redirects?.();

    expect(redirects).toEqual(
      expect.arrayContaining([
        { source: "/projects", destination: "https://ifitstrue.dev", permanent: true },
        { source: "/candles", destination: "https://www.sleepingstonecandles.com/", permanent: true },
        { source: "/recipes", destination: "https://edgecase.recipes", permanent: true },
        { source: "/recipes/:path*", destination: "https://edgecase.recipes", permanent: true },
        { source: "/tools", destination: "https://ifitstrue.dev", permanent: true },
        { source: "/tools/:path*", destination: "https://ifitstrue.dev", permanent: true },
      ]),
    );
    expect(redirects?.some(({ source }) => source.startsWith("/api/"))).toBe(false);
  });
});
