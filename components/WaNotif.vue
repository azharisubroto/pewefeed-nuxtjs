<template>
	<div v-if="userdata != null && userdata.verified != true">
		<v-list
			color="transparent"
			class="my-0 profile-menus"
			style="background: transparent"
		>
			<v-list-item-group
				color="transparent"
				class="my-0 py-0"
				style="background: transparent"
			>
				<!-- WHATSAPP -->
				<v-list-item
					href="/member/otp"
					class="my-0 py-0"
					style="border: 2px solid red"
				>
					<v-list-item-icon class="mr-5 align-self-center">
						<v-img src="/img/icons/warning.svg"></v-img>
					</v-list-item-icon>
					<v-list-item-content>
						<v-list-item-title>
							<strong>Verifikasi Nomor Ponsel Saya</strong>
							<span class="d-block mt-3">Dapatkan +50 Poin</span>
						</v-list-item-title>
					</v-list-item-content>
					<v-list-item-icon class="align-self-center">
						<v-icon>mdi-chevron-right</v-icon>
					</v-list-item-icon>
				</v-list-item>
			</v-list-item-group>
		</v-list>
	</div>
</template>

<script>
export default {
	name: "WaNotif",
	data() {
		return {
			userdata: null,
		}
	},
	mounted() {
		if (this.$auth.user) {
			this.userdata = this.$auth.user
		}
	},
}
</script>
