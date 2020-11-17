<template>
	<!-- MODAL -->
	<v-bottom-sheet v-model="intDialogVisible">
		<v-sheet height="100%" color="transparent">
			<v-card style="border-radius: 0 !important">
				<v-toolbar :elevation="1" style="border-top: 2px solid #fff">
					<!-- Arrow -->
					<v-btn
						dark
						icon
						tile
						style="border-right: 0px solid #717171"
						light
						@click="closeIt()"
					>
						<v-icon>mdi-close</v-icon>
					</v-btn>

					<!-- Title -->
					<div class="flex-grow-1"></div>
					<v-toolbar-items>
						<v-btn dark text class="deep-orange--text"
							>INFORMASI</v-btn
						>
					</v-toolbar-items>
					<div class="flex-grow-1"></div>
				</v-toolbar>

				<div class="px-4 pt-10 text-center">
					<v-img
						v-if="statusPurchase"
						src="/img/checklist.png"
						max-width="60"
						class="mx-auto"
					></v-img>
					<v-img
						v-else
						src="/img/close.png"
						max-width="60"
						class="mx-auto"
					></v-img>
					<div v-if="statusPurchase" class="mt-5 mb-0 text-14">
						Selamat! Keanggotaan VIP kamu telah diperpanjang hingga.
						<span class="green--text">{{ expireDate }}</span>
					</div>
					<div v-else class="mt-5 mb-0 text-14">
						Pembayaran anda belum kami terima, segera selesaikan
						pembayaran.
					</div>
				</div>

				<v-card-actions class="pb-10">
					<v-spacer></v-spacer>
					<v-btn
						v-if="statusPurchase"
						color="deep-orange"
						block
						class="font-weight-bold"
						@click="
							$router.push('/member/histori_penggunaan_poin')
							closeIt()
						"
						>Lihat Tanda Terima</v-btn
					>
					<v-btn
						v-else
						color="deep-orange"
						block
						class="font-weight-bold"
						@click="
							$router.push('/member/status_transfer')
							closeIt()
						"
						>Lihat Pembayaran Tertunda</v-btn
					>
					<br /><br /><br />
					<v-spacer></v-spacer>
				</v-card-actions>
			</v-card>
		</v-sheet>
	</v-bottom-sheet>
</template>

<script>
import UserService from "../../services/UserService"
export default {
	name: "drawerpurchasestatus",
	props: {
		dialogVisible: Boolean,
		expireDate: String,
		statusPurchase: Boolean,
	},
	computed: {
		/* Init Modal */
		intDialogVisible: {
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
		closeIt() {
			this.$emit("close")
		},
	},
}
</script>
