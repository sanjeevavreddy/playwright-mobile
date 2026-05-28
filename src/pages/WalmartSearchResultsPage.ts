import { expect, type Locator, type Page } from '@playwright/test';

export class WalmartSearchResultsPage {
  readonly page: Page;
  readonly searchBox: Locator;

  constructor(page: Page) {
    this.page = page;
    this.searchBox = page
      .locator('input[type="search"], input[name="q"], input[aria-label*="Search" i]')
      .first();
  }

  async expectForSearchTerm(term: string): Promise<void> {
    await this.page.waitForURL(new RegExp(`search|query|${term}`, 'i'), {
      timeout: 60_000
    });
    await expect(this.page).toHaveURL(/walmart\.com/i);
    await expect(this.searchBox).toBeVisible();
  }
}
