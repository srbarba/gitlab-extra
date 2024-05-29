import { defineNuxtPlugin, useRuntimeConfig } from '#app'
import { createVuetify } from 'vuetify'
import 'vuetify/lib/styles/main.sass'
import { aliases, mdi } from 'vuetify/iconsets/mdi-svg'
import { mdiThemeLightDark, mdiAccount } from '@mdi/js'

export default defineNuxtPlugin((nuxtApp) => {
  const {
    public: { vuetify: vuetifyOptions }
  } = useRuntimeConfig()

  const vuetify = createVuetify({
    ...vuetifyOptions,
    icons: {
      defaultSet: 'mdi',
      aliases: {
        ...aliases,
        themeLightDark: mdiThemeLightDark,
        account: mdiAccount
      },
      sets: {
        mdi
      }
    }
  })

  nuxtApp.vueApp.use(vuetify)
})
