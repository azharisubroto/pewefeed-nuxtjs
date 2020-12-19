<template>
	<div>
		<div class="px-5 py-7">
			<div class="mb-2"><strong>LANGKAH 2 : MASUKAN OTP</strong></div>
			<v-text-field
				outlined
				background-color="#e8e8e8"
				readonly
				:placeholder="phone"
				v-model="phone"
			></v-text-field>

			<div class="mb-4">
				<v-btn
					block
					@click="sendOTP()"
					:disabled="otpsending"
					height="52"
					color="deep-orange"
					class="otpbtn"
					depressed
					light
				>
					<span style="color: #fff !important" v-if="!otpsending"
						>KIRIMKAN OTP</span
					>
					<span style="color: #fff !important" v-else
						>Tunggu ({{ countdown }}s)</span
					>
				</v-btn>
				<div class="text-right mt-3 text-14">
					Request OTP ke-{{ otp_sent }} dari 2
				</div>
			</div>

			<v-divider class="my-4"></v-divider>

			<div class="mb-2 px-3">
				<strong>LANGKAH 2 : MASUKAN OTP</strong>
			</div>
			<v-text-field
				outlined
				background-color="#e8e8e8"
				v-model="otp"
			></v-text-field>

			<div class="text-center mb-4">
				<div class="inline-block mx-auto" style="width: 304px">
					<recaptcha
						@error="onError()"
						@success="onSuccess()"
						@expired="onExpired()"
					/>
				</div>
			</div>

			<v-btn
				block
				depressed
				height="52"
				@click="verifyOTP()"
				large
				color="deep-orange"
				light
				:disabled="verifydisabled"
			>
				<span style="color: #fff !important">VERIFIKASI</span>
			</v-btn>
		</div>

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
	name: "OtpForm",
	props: ["phone_no"],
	data() {
		return {
			usermentah: null,
			userdata: null,
			phone: this.phone_no,
			otp: null,
			otpmodal: false,
			verifyStatus: null,
			overlay: false,
			verifydisabled: true,
			otpsending: false,
			countdown: 60,
			otp_sent: 0,
			otp_message:
				"Nomor Ponsel anda sukses terverifikasi, dan 50 POINT sudah ditambahkan ke akun kamu",
		}
	},
	watch: {
		phone_no: function (newVal) {
			this.phone = this.newVal
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
				this.$store.commit("SET_PROFILE_DIALOG", true)
				this.verifyStatus = "nophone"
			} else {
				this.overlay = true
				try {
					const res = await UserService.sendOTP()
					//console.log(res.data);
					//alert('Kode OTP telah terkirim')
					if (res.status == 200) {
						this.otp_message =
							"Nomor Ponsel anda sukses terverifikasi, dan 50 POINT sudah ditambahkan ke akun kamu"
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
						this.$store.commit("SET_PROFILE_DIALOG", true)
						this.verifyStatus = "limited"
					}
					this.overlay = false
					this.otpsending = false
					this.otp_sent = 2
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
				this.$store.commit("SET_PROFILE_DIALOG", true)
				this.verifyStatus = "success"
				this.overlay = false
			} catch (error) {
				//console.log('gagal');
				this.$store.commit("SET_PROFILE_DIALOG", true)
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
// .otpbtn {
//   .v-btn__content {
//     text-transform: capitalize !important;
//     letter-spacing: 0;
//   }
// }
</style>
