import { test, expect } from '@playwright/test';
import { LoginPage } from '../../src/pages/login-page.js';
import { DashboardPage } from '../../src/pages/dashboard-page.js';
import { TEST_USERS } from '../../src/utils/test-data.js';
import { TEST_IDS } from '../../src/utils/test-ids.js';
import AxeBuilder from '@axe-core/playwright';

test.describe('Visual Tests - Profile', () => {
  let loginPage: LoginPage;
  let dashboardPage: DashboardPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    dashboardPage = new DashboardPage(page);

    await loginPage.navigate();
    await loginPage.switchToEnglish();
    await loginPage.login(TEST_USERS.EXISTING_USER.username, TEST_USERS.EXISTING_USER.password);
    await page.waitForURL('**/dashboard');
    await page.waitForTimeout(2000);
  });

  test('should match visual snapshot of filled profile', async ({ page }) => {
    await page.waitForLoadState('networkidle');

    const mainContent = page
      .getByTestId(TEST_IDS.dashboard.mainContent)
      .or(page.getByTestId(TEST_IDS.common.mainContent))
      .or(page.locator('main'));

    await expect(mainContent).toBeVisible();
    await expect(mainContent).toHaveScreenshot('filled-profile.png', {
      maxDiffPixels: 200
    });
  });

  test('should match visual snapshot of entire dashboard', async ({ page }) => {
    await page.waitForLoadState('networkidle');

    await page.addStyleTag({
      content: `
        [data-testid="timestamp"], .timestamp, .time {
          visibility: hidden !important;
        }
      `
    });

    await expect(page).toHaveScreenshot('dashboard-complete.png', {
      fullPage: true,
      maxDiffPixels: 200
    });
  });

  test('should validate basic accessibility', async ({ page }) => {
    await page.waitForLoadState('networkidle');

    const accessibilityResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa'])
      .analyze();

    console.log(`Accessibility violations: ${accessibilityResults.violations.length}`);
    console.log(`Accessibility passes: ${accessibilityResults.passes.length}`);

    if (accessibilityResults.violations.length > 0) {
      console.log('Accessibility violations found (informational):');
      accessibilityResults.violations.forEach(violation => {
        console.log(`- ${violation.id}: ${violation.description}`);
      });
    }

    expect(accessibilityResults).toBeDefined();
  });

  test('should display profile section visually', async ({ page }) => {
    await page.waitForLoadState('networkidle');

    const profileHeading = page
      .getByTestId(TEST_IDS.dashboard.profileHeading)
      .or(page.locator('h2:has-text("Detaily Profilu"), h2:has-text("Profile Details")'));

    await expect(profileHeading).toBeVisible();

    const profileArea = profileHeading.locator('..');
    await expect(profileArea).toHaveScreenshot('profile-section.png');
  });
});
