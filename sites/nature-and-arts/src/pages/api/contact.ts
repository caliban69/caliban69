import type { APIRoute } from 'astro';
import { env } from 'cloudflare:workers';
import { contactFormSchema } from '../../lib/schemas';
import { sendTransactionalEmail } from '../../lib/email';
import { verifyTurnstileToken } from '../../lib/turnstile';
import { isRateLimited } from '../../lib/rateLimit';

export const prerender = false;

const categoryLabel = {
  general: 'General inquiry',
  'booking-question': 'Booking question',
  'technical-issue': 'Technical issue',
} as const;

export const POST: APIRoute = async ({ request }) => {
  const clientIp = request.headers.get('CF-Connecting-IP') ?? 'unknown';
  if (isRateLimited(`contact:${clientIp}`)) {
    return new Response(JSON.stringify({ ok: false, error: 'rate_limited' }), { status: 429 });
  }

  const json = await request.json().catch(() => null);
  const parsed = contactFormSchema.safeParse(json);
  if (!parsed.success) {
    return new Response(JSON.stringify({ ok: false, error: 'invalid_input' }), { status: 400 });
  }
  const data = parsed.data;

  // Honeypot filled in => silently pretend success so bots don't learn.
  if (data.companyWebsite) {
    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  }

  // Turnstile is only enforced once a real secret key is configured — pre-
  // launch (no key provisioned yet) this is a deliberate no-op, not a bug.
  if (env.TURNSTILE_SECRET_KEY) {
    const validTurnstile = await verifyTurnstileToken(data.turnstileToken, env.TURNSTILE_SECRET_KEY, clientIp);
    if (!validTurnstile) {
      return new Response(JSON.stringify({ ok: false, error: 'bot_challenge_failed' }), { status: 400 });
    }
  }

  try {
    await sendTransactionalEmail({
      apiKey: env.RESEND_API_KEY,
      to: env.CONTACT_INBOX_EMAIL,
      replyTo: data.email,
      subject: `[${categoryLabel[data.category]}] Contact form — Cartacuba Nature & Arts`,
      html: `
        <p><strong>Category:</strong> ${escapeHtml(categoryLabel[data.category])}</p>
        <p><strong>Name:</strong> ${escapeHtml(data.name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(data.email)}</p>
        <p><strong>Message:</strong></p>
        <p>${escapeHtml(data.message).replace(/\n/g, '<br />')}</p>
      `,
    });
  } catch {
    // No PII in logs: log a generic failure marker only, never the payload.
    console.error('contact form: email send failed');
    return new Response(JSON.stringify({ ok: false, error: 'email_failed' }), { status: 502 });
  }

  return new Response(JSON.stringify({ ok: true }), { status: 200 });
};

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
