# Design refinement, 18 November 2026

## Al Basel Real Estate

- Mobile action buttons use 38 to 40 px heights with single-line labels.
- The header has explicit logo, contact and menu columns so the contact action cannot squeeze into two lines.
- Mobile property search uses a shorter Search label and grid columns that can shrink safely.
- CTA groups can wrap without making individual buttons tall.
- Checked the homepage, project detail and contact page at 320 px and 390 px widths. No horizontal overflow or clipped action labels observed.
- Build and 57-route content audit passed. All 59 generated HTML documents, including admin and error pages, contained zero em dash characters.

## Tuwaiq Travel

Project: `C:/Users/Lopty/Desktop/App/tuwaiq-travel`.

- Simplified the homepage hero to one photograph, a clear heading and two compact actions.
- Replaced the competing hero spotlight and destination reel with a compact destination/region search. The main destination collection remains below it.
- Standardised Manrope typography, heading weights, line icons, borders, radii and muted surfaces.
- Refined shared package, destination, service and guide cards across the existing routes.
- Added an accessible mobile header menu and active-page navigation markers.
- Refined shared enquiry forms, the footer and mobile action sizing.
- Kept the package data, prices, destination content, contact details, route structure and WhatsApp message generation.
- Replaced shell-specific output cleanup with a guarded Node script so the build runs on Windows.

Original files are retained in `C:/Users/Lopty/Desktop/App/tuwaiq-travel/design-backup-2026-11-18/`. This directory is excluded from TypeScript compilation and Git tracking.

## Validation

- Real estate build and content audit: passed.
- Travel TypeScript check: `npm run lint`, passed.
- Travel full build: passed, with 102 prerendered pages and the existing SEO quality gate.
- Travel HTML scan: all 102 files contained zero em dashes.
- Browser checks: 1440 px desktop and 390 px mobile, plus 320 px real estate checks.
- Travel search isolated Japan and displayed the matching empty package state; region filtering responded to changes.
- Mobile header menu opened and closed.
- Travel package index and Georgia detail page displayed correctly with no horizontal overflow.
- Editing travel dates updated the WhatsApp enquiry URL. No messages were sent.
- No browser console errors observed on checked travel pages.

The travel build still reports the existing large client-bundle warning. Static rendering and the SEO audit pass. Deployment, Git commits and live-site changes were not performed.

## Previews

Screenshots: `reports/screenshots/mobile-buttons-fixed.jpg`, `travel-desktop.jpg`, and `travel-mobile.jpg`.

To run locally, use `npm run dev` in each project's folder. Real estate serves on port 4173 and the travel development server on port 3000.
