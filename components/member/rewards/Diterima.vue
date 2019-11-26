<template>
	<section class="selesai-page">
		<v-container>
			<v-row class="d-none">
				<v-col cols="12">
					<div class="caption">Barang Yang Didapatkan</div>
					<h3>Diterima</h3>
				</v-col>
			</v-row>
			<v-row v-if="list.length > 0">
				<v-col>
					<RewardCard :list="list" :sent="true"/>

					<v-pagination
					v-model="page"
					:length="totalpage"
					color="orange"
					@input="next"
					></v-pagination>
					<br>
					<br>
					<br>
					<br>
				</v-col>
			</v-row>
			<v-row v-else-if="list.length == 0 && !loading">
				<v-col>
					<v-alert
					prominent
					text
					type="info"
					success>Tidak ada barang yang tersedia</v-alert>
				</v-col>
			</v-row>
			<v-skeleton-loader v-else
			class="mx-auto mt-5"
			type="list-item-avatar-three-line, list-item-avatar-three-line, list-item-avatar-three-line"
			></v-skeleton-loader>
		</v-container>
	</section>
</template>
<script>
import RewardCard from './RewardCard'
import UserService from '@/services/UserService'
export default {
	name:"Diterima",
	components: {
		RewardCard
	},
	data() {
		return {
			loading: true,
			list: [],
			page: 1,
			totalpage: 0
		}
	},
	methods: {
		async fetchWait(n) {
			this.loading = true
			var page = n ? n : 1
			try {
				const res = await UserService.rewardsReceived(page)
				const items = res.data.data
				this.totalpage = res.data.meta.last_page
				//if( items.length > 0 ){
					this.list = res.data.data
				//}
				console.log(JSON.parse(JSON.stringify(res.data.data)))
				this.loading = false
			} catch (error) {
				console.log(error)
				this.loading = false
			}
		},
		next(num) {
			this.fetchWait(num)
			this.loading = true
			window.scrollTo({
				top: 0,
				left: 0,
				behavior: 'smooth'
			});
		}
	},
	mounted() {
		let _self = this
		this.fetchWait()
		this.$bus.$on('refetchDiterima', () => {
			_self.fetchWait()
		})
	}
}
</script>
<style lang="sass" scoped>
	.selesai-page .container
		background: #f9f9f9
</style>
