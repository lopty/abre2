# Booking pages and enquiry updates

18 November 2026.

## What changed

- Replaced the package detail page's dense overlapping sheet with a spacious introduction, icon-led trip facts, a reading column and a separate price/enquiry panel.
- Preserved the package photographs, existing font and colours, prices, itinerary details, inclusions, exclusions and visa notes.
- Added expandable daily itinerary, visa notes and FAQs. The first itinerary day opens initially.
- Simplified the shared enquiry builder to dates and travellers, with notes and car/chauffeur requests under optional details.
- Added Book buttons to destination price blocks and package actions. They open a native modal with Call and WhatsApp choices.
- The booking modal identifies the selected trip and supports Escape, close button, backdrop dismissal and native focus return.
- Mobile package pages have a compact price and Book bar.
- All travel and real estate WhatsApp builders now start with: Hi, I am from your website.

## Checks

- Travel TypeScript check passed.
- Full travel build and 102-page SEO audit passed.
- Real estate build and 57-route audit passed.
- All 408 travel and 177 real estate generated WhatsApp links passed the greeting check in `scripts/check-whatsapp.mjs`.
- Confirmed quote form dates, travellers, notes and car selection appear in its generated WhatsApp URL.
- Confirmed Book opens the correct trip's modal; Call uses the office telephone and WhatsApp contains the selected trip.
- Checked Escape closes the modal and returns focus to Book.
- Checked itinerary and FAQ expansion.
- Checked mobile widths of 320 and 390 px with no horizontal page overflow. The modal fits the narrow viewport.
- No browser console errors observed on the checked package page.
- No calls or WhatsApp messages were sent.

The existing travel client-bundle size warning remains. No deployment or Git commit was performed.

Screenshots are in `reports/screenshots/`: `booking-layout-desktop.jpg`, `booking-popup-desktop.jpg`, `booking-form-mobile.jpg`, and `booking-popup-mobile.jpg`.

Pre-change booking source snapshots are in `reports/travel-booking-before/`.
