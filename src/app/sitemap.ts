import type { MetadataRoute } from "next";

const BASE_URL = "https://www.andrewhachten.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = [
    "",
    "/about",
    "/resume",
    "/tools/connections",
    "/tools/wordle",
  ];
  return pages.map((path) => ({ url: `${BASE_URL}${path}` }));
}
