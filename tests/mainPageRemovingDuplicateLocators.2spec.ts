import { test, expect, type Page, type Locator } from '@playwright/test';

/*  
  === ЭТАП 1. УБИРАЕМ ДУБЛИРОВАНИЕ ===

  1) Вынесли ВСЕ локаторы в массив функций.
     Каждая функция принимает page → возвращает Locator.
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
  2) Вынесли текстовые значения (title) в отдельный массив.
     ВАЖНО:
     - GitHub → нет текста
     - Discord → нет текста
     - Theme → нет текста
     - Search → текст нестабилен → исключаем
*/
const elementNames = [
  'Playwright', // logo
  'Docs',
  'MCP',
  'CLI',
  'API',
  'Node.js',
  null, // GitHub — нет текста
  null, // Discord — нет текста
  null, // theme button — нет текста
  null, // search button — текст нестабилен
];

/*
  3) Вынесли ожидаемые href в массив.
     Кнопки не имеют href → ставим null.
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

  // === ТЕСТ 1: Проверка видимости элементов ===
  test('Checking the display of navigation elements header', async ({ page }) => {
    for (const getLocator of elements) {
      await expect.soft(getLocator(page)).toBeVisible();
    }
  });

  // === ТЕСТ 2: Проверка текста элементов ===
  test('Checking the title of navigation elements header', async ({ page }) => {
    for (let i = 0; i < elementNames.length; i++) {
      if (elementNames[i] !== null) {
        await expect.soft(elements[i](page)).toContainText(elementNames[i]!);
      }
    }
  });

  // === ТЕСТ 3: Проверка href элементов ===
  test('Checking the href attribute of header navigation elements', async ({ page }) => {
    for (let i = 0; i < hrefs.length; i++) {
      if (hrefs[i] !== null) {
        await expect.soft(elements[i](page)).toHaveAttribute('href', hrefs[i]!);
      }
    }
  });

  // === ТЕСТ 4: Проверка переключения темы ===
  test('Theme switch updates data-theme-choice and localStorage', async ({ page }) => {
    const themeButton = elements[8](page); // кнопка темы
    const html = page.locator('html');

    const initialChoice = await html.getAttribute('data-theme-choice');

    await themeButton.click();

    const expectedChoice =
      initialChoice === 'light' ? 'dark' : initialChoice === 'dark' ? 'light' : 'light'; // system → light

    await expect.soft(html).toHaveAttribute('data-theme-choice', expectedChoice);

    const storedTheme = await page.evaluate(() => localStorage.getItem('theme'));
    expect(storedTheme).toBe(expectedChoice);
  });

  // === ТЕСТ 5: Проверка заголовка страницы ===
  test('Checking the page title', async ({ page }) => {
    const heading = page.getByRole('heading', { name: 'Playwright enables reliable' });

    await expect.soft(heading).toBeVisible();
    await expect
      .soft(heading)
      .toContainText(
        'Playwright enables reliable web automation for testing, scripting, and AI agents.',
      );
  });

  // === ТЕСТ 6: Проверка кнопки Get Started ===
  test('Testing the Get Started button', async ({ page }) => {
    const btn = page.getByRole('link', { name: 'Get started' });

    await expect.soft(btn).toBeVisible();
    await expect.soft(page.getByRole('banner')).toContainText('Get started');
    await expect.soft(btn).toHaveAttribute('href', '/docs/intro');
  });
});
