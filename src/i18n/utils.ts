import { ui, defaultLocale, type Locale, type TranslationKey } from './ui';

export function getLangFromUrl(url: URL): Locale {
  const [, lang] = url.pathname.split('/');
  if (lang === 'en' || lang === 'es') return lang;
  return defaultLocale;
}

export function useTranslations(locale: Locale) {
  return function t(key: TranslationKey): string {
    return ui[locale][key] ?? ui[defaultLocale][key] ?? key;
  };
}

// Swaps the locale segment of a pathname, keeping the rest of the path —
// this is what lets the language switcher preserve the current page.
export function useTranslatedPath(locale: Locale) {
  return function translatePath(path: string, targetLocale: Locale = locale): string {
    const segments = path.split('/').filter(Boolean);
    if (segments[0] === 'en' || segments[0] === 'es') {
      segments[0] = targetLocale;
    } else {
      segments.unshift(targetLocale);
    }
    return '/' + segments.join('/') + (path.endsWith('/') && segments.length ? '/' : '');
  };
}
