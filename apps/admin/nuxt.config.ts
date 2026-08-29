// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  extends: ['../../layers/app'],
  components: [
    {
      path: "~/components",
      pathPrefix: false,
    },
  ],
  devServer: { port: 3000 },
})
