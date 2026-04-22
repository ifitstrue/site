"use client";

import { PropsWithChildren, ReactNode } from "react";

interface ModalProps extends PropsWithChildren {
  isOpen: boolean;
  onClose: () => void;
  title?: ReactNode;
}

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
}: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-inverse-surface/60 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      />
      <div className="relative bg-surface-container rounded-lg shadow-modal max-w-lg w-full mx-auto max-h-[90vh] overflow-y-auto border border-outline-variant/20">
        {title && (
          <div className="sticky top-0 border-b border-outline-variant/20 px-8 py-6 flex items-center justify-between bg-surface-container/95 backdrop-blur-md z-10">
            <h2 className="font-headline italic text-2xl text-on-surface">{title}</h2>
            <button
              onClick={onClose}
              className="text-on-surface-variant/40 hover:text-tertiary transition-colors p-2 active:scale-95 flex items-center justify-center h-10 w-10"
              aria-label="Close modal"
            >
              <span className="text-4xl leading-none pt-1">×</span>
            </button>
          </div>
        )}
        <div className="p-8">{children}</div>
      </div>
    </div>
  );
}
