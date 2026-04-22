import type { Metadata } from "next";
import { RESUME, ResumeItem } from "@/data/resume";

export const metadata: Metadata = { title: "Resume" };

function ResumeRow({ item, index }: { item: ResumeItem; index: number }) {
  const displayIndex = String(RESUME.length - index).padStart(2, "0");

  return (
    <div className="group relative py-8 md:py-12 flex gap-6 md:gap-10 items-start first:pt-0">
      <span className="hidden md:block font-headline text-7xl italic leading-none text-secondary/20 group-hover:text-tertiary-fixed-dim/40 transition-colors duration-500 select-none w-20 shrink-0 pt-1 text-right">
        {displayIndex}
      </span>

      <div className="flex-1 min-w-0">
        <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-1 md:gap-2 mb-3 md:mb-4">
          <h2 className="font-headline text-2xl md:text-4xl italic text-on-surface group-hover:text-tertiary transition-colors duration-300 leading-tight">
            <span className="block md:inline">{item.role}</span>
            <span className="hidden md:inline text-on-surface/40 group-hover:text-tertiary/60 transition-colors mx-3 font-light">
              •
            </span>
            <span className="block md:inline text-secondary/80 group-hover:text-tertiary transition-colors">
              {item.company}
            </span>
          </h2>
          <span className="font-label text-[10px] tracking-[0.2em] text-on-surface/80 uppercase whitespace-nowrap md:pt-1">
            {item.period}
          </span>
        </div>

        <p className="font-label text-[10px] tracking-[0.2em] uppercase text-on-surface/60 mb-4 md:mb-6">
          {item.tech.join(" • ")}
        </p>

        <ul className="space-y-3 md:space-y-4">
          {item.points.map((point, i) => (
            <li key={i} className="flex gap-3 md:gap-4">
              <span className="h-px w-3 bg-tertiary-fixed-dim/40 mt-4 shrink-0" />
              <p className="font-body text-on-surface-variant text-sm leading-relaxed">
                {point}
              </p>
            </li>
          ))}
        </ul>
      </div>

      <div className="absolute left-0 bottom-0 h-px w-full bg-outline-variant/30 group-hover:bg-tertiary-fixed-dim/40 transition-colors duration-500" />
    </div>
  );
}

export default function Resume() {
  return (
    <main className="pt-24 px-8 md:px-16 pb-24 max-w-4xl mx-auto">
      <div className="mb-16">
        <p className="font-label text-xs tracking-[0.3em] uppercase text-tertiary mb-4">
          Catalogue
        </p>
        <div className="flex items-end justify-between gap-4">
          <h1 className="font-headline text-6xl md:text-7xl lg:text-8xl italic leading-none text-on-surface">
            Resume
          </h1>
          <span className="font-label text-[10px] tracking-[0.2em] text-on-surface/80 uppercase pb-1.5">
            {RESUME.length} entries
          </span>
        </div>
        <div className="mt-6 h-0.5 bg-tertiary-fixed-dim" />
        <div className="flex gap-4 mt-4">
          <a
            href="https://github.com/ifitstrue"
            target="_blank"
            rel="noopener noreferrer"
            className="font-label text-[10px] tracking-[0.2em] uppercase text-secondary/80 hover:text-tertiary transition-colors duration-300"
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/andrewhachten/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-label text-[10px] tracking-[0.2em] uppercase text-secondary/80 hover:text-tertiary transition-colors duration-300"
          >
            LinkedIn
          </a>
        </div>
      </div>

      <div className="space-y-0">
        {RESUME.map((item, index) => (
          <ResumeRow
            key={`${item.company}-${item.role}`}
            item={item}
            index={index}
          />
        ))}
      </div>
    </main>
  );
}
