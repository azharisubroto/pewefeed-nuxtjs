<template>
	<v-container>
		<v-snackbar v-model="snackbar" top color="green">
			{{ aftersavewords }}
			<v-btn color="green lighten-2" text @click="snackbar = false"
				>Close</v-btn
			>
		</v-snackbar>

		<!-- FORM -->
		<v-row v-if="data.msisdn != ''" class="pt-0 mt-0 profil-edit">
			<v-col cols="12">
				<div>
					<v-row>
						<v-col cols="12" sm="3" md="3" lg="3">
							<v-row align="center">
								<v-col cols="3" v-if="avatar_preview">
									<v-avatar size="80" color="grey">
										<v-img
											:src="avatar_preview"
											@click="
												avatar_preview =
													'' && data.avatar
											"
											:aspect-ratio="1 / 1"
										></v-img>
									</v-avatar>
								</v-col>
								<v-col cols="9">
									<vue-dropzone
										v-if="!avatar_preview"
										ref="dropzone"
										id="drop1"
										:options="dropOptions"
										@vdropzone-success="afterComplete"
									></vue-dropzone>
									<a
										v-if="!avatar_preview"
										@click="avatar_preview = false"
										>Remove File</a
									>
									<v-btn
										v-if="avatar_preview"
										text
										class="mt-2"
										depressed
										dark
										@click="avatar_preview = ''"
									>
										<v-icon dark left>mdi-pencil</v-icon
										>Change Photo
									</v-btn>
								</v-col>
								<v-col cols="12">
									<div class="text-center"></div>
								</v-col>
							</v-row>
						</v-col>
						<v-col
							cols="12"
							sm="9"
							md="9"
							lg="9"
							class="px-0 hahaha"
						>
							<div class="mb-2 px-3">
								First Name
								<span class="red--text">(required)</span>
							</div>
							<v-text-field
								class="giveline"
								solo
								single-line
								placeholder="Last Name"
								filled
								v-model="data.first_name"
							></v-text-field>
							<div class="mb-2 px-3">
								Last Name
								<span class="red--text">(required)</span>
							</div>
							<v-text-field
								class="giveline"
								solo
								single-line
								placeholder="Last Name"
								filled
								v-model="data.last_name"
							></v-text-field>
							<div class="mb-2 px-3">Username (optional)</div>
							<v-text-field
								class="giveline"
								solo
								single-line
								placeholder="Username"
								filled
								v-model="data.username"
							></v-text-field>
							<div
								class="mb-2 px-3 d-flex justify-space-between align-center flex-wrap"
							>
								<div>Phone</div>
								<v-btn
									v-if="!usermentah.verified"
									to="/member/otp"
									class="mt-2 text-10"
									color="red"
									dark
									small
									>Verify phone number (+50 POINT)</v-btn
								>
							</div>
							<v-text-field
								class="giveline"
								solo
								single-line
								placeholder="Phone"
								filled
								v-model="data.no_telp"
							></v-text-field>
							<div class="mb-2 px-3">Instagram</div>
							<v-text-field
								class="giveline"
								solo
								single-line
								placeholder="@username"
								filled
								v-model="data.instagram"
							></v-text-field>
							<div class="mb-2 px-3">
								Email (optional but required when bank transfer)
							</div>
							<v-text-field
								class="giveline"
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
									color="green"
									@click="save"
									class="mb-3"
									>Save</v-btn
								>
								<v-btn
									depressed
									dark
									block
									color="red"
									class="mb-5"
									@click="$router.go(-1)"
									>Cancel</v-btn
								>
							</div>
						</v-col>
					</v-row>
				</div>
			</v-col>
		</v-row>
		<div v-else class="pa-10 text-center">
			<v-progress-circular
				indeterminate
				size="64"
				color="green"
			></v-progress-circular>
		</div>
		<!-- /FORM -->

		<v-bottom-sheet v-model="afterSaveModal">
			<v-sheet height="100%">
				<v-toolbar :elevation="1" style="border-top: 2px solid #fff">
					<!-- Arrow -->
					<v-btn
						dark
						icon
						tile
						style="border-right: 0px solid #717171"
						light
						@click="afterSaveModal = false"
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

				<div class="px-4 pt-10 text-center">
					<div class="mt-5 mb-0 text-16">
						<template v-if="infotype == 'error'">
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
						</template>
						<template v-else-if="infotype == 'success'">
							<v-img
								src="/img/success.svg"
								max-width="60"
								class="mx-auto mb-4"
							></v-img>

							Data Sukses Tersimpan
						</template>
					</div>
				</div>
				<v-card-actions class="pb-10">
					<v-spacer></v-spacer>
					<v-btn
						@click="afterSaveModal = false"
						color="deep-orange"
						block
						class="mt-2"
						>Tutup</v-btn
					>
					<br /><br /><br />
					<v-spacer></v-spacer>
				</v-card-actions>
			</v-sheet>
		</v-bottom-sheet>
	</v-container>
</template>
<script>
import UserService from "@/services/UserService"
import "vue2-dropzone/dist/vue2Dropzone.min.css"

export default {
	middleware: "auth",
	name: "pengaturanPage",
	data() {
		return {
			profile: null,
			token: null,
			avatar_preview: "",
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
			aftersavewords: "",
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
			fielderrors: null,
			afterSaveModal: false,
			infotype: null,
		}
	},
	methods: {
		removeAllFiles() {
			this.$refs.dropzone.removeAllFiles()
		},
		afterComplete(file, response) {
			//console.log(response.file_name);
			this.data.avatar = response.file_name
			this.avatar_preview =
				"https://cdn.pewefeed.com/containers/pewefeed/avatars/" +
				response.file_name
		},
		fetchUserdata() {
			// this.$auth.fetchUser()
			let vm = this
			this.$auth.fetchUser().then(() => {
				var res = []
				res.data = vm.$auth.user

				vm.usermentah = res.data
				vm.user_id = res.data.data.id
				vm.profile = res.data.data
				// //console.log(JSON.parse(JSON.stringify(res.data.data)))
				vm.dropOptions.headers.Authorization =
					"Bearer " + res.data.token
				vm.avatar_preview = res.data.data.avatar
				vm.data.first_name = res.data.data.first_name
				vm.data.last_name = res.data.data.last_name
				vm.data.username = res.data.data.username
				vm.data.msisdn = res.data.data.msisdn
				vm.data.no_telp = res.data.data.no_telp
				vm.data.instagram = res.data.data.instagram
				vm.data.email = res.data.data.email
				vm.data.expire = res.data.data.expire
				vm.expire_date = vm.data.expire
				// //console.log(vm.data)
				if (res.data.data.status_expired == 1) {
					vm.isActive = true
				}
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

				this.fetchUserdata()
				this.afterSaveModal = true
				this.infotype = "success"
				this.fielderrors = null
				//window.location.reload();
			} catch (error) {
				if (error.response.status == 422) {
					this.fielderrors = error.response.data.errors
					this.afterSaveModal = true
					this.infotype = "error"
				}
			}
		},
	},
	mounted() {
		this.fetchUserdata()
		this.dropOptions.headers.Authorization =
			"Bearer " + localStorage.getItem("access-token")
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
.profil-edit {
	.v-text-field--solo,
	.v-text-field--solo * {
		border-radius: 0 !important;
	}
}
.giveline .v-input__slot {
	border-bottom: 1px solid rgba(255, 255, 255, 0.5);
	border-top: 1px solid rgba(255, 255, 255, 0.5);
	border-radius: 0 !important;
}
</style>
