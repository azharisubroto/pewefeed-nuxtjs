<template>
	<div class="pt-5 otppage">
		<div v-if="usermentah != null">
			<div class="mb-2 px-3">Phone Number</div>
			<v-text-field
				class="giveline"
				solo
				single-line
				:placeholder="phone"
				filled
				readonly
				v-model="phone"
			></v-text-field>

			<v-container class="mb-4">
				<v-btn
					block
					@click="sendOTP()"
					:disabled="otpsending"
					height="52"
					color="deep-orange"
					class="otpbtn"
				>
					<span v-if="!otpsending">Kirim Kode OTP</span>
					<span v-else>Tunggu ({{ countdown }}s)</span>
				</v-btn>
				<div class="text-right mt-3 text-14">
					Request OTP ke-{{ otp_sent }} dari 1
				</div>
			</v-container>

			<div class="mb-2 px-3">Kode OTP</div>
			<v-text-field
				class="giveline"
				solo
				single-line
				placeholder=""
				filled
				v-model="otp"
			></v-text-field>

			<v-container>
				<recaptcha
					@error="onError()"
					@success="onSuccess()"
					@expired="onExpired()"
				/>
			</v-container>

			<v-container>
				<v-btn
					block
					height="52"
					@click="verifyOTP()"
					large
					color="deep-orange"
					:disabled="verifydisabled"
				>
					Verifikasi Nomor Ponsel Saya
				</v-btn>
			</v-container>
		</div>

		<!-- MODAL -->
		<v-bottom-sheet v-model="otpmodal" persistent>
			<v-sheet height="100%">
				<v-toolbar :elevation="1" style="border-top: 2px solid #fff">
					<!-- Arrow -->
					<v-btn
						dark
						icon
						tile
						style="border-right: 0px solid #717171"
						light
						@click="otpmodal = false"
					>
						<v-icon>mdi-close</v-icon>
					</v-btn>

					<!-- Title -->
					<div class="flex-grow-1"></div>
					<v-toolbar-items>
						<v-btn
							dark
							text
							class="deep-orange--text pl-0 text-uppercase"
							style="margin-left: -10px"
							>INFORMATION</v-btn
						>
					</v-toolbar-items>
					<div class="flex-grow-1"></div>
				</v-toolbar>

				<div class="mx-2">
					<v-container class="text-center">
						<template v-if="verifyStatus == 'success'">
							<div class="py-8 text-center">
								<img
									src="/img/success.svg"
									width="50"
									height="50"
								/>
								<br /><br />
								{{ otp_message }}
							</div>
						</template>
						<template v-if="verifyStatus == 'fail'">
							<div class="py-8 text-center">
								<img
									src="/img/error.svg"
									width="50"
									height="50"
								/>
								<br /><br />
								Nomor Ponsel anda gagal terverifikasi
								<br /><br />
								<v-btn
									small
									@click="
										sendOTP()
										otpmodal = false
									"
									color="green"
									>Retry</v-btn
								>
							</div>
						</template>
						<template v-if="verifyStatus == 'nophone'">
							<div class="py-8 text-center">
								<img
									src="/img/error.svg"
									width="50"
									height="50"
								/>
								<br /><br />
								Kami tidak menemukan data<br />Nomor Ponsel anda
								<br /><br />
								<v-btn
									block
									href="/member/pengaturan/profil"
									height="46"
									color="#ff4200"
									>Perbaharui Data Akun Saya</v-btn
								>
							</div>
						</template>
						<template v-if="verifyStatus == 'limited'">
							<div class="py-8 text-center">
								<img
									src="/img/error.svg"
									width="50"
									height="50"
								/>
								<br /><br />
								Request OTP anda sudah habis,<br />coba lagi
								besok <br /><br />
								<v-btn
									block
									@click="otpmodal = false"
									color="deep-orange"
									>Tutup</v-btn
								>
							</div>
						</template>
					</v-container>
				</div>
			</v-sheet>
		</v-bottom-sheet>

		<v-overlay :value="overlay">
			<v-progress-circular
				color="green"
				indeterminate
				size="64"
			></v-progress-circular>
		</v-overlay>
	</div>
</template>

<script>
import UserService from "@/services/UserService"
export default {
	middleware: "auth",
	name: "OTPPAGE",
	data() {
		return {
			usermentah: null,
			userdata: null,
			phone: null,
			otp: null,
			otpmodal: false,
			verifyStatus: null,
			overlay: false,
			verifydisabled: true,
			otpsending: false,
			countdown: 60,
			otp_sent: 0,
			otp_message:
				"Nomor Ponsel anda sukses terverifikasi, dan 100 POINT sudah ditambahkan ke akun kamu",
		}
	},
	watch: {
		otpmodal: function (newVal, oldval) {
			if (newVal !== true && this.verifyStatus == "success") {
				this.$router.push("/")
			}
		},
		otpsending: function (newVal, oldVal) {
			let vm = this
			if (newVal == true) {
				setInterval(() => {
					vm.countdown--
				}, 1000)
			} else {
				vm.countdown = 60
			}
		},
		countdown: function (newVal, oldVal) {
			let vm = this
			if (newVal == 0) {
				vm.otpsending = false
				vm.countdown = 60
			}
		},
	},
	methods: {
		/* Recaptcha */
		onError(error) {
			//console.log("Error happened:", error);
			this.recaptchaToken = null
		},
		onSuccess(token) {
			this.verifydisabled = false
		},
		onExpired() {
			//console.log("Expired");
			this.recaptchaToken = null
		},
		fetchUserdata() {
			this.setProfile()
		},
		setProfile() {
			let vm = this
			this.$auth.fetchUser().then(() => {
				localStorage.setItem("userdata", JSON.stringify(vm.$auth.user))
				this.isLoggedIn = true
				var res = []
				res.data = vm.$auth.user

				vm.usermentah = res.data
				vm.userdata = res.data.data
				if (res.data.qouta_otp) vm.otp_sent = res.data.qouta_otp
				if (res.data.data.no_telp) {
					vm.phone = res.data.data.no_telp
				}
			})
		},
		async sendOTP() {
			if (this.phone == null || this.phone == "" || !this.phone) {
				this.otpmodal = true
				this.verifyStatus = "nophone"
			} else {
				this.overlay = true
				try {
					const res = await UserService.sendOTP()
					//console.log(res.data);
					//alert('Kode OTP telah terkirim')
					if (res.status == 200) {
						this.otp_message =
							"Nomor Ponsel anda sukses terverifikasi, dan 100 POINT sudah ditambahkan ke akun kamu"
					} else {
						this.otp_message =
							"Nomor Ponsel anda sukses terverifikasi"
					}
					this.overlay = false
					this.otpsending = true
					this.otp_sent++
				} catch (error) {
					//console.log(JSON.parse(JSON.stringify(error)))
					if (error.response && error.response.status == 422) {
						this.otpmodal = true
						this.verifyStatus = "limited"
					}
					this.overlay = false
					this.otpsending = false
					this.otp_sent = 1
					//alert('Nomor ponsel telah terverifikasi')
				}
			}
		},
		async verifyOTP() {
			this.overlay = true
			let data = {
				otp: this.otp,
			}
			try {
				const res = await UserService.verifyOTP(data)
				this.otpmodal = true
				this.verifyStatus = "success"
				this.overlay = false
			} catch (error) {
				//console.log('gagal');
				this.otpmodal = true
				this.verifyStatus = "fail"
				this.overlay = false
			}
		},
	},
	mounted() {
		this.fetchUserdata()
	},
}
</script>

<style lang="scss">
.otppage {
	.v-text-field--single-line input {
		margin-top: 0 !important;
	}
	.v-text-field.v-text-field--solo:not(.v-text-field--solo-flat)
		> .v-input__control
		> .v-input__slot {
		background: #313131 !important;
	}
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
.otpbtn {
	.v-btn__content {
		text-transform: capitalize !important;
		letter-spacing: 0;
	}
}
</style>
