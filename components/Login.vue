<template>
	<div class="container">
		<h3 class="my-3 text-center" id="loginhead">Daftar / Login</h3>
		<!-- {{redirect}} -->
		<OAuth
			provider="facebook"
			btnclass="indigo darken-1 "
			:redirect="redirecturl"
			@makeloading="setloading"
			@notloading="notloading"
		/>
		<OAuth
			provider="google"
			btnclass="red darken-1"
			:redirect="redirecturl"
			@makeloading="setloading"
			@notloading="notloading"
		/>

		<v-overlay :value="overlay">
			<v-progress-circular
				color="green"
				indeterminate
				size="64"
			></v-progress-circular>
		</v-overlay>

		<v-dialog v-model="fail" max-width="290">
			<v-card>
				<v-card-title class="headline justify-center">
					<div id="gagal-login" style="color: red">Gagal Login!</div>
				</v-card-title>

				<v-card-text align="center">
					<v-img src="/img/sad.png" class="my-3" width="100"></v-img>
					<span id="text-maaf"
						>Kami tidak dapat menemukan akun anda dalam database
						kami, silahkan mencoba dengan akun facebook/google yang
						berbeda</span
					>
				</v-card-text>

				<v-card-actions>
					<v-btn
						color="deep-orange accent-2"
						depressed
						dark
						block
						id="tutupbtn"
						@click="fail = false"
						>Oke</v-btn
					>
				</v-card-actions>
			</v-card>
		</v-dialog>
	</div>
</template>

<script>
import OAuth from "@/components/OAuth"

export default {
	name: "Login",
	props: ["redirect"],
	components: {
		OAuth,
	},
	data() {
		return {
			overlay: false,
			fail: false,
			redirecturl: this.redirect ? this.redirect : "/",
		}
	},
	methods: {
		setloading() {
			this.overlay = true
		},
		notloading() {
			this.overlay = false
			this.fail = true
		},
	},
}
</script>
