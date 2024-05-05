<template>
  <BaseLayout>
    <template #app-bar-prepend>
      <v-app-bar-nav-icon
        variant="text"
        @click.stop="drawer = !drawer"
      ></v-app-bar-nav-icon>
    </template>

    <template #app-bar-append-after>
      <UserMenu />
    </template>

    <slot />

    <template #footer-default> © gitlab-extra - v{{ pkg.version }} </template>

    <client-only>
      <v-navigation-drawer
        v-model="drawer"
        :location="$vuetify.display.mobile ? 'bottom' : undefined"
        permanent
      >
        <v-list :items="items"></v-list>

        <template #append>
          <v-list>
            <v-list-item title="Go to gitlab" :href="baseUrl">
              <template #prepend>
                <GitlabLogo />
              </template>
            </v-list-item>
          </v-list>
        </template>
      </v-navigation-drawer>
    </client-only>
  </BaseLayout>
</template>

<script setup lang="ts">
import BaseLayout from './base.vue'
import UserMenu from './_partials/UserMenu.vue'
import pkg from '~~/package.json'

const {
  public: {
    gitlab: { baseUrl }
  }
} = useRuntimeConfig()
const drawer = ref(false)
const items = [
  {
    title: 'Home',
    value: 'home',
    props: {
      to: '/'
    }
  }
]
</script>
