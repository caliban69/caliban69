import { z } from 'zod';

// Shared between client (form validation before submit) and server (the
// API endpoint re-validates — never trust client-side validation alone).

export const contactCategorySchema = z.enum(['general', 'booking-question', 'technical-issue']);

export const contactFormSchema = z.object({
  name: z.string().trim().min(1).max(200),
  email: z.string().trim().email().max(320),
  category: contactCategorySchema,
  message: z.string().trim().min(1).max(5000),
  // Honeypot — must stay empty; bots that fill every field trip this.
  companyWebsite: z.string().max(0).optional().or(z.literal('')),
  // Not required at the schema level: enforcement happens server-side and
  // only when TURNSTILE_SECRET_KEY is actually configured (see the API
  // routes). Requiring it unconditionally here would make every form
  // unsubmittable in any environment — including this MVP's current one —
  // before Fred provisions a real Turnstile site.
  turnstileToken: z.string().optional().default(''),
});

export type ContactFormInput = z.infer<typeof contactFormSchema>;

// Lead-capture inquiry only — no payment or real inventory reservation.
// See `// PHASE 2` markers at the vendor-swap points in the booking pages.
export const bookingInquirySchema = z.object({
  tripSlug: z.string().trim().min(1),
  tripTitle: z.string().trim().min(1),
  preferredDate: z.string().trim().min(1),
  travelerCount: z.coerce.number().int().min(1).max(20),
  paymentPreference: z.enum(['deposit', 'full']),
  name: z.string().trim().min(1).max(200),
  email: z.string().trim().email().max(320),
  phone: z.string().trim().max(50).optional().or(z.literal('')),
  notes: z.string().trim().max(3000).optional().or(z.literal('')),
  companyWebsite: z.string().max(0).optional().or(z.literal('')),
  // Not required at the schema level: enforcement happens server-side and
  // only when TURNSTILE_SECRET_KEY is actually configured (see the API
  // routes). Requiring it unconditionally here would make every form
  // unsubmittable in any environment — including this MVP's current one —
  // before Fred provisions a real Turnstile site.
  turnstileToken: z.string().optional().default(''),
});

export type BookingInquiryInput = z.infer<typeof bookingInquirySchema>;
