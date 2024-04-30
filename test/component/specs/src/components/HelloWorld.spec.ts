import { it, expect, render, screen } from '~~/test/component/utils'
import HelloWorld from '~/components/HelloWorld.vue'

it('shows greetings', async () => {
  render(HelloWorld)
  expect(await screen.findByText('Hello, World!')).toBeInTheDocument()
})
