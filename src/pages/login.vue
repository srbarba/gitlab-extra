<template>
  <v-container class="fill-height">
    <v-row justify="center">
      <v-col style="max-width: 620px">
        <v-card outlined class="mb-16">
          <v-card-title class="text-center">Login</v-card-title>
          <v-container>
            <v-btn
              block
              color="primary"
              :disabled="!isMounted"
              @click="login('gitlab')"
            >
              <GitlabLogo />
              <div>Login with Gitlab</div>
            </v-btn>
            <v-btn
              v-if="authMock"
              class="mt-4"
              block
              color="secondary"
              :disabled="!isMounted"
              @click="login('credentials')"
            >
              <v-icon class="mr-2">mdi-account</v-icon>
              Login with credentials
            </v-btn>
          </v-container>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { useMounted } from '@vueuse/core'

definePageMeta({
  layout: 'base',
  middleware: 'guest-only',
  auth: { authenticatedRedirectTo: '/' }
})

const isMounted = useMounted()
const { login } = useAuthService()
const {
  public: {
    auth: { mock: authMock }
  }
} = useRuntimeConfig()
</script>
