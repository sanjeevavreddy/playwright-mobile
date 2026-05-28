import fs from 'node:fs';
import path from 'node:path';

const rootDir = process.cwd();

function loadEnvFile(fileName: string): void {
  const filePath = path.join(rootDir, fileName);
  if (!fs.existsSync(filePath)) return;

  const lines = fs.readFileSync(filePath, 'utf-8').split(/\r?\n/);
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;

    const separator = trimmed.indexOf('=');
    if (separator === -1) continue;

    const key = trimmed.slice(0, separator).trim();
    const rawValue = trimmed.slice(separator + 1).trim();
    const value = rawValue.replace(/^["']|["']$/g, '');

    if (key && process.env[key] === undefined) {
      process.env[key] = value;
    }
  }
}

loadEnvFile('.env');
loadEnvFile('.env.local');

function requiredEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

function optionalEnv(name: string, fallback: string): string {
  return process.env[name] || fallback;
}

function localBuildId(): string {
  const now = new Date().toISOString().replace(/[-:.TZ]/g, '').slice(0, 14);
  return `local-${now}`;
}

export const testConfig = {
  walmartBaseUrl: optionalEnv('WALMART_BASE_URL', 'https://www.walmart.com'),
  browserStack: {
    username: requiredEnv('BROWSERSTACK_USERNAME'),
    accessKey: requiredEnv('BROWSERSTACK_ACCESS_KEY'),
    projectName: optionalEnv('BROWSERSTACK_PROJECT_NAME', 'Playwright Mobile'),
    buildName: optionalEnv('BROWSERSTACK_BUILD_NAME', 'playwright-mobile-walmart'),
    buildId: optionalEnv('BROWSERSTACK_BUILD_ID', process.env.CI ? 'ci' : localBuildId()),
    deviceName: optionalEnv('BROWSERSTACK_DEVICE', 'Samsung Galaxy S25 Ultra'),
    osVersion: optionalEnv('BROWSERSTACK_OS_VERSION', '15.0')
  }
};
