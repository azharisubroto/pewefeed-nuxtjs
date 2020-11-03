<template>
	<div>
		<v-bottom-sheet v-model="notVipVisible">
			<v-sheet height="100%">
				<v-toolbar :elevation="1" style="border-top: 2px solid #fff">
					<!-- Arrow -->
					<v-btn
						dark
						icon
						tile
						style="border-right: 0px solid #717171"
						light
						@click="notVipVisible = false"
					>
						<v-icon>mdi-close</v-icon>
					</v-btn>

					<!-- Title -->
					<div class="flex-grow-1"></div>
					<v-toolbar-items>
						<v-btn
							dark
							text
							class="deep-orange--text pl-0"
							style="margin-left: -10px"
							>Information</v-btn
						>
					</v-toolbar-items>
					<div class="flex-grow-1"></div>
				</v-toolbar>

				<div class="mx-2">
					<v-container class="text-center">
						<v-alert
							class="mt-4 mb-10 text-left"
							color="#0057FF"
							prominent
						>
							<template v-slot:prepend>
								<v-img
									src="/img/icons/info.svg"
									width="35"
									max-width="35"
									class="mr-3 infoarticleicon"
								></v-img>
							</template>
							Fitur ini hanya untuk Keanggotaan VIP yang masih
							aktif
						</v-alert>

						<v-btn
							@click="$router.push('/purchase')"
							dark
							block
							large
							color="deep-orange"
							class="text-capitalize"
							>Aktifkan Keanggotaan VIP</v-btn
						>
						<br />
						<br />
					</v-container>
				</div>
			</v-sheet>
		</v-bottom-sheet>
		<BuyVip :dialogVisible="buyVipDialogVisible" @close="myDialogClose" />
	</div>
</template>
<script>
import BuyVip from "./BuyVip"
export default {
	name: "NotVip",
	props: {
		dialogVisible: Boolean,
	},
	data() {
		return {
			dialog: false,
			buyVipDialogVisible: false,
			lazy:
				"https://vtcheckout-production-assets.s3.amazonaws.com/snap/logos/M003796/thumb_retina_snap_2Flogos_2FM003796_2F04571408-807d-4315-af80-df2dfbba9ce3_2FPlayworld.png",
			logo: "/pl-logo.png",
		}
	},
	components: {
		BuyVip,
	},
	computed: {
		notVipVisible: {
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
			this.buyVipDialogVisible = false
			// other code
		},
		buyVip() {
			// if not vip, show dialog
			this.notVipVisible = false
			this.buyVipDialogVisible = true
		},
	},
}
</script>
