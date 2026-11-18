import type { ReactNode } from "react";

type RetroPageShellProps = {
  children: ReactNode;
  className?: string;
};

export function RetroPageShell({
  children,
  className,
}: RetroPageShellProps) {
  return (
    <div className={["retro-page-shell", className].filter(Boolean).join(" ")}>
      {children}
    </div>
  );
}
