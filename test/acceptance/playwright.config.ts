import process from 'node:process'
import { defineConfig, devices } from '@playwright/test'

const port = process.env.PORT || 5173
const timeout = process.env.TIMEOUT ? Number(process.env.TIMEOUT) : 5_000

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  timeout: 5_000,
  globalTimeout: timeout,
  testDir: './specs',
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [['list']],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: `http://localhost:${port}`,
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry'
  },
  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] }
    }
  ],
  /* Run your local dev server before starting the tests */
  webServer: {
    command:
      process.env.NODE_ENV === 'production'
        ? `pnpm app:build && PORT=${port} pnpm app:start`
        : `PORT=${port} pnpm app:dev`,
    url: `http://localhost:${port}`,
    reuseExistingServer: !process.env.CI
  }
})
