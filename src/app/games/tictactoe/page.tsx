"use client";

import PlayersEditorModal from "@/games/tictactoe/components/PlayersEditorModal";
import StatusMessage from "@/games/tictactoe/components/StatusMessage";
import SuperBoard from "@/games/tictactoe/components/SuperBoard";
import TurnControls from "@/games/tictactoe/components/TurnControls";
import { useState } from "react";

export default function TicTacToePage() {
  const [isPlayersModalOpen, setIsPlayersModalOpen] = useState(false);

  return (
    <main className="min-h-screen bg-surface pt-24 pb-20 px-8 md:px-16 max-w-4xl mx-auto flex flex-col gap-10">
      <div>
        <p className="font-label text-xs tracking-[0.3em] uppercase text-tertiary mb-4">
          Game
        </p>
        <div className="flex items-end justify-between gap-4">
          <h1 className="font-headline text-7xl md:text-8xl italic leading-none text-on-surface">
            Super Tic Tac Toe
          </h1>
          <span className="font-label text-xs tracking-widest text-on-surface-variant uppercase pb-2">
            2 players
          </span>
        </div>
        <div className="mt-6 h-0.5 bg-tertiary-fixed-dim" />
        <p className="mt-4 font-body text-on-surface-variant text-sm leading-relaxed">
          A nested 3×3 strategy game where each move determines the next board.
        </p>
      </div>

      <div className="flex justify-center">
        <StatusMessage />
      </div>

      <div className="w-full aspect-square mx-auto" style={{ maxWidth: 750 }}>
        <SuperBoard />
      </div>

      <div className="flex justify-center">
        <TurnControls onEditPlayers={() => setIsPlayersModalOpen(true)} />
      </div>

      <PlayersEditorModal
        isOpen={isPlayersModalOpen}
        onClose={() => setIsPlayersModalOpen(false)}
      />
    </main>
  );
}
