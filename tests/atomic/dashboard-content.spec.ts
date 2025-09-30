import { test, expect, type Page } from '@playwright/test';
import { LoginPage } from '../../src/pages/login-page.js';
import { DashboardPage } from '../../src/pages/dashboard-page.js';
import { TEST_USERS } from '../../src/utils/test-data.js';
import { TEST_IDS } from '../../src/utils/test-ids.js';

const profileHeadingLocator = (page: Page) =>
  page
    .getByTestId(TEST_IDS.dashboard.profileHeading)
    .or(page.locator('h2:has-text("Detaily Profilu"), h2:has-text("Profile Details")'))
    .first();

const accountsHeadingLocator = (page: Page) =>
  page
    .getByTestId(TEST_IDS.dashboard.accountsHeading)
    .or(page.locator('h2:has-text("Účty"), h2:has-text("Accounts")'))
    .first();

test.describe('Atomic Tests - Dashboard Content (Accounts & Profile)', () => {
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

  test('should display profile section', async ({ page }) => {
    await expect(profileHeadingLocator(page)).toBeVisible();
  });

  test('should display profile details heading', async ({ page }) => {
    await expect(profileHeadingLocator(page)).toBeVisible();
  });

  test('should display edit profile button', async ({ page }) => {
    const editButton = page
      .getByTestId(TEST_IDS.dashboard.editProfileButton)
      .or(page.getByRole('button', { name: 'Upravit profil' }))
      .or(page.getByRole('button', { name: 'Edit Profile' }));

    await expect(editButton.first()).toBeVisible();
  });

  test('should display profile information fields', async ({ page }) => {
    const nameField = page
      .getByTestId(TEST_IDS.profile.nameValue)
      .or(page.getByTestId('name'))
      .or(page
        .locator('strong:has-text("Jméno:"), strong:has-text("Name:")')
        .locator('..'));

    const surnameField = page
      .getByTestId(TEST_IDS.profile.surnameValue)
      .or(page.getByTestId('surname'))
      .or(page
        .locator('strong:has-text("Příjmení:"), strong:has-text("Surname:")')
        .locator('..'));

    const emailField = page
      .getByTestId(TEST_IDS.profile.emailValue)
      .or(page.getByTestId('email'))
      .or(page
        .locator('strong:has-text("Email:")')
        .locator('..'));

    await expect(nameField.first()).toBeVisible();
    await expect(surnameField.first()).toBeVisible();
    await expect(emailField.first()).toBeVisible();
  });

  test('should display accounts section', async ({ page }) => {
    await expect(accountsHeadingLocator(page)).toBeVisible();
  });

  test('should display accounts heading', async ({ page }) => {
    await expect(accountsHeadingLocator(page)).toBeVisible();
  });

  test('should display add account button', async ({ page }) => {
    const addAccountButton = page
      .getByTestId(TEST_IDS.dashboard.addAccountButton)
      .or(page.getByRole('button', { name: 'Přidat účet' }))
      .or(page.getByRole('button', { name: 'Add Account' }));

    await expect(addAccountButton.first()).toBeVisible();
  });

  test('should click edit profile button', async ({ page }) => {
    const editButton = page
      .getByTestId(TEST_IDS.dashboard.editProfileButton)
      .or(page.getByRole('button', { name: 'Upravit profil' }))
      .or(page.getByRole('button', { name: 'Edit Profile' }));

    await editButton.first().click();
    await page.waitForTimeout(1000);
  });

  test('should click add account button', async ({ page }) => {
    const addAccountButton = page
      .getByTestId(TEST_IDS.dashboard.addAccountButton)
      .or(page.getByRole('button', { name: 'Přidat účet' }))
      .or(page.getByRole('button', { name: 'Add Account' }));

    await addAccountButton.first().click();
    await page.waitForTimeout(1000);
  });

  test('should display account list or error message', async ({ page }) => {
    const errorMessage = page
      .getByTestId('account-error')
      .or(page.locator('text=Unexpected error occured'));

    const addAccountButton = page
      .getByTestId(TEST_IDS.dashboard.addAccountButton)
      .or(page.getByRole('button', { name: 'Přidat účet' }))
      .or(page.getByRole('button', { name: 'Add Account' }));

    const errorVisible = await errorMessage.isVisible().catch(() => false);
    const buttonVisible = await addAccountButton.isVisible().catch(() => false);

    expect(errorVisible || buttonVisible).toBe(true);
  });

  test('should display main content area', async ({ page }) => {
    const mainContent = page
      .getByTestId(TEST_IDS.dashboard.mainContent)
      .or(page.getByTestId(TEST_IDS.common.mainContent))
      .or(page.locator('main, [role="main"], .main-content'));

    await expect(mainContent.first()).toBeVisible();
  });
});
