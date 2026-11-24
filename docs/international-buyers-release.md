# International buyer release, 24 November 2026

Local release: one international buyer hub, six country landing pages and twelve supporting guides. All new pages use English. They are linked from main navigation, the footer, the guide index, sitemap and HTML directory. Translations and the remaining fifteen country pages are later phases, not published placeholders.

## Search intent and routes

These are editorial query targets, not measured search volumes or ranking claims. Search Console and keyword research access have not been supplied.

| Country | Main route and proposed query | Supporting topics |
| --- | --- | --- |
| India | /international-buyers/india/; buying Dubai property from India | /guides/india-funding-dubai-property/; /guides/india-family-dubai-property-brief/ |
| Saudi Arabia | /international-buyers/saudi-arabia/; buying Dubai property from Saudi Arabia | /guides/saudi-arabia-dubai-viewing-trip/; /guides/saudi-arabia-dubai-second-home/ |
| France | /international-buyers/france/; buying Dubai property from France | /guides/france-dubai-property-euro-budget/; /guides/france-dubai-remote-purchase-file/ |
| United States | /international-buyers/united-states/; buying Dubai property from the US | /guides/us-dubai-property-adviser-records/; /guides/us-dubai-property-long-distance-management/ |
| Canada | /international-buyers/canada/; buying Dubai property from Canada | /guides/canada-dubai-personal-use-rental/; /guides/canada-dubai-property-cad-records/ |
| Pakistan | /international-buyers/pakistan/; buying Dubai property from Pakistan | /guides/pakistan-dubai-property-funding/; /guides/pakistan-dubai-family-ownership/ |

Hub: /international-buyers/. The existing guides answer shared questions on overseas buying, transaction costs, mortgages, off-plan purchases, powers of attorney, communities, service charges and property-linked residence. No duplicate generic guides were created for these topics.

## Sources and editorial boundaries

References are recorded in data/international-buyers.mjs and linked on the pages. Reviewed official DLD ownership FAQs and sale-registration service, RBI overseas immovable-property FAQs, IRS worldwide-income guidance, CRA T1135 questions and SBP Foreign Exchange Manual index. The French authority international personal-tax portal is a further-reading source; no French tax rates, exemptions or procedural conclusions are asserted.

The country sections distinguish residence from citizenship. Remittance, tax and representation material prepares adviser discussions; it does not confirm eligibility, permission to remit, financing approval or a reporting exemption. No numerical rental-return claims, exchange quotes, live prices, visa promises or property availability claims were introduced.

Trade licence details come from the existing business record. Group membership and dated historical awards link to the existing evidence pages. No invented client testimonials, public-figure endorsements, language fluency or completed international transactions were added. Brokerage ORN and genuine agent BRNs still need their existing verification process. Public-figure meeting photographs need a documented identity, event, date, context and usable image before inclusion.

## Enquiry handoff and storage

Existing name/phone requirements and optional email remain. A collapsed optional section adds country of residence, preferred language, purpose, budget, timeframe, callback time and time zone. Country pages preselect their country and allow correction. All 21 target countries plus UAE and Other are selectable. No IP-based residence inference occurs.

Budget, timeframe and purpose use existing spreadsheet columns. Country, language and callback details are appended to the existing notes field, so the deployed Apps Script does not need a schema migration. The WhatsApp message also carries these details, the current page and the selected subject. All enquiries use +971529038948 and the requested Al Basel greeting. Language and appointment availability require team confirmation.

Existing attribution records channel/UTM information, landing page, source and current page. No new third-party analytics service or tracking ID was installed. A WhatsApp handoff is not proof that a message was sent. Existing lead delivery uses a no-cors Apps Script request; browser confirmation alone does not verify a spreadsheet row. No real enquiry should be sent just to test the UI.

## Technical and next-phase notes

Pages render as static HTML, have individual canonical URLs and metadata, one H1 each, linked official sources and internal navigation. Article structured data identifies the organisation as author, not an invented specialist. No hreflang was added because translated equivalent pages do not yet exist. There is no automatic language or country redirect.

Next markets: Qatar, Kuwait, Bahrain, Oman, Egypt, Singapore, South Africa, Belgium, Switzerland, Morocco, Algeria, China, Japan, Brazil and Russia. The hub lists them as planned guides with a working general contact route. Local-language copy needs appropriate editorial and language review; staff-language promises need confirmation.

Build and checks: npm run build, npm run typecheck, npm test, node scripts/check-international.mjs and node scripts/check-whatsapp.mjs. Browser QA should cover the hub, country, article, optional form, default country, small screens and no horizontal overflow. Production publication, actual search indexing, measured demand and end-to-end spreadsheet delivery are separate from local validation.
