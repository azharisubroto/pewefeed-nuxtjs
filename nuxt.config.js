import colors from 'vuetify/es5/util/colors'

export default {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    titleTemplate: '%s - Playworld',
    title: 'Baca Artikelnya, Kumpulin Poinnya, Dapetin Hadiahnya! - Playworld',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Sumber konten VIRAL dari beragam informasi seperti Film, Musik, Olahraga, Travel, Teknologi. Tidak hanya itu, PLAYWORLD.ID memberikan insentif dengan pengunjungnya dalam bentuk POIN. POIN bisa dikumpulkan atas interaksi memberikan Komentar, menjawab Quiz dan memberikan Star (Voting). Jumlah POIN yang cukup kemudian bisa ditukar dengan Reward' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    { src: '~/plugins/flickity', ssr: false },
    { src: '~/plugins/oauthio-web', ssr: false },
    { src: '~/plugins/vue2-dropzone', ssr: false },
    { src: '~/plugins/facebook-login', ssr: false },
    { src: '~/plugins/recaptcha', ssr: false },
    { src: '~/plugins/google-login', ssr: false },
    { src: '~/plugins/moment', ssr: false },
    { src: '~/plugins/bus' },
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    '@nuxtjs/vuetify',
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    '@nuxtjs/recaptcha',
    '@nuxtjs/onesignal',
  ],

  /**
   * One Signal Notification
   */
  // Options
  oneSignal: {
    init: {
      appId: 'e5475afb-743d-40c9-9d0a-f0fda91654c9',
      allowLocalhostAsSecureOrigin: true,
      welcomeNotification: {
        disable: true
      }
    }
  },

  /**
   * Recaptcha Configuration
   */
  recaptcha: {
    hideBadge: true, // Hide badge element
    version: 2,     // Version
    siteKey: '6Ld8FDgUAAAAADGSSZayN8W2cTlJTmIGcv0NEPln' // Site key for requests
  },


  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
  },
  /*
  ** vuetify module configuration
  ** https://github.com/nuxt-community/vuetify-module
  */
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    }
  }
}
