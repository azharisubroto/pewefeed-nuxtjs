<template>
	<v-container>
		<v-row>
			<v-col>
				<!-- =====================================================================================
		ALERT
		===================================================================================== -->
				<v-snackbar v-model="snackbar" :timeout="timeout" top>
					{{ responseMessage }}
					<v-btn color="primary" text icon @click="snackbar = false">
						<v-icon color="white">mdi-close-circle-outline</v-icon>
					</v-btn>
				</v-snackbar>

				<template v-if="numberForm">
					<v-autocomplete
						outlined
						label="Type"
						:items="voucherTypes"
						item-text="name"
						item-value="name"
						v-model="payload.type"
					></v-autocomplete>

					<v-autocomplete
						v-if="payload.type == 'Bank'"
						outlined
						label="Pilih Bank"
						:items="banks"
						item-text="name"
						item-value="name"
						v-model="payload.bank"
					></v-autocomplete>

					<v-text-field
						label="Nama"
						placeholder="Nama"
						outlined
						v-model="payload.name"
					></v-text-field>

					<v-text-field
						label="Nomor"
						placeholder="Nomor"
						outlined
						v-model="payload.number"
					></v-text-field>

					<v-btn
						@click="numberForm = false"
						color="grey"
						dark
						depressed
						>Cancel</v-btn
					>

					<v-btn
						@click="addNumber()"
						color="deep-orange"
						dark
						depressed
						>Save</v-btn
					>
				</template>

				<v-btn
					v-if="!numberForm"
					@click="numberForm = true"
					color="deep-orange"
					dark
					block
					depressed
				>
					<v-icon>mdi-plus</v-icon> Tambah Tujuan</v-btn
				>
			</v-col>
		</v-row>
		<v-row>
			<v-col cols="12">
				<v-expansion-panels v-if="!isLoading" class="mb-3" focusable>
					<v-expansion-panel
						v-for="(contact, i) in contacts"
						:key="i"
					>
						<v-expansion-panel-header>
							<v-row no-gutters>
								<v-col cols="6">{{ contact.title }}</v-col>
								<v-col cols="6 text--secondary">{{
									contact.type
								}}</v-col>
							</v-row>
						</v-expansion-panel-header>
						<v-expansion-panel-content class="pt-3">
							<v-row>
								<v-col>Jenis</v-col>
								<v-col>{{ contact.type }}</v-col>
							</v-row>
							<v-row>
								<v-col>Nama</v-col>
								<v-col>{{ contact.title }}</v-col>
							</v-row>
							<v-row>
								<v-col>Nomor</v-col>
								<v-col>{{ contact.number }}</v-col>
							</v-row>
							<v-divider class="my-5"></v-divider>
							<v-autocomplete
								label="Type"
								:items="voucherTypes"
								item-text="name"
								item-value="name"
								v-model="payload.type"
							></v-autocomplete>

							<v-autocomplete
								v-if="payload.type == 'Bank'"
								label="Pilih Bank"
								:items="banks"
								item-text="name"
								item-value="name"
								v-model="payload.bank"
							></v-autocomplete>

							<v-text-field
								label="Nama"
								placeholder="Nama"
								v-model="payload.name"
							></v-text-field>

							<v-text-field
								label="Nomor"
								placeholder="Nomor"
								v-model="payload.number"
							></v-text-field>

							<v-btn
								@click="editNumber(contact.id)"
								color="deep-orange"
								dark
								depressed
								>Save</v-btn
							>

							<v-btn
								@click="deleteNumber(contact.id)"
								color="red"
								dark
								depressed
								class="float-right"
							>
								<v-icon>mdi-trash-can-outline</v-icon>
								Hapus
							</v-btn>
						</v-expansion-panel-content>
					</v-expansion-panel>
				</v-expansion-panels>

				<div v-if="isLoading" class="text-center pa-3">
					Memuat Daftar Nomor...
				</div>
			</v-col>
		</v-row>
	</v-container>
</template>
<script>
import UserService from "@/services/UserService"
export default {
	name: "daftarNomorPage",
	data() {
		return {
			isLoading: false,
			numberForm: false,
			banks: [],
			snackbar: false,
			timeout: 3000,
			responseMessage: "",
			payload: {
				type: "",
				bank: "",
				name: "",
				number: "",
			},
			voucherTypes: [],
			contacts: null,
		}
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
				////console.log(JSON.parse(JSON.stringify(res.data.data)))
				this.voucherTypes = res.data.data.type
			} catch (error) {}
		},
		async getBank() {
			try {
				const res = await UserService.getBank()
				////console.log(JSON.parse(JSON.stringify(res.data.data.bank)))
				this.banks = res.data.data.bank
			} catch (error) {}
		},
		async addNumber() {
			var params = this.payload
			try {
				const res = await UserService.addNumber(params)
				this.snackbar = true
				this.responseMessage = "Data Sukses Ditambahkan"
				this.numberForm = false
				this.getNumbers()
				this.payload.type = ""
				this.payload.bank = ""
				this.payload.name = ""
				this.payload.number = ""
			} catch (error) {
				console.log(error)
				this.snackbar = true
				this.responseMessage = "Maaf Terdapat Kesalahan :("
			}
		},
		async deleteNumber(id) {
			try {
				const res = await UserService.deleteNumber(id)
				this.snackbar = true
				this.responseMessage = "Nomor telah dihapus"
				this.numberForm = false
				this.getNumbers()
				this.isLoading = false
			} catch (error) {
				console.log(error)
				this.snackbar = true
				this.responseMessage = "Maaf Terdapat Kesalahan :("
			}
		},
		async editNumber(id) {
			var params = {
				id: id,
				type: this.payload.type,
				name: this.payload.name,
				number: this.payload.number,
				bank: this.payload.bank,
			}
			// //console.log(JSON.parse(JSON.stringify(params)))

			try {
				const res = await UserService.editNumber(params)
				this.snackbar = true
				this.responseMessage = "Data Sukses Ditambahkan"
				this.getNumbers()
			} catch (error) {
				console.log(error)
				this.snackbar = true
				this.responseMessage = "Maaf Terdapat Kesalahan :("
			}
		},
	},
	mounted() {
		this.getNumbers()
		this.getVoucherType()
		this.getBank()
	},
}
</script>
