<template>
	<div>
		<template v-if="!loading && banners.length > 0 && banners != null">
			<template v-for="(item, i) in banners">
				<v-card
					v-if="item.status == true"
					tile
					class="chall"
					color="transparent"
					:key="'ad-' + i"
					:href="item.link"
				>
					<v-img
						:src="item.image"
						:class="[item.status != true ? 'coming' : 'active']"
					></v-img>
				</v-card>
				<v-card
					v-else
					tile
					class="chall"
					color="transparent"
					:key="'ad-' + i"
				>
					<v-img
						:src="item.image"
						:class="[item.status != true ? 'coming' : 'active']"
					></v-img>
				</v-card>
			</template>
		</template>
		<template v-else>
			<div class="text-center pa-10">
				<v-progress-circular
					indeterminate
					:size="80"
					:width="8"
					color="green"
					class="mt-5"
				>
				</v-progress-circular>
			</div>
		</template>
	</div>
</template>
<script>
import ProgramService from "@/services/ProgramService"
export default {
	name: "tantangan",
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
				console.log(error)
				this.loading = false
			}
		},
	},
	mounted() {
		this.fetchChallanges()
	},
}
</script>
<style lang="scss">
.chall {
	.coming {
		&:before {
			content: "";
			background: #fff;
			opacity: 0.7;
			position: absolute;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			margin: auto;
			z-index: 1;
		}
		&:after {
			content: "Coming Soon";
			width: 170px;
			height: 50px;
			background: #fa4203;
			color: #fff;
			line-height: 50px;
			position: absolute;
			z-index: 2;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			margin: auto;
			border-radius: 4px;
			text-align: center;
		}
	}
}
</style>
