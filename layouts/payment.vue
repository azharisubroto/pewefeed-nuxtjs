<template>
	<v-app>
		<v-sheet>
			<v-app-bar dark color="dark" flat fixed tile class="main-app-bar">
				<v-btn @click="historyBack()" small icon>
					<v-icon>mdi-chevron-left</v-icon>
				</v-btn>
				<div class="flex-grow-1"></div>
				<v-toolbar-title
					@click="
						$router.push('/')
						drawer = false
					"
					class="px-0"
				>
					KEANGGOTAAN VIP
				</v-toolbar-title>
				<div class="flex-grow-1"></div>

				<div v-if="$route.name != 'index'">
					<v-img
						@click="$router.push('/')"
						src="/img/peweicon.svg"
						width="20"
					></v-img>
				</div>
			</v-app-bar>

			<v-main>
				<nuxt class="mb-10 pb-10"></nuxt>
				<!-- NAVIGATION -->
				<v-bottom-navigation
					fixed
					dark
					grow
					color="white"
					background-color="#2c2c2d"
				>
					<v-btn
						small
						class="text-center"
						v-for="item in tabItems"
						:key="item.name"
						:to="item.to"
					>
						<span style="font-size: 8px" v-html="item.name"></span>
					</v-btn>
				</v-bottom-navigation>
			</v-main>
		</v-sheet>
	</v-app>
</template>

<script>
export default {
	name: "payment",
	data() {
		return {
			tabItems: [
				{
					name: "Paket VIP",
					to: "/purchase",
				},
				{
					name: "Transaksi via<br>XENDIT/MIDTRANS",
					to: "/member/status_transfer",
				},
				{
					name: "Transaksi via<br>SMS",
					to: "/member/status_transfer_sms",
				},
				{
					name: "Aktivasi<br>32 Digit Kode VIP",
					to: "/c/",
				},
			],
		}
	},
	methods: {
		methods: {
			historyBack() {
				this.$router.back()
			},
		},
	},
}
</script>
