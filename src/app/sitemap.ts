import type { MetadataRoute } from "next";
import { RECIPES } from "@/data/recipes";

const BASE_URL = "https://www.andrewhachten.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = [
    "",
    "/about",
    "/projects",
    "/recipes",
    "/resume",
    "/games/tictactoe",
    "/tools/connections",
    "/tools/wordle",
  ];
  return [
    ...pages.map((path) => ({ url: `${BASE_URL}${path}` })),
    ...Object.values(RECIPES).map((recipe) => ({
      url: `${BASE_URL}/recipes/${recipe.slug}`,
    })),
  ];
}
