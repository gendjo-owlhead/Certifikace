import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './base-page.js';
import { TEST_IDS } from '../utils/test-ids.js';

export class RegisterPage extends BasePage {
  private usernameInput: Locator;
  private passwordInput: Locator;
  private emailInput: Locator;
  private registerButton: Locator;
  private backToLoginButton: Locator;
  private pageTitle: Locator;
  private formRoot: Locator;

  constructor(page: Page) {
    super(page);

    this.usernameInput = page
      .getByTestId(TEST_IDS.register.usernameInput)
      .or(page.getByPlaceholder('Uživatelské jméno'))
      .or(page.getByPlaceholder('Username'));

    this.passwordInput = page
      .getByTestId(TEST_IDS.register.passwordInput)
      .or(page.getByPlaceholder('Heslo'))
      .or(page.getByPlaceholder('Password'));

    this.emailInput = page
      .getByTestId(TEST_IDS.register.emailInput)
      .or(page.getByPlaceholder('Email'));

    this.registerButton = page
      .getByTestId(TEST_IDS.register.submitButton)
      .or(page.getByRole('button', { name: 'Registrovat' }))
      .or(page.getByRole('button', { name: 'Register' }));

    this.backToLoginButton = page
      .getByTestId(TEST_IDS.register.backToLoginButton)
      .or(page.getByRole('button', { name: 'Zpět na přihlášení' }))
      .or(page.getByRole('button', { name: 'Back to Login' }));

    this.pageTitle = page
      .getByTestId(TEST_IDS.register.title)
      .or(page.getByTestId(TEST_IDS.common.appTitle))
      .or(page.locator('h1'));

    this.formRoot = page
      .getByTestId(TEST_IDS.register.form)
      .or(page.locator('form'));
  }

  async navigate(url = 'https://tegb-frontend-88542200c6db.herokuapp.com/register'): Promise<this> {
    await super.navigate(url);
    await this.waitForPageLoad();
    return this;
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
    try {
      const [username, password, email, button] = await Promise.all([
        this.usernameInput.isVisible(),
        this.passwordInput.isVisible(),
        this.emailInput.isVisible(),
        this.registerButton.isVisible(),
      ]);
      return username && password && email && button;
    } catch (error) {
      return false;
    }
  }

  async getUsernameInputPlaceholder(): Promise<string> {
    return (await this.usernameInput.getAttribute('placeholder')) ?? '';
  }

  async getPasswordInputPlaceholder(): Promise<string> {
    return (await this.passwordInput.getAttribute('placeholder')) ?? '';
  }

  async getEmailInputPlaceholder(): Promise<string> {
    return (await this.emailInput.getAttribute('placeholder')) ?? '';
  }

  async verifyPageElements() {
    await expect(this.formRoot).toBeVisible();
    await expect(this.pageTitle).toBeVisible();
    await expect(this.usernameInput).toBeVisible();
    await expect(this.passwordInput).toBeVisible();
    await expect(this.emailInput).toBeVisible();
    await expect(this.registerButton).toBeVisible();
    await expect(this.backToLoginButton).toBeVisible();
  }

  async verifyPageTitle() {
    await expect(this.pageTitle).toContainText('TEG#B');
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
