import { existsSync } from 'node:fs';
import { defineConfig, devices } from '@playwright/test';

// Some sandboxed dev environments pre-fetch a Chromium build and disable
// Playwright's own download step; point at it when present, otherwise let
// Playwright use whatever it installed itself (the normal CI path).
const sandboxChromiumPath = '/opt/pw-browsers/chromium';
const executablePath = existsSync(sandboxChromiumPath) ? sandboxChromiumPath : undefined;

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: process.env.CI ? 'github' : 'list',
  use: {
    baseURL: 'http://localhost:4321',
    trace: 'on-first-retry',
  },
  webServer: {
    command: 'npm run preview -- --port 4321',
    url: 'http://localhost:4321/en/',
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        ...(executablePath ? { launchOptions: { executablePath } } : {}),
      },
    },
  ],
});
