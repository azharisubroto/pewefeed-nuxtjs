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
					:to="'/bantuan/'+submenu.slug"
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
		<br><br>

		<ShareButton
		:sharingUrl="'https://m.playworld.id/bantuan/'"
		:sharingTitle="'Bantuan Playworld'"
		:sharingDescription="dataDescription"
		class="my-0 bantuanfixed"
		/>
	</div>
</template>
<script>
import BantuanDetail from '@/components/bantuan/BantuanDetail'
import ArticleService from '@/services/ArticleService'
import ShareButton from '@/components/common/ShareButton'

export default {
	name:"BantuanPage",
	components: {
		BantuanDetail,
		ShareButton
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
.action-help {
	position: fixed;
	bottom: 0;
	left: 0;
	right: 0;
	margin: 0 auto;
	background: #fff;
	border-top: 1px solid #d1d1d1;
}
.bantuan-modal .v-dialog {
	.mt-5 {
		margin: 0!important;
	}
}
.bantuancontent {
	padding-bottom: 105px;
}
.v-application .bantuancontent .action-help,
.bantuancontent .action-help {
	.mt-5 {
		margin-top:0!important;
	}
}
.v-application .action-help .mt-5 {
	margin-top:0!important;
}
.v-application .bantuanfixed {
	position: fixed;
	bottom: 0;
	left: 0;
	right: 0;
	z-index: 11;
	button.orange {
		display: block;
		width: 100%;
		background-color: #000!important;
		border-color: #000!important;
		border-radius: 0;
		height: 50px;
		span {
			height: 50px;
		}
	}
}
</style>
