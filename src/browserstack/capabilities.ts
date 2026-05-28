import type { TestInfo } from '@playwright/test';
import { testConfig } from '../config/env';

type BrowserStackCapabilities = Record<string, string>;

function sanitizeName(value: string): string {
  return value.replace(/[^\w.-]+/g, '-').replace(/^-+|-+$/g, '');
}

export function browserStackCapabilities(testInfo: TestInfo): BrowserStackCapabilities {
  const { browserStack } = testConfig;
  const sessionName = `${testInfo.file} - ${testInfo.title}`;
  const build = `${browserStack.buildName}-${sanitizeName(browserStack.buildId)}`;

  return {
    browserName: 'chrome',
    deviceName: browserStack.deviceName,
    osVersion: browserStack.osVersion,
    realMobile: 'true',
    project: browserStack.projectName,
    build,
    name: sessionName,
    'browserstack.username': browserStack.username,
    'browserstack.accessKey': browserStack.accessKey,
    'browserstack.debug': 'true',
    'browserstack.networkLogs': 'true',
    'browserstack.console': 'errors',
    'client.playwrightVersion': require('playwright/package.json').version
  };
}

export function browserStackEndpoint(testInfo: TestInfo): string {
  const caps = browserStackCapabilities(testInfo);
  return `wss://cdp.browserstack.com/playwright?caps=${encodeURIComponent(
    JSON.stringify(caps)
  )}`;
}
