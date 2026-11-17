import type { ReactNode } from "react";

type RetroDocumentProps = {
  children: ReactNode;
  className?: string;
};

export function RetroDocument({ children, className }: RetroDocumentProps) {
  return (
    <div className={["retro-document-frame", className].filter(Boolean).join(" ")}>
      <div className="retro-document">{children}</div>
    </div>
  );
}
