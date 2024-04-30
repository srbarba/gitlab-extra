import { afterAll, afterEach, beforeAll } from 'vitest'
import { mockServer } from '~~/test/component/utils'

beforeAll(() => mockServer.listen({ onUnhandledRequest: 'error' }))
afterAll(() => mockServer.close())
afterEach(() => {
  mockServer.resetHandlers()
})
