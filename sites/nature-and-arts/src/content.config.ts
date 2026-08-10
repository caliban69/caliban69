import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const difficulty = z.enum(['easy', 'moderate', 'challenging']);

// `alt` is required on every image field per the accessibility requirement
// (WCAG 2.1 AA) — a missing alt text fails the build, it doesn't ship.
const imageWithAlt = z.object({
  src: z.string(),
  alt: z.string().min(1, 'alt text is required for every trip image'),
});

const itineraryDay = z.object({
  day: z.number().int().positive(),
  title: z.string(),
  description: z.string(),
});

const trips = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/trips' }),
  schema: () =>
    z
      .object({
        type: z.enum(['daytrip', 'multiday']),
        title: z.string(),
        summary: z.string(),
        heroImage: imageWithAlt,
        duration: z.string(),
        priceMode: z.enum(['fixed', 'from']),
        price: z.number().positive(),
        currency: z.literal('USD').default('USD'),
        groupSizeCap: z.number().int().positive(),
        difficulty,
        included: z.array(z.string()).min(1),
        excluded: z.array(z.string()).min(1),
        highlights: z.array(z.string()).min(1),
        cancellationPolicy: z.string(),

        // daytrip-only
        meetingPoint: z.string().optional(),
        stripePriceEnvVar: z.string().optional(),

        // multiday-only
        itinerary: z.array(itineraryDay).optional(),
        guideName: z.string().optional(),
        accommodationStyle: z.string().optional(),
        depositPolicy: z.string().optional(),
        checkfrontWidgetEnvVar: z.string().optional(),

        // gallery & SEO
        gallery: z.array(imageWithAlt).default([]),

        isSampleContent: z.boolean().default(false),
        publishDate: z.date(),
      })
      .superRefine((trip, ctx) => {
        if (trip.type === 'daytrip' && !trip.meetingPoint) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'daytrip entries require meetingPoint',
            path: ['meetingPoint'],
          });
        }
        if (trip.type === 'multiday') {
          if (!trip.itinerary || trip.itinerary.length === 0) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: 'multiday entries require a non-empty itinerary',
              path: ['itinerary'],
            });
          }
          if (!trip.guideName) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: 'multiday entries require guideName',
              path: ['guideName'],
            });
          }
          if (!trip.depositPolicy) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: 'multiday entries require depositPolicy',
              path: ['depositPolicy'],
            });
          }
        }
      }),
});

export const collections = { trips };
