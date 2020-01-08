import colors from 'vuetify/es5/util/colors'

export default {
  mode: 'universal',
  pwa: {
	manifest: {
    name: 'PLAYWORLD.ID',
    short_name: 'PLAYWORLD',
		lang: 'id'
	}
  },
  /*
  ** Headers of the page
  */
  head: {
    titleTemplate: '%s - Playworld',
    title: 'Baca Artikelnya, Kumpulin Poinnya, Dapetin Hadiahnya! - Playworld',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'theme-color', content: '#FF80AB' },
      { name: 'apple-mobile-web-app-capable', content: 'yes' },
      { name: 'apple-mobile-web-app-status-bar-style', content: '#FF80AB' },
      { hid: 'description', name: 'description', content: 'Baca Artikelnya, Kumpulin Poinnya, Dapetin Hadiahnya!' }
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
    { src: '~/plugins/ga', mode: 'client' },
    { src: '~/plugins/vue-google-adsense', ssr: false }
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
    // '@nuxtjs/google-adsense',
    '@nuxtjs/google-gtag',
    '@nuxtjs/robots',
    '@nuxtjs/sitemap'
  ],

  /**
   * Google Adsense
   */
  // 'google-adsense': {
  //   id: 'ca-pub-6581994114503986'
  // },

  /**
   * Robots.txt
   */
  robots: {
    UserAgent: '*',
    Disallow: ''
  },

  /**
   * Sitemap
   */
  sitemap: {
    // custom configuration
    defaults: {
      changefreq: 'daily',
      priority: 1,
      lastmod: new Date(),
      lastmodrealtime: true
    },
    xmlNs: 'xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"',
    path: '/sitemap.xml',
    hostname: 'https://m.playworld.id'
  },

  /**
   * Google Tag
   */
  'google-gtag': {
    id: 'UA-75254826-3',
    config: {
      anonymize_ip: true, // anonymize IP
      send_page_view: true, // might be necessary to avoid duplicated page track on page reload
    },
    debug: false, // enable to track in dev mode
    disableAutoPageTrack: false, // disable if you don't want to track each page route with router.afterEach(...).
  },

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
