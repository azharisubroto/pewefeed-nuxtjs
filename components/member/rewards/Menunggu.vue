<template>
	<section class="selesai-page">
		<v-container>
			<v-row class="d-none">
				<v-col cols="12">
					<div class="caption">Barang Yang Didapatkan</div>
					<h3>Menunggu Respon</h3>
				</v-col>
			</v-row>
			<v-skeleton-loader
				v-if="loading"
				class="mx-auto mt-5"
				type="list-item-avatar-three-line, list-item-avatar-three-line, list-item-avatar-three-line"
			></v-skeleton-loader>
			<template v-else>
				<v-row v-if="list != null && list.length > 0">
					<v-col>
						<template v-if="list && list.length">
							<v-card
								v-for="item in list"
								:key="type + '-' + item.id"
								:elevation="2"
								class="mb-4 bdr"
								color="#303030"
								@click="
									apply_drawer = !apply_drawer
									apply_form = item
									pass_item = item
								"
							>
								<RewardContent :type="type" :item="item" />
							</v-card>
						</template>

						<div class="text-center">
							<v-btn
								v-if="page < totalpage"
								depressed
								medium
								color="#ff4200"
								dark
								@click="fetchWait(type, parseInt(page + 1), 10)"
							>
								Show More
							</v-btn>
						</div>
						<br />
						<br />
						<br />
						<br />
					</v-col>
				</v-row>
				<v-row v-else>
					<v-col>
						<div class="text-center pa-5">
							<v-btn
								rounded
								color="#7D7D7D"
								class="text--italic px-5"
								>no data</v-btn
							>
						</div>
					</v-col>
				</v-row>
			</template>
		</v-container>

		<!-- FORM DRAWER TAMBAH ALAMAT -->
		<v-navigation-drawer
			v-model="apply_drawer"
			fixed
			temporary
			stateless
			width="100%"
			:right="true"
			color="#1C1C1C"
		>
			<template v-if="pass_item != null">
				<v-toolbar dark color="#272727" elevation="0">
					<v-row no-gutters align="center">
						<v-col class="text-left">
							<button
								icon
								class="mr-2"
								@click="
									apply_drawer = false
									apply_form = null
								"
							>
								<v-icon>mdi-close</v-icon>
							</button>
						</v-col>
						<v-col class="text-center">
							{{ pass_item.customer_redeem.redeem_code }}
						</v-col>
						<v-col class="text-right pr-0">
							<img src="/img/peweicon.svg" />
						</v-col>
					</v-row>
				</v-toolbar>
				<v-divider></v-divider>

				<div class="px-3 mt-4">
					<!-- MENUNGGU -->
					<template v-if="type == 'wait'">
						<v-card
							style="border: 1px solid #bababa !important"
							class="pb-0 mb-4"
							color="#303030"
						>
							<div class="px-4 pt-4">
								<v-row>
									<v-col cols="2" class="pr-0">
										<div class="jangan lighten-1">
											<v-img
												:src="
													pass_item.image
														? pass_item.image
														: '/img/user.jpeg'
												"
											></v-img>
										</div>
									</v-col>
									<v-col cols="10">
										<div class="text-12 mb-1">
											Nama Rewards
										</div>
										<h4
											class="reward-title text-12 text-uppercase font-weight-normal mb-3"
										>
											{{ pass_item.title }}
										</h4>

										<div class="text-12 mb-1">
											Tanggal Terima
										</div>
										<h4
											class="reward-title text-12 font-weight-normal mb-3"
										>
											{{ pass_item.created_at }}
										</h4>

										<div class="text-12 mb-1">
											Rewards didapatkan di :
										</div>
										<h4
											class="reward-title text-12 font-weight-normal mb-4"
										>
											<NuxtLink
												:to="
													'/tukarpoin/redeem/' +
													pass_item.redeem_id
												"
												class="reward-title text-12"
												style="
													text-decoration: underline;
												"
											>
												https://m.pewefeed.com/tukarpoin/redeem/{{
													pass_item.redeem_id
												}}
											</NuxtLink>
										</h4>
									</v-col>
								</v-row>
							</div>

							<v-divider
								style="border-color: #bababa"
							></v-divider>

							<div class="px-4 pt-5 pb-5">
								<!-- WAIT -->
								<template v-if="type == 'wait'">
									<v-select
										v-if="pass_item.typeId == '2'"
										v-model="id_tujuan"
										:items="
											contact
												? contact
												: ['Belum ada nomor']
										"
										outlined
										background-color="#fff"
										dense
										light
										item-text="title"
										item-value="id"
										class="noborderexception"
										color="#ff4200"
										item-color="#ff4200"
										placeholder="Pilih Tujuan Penerima"
										hide-details
									/>

									<v-select
										v-if="pass_item.typeId == '1'"
										v-model="id_tujuan"
										:items="
											addresses
												? addresses
												: ['Belum ada alamat']
										"
										placeholder="Pilih Alamat"
										outlined
										background-color="#fff"
										dense
										item-text="title"
										item-value="id"
										class="noborderexception"
										color="#000"
										item-color="#000"
										hide-details
										light
									/>
								</template>

								<!-- PROCESS -->
								<template
									v-if="
										type == 'process' ||
										type == 'confirmation' ||
										type == 'finish'
									"
								>
									<div class="text-12">Tujuan Penerima</div>
									<h4
										class="reward-title text-12 font-weight-normal mb-3"
									>
										<template v-if="pass_item.destination">
											{{ pass_item.destination.name }}
											<br />
											<div
												v-html="
													pass_item.destination
														.description
												"
											></div>
											{{ pass_item.destination.number }}
										</template>
										<template v-else>
											Data not found (backend response
											doesn't exists)
										</template>
									</h4>
								</template>

								<div class="my-3"></div>

								<v-btn
									v-if="
										type == 'wait' &&
										pass_item.typeId == '2'
									"
									color="#ff4200"
									dark
									block
									depressed
									large
									class="text-12"
									@click="
										pin_verification = !pin_verification
										nextAction = 'claimDigital'
									"
								>
									Proses Rewards
								</v-btn>

								<v-btn
									v-if="
										type == 'wait' &&
										pass_item.typeId == '1'
									"
									color="#ff4200"
									dark
									block
									depressed
									large
									class="text-12"
									@click="
										pin_verification = !pin_verification
										nextAction = 'claimFisik'
									"
								>
									Proses Rewards
								</v-btn>

								<p
									v-if="type == 'wait'"
									class="text-12 text-center mb-0 mt-3 pb-3"
								>
									Data Tidak Ditemukan?
									<br />
									<NuxtLink
										style="
											color: #ff4200;
											text-decoration: underline;
										"
										:to="
											pass_item.type == 'Non Fisik'
												? '/member/pengaturan/daftar-nomor'
												: '/member/pengaturan/daftar-alamat'
										"
										>Tambah Tujuan</NuxtLink
									>
								</p>
							</div>
						</v-card>
					</template>

					<!-- PROSESS -->
					<template
						v-if="
							type == 'process' ||
							type == 'confirmation' ||
							type == 'finish'
						"
					>
						<div class="pt-4">
							<template v-if="type == 'finish'">
								<v-alert color="#0057FF" prominent>
									<template v-slot:prepend>
										<v-img
											src="/img/icons/success.svg"
											width="35"
											max-width="35"
											class="mr-3 infoarticleicon"
										></v-img>
									</template>
									<span class="text-12"
										>Rewards ini sudah diterima tanggal
										2020-01-01 10:00</span
									>
								</v-alert>
							</template>

							<div class="text-right">
								<v-btn
									v-if="
										type == 'process' ||
										type == 'confirmation'
									"
									color="#ff4200"
									dark
									depressed
									class="text-12"
									width="135"
									height="36"
									@click="
										postProcess = true
										pass_item_2 = pass_item
									"
								>
									<span class="text-12">Lacak</span>
								</v-btn>

								<!-- Confirmation -->
								<v-btn
									v-if="type == 'confirmation'"
									@click="
										pin_verification = !pin_verification
										nextAction = 'confirm'
									"
									color="#ff4200"
									dark
									depressed
									class="text-12"
									height="36"
								>
									<span
										style="
											text-transform: capitalize !important;
										"
										>Sudah Diterima</span
									>
								</v-btn>
							</div>
						</div>

						<v-card
							style="border: 1px solid #bababa !important"
							class="pb-0 mb-4 mt-4"
							color="#303030"
						>
							<div class="item-detail">
								<v-row>
									<v-col cols="4"> Rewards </v-col>
									<v-col cols="8">
										{{ pass_item.title }}
									</v-col>
								</v-row>
							</div>
							<div class="item-detail">
								<v-row>
									<v-col cols="4"> Tanggal Penukaran </v-col>
									<v-col cols="8">
										{{ pass_item.created_at }}
									</v-col>
								</v-row>
							</div>
							<div class="item-detail">
								<v-row>
									<v-col cols="4">
										Rewards didapatkan di
									</v-col>
									<v-col cols="8">
										<NuxtLink
											:to="
												'/tukarpoin/redeem/' +
												pass_item.redeem_id
											"
											class="reward-title text-12"
											style="text-decoration: underline"
										>
											https://m.pewefeed.com/tukarpoin/redeem/{{
												pass_item.redeem_id
											}}
										</NuxtLink>
									</v-col>
								</v-row>
							</div>
							<div class="item-detail">
								<v-row>
									<v-col cols="4"> Tujuan Penerima </v-col>
									<v-col cols="8">
										{{ pass_item.destination.name }}
									</v-col>
								</v-row>
							</div>

							<!-- FISIK ONLY -->
							<template
								v-if="pass_item.type == 'Fisik - Delivery'"
							>
								<div class="item-detail">
									<v-row>
										<v-col cols="4"> Alamat </v-col>
										<v-col cols="8">
											{{ pass_item.destination.address }}
										</v-col>
									</v-row>
								</div>
								<div class="item-detail">
									<v-row>
										<v-col cols="4"> Kabupaten/Kota </v-col>
										<v-col cols="8">
											{{ pass_item.destination.district }}
										</v-col>
									</v-row>
								</div>
								<div class="item-detail">
									<v-row>
										<v-col cols="4"> Kabupaten/Kota </v-col>
										<v-col cols="8">
											{{ pass_item.destination.district }}
										</v-col>
									</v-row>
								</div>
								<div class="item-detail">
									<v-row>
										<v-col cols="4"> Kecamatan </v-col>
										<v-col cols="8">
											{{
												pass_item.destination
													.sub_district
											}}
										</v-col>
									</v-row>
								</div>
								<div class="item-detail">
									<v-row>
										<v-col cols="4"> Kelurahan </v-col>
										<v-col cols="8">
											{{
												pass_item.destination
													.urban_village
													? pass_item.destination
															.urban_village
													: "n/a"
											}}
										</v-col>
									</v-row>
								</div>
								<div class="item-detail">
									<v-row>
										<v-col cols="4"> Kode Pos </v-col>
										<v-col cols="8">
											{{ pass_item.destination.zip_code }}
										</v-col>
									</v-row>
								</div>
							</template>

							<!-- DIGITAL ONLY -->
							<template v-else>
								<div class="item-detail">
									<v-row>
										<v-col cols="4">
											Tipe / Penyedia
										</v-col>
										<v-col cols="8">
											{{
												pass_item.destination
													.description
											}}
										</v-col>
									</v-row>
								</div>
								<div class="item-detail">
									<v-row>
										<v-col cols="4"> Nomor Akun </v-col>
										<v-col cols="8">
											{{ pass_item.destination.number }}
										</v-col>
									</v-row>
								</div>
							</template>
						</v-card>
					</template>
				</div>
			</template>
		</v-navigation-drawer>

		<!-- CONFIRM DIALOGUE -->
		<v-bottom-sheet dark width="600px" v-model="postProcess">
			<v-toolbar :elevation="1" style="border-top: 2px solid #fff">
				<!-- Arrow -->
				<v-btn
					dark
					icon
					tile
					style="border-right: 0px solid #717171"
					light
					@click="postProcess = !postProcess"
				>
					<v-icon>mdi-close</v-icon>
				</v-btn>

				<!-- Title -->
				<v-toolbar-items>
					<v-btn dark text class="white--text">INFORMASI</v-btn>
				</v-toolbar-items>
				<div class="flex-grow-1"></div>
			</v-toolbar>

			<v-sheet color="#2C2C2D" class="px-4 py-10 text-center">
				<div class="mb-0 text-14">
					<template v-if="type == 'wait'">
						<v-img
							:src="
								success
									? '/img/checklist.png'
									: '/img/close.png'
							"
							max-width="60"
							class="mx-auto mb-3"
						></v-img>
						{{
							success
								? "Rewards kamu telah masuk ke antrian kami untuk segera diproses"
								: "Prosess gagal, silahkan coba beberapa saat lagi"
						}}
					</template>

					<!-- PROICESS -->
					<template v-if="type == 'process'">
						<v-img
							src="/img/icons/info.svg"
							max-width="60"
							class="mx-auto mb-3"
						></v-img>
						Data Rewards kamu dalam proses verifikasi, maksimal 3
						hari kerja
					</template>

					<!-- FINISH -->
					<tempate v-if="type == 'finish'">
						<v-img
							:src="
								success
									? '/img/checklist.png'
									: '/img/close.png'
							"
							max-width="60"
							class="mx-auto mb-3"
						></v-img>
						{{
							success
								? "Terimakasih atas konfirmasi Anda"
								: "Konfirmasi gagal, silahkan coba beberapa saat lagi"
						}}
					</tempate>

					<template v-if="type == 'confirmation' && !confirmed">
						<template v-if="pass_item_2 != null">
							<v-img
								src="/img/icons/info.svg"
								max-width="45"
								class="mx-auto mb-3"
							></v-img>

							<div class="text-left">
								<v-row>
									<v-col cols="5"> Rewards Dikirim </v-col>
									<v-col cols="7">
										{{ pass_item_2.created_at }}
									</v-col>
									<!-- Resi -->
									<v-col cols="5" class="pt-1">
										Nomor Resi
									</v-col>
									<v-col cols="7" class="pt-1">
										{{ pass_item_2.delivery.nomor_resi }}
										<v-btn
											small
											color="#ff4200"
											dark
											class="ml-2"
											min-width="30"
											width="30"
											max-height="30"
											height="30"
											depressed
											@click="
												copyToClipBoard(
													pass_item_2.delivery
														.nomor_resi
												)
											"
											><img
												src="/img/icons/copy.svg"
												alt=""
										/></v-btn>
									</v-col>
								</v-row>

								<!-- Foto Resi -->
								<img :src="pass_item_2.track.image" alt="" />
							</div>
						</template>

						<template v-if="confirmed">
							<v-img
								src="/img/icons/success.svg"
								max-width="45"
								class="mx-auto mb-3"
							></v-img>

							Terimakasih atas konfirmasi Anda
						</template>
					</template>

					<!-- BUTTON CEK REWARDS -->
					<v-btn
						v-if="type == 'wait' || type == 'finish'"
						@click="
							postProcess = !postProcess
							pin_verification = !pin_verification
							$bus.$emit('rewardtabclick', redirect)
						"
						color="#ff4200"
						class="mt-4"
						dark
						depressed
						medium
						block
					>
						Cek Rewards
					</v-btn>

					<!-- BUTTON TUTUP -->
					<v-btn
						v-if="type == 'process' || type == 'confirmation'"
						@click="
							postProcess = !postProcess
							pin_verification = false
						"
						color="#ff4200"
						class="mt-4"
						dark
						depressed
						medium
						block
					>
						Tutup
					</v-btn>
				</div>
			</v-sheet>
		</v-bottom-sheet>

		<!-- PIN CONFIRMATION -->
		<v-bottom-sheet dark width="100%" v-model="pin_verification">
			<v-sheet height="100%">
				<v-toolbar :elevation="1" style="border-top: 2px solid #fff">
					<!-- Arrow -->
					<v-btn
						dark
						icon
						tile
						style="border-right: 0px solid #717171"
						light
						@click="pin_verification = !pin_verification"
					>
						<v-icon>mdi-close</v-icon>
					</v-btn>

					<!-- Title -->
					<v-toolbar-items class="ml-2">
						<v-btn dark text class="pl-0" style="margin-left: -10px"
							>KONFIRMASI</v-btn
						>
					</v-toolbar-items>
					<div class="flex-grow-1"></div>
				</v-toolbar>

				<div class="px-4 py-10 text-center pindialog">
					<strong>Masukan 6 digit PIN</strong>
					<div class="my-3">
						<PincodeInput
							v-model="pin_code"
							:length="6"
							characterPreview
							secure
							:autofocus="true"
						/>

						<div class="mt-4">
							<v-btn
								@click="afterPin(nextAction)"
								color="#ff4200"
								medium
								height="40"
								depressed
							>
								Lanjutkan
							</v-btn>

							<div class="mt-2">
								Belum Punya PIN?
								<v-btn
									to="/member/pengaturan/pin"
									text
									color="#ff4200"
									class="py-0"
									>Klik Disini</v-btn
								>
							</div>
						</div>
					</div>
				</div>
			</v-sheet>
		</v-bottom-sheet>
	</section>
</template>
<script>
import UserService from "@/services/UserService"
import RewardContent from "@/components/member/rewards/RewardContent"
export default {
	name: "Menunggu",
	props: ["addresses", "contact", "type", "redirect"],
	components: {
		RewardContent,
	},
	data() {
		return {
			loading: true,
			list: [],
			isNotFound: true,
			paged: 1,
			last_page: 1,
			page: 1,
			totalpage: 1,
			apply_drawer: false,
			apply_form: null,
			id_tujuan: null,
			pass_item: null,
			pass_item_2: null,
			postProcess: false,
			success: false,
			pin_verification: false,
			pin_code: "",
			nextAction: "",
			confirmed: true,
		}
	},
	methods: {
		afterPin(nextAction) {
			if (nextAction == "clainDigital") {
				this.claimDigital()
			} else if (nextAction == "claimFisik") {
				this.claimFisik()
			} else {
				this.confirm(
					this.pass_item.id,
					this.pass_item.customer_redeem.id
				)
			}
		},
		copyToClipBoard(text) {
			const copy = require("clipboard-copy")
			copy(text)
			setTimeout(() => {
				alert("Nomor resi berhasil disalin")
			}, 1000)
		},
		async confirm(id, customer_redeem_id) {
			if (
				this.pin_code != "" &&
				this.pin_code != this.$auth.user.data.pin
			) {
				alert("Kode Pin Salah")
				this.pin_code == ""
				return false
			} else {
				this.pin_verification = false
			}

			// Save it!
			var params = {
				id: id,
				customer_redeem_id: customer_redeem_id,
			}
			// console.log(params)

			try {
				const res = await UserService.confirmReward(params)
				// console.log(res)
				if (res.status == 200) {
					this.fetchRewards("confirmation", 1, 10, true)
					this.postProcess = !this.postProcess
					this.success = true
					this.confirmed = true
				}
			} catch (error) {
				console.log(error)
				this.postProcess = !this.postProcess
				this.success = false
			}
		},
		async fetchWait(type, paged, limit, reset = false) {
			try {
				const res = await UserService.rewards(type, paged, limit)
				if (res.data.data.length > 0) {
					const items = res.data.data

					if (reset != true) {
						items.forEach((el) => {
							this.list.push(el)
						})
					} else {
						this.list = items
					}
					//this.list.push(items)
				}

				this.totalpage = res.data.pagination.last_page
				this.paged = res.data.pagination.current_page
				this.loading = false
				if (res.data.data.length > 0) {
					this.isNotFound = false
				}
				//console.log(JSON.parse(JSON.stringify(res.data)))
			} catch (error) {
				console.log(error)
				this.loading = false
			}
		},
		async claimDigital() {
			if (
				this.pin_code != "" &&
				this.pin_code != this.$auth.user.data.pin
			) {
				alert("Kode Pin Salah")
				this.pin_code == ""
				return false
			} else {
				this.pin_verification = false
			}

			// id, customer_redeem_id, telepon_id
			if (this.apply_form == null) return false
			var params = {
				id: this.apply_form.id,
				customer_redeem_id: this.apply_form.customer_redeem.id,
				contact_id: this.id_tujuan,
			}
			//console.log(params)

			try {
				const res = await UserService.claimDigital(params)
				// console.log(res);
				if (res.status == 200) {
					this.success = true
				}
				this.postProcess = true
			} catch (error) {
				console.log(error)
				this.postProcess = true
				this.success = false
			}
		},
		async claimFisik() {
			if (
				this.pin_code != "" &&
				this.pin_code != this.$auth.user.data.pin
			) {
				alert("Kode Pin Salah")
				this.pin_code == ""
				return false
			} else {
				this.pin_verification = false
			}

			// id, customer_redeem_id, address_id
			if (this.apply_form == null) return false
			var params = {
				id: this.apply_form.id,
				customer_redeem_id: this.apply_form.customer_redeem.id,
				contact_id: this.id_tujuan,
			}
			//console.log(params)

			try {
				const res = await UserService.claimFisik(params)
				// console.log(res);
				if (res.status == 200) {
					this.success = true
				}
				this.postProcess = true
			} catch (error) {
				console.log(error)
				this.postProcess = true
				this.success = false
			}
		},
	},
	mounted() {
		this.fetchWait(this.type, 1, 10)
		// this.$bus.$on("refetchrewards", () => {
		// 	this.fetchWait()
		// })
		////console.log(JSON.parse(JSON.stringify(this.addresses)))
	},
}
</script>
<style lang="scss">
.bdr {
	border: 1px solid #bababa !important;
	border-radius: 5px !important;
}

.item-detail {
	padding: 10px 15px;
	border-bottom: 1px solid #bababa;
	font-size: 12px;
}
</style>
