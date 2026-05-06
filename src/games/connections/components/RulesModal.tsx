"use client";

import { Modal } from "@/components/ui/Modal";

interface RulesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RulesModal = ({ isOpen, onClose }: RulesModalProps) => (
  <Modal isOpen={isOpen} onClose={onClose} title="How to Play">
    <div className="flex flex-col gap-6 font-body text-sm text-on-surface-variant leading-relaxed">
      <section className="flex flex-col gap-2">
        <h3 className="font-label text-xs tracking-widest uppercase text-on-surface">
          The Game
        </h3>
        <p>
          {
            "Find four groups of four words that share something in common. Select four tiles and hit Submit to guess a category. You get four mistakes before the game ends."
          }
        </p>
        <p>
          {
            "Categories are color-coded by difficulty: yellow is easiest, then green, blue, and purple."
          }
        </p>
      </section>

      <section className="flex flex-col gap-2">
        <h3 className="font-label text-xs tracking-widest uppercase text-on-surface">
          Hints
        </h3>
        <p>
          {"Clicking "}
          <span className="font-label text-on-surface">Hint</span>
          {
            " reveals one tile from the easiest unsolved category. Tap it again to reveal another, and again for a third"
          }
        </p>
        <p>
          {
            "If you've already selected tiles from a single category, Hint fills in from that group instead."
          }
        </p>
      </section>

      <section className="flex flex-col gap-2">
        <h3 className="font-label text-xs tracking-widest uppercase text-on-surface">
          Previous Guesses
        </h3>
        <p>
          {
            "Wrong guesses are saved below the board. Hover to highlight them on the board, or tap to re-select those tiles."
          }
        </p>
      </section>
    </div>
  </Modal>
);
