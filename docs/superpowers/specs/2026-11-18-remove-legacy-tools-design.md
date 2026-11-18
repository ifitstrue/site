# Legacy Tool Removal Design

## Intent

Finish the personal site’s transition into a focused retro landing page. Connections Hints and Wordle Hints are moving to If It’s True, so the personal site should retain neither their implementations nor the older theme infrastructure that existed to support them.

## User-facing behavior

- `/tools` and every path beneath `/tools/` permanently redirect to `https://ifitstrue.dev`.
- The retired tool API endpoints disappear rather than redirecting; they are implementation details, not public destinations.
- The sitemap contains only the homepage, About, and résumé pages.
- The homepage, About page, résumé, and Easter Egg retain their current appearance and behavior.

## Removal scope

- Delete the Connections and Wordle pages, metadata, API routes, game modules, date picker/navigation, date utilities, and their tests.
- Remove the retired date picker from the accessibility suite.
- Remove the old Tailwind editorial theme and replace the few root-layout utilities still in use with explicit CSS.
- Remove Tailwind, its PostCSS plugin/configuration, and the three Google fonts used only by the retired theme.
- Preserve IBM Plex Serif and Instrument Sans because the Edge Case Recipes wordmark still uses them.
- Delete unused Next.js starter SVGs from `public/`.
- Update comments that describe the tools as temporarily retained.

## Approaches considered

- Keep the old pages as hidden fallback routes: rejected because it leaves duplicated product code and external NYT dependencies on the personal site.
- Delete the routes and return 404s: clean, but discards useful bookmark and search traffic.
- Delete the implementations and add broad `/tools` redirects: selected because it leaves no legacy application code while guiding visitors to the new project site.

## Constraints

- Existing untracked handoff and source files in the main checkout are out of scope and must remain untouched.
- Redirect legacy public pages only; do not redirect removed API endpoints.
- Visual regression baselines must remain unchanged during infrastructure cleanup.
