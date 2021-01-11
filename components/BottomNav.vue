<template>
	<v-bottom-navigation
		fixed
		dark
		grow
		color="white"
		background-color="#2C2C2D"
		v-model="wowtab"
		height="80"
		class="pwmenubottom"
		style="z-index: 14 !important"
	>
		<v-btn
			@click="
				$router.push('/')
				wowtab = 0
			"
		>
			<span class="text-11 d-inline-block mt-1">Feeds</span>
			<img
				:src="
					wowtab == 0
						? '/img/icons/nav-1-color.svg'
						: '/img/icons/nav-1-white.svg'
				"
				class="mb-1 d-block"
				width="20"
				height="20"
			/>
		</v-btn>
		<v-btn
			@click="
				$router.push('/?tab=1')
				wowtab = 1
			"
		>
			<span class="text-11 d-inline-block mt-1">Tukar Poin</span>
			<img
				:src="
					wowtab == 1
						? '/img/icons/nav-2-color.svg'
						: '/img/icons/nav-2-white.svg'
				"
				class="mb-1 d-block"
				width="20"
				height="20"
			/>
		</v-btn>
		<v-btn
			@click="
				$router.push('/toppoin')
				wowtab = 2
			"
		>
			<span class="text-11 d-inline-block mt-1">Top Poin</span>
			<img
				:src="
					wowtab == 2
						? '/img/icons/header/3-o.svg'
						: '/img/icons/header/3-w.svg'
				"
				class="mb-1 d-block"
				width="20"
				height="20"
			/>
		</v-btn>
		<v-btn
			@click="
				$router.push('/?tab=3')
				wowtab = 3
			"
		>
			<span class="text-11 d-inline-block mt-1">Program</span>
			<img
				:src="
					wowtab == 3
						? '/img/icons/nav-3-color.svg'
						: '/img/icons/nav-3-white.svg'
				"
				class="mb-1 d-block"
				width="20"
				height="20"
			/>
		</v-btn>
		<v-btn
			@click="
				$router.push('/?tab=4')
				wowtab = 4
			"
		>
			<span class="text-11 d-inline-block mt-1">Akun</span>
			<img
				:src="
					wowtab == 4
						? '/img/icons/nav-5-color.svg'
						: '/img/icons/nav-5-white.svg'
				"
				class="mb-1 d-block"
				width="20"
				height="20"
			/>
		</v-btn>
	</v-bottom-navigation>
</template>

<script>
export default {
	name: "BottomNav",
	props: ["tab"],
	data() {
		return {
			wowtab: this.tab,
		}
	},
}
</script>
