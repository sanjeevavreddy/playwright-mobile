import { expect, test } from '../../src/fixtures/browserstackMobile';
import { WalmartHomePage } from '../../src/pages/WalmartHomePage';
import { WalmartSearchResultsPage } from '../../src/pages/WalmartSearchResultsPage';

test.describe('Walmart mobile web', () => {
  test('loads the mobile homepage', async ({ page }) => {
    const home = new WalmartHomePage(page);

    await home.goto();
    await home.expectLoaded();
  });

  test('searches for laptop from the mobile homepage', async ({ page }, testInfo) => {
    const home = new WalmartHomePage(page);
    const results = new WalmartSearchResultsPage(page);

    await home.goto();
    await home.expectLoaded();
    await home.searchFor('laptop');
    await results.expectForSearchTerm('laptop');
    
  });
});
