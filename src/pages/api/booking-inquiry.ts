import type { APIRoute } from 'astro';
import { env } from 'cloudflare:workers';
import { bookingInquirySchema } from '../../lib/schemas';
import { sendTransactionalEmail } from '../../lib/email';
import { verifyTurnstileToken } from '../../lib/turnstile';
import { isRateLimited } from '../../lib/rateLimit';

export const prerender = false;

// This is a lead-capture inquiry, not a checkout: no payment is taken and
// no real inventory is reserved here. See the `// PHASE 2` markers on the
// trip pages for where a live vendor integration will replace this email.
export const POST: APIRoute = async ({ request }) => {
  const clientIp = request.headers.get('CF-Connecting-IP') ?? 'unknown';
  if (isRateLimited(`booking-inquiry:${clientIp}`)) {
    return new Response(JSON.stringify({ ok: false, error: 'rate_limited' }), { status: 429 });
  }

  const json = await request.json().catch(() => null);
  const parsed = bookingInquirySchema.safeParse(json);
  if (!parsed.success) {
    return new Response(JSON.stringify({ ok: false, error: 'invalid_input' }), { status: 400 });
  }
  const data = parsed.data;

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
      subject: `Booking inquiry — ${data.tripTitle}`,
      html: `
        <p><strong>Trip:</strong> ${escapeHtml(data.tripTitle)} (${escapeHtml(data.tripSlug)})</p>
        <p><strong>Preferred date:</strong> ${escapeHtml(data.preferredDate)}</p>
        <p><strong>Travelers:</strong> ${data.travelerCount}</p>
        <p><strong>Payment preference:</strong> ${escapeHtml(data.paymentPreference)}</p>
        <p><strong>Name:</strong> ${escapeHtml(data.name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(data.email)}</p>
        ${data.phone ? `<p><strong>Phone:</strong> ${escapeHtml(data.phone)}</p>` : ''}
        ${data.notes ? `<p><strong>Notes:</strong> ${escapeHtml(data.notes).replace(/\n/g, '<br />')}</p>` : ''}
        <p style="color:#847a68;font-size:12px;">This is a lead-capture inquiry only — no payment was collected.</p>
      `,
    });
  } catch {
    console.error('booking inquiry: email send failed');
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
