<template>
	<div>
		<v-bottom-sheet v-model="snackbar">
			<v-sheet height="100%">
				<v-toolbar :elevation="1" style="border-top: 2px solid #fff">
					<!-- Arrow -->
					<v-btn
						dark
						icon
						tile
						style="border-right: 0px solid #717171"
						light
						@click="snackbar = false"
					>
						<v-icon>mdi-close</v-icon>
					</v-btn>

					<!-- Title -->
					<div class="flex-grow-1"></div>
					<v-toolbar-items>
						<v-btn
							dark
							text
							class="deep-orange--text pl-0"
							style="margin-left: -10px"
							>Information</v-btn
						>
					</v-toolbar-items>
					<div class="flex-grow-1"></div>
				</v-toolbar>

				<v-container class="text-center">
					<div v-if="savestatus" class="py-3 text-center">
						<v-img
							src="/img/success.svg"
							max-width="60"
							class="mx-auto mb-4"
						></v-img>
						Data Sukses Tersimpan
						<v-btn block color="#ff4200" to="/?tab=4" class="mt-3">
							Ke Halaman Akun
						</v-btn>
					</div>
					<div v-else class="py-4">
						<v-img
							src="/img/error.svg"
							max-width="60"
							class="mx-auto mb-4"
						></v-img>

						<template v-if="fielderrors != null">
							<div
								class="mb-1"
								v-for="(item, val, i) in fielderrors"
								:key="'error-' + i"
							>
								<template v-if="i == 0">
									{{ item[0] }}
								</template>
							</div>
						</template>
						<v-btn
							@click="snackbar = false"
							block
							color="#ff4200"
							class="mt-3"
						>
							Tutup
						</v-btn>
					</div>
					<br />
				</v-container>
			</v-sheet>
		</v-bottom-sheet>

		<v-overlay :value="coverLoading">
			<v-progress-circular
				color="green"
				indeterminate
				size="64"
			></v-progress-circular>
		</v-overlay>

		<!-- FORM -->
		<div class="cover-image">
			<v-img
				:aspect-ratio="16 / 9"
				cover
				:src="cover_preview"
				gradient="to top right, rgba(0,0,0,.33), rgba(0,0,0,.7)"
			></v-img>

			<v-btn
				@click="openCoverUpload()"
				color="transparent"
				absolute
				right
				fab
				style="transform: translateY(-40%)"
				><v-img src="/img/icons/camera.svg" contain></v-img
			></v-btn>

			<v-avatar
				size="100"
				color="#d1d1d1"
				style="overflow: visible"
				class="profile-avatar ml-4"
			>
				<v-progress-circular
					:width="5"
					size="100"
					color="#ff4200"
					indeterminate
					class="absolute"
					style="z-index: 1"
					v-if="uploadloading"
				></v-progress-circular>
				<v-img
					:src="avatar_preview"
					width="100"
					height="100"
					cover
				></v-img>
				<v-btn
					@click="openUpload()"
					absolute
					small
					fab
					depressed
					color="transparent"
					style="bottom: 0; right: 0"
				>
					<v-img
						src="/img/icons/camera.svg"
						contain
						width="55"
					></v-img>
				</v-btn>
			</v-avatar>
		</div>

		<v-container class="pt-0">
			<v-row class="pt-0 mt-0 profil-edit">
				<v-col cols="12" class="pt-0">
					<v-card outlined dark class="pa-4 mb-5 white-border">
						<v-row class="pt-0" align="center">
							<v-col cols="12" sm="9" md="9" lg="9" class="pt-0">
								<div class="mb-2">PEWE ID</div>
								<v-row no-gutters>
									<v-col cols="10">
										<v-text-field
											solo
											single-line
											readonly
											filled
											class="krem--text"
											:value="$auth.user.data.msisdn"
										></v-text-field>
									</v-col>
									<v-col cols="2" class="text-right pl-1">
										<v-btn
											@click="copyToClipBoard()"
											depressed
											min-height="56"
											width="100%"
											color="#ff4200"
										>
											<v-icon
												size="24"
												style="margin-left: 3px"
												>mdi-content-copy</v-icon
											>
										</v-btn>
									</v-col>
								</v-row>
								<div class="mb-2">
									Nama Depan
									<span class="red--text">(Wajib diisi)</span>
								</div>
								<v-text-field
									solo
									single-line
									placeholder="Last Name"
									filled
									v-model="data.first_name"
								></v-text-field>
								<div class="mb-2">
									Nama Belakang
									<span class="red--text">(Wajib diisi)</span>
								</div>
								<v-text-field
									solo
									single-line
									placeholder="Last Name"
									filled
									v-model="data.last_name"
								></v-text-field>
								<div class="mb-2">Username</div>
								<v-text-field
									solo
									single-line
									placeholder="Username"
									filled
									v-model="data.username"
								></v-text-field>
							</v-col>
						</v-row>
					</v-card>

					<v-card outlined dark class="pa-4 mb-4 white-border">
						<!-- NOMOR HAPE -->
						<v-alert
							v-if="$auth.user.verified == false"
							dark
							color="#0057FF"
							prominent
							dense
							class="text-14"
						>
							<template v-slot:prepend>
								<v-img
									src="/img/icons/info.svg"
									width="20"
									max-width="20"
									class="mr-3 infoarticleicon"
								></v-img>
							</template>
							Dapatkan 50 Poin Untuk Satu Kali Verifikasi Nomor
							Ponsel Berhasil
						</v-alert>

						<div class="mb-1">
							<span class="mr-2 font-weight-bold">
								Nomor Ponsel
								<span class="red--text">(wajib)</span></span
							>

							<span
								class="text-14"
								:class="[
									$auth.user.verified
										? 'green--text'
										: 'grey--text',
								]"
								><v-icon
									:color="
										$auth.user.verified
											? 'green'
											: '#969696'
									"
									size="16"
									>mdi-check-decagram</v-icon
								>
								{{
									$auth.user.verified
										? "Verified"
										: "Not Verified"
								}}</span
							>
						</div>
						<v-row no-gutters>
							<v-col md="10" class="pr-1">
								<v-text-field
									v-model="data.no_telp"
									solo
									single-line
									placeholder="@username"
									filled
								/>
							</v-col>
							<v-col md="2">
								<v-btn
									@click="waotp = !waotp"
									dark
									depressed
									block
									color="#ff4200"
									height="55"
									:disabled="
										$auth.user.verified ? true : false
									"
								>
									<span class="white--text">Verifikasi</span>
								</v-btn>
							</v-col>
						</v-row>

						<!-- EMAIL -->

						<div class="mb-1">
							<span class="mr-2 font-weight-bold"
								>E-mail
								<span class="red--text">(wajib)</span></span
							>
						</div>
						<v-row no-gutters>
							<v-col md="12">
								<v-text-field
									v-model="data.email"
									solo
									single-line
									placeholder="Last Name"
									filled
								/>
							</v-col>
						</v-row>
					</v-card>

					<v-card outlined dark class="pa-4 mb-4 white-border">
						<template v-for="social in socmed">
							<div class="mb-1" :key="'label-' + social">
								<span
									class="text-uppercase mr-2 font-weight-bold"
									>{{ social }}</span
								>
							</div>
							<v-row no-gutters :key="'form-' + social">
								<v-col md="12" class="pr-4">
									<v-text-field
										dense
										:placeholder="social"
										outlined
										background-color="#404040"
									/>
								</v-col>
								<!-- <v-col md="3">
									<v-btn
										dark
										depressed
										block
										color="#ff4200"
										height="40"
									>
										Hubungkan
									</v-btn>
								</v-col> -->
							</v-row>
						</template>
					</v-card>

					<v-btn
						depressed
						dark
						block
						color="#FF4200"
						@click="pin_verification = !pin_verification"
						class="mb-3"
						>Simpan</v-btn
					>
				</v-col>
			</v-row>
		</v-container>
		<!-- /FORM -->
		<input
			type="file"
			ref="file"
			style="opacity: 0"
			@change="handleAvaUpload"
		/>
		<input
			type="file"
			ref="coverupload"
			style="opacity: 0"
			@change="handleCoverUpload"
		/>

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
								@click="save()"
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
	</div>
</template>
<script>
import UserService from "@/services/UserService"
import "vue2-dropzone/dist/vue2Dropzone.min.css"
import axios from "axios"

export default {
	middleware: "auth",
	name: "pengaturanPage",
	layout: "profile",
	data() {
		return {
			pin_verification: false,
			pin_code: "",
			pin_action: "",
			profile: null,
			token: null,
			avatar_preview: "",
			cover_preview: "https://via.placeholder.com/1600x900?text=%20",
			data: {
				avatar: "",
				first_name: "",
				last_name: "",
				username: "",
				email: "",
				msisdn: "",
				expire: "",
				instagram: "",
				no_no_: "",
			},
			socmed: ["instagram", "facebook", "twitter", "tiktok"],
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
			usermentah: [],
			avatar_img: "",
			uploadloading: false,
			coverLoading: false,
			savestatus: null,
			fielderrors: null,
		}
	},
	methods: {
		copyToClipBoard(text) {
			const copy = require("clipboard-copy")
			copy(text)
			setTimeout(() => {
				alert("Nomor resi berhasil disalin")
			}, 1000)
		},
		handleAvaUpload(e) {
			//console.log(e.target.files);
			let file = e.target.files[0]
			this.doUpload(file)
		},
		doUpload(file) {
			let vm = this
			let bearer = localStorage.getItem("access-token")
			var formData = new FormData()
			formData.append("avatar", file)
			vm.uploadloading = true
			axios
				.post("https://api.pewefeed.com/api/member/avatar", formData, {
					headers: {
						Authorization: "Bearer " + bearer,
					},
				})
				.then((res) => {
					//console.log(res);
					vm.avatar_preview = res.data.avatar_link
					vm.uploadloading = false
				})
				.catch((err) => {
					console.log(err)
					vm.uploadloading = false
				})
		},
		handleCoverUpload(e) {
			//console.log(e.target.files);
			let file = e.target.files[0]
			this.doCoverUpload(file)
		},
		doCoverUpload(file) {
			let vm = this
			vm.coverLoading = true
			let bearer = localStorage.getItem("access-token")
			var formData = new FormData()
			formData.append("cover_image", file)
			axios
				.post(
					"https://api.pewefeed.com/api/member/cover-image",
					formData,
					{
						headers: {
							Authorization: "Bearer " + bearer,
						},
					}
				)
				.then((res) => {
					//console.log(res);
					vm.cover_preview = res.data.avatar_link
					vm.coverLoading = false
				})
				.catch((err) => {
					console.log(err)
					vm.coverLoading = false
				})
		},
		openCoverUpload() {
			this.$refs.coverupload.click()
		},
		openUpload() {
			this.$refs.file.click()
		},
		removeAllFiles() {
			this.$refs.dropzone.removeAllFiles()
		},
		afterComplete(file, response) {
			//console.log(response.file_name);
			this.data.avatar = response.file_name
			this.avatar_preview =
				"https://be2ad46f1850a93a8329-aa7428b954372836cd8898750ce2dd71.ssl.cf6.rackcdn.com/avatars/" +
				response.file_name
		},
		fetchUserdata() {
			let vm = this
			// this.$auth.fetchUser()
			// res.data = this.$auth.user
			this.$auth
				.fetchUser()
				.then(() => {
					localStorage.setItem(
						"userdata",
						JSON.stringify(vm.$auth.user)
					)
					////console.log('fetchuser', JSON.parse(JSON.stringify(vm.$auth.user)));

					var res = []
					res.data = vm.$auth.user
					console.log(vm.$auth.user)

					this.usermentah = res.data
					this.user_id = res.data.data.id
					this.profile = res.data.data
					// //console.log(JSON.parse(JSON.stringify(res.data.data)))
					this.dropOptions.headers.Authorization =
						"Bearer " + res.data.token
					this.avatar_preview = res.data.data.avatar
					if (res.data.data.cover_image)
						this.cover_preview = res.data.data.cover_image
					this.data.first_name = res.data.data.first_name
					this.data.last_name = res.data.data.last_name
					this.data.username = res.data.data.username
					this.data.msisdn = res.data.data.msisdn
					this.data.no_telp = res.data.data.no_telp
					this.data.instagram = res.data.data.instagram
					this.data.email = res.data.data.email
					this.data.expire = res.data.data.expire
					this.expire_date = this.data.expire
					// //console.log(this.data)
					if (res.data.data.status_expired == 1) {
						this.isActive = true
					}
				})
				.catch(() => {
					this.loading = false
				})
		},
		async save() {
			let vm = this

			this.pin_verification = false
			if (this.$auth.user.data.pin != this.pin_code) {
				alert("Pin Salah")
				return false
			}

			var params = {
				first_name: this.data.first_name,
				username: this.data.username,
				last_name: this.data.last_name,
				no_telp: this.data.no_telp,
				instagram: this.data.instagram,
				avatar: this.data.avatar,
			}

			try {
				const res = await UserService.updateProfile(params)

				this.$auth.fetchUser().then(() => {
					localStorage.setItem(
						"userdata",
						JSON.stringify(vm.$auth.user)
					)
				})
				vm.snackbar = true
				vm.savestatus = true
				this.fetchUserdata()
			} catch (error) {
				if (error.response.status == 422) {
					this.snackbar = true
					this.fielderrors = error.response.data.errors
					this.savestatus = false
				}
			}
		},
	},
	mounted() {
		this.fetchUserdata()
	},
}
</script>

<style lang="scss">
.theme--dark.v-text-field--filled > .v-input__control > .v-input__slot {
	background: #313131;
}
.hahaha input {
	margin-top: 0 !important;
}
.hahaha {
	.v-input__slot {
		border-top: 1px solid #fff;
		border-bottom: 1px solid #fff;
	}
}
// .profil-edit {
// 	.v-text-field--solo,
// 	.v-text-field--solo * {
// 		border-radius: 0 !important;
// 	}
// }
.profile-avatar {
	transform: translateY(-50%);
}
.grayscale {
	filter: grayscale(1);
}
.v-card.white-border {
	border: 1px solid #fff !important;
}
.krem--text {
	color: #ffaa8c !important;
	input {
		color: #ffaa8c !important;
	}
}
</style>
