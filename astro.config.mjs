import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import preact from '@astrojs/preact';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// Deployment target: Cloudflare Pages, via the official Astro Cloudflare
// adapter. `output: 'server'` + this adapter runs entirely on Workers-
// compatible APIs (no Node.js-only APIs anywhere in the codebase).
export default defineConfig({
  site: 'https://www.cartacubatours.example',
  output: 'server',
  adapter: cloudflare({
    imageService: 'compile',
  }),
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'es'],
    routing: {
      prefixDefaultLocale: true,
    },
  },
  integrations: [
    preact(),
    sitemap({
      i18n: {
        defaultLocale: 'en',
        locales: { en: 'en', es: 'es' },
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
  // Strict CSP, rendered as a per-page <meta> tag with hashes Astro computes
  // for its own bundled scripts/styles (island hydration bootstrapping etc.)
  // — this is why the policy can stay hash-based with no 'unsafe-inline'.
  // frame-ancestors is unenforceable via <meta> (browsers ignore it there);
  // clickjacking protection instead comes from the X-Frame-Options response
  // header set in src/middleware.ts.
  security: {
    csp: {
      directives: [
        "default-src 'self'",
        "img-src 'self' data:",
        "font-src 'self'",
        "connect-src 'self' https://api.stripe.com https://challenges.cloudflare.com https://api.resend.com https://*.checkfront.com",
        "frame-src https://js.stripe.com https://hooks.stripe.com https://challenges.cloudflare.com https://*.checkfront.com",
        "object-src 'none'",
        "base-uri 'self'",
        "form-action 'self'",
      ],
      // Allow-listed per the security brief: only Stripe, Checkfront, and
      // Turnstile script domains — nothing else. Pre-emptive for the Phase 2
      // vendor integration; no script from them loads yet.
      scriptDirective: {
        // Providing `resources` replaces Astro's default source list rather
        // than appending to it, so 'self' must be listed explicitly here.
        resources: [
          "'self'",
          'https://challenges.cloudflare.com',
          'https://js.stripe.com',
          'https://*.checkfront.com',
        ],
      },
    },
  },
});
