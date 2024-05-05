import {
  defineNuxtModule,
  createResolver,
  installModule,
  addComponentsDir,
  addImportsDir,
  addRouteMiddleware,
  addServerScanDir
} from '@nuxt/kit'

export default defineNuxtModule({
  meta: {
    name: 'nuxt-auth',
    configKey: 'auth',
    compatibility: { nuxt: '^3.0.0' },
    description: 'Internal Nuxt module to integrate AuthJS with Nuxt projects.',
    github: 'https://github.com/nextauthjs/next-auth',
    website: 'https://authjs.dev/'
  },
  async setup(_, nuxt) {
    nuxt.options.runtimeConfig.auth = {
      secret: process.env.NUXT_AUTH_SECRET!
    }
    nuxt.options.runtimeConfig.gitlab = {
      clientId: process.env.NUXT_GITLAB_CLIENT_ID!,
      clientSecret: process.env.NUXT_GITLAB_CLIENT_SECRET!
    }
    nuxt.options.runtimeConfig.public.auth = {
      mock: process.env.NUXT_PUBLIC_AUTH_MOCK!,
      baseUrl: process.env.NUXT_AUTH_URL!,
      verifyClientOnEveryRequest: true
    }
    nuxt.options.runtimeConfig.public.gitlab = {
      baseUrl: process.env.NUXT_PUBLIC_GITLAB_BASE_URL!
    }

    await installModule('@hebilicious/authjs-nuxt')
    const { resolve } = createResolver(import.meta.url)
    await addComponentsDir({
      path: resolve('./runtime/components')
    })
    addImportsDir(resolve('./runtime/composables'))
    addRouteMiddleware({
      name: 'authRedirect',
      path: resolve('./runtime/middleware/authRedirectMiddleware.global'),
      global: true
    })
    addServerScanDir(resolve('./runtime/server'))
  }
})
