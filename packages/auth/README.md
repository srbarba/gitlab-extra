# nuxt-auth

Integrate AuthJS with Gitlab + Mock authentication in Nuxt projects.

## Quick Setup

1. Add `nuxt-auth` to the `modules` section of `nuxt.config.ts`

```ts
export default defineNuxtConfig({
  modules: ['./packages/auth/index.ts']
})
```

## Env variables

| Variable                    | Description                         | Default               |
| --------------------------- | ----------------------------------- | --------------------- |
| NUXT_AUTH_URL               | App URL, required to configure CORS | http://localhost:3000 |
| NUXT_AUTH_SECRET            | AuthJS secret                       |
| NUXT_PUBLIC_AUTH_MOCK       | Enable mock authentication          | false                 |
| NUXT_PUBLIC_GITLAB_BASE_URL | Gitlab base URL                     | https://gitlab.com    |
| NUXT_GITLAB_CLIENT_ID       | Gitlab client ID                    | UUID                  |
| NUXT_GITLAB_CLIENT_SECRET   | Gitlab client secret                | UUID                  |
