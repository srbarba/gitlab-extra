import { HomePage, it, LoginPage } from '~~/test/acceptance/utils'

const authFile = '.playwright/.auth/user.json'

it('authenticate', async ({ page }) => {
  const loginPage = new LoginPage(page)
  await loginPage.goto()
  await loginPage.login()
  const home = new HomePage(page)
  await home.waitForPage()
  await page.context().storageState({ path: authFile })
})
