import { PageObject } from './PageObject'

export interface HomePage extends PageObject {
  path: '/'
}

export class HomePage extends PageObject {
  path = '/' as const

  async logout() {
    const userMenu = this.page.getByRole('button', { name: /User menu/i })
    await userMenu.isEnabled()
    await userMenu.click()

    await this.page.getByRole('menuitem', { name: /Logout/i }).click()
  }
}
