import { it } from '~~/test/acceptance/utils'

it('should show hello world', async ({ page }) => {
  await page.goto('/')
  await page.getByText(/hello, world/i).waitFor({
    state: 'visible'
  })
})
