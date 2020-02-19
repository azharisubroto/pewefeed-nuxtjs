<template>
	<section class="selesai-page">
		<v-container>
			<v-row class="d-none">
				<v-col cols="12">
					<div class="caption">Barang Yang Didapatkan</div>
					<h3>Menunggu Respon</h3>
				</v-col>
			</v-row>
			<v-row v-if="list && !loading">
				<v-col>
					<RewardCard
					:addresses="addresses"
					:contact="contact"
					:list="list"
					:actionable="true"/>

					<v-pagination
					v-if="list && list.length"
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
			<v-row v-else-if="!list && !loading">
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
	name:"Menunggu",
	props: ['addresses', 'contact'],
	components: {
		RewardCard
	},
	data() {
		return {
			loading:true,
			list: null,
			page: 1,
			totalpage: 30
		}
	},
	methods: {
		async fetchWait(n) {
			var page = n ? n : 1
			try {
				const res = await UserService.rewardsWait(page)
				this.list = res.data.data
				this.totalpage = res.data.meta.last_page
				this.loading = false
				//console.log(JSON.parse(JSON.stringify(res.data)))
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
		this.fetchWait()
		this.$bus.$on('refetchRewards', () => {
			this.fetchWait()
		})
		//console.log(JSON.parse(JSON.stringify(this.addresses)))
	}
}
</script>
