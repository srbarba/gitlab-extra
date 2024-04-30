import { expect, it } from '~~/test/unit/utils'
import { greetings } from '~/utils/greetings'

it('should return greetings', () => {
  expect(greetings()).toBe('Hello, World!')
})
