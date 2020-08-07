<template>
	<section>
		<v-container>
			<v-alert class="mt-4" color="#0057FF" prominent>
				<template v-slot:prepend>
				<v-img src="/img/icons/info.svg" width="35" max-width="35" class="mr-3 infoarticleicon"></v-img>
				</template>
				Berikut adalah transaksi sukses pembelian VIP dengan SMS
			</v-alert>
		</v-container>

		<template v-if="smsstatuses!=null && smsstatuses.length > 0">
			<div class="status-item" v-for="(mid, i) in smsstatuses" :key="i">
				<div class="deep-orange--text text-18"><strong>{{ '#' + mid.order_id }}</strong></div>
				<div class="text-16">
					<div>{{ mid.created_at ? mid.created_at : 'n/a' }}</div>
					<div>{{ mid.vip ? mid.vip : 'n/a' }}</div>
					<div>{{ mid.price ? mid.price : 'n/a' }}</div>
				</div>
			</div>
		</template>

		<v-row v-else-if="smsstatuses!=null && !loading">
			<v-col>
			<v-alert prominent text type="info">Tidak ada data yang tersedia</v-alert>
			</v-col>
		</v-row>
		<v-skeleton-loader
			v-else
			class="mx-auto mt-5"
			type="list-item-avatar-three-line, list-item-avatar-three-line, list-item-avatar-three-line"
		></v-skeleton-loader>
	</section>
</template>

<script>
import UserService from "@/services/UserService"
export default {
	name:"SmsStatusPage",
	data() {
		return {
			loading: true,
			smsstatuses:null
		}
	},
	methods:{
		async fetchStatus(n) {
			this.loading = true
			try {
				const res = await UserService.fetchStatusSms(n);
				this.smsstatuses = res.data.data
				this.loading = true
			} catch (error) {
				console.log(error);
				this.loading = true
			}
		}
	},
	mounted() {
		this.fetchStatus(1);
	}
}
</script>

<style lang="scss">
.status-item {
	border-top: 1px solid rgba(255, 236, 236, .5);
	padding: 20px 15px;
	line-height: 25px;
}
div .status-item:last-child {
	border-bottom: 1px solid rgba(255, 236, 236, .5);
}
</style>
