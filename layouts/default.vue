<template>
	<v-app :class="[drawer ? 'open' : 'closed']">
		<v-sheet>
			<v-app-bar
				v-if="
					wowtab != 4 &&
					wowtab != 1 &&
					$route.name != 'cat-subcat-articleslug' &&
					$route.name != 'purchase' &&
					$route.name != 'member-daily-limit' &&
					$route.name != 'member-purchase-daily' &&
					!$route.name.includes('sing')
				"
				dark
				color="dark"
				flat
				fixed
				tile
				class="main-app-bar"
			>
				<!-- <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon> -->
				<template
					v-if="$route.name != 'index' && $route.name != 'tukarpoin'"
				>
					<v-btn @click="historyBack()" small icon>
						<v-icon>mdi-chevron-left</v-icon>
					</v-btn>
					<div class="flex-grow-1"></div>
				</template>
				<template v-else>
					<template
						v-if="wowtab == 2 && $store.state.storehelpStep > 1"
					>
						<v-btn @click="helpBack()" small icon>
							<v-icon>mdi-chevron-left</v-icon>
						</v-btn>
						<div class="flex-grow-1"></div>
					</template>
					<template
						v-else-if="
							wowtab == 3 && $store.state.storehelpStepRewards > 1
						"
					>
						<v-btn @click="reWardsHelpBack()" small icon>
							<v-icon>mdi-chevron-left</v-icon>
						</v-btn>
						<div class="flex-grow-1"></div>
					</template>
					<template v-else>
						<v-btn small icon>&nbsp;</v-btn>
						<div class="flex-grow-1"></div>
					</template>
				</template>

				<v-toolbar-title
					@click="
						$router.push('/')
						drawer = false
					"
					class="px-0"
				>
					<!-- {{$route.name}} -->
					<template
						v-if="
							$route.name == 'member-pengaturan' ||
							$route.name == 'member-pengaturan-profil'
						"
					>
						<strong>Profile</strong>
					</template>
					<template
						v-else-if="
							$route.name == 'member-histori_penggunaan_poin'
						"
					>
						<strong>Total Points</strong>
					</template>
					<template v-else-if="$route.name == 'purchase'">
						<strong>KEANGGOTAAN VIP</strong>
					</template>
					<template
						v-else-if="$route.name == 'member-barang_yang_didapat'"
					>
						<strong>Rewards Status</strong>
					</template>
					<template
						v-else-if="
							$route.name == 'member-pengaturan-daftar-alamat'
						"
					>
						<strong>Address List for Rewards</strong>
					</template>
					<template
						v-else-if="
							$route.name == 'member-pengaturan-daftar-nomor'
						"
					>
						<strong>Phone List for Rewards</strong>
					</template>
					<template
						v-else-if="$route.name == 'member-status_transfer'"
					>
						<strong>Purchase Status via Bank</strong>
					</template>
					<template v-else-if="$route.name == 'member-kode-pw'">
						<strong>VIP Code from SMS</strong>
					</template>
					<template v-else-if="$route.name == 'bantuan'">
						<strong>Help Desk</strong>
					</template>
					<template v-else-if="$route.name == 'member-daily-limit'">
						<strong>VIP Daily Limit</strong>
					</template>
					<template
						v-else-if="
							$route.name == 'tukarpoin' ||
							$route.name == 'tukarpoin-redeem-detail'
						"
					>
						<strong>Tukar Poin</strong>
					</template>
					<template v-else-if="$route.name.includes('toppoin')">
						<strong>TOP POIN</strong>
					</template>
					<template
						v-else-if="
							$route.name.includes('member-status_transfer-sms')
						"
					>
						<strong>Purchase Status via SMS</strong>
					</template>
					<template
						v-else-if="$route.name.includes('member-mypoints')"
					>
						<strong>Total Points</strong>
					</template>
					<template
						v-else-if="
							$route.name.includes('member-purchase-daily')
						"
					>
						<strong>Purchase Daily</strong>
					</template>
					<template
						v-else-if="$route.name.includes('about-daily-limit')"
					>
						<strong>HELP</strong>
					</template>
					<template
						v-else-if="
							$route.name.includes('member-rewards-status')
						"
					>
						<strong>REWARDS</strong>
					</template>
					<template v-else-if="$route.name == 'member-otp'">
						<strong>Verifikasi Nomor Ponsel</strong>
					</template>
					<template v-else>
						<img
							v-if="$route.name != 'purchase' && wowtab == 0"
							:src="mainlogo"
							width="130"
							class="mainlogo"
						/>
						<strong
							v-else-if="$route.name != 'purchase' && wowtab == 1"
							>Tukar Poin</strong
						>
						<strong
							v-else-if="$route.name != 'purchase' && wowtab == 2"
							>Top Poin</strong
						>
						<strong
							v-else-if="$route.name != 'purchase' && wowtab == 3"
							>Program</strong
						>
						<strong
							v-else-if="$route.name != 'purchase' && wowtab == 4"
							>Akun</strong
						>
					</template>

					<!-- {{$route.name}} -->
				</v-toolbar-title>
				<div class="flex-grow-1"></div>

				<div
					@click="
						$router.push('/')
						clearStorage()
					"
					class="pr-1"
					v-if="$route.name != 'index'"
				>
					<img src="/img/peweicon.svg" width="20" />
				</div>

				<div v-else @click="opensearch = true" class="pr-1">
					<v-icon>mdi-magnify</v-icon>
				</div>
			</v-app-bar>

			<!-- CONTENT -->
			<v-main class="maincontent" :class="$route.name">
				<div
					class="base-app"
					:class="[wowtab == 0 ? 'home-show' : 'home-hide']"
				>
					<nuxt keep-alive />
					<div class="mb-5 pb-5"></div>
				</div>

				<!-- oooooooooooooooooooooooooooooooooooo
		    BOTTOM NAVIGATION
        ooooooooooooooooooooooooooooooooooooo-->
				<template v-if="$route.name == 'index'">
					<div
						:class="[wowtab == 1 ? 'd-block' : 'd-none']"
						style="margin-top: -56px"
					>
						<TukarPoin v-if="wowtab == 1" keep-alive />
					</div>
					<div :class="[wowtab == 2 ? 'd-block' : 'd-none']">
						<tantangan />
					</div>
					<div :class="[wowtab == 3 ? 'd-block' : 'd-none']">
						<tantangan />
					</div>
					<div :class="[wowtab == 4 ? 'd-block' : 'd-none']">
						<profil />
					</div>
				</template>
				<br />
				<br />
				<br />
				<v-bottom-navigation
					fixed
					dark
					grow
					color="white"
					background-color="#2C2C2D"
					v-model="wowtab"
					height="80"
					class="pwmenubottom"
					style="z-index: 14 !important"
					v-if="
						$route.name == 'index' ||
						$route.name == 'bantuan' ||
						$route.name == 'member-daily-limit' ||
						$route.name == 'member-purchase-daily' ||
						$route.name == 'about-daily-limit'
					"
				>
					<!-- v-if="$route.name != 'purchase' && $route.name != 'cat-subcat-articleslug' && $route.name != 'cat' && $route.name != 'tukarpoin'" -->
					<v-btn
						@click="
							$router.push('/')
							wowtab = 0
						"
					>
						<span class="text-11 d-inline-block mt-1">Feeds</span>
						<img
							:src="
								wowtab == 0
									? '/img/icons/nav-1-color.svg'
									: '/img/icons/nav-1-white.svg'
							"
							class="mb-1 d-block"
							width="20"
							height="20"
						/>
					</v-btn>
					<v-btn
						@click="
							$router.push('/?tab=1')
							wowtab = 1
						"
					>
						<span class="text-11 d-inline-block mt-1"
							>Tukar Poin</span
						>
						<img
							:src="
								wowtab == 1
									? '/img/icons/nav-2-color.svg'
									: '/img/icons/nav-2-white.svg'
							"
							class="mb-1 d-block"
							width="20"
							height="20"
						/>
					</v-btn>
					<v-btn
						@click="
							$router.push('/toppoin')
							wowtab = 2
						"
					>
						<span class="text-11 d-inline-block mt-1"
							>Top Poin</span
						>
						<img
							:src="
								wowtab == 2
									? '/img/icons/header/3-o.svg'
									: '/img/icons/header/3-w.svg'
							"
							class="mb-1 d-block"
							width="20"
							height="20"
						/>
					</v-btn>
					<v-btn
						@click="
							$router.push('/?tab=3')
							wowtab = 3
						"
					>
						<span class="text-11 d-inline-block mt-1">Program</span>
						<img
							:src="
								wowtab == 3
									? '/img/icons/nav-3-color.svg'
									: '/img/icons/nav-3-white.svg'
							"
							class="mb-1 d-block"
							width="20"
							height="20"
						/>
					</v-btn>
					<v-btn
						@click="
							$router.push('/?tab=4')
							wowtab = 4
						"
					>
						<span class="text-11 d-inline-block mt-1">Akun</span>
						<img
							:src="
								wowtab == 4
									? '/img/icons/nav-5-color.svg'
									: '/img/icons/nav-5-white.svg'
							"
							class="mb-1 d-block"
							width="20"
							height="20"
						/>
					</v-btn>
					<!-- <ShareButton2 v-if="$route.name == 'cat-subcat-articleslug'" />

          <v-btn>
            <span>Help</span>
            <img
              src="/img/icons/icon-contactus-orange.png"
              class="mb-1 d-block"
              width="20"
              height="20"
            />
          </v-btn>
          <v-btn>
            <span>Me</span>
            <img src="/img/icons/icon-profile-2.png" class="mb-1 d-block" width="20" height="20" />
          </v-btn>-->
				</v-bottom-navigation>
			</v-main>
			<!-- CONTENT -->
		</v-sheet>

		<!-- OVERLAY -->
		<v-overlay :value="overlay">
			<v-progress-circular
				color="green"
				indeterminate
				size="64"
			></v-progress-circular>
		</v-overlay>

		<!-- === DAILY POINT MODAL === -->
		<DrawerWelcome
			:dialogVisible="dailyPointModalVisible"
			@close="myDialogClose"
		/>

		<v-snackbar v-model="snackbar" :timeout="timeout" top>
			{{ responsemessage }}
			<v-btn color="primary" text icon @click="snackbar = false">
				<v-icon color="white">mdi-close-circle-outline</v-icon>
			</v-btn>
		</v-snackbar>
		<BuyVip :dialogVisible="buyVipDialogVisible" @close="myDialogClose" />

		<!-- ==== SEARCH BAR === -->
		<v-bottom-sheet v-model="opensearch">
			<v-sheet height="100%">
				<v-toolbar :elevation="0" style="border-top: 2px solid #fff">
					<!-- Arrow -->
					<v-btn
						dark
						icon
						tile
						style="border-right: 0px solid #717171"
						light
						@click="opensearch = false"
					>
						<v-icon>mdi-close</v-icon>
					</v-btn>

					<!-- Title -->
					<div class="flex-grow-1"></div>
					<v-toolbar-items>
						<v-btn
							dark
							text
							class="deep-orange--text pl-0"
							style="margin-left: -15px"
							>Search</v-btn
						>
					</v-toolbar-items>
					<div class="flex-grow-1"></div>
				</v-toolbar>
				<div class="devider-small" style="border-color: #000"></div>

				<div class="px-5 py-10">
					<v-text-field
						flat
						filled
						single-line
						solo
						hide-details
						prepend-inner-icon="mdi-magnify"
						background-color="#000"
						v-model="searchModel"
						@keyup.enter="validate()"
						label="Tulis Judul Artikel . . ."
						style="
							border: 0 !important;
							box-shadow: none !important;
						"
					></v-text-field>
					<v-btn
						@click="validate()"
						block
						large
						color="green"
						class="mt-3"
						>Submit</v-btn
					>
				</div>
			</v-sheet>
		</v-bottom-sheet>
	</v-app>
</template>

<script>
if (process.browser) {
	// import AddThis from 'vue-simple-addthis-share'
	// require('vue-simple-addthis-share')
}
import UserService from "@/services/UserService"
import * as mobile from "is-mobile"
import ArticleService from "../services/ArticleService"
import MenuService from "../services/MenuService"
import BuyVip from "@/components/modal/BuyVip"
import DrawerWelcome from "@/components/common/DrawerWelcome"
import profil from "@/components/profil"
import tantangan from "@/components/tantangan"
import TukarPoin from "@/components/TukarPoin/TukarPoin"

export default {
	name: "App",
	components: {
		BuyVip,
		DrawerWelcome,
		profil,
		tantangan,
		TukarPoin,
	},
	data() {
		return {
			wowtab: 0,
			facebook: process.env.facebook,
			instagram: process.env.instagram,
			twitter: process.env.twitter,
			youtube: process.env.youtube,
			youtubeUrl: process.env.youtubeUrl,
			mainlogo: "/pl-logo.png",
			drawer: null,
			opensearch: false,
			searchDialog: null,
			isLoggedIn: false,
			dialog: false,
			searchModel: null,
			overlay: false,
			articles: [],
			totalArticles: 0,
			userdata: [],
			mypoint: null,
			next: 2,
			snackbar: false,
			timeout: 3000,
			responsemessage: null,
			isMore: true,
			years: null,
			menus: [
				{
					id: 1,
					label: "Home",
					path: "/",
					icon: "mdi-home",
				},
				{
					id: 2,
					label: "Starx",
					path: "/starx",
					icon: "mdi-account-star",
				},
			],
			toolbarMenu: [
				{ name: "Trending", loc: "/" },
				// {name: 'Fakta', loc: '/fakta'},
				// { name: "Komik", loc: "/komik" },
				{ name: "Tukar Poin", loc: "/tukarpoin" },
				{ name: "Entertaiment", loc: "/viral" },
				{ name: "Musik", loc: "/lagu" },
				{ name: "Nonton", loc: "/nonton" },
				{ name: "Piknik", loc: "/piknik" },
				{ name: "Tekno", loc: "/tekno" },
				{ name: "Sport", loc: "/sport" },
				{ name: "Video", loc: "/video" },
			],
			memberMenu: [
				{ name: "Profile", loc: "/member/pengaturan/profil" },
				{
					name: "Poin History",
					loc: "/member/histori_penggunaan_poin",
				},
				{ name: "Rewards", loc: "/member/barang_yang_didapat" },
				{ name: "Transfer Status", loc: "/member/status_transfer" },
				{ name: "VIP Code", loc: "/member/kode-pw" },
				//{name: 'VIP', loc: '/member/beli_dengan_pulsa'},
			],
			starxMenu: [
				{ name: "Starx Band", loc: "/starx/band" },
				//{name: 'Notifikasi', loc: '/member/pengaturan/notifikasi'},
			],
			profileMenu: [
				{ name: "Profil Akun", loc: "/member/pengaturan/profil" },
				{
					name: "Daftar Alamat",
					loc: "/member/pengaturan/daftar-alamat",
				},
				{
					name: "Daftar Nomor",
					loc: "/member/pengaturan/daftar-nomor",
				},
				//{name: 'Notifikasi', loc: '/member/pengaturan/notifikasi'},
			],
			category: 5,
			categories: [
				{
					title: "TRENDING",
					link: "/",
				},
				{
					title: "Entertaiment",
					link: "/viral",
				},
				{
					title: "MUSIK",
					link: "/lagu",
				},
				{
					title: "NONTON",
					link: "/nonton",
				},
				{
					title: "PIKNIK",
					link: "/piknik",
				},
				{
					title: "TEKNO",
					link: "/tekno",
				},
				{
					title: "SPORT",
					link: "/sport",
				},
				{
					title: "VIDEO",
					link: "/video",
				},
			],
			premium: 2,
			highlights: null,
			premiums: [
				// {
				// 	title: 'FAKTA',
				// 	link: '/fakta'
				// },
				{
					title: "KOMIK",
					link: "/komik",
				},
			],
			program: 3,
			programs: [
				{
					title: "TUKAR POIN",
					link: "/tukarpoin",
				},
				// {
				// 	title: 'TOP POIN',
				// 	link: '/toppoin'
				// },
				// {
				//   title: "KOMPETISI",
				//   link: "/kompetisi"
				// }
			],
			contact: 2,
			contacts: [
				{
					title: "(021) 293 85 381",
					phone: "02129385381",
					isWhatsapp: false,
					subtitle: "(Business Hour)",
				},
				{
					title: "0815 1906 0929",
					phone: "6281519060929",
					isWhatsapp: true,
					subtitle: "(24 Hour)",
				},
			],
			contacttwo: 2,
			contactmail: 2,
			contactstwo: [
				{
					title: "0817 1717 3029",
					phone: "6281717173029",
					isPhone: true,
					subtitle: "(24 Hour)",
				},
			],
			contactsmail: [
				{
					title: "halo@pewefeed.com",
					mail: "halo@pewefeed.com",
					isSubtitle: false,
					subtitle: "(Official Email Address)",
				},
				{
					title: process.env.email,
					mail: process.env.email,
					isSubtitle: true,
					subtitle: "(Official Email Address)",
				},
			],
			bantuanMenu: null,
			share: {
				dataUrl: "",
				dataTitle: "",
				dataDescription: "",
			},
			singularDetail: null,
			buyVipDialogVisible: false,
			dailyPointModalVisible: false,
		}
	},
	computed: {
		notVipVisible: {
			get: function () {
				if (this.dialogVisible) {
					// Some dialog initialization code could be placed here
					// because it is called only when this.dialogVisible changes
					this.$emit("open")
				}

				return this.dialogVisible
			},
			set: function (value) {
				if (!value) {
					this.$emit("close")
				}
			},
		},
	},
	methods: {
		historyBack() {
			this.$router.back()
		},
		helpBack() {
			var toStep = parseFloat(this.$store.state.storehelpStep - 1)
			this.$store.commit("SET_HELP", toStep)
		},
		reWardsHelpBack() {
			var toStep = parseFloat(this.$store.state.storehelpStepRewards - 1)
			this.$store.commit("SET_HELP_REWARDS", toStep)
		},
		clearStorage() {
			localStorage.removeItem("tptab")
			this.wowtab = 0
		},
		logout() {
			let vm = this
			this.$auth.logout()
			localStorage.removeItem("loggedin")
			localStorage.removeItem("access-token")
			localStorage.removeItem("userdata")
			localStorage.removeItem("auth._token.local")
			localStorage.removeItem("auth.strategy")
			localStorage.removeItem("useres")
			this.isLoggedIn = false
			this.isLogin()
			// if (window.location.pathname == '/member/login') {
			// 	window.location.href = '/'
			// } else {
			// 	window.location.href = window.location.pathname
			// }
			this.$router.push("/")
		},
		isLogin() {
			return this.isLoggedIn
		},
		isUserdata() {
			return this.$auth.user
		},
		fetchUser() {
			if (localStorage.getItem("loggedin")) {
				if (this.$auth.user) {
					var useres = localStorage.getItem("userdata")
					// //console.log(JSON.parse(useres))
					// this.$auth.fetchUser();
					if (useres != null) {
						let userdata = JSON.parse(useres)
						let mypoint = userdata.point_total
					}

					if (
						window.location.pathname !=
						"/member/histori_penggunaan_poin"
					) {
						this.fetchDaily()
					}
				} else {
					this.isLoggedIn = false
					this.isLogin()
				}
			} else {
				this.$auth.logout()
				localStorage.removeItem("loggedin")
				localStorage.removeItem("access-token")
				localStorage.removeItem("userdata")
				localStorage.removeItem("auth._token.local")
				localStorage.removeItem("auth.strategy")
				localStorage.removeItem("useres")
			}
		},
		/* Validasi Form */
		validate() {
			if (this.searchModel) {
				this.search()
			} else {
				this.snackbar = true
				this.responsemessage = "Mohon Isi Kolom Pencarian"
			}
		},
		search() {
			const keywords = this.slugify(this.searchModel)
			this.searchDialog = false
			this.searchModel = null
			this.$router.push("/search/" + keywords)
			this.opensearch = false
		},
		slugify(text) {
			return text
				.toString()
				.toLowerCase()
				.replace(/\s+/g, "-") // Replace spaces with -
				.replace(/[^\w\-]+/g, "") // Remove all non-word chars
				.replace(/\-\-+/g, "-") // Replace multiple - with single -
				.replace(/^-+/, "") // Trim - from start of text
				.replace(/-+$/, "") // Trim - from end of text
		},
		closeSearch() {
			this.searchDialog = false
			this.searchModel = null
		},
		async fetchBantuan() {
			try {
				const res = await ArticleService.getBantuan()
				const data = res.data.data
				// //console.log(JSON.parse(JSON.stringify(data)));
				this.bantuanMenu = data
				//this.loading = false
			} catch (error) {
				console.log(error)
			}
		},
		async fetchHighlight() {
			try {
				const res = await MenuService.getHighlight()
				const data = res.data.data
				// //console.log("Highlights", JSON.parse(JSON.stringify(data)));
				this.highlights = data
			} catch (error) {
				console.log(error)
			}
		},
		myDialogClose() {
			this.buyVipDialogVisible = false
			this.dailyPointModalVisible = false
			// other code
		},
		buyVip() {
			// if not vip, show dialog
			this.notVipVisible = false
			this.buyVipDialogVisible = true
		},
		async fetchDaily() {
			let vm = this

			try {
				const res = await UserService.checkDailyPoint()
				const data = res.data.get_point
				// //console.log(JSON.parse(JSON.stringify(data)));
				if (data) {
					this.dailyPointModalVisible = true
				} else {
					this.dailyPointModalVisible = false
				}
				//this.loading = false
			} catch (error) {
				console.log(error)
				this.$auth.logout()
				localStorage.removeItem("loggedin")
				localStorage.removeItem("access-token")
				localStorage.removeItem("userdata")
				localStorage.removeItem("auth._token.local")
				localStorage.removeItem("auth.strategy")
				localStorage.removeItem("useres")
			}
		},
		async generateDaily() {
			let vm = this

			try {
				const res = await UserService.generateDailyPoint(null)
				this.fetchDaily()
				//this.loading = false
			} catch (error) {
				console.log(error)
			}
		},
	},
	created() {
		//console.log(this.$router.currentRoute.query["tab"])
		if (this.$router.currentRoute.query["tab"]) {
			this.wowtab = parseInt(this.$router.currentRoute.query["tab"])
		}
	},
	mounted() {
		if (localStorage.getItem("loggedin")) {
			this.generateDaily()
			this.fetchDaily()
		}
		if (localStorage.getItem("sing_to_login")) {
			localStorage.removeItem("sing_to_login")
		}
		if (this.$router.currentRoute.query["tab"]) {
			this.wowtab = parseInt(this.$router.currentRoute.query["tab"])
		}
		this.isLogin()
		//this.fetchBantuan();
		//this.fetchHighlight();
		this.years = new Date().getFullYear()
		var isMobile = mobile()
		// if (!isMobile) {
		//   var mobileUrl = window.location.href;
		//   var desktopUrl = mobileUrl.replace("://m.", "://");
		//   if (location.host == "m." + process.env.domainTitle.toLowerCase()) {
		//     window.location.href = desktopUrl;
		//   } else {
		//     ////console.log("desktop version");
		//   }
		// } else {
		//   ////console.log("mobile version");
		// }
		if (
			this.$route.name == "member-daily-limit" ||
			this.$route.name == "member-purchase-daily" ||
			this.$route.name == "about-daily-limit" ||
			this.$route.name == "purchase"
		) {
			this.wowtab = 4
		} else if (this.$route.name == "tukarpoin-redeem-detail") {
			this.wowtab = 1
		}
	},
	watch: {
		$route(to, from) {
			let vm = this
			this.fetchUser()

			//console.log('to:', to);
			if (to.name != "index") {
				this.wowtab = 0
			} else if (to.name == "index") {
				this.wowtab = parseInt(this.$router.currentRoute.query["tab"])
					? parseInt(this.$router.currentRoute.query["tab"])
					: 0
			}

			if (from.name == "auth-callback" || from.name == "member-otp") {
				this.wowtab = 4
				this.fetchDaily()
			}
			if (
				from.name == "member-barang_yang_didapat" ||
				from.name == "member-pengaturan-daftar-nomor"
			) {
				//console.log("dari rewards");
				this.$bus.$emit("profilestep", 2)
			}
		},
	},
}
</script>
