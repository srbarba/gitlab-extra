<template>
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
</template>

<script setup lang="ts">
const drawer = defineModel('drawer', {
  type: Boolean,
  default: false
})

const {
  public: {
    gitlab: { baseUrl }
  }
} = useRuntimeConfig()

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
