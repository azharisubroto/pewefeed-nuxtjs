<template>
	<v-app>
		<v-sheet>
			<nuxt class="mb-10 pb-10"></nuxt>
		</v-sheet>
	</v-app>
</template>

<script>
export default {
	name: "payment",
	methods: {
		historyBack() {
			this.$router.back()
		},
	},
}
</script>
