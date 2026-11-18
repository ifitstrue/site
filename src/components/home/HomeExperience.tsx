"use client";

import { RetroPageShell } from "@/components/retro/RetroPageShell";
import { allIdentityTargetsMatched, overlapRatio } from "@/lib/identityTrigger";
import { useCallback, useEffect, useRef, useState } from "react";
import { DestinationCard } from "./DestinationCard";
import {
  DraggableIntroduction,
  type DraggablePositions,
  type TargetTokenRefs,
} from "./DraggableIntroduction";
import { HOME_DESTINATIONS, type DestinationKey } from "./homeContent";
import { IdentityDialog } from "./IdentityDialog";

const DESKTOP_QUERY = "(min-width: 768px)";
const IDENTITY_DWELL_MS = 1500;

export function HomeExperience() {
  const [positions, setPositions] = useState<DraggablePositions>({});
  const [transformed, setTransformed] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const tokenRefs = useRef<TargetTokenRefs["current"]>({});
  const destinationRefs = useRef<Partial<Record<DestinationKey, HTMLDivElement | null>>>({});
  const desktopRef = useRef(false);
  const identityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const triggeredRef = useRef(false);

  const cancelIdentityTimer = useCallback(() => {
    if (identityTimerRef.current) {
      clearTimeout(identityTimerRef.current);
      identityTimerRef.current = null;
    }
  }, []);

  const identityTargetsMatch = useCallback(() => {
    const overlaps: Partial<Record<DestinationKey, number>> = {};
    for (const destination of HOME_DESTINATIONS) {
      const word = tokenRefs.current[destination.key];
      const target = destinationRefs.current[destination.key];
      if (!word || !target) return false;
      overlaps[destination.key] = overlapRatio(
        word.getBoundingClientRect(),
        target.getBoundingClientRect(),
      );
    }
    return allIdentityTargetsMatched(overlaps);
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia(DESKTOP_QUERY);
    desktopRef.current = mediaQuery.matches;
    const handleChange = (event: MediaQueryListEvent) => {
      desktopRef.current = event.matches;
      if (!event.matches) cancelIdentityTimer();
    };
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [cancelIdentityTimer]);

  useEffect(() => cancelIdentityTimer, [cancelIdentityTimer]);

  useEffect(() => {
    window.addEventListener("resize", cancelIdentityTimer);
    return () => window.removeEventListener("resize", cancelIdentityTimer);
  }, [cancelIdentityTimer]);

  useEffect(() => {
    if (!desktopRef.current || transformed || triggeredRef.current) {
      cancelIdentityTimer();
      return;
    }

    if (!identityTargetsMatch()) {
      cancelIdentityTimer();
      return;
    }

    if (!identityTimerRef.current) {
      identityTimerRef.current = setTimeout(() => {
        identityTimerRef.current = null;
        if (!desktopRef.current || !identityTargetsMatch()) return;
        triggeredRef.current = true;
        const targetIds = new Set(
          Object.values(tokenRefs.current)
            .map((element) => element?.dataset.tokenId)
            .filter((id): id is string => Boolean(id)),
        );
        setPositions((current) => Object.fromEntries(
          Object.entries(current).map(([id, position]) => [
            id,
            targetIds.has(id) ? { x: 0, y: 0 } : position,
          ]),
        ));
        setTransformed(true);
        setDialogOpen(true);
      }, IDENTITY_DWELL_MS);
    }
  }, [cancelIdentityTimer, identityTargetsMatch, positions, transformed]);

  return (
    <RetroPageShell>
      <main
        id="main-content"
        className="retro-home-content"
        data-retro-page-content
        data-dialog-background
      >
        <div className="retro-home-welcome-frame">
          <section className="retro-home-welcome" aria-label="Introduction">
            <DraggableIntroduction
              transformed={transformed}
              positions={positions}
              onPositionsChange={setPositions}
              tokenRefs={tokenRefs}
              onInteractionCancel={cancelIdentityTimer}
            />
            <a
              className="retro-about-burst"
              href="/about"
              aria-label={`Who’s making all this? ${transformed ? "Meet Yourself" : "Meet Andrew"}`}
            >
              <span>
                Who’s making
                <br />
                all this?
                <small>{transformed ? "Meet Yourself →" : "Meet Andrew →"}</small>
              </span>
            </a>
          </section>
        </div>

        <section className="retro-destinations" aria-label="Andrew’s other websites">
          <div className="retro-destinations-grid retro-destinations-grid--responsive">
            {HOME_DESTINATIONS.map((destination) => (
              <DestinationCard
                key={destination.key}
                ref={(element) => {
                  destinationRefs.current[destination.key] = element;
                }}
                destination={destination}
                transformed={transformed}
              />
            ))}
          </div>
        </section>
      </main>
      <IdentityDialog open={dialogOpen} onClose={() => setDialogOpen(false)} />
    </RetroPageShell>
  );
}
