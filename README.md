# Al Basel Real Estate Brokers

A static, prerendered website for albaselrealestate.ae. No application server, database or customer account. Enquiries are stored in a Google Sheet through a Google Apps Script web app (see `docs/leads-setup.md`). The Node server is a local preview only.

## Run and build

Requires Node 22 or newer.

```sh
npm ci
npm run typecheck
npm test
npm run build
npm run dev
```

Preview: http://localhost:4173/. The generated site is in `dist/`. `render.yaml` defines the Render static-site build and publish directory. Connect the repository to Render, choose the blueprint or use the listed build command, then configure the domain through the hosting account. Deployment and DNS were not changed during this build.

## Content and verification

- `data/business.json` is the single source for business contact and registration facts.
- `data/projects/*.json` holds sourced project background. Five historical brokerage project records and three current Emaar developer-launch profiles are included. Developer launch status was reviewed on 18 November 2026; it is not a promise of current brokerage inventory.
- `data/properties/*.json` stores individual listings. The Lila record is a draft, excluded from public HTML, navigation and the sitemap. Its inconsistent source area was intentionally omitted.
- `data/services.mjs` and `data/guides.mjs` hold the service and guide content.
- `reports/fact-sheet.md` identifies facts, sources and remaining inputs.
- `reports/pages-and-queries.md` lists generated URLs and intended search topics.
- `reports/audit.json` contains the most recent build audit result.

Project photographs were downloaded from the existing brokerage website; new launch images came from the corresponding official Emaar pages. Some are developer renderings. Retain the relevant image-use permission records before public release. No customer reviews, ratings, social profiles, licence identifiers, current prices, payment plans, yields or completion dates were invented.

## Add a property

Copy `templates/property.json`, fill in the property facts and source, and place the photographs in a folder:

```sh
npm run add-property -- ./my-property.json ./photos
```

The command creates a draft and converts photographs to WebP. Existing records cannot be overwritten with this command. Set status to `published` only after the records have been reviewed. The build requires the permit number, official QR image, agent name and BRN, plus brokerage ORN and trade licence. Store the QR returned by DLD; do not substitute a generated generic QR.

Rebuilding removes the old `dist/` output first. Unpublished or removed listings therefore do not remain as stale HTML.

## Decap CMS at /admin/

The CMS page and property form are provided. GitHub authentication cannot work until the repository and OAuth service are configured:

1. Push the site to the intended GitHub repository.
2. Set `backend.repo` and `backend.branch` in `public/admin/config.yml`.
3. Configure a GitHub-compatible OAuth service and put its URL in `backend.base_url`. Render static hosting does not supply this service. A managed authentication service or separately hosted OAuth bridge is required; it is not an application backend for the website.
4. Grant staff the appropriate repository access. Keep OAuth secrets in the authentication service, never in this repository.
5. Connect Render automatic builds to commits. Sign in at `/admin/` and test a draft save and image upload.

Staff may leave compliance fields empty while a property is a draft. Publishing an incomplete record fails the build. GitHub access, OAuth and Render deployment remain account-level setup tasks, not verified integrations in this local delivery.

## Search and enquiries

Project search filters the prerendered cards by location and type. Buy, rent and off-plan choices take visitors to the corresponding page. Rental enquiries are available even while no approved rentals are published. Bedroom, bathroom, area and price facts are rendered on approved property cards. Location, property type, buy/rent, bedroom and price filters are enabled when approved unit records are present, separately from project background filters. All content and navigation is available without JavaScript; filtering and the WhatsApp form need JavaScript. Direct phone and WhatsApp links remain available without it.

## Lead capture and /admin/leads/

`public/leads/leads.js` intercepts every WhatsApp link and asks for name and phone first, saves the enquiry to the shared Google Sheet, then opens WhatsApp with the details. The contact form saves through the same script. `public/admin/leads/` is a password-protected table of enquiries with filters, status, salesperson, notes and Excel/CSV export. The files are shared with tuwaiq.ae (`site: 'albasel'` in `public/leads/config.js`); keep both copies identical when changing them. Setup: `docs/leads-setup.md`; Apps Script: `docs/leads-apps-script.gs`.

## Quality gate

Every build audits duplicate URLs, titles, descriptions and H1s; missing metadata; broken local links and images; orphan routes; repeated long main-content paragraphs; button-based navigation; prohibited copy; JSON-LD syntax; image attributes; and listing publication records. Shared navigation, sidebars and short interface text are treated as interface copy. Type checking covers the content contract and publication policy. Policy tests check each compliance dependency and draft exclusion.

The site emits canonical and Open Graph metadata, breadcrumbs, RealEstateAgent structured data, visible FAQ markup, Article markup, sitemap.xml, robots.txt and llms.txt. No rating schema is emitted.

## Remaining business inputs

Provide the brokerage ORN and licence, agent names/BRNs, official advertising permits and QR images, current listing mandates, confirmed opening hours, and official social links. The team and licence pages label the missing items as pending. No community page is created unless two project or property records support it. Price/payment-plan intent pages are deferred until verified records exist.
