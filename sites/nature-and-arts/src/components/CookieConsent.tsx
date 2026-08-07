import { useEffect, useState } from 'preact/hooks';
import { ui, type Locale } from '../i18n/ui';

const STORAGE_KEY = 'cc-consent';

export type ConsentValue = 'accepted' | 'rejected';

/**
 * Gates non-essential scripts (analytics, third-party embeds beyond the
 * booking widget itself) behind explicit consent — no analytics is wired
 * into this MVP yet, but any future script must check
 * `window.cartacubaConsent === 'accepted'` (or listen for the
 * `cartacuba:consent` event) before it runs, not just disclose itself in
 * the cookie policy.
 */
export default function CookieConsent({ locale }: { locale: Locale }) {
  const t = (key: keyof (typeof ui)['en']) => ui[locale][key] ?? ui.en[key];
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY) as ConsentValue | null;
    if (!stored) {
      setVisible(true);
    } else {
      applyConsent(stored);
    }
  }, []);

  function applyConsent(value: ConsentValue) {
    window.localStorage.setItem(STORAGE_KEY, value);
    (window as typeof window & { cartacubaConsent?: ConsentValue }).cartacubaConsent = value;
    window.dispatchEvent(new CustomEvent('cartacuba:consent', { detail: value }));
  }

  function choose(value: ConsentValue) {
    applyConsent(value);
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Cookie consent"
      class="fixed inset-x-0 bottom-0 z-50 border-t border-ink-700 bg-ink-900 px-4 py-4 sm:px-6"
    >
      <div class="mx-auto flex max-w-6xl flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p class="text-sm text-paper-100">
          {t('cookieConsent.message')}{' '}
          <a
            href={`/${locale}/cookies/`}
            class="underline decoration-sand-300 underline-offset-2 hover:text-terracotta-400"
          >
            {t('cookieConsent.settingsLink')}
          </a>
        </p>
        <div class="flex shrink-0 gap-3">
          <button
            type="button"
            onClick={() => choose('rejected')}
            class="rounded border border-ink-600 px-4 py-2 text-sm text-paper-100 hover:border-sand-300"
          >
            {t('cookieConsent.reject')}
          </button>
          <button
            type="button"
            onClick={() => choose('accepted')}
            class="rounded bg-terracotta-600 px-4 py-2 text-sm font-medium text-paper-50 hover:bg-terracotta-700"
          >
            {t('cookieConsent.accept')}
          </button>
        </div>
      </div>
    </div>
  );
}
