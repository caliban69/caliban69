# Cartacuba Nature & Arts

MVP marketing and booking-entry website for Cartacuba Nature & Arts —
*Havana's Art & Culture Specialists*, the parent Cartacuba company's arts and
academic tour brand. Cloned from the sibling
[Cartacuba Tours & Travels](../../) nature-tourism site as a template — same
stack, same architecture, different content collection and theme palette.
Built with [Astro](https://astro.build), Tailwind CSS, and Preact islands,
deployed to Cloudflare Workers (via the official Astro Cloudflare adapter) as
its **own, separate Worker** — see Deploy below.

This is an MVP build stage: **no live payment or booking-vendor integration
is wired in yet.** The daytrip and multiday trip pages ship with a static
lead-capture inquiry form (see `// PHASE 2` comments in
`src/components/forms/`, `src/components/trip-daytrip.astro`, and
`src/components/trip-multiday.astro`) that emails the operator via Resend —
it does not collect payment or reserve real inventory.

## Stack

- Astro 7 (TypeScript strict, islands architecture — Preact for interactive
  components only)
- Tailwind CSS v4, design tokens in `src/styles/theme.css`
  (`// PALETTE: provisional` — revisit before brand lock)
- Astro Content Collections for trip data (`src/content/trips/`)
- Astro built-in i18n routing, `en` (default) and `es`, translation
  dictionary in `src/i18n/ui.ts`
- Zod schemas shared client/server (`src/lib/schemas.ts`)
- Resend for transactional email (contact form, booking inquiries)
- Cloudflare Turnstile for bot mitigation
- Cloudflare adapter (`output: 'server'`), deployed as a Worker with static
  assets

## Local development

Run these from **this directory** (`sites/nature-and-arts/`), not the repo
root — it's a fully independent Astro project with its own dependencies,
build output, and deploy target.

```bash
npm install
cp .env.example .env   # fill in real values, see below
npm run dev
```

Open http://localhost:4321 — it redirects to `/en/`.

### Environment variables

See `.env.example` for the full list with placeholder names. Nothing here
is committed with a real value.

| Variable | Used for |
| --- | --- |
| `RESEND_API_KEY` | Sending contact-form and booking-inquiry emails |
| `CONTACT_INBOX_EMAIL` | Where those emails are delivered |
| `PUBLIC_TURNSTILE_SITE_KEY` / `TURNSTILE_SECRET_KEY` | Bot mitigation on both forms. **If unset, Turnstile is skipped and server-side verification is a no-op** — deliberate for this pre-launch MVP stage (see comments in `src/pages/api/contact.ts` / `booking-inquiry.ts`), not a bug. Set both before going live. |
| `PUBLIC_STRIPE_PUBLISHABLE_KEY` / `STRIPE_SECRET_KEY` / `STRIPE_DAYTRIP_PRICE_ID` | **Phase 2, not yet integrated.** Reserved for the daytrip Stripe Checkout swap. |
| `PUBLIC_CHECKFRONT_HOST` / `PUBLIC_CHECKFRONT_WIDGET_ID` | **Phase 2, not yet integrated.** Reserved for the multiday tour booking-widget swap (vendor not yet finalized). |
| `PUBLIC_SITE_URL` | Canonical URL / sitemap base |

In production these are set as Cloudflare Workers secrets/vars, never
committed and never bundled into client-side JS (only `PUBLIC_*`-prefixed
vars are exposed to the browser, per Astro convention).

### Content authoring

New trips are added as Markdown files in `src/content/trips/en/` and
`src/content/trips/es/` (one file per locale per trip) — not by editing
components. See `src/content.config.ts` for the required frontmatter shape.
`alt` text is a required field on every image; the build fails if it's
missing.

The two live experiences currently ship with clearly-marked **sample
content** (`isSampleContent: true` in frontmatter) and placeholder SVG
illustrations in `public/images/placeholders/` in place of real photography —
replace both with real copy/images before launch.

**Named real people (Roberto Fabelo, "Dennis Fernández") appear in this
sample content.** Do not launch either experience commercially until Fred
has a confirmed arrangement with each named individual to be booked and
named publicly — see the `isSampleContent` notice at the bottom of each
trip's Markdown body for specifics, including a name/affiliation
discrepancy flagged for the jazz-class trip.

## Testing

```bash
npm run typecheck   # astro check
npm run lint        # eslint
npm run build       # required before e2e/Lighthouse — they run against the build
npm run test:e2e    # Playwright
npm run lighthouse  # Lighthouse CI budget gate (see budget.json, lighthouserc.cjs)
```

Playwright and Lighthouse both run against `astro preview` (the actual
Cloudflare-adapter build), not `astro dev` — the CSP and a few other
production-only behaviors aren't active in dev mode.

## Security & compliance notes

- **CSP**: delivered via Astro's built-in `security.csp` (see
  `astro.config.mjs`) as a per-page `<meta>` tag with hashes Astro computes
  for its own bundled scripts — this is why island hydration works with no
  `unsafe-inline`. Allow-listed external origins: Stripe, Checkfront,
  Turnstile (Resend is server-to-server only, listed anyway per the brief).
  `frame-ancestors` can't be expressed via `<meta>`; `X-Frame-Options` in
  `src/middleware.ts` covers clickjacking protection instead.
- **Rate limiting**: the authoritative limit on `/api/*` POST endpoints
  should be a **Cloudflare Rate Limiting Rule** configured in the dashboard
  (not yet provisioned — set one up before launch). `src/lib/rateLimit.ts`
  adds a best-effort in-Worker backstop on top of that; see the comment
  there for why it isn't a substitute.
- **Cookie consent**: gates script execution (not just disclosure) via
  `src/components/CookieConsent.tsx` — `window.cartacubaConsent` /
  `cartacuba:consent` event is the hook any future analytics script must
  check before loading. No analytics or marketing pixel is wired in.
- **No PII in logs**: form-handling code logs generic failure markers only,
  never the submitted payload — see `src/pages/api/contact.ts` and
  `booking-inquiry.ts`.

## Deploy

```bash
npm run deploy   # astro build && wrangler deploy --config dist/server/wrangler.json
```

Run this from **`sites/nature-and-arts/`**. The Worker name comes from
`package.json`'s `"name"` field — `cartacuba-nature-and-arts`, distinct from
the nature site's `cartacuba-tours-travels` — so this deploys as a
completely separate Cloudflare Worker with its own URL
(`cartacuba-nature-and-arts.<your-subdomain>.workers.dev`) and never
overwrites the nature-tourism site.

The Astro Cloudflare adapter generates its own `wrangler.json` inside
`dist/server/` at build time (including automatic KV provisioning for
Astro's session support, unused by this app but enabled by default). There
is no hand-maintained `wrangler.toml` in this repo — let the adapter own
that file rather than risk drift.

Cloudflare secrets (`RESEND_API_KEY`, `TURNSTILE_SECRET_KEY`, etc.) must be
set via `wrangler secret put <NAME>` (or the dashboard) before the first
deploy — see the environment variable table above. These are set
**per-Worker**, so they need to be set again here even though they're
already set on the nature-tourism site.

## CI

GitHub Actions (`.github/workflows/ci.yml`) runs on every PR and push to
`main`: typecheck, lint, Playwright e2e, and the Lighthouse CI budget gate
(Performance ≥ 90, Accessibility ≥ 95, LCP < 2.5s simulated, ≤ 100KB
first-party JS — see `lighthouserc.cjs` and `budget.json`). Dependabot
(`.github/dependabot.yml`) checks for dependency updates weekly.

## What's explicitly out of scope for this MVP

See §9 of the original project brief: no custom cart/checkout/payment
backend, no live Stripe/Checkfront integration (Phase 2), no user accounts,
no admin CMS (content is Git-managed Markdown), no blog, no reviews system
beyond static curated quotes.
