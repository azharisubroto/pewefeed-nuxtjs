<template>
	<div class="pt-5 otppage">
		<div v-if="usermentah!=null">
			<div class="mb-2 px-3">
				Phone Number
			</div>
			<v-text-field
			class="giveline"
			solo
			single-line
			:placeholder="userdata.no_telp"
			filled
			readonly
			v-model="phone"
			></v-text-field>

			<div class="mb-2 px-3 d-flex justify-space-between align-center flex-wrap">
				6 Digit OTP Code
				<v-btn small @click="sendOTP()" color="deep-orange">Send OTP</v-btn>
			</div>
			<v-text-field
			class="giveline"
			solo
			single-line
			placeholder="Masukkan kode OTP dari sms yang anda terima"
			filled
			v-model="otp"
			></v-text-field>

			<v-container>
				<recaptcha @error="onError()" @success="onSuccess()" @expired="onExpired()" />
			</v-container>

			<v-container>
				<v-btn block @click="verifyOTP()" large color="deep-orange" :disabled="verifydisabled">VERIFY</v-btn>
			</v-container>
		</div>

		<!-- MODAL -->
		<v-bottom-sheet v-model="otpmodal" persistent>
			<v-sheet height="100%">
				<v-toolbar :elevation="1" style="border-top:2px solid #fff;">
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
					<v-btn dark text class="deep-orange--text pl-0 text-uppercase" style="margin-left:-10px;">INFORMATION</v-btn>
				</v-toolbar-items>
				<div class="flex-grow-1"></div>
				</v-toolbar>

				<div class="mx-2">
					<v-container class="text-center">


						<template v-if="verifyStatus == 'success'">

							<div class="py-8 text-center">
								<img src="/img/success.svg" width="50" height="50">
								<br><br>
								Nomor Ponsel anda sukses terverifikasi, dan 100 POINT sudah ditambahkan ke akun kamu
							</div>

						</template>
						<template v-if="verifyStatus == 'fail'">

							<div class="py-8 text-center">
								<img src="/img/error.svg" width="50" height="50">
								<br><br>
								Nomor Ponsel anda gagal terverifikasi
								<br><br>
								<v-btn small @click="sendOTP();otpmodal=false" color="green">Retry</v-btn>
							</div>

						</template>
						<template v-if="verifyStatus == 'limited'">

							<div class="py-8 text-center">
								<img src="/img/error.svg" width="50" height="50">
								<br><br>
								Anda telah mencapai limit OTP harian,
								silahkan coba lagi besok.
								<br><br>
								<v-btn block @click="otpmodal=false" color="deep-orange">Tutup</v-btn>
							</div>

						</template>
					</v-container>
				</div>
			</v-sheet>
		</v-bottom-sheet>

		<v-overlay :value="overlay">
		<v-progress-circular indeterminate size="64"></v-progress-circular>
		</v-overlay>
	</div>
</template>

<script>
import UserService from '@/services/UserService'
export default {
	middleware: "auth",
	name:"OTPPAGE",
	data(){
		return {
			usermentah: null,
			userdata: null,
			phone: null,
			otp: null,
			otpmodal: false,
			verifyStatus: null,
			overlay: false,
			verifydisabled: true
		}
	},
	watch: {
		otpmodal: function(newVal, oldval) {
			if( newVal !== true && this.verifyStatus == 'success' ) {
				this.$router.push('/');
			}
		}
	},
	methods: {
		/* Recaptcha */
		onError(error) {
			console.log("Error happened:", error);
			this.recaptchaToken = null;
		},
		onSuccess(token) {
			this.verifydisabled = false
		},
		onExpired() {
			console.log("Expired");
			this.recaptchaToken = null;
		},
		fetchUserdata() {
			this.setProfile();
			this.isLoggedIn = true;
		},
		setProfile() {
			let vm = this
			this.$auth.fetchUser().then(() => {
				localStorage.setItem("userdata", JSON.stringify(vm.$auth.user));
			});
			// this.$auth.fetchUser();
			if( localStorage.getItem('userdata') ) {
				var res = [];
				res.data = JSON.parse(localStorage.getItem('userdata'));

				this.usermentah = res.data;
				this.userdata = res.data.data;
				this.phone = res.data.data.no_telp
			}
		},
		async sendOTP(){
			this.overlay = true
			try {
				const res = await UserService.sendOTP();
				console.log(res.data);
				alert('Kode OTP telah terkirim')
				this.overlay = false
			} catch (error) {
				console.log(JSON.parse(JSON.stringify(error)))
				if (error.response && error.response.status == 422) {
					this.otpmodal = true
					this.verifyStatus = 'limited'
				}
				this.overlay = false
				//alert('Nomor ponsel telah terverifikasi')
			}
		},
		async verifyOTP(){
			this.overlay = true
			let data = {
				otp: this.otp
			}
			try {
				const res = await UserService.verifyOTP(data);
				this.otpmodal = true
				this.verifyStatus = 'success'
				this.overlay = false
			} catch (error) {
				console.log('gagal');
				this.otpmodal = true
				this.verifyStatus = 'fail'
				this.overlay = false
			}
		},
	},
	mounted() {
		this.fetchUserdata();
	}
}
</script>

<style lang="scss">
	.otppage {
		.v-text-field--single-line input {
			margin-top: 0!important;
		}
		.v-text-field.v-text-field--solo:not(.v-text-field--solo-flat) > .v-input__control > .v-input__slot {
			background: #313131!important;
		}
	}
	.profil-edit {
		.v-text-field--solo, .v-text-field--solo * {
			border-radius: 0!important;
		}
	}
	.giveline .v-input__slot{
		border-bottom: 1px solid rgba(255, 255, 255, 0.5);
		border-top: 1px solid rgba(255, 255, 255, 0.5);
		border-radius: 0!important;
	}
</style>
