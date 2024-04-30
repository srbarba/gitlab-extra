import { defineNuxtPlugin, useRuntimeConfig } from '#app'
import { createVuetify } from 'vuetify'
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/lib/styles/main.sass'

export default defineNuxtPlugin((nuxtApp) => {
  const {
    public: { vuetify: vuetifyOptions }
  } = useRuntimeConfig()

  const vuetify = createVuetify(vuetifyOptions)

  nuxtApp.vueApp.use(vuetify)
})
