# About and Résumé Refinement Design

**Date:** November 17, 2026

## Intent

Finish the two internal personal-site pages so they feel native to the new retro design rather than carried over from the previous site. The About page should read comfortably and avoid repeating its title. The résumé page should use Andrew's supplied Markdown as maintainable content while presenting it as a deliberately designed retro web document.

## Goals

- Remove the visible `About Andrew` heading; retain an accessible page heading for screen readers.
- Increase the About body copy from 16px to approximately 18px with a comfortable line height.
- Preserve the current About copy until Andrew supplies its replacement.
- Create a site-owned, semantic `content/resume.md` from the supplied Markdown.
- Preserve Andrew's résumé wording while reorganizing Markdown headings, dates, and lists for semantic web rendering.
- Remove the email address and phone number from the webpage Markdown.
- Preserve the supplied PDF unchanged, including its contact information, as the downloadable formal résumé.
- Render the résumé server-side from Markdown.
- Style the web résumé as a readable cream document within the existing retro gray frame and striped title bar.
- Use clear section headings, rules, role/company/date groupings, readable accomplishment lists, and retro buttons for `Download PDF` and `About Andrew`.

## Non-Goals

- Rewriting résumé accomplishments or inventing new résumé content.
- Forcing the web résumé into a one-page print layout.
- Replacing the supplied PDF or removing its contact information.
- Finalizing the temporary About prose.

## Approaches Considered

1. **Site-owned semantic Markdown with custom rendering and CSS (chosen).** Copy the supplied Markdown into `content/resume.md`, remove only web-private contact details, improve its semantic structure, and render it through customized Markdown components. This keeps content maintainable while giving the page a design specific to this site.
2. **Filter the original Markdown during rendering.** Keep the source unchanged and strip contact details programmatically. This is unnecessarily brittle because privacy would depend on matching a particular content line.
3. **Hard-code the résumé in React.** This would provide layout control but would defeat the agreed Markdown-driven workflow.

## Constraints

- The PDF is copied unchanged and remains the only public version containing the email address and phone number.
- The web résumé must contain no `mailto:`, `tel:`, visible email address, or visible phone number.
- External résumé links remain ordinary same-tab links, consistent with the rest of the retro site.
- Rendering must remain server-side and must not use `dangerouslySetInnerHTML`.
- The About and résumé pages must have no footer.

## Acceptance

- The About page no longer displays a redundant title and its prose is visibly easier to read.
- `/resume` displays the supplied résumé content in the approved retro-document treatment.
- The PDF download works at `/andrew-hachten-resume.pdf` and preserves the supplied file unchanged.
- Automated tests cover semantic résumé sections, private contact-data exclusion, PDF download behavior, About typography hooks, and retained navigation.
