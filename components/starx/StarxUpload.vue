<template>
	<v-container ma-0 pa-0>
		<!-- oooooooooooooooooooooooooooooooooooooo
		IZON
		oooooooooooooooooooooooooooooooooooooo -->
		<!-- <v-tab-item
			value="izin-sekolah"
		>
			<StarxIzin />
		</v-tab-item> -->

		<!-- oooooooooooooooooooooooooooooooooooooo
		PROFILE BAND
		oooooooooooooooooooooooooooooooooooooo -->
		<template v-if="profile">
			<StarxProfile />
		</template>

		<!-- oooooooooooooooooooooooooooooooooooooo
		UPLOAD
		oooooooooooooooooooooooooooooooooooooo -->
		<template v-if="upload">
			<v-container>
				<v-alert
					border="left"
					dense
					colored-border
					type="info"
					style="
						border-top: 1px solid #2095f3;
						border-bottom: 1px solid #2095f3;
						border-right: 1px solid #2095f3;
					"
				>
					Maksimal 3 video terpublish untuk tahapan audisi
				</v-alert>
			</v-container>
			<StarxVideoSubmit />
		</template>

		<v-bottom-navigation
			fixed
			dark
			grow
			color="white"
			background-color="black"
		>
			<!-- <v-tab href="#izin-sekolah">
				Izin Sekolah
			</v-tab> -->

			<v-btn @click=";(profile = true), (upload = false)">
				Profile Band
			</v-btn>

			<v-btn @click=";(profile = false), (upload = true)"> Upload </v-btn>

			<!-- <v-tab href="#syarat">
				Syarat &amp; Ketentuan
			</v-tab> -->
		</v-bottom-navigation>
	</v-container>
</template>

<script>
import StarxProfile from "@/components/starx/StarxProfile"
import StarxVideoSubmit from "@/components/starx/StarxVideoSubmit"

export default {
	name: "StarxForm",
	components: {
		StarxProfile,
		StarxVideoSubmit,
	},
	data() {
		return {
			tab: null,
			syarat: "",
			profile: true,
			upload: false,
		}
	},
	mounted() {
		var syarat = localStorage.getItem("syarat")
		this.syarat = syarat
	},
}
</script>
