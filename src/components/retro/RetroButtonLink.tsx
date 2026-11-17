import type { ReactNode } from "react";

type RetroButtonLinkProps = {
  href: string;
  children: ReactNode;
  download?: boolean;
  external?: boolean;
  className?: string;
};

export function RetroButtonLink({
  href,
  children,
  download = false,
  external = false,
  className,
}: RetroButtonLinkProps) {
  return (
    <a
      href={href}
      download={download || undefined}
      data-external={external || undefined}
      className={["retro-button", className].filter(Boolean).join(" ")}
    >
      {children}
    </a>
  );
}
