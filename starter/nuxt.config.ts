import { defineNuxtConfig } from 'nuxt'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  modules: [
    '@nuxtjs/strapi',
    '@nuxtjs/tailwindcss',
    'nuxt-lodash',
    '@nuxtjs/partytown',
    '@nuxtjs/i18n'
  ],
  strapi: {
    url: process.env.STRAPI_URL,
    prefix: '/api',
    version: 'v4',
    cookie: {}
  },
  publicRuntimeConfig: {
    STRAPI_PREVIEW_SECRET: process.env.STRAPI_PREVIEW_SECRET
  },
  build: {
    transpile: [
      '@headlessui/vue',
      '@heroicons/vue'
    ],
    // analyze: {
    //   filename: 'stats.html',
    //   open: true
    // }
  },
  vue: {
    compilerOptions: {
      isCustomElement: tag => tag.includes('upm-dac'),
    }
  },
  meta: {
    script: [
      {
        hid: 'gtm',
        innerHTML: `window.dataLayer = window.dataLayer || [];`,
        type: 'text/javascript'
      }
    ]
  },
  i18n: {
    locales: ['en', 'af'],
    defaultLocale: 'en',
    strategy: 'prefix_except_default',
    // vueI18n: {
    //   messages: {
    //     en: {
    //       welcome: 'Welcome'
    //     },
    //     af: {
    //       welcome: 'African Welcome'
    //     }
    //   }
    // }
  }//,
  // compilerOptions: {
  //   "types": [
  //     "@nuxt/types",
  //     "@nuxtjs/i18n",
  //   ]
  // }
})
