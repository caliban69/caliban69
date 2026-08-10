import { test, expect } from '@playwright/test';

test.describe('homepage', () => {
  test('loads and shows the brand + hero CTA', async ({ page }) => {
    await page.goto('/en/');
    await expect(page).toHaveTitle(/Cartacuba Nature & Arts/);
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Cartacuba Nature & Arts');
    await expect(page.getByRole('link', { name: 'Explore experiences' })).toBeVisible();
  });

  test('root redirects to the default locale', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveURL(/\/en\/$/);
  });
});

test.describe('navigation', () => {
  test('primary nav links reach every top-level section', async ({ page }) => {
    await page.goto('/en/');
    await page.getByRole('link', { name: 'Experiences' }).first().click();
    await expect(page).toHaveURL(/\/en\/trips\/$/);

    await page.getByRole('link', { name: 'Gallery' }).first().click();
    await expect(page).toHaveURL(/\/en\/gallery\/$/);

    await page.getByRole('link', { name: 'About' }).first().click();
    await expect(page).toHaveURL(/\/en\/about\/$/);

    await page.getByRole('link', { name: 'Contact' }).first().click();
    await expect(page).toHaveURL(/\/en\/contact\/$/);
  });

  test('language switcher preserves the current page', async ({ page }) => {
    await page.goto('/en/trips/');
    await page.getByRole('link', { name: 'Español' }).click();
    await expect(page).toHaveURL(/\/es\/trips\/$/);
  });
});

test.describe('experience pages', () => {
  test('fine arts museum & private studio visit page renders with a Reserve CTA', async ({ page }) => {
    await page.goto('/en/trips/fine-arts-museum-private-studio-visit/');
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Havana Fine Arts Day');
    await expect(page.getByRole('button', { name: 'Reserve this experience' })).toBeVisible();
  });

  test('jazz, FAC & La Guarida page renders with a Reserve CTA', async ({ page }) => {
    await page.goto('/en/trips/jazz-fac-guarida-night/');
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Havana After Dark');
    await expect(page.getByRole('button', { name: 'Reserve this experience' })).toBeVisible();
  });
});

test.describe('contact form', () => {
  test('client-side validation blocks an empty submission', async ({ page }) => {
    await page.goto('/en/contact/');
    const messageField = page.getByLabel('Message');
    await expect(messageField).toHaveAttribute('required', '');
  });

  test('submits successfully against a mocked API response', async ({ page }) => {
    await page.route('**/api/contact', async (route) => {
      await route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ ok: true }) });
    });

    await page.goto('/en/contact/');
    await page.getByLabel('Name').fill('Test Traveler');
    await page.getByLabel('Email').fill('traveler@example.com');
    await page.getByLabel('Message').fill('Just testing the contact form end to end.');
    await page.getByRole('button', { name: 'Send message' }).click();

    await expect(page.getByRole('status')).toContainText('Thanks — we’ll reply by email shortly.');
  });
});
