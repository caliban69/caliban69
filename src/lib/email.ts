import { Resend } from 'resend';

interface SendEmailArgs {
  apiKey: string;
  to: string;
  replyTo?: string;
  subject: string;
  html: string;
}

// Thin wrapper so call sites never touch the Resend client directly —
// keeps the transactional-email vendor swappable (e.g. to Postmark)
// behind one seam.
export async function sendTransactionalEmail({ apiKey, to, replyTo, subject, html }: SendEmailArgs) {
  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from: 'Cartacuba Tours & Travels <notifications@cartacubatours.example>',
    to,
    replyTo,
    subject,
    html,
  });
  if (error) {
    throw new Error(`Resend send failed: ${error.message}`);
  }
}

// NOTE: never interpolate raw form fields into log output — this module
// and its callers must not console.log the `to`/`html` contents in
// production (no PII in logs, §7).
