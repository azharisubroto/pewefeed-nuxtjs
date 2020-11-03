<template>
	<v-row justify="center">
		<v-dialog
			v-model="pleaseLoginVisible"
			fullscreen
			hide-overlay
			transition="dialog-bottom-transition"
		>
			<v-card>
				<!-- Header -->
				<v-toolbar light color="white">
					<!-- Arrow -->
					<v-btn
						icon
						tile
						style="border-right: 0px solid #717171"
						light
						@click="pleaseLoginVisible = false"
					>
						<v-icon>mdi-close</v-icon>
					</v-btn>

					<!-- Logo -->
					<v-toolbar-title>
						<img
							:src="logo"
							width="130"
							class="d-inline-block mt-3"
						/>
					</v-toolbar-title>

					<!-- Title -->
					<div class="flex-grow-1"></div>
					<v-toolbar-items>
						<v-btn light text>Information</v-btn>
					</v-toolbar-items>
				</v-toolbar>

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
						Untuk dapat menggunakan fitur ini, anda diharuskan untuk
						Login atau Registrasi terlebih dahulu.
						<br />
						<br />
						Klik tombol di bawah ini untuk melanjutkan
					</v-alert>

					<v-btn
						@click="login()"
						dark
						block
						large
						color="deep-orange"
						class="text-capitalize"
					>
						Login / Registrasi
					</v-btn>
				</v-container>
			</v-card>
		</v-dialog>
		<LoginModal
			:dialogVisible="loginDialogVisible"
			@close="myDialogClose"
		/>
	</v-row>
</template>
<script>
import LoginModal from "@/components/modal/LoginModal"
export default {
	name: "PleaseLogin",
	props: {
		dialogVisible: Boolean,
	},
	components: {
		LoginModal,
	},
	data() {
		return {
			dialog: false,
			loginDialogVisible: false,
			lazy:
				"https://vtcheckout-production-assets.s3.amazonaws.com/snap/logos/M003796/thumb_retina_snap_2Flogos_2FM003796_2F04571408-807d-4315-af80-df2dfbba9ce3_2FPlayworld.png",
			logo:
				"https://vtcheckout-production-assets.s3.amazonaws.com/snap/logos/M003796/thumb_retina_snap_2Flogos_2FM003796_2F04571408-807d-4315-af80-df2dfbba9ce3_2FPlayworld.png",
		}
	},
	computed: {
		pleaseLoginVisible: {
			get: function () {
				if (this.dialogVisible) {
					// Some dialog initialization code could be placed here
					// because it is called only when this.dialogVisible changes
					this.$emit("open")
				}

				return this.dialogVisible
			},
			set: function (value) {
				if (!value) {
					this.$emit("close")
				}
			},
		},
	},
	methods: {
		myDialogClose() {
			this.loginDialogVisible = false
			// other code
		},
		login() {
			this.loginDialogVisible = true
			this.pleaseLoginVisible = false
		},
	},
}
</script>
