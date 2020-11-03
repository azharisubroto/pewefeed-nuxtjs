<template>
	<div
		:class="[
			!isFlexible
				? 'v-btn v-btn--contained theme--dark v-size--default'
				: '',
		]"
	>
		<template v-if="isFlexible">
			<div @click="recaptchaDialogVisible = true"><slot></slot></div>
		</template>
		<template v-else>
			<span
				class="v-btn__content text-center"
				@click="recaptchaDialogVisible = true"
			>
				<span style="font-size: 10px !important">
					Share
					<br />
					<span>(+1 Poin)</span>
				</span>
				<img
					src="/img/icons/share-icon.svg"
					class="mb-1 d-block"
					width="20"
					height="20"
				/>
			</span>
		</template>
		<span>
			<v-bottom-sheet v-model="recaptchaDialogVisible">
				<v-sheet height="100%">
					<v-toolbar
						:elevation="1"
						style="border-top: 2px solid #fff"
					>
						<v-row class="pa-0" align="center">
							<v-col cols="2">
								<v-btn
									dark
									icon
									tile
									style="border-right: 0px solid #717171"
									light
									@click="recaptchaDialogVisible = false"
								>
									<v-icon>mdi-close</v-icon>
								</v-btn>
							</v-col>
							<v-col
								cols="8"
								class="deep-orange--text text-center"
							>
								SHARE (+1 POIN)
							</v-col>
						</v-row>
					</v-toolbar>

					<div class="mx-2">
						<div class="py-10" v-if="recaptcha">
							<client-only>
								<recaptcha
									:key="recaptchaKey"
									class="mx-5 my-5"
									@error="onError()"
									@success="onShareSuccess()"
									@expired="onExpired()"
								/>
							</client-only>
						</div>

						<v-container v-if="sheet">
							<v-row>
								<v-col cols="8">
									<strong
										v-if="tipe == 'Sing'"
										class="subtitle-1"
									>
										{{ shareSingTitle }}
										<template v-if="shareSingTitle">
											{{ share_SingTitle }}
										</template>

										<template v-else>
											Hey kamu! Yuk ikutan program "Duet"
											dan raih hadiah puluhan juta rupiah.
										</template>
									</strong>
									<strong v-else class="subtitle-1">{{
										sharingTitle
									}}</strong>
									<br />
									<strong class="caption grey--text">{{
										sharingTime
									}}</strong>
								</v-col>

								<v-col cols="4">
									<img
										v-if="sharingImage"
										width="100%"
										:src="sharingImage"
										alt
									/>
									<img
										v-else
										width="100%"
										src="/img/pw-icon.png"
										alt
									/>
								</v-col>

								<v-col cols="12">
									<v-row align="center" no-gutters>
										<v-col cols="9">
											<socialSharing
												:url="sharingUrl"
												:title="sharingTitle"
												:description="
													sharingDescription
												"
												:twitter-user="twitterEnv"
												inline-template
											>
												<div>
													<network network="facebook">
														<i
															style="
																font-size: 40px;
															"
															aria-hidden="true"
															class="v-icon notranslate mdi mdi-facebook theme--light white--text"
														></i>
													</network>
													<network network="twitter">
														<i
															style="
																font-size: 40px;
															"
															aria-hidden="true"
															class="v-icon notranslate mdi mdi-twitter theme--light white--text"
														></i>
													</network>
													<network network="whatsapp">
														<i
															style="
																font-size: 40px;
															"
															aria-hidden="true"
															class="v-icon notranslate mdi mdi-whatsapp theme--light white--text"
														></i>
													</network>
													<network network="telegram">
														<i
															style="
																font-size: 40px;
															"
															aria-hidden="true"
															class="v-icon notranslate mdi mdi-telegram theme--light white--text"
														></i>
													</network>
													<network network="skype">
														<i
															style="
																font-size: 40px;
															"
															aria-hidden="true"
															class="v-icon notranslate mdi mdi-skype theme--light white--text"
														></i>
													</network>
												</div>
											</socialSharing>
										</v-col>
										<v-col cols="3">
											<v-icon
												@click="copyToClipBoard()"
												size="30"
												style="margin-left: 3px"
												>mdi-content-copy</v-icon
											>
										</v-col>
									</v-row>
								</v-col>
							</v-row>
						</v-container>
					</div>
				</v-sheet>
			</v-bottom-sheet>
			<v-snackbar
				style="margin-top: 60px !important"
				v-model="snackbar"
				:timeout="timeout"
				top
				color="#fff"
			>
				<span style="color: #000">{{ responsemessage }}</span>
				<v-btn color="primary" text icon @click="snackbar = false">
					<v-icon
						style="
							margin-left: 100% !important;
							color: #000 !important;
						"
						class="mr-4"
						color="white"
						>mdi-close-circle-outline</v-icon
					>
				</v-btn>
			</v-snackbar>

			<SharePoin
				:dialogVisible="SharePoinVisible"
				@close="myDialogClose"
			/>
		</span>
	</div>
</template>

<script>
import * as socialSharing from "vue-social-sharing"
import UserService from "@/services/UserService"
import SharePoin from "@/components/modal/SharePoin"

export default {
	name: "ShareButton2",
	props: {
		item: String,
		customimage: String,
		independent: Boolean,
		tipe: String,
		shareSingTitle: String,
	},
	//props: ["sharingUrl","sharingTitle","sharingDescription","sharingImage","sharingTime"],
	components: {
		socialSharing,
		SharePoin,
	},
	data() {
		return {
			isFlexible: this.independent,
			share_SingTitle: this.shareSingTitle,
			recaptchaDialogVisible: false,
			recaptchaToken: null,
			recaptchaKey: "66Le1VugUAAAAAJsM8s6P8P4jbTKuS2IleefluH5Q",
			recaptcha: true,
			domainTitle: process.env.domainTitle,
			twitterEnv: process.env.twitter,
			sheet: false,
			timeout: 5000,
			snackbar: false,
			responsemessage: "Copied to clipboard",
			sharingUrl: "",
			sharingTitle: "",
			sharingDescription: "",
			sharingImage: "",
			sharingTime: "",
			SharePoinVisible: false,
			isSaved: false,
			recaptchatrigger: 0,
			sharecount: 0,
		}
	},
	methods: {
		/* Recaptcha */
		onError(error) {
			//console.log("Error happened:", error);
			this.recaptchaToken = null
			this.recaptchaDialogVisible = true
			this.sheet = false
		},
		async onShareSuccess(token) {
			if (this.recaptchatrigger == 0) {
				this.recaptchatrigger = 1
				//console.log('onshare success')
				try {
					const token = await this.$recaptcha.getResponse()
					//console.log('ReCaptcha token:', token)
					this.recaptchaToken = token
					this.recaptcha = false
					this.sheet = true
					await this.$recaptcha.reset()
				} catch (error) {
					//console.log('Login error:', error)
				}
			}
		},
		onExpired() {
			//console.log("Expired");
			this.recaptchaDialogVisible = true
			this.recaptchaToken = null
			this.sheet = false
		},

		myDialogClose() {
			this.SharePoinVisible = false
		},
		async saveShare(data) {
			let vm = this
			if (vm.sharecount == 0) {
				try {
					vm.sharecount = 1
					const res = await UserService.share(data)

					this.$auth.fetchUser().then(() => {
						localStorage.removeItem("userdata")
						localStorage.setItem(
							"userdata",
							JSON.stringify(vm.$auth.user)
						)
					})

					// //console.log(res)
					if (res.data.point == 1) {
						//console.log("dapat poin");
						this.SharePoinVisible = true
						this.recaptchaDialogVisible = false
					}
					this.recaptchaToken = null
					this.$recaptcha.reset()
				} catch (error) {
					console.log(error)
					this.recaptchaToken = null
					this.$recaptcha.reset()
				}
			}
		},
		copyToClipBoard() {
			const copy = require("clipboard-copy")
			copy(this.sharingCopy)
			this.snackbar = true
		},
		refetchMeta() {
			this.sharingUrl = window.location.href
			this.sharingCopy = window.location.href
			let data = this.$store.state.item
			if (data) {
				if (data && data.article) {
					this.sharingTitle =
						data && data.article
							? data.article.title
							: "Baca Artikelnya, Kumpulin Poinnya, Dapetin Hadiahnya! - Pewefeed"
				} else if (data && data.video) {
					this.sharingTitle =
						"Dukung video saya di 'Sing', klik di sini untuk vote"
				}

				this.sharingImage =
					data && data.article && data.article.image
						? data.article.image.medium
						: null
				this.dataDescription =
					data && data.article && data.article.short_title
						? data.article.short_title
						: "Baca Artikelnya, Kumpulin Poinnya, Dapetin Hadiahnya!"
			}

			let vm = this
			var bcrypt = require("bcryptjs")
			var salt = bcrypt.genSaltSync(10)
			var hash = bcrypt.hashSync(vm.sharingUrl, salt)
			this.$root.$on("social_shares_close", function (network, url) {
				if (vm.isSaved) return false
				let data = {
					provider: network,
					key: hash,
					url: vm.sharingUrl,
					token: vm.recaptchaToken,
				}
				vm.saveShare(data)
			})
		},
	},
	mounted() {
		let vm = this
		this.refetchMeta()
		// this.recaptcha = false;
		// this.sheet = true;
	},
	updated() {
		if (this.customimage) {
			this.sharingImage = this.customimage
		} else {
			this.refetchMeta()
		}
	},
	watch: {
		$route(to, from) {
			if (this.customimage) {
				this.sharingImage = this.customimage
			} else {
				this.refetchMeta()
			}
		},
	},
}
</script>
<style lang="scss">
.g-recaptcha {
	& > div {
		width: 100%;
		margin: 0 auto;
	}
}
.copysuccess {
	z-index: 99999999999;
	margin-top: 70px;
	.v-icon {
		color: #333 !important;
	}
}
</style>
