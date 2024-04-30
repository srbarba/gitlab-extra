# nuxt-vuetify

Integrate Vuetify with Nuxt projects.

## Quick Setup

````

1. Add `nuxt-vuetify` to the `modules` section of `nuxt.config.ts`

```js
export default defineNuxtConfig({
  modules: ['./packages/nuxt-vuetify/src/module.ts'],
})
````

2. (Optional) Configure the module by adding `vuetify` key in the root of section of `nuxt.config.ts`

```js
export default defineNuxtConfig({
  ...
  vuetify: {
    ...
  },
  ...
})
```

That's it! You can now use Nuxt Vuetify in your Nuxt app ✨
