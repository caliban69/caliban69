// Lighthouse CI budget gate (§6). Runs against `astro preview` (the real
// Cloudflare-adapter build), simulating a mobile / Slow-4G-like connection.
//
// NOTE: the `budget.json` script-size budget currently has no third-party
// scripts to exclude (Turnstile is unconfigured pre-launch and
// Stripe/Checkfront aren't integrated yet — see §2/§9), so it is
// effectively a first-party-only budget for now. Revisit the exclusion
// once a Phase 2 vendor script is actually loading.
module.exports = {
  ci: {
    collect: {
      startServerCommand: 'npm run preview -- --port 4322',
      startServerReadyPattern: 'Local',
      url: [
        'http://localhost:4322/en/',
        'http://localhost:4322/en/trips/',
        'http://localhost:4322/en/trips/fine-arts-museum-private-studio-visit/',
        'http://localhost:4322/en/trips/jazz-fac-guarida-night/',
      ],
      numberOfRuns: 2,
      settings: {
        // No `preset` override: Lighthouse's default mobile emulation +
        // simulated throttling approximates the "Slow 4G" budget target.
        throttlingMethod: 'simulate',
        budgetPath: './budget.json',
        // Needed for headless Chrome running as root in CI containers.
        chromeFlags: ['--no-sandbox'],
      },
    },
    assert: {
      assertions: {
        'categories:performance': ['error', { minScore: 0.9 }],
        'categories:accessibility': ['error', { minScore: 0.95 }],
        'largest-contentful-paint': ['error', { maxNumericValue: 2500 }],
      },
    },
    upload: {
      // Reports are kept locally (`.lighthouseci/`) and picked up by CI as
      // a build artifact — no dependency on an external report host for
      // the budget gate to pass/fail correctly.
      target: 'filesystem',
      outputDir: './.lighthouseci',
    },
  },
};
