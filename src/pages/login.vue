<template>
  <v-container class="fill-height">
    <v-row justify="center">
      <v-col style="max-width: 620px">
        <v-card outlined class="mb-16">
          <v-card-title class="text-center">Login</v-card-title>
          <v-container>
            <v-btn block color="primary" @click="signIn('gitlab')">
              <GitlabLogo />
              <div>Login with Gitlab</div>
            </v-btn>
            <v-btn
              class="mt-4"
              block
              color="secondary"
              @click="signIn('credentials')"
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
definePageMeta({
  layout: 'base',
  middleware: 'guest-only',
  auth: { authenticatedRedirectTo: '/' }
})

const { signIn } = useAuth()
</script>
