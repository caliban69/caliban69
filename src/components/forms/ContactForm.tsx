import { useState } from 'preact/hooks';
import { contactFormSchema } from '../../lib/schemas';
import TurnstileWidget from './TurnstileWidget';
import { ui, type Locale } from '../../i18n/ui';

interface Props {
  locale: Locale;
  turnstileSiteKey: string;
}

type Status = 'idle' | 'submitting' | 'success' | 'error';

export default function ContactForm({ locale, turnstileSiteKey }: Props) {
  const t = (key: keyof (typeof ui)['en']) => ui[locale][key] ?? ui.en[key];
  const [status, setStatus] = useState<Status>('idle');
  const [turnstileToken, setTurnstileToken] = useState('');
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  async function handleSubmit(event: SubmitEvent) {
    event.preventDefault();
    const form = event.currentTarget as HTMLFormElement;
    const formData = new FormData(form);

    const payload = {
      name: String(formData.get('name') ?? ''),
      email: String(formData.get('email') ?? ''),
      category: String(formData.get('category') ?? 'general'),
      message: String(formData.get('message') ?? ''),
      companyWebsite: String(formData.get('companyWebsite') ?? ''),
      turnstileToken,
    };

    const parsed = contactFormSchema.safeParse(payload);
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
      const response = await fetch('/api/contact', {
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
      <p role="status" class="rounded border border-olive-500/40 bg-ink-900 p-4 text-paper-100">
        {t('contact.form.success')}
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} class="flex flex-col gap-5" noValidate>
      <div class="flex flex-col gap-1">
        <label htmlFor="contact-name" class="text-sm text-paper-100">
          {t('contact.form.name')}
        </label>
        <input
          id="contact-name"
          name="name"
          type="text"
          required
          class="rounded border border-ink-600 bg-ink-900 px-3 py-2 text-paper-50 focus:border-terracotta-500"
        />
      </div>

      <div class="flex flex-col gap-1">
        <label htmlFor="contact-email" class="text-sm text-paper-100">
          {t('contact.form.email')}
        </label>
        <input
          id="contact-email"
          name="email"
          type="email"
          required
          class="rounded border border-ink-600 bg-ink-900 px-3 py-2 text-paper-50 focus:border-terracotta-500"
        />
      </div>

      <div class="flex flex-col gap-1">
        <label htmlFor="contact-category" class="text-sm text-paper-100">
          {t('contact.form.category')}
        </label>
        <select
          id="contact-category"
          name="category"
          class="rounded border border-ink-600 bg-ink-900 px-3 py-2 text-paper-50 focus:border-terracotta-500"
        >
          <option value="general">{t('contact.form.category.general')}</option>
          <option value="booking-question">{t('contact.form.category.booking')}</option>
          <option value="technical-issue">{t('contact.form.category.technical')}</option>
        </select>
      </div>

      <div class="flex flex-col gap-1">
        <label htmlFor="contact-message" class="text-sm text-paper-100">
          {t('contact.form.message')}
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={5}
          required
          class="rounded border border-ink-600 bg-ink-900 px-3 py-2 text-paper-50 focus:border-terracotta-500"
        />
      </div>

      {/* Honeypot — hidden from sighted users and off the tab order; real users never fill this in. */}
      <div class="hidden" aria-hidden="true">
        <label htmlFor="contact-company">Leave this field blank</label>
        <input id="contact-company" name="companyWebsite" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <TurnstileWidget siteKey={turnstileSiteKey} onVerify={setTurnstileToken} />

      {Object.keys(fieldErrors).length > 0 && (
        <p role="alert" class="text-sm text-error-500">
          {t('common.requiredField')}
        </p>
      )}
      {status === 'error' && (
        <p role="alert" class="text-sm text-error-500">
          {t('contact.form.error')}
        </p>
      )}

      <button
        type="submit"
        disabled={status === 'submitting'}
        class="w-fit rounded bg-terracotta-600 px-6 py-3 text-sm font-medium text-paper-50 hover:bg-terracotta-700 disabled:opacity-60"
      >
        {status === 'submitting' ? t('contact.form.submitting') : t('contact.form.submit')}
      </button>
    </form>
  );
}
