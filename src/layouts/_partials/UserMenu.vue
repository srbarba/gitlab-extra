<template>
  <v-menu v-if="session?.user">
    <template #activator="{ props }">
      <v-btn v-bind="props" icon="mdi-account" />
    </template>

    <v-card min-width="300">
      <v-list>
        <v-list-item
          :prepend-avatar="session.user.image"
          :prepend-icon="session.user.image ? undefined : 'mdi-account'"
          :subtitle="session.user.email"
          :title="session.user.name"
        />
      </v-list>

      <v-divider></v-divider>
      <v-list>
        <v-list-item @click="signOut">Logout</v-list-item>
      </v-list>
    </v-card>
  </v-menu>
</template>

<script setup lang="ts">
const { session, signOut } = useAuth()
</script>
