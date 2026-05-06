"use client";

import { useEffect, useRef, useState, useCallback, useReducer } from "react";
import { FiHelpCircle, FiRefreshCw } from "react-icons/fi";
import { useLiarsDice } from "@/games/liarsdice/hooks/useLiarsDice";
import { CupArea } from "@/games/liarsdice/components/CupArea";
import { ActionPanel } from "@/games/liarsdice/components/ActionPanel";
import { SetupScreen } from "@/games/liarsdice/components/SetupScreen";
import { OutScreen } from "@/games/liarsdice/components/OutScreen";
import { RulesModal } from "@/games/liarsdice/components/RulesModal";

const LAYOUT = "min-h-screen bg-surface pt-20 pb-10 px-6 md:px-16 max-w-lg mx-auto flex flex-col gap-5";

export default function LiarsDicePage() {
  const { state, setStartingCount, rollDice, toggleCup, removeDie, roundEnd, newGame } = useLiarsDice();
  const { phase, diceCount, values, cupLifted, startingCount, hydrated } = state;

  const [rollCount, setRollCount] = useState(0);
  const [rulesOpen, setRulesOpen] = useState(false);
  const [newGamePending, setNewGamePending] = useReducer((_: boolean, next: boolean) => next, false);
  const newGameTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const [motionPermission, setMotionPermission] = useState<"unknown" | "granted" | "denied">("unknown");
  const wakeLockRef = useRef<WakeLockSentinel | null>(null);

  useEffect(() => {
    if (phase === "setup" || phase === "out") return;
    const acquire = async () => {
      try {
        if ("wakeLock" in navigator) {
          wakeLockRef.current = await navigator.wakeLock.request("screen");
        }
      } catch {}
    };
    acquire();
    return () => {
      wakeLockRef.current?.release().catch(() => {});
      wakeLockRef.current = null;
    };
  }, [phase]);

  const handleRoll = useCallback(() => {
    rollDice();
    setRollCount((c) => c + 1);
    if ("vibrate" in navigator) navigator.vibrate([50, 30, 50]);
  }, [rollDice]);

  const handleToggleCup = useCallback(() => {
    toggleCup();
    if (!cupLifted && "vibrate" in navigator) navigator.vibrate(40);
  }, [toggleCup, cupLifted]);

  const handleNewGame = useCallback(() => {
    if (newGamePending) {
      clearTimeout(newGameTimer.current);
      setNewGamePending(false);
      newGame();
    } else {
      setNewGamePending(true);
      newGameTimer.current = setTimeout(() => setNewGamePending(false), 2500);
    }
  }, [newGamePending, newGame]);

  useEffect(() => {
    let lastShake = 0;
    const THRESHOLD = 25;
    const COOLDOWN = 1200;

    const onMotion = (e: DeviceMotionEvent) => {
      const acc = e.accelerationIncludingGravity;
      if (!acc) return;
      const mag = Math.sqrt((acc.x ?? 0) ** 2 + (acc.y ?? 0) ** 2 + (acc.z ?? 0) ** 2);
      const now = Date.now();
      if (mag > THRESHOLD && now - lastShake > COOLDOWN) {
        lastShake = now;
        if (phase === "setup" || phase === "unrolled") handleRoll();
      }
    };

    window.addEventListener("devicemotion", onMotion);
    return () => window.removeEventListener("devicemotion", onMotion);
  }, [phase, handleRoll]);

  const requestMotionPermission = useCallback(async () => {
    type DeviceMotionEvtWithPerm = typeof DeviceMotionEvent & {
      requestPermission?: () => Promise<"granted" | "denied">;
    };
    const DMEP = DeviceMotionEvent as DeviceMotionEvtWithPerm;
    if (typeof DMEP.requestPermission === "function") {
      try {
        const result = await DMEP.requestPermission();
        setMotionPermission(result);
      } catch {
        setMotionPermission("denied");
      }
    } else {
      setMotionPermission("granted");
    }
  }, []);

  const needsMotionPermission =
    typeof window !== "undefined" &&
    typeof (DeviceMotionEvent as { requestPermission?: unknown }).requestPermission === "function" &&
    motionPermission === "unknown";

  const canRoll = phase === "setup" || phase === "unrolled";
  const inPlay = phase === "rolled" || phase === "unrolled";

  if (!hydrated) {
    return (
      <main className={LAYOUT}>
        <div className="flex items-center justify-between py-1">
          <h1 className="font-headline italic text-2xl text-primary">{"Liar's Dice"}</h1>
        </div>
        <div className="h-px bg-outline-variant/30" />
        <div className="animate-pulse pt-4">
          <div className="w-full rounded-lg" style={{ aspectRatio: "1", backgroundColor: "var(--color-surface-container-low)" }} />
        </div>
      </main>
    );
  }

  return (
    <main className={LAYOUT}>
      <RulesModal isOpen={rulesOpen} onClose={() => setRulesOpen(false)} />

      <div className="flex items-center justify-between py-1">
        <h1 className="font-headline italic text-2xl text-primary">{"Liar's Dice"}</h1>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleNewGame}
            className={`flex items-center gap-1.5 font-label text-xs tracking-widest uppercase px-3 py-1.5 rounded transition-colors ${
              newGamePending
                ? "bg-error/10 text-error"
                : "text-on-surface-variant hover:bg-surface-container hover:text-on-surface"
            }`}
          >
            <FiRefreshCw size={12} />
            {newGamePending ? "Confirm?" : "New Game"}
          </button>
          <button
            type="button"
            onClick={() => setRulesOpen(true)}
            aria-label="How to play"
            className="w-8 h-8 flex items-center justify-center rounded-full text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors"
          >
            <FiHelpCircle size={18} />
          </button>
        </div>
      </div>
      <div className="h-px bg-outline-variant/30" />

      {phase === "setup" && (
        <SetupScreen startingCount={startingCount} onCountChange={setStartingCount} onRoll={handleRoll} />
      )}

      {phase === "out" && <OutScreen onNewGame={newGame} />}

      {inPlay && (
        <>
          <div className="flex items-center justify-between">
            <span className="font-body text-sm text-on-surface-variant">
              {diceCount} {diceCount === 1 ? "die" : "dice"} remaining
            </span>
            {needsMotionPermission && (
              <button
                type="button"
                onClick={requestMotionPermission}
                className="font-label text-xs tracking-widest uppercase text-primary hover:underline transition-colors"
              >
                Enable shake
              </button>
            )}
          </div>

          <CupArea
            values={values}
            cupLifted={cupLifted}
            rollCount={rollCount}
            onToggle={phase === "rolled" ? handleToggleCup : undefined}
            onRoll={phase === "unrolled" ? handleRoll : undefined}
          />

          <ActionPanel
            phase={phase}
            canRoll={canRoll}
            onRoll={handleRoll}
            onNextRound={roundEnd}
            onBluffFailed={removeDie}
            onChallengeFailed={removeDie}
          />
        </>
      )}
    </main>
  );
}
