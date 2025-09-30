import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './base-page.js';
import { TEST_IDS } from '../utils/test-ids.js';

export class DashboardPage extends BasePage {
  private logoutButton: Locator;
  private editProfileButton: Locator;
  private addAccountButton: Locator;
  private profileHeading: Locator;
  private accountsHeading: Locator;
  private navigationMenu: Locator;
  private homeNavItem: Locator;
  private accountsNavItem: Locator;
  private transactionsNavItem: Locator;
  private supportNavItem: Locator;
  private mainContent: Locator;

  private nameField: Locator;
  private surnameField: Locator;
  private emailField: Locator;
  private phoneField: Locator;
  private ageField: Locator;

  constructor(page: Page) {
    super(page);

    this.logoutButton = page
      .getByTestId(TEST_IDS.dashboard.logoutButton)
      .or(page.getByRole('button', { name: 'Odhlásit se' }))
      .or(page.getByRole('button', { name: 'Logout' }));

    this.editProfileButton = page
      .getByTestId(TEST_IDS.dashboard.editProfileButton)
      .or(page.getByRole('button', { name: 'Upravit profil' }))
      .or(page.getByRole('button', { name: 'Edit Profile' }));

    this.addAccountButton = page
      .getByTestId(TEST_IDS.dashboard.addAccountButton)
      .or(page.getByRole('button', { name: 'Přidat účet' }))
      .or(page.getByRole('button', { name: 'Add Account' }));

    this.profileHeading = page
      .getByTestId(TEST_IDS.dashboard.profileHeading)
      .or(page.locator('h2:has-text("Detaily Profilu"), h2:has-text("Profile Details")'))
      .first();

    this.accountsHeading = page
      .getByTestId(TEST_IDS.dashboard.accountsHeading)
      .or(page.locator('h2:has-text("Účty"), h2:has-text("Accounts")'))
      .first();

    this.navigationMenu = page
      .getByTestId(TEST_IDS.dashboard.nav)
      .or(page.locator('nav, [role="navigation"], .sidebar, .menu'));

    this.homeNavItem = page
      .getByTestId(TEST_IDS.navigation.home)
      .or(page.getByRole('link', { name: 'Domů' }))
      .or(page.getByRole('link', { name: 'Home' }))
      .or(page.locator('li:has-text("Domů"), li:has-text("Home")'));

    this.accountsNavItem = page
      .getByTestId(TEST_IDS.navigation.accounts)
      .or(page.getByRole('link', { name: 'Účty' }))
      .or(page.getByRole('link', { name: 'Accounts' }))
      .or(page.locator('li:has-text("Účty"), li:has-text("Accounts")'));

    this.transactionsNavItem = page
      .getByTestId(TEST_IDS.navigation.transactions)
      .or(page.getByRole('link', { name: 'Transakce' }))
      .or(page.getByRole('link', { name: 'Transactions' }))
      .or(page.locator('li:has-text("Transakce"), li:has-text("Transactions")'));

    this.supportNavItem = page
      .getByTestId(TEST_IDS.navigation.support)
      .or(page.getByRole('link', { name: 'Podpora' }))
      .or(page.getByRole('link', { name: 'Support' }))
      .or(page.locator('li:has-text("Podpora"), li:has-text("Support")'));

    this.mainContent = page
      .getByTestId(TEST_IDS.dashboard.mainContent)
      .or(page.getByTestId(TEST_IDS.common.mainContent))
      .or(page.locator('main'));

    this.nameField = page
      .getByTestId(TEST_IDS.profile.nameValue)
      .or(page.getByTestId('name'))
      .or(page.locator('strong:has-text("Jméno:") + text, strong:has-text("Name:") + text'))
      .first();

    this.surnameField = page
      .getByTestId(TEST_IDS.profile.surnameValue)
      .or(page.getByTestId('surname'))
      .or(page.locator('strong:has-text("Příjmení:") + text, strong:has-text("Surname:") + text'))
      .first();

    this.emailField = page
      .getByTestId(TEST_IDS.profile.emailValue)
      .or(page.getByTestId('email'))
      .or(page.locator('strong:has-text("Email:") + text'))
      .first();

    this.phoneField = page
      .getByTestId(TEST_IDS.profile.phoneValue)
      .or(page.getByTestId('phone'))
      .or(page.locator('strong:has-text("Telefon:") + text, strong:has-text("Phone:") + text'))
      .first();

    this.ageField = page
      .getByTestId(TEST_IDS.profile.ageValue)
      .or(page.getByTestId('age'))
      .or(page.locator('strong:has-text("Věk:") + text, strong:has-text("Age:") + text'))
      .first();
  }

  async navigate(url = 'https://tegb-frontend-88542200c6db.herokuapp.com/dashboard'): Promise<this> {
    await super.navigate(url);
    await this.waitForPageLoad();
    return this;
  }

  async logout() {
    await this.logoutButton.click();
  }

  async clickEditProfile() {
    await this.editProfileButton.click();
  }

  async clickAddAccount() {
    await this.addAccountButton.click();
  }

  async navigateToHome() {
    await this.homeNavItem.click();
  }

  async navigateToAccounts() {
    await this.accountsNavItem.click();
  }

  async navigateToTransactions() {
    await this.transactionsNavItem.click();
  }

  async navigateToSupport() {
    await this.supportNavItem.click();
  }

  async isDashboardVisible(): Promise<boolean> {
    try {
      const [profileVisible, accountsVisible, logoutVisible, mainVisible] = await Promise.all([
        this.profileHeading.isVisible(),
        this.accountsHeading.isVisible(),
        this.logoutButton.isVisible(),
        this.mainContent.isVisible(),
      ]);

      return profileVisible && accountsVisible && logoutVisible && mainVisible;
    } catch (error) {
      return false;
    }
  }

  async getProfileName(): Promise<string> {
    return (await this.nameField.textContent())?.trim() ?? '';
  }

  async getProfileSurname(): Promise<string> {
    return (await this.surnameField.textContent())?.trim() ?? '';
  }

  async getProfileEmail(): Promise<string> {
    return (await this.emailField.textContent())?.trim() ?? '';
  }

  async getProfilePhone(): Promise<string> {
    return (await this.phoneField.textContent())?.trim() ?? '';
  }

  async getProfileAge(): Promise<string> {
    return (await this.ageField.textContent())?.trim() ?? '';
  }

  async verifyDashboardElements() {
    await expect(this.mainContent).toBeVisible();
    await expect(this.logoutButton).toBeVisible();
    await expect(this.editProfileButton).toBeVisible();
    await expect(this.addAccountButton).toBeVisible();
    await expect(this.profileHeading).toBeVisible();
    await expect(this.accountsHeading).toBeVisible();
    await expect(this.navigationMenu).toBeVisible();
  }

  async verifyNavigationMenu() {
    await expect(this.homeNavItem).toBeVisible();
    await expect(this.accountsNavItem).toBeVisible();
    await expect(this.transactionsNavItem).toBeVisible();
    await expect(this.supportNavItem).toBeVisible();
  }

  async verifyProfileSection() {
    await expect(this.profileHeading).toBeVisible();
    await expect(this.editProfileButton).toBeVisible();
  }

  async verifyAccountsSection() {
    await expect(this.accountsHeading).toBeVisible();
    await expect(this.addAccountButton).toBeVisible();
  }

  async getAccountsList() {
    return await this.page.getByTestId(TEST_IDS.dashboard.accountItem).all();
  }

  async getAccountsCount(): Promise<number> {
    const accounts = await this.getAccountsList();
    return accounts.length;
  }

  async waitForDashboardLoad() {
    await this.page.waitForURL('**/dashboard');
    await this.logoutButton.waitFor({ state: 'visible', timeout: 10000 });
    await this.page.waitForTimeout(1000);
  }
}
