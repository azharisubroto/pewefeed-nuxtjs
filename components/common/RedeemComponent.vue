<template>
	<v-card elevation="0" v-if="data">
		<div style="background: #f5f5f5; padding-bottom: 20px">
			<div class="orange jangan lighten-1 pa-2">
				<v-container class="py-0">
					<v-row align="center">
						<v-col cols="6" class="py-0">
							<v-img
								:aspect-ratio="1 / 2"
								:src="data.redeem.redeem.image"
								contain
							></v-img>
						</v-col>
						<v-col cols="6" class="py-0">
							<v-row>
								<v-col
									cols="4"
									style="margin-top: -5px !important"
								>
									<v-img
										src="https://be2ad46f1850a93a8329-aa7428b954372836cd8898750ce2dd71.ssl.cf6.rackcdn.com/assets/frontend/img/m-menu2/p.png"
									></v-img>
								</v-col>
								<v-col
									cols="8"
									style="margin-left: -15px"
									justify="center"
									align="left"
									class="pt-1"
								>
									<strong class="text-25">{{
										data.redeem.redeem.price
									}}</strong>
								</v-col>
								<v-col cols="12" justify="center" align="left">
									<strong class="text-20">{{
										data.redeem.title
									}}</strong>
								</v-col>
							</v-row>
						</v-col>
					</v-row>
				</v-container>
			</div>
			<div class="text-center mx-4">
				<v-row>
					<v-col cols="12">
						<label
							class="text-20"
							v-html="data.redeem.redeem.description"
						></label>
						<v-btn
							depressed
							color="deep-orange"
							dark
							to="/tukarpoin/"
							>TUKAR POIN</v-btn
						>
					</v-col>
				</v-row>
			</div>
		</div>
	</v-card>
</template>

<script>
import RedeemService from "@/services/RedeemService"
export default {
	data() {
		return {
			data: null,
		}
	},
	methods: {
		async getRedeem() {
			try {
				const res = await RedeemService.getRedeem()
				// //console.log(res.data.data.redeem)
				this.data = res.data.data
			} catch (error) {
				console.log(error)
			}
		},
	},
	mounted() {
		this.getRedeem()
	},
}
</script>
