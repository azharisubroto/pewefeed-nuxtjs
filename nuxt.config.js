import colors from 'vuetify/es5/util/colors'

export default {
	// server: {
	// 	port: 8000, // default: 3000
	// 	host: '0.0.0.0', // default: localhost
	// },
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
			{ name: 'google-site-verification', content: 'GBGSbmO6dIV5P18M0oBdihBDH26dvWzYrvOulDlWVzw' },
			{ hid: 'description', name: 'description', content: 'Baca Artikelnya, Kumpulin Poinnya, Dapetin Hadiahnya!' }
		],
		// noscript: [
		// 	{
		// 		innerHTML: `
		// 			<img src="https://certify.alexametrics.com/atrk.gif?account=zT0Lu1hNdI20fn" style="display:none" height="1" width="1" alt="" />
		// 		`
		// 	}
		// ],
		// script: [
		// 	{
		// 		innerHTML: `
		// 			_atrk_opts = { atrk_acct:"zT0Lu1hNdI20fn", domain:"pewefeed.com",dynamic: true};
		// 			(function() { var as = document.createElement('script'); as.type = 'text/javascript'; as.async = true; as.src = "https://certify-js.alexametrics.com/atrk.js"; var s = document.getElementsByTagName('script')[0];s.parentNode.insertBefore(as, s); })();
		// 		`
		// 	}
		// ],
		// __dangerouslyDisableSanitizers: ['script'],
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
		'@nuxtjs/auth',
		'@nuxtjs/recaptcha',
		// '@nuxtjs/onesignal',
		// '@nuxtjs/google-adsense',
		'@nuxtjs/google-gtag',
		'@nuxtjs/robots',
		// '@nuxtjs/sitemap'
	],

	/* Auth */
	auth: {
		strategies: {
			local: {
				endpoints: {
					login: { url: 'https://s1.playworld.id/api/auth/login', method: 'post', propertyName: 'token' },
					logout: { url: 'https://s1.playworld.id/api/auth/logout', method: 'get' },
					user: { url: 'https://s1.playworld.id/api/member/get-single-member', method: 'get', propertyName: 'users' }
				},
				// tokenRequired: true,
				tokenType: 'Bearer'
				// autoFetchUser: true
			},
			redirect: {
				login: '/login',
				home: '/'
			}
		},
	},

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
	// sitemap: {
	// 	// custom configuration
	// 	defaults: {
	// 		changefreq: 'daily',
	// 		priority: 1,
	// 		lastmod: new Date(),
	// 		lastmodrealtime: true
	// 	},
	// 	xmlNs: 'xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"',
	// 	path: '/sitemap.xml',
	// 	hostname: 'https://m.pewefeed.com'
	// },

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
		siteKey: '6LcS3PoUAAAAAO-84uJ28tPawOCH882_Ph8uiVlB' // Site key for requests
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
		options: {
			customProperties: true,
		},
		theme: {
			dark: true,
			themes: {
				dark: {
					primary: colors.blue.darken2,
					accent: colors.grey.darken3,
					secondary: colors.amber.darken3,
					info: colors.teal.lighten1,
					warning: colors.amber.base,
					error: colors.deepOrange.accent4,
					success: colors.green.accent3,
					background: '#1d1d1d'
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
		extend(config, ctx) {
		}
	}
}
