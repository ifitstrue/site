import type { ReactNode } from "react";
import { RetroInsetFrame } from "./RetroInsetFrame";

type RetroDocumentProps = {
  children: ReactNode;
  className?: string;
};

export function RetroDocument({ children, className }: RetroDocumentProps) {
  return (
    <RetroInsetFrame className={className}>
      <div className="retro-document">{children}</div>
    </RetroInsetFrame>
  );
}
