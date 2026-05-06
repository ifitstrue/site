"use client";

interface OutScreenProps {
  onNewGame: () => void;
}

export const OutScreen = ({ onNewGame }: OutScreenProps) => {
  return (
    <div className="flex flex-col items-center gap-6 py-16">
      <p className="font-headline italic text-4xl text-error">{"You're out"}</p>
      <p className="font-body text-sm text-on-surface-variant">No dice remaining</p>
      <button
        type="button"
        onClick={onNewGame}
        className="font-label text-sm tracking-widest uppercase px-8 py-3.5 rounded-sm bg-primary text-on-primary hover:bg-primary-fixed-dim transition-colors duration-200"
      >
        New Game
      </button>
    </div>
  );
};
