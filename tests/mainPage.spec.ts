import { test, expect } from '@playwright/test';
import { HeaderPage } from '../pages/header.page';

test.describe('Home Page Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://playwright.dev/');
  });

  test('Header tests using unified method', async ({ page }) => {
    const header = new HeaderPage(page);
    await header.checkHeader();
  });

  test('Checking the page title', async ({ page }) => {
    const heading = page.getByRole('heading', { name: 'Playwright enables reliable' });

    await expect.soft(heading).toBeVisible();
    await expect
      .soft(heading)
      .toContainText(
        'Playwright enables reliable web automation for testing, scripting, and AI agents.',
      );
  });

  test('Testing the Get Started button', async ({ page }) => {
    const btn = page.getByRole('link', { name: 'Get started' });

    await expect.soft(btn).toBeVisible();
    await expect.soft(page.getByRole('banner')).toContainText('Get started');
    await expect.soft(btn).toHaveAttribute('href', '/docs/intro');
  });
});
