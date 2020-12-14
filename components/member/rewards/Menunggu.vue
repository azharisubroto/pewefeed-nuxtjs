<template>
	<section class="selesai-page">
		<v-container>
			<v-row class="d-none">
				<v-col cols="12">
					<div class="caption">Barang Yang Didapatkan</div>
					<h3>Menunggu Respon</h3>
				</v-col>
			</v-row>
			<v-row v-if="list != null && !loading">
				<v-col>
					<template v-if="list && list.length">
						<v-card
							v-for="item in list"
							:key="item.id"
							:elevation="2"
							class="mb-4 bdr"
							@click="
								apply_drawer = !apply_drawer
								apply_form = item
								pass_item = item
							"
						>
							<RewardContent :type="type" :item="item" />
						</v-card>
					</template>

					<v-pagination
						v-if="list && list.length"
						v-model="page"
						:length="totalpage"
						color="orange"
						@input="next"
					></v-pagination>
					<br />
					<br />
					<br />
					<br />
				</v-col>
			</v-row>
			<v-row v-else-if="list == null && !loading">
				<v-col>
					<div class="text-center pa-5">
						<v-btn rounded color="#7D7D7D" class="text--italic px-5"
							>no data</v-btn
						>
					</div>
				</v-col>
			</v-row>
			<v-skeleton-loader
				v-else
				class="mx-auto mt-5"
				type="list-item-avatar-three-line, list-item-avatar-three-line, list-item-avatar-three-line"
			></v-skeleton-loader>
		</v-container>

		<!-- FORM DRAWER TAMBAH ALAMAT -->
		<v-navigation-drawer
			v-model="apply_drawer"
			fixed
			temporary
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
					<v-card
						style="border: 1px solid #fff !important"
						class="px-4 pt-4 pb-0 mb-4"
						color="transparent"
					>
						<v-row>
							<v-col cols="3" class="pr-0">
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
							<v-col cols="9">
								<div class="text-12">Nama Rewards</div>
								<h4
									class="reward-title text-12 font-weight-normal mb-3"
								>
									{{ pass_item.title }}
								</h4>

								<div class="text-12">Tanggal Terima</div>
								<h4
									class="reward-title text-12 font-weight-normal mb-3"
								>
									{{ pass_item.created_at }}
								</h4>

								<div class="text-12">
									Halaman Penukaran Poin :
								</div>
								<h4
									class="reward-title text-12 font-weight-normal mb-4"
								>
									Tukar Poin<br />
									<a href="#" class="reward-title text-12"
										>Tautan</a
									>
								</h4>

								<!-- WAIT -->
								<template v-if="type == 'wait'">
									<label class="mb-2 d-block text-12"
										>Pilih Tujuan Penerima</label
									>

									<v-select
										v-model="id_tujuan"
										:items="
											contact
												? contact
												: ['Belum ada nomor']
										"
										placeholder="Pilih Nomor"
										outlined
										background-color="#404040"
										dense
										item-text="title"
										item-value="id"
										class="noborderexception"
										color="#ff4200"
										item-color="#ff4200"
									/>

									<p class="text-12 my-0 pb-3">
										Data Tidak Ditemukan?
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
								</template>

								<!-- PROCESS -->
								<template
									v-if="
										type == 'process' ||
										type == 'confirmation'
									"
								>
									<div class="text-12">Tujuan Penerima</div>
									<h4
										class="reward-title text-12 font-weight-normal mb-3"
									>
										<template v-if="pass_item.delivery">
											{{
												pass_item.delivery.name &&
												"Nama: " +
													pass_item.delivery.name
											}}
											<br />
											{{
												pass_item.delivery.kurir &&
												"Kurir: " +
													pass_item.delivery.kurir
											}}
											<br />
											{{
												pass_item.delivery.nomor_resi &&
												"Nomor Resi: " +
													pass_item.delivery
														.nomor_resi
											}}
											<br />
											{{
												pass_item.delivery.nomor_hp &&
												"Nomor HP: " +
													pass_item.delivery.nomor_hp
											}}
										</template>
										<template v-else>
											Data not found (backend response
											doesn't exists)
										</template>
									</h4>
								</template>
							</v-col>
						</v-row>
					</v-card>

					<v-btn
						v-if="type == 'wait'"
						color="#ff4200"
						dark
						block
						depressed
						large
						@click="claimDigital()"
					>
						Process Reward
					</v-btn>

					<v-btn
						v-if="type == 'process' || type == 'confirmation'"
						color="#ff4200"
						dark
						block
						depressed
						large
						@click="
							postProcess = true
							pass_item_2 = pass_item
						"
					>
						Lacak
					</v-btn>
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

					<template v-if="type == 'process'">
						<v-img
							src="/img/icons/info.svg"
							max-width="60"
							class="mx-auto mb-3"
						></v-img>
						Data Rewards kamu dalam proses verifikasi, maksimal 3
						hari kerja
					</template>

					<template
						v-if="type == 'confirmation' && pass_item_2 != null"
					>
						<v-img
							src="/img/icons/info.svg"
							max-width="60"
							class="mx-auto mb-3"
						></v-img>
						Rewards kamu dalam proses pengiriman oleh kurir
						{{ pass_item_2.delivery.kurir }}<br />
						<div class="text-20" v-if="pass_item_2 != null">
							{{ pass_item_2.delivery.nomor_resi }}
						</div>
					</template>

					<v-btn
						v-if="type == 'wait'"
						@click="
							postProcess = !postProcess
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

					<v-btn
						v-if="type == 'process'"
						@click="postProcess = !postProcess"
						color="#ff4200"
						class="mt-4"
						dark
						depressed
						medium
						block
					>
						Tutup
					</v-btn>

					<v-btn
						v-if="type == 'confirmation'"
						href="https://jne.co.id/"
						target="_BLANK"
						color="#ff4200"
						class="mt-4"
						dark
						depressed
						medium
						block
					>
						Buka website kurir
					</v-btn>
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
			totalpage: 30,
			apply_drawer: false,
			apply_form: null,
			id_tujuan: null,
			pass_item: null,
			pass_item_2: null,
			postProcess: false,
			success: false,
		}
	},
	methods: {
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

				this.last_page = res.data.pagination.last_page
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
		next(num) {
			this.loading = true
			this.fetchWait(this.type, num, 10)
			window.scrollTo({
				top: 0,
				left: 0,
				behavior: "smooth",
			})
		},
		async claimDigital() {
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
	border: 1px solid #fff !important;
	border-radius: 5px !important;
}
</style>
