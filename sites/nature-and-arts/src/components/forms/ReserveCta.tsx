import { useState } from 'preact/hooks';
import BookingInquiryForm from './BookingInquiryForm';
import { ui, type Locale } from '../../i18n/ui';

interface Props {
  locale: Locale;
  turnstileSiteKey: string;
  tripSlug: string;
  tripTitle: string;
}

// PHASE 2: replace with Stripe Checkout (fixed price, fixed product ID
// from env var) once the daytrip's payment vendor integration is scoped.
export default function ReserveCta({ locale, turnstileSiteKey, tripSlug, tripTitle }: Props) {
  const t = (key: keyof (typeof ui)['en']) => ui[locale][key] ?? ui.en[key];
  const [open, setOpen] = useState(false);

  if (open) {
    return (
      <div class="mt-8">
        <BookingInquiryForm
          locale={locale}
          turnstileSiteKey={turnstileSiteKey}
          tripSlug={tripSlug}
          tripTitle={tripTitle}
        />
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setOpen(true)}
      class="mt-8 w-fit rounded bg-terracotta-600 px-6 py-3 text-sm font-medium text-paper-50 hover:bg-terracotta-700"
    >
      {t('booking.cta.daytrip')}
    </button>
  );
}
