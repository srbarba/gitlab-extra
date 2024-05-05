export default defineNuxtConfig({
  srcDir: 'src/',
  alias: {
    cookie: 'cookie'
  },
  devtools: { enabled: true },
  ignorePrefix: '_',
  modules: ['./packages/vuetify/index.ts', './packages/auth/index.ts']
})
