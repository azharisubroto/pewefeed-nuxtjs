<template>
	<v-container v-if="mounted">
		<v-card outlined :elevation="0" class="pincard">
			<div v-if="!isReset" class="py-3 px-7">
				<v-row align="center">
					<v-col md="4">
						<strong>Status PIN</strong>
					</v-col>
					<v-col md="8" class="pt-1">
						<v-icon
							:color="$auth.user.data.pin ? 'green' : '#969696'"
							size="20"
							>mdi-check-decagram</v-icon
						>
						<span
							:class="[
								$auth.user.data.pin
									? 'green--text'
									: 'grey--text text--darken-1',
							]"
							>{{
								$auth.user.data.pin
									? "Sudah Dibuat"
									: "Belum Dibuat"
							}}</span
						>
					</v-col>
				</v-row>
			</div>
			<v-divider v-if="!isReset" class="dark-brd"></v-divider>

			<div class="py-3 px-7">
				<!-- PIN BARU -->
				<v-row v-if="$auth.user.data.pin && !isReset" align="center">
					<v-col md="4">
						<strong>PIN Lama</strong>
					</v-col>
					<v-col md="8" class="pt-1">
						<PincodeInput
							v-model="old_pin"
							:length="6"
							characterPreview
							secure
							:autofocus="false"
						/>
					</v-col>
				</v-row>
				<v-row align="center">
					<v-col md="4">
						<strong>PIN Baru</strong>
					</v-col>
					<v-col md="8" class="pt-1">
						<PincodeInput
							v-model="pin"
							:length="6"
							characterPreview
							secure
							:autofocus="false"
						/>
					</v-col>
				</v-row>
				<v-row>
					<v-col md="4" class="pt-6">
						<strong>Ulangi PIN Baru</strong>
					</v-col>
					<v-col md="8" class="pt-1">
						<PincodeInput
							v-model="pin_confirmation"
							:length="6"
							characterPreview
							secure
							:autofocus="false"
						/>

						<div v-if="error" class="red--text mt-3">
							Pin tidak cocok
						</div>
					</v-col>
				</v-row>
				<v-row align="center">
					<v-col md="12">
						<v-btn
							@click="handleSubmit()"
							depressed
							medium
							block
							width="179"
							height="41"
							:color="
								pin.length == 6 &&
								pin_confirmation.length == 6 &&
								pin === pin_confirmation
									? '#ff4200'
									: 'grey lighten-2'
							"
							:dark="
								pin.length == 6 &&
								pin_confirmation.length == 6 &&
								pin === pin_confirmation
									? true
									: false
							"
							:disabled="pin != pin_confirmation"
						>
							<strong class="text-16">Simpan</strong></v-btn
						>
					</v-col>
				</v-row>
			</div>
		</v-card>
		<p class="mt-4 mb-0" v-if="!isReset">
			Lupa dengan PIN Lama kamu?
			<a href="#" class="deep-orange--text" @click="resetPin()"
				>Klik Reset Disini</a
			>
		</p>
	</v-container>
</template>

<script>
import PincodeInput from "vue-pincode-input"
import UserService from "@/services/UserService"
export default {
	name: "Pin",
	components: {
		PincodeInput,
	},
	data() {
		return {
			old_pin: "",
			pin: "",
			pin_confirmation: "",
			error: null,
			isReset: false,
			mounted: false,
		}
	},
	watch: {
		pin_confirmation: function (newval) {
			if (newval.length == 6) {
				if (this.pin_confirmation != this.pin) {
					this.error = true
				} else {
					this.error = false
				}
			}
		},
	},
	methods: {
		reset() {
			this.old_pin = ""
			this.pin = ""
			this.pin_confirmation = ""
		},
		async handleSubmit() {
			if (!this.$auth.user.data.pin) {
				this.addPin()
			} else {
				if (this.isReset) {
					this.addPin()
				} else {
					this.updatePin()
				}
			}
		},
		async addPin() {
			try {
				const params = {
					pin: this.pin,
					pin_confirmation: this.pin_confirmation,
				}
				const { data } = await UserService.addPin(params)
				const message = data.message
				console.log(message)
				if (message == "success") {
					this.$store.commit("SET_PROFILE_DIALOG", true)
					this.$store.commit("SET_PROFILE_DIALOG_CONTENT", {
						success: true,
						message: "Pin Sukses Dibuat",
						button: false,
					})
				}
				this.reset()
				this.isReset = false
				this.$router.replace({ query: null })

				this.$auth.fetchUser()
			} catch (error) {
				console.log(error)
				if (message == "success") {
					this.$store.commit("SET_PROFILE_DIALOG", true)
					this.$store.commit("SET_PROFILE_DIALOG_CONTENT", {
						success: false,
						message: "Pin Gagal Dibuat<br/>silahkan cek kembali",
						button: false,
					})
				}
				this.reset()
			}
		},
		async updatePin() {
			try {
				const params = {
					old_pin: this.old_pin,
					new_pin: this.pin,
					new_pin_confirmation: this.pin_confirmation,
				}

				const { data } = await UserService.updatePin(params)
				const message = data.message
				console.log(message)
				if (message == "success") {
					this.$store.commit("SET_PROFILE_DIALOG", true)
					this.$store.commit("SET_PROFILE_DIALOG_CONTENT", {
						success: true,
						message: "Pin Sukses Diganti",
						button: false,
					})
				}
				this.reset()
				this.$auth.fetchUser()
			} catch (error) {
				console.log(error)
				this.$store.commit("SET_PROFILE_DIALOG", true)
				this.$store.commit("SET_PROFILE_DIALOG_CONTENT", {
					success: false,
					message: "Pin Gagal Diganti<br/>silahkan cek kembali",
					button: false,
				})
				this.reset()
				this.$auth.fetchUser()
			}
		},
		async resetPin() {
			let _this = this
			try {
				const { data } = await UserService.resetPin()
				const message = data.message
				this.$store.commit("SET_PROFILE_DIALOG", true)
				this.$store.commit("SET_PROFILE_DIALOG_CONTENT", {
					success: true,
					message: `URL Reset PIN telah dikirimkan ke email<br> ${_this.$auth.user.data.email}`,
					button: false,
				})
			} catch (error) {
				this.$store.commit("SET_PROFILE_DIALOG", true)
				this.$store.commit("SET_PROFILE_DIALOG_CONTENT", {
					success: false,
					message: error.response.data.message,
					button: false,
				})
			}
		},
		async verifyToken(token) {
			try {
				const { data } = await UserService.checkPinToken(token)
				if (data.message == "success") {
					this.isReset = true
				}
			} catch (error) {
				console.log(error)
				this.isReset = true
			}
		},
	},
	mounted() {
		if (this.$route.query.token != null) {
			this.verifyToken(this.$route.query.token)
		}

		if (typeof document !== "undefined") {
			this.mounted = true
		}
	},
}
</script>

<style lang="scss">
.pincard,
.dark-brd {
	border-color: #fff !important;
}
.pincard {
	.vue-pincode-input-wrapper {
		.vue-pincode-input {
			width: 10vw;
			max-width: 10vw;
			height: 10vw;
			background: #404040;
			border-radius: 5px;
			box-shadow: none;
			margin-right: 10px;
			padding: 0;
			text-align: center;
			line-height: 10vw;
			&[type="password"] {
				-webkit-text-security: square;
				font-size: 40px;
				// font-size: 0;
				// background: #e8e8e8 url("/img/icons/asterisk.svg") no-repeat center
				//   center;
				// background-size: 50% 50%;
			}
		}
	}
}
</style>
