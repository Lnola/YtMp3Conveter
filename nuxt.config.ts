// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  typescript: {
    shim: false,
  },
  devtools: {
    enabled: false,
  },
  modules: ['@nuxtjs/tailwindcss', '@vueuse/nuxt'],
  components: ['~/components', '~/components/common'],
});
