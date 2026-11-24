# International buyer release validation

24 November 2026. Local preview at http://127.0.0.1:4173/international-buyers/.

- Build and whole-site audit passed: 373 routes. Nineteen new routes comprise one hub, six country pages and twelve guides.
- International checks passed: canonical URLs, sitemap inclusion, booking buttons, country context, two supporting guides per country and guide contents anchors.
- WhatsApp scan passed for 1,868 Al Basel static links. The requested greeting and +971529038948 remain in use.
- TypeScript check and five existing collection/publication-policy tests passed.
- Browser checked the desktop hub, France country journey, supporting guide and mobile layout at a 390px viewport. No horizontal overflow or unloaded main images were detected on the France page. The preview reported no console errors on the guide.
- France preselected in the real booking popup, with optional details initially collapsed and editable. Expanded form remained scrollable on mobile.
- A temporary local QA fixture used the actual shared lead script with its endpoint explicitly disabled. A synthetic Canada enquiry generated the expected WhatsApp draft, including purpose, budget, timeframe, country, language and callback time. The WhatsApp and call choices were not followed. No lead request, message or call was sent. Test contact/deduplication storage was restored through the fixture UI, and the final build removed the fixture.
- Country source material, query targets, limitations and next-market scope are in docs/international-buyers-release.md. Translations, measured keyword demand, production publication and actual spreadsheet delivery were not verified by this local release.

Screenshots: reports/screenshots/international-buyers-desktop.jpg, international-france-mobile.jpg and international-guide-desktop.jpg.
