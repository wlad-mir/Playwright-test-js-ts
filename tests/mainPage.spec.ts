import { test, expect, type Page, type Locator } from '@playwright/test';

/*  
  === STEP 1. REMOVE DUPLICATES ===

  1) We've moved ALL locators into an array of functions.
     Each function takes a page -> and returns a Locator.
*/
const elements: Array<(page: Page) => Locator> = [
  (page) => page.getByRole('link', { name: 'Playwright logo Playwright' }),
  (page) => page.getByRole('link', { name: 'Docs' }),
  (page) => page.getByRole('link', { name: 'MCP', exact: true }),
  (page) => page.getByRole('link', { name: 'CLI', exact: true }),
  (page) => page.getByRole('link', { name: 'API' }),
  (page) => page.getByRole('button', { name: 'Node.js' }),
  (page) => page.getByRole('link', { name: 'GitHub repository' }),
  (page) => page.getByRole('link', { name: 'Discord server' }),
  (page) => page.getByRole('button', { name: 'Switch between dark and light' }),
  (page) => page.getByRole('button', { name: 'Search (Ctrl+K)' }),
];

/*
  2) We moved the text values (title) into a separate array.
     IMPORTANT:
     - GitHub → no text
     - Discord → no text
     - Theme → no text
     - Search → text is inconsistent → excluded
*/
const elementNames = [
  'Playwright', // logo
  'Docs',
  'MCP',
  'CLI',
  'API',
  'Node.js',
  null, // GitHub — no text
  null, // Discord — no text
  null, // theme button — no text
  null, // search button — text is inconsistent
];

/*
  3) We've added the expected href values to an array.
     Buttons without an href → set them to null.
*/
const hrefs = [
  '/', // logo
  '/docs/intro',
  '/mcp/introduction',
  '/agent-cli/introduction',
  '/docs/api/class-playwright',
  null, // Node.js button
  'https://github.com/microsoft/playwright',
  'https://aka.ms/playwright/discord',
  null, // theme button
  null, // search button
];

test.describe('Home Page Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://playwright.dev/');
  });

  // === TEST 1: Checking the visibility of elements ===
  test('Checking the display of navigation elements header', async ({ page }) => {
    for (const getLocator of elements) {
      await expect.soft(getLocator(page)).toBeVisible();
    }
  });

  // === TEST 2: Checking the text of elements ===
  test('Checking the title of navigation elements header', async ({ page }) => {
    for (let i = 0; i < elementNames.length; i++) {
      if (elementNames[i] !== null) {
        await expect.soft(elements[i](page)).toContainText(elementNames[i]!);
      }
    }
  });

  // === TEST 3: Checking href elements ===
  test('Checking the href attribute of header navigation elements', async ({ page }) => {
    for (let i = 0; i < hrefs.length; i++) {
      if (hrefs[i] !== null) {
        await expect.soft(elements[i](page)).toHaveAttribute('href', hrefs[i]!);
      }
    }
  });

  // === TEST 4: Checking topic switching ===
  test('Theme switch updates data-theme-choice and localStorage', async ({ page }) => {
    const themeButton = elements[8](page); // themes button
    const html = page.locator('html');

    const initialChoice = await html.getAttribute('data-theme-choice');

    await themeButton.click();

    const expectedChoice =
      initialChoice === 'light' ? 'dark' : initialChoice === 'dark' ? 'light' : 'light'; // system → light

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
