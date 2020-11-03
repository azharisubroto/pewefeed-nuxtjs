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

		<v-overlay :value="uploadloading">
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
				@click="openCoverUpload()"
			>
				<v-row
					style="height: 100%"
					class="ma-0"
					align="center"
					justify="center"
				>
					<img src="/img/icons/camera.svg" width="30" />
				</v-row>
			</v-img>

			<v-avatar
				size="80"
				color="grey"
				class="profile-avatar ml-4"
				@click="openUpload()"
			>
				<v-img
					:src="avatar_preview"
					:aspect-ratio="1 / 1"
					gradient="to top right, rgba(0,0,0,.33), rgba(0,0,0,.7)"
				>
					<template v-slot:default>
						<div
							class="w-100 ma-0 align-center justify-center pa-7"
						>
							<img src="/img/icons/camera.svg" width="16" />
						</div>
					</template>
				</v-img>
			</v-avatar>
		</div>

		<v-container class="pt-0">
			<v-row class="pt-0 mt-0 profil-edit">
				<v-col cols="12" class="pt-0">
					<div>
						<v-row class="pt-0">
							<v-col
								cols="12"
								sm="9"
								md="9"
								lg="9"
								class="px-0 hahaha pt-0"
							>
								<div class="mb-2 px-3">
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
								<div class="mb-2 px-3">
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
								<div class="mb-2 px-3">Username</div>
								<v-text-field
									solo
									single-line
									placeholder="Username"
									filled
									v-model="data.username"
								></v-text-field>
								<div
									class="mb-2 px-3 d-flex justify-space-between align-center flex-wrap"
								>
									<div>Nomor Ponsel</div>
									<!-- <v-btn
                    v-if="!usermentah.verified"
                    to="/member/otp"
                    class="mt-2 text-10"
                    color="red"
                    dark
                    small
                    >Verify phone number (+100 POINT)</v-btn> -->
								</div>
								<v-text-field
									solo
									single-line
									placeholder="Phone"
									filled
									v-model="data.no_telp"
								>
									<template v-slot:append>
										<img
											width="16"
											height="16"
											src="/img/icons/checkbadge.svg"
											alt=""
											style="vertical-align: middle"
											class="mr-2"
											:class="[
												!usermentah.verified &&
													'grayscale',
											]"
										/>

										<span
											class="text-12 d-inline-block"
											:class="[
												usermentah.verified
													? 'deep-orange--text'
													: 'grey--text gray--text',
											]"
											style="line-height: 1.4"
										>
											{{
												usermentah.verified
													? "Verified"
													: "Not Verified"
											}}
										</span>
									</template>
								</v-text-field>
								<div class="mb-2 px-3">Instagram</div>
								<v-text-field
									solo
									single-line
									placeholder="@username"
									filled
									v-model="data.instagram"
								></v-text-field>
								<div class="mb-2 px-3">
									Email
									<span class="red--text">(Wajib diisi)</span>
								</div>
								<v-text-field
									solo
									single-line
									placeholder="Email"
									filled
									readonly
									disabled
									v-model="data.email"
								></v-text-field>

								<div class="px-4">
									<v-btn
										depressed
										dark
										block
										color="#FF4200"
										@click="save()"
										class="mb-3"
										>Simpan</v-btn
									>
									<v-btn
										depressed
										dark
										block
										color="#FF0000"
										class="mb-5"
										@click="$router.go(-1)"
										>Batalkan</v-btn
									>
								</div>
							</v-col>
						</v-row>
					</div>
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
	</div>
</template>
<script>
import UserService from "@/services/UserService"
import "vue2-dropzone/dist/vue2Dropzone.min.css"
import axios from "axios"

export default {
	middleware: "auth",
	name: "pengaturanPage",
	data() {
		return {
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
			snackbar: false,
			dropOptions: {
				url: "https://s1.playworld.id/api/member/avatar",
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
			savestatus: null,
			fielderrors: null,
		}
	},
	methods: {
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
				.post("https://s1.playworld.id/api/member/avatar", formData, {
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
			vm.uploadloading = true
			let bearer = localStorage.getItem("access-token")
			var formData = new FormData()
			formData.append("cover_image", file)
			axios
				.post(
					"https://s1.playworld.id/api/member/cover-image",
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
					vm.uploadloading = false
				})
				.catch((err) => {
					console.log(err)
					vm.uploadloading = false
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
.profil-edit {
	.v-text-field--solo,
	.v-text-field--solo * {
		border-radius: 0 !important;
	}
}
.profile-avatar {
	transform: translateY(-50%);
}
.grayscale {
	filter: grayscale(1);
}
</style>
