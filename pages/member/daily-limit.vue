<template>
	<div>
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
			<div style="padding-top: 56px" class="profile-page">
				<v-tabs-items v-model="tab_state">
					<!-- PAKET PEMBELIAN -->
					<v-tab-item key="Paket Pembelian">
						<v-container>
							<ProductCard
								title="Paket Non-Berlangganan"
								to="/member/purchase-daily"
							>
								<div class="px-4 py-5">
									<div
										class="d-flex align-center justify-space-between"
									>
										<div>
											<h4 class="text-16 text-thirdary">
												Ekstra 300 - Batas Poin VIP
												Harian
											</h4>
											Rp 10.000 (belum termasuk PPN
											10%)<br />
											Berlaku hingga pukul 23:59:59
										</div>
										<div class="text-right">
											<v-icon> mdi-chevron-right </v-icon>
										</div>
									</div>
								</div>
							</ProductCard>
						</v-container>
					</v-tab-item>

					<!-- INFORMASI -->
					<v-tab-item key="Informasi">
						<v-container>
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
										<p v-html="item.content"></p>
									</v-expansion-panel-content>
								</v-expansion-panel>
							</v-expansion-panels>
						</v-container>

						<v-list-item-group color="dark" class="d-none mt-10">
							<div class="devider-small"></div>
							<v-list-item class="py-3" to="/about-daily-limit">
								<v-list-item-content>
									<v-list-item-title>
										Apa itu Daily Limit?
									</v-list-item-title>
								</v-list-item-content>
								<v-list-item-icon>
									<v-icon>mdi-chevron-right</v-icon>
								</v-list-item-icon>
							</v-list-item>

							<div class="devider-small"></div>
							<v-list-item
								class="py-3"
								to="/member/purchase-daily"
								:disabled="batas >= 600"
							>
								<v-list-item-content>
									<v-list-item-title
										style="line-height: 26px"
									>
										Purchase Extra 300 VIP Daily Limit<br />
										Rp. 10.000 (exclude PPN 10%)
									</v-list-item-title>
								</v-list-item-content>
								<v-list-item-icon>
									<v-icon>mdi-chevron-right</v-icon>
								</v-list-item-icon>
							</v-list-item>
							<div class="devider-small"></div>
						</v-list-item-group>
					</v-tab-item>
				</v-tabs-items>
			</div>
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
	</div>
</template>

<script>
import ProductCard from "@/components/ProductCard"
import StaticService from "@/services/HelpService"
import HelpService from "@/services/HelpService"
export default {
	middleware: "auth",
	layout: "blank",
	components: {
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
			remaining: 0,
			profile: null,
			token: null,
			avatar_preview: "",
			login: false,
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
			userdata: [],
			usermentah: [],
			mypoint: null,
			snackbar: false,
			dropOptions: {
				url: "https://api.pewefeed.com/api/member/avatar",
				headers: {
					Authorization: "",
					"Cache-Control": "",
				},
				method: "POST",
				paramName: "avatar",
				withCredentials: false,
				thumbnailWidth: 100,
				thumbnailHeight: 100,
			},
			isActive: false,
			expire_date: "",
			dialog: false,
			buyVipDialogVisible: false,
			personmenu: [
				{
					name: "Points History",
					to: "/member/histori_penggunaan_poin",
					poin: true,
				},
				{
					name: "Purchase KEANGGOTAAN VIP",
					to: "/purchase",
				},
				{
					name: "Rewards Status",
					to: "/member/barang_yang_didapat",
				},
				{
					name: "Address List for Rewards",
					to: "/member/pengaturan/daftar-alamat",
				},
				{
					name: "Phone List for Rewards",
					to: "/member/pengaturan/daftar-nomor",
				},
				{
					name: "Bank Transfer Status",
					to: "/member/status_transfer",
				},
				{
					name: "VIP Code from SMS",
					to: "/member/kode-pw",
				},
			],
			batas: 0,
			sekarang: 0,
		}
	},
	methods: {
		fetchUserdata() {
			this.setProfile()
			this.isLoggedIn = true
		},
		percentage(partialValue, totalValue) {
			return (100 * partialValue) / totalValue
		},
		async fetchHelp() {
			try {
				const res = await HelpService.getDailyLimit()
				this.informasi = res.data.data
			} catch (error) {
				console.log(error)
			}
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
				this.remaining = this.percentage(limit[0], limit[1])

				this.dropOptions.headers.Authorization =
					"Bearer " + res.data.token
				this.avatar_preview = res.data.data.avatar
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
	},
	mounted() {
		this.setProfile()
		this.fetchHelp()
	},
}
</script>
<style lang="scss">
.text-thirdary {
	color: $cream;
}

.profile-bag {
	background: transparent;
	color: #fff;
	border-top: 0 !important;
	border-bottom: 0 solid transparent !important;
}
.profile-page {
	.v-progress-linear {
		border-radius: 90px !important;
		overflow: hidden;
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
