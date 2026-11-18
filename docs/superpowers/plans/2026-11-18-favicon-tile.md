# Favicon Tile Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the personal site favicon with the approved yellow tile and burgundy `A`.

**Architecture:** Retain Next.js’s existing static `src/app/icon.svg` metadata convention and change only the SVG artwork. No runtime component or dependency is needed.

**Tech Stack:** SVG, Next.js 16 file-based metadata

**Spec:** `docs/superpowers/specs/2026-11-18-favicon-tile-design.md`

## Global Constraints

- Use yellow `#f8cd17` and burgundy `#a52535`.
- Preserve the existing `src/app/icon.svg` route.
- Do not add a starburst, border, shadow, gradient, or additional lettering.

## Review Focus

- At 16×16, the `A` remains identifiable and does not touch the tile edges; verify with a real raster render.
- On light and dark browser chrome, the yellow tile remains bounded by its square silhouette; verify the transparent area does not extend beyond the tile.
- Next.js continues to expose the SVG as its icon metadata route; verify with a production build.

---

### Task 1: Replace the favicon artwork

**Files:**
- Modify: `src/app/icon.svg`

**Interfaces:**
- Consumes: Next.js static `icon.svg` metadata convention.
- Produces: A scalable square favicon containing the approved yellow tile and burgundy `A`.

- [ ] **Step 1: Render the current icon at 64px and 16px for a visual baseline**

Run a browser render of `src/app/icon.svg` and confirm it still shows the old green tile.

- [ ] **Step 2: Replace the SVG artwork**

Use a square view box, a rounded yellow background, and a centered heavy burgundy `A`. Keep the geometry simple enough to survive 16px rasterization.

- [ ] **Step 3: Render the new icon at 64px and 16px**

Expected: the yellow tile is cleanly bounded and the burgundy `A` remains readable at both sizes.

- [ ] **Step 4: Verify the site**

Run: `npm test && npx next build --webpack`

Expected: 93 tests pass and the production build completes successfully with `/icon.svg` in the route output.

- [ ] **Step 5: Commit**

Commit the design, plan, and favicon as `style: update favicon tile`.
