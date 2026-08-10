// PALETTE: provisional — revisit with Fred before final brand lock
//
// Canonical source of truth is theme.css (Tailwind v4 @theme block).
// This file mirrors the handful of values needed outside CSS (email HTML,
// <meta theme-color>, JSON-LD) — keep it in lockstep with theme.css.
export const tokens = {
  color: {
    inkBase: '#0b0a08',
    paperBase: '#faf8f3',
    terracotta: '#bd5f2c',
    olive: '#666d43',
    sand: '#dcc99f',
  },
} as const;
