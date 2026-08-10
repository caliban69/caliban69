import type { CollectionEntry } from 'astro:content';

export function tripToJsonLd(trip: CollectionEntry<'trips'>, url: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'TouristTrip',
    name: trip.data.title,
    description: trip.data.summary,
    url,
    image: trip.data.heroImage.src,
    touristType: 'Nature and wildlife tourists',
    offers: {
      '@type': 'Offer',
      price: trip.data.price,
      priceCurrency: trip.data.currency,
      availability: 'https://schema.org/InStock',
    },
    provider: {
      '@type': 'Organization',
      name: 'Cartacuba Tours & Travels',
    },
  };
}
