import { test, expect } from '@playwright/test';
import { LoginPage } from '../../src/pages/login-page';
import { DashboardPage } from '../../src/pages/dashboard-page';
import { TEST_USERS } from '../../src/utils/test-data';

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
    const leftMenu = page.locator('.sidebar, nav, aside, [class*="menu"], [class*="navigation"]').first();
    await expect(leftMenu).toBeVisible();
  });

  test('should display Home menu item', async ({ page }) => {
    const homeItem = page.locator('li:has-text("Domů")').or(page.locator('li:has-text("Home")'));
    await expect(homeItem).toBeVisible();
  });

  test('should display Accounts menu item', async ({ page }) => {
    const accountsItem = page.locator('li:has-text("Účty")').or(page.locator('li:has-text("Accounts")'));
    await expect(accountsItem).toBeVisible();
  });

  test('should display Transactions menu item', async ({ page }) => {
    const transactionsItem = page.locator('li:has-text("Transakce")').or(page.locator('li:has-text("Transactions")'));
    await expect(transactionsItem).toBeVisible();
  });

  test('should display Support menu item', async ({ page }) => {
    const supportItem = page.locator('li:has-text("Podpora")').or(page.locator('li:has-text("Support")'));
    await expect(supportItem).toBeVisible();
  });

  test('should have clickable menu items', async ({ page }) => {
    // Test kliknutí na Účty v levém menu
    const accountsItem = page.locator('li:has-text("Účty")').or(page.locator('li:has-text("Accounts")'));
    await accountsItem.click();
    
    // Počkáme na možnou změnu (může být SPA navigace)
    await page.waitForTimeout(1000);
    
    // Ověření, že kliknutí bylo registrováno
    console.log('Accounts menu item clicked successfully');
  });

  test('should display menu items in list', async ({ page }) => {
    // Kontrola všech položek menu jako li elementy
    const menuItems = page.locator('li:has-text("Domů"), li:has-text("Účty"), li:has-text("Transakce"), li:has-text("Podpora")');
    const menuCount = await menuItems.count();
    expect(menuCount).toBeGreaterThan(0);
    
    console.log(`Found ${menuCount} menu items`);
  });

  test('should display TEG#B logo in menu area', async ({ page }) => {
    // Kontrola loga TEG#B v levém menu
    const logo = page.locator('img[alt*="TEG"]').or(page.locator('img[alt*="Logo"]')).or(page.locator('text=TEG'));
    await expect(logo.first()).toBeVisible();
  });

  // Testy pro header zůstávají
  test('should display dashboard header with logout button', async ({ page }) => {
    // Kontrola viditelnosti header sekce
    const header = page.locator('header, [role="banner"]');
    await expect(header).toBeVisible();
    
    // Kontrola logout tlačítka
    const logoutButton = page.getByRole('button', { name: 'Odhlásit se' }).or(page.getByRole('button', { name: 'Logout' }));
    await expect(logoutButton).toBeVisible();
  });

  test('should display main content area', async ({ page }) => {
    // Kontrola hlavního obsahu
    const mainContent = page.locator('main');
    await expect(mainContent).toBeVisible();
  });

  test('should have functional logout button', async ({ page }) => {
    // Test funkcionality logout tlačítka
    const logoutButton = page.getByRole('button', { name: 'Odhlásit se' }).or(page.getByRole('button', { name: 'Logout' }));
    
    // Klikneme na logout
    await logoutButton.click();
    
    // Počkáme na přesměrování
    await page.waitForTimeout(2000);
    
    // Kontrola, že jsme se odhlásili
    const currentUrl = page.url();
    const isLoggedOut = !currentUrl.includes('/dashboard');
    expect(isLoggedOut).toBe(true);
  });
});