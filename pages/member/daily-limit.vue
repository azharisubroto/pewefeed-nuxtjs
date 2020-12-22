<template>
	<div>
		<v-app-bar
			dark
			color="dark"
			flat
			fixed
			tile
			class="main-app-bar"
			style="z-index: 20"
		>
			<v-btn @click="$router.go(-1)" small icon>
				<v-icon>mdi-chevron-left</v-icon>
			</v-btn>
			<div class="flex-grow-1"></div>
			<v-toolbar-title>
				<strong>VIP Daily Limit</strong>
			</v-toolbar-title>
			<div class="flex-grow-1"></div>

			<div
				@click="
					$router.push('/')
					clearStorage()
				"
				class="pr-1"
			>
				<img src="/img/peweicon.svg" width="20" />
			</div>
		</v-app-bar>

		<div class="profile-page">
			<div class="text-center pt-8 px-5">
				<span class="text-16 mb-3 d-inline-block">
					<span class="green--text">{{ sekarang }}</span> /
					{{ batas }}
				</span>
				<v-progress-linear
					:value="remaining"
					color="green"
					height="25"
					reactive
					rounded
				></v-progress-linear>
			</div>

			<v-list-item-group color="dark" class="mt-10">
				<div class="devider-small"></div>
				<v-list-item class="py-3" to="/about-daily-limit">
					<v-list-item-content>
						<v-list-item-title>
							Apa itu Daily Limit?
						</v-list-item-title>
					</v-list-item-content>
					<v-list-item-icon>
						<v-icon>mdi-chevron-right</v-icon>
					</v-list-item-icon>
				</v-list-item>

				<div class="devider-small"></div>
				<v-list-item
					class="py-3"
					to="/member/purchase-daily"
					:disabled="batas >= 600"
				>
					<v-list-item-content>
						<v-list-item-title style="line-height: 26px">
							Purchase Extra 300 VIP Daily Limit<br />
							Rp. 10.000 (exclude PPN 10%)
						</v-list-item-title>
					</v-list-item-content>
					<v-list-item-icon>
						<v-icon>mdi-chevron-right</v-icon>
					</v-list-item-icon>
				</v-list-item>
				<div class="devider-small"></div>
			</v-list-item-group>
		</div>
	</div>
</template>

<script>
export default {
	middleware: "auth",
	data() {
		return {
			remaining: 0,
			profile: null,
			token: null,
			avatar_preview: "",
			login: false,
			data: {
				avatar: "",
				first_name: "",
				last_name: "",
				username: "",
				email: "",
				msisdn: "",
				expire: "",
				instagram: "",
				no_telp: "",
			},
			userdata: [],
			usermentah: [],
			mypoint: null,
			snackbar: false,
			dropOptions: {
				url: "https://api.pewefeed.com/api/member/avatar",
				headers: {
					Authorization: "",
					"Cache-Control": "",
				},
				method: "POST",
				paramName: "avatar",
				withCredentials: false,
				thumbnailWidth: 100,
				thumbnailHeight: 100,
			},
			isActive: false,
			expire_date: "",
			dialog: false,
			buyVipDialogVisible: false,
			personmenu: [
				{
					name: "Points History",
					to: "/member/histori_penggunaan_poin",
					poin: true,
				},
				{
					name: "Purchase KEANGGOTAAN VIP",
					to: "/purchase",
				},
				{
					name: "Rewards Status",
					to: "/member/barang_yang_didapat",
				},
				{
					name: "Address List for Rewards",
					to: "/member/pengaturan/daftar-alamat",
				},
				{
					name: "Phone List for Rewards",
					to: "/member/pengaturan/daftar-nomor",
				},
				{
					name: "Bank Transfer Status",
					to: "/member/status_transfer",
				},
				{
					name: "VIP Code from SMS",
					to: "/member/kode-pw",
				},
			],
			batas: 0,
			sekarang: 0,
		}
	},
	methods: {
		fetchUserdata() {
			this.setProfile()
			this.isLoggedIn = true
		},
		percentage(partialValue, totalValue) {
			return (100 * partialValue) / totalValue
		},
		setProfile() {
			let vm = this
			this.$auth.fetchUser().then(() => {
				localStorage.setItem("userdata", JSON.stringify(vm.$auth.user))
			})
			// this.$auth.fetchUser();
			if (localStorage.getItem("userdata")) {
				var res = []
				res.data = JSON.parse(localStorage.getItem("userdata"))

				this.usermentah = res.data
				this.userdata = res.data.data
				this.mypoint = res.data.point_total
				this.profile = res.data.data

				var limit = res.data.point_limit
				limit = limit.split("/")
				this.sekarang = limit[0]
				this.batas = limit[1]
				this.remaining = this.percentage(limit[0], limit[1])

				this.dropOptions.headers.Authorization =
					"Bearer " + res.data.token
				this.avatar_preview = res.data.data.avatar
				this.data.first_name = res.data.data.first_name
				this.data.last_name = res.data.data.last_name
				this.data.username = res.data.data.username
				this.data.msisdn = res.data.data.msisdn
				this.data.no_telp = res.data.data.no_telp
				this.data.instagram = res.data.data.instagram
				this.data.email = res.data.data.email
				this.data.expire = res.data.data.expire
				this.expire_date = this.data.expire
				if (res.data.data.status_expired == 1) {
					this.isActive = true
				}
				this.login = true
			}
		},
	},
	mounted() {
		this.setProfile()
	},
}
</script>
<style lang="scss">
.profile-bag {
	background: transparent;
	color: #fff;
	border-top: 0 !important;
	border-bottom: 0 solid transparent !important;
}
.profile-page {
	.v-progress-linear {
		border-radius: 90px !important;
		overflow: hidden;
	}
}
</style>
