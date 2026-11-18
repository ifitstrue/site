import type { ReactNode } from "react";

type RetroButtonLinkProps = {
  href: string;
  children: ReactNode;
  download?: boolean;
  className?: string;
};

export function RetroButtonLink({
  href,
  children,
  download = false,
  className,
}: RetroButtonLinkProps) {
  return (
    <a
      href={href}
      download={download || undefined}
      className={["retro-button", className].filter(Boolean).join(" ")}
    >
      {children}
    </a>
  );
}
