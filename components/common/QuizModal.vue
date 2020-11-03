<template>
	<v-bottom-sheet v-model="intDialogVisible">
		<v-sheet height="100%">
			<v-toolbar :elevation="1" style="border-top: 2px solid #fff">
				<!-- Arrow -->
				<v-btn
					dark
					icon
					tile
					style="border-right: 0px solid #717171"
					light
					@click="intDialogVisible = false"
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
					>
						<template v-if="already == true">
							Oops, Sorry!
						</template>
						<template v-else>
							<template v-if="jawaban == true">
								You've got 20 Point!
							</template>
							<template v-if="jawaban == false">
								Oops, Sorry!
							</template>
							<template v-if="nolimit == true">
								Oops, Sorry!
							</template>
						</template>
					</v-btn>
				</v-toolbar-items>
				<div class="flex-grow-1"></div>
			</v-toolbar>

			<div class="px-4 pt-10 text-center">
				<v-img
					src="/img/poinextra.png"
					max-width="60"
					class="mx-auto"
				></v-img>
				<div class="mt-5 mb-0 text-14">
					<br />
					<template v-if="already == true">
						Kamu sudah pernah menjawab Quiz
					</template>
					<template v-else>
						<template v-if="jawaban == true">
							Kamu mendapat 20 Point karena sudah<br />
							Jawab Quiz di Artikel
						</template>
						<template v-if="jawaban == false">
							Kamu mendapat 0 Point karena sudah<br />
							Salah Menjawab Quiz di Artikel
						</template>
						<template v-if="nolimit == true">
							Limit Poin harian untuk interaksi VIP sudah mencapai
							200 Poin, namun interaksi Comment dan Share masih
							dapat kamu lakukan.
						</template>
					</template>
				</div>
			</div>
			<v-card-actions class="pb-10">
				<v-spacer></v-spacer>
				<v-btn
					to="/member/histori_penggunaan_poin"
					color="deep-orange"
					block
					class="mt-2"
					>Check Total Point</v-btn
				>
				<br /><br /><br />
				<v-spacer></v-spacer>
			</v-card-actions>
		</v-sheet>
	</v-bottom-sheet>
</template>

<script>
export default {
	name: "QuizModal",
	props: {
		dialogVisible: Boolean,
		jawaban: Boolean,
		already: Boolean,
		nolimit: Boolean,
	},
	data() {
		return {
			logo: "/pl-logo.png",
		}
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
		closeIt() {
			this.$emit("close")
		},
	},
}
</script>

<style lang="scss">
.gray--background {
	background: #f5f5f5 !important;
}
.whitebox {
	background: #fff;
	padding: 30px 30px 10px;
}
.v-dialog {
	z-index: 10000;
}
</style>
