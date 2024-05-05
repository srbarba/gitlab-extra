import { PageObject } from './PageObject'

export interface HomePage extends PageObject {
  path: '/'
}

export class HomePage extends PageObject {
  path = '/' as const

  async logout() {
    await this.page.getByRole('button', { name: /User menu/i }).click()
    await this.page.getByRole('menuitem', { name: /Logout/i }).click()
  }
}
