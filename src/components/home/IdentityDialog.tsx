"use client";

import { useEffect, useRef } from "react";

type IdentityDialogProps = {
  open: boolean;
  onClose: () => void;
};

export function IdentityDialog({ open, onClose }: IdentityDialogProps) {
  const confirmRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) return;

    previousFocusRef.current = document.activeElement as HTMLElement | null;
    const backgroundElements = Array.from(
      document.querySelectorAll<HTMLElement>("[data-dialog-background]"),
    ).map((element) => ({ element, wasInert: element.hasAttribute("inert") }));
    const previousOverflow = document.body.style.overflow;
    backgroundElements.forEach(({ element }) => element.setAttribute("inert", ""));
    document.body.style.overflow = "hidden";
    confirmRef.current?.focus();

    return () => {
      backgroundElements.forEach(({ element, wasInert }) => {
        if (!wasInert) element.removeAttribute("inert");
      });
      document.body.style.overflow = previousOverflow;
      previousFocusRef.current?.focus();
    };
  }, [open]);

  if (!open) return null;

  return (
    <div className="retro-identity-overlay">
      <div
        className="retro-identity-dialog"
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="identity-dialog-title"
        aria-describedby="identity-dialog-message"
        onKeyDown={(event) => {
          if (event.key === "Escape") {
            event.preventDefault();
            onClose();
          } else if (event.key === "Tab") {
            event.preventDefault();
            confirmRef.current?.focus();
          }
        }}
      >
        <div className="retro-identity-titlebar">
          <h2 id="identity-dialog-title">Identity Update</h2>
        </div>
        <div className="retro-identity-body">
          <p id="identity-dialog-message">Congratulations! You are now Andrew Hachten.</p>
          <button ref={confirmRef} className="retro-button" type="button" onClick={onClose}>
            OK
          </button>
        </div>
      </div>
    </div>
  );
}
