import { useState, useCallback } from "react";

export type LetterStatus = "correct" | "present" | "absent";

interface WordleGameState {
  solution: string;
  guesses: string[];
  currentGuess: string;
  gameStatus: "playing" | "won" | "lost";
  keyboardState: Record<string, LetterStatus>;
  feedbacks: LetterStatus[][];
}

const getFeedback = (guess: string, solution: string): LetterStatus[] => {
  const result: LetterStatus[] = ["absent", "absent", "absent", "absent", "absent"];
  const solutionChars = solution.split("");

  for (let i = 0; i < 5; i++) {
    if (guess[i] === solution[i]) {
      result[i] = "correct";
      solutionChars[i] = "";
    }
  }

  for (let i = 0; i < 5; i++) {
    if (result[i] === "correct") continue;
    const idx = solutionChars.indexOf(guess[i]);
    if (idx !== -1) {
      result[i] = "present";
      solutionChars[idx] = "";
    }
  }

  return result;
};

export const useWordleGame = () => {
  const [state, setState] = useState<WordleGameState>({
    solution: "",
    guesses: [],
    currentGuess: "",
    gameStatus: "playing",
    keyboardState: {},
    feedbacks: [],
  });

  const initGame = useCallback((solution: string) => {
    setState({
      solution: solution.toLowerCase(),
      guesses: [],
      currentGuess: "",
      gameStatus: "playing",
      keyboardState: {},
      feedbacks: [],
    });
  }, []);

  const restoreGame = useCallback((solution: string, savedGuesses: string[]) => {
    const sol = solution.toLowerCase();
    let restored: WordleGameState = {
      solution: sol,
      guesses: [],
      currentGuess: "",
      gameStatus: "playing",
      keyboardState: {},
      feedbacks: [],
    };

    for (const guess of savedGuesses) {
      const feedback = getFeedback(guess, sol);
      const newKeyboardState = { ...restored.keyboardState };
      feedback.forEach((status, i) => {
        const letter = guess[i];
        const existing = newKeyboardState[letter];
        if (existing === "correct") return;
        if (existing === "present" && status !== "correct") return;
        newKeyboardState[letter] = status;
      });
      const newGuesses = [...restored.guesses, guess];
      const won = guess === sol;
      const lost = !won && newGuesses.length >= 6;
      restored = {
        ...restored,
        guesses: newGuesses,
        feedbacks: [...restored.feedbacks, feedback],
        gameStatus: won ? "won" : lost ? "lost" : "playing",
        keyboardState: newKeyboardState,
      };
    }

    setState(restored);
  }, []);

  const addLetter = useCallback((letter: string) => {
    setState((prev) => {
      if (prev.gameStatus !== "playing") return prev;
      if (prev.currentGuess.length >= 5) return prev;
      return { ...prev, currentGuess: prev.currentGuess + letter.toLowerCase() };
    });
  }, []);

  const deleteLetter = useCallback(() => {
    setState((prev) => {
      if (prev.gameStatus !== "playing") return prev;
      return { ...prev, currentGuess: prev.currentGuess.slice(0, -1) };
    });
  }, []);

  const submitGuess = useCallback(() => {
    setState((prev) => {
      if (prev.gameStatus !== "playing") return prev;
      if (prev.currentGuess.length !== 5) return prev;

      const guess = prev.currentGuess;
      const feedback = getFeedback(guess, prev.solution);
      const newKeyboardState = { ...prev.keyboardState };

      feedback.forEach((status, i) => {
        const letter = guess[i];
        const existing = newKeyboardState[letter];
        if (existing === "correct") return;
        if (existing === "present" && status !== "correct") return;
        newKeyboardState[letter] = status;
      });

      const isCorrect = guess === prev.solution;
      const newGuesses = [...prev.guesses, guess];
      const won = isCorrect;
      const lost = !isCorrect && newGuesses.length >= 6;

      return {
        ...prev,
        guesses: newGuesses,
        currentGuess: "",
        feedbacks: [...prev.feedbacks, feedback],
        gameStatus: won ? "won" : lost ? "lost" : "playing",
        keyboardState: newKeyboardState,
      };
    });
  }, []);

  return {
    ...state,
    initGame,
    restoreGame,
    addLetter,
    deleteLetter,
    submitGuess,
  };
};
