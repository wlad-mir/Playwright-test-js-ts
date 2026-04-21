import { type Page, type Locator } from '@playwright/test';

// Header locators
export const headerElements: Array<(page: Page) => Locator> = [
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

// Element text (only those with text)
export const headerElementNames = [
  'Playwright',
  'Docs',
  'MCP',
  'CLI',
  'API',
  'Node.js',
  null, // GitHub — no text
  null, // Discord — no text
  null, // theme button — no text
  null, // search button — The text is unstable
];

// href elements
export const headerHrefs = [
  '/',
  '/docs/intro',
  '/mcp/introduction',
  '/agent-cli/introduction',
  '/docs/api/class-playwright',
  null,
  'https://github.com/microsoft/playwright',
  'https://aka.ms/playwright/discord',
  null,
  null,
];
