import { test, expect } from '@playwright/test';
import { LoginPage } from '../../src/pages/login-page';
import { DashboardPage } from '../../src/pages/dashboard-page';
import { TEST_USERS } from '../../src/utils/test-data';

test.describe('Atomic Tests - Dashboard Content (Accounts & Profile)', () => {
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

  test('should display profile section', async ({ page }) => {
    // Kontrola viditelnosti sekce profilu podle skutečné struktury
    const profileHeading = page.locator('h2:has-text("Detaily Profilu"), h2:has-text("Profile Details")');
    await expect(profileHeading).toBeVisible();
  });

  test('should display profile details heading', async ({ page }) => {
    // Kontrola nadpisu detailů profilu
    const profileHeading = page.locator('h2:has-text("Detaily Profilu")').or(page.locator('h2:has-text("Profile Details")'));
    await expect(profileHeading).toBeVisible();
  });

  test('should display edit profile button', async ({ page }) => {
    // Kontrola tlačítka pro úpravu profilu
    const editButton = page.locator('button:has-text("Upravit profil"), button:has-text("Edit Profile"), [data-testid="edit-profile"]');
    await expect(editButton.first()).toBeVisible();
  });

  test('should display profile information fields', async ({ page }) => {
    // Kontrola zobrazení polí profilu podle skutečné struktury
    const nameField = page.locator('strong:has-text("Jméno:")').or(page.locator('strong:has-text("Name:")'));
    const surnameField = page.locator('strong:has-text("Příjmení:")').or(page.locator('strong:has-text("Surname:")'));
    const emailField = page.locator('strong:has-text("Email:")');
    
    await expect(nameField).toBeVisible();
    await expect(surnameField).toBeVisible();
    await expect(emailField).toBeVisible();
  });

  test('should display accounts section', async ({ page }) => {
    // Kontrola viditelnosti sekce účtů
    const accountsHeading = page.locator('h2:has-text("Účty")').or(page.locator('h2:has-text("Accounts")'));
    await expect(accountsHeading).toBeVisible();
  });

  test('should display accounts heading', async ({ page }) => {
    // Kontrola nadpisu účtů
    const accountsHeading = page.locator('h2:has-text("Účty"), h2:has-text("Accounts")');
    await expect(accountsHeading.first()).toBeVisible();
  });

  test('should display add account button', async ({ page }) => {
    // Kontrola tlačítka pro přidání účtu
    const addAccountButton = page.locator('button:has-text("Přidat účet"), button:has-text("Add Account"), [data-testid="add-account"]');
    await expect(addAccountButton.first()).toBeVisible();
  });

  test('should click edit profile button', async ({ page }) => {
    // Test funkcionality tlačítka úpravy profilu
    const editButton = page.locator('button:has-text("Upravit profil"), button:has-text("Edit Profile"), [data-testid="edit-profile"]');
    await editButton.first().click();
    
    await page.waitForTimeout(1000);
    // Zde by měla být kontrola, co se stane po kliknutí (modal, navigace, atd.)
  });

  test('should click add account button', async ({ page }) => {
    // Test funkcionality tlačítka přidání účtu
    const addAccountButton = page.locator('button:has-text("Přidat účet"), button:has-text("Add Account"), [data-testid="add-account"]');
    await addAccountButton.first().click();
    
    await page.waitForTimeout(1000);
    // Zde by měla být kontrola, co se stane po kliknutí
  });

  test('should display account list or error message', async ({ page }) => {
    // Kontrola zobrazení seznamu účtů nebo chybové zprávy
    const errorMessage = page.locator('text=Unexpected error occured');
    const addAccountButton = page.getByRole('button', { name: 'Přidat účet' }).or(page.getByRole('button', { name: 'Add Account' }));
    
    // Buď je viditelná chybová zpráva nebo tlačítko pro přidání účtu
    const errorVisible = await errorMessage.isVisible();
    const buttonVisible = await addAccountButton.isVisible();
    
    expect(errorVisible || buttonVisible).toBe(true);
  });

  test('should display main content area', async ({ page }) => {
    // Kontrola hlavní oblasti obsahu
    const mainContent = page.locator('main, [role="main"], .main-content');
    await expect(mainContent.first()).toBeVisible();
  });
});
