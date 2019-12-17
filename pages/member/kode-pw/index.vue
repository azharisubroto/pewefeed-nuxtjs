<template>
	<section>
		<v-tabs-items v-model="tab">
			<v-tab-item
				v-for="item in tabItems"
				:key="item"
			>
				<template v-if="item == 'Active'">
					<CodePWList :status="item" />
				</template>
				<template v-if="item == 'Expired'">
					<CodePWList :status="item" />
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
import CodePWList from '@/components/member/CodePWList'
import UserService from '@/services/UserService'
export default {
	name: "kode-pw",
	data: () => ({
		tab:0,
		tabItems: ['Active','Expired']
	}),
	components: {
		CodePWList,
	},
}
</script>