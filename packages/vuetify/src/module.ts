import type { VuetifyOptions } from 'vuetify'
import type { Options as VuetifyPluginOptions } from '@vuetify/loader-shared'
import { createResolver, defineNuxtModule, addPlugin } from '@nuxt/kit'
import viteVuetify from 'vite-plugin-vuetify'

export type VuetifyModuleOptions = VuetifyOptions & {
  loader?: VuetifyPluginOptions
}

declare module '@nuxt/schema' {
  interface NuxtConfig {
    vuetify?: VuetifyModuleOptions
  }
  interface NuxtOptions {
    vuetify?: VuetifyModuleOptions
  }
  interface PublicRuntimeConfig {
    vuetify: VuetifyOptions
  }
}

export default defineNuxtModule<VuetifyModuleOptions>({
  meta: {
    name: 'nuxt-vuetify',
    configKey: 'vuetify',
    compatibility: { nuxt: '^3.0.0' },
    description:
      'Internal Nuxt module to integrate Vuetify with Nuxt projects.',
    github: 'https://github.com/vuetifyjs/vuetify',
    website: 'https://vuetifyjs.com/en/getting-started/installation/'
  },
  defaults: {
    loader: {
      autoImport: true,
      styles: 'sass'
    }
  },
  setup(moduleOptions, nuxt) {
    const { resolve } = createResolver(import.meta.url)
    const { loader: loaderOptions, ...vuetifyOptions } = moduleOptions

    nuxt.options.runtimeConfig.public.vuetify = vuetifyOptions

    nuxt.options.build.transpile.push('vuetify')

    nuxt.hook('vite:extendConfig', (viteInlineConfig) => {
      viteInlineConfig.plugins = viteInlineConfig.plugins ?? []
      viteInlineConfig.plugins.push(viteVuetify(loaderOptions))
    })

    addPlugin(resolve('./runtime/plugin'))
  }
})
