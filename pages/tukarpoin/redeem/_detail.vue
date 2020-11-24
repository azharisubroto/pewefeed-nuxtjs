<template>
	<section class="tukarpoin-content">
		<div
			class="main-app-bar fixed top"
			style="
				background: #2c2c2d;
				height: auto;
				min-height: 56px;
				position: fixed;
				top: 0;
				left: 0;
				right: 0;
				z-index: 999;
			"
		>
			<v-row align="center" class="pt-1 mx-0">
				<v-col cols="2">
					<v-btn @click="historyBack()" small icon>
						<v-icon>mdi-chevron-left</v-icon>
					</v-btn>
				</v-col>

				<v-col cols="8" class="text-center">
					<h1 class="text-16 text-truncate">
						{{ detail.title ? detail.title : "Loading..." }}
					</h1>
				</v-col>

				<v-col cols="2" class="text-right">
					<a href="/"><img src="/img/peweicon.svg" width="20" /></a>
				</v-col>
			</v-row>
		</div>

		<v-tabs
			v-model="redeemtab"
			background-color="#2c2c2d"
			color="deep-orange"
			slider-color="deep-orange"
			grow
		>
			<!-- Menu -->
			<v-tab class="text-10"> Tukar </v-tab>
			<v-tab class="text-10">
				Penukar ({{ histories != null ? histories.length : "0" }})
			</v-tab>
			<v-tab class="text-10"> Cara Tukar </v-tab>
			<v-tab class="text-10">
				<ShareButton2
					tipe="Sing"
					:customimage="detail.image"
					:shareSingTitle="
						'Saya mendapat ' +
						detail.title +
						' dari pewefeed.com dengan cara share, comment dan jawab quiz. Gampang banget!'
					"
					independent
					>Bagikan<br />(+1 Poin)</ShareButton2
				>
			</v-tab>

			<!-- Content -->
			<v-tabs-items v-model="redeemtab">
				<v-tab-item>
					<WaNotif class="mb-0" />
					<!-- DETAIL REWWARD -->
					<div
						v-if="detail"
						class="pb-4 px-3"
						style="background: #1c1c1c; color: #fff"
					>
						<v-row>
							<v-col cols="4">
								<img :src="detail.image" alt />
							</v-col>
							<v-col cols="8" class="pr-4">
								<!-- DESCRIPTION -->
								<div class="deep-orange--text text-16">
									<client-only
										>Tersedia hingga
										{{
											[getTanggal(detail), "YYYY-MM-DD"]
												| moment("DD MMM YYYY")
										}}</client-only
									>
									<div></div>
									Tersisa
									{{
										detail.stock
											? detail.stock.remaining
											: "-"
									}}
									dari
									{{ detail.stock ? detail.stock.qty : "-" }}
								</div>
								<div v-html="detail.description"></div>

								<!-- ACTION -->
								<v-btn-toggle
									class="belibuttongroup"
									color="deep-orange"
								>
									<v-btn
										color="#FF4200"
										retain-focus-on-click
										:disabled="
											detail.stock.remaining == 0 ||
											detail.expired
												? true
												: false
										"
										:style="
											detail.stock.remaining == 0
												? 'background-color: grey !important;'
												: ''
										"
										@click="buyconfirm = !buyconfirm"
										><span style="color: #fff !important"
											>Tukar Poin</span
										></v-btn
									>

									<v-btn
										:disabled="
											detail.stock.remaining == 0 ||
											detail.expired
												? true
												: false
										"
										color="#FF4200"
										@click="buyconfirm = !buyconfirm"
										:style="
											detail.stock.remaining == 0
												? 'background-color: grey !important;'
												: ''
										"
									>
										<v-img
											max-width="18"
											src="/img/icons/poin-p.svg"
											class="mr-1"
										></v-img>
										<span style="color: #fff !important">{{
											detail.discount > 0
												? detail.point - detail.discount
												: detail.point
										}}</span>
									</v-btn>
								</v-btn-toggle>
							</v-col>
						</v-row>
					</div>

					<div style="border-top: 10px solid #000000"></div>

					<v-container>
						<h4 class="text-16 lh-20">Rewards Lainnya</h4>

						<template v-if="others != null && others.length > 0">
							<v-row>
								<v-col
									cols="6"
									v-for="(item, i) in others"
									:key="'others-' + i"
								>
									<v-card
										:to="'/tukarpoin/redeem/' + item.id"
										color="#404040"
										class="px-3 py-3"
										style="height: 100%"
									>
										<v-row>
											<v-col cols="5" class="pr-0">
												<v-img
													:src="item.image"
													contain
												></v-img>
											</v-col>
											<v-col cols="7">
												<div class="text-12">
													{{ item.title }}
													<br />
													<v-btn
														text
														class="pl-0"
														small
													>
														<v-img
															max-width="18"
															src="/img/icons/poin-p.svg"
															class="mr-1"
														></v-img>
														{{ item.point }}
													</v-btn>
												</div>
											</v-col>
										</v-row>
									</v-card>
								</v-col>
							</v-row>
						</template>

						<v-row>
							<v-col cols="12">
								<!-- ADSENSE -->
								<InFeedAdsense
									data-ad-layout-key="-fb+5w+4e-db+86"
									data-ad-client="ca-pub-6581994114503986"
									data-ad-slot="2653891769"
								></InFeedAdsense>
							</v-col>
						</v-row>
					</v-container>
				</v-tab-item>

				<v-tab-item>
					<WaNotif />
					<!-- HISTORY -->
					<v-container class="my-0">
						<template v-if="histories != null && !historyLoading">
							<v-row>
								<v-col
									cols="6"
									v-for="(history, i) in histories"
									class="pt-0"
									:key="history.id + '-' + i"
								>
									<v-card
										color="#404040"
										class="pa-3 comment-item mb-2"
										style="height: 100%"
										:id="'history' + history.redeem_id"
									>
										<v-row dense>
											<v-col cols="3" class="pr-0">
												<v-avatar size="30">
													<img
														:src="
															history.customer
																.avatar
																? history
																		.customer
																		.avatar
																: '/img/user.jpeg'
														"
														onerror="this.src='/img/user.jpeg';"
													/>
												</v-avatar>
											</v-col>
											<v-col cols="9">
												<strong class="text-12">{{
													history.customer.name
												}}</strong>
												<div
													class="mt-0 text--gray text-10"
												>
													{{ history.created_at }}
												</div>
											</v-col>
										</v-row>
									</v-card>
								</v-col>
							</v-row>

							<v-btn
								block
								dark
								depressed
								:loading="moreLoading"
								color="deep-orange"
								class="mt-3"
								@click="moreHistory(historyNext)"
								>Load More</v-btn
							>
						</template>
						<template
							v-else-if="historyLoading && histories == null"
						>
							<div class="py-10 caption grey--text text-center">
								Loading...
							</div>
						</template>
						<template
							v-else-if="!historyLoading && histories == null"
						>
							<div class="py-10 caption grey--text text-center">
								NO DATA
							</div>
						</template>
						<br />
						<br />
					</v-container>
				</v-tab-item>

				<v-tab-item>
					<WaNotif />
					<!-- SYARAT -->
					<v-container>
						<!-- <div v-html="detail.term"></div> -->
						<section
							class="toppoin-accx"
							v-if="helps != null && helps.length > 0"
						>
							<v-expansion-panels v-model="panel">
								<v-expansion-panel
									v-for="(item, i) in helps"
									:key="i"
									class="mb-3"
									style="border-radius: 5px"
								>
									<v-expansion-panel-header
										class="py-5 text-uppercase"
										>{{
											item.title
										}}</v-expansion-panel-header
									>
									<v-expansion-panel-content class="caption">
										<div v-html="item.content"></div>
									</v-expansion-panel-content>
								</v-expansion-panel>
							</v-expansion-panels>
						</section>
					</v-container>
				</v-tab-item>

				<v-tab-item></v-tab-item>
			</v-tabs-items>
		</v-tabs>

		<!-- SNACKBAR SUKSES ATAU FAIL -->
		<v-snackbar v-model="snackbar" :multi-line="true" top>
			{{ tukarmsg }}
			<v-btn color="red" icon @click="snackbar = false">
				<v-icon>mdi-close</v-icon>
			</v-btn>
		</v-snackbar>
		<v-overlay :value="overlay">
			<v-progress-circular
				color="green"
				indeterminate
				size="64"
			></v-progress-circular>
		</v-overlay>

		<v-skeleton-loader
			v-if="detail == ''"
			class="mx-auto mt-5"
			type="list-item-avatar-three-line, image, article"
		></v-skeleton-loader>

		<!-- BUY CONFIRM -->
		<v-bottom-sheet v-model="buyconfirm">
			<v-sheet height="100%" color="transparent">
				<v-card style="border-radius: 0 !important">
					<v-toolbar
						:elevation="1"
						style="
							border-top: 2px solid #fff;
							border-bottom: 3px solid #000;
						"
					>
						<v-row class="pa-0" align="center">
							<v-col cols="2">
								<v-btn
									dark
									icon
									tile
									style="border-right: 0px solid #717171"
									light
									@click="buyconfirm = false"
								>
									<v-icon>mdi-close</v-icon>
								</v-btn>
							</v-col>
							<v-col
								cols="8"
								class="deep-orange--text text-center"
								>{{
									buystep == 1
										? "INFORMATION"
										: "VERIFICATION"
								}}</v-col
							>
						</v-row>
					</v-toolbar>

					<div class="px-0 pt-10 text-center">
						<template v-if="buystep == 1">
							Anda akan menukarkan
							<div class="mt-2 text-18" style="line-height: 1">
								<strong>{{
									detail.discount > 0
										? detail.point - detail.discount
										: detail.point
								}}</strong>
								Poin
								<br />
							</div>

							<div class="mt-3">
								Dengan reward
								<div class="text-18">
									<strong>{{ detail.title }}</strong>
								</div>
							</div>
							<v-card-actions class="pb-10 text-center">
								<v-spacer></v-spacer>
								<v-btn
									:loading="pending"
									dark
									depressed
									color="deep-orange"
									@click="buystep = 2"
								>
									<strong>LANJUTKAN</strong>
								</v-btn>
								<br />
								<br />
								<br />
								<v-spacer></v-spacer>
							</v-card-actions>
						</template>

						<template v-if="buystep == 2">
							<recaptcha
								@error="onError()"
								@success="onSuccess()"
								@expired="onExpired()"
							/>
							<br />
							<br />
							<br />
						</template>
					</div>

					<v-overlay :value="overlay">
						<v-progress-circular
							color="green"
							indeterminate
							size="64"
						></v-progress-circular>
					</v-overlay>
				</v-card>
			</v-sheet>
		</v-bottom-sheet>

		<!-- AFTER PURCHASE -->
		<v-bottom-sheet v-model="afterSaveModal">
			<v-sheet height="100%">
				<v-toolbar :elevation="1" style="border-top: 2px solid #fff">
					<!-- Arrow -->
					<v-btn
						dark
						icon
						tile
						style="border-right: 0px solid #717171"
						light
						@click="afterSaveModal = false"
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
							style="margin-left: -10px"
							>Information</v-btn
						>
					</v-toolbar-items>
					<div class="flex-grow-1"></div>
				</v-toolbar>

				<div class="px-4 pt-10 text-center">
					<div class="mt-5 mb-0 text-16">
						<template v-if="infotype == 'error'">
							<v-img
								src="/img/error.svg"
								max-width="60"
								class="mx-auto mb-4"
							></v-img>
							{{ tukarmsg }}
						</template>
						<template v-else-if="infotype == 'success'">
							<v-img
								src="/img/success.svg"
								max-width="60"
								class="mx-auto mb-4"
							></v-img
							>Poin Sukses Ditukar
						</template>
					</div>
				</div>
				<v-card-actions class="pb-10">
					<v-spacer></v-spacer>

					<v-btn
						v-if="infotype == 'error'"
						href="/member/histori_penggunaan_poin/"
						color="deep-orange"
						block
						class="mt-2"
					>
						<strong>Cek Poin</strong>
					</v-btn>
					<v-btn
						v-else-if="infotype == 'success'"
						href="/member/rewards-status/"
						color="deep-orange"
						block
						class="mt-2"
					>
						<strong>Cek Status Rewards</strong>
					</v-btn>

					<br />
					<br />
					<br />
					<v-spacer></v-spacer>
				</v-card-actions>
			</v-sheet>
		</v-bottom-sheet>

		<br />
		<br />

		<!-- <v-bottom-navigation
      fixed
      dark
      grow
      color="white"
      background-color="#2C2C2D"
      height="80"
      class="pwmenubottom"
      v-model="tptab"
    >
      <v-btn @click="detailtab=true;hitoritab=false;syarattab=false">
        <span class="text-13">Redeem</span>
        <img src="/img/tukarpoin/redeem-orange.png" class="mb-1 d-block" width="25" height="25" />
      </v-btn>
      <v-btn @click="detailtab=false;hitoritab=true;syarattab=false;fetchHistory()">
        <span class="text-13">Redeem History</span>
        <img src="/img/tukarpoin/redeemer-orange.png" class="mb-1 d-block" width="25" height="25" />
      </v-btn>
      <v-btn @click="detailtab=false;hitoritab=false;syarattab=true">
        <span class="text-13">How to</span>
        <img src="/img/tukarpoin/howto-orange.png" class="mb-1 d-block" width="25" height="25" />
      </v-btn>
      <ShareButton2 />
    </v-bottom-navigation> -->

		<LoginModal :dialogVisible="loginModalVisible" @close="myDialogClose" />
	</section>
</template>

<script>
import TukarPoinService from "@/services/TukarPoinService"
import UserService from "@/services/UserService"
import LoginModal from "@/components/modal/LoginModal"
import ShareButton2 from "@/components/common/ShareButton2"
import WaNotif from "@/components/WaNotif"

export default {
	name: "RedeemDetail",
	components: {
		LoginModal,
		ShareButton2,
		WaNotif,
	},
	async fetch({ store, params }) {
		////console.log('fetch this')
		////console.log(params.articleslug)
		let item = await TukarPoinService.getRedeemDetail(params.detail).then(
			(res) => {
				return res.data.data
			}
		)
		store.commit("SET_ITEM", item)
	},
	data() {
		return {
			tptab: 0,
			redeemtab: 0,
			snackbar: false,
			tukarmsg: "",
			overlay: false,
			title: "",
			detail: this.$store.state.item,
			item: this.$store.state.item,
			origin: this.$store.state.host,
			detailtab: true,
			hitoritab: false,
			syarattab: false,
			histories: null,
			moreLoading: false,
			historyNext: 2,
			panel: 0,
			loginModalVisible: false,
			buyconfirm: false,
			pending: false,
			buystep: 1,
			recaptchaToken: null,
			afterSaveModal: false,
			infotype: null,
			others: null,
			helps: null,
			historyLoading: true,
		}
	},
	head() {
		let desc = this.detail.description
		const strippedString = desc.replace(/(<([^>]+)>)/gi, "")
		return {
			title: this.detail.title,
			meta: [
				{
					hid: "description",
					name: "description",
					content: strippedString,
				},
			],
		}
	},
	watch: {
		redeemtab: function (newval, old) {
			let vm = this
			//setTimeout(() => {
			if (newval == 3) {
				vm.redeemtab = old
			}
			//}, 50);
		},
	},
	methods: {
		historyBack() {
			this.$router.back()
		},
		/* Recaptcha */
		onError(error) {
			//console.log("Error happened:", error);
			this.recaptchaToken = null
		},
		onSuccess(token) {
			this.tukarPoin()
		},
		onExpired() {
			//console.log("Expired");
			this.recaptchaToken = null
		},
		async fetchDetail() {
			try {
				let res = await TukarPoinService.getRedeemDetail(
					this.$route.params.detail
				)
				this.others = res.data.others
				// //console.log(JSON.parse(JSON.stringify(res.data.data)));
			} catch (error) {
				console.log(error)
			}
		},
		async fetchHistory() {
			try {
				let res = await TukarPoinService.getRedeemHistory(
					this.$route.params.detail,
					1
				)
				this.histories = res.data.data.length > 0 ? res.data.data : null
				this.historyLoading = false
				////console.log(JSON.parse(JSON.stringify(res.data.data)))
			} catch (error) {
				console.log(error)
				this.historyLoading = false
			}
		},
		async moreHistory(n) {
			this.moreLoading = true
			try {
				let res = await TukarPoinService.getRedeemHistory(
					this.$route.params.detail,
					2
				)
				var history = res.data.data
				if (history && history.length > 0) {
					let arr = []
					history.forEach((element) => {
						this.histories.push(element)
					})
					//this.histories.push(arr;
				}

				this.historyNext += 1
				this.moreLoading = false
				// //console.log(JSON.parse(JSON.stringify(res.data.data)));
			} catch (error) {
				console.log(error)
			}
		},
		async tukarPoin() {
			var params = {
				redeem_id: this.detail.id,
			}
			this.overlay = true
			this.pending = true
			// //console.log(params);
			try {
				const res = await UserService.tukarPoin(params)

				let vm = this
				// this.$auth.fetchUser().then(() => {
				//   localStorage.setItem("userdata", JSON.stringify(vm.$auth.user));
				// });

				// //console.log(res);
				this.overlay = false
				this.afterSaveModal = true
				this.infotype = "success"
				this.pending = false
				this.buyconfirm = false
			} catch (error) {
				//console.log(error.response.status);
				this.overlay = false
				if (error.response.status == 401) {
					this.openModalLogin()
				} else if (error.response.status == 404) {
					this.tukarmsg = "Poin Anda Tidak Cukup"
					this.pending = false
					this.buyconfirm = false
					this.afterSaveModal = true
					this.infotype = "error"
				} else if (error.response.status == 422) {
					this.tukarmsg =
						"Maaf, Reward ini hanya dapat ditukar dengan POIN satu kali per hari."
					this.pending = false
					this.buyconfirm = false
					this.afterSaveModal = true
					this.infotype = "error"
				} else {
					this.tukarmsg = "An Error Occured"
					this.pending = false
					this.buyconfirm = false
					this.afterSaveModal = true
					this.infotype = "error"
				}
			}
		},
		openModalLogin() {
			this.loginModalVisible = true
		},
		myDialogClose() {
			this.dialog = false
			this.loginModalVisible = false
			this.buyVipDialogVisible = false
			this.pleaseLoginDialogVisible = false
			this.notVipDialogVisible = false
			this.KomentarPoinVisible = false
			// other code
		},
		getTanggal(detail) {
			var detailtanggal = detail.periode ? detail.periode.end_at : ""
			var tanggal = detailtanggal.replace("00:00:00", "")
			tanggal = tanggal.replace(" ", "")
			return tanggal
		},
		async fetchHelp() {
			try {
				const res = await TukarPoinService.getHelp()
				this.helps = res.data.data
			} catch (error) {
				console.log(error)
			}
		},
	},
	mounted() {
		this.fetchDetail()
		this.fetchHelp()
		this.fetchHistory()
	},
}
</script>

<style lang="scss">
.nocard {
	.v-expansion-panel {
		background: transparent !important;
	}
	&.v-expansion-panels {
		background: transparent !important;
		box-shadow: none;
		.v-expansion-panel {
			&:before {
				display: none;
			}
		}
		button {
			padding: 0;
			min-height: inherit;
		}
		.v-expansion-panel-content__wrap {
			padding: 0;
		}
	}
}
.tukaryuk {
	position: fixed;
	bottom: 0;
	left: 0;
	right: 0;
}
.tukarpoin-content p {
	font-size: 16px !important;
}
.nocard p:only-of-type {
	margin-bottom: 0;
}
.theme--dark.v-tabs .v-tab--active:hover::before,
.theme--dark.v-tabs .v-tab--active::before {
	opacity: 0 !important;
}
.theme--dark.v-tabs .v-tab:hover::before {
	opacity: 0 !important;
}
.v-slide-group__wrapper {
	box-shadow: inset 0 -2px 0 0 #afafaf;
}
.belibuttongroup {
	.v-btn {
		opacity: 1 !important;
	}
}
</style>
