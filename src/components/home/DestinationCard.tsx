import { RetroButtonLink } from "@/components/retro/RetroButtonLink";
import Image from "next/image";
import { forwardRef } from "react";
import type { HomeDestination } from "./homeContent";

type DestinationCardProps = {
  destination: HomeDestination;
  transformed: boolean;
};

export const DestinationCard = forwardRef<HTMLDivElement, DestinationCardProps>(
  function DestinationCard({ destination, transformed }, ref) {
    return (
      <article className="retro-destination-card">
        <div
          ref={ref}
          className={`retro-destination-preview retro-destination-preview--${destination.preview}`}
          data-destination={destination.key}
          aria-hidden="true"
        >
          {destination.preview === "projects" && (
            <>
              <strong>IF IT’S TRUE</strong>
              <small>TOOLS · GAMES · PROJECTS</small>
            </>
          )}
          {destination.preview === "recipes" && (
            <span>
              Edge Case
              <br />
              Recipes
            </span>
          )}
          {destination.preview === "candles" && (
            <Image
              src="/brands/sleeping-stone-primary-logo.svg"
              alt=""
              width={720}
              height={720}
            />
          )}
        </div>
        <div className="retro-destination-heading retro-destination-heading--wrapping">
          <h2>{destination.title}</h2>
          <RetroButtonLink href={destination.href} external>
            Visit ↗
          </RetroButtonLink>
        </div>
        <p>{transformed ? destination.transformedDescription : destination.description}</p>
      </article>
    );
  },
);
