import { it, HomePage, LoginPage } from '~~/test/acceptance/utils'

it('should logout and redirect to login', async ({ page }) => {
  const homePage = new HomePage(page)
  await homePage.goto()
  await homePage.logout()

  await new LoginPage(page).waitForPage()
})
