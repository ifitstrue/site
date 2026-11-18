# Legacy Tool Removal Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Remove the retired Connections/Wordle implementations and all obsolete theme infrastructure while redirecting legacy tool pages to If It’s True.

**Architecture:** Next.js configuration owns broad public redirects. The remaining application consists only of the retro homepage, About page, résumé, and their shared components; global CSS supplies the small reset and accessibility utilities formerly inherited from Tailwind.

**Tech Stack:** Next.js 16, React 19, TypeScript, plain CSS, Vitest, Playwright

**Spec:** `docs/superpowers/specs/2026-11-18-remove-legacy-tools-design.md`

## Global Constraints

- `/tools` and every nested `/tools/` path permanently redirect to `https://ifitstrue.dev`.
- Removed API endpoints return 404 through absence; they do not redirect.
- Preserve all current retro visual baselines.
- Do not touch untracked handoff, résumé-source, mockup, or logo files in the main checkout.

## Review Focus

- A nested legacy URL such as `/tools/connections/archive` redirects to If It’s True rather than 404ing.
- Removed APIs are absent from the production route manifest and are not caught by the public tool redirect.
- Removing Tailwind does not remove the skip-link reveal behavior or `sr-only` semantics.
- Removing Tailwind’s preflight does not reintroduce body margins or alter box sizing, buttons, images, or selection styling.
- The Edge Case Recipes wordmark retains its two required hosted font variables.

---

### Task 1: Retire the NYT hint tools

**Files:**
- Modify: `next.config.ts`
- Modify: `src/test/redirects.test.ts`
- Modify: `src/app/sitemap.ts`
- Modify: `src/app/sitemap.test.ts`
- Modify: `src/test/accessibility.test.tsx`
- Delete: `src/app/tools/`
- Delete: `src/app/api/connections/`
- Delete: `src/app/api/wordle/`
- Delete: `src/components/DateNav.tsx`
- Delete: `src/games/`
- Delete: `src/lib/date.ts`
- Delete: `src/lib/date.test.ts`

**Interfaces:**
- Produces: permanent `/tools` and `/tools/:path*` redirects to `https://ifitstrue.dev`.
- Produces: a sitemap containing exactly `/`, `/about`, and `/resume`.

- [ ] **Step 1: Write failing redirect and sitemap tests**

Assert both tool redirect patterns, assert a nested path is covered by the wildcard configuration, and assert the sitemap’s exact three URLs.

- [ ] **Step 2: Run the focused tests and verify they fail**

Run: `npm test -- src/test/redirects.test.ts src/app/sitemap.test.ts`

Expected: FAIL because tool redirects are absent and the sitemap still includes both tools.

- [ ] **Step 3: Add redirects and remove retired code**

Update configuration and sitemap, remove the retired accessibility case, then delete all listed implementation and test files.

- [ ] **Step 4: Verify the task**

Run: `npm test`

Expected: the reduced suite passes with no imports or references to the retired tools.

- [ ] **Step 5: Commit**

Commit as `chore: retire migrated NYT tools`.

### Task 2: Remove obsolete theme infrastructure

**Files:**
- Modify: `src/app/layout.tsx`
- Modify: `src/app/globals.css`
- Modify: `package.json`
- Modify: `package-lock.json`
- Delete: `postcss.config.mjs`
- Delete: `public/file.svg`
- Delete: `public/globe.svg`
- Delete: `public/next.svg`
- Delete: `public/vercel.svg`
- Delete: `public/window.svg`

**Interfaces:**
- Consumes: the remaining retro components’ semantic class names and Edge Case font variables.
- Produces: explicit `.site-body`, `.site-skip-link`, `.sr-only`, reset, selection, and focus styles with no Tailwind dependency.

- [ ] **Step 1: Establish the visual baseline**

Run: `npm run test:visual`

Expected: seven screenshots pass and the desktop-only dialog remains intentionally skipped on mobile.

- [ ] **Step 2: Remove Tailwind and unused fonts/assets**

Replace root-layout utility classes with semantic classes; add the necessary explicit reset/accessibility CSS; retain only IBM Plex Serif and Instrument Sans; uninstall Tailwind packages; delete PostCSS configuration and starter assets.

- [ ] **Step 3: Verify behavior and visuals**

Run: `npm test && npm run lint && npm run test:visual`

Expected: all tests and seven screenshots pass without updating snapshots.

- [ ] **Step 4: Verify production output**

Run: `npx next build --webpack`

Expected: the build passes; its route manifest omits `/tools/*` and `/api/{connections,wordle}/*`.

- [ ] **Step 5: Commit**

Commit as `chore: remove obsolete site infrastructure`.
