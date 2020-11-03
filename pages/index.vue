<template>
	<section>
		<!-- <Home /> -->
		<v-skeleton-loader
			v-if="articles == ''"
			class="mx-auto mt-5"
			type="image"
		></v-skeleton-loader>
		<client-only>
			<div v-if="articles">
				<!-- LATEST -->
				<client-only>
					<flickity ref="flickity" :options="flickityOptions">
						<div
							v-for="article in articles"
							:key="article.id"
							@click="$router.push(link(article))"
							class="featured-item"
						>
							<v-img
								:src="article.image.small"
								aspect-ratio="1"
								class="grey lighten-2"
							></v-img>
							<div class="caption">
								<div class="caption-inner">
									<strong>{{
										article.type == "LAGU"
											? "MUSIK"
											: article.type
									}}</strong>
									<h2 class="mt-1">{{ article.title }}</h2>
								</div>
							</div>
						</div>
					</flickity>
				</client-only>
			</div>

			<!-- Ini vue-adsense : ini jalan -->
			<v-container>
				<v-row no-gutters>
					<v-col cols="12">
						<BannerStatic slug="toppoin" />
					</v-col>
					<v-col cols="12">
						<RedeemCard />
					</v-col>
				</v-row>
			</v-container>
		</client-only>

		<h1 style="text-indent: -9999px; height: 0; font-size: 0">
			Hadiah Pulsa Gratis, Pulsa Telkomsel, Pulsa Darurat XL
		</h1>

		<div v-if="topviews">
			<!-- PLAIN NEWS LOOP -->
			<div class>
				<v-container>
					<template v-for="(article, i) in topviews">
						<NewsLoop2
							:key="'article-top-' + i"
							:article="article"
							ADSlayoutKey="-fb+5w+4e-db+86"
							ADSclient="ca-pub-6581994114503986"
							ADSslot="2653891769"
							v-if="i < 6"
						/>
					</template>

					<!-- TOP VIEWS -->
					<client-only>
						<v-row class="specuavg" justify="center">
							<div
								class="thebg"
								:style="
									'background-image:url(' + activebg + ')'
								"
							></div>
							<v-col cols="12" class="px-0">
								<flickity
									class="pb-3 special"
									v-if="specials.length > 0"
									ref="flickity2"
									:options="flickityOptions2"
								>
									<div
										style="width: 100%"
										v-for="(article, i) in specials"
										:key="article.id"
									>
										<input
											type="hidden"
											:id="'bg-' + i"
											:value="article.image.small"
										/>
										<a :href="link(article)">
											<v-img
												:src="article.image.small"
												height="230"
												position="center top"
												class="grey lighten-2"
											></v-img>
										</a>
										<div
											class="pt-3 dark px-5"
											@click="$router.push(link(article))"
										>
											<strong>{{
												article.type == "LAGU"
													? "MUSIK"
													: article.type
											}}</strong>
											<h2 class="mt-1 mb-0 text-18">
												{{ article.title }}
											</h2>
										</div>
									</div>
								</flickity>
								<div class="pa-5 text-center dark" v-else>
									Loading...
								</div>
							</v-col>
						</v-row>
					</client-only>

					<!-- END TOP VIEWS -->

					<template v-for="(article, i) in topviews">
						<NewsLoop2
							:key="'article-top-' + i"
							:article="article"
							ADSlayoutKey="-fb+5w+4e-db+86"
							ADSclient="ca-pub-6581994114503986"
							ADSslot="2653891769"
							v-if="i > 6"
						/>
						<v-row
							v-if="i % 5 == 0 && i != 0 && i > 7"
							:key="'asdasd-' + i"
						>
							<v-col cols="12">
								<!-- ADSENSE -->
								<InFeedAdsense
									data-ad-layout-key="-fb+5w+4e-db+86"
									data-ad-client="ca-pub-6581994114503986"
									data-ad-slot="2653891769"
								></InFeedAdsense>
							</v-col>
						</v-row>
					</template>
					<v-row v-if="isMore">
						<v-col cols="12">
							<v-btn
								tile
								block
								depressed
								dark
								color="deep-orange"
								@click="loadMore(next)"
								>Load More</v-btn
							>
							<br />
						</v-col>
					</v-row>
				</v-container>
			</div>
		</div>
	</section>
</template>

<script>
import ArticleService from "@/services/ArticleService"
import NewsLoop2 from "@/components/common/NewsLoop2"
import RedeemCard from "@/components/common/RedeemCard"
import BannerStatic from "@/components/common/BannerStatic"
import axios from "axios"

export default {
	data() {
		return {
			article: true,
			pwpoin: false,
			meta: this.$store.state.meta,
			domainTitle: process.env.domainTitle,
			model: null,
			articles: [],
			topviews: [],
			specials: [],
			activebg: null,
			next: 2,
			isMore: true,
			toppoinbanner:
				"http://b16e2bab9e94a9d05089-aa7428b954372836cd8898750ce2dd71.r41.cf6.rackcdn.com/assets/frontend/images/banner-toppoin.jpg",
			garfik: "",
			mainCategories: {
				viral: null,
				sport: null,
				piknik: null,
				lagu: null,
				nonton: null,
				tekno: null,
			},
			sixty: [],
			flickityOptions: {
				groupCells: 1,
				prevNextButtons: false,
				pageDots: true,
				wrapAround: true,
				adaptiveHeight: true,
			},
			flickityOptions2: {
				groupCells: 1,
				prevNextButtons: false,
				pageDots: true,
				wrapAround: false,
				adaptiveHeight: true,
			},
			dataUrl: process.env.mobileUrl,
			dataTitle:
				"Baca Artikelnya, Kumpulin Poinnya, Dapetin Hadiahnya! - " +
				process.env.domainTitle,
			// dataDescription: "Sumber konten VIRAL dari beragam informasi seperti Film, Musik, Olahraga, Travel, Teknologi. Tidak hanya itu, {{ domainTitle }} memberikan insentif dengan pengunjungnya dalam bentuk POIN. POIN bisa dikumpulkan atas interaksi memberikan Komentar, menjawab Quiz dan memberikan Star (Voting). Jumlah POIN yang cukup kemudian bisa ditukar dengan Reward",
			dataDescription:
				"Baca Artikelnya, Kumpulin Poinnya, Dapetin Hadiahnya!",
		}
	},
	async asyncData({ query, error }) {
		let data = await axios.get(
			"https://s1.playworld.id/api/article/top-views/?page=1"
		)
		return {
			topviews: data.data.data,
		}
	},
	methods: {
		async fetchTopViews() {
			try {
				const res = await ArticleService.getTopViews(1)
				const items = res.data.data
				items.forEach((element) => {
					var link = element.link
					if (link.includes("sixty")) {
						var slug = "/sixty" + element.link
					} else {
						var slug = element.link
					}
					var obj = {
						id: element.id,
						image: element.image,
						link: slug,
						title: element.title,
						type: element.type,
						published_at: element.published_at,
					}
					this.topviews.push(obj)
				})
			} catch (error) {
				console.log(error)
			}
		},
		async fetchSpecial() {
			try {
				const res = await ArticleService.getSpecials()
				const items = res.data.data
				items.forEach((element) => {
					var link = element.link
					if (link.includes("sixty")) {
						var slug = "/sixty" + element.link
					} else {
						var slug = element.link
					}
					var obj = {
						id: element.id,
						image: element.image,
						link: slug,
						title: element.title,
						type: element.type,
						published_at: element.publish_at,
					}
					this.specials.push(obj)
				})
			} catch (error) {
				console.log(error)
			}
		},
		async loadMore(n) {
			try {
				const res = await ArticleService.getTopViews(n)
				//console.log(JSON.parse(JSON.stringify(res.data.data)))
				const items = res.data.data
				items.forEach((element) => {
					var link = element.link
					if (link.includes("sixty")) {
						var slug = "/sixty" + element.link
					} else {
						var slug = element.link
					}
					var obj = {
						id: element.id,
						image: element.image,
						link: slug,
						title: element.title,
						type: element.type,
						published_at: element.published_at,
					}
					this.topviews.push(obj)
				})
				this.next += 1
				// console.log(res.data.meta)
				if (res.data.meta.current_page == res.data.meta.last_page) {
					this.isMore = false
				}
			} catch (error) {
				console.log(error)
			}
		},
		async fetchSixty() {
			try {
				const res = await ArticleService.getSixty()
				this.sixty = res.data.data.sixty
				//console.log(JSON.parse(JSON.stringify(res.data)))
			} catch (error) {
				console.log(error)
			}
		},
		async fetchPromotedNews() {
			try {
				const res = await ArticleService.getLatest()
				//console.log(JSON.parse(JSON.stringify(res.data.data)))
				this.articles = res.data.data
				// if (res.data.data.length > 0) {
				this.$nextTick(function () {
					this.$refs.flickity.rerender()
				})
				// }
			} catch (error) {
				console.log(error)
			}
		},
		async fetchTopPoin() {
			try {
				const res = await ArticleService.getTopPoin()
				//console.log(JSON.parse(JSON.stringify(res.data.data.ranked.garfik)))
				this.toppoinbanner = res.data.data.periode.banner.desktop
				this.garfik = res.data.data.ranked.garfik
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
		random() {
			return Math.random()
		},
	},
	mounted() {
		this.fetchPromotedNews()
		//this.fetchTopViews();
		this.fetchSpecial()

		let vm = this
		setTimeout(() => {
			vm.activebg = document.getElementById("bg-0").value
			vm.$refs.flickity2.on("change", (event) => {
				//console.log(vm.$refs.flickity2.selectedIndex());
				let index = vm.$refs.flickity2.selectedIndex()
				vm.activebg = document.getElementById("bg-" + index).value
				console.log(vm.activebg)
			})
		}, 3000)
	},
	async fetch({ store, params }) {
		let meta = await ArticleService.getDetailMeta("home").then((res) => {
			return res.data.data
		})
		store.commit("SET_META", meta)
		store.commit("SET_ITEM", {
			article: {
				title: meta.og_title,
				short_title: meta.description,
			},
		})
		//console.log(meta);
	},
	head() {
		return {
			title: this.meta.og_title.substring(0, 65),
			meta: [
				{
					hid: "description",
					name: "description",
					content: this.meta.description,
				},
				{
					hid: "keywords",
					name: "keywords",
					content: this.meta.keywords,
				},

				// Facebok
				{
					hid: "og:title",
					property: "og:title",
					content: this.meta.og_title,
				},
				{
					hid: "og:description",
					property: "og:description",
					content: this.meta.og_description,
				},
				{
					hid: "og:type",
					property: "og:type",
					content: this.meta.og_type,
				},
				{
					hid: "og:url",
					property: "og:url",
					content: this.meta.og_url,
				},
				{
					hid: "og:image",
					property: "og:image",
					content: this.meta.og_image,
				},
				{
					hid: "og:locale",
					property: "og:locale",
					content: this.meta.og_locale,
				},
				{
					hid: "og:site_name",
					property: "og:site_name",
					content: this.meta.og_site_name,
				},
				{
					hid: "fb:admins",
					property: "fb:admins",
					content: "100006462279538",
				},
				{
					hid: "fb:app_id",
					property: "fb:app_id",
					content: "107188393464738",
				},

				// Twitter
				{
					hid: "twitter:card",
					name: "twitter:card",
					content: this.meta.twitter_card,
				},
				{
					hid: "twitter:creator",
					name: "twitter:creator",
					content: this.meta.twitter_creator,
				},
				{
					hid: "twitter:site",
					name: "twitter:site",
					content: this.meta.twitter_site,
				},
				{
					hid: "twitter:title",
					name: "twitter:title",
					content: this.meta.twitter_title,
				},
				{
					hid: "twitter:description",
					name: "twitter:description",
					content: this.meta.twitter_description,
				},
				{
					hid: "twitter:image",
					name: "twitter:image",
					content: this.meta.twitter_image,
				},
			],
		}
	},
	components: {
		NewsLoop2,
		RedeemCard,
		BannerStatic,
	},
}
</script>

<style lang="scss">
.v-slide-group__prev {
	display: none !important;
}
.flickity-viewport {
	transition: height 0.2s;
}
.special {
	.flickity-page-dots {
		bottom: -10px !important;
	}
}
.dark {
	color: #fff;
}
.specuavg {
	position: relative;
	z-index: 1;
	margin-top: 30px;
	margin-bottom: 30px;
	padding-top: 30px;
	padding-bottom: 30px;
	.thebg {
		content: "";
		width: 100%;
		height: 100%;
		left: 0;
		top: 0;
		position: absolute;
		z-index: -1;
		background-color: #000;
		transform: skewY(-5deg);
		overflow: hidden;
		background-size: cover !important;
		&:before {
			content: "";
			width: 100%;
			height: 100%;
			position: absolute;
			z-index: -1;
			background: #000;
			//backdrop-filter: blur(10px);
			background-image: inherit;
			background-size: cover !important;
			filter: blur(20px);
			transform: scale(1.2);
		}
		&:after {
			content: "";
			width: 100%;
			height: 100%;
			position: absolute;
			z-index: 0;
			background: rgba(0, 0, 0, 0.4);
		}
	}
}
</style>
