import { defineMiddleware } from 'astro:middleware';

// The Content-Security-Policy itself is delivered via Astro's built-in
// `security.csp` (astro.config.mjs) as a per-page <meta> tag with hashes
// Astro computes for its own bundled scripts/styles — see the comment
// there. Setting a second, separate CSP here would be enforced
// *additively* (a resource must satisfy both), and this one has no way to
// know Astro's per-build hashes, so it would silently re-break hydration.
// This middleware only sets the headers a <meta> tag cannot express.
export const onRequest = defineMiddleware(async (_context, next) => {
  const response = await next();
  const headers = response.headers;

  headers.set('X-Frame-Options', 'SAMEORIGIN');
  headers.set('X-Content-Type-Options', 'nosniff');
  headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  headers.set('Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload');
  headers.set('Permissions-Policy', 'geolocation=(), camera=(), microphone=()');

  return response;
});
