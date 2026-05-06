import type { Metadata } from "next";
import { CATEGORIES, RECIPES, RecipeSummary as Recipe } from "@/data/recipes";

export const metadata: Metadata = { title: "Recipes" };
import Link from "next/link";
import { ReactNode } from "react";

const totalRecipes = CATEGORIES.reduce((n, c) => n + c.recipes.length, 0);

function RecipeRow({
  recipe,
  isExternal,
}: {
  recipe: Recipe;
  isExternal?: boolean;
}) {
  return (
    <div className="relative py-7 flex-1 min-w-0">
      <div className="flex items-start justify-between gap-4 mb-3">
        <h2 className="font-headline text-2xl md:text-3xl italic text-on-surface group-hover:text-tertiary transition-colors duration-200 leading-tight">
          {recipe.title}
        </h2>
        {isExternal && (
          <span className="text-xl text-tertiary-fixed-dim/50 group-hover:text-tertiary group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-200 mt-1 shrink-0">
            ↗
          </span>
        )}
      </div>
      <p className="font-body text-on-surface-variant text-sm leading-relaxed mb-4">
        {recipe.description}
      </p>
      <div className="absolute left-0 bottom-0 h-px w-full bg-outline-variant group-hover:bg-tertiary-fixed-dim transition-colors duration-300" />
    </div>
  );
}

function RecipeEntry({ recipe }: { recipe: Recipe }): ReactNode {
  const isInternal = recipe.slug in RECIPES;
  const isExternal = recipe.slug.startsWith("http");

  if (isInternal) {
    return (
      <Link href={`/recipes/${recipe.slug}`} className="group flex">
        <RecipeRow recipe={recipe} />
      </Link>
    );
  }

  if (isExternal) {
    return (
      <Link
        href={recipe.slug}
        className="group flex"
        target="_blank"
        rel="noopener noreferrer"
      >
        <RecipeRow recipe={recipe} isExternal />
      </Link>
    );
  }

  return (
    <div className="group flex">
      <RecipeRow recipe={recipe} />
    </div>
  );
}

export default function Recipes() {
  return (
    <main className="pt-24 px-8 md:px-16 pb-24 max-w-4xl mx-auto">
      <div className="mb-16">
        <p className="font-label text-xs tracking-[0.3em] uppercase text-tertiary mb-4">
          Kitchen
        </p>
        <div className="flex items-end justify-between gap-4">
          <h1 className="font-headline text-7xl md:text-8xl italic leading-none text-on-surface">
            Recipes
          </h1>
          <span className="font-label text-[10px] tracking-[0.2em] text-on-surface/60 uppercase pb-1.5">
            {totalRecipes} recipes
          </span>
        </div>
        <div className="mt-6 h-0.5 bg-tertiary-fixed-dim" />
      </div>

      <div className="space-y-16">
        {CATEGORIES.map((category) => (
          <section key={category.id}>
            <div className="flex items-center justify-between mb-1">
              <p className="font-label text-xs tracking-[0.3em] uppercase text-tertiary">
                {category.label}
              </p>
              <span className="font-label text-[10px] tracking-[0.2em] text-on-surface/60 uppercase">
                {category.recipes.length}{" "}
                {category.recipes.length === 1 ? "recipe" : "recipes"}
              </span>
            </div>
            <div className="h-px bg-outline-variant mb-1" />
            <div>
              {category.recipes.map((recipe) => (
                <RecipeEntry key={recipe.title} recipe={recipe} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}
