// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  css: ["~/assets/styles/main.sass"],
  modules: [ '@pinia/nuxt' ],
  devtools: {enabled: true},
  // experimental: {
  //   payloadExtraction: false
  // }

})
