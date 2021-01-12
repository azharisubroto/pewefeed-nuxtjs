<template>
	<v-container>
		<v-btn
			@click="
				openForm = !openForm
				resetForm()
			"
			color="deep-orange"
			dark
			block
			depressed
			class="mb-5"
		>
			<v-icon>mdi-plus</v-icon> Tambah Tujuan</v-btn
		>

		<!-- ITEMS LOOP -->
		<v-card
			v-for="(item, i) in addresses"
			:key="i"
			outlined
			class="px-3 py-3 mb-3"
		>
			<v-row no-gutters align="center">
				<v-col cols="9">
					<div>
						<strong style="color: #ffaa8c">{{
							item.receiver
						}}</strong>
					</div>
					<div class="mb-2">
						{{ item.title }}
					</div>
					<div>
						{{ item.phone }}
					</div>
				</v-col>
				<v-col cols="3" class="text-right">
					<v-btn
						small
						color="deep-orange"
						width="30"
						height="30"
						class="px-0"
						min-width="30"
						@click="
							openForm = true
							openEdit(item)
						"
					>
						<v-icon>mdi-pencil</v-icon>
					</v-btn>
					<v-btn
						small
						color="deep-orange"
						width="30"
						height="30"
						class="px-0"
						min-width="30"
						@click="deleteAddress(item.id)"
					>
						<v-icon>mdi-close</v-icon>
					</v-btn>
				</v-col>
			</v-row>
		</v-card>

		<v-navigation-drawer
			v-model="openForm"
			fixed
			:stateless="false"
			width="100%"
			:right="true"
			style="margin-top: 56px; background: #1c1c1c"
		>
			<v-row class="px-4 py-5">
				<v-col cols="12">
					<v-card
						outlined
						style="border: 1px solid #fff !important"
						color="transparent"
						class="px-4 py-4 mb-5"
					>
						<strong class="d-block mb-2">Label</strong>
						<v-text-field
							v-model="formData.title"
							placeholder="Label Alamat"
							outlined
							background-color="#404040"
						/>

						<strong class="d-block mb-2">Nama Penerima</strong>
						<v-text-field
							v-if="isDistric"
							v-model="formData.receiver"
							placeholder="John Doe"
							outlined
							background-color="#404040"
						/>

						<strong class="d-block mb-2">Nomor Ponsel</strong>
						<v-text-field
							v-if="isDistric"
							v-model="formData.phone"
							placeholder="08123xxxxxxxx"
							outlined
							background-color="#404040"
						/>

						<strong class="d-block mb-2">Alamat</strong>
						<v-textarea
							v-model="formData.address"
							placeholder="Alamat"
							:rows="6"
							outlined
							background-color="#404040"
						/>
					</v-card>

					<v-card
						outlined
						style="border: 1px solid #fff !important"
						color="transparent"
						class="px-4 py-4 mb-5"
					>
						<strong class="d-block mb-2">Provinsi</strong>
						<v-autocomplete
							v-if="isDistric"
							v-model="formData.province"
							outlined
							background-color="#404040"
							:items="source.provinsi"
							item-text="nama"
							item-value="id"
							placeholder="Ketik untuk mencari..."
							clearable
							:min-len="5"
							@change="kota(formData.province)"
						/>

						<strong class="d-block mb-2">Kota/Kabupaten</strong>
						<v-autocomplete
							v-if="isDistric"
							v-model="formData.district"
							outlined
							background-color="#404040"
							:readonly="source.kota.length > 0 ? false : true"
							:items="source.kota"
							item-text="nama"
							item-value="id"
							hide-no-data
							hide-selected
							placeholder="Ketik untuk mencari..."
							clearable
							@change="kecamatan(formData.district)"
						/>

						<strong class="d-block mb-2">Kecamatan</strong>
						<v-autocomplete
							v-if="isDistric"
							v-model="formData.sub_district"
							outlined
							background-color="#404040"
							:readonly="
								source.kecamatan.length > 0 ? false : true
							"
							:items="source.kecamatan"
							item-text="nama"
							item-value="id"
							hide-no-data
							hide-selected
							placeholder="Ketik untuk mencari..."
							clearable
							@change="kelurahan(formData.sub_district)"
						/>

						<strong class="d-block mb-2">Kelurahan / Desa</strong>
						<v-autocomplete
							v-if="isDistric"
							v-model="formData.village"
							outlined
							background-color="#404040"
							:readonly="
								source.kelurahan.length > 0 ? false : true
							"
							:items="source.kelurahan"
							item-text="nama"
							item-value="id"
							hide-no-data
							hide-selected
							placeholder="Ketik untuk mencari..."
							clearable
						/>

						<strong class="d-block mb-2">Kode Pos</strong>
						<v-text-field
							v-if="isDistric"
							v-model="formData.zip_code"
							placeholder="17432"
							outlined
							background-color="#404040"
						/>
					</v-card>
				</v-col>
				<v-col cols="12" style="margin-top: -30px">
					<v-btn
						color="#ff4200"
						dark
						block
						depressed
						height="40"
						:disabled="
							formData.title == '' ||
							formData.receiver == '' ||
							formData.phone == '' ||
							formData.address == '' ||
							formData.province == '' ||
							formData.district == '' ||
							formData.sub_district == '' ||
							formData.village == '' ||
							formData.zip_code == ''
						"
						@click="
							pin_verification = !pin_verification
							pin_action = !isEdit ? 'add' : 'edit'
						"
					>
						Simpan
					</v-btn>

					<v-btn
						color="grey"
						class="mt-2"
						dark
						block
						depressed
						height="40"
						@click="openForm = !openForm"
					>
						Batalkan
					</v-btn>
				</v-col>
			</v-row>
			<br />
			<br />
			<br />
		</v-navigation-drawer>

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
								@click="
									pin_action == 'add'
										? addAddress()
										: editAddress(currentId)
								"
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
	</v-container>
</template>
<script>
import UserService from "@/services/UserService"
export default {
	name: "daftarAlamatPage",
	layout: "profile",

	data() {
		return {
			pin_verification: false,
			pin_code: "",
			pin_action: "",
			initLoading: true,
			mypoint: null,
			userdata: null,
			isLoggedIn: true,
			profile: null,
			snackbar: false,
			timeout: 3000,
			responseMessage: "",
			overlay: false,
			notFound: false,
			openForm: false,
			isDistric: true,
			isEdit: false,
			currentId: null,
			addresses: null,
			addressNotExist: false,
			item: 1,
			items: [
				{ name: "ACCOUNT", loc: "/member/pengaturan/profil" },
				{ name: "ADDRESS", loc: "/member/pengaturan/daftar-alamat" },
				{ name: "PHONE", loc: "/member/pengaturan/daftar-nomor" },
			],
			formData: {
				title: "",
				address: "",
				province: "",
				district: "",
				sub_district: "",
				village: "",
				zip_code: "",
				receiver: "",
				phone: "",
			},
			source: {
				provinsi: [],
				kota: [],
				kecamatan: [],
				kelurahan: [],
			},
		}
	},
	methods: {
		resetForm() {
			this.currentId = null

			this.formData = {
				title: "",
				address: "",
				province: "",
				district: "",
				sub_district: "",
				village: "",
				zip_code: "",
				receiver: "",
				phone: "",
			}
		},
		async getAddresses() {
			this.initLoading = true
			try {
				const res = await UserService.getAddresses()
				var items = res.data.data
				if (items && items.length > 0) {
					//console.log(JSON.parse(JSON.stringify(items)))
					this.addresses = items
					this.notFound = false
				} else {
					this.notFound = true
				}
				setTimeout(() => {
					this.initLoading = false
				}, 500)
			} catch (error) {
				console.log(error)
				this.initLoading = false
			}
		},
		async provinsi() {
			try {
				const res = await UserService.provinsi()
				//console.log(res.data.data)
				this.source.provinsi = res.data.data
			} catch (error) {
				console.log(error)
			}
		},
		async kota(provinceID) {
			try {
				const res = await UserService.kota(provinceID)
				// console.log(JSON.parse(JSON.stringify(res.data.data)))
				this.source.kota = res.data.data
			} catch (error) {
				console.log(error)
			}
		},
		async kecamatan(kotaID) {
			try {
				const res = await UserService.kecamatan(kotaID)
				// console.log(res.data.data)
				this.source.kecamatan = res.data.data
			} catch (error) {
				console.log(error)
			}
		},
		async kelurahan(kecamatanID) {
			try {
				const res = await UserService.kelurahan(kecamatanID)
				// console.log(res.data.data)
				this.source.kelurahan = res.data.data
			} catch (error) {
				console.log(error)
			}
		},

		isNotExist() {
			// console.log(this.addressNotExist)
			if (this.addressNotExist) {
				this.isDistric = false
			} else {
				this.isDistric = true
			}
		},

		openEdit(item) {
			this.currentId = item.id
			this.isEdit = true
			this.openForm = true
			// form fields
			this.formData.title = item != false ? item.title : ""
			this.formData.address = item != false ? item.address : ""
			this.formData.province = item != false ? item.province_id : ""
			this.formData.district = item != false ? item.distric_id : ""
			this.formData.sub_district = item != false ? item.regency_id : ""
			this.formData.village = item != false ? item.village_id : ""
			this.formData.zip_code = item != false ? item.zip_code : ""
			this.formData.receiver = item != false ? item.receiver : ""
			this.formData.phone = item != false ? item.phone : ""
		},
		postSaveDialog(success, deletemode = false) {
			if (success == true) {
				this.$store.commit("SET_PROFILE_DIALOG", true)
				this.$store.commit("SET_PROFILE_DIALOG_CONTENT", {
					success: true,
					message:
						deletemode != true
							? "Data sukses tersimpan"
							: "Data sukses dihapus",
					button: false,
				})
			} else {
				this.$store.commit("SET_PROFILE_DIALOG", true)
				this.$store.commit("SET_PROFILE_DIALOG_CONTENT", {
					success: false,
					message: "Data gagal tersimpan",
					button: false,
				})
			}
		},
		async addAddress() {
			this.pin_verification = false
			if (this.$auth.user.data.pin != this.pin_code) {
				alert("Pin Salah")
				return false
			}

			this.overlay = true
			var params = this.formData
			let vm = this
			try {
				const res = await UserService.addAddress(params)

				if (res) {
					this.postSaveDialog(true)
				}
				this.getAddresses()
			} catch (error) {
				this.overlay = false
				this.snackbar = true
				this.responseMessage = "Alamat Telah Dihapus"
				console.log(error)
				this.postSaveDialog(false)
			}
		},
		async deleteAddress(itemID) {
			this.overlay = true
			let vm = this
			let payload = {
				id: itemID,
			}
			try {
				const res = await UserService.deleteAddress(payload)
				this.getAddresses()
				if (res) {
					this.postSaveDialog(true)
				}
			} catch (error) {
				console.log(error)
			}
		},
		async editAddress(id) {
			this.pin_verification = false
			if (this.$auth.user.data.pin != this.pin_code) {
				alert("Pin Salah")
				return false
			}

			this.overlay = true
			let vm = this

			var params = {
				id: id,
				title: this.formData.title,
				address: this.formData.address,
				province: this.formData.province,
				district: this.formData.district,
				sub_district: this.formData.sub_district,
				village: this.formData.village,
				zip_code: this.formData.zip_code,
				receiver: this.formData.receiver,
				phone: this.formData.phone,
			}
			// console.log(JSON.parse(JSON.stringify(params)))

			try {
				const res = await UserService.editAddress(params)
				if (res) {
					this.postSaveDialog(true)
				}
				this.getAddresses()
			} catch (error) {
				console.log(error)
				this.postSaveDialog(false)
			}
		},
	},
	mounted() {
		this.getAddresses()
		this.provinsi()
	},
}
</script>
