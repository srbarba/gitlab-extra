<template>
  <v-btn
    icon="$themeLightDark"
    :class="$slots['app-bar-append-after'] ? 'mr-2' : undefined"
    :disabled="!isMounted"
    @click="toggleTheme"
  ></v-btn>
</template>

<script setup lang="ts">
import { useTheme } from 'vuetify'
import { useDark, useMounted } from '@vueuse/core'

const isMounted = useMounted()
const theme = useTheme()

onMounted(() => {
  theme.global.name.value = useDark().value ? 'dark' : 'light'
})

function toggleTheme() {
  useDark().value = !theme.global.current.value.dark
  theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark'
}
</script>
