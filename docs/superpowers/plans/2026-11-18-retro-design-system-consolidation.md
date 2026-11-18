# Retro Design-System Consolidation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Consolidate the personal site’s retro UI into shared primitives and tokens, then protect its approved appearance with visual-regression tests.

**Architecture:** Add two deliberately narrow shared components: one for internal-page actions and one for inset bevel frames. Keep page-specific semantic content in each page, keep `RetroPageShell` as the scoped theme boundary, and use Playwright only for stable retro routes and the deterministic Easter Egg state.

**Tech Stack:** Next.js 16, React 19, TypeScript, global CSS, Vitest/Testing Library, Playwright.

**Spec:** `docs/superpowers/specs/2026-11-18-retro-design-system-consolidation-design.md`

## Global Constraints

- Preserve approved copy, layout, behavior, accessibility, and destination branding.
- Keep retro theme values scoped to `.retro-page-shell`.
- Do not redesign or remove the retained Connections and Wordle routes.
- Do not add generic polymorphic APIs where two narrow primitives suffice.

## Review Focus

- About and Résumé action bars retain their accessible navigation labels, links, width alignment, and mobile stacking.
- The homepage welcome frame remains pixel-equivalent after adopting the shared inset-frame primitive.
- Theme-token replacements do not change computed colors, bevel direction, shadows, or fonts.
- Removed selectors and props have no remaining consumers.
- Visual tests remain deterministic across desktop/mobile and can trigger the Easter Egg without pointer-coordinate flakiness.

---

### Task 1: Shared retro action bar

**Files:**
- Create: `src/components/retro/RetroActionBar.tsx`
- Modify: `src/components/retro/retro.test.tsx`
- Modify: `src/app/(pages)/about/page.tsx`
- Modify: `src/app/(pages)/resume/page.tsx`
- Modify: `src/app/globals.css`

**Interfaces:**
- Produces: `RetroActionBar({ ariaLabel, width, children })`, where `width` is `"narrow" | "wide"`; it always renders `← Home` and groups supplied actions on the right.
- Consumes: existing `RetroButtonLink` and `.retro-internal-actions` styling.

- [ ] Write failing component tests for the home action, accessible nav label, supplied actions, and width variants.
- [ ] Run `npm test -- src/components/retro/retro.test.tsx` and confirm failure because `RetroActionBar` does not exist.
- [ ] Implement `RetroActionBar` and replace the duplicate page markup.
- [ ] Consolidate action-bar modifier CSS around the component’s width classes.
- [ ] Run the focused page and primitive tests and confirm they pass.
- [ ] Commit as `refactor: share retro action bar`.

### Task 2: Shared inset frame and retro tokens

**Files:**
- Create: `src/components/retro/RetroInsetFrame.tsx`
- Modify: `src/components/retro/RetroDocument.tsx`
- Modify: `src/components/retro/retro.test.tsx`
- Modify: `src/components/home/HomeExperience.tsx`
- Modify: `src/app/globals.css`

**Interfaces:**
- Produces: `RetroInsetFrame({ children, className })`, which renders the shared outer frame only.
- Consumes: `RetroDocument` and the homepage welcome section.

- [ ] Write a failing primitive test proving `RetroDocument` and standalone content both use `RetroInsetFrame`.
- [ ] Run the focused primitive/homepage tests and confirm failure.
- [ ] Implement the frame and migrate both consumers without changing their inner semantics.
- [ ] Add scoped tokens for face, frame, bevel, shadows, copy colors, and UI/copy/mono font stacks; replace repeated literals without changing values.
- [ ] Remove dead `.draggable-word`, `.canvas-text`, `retro-about-readable-copy`, and always-on destination modifier classes; remove the unused `RetroButtonLink.external` API and ineffective wordmark focus override.
- [ ] Run all affected unit and accessibility tests and confirm they pass.
- [ ] Commit as `refactor: consolidate retro visual primitives`.

### Task 3: Visual-regression coverage

**Files:**
- Modify: `package.json`
- Modify: `package-lock.json`
- Create: `playwright.config.ts`
- Create: `tests/visual/retro-pages.spec.ts`
- Create: `tests/visual/retro-pages.spec.ts-snapshots/*`

**Interfaces:**
- Produces: `npm run test:visual` covering homepage, About, Résumé, and the deterministic transformed identity dialog at desktop and mobile sizes.
- Consumes: stable routes and data attributes already present in the homepage.

- [ ] Add the Playwright test dependency/configuration and a `test:visual` script.
- [ ] Write visual tests with animation disabled and deterministic Easter Egg triggering through DOM geometry/pointer interaction or an equivalent user-visible path.
- [ ] Run `npm run test:visual -- --update-snapshots` to create baselines.
- [ ] Run `npm run test:visual` again and confirm all screenshots match.
- [ ] Commit as `test: add retro page visual baselines`.

### Task 4: Final verification and documentation

**Files:**
- Modify only if verification exposes a defect.

**Interfaces:**
- Consumes: all shared primitives and visual tests from Tasks 1–3.

- [ ] Run `npm test` and confirm all unit/accessibility tests pass.
- [ ] Run `npm run lint` and confirm zero errors.
- [ ] Run `npm run test:visual` and confirm all visual baselines pass.
- [ ] Run `npx next build --webpack` and confirm a successful production build.
- [ ] Inspect `git diff --check` and the complete branch diff for unintended visual or semantic changes.
- [ ] Commit any verification-only fixes with a focused message.
