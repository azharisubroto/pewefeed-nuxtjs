<template>
	<div>

		<template v-if="menutab == 0">
			<DaftarNomor/>
		</template>
		<template v-if="menutab == 1">
			<DaftarAlamat/>
		</template>

		<v-bottom-navigation
			fixed
			dark
			grow
			color="white"
			background-color="#2C2C2D"
			v-model="menutab"
			height="80"
			class="pwmenubottom"
		>
			<v-btn>
				<span>Phone List</span>
				<img src="/img/icons/icon-phone-book-02.svg" class="mb-1 d-block" width="40" height="40" />
			</v-btn>
			<v-btn>
				<span>Address List</span>
				<img src="/img/icons/icon-address-book-02.svg" class="mb-1 d-block" width="40" height="40" />
			</v-btn>
		</v-bottom-navigation>
	</div>
</template>

<script>
import DaftarAlamat from "@/components/member/DaftarAlamat"
import DaftarNomor from "@/components/member/DaftarNomor"
export default {
	name:"ContactList",
	components: {
		DaftarNomor,
		DaftarAlamat
	},
	data() {
		return {
			menutab: 0
		}
	}
}
</script>
