<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup>
import { useTheme } from 'vuetify'

useTheme().global.name.value = 'dark'
</script>
