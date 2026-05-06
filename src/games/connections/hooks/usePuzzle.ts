import { useReducer, useEffect } from "react";
import type { ConnectionsPuzzle } from "../types";

interface UsePuzzleResult {
  puzzle: ConnectionsPuzzle | null;
  loading: boolean;
  error: string | null;
}

type State = UsePuzzleResult;
type Action =
  | { type: "FETCH_START" }
  | { type: "FETCH_SUCCESS"; puzzle: ConnectionsPuzzle }
  | { type: "FETCH_ERROR"; error: string };

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "FETCH_START": return { puzzle: null, loading: true, error: null };
    case "FETCH_SUCCESS": return { puzzle: action.puzzle, loading: false, error: null };
    case "FETCH_ERROR": return { ...state, loading: false, error: action.error };
  }
};

export const usePuzzle = (date: string): UsePuzzleResult => {
  const [state, dispatch] = useReducer(reducer, { puzzle: null, loading: true, error: null });

  useEffect(() => {
    dispatch({ type: "FETCH_START" });
    let cancelled = false;

    const fetchPuzzle = async () => {
      try {
        const res = await fetch(`/api/connections/${date}`);
        if (!res.ok) {
          throw new Error(res.status === 404 ? "Puzzle not found for this date" : "Failed to load puzzle");
        }
        const data = await res.json();
        if (!cancelled) dispatch({ type: "FETCH_SUCCESS", puzzle: data });
      } catch (e) {
        if (!cancelled) dispatch({ type: "FETCH_ERROR", error: e instanceof Error ? e.message : "Failed to load puzzle" });
      }
    };

    fetchPuzzle();
    return () => { cancelled = true; };
  }, [date]);

  return state;
};
