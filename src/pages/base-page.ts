import { Page, Locator } from '@playwright/test';

export class BasePage {
  protected page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  getPage(): Page {
    return this.page;
  }

  async navigate(url: string) {
    await this.page.goto(url);
  }

  async waitForPageLoad() {
    await this.page.waitForLoadState('networkidle');
  }

  async switchToEnglish() {
    const englishButton = this.page.getByTestId('en');
    if (await englishButton.isVisible()) {
      await englishButton.click();
    }
  }

  async switchToCzech() {
    const czechButton = this.page.getByTestId('cz');
    if (await czechButton.isVisible()) {
      await czechButton.click();
    }
  }

  async getPageTitle(): Promise<string> {
    return await this.page.title();
  }

  async getCurrentUrl(): Promise<string> {
    return this.page.url();
  }
}
