import { PageObject } from './PageObject'

export interface LoginPage extends PageObject {
  path: '/login'
}

export class LoginPage extends PageObject {
  path = '/login' as const

  async login() {
    if (new URL(this.page.url()).pathname !== this.path) {
      await this.goto()
    }

    await this.waitForPage()
    const loginWithCredentialsButton = this.page.getByRole('button', {
      name: /Login with credentials/i
    })
    await loginWithCredentialsButton.isEnabled()
    await loginWithCredentialsButton.click()
  }
}
