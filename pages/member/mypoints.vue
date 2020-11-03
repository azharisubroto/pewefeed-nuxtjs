<template>
	<div class="mypoints">
		<template v-if="!loading && user != null">
			<v-list color="transparent" class="mb-10">
				<v-list-item-group color="dark">
					<v-list-item
						class="py-3"
						to="/member/histori_penggunaan_poin"
					>
						<v-list-item-content class="pt-0 pb-3">
							<v-list-item-title>
								<strong class="d-block text-18 mb-1"
									>Total Points</strong
								>
								<span class="d-block text-14 mb-4 subtitlelist"
									>Lihat histori Poin kamu disini</span
								>
								<div
									class="d-flex align-center"
									style="line-height: 1"
								>
									<v-img
										src="/img/icons/poin-p.svg"
										max-width="26"
										width="26"
										class="mr-3"
									></v-img>
									<div class="text-20">
										{{ user.point_total | thousand }}
									</div>
								</div>
							</v-list-item-title>
						</v-list-item-content>
						<v-list-item-icon class="mb-0 mt-2">
							<v-icon size="30">mdi-chevron-right</v-icon>
						</v-list-item-icon>
					</v-list-item>
					<div class="devider-small"></div>
				</v-list-item-group>
			</v-list>

			<v-container class="mb-0 pt-0">
				<strong class="deep-orange--text text-18">Program</strong>
			</v-container>

			<v-list color="transparent" class="mb-10">
				<v-list-item-group color="dark">
					<div class="devider-small"></div>
					<v-list-item class="py-3" to="/toppoin/">
						<v-list-item-content class="py-3">
							<v-list-item-title>
								<strong class="d-block text-18 mb-2"
									>Top Poin</strong
								>
								<span
									class="d-block w-100 text-14 mb-4 subtitlelist"
									>Kumpulkan Poin sebanyak banyaknya dan
									dapatkan Rewards tanpa diundi dan tanpa
									pemotongan Poin</span
								>
								<div
									class="d-flex align-center"
									style="line-height: 1"
								>
									<v-img
										src="/img/icons/rank.svg"
										max-width="24"
										width="24"
										class="mr-3"
									></v-img>
									<div
										v-if="user.toppoin.ranked"
										class="text-20 mr-7"
									>
										#{{ user.toppoin.ranked | thousand }}
									</div>

									<v-img
										src="/img/icons/poin-p.svg"
										max-width="24"
										width="24"
										class="mr-3"
									></v-img>
									<div
										v-if="user.toppoin.total_poin"
										class="text-20"
									>
										{{ user.toppoin.total_poin | thousand }}
									</div>
								</div>
							</v-list-item-title>
						</v-list-item-content>
						<v-list-item-icon class="mb-0 mt-2">
							<v-icon size="30">mdi-chevron-right</v-icon>
						</v-list-item-icon>
					</v-list-item>
					<div class="devider-small"></div>
					<v-list-item class="py-3" to="/tukarpoin/">
						<v-list-item-content class="py-3">
							<v-list-item-title>
								<strong class="d-block text-18 mb-2"
									>Tukar Poin</strong
								>
								<span
									class="d-block w-100 text-14 mb-4 subtitlelist"
									>Tukar Poin kamu dengan Rewards yang bisa
									kamu pilih sesukamu dan tanpa diundi</span
								>
								<div
									class="d-flex align-center"
									style="line-height: 1"
								>
									<v-img
										src="/img/icons/poin-p.svg"
										max-width="24"
										width="24"
										class="mr-3"
									></v-img>
									<div
										v-if="user.point_total"
										class="text-20"
									>
										{{ user.point_total | thousand }}
									</div>
								</div>
							</v-list-item-title>
						</v-list-item-content>
						<v-list-item-icon class="mb-0 mt-2">
							<v-icon size="30">mdi-chevron-right</v-icon>
						</v-list-item-icon>
					</v-list-item>
					<div class="devider-small"></div>
				</v-list-item-group>
			</v-list>
		</template>
		<template v-else>
			<div class="text-center pa-10">
				<v-progress-circular
					color="green"
					indeterminate
					size="64"
				></v-progress-circular>
			</div>
		</template>
	</div>
</template>

<script>
export default {
	name: "MyPointsPage",
	data() {
		return {
			loading: true,
			isLoggedIn: false,
			user: null,
		}
	},
	filters: {
		thousand(value) {
			return `${value.toLocaleString()}`
		},
	},
	methods: {
		isLogin() {
			return this.isLoggedIn
		},
		setProfile() {
			let vm = this
			this.$auth.fetchUser().then((data) => {
				localStorage.setItem("userdata", JSON.stringify(vm.$auth.user))
				if (vm.$auth.user != null) {
					vm.user = vm.$auth.user
					vm.isLoggedIn = true
					vm.loading = false
				} else {
					window.location.href = "/?tab=3"
				}
			})
		},
	},
	mounted() {
		this.setProfile()
	},
}
</script>

<style lang="scss">
.mypoints {
	.v-list-item__title,
	.v-list-item__subtitle {
		overflow: visible;
		text-overflow: unset;
		white-space: initial;
		line-height: 20px;
	}
	.subtitlelist {
		color: #bdbdbd;
	}
}
</style>
