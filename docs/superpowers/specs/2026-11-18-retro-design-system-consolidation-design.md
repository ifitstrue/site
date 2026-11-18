# Retro Design-System Consolidation

## Intent

Keep the homepage, About page, Résumé page, and identity Easter Egg visually consistent by turning repeated retro UI structures into shared primitives, centralizing their theme values, and adding visual-regression coverage.

## Goals

- Share the internal-page action bar used by About and Résumé.
- Share the inset beveled outer frame used by documents and the homepage introduction.
- Centralize retro palette, bevel, shadow, and font-stack values as scoped CSS custom properties.
- Remove unused props, stale selectors, and always-on modifier classes.
- Add desktop and mobile screenshot coverage for the stable retro pages and Easter Egg dialog.

## Non-goals

- Do not redesign the approved pages or change their copy.
- Do not merge the old editorial-green NYT tool theme into the retro theme.
- Do not remove Connections or Wordle routes until their If It’s True migration is explicitly confirmed.
- Do not generalize the one-off identity dialog or brand wordmarks into premature abstractions.

## Approach

Create narrow primitives rather than a generic polymorphic component system: `RetroActionBar` owns the internal navigation pattern, and `RetroInsetFrame` owns only the shared outer bevel. Keep `RetroPageShell` as the theme boundary. Consolidate exact visual constants into variables scoped to `.retro-page-shell`, remove dead compatibility hooks, and use Playwright screenshots as the visual contract.

## Alternatives considered

- A single `RetroInternalPage` component would remove more markup but obscure the different section/article semantics of About and Résumé.
- A polymorphic all-purpose retro panel or button would reduce class repetition but add API complexity without enough consumers.
- Refactoring the NYT tools into the retro system would spend effort on routes scheduled to move off-site.

## Constraints

- Preserve current HTML semantics, copy, accessibility behavior, links, and responsive layouts.
- Preserve the distinct If It’s True, Edge Case Recipes, and Sleeping Stone brand treatments.
- Keep all retro variables scoped beneath `.retro-page-shell` so retained tools remain isolated.
- Screenshot tests must be deterministic and must not depend on the date-sensitive NYT routes.
