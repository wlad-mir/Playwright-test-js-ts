import { test, expect } from '@playwright/test';

test.describe('Home Page Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://playwright.dev/');
  });
  test('Checking the display of navigation elements heder', async ({ page }) => {
    await expect.soft(page.getByRole('link', { name: 'Playwright logo Playwright' })).toBeVisible();
    await expect.soft(page.getByRole('link', { name: 'Docs' })).toBeVisible();
    await expect.soft(page.getByRole('link', { name: 'MCP', exact: true })).toBeVisible();
    await expect.soft(page.getByRole('link', { name: 'CLI', exact: true })).toBeVisible();
    await expect.soft(page.getByRole('link', { name: 'API' })).toBeVisible();
    await expect.soft(page.getByRole('button', { name: 'Node.js' })).toBeVisible();
    await expect.soft(page.getByRole('link', { name: 'GitHub repository' })).toBeVisible();
    await expect.soft(page.getByRole('link', { name: 'Discord server' })).toBeVisible();
    await expect
      .soft(page.getByRole('button', { name: 'Switch between dark and light' }))
      .toBeVisible();
    await expect.soft(page.getByRole('button', { name: 'Search (Ctrl+K)' })).toBeVisible();
  });

  test('Checking the title of navigation elements heder', async ({ page }) => {
    await expect
      .soft(page.getByRole('link', { name: 'Playwright logo Playwright' }))
      .toContainText('Playwright');
    await expect.soft(page.getByRole('link', { name: 'Docs' })).toContainText('Docs');
    await expect.soft(page.getByRole('link', { name: 'MCP', exact: true })).toContainText('MCP');
    await expect.soft(page.getByRole('link', { name: 'CLI', exact: true })).toContainText('CLI');
    await expect.soft(page.getByRole('link', { name: 'API' })).toContainText('API');
    await expect.soft(page.getByRole('button', { name: 'Node.js' })).toContainText('Node.js');
  });

  test('Checking the href attribute of hedera navigation elements', async ({ page }) => {
    await expect
      .soft(page.getByRole('link', { name: 'Playwright logo Playwright' }))
      .toHaveAttribute('href', '/');
    await expect
      .soft(page.getByRole('link', { name: 'Docs' }))
      .toHaveAttribute('href', '/docs/intro');
    await expect
      .soft(page.getByRole('link', { name: 'MCP', exact: true }))
      .toHaveAttribute('href', '/mcp/introduction');
    await expect
      .soft(page.getByRole('link', { name: 'CLI', exact: true }))
      .toHaveAttribute('href', '/agent-cli/introduction');
    await expect
      .soft(page.getByRole('link', { name: 'API' }))
      .toHaveAttribute('href', '/docs/api/class-playwright');
    await expect
      .soft(page.getByRole('link', { name: 'GitHub repository' }))
      .toHaveAttribute('href', 'https://github.com/microsoft/playwright');
    await expect
      .soft(page.getByRole('link', { name: 'Discord server' }))
      .toHaveAttribute('href', 'https://aka.ms/playwright/discord');
  });

  test('Theme switch updates data-theme-choice and localStorage', async ({ page }) => {
    const themeButton = page.getByRole('button', { name: 'Switch between dark and light' });
    const html = page.locator('html');

    // Read the initial value of the topic selection.
    const initialChoice = await html.getAttribute('data-theme-choice');

    // Click
    await themeButton.click();

    // Calculate the expected value
    const expectedChoice =
      initialChoice === 'light' ? 'dark' : initialChoice === 'dark' ? 'light' : 'light'; // system → light

    /* let expectedChoice;

    if (initialChoice === 'light') {
      expectedChoice = 'dark';
    } else if (initialChoice === 'dark') {
      expectedChoice = 'light';
    } else {
      expectedChoice = 'light'; // system → light
    }
  */

    //  Checking data-theme-choice
    await expect.soft(html).toHaveAttribute('data-theme-choice', expectedChoice);

    //  Checking localStorage
    const storedTheme = await page.evaluate(() => localStorage.getItem('theme'));
    expect(storedTheme).toBe(expectedChoice);
  });

  test('Checking the page title', async ({ page }) => {
    await expect
      .soft(page.getByRole('heading', { name: 'Playwright enables reliable' }))
      .toBeVisible();
    await expect
      .soft(page.getByRole('heading', { name: 'Playwright enables reliable' }))
      .toContainText(
        'Playwright enables reliable web automation for testing, scripting, and AI agents.',
      );
  });

  test('Testing the Get Started button', async ({ page }) => {
    await expect.soft(page.getByRole('link', { name: 'Get started' })).toBeVisible();
    await expect.soft(page.getByRole('banner')).toContainText('Get started');
    await expect
      .soft(page.getByRole('link', { name: 'Get started' }))
      .toHaveAttribute('href', '/docs/intro');
  });
});
