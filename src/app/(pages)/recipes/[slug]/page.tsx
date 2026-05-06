import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { RECIPES } from "@/data/recipes";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const recipe = RECIPES[slug];
  if (!recipe) return {};
  return { title: recipe.title };
}

function formatAmount(amount: string): string {
  return amount.replace(/^(\d+(?:\.\d+)?(?:\/\d+)?)([a-zA-Z])/, "$1 $2");
}

export default async function RecipePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const recipe = RECIPES[slug];
  if (!recipe) notFound();

  const metaTags = [
    recipe.yield,
    `${recipe.prepTime} prep`,
    ...(recipe.cookTime ? [`${recipe.cookTime} ${recipe.cookTimeLabel ?? "cook"}`] : []),
  ];

  return (
    <main className="pt-24 px-8 md:px-16 pb-24 max-w-4xl mx-auto">
      <Link
        href="/recipes"
        className="font-label text-[0.65rem] tracking-[0.25em] uppercase text-on-surface-variant/50 hover:text-tertiary transition-colors mb-10 block"
      >
        ← All Recipes
      </Link>

      <div className="mb-14">
        <p className="font-label text-xs tracking-[0.3em] uppercase text-tertiary mb-4">
          {recipe.category}
        </p>
        <h1 className="font-headline text-6xl md:text-7xl italic leading-[1.05] text-on-surface">
          {recipe.title}
        </h1>
        <div className="mt-6 h-0.5 bg-tertiary-fixed-dim" />
        <p className="mt-5 font-label text-[10px] tracking-[0.2em] uppercase text-on-surface/60">
          {metaTags.join(" • ")}
        </p>
        <p className="mt-5 font-headline italic text-on-surface-variant text-lg leading-relaxed">
          {recipe.lede}
        </p>
      </div>

      <section className="mb-14">
        <div className="flex items-center justify-between mb-1">
          <p className="font-label text-xs tracking-[0.3em] uppercase text-tertiary">
            Ingredients
          </p>
          <span className="font-label text-[10px] tracking-[0.2em] text-on-surface/80 uppercase">
            {recipe.ingredients.length} items
          </span>
        </div>
        <div className="h-px bg-outline-variant" />
        <div>
          {recipe.ingredients.map((ingredient) => (
            <div
              key={ingredient.name}
              className="flex items-baseline gap-6 py-4 border-b border-outline-variant/40 last:border-0"
            >
              <span className="font-label text-xs tracking-widest text-tertiary uppercase w-20 shrink-0 text-right leading-relaxed">
                {formatAmount(ingredient.amount)}
              </span>
              <span className="font-body text-on-surface text-sm">
                {ingredient.name}
                {ingredient.note && (
                  <span className="text-on-surface/60 text-[0.8rem] ml-2 font-medium">
                    ({ingredient.note})
                  </span>
                )}
              </span>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-14">
        <div className="flex items-center justify-between mb-1">
          <p className="font-label text-xs tracking-[0.3em] uppercase text-tertiary">
            Method
          </p>
          <span className="font-label text-[10px] tracking-[0.2em] text-on-surface/80 uppercase">
            {recipe.steps.length} steps
          </span>
        </div>
        <div className="h-px bg-outline-variant" />
        <div>
          {recipe.steps.map((step, i) => (
            <div
              key={i}
              className="flex gap-8 py-7 border-b border-outline-variant/40 last:border-0"
            >
              <span className="font-headline text-4xl italic text-secondary/50 leading-none shrink-0 w-10 text-right mt-0.5 select-none">
                {String(i + 1).padStart(2, "0")}
              </span>

              <p className="font-body text-on-surface text-sm leading-relaxed">
                {step.instruction}
              </p>
            </div>
          ))}
        </div>
      </section>

      {recipe.notes && (
        <section>
          <div className="flex items-center justify-between mb-1">
            <p className="font-label text-xs tracking-[0.3em] uppercase text-tertiary">
              Notes
            </p>
          </div>
          <div className="h-px bg-outline-variant mb-5" />
          <div className="space-y-4">
            {recipe.notes.split("\n\n").map((para, i) => (
              <p key={i} className="font-headline italic text-on-surface-variant text-lg leading-relaxed">
                {para}
              </p>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
