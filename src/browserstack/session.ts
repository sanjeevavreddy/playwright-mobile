import type { Page } from 'playwright';

export async function setBrowserStackSessionStatus(
  page: Page | undefined,
  status: 'passed' | 'failed',
  reason: string
): Promise<void> {
  if (!page) return;

  await page
    .evaluate(
      () => {},
      `browserstack_executor: ${JSON.stringify({
        action: 'setSessionStatus',
        arguments: { status, reason }
      })}`
    )
    .catch(() => {});
}
