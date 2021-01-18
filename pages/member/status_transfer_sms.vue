<template>
	<section>
		<v-container>
			<v-alert class="mt-4" color="#0057FF" prominent>
				<template v-slot:prepend>
					<v-img
						src="/img/icons/info.svg"
						width="35"
						max-width="35"
						class="mr-3 infoarticleicon"
					></v-img>
				</template>
				Berikut adalah transaksi sukses pembelian VIP dengan SMS
			</v-alert>
		</v-container>

		<v-container v-if="smsstatuses != null && smsstatuses.length > 0">
			<v-card
				v-for="(mid, i) in smsstatuses"
				:key="i"
				style="border: 1px solid #fff"
				outlined
				class="mb-4"
			>
				<div style="background: #404040" class="px-3 py-1 text-16">
					<v-row align="center" justify="space-between">
						<v-col cols="6">
							<strong>{{ "#" + mid.order_id }}</strong>
						</v-col>
						<v-col cols="6">
							{{ mid.created_at }}
						</v-col>
					</v-row>
				</div>

				<div class="devider-small"></div>

				<div class="px-4 py-4">
					<div class="font-weight-bold text-thirdary">
						{{ mid.vip ? mid.vip : "n/a" }}
					</div>
					<div>{{ mid.price ? mid.price : "n/a" }}</div>
				</div>
			</v-card>

			<v-btn
				v-if="pagination.current_page < pagination.last_page"
				color="#ff4200"
				depressed
				block
				@click="fetchStatus(parseInt(pagination.current_page + 1))"
			>
				Show More
			</v-btn>
		</v-container>

		<v-row v-else-if="smsstatuses != null && !loading">
			<v-col>
				<v-alert prominent text type="info"
					>Tidak ada data yang tersedia</v-alert
				>
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
	name: "SmsStatusPage",
	layout: "payment",
	data() {
		return {
			loading: true,
			smsstatuses: null,
			pagination: {
				current_page: 1,
				last_page: 1,
				per_page: 10,
				total: 1,
			},
		}
	},
	methods: {
		async fetchStatus(n) {
			this.loading = true
			try {
				const res = await UserService.fetchStatusSms(n)
				console.log(res.data.data)
				this.smsstatuses = res.data.data
				this.pagination = res.data.paginate
				this.loading = true
			} catch (error) {
				console.log(error)
				this.loading = true
			}
		},
	},
	mounted() {
		this.fetchStatus(1)
	},
}
</script>

<style lang="scss">
.status-item {
	border-top: 1px solid rgba(255, 236, 236, 0.5);
	padding: 20px 15px;
	line-height: 25px;
}
div .status-item:last-child {
	border-bottom: 1px solid rgba(255, 236, 236, 0.5);
}
</style>
