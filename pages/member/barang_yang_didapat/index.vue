<template>
	<section>
		<v-tabs-items v-model="tab">
			<v-tab-item
				v-for="item in tabItems"
				:key="item"
			>
				<template v-if="item == 'Dikirim'">
					<Dikirim/>
				</template>
				<template v-if="item == 'Diterima'">
					<Diterima/>
				</template>
				<template v-if="item == 'Menunggu'">
					<Menunggu/>
				</template>
				<template v-if="item == 'Selesai'">
					<Selesai/>
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
			tabItems: ['Menunggu','Dikirim','Diterima','Selesai']
		}
	}
}
</script>
