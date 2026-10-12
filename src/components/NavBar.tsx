"use client";

import { useNavHover } from "@/context/NavHoverContext";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useReducer, useRef } from "react";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/recipes", label: "Recipes" },
  { href: "/resume", label: "Resume" },
];

export function NavBar() {
  const pathname = usePathname();
  const { setHoveredLink } = useNavHover();
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const [mobileOpen, dispatch] = useReducer(
    (_: boolean, next: boolean) => next,
    false
  );

  useEffect(() => {
    dispatch(false);
  }, [pathname]);

  useEffect(() => {
    if (!mobileOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    mobileMenuRef.current?.querySelector<HTMLAnchorElement>("a")?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        dispatch(false);
        menuButtonRef.current?.focus();
        return;
      }
      if (event.key === "Tab") {
        const links = mobileMenuRef.current?.querySelectorAll<HTMLAnchorElement>("a");
        if (!links?.length) return;
        const first = links[0];
        const last = links[links.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [mobileOpen]);

  return (
    <>
      <nav className="hidden md:block">
        <ul className="flex items-center gap-14">
          {NAV_LINKS.map(({ href, label }, i) => {
            const isActive = pathname === href || pathname.startsWith(href + "/");
            return (
              <li
                key={href}
                className="relative group"
                onMouseEnter={() => setHoveredLink(label)}
                onMouseLeave={() => setHoveredLink(null)}
              >
                <Link
                  href={href}
                  aria-current={isActive ? "page" : undefined}
                  className={`flex items-baseline transition-all duration-300 font-headline italic text-xl py-2 ${
                    isActive
                      ? "text-tertiary scale-105"
                      : "text-on-surface/50 hover:text-primary"
                  }`}
                >
                  <span
                    className={`font-label text-[10px] tracking-[0.3em] transition-colors duration-300 mr-3 ${
                      isActive
                        ? "text-tertiary-fixed-dim"
                        : "text-tertiary-fixed-dim/30 group-hover:text-primary/60"
                    }`}
                  >
                    0{i + 1}
                  </span>
                  <span className="relative">{label}</span>
                </Link>
                <div
                  className={`absolute bottom-0 left-0 right-0 h-0.5 bg-tertiary-fixed-dim transition-all duration-500 ease-out origin-left ${
                    isActive
                      ? "opacity-100 scale-x-100"
                      : "opacity-0 scale-x-0 group-hover:opacity-30 group-hover:scale-x-100"
                  }`}
                />
              </li>
            );
          })}
        </ul>
      </nav>

      <nav className="md:hidden flex items-center justify-end w-full">
        <button
          ref={menuButtonRef}
          onClick={() => dispatch(!mobileOpen)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav-menu"
          className="p-2 -mr-2 text-on-surface/60"
        >
          <div className="w-5 flex flex-col gap-1.25">
            <span
              className={`block h-px bg-current transition-all duration-300 origin-center ${
                mobileOpen ? "rotate-45 translate-y-1.5" : ""
              }`}
            />
            <span
              className={`block h-px bg-current transition-all duration-300 ${
                mobileOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block h-px bg-current transition-all duration-300 origin-center ${
                mobileOpen ? "-rotate-45 -translate-y-1.5" : ""
              }`}
            />
          </div>
        </button>
      </nav>

      {mobileOpen && (
        <div
          ref={mobileMenuRef}
          id="mobile-nav-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
          className="md:hidden fixed inset-x-0 top-17 bottom-0 bg-surface z-40 px-8 py-6"
        >
          <ul className="flex flex-col gap-1">
            {NAV_LINKS.map(({ href, label }, i) => {
              const isActive =
                pathname === href || pathname.startsWith(href + "/");
              return (
                <li key={href}>
                  <Link
                    href={href}
                    aria-current={isActive ? "page" : undefined}
                    className={`flex items-baseline py-3 transition-colors duration-300 font-headline italic text-2xl ${
                      isActive
                        ? "text-tertiary"
                        : "text-on-surface/50"
                    }`}
                  >
                    <span
                      className={`font-label text-[10px] tracking-[0.3em] mr-4 ${
                        isActive
                          ? "text-tertiary-fixed-dim"
                          : "text-tertiary-fixed-dim/30"
                      }`}
                    >
                      0{i + 1}
                    </span>
                    {label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </>
  );
}
