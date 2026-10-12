# Site Optimization Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [x]`) syntax for tracking.

**Goal:** Implement the approved site audit across security, correctness, accessibility, performance, SEO, and maintainability without changing the established visual identity.

**Architecture:** Keep the existing Next.js App Router structure. Extract small pure utilities for date and Wordle logic so correctness is independently testable, enhance existing components in place, and use Next metadata conventions for discovery and sharing.

**Tech Stack:** Next.js 16, React 19, TypeScript, Tailwind CSS 4, Vitest, Testing Library, Zustand

**Spec:** Approved site audit from the 2026-10-12 conversation.

## Global Constraints

- Preserve the current editorial design and existing copy.
- Do not add a new runtime dependency unless the platform cannot provide the behavior.
- Use local dates for the visitor-facing puzzle date.
- Keep all interactions operable by keyboard and screen readers.
- Preserve the current recipe and resume content.

## Review Focus

- Local dates near UTC midnight must remain on the visitor's calendar day.
- Invalid and future puzzle dates must not reach the upstream NYT endpoints.
- Incorrect manually entered Wordle greens must not deadlock green hints.
- Completed tic-tac-toe cells and boards must be unavailable to pointer and keyboard users alike.
- Open overlays must manage focus and close predictably with Escape.

---

### Task 1: Dependency and response hardening

**Files:** `package.json`, `package-lock.json`, `next.config.ts`, API route tests

- [x] Upgrade Next.js and vulnerable transitive production dependencies.
- [x] Add conservative security headers.
- [x] Run the full suite, build, and production audit.

### Task 2: Puzzle date and API correctness

**Files:** `src/lib/date.ts`, puzzle pages, API routes, colocated tests

- [x] Test local-date formatting, real-date validation, and allowed date range.
- [x] Implement the utilities and apply them to both tools and routes.
- [x] Add abortable client requests and explicit retry controls.

### Task 3: Wordle hint correctness

**Files:** `src/games/wordle/hints.ts`, `src/app/tools/wordle/page.tsx`, tests

- [x] Test wrong-green replacement and known-letter handling.
- [x] Extract and use pure hint-selection functions.
- [x] Verify the focused and full suites.

### Task 4: Game and form accessibility

**Files:** Tic-tac-toe cell/player components and component tests

- [x] Test cells as named buttons with correct disabled states.
- [x] Associate all player editor labels and controls.
- [x] Add non-color board-state descriptions.

### Task 5: Overlay, navigation, and document semantics

**Files:** Date picker, navigation, recipe page, related tests

- [x] Add dialog/focus semantics to the date picker and mobile navigation.
- [x] Use semantic headings and lists on recipe pages.
- [x] Add busy/live regions and retry actions to puzzle tools.

### Task 6: Frontend performance and cleanup

**Files:** root layout, homepage, global CSS, unused assets/modules

- [x] Reduce font variants to those actually used.
- [x] Replace split drag handlers with pointer events and active-only compositor hints.
- [x] Replace hard-coded homepage indexes with semantic word tags.
- [x] Remove confirmed dead code and assets.

### Task 7: SEO and structured data

**Files:** root/page metadata, `robots.ts`, `sitemap.ts`, recipe page and tests

- [x] Add canonical, Open Graph, and Twitter defaults plus page descriptions.
- [x] Add sitemap and robots metadata routes.
- [x] Emit valid Recipe JSON-LD from existing recipe data.

### Task 8: Final verification

**Files:** all changed files

- [x] Run tests, lint, build, audit, and `git diff --check`.
- [x] Review the complete diff against the approved audit.
