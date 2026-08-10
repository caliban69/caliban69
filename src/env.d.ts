/// <reference types="astro/client" />

interface Env {
  RESEND_API_KEY: string;
  CONTACT_INBOX_EMAIL: string;
  TURNSTILE_SECRET_KEY: string;
}

// Cloudflare Workers bindings/secrets — the Astro v6+ Cloudflare adapter
// exposes them here instead of `Astro.locals.runtime.env`. `wrangler types`
// would normally generate this ambient module from wrangler.toml; declared
// by hand here since no bindings beyond plain secrets are used yet.
declare module 'cloudflare:workers' {
  export const env: Env;
}
