<template>
	<v-dialog
		v-model="myDialogVisible"
		fullscreen
		hide-overlay
		transition="dialog-bottom-transition"
		style="background: #fff"
	>
		<v-card style="background: #fff" light>
			<!-- Header -->
			<v-toolbar light color="white">
				<!-- Arrow -->
				<v-btn
					icon
					tile
					style="border-right: 0px solid #e5e5e5"
					light
					@click="myDialogVisible = false"
				>
					<v-icon>mdi-close</v-icon>
				</v-btn>

				<!-- Logo -->
				<v-toolbar-title>
					<img :src="logo" width="130" class="d-inline-block mt-3" />
				</v-toolbar-title>

				<!-- Title -->
				<div class="flex-grow-1"></div>
				<v-toolbar-items>
					<v-btn light text>Information</v-btn>
				</v-toolbar-items>
			</v-toolbar>

			<!-- <v-row
          align="center"
          justify="center"
        >
          <v-icon color="black" class="display-3" style="margin-top: 60px">mdi-information-outline</v-icon>
        </v-row>
        <v-row
          align="center"
          justify="center"
        >
          <p class="title mt-4">ANDA BUKAN ANGGOTA VIP</p>
      </v-row>-->

			<v-card-text>
				<iframe
					class="xendit"
					:src="invoiceUrl"
					frameborder="0"
				></iframe>
			</v-card-text>
		</v-card>
	</v-dialog>
</template>
<script>
export default {
	name: "NotVip",
	props: {
		dialogVisible: Boolean,
		invoiceUrl: String,
	},
	data() {
		return {
			dialog: false,
			lazy:
				"https://vtcheckout-production-assets.s3.amazonaws.com/snap/logos/M003796/thumb_retina_snap_2Flogos_2FM003796_2F04571408-807d-4315-af80-df2dfbba9ce3_2FPlayworld.png",
			logo: "/pl-logo.png",
		}
	},
	computed: {
		myDialogVisible: {
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
}
</script>

<style lang="scss" scoped>
.xendit {
	position: fixed;
	width: 100%;
	height: 100%;
	z-index: 1000;
	left: 0;
	right: 0;
	bottom: 0;
	top: 115px;
	margin: auto;
}
</style>
