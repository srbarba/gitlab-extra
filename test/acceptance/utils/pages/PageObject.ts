import type { Page } from '@playwright/test'

export interface PageObject {
  path: string
  goto(): Promise<{ path: string; waitForPage(): void }>
  waitForPage(): Promise<void>
}

export class PageObject {
  path: string = '' as const
  constructor(protected page: Page) {}

  /**
   * Navigates to the page path.
   * Returns the final path
   */
  async goto(
    { pathParams, queryParams } = {} as {
      pathParams?: Record<string, string>
      queryParams?: Record<string, string>
    }
  ) {
    let path = this.path
    if (pathParams) {
      path = Object.entries(pathParams).reduce(
        (acc, [key, value]) => acc.replace(`{${key}}`, value),
        path
      )
    }
    if (queryParams) {
      path = `${path}?${new URLSearchParams(queryParams).toString()}`
    }

    await this.page.goto(path)

    return {
      path,
      waitForPage: async () => {
        await this.page.waitForURL(path)
      }
    }
  }

  /**
   * Waits for the page to be loaded
   */
  async waitForPage() {
    await this.page.waitForURL(this.path)
  }
}
