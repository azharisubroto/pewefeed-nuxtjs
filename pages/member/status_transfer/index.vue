<template>
	<section>
		<v-tabs-items v-model="tab">
			<v-tab-item
				v-for="item in tabItems"
				:key="item"
			>
				<template v-if="item == 'Pending'">
					<Pending />
				</template>
				<template v-if="item == 'Sukses'">
					<Sukses />
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

		<LoginModal :dialogVisible="loginModalVisible" @close="myDialogClose"/>
	</section>
</template>
<script>
import Pending from '@/components/member/midtrans/Pending'
import Sukses from '@/components/member/midtrans/Sukses'
import UserService from '@/services/UserService'
import LoginModal from '@/components/modal/LoginModal'
export default {
	components: {
		Pending,
		Sukses,
		LoginModal
	},
	data() {
		return {
			tab:0,
			addresses: null,
			contact: null,
			tabItems: ['Pending','Sukses'],
			loginModalVisible: false,
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
		openModalLogin() {
			this.loginModalVisible = true
		},
		myDialogClose () {
			this.loginModalVisible = false
		},
	},
	mounted() {
		if (!localStorage.getItem('loggedin')) {
			this.openModalLogin()
		} else {
			this.getAddresses()
			this.getNumbers()
		}
	}
}
</script>
