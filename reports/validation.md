# Validation

- `npm run build`: 57 prerendered routes generated; audit passed with zero issues.
- `npm run typecheck`: passed.
- `npm test`: five tests passed, including each compliance dependency, draft exclusion, empty inventory and escaped property cards.
- HTTP: all 57 public routes returned status 200 from the local preview.
- Browser: verified desktop at 1440 × 1100 and mobile at 390 × 844. No horizontal overflow, broken loaded images or browser console errors observed on the homepage.
- Interactions: mobile menu opens and closes; villa filter isolates Elie Saab; search routes to off-plan with the three developer-launch profiles; project image dialog opens and closes.
- Desktop and mobile screenshots saved in `reports/screenshots/`.
- Configured Decap script URL returned HTTP 200. GitHub authentication was not tested because the repository and OAuth endpoint are not supplied.
- Dependency installation reported zero known vulnerabilities after updating Sharp to the patched version.
- Render deployment, DNS, live unit verification, agent registration checks and end-to-end CMS authentication remain unverified.

The preview server was used only for local QA. Run `npm run dev` to reopen the site at http://localhost:4173/.
