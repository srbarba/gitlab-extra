import { it, LoginPage } from '~~/test/acceptance/utils'

const authFile = '.playwright/.auth/user.json'

it('authenticate', async ({ page }) => {
  const loginPage = new LoginPage(page)
  await loginPage.goto()
  await loginPage.login()
  await page.context().storageState({ path: authFile })
})
