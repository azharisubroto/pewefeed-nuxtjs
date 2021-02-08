<template>
	<section>
		<v-container>
			<!-- MENU -->
			<v-row justify="center" align="center">
				<v-col
					class="text-center"
					cols="3"
					v-for="(menu, i) in menus"
					:key="'menu-' + i"
					@click="$router.push(menu.link)"
				>
					<v-row no-gutters>
						<v-col cols="12">
							<v-avatar
								style="background-color: #ffdacd"
								width="50"
								height="50"
								class="pa-2"
							>
								<img :src="menu.icon" :alt="menu.label" />
							</v-avatar>
						</v-col>
						<v-col cols="12" class="mt-2">
							<span class="text-14">{{ menu.label }}</span>
						</v-col>
					</v-row>
				</v-col>
			</v-row>
		</v-container>

		<!-- Banner -->
		<div v-if="banners && banners.length > 0">
			<client-only>
				<flickity
					class="carousel-banner"
					ref="flickity"
					:options="flickityOptions"
				>
					<div
						style="width: 100%"
						v-for="banner in banners"
						:key="banner.id"
					>
						<a :href="banner">
							<v-img
								:src="banner.image"
								height="230"
								position="center top"
								class="grey lighten-2"
							></v-img>
						</a>
						<v-container>
							<span class="mt-1 text-14">
								{{ banner.tagline }}
							</span>
						</v-container>
					</div>
				</flickity>
				<v-divider
					class="pt-1"
					style="
						background: #272727 !important;
						border-color: #272727 !important;
					"
				></v-divider>
			</client-only>
		</div>

		<!-- Tukar Point -->
		<div v-if="rewards && rewards.length > 0">
			<v-container>
				<v-row no-gutters class="my-2">
					<v-col cols="6">
						<strong class="text-18">Tukar Poin</strong>
					</v-col>
					<v-col
						@click="$router.push('/tukarpoin')"
						cols="6"
						class="text-right"
					>
						<strong class="text-14 deep-orange--text"
							>Lihat Semua</strong
						>
					</v-col>
				</v-row>
				<span class="text-14">
					Dapatkan rewards langsung tanpa diundi dengan menukarkan
					Poin kamu.
				</span>
			</v-container>
			<div class="plainslide-wrapper">
				<div class="plainslide">
					<v-card
						v-for="reward in rewards"
						:key="'insideoout-' + reward.id"
						:class="[reward.expired == true ? 'expired' : '']"
						style="min-width: 140px; max-width: 140px"
						@click="$router.push('/tukarpoin/redeem/' + reward.id)"
						:style="
							'background-image: url(' +
							reward.image +
							') !important;'
						"
						class="reward-item"
					>
						<div class="reward-detail">
							<strong class="text-14">{{ reward.title }}</strong>
							<v-row no-gutters>
								<v-col cols="2">
									<img
										src="/img/icons/poin-new.svg"
										width="10"
										alt="point"
										class="mt-2"
									/>
								</v-col>
								<v-col cols="10">
									<span class="text-12">{{
										reward.point
									}}</span>
								</v-col>
							</v-row>
						</div>
					</v-card>
				</div>
			</div>
			<v-divider
				class="pt-1 mt-8"
				style="
					background: #272727 !important;
					border-color: #272727 !important;
				"
			></v-divider>
		</div>

		<!-- Top Point -->
		<v-container>
			<v-row no-gutters class="my-2">
				<v-col cols="6">
					<strong class="text-18">Top Poin</strong>
				</v-col>
				<v-col
					@click="$router.push('/toppoin')"
					cols="6"
					class="text-right"
				>
					<strong class="text-14 deep-orange--text"
						>Lihat Semua</strong
					>
				</v-col>
			</v-row>
			<v-row no-gutters>
				<v-col cols="12 mb-2">
					<span class="text-14">
						Kejar peringkat kamu dengan cara kumpulkan Poin sebanyak
						banyaknya dan dapatkan rewards langsung tanpa diundi.
					</span>
				</v-col>
				<v-col cols="12">
					<BannerStatic :withButton="false" slug="toppoin" />
				</v-col>
			</v-row>
		</v-container>

		<!-- Kompetisi -->
		<div v-if="challenges && challenges.length > 0">
			<v-divider
				class="pt-1 mt-8"
				style="
					background: #272727 !important;
					border-color: #272727 !important;
				"
			></v-divider>
			<v-container>
				<v-row no-gutters class="my-2">
					<v-col cols="6">
						<strong class="text-18">Kompetisi</strong>
					</v-col>
					<v-col
						@click="$router.push('/kompetisi')"
						cols="6"
						class="text-right"
					>
						<strong class="text-14 deep-orange--text"
							>Lihat Semua</strong
						>
					</v-col>
					<v-col cols="12 mt-2">
						<span class="text-14">
							Yuk ikutan kompetisinya dan dapatkan voting sebanyak
							banyaknya agar kamu jadi juaranya!
						</span>
					</v-col>
				</v-row>
				<v-row no-gutters class="mt-3">
					<v-col
						cols="6"
						v-for="challenge in challenges"
						:key="'challenge-' + challenge.id"
						class="px-1"
					>
						<v-row no-gutters>
							<v-col cols="12">
								<v-card>
									<v-img
										:src="challenge.image"
										:aspect-ratio="3 / 2"
									></v-img>
								</v-card>
							</v-col>
							<v-col cols="12 mt-2">
								<span class="text-14">
									{{ challenge.title }}
								</span>
							</v-col>
						</v-row>
					</v-col>
				</v-row>
			</v-container>
		</div>

		<!-- Feed -->
		<div v-if="feeds && feeds.length > 0">
			<v-divider
				class="pt-1 mt-3"
				style="
					background: #272727 !important;
					border-color: #272727 !important;
				"
			></v-divider>
			<v-container>
				<v-row no-gutters class="my-2">
					<v-col cols="6">
						<strong class="text-18">Feed</strong>
					</v-col>
					<v-col
						@click="$router.push('/?tab=1')"
						cols="6"
						class="text-right"
					>
						<strong class="text-14 deep-orange--text"
							>Lihat Semua</strong
						>
					</v-col>
					<v-col cols="12 mt-2">
						<span class="text-14">
							Kumpulkan Poin dengan terus membaca artikel,
							menyukai artikel, memberikan komentar, menjawab kuis
							dan membagikan artikel.
						</span>
					</v-col>
				</v-row>
				<v-row no-gutters>
					<v-col
						v-for="(feed, index) in feeds"
						:key="'feed-' + feed.id"
						class="px-1"
						:cols="index == 0 ? 12 : 6"
						@click="$router.push(link(feed))"
					>
						<v-row no-gutters class="py-4">
							<v-col cols="12">
								<v-img
									:src="feed.image.large"
									:aspect-ratio="3 / 2"
								></v-img>
							</v-col>
							<v-col cols="12 mt-2">
								<span
									class="text-14"
									v-html="feed.title"
								></span>
							</v-col>
							<v-col cols="12 mt-2">
								<span
									class="text-14"
									v-html="feed.created_at"
								></span>
							</v-col>
						</v-row>
					</v-col>
				</v-row>
			</v-container>
		</div>

		<!-- Help -->
		<div>
			<v-divider
				class="pt-1 mt-3"
				style="
					background: #272727 !important;
					border-color: #272727 !important;
				"
			></v-divider>
			<v-container>
				<v-row no-gutters class="my-2">
					<v-col cols="6">
						<strong class="text-18">Hubungi Kami</strong>
					</v-col>
					<v-row class="mt-5" no-gutters>
						<v-col cols="12" class="pt-1">
							<a href="telp:02129385381">
								<img
									src="/img/help-telp-2.svg"
									loading="lazy"
									alt=""
								/>
							</a>
						</v-col>
						<v-col cols="12" class="pt-1">
							<a
								href="https://wa.me/6281519060929"
								target="_BLANK"
							>
								<img
									src="/img/help-wa-2.svg"
									loading="lazy"
									alt=""
								/>
							</a>
						</v-col>
						<v-col cols="12" class="pt-1">
							<a href="mailto:halo@pewefeed.com">
								<img
									src="/img/help-email-2.svg"
									loading="lazy"
									alt=""
								/>
							</a>
						</v-col>
					</v-row>
				</v-row>
			</v-container>
		</div>

		<!-- Social -->
		<div>
			<v-container>
				<v-row
					no-gutters
					justify="center"
					align="center"
					class="text-center"
				>
					<v-col
						cols="3"
						href="https://www.instagram.com/pewefeed"
						target="_BLANK"
					>
						<v-icon size="16" class="mr-1">mdi-instagram</v-icon>
						<span class="text-14">pewefeed</span>
					</v-col>
					<v-col
						cols="3"
						href="https://www.facebook.com/pewefeeds"
						target="_BLANK"
					>
						<v-icon size="16" class="mr-1">mdi-facebook</v-icon>
						<span class="text-14">pewefeed</span>
					</v-col>
					<v-col
						cols="3"
						href="https://twitter.com/pewefeed"
						target="_BLANK"
					>
						<v-icon size="16" class="mr-1">mdi-twitter</v-icon>
						<span class="text-14">pewefeed</span>
					</v-col>
					<v-col
						cols="3"
						href="https://www.youtube.com/channel/UCW7zo9pK4Vgd2xf68ayXlPw"
						target="_BLANK"
					>
						<v-icon size="16" class="mr-1">mdi-youtube</v-icon>
						<span class="text-14">pewefeed</span>
					</v-col>
				</v-row>
			</v-container>
		</div>

		<!-- Tagline -->
		<div>
			<v-container>
				<v-row justify-center align-content-center no-gutters>
					<v-col cols="11" class="text-10">
						<span
							>Situs pewefeed.com merupakan layanan resmi dari PT.
							<strong style="text-decoration: underline"
								><a href="https://jayadata.id"
									>Jayadata Indonesia</a
								></strong
							></span
						><br />
						<span
							>Silahkan klik untuk
							<strong style="text-decoration: underline"
								><a
									href="https://pewefeed.com/bantuan/detail/privacy-policy-id-version"
									>Kebijakan Kerahasiaan</a
								></strong
							>
							atau
							<strong style="text-decoration: underline"
								><a
									href="https://pewefeed.com/bantuan/detail/privacy-policy-id-version"
									>Penafian</a
								></strong
							>
							&copy; {{ new Date().getFullYear() }}</span
						>
					</v-col>
					<v-col cols="1">
						<img width="100%" src="/img/peweicon.svg" />
					</v-col>
				</v-row>
			</v-container>
		</div>
	</section>
</template>

<script>
import RedeemService from "~/services/RedeemService"
import StaticService from "~/services/StaticService"
import BannerStatic from "@/components/common/BannerStatic"
import ArticleService from "~/services/ArticleService"
export default {
	components: {
		BannerStatic,
	},
	data() {
		return {
			menus: [
				{ label: "Feed", icon: "/img/peweicon.svg", link: "/?tab=1" },
				{
					label: "Tukar Poin",
					icon: "/img/icons/nav-2-color.svg",
					link: "/tukarpoin",
				},
				{
					label: "Top Poin",
					icon: "/img/icons/header/3-o.svg",
					link: "/toppoin",
				},
				{
					label: "Kompetisi",
					icon: "/img/icons/nav-3-color.svg",
					link: "/kompetisi",
				},
				{
					label: "Rewards",
					icon: "/img/icons/rewards-saya.svg",
					link: "/?tab=2",
				},
				{
					label: "Beli VIP",
					icon: "/img/icons/vip.svg",
					link: "/purchase",
				},
				{
					label: "Batas Poin",
					icon: "/img/bataspoint.svg",
					link: "/member/daily-limit",
				},
				{
					label: "Bantuan",
					icon: "/img/icons/help-new.svg",
					link: "/bantuan",
				},
			],
			flickityOptions: {
				groupCells: 1,
				prevNextButtons: false,
				pageDots: true,
				wrapAround: false,
				adaptiveHeight: true,
			},
			banners: [],
			rewards: [],
			toppoints: [],
			challenges: [],
			feeds: [],
		}
	},
	methods: {
		async fetchBanner() {
			try {
				this.banners = (await StaticService.getBanner()).data
			} catch (error) {
				console.log(error)
			}
		},
		async fetchRewards() {
			try {
				this.rewards = (
					await RedeemService.getRandom()
				).data.data.redeem
			} catch (error) {
				console.log(error)
			}
		},
		async fetchChallenge() {
			try {
				this.challenges = (await StaticService.getChallenge()).data.data
			} catch (error) {
				console.log(error)
			}
		},
		async fetchFeed() {
			try {
				this.feeds = (await ArticleService.getFeed(5)).data.data
			} catch (error) {
				console.log(error)
			}
		},
		link(article) {
			var url, cropped
			if (article.link != process.env.mobileUrl + "sixty") {
				url = article.link
				cropped = url.replace(process.env.baseUrl, "")
			} else {
				url = article.link_detail
				cropped = url.replace(process.env.mobileUrl, "")
			}
			return cropped
		},
	},
	mounted() {
		this.fetchBanner()
		this.fetchRewards()
		this.fetchChallenge()
		this.fetchFeed()
	},
}
</script>

<style lang="scss">
.carousel-banner {
	background: #1c1c1c;
	.carousel-banner-item {
		width: 100%;
		height: 230px !important;
		background: rgba(2, 1, 1, 0.7);
		.caption {
			position: absolute;
			width: 100%;
			height: 100%;
			top: 0;
			left: 0;
			background: rgba(2, 1, 1, 0.7);
			.caption-inner {
				position: absolute;
				top: 50%;
				transform: translateY(-50%);
				left: 0;
				right: 0;
				margin: 0 auto;
				padding: 30px;
				h2 {
					font-weight: 900;
					font-size: 24px;
					line-height: 1.3;
				}
			}
		}
	}
	.flickity-page-dots {
		background: transparent;
		height: 48px;
		line-height: 48px;
		padding: 0 10px !important;
		text-align: right;
		top: 60%;

		.dot {
			width: 10px !important;
			height: 10px !important;
			border-radius: 90px !important;
			opacity: 1 !important;
		}
	}
}
.plainslide-wrapper {
	overflow-x: hidden;
}
.plainslide {
	overflow-x: scroll;
	overflow-y: hidden;
	white-space: nowrap;
	display: flex;
	padding-left: 10px !important;
	padding-right: 0px !important;
	& > div {
		white-space: initial;
		height: 235px;
		color: #fff;
		width: 123px;
		background: #000;
		padding: 10px;
		margin: 0 5px;
		border-radius: 5px;
	}

	.reward-item {
		background-size: contain;
		background-repeat: no-repeat;
	}
}

.reward-detail {
	width: 100%;
	background-color: #272727;
	position: absolute;
	left: 0;
	bottom: 0;
	padding: 10px;
}
</style>
