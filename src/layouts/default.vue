<template>
  <BaseLayout>
    <template #app-bar-prepend>
      <v-app-bar-nav-icon
        variant="text"
        :disabled="!isMounted"
        @click.stop="drawer = !drawer"
      ></v-app-bar-nav-icon>
    </template>

    <template #app-bar-append-after>
      <TheUserMenu />
    </template>

    <slot />

    <template #footer-default> © gitlab-extra - v{{ pkg.version }} </template>

    <client-only>
      <TheNavigationDrawer v-model="drawer" />
    </client-only>
  </BaseLayout>
</template>

<script setup lang="ts">
import BaseLayout from './base.vue'
import pkg from '~~/package.json'
import { useMounted } from '@vueuse/core'

const isMounted = useMounted()

const drawer = ref(false)
</script>
