# Retro Personal Site Redesign

**Date:** November 17, 2026
**Status:** Proposed for final approval

## Intent

Rebuild `andrewhachten.com` as Andrew’s small personal home on the internet. The site should feel like a warm, funny, carefully made 1990s personal homepage without reproducing the era’s usability problems.

The personal site is no longer the permanent home for Andrew’s software projects or recipes. It should introduce Andrew, link to the separate places where he makes things, provide an About page, and provide a readable résumé page.

The personality should come from Andrew’s actual writing, draggable introduction, restrained classic-computer styling, and one deliberately absurd Easter egg. It should not read as a conventional developer portfolio or a fake operating system.

## Goals

- Publish the approved retro homepage direction in the existing Next.js application.
- Make the homepage a clear gateway to If It’s True, Edge Case Recipes, Sleeping Stone, and About.
- Preserve and improve the independently draggable words and punctuation.
- Include the approved identity-change Easter egg on desktop.
- Restyle About within the same visual system while allowing Andrew to replace its copy later.
- Render a readable web résumé from a Markdown source and offer a supplied PDF for download.
- Preserve modern accessibility, responsive behavior, metadata, and performance.
- Remove obsolete content and code in deliberate phases as replacement sites become available.

## Non-goals

- Recreate a complete classic Mac desktop, browser, or operating system.
- Carry personal-site styling into If It’s True, Edge Case Recipes, or Sleeping Stone.
- Retain Super Tic Tac Toe.
- Redesign the two NYT hint tools here; they are being handed off to If It’s True.
- Rewrite Andrew’s About or résumé copy without his draft.
- Add a footer.
- Add homepage navigation links for About or Résumé.

## Anti-goals

- A generic developer-portfolio hero, featured-project hierarchy, or marketing slogan.
- Decorative controls that appear interactive but do nothing.
- Retro styling that makes long text difficult to read.
- Invented contact information, project claims, or résumé content.
- Reintroducing Andrew’s email address or phone number.
- Using the old personal-site UI as a visual requirement for migrated content.

## Approaches considered

### Site rollout

1. **Single replacement:** redesign every retained page, remove all migrated content, add redirects, and publish in one release.
2. **Phased replacement:** publish the new personal-site experience first, retain only externally dependent routes until their replacements are live, then remove those implementations and add redirects.

**Selected:** phased replacement. This avoids dead links and does not make the personal-site redesign depend on the If It’s True implementation schedule.

### Résumé layout

1. **Classic document:** a centered cream document inside the silver-gray shell.
2. **Mac résumé window:** a more literal application-window presentation.
3. **Document with retro index:** a cream document with a sticky desktop section index.

**Selected:** classic document. It keeps the résumé professional and readable while the shell, typography, rules, and buttons carry the retro character.

## Information architecture

### Retained public pages

- `/` — homepage
- `/about` — About Andrew
- `/resume` — web résumé and PDF download

### External destinations

- If It’s True — `https://ifitstrue.dev`
- Edge Case Recipes — `https://edgecase.recipes`
- Sleeping Stone — `https://www.sleepingstonecandles.com/`

External destination links open in the same tab. Their arrow treatment communicates that they leave the personal site.

### Navigation

- The homepage has no conventional top navigation.
- The yellow “Who’s making all this?” starburst links to `/about`.
- About contains a clear beveled link to `/resume`.
- Résumé contains a clear beveled link to `/about`.
- On internal pages, the striped page title acts as the understated route back to `/` while retaining its title-bar appearance.

### Footer

There is no footer on any page.

## Shared visual system

### Foundation

- Silver-gray page background and shell.
- Full-width horizontal pinstripe header inspired by classic Macintosh title bars.
- Centered page title interrupting the stripes.
- Cream content surfaces.
- Light/dark beveled borders and rectangular controls.
- Monospace headings and controls with a readable sans-serif body.
- A small red, yellow, gray, cream, and dark-text palette.
- Square or nearly square corners; no modern rounded-card system.

### Header

- Full viewport width.
- Approximately 80% of the original mockup header height.
- Homepage title: `Andrew Hachten’s Home Page`.
- Internal pages use the same structure with contextual titles, such as `Andrew Hachten’s Résumé`.
- No logo or “Andrew Hachten” wordmark in the upper-left corner.

### Controls

- Rectangular beveled buttons with visible hover, active, and keyboard-focus states.
- Minimum comfortable pointer target size.
- Links remain recognizable as links.
- Motion is optional and restrained; honor `prefers-reduced-motion`.

## Homepage

### Introduction panel

The homepage begins with a framed cream panel. It remains roughly 80% of the initial adaptation’s height.

Copy:

> Hi, I'm Andrew!
>
> I'm a software engineer, baker, and candlemaker living in Philadelphia. You can find links to my projects, recipes, and candles here! You can also move all of these words around, if you want.

Every word and every punctuation mark is an independent draggable item. Punctuation begins immediately beside its associated word but has its own position and can be dragged independently. All text uses the same color; there are no randomly colored green words.

Words must render above the yellow About starburst when dragged across it.

The production implementation should retain the existing site’s keyboard-operable dragging behavior or improve it. Pointer interaction must work with mouse and touch. Reset behavior must remain available to keyboard users.

### About starburst

- Yellow irregular starburst with dark red text.
- Initial copy: `Who’s making all this?` and `Meet Andrew →`.
- Links to `/about`.
- It is visually below dragged words in the stacking order.

### Destination cards

Three equal-weight destinations appear below the introduction with no explanatory section heading or introductory sentence.

Each destination has:

- a framed preview image or identity treatment;
- a title and beveled `Visit ↗` button on the same row; and
- a short description.

Content:

1. **If It’s True**
   - Description: `My games, tools, and other projects.`
   - URL: `https://ifitstrue.dev`
2. **Edge Case Recipes**
   - Description: `My baking and cocktail recipes.`
   - URL: `https://edgecase.recipes`
3. **Sleeping Stone**
   - Preview uses the supplied `ss primary logo.svg` asset.
   - Description: `Candle company I started, with candles inspired by poetry and nature.`
   - URL: `https://www.sleepingstonecandles.com/`

The homepage contains no Resume or About links outside the starburst and destination structure.

## Draggable-word Easter egg

### Availability

- Desktop only for now.
- Ordinary word dragging remains available on mobile.
- Mobile does not attempt long-distance target detection, automatic scrolling, or the identity transformation.

### Trigger

The user moves these words onto their matching destination previews:

- `projects` → If It’s True
- `recipes` → Edge Case Recipes
- `candles` → Sleeping Stone

At least 60% of each word’s own rectangle must overlap its matching preview. All three matches must remain valid for 1.5 uninterrupted seconds. Moving any word below the threshold cancels and resets the timer.

The Easter egg triggers once per page load.

### Result

1. The three trigger words return to their original positions.
2. A retro alert dialog appears with:
   - Title: `Identity Update`
   - Message: `Congratulations! You are now Andrew Hachten.`
   - One `OK` button
3. Focus moves into the dialog and returns sensibly when it closes.
4. Escape may dismiss the dialog in addition to the `OK` button.
5. Background content is inert while the modal is open.
6. The page copy changes as follows:

Introduction:

> Hi, you're Andrew!
>
> You're a software engineer, baker, and candlemaker living in Philadelphia. I can find links to your projects, recipes, and candles here! I can also move all of these words around, if I want.

Starburst:

- `Who’s making all this?`
- `Meet Yourself →`

Destination descriptions:

- `Your games, tools, and other projects.`
- `Your baking and cocktail recipes.`
- `Candle company you started, with candles inspired by poetry and nature.`

The transformation does not persist across reloads.

## About page

### Status

The final About copy is intentionally deferred. Andrew will write a new, fuller draft covering more of his work and personal interests.

Until that draft arrives:

- preserve the current copy as temporary source material;
- do not treat references to recipes, puzzle hints, or Super Tic Tac Toe as final publishable copy; and
- do not invent replacement prose.

### Layout requirements

- Use the same full-width striped header and cream document language.
- Favor a readable personal essay over a résumé-like layout or card grid.
- Include a visible beveled `View résumé →` action.
- Provide a route back home through the header title.
- Allow room for the future draft to be longer than the current About page.

The About page can be implemented structurally before the final draft, but final publication requires a copy review because the current text describes content being removed.

## Résumé page

### Content sources

Andrew will supply:

- a Markdown résumé used to generate the webpage; and
- a PDF résumé offered as a download.

The Markdown content may be reorganized to fit the retro webpage, but its wording and factual claims must be preserved. The Markdown and PDF should be checked for obvious discrepancies when updated.

No email address or phone number appears on the webpage unless Andrew explicitly restores it later.

### Layout

- Full-width striped header titled `Andrew Hachten’s Résumé`.
- Compact page heading and professional subtitle above the document.
- Prominent beveled `Download PDF ↓` and `About Andrew →` actions.
- One centered cream document, approximately 900px maximum width.
- No sticky sidebar or document index.
- Centered résumé heading on desktop and left-aligned heading on narrow screens.
- Experience, Skills, and Education use strong monospace headings and restrained horizontal pinstripe rules.
- Body copy remains a highly readable sans-serif.
- Dates align opposite job titles on desktop and stack naturally on mobile.
- The webpage remains semantic, searchable, selectable, and printable.

The current résumé data may be used only as temporary layout material. The supplied Markdown becomes the final content source.

## Responsive behavior

- Destination cards use three columns on wider screens and one column on narrow screens.
- Title/button rows remain readable without overflowing; they may tighten or stack if necessary at very small widths.
- The starburst moves below the introduction copy on narrow screens.
- Draggable words cannot create permanent horizontal page overflow.
- The résumé becomes a single padded document with stacked job headings and dates.
- No footer space remains.
- The desktop Easter egg is disabled below the chosen desktop breakpoint.

Test at minimum around 320px, 390px, 768px, 1024px, and a wide desktop viewport.

## Accessibility

- Preserve the existing skip link and semantic page landmarks where applicable.
- All interactive elements are keyboard reachable with visible focus.
- Draggable words have an understandable keyboard interaction and status announcements.
- The hidden Easter egg is an enhancement; discovering it is not required to access content.
- The alert uses proper dialog semantics, focus containment, dismissal, and focus restoration.
- External-card images use appropriate alt treatment; decorative duplicate logos can use empty alt text when the adjacent heading supplies the name.
- Text and controls meet WCAG AA contrast.
- Touch targets remain comfortable.
- `prefers-reduced-motion` disables nonessential transitions.
- The layout remains usable under zoom and text enlargement.

## Content removal and migration

### Remove without replacement handling

- Super Tic Tac Toe and `/games/tictactoe` may simply be deleted.
- No redirect, retirement page, or special response is required.

### Recipes

Recipes have already moved to Edge Case Recipes. Remove recipe UI and data from the personal site. Permanently redirect both `/recipes` and every legacy `/recipes/*` URL to `https://edgecase.recipes`; individual recipe slugs do not need one-to-one destinations. Do not duplicate recipe content long-term.

### Projects catalogue

Remove the local projects catalogue from the final personal-site information architecture. Add a permanent redirect from `/projects` to `https://ifitstrue.dev`. The homepage card points to the same destination.

### Top-level external redirects

Add permanent redirects for the old content categories:

- `/projects` → `https://ifitstrue.dev`
- `/candles` → `https://www.sleepingstonecandles.com/`
- `/recipes` → `https://edgecase.recipes`
- `/recipes/*` → `https://edgecase.recipes`

These redirects are part of the first redesigned-site release.

### NYT hint tools

Connections Hints and Wordle Hints are being ported to If It’s True. During the first phase they may remain available at their existing direct URLs but should not appear in the new personal-site navigation or homepage. Once their If It’s True replacements are live:

- add redirects to their exact new destinations;
- remove their pages, APIs, puzzle logic, and tests from this repository; and
- remove them from the sitemap.

While temporarily retained, the two tools remain functionally and visually unchanged. Do not spend redesign effort placing them inside the retro shell. The implementation may isolate their existing layout from the new personal-site shell as needed.

### Sitemap and metadata

The final sitemap should contain only retained personal-site routes plus any temporary routes intentionally left live during the phased migration. Metadata and structured data must describe the new site accurately and must not advertise removed recipes, games, or tools.

## Assets

- Move `ss primary logo.svg` into an appropriate production asset location with a stable, URL-safe filename.
- Do not generate replacement branding for the three external sites without Andrew’s direction.
- The current If It’s True and Edge Case Recipes preview treatments are approved as layout concepts but can be replaced with supplied first-party assets later without changing card structure.

## Technical direction

- Keep the existing Next.js, React, TypeScript, and Tailwind stack unless implementation reveals a concrete reason to change it.
- Build a small reusable retro shell and token system rather than pasting mockup CSS into each page.
- Keep the homepage’s interactive dragging and Easter-egg logic isolated from static page content.
- Render résumé Markdown at build time or server-render time; no CMS or client-side Markdown fetching is required.
- Avoid adding a large component or animation library for this redesign.
- Preserve or improve the existing tests around draggable accessibility, route metadata, and responsive behavior.

## Rollout

### Phase 1: redesigned personal site

- Implement shared retro shell.
- Implement homepage, draggable text, destination links, and Easter egg.
- Implement the structural About page with temporary copy clearly marked for final review.
- Implement the classic-document résumé once Markdown and PDF are supplied.
- Remove the footer and conventional global navigation.
- Remove Super Tic Tac Toe.
- Remove the local recipe index and add the approved top-level external redirects.
- Keep unported NYT tools directly reachable but unadvertised.

### Phase 2: complete content migration

- Replace temporary About copy with Andrew’s approved draft.
- Redirect Connections Hints and Wordle Hints after their If It’s True versions are live.
- Remove remaining migrated code and dependencies.
- Perform a final sitemap, metadata, dead-link, and dependency audit.

## Publication gates

Before the redesigned site is published:

- Andrew supplies or approves final About copy, or explicitly approves publishing the temporary version.
- Andrew supplies the final résumé Markdown and PDF.
- All three external links are verified.
- Homepage and résumé receive desktop and mobile visual approval.
- The production build, automated tests, linting, accessibility checks, and link checks pass.
- Keyboard dragging and the desktop Easter egg are manually verified.
- The site is checked at the required viewport widths and with reduced motion.
- Removed routes are absent from navigation and sitemap.

## Deferred decisions

- Final About copy and any About-specific media.
- Exact If It’s True URLs for Connections Hints and Wordle Hints.
- Final Markdown and PDF filenames.
- Whether future first-party preview art replaces the approved temporary If It’s True and Edge Case Recipes treatments.
