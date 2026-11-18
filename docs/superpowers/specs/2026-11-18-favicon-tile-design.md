# Favicon Tile Design

## Intent

Replace the existing green monogram favicon with the approved “B” direction from the favicon comparison: a simple, legible tile that carries the landing page’s yellow-and-burgundy palette into browser chrome.

## Design

- Keep the existing `src/app/icon.svg` file-based Next.js metadata route.
- Use a square yellow (`#f8cd17`) field with modestly rounded corners.
- Center a large, heavy burgundy (`#a52535`) capital `A` with enough padding to remain readable at 16×16.
- Do not add a starburst, border, shadow, gradient, or additional lettering.

## Approaches considered

- Simplified yellow starburst with a burgundy `A`: closest to the homepage, but less legible at favicon size.
- Yellow rounded tile with a burgundy `A`: selected for clarity and simplicity.
- Burgundy tile containing a yellow burst and burgundy `A`: strongest contrast, but visually busy at 16×16.

## Verification

Render the SVG at enlarged and 16px sizes, validate the Next.js production build, and run the existing test suite. The asset is intentionally not covered by a source-text assertion; such a test would only detect deliberate design changes rather than functional regressions.
