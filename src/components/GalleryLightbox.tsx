import { useEffect, useState } from 'preact/hooks';
import { ui, type Locale } from '../i18n/ui';

interface GalleryImage {
  src: string;
  alt: string;
}

interface Props {
  images: GalleryImage[];
  locale: Locale;
}

export default function GalleryLightbox({ images, locale }: Props) {
  const t = (key: keyof (typeof ui)['en']) => ui[locale][key] ?? ui.en[key];
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useEffect(() => {
    if (activeIndex === null) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') setActiveIndex(null);
      if (event.key === 'ArrowRight') setActiveIndex((i) => (i === null ? i : (i + 1) % images.length));
      if (event.key === 'ArrowLeft')
        setActiveIndex((i) => (i === null ? i : (i - 1 + images.length) % images.length));
    }
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [activeIndex, images.length]);

  return (
    <>
      <div class="grid grid-cols-2 gap-4 sm:grid-cols-3">
        {images.map((image, index) => (
          <button
            key={image.src}
            type="button"
            onClick={() => setActiveIndex(index)}
            class="group aspect-square overflow-hidden rounded-lg border border-ink-700 bg-ink-900"
          >
            <img
              src={image.src}
              alt={image.alt}
              loading="lazy"
              decoding="async"
              class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </button>
        ))}
      </div>

      {activeIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={images[activeIndex].alt}
          class="fixed inset-0 z-50 flex items-center justify-center bg-ink-950/95 p-4"
        >
          <button
            type="button"
            onClick={() => setActiveIndex(null)}
            class="absolute right-4 top-4 rounded border border-ink-600 px-3 py-2 text-sm text-paper-100 hover:border-sand-300"
          >
            {t('gallery.lightbox.close')}
          </button>

          <button
            type="button"
            onClick={() => setActiveIndex((activeIndex - 1 + images.length) % images.length)}
            aria-label={t('gallery.lightbox.prev')}
            class="absolute left-4 top-1/2 -translate-y-1/2 rounded border border-ink-600 px-3 py-2 text-paper-100 hover:border-sand-300"
          >
            ←
          </button>

          <figure class="max-h-full max-w-3xl">
            <img
              src={images[activeIndex].src}
              alt={images[activeIndex].alt}
              class="max-h-[70vh] w-full rounded object-contain"
            />
            <figcaption class="mt-3 text-center text-sm text-stone-400">
              {images[activeIndex].alt} — {activeIndex + 1} {t('gallery.lightbox.of')} {images.length}
            </figcaption>
          </figure>

          <button
            type="button"
            onClick={() => setActiveIndex((activeIndex + 1) % images.length)}
            aria-label={t('gallery.lightbox.next')}
            class="absolute right-4 top-1/2 -translate-y-1/2 rounded border border-ink-600 px-3 py-2 text-paper-100 hover:border-sand-300"
          >
            →
          </button>
        </div>
      )}
    </>
  );
}
