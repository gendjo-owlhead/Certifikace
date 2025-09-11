import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './base-page';

export class RegisterPage extends BasePage {
  private usernameInput: Locator;
  private passwordInput: Locator;
  private emailInput: Locator;
  private registerButton: Locator;
  private backToLoginButton: Locator;
  private pageTitle: Locator;

  constructor(page: Page) {
    super(page);
    this.usernameInput = page.getByPlaceholder('Uživatelské jméno').or(page.getByPlaceholder('Username'));
    this.passwordInput = page.getByPlaceholder('Heslo').or(page.getByPlaceholder('Password'));
    this.emailInput = page.getByPlaceholder('Email');
    this.registerButton = page.getByRole('button', { name: 'Registrovat' }).or(page.getByRole('button', { name: 'Register' }));
    this.backToLoginButton = page.getByRole('button', { name: 'Zpět na přihlášení' }).or(page.getByRole('button', { name: 'Back to Login' }));
    this.pageTitle = page.locator('h1');
  }

  async navigate() {
    await super.navigate('https://tegb-frontend-88542200c6db.herokuapp.com/register');
    await this.waitForPageLoad();
  }

  async register(username: string, password: string, email: string): Promise<this> {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.emailInput.fill(email);
    await this.registerButton.click();
    return this;
  }

  async clickBackToLogin() {
    await this.backToLoginButton.click();
  }

  async isRegisterFormVisible(): Promise<boolean> {
    return await this.usernameInput.isVisible() && 
           await this.passwordInput.isVisible() && 
           await this.emailInput.isVisible() &&
           await this.registerButton.isVisible();
  }

  async getUsernameInputPlaceholder(): Promise<string> {
    return await this.usernameInput.getAttribute('placeholder') || '';
  }

  async getPasswordInputPlaceholder(): Promise<string> {
    return await this.passwordInput.getAttribute('placeholder') || '';
  }

  async getEmailInputPlaceholder(): Promise<string> {
    return await this.emailInput.getAttribute('placeholder') || '';
  }

  async verifyPageElements() {
    await expect(this.pageTitle).toBeVisible();
    await expect(this.usernameInput).toBeVisible();
    await expect(this.passwordInput).toBeVisible();
    await expect(this.emailInput).toBeVisible();
    await expect(this.registerButton).toBeVisible();
    await expect(this.backToLoginButton).toBeVisible();
  }

  async verifyPageTitle() {
    await expect(this.pageTitle).toHaveText('TEG#B');
  }

  async fillRegistrationForm(userData: {
    username: string;
    password: string;
    email: string;
  }) {
    await this.usernameInput.fill(userData.username);
    await this.passwordInput.fill(userData.password);
    await this.emailInput.fill(userData.email);
  }

  async submitRegistration() {
    await this.registerButton.click();
  }
}
