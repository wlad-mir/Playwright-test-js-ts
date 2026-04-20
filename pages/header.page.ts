import { type Page, expect } from '@playwright/test';
import { headerElements, headerElementNames, headerHrefs } from '../locators/header.locators';

export class HeaderPage {
  constructor(private page: Page) {}

  // Checking the visibility of all elements
  private async expectAllVisible() {
    for (const getLocator of headerElements) {
      await expect.soft(getLocator(this.page)).toBeVisible();
    }
  }

  // Checking element texts
  private async expectTitles() {
    for (let i = 0; i < headerElementNames.length; i++) {
      if (headerElementNames[i] !== null) {
        await expect.soft(headerElements[i](this.page)).toContainText(headerElementNames[i]!);
      }
    }
  }

  // Check href
  private async expectHrefs() {
    for (let i = 0; i < headerHrefs.length; i++) {
      if (headerHrefs[i] !== null) {
        await expect.soft(headerElements[i](this.page)).toHaveAttribute('href', headerHrefs[i]!);
      }
    }
  }

  // Checking the theme switch
  private async expectThemeToggle() {
    const themeButton = headerElements[8](this.page);
    const html = this.page.locator('html');

    const initialChoice = await html.getAttribute('data-theme-choice');
    await themeButton.click();

    const expectedChoice =
      initialChoice === 'light' ? 'dark' : initialChoice === 'dark' ? 'light' : 'light';

    await expect.soft(html).toHaveAttribute('data-theme-choice', expectedChoice);

    const storedTheme = await this.page.evaluate(() => localStorage.getItem('theme'));
    expect(storedTheme).toBe(expectedChoice);
  }

  // === A SINGLE METHOD FOR CHECKING THE ENTIRE HEADER ===
  async checkHeader() {
    await this.expectAllVisible();
    await this.expectTitles();
    await this.expectHrefs();
    await this.expectThemeToggle();
  }
}
