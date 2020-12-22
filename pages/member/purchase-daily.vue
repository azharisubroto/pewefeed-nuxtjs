<template>
	<div class="paymentpage">
		<v-app-bar
			dark
			color="dark"
			flat
			fixed
			tile
			class="main-app-bar"
			style="z-index: 20"
		>
			<v-btn @click="$router.go(-1)" small icon>
				<v-icon>mdi-chevron-left</v-icon>
			</v-btn>
			<div class="flex-grow-1"></div>
			<v-toolbar-title>
				<strong>BATAS POIN VIP HARIAN</strong>
			</v-toolbar-title>
			<div class="flex-grow-1"></div>

			<div
				@click="
					$router.push('/')
					clearStorage()
				"
				class="pr-1"
			>
				<img src="/img/peweicon.svg" width="20" />
			</div>
		</v-app-bar>

		<v-main>
			<template v-if="step == 1">
				<v-container>
					<v-tabs-items v-model="tab_state">
						<v-tab-item key="Paket Pembelian">
							<!-- VIA SMS -->
							<ProductCard title="via SMS" class="mb-4">
								<v-list-item-group>
									<template v-for="(item, i) in smspayment">
										<div
											v-if="i == 0"
											class="devider-small"
											:key="'purchase-menu-devider-1' + i"
										></div>
										<v-list-item
											class="py-1"
											:key="'purchase-menu' + i"
											disabled
										>
											<v-list-item-content>
												<v-list-item-title
													style="line-height: 23px"
												>
													<strong
														class="d-block text-16 text-thirdary"
														>{{
															item.label
														}}</strong
													>
													<span
														class="d-block text-14"
														>{{ item.desc }}</span
													>
													<div class="text-10">
														tidak tersedia
													</div>
												</v-list-item-title>
											</v-list-item-content>
											<v-list-item-icon>
												<v-icon size="30"
													>mdi-chevron-right</v-icon
												>
											</v-list-item-icon>
										</v-list-item>
										<div
											class="devider-small"
											:key="'purchase-menu-devider' + i"
										></div>
									</template>
								</v-list-item-group>
							</ProductCard>

							<!-- BANK -->
							<ProductCard
								title="via BANK / CREDIT CARD"
								class="mb-4"
							>
								<v-list-item-group color="dark" class="mt-0">
									<template v-for="(item, i) in menu">
										<div
											class="devider-small"
											:key="'div-' + i"
										></div>
										<v-list-item
											class="py-3"
											@click="purchaseLink(item.to)"
											:key="'list-' + i"
										>
											<v-list-item-content
												class="text-16"
											>
												<v-list-item-title>
													<div
														class="text-thirdary text-16"
													>
														{{ item.title }}
													</div>
													<div class="text-14 mt-2">
														Menggunakan
														<span
															class="text-uppercase"
															>{{
																item.merchant
															}}</span
														>
														payment gateway
													</div>
												</v-list-item-title>
											</v-list-item-content>
											<v-list-item-icon>
												<v-icon
													>mdi-chevron-right</v-icon
												>
											</v-list-item-icon>
										</v-list-item>
									</template>
									<div class="devider-small"></div>
								</v-list-item-group>
							</ProductCard>

							<!-- e-wallet -->
							<ProductCard title="via E-WALLETS">
								<v-list-item-group color="dark" class="mt-0">
									<template v-for="(item, i) in ewalletsmenu">
										<div
											class="devider-small"
											:key="'div-' + i"
										></div>
										<v-list-item
											class="py-3"
											@click="
												eWalletPurchase(item.merchant)
											"
											:key="'list-' + i"
										>
											<v-list-item-content
												class="text-16"
											>
												<v-list-item-title>
													<div class="text-thirdary">
														{{ item.title }}
													</div>
													<div class="text-14 mt-2">
														Menggunakan XENDIT
														payment gateway
													</div>
												</v-list-item-title>
											</v-list-item-content>
											<v-list-item-icon>
												<v-icon
													>mdi-chevron-right</v-icon
												>
											</v-list-item-icon>
										</v-list-item>
									</template>
									<div class="devider-small"></div>
								</v-list-item-group>
							</ProductCard>
						</v-tab-item>

						<v-tab-item key="Informas">
							<v-expansion-panels v-model="info_state">
								<v-expansion-panel
									class="daily-info-card"
									v-for="(item, i) in informasi"
									:key="'info-' + i"
								>
									<v-expansion-panel-header>
										{{ item.title }}
									</v-expansion-panel-header>
									<v-expansion-panel-content>
										{{ item.content }}
									</v-expansion-panel-content>
								</v-expansion-panel>
							</v-expansion-panels>
						</v-tab-item>
					</v-tabs-items>
				</v-container>
			</template>
		</v-main>

		<!-- NAVIGATION -->
		<v-bottom-navigation
			fixed
			dark
			grow
			color="white"
			class="makehalf"
			background-color="#2c2c2d"
			v-model="tab_state"
		>
			<v-btn
				small
				class="text-center"
				v-for="item in tabItems"
				:key="item"
			>
				<span class="text-16">{{ item }}</span>
			</v-btn>
		</v-bottom-navigation>

		<IframePreview
			:dialogVisible="iframeDialogVisible"
			:invoiceUrl="invoiceUrl"
			@close="iframeClose()"
		/>

		<v-overlay :opacity="1" :value="ewalletOverlay">
			<div class="text-center">
				<v-progress-circular
					color="green"
					indeterminate
					size="64"
				></v-progress-circular>
				<div class="mt-4">Connecting Provider...</div>
			</div>
		</v-overlay>
	</div>
</template>

<script>
import ProductCard from "@/components/ProductCard"
import PurchaseService from "@/services/PurchaseService"
import UserService from "@/services/UserService"
import IframePreview from "@/components/modal/IframePreview"
export default {
	name: "PurcahsePage",
	layout: "blank",
	middleware: "auth",
	components: {
		IframePreview,
		ProductCard,
	},
	data() {
		return {
			tab_state: 0,
			tabItems: ["Paket Pembelian", "Informasi"],
			info_state: 0,
			informasi: [
				{
					title: "Tentang Batas Poin VIP Harian",
					content:
						'Setelah ia mencari maknanya di di literatur klasik, ia mendapatkan sebuah sumber yang tidak bisa diragukan. Lorem Ipsum berasal dari bagian 1.10.32 dan 1.10.33 dari naskah "de Finibus Bonorum et Malorum" (Sisi Ekstrim dari Kebaikan dan Kejahatan) karya Cicero, yang ditulis pada tahun 45 sebelum masehi.',
				},
				{
					title: "Metode Pembelian",
					content:
						'Setelah ia mencari maknanya di di literatur klasik, ia mendapatkan sebuah sumber yang tidak bisa diragukan. Lorem Ipsum berasal dari bagian 1.10.32 dan 1.10.33 dari naskah "de Finibus Bonorum et Malorum" (Sisi Ekstrim dari Kebaikan dan Kejahatan) karya Cicero, yang ditulis pada tahun 45 sebelum masehi.',
				},
			],
			step: 1,
			ewalletOverlay: false,
			merchant: null,
			invoiceUrl: "",
			iframeDialogVisible: false,
			data: {
				avatar: "",
				first_name: "",
				last_name: "",
				username: "",
				email: "",
				msisdn: "",
				expire: "",
				instagram: "",
				no_telp: "",
			},
			ewalletsmenu: [
				{
					title: "DANA",
					merchant: "dana",
				},
				{
					title: "LINKAJA",
					merchant: "linkaja",
				},
			],
			menu: [
				{
					title: "Bank BRI / BNI / MANDIRI / PERMATA",
					to: "bca",
					merchant: "xendit",
				},
				{
					title: "Bank BCA",
					to: "bca",
					merchant: "midtrans",
				},
			],
			smspayment: [
				{
					key: "xl",
					label: "XL",
					desc: "(Anda harus memiki nomor ponsel XL)",
				},
				{
					key: "indosat",
					label: "Indosat",
					desc: "(Anda harus memiki nomor ponsel INDOSAT)",
				},
			],
		}
	},
	mounted() {
		this.setProfile()
	},
	methods: {
		fetchUserdata() {
			this.setProfile()
			this.isLoggedIn = true
		},
		setProfile() {
			let vm = this
			this.$auth.fetchUser().then(() => {
				localStorage.setItem("userdata", JSON.stringify(vm.$auth.user))
			})
			// this.$auth.fetchUser();
			if (localStorage.getItem("userdata")) {
				var res = []
				res.data = JSON.parse(localStorage.getItem("userdata"))

				this.usermentah = res.data
				this.userdata = res.data.data
				this.mypoint = res.data.point_total
				this.profile = res.data.data

				var limit = res.data.point_limit
				limit = limit.split("/")
				this.sekarang = limit[0]
				this.batas = limit[1]
				this.remaining = limit[1] - limit[0]

				this.data.first_name = res.data.data.first_name
				this.data.last_name = res.data.data.last_name
				this.data.username = res.data.data.username
				this.data.msisdn = res.data.data.msisdn
				this.data.no_telp = res.data.data.no_telp
				this.data.instagram = res.data.data.instagram
				this.data.email = res.data.data.email
				this.data.expire = res.data.data.expire
				this.expire_date = this.data.expire
				if (res.data.data.status_expired == 1) {
					this.isActive = true
				}
				this.login = true
			}
		},
		async purchaseLink(merchant) {
			this.ewalletOverlay = true
			if (merchant != "bca") {
				const sendvoucher = {
					voucher_id: 204,
					email: this.data.email,
				}

				try {
					const res = await PurchaseService.xendit(sendvoucher)
					if (res.status == 200) {
						//console.log(res.data);
						this.invoiceUrl = res.data.invoice_url
						this.iframeDialogVisible = true
						this.ewalletOverlay = false
					}
				} catch (error) {
					console.log(error)
					this.ewalletOverlay = false
				}
			} else if (merchant == "bca") {
				const sendvoucher = {
					voucher_id: 204,
				}

				try {
					const res = await PurchaseService.midtrans(sendvoucher)
					if (res.status == 200) {
						// //console.log(res.data)
						var url = res.data.snap_url
						//window.open(url, "_blank");
						window.location.href = url
						this.ewalletOverlay = false
					}
				} catch (error) {
					console.log(error)
					this.ewalletOverlay = false
				}
			}
		},
		async eWalletPurchase(provider) {
			this.ewalletOverlay = true
			let data = {
				provider: provider,
				voucher_id: 204,
			}
			try {
				const res = await UserService.eWalletBuy(data)
				//console.log(res.data.invoice_url);
				//window.open(res.data.invoice_url, "_blank");
				window.location.href = res.data.invoice_url
				this.ewalletOverlay = false
			} catch (error) {
				console.log(error)
				this.ewalletOverlay = false
			}
		},
		closeDialog() {
			this.e1 = 1
			this.intDialogVisible = false
		},
		iframeClose() {
			this.iframeDialogVisible = false
			this.$router.push("/member/status_transfer")
			// other code
		},
		iframePreview() {
			this.iframeDialogVisible = true
		},
	},
}
</script>
<style lang="scss">
.paymentpage {
	.v-list-item--disabled {
		.v-list-item__icon {
			display: none;
		}
	}
}
.theme--dark.v-expansion-panels {
	.daily-info-card {
		background: #1c1c1c;
		border: 1px solid #fff;
		color: #fff;
		box-shadow: none !important;
		overflow: hidden;
		border-radius: 5px !important;
		overflow: hidden !important;
		.v-expansion-panel-header {
			background: #404040;
		}
		.v-expansion-panel-content__wrap {
			padding: 20px !important;
		}
		&.v-expansion-panel {
			border-radius: 5px !important;
			overflow: hidden !important;
			margin: 5px 0 !important;
		}
		&.v-item--active.v-expansion-panel {
			border-radius: 5px !important;
			.v-expansion-panel-header--active {
				border-bottom: 1px solid #bababa !important;
			}
			.v-expansion-panel-content__wrap {
				padding: 20px !important;
			}
		}
	}
}
</style>
