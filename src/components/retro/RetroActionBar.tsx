import type { ReactNode } from "react";
import { RetroButtonLink } from "./RetroButtonLink";

type RetroActionBarProps = {
  ariaLabel: string;
  width: "narrow" | "wide";
  children: ReactNode;
};

export function RetroActionBar({ ariaLabel, width, children }: RetroActionBarProps) {
  return (
    <nav
      className={`retro-internal-actions retro-internal-actions--${width}`}
      aria-label={ariaLabel}
    >
      <RetroButtonLink href="/">← Home</RetroButtonLink>
      <div className="retro-internal-actions__group">{children}</div>
    </nav>
  );
}
