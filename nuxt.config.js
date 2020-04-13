import colors from 'vuetify/es5/util/colors'

export default {
  env: {
    baseUrl: process.env.BASE_URL || 'https://pewefeed.com/',
    mobileUrl: process.env.MOBILE_URL || 'https://m.pewefeed.com/',
    domainTitle: process.env.DOMAIN_TITLE || 'PEWEFEED.COM',
    title: process.env.TITLE || 'PEWEFEED',
    facebook: process.env.FACEBOOK || 'pewefeeds',
    instagram: process.env.INSTAGRAM || 'pewefeed',
    twitter: process.env.TWITTER || 'pewefeed',
    youtube: process.env.YOUTUBE || 'pewefeed',
    youtubeUrl: process.env.YOUTUBE_URL || 'https://www.youtube.com/channel/UCW7zo9pK4Vgd2xf68ayXlPw',
    email: process.env.EMAIL || 'halo@lagipewe.com',
  },
  // server: {
  //   host: '0.0.0.0',
  //   port: 8000
  // },
  mode: 'universal',
  pwa: {
	manifest: {
      name: 'PEWEFEED.COM',
      short_name: 'PEWEFEED',
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
      { name: 'theme-color', content: '#FF9800' },
      { name: 'apple-mobile-web-app-capable', content: 'yes' },
      { name: 'apple-mobile-web-app-status-bar-style', content: '#FF9800' },
      { hid: 'description', name: 'description', content: 'Baca Artikelnya, Kumpulin Poinnya, Dapetin Hadiahnya!' }
    ],
    link: [
		{ rel: 'icon', type: 'image/x-icon', href: '/favicon.png' }
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
    // '@nuxtjs/onesignal',
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
    hostname: 'https://m.pewefeed.com'
  },

  /**
   * Google Tag
   */
  'google-gtag': {
    id: 'UA-163238276-1',
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
  // oneSignal: {
  //   init: {
  //     appId: 'e5475afb-743d-40c9-9d0a-f0fda91654c9',
  //     allowLocalhostAsSecureOrigin: true,
  //     welcomeNotification: {
  //       disable: true
  //     }
  //   }
  // },

  /**
   * Recaptcha Configuration
   */
  recaptcha: {
    hideBadge: true, // Hide badge element
    version: 2,     // Version
    siteKey: '6Le1VugUAAAAAJsM8s6P8P4jbTKuS2IleefluH5Q' // Site key for requests
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
