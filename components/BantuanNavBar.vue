<template>
	<div>
		<v-app-bar
			dark
			color="dark"
			flat
			fixed
			tile
			class="main-app-bar"
			style="z-index: 20"
		>
			<v-btn @click="$router.go(-1)" small icon>
				<v-icon>mdi-chevron-left</v-icon>
			</v-btn>
			<div class="flex-grow-1"></div>
			<v-toolbar-title>
				<strong>{{ title ? title : "BANTUAN" }}</strong>
			</v-toolbar-title>
			<div class="flex-grow-1"></div>

			<div class="pr-0">
				<v-btn icon @click="search_dialog = !search_dialog">
					<v-icon>mdi-magnify</v-icon>
				</v-btn>
			</div>
		</v-app-bar>

		<v-bottom-sheet dark v-model="search_dialog">
			<v-sheet height="100%">
				<v-toolbar :elevation="1">
					<!-- Arrow -->
					<v-btn
						dark
						icon
						tile
						style="border-right: 0px solid #717171"
						light
						@click="search_dialog = !search_dialog"
					>
						<v-icon>mdi-close</v-icon>
					</v-btn>

					<!-- Title -->
					<v-toolbar-items class="ml-2">
						<v-btn dark text class="pl-0" style="margin-left: -10px"
							>Cari Bantuan</v-btn
						>
					</v-toolbar-items>
					<div class="flex-grow-1"></div>
				</v-toolbar>

				<v-card elevation="0" min-height="200" class="px-5 py-10">
					<v-text-field
						flat
						filled
						single-line
						solo
						hide-details
						background-color="transparent"
						v-model="searchModel"
						label="Tulis Kata Kunci..."
						style="
							box-shadow: none !important;
							border: 1px solid #fff;
						"
					></v-text-field>
					<v-btn
						:to="'/bantuan/search/' + searchModel"
						block
						large
						color="#ff4200"
						class="mt-3"
						>Cari</v-btn
					>
				</v-card>
			</v-sheet>
		</v-bottom-sheet>
	</div>
</template>

<script>
export default {
	props: ["title"],
	name: "BantuanNavBar",
	data() {
		return {
			search_dialog: false,
			searchModel: "",
		}
	},
}
</script>
