import { it, HomePage, LoginPage } from '~~/test/acceptance/utils'

it('should redirect to login when user is trying to access without authentication', async ({
  page
}) => {
  await new HomePage(page).goto()
  await new LoginPage(page).waitForPage()
})

it('should redirect to given full path when user performs login', async ({
  page
}) => {
  const originalPage = await new HomePage(page).goto({
    queryParams: { someParam: 'true' }
  })
  const loginPage = new LoginPage(page)

  await loginPage.goto()
  await loginPage.login()
  await originalPage.waitForPage()
})

it('should redirect to root path when user access to login page and user is already authenticated', async ({
  page
}) => {
  const loginPage = new LoginPage(page)
  await loginPage.goto()
  await loginPage.login()
  await new HomePage(page).waitForPage()

  await loginPage.goto()
  await new HomePage(page).waitForPage()
})

it('should logout and redirect to login', async ({ page }) => {
  const loginPage = new LoginPage(page)
  await loginPage.goto()
  await loginPage.login()

  const homePage = new HomePage(page)
  await homePage.waitForPage()
  await homePage.logout()

  await loginPage.waitForPage()
})
