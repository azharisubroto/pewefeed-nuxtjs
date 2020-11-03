<template>
	<div></div>
</template>

<script>
export default {
	name: "Sorter",
	props: {
		dialogVisible: Boolean,
	},
	data() {
		return {
			sorter: [
				"Star to NOT Star",
				"High VOTE to low VOTE",
				"Low VOTE to High VOTE",
				"High COMMENTS to Low COMMENTS",
				"Low COMMENTS to Hight COMMENTS",
				"Newest to Oldest",
				"Oldest to Newest",
			],
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
	padding: 30px;
}
.v-dialog {
	z-index: 10000;
}
</style>
