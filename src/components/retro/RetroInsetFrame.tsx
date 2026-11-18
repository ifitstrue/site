import type { ReactNode } from "react";

type RetroInsetFrameProps = {
  children: ReactNode;
  className?: string;
};

export function RetroInsetFrame({ children, className }: RetroInsetFrameProps) {
  return (
    <div className={["retro-inset-frame", className].filter(Boolean).join(" ")}>
      {children}
    </div>
  );
}
