// https://nuxt.com/docs/api/configuration/nuxt-config
import {defineNuxtConfig} from 'nuxt/config'

export default defineNuxtConfig({
  css: ["~/assets/styles/main.sass"],
  modules: ['@pinia/nuxt'],
  devtools: {enabled: false},
  app: {
    //baseURL: '/movie-actors',
    head: {
      link: [
        {rel: "stylesheet", href: "app.css"},
        {rel: "icon", type: "image/png", href: "favicon/favicon.ico"},
        {
          rel: "apple-touch-icon",
          sizes: "180x180",
          href: "favicon/apple-touch-icon-180x180.png"
        }
      ],
    }
  },
  routeRules: {
    '/**/**': {swr: true}
  }

})
