import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './base-page';
import { DashboardPage } from './dashboard-page';
import { RegisterPage } from './register-page';

export class LoginPage extends BasePage {
  private usernameInput: Locator;
  private passwordInput: Locator;
  private loginButton: Locator;
  private registerButton: Locator;
  private lostPasswordButton: Locator;
  private pageTitle: Locator;

  constructor(page: Page) {
    super(page);
    this.usernameInput = page.getByPlaceholder('Uživatelské jméno').or(page.getByPlaceholder('Username'));
    this.passwordInput = page.getByPlaceholder('Heslo').or(page.getByPlaceholder('Password'));
    this.loginButton = page.getByRole('button', { name: 'Přihlásit se' }).or(page.getByRole('button', { name: 'Login' }));
    this.registerButton = page.getByRole('button', { name: 'Registruj se' }).or(page.getByRole('button', { name: 'Register' }));
    this.lostPasswordButton = page.getByRole('button', { name: 'Ztracené heslo' }).or(page.getByRole('button', { name: 'Lost password' }));
    this.pageTitle = page.locator('h1');
  }

  async navigate(): Promise<this> {
    await super.navigate('https://tegb-frontend-88542200c6db.herokuapp.com/');
    await this.waitForPageLoad();
    return this;
  }

  async login(username: string, password: string): Promise<DashboardPage> {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
    await this.page.waitForURL('**/dashboard');
    return new DashboardPage(this.page);
  }

  async clickRegister(): Promise<RegisterPage> {
    await this.registerButton.click();
    return new RegisterPage(this.page);
  }

  async switchToEnglish(): Promise<this> {
    const englishButton = this.page.getByTestId('en').or(this.page.getByRole('button', { name: 'EN' }).first());
    if (await englishButton.isVisible({ timeout: 2000 })) {
      await englishButton.click();
      await this.page.waitForTimeout(1000);
    }
    return this;
  }

  async clickLostPassword() {
    await this.lostPasswordButton.click();
  }

  async isLoginFormVisible(): Promise<boolean> {
    return await this.usernameInput.isVisible() && 
           await this.passwordInput.isVisible() && 
           await this.loginButton.isVisible();
  }

  async getLoginButtonText(): Promise<string> {
    return await this.loginButton.textContent() || '';
  }

  async getRegisterButtonText(): Promise<string> {
    return await this.registerButton.textContent() || '';
  }

  async getUsernameInputPlaceholder(): Promise<string> {
    return await this.usernameInput.getAttribute('placeholder') || '';
  }

  async getPasswordInputPlaceholder(): Promise<string> {
    return await this.passwordInput.getAttribute('placeholder') || '';
  }

  async verifyPageElements() {
    await expect(this.pageTitle).toBeVisible();
    await expect(this.usernameInput).toBeVisible();
    await expect(this.passwordInput).toBeVisible();
    await expect(this.loginButton).toBeVisible();
    await expect(this.registerButton).toBeVisible();
  }

  async verifyPageTitle() {
    await expect(this.pageTitle).toHaveText('TEG#B');
  }
}
