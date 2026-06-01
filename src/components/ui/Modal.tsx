"use client";

import { PropsWithChildren, ReactNode, useEffect, useRef, useId } from "react";

interface ModalProps extends PropsWithChildren {
  isOpen: boolean;
  onClose: () => void;
  title?: ReactNode;
}

export const Modal = ({
  isOpen,
  onClose,
  title,
  children,
}: ModalProps) => {
  const titleId = useId();
  const dialogRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<Element | null>(null);
  const onCloseRef = useRef(onClose);
  useEffect(() => { onCloseRef.current = onClose; });

  useEffect(() => {
    if (isOpen) {
      triggerRef.current = document.activeElement;
    } else {
      if (triggerRef.current instanceof HTMLElement) {
        triggerRef.current.focus();
      }
      triggerRef.current = null;
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const dialog = dialogRef.current;
    if (!dialog) return;

    const focusableSelectors =
      'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

    const getFocusable = () =>
      Array.from(dialog.querySelectorAll<HTMLElement>(focusableSelectors));

    const rafId = requestAnimationFrame(() => {
      getFocusable()[0]?.focus();
    });

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onCloseRef.current();
        return;
      }
      if (e.key !== "Tab") return;

      const focusable = getFocusable();
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-inverse-surface/60 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? titleId : undefined}
        className="relative bg-surface-container rounded-lg shadow-modal max-w-lg w-full mx-auto max-h-[90vh] overflow-y-auto border border-outline-variant/20"
      >
        {title && (
          <div className="sticky top-0 border-b border-outline-variant/20 px-8 py-6 flex items-center justify-between bg-surface-container/95 backdrop-blur-md z-10">
            <h2 id={titleId} className="font-headline italic text-2xl text-on-surface">{title}</h2>
            <button
              type="button"
              onClick={onClose}
              className="text-on-surface-variant/40 hover:text-tertiary transition-colors p-2 active:scale-95 flex items-center justify-center h-10 w-10"
              aria-label="Close modal"
            >
              <span className="text-4xl leading-none pt-1" aria-hidden="true">×</span>
            </button>
          </div>
        )}
        <div className="p-8">{children}</div>
      </div>
    </div>
  );
};
