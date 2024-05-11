<template>
  <v-app>
    <slot name="app-bar">
      <v-app-bar class="justify-end">
        <template #prepend>
          <slot name="app-bar-prepend" />
        </template>
        <template #default>
          <slot name="app-bar-default">
            <v-toolbar-title>Gitlab Extra</v-toolbar-title>
          </slot>
        </template>
        <template #append>
          <slot name="app-bar-append-before"></slot>
          <slot name="app-bar-append">
            <TheThemeSwitch />
          </slot>
          <slot name="app-bar-append-after"></slot>
        </template>
      </v-app-bar>
    </slot>
    <v-main style="--v-layout-top: 64px" fluid>
      <slot />
    </v-main>

    <slot name="footer">
      <v-footer v-if="$slots['footer-default']" class="flex-grow-0 pa-0">
        <v-card class="w-100 text-center rounded-0">
          <v-card-text>
            <slot name="footer-default"></slot>
          </v-card-text>
        </v-card>
      </v-footer>
    </slot>
  </v-app>
</template>
