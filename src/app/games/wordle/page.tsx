"use client";

import { useEffect, useReducer, useState, useCallback, useRef } from "react";
import { useWordleGame } from "@/games/wordle/hooks/useWordleGame";
import { getDayResult, recordDayResult, computeStreak, saveProgress, loadProgress } from "@/games/wordle/hooks/useStreak";
import { Board } from "@/games/wordle/components/Board";
import { Keyboard } from "@/games/wordle/components/Keyboard";
import { GameHeader } from "@/games/wordle/components/GameHeader";

type PageState = { loading: boolean; error: string | null; streak: number; submittingGuess: string };
type PageAction =
  | { type: "FETCH_START" }
  | { type: "FETCH_SUCCESS" }
  | { type: "FETCH_ERROR"; error: string }
  | { type: "SET_STREAK"; streak: number }
  | { type: "SUBMITTING"; guess: string }
  | { type: "SUBMITTED" };

// 5 tiles × 80ms stagger delay + 400ms flip duration — must match Board animation
const SUBMIT_ANIM_MS = 400 + 5 * 80;

const pageReducer = (state: PageState, action: PageAction): PageState => {
  switch (action.type) {
    case "FETCH_START": return { ...state, loading: true, error: null };
    case "FETCH_SUCCESS": return { ...state, loading: false };
    case "FETCH_ERROR": return { ...state, loading: false, error: action.error };
    case "SET_STREAK": return { ...state, streak: action.streak };
    case "SUBMITTING": return { ...state, submittingGuess: action.guess };
    case "SUBMITTED": return { ...state, submittingGuess: "" };
  }
};

export default function WordlePage() {
  const today = new Date().toISOString().split("T")[0];
  const [selectedDate, setSelectedDate] = useState(today);
  const [page, dispatch] = useReducer(pageReducer, {
    loading: true,
    error: null,
    streak: 0,
    submittingGuess: "",
  });

  const {
    solution,
    guesses,
    currentGuess,
    gameStatus,
    keyboardState,
    feedbacks,
    restoreGame,
    addLetter,
    deleteLetter,
    submitGuess,
  } = useWordleGame();

  // Stable refs for values read inside stable callbacks — updated in effects, never during render
  const gameStatusRef = useRef(gameStatus);
  const currentGuessRef = useRef(currentGuess);
  const selectedDateRef = useRef(selectedDate);
  useEffect(() => { gameStatusRef.current = gameStatus; }, [gameStatus]);
  useEffect(() => { currentGuessRef.current = currentGuess; }, [currentGuess]);
  useEffect(() => { selectedDateRef.current = selectedDate; }, [selectedDate]);

  useEffect(() => {
    dispatch({ type: "SET_STREAK", streak: computeStreak() });
  }, []);

  useEffect(() => {
    dispatch({ type: "FETCH_START" });
    let cancelled = false;

    const fetchPuzzle = async () => {
      try {
        const res = await fetch(`/api/wordle/${selectedDate}`);
        if (!res.ok) {
          throw new Error(res.status === 404 ? "Puzzle not found for this date" : "Failed to load puzzle");
        }
        const data = await res.json();
        if (!cancelled && data.solution) {
          restoreGame(data.solution, loadProgress(selectedDate));
          dispatch({ type: "FETCH_SUCCESS" });
        }
      } catch (e) {
        if (!cancelled) dispatch({ type: "FETCH_ERROR", error: e instanceof Error ? e.message : "Failed to load puzzle" });
      }
    }

    fetchPuzzle();
    return () => { cancelled = true; };
  }, [selectedDate, restoreGame]);

  useEffect(() => {
    if (guesses.length > 0) saveProgress(selectedDateRef.current, guesses);
  }, [guesses]);

  useEffect(() => {
    if (gameStatus !== "playing" && guesses.length > 0 && selectedDate === today) {
      if (!getDayResult(selectedDate)) {
        recordDayResult(selectedDate, gameStatus, guesses.length);
        dispatch({ type: "SET_STREAK", streak: computeStreak() });
      }
    }
  }, [gameStatus, guesses.length, selectedDate, today]);

  const handleEnter = useCallback(() => {
    if (gameStatusRef.current !== "playing") return;
    if (currentGuessRef.current.length !== 5) return;

    dispatch({ type: "SUBMITTING", guess: currentGuessRef.current });
    submitGuess();

    setTimeout(() => {
      dispatch({ type: "SUBMITTED" });
    }, SUBMIT_ANIM_MS);
  }, [submitGuess]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (gameStatusRef.current !== "playing") return;
      if (e.key === "Enter") { handleEnter(); return; }
      if (e.key === "Backspace") { deleteLetter(); return; }
      if (/^[a-zA-Z]$/.test(e.key)) { addLetter(e.key); }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleEnter, addLetter, deleteLetter]);

  if (page.loading) {
    return (
      <main className="min-h-screen bg-surface pt-24 pb-20 px-8 md:px-16 max-w-4xl mx-auto flex flex-col gap-10">
        <div className="animate-pulse space-y-4">
          <div className="h-4 w-24 bg-surface-container-high rounded" />
          <div className="h-px bg-tertiary-fixed-dim/50" />
          <div className="grid grid-cols-5 gap-1.5 max-w-[350px] mx-auto">
            {Array.from({ length: 30 }).map((_, i) => (
              <div key={i} className="aspect-square bg-surface-container-high rounded-sm" />
            ))}
          </div>
        </div>
      </main>
    );
  }

  if (page.error) {
    return (
      <main className="min-h-screen bg-surface pt-24 pb-20 px-8 md:px-16 max-w-4xl mx-auto flex flex-col gap-6">
        <GameHeader
          streak={page.streak}
          date={selectedDate}
          today={today}
          onSubmit={() => {}}
          onDateChange={setSelectedDate}
          onDelete={() => {}}
          canSubmit={false}
          gameOver={false}
        />
        <div className="flex flex-col items-center gap-4 pt-12">
          <p className="font-body text-on-surface-variant">{page.error}</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-surface pt-24 pb-20 px-8 md:px-16 max-w-4xl mx-auto flex flex-col gap-6">
      <GameHeader
        streak={page.streak}
        date={selectedDate}
        today={today}
        onSubmit={handleEnter}
        onDateChange={setSelectedDate}
        onDelete={deleteLetter}
        canSubmit={currentGuess.length === 5 && gameStatus === "playing"}
        gameOver={gameStatus !== "playing"}
      />

      <div className="flex flex-col gap-6">
        <Board
          guesses={guesses}
          currentGuess={page.submittingGuess || currentGuess}
          feedbacks={feedbacks}
          isSubmitting={page.submittingGuess !== ""}
        />

        <Keyboard
          keyboardState={keyboardState}
          onLetter={addLetter}
          onDelete={deleteLetter}
          onEnter={handleEnter}
        />
      </div>

      {gameStatus === "won" && (
        <div className="text-center py-8">
          <p className="font-headline italic text-2xl text-primary">You won!</p>
          <p className="font-body text-sm text-on-surface-variant mt-2">
            {guesses.length}/6 &middot; Streak: {page.streak}
          </p>
        </div>
      )}

      {gameStatus === "lost" && (
        <div className="text-center py-8">
          <p className="font-headline italic text-2xl text-error">Game over</p>
          <p className="font-body text-sm text-on-surface-variant mt-2">
            The word was: <strong className="text-on-surface">{solution.toUpperCase()}</strong>
          </p>
          <p className="font-body text-sm text-on-surface-variant mt-1">
            Streak: {page.streak}
          </p>
        </div>
      )}
    </main>
  );
}
