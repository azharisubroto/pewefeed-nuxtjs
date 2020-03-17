<template>
	<section>
		<v-tabs-items v-model="tab">
			<v-tab-item
				v-for="item in tabItems"
				:key="item"
			>
				<template v-if="item == 'Dikirim'">
					<Dikirim />
				</template>
				<template v-if="item == 'Diterima'">
					<Diterima />
				</template>
				<template v-if="item == 'Menunggu'">
					<Menunggu :addresses="addresses" :contact="contact"/>
				</template>
				<template v-if="item == 'Selesai'">
					<Selesai />
				</template>
			</v-tab-item>
		</v-tabs-items>

		<!-- PROFIL MENU -->
		<v-bottom-navigation
		fixed
		dark
		grow
		color="white"
		background-color="black"
		v-model="tab"
		>
			<v-btn
			v-for="item in tabItems"
			:key="item"
			>
				<span>{{item}}</span>
			</v-btn>
		</v-bottom-navigation>
	</section>
</template>
<script>
import Dikirim from '@/components/member/rewards/Dikirim'
import Diterima from '@/components/member/rewards/Diterima'
import Menunggu from '@/components/member/rewards/Menunggu'
import Selesai from '@/components/member/rewards/Selesai'
import UserService from '@/services/UserService'
export default {
	components: {
		Dikirim,
		Diterima,
		Menunggu,
		Selesai
	},
	data() {
		return {
			tab:0,
			addresses: null,
			contact: null,
			tabItems: ['Menunggu','Diproses','Dikirim','Diterima']
		}
	},
	methods: {
		async getAddresses() {
			this.isLoading = true
			try {
				const res = await UserService.getAddresses()
				var items = res.data.data
				if( items && items.length > 0 ) {
				//console.log(JSON.parse(JSON.stringify(items)))
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
				if( items && items.length > 0 ) {
					//console.log(JSON.parse(JSON.stringify(items)))
					this.contact = items
				}
			} catch (error) {
				console.log(res)

			}
		},
	},
	mounted() {
		let _self = this
		this.getAddresses()
		this.getNumbers()
		this.$bus.$on('claimed', () => {
			_self.tab = 1
		})
	}
}
</script>
<!-- <style lang="scss">
	.v-content__wrap {
		padding-top: 55px;
	}
</style>
-->
