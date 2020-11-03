<template>
	<section class="finish-page">
		<div v-if="loading">
			<v-skeleton-loader
				class="mx-auto mt-5"
				type="list-item-avatar-three-line, list-item-avatar-three-line, list-item-avatar-three-line"
			></v-skeleton-loader>
		</div>
		<div v-else>
			<template v-if="datamidtrans != null && datamidtrans.length > 0">
				<div
					class="status-item"
					v-for="(mid, i) in datamidtrans"
					:key="i"
				>
					<div class="deep-orange--text text-18">
						<strong>{{ "#" + mid.order_id }}</strong>
					</div>
					<div class="text-16">
						<div>{{ mid.created_at ? mid.created_at : "n/a" }}</div>
						<div>
							{{
								mid.voucher.description
									? mid.voucher.description
									: "n/a"
							}}
						</div>
						<div>
							{{ mid.voucher.price ? mid.voucher.price : "n/a" }}
						</div>
						<a
							:href="downloadUrl(mid.order_id)"
							target="blank"
							style="text-decoration: none"
							class="mt-5 v-btn v-btn--block v-btn--depressed v-size--large theme--dark v-size--default deep-orange"
							>DOWNLOAD INVOICE</a
						>
					</div>
				</div>
			</template>
			<v-row class="mx-0" v-else>
				<v-col cols="12">
					<div class="text-center pa-5">
						<v-btn rounded color="#7D7D7D" class="text--italic px-5"
							>no data</v-btn
						>
					</div>
				</v-col>
			</v-row>
		</div>
	</section>
</template>
<script>
import UserService from "@/services/UserService"
export default {
	name: "Sukses",
	data() {
		return {
			midtranscallback: [],
			datamidtrans: [],
			list: false,
			loading: true,
		}
	},
	methods: {
		async fetchData() {
			try {
				const res = await UserService.statusTransfer()
				if (res.data.data.finish.length > 0) {
					this.list = true
				}
				this.loading = false
				////console.log(res);
				this.datamidtrans = res.data.data.finish
				//console.log(JSON.parse(JSON.stringify(this.datamidtrans)));
			} catch (error) {
				console.log(error)
			}
		},
		downloadUrl(order_id) {
			return "https://payment.playworld.id/api/midtrans/print/" + order_id
		},
	},
	mounted() {
		this.fetchData()
	},
}
</script>
<style lang="scss">
.finish-page .v-icon:not(.rel) {
	color: #ff5722 !important;
	position: absolute;
	top: 10px;
	right: 10px;
}
.status-item {
	border-top: 1px solid rgba(255, 236, 236, 0.5);
	padding: 20px 15px;
	line-height: 25px;
}
div .status-item:last-child {
	border-bottom: 1px solid rgba(255, 236, 236, 0.5);
}
</style>
