<template>
	<div class="pt-5 otppage">
		<div v-if="usermentah!=null">
			<div class="mb-2 px-3">
				Phone Number
			</div>
			<v-text-field
			solo
			single-line
			:placeholder="userdata.no_telp"
			filled
			readonly
			v-model="phone"
			></v-text-field>

			<div class="mb-2 px-3 d-flex justify-space-between align-center flex-wrap">
				6 Digit OTP Code
				<v-btn small @click="sendOTP()" color="green">Send OTP</v-btn>
			</div>
			<v-text-field
			solo
			single-line
			placeholder=""
			filled
			v-model="otp"
			></v-text-field>

			<v-container>
				<v-btn block @click="verifyOTP()" large color="green">VERIFY</v-btn>
			</v-container>
		</div>


		<!-- MODAL -->
		<v-bottom-sheet v-model="otpmodal" persistent>
			<v-sheet height="100%">
				<v-toolbar :elevation="1">
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
								<img src="/img/checklist.png" width="50">
								<br><br>
								Nomor Ponsel anda sukses terverifikasi, dan 100 POINT sudah ditambahkan ke akun kamu
							</div>

						</template>
						<template v-if="verifyStatus == 'fail'">

							<div class="py-8 text-center">
								<img src="/img/close.svg" width="50">
								<br><br>
								Nomor Ponsel anda gagal terverifikasi
								<br><br>
								<v-btn small @click="sendOTP();otpmodal=false" color="green">Retry</v-btn>
							</div>

						</template>
					</v-container>
				</div>
			</v-sheet>
		</v-bottom-sheet>
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
			verifyStatus: null
		}
	},
	methods: {
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
			try {
				const res = await UserService.sendOTP();
				console.log(res.data);
				alert('Kode OTP telah terkirim')
			} catch (error) {
				console.log('gagal')
				alert('Nomor ponsel telah terverifikasi')
			}
		},
		async verifyOTP(){
			let data = {
				otp: this.otp
			}
			try {
				const res = await UserService.verifyOTP(data);
				this.otpmodal = true
				this.verifyStatus = 'success'
			} catch (error) {
				console.log('gagal');
				this.otpmodal = true
				this.verifyStatus = 'fail'
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
</style>
