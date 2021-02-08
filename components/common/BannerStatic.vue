<template>
	<div>
		<a
			v-if="!topthree && currentPoint == 0"
			:target="is_link ? 'blank' : ''"
			:href="banner_url"
		>
			<img v-if="banner_url && banner_img" :src="banner_img" alt="" />
			<div v-else class="singbanner">BANNER</div>
		</a>
		<TopPointMe
			v-if="topthree && currentPoint > 0 && slug == 'toppoin'"
			:topthree="topthree"
			:currentPoint="currentPoint"
			:whereisme="whereisme"
			:withbutton="withButton"
		/>
	</div>
</template>

<script>
import UserService from "@/services/UserService"
import TopPoin from "@/services/TopPoin"
import TopPointMe from "@/components/TopPointMe"
export default {
	name: "BannerStatic",
	props: {
		slug: String,
		withButton: Boolean,
	},
	components: {
		TopPointMe,
	},
	data() {
		return {
			banner_img: null,
			banner_url: null,
			is_link: false,
			whereisme: "",
			currentPoint: 0,
			topthree: null,
		}
	},
	methods: {
		async fetchbanner(slug) {
			try {
				const res = await UserService.fetchBanner(slug)
				//console.log('banner', res.data)
				this.banner_img = res.data.image
				this.banner_url = res.data.url
				this.is_link = res.data.is_link
			} catch (error) {
				console.log(error)
			}
		},
		async fetchTopThree() {
			try {
				const res = await TopPoin.getTopThree()
				this.topthree = res.data.current
				if (res.data.current != null && res.data.current.length > 0) {
					var loop = res.data.current
					loop.forEach((el) => {
						if (el.active == true) {
							this.currentPoint = el.poin.grand_total
							var currentRank = el.customer.ranked
							this.shareText =
								"Saya peringkat ke-" +
								currentRank +
								" di TOP POIN pewefeed.com untuk mengejar hadiah jutaan rupiah. Untuk ikutan klik pewefeed.com"
							return false
						}
					})

					let whereisme = loop.findIndex((x) => x.active === true)
					this.whereisme = parseInt(whereisme + 1)
					// console.log(whereisme)
				}
			} catch (error) {
				console.log(error)
			}
		},
	},
	mounted() {
		this.fetchbanner(this.slug)
		this.fetchTopThree()
	},
}
</script>
