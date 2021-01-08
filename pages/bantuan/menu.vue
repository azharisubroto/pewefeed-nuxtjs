<template>
	<section class="BantuanDetail">
		<BantuanNavBar />

		<v-main class="mt-10">
			<template v-if="bantuanMenu.length > 0">
				<v-container>
					<v-expansion-panels v-model="menu_state">
						<v-expansion-panel
							v-for="(item, i) in bantuanMenu"
							:key="i"
							class="bantuan-menu"
						>
							<v-expansion-panel-header>
								{{ item.name }}
							</v-expansion-panel-header>
							<v-expansion-panel-content
								style="padding: 0 !important"
							>
								<div
									class="pa-5 text-center"
									v-if="item.children.length == 0"
								>
									Data Belum Tersedia
								</div>
								<v-card
									class="help-menu"
									v-for="(subitem, i) in item.children"
									:key="'help-' + i"
									:to="'/bantuan/detail/' + subitem.slug"
								>
									<div
										class="d-flex align-center justify-space-between"
									>
										<div>
											{{ subitem.name }}
										</div>
										<div>
											<v-icon>mdi-chevron-right</v-icon>
										</div>
									</div>
								</v-card>
							</v-expansion-panel-content>
						</v-expansion-panel>
					</v-expansion-panels>
				</v-container>

				<!-- <pre>{{ bantuanMenu }}</pre> -->
			</template>

			<template v-if="!deprecated">
				<v-container v-if="content && !loading">
					<div class="mb-3 caption">
						<span to="/bantuan/">Bantuan</span> / {{ currentID }}
					</div>

					<h3 style="font-weight: normal">{{ content.title }}</h3>
					<div class="devider-small my-3"></div>

					<div
						class="text-14 bantuancontent pb-5"
						v-html="content.content"
					></div>
				</v-container>

				<!-- LOADING -->
				<v-container v-else class="text-center" align="center">
					<v-progress-circular
						indeterminate
						:size="80"
						:width="8"
						color="green"
					>
					</v-progress-circular>
				</v-container>

				<div class="devider-big my-4"></div>

				<div class="text-center font-weight-bold">
					TOPIK BANTUAN LAINNYA
				</div>

				<!-- <pre>{{others}}</pre> -->

				<v-container>
					<v-list v-if="others">
						<v-list-item
							v-for="submenu in others"
							:key="submenu.id"
							:to="'/bantuan/' + submenu.slug"
						>
							<v-list-item-content>
								{{ submenu.title }}
							</v-list-item-content>
							<v-list-item-icon>
								<v-icon>mdi-chevron-right</v-icon>
							</v-list-item-icon>
						</v-list-item>
					</v-list>
				</v-container>
				<br /><br /><br />
			</template>

			<BantuanFooter />
		</v-main>
	</section>
</template>

<script>
import ArticleService from "@/services/ArticleService"
import BantuanNavBar from "@/components/BantuanNavBar"
import BantuanFooter from "@/components/BantuanFooter"

export default {
	name: "BantuanMenu",
	layout: "blank",
	components: {
		BantuanNavBar,
		BantuanFooter,
	},
	data() {
		return {
			menu_state: 0,
			deprecated: true,
			loading: true,
			content: null,
			others: null,
			slug: null,
			activemenu: null,
			bantuanMenu: [],
			currentID: null,
		}
	},
	methods: {
		async fetchBantuan() {
			let vm = this
			try {
				const res = await ArticleService.getBantuan()
				const data = res.data.data

				vm.bantuanMenu = data

				//this.loading = false
			} catch (error) {
				console.log(error)
			}
		},
	},
	mounted() {
		this.fetchBantuan()

		if (this.$router.currentRoute.query["index"]) {
			this.menu_state = parseInt(this.$router.currentRoute.query["index"])
		}
		//console.log('BantuanDetail');
	},
}
</script>

<style lang="scss">
.BantuanDetail {
	margin-top: -43px;
	.bantuan .v-list-item {
		border-bottom: 1px solid #d1d1d1;
	}
}
.action-help {
	position: fixed;
	bottom: 0;
	left: 0;
	right: 0;
	margin: 0 auto;
	background: #fff;
}
.bantuan-modal .v-dialog {
	.mt-5 {
		margin: 0 !important;
	}
}
.bantuancontent {
	font-size: 14px;
	p {
		font-size: 14px !important;
	}
	p big {
		font-size: 16px;
	}
	img {
		width: 100% !important;
		height: auto !important;
	}
}
.BantuanDetail .v-list-item {
	border-bottom: 1px solid #d1d1d1;
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
		background-color: #212121 !important;
		border-color: #212121 !important;
		border-radius: 0;
		height: 68px !important;
		span {
			height: 68px !important;
		}
	}
}
.makebig {
	height: 68px !important;
	line-height: 68px !important;
	background: #000 !important;
	span {
		height: 68px;
		line-height: 68px;
		color: #fff !important;
	}
}
.v-application .action-help .mt-5 {
	margin-top: 0 !important;
	button.orange {
		display: block;
		width: 100%;
		background-color: #000 !important;
		border-color: #000 !important;
		border-radius: 0;
		height: 68px;
		span {
			height: 68px;
		}
	}
}
.v-btn {
	text-transform: initial !important;
}

.v-expansion-panel.bantuan-menu {
	margin-bottom: 10px;
	border-radius: 4px !important;
	border: 1px solid #bababa;
	overflow: hidden;
	&.v-expansion-panel--active {
		border-radius: 4px !important;
		border: 1px solid #bababa;
		button.v-expansion-panel-header {
			padding: 16px 24px !important;
		}
	}
	button.v-expansion-panel-header {
		background: #404040;
		color: #fff;
	}
	.v-expansion-panel-content__wrap {
		background: #303030;
		padding: 0 !important;
	}
}

.help-menu {
	padding: 19px 13px;
	border-bottom: 1px solid #bababa !important;
}
</style>
