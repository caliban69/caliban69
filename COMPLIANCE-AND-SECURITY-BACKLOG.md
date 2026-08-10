# Compliance & Security Backlog

**Status as of 2026-08-10.** This file is the durable record of every open
security, intellectual-property, and regulatory item across both sites
(`/` — Cartacuba Tours & Travels, and `sites/nature-and-arts/` — Cartacuba
Nature & Arts). It exists so this list survives independently of any chat
history — update it in place as items get resolved, don't let it drift out
of sync with reality.

**This is a working engineering checklist, not legal advice.** Several
items below (marked accordingly) should go to qualified legal counsel
before either site takes real bookings or payments, particularly anything
under GDPR and IP. Flagging the issue accurately is not the same as
resolving it.

---

## 1. Cybersecurity

| Item | Priority | Notes |
| --- | --- | --- |
| Rotate the Cloudflare API token and Resend API key | Medium | Neither was ever committed to git (verified directly against full history), but both were typed into chat repeatedly and sit in plaintext in local `deploy.bat` files. Not an active compromise — just hygiene. Rotate via Cloudflare dashboard → My Profile → API Tokens, and Resend dashboard → API Keys, then update both `deploy.bat` files and any `wrangler secret put` values. |
| Configure the Cloudflare-side Rate Limiting Rule | High (before public launch) | The in-Worker rate limiter (`src/lib/rateLimit.ts`) is a best-effort backstop only — it resets whenever a Worker isolate recycles and isn't shared across regions. The authoritative control is a Rule configured in the Cloudflare dashboard against `/api/*`, not yet created. |
| Provision a real Cloudflare Turnstile site key | High (before public launch) | Both contact/booking forms already call Turnstile verification server-side, but it's a no-op until `TURNSTILE_SECRET_KEY` is actually set — currently anyone can spam either form's email-relay without a challenge (the honeypot field and IP rate limit provide some cover in the meantime). |
| Review the 8 open Dependabot PRs before merging | Medium | Most are safe patch bumps. At least two are major-version jumps (ESLint 9→10, TypeScript 5→7 in the arts site) that can break the build — test locally before merging, don't bulk-approve. |
| Dev-tooling dependency vulnerabilities (`npm audit`) | Low | `wrangler`, `miniflare`, `@lhci/cli` and their transitive deps (`undici`, `tmp`, `nanoid`, `uuid`) have known CVEs, but all are `devDependencies` — none reach the code actually served to site visitors. Still worth clearing opportunistically via the Dependabot PRs above. |
| No automated secret-scanning in CI | Low | GitHub's native secret scanning applies to public repos automatically; once this repo goes private (§4), that coverage may change depending on plan. Consider adding a lightweight scan step (e.g. gitleaks) to `.github/workflows/ci.yml` as defense-in-depth against ever committing a real secret by accident. |
| Branch protection on the default branch | Low | Not currently verified/configured. Worth requiring CI to pass and a review before merge once this repo has more than one contributor. |
| HSTS `preload` directive is currently inert | Low | Set in `src/middleware.ts`, but meaningless until there's a real custom domain — `workers.dev` isn't (and can't be) submitted to the HSTS preload list. Revisit once a domain is purchased; actually submitting to hstspreload.org is a deliberate, hard-to-reverse commitment (browsers hard-enforce HTTPS for that domain forever), so do it knowingly, not as a default. |
| New attack surface when Phase 2 payment integration lands | Deferred | Whenever Stripe or Checkfront gets wired in: webhook signature verification, PCI-DSS scope (prefer a hosted checkout page over handling card data directly, to keep scope minimal), and a fresh secret-handling review for the new API keys. Not applicable yet — no payment integration exists today. |

## 2. Intellectual property

| Item | Priority | Notes |
| --- | --- | --- |
| Trademark check on "Cartacuba" as a business name | High (before wider marketing spend) | Raised early in this project, never resolved. Do a basic USPTO/EUIPO search before buying a domain or spending on marketing under this name. **Legal review recommended** if the search surfaces anything close. |
| Real, named individuals used commercially without confirmed consent | High (blocks launch of that specific page) | The arts site's jazz-class experience names a real musician, "Dennis Fernández," as a bookable host. A public search couldn't corroborate him as a Síntesis band member. Do not publicize or take bookings against that page until Fred has a direct, confirmed agreement with him to be named and booked commercially — using someone's name/reputation for a paid product without consent is a right-of-publicity issue, independent of whether the underlying fact (his affiliation) is even accurate. The equivalent issue with the real artist Roberto Fabelo has already been mitigated by swapping in a clearly-fictional placeholder name ("Mateo Aguilar") pending a real, confirmed artist. |
| Placeholder imagery — currently zero risk, will change | Info | All current hero/gallery images on both sites are custom-generated SVG shapes (original output, not sourced from anywhere) — no third-party IP exposure today. When real photography is added: only use photos Fred actually took or has a documented license for. Do not pull images from Google Images, other tour operators' sites, or stock sites without a valid license — this is the most common IP mistake for small-business sites. |
| Venue names used descriptively (Museo Nacional de Bellas Artes, Fábrica de Arte Cubano, La Guarida) | Low | Referring to real public venues as part of a genuine itinerary that visits them is standard nominative use, not a trademark issue. The one open thread is practical, not legal: La Guarida group-dinner reservations need to actually be arranged with the venue before advertising it as a fixed itinerary stop. |
| Marketing copy drafted from public web research | Low | Museo Nacional de Bellas Artes / Fábrica de Arte Cubano / La Guarida descriptions were paraphrased from public sources (Wikipedia and similar), not copied verbatim. Facts aren't copyrightable, but a final human copy-edit pass before launch is still good practice. |

## 3. GDPR / data protection

**None of this has had legal review. Treat every line here as "what to bring to a lawyer," not as compliance already achieved.**

- **What personal data is actually collected today**: name, email, optional phone, and free-text message/notes, via the Contact and Booking Inquiry forms on both sites. No accounts, no database — each submission is relayed once by email (Resend) to Fred's inbox and not persisted anywhere else in the app.
- **Privacy Policy page is still placeholder content** on both sites (`src/pages/*/privacy.astro`) — it needs real drafting covering lawful basis for processing, what's collected and why, retention period, third parties involved (Resend), and how a visitor exercises their rights (access, correction, erasure, portability). This is squarely a "get a lawyer or a proper GDPR-template service" task, not a code change.
- **Resend is a data processor** under GDPR terms — confirm Resend's Data Processing Agreement / Standard Contractual Clauses coverage before relying on it for EU visitors' data (most mainstream providers offer this, but it needs to be actively reviewed and, if required, signed — not assumed).
- **Cloudflare Workers/KV run at global edge locations** — understand where data actually transits/is cached before scaling to real EU traffic; Cloudflare offers EU-only data-residency options on paid tiers if that becomes necessary.
- **Cookie consent already gates non-essential scripts behind opt-in** (`src/components/CookieConsent.tsx`), which is the right GDPR-aligned pattern — but nothing non-essential is wired in yet (no analytics, no marketing pixels), so this hasn't been tested against a real use case. Re-verify the specific consent copy and defaults whenever analytics (e.g. Cloudflare Web Analytics) gets added.
- **No formal process yet for a data-subject request** (e.g. "delete my information") — today that would just mean Fred manually deleting an email. Fine at this scale, but should be written down as the actual documented process, however informal, once the Privacy Policy is real.
- **If/when Phase 2 payment processing is added**, that's meaningfully more personal + financial data in scope — revisit this whole section at that point, not just the security row above.

## 4. AI use & disclosure (EU AI Act / US state AI laws)

**Fast-moving area — treat this section as a snapshot, not a settled position. Get counsel before public launch if this matters as much as stated.**

- **The sites themselves don't embed AI functionality** visible to end users — no chatbot, no algorithmic recommendations, no automated decision-making about a visitor. That's the category most current AI regulation (including the EU AI Act's higher-risk tiers) actually targets, and neither site falls into it as a *product*.
- **What *is* true**: most of the marketing copy, itinerary descriptions, and this project's code were drafted by Claude (an AI system) from Fred's source material and public research, at Fred's direction, with Fred reviewing and directing changes throughout. Emerging transparency expectations (EU AI Act Article 50 disclosure obligations for certain AI-generated content, various proposed US state laws, general FTC guidance against deceptive AI-generated endorsements) increasingly matter when synthetic content could be mistaken for something it isn't — particularly content depicting or naming real people.
- **Where this actually intersects with real risk on this project**: the same Fabelo/Dennis Fernández situation in §2. If AI-drafted copy implies a real person's endorsement or participation without their consent, that's a problem regardless of which regulatory lens it's viewed through (personality rights, deceptive advertising, or AI-content-transparency rules all point the same direction). Fix is the same in every case: confirmed real consent, or don't name them.
- **No image of a real, identifiable person has been AI-generated** on either site — all current imagery is abstract placeholder art, not synthetic media of a person. Keep it that way, or apply clear disclosure if that ever changes.
- **Reasonable practice already in place**: every piece of AI-drafted content on this project has gone through Fred's direction and review before being committed, and that trail exists in this repository's commit history. That's a defensible "AI-assisted, human-approved" posture — worth explicitly maintaining (i.e., don't start auto-publishing AI output without review) rather than treating as automatic.

## 5. Repository visibility

This repository (`caliban69/caliban69`) is currently **public** — it's GitHub's special `username/username` profile-README repo, which needs to stay public only if you want it to render on your GitHub profile page. No secret has ever been committed to it (verified directly), but the full source code, commit history, and business/content strategy of both sites are visible to anyone.

**I can't change repository visibility myself — no tool in my GitHub access covers that account-level setting.** To make it private:

1. Go to `https://github.com/caliban69/caliban69/settings`
2. Scroll to the **Danger Zone** at the bottom
3. Click **Change visibility** → **Make private**
4. Confirm by typing the repository name

This is safe and fully reversible (it can be made public again the same way). The only side effect is losing the GitHub-profile-README rendering for this account, since that feature specifically requires this repo to be public.
