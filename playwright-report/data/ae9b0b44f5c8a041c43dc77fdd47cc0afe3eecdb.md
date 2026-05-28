# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: mobile/walmart-search.spec.ts >> Walmart mobile web >> searches for laptop from the mobile homepage
- Location: tests/mobile/walmart-search.spec.ts:13:7

# Error details

```
Error: expect(page).toHaveTitle(expected) failed

Expected pattern: /walmart/i
Received string:  ""
Timeout: 15000ms

Call log:
  - Expect "toHaveTitle" with timeout 15000ms
    18 × unexpected value ""

```

# Test source

```ts
  1  | import { expect, test } from '../../src/fixtures/browserstackMobile';
  2  | import { WalmartHomePage } from '../../src/pages/WalmartHomePage';
  3  | import { WalmartSearchResultsPage } from '../../src/pages/WalmartSearchResultsPage';
  4  | 
  5  | test.describe('Walmart mobile web', () => {
  6  |   test('loads the mobile homepage', async ({ page }) => {
  7  |     const home = new WalmartHomePage(page);
  8  | 
  9  |     await home.goto();
  10 |     await home.expectLoaded();
  11 |   });
  12 | 
  13 |   test('searches for laptop from the mobile homepage', async ({ page }) => {
  14 |     const home = new WalmartHomePage(page);
  15 |     const results = new WalmartSearchResultsPage(page);
  16 | 
  17 |     await home.goto();
  18 |     await home.expectLoaded();
  19 |     await home.searchFor('laptop');
  20 |     await results.expectForSearchTerm('laptop');
  21 | 
> 22 |     await expect(page).toHaveTitle(/walmart/i);
     |                        ^ Error: expect(page).toHaveTitle(expected) failed
  23 |     await page.screenshot({
  24 |       path: 'test-results/artifacts/walmart-mobile-search-laptop.png',
  25 |       fullPage: true
  26 |     });
  27 |   });
  28 | });
  29 | 
```