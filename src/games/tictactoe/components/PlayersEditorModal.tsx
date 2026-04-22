"use client";

import Modal from "@/components/ui/Modal";
import { useGameStore } from "../store";
import PlayerEditor from "./PlayerEditor";

interface PlayersEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PlayersEditorModal({
  isOpen,
  onClose,
}: PlayersEditorModalProps) {
  const players = useGameStore((s) => s.players);

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Edit Players">
      <div className="flex flex-col -mx-8 -mt-8 -mb-8">
        {players.map((p, i) => (
          <div key={p.id} className="px-8 border-b border-outline-variant/20 last:border-b-0">
            <PlayerEditor playerId={p.id} index={i} />
          </div>
        ))}
      </div>
    </Modal>
  );
}
