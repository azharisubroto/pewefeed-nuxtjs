<template>
	<a :target="is_link ? 'blank' : ''" :href="banner_url">
		<img v-if="banner_url && banner_img" :src="banner_img" alt="" />
		<div v-else class="singbanner">BANNER</div>
	</a>
</template>

<script>
import UserService from "@/services/UserService"
export default {
	name: "BannerStatic",
	props: {
		slug: String,
	},
	data() {
		return {
			banner_img: null,
			banner_url: null,
			is_link: false,
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
	},
	mounted() {
		this.fetchbanner(this.slug)
	},
}
</script>
