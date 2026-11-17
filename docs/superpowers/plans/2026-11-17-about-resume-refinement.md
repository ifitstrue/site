# About and Résumé Refinement Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Refine the About page typography and replace the legacy résumé route with a semantic Markdown-driven retro document plus the supplied PDF download.

**Architecture:** Keep the About page on the existing retro primitives, with its visible heading removed and an accessible hidden heading retained. Store a sanitized, semantic web résumé in `content/resume.md`, render it server-side with `react-markdown` and custom element classes, and serve the supplied PDF unchanged from `public/`.

**Tech Stack:** Next.js App Router, TypeScript, React Server Components, React Markdown, CSS, Vitest, Testing Library

**Spec:** `docs/superpowers/specs/2026-11-17-about-resume-refinement-design.md`

## Global Constraints

- Preserve the current About prose until Andrew supplies a replacement.
- The web résumé must not contain Andrew's email address, phone number, `mailto:`, or `tel:` links.
- The supplied PDF remains byte-for-byte unchanged and is the only public version with contact information.
- Preserve résumé wording while changing Markdown structure for semantic rendering.
- Render Markdown server-side without `dangerouslySetInnerHTML`.
- Keep external links in the same tab and keep both pages footer-free.

## Review Focus

- Contact data in the source PDF must not leak into the HTML résumé; Task 2 tests visible text and link protocols.
- Markdown heading changes must preserve every résumé section and accomplishment; Task 2 tests section inventory and representative first/last entries.
- A filename containing spaces must still become the exact public download path; Task 2 tests the final href and download attribute.
- Removing the visible About heading must not remove the page's accessible h1; Task 1 tests the `sr-only` heading.
- Dense résumé content must remain responsive; Task 2 tests the document hooks and the final manual check covers mobile stacking.

---

### Task 1: Refine the About Document

**Files:**
- Modify: `src/app/(pages)/about/page.tsx`
- Modify: `src/app/(pages)/about/page.test.tsx`
- Modify: `src/app/globals.css`

**Interfaces:**
- Consumes: `RetroPageShell`, `RetroDocument`, and `RetroButtonLink`.
- Produces: a readable About document with an accessible hidden h1 and unchanged `/resume` action.

- [ ] **Step 1: Update the About test to fail**

Assert that `About Andrew` remains the h1 accessible name but carries `sr-only`; assert `.retro-about-essay` uses the new readable-copy hook; retain current-copy, résumé-link, no-contact, and no-footer assertions.

- [ ] **Step 2: Run the focused test and verify failure**

Run: `npm test -- 'src/app/(pages)/about/page.test.tsx'`

Expected: FAIL because the heading is visible and the readable-copy hook is absent.

- [ ] **Step 3: Implement the approved hierarchy and typography**

Move the h1 to `sr-only`, add the readable-copy class, and change `.retro-about-essay` to approximately `1.125rem` body text with a comfortable line height. Remove the obsolete visible-h1 CSS without changing the prose or button.

- [ ] **Step 4: Run the focused test and lint**

Run: `npm test -- 'src/app/(pages)/about/page.test.tsx' && npm run lint`

Expected: PASS with no lint errors.

- [ ] **Step 5: Commit**

```bash
git add 'src/app/(pages)/about/page.tsx' 'src/app/(pages)/about/page.test.tsx' src/app/globals.css
git commit -m "fix: refine About page typography"
```

### Task 2: Render the Résumé from Semantic Markdown

**Files:**
- Create: `content/resume.md`
- Create: `public/andrew-hachten-resume.pdf`
- Modify: `src/app/(pages)/resume/page.tsx`
- Modify: `src/app/(pages)/resume/page.test.tsx`
- Modify: `src/app/globals.css`
- Delete: `src/data/resume.ts`
- Modify: `package.json`
- Modify: `package-lock.json`

**Source Inputs:**
- `/home/andrew/projects/personal-site/docs/resume/Andrew Hachten Resume.md`
- `/home/andrew/projects/personal-site/docs/resume/Andrew Hachten Resume.pdf`

**Interfaces:**
- Consumes: semantic Markdown at `content/resume.md` and the unchanged PDF in `public/`.
- Produces: server-rendered `/resume` and downloadable `/andrew-hachten-resume.pdf`.

- [ ] **Step 1: Add the supplied files**

Copy the PDF unchanged and verify its SHA-256 matches the source. Create `content/resume.md` from the supplied wording, remove only email and phone, and normalize the document to one h1, h2 section headings, h3 job/education headings, date paragraphs, and standard bullet lists.

- [ ] **Step 2: Install the Markdown renderer**

Run: `npm install react-markdown`

Expected: `react-markdown` appears in dependencies and the lockfile updates.

- [ ] **Step 3: Rewrite résumé tests to fail against the legacy data page**

Assert the retro title link returns home; semantic `Andrew Hachten`, `Experience`, `Skills`, and `Education` headings; supplied title, location, employers, representative first/last accomplishments, skills, and degree; no email, phone, `mailto:`, or `tel:`; `Download PDF ↓` links to the exact PDF path with `download`; `About Andrew →` links to `/about`; `.retro-resume-document` exists; and no footer exists.

- [ ] **Step 4: Run the focused test and verify failure**

Run: `npm test -- 'src/app/(pages)/resume/page.test.tsx'`

Expected: FAIL because the page still imports `src/data/resume.ts` and lacks the retro document and PDF action.

- [ ] **Step 5: Implement the server-rendered Markdown document**

Read `content/resume.md` with `fs/promises`, render it with `react-markdown`, and map h1/h2/h3/p/ul/li/a/strong to focused retro résumé classes. Wrap it in `RetroPageShell` and `RetroDocument`; render `Download PDF ↓` and `About Andrew →` actions above the document. Do not add client effects or `dangerouslySetInnerHTML`.

- [ ] **Step 6: Add responsive résumé styling**

Style a centered cream document with restrained headings and rules, readable lists, compact metadata/date lines, wrapping links, and a mobile-safe action row. Do not imitate a one-page print layout.

- [ ] **Step 7: Remove the legacy résumé data module**

Run `rg -n "@/data/resume|RESUME_CONTACT|ResumeItem" src`; after the new page is the sole source, delete `src/data/resume.ts`.

- [ ] **Step 8: Run focused and complete verification**

Run: `npm test -- 'src/app/(pages)/resume/page.test.tsx' src/test/accessibility.test.tsx && npm test && npm run lint && npx next build --webpack`

Expected: all tests and lint pass; the production route inventory includes `/resume`; the PDF is copied unchanged.

- [ ] **Step 9: Check the running preview**

Verify `/about`, `/resume`, and `/andrew-hachten-resume.pdf` return 200. Inspect desktop and mobile widths for readable prose, résumé stacking, and no horizontal overflow.

- [ ] **Step 10: Commit**

```bash
git add content/resume.md public/andrew-hachten-resume.pdf 'src/app/(pages)/resume' src/app/globals.css src/data/resume.ts package.json package-lock.json
git commit -m "feat: render retro resume from Markdown"
```
