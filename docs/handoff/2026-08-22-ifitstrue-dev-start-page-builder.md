# ifitstrue.dev Start Page Builder — Product and Architecture Handoff

**Status:** Approved product design; implementation has not started  
**Prepared:** August 22, 2026  
**Destination:** A new repository for `ifitstrue.dev`

## Instructions for the next Codex instance

Treat this document as product context, not as permission to scaffold immediately.

1. Inspect the new repository and any governing instructions.
2. Evaluate at least two viable technology stacks against the constraints below.
3. Recommend a stack and deployment approach, including trade-offs.
4. Get Andrew's approval before scaffolding or implementation.
5. Once approved, turn this design into a detailed implementation plan and build it incrementally with tests.

Do not assume the stack used by Andrew's existing personal site is automatically appropriate here.

## Product context

`ifitstrue.dev` will be Andrew Hachten's hub for technical, consumer-friendly browser tools and browser games. The site needs a shared catalogue and design system while allowing each project to be independently routed, loaded, and evolved.

The first planned project is a WYSIWYG start-page builder. A visitor arranges widgets on a responsive grid, customizes their content and appearance, and generates a URL containing the complete page configuration. That URL can be bookmarked as a browser start page or shared with someone else.

There are no accounts, saved records, or mutable shared pages. Opening a shared page and editing it produces a new URL. It cannot change the original because the URL itself is the document.

The product's distinctive focus is daily learning: words, countries, states, capitals, and eventually other traits such as state birds. Everyday utility widgets such as time and transit make the page useful enough to open repeatedly.

## Goals

- Let nontechnical users build a useful browser landing page visually.
- Store the complete page document in a portable, shareable URL.
- Show deterministic facts of the day from bundled, curated datasets.
- Support live SEPTA arrivals without coupling widgets to SEPTA's upstream formats.
- Make new widgets, datasets, traits, palettes, tools, and games straightforward to add.
- Work well on desktop and mobile, both as an editor and as a daily landing page.
- Keep static hosting viable except for narrowly scoped server functions needed by live integrations.
- Establish patterns that can support the broader `ifitstrue.dev` project hub.

## Non-goals for the initial release

- User accounts, cloud persistence, or mutable shared documents
- A backend database
- Schedule or calendar widgets
- MTA or non-SEPTA transit systems
- Arbitrary HTML, JavaScript, or CSS supplied by users
- Third-party calendar authentication
- Collaborative editing
- Search-engine indexing of every generated page configuration

## Site and route model

Suggested information architecture:

- `/` — `ifitstrue.dev` project catalogue and hub
- `/start` — clean, generated start-page viewer
- `/start/edit` — WYSIWYG start-page editor

The exact `/start` name remains open to product naming. The routes should share project metadata and the site design system, but viewing mode should be able to suppress the normal hub navigation so it functions as a clean browser start page.

A generated URL should use a versioned, compressed fragment:

```text
https://ifitstrue.dev/start#v1.<compressed-config>
```

The editor should accept the same fragment:

```text
https://ifitstrue.dev/start/edit#v1.<compressed-config>
```

Using a fragment is preferred because it is not sent to the web server in the HTTP request. This keeps freeform text and configuration out of ordinary server access logs. It also means the client is responsible for decoding, validating, and rendering the document.

The editor's share action generates a viewer URL. A discreet “Edit this page” action in viewing mode transfers the exact configuration to the editor route. Anyone can edit a shared configuration, but saving creates a new URL and has no effect on the original.

## Technology-selection constraints

The new Codex instance should choose the stack rather than inherit one without evaluation.

Preferences and requirements:

- Prefer TypeScript.
- Optimize for a growing hub of client-heavy browser tools and browser games.
- Support independently routed applications and code-splitting by project.
- Provide shared navigation, theming, accessibility primitives, and project metadata.
- Keep static hosting viable for most of the site.
- Support narrowly scoped server or edge functions for integrations such as SEPTA.
- Favor fast initial loads, strong automated testing, and simple deployment.
- Avoid accounts and databases until a project genuinely needs them.
- Ensure URL-fragment state works correctly with the selected routing and rendering model.

Before scaffolding, compare at least two credible choices. The recommendation should address bundle behavior, routing, static deployment, server-function support, testing, accessibility, long-term maintenance, and the ergonomics of building many small tools and games.

## Initial widget catalogue

### Core widgets

#### Clock

Configurable fields should include:

- Time zone
- 12-hour or 24-hour format
- Whether to show seconds, subject to the performance decision noted later
- Optional label
- Frame and accent appearance

#### Date

Configurable fields should include:

- Time zone
- Long, medium, short, or compact format
- Optional weekday
- Optional label
- Frame and accent appearance

#### Freeform text

Support constrained content and presentation:

- Heading or paragraph style
- Plain text with limited safe formatting
- Alignment
- Constrained type-size scale
- Optional frame and accent

Do not render raw HTML. Shared URLs must not become an injection mechanism.

#### SEPTA transit

Users select:

- SEPTA mode
- Route or line
- Stop or station
- Direction or destination
- Number of results, from 1 through 5

The widget displays upcoming arrivals or departures, a real-time/scheduled indicator, useful delay information when available, last-updated time, loading and unavailable states, and manual refresh.

Delivery order:

1. SEPTA buses
2. SEPTA Regional Rail, subway, and trolley

Both phases belong to the planned project. MTA support is out of scope.

### Learning widgets

#### Word of the day

The user selects a language and any filters supported by the underlying data, such as difficulty or part of speech.

A word record may contain:

- Word
- Language
- Translation or definition
- Part of speech
- Pronunciation text
- Example sentence
- Difficulty
- Attribution or source metadata where required

Only offer filters for which the bundled dataset has reliable values.

#### Country of the day

The primary presentation is a selected country, with configurable supporting traits such as:

- Flag
- Capital
- Continent or region
- Languages
- Currency
- Population, if the dataset includes a dated and attributed value

#### State of the day

The data model should not assume that “state” can only mean a US state, although a curated US-state dataset is an acceptable initial scope. Possible traits include capital, country, abbreviation, flag, bird, and other well-sourced facts.

#### Trait of the day

This is the generalized relationship widget. The user selects a record source, a trait, and optional filters.

Examples:

```text
source: country
trait: capital
filter: continent = Europe
```

```text
source: state
trait: capital
filter: country = United States
```

```text
source: state
trait: bird
filter: country = United States
```

The same normalized country and state data powers their dedicated widgets and the generic Trait widget. Do not maintain a separate duplicated “capital cities” dataset unless source or licensing constraints genuinely require it.

## Widget platform

Use a registry-based widget architecture. Each widget definition should expose a clear contract containing at least:

- Stable type identifier
- Display name and description
- Core or Learning category
- Versioned configuration schema and validator
- Default configuration
- Default dimensions
- Allowed dimension presets
- Editor control component or schema
- Viewer/render component
- Optional data-loading interface
- Migration behavior when its configuration schema changes

The editor, URL validator, widget library, and renderer should consume this registry rather than maintain independent type-specific switch statements throughout the application.

Each widget instance has a stable ID. Content configuration and grid placement should be separate so layout changes do not mutate widget behavior.

Conceptual document model:

```ts
type StartPageConfig = {
  version: 1;
  theme: ThemeConfig;
  layouts: {
    desktop: WidgetPlacement[];
    mobile?: WidgetPlacement[];
  };
  widgets: WidgetConfig[];
};

type WidgetPlacement = {
  widgetId: string;
  x: number;
  y: number;
  width: number;
  height: number;
};
```

Use a discriminated union for `WidgetConfig` so TypeScript can preserve widget-specific settings. Validate all decoded input at runtime; TypeScript types alone do not make a shared URL safe.

## Seeded fact-of-the-day behavior

Learning data is bundled with the application. External fact APIs are not part of v1.

Dataset selection, trait selection, and filters establish an eligible pool. A widget seed changes only the deterministic path through that pool; it does not change datasets or filters.

For example:

```text
type: word
language: French
difficulty: beginner
seed: 84721
```

The eligible pool is “beginner French words.” A stable calculation based on local calendar date, widget seed, and dataset version selects that day's item.

Requirements:

- The same widget configuration produces the same item for everyone on the same local calendar date.
- Two otherwise identical widgets with different seeds can show different items.
- The next local calendar day advances deterministically.
- Selection must not depend on array iteration behavior that could change accidentally.
- Dataset versions participate in selection so dataset updates are explicit and testable.
- Empty filter results produce a configuration error in the editor and a safe unavailable state in the viewer.
- Decide and document how leap days and time-zone changes behave.

Consider a seeded permutation or stable hash-to-index algorithm that avoids visibly repeating a small subset of items. Do not use `Math.random()` for daily selection.

## Learning-data model

Use stable IDs and normalized relationships. Illustrative shapes:

```ts
type Country = {
  id: string;
  name: string;
  capital?: string;
  continent: string;
  region?: string;
  languages: string[];
  currency?: string;
  flag?: string;
  datasetVersion: string;
};

type StateOrSubdivision = {
  id: string;
  name: string;
  countryId: string;
  type: string;
  abbreviation?: string;
  capital?: string;
  bird?: string;
  flag?: string;
  datasetVersion: string;
};
```

Exact schemas should follow the facts actually included, not speculative fields. Every dataset needs:

- Provenance
- License review
- Attribution requirements
- Version identifier
- Update procedure
- Validation script
- Duplicate-ID and relationship checks
- Documentation of omissions and disputed values

Prefer maintainable, reputable sources. Avoid copying a dataset merely because it is easy to download.

## Grid and responsive behavior

Use a responsive row/column grid rather than free pixel positioning.

- Desktop canvas: 13 columns
- Mobile canvas: 5 columns
- Common spans use Fibonacci values: `1`, `2`, `3`, `5`, `8`, and `13`
- Suggested aspect presets include `1×1`, `2×1`, `3×2`, `5×3`, and `8×5`

The golden ratio and Fibonacci sequence should guide proportions where they improve composition. They are design constraints, not reasons to make ordinary interactions awkward.

New widgets should be placed in the next available region using their default footprint. Dragging and resizing snap to cells. Invalid overlap must be prevented or resolved predictably.

Desktop layout is authoritative. The first mobile layout is generated by preserving widget order and packing widgets into five columns. Users can switch to mobile preview and customize the mobile layout. If a user later changes desktop layout after customizing mobile, warn before regenerating; never silently discard their mobile work.

The grid implementation may use a maintained library or custom code. Evaluate bundle cost, pointer and keyboard accessibility, mobile behavior, collision rules, responsive layout support, and maintenance risk before choosing.

## Editor experience

Suggested editor regions:

- Top bar: project/page title, desktop/mobile preview, undo/redo, URL-size meter, preview, and share
- Collapsible widget library and theme controls
- Central WYSIWYG landing-page canvas
- Contextual settings for the selected widget

Required widget actions:

- Add
- Select and configure
- Drag
- Resize
- Duplicate
- Delete
- Reorder accessibly without requiring pointer dragging

The editor should preserve an undo/redo history for meaningful document operations. Avoid recording incidental hover, selection, or live-clock updates in document history.

Sharing should:

1. Validate the document.
2. Serialize it canonically.
3. Compress and encode it for a URL fragment.
4. Check the generated URL size.
5. Produce and copy the viewer URL.

Show a live URL-size meter. Establish a tested warning threshold and hard maximum rather than promising that every browser, bookmark service, messaging app, and QR tool accepts the same length. Long freeform text and excessive widget counts must fail gracefully before generating an unreliable link.

## Viewing experience

Viewer mode contains no editor chrome. It renders the selected theme and responsive layout, then provides a discreet menu with “Edit this page.”

The viewer should:

- Decode and validate without crashing.
- Render a useful default page when no fragment exists.
- Display a recovery screen for malformed, unsupported, or future-version documents.
- Offer to open recoverable content in the editor when possible.
- Avoid exposing raw decoding or validation errors to ordinary users.
- Update clocks and live transit without changing document state.
- Re-evaluate daily learning widgets when the visitor's local date changes while the page remains open.
- Respect reduced-motion, color-contrast, zoom, keyboard, and screen-reader needs.

## Theme system

Use constrained design controls rather than arbitrary CSS:

- Curated palettes
- Light and dark appearance
- Curated font pairings
- Solid or subtle patterned backgrounds
- Per-widget accents selected from the active palette
- Global spacing density
- Global corner treatment
- Optional widget frame, title, and metadata visibility

Theme values in the URL should be stable semantic identifiers, not large blobs of generated CSS. Validate every identifier and provide migration aliases if themes are renamed later.

## SEPTA integration architecture

Transit is the only planned feature that requires live external data.

The browser should call internal, narrowly scoped endpoints. Server-side adapters then call SEPTA and normalize upstream responses. Do not spread SEPTA-specific response parsing throughout UI components.

Conceptual normalized response:

```ts
type TransitArrivalsResponse = {
  agency: "septa";
  mode: "bus" | "regional-rail" | "subway" | "trolley";
  route: { id: string; label: string };
  stop: { id: string; label: string };
  direction: { id: string; label: string };
  updatedAt: string;
  arrivals: Array<{
    tripId?: string;
    destination: string;
    scheduledTime?: string;
    predictedTime: string;
    delaySeconds?: number;
    realtime: boolean;
    status?: string;
  }>;
};
```

Provide internal discovery endpoints or bundled metadata for modes, routes, stops, and directions so users configure widgets using labels while URLs store stable IDs.

Delivery order:

1. SEPTA buses
2. SEPTA Regional Rail, subway, and trolley adapters using the same internal contract

Official interfaces identified during initial research include SEPTA's REST-style API documentation and GTFS/GTFS-Realtime feeds:

- <https://api.septa.org/>
- <https://www3.septa.org/developer/>

These endpoints, formats, availability, caching requirements, rate limits, CORS behavior, and license terms must be verified again at implementation time. SEPTA reserves the right to change or withdraw data, and different modes expose different capabilities. The UI must distinguish real-time predictions from scheduled information instead of implying precision the source does not provide.

Internal endpoints must validate agency, mode, route, stop, direction, and result count. Do not accept arbitrary upstream URLs. Apply caching and request coalescing appropriate to feed freshness, enforce timeouts, and return normalized error codes. A failed transit request should leave the widget stable with a helpful unavailable message and manual retry.

## Error handling and safety

- Treat all URL content as untrusted input.
- Enforce a maximum fragment length before decoding or decompressing.
- Protect against decompression bombs and excessively deep objects.
- Validate document and widget schema versions.
- Reject duplicate widget IDs and orphaned placements.
- Bound widget count, freeform text length, grid coordinates, and numeric settings.
- Never evaluate user content or render raw HTML.
- Prevent arbitrary URL fetching through transit endpoints.
- Use safe defaults for missing optional fields.
- Preserve recognizable content during supported schema migrations.
- Provide clear fallback states for missing datasets and transit outages.

## Accessibility requirements

Pointer-based WYSIWYG editing must not be the only editing method.

- All widgets and editor commands are keyboard reachable.
- Provide buttons or fields for moving and resizing selected widgets.
- Announce move, resize, add, duplicate, and delete results.
- Manage focus when opening settings, deleting widgets, and switching previews.
- Meet WCAG AA contrast for every curated palette.
- Do not encode transit or learning state through color alone.
- Respect reduced-motion preferences.
- Support browser zoom and narrow viewports without losing controls.
- Give clocks accessible labels that do not cause disruptive announcements every second.

## Testing strategy

### Unit tests

- Daily seeded selection with hand-checked dates, seeds, filters, and dataset versions
- URL codec round trips and canonical serialization
- Schema validation, malformed input, limits, and migrations
- Dataset validation, relationships, duplicate IDs, and empty filters
- Grid placement, collision, packing, and responsive conversion
- Widget registry contracts and configuration defaults
- Transit normalization using captured, sanitized upstream fixtures
- Time-zone and local-date boundaries

### Component and integration tests

- Widget configuration forms
- Add, configure, duplicate, move, resize, and delete flows
- Undo and redo
- Desktop-to-mobile generation and regeneration warning
- Viewer loading and recovery states
- Transit loading, stale, scheduled, real-time, empty, and error states
- Keyboard editing and focus management

### End-to-end tests

- Create a page, add mixed widgets, customize theme, share, and reopen the exact configuration
- Open a shared URL, edit a copy, and verify the original URL remains unchanged
- Verify the same daily fact across a shared configuration and controlled date
- Verify a daily fact advances on the next date
- Exercise URL warning and hard-limit behavior
- Test representative desktop and mobile viewports
- Test malformed and unsupported-version links
- Exercise transit through deterministic test adapters rather than depending on live SEPTA in the main suite

### Quality gates

- Type checking
- Linting
- Unit/integration suite
- Production build
- Automated accessibility checks plus manual keyboard review
- Bundle-size review by route
- No live-network dependency in deterministic CI tests

## Delivery milestones

### Milestone 1: Foundation and read-only viewer

- Select and scaffold the approved stack
- Establish the project hub shell and project catalogue pattern
- Add `/start` and `/start/edit` routes
- Define widget registry contracts
- Define and validate configuration version 1
- Implement URL codec, limits, and recovery states
- Render a default read-only start page

### Milestone 2: WYSIWYG core

- Responsive desktop and mobile grid
- Add/configure/drag/resize/duplicate/delete operations
- Keyboard alternatives
- Undo/redo
- Clock, Date, and Freeform Text widgets
- Curated themes
- Preview and share flow

### Milestone 3: Learning system

- Approve sources and licenses
- Add dataset generation and validation workflow
- Implement seeded daily selection
- Add Word, Country, State, and Trait widgets
- Add supporting details and filter controls

### Milestone 4: SEPTA buses

- Verify current official interfaces and terms
- Add route/stop/direction discovery
- Add bus arrival adapter and normalized endpoint
- Add transit widget configuration and display states
- Add fixture-based tests and operational safeguards

### Milestone 5: SEPTA rail, subway, and trolley

- Add mode-specific discovery and adapters
- Preserve the normalized transit contract
- Clearly label scheduled versus real-time data
- Expand fixtures and error handling

### Milestone 6: Launch hardening

- Cross-browser and cross-device testing
- Accessibility review
- Performance and bundle review
- URL-size compatibility testing
- Dataset attribution UI
- Transit caching and failure review
- Documentation for adding projects, widgets, traits, and datasets

## Explicit implementation-time decisions

The product design intentionally leaves these decisions to the new repository's design process:

- Framework, build tooling, and deployment platform
- Final product name and whether `/start` is the permanent route
- URL compression/encoding library
- Tested URL warning threshold and hard maximum
- Grid library versus custom implementation
- Runtime schema-validation library
- State and undo/redo implementation
- Exact bundled datasets, licenses, attribution, and update cadence
- Exact SEPTA endpoints per mode
- Clock update frequency and whether seconds are enabled by default
- Whether generated start pages should include optional import/export as a file in addition to URLs

Do not resolve these by habit. Evaluate them against the stated product goals and get approval where the trade-off changes user experience or operating cost.

## Acceptance criteria for the first complete release

- A visitor can create a start page without an account.
- The editor visibly matches the generated page.
- Widgets can be placed and resized on a responsive Fibonacci-influenced grid.
- Desktop and mobile arrangements are usable and independently adjustable.
- The page supports Clock, Date, Freeform Text, SEPTA Transit, Word, Country, State, and Trait widgets.
- Learning widgets show deterministic, seeded facts of the day from bundled datasets.
- SEPTA supports buses, Regional Rail, subway, and trolley with honest real-time/scheduled labeling.
- Theme customization remains curated and safe.
- Sharing produces a validated URL containing the complete document.
- Opening and editing a shared URL produces an independent new URL.
- Malformed or oversized URLs fail safely and recoverably.
- Core editor actions work without a pointer.
- Automated tests cover the URL contract, daily selection, grid behavior, widget contracts, transit adapters, and editor/share/reopen journey.

## Suggested kickoff prompt for the new Codex instance

> Read `docs/handoff/2026-08-22-ifitstrue-dev-start-page-builder.md` completely. This repository will become `ifitstrue.dev`, a hub for consumer-friendly in-browser tools and games. Prefer TypeScript, but do not assume a framework. First inspect the repository and its instructions. Then compare at least two viable stacks against the handoff's technology-selection constraints, recommend one with concrete trade-offs, and ask for approval. Do not scaffold or implement until the stack and first milestone design are approved. Once approved, create a detailed implementation plan and execute it incrementally with tests and verification.

