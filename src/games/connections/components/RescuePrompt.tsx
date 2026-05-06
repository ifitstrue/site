"use client";

import { Modal } from "@/components/ui/Modal";
import { getRepairsAvailable, recordRepair } from "../hooks/useStreak";

interface RescuePromptProps {
  isOpen: boolean;
  onClose: (repaired: boolean) => void;
}

export const RescuePrompt = ({ isOpen, onClose }: RescuePromptProps) => {
  const repairs = getRepairsAvailable();

  return (
    <Modal isOpen={isOpen} onClose={() => onClose(false)} title="Missed a day?">
      <div className="flex flex-col gap-6">
        <p className="font-body text-sm text-on-surface-variant leading-relaxed">
          You have <strong>{repairs} streak repair(s)</strong> available. Would you
          like to use one to repair your streak?
        </p>
        <div className="flex gap-3 justify-end">
          <button
            type="button"
            onClick={() => onClose(false)}
            className="font-label text-xs tracking-widest uppercase px-4 py-2 rounded-sm text-on-surface-variant hover:text-primary transition-colors"
          >
            No thanks
          </button>
          <button
            type="button"
            onClick={() => {
              recordRepair();
              onClose(true);
            }}
            className="font-label text-xs tracking-widest uppercase px-4 py-2 rounded-sm bg-primary text-on-primary hover:bg-primary-fixed-dim transition-colors"
          >
            Yes, repair
          </button>
        </div>
      </div>
    </Modal>
  );
};
