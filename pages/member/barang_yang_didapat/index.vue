<template>
	<section class="rewards-home">
		<v-tabs-items style="background: transparent !important" v-model="tab">
			<v-tab-item v-for="item in tabItems" :key="item">
				<template v-if="item == 'Menunggu'">
					<Menunggu
						key="wait"
						type="wait"
						:redirect="1"
						:addresses="addresses"
						:contact="contact"
					/>
				</template>
				<template v-if="item == 'Diproses'">
					<Menunggu
						key="process"
						type="process"
						:redirect="2"
						:addresses="addresses"
						:contact="contact"
					/>
					<!-- <Dikirim /> -->
				</template>
				<template v-if="item == 'Dikirim'">
					<Menunggu
						key="confirmation"
						type="confirmation"
						:redirect="3"
						:addresses="addresses"
						:contact="contact"
					/>
					<!-- <Diterima /> -->
				</template>
				<template v-if="item == 'Diterima'">
					<Menunggu
						key="finish"
						type="finish"
						:addresses="addresses"
						:contact="contact"
					/>
					<!-- <Selesai /> -->
				</template>
			</v-tab-item>
		</v-tabs-items>

		<!-- PROFIL MENU -->
		<v-bottom-navigation
			fixed
			dark
			grow
			color="white"
			background-color="#2c2c2d"
			v-model="tab"
			style="z-index: 99"
		>
			<v-btn v-for="item in tabItems" :key="item">
				<span class="text-11"
					>{{ item }}
					<br />
					<template class="text-11" v-if="item == 'Menunggu'">
						( {{ wait }} )
					</template>
					<template class="text-11" v-if="item == 'Diproses'">
						( {{ process }} )
					</template>
					<template class="text-11" v-if="item == 'Dikirim'">
						( {{ confirmation }} )
					</template>
					<template class="text-11" v-if="item == 'Diterima'">
						( {{ finish }} )
					</template>
				</span>
			</v-btn>
		</v-bottom-navigation>
	</section>
</template>
<script>
import Menunggu from "@/components/member/rewards/Menunggu"
import UserService from "@/services/UserService"
export default {
	components: {
		Menunggu,
	},
	data() {
		return {
			tab: 0,
			addresses: null,
			contact: null,
			tabItems: ["Menunggu", "Diproses", "Dikirim", "Diterima"],
			wait: 0,
			process: 0,
			confirmation: 0,
			finish: 0,
		}
	},
	methods: {
		async getAddresses() {
			this.isLoading = true
			try {
				const res = await UserService.getAddresses()
				var items = res.data.data
				if (items && items.length > 0) {
					////console.log(JSON.parse(JSON.stringify(items)))
					this.addresses = items
				}
			} catch (error) {
				console.log(error)
			}
		},
		async getNumbers() {
			this.isLoading = true
			try {
				const res = await UserService.getContacts()
				var items = res.data.data
				if (items && items.length > 0) {
					////console.log(JSON.parse(JSON.stringify(items)))
					this.contact = items
				}
			} catch (error) {
				//console.log(res)
			}
		},
		async fetchRewards(type, paged, limit, reset = false) {
			try {
				const res = await UserService.rewards(type, paged, limit)
				this[type] = res.data.pagination.total
			} catch (error) {
				console.log(error)
			}
		},
	},
	mounted() {
		let _self = this
		this.getAddresses()
		this.getNumbers()
		this.fetchRewards("wait", 1, 1)
		this.fetchRewards("process", 1, 1)
		this.fetchRewards("confirmation", 1, 1)
		this.fetchRewards("finish", 1, 1)
		this.$bus.$on("rewardtabclick", (tab) => {
			console.log(tab)
			_self.tab = tab
		})
	},
}
</script>
