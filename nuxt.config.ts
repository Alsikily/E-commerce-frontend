export default defineNuxtConfig({
  devtools: { enabled: false },
  devServer: {
      host: '0.0.0.0',
      port: 3000
  },
  css: [
      // Sass
      "~/scss/resets.scss",
      "~/scss/main.scss",
      "~/scss/responsive.scss",
  ],
  modules: ['@pinia/nuxt', '@pinia-plugin-persistedstate/nuxt', '@nuxtjs/i18n'],
  i18n: {
      locales: [
        {
          code: "en-us",
          iso: "en-us",
          name: "english",
          file: "en-us.json"
        },
        {
          code: "ar-eg",
          iso: "ar-eg",
          name: "arabic",
          file: "ar-eg.json"
        },
      ],
      langDir: "locales",
      defaultLocale: "en-us",
      strategy: "prefix_and_default"
  },
  pinia: {
      autoImports: [
          ['defineStore', 'definePiniaStore'],
      ],
  },
  build: {
    transpile: ['pinia-plugin-persistedstate'],
  },
  nitro: {
    compressPublicAssets: true,
  },
})