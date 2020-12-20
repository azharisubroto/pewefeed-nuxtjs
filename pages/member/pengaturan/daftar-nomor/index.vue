<template>
	<v-container v-if="mounted">
		<v-row>
			<v-col>
				<v-snackbar v-model="snackbar" :timeout="timeout" top>
					{{ responseMessage }}
					<v-btn color="primary" text icon @click="snackbar = false">
						<v-icon color="white">mdi-close-circle-outline</v-icon>
					</v-btn>
				</v-snackbar>

				<v-btn
					@click="
						openForm = !openForm
						resertFormData()
					"
					color="deep-orange"
					dark
					block
					depressed
				>
					<v-icon>mdi-plus</v-icon> Tambah Nomor Baru</v-btn
				>
			</v-col>
		</v-row>

		<template v-if="!isLoading">
			<v-card
				v-for="(contact, i) in contacts"
				:key="i"
				outlined
				class="px-3 py-3 mb-3"
			>
				<v-row no-gutters align="center">
					<v-col cols="9">
						<div>
							<strong style="color: #ffaa8c">{{
								contact.title
							}}</strong>
						</div>
						<div class="mb-2">
							{{ contact.type }}
						</div>
						<div>
							{{ contact.number }}
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
								openEdit(contact)
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
							@click="deleteNumber(contact.id)"
						>
							<v-icon>mdi-close</v-icon>
						</v-btn>
					</v-col>
				</v-row>
			</v-card>
		</template>

		<div v-if="isLoading" class="text-center pa-3">
			Memuat Daftar Nomor...
		</div>

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
						<strong class="mb-2 d-block">Tipe</strong>
						<v-autocomplete
							v-model="formData.type"
							outlined
							background-color="#404040"
							:items="voucherTypes"
							item-text="name"
							item-value="name"
							placeholder="Tipe"
						/>

						<template
							v-if="
								formData.type == 'Pulsa' ||
								formData.type == 'E-wallets' ||
								formData.type == 'Listrik'
							"
						>
							<strong class="mb-2 d-block">Provider</strong>
							<v-autocomplete
								v-model="formData.provider"
								outlined
								background-color="#404040"
								:items="providers"
								item-text="name"
								item-value="name"
							/>
						</template>

						<template v-if="formData.type == 'Bank'">
							<strong class="mb-2 d-block">Bank</strong>
							<v-autocomplete
								v-model="formData.bank"
								outlined
								background-color="#404040"
								:items="banks"
								item-text="name"
								item-value="name"
							/>
						</template>

						<strong class="mb-2 d-block">Penerima</strong>
						<v-text-field
							v-model="formData.name"
							outlined
							background-color="#404040"
							placeholder="Nama"
						/>

						<strong class="mb-2 d-block"
							>NOMOR AKUN / E-WALLETS</strong
						>
						<v-text-field
							v-model="formData.number"
							outlined
							background-color="#404040"
							placeholder="Nomor"
						/>
					</v-card>
				</v-col>
				<v-col cols="12" style="margin-top: -30px">
					<v-btn
						v-if="!isEdit"
						color="#ff4200"
						dark
						block
						depressed
						height="50"
						@click="
							pin_verification = !pin_verification
							pin_action = 'add'
						"
					>
						Simpan
					</v-btn>

					<v-btn
						v-else
						color="#ff4200"
						dark
						block
						depressed
						height="50"
						@click="
							pin_verification = !pin_verification
							pin_action = 'edit'
						"
					>
						Update
					</v-btn>

					<v-btn
						color="grey"
						class="dark mt-2"
						block
						depressed
						height="50"
						@click="openForm = !openForm"
					>
						Batalkan
					</v-btn>
				</v-col>
			</v-row>
		</v-navigation-drawer>

		<v-bottom-sheet dark v-model="pin_verification">
			<v-sheet height="100%">
				<v-toolbar :elevation="1">
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
										? addNumber()
										: editNumber(currentId)
									pin_code = ''
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
								<v-btn text color="#ff4200" class="py-0"
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
	name: "daftarNomorPage",
	layout: "profile",
	data() {
		return {
			isLoading: false,
			numberForm: false,
			banks: [],
			snackbar: false,
			timeout: 3000,
			responseMessage: "",
			voucherTypes: ["Pulsa", "E-wallets", "Listrik", "Bank"],
			providers: [],
			addressNotExist: false,
			item: 2,
			items: [
				{ name: "ACCOUNT", loc: "/member/pengaturan/profil" },
				{ name: "ADDRESS", loc: "/member/pengaturan/daftar-alamat" },
				{ name: "PHONE", loc: "/member/pengaturan/daftar-nomor" },
			],
			formData: {
				type: "",
				bank: "",
				name: "",
				number: "",
				provider: "",
			},
			openForm: false,
			contacts: null,
			pin_verification: false,
			pin_code: "",
			pin_action: "",
			isEdit: false,
			mounted: false,
		}
	},
	watch: {
		"formData.type": function (newval) {
			if (newval == "Pulsa") {
				this.providers = [
					"TELKOMSEL",
					"INDOSAT",
					"XL",
					"AXIS",
					"TRI",
					"SMARTFREN",
				]
			} else if (newval == "E-wallets") {
				this.providers = ["OVO", "GOPAY", "DANA", "LINKAJA"]
			} else if (newval == "Listrik") {
				this.providers = ["PLN"]
			}
		},
	},
	methods: {
		async getNumbers() {
			this.isLoading = true
			try {
				const res = await UserService.getContacts()
				var items = res.data.data
				if (items && items.length > 0) {
					this.contacts = items
					this.isLoading = false
				} else {
					this.isLoading = false
				}
			} catch (error) {
				//console.log(res)
				this.isLoading = false
			}
		},
		async getVoucherType() {
			try {
				const res = await UserService.getVoucherType()
				this.voucherTypes = res.data.data.type
			} catch (error) {
				console.log(error)
			}
		},
		async getBank() {
			try {
				const res = await UserService.getBank()
				////console.log(JSON.parse(JSON.stringify(res.data.data.bank)))
				this.banks = res.data.data.bank
			} catch (error) {}
		},
		async addNumber() {
			if (this.$auth.user.data.pin != this.pin_code) {
				alert("Pin Salah")
				return false
			}
			this.overlay = true
			var params = this.formData
			let vm = this

			try {
				const res = await UserService.addNumber(params)
				if (res) {
					this.postSaveDialog(true)
				}
			} catch (error) {
				console.log(error)
				this.postSaveDialog(false)
			}
		},
		async deleteNumber(itemID) {
			let vm = this
			let formData = {
				id: itemID,
			}
			try {
				const res = await UserService.deleteNumber(formData)
				if (res) {
					this.postSaveDialog(true)
				}
			} catch (error) {
				console.log(error)
				this.postSaveDialog(false)
			}
		},
		async editNumber(id) {
			if (this.$auth.user.data.pin != this.pin_code) {
				alert("Pin Salah")
				return false
			}

			this.overlay = true
			let vm = this
			var params = {
				id: id,
				type: this.formData.type,
				name: this.formData.name,
				number: this.formData.number,
				bank: this.formData.bank,
				provider: this.formData.provider,
			}

			try {
				const res = await UserService.editNumber(params)
				this.postSaveDialog(true)
			} catch (error) {
				console.log(error)
				this.postSaveDialog(false)
			}
		},
		openEdit(item) {
			this.currentId = item.id
			this.isEdit = true
			this.openForm = true
			this.formData.type = item.type
			this.formData.name = item.title
			this.formData.number = item.number
			this.formData.bank = item.bank
		},
		resertFormData() {
			this.currentId = null
			this.formData = {
				type: "",
				bank: "",
				name: "",
				number: "",
				provider: "",
			}
		},
		postSaveDialog(success) {
			this.pin_code = ""
			this.pin_verification = false
			this.getNumbers()
			this.resertFormData()

			if (success == true) {
				this.$store.commit("SET_PROFILE_DIALOG", true)
				this.$store.commit("SET_PROFILE_DIALOG_CONTENT", {
					success: true,
					message: "Data sukses tersimpan",
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
	},
	mounted() {
		this.getNumbers()
		this.getVoucherType()
		this.getBank()
		if (typeof document !== "undefined") {
			this.mounted = true
		}
	},
}
</script>
