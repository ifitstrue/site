"use client";

import { useCallback, useEffect, useReducer } from "react";

export type GamePhase = "setup" | "rolled" | "unrolled" | "out";

export interface LiarsDiceState {
  startingCount: number;
  diceCount: number;
  values: number[];
  cupLifted: boolean;
  phase: GamePhase;
  hydrated: boolean;
}

type Action =
  | { type: "SET_STARTING_COUNT"; count: number }
  | { type: "ROLL" }
  | { type: "TOGGLE_CUP" }
  | { type: "REMOVE_DIE" }
  | { type: "ROUND_END" }
  | { type: "NEW_GAME" }
  | { type: "RESTORE"; state: LiarsDiceState };

const STORAGE_KEY = "liarsdice_state";

const roll = (n: number): number[] =>
  Array.from({ length: n }, () => Math.floor(Math.random() * 6) + 1);

const reducer = (state: LiarsDiceState, action: Action): LiarsDiceState => {
  switch (action.type) {
    case "SET_STARTING_COUNT":
      return { ...state, startingCount: action.count };

    case "ROLL":
      if (state.phase !== "setup" && state.phase !== "unrolled") return state;
      return { ...state, values: roll(state.diceCount).sort((a, b) => b - a), cupLifted: false, phase: "rolled" };

    case "TOGGLE_CUP":
      if (state.phase !== "rolled") return state;
      return { ...state, cupLifted: !state.cupLifted };

    case "REMOVE_DIE": {
      const newCount = state.diceCount - 1;
      if (newCount <= 0) {
        return { ...state, diceCount: 0, values: [], cupLifted: false, phase: "out" };
      }
      return { ...state, diceCount: newCount, values: [], cupLifted: false, phase: "unrolled" };
    }

    case "ROUND_END":
      if (state.phase !== "rolled") return state;
      return { ...state, values: [], cupLifted: false, phase: "unrolled" };

    case "NEW_GAME":
      return { ...state, diceCount: state.startingCount, values: [], cupLifted: false, phase: "setup" };

    case "RESTORE":
      return { ...action.state, hydrated: true };

    default:
      return state;
  }
};

const defaultState = (): LiarsDiceState => ({
  startingCount: 5,
  diceCount: 5,
  values: [],
  cupLifted: false,
  phase: "setup",
  hydrated: false,
});

export const useLiarsDice = () => {
  const [state, dispatch] = useReducer(reducer, undefined, defaultState);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const saved = raw ? (JSON.parse(raw) as LiarsDiceState) : defaultState();
      dispatch({ type: "RESTORE", state: saved });
    } catch {
      dispatch({ type: "RESTORE", state: defaultState() });
    }
  }, []);

  useEffect(() => {
    if (!state.hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {}
  }, [state]);

  const setStartingCount = useCallback((count: number) => dispatch({ type: "SET_STARTING_COUNT", count }), []);
  const rollDice = useCallback(() => dispatch({ type: "ROLL" }), []);
  const toggleCup = useCallback(() => dispatch({ type: "TOGGLE_CUP" }), []);
  const removeDie = useCallback(() => dispatch({ type: "REMOVE_DIE" }), []);
  const roundEnd = useCallback(() => dispatch({ type: "ROUND_END" }), []);
  const newGame = useCallback(() => dispatch({ type: "NEW_GAME" }), []);

  return { state, setStartingCount, rollDice, toggleCup, removeDie, roundEnd, newGame };
};
