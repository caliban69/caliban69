import { useState } from 'preact/hooks';
import { bookingInquirySchema } from '../../lib/schemas';
import TurnstileWidget from './TurnstileWidget';
import { ui, type Locale } from '../../i18n/ui';

interface Props {
  locale: Locale;
  turnstileSiteKey: string;
  tripSlug: string;
  tripTitle: string;
}

type Status = 'idle' | 'submitting' | 'success' | 'error';

/**
 * Static, styled availability/deposit INQUIRY form — modeled functionally
 * on a booking-and-deposit flow (dates, traveler count, deposit-vs-full
 * choice, traveler details) but fully original visual design. It does not
 * process payment or reserve real inventory: on submit it sends a
 * lead-capture email via Resend and shows a confirmation state.
 *
 * // PHASE 2: replace this lead-capture email with a live vendor booking
 * // widget (Stripe Checkout for the daytrip, Checkfront/Bokun/FareHarbor
 * // for the multiday tour — vendor not yet finalized) once chosen.
 */
export default function BookingInquiryForm({ locale, turnstileSiteKey, tripSlug, tripTitle }: Props) {
  const t = (key: keyof (typeof ui)['en']) => ui[locale][key] ?? ui.en[key];
  const [status, setStatus] = useState<Status>('idle');
  const [turnstileToken, setTurnstileToken] = useState('');
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  async function handleSubmit(event: SubmitEvent) {
    event.preventDefault();
    const form = event.currentTarget as HTMLFormElement;
    const formData = new FormData(form);

    const payload = {
      tripSlug,
      tripTitle,
      preferredDate: String(formData.get('preferredDate') ?? ''),
      travelerCount: String(formData.get('travelerCount') ?? ''),
      paymentPreference: String(formData.get('paymentPreference') ?? 'deposit'),
      name: String(formData.get('name') ?? ''),
      email: String(formData.get('email') ?? ''),
      phone: String(formData.get('phone') ?? ''),
      notes: String(formData.get('notes') ?? ''),
      companyWebsite: String(formData.get('companyWebsite') ?? ''),
      turnstileToken,
    };

    const parsed = bookingInquirySchema.safeParse(payload);
    if (!parsed.success) {
      const errors: Record<string, string> = {};
      for (const issue of parsed.error.issues) {
        errors[String(issue.path[0])] = issue.message;
      }
      setFieldErrors(errors);
      return;
    }
    setFieldErrors({});
    setStatus('submitting');

    try {
      const response = await fetch('/api/booking-inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(parsed.data),
      });
      if (!response.ok) throw new Error('request failed');
      setStatus('success');
      form.reset();
    } catch {
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <div role="status" class="rounded border border-olive-500/40 bg-ink-900 p-6">
        <h3 class="font-display text-lg text-paper-50">{t('booking.form.success.heading')}</h3>
        <p class="mt-2 text-sm text-stone-400">{t('booking.form.success.body')}</p>
      </div>
    );
  }

  return (
    <div class="rounded-lg border border-ink-700 bg-ink-900 p-6">
      <h3 class="font-display text-lg text-paper-50">{t('booking.form.heading')}</h3>
      <p class="mt-2 text-sm text-stone-400">{t('booking.form.intro')}</p>

      <form onSubmit={handleSubmit} class="mt-6 flex flex-col gap-5" noValidate>
        <div class="grid gap-5 sm:grid-cols-2">
          <div class="flex flex-col gap-1">
            <label htmlFor="booking-date" class="text-sm text-paper-100">
              {t('booking.form.tripDate')}
            </label>
            <input
              id="booking-date"
              name="preferredDate"
              type="date"
              required
              class="rounded border border-ink-600 bg-ink-950 px-3 py-2 text-paper-50 focus:border-terracotta-500"
            />
          </div>
          <div class="flex flex-col gap-1">
            <label htmlFor="booking-travelers" class="text-sm text-paper-100">
              {t('booking.form.travelers')}
            </label>
            <input
              id="booking-travelers"
              name="travelerCount"
              type="number"
              min="1"
              max="20"
              defaultValue="2"
              required
              class="rounded border border-ink-600 bg-ink-950 px-3 py-2 text-paper-50 focus:border-terracotta-500"
            />
          </div>
        </div>

        <fieldset class="flex flex-col gap-2">
          <legend class="text-sm text-paper-100">{t('booking.form.paymentPreference')}</legend>
          <div class="flex gap-6">
            <label class="flex items-center gap-2 text-sm text-paper-100">
              <input type="radio" name="paymentPreference" value="deposit" defaultChecked />
              {t('booking.form.paymentPreference.deposit')}
            </label>
            <label class="flex items-center gap-2 text-sm text-paper-100">
              <input type="radio" name="paymentPreference" value="full" />
              {t('booking.form.paymentPreference.full')}
            </label>
          </div>
        </fieldset>

        <div class="grid gap-5 sm:grid-cols-2">
          <div class="flex flex-col gap-1">
            <label htmlFor="booking-name" class="text-sm text-paper-100">
              {t('booking.form.name')}
            </label>
            <input
              id="booking-name"
              name="name"
              type="text"
              required
              class="rounded border border-ink-600 bg-ink-950 px-3 py-2 text-paper-50 focus:border-terracotta-500"
            />
          </div>
          <div class="flex flex-col gap-1">
            <label htmlFor="booking-email" class="text-sm text-paper-100">
              {t('booking.form.email')}
            </label>
            <input
              id="booking-email"
              name="email"
              type="email"
              required
              class="rounded border border-ink-600 bg-ink-950 px-3 py-2 text-paper-50 focus:border-terracotta-500"
            />
          </div>
        </div>

        <div class="flex flex-col gap-1">
          <label htmlFor="booking-phone" class="text-sm text-paper-100">
            {t('booking.form.phone')}
          </label>
          <input
            id="booking-phone"
            name="phone"
            type="tel"
            class="rounded border border-ink-600 bg-ink-950 px-3 py-2 text-paper-50 focus:border-terracotta-500"
          />
        </div>

        <div class="flex flex-col gap-1">
          <label htmlFor="booking-notes" class="text-sm text-paper-100">
            {t('booking.form.notes')}
          </label>
          <textarea
            id="booking-notes"
            name="notes"
            rows={3}
            class="rounded border border-ink-600 bg-ink-950 px-3 py-2 text-paper-50 focus:border-terracotta-500"
          />
        </div>

        <div class="hidden" aria-hidden="true">
          <label htmlFor="booking-company">Leave this field blank</label>
          <input id="booking-company" name="companyWebsite" type="text" tabIndex={-1} autoComplete="off" />
        </div>

        <TurnstileWidget siteKey={turnstileSiteKey} onVerify={setTurnstileToken} />

        {Object.keys(fieldErrors).length > 0 && (
          <p role="alert" class="text-sm text-error-500">
            {t('common.requiredField')}
          </p>
        )}
        {status === 'error' && (
          <p role="alert" class="text-sm text-error-500">
            {t('booking.form.error')}
          </p>
        )}

        <button
          type="submit"
          disabled={status === 'submitting'}
          class="w-fit rounded bg-terracotta-600 px-6 py-3 text-sm font-medium text-paper-50 hover:bg-terracotta-700 disabled:opacity-60"
        >
          {status === 'submitting' ? t('booking.form.submitting') : t('booking.form.submit')}
        </button>
      </form>
    </div>
  );
}
