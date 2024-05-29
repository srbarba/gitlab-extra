<template>
  <v-container>Index</v-container>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: 'auth',
  auth: { guestRedirectTo: '/login' }
})
</script>
