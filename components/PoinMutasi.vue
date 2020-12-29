<template>
	<div>
		<template v-if="!loading">
			<template v-if="mutasi.length > 0">
				<template v-for="item in mutasi">
					<ProductCard
						:dense="true"
						class="mb-4"
						:key="item.id"
						:title="item.created_at"
					>
						<template v-slot:head-right>
							<div
								class="deep-orange--text"
								style="line-height: 1"
							>
								<strong>{{ item.point }}</strong>
								<img
									src="/img/icons/poin-filled.svg"
									loading="lazy"
									alt=""
								/>
							</div>
						</template>

						<ProductItem
							:dense="true"
							label="Aktivitas"
							:detail="item.activity"
						/>
						<ProductItem
							:dense="true"
							label="Halaman"
							:detail="item.description"
						/>
						<ProductItem :dense="true" label="Tautan">
							<template v-slot:action>
								<a :href="item.link">
									{{ item.link }}
								</a>
							</template>
						</ProductItem>

						<ProductItem
							v-if="
								item.type == 'POIN KUNJUNGAN HARIAN' &&
								item.point > 0
							"
							:dense="true"
							:detail="item.link"
						>
							<template v-slot:action>
								<v-btn
									small
									color="#ff4200"
									depressed
									height="18"
								>
									<span
										class="text-12"
										style="
											text-transform: initial !important;
										"
									>
										Klaim +10 Poin</span
									>
								</v-btn>
							</template>
						</ProductItem>
					</ProductCard>
				</template>

				<v-btn
					v-if="last_page > page"
					color="#ff4200"
					block
					@click="getMutation(parseInt(page + 1), type)"
				>
					Lihat Lainnya
				</v-btn>
			</template>

			<template v-else>
				<v-card
					class="px-3 py-2"
					outlined
					color="#404040"
					style="border-color: #bababa"
				>
					Tidak ada data
				</v-card>
			</template>
		</template>

		<template v-if="loading">
			<div class="pa-10 text-center">
				<v-progress-circular
					color="green"
					indeterminate
					size="64"
				></v-progress-circular>
			</div>
		</template>

		<v-overlay :value="overlay">
			<v-progress-circular
				color="green"
				indeterminate
				size="64"
			></v-progress-circular>
		</v-overlay>
	</div>
</template>

<script>
import UserService from "@/services/UserService"
import ProductCard from "@/components/ProductCard"
import ProductItem from "@/components/ProductItem"
export default {
	name: "PoinMutasi",
	props: ["type"],
	data() {
		return {
			loading: true,
			mutasi: [],
			page: 1,
			last_page: 1,
			overlay: false,
		}
	},
	components: {
		ProductCard,
		ProductItem,
	},
	methods: {
		async getMutation(page, filter) {
			this.mutasi = []
			var n = page ? page : 1
			var fil = filter ? filter : "all"
			this.onFilter = filter ? filter : "all"
			try {
				const res = await UserService.mutasiPoin(n, fil)
				setTimeout(() => {
					const items = res.data.data
					console.log(items)
					if (res.data.data.length > 0) {
						this.notFound = false
					} else {
						this.notFound = true
					}
					this.page = res.data.paginations.current_page
					this.last_page = res.data.paginations.last_page
					this.mutasi = items
					this.loading = false
				}, 500)
			} catch (error) {
				console.log("error")
				this.loading = false
			}
		},
		async claim() {
			this.overlay = true
			let vm = this
			try {
				const res = await UserService.claimDailyPoint()

				this.getMutation(1, this.type)

				setTimeout(() => {
					this.overlay = false
					location.reload()
				}, 1000)
			} catch (error) {
				this.overlay = false
				console.log(error)
			}
		},
	},
	mounted() {
		this.getMutation(1, this.type)
	},
}
</script>

<style lang="scss" scoped>
img {
	vertical-align: middle;
	margin-left: 5px;
	position: relative;
}
</style>
