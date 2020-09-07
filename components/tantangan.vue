<template>
	<div>
		<template v-if="!loading && banners.length > 0 && banners != null">
			<v-card color="transparent" v-for="(item, i) in banners" :key="'ad-'+i" :to="item.link">
				<v-img :src="item.image"></v-img>
			</v-card>
		</template>
		<template v-else>
			<div class="text-center pa-10">
				<v-progress-circular
					indeterminate
					:size="80"
					:width="8"
					color="deep-orange"
					class="mt-5">
				</v-progress-circular>
			</div>
		</template>
	</div>
</template>
<script>
import BannerStatic from '@/components/common/BannerStatic';
import ProgramService from '@/services/ProgramService'
export default {
	name:"tantangan",
	components: {
		BannerStatic
	},
	data() {
		return {
			banners: null,
			loading: true,
		}
	},
	methods: {
		async fetchChallanges() {
			try {
				const res = await ProgramService.getChallange()
				this.banners = res.data.data
				this.loading = false
			} catch (error) {
				console.log(error);
				this.loading = false
			}
		}
	},
	mounted() {
		this.fetchChallanges();
	}
}
</script>
