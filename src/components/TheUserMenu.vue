<template>
  <v-menu v-if="user">
    <template #activator="{ props }">
      <v-btn v-bind="props" icon :disabled="!isMounted">
        <span class="d-sr-only">User menu</span>
        <v-icon>$account</v-icon>
      </v-btn>
    </template>
    <v-card min-width="300">
      <v-list>
        <v-list-item
          :prepend-avatar="user.image || undefined"
          :prepend-icon="user.image ? undefined : 'mdi-account'"
          :subtitle="user.email!"
          :title="user.name!"
        />
      </v-list>

      <v-divider></v-divider>
      <v-list role="menu">
        <v-list-item role="menuitem" @click="logout">Logout</v-list-item>
      </v-list>
    </v-card>
  </v-menu>
</template>

<script setup lang="ts">
import { useMounted } from '@vueuse/core'
const isMounted = useMounted()
const { user, logout } = useAuthService()
</script>
