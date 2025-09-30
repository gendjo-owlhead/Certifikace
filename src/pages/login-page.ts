import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './base-page.js';
import { DashboardPage } from './dashboard-page.js';
import { RegisterPage } from './register-page.js';
import { TEST_IDS } from '../utils/test-ids.js';

export class LoginPage extends BasePage {
  private usernameInput: Locator;
  private passwordInput: Locator;
  private loginButton: Locator;
  private registerButton: Locator;
  private lostPasswordButton: Locator;
  private pageTitle: Locator;
  private formRoot: Locator;

  constructor(page: Page) {
    super(page);

    this.usernameInput = page
      .getByTestId(TEST_IDS.login.usernameInput)
      .or(page.getByPlaceholder('Uživatelské jméno'))
      .or(page.getByPlaceholder('Username'));

    this.passwordInput = page
      .getByTestId(TEST_IDS.login.passwordInput)
      .or(page.getByPlaceholder('Heslo'))
      .or(page.getByPlaceholder('Password'));

    this.loginButton = page
      .getByTestId(TEST_IDS.login.submitButton)
      .or(page.getByRole('button', { name: 'Přihlásit se' }))
      .or(page.getByRole('button', { name: 'Login' }));

    this.registerButton = page
      .getByTestId(TEST_IDS.login.registerButton)
      .or(page.getByRole('button', { name: 'Registruj se' }))
      .or(page.getByRole('button', { name: 'Register' }));

    this.lostPasswordButton = page
      .getByTestId(TEST_IDS.login.lostPasswordButton)
      .or(page.getByRole('button', { name: 'Ztracené heslo' }))
      .or(page.getByRole('button', { name: 'Lost password' }));

    this.pageTitle = page
      .getByTestId(TEST_IDS.login.title)
      .or(page.getByTestId(TEST_IDS.common.appTitle))
      .or(page.locator('h1'));

    this.formRoot = page
      .getByTestId(TEST_IDS.login.form)
      .or(page.locator('form'));
  }

  async navigate(url = 'https://tegb-frontend-88542200c6db.herokuapp.com/'): Promise<this> {
    await super.navigate(url);
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
    await super.switchToEnglish();
    await this.page.waitForTimeout(300);
    return this;
  }

  async clickLostPassword() {
    await this.lostPasswordButton.click();
  }

  async isLoginFormVisible(): Promise<boolean> {
    try {
      const [username, password, button] = await Promise.all([
        this.usernameInput.isVisible(),
        this.passwordInput.isVisible(),
        this.loginButton.isVisible(),
      ]);
      return username && password && button;
    } catch (error) {
      return false;
    }
  }

  async getLoginButtonText(): Promise<string> {
    return (await this.loginButton.textContent())?.trim() ?? '';
  }

  async getRegisterButtonText(): Promise<string> {
    return (await this.registerButton.textContent())?.trim() ?? '';
  }

  async getUsernameInputPlaceholder(): Promise<string> {
    return (await this.usernameInput.getAttribute('placeholder')) ?? '';
  }

  async getPasswordInputPlaceholder(): Promise<string> {
    return (await this.passwordInput.getAttribute('placeholder')) ?? '';
  }

  async verifyPageElements() {
    await expect(this.formRoot).toBeVisible();
    await expect(this.pageTitle).toBeVisible();
    await expect(this.usernameInput).toBeVisible();
    await expect(this.passwordInput).toBeVisible();
    await expect(this.loginButton).toBeVisible();
    await expect(this.registerButton).toBeVisible();
  }

  async verifyPageTitle() {
    await expect(this.pageTitle).toContainText('TEG#B');
  }
}
