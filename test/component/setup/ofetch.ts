import { createFetch } from 'ofetch'

globalThis.$fetch = createFetch({
  fetch: (...args: Parameters<typeof globalThis.fetch>) =>
    globalThis.fetch(...args)
})
