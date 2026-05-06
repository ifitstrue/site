"use client";

import { useEffect, useReducer, useCallback, useState, useRef } from "react";
import { useConnectionsStore, isCorrectGuess } from "@/games/connections/store";
import { usePuzzle } from "@/games/connections/hooks/usePuzzle";
import { useProgressPersistence, restoreProgress } from "@/games/connections/hooks/useProgressPersistence";
import {
  getDayResult,
  recordDayResult,
  computeStreak,
  getRepairsAvailable,
} from "@/games/connections/hooks/useStreak";
import { LayoutGroup } from "framer-motion";
import { GameHeader } from "@/games/connections/components/GameHeader";
import { TileGrid } from "@/games/connections/components/TileGrid";
import { RescuePrompt } from "@/games/connections/components/RescuePrompt";
import { PreviousGuesses } from "@/games/connections/components/PreviousGuesses";

type PageState = {
  showRescue: boolean;
  streak: number;
};

type PageAction =
  | { type: "SET_STREAK"; streak: number }
  | { type: "SHOW_RESCUE" }
  | { type: "HIDE_RESCUE" };

const pageReducer = (state: PageState, action: PageAction): PageState => {
  switch (action.type) {
    case "SET_STREAK":
      return { ...state, streak: action.streak };
    case "SHOW_RESCUE":
      return { ...state, showRescue: true };
    case "HIDE_RESCUE":
      return { ...state, showRescue: false };
  }
};

const daysAgo = (n: number): string => {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return d.toISOString().split("T")[0];
};

const ANIM_DURATION = 250;

const MistakeIndicator = ({ mistakes }: { mistakes: number }) => (
  <div className="flex gap-2 justify-center py-1">
    {[0, 1, 2, 3].map((i) => (
      <div
        key={i}
        className={`w-4 h-4 rounded-full border-2 transition-colors duration-300 ${
          i < mistakes ? "bg-error border-error" : "border-on-surface-variant/40 bg-on-surface-variant/10"
        }`}
      />
    ))}
  </div>
);

export default function ConnectionsPage() {
  const today = new Date().toISOString().split("T")[0];
  const [selectedDate, setSelectedDate] = useState(today);
  const { puzzle, loading, error } = usePuzzle(selectedDate);
  const initPuzzle = useConnectionsStore((s) => s.initPuzzle);
  const revealedCategories = useConnectionsStore((s) => s.revealedCategories);
  const gameStatus = useConnectionsStore((s) => s.gameStatus);
  const tiles = useConnectionsStore((s) => s.tiles);
  const selections = useConnectionsStore((s) => s.selections);
  const mistakes = useConnectionsStore((s) => s.mistakes);
  const previousGuesses = useConnectionsStore((s) => s.previousGuesses);
  const submitGuess = useConnectionsStore((s) => s.submitGuess);
  const finalizeAnimation = useConnectionsStore((s) => s.finalizeAnimation);
  const [page, dispatch] = useReducer(pageReducer, {
    showRescue: false,
    streak: 0,
  });
  const [animatingIds, setAnimatingIds] = useState<string[]>([]);
  const [animPhase, setAnimPhase] = useState<"idle" | "shaking" | "flying">("idle");

  const isInitializingRef = useRef(false);
  useProgressPersistence(selectedDate, isInitializingRef);

  useEffect(() => {
    if (puzzle) {
      isInitializingRef.current = true;
      initPuzzle(puzzle);
      restoreProgress(selectedDate);
      isInitializingRef.current = false;
      dispatch({ type: "SET_STREAK", streak: computeStreak() });
    }
  }, [puzzle, initPuzzle, selectedDate]);

  useEffect(() => {
    if (gameStatus !== "won") return;
    if (selectedDate !== today) return;
    if (getDayResult(selectedDate)) return;

    recordDayResult(selectedDate, "won", mistakes);

    if (selectedDate === today) {
      const prevDate = daysAgo(1);
      const twoDaysAgoDate = daysAgo(2);
      if (
        !getDayResult(prevDate) &&
        getDayResult(twoDaysAgoDate)?.status === "won" &&
        getRepairsAvailable() > 0
      ) {
        dispatch({ type: "SHOW_RESCUE" });
      }
    }

    dispatch({ type: "SET_STREAK", streak: computeStreak() });
  }, [gameStatus, selectedDate, mistakes, today]);

  useEffect(() => {
    if (gameStatus !== "lost") return;
    if (selectedDate !== today) return;
    if (getDayResult(selectedDate)) return;
    recordDayResult(selectedDate, "lost", mistakes);
  }, [gameStatus, selectedDate, mistakes, today]);

  const handleRescue = useCallback(
    (repaired: boolean) => {
      dispatch({ type: "HIDE_RESCUE" });
      if (repaired) {
        const prevDate = daysAgo(1);
        recordDayResult(prevDate, "won", 0);
      }
      dispatch({ type: "SET_STREAK", streak: computeStreak() });
    },
    []
  );

  const handleSubmit = useCallback(() => {
    if (selections.length !== 4 || gameStatus !== "playing" || animPhase !== "idle") return;

    const sortedWords = selections.map((id) => tiles.find((t) => t.id === id)!.word).sort();
    const isDuplicate = previousGuesses.some((g) => g.every((w, i) => w === sortedWords[i]));
    if (isDuplicate) {
      setAnimatingIds([...selections]);
      setAnimPhase("shaking");
      setTimeout(() => { setAnimatingIds([]); setAnimPhase("idle"); }, 400);
      return;
    }

    if (isCorrectGuess(selections, tiles, revealedCategories)) {
      const ids = [...selections];
      submitGuess();

      setAnimatingIds(ids);
      setAnimPhase("flying");

      setTimeout(() => {
        finalizeAnimation();
        setAnimatingIds([]);
        setAnimPhase("idle");
      }, ANIM_DURATION);
    } else {
      const ids = [...selections];
      submitGuess();
      setAnimatingIds(ids);
      setAnimPhase("shaking");
      setTimeout(() => {
        setAnimatingIds([]);
        setAnimPhase("idle");
      }, 400);
    }
  }, [selections, tiles, revealedCategories, previousGuesses, gameStatus, animPhase, submitGuess, finalizeAnimation]);

  if (loading) {
    return (
      <main className="min-h-screen bg-surface pt-24 pb-20 px-8 md:px-16 max-w-4xl mx-auto flex flex-col gap-10">
        <div className="animate-pulse space-y-4">
          <div className="h-6 w-48 bg-surface-container-high rounded mx-auto" />
          <div className="h-0.5 bg-tertiary-fixed-dim" />
          <div className="grid grid-cols-4 gap-2 max-w-[500px] mx-auto">
            {Array.from({ length: 16 }).map((_, i) => (
              <div key={i} className="aspect-square bg-surface-container-high rounded-sm" />
            ))}
          </div>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen bg-surface pt-24 pb-20 px-8 md:px-16 max-w-4xl mx-auto flex flex-col gap-6">
        <GameHeader
          date={selectedDate}
          today={today}
          streak={page.streak}
          onSubmit={() => {}}
          onDateChange={setSelectedDate}
        />
        <div className="flex flex-col items-center gap-4 pt-12">
          <p className="font-body text-on-surface-variant">{error}</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-surface pt-24 pb-20 px-8 md:px-16 max-w-4xl mx-auto flex flex-col gap-6">
      <GameHeader
        date={selectedDate}
        today={today}
        streak={page.streak}
        onSubmit={handleSubmit}
        onDateChange={setSelectedDate}
      />

      <LayoutGroup id="connections-game">
        <TileGrid animatingIds={animatingIds} animPhase={animPhase} />
      </LayoutGroup>

      <MistakeIndicator mistakes={mistakes} />

      <PreviousGuesses />

      {gameStatus === "won" && (
        <div className="text-center py-8">
          <p className="font-headline italic text-2xl text-primary">You won!</p>
          <p className="font-body text-sm text-on-surface-variant mt-2">
            Streak: {page.streak}
          </p>
        </div>
      )}

      {gameStatus === "lost" && (
        <div className="text-center py-8">
          <p className="font-headline italic text-2xl text-error">Game over</p>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="mt-4 font-label text-xs tracking-widest uppercase px-4 py-2 rounded-sm bg-primary text-on-primary hover:bg-primary-fixed-dim transition-colors"
          >
            Play again
          </button>
        </div>
      )}

      <RescuePrompt isOpen={page.showRescue} onClose={handleRescue} />
    </main>
  );
}
