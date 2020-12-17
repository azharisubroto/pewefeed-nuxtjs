<template>
	<section class="rewards-home">
		<v-tabs-items style="background: transparent !important" v-model="tab">
			<v-tab-item v-for="item in tabItems" :key="item">
				<template v-if="item == 'Menunggu'">
					<Menunggu
						type="wait"
						:redirect="1"
						:addresses="addresses"
						:contact="contact"
					/>
				</template>
				<template v-if="item == 'Diproses'">
					<Menunggu
						type="process"
						:redirect="2"
						:addresses="addresses"
						:contact="contact"
					/>
					<!-- <Dikirim /> -->
				</template>
				<template v-if="item == 'Dikirim'">
					<Menunggu
						type="confirmation"
						:redirect="3"
						:addresses="addresses"
						:contact="contact"
					/>
					<!-- <Diterima /> -->
				</template>
				<template v-if="item == 'Diterima'">
					<Menunggu
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
		>
			<v-btn v-for="item in tabItems" :key="item">
				<span>{{ item }}</span>
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
	},
	mounted() {
		let _self = this
		this.getAddresses()
		this.getNumbers()
		this.$bus.$on("rewardtabclick", (tab) => {
			console.log(tab)
			_self.tab = tab
		})
	},
}
</script>
<style lang="scss">
.rewards-home {
	.v-bottom-navigation {
		.v-btn {
			border-top: 5px solid #bababa !important;
			&.v-btn--active {
				border-color: #ff4200 !important;
			}
		}
	}
}
</style>
