// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  srcDir: 'src/',
  alias: {
    cookie: 'cookie'
  },
  devtools: { enabled: true },
  modules: ['./packages/vuetify/src/module.ts', '@hebilicious/authjs-nuxt'],
  runtimeConfig: {
    authJs: {
      secret: process.env.NUXT_AUTH_SECRET
    },
    gitlab: {
      clientId: process.env.NUXT_GITLAB_CLIENT_ID,
      clientSecret: process.env.NUXT_GITLAB_CLIENT_SECRET
    },
    public: {
      authJs: {
        baseUrl: process.env.NUXT_AUTH_URL,
        verifyClientOnEveryRequest: true
      },
      gitlab: {
        baseUrl: process.env.NUXT_PUBLIC_GITLAB_BASE_URL
      }
    }
  }
})
