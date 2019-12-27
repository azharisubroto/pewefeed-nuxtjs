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
					@click="showDetail(submenu, item)"
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

		<!-- MODAL DETAIL -->
		<v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
			<v-card v-if="submenucontent">
				<v-toolbar dark color="orange">
					<v-btn icon dark @click="dialog = false">
						<v-icon>mdi-close</v-icon>
					</v-btn>
					<v-toolbar-title>Bantuan</v-toolbar-title>
					<v-spacer></v-spacer>
				</v-toolbar>

				<v-container class="bantuancontent pt-4">
					<div class="caption mb-3">Bantuan / {{parent.title ? parent.title : ''}}</div>
					<h2>{{submenucontent.title ? submenucontent.title : ""}}</h2>
					<div class="devider-small my-4"></div>
					<div v-html="submenucontent.content ? submenucontent.content : ''"></div>
				</v-container>

			</v-card>
		</v-dialog>
	</div>
</template>
<script>
import BantuanDetail from '@/components/bantuan/BantuanDetail'
import ArticleService from '@/services/ArticleService'
export default {
	name:"BantuanPage",
	components: {
		BantuanDetail
	},
	data() {
		return {
			menu: null,
			tab: null,
			dialog: false,
			submenucontent: null,
			parent: null
		}
	},
	methods: {
		showDetail(submenu, parent) {
			this.dialog = true
			this.submenucontent = submenu
			this.parent = parent
		},
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
.bantuancontent {
	img {
		width: 100%!important;
		height: auto!important;
	}
}
</style>
