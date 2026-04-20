import { test, expect } from '@playwright/test';
import { headerElements, headerElementNames, headerHrefs } from '../locators/header.locators';

test.describe('Home Page Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://playwright.dev/');
  });

  // === TEST 1: Checking the visibility of elements ===
  test('Checking the display of navigation elements header', async ({ page }) => {
    for (const getLocator of headerElements) {
      await expect.soft(getLocator(page)).toBeVisible();
    }
  });

  // === TEST 2: Checking the text of elements ===
  test('Checking the title of navigation elements header', async ({ page }) => {
    for (let i = 0; i < headerElementNames.length; i++) {
      if (headerElementNames[i] !== null) {
        await expect.soft(headerElements[i](page)).toContainText(headerElementNames[i]!);
      }
    }
  });

  // === TEST 3: Checking href elements ===
  test('Checking the href attribute of header navigation elements', async ({ page }) => {
    for (let i = 0; i < headerHrefs.length; i++) {
      if (headerHrefs[i] !== null) {
        await expect.soft(headerElements[i](page)).toHaveAttribute('href', headerHrefs[i]!);
      }
    }
  });

  // === TEST 4: Checking topic switching ===
  test('Theme switch updates data-theme-choice and localStorage', async ({ page }) => {
    const themeButton = headerElements[8](page);
    const html = page.locator('html');

    const initialChoice = await html.getAttribute('data-theme-choice');
    await themeButton.click();

    const expectedChoice =
      initialChoice === 'light' ? 'dark' : initialChoice === 'dark' ? 'light' : 'light';

    await expect.soft(html).toHaveAttribute('data-theme-choice', expectedChoice);

    const storedTheme = await page.evaluate(() => localStorage.getItem('theme'));
    expect(storedTheme).toBe(expectedChoice);
  });

  // === TEST 5: Checking the page title ===
  test('Checking the page title', async ({ page }) => {
    const heading = page.getByRole('heading', { name: 'Playwright enables reliable' });

    await expect.soft(heading).toBeVisible();
    await expect
      .soft(heading)
      .toContainText(
        'Playwright enables reliable web automation for testing, scripting, and AI agents.',
      );
  });

  // === TEST 6: Testing the “Get Started” button ===
  test('Testing the Get Started button', async ({ page }) => {
    const btn = page.getByRole('link', { name: 'Get started' });

    await expect.soft(btn).toBeVisible();
    await expect.soft(page.getByRole('banner')).toContainText('Get started');
    await expect.soft(btn).toHaveAttribute('href', '/docs/intro');
  });
});
