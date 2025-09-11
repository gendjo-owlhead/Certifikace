import { test, expect } from '@playwright/test';
import { LoginPage } from '../../src/pages/login-page';
import { DashboardPage } from '../../src/pages/dashboard-page';
import { TEST_USERS } from '../../src/utils/test-data';

test.describe('Atomic Tests - Dashboard Header', () => {
  let loginPage: LoginPage;
  let dashboardPage: DashboardPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    dashboardPage = new DashboardPage(page);
    
    // Přihlášení před každým testem
    await loginPage.navigate();
    await loginPage.switchToEnglish();
    await loginPage.login(TEST_USERS.EXISTING_USER.username, TEST_USERS.EXISTING_USER.password);
    await dashboardPage.waitForDashboardLoad();
  });

  test('should display header elements', async ({ page }) => {
    // Kontrola viditelnosti hlavičky
    const header = page.locator('header, [data-testid="header"], .header');
    await expect(header.first()).toBeVisible();
  });

  test('should display logo in header', async ({ page }) => {
    // Kontrola loga
    const logo = page.locator('img[alt*="logo"], img[alt*="Logo"], [data-testid="logo"]');
    await expect(logo.first()).toBeVisible();
  });

  test('should display application title', async ({ page }) => {
    // Kontrola názvu aplikace
    const title = page.locator('text=TEG#B');
    await expect(title.first()).toBeVisible();
  });

  test('should display logout button', async ({ page }) => {
    // Kontrola tlačítka pro odhlášení
    const logoutButton = page.locator('button:has-text("Odhlásit"), button:has-text("Logout"), [data-testid="logout"]');
    await expect(logoutButton.first()).toBeVisible();
  });

  test('should logout when logout button is clicked', async ({ page }) => {
    // Test funkcionality odhlášení
    const logoutButton = page.locator('button:has-text("Odhlásit"), button:has-text("Logout"), [data-testid="logout"]');
    await logoutButton.first().click();
    
    // Kontrola přesměrování na login stránku
    await page.waitForURL('**/');
    expect(await loginPage.isLoginFormVisible()).toBe(true);
  });

  test('should display header navigation elements', async ({ page }) => {
    // Kontrola, že header obsahuje základní navigační elementy
    const header = page.locator('header, [role="banner"]');
    await expect(header).toBeVisible();
    
    // Kontrola, že header obsahuje nějaký obsah (logo + logout tlačítko)
    const headerContent = header.locator('*');
    const contentCount = await headerContent.count();
    expect(contentCount).toBeGreaterThan(0);
    
    console.log('Header contains navigation elements');
  });
});
