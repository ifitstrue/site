"use client";

import { RetroPageShell } from "@/components/retro/RetroPageShell";
import { useRef, useState } from "react";
import { DestinationCard } from "./DestinationCard";
import {
  DraggableIntroduction,
  type DraggablePositions,
  type TargetTokenRefs,
} from "./DraggableIntroduction";
import { HOME_DESTINATIONS, type DestinationKey } from "./homeContent";

export function HomeExperience() {
  const [positions, setPositions] = useState<DraggablePositions>({});
  const tokenRefs = useRef<TargetTokenRefs["current"]>({});
  const destinationRefs = useRef<Partial<Record<DestinationKey, HTMLDivElement | null>>>({});
  const transformed = false;

  return (
    <RetroPageShell title="Andrew Hachten’s Home Page">
      <main id="main-content" className="retro-home-content">
        <div className="retro-home-welcome-frame">
          <section className="retro-home-welcome" aria-label="Introduction">
            <DraggableIntroduction
              transformed={transformed}
              positions={positions}
              onPositionsChange={setPositions}
              tokenRefs={tokenRefs}
            />
            <a
              className="retro-about-burst"
              href="/about"
              aria-label="Who’s making all this? Meet Andrew"
            >
              <span>
                Who’s making
                <br />
                all this?
                <small>Meet Andrew →</small>
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
    </RetroPageShell>
  );
}
