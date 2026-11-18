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
          aria-hidden={destination.preview === "candles" ? true : undefined}
        >
          {destination.preview === "projects" && (
            <a
              className="ift-wordmark"
              href="https://ifitstrue.dev/"
              aria-label="If It's True"
            >
              if<br />it’s<br />true.
            </a>
          )}
          {destination.preview === "recipes" && (
            <a
              className="ec-wordmark"
              href="https://edgecase.recipes/"
              aria-label="Edge Case Recipes"
            >
              <span className="ec-wordmark__words" aria-hidden="true">
                <span>edge</span>
                <span>case</span>
              </span>
              <span className="ec-wordmark__descriptor" aria-hidden="true">
                recipes
              </span>
            </a>
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
