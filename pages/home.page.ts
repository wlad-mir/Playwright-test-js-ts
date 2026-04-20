import { type Page, expect } from '@playwright/test';

export class HomePage {
  constructor(private page: Page) {}

  // Go to the home page
  async open() {
    await this.page.goto('https://playwright.dev/');
  }

  // Main heading locator
  get mainHeading() {
    return this.page.getByRole('heading', { name: 'Playwright enables reliable' });
  }

  // Checking the main heading
  async checkHeroSection() {
    await expect.soft(this.mainHeading).toBeVisible();
    await expect
      .soft(this.mainHeading)
      .toContainText(
        'Playwright enables reliable web automation for testing, scripting, and AI agents.',
      );
  }

  // Locator Get Started button
  get getStartedButton() {
    return this.page.getByRole('link', { name: 'Get started' });
  }

  // Testing the “Get Started” button
  async checkGetStartedButton() {
    await expect.soft(this.getStartedButton).toBeVisible();
    await expect.soft(this.page.getByRole('banner')).toContainText('Get started');
    await expect.soft(this.getStartedButton).toHaveAttribute('href', '/docs/intro');
  }

  // Click the Get Started button
  async clickGetStarted() {
    await this.getStartedButton.click();
  }
}
