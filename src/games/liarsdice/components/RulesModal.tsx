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
            "Liar's Dice is a game of bluffing and deduction. Players take turns making bids about the dice in their cup and the cups of other players. To read the full rules for Single Hand Liar's Dice, I recommend checking out the "
          }
          <a
            href="https://www.dicegamedepot.com/liars-dice-rules/"
            target="_blank"
            className="font-label text-on-surface underline"
          >
            {"Dice Game Depot's page"}
          </a>
          {" on it."}
        </p>
      </section>

      <section className="flex flex-col gap-2">
        <h3 className="font-label text-xs tracking-widest uppercase text-on-surface">
          Using This App
        </h3>
        <p>
          {
            "This page replaces the physical cups and dice. Bidding and challenging still happens in person; it's more fun that way!"
          }
        </p>
        <ul className="flex flex-col gap-2 list-none mt-1">
          <li>
            <span className="font-label text-on-surface">Roll:</span> shake your
            phone or tap to roll your dice.
          </li>
          <li>
            <span className="font-label text-on-surface">Tap the cup:</span>
            {" peek at your values privately; tap again to conceal them."}
          </li>
          <li>
            <span className="font-label text-on-surface">Next Round:</span> you
            survived; roll for the next round.
          </li>
          <li>
            <span className="font-label text-on-surface">
              Bluff Unsuccessful:
            </span>
            {" you got caught bluffing; lose a die."}
          </li>
          <li>
            <span className="font-label text-on-surface">
              Challenge Unsuccessful:
            </span>
            {" you challenged a bid that held up; lose a die."}
          </li>
        </ul>
      </section>

      <section className="flex flex-col gap-2">
        <h3 className="font-label text-xs tracking-widest uppercase text-on-surface">
          Wilds
        </h3>
        <p>
          {"Dice showing "}
          <span className="font-label" style={{ color: "#c0392b" }}>
            1
          </span>
          {" are wild. They count as any face value when tallying bids."}
        </p>
      </section>
    </div>
  </Modal>
);
