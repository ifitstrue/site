import type { DestinationKey } from "@/components/home/homeContent";

export type Rect = {
  left: number;
  top: number;
  right: number;
  bottom: number;
  width: number;
  height: number;
};

const DESTINATION_KEYS: DestinationKey[] = ["projects", "recipes", "candles"];

export function overlapRatio(elementRect: Rect, targetRect: Rect): number {
  const overlapWidth = Math.max(
    0,
    Math.min(elementRect.right, targetRect.right) - Math.max(elementRect.left, targetRect.left),
  );
  const overlapHeight = Math.max(
    0,
    Math.min(elementRect.bottom, targetRect.bottom) - Math.max(elementRect.top, targetRect.top),
  );
  const elementArea = elementRect.width * elementRect.height;
  return elementArea > 0 ? (overlapWidth * overlapHeight) / elementArea : 0;
}

export function allIdentityTargetsMatched(
  overlaps: Partial<Record<DestinationKey, number>>,
  threshold = 0.6,
): boolean {
  return DESTINATION_KEYS.every((key) => (overlaps[key] ?? -1) >= threshold);
}
