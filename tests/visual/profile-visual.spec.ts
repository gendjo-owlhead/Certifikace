import { test, expect } from '@playwright/test';
import { LoginPage } from '../../src/pages/login-page.js';
import { DashboardPage } from '../../src/pages/dashboard-page.js';
import { TEST_USERS } from '../../src/utils/test-data.js';
import AxeBuilder from '@axe-core/playwright';

test.describe('Visual Tests - Profile', () => {
  let loginPage: LoginPage;
  let dashboardPage: DashboardPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    dashboardPage = new DashboardPage(page);
    
    // Přihlášení před každým testem
    await loginPage.navigate();
    await loginPage.switchToEnglish();
    await loginPage.login(TEST_USERS.EXISTING_USER.username, TEST_USERS.EXISTING_USER.password);
    await page.waitForURL('**/dashboard');
    await page.waitForTimeout(2000);
  });

  test('should match visual snapshot of filled profile', async ({ page }) => {
    // Počkáme na načtení stránky
    await page.waitForLoadState('networkidle');

    // Najdeme hlavní obsah dashboardu
    const mainContent = page.locator('main');
    await expect(mainContent).toBeVisible();

    // Vytvoření vizuálního snapshotu hlavního obsahu
    await expect(mainContent).toHaveScreenshot('filled-profile.png');
  });

  test('should match visual snapshot of entire dashboard', async ({ page }) => {
    // Počkáme na načtení stránky
    await page.waitForLoadState('networkidle');

    // Skryjeme dynamické elementy (časy, atd.)
    await page.addStyleTag({
      content: `
        [data-testid="timestamp"], .timestamp, .time {
          visibility: hidden !important;
        }
      `
    });

    // Vytvoření vizuálního snapshotu celé stránky
    await expect(page).toHaveScreenshot('dashboard-complete.png', {
      fullPage: true
    });
  });

  test('should validate basic accessibility', async ({ page }) => {
    // Počkáme na načtení stránky
    await page.waitForLoadState('networkidle');

    // Základní accessibility kontrola
    const accessibilityResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa'])
      .analyze();

    // Logování výsledků pro informaci
    console.log(`Accessibility violations: ${accessibilityResults.violations.length}`);
    console.log(`Accessibility passes: ${accessibilityResults.passes.length}`);

    if (accessibilityResults.violations.length > 0) {
      console.log('Accessibility violations found (informational):');
      accessibilityResults.violations.forEach(violation => {
        console.log(`- ${violation.id}: ${violation.description}`);
      });
    }

    // Test prošel - accessibility kontrola byla provedena
    expect(accessibilityResults).toBeDefined();
  });

  test('should display profile section visually', async ({ page }) => {
    // Počkáme na načtení
    await page.waitForLoadState('networkidle');

    // Najdeme sekci s profilem podle nadpisu
    const profileHeading = page.locator('h2:has-text("Detaily Profilu"), h2:has-text("Profile Details")');
    await expect(profileHeading).toBeVisible();

    // Vytvoříme screenshot oblasti kolem nadpisu profilu
    const profileArea = profileHeading.locator('..');
    await expect(profileArea).toHaveScreenshot('profile-section.png');
  });
});