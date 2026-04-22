import type { Metadata } from "next";
import { PROJECTS } from "@/data/projects";

export const metadata: Metadata = { title: "Projects" };
import Link from "next/link";

export default function Projects() {
  return (
    <main className="pt-24 px-8 md:px-16 pb-24 max-w-4xl mx-auto">
      <div className="mb-16">
        <p className="font-label text-xs tracking-[0.3em] uppercase text-tertiary mb-4">
          Catalogue
        </p>
        <div className="flex items-end justify-between gap-4">
          <h1 className="font-headline text-7xl md:text-8xl italic leading-none text-on-surface">
            Projects
          </h1>
          <span className="font-label text-[10px] tracking-[0.2em] text-on-surface/80 uppercase pb-1.5">
            {PROJECTS.length} {PROJECTS.length === 1 ? "item" : "items"}
          </span>
        </div>
        <div className="mt-6 h-0.5 bg-tertiary-fixed-dim" />
      </div>

      <div>
        {PROJECTS.map((project, index) => (
          <Link key={project.slug} href={project.href} className="group block">
            <div className="relative py-10 flex gap-6 md:gap-10 items-start">
              <span className="hidden md:block font-headline text-7xl italic leading-none text-secondary/20 group-hover:text-tertiary-fixed-dim/40 transition-colors duration-500 select-none w-20 shrink-0 pt-1 text-right">
                {String(index + 1).padStart(2, "0")}
              </span>

              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <h2 className="font-headline text-3xl md:text-4xl italic text-on-surface group-hover:text-tertiary transition-colors duration-200 leading-tight">
                    {project.title}
                  </h2>
                  <span className="text-2xl text-tertiary-fixed-dim/50 group-hover:text-tertiary group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-200 mt-1 shrink-0">
                    ↗
                  </span>
                </div>

                <p className="font-body text-on-surface-variant text-sm leading-relaxed mb-6 max-w-prose">
                  {project.description}
                </p>
              </div>

              <div className="absolute left-0 bottom-0 h-px w-full bg-outline-variant group-hover:bg-tertiary-fixed-dim transition-colors duration-300" />
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
