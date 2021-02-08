<template>
	<div>
		<div
			class="bg-login"
			style="background: #1d1d1d; height: 50vw; overflow: hidden"
		>
			<img src="/img/profil-bg.png" :style="'opacity:' + profleOpacity" />
		</div>
		<div class="profile-space"></div>
		<v-container>
			<v-card
				color="#404040"
				class="px-4 pt-4 mb-5"
				style="border-radius: 5px"
			>
				<Login class="pt-0" />
			</v-card>

			<div class="text-center pewesocials">
				<v-btn
					href="https://www.facebook.com/pewefeeds"
					small
					color="#fff"
					light
				>
					<v-icon size="24">mdi-facebook</v-icon>
				</v-btn>
				<v-btn
					href="https://www.instagram.com/pewefeed/"
					small
					color="#fff"
					light
				>
					<v-icon>mdi-instagram</v-icon>
				</v-btn>
				<v-btn
					href="https://twitter.com/pewefeed"
					small
					color="#fff"
					light
				>
					<v-icon>mdi-twitter</v-icon>
				</v-btn>
				<v-btn
					href="https://www.youtube.com/channel/UCW7zo9pK4Vgd2xf68ayXlPw"
					small
					color="#fff"
					light
				>
					<v-icon>mdi-youtube</v-icon>
				</v-btn>
			</div>
		</v-container>
	</div>
</template>
<script>
import Login from "@/components/Login"
export default {
	name: "login",
	components: {
		Login,
	},
	data() {
		return {
			profleOpacity: 1,
		}
	},
}
</script>

<style lang="scss">
.bg-login {
	position: fixed;
	left: 0;
	right: 0;
	margin: 0 auto;
	z-index: 0;
	img {
		width: 100%;
		height: auto;
	}
}
</style>
