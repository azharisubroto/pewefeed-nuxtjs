<template>
	<section>
		<WaNotif />
		<template v-if="periode == null && isloading == true">
			<v-overlay>
				<v-progress-circular
					indeterminate
					color="green"
					size="64"
				></v-progress-circular>
			</v-overlay>
		</template>
		<template v-if="periode != null && isloading == false">
			<!-- BANNER -->
			<template v-if="isPrize || isWin">
				<img v-if="banner_url && banner_img" :src="banner_img" alt="" />
				<!-- <BannerStatic slug="toppoin" /> -->
				<v-img :src="periode.banner.desktop" class="mb-5"></v-img>
				<div class="d-none pb-7 text-center">
					Periode:
					{{
						[periode.periode.start_at, "YYYY-MM-DD HH:mm:ss"]
							| moment("DD MMM")
					}}
					-
					{{
						[periode.periode.end_at, "YYYY-MM-DD HH:mm:ss"]
							| moment("DD MMM YYYY")
					}}
					<div></div>

					<!-- <v-container v-if="tptab == 0">
					<v-btn :to="'/toppoin/active/'+periode.slug" color="deep-orange" block class="mt-4">
						Read More
					</v-btn>
				</v-container> -->
				</div>
			</template>

			<!-- PRIZES TAB -->
			<template v-if="isPrize">
				<!-- PERINGKAT SAYYAAA -->
				<h4 v-if="topthree && currentPoint > 0" class="tp-head">
					Peringkat Saya
				</h4>

				<TopPointMe
					v-if="topthree && currentPoint > 0"
					:topthree="topthree"
					:currentPoint="currentPoint"
					:whereisme="whereisme"
					:withbutton="false"
				/>

				<!-- TOP 10 -->

				<h4 class="tp-head mt-5">Peringkat Top Poin Sementara</h4>
				<div></div>

				<v-container>
					<!-- <pre>{{prizeswithpemenang}}</pre> -->
					<v-row v-if="prizeswithpemenang != null">
						<v-col
							v-for="(item, i) in prizeswithpemenang"
							cols="6"
							:key="'winner-' + i"
							class="pa-1"
						>
							<v-card class="top10" color="#404040">
								<div class="top10-head">
									<img
										src="/img/icons/rank-b.svg"
										width="15"
										class="mr-1"
										style="vertical-align: center"
									/>
									<strong>Calon Juara {{ i + 1 }}</strong>
								</div>

								<div class="top10-body">
									<v-row class="pb-0">
										<v-col cols="4" class="py-0">
											<v-img
												:src="item.redeem.image"
												contain
											></v-img>
										</v-col>
										<v-col
											cols="8"
											class="pl-0 py-0 text-12"
										>
											<h4 class="text-12 mb-1">
												{{ item.redeem.name }}
											</h4>

											<v-row class="pa-0 py-0">
												<v-col cols="3" class="py-0">
													<v-avatar size="23">
														<v-img
															:src="
																item.customer
																	.avatar
																	? item
																			.customer
																			.avatar
																	: 'https://via.placeholder.com/48/?text=No+Data'
															"
															width="23"
														></v-img>
													</v-avatar>
												</v-col>
												<v-col
													cols="9"
													class="pl-2 py-0 text-13 text-uppercase text-truncate"
												>
													{{
														item.customer.username
															? item.customer
																	.username
															: "No Data"
													}}

													<div
														class="text-10 mt-0"
														v-if="
															item.customer.id !=
															''
														"
													>
														<img
															src="/img/icons/poin-p.svg"
															style="
																vertical-align: middle;
																line-height: 1;
															"
															class="mr-0"
															width="10"
														/>
														{{
															item.customer.point
														}}
													</div>
												</v-col>
											</v-row>
										</v-col>
									</v-row>
								</div>
							</v-card>
						</v-col>
					</v-row>
				</v-container>

				<!-- MAIN PRIZES -->
				<h4 class="tp-head mt-5">
					Peringkat Lainnya ({{ totalRanked }} Peserta)
				</h4>
				<div></div>
				<v-container v-if="lastRanked != null">
					<v-row>
						<template v-for="(item, i) in lastRanked">
							<v-col cols="6" class="pa-1" :key="'ranks-' + i">
								<v-card
									class="pa-0"
									color="#404040"
									style="overflow: hidden"
								>
									<v-row no-gutters align="center">
										<v-col
											cols="4"
											class="text-center py-3 px-1 text-truncate"
											style="background: #afafaf"
										>
											<img
												src="/img/icons/rank-b.svg"
												width="10"
												class="mr-0"
												style="vertical-align: center"
											/>
											<strong
												style="color: #000"
												class="text-12"
												>{{ item.ranked }}</strong
											>
										</v-col>
										<v-col cols="8" class="pl-2 pr-2">
											<v-row no-gutters>
												<v-col cols="2">
													<v-avatar
														size="15"
														class="adjustava"
													>
														<v-img
															:src="
																item.customer
																	.avatar
															"
														></v-img>
													</v-avatar>
												</v-col>
												<v-col cols="10" class="pl-2">
													<div
														class="text-10 text-uppercase text-truncate"
													>
														{{
															item.customer
																.username
														}}
													</div>
													<div class="text-10 mt-0">
														<img
															src="/img/icons/poin-p.svg"
															style="
																vertical-align: middle;
																line-height: 1;
															"
															class="mr-0"
															width="10"
														/>
														{{
															item.poin
																.grand_total
														}}
													</div>
												</v-col>
											</v-row>
										</v-col>
									</v-row>
								</v-card>
							</v-col>
						</template>
					</v-row>
					<v-container>
						<div class="text-center">
							<v-btn
								color="deep-orange"
								class="px-4"
								@click="
									moreLastRanked()
									bottomloading = true
								"
							>
								{{ bottomloading ? "Loading" : "Show More" }}
							</v-btn>
						</div>
						<!-- <v-pagination
						class="mt-4"
						color="deep-orange"
						v-model="paged"
						:length="totalPage"
						:total-visible="totalVisible"
						@input="next"
					></v-pagination> -->
					</v-container>
				</v-container>
				<v-container v-else class="text-center">
					Loading data...
				</v-container>
			</template>

			<!-- RANKING TAB -->
			<template v-if="isRank">
				<v-container class="pb-0">
					<v-alert color="#0057FF" prominent>
						<template v-slot:prepend>
							<v-img
								src="/img/icons/info.svg"
								width="35"
								max-width="35"
								class="mr-3 infoarticleicon"
							></v-img>
						</template>
						Hadiah TOP POIN Periode
						{{
							[periode.periode.start_at, "YYYY-MM-DD HH:mm:ss"]
								| moment("DD MMM")
						}}
						s/d
						{{
							[periode.periode.end_at, "YYYY-MM-DD HH:mm:ss"]
								| moment("DD MMM YYYY")
						}}
					</v-alert>
				</v-container>

				<v-container class="pt-0" v-if="hadiahPeriode != null">
					<v-card
						v-for="(item, i) in hadiahPeriode"
						:key="'prizeperiode' + i"
						:class="['px-5', i <= 2 ? 'gold' : 'silver']"
					>
						<v-row>
							<v-col cols="3" class="pt-7">
								<v-img :src="item.redeem.image"></v-img>
							</v-col>
							<v-col cols="9" class="py-6 pl-2">
								<div class="mb-2">
									<img
										src="/img/icons/toppoin/piala.svg"
										style="
											vertical-align: middle;
											line-height: 1;
										"
										class="mr-1"
										alt=""
									/>
									<strong class="deep-orange--text"
										>Juara {{ i + 1 }}</strong
									>
								</div>
								<h4 class="text-20 mb-2" style="width: 70%">
									{{ item.redeem.name }}
								</h4>

								<div class="outinebtn">
									<img
										src="/img/icons/poin-black.svg"
										style="
											vertical-align: middle;
											line-height: 1;
										"
										class="mr-1"
										alt=""
									/>
									<strong>{{ item.min_point }} Poin</strong>
									Syarat Minimal
								</div>
							</v-col>
						</v-row>
					</v-card>
				</v-container>
				<!-- <pre>{{hadiahPeriode}}</pre> -->
			</template>

			<!-- WINNERS TAB -->
			<template v-if="isWin">
				<div v-if="winners != null">
					<div class="d-none pb-4 text-center">
						Hadiah TOP POIN Periode
						{{
							[winners[0].periode.start_at, "YYYY-MM-DD HH:mm:ss"]
								| moment("DD MMM")
						}}
						s/d
						{{
							[winners[0].periode.end_at, "YYYY-MM-DD HH:mm:ss"]
								| moment("DD MMM YYYY")
						}}

						<v-btn medium color="#ff4200" class="mt-3">
							Lihat Pemenang
						</v-btn>
					</div>
					<template v-for="(item, i) in winners">
						<template>
							<div
								v-if="i == 2"
								class="devider-small"
								:key="'winners-deviderz-' + i"
							></div>
							<div :key="'winnersz-' + i" class="px-4">
								<v-row>
									<v-col cols="4">
										<div class="jeruk">
											<v-img
												:src="item.banner.desktop"
											></v-img>
										</div>
									</v-col>
									<v-col cols="8">
										{{
											[
												item.periode.start_at,
												"YYYY-MM-DD HH:mm:ss",
											] | moment("DD MMM")
										}}
										-
										{{
											[
												item.periode.end_at,
												"YYYY-MM-DD HH:mm:ss",
											] | moment("DD MMM YYYY")
										}}

										<v-btn
											:to="'/toppoin/' + item.slug"
											color="deep-orange"
											small
											class="mt-4"
											>See Winner</v-btn
										>
									</v-col>
								</v-row>
							</div>
							<div
								class="devider-small"
								:key="'winners-devider-' + i"
							></div>
						</template>
					</template>
					<v-container>
						<v-pagination
							class="mt-4"
							color="deep-orange"
							v-model="paged"
							:length="winnertotalPage"
							:total-visible="totalVisible"
							@input="nextwinner"
						></v-pagination>
					</v-container>
					<v-overlay v-if="pagingload"></v-overlay>
				</div>
			</template>

			<!-- HOW TO TAB -->
			<template v-if="isHow">
				<section class="toppoin-acc" v-if="periode.howto">
					<v-expansion-panels
						v-for="(item, index) in periode.howto"
						:key="index"
					>
						<v-expansion-panel class="mb-0">
							<v-expansion-panel-header
								class="py-5 text-uppercase"
								>{{ item.title }}</v-expansion-panel-header
							>
							<v-expansion-panel-content class="caption">
								<div v-html="item.content"></div>
							</v-expansion-panel-content>
						</v-expansion-panel>
					</v-expansion-panels>
				</section>
			</template>
		</template>

		<v-overlay :value="bottomloading">
			<v-progress-circular
				color="green"
				indeterminate
				size="64"
			></v-progress-circular>
		</v-overlay>

		<div class="py-10 mb-10"></div>

		<!-- BOTTOM NAVIGATION -->
		<v-bottom-navigation
			fixed
			dark
			grow
			color="white"
			background-color="#2C2C2D"
			v-model="tptab"
			height="80"
			class="pwmenubottom"
		>
			<!-- v-if="$route.name != 'purchase' && $route.name != 'cat-subcat-articleslug' && $route.name != 'cat' && $route.name != 'tukarpoin'" -->
			<v-btn
				@click="
					isPrize = true
					isRank = false
					isWin = false
					isHow = false
				"
			>
				<span class="text-10">Peringkat<br />Peserta</span>
				<img
					:src="
						tptab == 0
							? '/img/icons/toppoin/rank-o.svg'
							: '/img/icons/toppoin/rank-w.svg'
					"
					class="mb-1 d-block"
					width="20"
					height="20"
				/>
			</v-btn>
			<v-btn
				@click="
					isPrize = false
					isRank = true
					isWin = false
					isHow = false
				"
			>
				<span class="text-10">Hadiah<br />Periode Ini</span>
				<img
					:src="
						tptab == 1
							? '/img/icons/toppoin/prize-o.svg'
							: '/img/icons/toppoin/prize-w.svg'
					"
					class="mb-1 d-block"
					width="20"
					height="20"
				/>
			</v-btn>
			<v-btn
				@click="
					isPrize = false
					isRank = false
					isWin = true
					isHow = false
				"
			>
				<span class="text-10">Histori<br />Pemenang</span>
				<img
					:src="
						tptab == 2
							? '/img/icons/toppoin/history-o.svg'
							: '/img/icons/toppoin/history-w.svg'
					"
					class="mb-1 d-block"
					width="20"
					height="20"
				/>
			</v-btn>
			<v-btn
				@click="
					isPrize = false
					isRank = false
					isWin = false
					isHow = true
				"
			>
				<span class="text-10">Info & Cara<br />Bermain</span>
				<img
					src="/img/tukarpoin/howto-orange.png"
					class="mb-1 d-block"
					width="20"
					height="20"
				/>
			</v-btn>
			<!-- <v-btn>
				<ShareButton2
					v-if="shareText != null"
					class="text-center"
					independent
					tipe="Sing"
					:shareSingTitle="shareText"
				>
					<img
						:src="
							tptab == 4
								? '/img/icons/articles/bagikan-o.svg'
								: '/img/icons/articles/bagikan-w.svg'
						"
						height="18"
						style="
							display: inline-block;
							position: relative;
							top: 2px;
						"
						alt
					/>
					<div></div>
					<span class="text-10">
						Bagikan
						<br />(+1 Poin)
					</span>
				</ShareButton2>
			</v-btn> -->
		</v-bottom-navigation>
	</section>
</template>

<script>
import TopPoin from "@/services/TopPoin"
import UserService from "@/services/UserService"
// import ShareButton2 from "@/components/common/ShareButton2"
import WaNotif from "@/components/WaNotif"
// import BannerStatic from "@/components/common/BannerStatic"
import TopPointMe from "@/components/TopPointMe"

export default {
	head() {
		return {
			title: "Top Poin",
			meta: [
				{
					hid: "description",
					name: "description",
					content:
						"Ayo kumpulkan poin sebanyak banyaknya untuk mendapatkan rewards menarik",
				},
			],
		}
	},
	components: {
		// ShareButton2,
		WaNotif,
		// BannerStatic,
		TopPointMe,
	},
	data() {
		return {
			tptab: 0,
			isPrize: true,
			isRank: false,
			isWin: false,
			isHow: false,
			isloading: true,
			masterdata: null,
			periode: null,
			description: false,
			prizeswithpemenang: null,
			prizewithoutpemenang: null,
			lastRanked: null,
			totalRanked: 0,
			paged: 1,
			totalVisible: 7,
			totalPage: 5,
			pagingload: true,
			winners: null,
			winnertotalPage: 3,
			winnersFeatured: null,
			myrank: [],
			topthree: null,
			hadiahPeriode: null,
			shareText: null,
			bottomloading: false,
			whereisme: "",
			currentPoint: 0,
			banner_img: null,
			banner_url: null,
		}
	},
	methods: {
		async fetchbanner(slug) {
			try {
				const res = await UserService.fetchBanner("toppoin")
				//console.log('banner', res.data)
				this.banner_img = res.data.image
				this.banner_url = res.data.url
				this.is_link = res.data.is_link
			} catch (error) {
				console.log(error)
			}
		},
		async fetchAll() {
			try {
				const res = await TopPoin.topPoinAll()
				this.periode = res.data.data.periode
				this.prizeswithpemenang = res.data.data.ranking
				this.prizewithoutpemenang = res.data.data.reward
				this.isloading = false
			} catch (error) {
				console.log(error)
				this.isloading = false
			}
		},
		async fetchLastRanked(n) {
			try {
				const res = await TopPoin.lastRanked(n)
				////console.log(res);
				this.lastRanked = res.data.data.ranked
				this.totalPage = res.data.pagination.last_page
				this.totalRanked = res.data.pagination.total
				this.pagingload = false
				this.paged = res.data.pagination.current_page
			} catch (error) {
				console.log(error)
				this.isloading = false
			}
		},
		async moreLastRanked() {
			let target = parseInt(this.paged + 1)
			try {
				const res = await TopPoin.lastRanked(target)
				this.paged = await res.data.pagination.current_page
				////console.log(res);
				if (
					res.data.data.ranked != null &&
					res.data.data.ranked &&
					res.data.data.ranked.length > 0
				) {
					var loop = res.data.data.ranked
					loop.forEach((el) => {
						this.lastRanked.push(el)
					})
				}
				this.bottomloading = false
			} catch (error) {
				console.log(error)
				this.bottomloading = false
			}
		},
		async fetchWinners(n) {
			try {
				const res = await TopPoin.winners(n)
				this.winners = res.data.data.periode
				if (this.paged == 1) {
					this.winnersFeatured = res.data.data.periode[0]
				}
				this.pagingload = false
				this.winnertotalPage = res.data.pagination.last_page
			} catch (error) {
				console.log(error)
				this.isloading = false
			}
		},
		async fetchTopThree() {
			let vm = this
			try {
				const res = await TopPoin.getTopThree()
				this.topthree = res.data.current
				if (res.data.current != null && res.data.current.length > 0) {
					var loop = res.data.current
					loop.forEach((el) => {
						if (el.active == true) {
							vm.currentPoint = el.poin.grand_total
							var currentRank = el.customer.ranked
							vm.shareText =
								"Saya peringkat ke-" +
								currentRank +
								"  di Top Poin pewefeed.com untuk kejar pulsa ratusan ribu rupiah. Yuk join sekarang juga."
							return
						}
					})

					let whereisme = loop.findIndex((x) => x.active === true)
					this.whereisme = parseInt(whereisme + 1)
					// console.log(whereisme)
				}
			} catch (error) {
				this.shareText =
					"Ayo kumpulkan poin sebanyak banyaknya untuk mendapatkan rewards menarik"
				console.log(error)
			}
		},
		async fetchHadiahPeriode() {
			try {
				const res = await TopPoin.hadiahPeriodeIni()
				if (
					res.data.data.reward != null &&
					res.data.data.reward.length > 0
				) {
					this.hadiahPeriode = res.data.data.reward
				}
			} catch (error) {
				console.log(error)
			}
		},
		capitalize(str) {
			return str.replace(/\w\S*/g, function (txt) {
				return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
			})
		},
		next(num) {
			this.moreLastRanked(num)
		},
		nextwinner(num) {
			this.fetchWinners(num)
			this.pagingload = true
		},
	},
	mounted() {
		this.fetchbanner()
		this.fetchAll()
		this.fetchLastRanked(1)
		this.fetchWinners(1)
		this.fetchTopThree()
		this.fetchHadiahPeriode()
	},
}
</script>

<style lang="scss">
.mainprizes {
	.v-expansion-panel-content__wrap {
		padding: 0 !important;
	}
}

.winner-name {
	border-bottom: 1px dotted #d1d1d1;
	padding-bottom: 10px;
	margin-bottom: 10px;
}

.tp-head {
	padding-left: 15px;
	position: relative;
	line-height: 40px;
	margin: 0;
	font-size: 14px;
	&:before {
		content: "";
		width: 8px;
		height: 100%;
		position: absolute;
		top: 0;
		left: 0;
		border-radius: 0 5px 5px 0;
		background: #ff4200;
	}
}

.position-3 {
	.item-1 {
		.rankbox {
			.rb-body {
				padding: 10px 10px 8px;
				text-align: center;
				opacity: 0.6;
			}
		}
	}
}

.rankbox {
	background: #404040;
	color: #fff;
	border: 2px solid #afafaf;
	.rb-head {
		background: #afafaf;
		color: #000;
		font-size: 16px;
		height: 35px;
		line-height: 35px;
		padding: 0;
		text-align: center;
		font-weight: bold;
	}
	.rb-body {
		padding: 25px 10px 10px;
		text-align: center;
		opacity: 0.6;
	}
}
.item-1 .rankbox:not(.is_me) {
	border-right: 0;
}

.is_me.rankbox {
	border-color: #ff4200;
	.rb-head {
		background: #ff4200;
		color: #fff;
		font-size: 20px;
	}
	.rb-body {
		padding: 38px 10px;
		text-align: center;
		opacity: 1;
	}
}
.item-3 .rankbox:not(.is_me) {
	border-left: 0;
}

.top10-head {
	background: #afafaf;
	color: #000;
	font-size: 12px;
	padding: 10px;
}

.top10-body {
	padding: 8px;
}

.gold {
	background: linear-gradient(180deg, #f3cd7e 0%, #c78345 100%) !important;
	color: #000 !important;
	margin: 10px 0;
}
.silver {
	background: linear-gradient(180deg, #efefef 0%, #939393 100%) !important;
	color: #000 !important;
	margin: 10px 0;
}
.outinebtn {
	font-size: 14px;
	border: 1px solid #000;
	border-radius: 90px;
	display: inline-block;
	height: 26px;
	line-height: 24px;
	padding: 0 5px;
	img {
		width: 10px;
		display: inline-block;
		margin-right: 5px;
	}
}
.adjustava {
	position: relative;
	top: -2px;
}
</style>
