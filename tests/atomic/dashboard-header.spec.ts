import { test, expect, type Page } from '@playwright/test';
import { LoginPage } from '../../src/pages/login-page.js';
import { DashboardPage } from '../../src/pages/dashboard-page.js';
import { TEST_USERS } from '../../src/utils/test-data.js';
import { TEST_IDS } from '../../src/utils/test-ids.js';

const headerLocator = (page: Page) =>
  page
    .getByTestId(TEST_IDS.dashboard.header)
    .or(page.getByTestId(TEST_IDS.common.header))
    .or(page.locator('header, [role="banner"], [data-testid="header"], .header'));

test.describe('Atomic Tests - Dashboard Header', () => {
  let loginPage: LoginPage;
  let dashboardPage: DashboardPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    dashboardPage = new DashboardPage(page);

    await loginPage.navigate();
    await loginPage.switchToEnglish();
    await loginPage.login(TEST_USERS.EXISTING_USER.username, TEST_USERS.EXISTING_USER.password);
    await dashboardPage.waitForDashboardLoad();
  });

  test('should display header elements', async ({ page }) => {
    await expect(headerLocator(page).first()).toBeVisible();
  });

  test('should display logo in header', async ({ page }) => {
    const logo = page
      .getByTestId(TEST_IDS.common.logo)
      .or(headerLocator(page).locator('img[alt*="logo" i]'))
      .or(headerLocator(page).getByText('TEG', { exact: false }));

    await expect(logo.first()).toBeVisible();
  });

  test('should display application title', async ({ page }) => {
    const title = page
      .getByTestId(TEST_IDS.common.appTitle)
      .or(headerLocator(page).locator('text=TEG#B'));

    await expect(title.first()).toBeVisible();
  });

  test('should display logout button', async ({ page }) => {
    const logoutButton = page
      .getByTestId(TEST_IDS.dashboard.logoutButton)
      .or(page.getByRole('button', { name: 'Odhlásit' }))
      .or(page.getByRole('button', { name: 'Logout' }))
      .or(page.locator('[data-testid="logout"]'));

    await expect(logoutButton.first()).toBeVisible();
  });

  test('should logout when logout button is clicked', async ({ page }) => {
    const logoutButton = page
      .getByTestId(TEST_IDS.dashboard.logoutButton)
      .or(page.getByRole('button', { name: 'Odhlásit se' }))
      .or(page.getByRole('button', { name: 'Logout' }))
      .or(page.locator('[data-testid="logout"]'));

    await logoutButton.first().click();
    await page.waitForURL('**/');

    expect(await loginPage.isLoginFormVisible()).toBe(true);
  });

  test('should display header navigation elements', async ({ page }) => {
    const header = headerLocator(page);
    await expect(header).toBeVisible();

    const headerContent = header.locator('*');
    const contentCount = await headerContent.count();
    expect(contentCount).toBeGreaterThan(0);
  });
});
