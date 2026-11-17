# Retro Personal Site Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Publish Andrew Hachten’s approved retro personal homepage, About shell, and Markdown-driven résumé while removing migrated content and retaining the NYT hint tools temporarily.

**Architecture:** Keep the existing Next.js application and isolate the redesign in reusable retro shell components so the temporarily retained Wordle and Connections pages keep their current presentation. Model draggable copy as independent word and punctuation tokens, keep its geometry and identity-trigger rules in pure utilities, and contain the stateful behavior in one homepage client component. Render the supplied résumé Markdown on the server with semantic component overrides and serve the supplied PDF as a static download.

**Tech Stack:** Next.js 16, React 19, TypeScript, Tailwind CSS 4, Vitest, Testing Library, axe-core, `react-markdown`

**Spec:** `docs/superpowers/specs/2026-11-17-retro-personal-site-design.md`

## Global Constraints

- Keep the existing Next.js, React, TypeScript, and Tailwind stack.
- Do not add a general-purpose component, animation, or drag-and-drop library.
- Do not alter the temporarily retained Connections and Wordle UI.
- Do not add a footer or conventional global navigation.
- Do not publish invented About or résumé copy.
- Do not restore Andrew’s email address or phone number.
- External destination links open in the same tab.
- The Easter egg is desktop-only and does not persist across reloads.
- Preserve visible keyboard focus, reduced-motion support, semantic landmarks, and the existing skip link.
- Treat `ss primary logo.svg` as user-owned source material; move it to a URL-safe production asset path.
- Preserve unrelated user changes in the working tree.

## Review Focus

- At 320px width, long destination titles and `Visit ↗` controls must not overflow or obscure each other; Task 4 adds a narrow-viewport structural assertion and Task 9 adds visual verification.
- Pointer cancellation, viewport resizing below desktop, or moving any target below 60% overlap must cancel the 1.5-second Easter-egg timer; Task 5 tests each cancellation path.
- Contractions must remain whole words while trailing punctuation becomes its own draggable token; Task 3 pins the tokenizer behavior.
- A résumé Markdown file with the expected Experience, Skills, and Education headings must remain semantic and readable without client JavaScript; Task 7 tests server-rendered headings, links, and PDF download.
- Temporary NYT routes must remain reachable while removed project, candle, recipe, and game routes behave exactly as specified; Task 8 tests redirects, sitemap output, and retained route modules.

---

## File Structure

### Create

- `src/components/retro/RetroPageShell.tsx` — gray page surface and shared full-width title bar.
- `src/components/retro/RetroButtonLink.tsx` — beveled internal/external/download link treatment.
- `src/components/retro/RetroDocument.tsx` — reusable framed cream document surface.
- `src/components/home/DraggableIntroduction.tsx` — pointer and keyboard word movement plus announcements.
- `src/components/home/DestinationCard.tsx` — equal-weight external destination card.
- `src/components/home/IdentityDialog.tsx` — accessible identity-change dialog.
- `src/components/home/HomeExperience.tsx` — homepage state orchestration and Easter-egg transformation.
- `src/components/home/homeContent.ts` — exact initial/transformed copy and destination metadata.
- `src/lib/draggableText.ts` — tokenizer and immutable position helpers.
- `src/lib/identityTrigger.ts` — overlap and three-target completion rules.
- `src/lib/draggableText.test.ts`
- `src/lib/identityTrigger.test.ts`
- `src/app/page.test.tsx`
- `src/components/retro/retro.test.tsx`
- `src/app/(pages)/about/page.test.tsx`
- `src/app/sitemap.test.ts`
- `src/test/redirects.test.ts`
- `content/resume.md` — supplied final résumé Markdown.
- `public/andrew-hachten-resume.pdf` — supplied final PDF.
- `public/brands/sleeping-stone-primary-logo.svg` — normalized Sleeping Stone asset.

### Modify

- `src/app/layout.tsx` — remove global navigation/provider while retaining fonts, metadata, and skip link.
- `src/app/globals.css` — add scoped retro tokens/components without changing legacy NYT theme tokens.
- `src/app/page.tsx` — render the new homepage experience.
- `src/app/(pages)/about/page.tsx` — retro document shell and résumé action.
- `src/app/(pages)/resume/page.tsx` — Markdown-backed classic document and PDF action.
- `src/app/(pages)/resume/page.test.tsx` — Markdown, PDF, semantics, and privacy assertions.
- `src/app/sitemap.ts` — retained pages and temporary NYT routes only.
- `src/test/accessibility.test.tsx` — replace deleted game checks with retained-page checks.
- `next.config.ts` — permanent external redirects plus existing security headers.
- `package.json` and lockfile — add Markdown renderer; remove dependencies left unused after deletion.

### Delete

- `src/app/(pages)/projects/`
- `src/app/(pages)/recipes/`
- `src/app/games/tictactoe/`
- `src/games/tictactoe/`
- `src/data/projects.ts`
- `src/data/projects.test.ts`
- `src/data/recipes.ts`
- `src/data/recipes.test.ts`
- `src/data/resume.ts`
- `src/context/NavHoverContext.tsx`
- `src/components/NavBar.tsx`
- Any modal or game-only component proven unused after reference search.

## Task 1: Scoped Retro Foundation

**Files:**
- Create: `src/components/retro/RetroPageShell.tsx`
- Create: `src/components/retro/RetroButtonLink.tsx`
- Create: `src/components/retro/RetroDocument.tsx`
- Create: `src/components/retro/retro.test.tsx`
- Modify: `src/app/globals.css`
- Modify: `src/app/layout.tsx`

**Interfaces:**
- Produces: `RetroPageShell({ title, homeHref?, children, className? })`, `RetroButtonLink({ href, children, download?, external? })`, and `RetroDocument({ children, className? })`.
- Preserves: root skip link, metadata, Google font variables, and legacy theme tokens used by the NYT pages.

- [ ] **Step 1: Write failing shell tests**

Test that `RetroPageShell` renders a `header`, a title link to `/` on internal pages, no `footer`, and leaves the supplied semantic page landmark intact without adding a nested `main`. Test that `RetroButtonLink` omits `target="_blank"` for the three external destinations and preserves the `download` attribute for the PDF.

- [ ] **Step 2: Run the focused tests and verify failure**

Run: `npm test -- src/components/retro/retro.test.tsx`
Expected: FAIL because the retro components do not exist.

- [ ] **Step 3: Implement the three retro primitives**

Use scoped `retro-*` classes. `RetroPageShell` must cover the viewport with the gray surface without changing the root body background used by legacy tools. The title bar uses the approved pinstripe treatment and compact height.

- [ ] **Step 4: Remove global navigation from `layout.tsx`**

Delete `NavBar` and `NavHoverProvider` usage. Keep the skip link and root metadata. Do not wrap all routes in `RetroPageShell`; retained NYT pages must remain outside it.

- [ ] **Step 5: Add scoped retro CSS**

Define the approved gray, cream, red, yellow, bevel, focus, monospace-control, readable-body, document, and responsive tokens. Keep the existing Tailwind theme variables intact until the NYT pages leave.

- [ ] **Step 6: Run tests and lint**

Run: `npm test -- src/components/retro/retro.test.tsx && npm run lint`
Expected: PASS with no lint errors.

- [ ] **Step 7: Commit**

```bash
git add src/components/retro src/app/globals.css src/app/layout.tsx
git commit -m "feat: add retro personal site shell"
```

## Task 2: Homepage Content and Assets

**Files:**
- Create: `src/components/home/homeContent.ts`
- Create: `src/components/home/DestinationCard.tsx`
- Create: `public/brands/sleeping-stone-primary-logo.svg`
- Create: `src/components/home/DestinationCard.test.tsx`
- Modify: `ss primary logo.svg` (remove from repository root after verified copy)

**Interfaces:**
- Produces: `HOME_DESTINATIONS`, `INITIAL_COPY`, `TRANSFORMED_COPY`, and `DestinationCard({ destination, transformed })`.
- `HOME_DESTINATIONS` keys are exactly `projects`, `recipes`, and `candles` and include approved titles, descriptions, transformed descriptions, URLs, and preview variants.

- [ ] **Step 1: Write failing destination tests**

Assert the exact three titles, exact initial descriptions, exact URLs, same-tab links, `Visit ↗` label, title/button shared row, and empty-alt Sleeping Stone preview logo. Add a structural assertion that the heading/button wrapper can wrap at narrow widths and has no fixed width wider than its card.

- [ ] **Step 2: Run the focused test and verify failure**

Run: `npm test -- src/components/home/DestinationCard.test.tsx`
Expected: FAIL because the content module and card do not exist.

- [ ] **Step 3: Normalize the Sleeping Stone asset**

Copy the supplied SVG byte-for-byte to `public/brands/sleeping-stone-primary-logo.svg`, verify it renders, then remove the root copy only after the production path is confirmed.

- [ ] **Step 4: Implement content constants and `DestinationCard`**

Use the approved preview treatments, equal card hierarchy, and exact copy from the spec. Do not add an “Elsewhere on the internet” heading.

- [ ] **Step 5: Run the focused test**

Run: `npm test -- src/components/home/DestinationCard.test.tsx`
Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add src/components/home public/brands/sleeping-stone-primary-logo.svg
git commit -m "feat: add personal site destinations"
```

## Task 3: Independent Draggable Tokens

**Files:**
- Create: `src/lib/draggableText.ts`
- Create: `src/lib/draggableText.test.ts`
- Create: `src/components/home/DraggableIntroduction.tsx`
- Create: `src/components/home/DraggableIntroduction.test.tsx`

**Interfaces:**
- Produces: `type DraggableToken = { id: string; text: string; kind: "word" | "punctuation" }`.
- Produces: `tokenizeDraggableText(text: string, prefix: string): DraggableToken[]`.
- Produces: `type Position = { x: number; y: number }` and `movePosition(position, key, shifted): Position`.
- Produces: `DraggableIntroduction({ transformed, positions, onPositionsChange, tokenRefs })` where `tokenRefs` exposes target word elements by destination key.

- [ ] **Step 1: Write tokenizer and movement tests**

Assert that `Hi, I'm Andrew!` becomes word `Hi`, punctuation `,`, word `I'm`, word `Andrew`, punctuation `!`; apostrophes remain inside contractions; commas, periods, colons, semicolons, question marks, and exclamation points become independent tokens; arrow movement uses 5px and Shift+arrow uses 20px; Home resets the selected token.

- [ ] **Step 2: Run utility tests and verify failure**

Run: `npm test -- src/lib/draggableText.test.ts`
Expected: FAIL because the utility does not exist.

- [ ] **Step 3: Implement pure tokenizer and position helpers**

Token IDs must be deterministic from the supplied prefix and token index so position state survives ordinary rerenders.

- [ ] **Step 4: Write component interaction tests**

Assert pointer movement changes only the selected token, punctuation moves independently, Page Up/Page Down changes the keyboard-selected token, arrow keys move it, Home resets it, and an `aria-live` region announces selection and position changes.

- [ ] **Step 5: Implement `DraggableIntroduction`**

Preserve the existing single-tab-stop group interaction rather than adding every token to the tab order. Render a screen-reader-only complete introduction. Ensure the text layer has a higher stacking context than the starburst and clamp page overflow without clamping token transforms.

- [ ] **Step 6: Run focused tests**

Run: `npm test -- src/lib/draggableText.test.ts src/components/home/DraggableIntroduction.test.tsx`
Expected: PASS.

- [ ] **Step 7: Commit**

```bash
git add src/lib/draggableText.ts src/lib/draggableText.test.ts src/components/home/DraggableIntroduction.tsx src/components/home/DraggableIntroduction.test.tsx
git commit -m "feat: support independent draggable words and punctuation"
```

## Task 4: Static Homepage Composition

**Files:**
- Create: `src/components/home/HomeExperience.tsx`
- Modify: `src/app/page.tsx`
- Create: `src/app/page.test.tsx`

**Interfaces:**
- Consumes: retro primitives, content constants, `DraggableIntroduction`, and `DestinationCard`.
- Produces: homepage layout with `HomeExperience` as the only client-state boundary.

- [ ] **Step 1: Write failing homepage composition tests**

Assert the exact initial introduction, `Who’s making all this?`, `Meet Andrew →`, `/about` link, three destinations, no conventional nav, no Resume link, no footer, no explanatory destination heading, and homepage title `Andrew Hachten’s Home Page`.

- [ ] **Step 2: Run the page test and verify failure**

Run: `npm test -- src/app/page.test.tsx`
Expected: FAIL against the old homepage.

- [ ] **Step 3: Implement static `HomeExperience` composition**

Use the approved framed cream introduction, starburst, equal three-column card grid, and one-column narrow layout. Keep `src/app/page.tsx` a small page wrapper around the client component.

- [ ] **Step 4: Add responsive structural assertions**

Assert the grid uses a mobile single-column class and that each destination heading row may wrap below the narrow breakpoint. Do not rely on jsdom for pixel layout; Task 9 owns visual viewport verification.

- [ ] **Step 5: Run focused tests**

Run: `npm test -- src/app/page.test.tsx src/components/home/DestinationCard.test.tsx`
Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add src/app/page.tsx src/app/page.test.tsx src/components/home/HomeExperience.tsx
git commit -m "feat: build retro personal homepage"
```

## Task 5: Desktop Identity Easter Egg

**Files:**
- Create: `src/lib/identityTrigger.ts`
- Create: `src/lib/identityTrigger.test.ts`
- Create: `src/components/home/IdentityDialog.tsx`
- Create: `src/components/home/IdentityDialog.test.tsx`
- Modify: `src/components/home/HomeExperience.tsx`
- Modify: `src/components/home/DraggableIntroduction.tsx`
- Modify: `src/app/page.test.tsx`

**Interfaces:**
- Produces: `overlapRatio(elementRect: Rect, targetRect: Rect): number`.
- Produces: `allIdentityTargetsMatched(overlaps: Record<DestinationKey, number>, threshold = 0.6): boolean`.
- Produces: `IdentityDialog({ open, onClose })` with native dialog semantics or equivalent focus containment.
- Consumes: target token refs from `DraggableIntroduction` and preview refs from `DestinationCard`.

- [ ] **Step 1: Write overlap-rule tests**

Assert zero, partial, 59%, 60%, and full overlap; require all three keys; and reject a missing target.

- [ ] **Step 2: Run utility tests and verify failure**

Run: `npm test -- src/lib/identityTrigger.test.ts`
Expected: FAIL because the trigger utility does not exist.

- [ ] **Step 3: Implement pure overlap helpers**

Calculate intersection area divided by the draggable word’s area, not the target’s area.

- [ ] **Step 4: Write dialog tests**

Assert exact title and message, `OK` dismissal, Escape dismissal, initial focus inside the dialog, inert background or modal behavior, and focus restoration to the previously focused element.

- [ ] **Step 5: Implement `IdentityDialog`**

Prefer the native `<dialog>` `showModal()` behavior with React-managed open state and retro styling. Add only the focus handling the browser primitive does not supply in tests or supported browsers.

- [ ] **Step 6: Write timed homepage tests**

With fake timers and mocked rectangles, assert no trigger below 60%, trigger after exactly 1,500ms with all matches, cancellation when any word leaves, cancellation on pointer cancel, cancellation when `matchMedia("(min-width: 768px)")` changes to false, one trigger per page load, and reset of only `projects`, `recipes`, and `candles` to `{ x: 0, y: 0 }`.

- [ ] **Step 7: Implement the desktop-only dwell controller**

Use `matchMedia`, one timeout ref, and cleanup on every invalidation/unmount. Do not add auto-scroll. Disable target detection below 768px while preserving ordinary dragging.

- [ ] **Step 8: Implement exact transformed copy**

Use `TRANSFORMED_COPY` and transformed destination descriptions from Task 2. Change the starburst to `Meet Yourself →`. Do not persist state.

- [ ] **Step 9: Run focused tests**

Run: `npm test -- src/lib/identityTrigger.test.ts src/components/home/IdentityDialog.test.tsx src/app/page.test.tsx`
Expected: PASS.

- [ ] **Step 10: Commit**

```bash
git add src/lib/identityTrigger* src/components/home/IdentityDialog* src/components/home/HomeExperience.tsx src/components/home/DraggableIntroduction.tsx src/app/page.test.tsx
git commit -m "feat: add Andrew identity easter egg"
```

## Task 6: About Page Shell

**Files:**
- Modify: `src/app/(pages)/about/page.tsx`
- Create: `src/app/(pages)/about/page.test.tsx`

**Interfaces:**
- Consumes: `RetroPageShell`, `RetroDocument`, and `RetroButtonLink`.
- Produces: readable About essay layout with `View résumé →` linking to `/resume`.

- [ ] **Step 1: Write failing About tests**

Assert contextual title, home title-link, current paragraphs unchanged, visible `/resume` action, no footer, no email, no phone, and semantic essay section.

- [ ] **Step 2: Run the test and verify failure**

Run: `npm test -- 'src/app/(pages)/about/page.test.tsx'`
Expected: FAIL against the old layout.

- [ ] **Step 3: Implement the temporary About layout**

Keep current prose verbatim and isolate it so Andrew’s later draft is a content-only replacement. Add an in-code comment and plan note that publication requires copy approval because the current second paragraph references removed content.

- [ ] **Step 4: Run focused tests**

Run: `npm test -- 'src/app/(pages)/about/page.test.tsx'`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add 'src/app/(pages)/about/page.tsx' 'src/app/(pages)/about/page.test.tsx'
git commit -m "feat: restyle About page"
```

## Task 7: Markdown Résumé and PDF

**Prerequisite:** Andrew supplies the final Markdown and PDF. Do not invent either file to make this task pass.

**Files:**
- Create: `content/resume.md`
- Create: `public/andrew-hachten-resume.pdf`
- Modify: `src/app/(pages)/resume/page.tsx`
- Modify: `src/app/(pages)/resume/page.test.tsx`
- Delete: `src/data/resume.ts`
- Modify: `package.json`
- Modify: lockfile

**Interfaces:**
- Consumes: supplied Markdown using semantic headings and lists.
- Produces: server-rendered résumé document and `/andrew-hachten-resume.pdf` download.

- [ ] **Step 1: Add supplied source files unchanged**

Store the Markdown and PDF at the exact paths above. Compare visible names, title, current role, date ranges, and section inventory; report discrepancies rather than silently reconciling them.

- [ ] **Step 2: Install the focused Markdown dependency**

Run: `npm install react-markdown`
Expected: `react-markdown` appears in dependencies and the lockfile updates.

- [ ] **Step 3: Rewrite résumé tests to fail against the data-module page**

Assert `Experience`, `Skills`, and `Education` semantic headings from Markdown; all supplied visible résumé text; no `mailto:` or `tel:` links; `Download PDF ↓` has `href="/andrew-hachten-resume.pdf"` and `download`; `About Andrew →` links to `/about`; and the page renders without client-side effects.

- [ ] **Step 4: Run the résumé test and verify failure**

Run: `npm test -- 'src/app/(pages)/resume/page.test.tsx'`
Expected: FAIL because the page still imports `src/data/resume.ts` and has no PDF action.

- [ ] **Step 5: Implement server-rendered Markdown résumé**

Read `content/resume.md` on the server, render it with `react-markdown`, and override semantic elements with the approved classic-document classes. Keep one centered cream document with no index. Do not use `dangerouslySetInnerHTML`.

- [ ] **Step 6: Remove the old résumé data module**

Delete `src/data/resume.ts` only after reference search confirms the new page is its sole replacement.

- [ ] **Step 7: Run focused tests and production rendering check**

Run: `npm test -- 'src/app/(pages)/resume/page.test.tsx' && npm run build`
Expected: PASS; `/resume` is server-renderable and the PDF is included in build output.

- [ ] **Step 8: Commit**

```bash
git add content/resume.md public/andrew-hachten-resume.pdf 'src/app/(pages)/resume' src/data/resume.ts package.json package-lock.json
git commit -m "feat: render resume from Markdown"
```

## Task 8: Remove Migrated Content and Add Redirects

**Files:**
- Modify: `next.config.ts`
- Create: `src/test/redirects.test.ts`
- Modify: `src/app/sitemap.ts`
- Create: `src/app/sitemap.test.ts`
- Modify: `src/test/accessibility.test.tsx`
- Modify: `package.json` and lockfile
- Delete: project, recipe, and Tic Tac Toe paths listed in File Structure
- Delete: unused nav/context/modal code after reference search

**Interfaces:**
- Produces permanent redirects:
  - `/projects` → `https://ifitstrue.dev`
  - `/candles` → `https://www.sleepingstonecandles.com/`
  - `/recipes` → `https://edgecase.recipes`
  - `/recipes/:path*` → `https://edgecase.recipes`
- Preserves: `/tools/connections`, `/tools/wordle`, and both API route families during Phase 1.

- [ ] **Step 1: Write failing redirect tests**

Import the Next config, call `redirects()`, and assert exact source, destination, and `permanent: true` for all four entries. Assert no redirect is added for `/games/tictactoe`.

- [ ] **Step 2: Write failing sitemap tests**

Assert `/`, `/about`, `/resume`, `/tools/connections`, and `/tools/wordle`; reject `/projects`, `/recipes`, recipe slugs, and `/games/tictactoe`.

- [ ] **Step 3: Run focused tests and verify failure**

Run: `npm test -- src/test/redirects.test.ts src/app/sitemap.test.ts`
Expected: FAIL against current config and sitemap.

- [ ] **Step 4: Implement redirects and sitemap**

Add `redirects()` alongside the existing `headers()` function. Keep security headers unchanged. Remove recipe-data sitemap generation.

- [ ] **Step 5: Delete retired routes, data, and tests**

Delete projects, recipes, Super Tic Tac Toe, and their dedicated source/tests. Do not delete Connections, Wordle, shared date code, or their APIs/tests.

- [ ] **Step 6: Remove now-unused infrastructure**

Run `rg` for `NavBar`, `NavHover`, `Modal`, `zustand`, and `react-icons`. Delete unused local modules and remove dependencies only when no retained source imports them.

- [ ] **Step 7: Replace obsolete accessibility tests**

Remove game-board/player-editor checks. Add axe checks for homepage, About, résumé, and the open identity dialog. Continue to disable jsdom-incompatible color-contrast rules; verify contrast manually in Task 9.

- [ ] **Step 8: Run removal and regression checks**

Run: `npm test && npm run lint && npm run build`
Expected: all retained tests pass, no deleted-module imports remain, and the production build succeeds.

- [ ] **Step 9: Commit**

```bash
git add next.config.ts src/app src/data src/games src/components src/context src/test package.json package-lock.json
git commit -m "chore: retire migrated personal site content"
```

## Task 9: Final Accessibility, Responsive, and Publication Verification

**Files:**
- Modify as defects require: files owned by Tasks 1–8
- Update: `docs/superpowers/specs/2026-11-17-retro-personal-site-design.md` only if an approved decision changes

**Interfaces:**
- Consumes: completed redesigned site.
- Produces: verified release candidate; no new feature interface.

- [ ] **Step 1: Run the complete automated suite**

Run: `npm test && npm run lint && npm run build`
Expected: all commands exit 0.

- [ ] **Step 2: Run repository hygiene checks**

Run: `rg -n "tic.?tac|RECIPES|PROJECTS|NavHover|mailto:|tel:" src package.json` and inspect every match.
Expected: no accidental retired-content, contact-info, or dead-import matches; intentional NYT references remain.

- [ ] **Step 3: Verify routes and redirects against a production server**

Run the production server and verify:

- `/`, `/about`, and `/resume` return 200.
- `/tools/connections` and `/tools/wordle` return 200.
- `/projects`, `/candles`, `/recipes`, and a sample `/recipes/chocolate-chip-cookies` return permanent redirects to the exact approved external URLs.
- `/games/tictactoe` is not specially handled.
- `/andrew-hachten-resume.pdf` returns the supplied PDF.

- [ ] **Step 4: Perform responsive visual review**

Inspect 320px, 390px, 768px, 1024px, and wide desktop views. Confirm no overflow; readable card title/button rows; one-column mobile cards; compact full-width header; no footer; correct résumé stacking; and comfortable touch targets.

- [ ] **Step 5: Manually verify dragging and Easter egg**

Check independent word/punctuation dragging, stacking over the starburst, keyboard selection/movement/reset, pointer cancellation, 60% target threshold, 1.5-second dwell, target-word reset, transformed copy, single trigger, modal focus/dismissal, and disabled mobile trigger.

- [ ] **Step 6: Verify accessibility preferences**

Check 200% zoom, keyboard-only use, screen-reader names/status updates, reduced motion, and manual WCAG AA contrast for gray/cream text, red/yellow starburst, buttons, focus rings, and card previews.

- [ ] **Step 7: Verify external links and content gates**

Open all three external destinations in the same tab and confirm URLs. Confirm Andrew has supplied or explicitly approved the About copy, Markdown résumé, and PDF. Do not deploy if these publication gates remain unmet.

- [ ] **Step 8: Request final code review**

Use `superpowers:requesting-code-review` for a whole-branch review against the spec and this plan. Resolve findings with `superpowers:receiving-code-review`.

- [ ] **Step 9: Commit verification fixes**

```bash
git add -A
git commit -m "fix: complete retro site release review"
```

- [ ] **Step 10: Prepare deployment handoff**

Report the verified commit, commands and outputs, remaining deferred Phase 2 NYT redirects, and the project’s existing deployment command. Do not publish until Andrew explicitly asks to deploy.
