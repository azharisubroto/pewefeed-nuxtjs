<template>
	<a :href="banner_url">
		<img v-if="banner_url && banner_img"
		:src="banner_img" alt="">
		<div v-else class="singbanner">BANNER</div>
	</a>
</template>

<script>
import UserService from '@/services/UserService'
export default {
	name:"BannerStatic",
	props: {
		slug: String
	},
	data() {
		return {
			banner_img: null,
			banner_url: null,
		}
	},
	methods: {
		async fetchbanner(slug) {
			try {
				const res = await UserService.fetchBanner(slug);
				console.log('banner', res.data)
				this.banner_img = res.data.image
				this.banner_url = res.data.url
			} catch (error) {
				console.log(error)
			}
		}
	},
	mounted() {
		this.fetchbanner(this.slug)
	}
}
</script>
