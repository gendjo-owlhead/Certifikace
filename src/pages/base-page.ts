import { Page } from '@playwright/test';
import { TEST_IDS } from '../utils/test-ids.js';

export class BasePage {
  protected page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  getPage(): Page {
    return this.page;
  }

  async navigate(url: string): Promise<this> {
    await this.page.goto(url);
    return this;
  }

  async waitForPageLoad() {
    await this.page.waitForLoadState('networkidle');
  }

  async switchToEnglish(): Promise<this> {
    const englishButton = this.page
      .getByTestId(TEST_IDS.language.en)
      .or(this.page.getByTestId('en'))
      .or(this.page.getByRole('button', { name: /^en$/i }));

    if (await englishButton.isVisible().catch(() => false)) {
      await englishButton.click();
    }
    return this;
  }

  async switchToCzech(): Promise<this> {
    const czechButton = this.page
      .getByTestId(TEST_IDS.language.cz)
      .or(this.page.getByTestId('cz'))
      .or(this.page.getByRole('button', { name: /^cz$/i }));

    if (await czechButton.isVisible().catch(() => false)) {
      await czechButton.click();
    }
    return this;
  }

  async getPageTitle(): Promise<string> {
    return await this.page.title();
  }

  async getCurrentUrl(): Promise<string> {
    return this.page.url();
  }
}
