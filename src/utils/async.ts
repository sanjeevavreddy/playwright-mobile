export async function withTimeout<T>(
  promise: Promise<T>,
  label: string,
  timeoutMs: number
): Promise<T> {
  let timeout: NodeJS.Timeout | undefined;
  const timer = new Promise<never>((_, reject) => {
    timeout = setTimeout(
      () => reject(new Error(`${label} timed out after ${timeoutMs}ms`)),
      timeoutMs
    );
  });

  try {
    return await Promise.race([promise, timer]);
  } finally {
    if (timeout) clearTimeout(timeout);
  }
}

export async function cleanup(label: string, action: () => Promise<void>): Promise<void> {
  try {
    await action();
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.warn(`Cleanup warning (${label}): ${message}`);
  }
}

export async function step<T>(label: string, action: () => T | Promise<T>): Promise<T> {
  console.log(`> ${label}`);
  return await action();
}
