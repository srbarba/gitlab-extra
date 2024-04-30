import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    setupFiles: ['setup']
  },
  resolve: {
    alias: {
      '~': new URL('../../src', import.meta.url).pathname,
      '~/*': new URL('../../src/*', import.meta.url).pathname,
      '@': new URL('../../src', import.meta.url).pathname,
      '@/*': new URL('../../src/*', import.meta.url).pathname,
      '~~': new URL('../../', import.meta.url).pathname,
      '~~/*': new URL('../../*', import.meta.url).pathname,
      '@@': new URL('../../', import.meta.url).pathname,
      '@@/*': new URL('../../*', import.meta.url).pathname
    }
  }
})
