export type TileColor = "unset" | "green" | "yellow";
export type TileState = { letter: string; color: TileColor };

type RandomSource = () => number;

export function addGreenHint(
  tiles: TileState[],
  answer: string,
  random: RandomSource = Math.random,
): TileState[] {
  const candidates = tiles
    .map((tile, index) => ({ tile, index }))
    .filter(({ tile, index }) =>
      tile.color !== "green" || tile.letter !== answer[index],
    );
  if (!candidates.length) return tiles;

  const { index } = candidates[Math.floor(random() * candidates.length)];
  return tiles.map((tile, tileIndex) =>
    tileIndex === index ? { letter: answer[index], color: "green" } : tile,
  );
}

export function addYellowHint(
  answer: string,
  tiles: TileState[],
  revealed: string[],
  random: RandomSource = Math.random,
): string[] {
  const knownLetters = new Set([
    ...tiles
      .filter(
        (tile, index) =>
          tile.letter &&
          (tile.color === "yellow" ||
            (tile.color === "green" && tile.letter === answer[index])),
      )
      .map((tile) => tile.letter),
    ...revealed,
  ]);
  const unknown = [...new Set(answer)].filter((letter) => !knownLetters.has(letter));
  if (!unknown.length) return revealed;
  return [...revealed, unknown[Math.floor(random() * unknown.length)]];
}

export function isSolved(tiles: TileState[], answer: string): boolean {
  return tiles.every(
    (tile, index) => tile.color === "green" && tile.letter === answer[index],
  );
}

export function areAllLettersKnown(
  tiles: TileState[],
  answer: string,
  revealed: string[],
): boolean {
  const known = new Set([
    ...revealed,
    ...tiles
      .filter(
        (tile, index) =>
          tile.color === "yellow" ||
          (tile.color === "green" && tile.letter === answer[index]),
      )
      .map((tile) => tile.letter),
  ]);
  return [...new Set(answer)].every((letter) => known.has(letter));
}
