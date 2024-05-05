<template>
  <div>redirected</div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: 'auth',
  auth: { guestRedirectTo: '/login' }
})
</script>
