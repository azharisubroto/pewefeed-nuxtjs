<template>
	<div class="bantuan">
		<v-tabs
		v-model="tab"
		v-if="menu"
		grow
		color="deep-orange"
		center-active
		class="pw-tab"
		>
			<!-- <v-tab
				href="#test"
			>
				Test
			</v-tab> -->
			<v-tab
				v-for="item in menu"
				:key="item.id"
				:href="'#tab-'+item.id"
			>
				{{item.title}}
			</v-tab>
		</v-tabs>

		<v-tabs-items
		v-model="tab"
		class="djusted-tab-items pb-5"
		>
			<!-- <v-tab-item value="test">
				TEST
			</v-tab-item> -->
			<v-tab-item
			v-for="item in menu"
			:key="'tabitem-'+item.id"
			:value="'tab-'+item.id">
				<v-list v-if="item.submenu">
					<v-list-item
					v-for="submenu in item.submenu"
					:key="submenu.id"
					@click=""
					>
						<v-list-item-content>
							{{submenu.title}}
						</v-list-item-content>
						<v-list-item-icon>
							<v-icon>mdi-chevron-right</v-icon>
						</v-list-item-icon>
					</v-list-item>
				</v-list>

			</v-tab-item>
		</v-tabs-items>
	</div>
</template>
<script>
import ArticleService from '@/services/ArticleService'
export default {
	name:"BantuanPage",
	data() {
		return {
			menu: null,
			tab: null
		}
	},
	methods: {
		async fetchBantuan() {
			try {
				const res = await ArticleService.getBantuan()
				const data = res.data.data
				console.log(JSON.parse(JSON.stringify(data)));
				// var arr = [];
				// data.forEach(el => {
				// 	var obj = {
				// 		id: el.id,
				// 		title: el.title
				// 	}
				// 	arr.push(obj)
				// });
				this.menu = data;
			} catch (error) {
				console.log(error)
			}
		}
	},
	mounted() {
		this.fetchBantuan()
	}
}
</script>

<style lang="scss">
.bantuan .v-list-item {
	border-bottom: 1px solid #d1d1d1
}
</style>
