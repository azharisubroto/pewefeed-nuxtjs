<template>
	<div>
		<template v-if="detail != null && !loading">
			<!-- JUDUL -->
			<v-container class="mb-4">
				<h1 class="text-24 deep-orange--text text-center mt-4">
					{{ detail.data.title }}
				</h1>
			</v-container>

			<!-- TEASER -->
			<div v-html="detail.data.embed"></div>

			<!-- DESCRIPTION -->
			<v-container>
				<div v-html="detail.data.description"></div>
				<div v-html="detail.data.explanation"></div>
			</v-container>
		</template>
		<div v-else-if="detail == null && loading" class="text-center pa-10">
			<v-progress-circular
				color="green"
				:width="3"
				indeterminate
			></v-progress-circular>
		</div>
		<div v-else class="text-center pa-10">Data unavailable</div>

		<LoginModal :dialogVisible="loginModalVisible" @close="myDialogClose" />
		<NotVip :dialogVisible="notVipDialogVisible" @close="myDialogClose" />
	</div>
</template>

<script>
import KelasService from "@/services/KelasService"
import LoginModal from "@/components/modal/LoginModal"
import NotVip from "@/components/modal/NotVip"

export default {
	name: "KelasDetailPage",
	components: {
		LoginModal,
		NotVip,
	},
	data() {
		return {
			slug: this.$route.params.materi,
			parentslug: this.$route.params.kelasdetail,
			loading: true,
			detail: null,
			loggedin: null,
			isVIP: null,
			loginModalVisible: false,
			notVipDialogVisible: false,
		}
	},
	methods: {
		myDialogClose() {
			this.loginModalVisible = false
			this.notVipDialogVisible = false
			// other code
		},
		fetchUserdata() {
			let vm = this
			this.$auth.fetchUser().then(() => {
				var res = vm.$auth.user
				// var res = [];
				if (res) {
					this.loggedin = true
					this.isVIP = res.data.vip
					if (this.isVIP == true) {
						this.fetchDetailVIP()
					} else {
						this.fetchDetail()
					}
					////console.log('vip', res.data.vip)
				} else {
					this.loggedin = false
					this.isVIP = false
					this.fetchDetail()
				}
			})
		},
		checkMe() {
			if (!this.loggedin && !this.isVIP) {
				this.loginModalVisible = true
			} else if (this.loggedin && !this.isVIP) {
				this.notVipDialogVisible = true
			} else {
				this.loginModalVisible = true
			}
		},
		async fetchDetailVIP() {
			try {
				const res = await KelasService.getDetailAuth(
					this.parentslug + "/" + this.slug
				)
				this.detail = res.data
				this.loading = false
			} catch (error) {
				console.log(error)
				this.loading = false
			}
		},
		async fetchDetail() {
			try {
				const res = await KelasService.getDetail(
					this.parentslug + "/" + this.slug
				)
				this.detail = res.data
				this.loading = false
			} catch (error) {
				console.log(error)
				this.loading = false
			}
		},
	},
	mounted() {
		this.fetchUserdata()
	},
}
</script>

<style lang="scss">
.kelas-item {
	padding: 15px;
	border-top: 1px solid #fff;
}
div .kelas-item:last-child {
	border-bottom: 1px solid #fff;
}
</style>
