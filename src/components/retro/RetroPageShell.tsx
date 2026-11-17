import type { ReactNode } from "react";

type RetroPageShellProps = {
  title: string;
  homeHref?: string;
  children: ReactNode;
  className?: string;
};

export function RetroPageShell({
  title,
  homeHref,
  children,
  className,
}: RetroPageShellProps) {
  return (
    <div className={["retro-page-shell", className].filter(Boolean).join(" ")}>
      <header className="retro-titlebar-shell" data-dialog-background>
        <div className="retro-titlebar">
          {homeHref ? <a href={homeHref}>{title}</a> : <span>{title}</span>}
        </div>
      </header>
      {children}
    </div>
  );
}
