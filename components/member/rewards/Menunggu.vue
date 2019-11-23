<template>
	<section>
		<v-container>
			<v-row>
				<v-col cols="12">
					<div class="caption">Barang Yang Didapatkan</div>
					<h3>Menunggu Respon</h3>
				</v-col>
			</v-row>
			<v-row v-if="list">
				<v-col>
					<RewardCard :list="list"/>
				</v-col>
			</v-row>
			<v-row v-else>
				<v-col>
					<v-alert
					prominent
					text
					type="info"
					success>Tidak ada barang yang tersedia</v-alert>
				</v-col>
			</v-row>
		</v-container>
	</section>
</template>
<script>
import RewardCard from './RewardCard'
import UserService from '@/services/UserService'
export default {
	name:"Menunggu",
	components: {
		RewardCard
	},
	data() {
		return {
			list: null
		}
	},
	methods: {
		async fetchWait(n) {
			var page = n ? n : 1
			try {
				const res = await UserService.rewardsWait(page)
				this.list = res.data.data
				console.log(res.data.data)
			} catch (error) {
				console.log(error)
			}
		}
	},
	mounted() {
		this.fetchWait()
	}
}
</script>
<style lang="sass">
	.maincontent, .v-content__wrap, .theme--light.v-application
		background: #f9f9f9
	.theme--light.v-tabs-items, .theme--light.v-application
		background: #f9f9f9
</style>
