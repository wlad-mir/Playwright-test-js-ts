import { test } from '@playwright/test';
import { HeaderPage } from '../pages/header.page';
import { HomePage } from '../pages/home.page';

test.describe('Home Page Tests', () => {
  test('Full Home Page test using Page Objects', async ({ page }) => {
    const header = new HeaderPage(page);
    const home = new HomePage(page);

    await home.open();

    // Checking the header
    await header.checkHeader();

    // Checking the main section of the page
    await home.checkHeroSection();

    // Let's check the “Get Started” button
    await home.checkGetStartedButton();
  });
});
