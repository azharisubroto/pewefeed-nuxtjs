<template>
	<v-app-bar dark color="dark" flat fixed tile class="main-app-bar">
		<template v-if="back">
			<v-btn @click="historyBack()" small icon>
				<v-icon>mdi-chevron-left</v-icon>
			</v-btn>
			<div class="flex-grow-1"></div>
		</template>
		<template v-else>
			<div class="flex-grow-1"></div>
		</template>
		<v-toolbar-title
			@click="
				$router.push('/')
				drawer = false
			"
			class="px-0"
		>
			{{ title ? title : "Sing with Latinka" }}
		</v-toolbar-title>
		<div class="flex-grow-1"></div>

		<div v-if="$route.name != 'index'">
			<v-img
				@click="$router.push('/')"
				src="/img/peweicon.svg"
				width="20"
			></v-img>
		</div>
	</v-app-bar>
</template>

<script>
export default {
	name: "SingAppBar",
	props: ["title", "back"],
	methods: {
		historyBack() {
			this.$router.back()
		},
	},
}
</script>
