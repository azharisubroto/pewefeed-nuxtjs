<template>
	<div class="helppage bg-dark fill-height">
		<client-only>
			<v-stepper class="stepperHelp" v-model="helpStep">
				<v-stepper-items>
					<v-stepper-content class="pa-0" back step="1">
						<!-- BANTUAN -->
						<template v-for="(bantuan, i) in bantuanMenu">
							<div
								v-if="i == 0"
								class="devider-small my-4"
								:key="'asdas-' + i"
							></div>
							<div cols="12" class="px-4" :key="'cat-' + i">
								<a
									class="pl-0"
									text
									dark
									:id="'help-' + bantuan.id"
									@click="
										helpStep = 2
										secondahelpdata = bantuan.submenu
									"
									>{{ bantuan.title }}</a
								>
							</div>
							<div
								class="devider-small my-4"
								:key="'cats-' + i"
							></div>
						</template>
						<!-- CONTACT -->
						<div
							class="contaclist mt-8"
							style="background: #1c1c1c"
						>
							<h4 class="deep-orange--text text-20 px-4">
								Contact
							</h4>
							<div class="devider-small mt-4 mb-2"></div>
							<v-row class="pt-0">
								<v-col cols="12">
									<v-list
										two-line
										color="#1c1c1c"
										dark
										class="pt-0"
									>
										<v-list-item-group v-model="contact">
											<v-list-item
												class="pl-0 pr-0"
												v-for="(con, i) in contacts"
												:key="'consdf-' + i"
											>
												<v-list-item-content
													class="pt-0 menu"
												>
													<v-list-item-title
														class="px-4"
													>
														<a
															v-if="
																con.isWhatsapp
															"
															style="
																text-decoration: none;
																color: #fff;
																font-size: 18px;
															"
															target="blank"
															:href="
																'https://api.whatsapp.com/send?phone=' +
																con.phone
															"
															>{{ con.title }}</a
														>
														<a
															v-else
															style="
																text-decoration: none;
																color: #fff;
																font-size: 18px;
															"
															:href="
																'tel:' +
																con.phone
															"
															>{{ con.title }}</a
														>
													</v-list-item-title>
													<v-list-item-subtitle
														v-html="con.subtitle"
														class="px-4"
													></v-list-item-subtitle>
													<div
														class="devider-small mt-4"
													></div>
												</v-list-item-content>
											</v-list-item>
										</v-list-item-group>
									</v-list>
									<v-list
										two-line
										color="#1c1c1c"
										dark
										class="pt-0 pb-0"
									>
										<v-list-item-group v-model="contacttwo">
											<v-list-item
												class="pl-0 pr-0"
												v-for="(con, i) in contactstwo"
												:key="'cons-' + i"
											>
												<v-list-item-content
													class="pt-0 menu"
												>
													<v-list-item-title
														class="px-4"
													>
														<a
															v-if="con.isPhone"
															style="
																text-decoration: none;
																color: #fff;
																font-size: 18px;
															"
															target="blank"
															:href="
																'https://api.whatsapp.com/send?phone=' +
																con.phone
															"
															>{{ con.title }}</a
														>
													</v-list-item-title>
													<v-list-item-subtitle
														v-html="con.subtitle"
														class="px-4"
													></v-list-item-subtitle>
													<div
														class="devider-small mt-4"
													></div>
												</v-list-item-content>
											</v-list-item>
										</v-list-item-group>
									</v-list>
									<v-list
										two-line
										color="#1c1c1c"
										dark
										class="pt-0"
									>
										<v-list-item-group
											v-model="contactmail"
										>
											<v-list-item
												class="pl-0 pr-0"
												v-for="(con, i) in contactsmail"
												:key="'email-' + i"
											>
												<v-list-item-content
													class="pt-0 px-4 menu"
												>
													<v-list-item-title>
														<a
															v-if="!con.isPhone"
															style="
																text-decoration: none;
																color: #fff;
																font-size: 18px;
															"
															:href="
																'mailto:' +
																con.mail
															"
															>{{ con.title }}</a
														>
													</v-list-item-title>
													<v-list-item-subtitle
														v-html="con.subtitle"
													></v-list-item-subtitle>
												</v-list-item-content>
												<div
													class="devider-small mt-4"
												></div>
											</v-list-item>
										</v-list-item-group>
									</v-list>
									<div class="devider-small mt-0"></div>
								</v-col>
							</v-row>
						</div>

						<!-- SOCIAL -->
						<v-container class="justify-space-between mt-8 px-0">
							<h4 class="deep-orange--text text-20 mb-4 px-4">
								Social Media
							</h4>
							<div class="devider-small"></div>
							<a
								class="d-block py-5 px-4"
								text
								target="blank"
								style="text-decoration: none"
								:href="'https://www.facebook.com/' + facebook"
							>
								<img
									src="/img/icons/icon-facebook.png"
									width="20"
									class="mr-2"
									style="vertical-align: middle"
									alt
								/>
								pewefeeds
							</a>
							<div class="devider-small"></div>
							<a
								class="d-block py-5 px-4"
								text
								target="blank"
								style="text-decoration: none"
								:href="'https://twitter.com/' + twitter"
							>
								<img
									src="/img/icons/icon-twitter.png"
									width="20"
									class="mr-2"
									style="vertical-align: middle"
									alt
								/>
								pewefeed
							</a>
							<div class="devider-small"></div>
							<a
								class="d-block py-5 px-4"
								text
								target="blank"
								style="text-decoration: none"
								:href="'https://www.instagram.com/' + instagram"
							>
								<img
									src="/img/icons/icon-instagram.png"
									width="20"
									class="mr-2"
									style="vertical-align: middle"
									alt
								/>
								pewefeed
							</a>
							<div class="devider-small"></div>
							<a
								class="d-block py-5 px-4"
								text
								target="blank"
								style="text-decoration: none"
								:href="youtubeUrl"
							>
								<img
									src="/img/icons/icon-youtube.png"
									width="20"
									class="mr-2"
									style="vertical-align: middle"
									alt
								/>
								pewefeed
							</a>
							<div class="devider-small"></div>
						</v-container>
					</v-stepper-content>

					<v-stepper-content class="pa-0" step="2">
						<template
							v-if="
								secondahelpdata != null &&
								secondahelpdata.length > 0
							"
						>
							<template v-for="(bantuan, i) in secondahelpdata">
								<div
									v-if="i == 0"
									class="devider-small my-4"
									:key="'asdas-' + i"
								></div>
								<div cols="12" class="px-4" :key="'cat-' + i">
									<a
										class="pl-0"
										text
										dark
										:id="'help-' + bantuan.id"
										@click="
											helpStep = 3
											thirdhelpdata = bantuan.content
											thirdhelptitle = bantuan.title
										"
										>{{ bantuan.title }}</a
									>
								</div>
								<div
									class="devider-small my-4"
									:key="'cats-' + i"
								></div>
							</template>
						</template>
						<template v-else>
							<div class="pa-10 text-center">
								Konten tidak tersedia
							</div>
						</template>
					</v-stepper-content>

					<v-stepper-content class="pa-0" step="3">
						<template v-if="thirdhelpdata != null">
							<v-container>
								<h4 class="deep-orange--text text-20 mb-4 mt-5">
									{{ thirdhelptitle }}
								</h4>
								<div v-html="thirdhelpdata"></div>
							</v-container>
						</template>
						<template v-else>
							<div class="pa-10 text-center">
								Konten tidak tersedia
							</div>
						</template>
					</v-stepper-content>
				</v-stepper-items>
			</v-stepper>
		</client-only>
	</div>
</template>

<script>
import MenuService from "@/services/MenuService"
import ArticleService from "@/services/ArticleService"
import { mapState } from "vuex"
export default {
	name: "help",
	data() {
		return {
			helpStep: 1,
			secondahelpdata: null,
			thirdhelptitle: null,
			thirdhelpdata: null,
			facebook: process.env.facebook,
			instagram: process.env.instagram,
			twitter: process.env.twitter,
			youtube: process.env.youtube,
			youtubeUrl: process.env.youtubeUrl,
			bantuanMenu: null,
			contact: 2,
			contacts: [
				{
					title: "(021) 293 85 381",
					phone: "02129385381",
					isWhatsapp: false,
					subtitle: "(Mon-Fri 09:00 - 18:00)",
				},
				{
					title: "0815 1906 0929",
					phone: "6281519060929",
					isWhatsapp: true,
					subtitle: "(WhatsApp only - 24 Hour)",
				},
			],
			contacttwo: 2,
			contactmail: 2,
			contactstwo: [
				{
					title: "0817 1717 3029",
					phone: "6281717173029",
					isPhone: true,
					subtitle: "(WhatsApp only - 24 Hour)",
				},
			],
			contactsmail: [
				{
					title: "halo@pewefeed.com",
					mail: "halo@pewefeed.com",
					isSubtitle: false,
					subtitle: "(Official Email Address)",
				},
				// {
				//   title: process.env.email,
				//   mail: process.env.email,
				//   isSubtitle: true,
				//   subtitle: "(Official Email Address)"
				// }
			],
		}
	},
	computed: mapState(["storehelpStep"]),
	created() {
		this.unsubscribe = this.$store.subscribe((mutation, state) => {
			////console.log("subscribed");
		})
	},
	beforeDestroy() {
		this.unsubscribe()
	},
	watch: {
		helpStep(val) {
			this.$store.commit("SET_HELP", val)
		},
		storehelpStep(newValue, oldValue) {
			this.helpStep = newValue
		},
	},
	methods: {
		async fetchBantuan() {
			try {
				const res = await ArticleService.getBantuan()
				const data = res.data.data
				// //console.log(JSON.parse(JSON.stringify(data)));
				this.bantuanMenu = data
				setTimeout(() => {
					if (this.$router.currentRoute.query["tab"]) {
						document.getElementById("help-2").click()
						setTimeout(() => {
							//document.getElementById("help-73").click();
						}, 100)
					}
				}, 2000)
				//this.loading = false
			} catch (error) {
				console.log(error)
			}
		},
	},
	mounted() {
		this.fetchBantuan()
	},
}
</script>
<style lang="scss">
.fill-height {
	min-height: 100vh;
}
.helppage {
	.theme--dark.v-list {
		background: #1c1c1c !important;
	}
}
.bg-dark {
	.devider-small {
		opacity: 0.3;
	}
}
.contaclist {
	.v-list-item__title {
		font-size: 18px !important;
	}
	.v-list-item--link:before {
		display: none !important;
	}
	.v-ripple__container {
		display: none !important;
	}
}
.stepperHelp {
	&.theme--dark.v-stepper {
		background: transparent !important;
		box-shadow: none !important;
	}
}
</style>
