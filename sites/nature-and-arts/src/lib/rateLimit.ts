/**
 * In-Worker rate limiter — a best-effort, defense-in-depth backstop only.
 *
 * The authoritative rate limit for POST endpoints (§7) is a Cloudflare
 * Rate Limiting Rule configured in the dashboard against `/api/*`
 * (documented in README.md "Rate limiting"). This in-memory limiter
 * exists because a Worker isolate can serve many requests before it's
 * recycled, so it catches bursts within a single isolate's lifetime —
 * it is NOT a substitute for the dashboard rule, since memory is not
 * shared across isolates/regions and resets whenever one is recycled.
 */
const WINDOW_MS = 60_000;
const MAX_REQUESTS_PER_WINDOW = 5;

const hits = new Map<string, number[]>();

export function isRateLimited(key: string, now = Date.now()): boolean {
  const timestamps = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  timestamps.push(now);
  hits.set(key, timestamps);
  return timestamps.length > MAX_REQUESTS_PER_WINDOW;
}
