export default {
  target: 'static',

  head: {
    title: 'Biennial International Conference for the Craft Sciences',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  css: [],

  plugins: [
    { src: '~plugins/vue-js-toggle-button', mode: 'client' },
    { src: '~plugins/vue-masonry', mode: 'client' },
  ],

  components: true,

  // buildModules: [
  //   // https://go.nuxtjs.dev/eslint
  //   '@nuxtjs/eslint-module',
  // ],

  modules: ['@nuxtjs/axios'],

  axios: {},

  build: {},

  env: {
    API_BASE: process.env.API_BASE || '',
  },
}
