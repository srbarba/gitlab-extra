import process from 'node:process'
import { defineConfig, devices } from '@playwright/test'

const port = process.env.PORT || 3000
const timeout = process.env.TIMEOUT ? Number(process.env.TIMEOUT) : 15_000
const globalTimeout = process.env.GLOBAL_TIMEOUT
  ? Number(process.env.GLOBAL_TIMEOUT)
  : 60_000

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  timeout,
  globalTimeout,
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
      name: 'Auth',
      testMatch: /Auth.spec.ts/,
      use: { ...devices['Desktop Chrome'] }
    },
    {
      name: 'setup',
      testMatch: /.*\.setup\.ts/
    },
    {
      name: 'chromium',
      testMatch: /(?<!Auth)\.spec\.ts$/,
      use: {
        ...devices['Desktop Chrome'],
        storageState: '.playwright/.auth/user.json'
      },
      dependencies: ['setup']
    }
  ],
  /* Run your local dev server before starting the tests */
  webServer: {
    command:
      process.env.NODE_ENV === 'production' ? `pnpm preview` : `pnpm dev`,
    url: `http://localhost:${port}`,
    reuseExistingServer: !process.env.CI
  }
})
