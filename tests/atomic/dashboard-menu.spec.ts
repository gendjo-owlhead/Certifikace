import { test, expect, type Page } from '@playwright/test';
import { LoginPage } from '../../src/pages/login-page.js';
import { DashboardPage } from '../../src/pages/dashboard-page.js';
import { TEST_USERS } from '../../src/utils/test-data.js';
import { TEST_IDS } from '../../src/utils/test-ids.js';

const navigationLocator = (page: Page) =>
  page
    .getByTestId(TEST_IDS.dashboard.nav)
    .or(page.locator('.sidebar, nav, aside, [class*="menu"], [class*="navigation"]'))
    .first();

const navItem = (page: Page, testId: string, fallbackTexts: string[]) => {
  let locator = page.getByTestId(testId);
  fallbackTexts.forEach((text) => {
    locator = locator.or(page.locator(`li:has-text("${text}")`)).or(page.getByRole('link', { name: text }));
  });
  return locator;
};

test.describe('Atomic Tests - Dashboard Left Menu', () => {
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

  test('should display left navigation menu', async ({ page }) => {
    await expect(navigationLocator(page)).toBeVisible();
  });

  test('should display Home menu item', async ({ page }) => {
    const homeItem = navItem(page, TEST_IDS.navigation.home, ['Domů', 'Home']);
    await expect(homeItem).toBeVisible();
  });

  test('should display Accounts menu item', async ({ page }) => {
    const accountsItem = navItem(page, TEST_IDS.navigation.accounts, ['Účty', 'Accounts']);
    await expect(accountsItem).toBeVisible();
  });

  test('should display Transactions menu item', async ({ page }) => {
    const transactionsItem = navItem(page, TEST_IDS.navigation.transactions, ['Transakce', 'Transactions']);
    await expect(transactionsItem).toBeVisible();
  });

  test('should display Support menu item', async ({ page }) => {
    const supportItem = navItem(page, TEST_IDS.navigation.support, ['Podpora', 'Support']);
    await expect(supportItem).toBeVisible();
  });

  test('should have clickable menu items', async ({ page }) => {
    const accountsItem = navItem(page, TEST_IDS.navigation.accounts, ['Účty', 'Accounts']);
    await accountsItem.first().click();
    await page.waitForTimeout(1000);
  });

  test('should display menu items in list', async ({ page }) => {
    const menuItems = navigationLocator(page).locator('li');
    const menuCount = await menuItems.count();
    expect(menuCount).toBeGreaterThan(0);
  });

  test('should display TEG#B logo in menu area', async ({ page }) => {
    const logo = page
      .getByTestId(TEST_IDS.common.logo)
      .or(navigationLocator(page).locator('img[alt*="teg" i], img[alt*="logo" i]'))
      .or(navigationLocator(page).getByText('TEG', { exact: false }));

    await expect(logo.first()).toBeVisible();
  });

  test('should display dashboard header with logout button', async ({ page }) => {
    const header = page
      .getByTestId(TEST_IDS.dashboard.header)
      .or(page.getByTestId(TEST_IDS.common.header))
      .or(page.locator('header, [role="banner"]'));

    await expect(header).toBeVisible();

    const logoutButton = page
      .getByTestId(TEST_IDS.dashboard.logoutButton)
      .or(page.getByRole('button', { name: 'Odhlásit se' }))
      .or(page.getByRole('button', { name: 'Logout' }));

    await expect(logoutButton).toBeVisible();
  });

  test('should display main content area', async ({ page }) => {
    const mainContent = page
      .getByTestId(TEST_IDS.dashboard.mainContent)
      .or(page.getByTestId(TEST_IDS.common.mainContent))
      .or(page.locator('main'));

    await expect(mainContent).toBeVisible();
  });

  test('should have functional logout button', async ({ page }) => {
    const logoutButton = page
      .getByTestId(TEST_IDS.dashboard.logoutButton)
      .or(page.getByRole('button', { name: 'Odhlásit se' }))
      .or(page.getByRole('button', { name: 'Logout' }));

    await logoutButton.click();
    await page.waitForTimeout(2000);

    const currentUrl = page.url();
    const isLoggedOut = !currentUrl.includes('/dashboard');
    expect(isLoggedOut).toBe(true);
  });
});
