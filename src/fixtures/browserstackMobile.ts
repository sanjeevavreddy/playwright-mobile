import { expect, test as base } from '@playwright/test';
import { _android as android, type AndroidDevice, type BrowserContext, type Page } from 'playwright';
import { browserStackEndpoint } from '../browserstack/capabilities';
import { setBrowserStackSessionStatus } from '../browserstack/session';
import { cleanup, step, withTimeout } from '../utils/async';

type BrowserStackMobileFixtures = {
  mobileDevice: AndroidDevice;
  mobileContext: BrowserContext;
  page: Page;
};

export const test = base.extend<BrowserStackMobileFixtures>({
  mobileDevice: async ({}, use, testInfo) => {
    const device = await step('Connect Playwright to BrowserStack Android device', () =>
      withTimeout(
        android.connect(browserStackEndpoint(testInfo)),
        'Connect Playwright to BrowserStack Android device',
        120_000
      )
    );

    try {
      await use(device);
    } finally {
      await cleanup('close BrowserStack device session', async () => {
        await withTimeout(device.close(), 'Close BrowserStack device session', 60_000);
      });
    }
  },

  mobileContext: async ({ mobileDevice }, use) => {
    await step('Stop any existing Chrome session', () =>
      mobileDevice.shell('am force-stop com.android.chrome')
    );

    const context = await step('Launch Chrome on BrowserStack Android device', () =>
      mobileDevice.launchBrowser()
    );

    await use(context);
  },

  page: async ({ mobileContext }, use, testInfo) => {
    const page = await mobileContext.newPage();

    try {
      await use(page);
      const passed = testInfo.status === testInfo.expectedStatus;
      await setBrowserStackSessionStatus(
        page,
        passed ? 'passed' : 'failed',
        passed ? 'Test passed.' : `Test ${testInfo.status}.`
      );
    } catch (error) {
      await setBrowserStackSessionStatus(
        page,
        'failed',
        error instanceof Error ? error.message : 'Test failed.'
      );
      throw error;
    } finally {
      await cleanup('close BrowserStack page', async () => {
        await page.close();
      });
    }
  }
});

export { expect };
