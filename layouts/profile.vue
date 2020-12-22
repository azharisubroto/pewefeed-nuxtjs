<template>
	<v-app>
		<v-app-bar dark color="dark" flat fixed tile class="main-app-bar">
			<v-btn @click="$router.back()" small icon>
				<v-icon>mdi-chevron-left</v-icon>
			</v-btn>
			<v-flex grow></v-flex>

			<v-toolbar-title
				@click="
					$router.push('/')
					drawer = false
				"
				class="px-0"
			>
				Profile
			</v-toolbar-title>
			<div class="flex-grow-1"></div>

			<div
				@click="
					$router.push('/')
					clearStorage()
				"
				class="pr-1"
				v-if="$route.name != 'index'"
			>
				<img src="/img/peweicon.svg" width="20" />
			</div>

			<div v-else @click="opensearch = true" class="pr-1">
				<v-icon>mdi-magnify</v-icon>
			</div>
		</v-app-bar>

		<v-main>
			<div class="pb-10 mb-10">
				<nuxt keep-alive />
			</div>

			<!-- NAVIGATION -->
			<v-bottom-navigation
				fixed
				dark
				grow
				color="white"
				background-color="#2c2c2d"
			>
				<v-btn
					small
					class="text-center"
					v-for="item in tabItems"
					:key="item.name"
					:to="item.to"
				>
					<span style="font-size: 8px" v-html="item.name"></span>
				</v-btn>
			</v-bottom-navigation>

			<!-- LIKE MODAL -->
			<BottomDialog />
		</v-main>
	</v-app>
</template>

<script>
import BottomDialog from "@/components/BottomDialog"
export default {
	components: {
		BottomDialog,
	},
	data() {
		return {
			tabItems: [
				{
					name: "Profile Saya",
					to: "/member/pengaturan/profil",
				},
				{
					name: "Tujuan Pengiriman<br>Rewards Digital",
					to: "/member/pengaturan/daftar-nomor",
				},
				{
					name: "Tujuan Pengiriman<br>Rewards Fisik",
					to: "/member/pengaturan/daftar-alamat",
				},
				{
					name: "PIN",
					to: "/member/pengaturan/pin",
				},
			],
		}
	},
}
</script>

<style lang="scss">
.v-bottom-navigation {
	.v-btn {
		border-top: 5px solid #bababa !important;
		&.v-btn--active {
			border-color: #ff4200 !important;
		}
	}
}
.vue-pincode-input-wrapper {
	.vue-pincode-input {
		width: 10vw;
		max-width: 10vw;
		height: 10vw;
		background: #404040;
		border-radius: 5px;
		box-shadow: none;
		color: #fff;
		margin-right: 10px;
		padding: 0;
		text-align: center;
		line-height: 10vw;
		&[type="password"] {
			-webkit-text-security: square;
			font-size: 40px;
		}
	}
}
</style>
