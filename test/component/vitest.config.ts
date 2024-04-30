import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import vuetify from 'vite-plugin-vuetify'
import components from 'unplugin-vue-components/vite'
import autoImport from 'unplugin-auto-import/vite'

export default defineConfig({
  plugins: [
    vue(),
    vuetify({ autoImport: true }),
    components({
      dirs: ['../../src/components', '../../packages/**/components'],
      dts: './vitest.components.d.ts'
    }),
    autoImport({
      dts: 'vitest.imports.d.ts',
      dirs: [
        '../../src/composables',
        '../../src/utils',
        '../../packages/**/composables',
        '../../packages/**/utils'
      ],
      imports: [
        'vue',
        'vue-router',
        'vue-i18n',
        {
          '@nuxtjs/i18n': ['defineI18nConfig']
        }
      ]
    })
  ],
  test: {
    clearMocks: true,
    environment: 'jsdom',
    server: {
      deps: {
        inline: ['vuetify']
      }
    },
    setupFiles: ['setup']
  },
  resolve: {
    alias: {
      '~': new URL('../../src', import.meta.url).pathname,
      '~/*': new URL('../../src/*', import.meta.url).pathname,
      '@': new URL('../../src/', import.meta.url).pathname,
      '@/*': new URL('../../src/*', import.meta.url).pathname,
      '~~': new URL('../../', import.meta.url).pathname,
      '~~/*': new URL('../../*', import.meta.url).pathname,
      '@@': new URL('../../', import.meta.url).pathname,
      '@@/*': new URL('../../*', import.meta.url).pathname
    }
  }
})
