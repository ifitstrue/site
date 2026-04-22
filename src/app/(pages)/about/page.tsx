import type { Metadata } from "next";

export const metadata: Metadata = { title: "About" };

export default function About() {
  return (
    <main className="pt-24 px-8 md:px-16 pb-24 max-w-4xl mx-auto">
      <div className="mb-16">
        <p className="font-label text-xs tracking-[0.3em] uppercase text-tertiary mb-4">
          Profile
        </p>
        <div className="flex items-end justify-between gap-4">
          <h1 className="font-headline text-7xl md:text-8xl italic leading-none text-on-surface">
            About
          </h1>
          <span className="font-label text-[10px] tracking-[0.2em] text-on-surface/60 uppercase pb-1.5">
            1 person
          </span>
        </div>
        <div className="mt-6 h-0.5 bg-tertiary-fixed-dim" />
      </div>

      <section className="space-y-8">
        <div className="space-y-6">
          <p className="font-body text-on-surface-variant text-lg leading-relaxed">
            Hi! My name is Andrew Hachten. I'm a professional software engineer
            and a semi-professional baker and candlemaker. I currently live in
            Philadelphia with my wife and our dog!
          </p>
          <p className="font-body text-on-surface-variant text-lg leading-relaxed">
            I created this site to showcase my recipes and projects, and to play
            around with silly ideas that I have.
          </p>
          <p className="font-body text-on-surface-variant text-lg leading-relaxed">
            Feel free to reach out if you're looking for a software engineer,
            baker, cocktail maker, candlemaker, or someone named Andrew.
          </p>
        </div>
      </section>
    </main>
  );
}
