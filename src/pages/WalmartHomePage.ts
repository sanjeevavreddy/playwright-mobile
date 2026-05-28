import { expect, type Locator, type Page } from '@playwright/test';
import { testConfig } from '../config/env';

export class WalmartHomePage {
  readonly page: Page;
  readonly searchBox: Locator;

  constructor(page: Page) {
    this.page = page;
    this.searchBox = page
      .locator('input[type="search"], input[name="q"], input[aria-label*="Search" i]')
      .first();
  }

  async goto(): Promise<void> {
    await this.page.goto(testConfig.walmartBaseUrl, {
      waitUntil: 'domcontentloaded',
      timeout: 90_000
    });
  }

  async expectLoaded(): Promise<void> {
    await expect(this.page).toHaveTitle(/walmart/i);
    await expect(this.searchBox).toBeVisible();
  }

  async searchFor(term: string): Promise<void> {
    await this.searchBox.fill(term);
    await this.page.keyboard.press('Enter');
  }
}
