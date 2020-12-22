<template>
	<v-container class="CodePW">
		<v-overlay :value="overlay">
			<v-progress-circular
				color="green"
				indeterminate
				size="64"
			></v-progress-circular>
		</v-overlay>

		<div v-if="formsignin">
			<Login
				:redirect="'https://m.pewefeed.com/c/' + $route.params.codepw"
			/>
			<!-- /c/{{formdata.code}} -->
		</div>

		<div v-else>
			<div v-if="reward">
				<v-alert color="#0057FF" prominent>
					<template v-slot:prepend>
						<v-img
							src="/img/icons/info.svg"
							width="35"
							max-width="35"
							class="mr-3 infoarticleicon"
						></v-img>
					</template>
					Selamat! ambil reward kamu dengan klik tombol Claim di bawah
					ini, gratis!
				</v-alert>

				<v-row v-if="reward">
					<v-col cols="5">
						<img :src="reward.image" style="width: 100%" alt />
					</v-col>
					<v-col cols="7">
						<h4 class="text-20">{{ reward.title }}</h4>
					</v-col>
					<v-col cols="12">
						<v-btn
							color="orange"
							dark
							depressed
							block
							to="/member/barang_yang_didapat/"
							>CLAIM</v-btn
						>
					</v-col>
				</v-row>
			</div>

			<div v-if="reward" class="devider-big stretchout my-5"></div>

			<v-card
				class="pa-0"
				@makeloading="setloading"
				@notloading="notloading"
			>
				<v-card-text class="pa-0">
					<v-alert color="#0057FF" prominent>
						<template v-slot:prepend>
							<v-img
								src="/img/icons/info.svg"
								width="35"
								max-width="35"
								class="mr-3 infoarticleicon"
							></v-img> </template
						>Masukan 32 Digit Kode yang kamu terima dari SMS untuk
						menambah KEANGGOTAAN VIP
					</v-alert>

					<v-card
						style="border: 1px solid #fff"
						outlined
						class="pa-4"
					>
						<div class="mb-3">Kode Keanggotaan VIP</div>
						<v-form ref="form" v-model="valid" lazy-validation>
							<v-row no-gutters>
								<v-col cols="12" class="pb-0">
									<v-text-field
										label="PW ID"
										v-model="formdata.msisdn"
										:rules="pwIdRules"
										class="d-none"
									></v-text-field>

									<v-text-field
										class="mb-1"
										outlined
										v-model="formdata.code"
										required
										hide-detail
										:rules="pwCodeRules"
									></v-text-field>

									<v-btn
										@click="
											pin_verification = !pin_verification
										"
										color="deep-orange"
										depressed
										dark
										large
										width="100%"
										>Aktifkan</v-btn
									>
								</v-col>
							</v-row>
						</v-form>
					</v-card>

					<v-snackbar v-model="snackbar" :timeout="timeout" top>
						{{ responsemessage }}
						<v-btn
							color="primary"
							text
							icon
							@click="snackbar = false"
						>
							<v-icon color="white"
								>mdi-close-circle-outline</v-icon
							>
						</v-btn>
					</v-snackbar>
				</v-card-text>
			</v-card>
		</div>

		<!-- PIN -->
		<v-bottom-sheet dark width="100%" v-model="pin_verification">
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
								@click="getCode()"
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

		<!-- Dialog Success -->
		<BottomDialog />
	</v-container>
</template>

<script>
import VoucherService from "@/services/VoucherService"
import Login from "@/components/Login"
import UserService from "@/services/UserService"
import BottomDialog from "@/components/BottomDialog"

export default {
	middleware: "auth",
	name: "CodePWComponent",
	components: {
		Login,
		BottomDialog,
	},
	data: () => ({
		pin_verification: false,
		pin_code: "",
		newuser: false,
		reward: null,
		snackbar: false,
		overlay: false,
		timeout: 3000,
		msisdn: "",
		status_code: false,
		formsignin: false,
		message_code: "",
		responsemessage: "",
		responselink: "",
		dialog: false,
		valid: true,
		lazy:
			"https://vtcheckout-production-assets.s3.amazonaws.com/snap/logos/M003796/thumb_retina_snap_2Flogos_2FM003796_2F04571408-807d-4315-af80-df2dfbba9ce3_2FPlayworld.png",
		logo: "/pl-logo.png",
		formdata: {
			msisdn: null,
			code: null,
		},
		recaptchaToken: null,
		pwIdRules: [(v) => !!v || "Input Valid Code"],
		pwCodeRules: [(v) => !!v || "Input Valid Code"],
	}),
	methods: {
		/* Fetch Content */
		async fetchContent() {
			/* Init Data User to Customer Detail */

			if (this.$auth.loggedIn) {
				// this.$auth.fetchUser()
				var res = []
				// res.data = this.$auth.user
				this.formdata.msisdn = this.$auth.user.data.msisdn

				try {
					const user = await UserService.getReward()

					if (user.data.data != null) {
						this.reward = user.data.data
						this.newuser = true
					}

					if (res.data.data.email_confirmed == 1) {
						this.newuser = true
					}
				} catch (err) {
					//console.log(err.response.data);
				}
			} else {
				this.formsignin = true
			}
			this.getCode()
		},

		/* Loader */
		setloading() {
			this.overlay = true
		},
		notloading() {
			this.overlay = false
		},

		/* Get Code PW */
		async getCode() {
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

			this.setloading()
			if (this.$route.params.codepw == "fail") {
				this.notloading()
				this.status_code = true
				this.message_code = "Kode Tidak Valid"
			} else {
				try {
					const res = await VoucherService.getCodePw(
						this.$route.params.codepw
					)
					//console.log(res.data.code);
					this.notloading()
					this.recaptchaToken = null
					this.status_code = true
					this.message_code = "Ini Kode PW Anda " + res.data.code.trx
					this.formdata.code = res.data.code.trx
					this.pin_code == ""
					this.pin_verification = false

					this.$store.commit("SET_PROFILE_DIALOG", true)
					this.$store.commit("SET_PROFILE_DIALOG_CONTENT", {
						success: true,
						message:
							"Kode VIP Valid<br>Keanggotaan VIP Anda Bertambah",
						button: {
							text: "Lihat Akun Saya",
							to: "/?tab=3",
						},
					})
				} catch (err) {
					//console.log(err.response.data);
					this.notloading()
					this.status_code = false
					this.message_code = err.response.data.message
					this.pin_code == ""
					this.pin_verification = false
					this.$store.commit("SET_PROFILE_DIALOG", true)
					this.$store.commit("SET_PROFILE_DIALOG_CONTENT", {
						success: false,
						message: "Kode VIP Tidak Valid",
						button: false,
					})
				}
			}
		},

		/* Validasi Form */
		validate() {
			if (this.$refs.form.validate()) {
				if (this.recaptchaToken != null) {
					this.submit()
				} else {
					this.snackbar = true
					this.responsemessage = "Mohon Centang Recaptha"
				}
			}
		},
		reset() {
			this.$refs.form.reset()
		},
		resetValidation() {
			this.$refs.form.resetValidation()
		},

		/* Submit Form */
		async submit() {
			// send the form
			let vm = this
			const sendform = this.formdata
			this.setloading()
			vm.responsemessage = ""
			try {
				const res = await VoucherService.submitVoucher(sendform)
				this.$auth.fetchUser().then(() => {
					localStorage.removeItem("userdata")
					localStorage.setItem(
						"userdata",
						JSON.stringify(vm.$auth.user)
					)
				})

				this.notloading()
				this.recaptchaToken = null
				// //console.log(res);
				this.status_code = false
				vm.snackbar = false
				vm.dialog = true
				vm.responsemessage = res.data.message
			} catch (err) {
				//console.log(err);
				this.notloading()
				vm.snackbar = true
				vm.responsemessage =
					"Kode PW tidak ditemukan atau sudah expired"
			}
		},
		// lanjutkan() {
		//   window.location.href = this.responselink;
		// }
	},
	mounted() {
		this.fetchContent()
	},
}
</script>

<style lang="scss" scoped>
.CodePW {
	margin-top: 0;

	.stretchout {
		margin-left: -15px;
		margin-right: -15px;
	}
}
</style>
