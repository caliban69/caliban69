import { useEffect, useRef } from 'preact/hooks';

declare global {
  interface Window {
    turnstile?: {
      render: (
        container: HTMLElement,
        options: { sitekey: string; callback: (token: string) => void; theme?: 'light' | 'dark' },
      ) => string;
      reset: (widgetId?: string) => void;
    };
  }
}

const SCRIPT_SRC = 'https://challenges.cloudflare.com/turnstile/v0/api.js';
let scriptLoadPromise: Promise<void> | null = null;

function loadTurnstileScript(): Promise<void> {
  if (window.turnstile) return Promise.resolve();
  if (scriptLoadPromise) return scriptLoadPromise;
  scriptLoadPromise = new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = SCRIPT_SRC;
    script.async = true;
    script.defer = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Failed to load Turnstile'));
    document.head.appendChild(script);
  });
  return scriptLoadPromise;
}

interface Props {
  siteKey: string;
  onVerify: (token: string) => void;
}

// Bot mitigation is treated as an essential security function (not
// marketing/analytics), so it loads regardless of cookie-consent state —
// the same carve-out the brief gives the booking widget itself.
export default function TurnstileWidget({ siteKey, onVerify }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!siteKey || !containerRef.current) return;
    let cancelled = false;
    loadTurnstileScript().then(() => {
      if (cancelled || !containerRef.current || !window.turnstile) return;
      window.turnstile.render(containerRef.current, {
        sitekey: siteKey,
        theme: 'dark',
        callback: onVerify,
      });
    });
    return () => {
      cancelled = true;
    };
  }, [siteKey, onVerify]);

  if (!siteKey) {
    return (
      <p class="text-xs text-stone-500">
        Turnstile site key not configured — bot-mitigation widget skipped in this environment.
      </p>
    );
  }

  return <div ref={containerRef} />;
}
