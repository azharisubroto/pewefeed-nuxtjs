<template>
	<div>
		<v-skeleton-loader
			v-if="sixty == ''"
			class="mx-auto mt-5"
			type="image"
		></v-skeleton-loader>

		<div v-if="sixty">
			<!-- LATEST -->
			<flickity ref="flickity" :options="flickityOptions">
				<div
					v-for="article in sixty"
					:key="article.id"
					@click="$router.push('/sixty/' + article.link)"
					class="featured-item"
				>
					<v-img
						:src="article.image"
						aspect-ratio="1"
						class="grey lighten-2"
					></v-img>
					<div class="caption">
						<div class="caption-inner">
							<strong>SIXTY / {{ article.type }}</strong>
							<h2 class="mt-1">{{ article.title }}</h2>
						</div>
					</div>
				</div>
			</flickity>
		</div>

		<!-- ADSENSE -->
		<v-container>
			<v-row no-gutters>
				<v-col cols="12">
					<InFeedAdsense
						data-ad-layout-key="-fb+5w+4e-db+86"
						data-ad-client="ca-pub-6581994114503986"
						data-ad-slot="3238508831"
					>
					</InFeedAdsense>
				</v-col>
			</v-row>
		</v-container>
		<!-- END ADSENSE -->

		<v-skeleton-loader
			v-if="sixtybottom.length == 0"
			class="mx-auto"
			type="list-item-avatar-three-line"
		></v-skeleton-loader>
		<div v-if="sixtybottom">
			<!-- TOP VIEWS -->
			<div class="">
				<v-container>
					<NewsLoop
						:items="sixtybottom"
						ADSlayoutKey="-fb+5w+4e-db+86"
						ADSclient="ca-pub-6581994114503986"
						ADSslot="3238508831"
					/>
					<v-row>
						<v-col cols="12">
							<v-btn
								tile
								block
								depressed
								dark
								color="deep-orange"
								@click="loadMore(next)"
							>
								Load More
							</v-btn>
						</v-col>
					</v-row>
				</v-container>
			</div>
		</div>
	</div>
</template>

<script>
import ArticleService from "@/services/ArticleService.js"
import NewsLoop from "@/components/common/NewsLoop"
export default {
	name: "VideoHome",
	components: {
		NewsLoop,
	},
	head() {
		return {
			title: "Tonton video VIRAL 60 detik bisa dapat hadiah",
			meta: [
				// hid is used as unique identifier. Do not use `vmid` for it as it will not work
				{
					hid: "description",
					name: "description",
					content:
						"Sumber konten VIRAL dari beragam informasi seperti Film, Musik, Olahraga, Travel, Teknologi",
				},
			],
		}
	},
	data() {
		return {
			domainTitle: process.env.domainTitle,
			model: null,
			articles: [],
			topviews: [],
			next: 2,
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
			sixtybottom: [],
			flickityOptions: {
				groupCells: 1,
				prevNextButtons: false,
				pageDots: true,
				wrapAround: true,
			},
			dataUrl: process.env.mobileUrl + "video",
			dataTitle:
				"Tonton Video SIXTY, Kumpulin Poinnya, Dapetin Hadiahnya! - Playworld",
			// dataDescription: "Sumber konten VIRAL dari beragam informasi seperti Film, Musik, Olahraga, Travel, Teknologi. Tidak hanya itu, {{ domainTitle }} memberikan insentif dengan pengunjungnya dalam bentuk POIN. POIN bisa dikumpulkan atas interaksi memberikan Komentar, menjawab Quiz dan memberikan Star (Voting). Jumlah POIN yang cukup kemudian bisa ditukar dengan Reward",
			dataDescription:
				"Baca Artikelnya, Kumpulin Poinnya, Dapetin Hadiahnya!",
		}
	},
	methods: {
		async loadMore(n) {
			try {
				const res = await ArticleService.getSixty("bottom", n)
				////console.log(JSON.parse(JSON.stringify(res.data.data)))
				var newData = res.data.data
				newData.forEach((element) => {
					var obj = {
						id: element.id,
						image: {
							small: element.image,
						},
						link: "/sixty/" + element.slug,
						title: element.title,
						type: element.type,
						published_at: element.publish_at,
					}
					this.sixtybottom.push(obj)
				})
				this.next += 1
			} catch (error) {
				console.log(error)
			}
		},
		async fetchSixtyUp() {
			try {
				const res = await ArticleService.getSixty("up")
				const items = res.data.data
				// //console.log('sixty:')
				// //console.log(JSON.parse(JSON.stringify(res.data)))
				items.forEach((element) => {
					var obj = {
						id: element.id,
						image: element.image,
						link: element.slug,
						title: element.title,
						type: element.type,
						published_at: element.publish_at,
					}
					this.sixty.push(obj)
				})
				// if( res.data.data.length > 0 ) {
				this.$nextTick(function () {
					this.$refs.flickity.rerender()
				})
				// }
			} catch (error) {
				console.log(error)
			}
		},
		async fetchSixtyBottom() {
			try {
				const res = await ArticleService.getSixty("bottom")
				const items = res.data.data
				items.forEach((element) => {
					var obj = {
						id: element.id,
						image: {
							small: element.image,
						},
						link: "/sixty/" + element.slug,
						title: element.title,
						type: element.type,
						published_at: element.publish_at,
					}
					this.sixtybottom.push(obj)
				})
				var vm = this
				// if( res.data.data.length > 0 ) {
				this.$nextTick(function () {
					vm.getRandomVideo()
				})
				// }
				//console.log('sixty bottom:')
				//console.log(JSON.parse(JSON.stringify(res)))
			} catch (error) {
				console.log(error)
			}
		},
		async getRandomVideo() {
			try {
				const res = await ArticleService.getRandomVideo()
				////console.log(res.data.data.content)
				const items = res.data.data.content
				items.forEach((article) => {
					var obj = {
						id: article.id,
						image: {
							small: article.thumbnail,
						},
						link: "/fakta/detail/" + article.slug,
						title: article.title,
						type: "FAKTA/" + article.category,
						published_at: article.created_at,
						class: "fakta",
					}
					this.sixtybottom.splice(2, 0, obj)
				})
			} catch (error) {
				//console.log()
			}
		},
		link(article) {
			var url, cropped
			if (article.link != process.env.mobileUrl + "sixty") {
				url = article.link
				cropped = url.replace(process.env.mobileUrl, "")
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
		this.fetchSixtyUp()
		this.fetchSixtyBottom()
	},
}
</script>
