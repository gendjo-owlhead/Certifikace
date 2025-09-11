import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './base-page';

export class DashboardPage extends BasePage {
  private logoutButton: Locator;
  private editProfileButton: Locator;
  private addAccountButton: Locator;
  private profileSection: Locator;
  private accountsSection: Locator;
  private navigationMenu: Locator;
  private homeNavItem: Locator;
  private accountsNavItem: Locator;
  private transactionsNavItem: Locator;
  private supportNavItem: Locator;

  // Profile fields
  private nameField: Locator;
  private surnameField: Locator;
  private emailField: Locator;
  private phoneField: Locator;
  private ageField: Locator;

  constructor(page: Page) {
    super(page);
    this.logoutButton = page.getByRole('button', { name: 'Odhlásit se' }).or(page.getByRole('button', { name: 'Logout' }));
    this.editProfileButton = page.getByRole('button', { name: 'Upravit profil' }).or(page.getByRole('button', { name: 'Edit Profile' }));
    this.addAccountButton = page.getByRole('button', { name: 'Přidat účet' }).or(page.getByRole('button', { name: 'Add Account' }));
    this.profileSection = page.locator('h2:has-text("Detaily Profilu"), h2:has-text("Profile Details")').first();
    this.accountsSection = page.locator('h2:has-text("Účty"), h2:has-text("Accounts")').first();
    this.navigationMenu = page.locator('nav, [role="navigation"]');
    
    // Navigation items - skutečné levé menu
    this.homeNavItem = page.locator('text=Domů').or(page.locator('text=Home'));
    this.accountsNavItem = page.locator('text=Účty').or(page.locator('text=Accounts'));
    this.transactionsNavItem = page.locator('text=Transakce').or(page.locator('text=Transactions'));
    this.supportNavItem = page.locator('text=Podpora').or(page.locator('text=Support'));

    // Profile fields - používáme skutečnou strukturu
    this.nameField = page.locator('strong:has-text("Jméno:") + text, strong:has-text("Name:") + text').first();
    this.surnameField = page.locator('strong:has-text("Příjmení:") + text, strong:has-text("Surname:") + text').first();
    this.emailField = page.locator('strong:has-text("Email:") + text').first();
    this.phoneField = page.locator('strong:has-text("Telefon:") + text, strong:has-text("Phone:") + text').first();
    this.ageField = page.locator('strong:has-text("Věk:") + text, strong:has-text("Age:") + text').first();
  }

  async navigate() {
    await super.navigate('https://tegb-frontend-88542200c6db.herokuapp.com/dashboard');
    await this.waitForPageLoad();
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
      const profileHeading = await this.page.locator('h2:has-text("Detaily Profilu"), h2:has-text("Profile Details")').isVisible();
      const accountsHeading = await this.page.locator('h2:has-text("Účty"), h2:has-text("Accounts")').isVisible();
      const logoutVisible = await this.logoutButton.isVisible();
      const mainVisible = await this.page.locator('main').isVisible();
      
      console.log('Dashboard visibility check:', { profileHeading, accountsHeading, logoutVisible, mainVisible });
      
      return profileHeading && accountsHeading && logoutVisible && mainVisible;
    } catch (error) {
      console.log('Error checking dashboard visibility:', error);
      return false;
    }
  }

  async getProfileName(): Promise<string> {
    return await this.nameField.textContent() || '';
  }

  async getProfileSurname(): Promise<string> {
    return await this.surnameField.textContent() || '';
  }

  async getProfileEmail(): Promise<string> {
    return await this.emailField.textContent() || '';
  }

  async getProfilePhone(): Promise<string> {
    return await this.phoneField.textContent() || '';
  }

  async getProfileAge(): Promise<string> {
    return await this.ageField.textContent() || '';
  }

  async verifyDashboardElements() {
    await expect(this.logoutButton).toBeVisible();
    await expect(this.editProfileButton).toBeVisible();
    await expect(this.addAccountButton).toBeVisible();
    await expect(this.profileSection).toBeVisible();
    await expect(this.accountsSection).toBeVisible();
    await expect(this.navigationMenu).toBeVisible();
  }

  async verifyNavigationMenu() {
    await expect(this.homeNavItem).toBeVisible();
    await expect(this.accountsNavItem).toBeVisible();
    await expect(this.transactionsNavItem).toBeVisible();
    await expect(this.supportNavItem).toBeVisible();
  }

  async verifyProfileSection() {
    await expect(this.profileSection).toBeVisible();
    await expect(this.editProfileButton).toBeVisible();
  }

  async verifyAccountsSection() {
    await expect(this.accountsSection).toBeVisible();
    await expect(this.addAccountButton).toBeVisible();
  }

  async getAccountsList() {
    const accountItems = this.page.getByTestId('account-item');
    return await accountItems.all();
  }

  async getAccountsCount(): Promise<number> {
    const accounts = await this.getAccountsList();
    return accounts.length;
  }

  async waitForDashboardLoad() {
    // Počkáme na URL dashboard
    await this.page.waitForURL('**/dashboard');
    
    // Počkáme na logout tlačítko jako indikátor načtení
    await this.logoutButton.waitFor({ state: 'visible', timeout: 10000 });
    
    // Krátká pauza pro stabilizaci
    await this.page.waitForTimeout(1000);
  }
}
