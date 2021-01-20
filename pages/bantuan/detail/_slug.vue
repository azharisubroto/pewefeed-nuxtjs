<template>
	<section class="BantuanDetail">
		<BantuanNavBar />

		<v-main style="padding-top: 60px" class="mt-10">
			<template v-if="bantuanMenu.length > 0 && deprecated">
				<v-container>
					<v-expansion-panels>
						<v-expansion-panel
							v-for="(item, i) in bantuanMenu"
							:key="i"
							class="bantuan-panel"
						>
							<v-expansion-panel-header>
								{{ item.title }}
							</v-expansion-panel-header>
							<v-expansion-panel-content>
								<div v-html="item.content"></div>
							</v-expansion-panel-content>
						</v-expansion-panel>
					</v-expansion-panels>
				</v-container>

				<v-container>
					<v-row no-gutters align="center" justify="center">
						<v-col md="6" class="text-right">
							<template v-if="content.attributes.prev">
								<v-card
									color="#ff4200"
									tile
									elevation="0"
									class="pr-0"
									style="padding-right: 0 !important"
									:to="
										'/bantuan/' +
										content.attributes.prev.slug
									"
								>
									<v-icon class="mr-5">mdi-arrow-left</v-icon>
									<span class="white--text">{{
										content.attributes.prev.title
									}}</span>
									<div>Sebelumnya</div>
								</v-card>
							</template>
						</v-col>
						<v-col md="6">
							<template v-if="content.attributes.next">
								<v-card
									color="#ff4200"
									tile
									elevation="0"
									class="pl-0"
									:to="
										'/bantuan/' +
										content.attributes.next.slug
									"
								>
									<span class="white--text">{{
										content.attributes.next.title
									}}</span>
									<v-icon class="ml-5"
										>mdi-arrow-right</v-icon
									>
									<div>Selanjutnya</div>
								</v-card>
							</template>
						</v-col>
					</v-row>
				</v-container>

				<!-- <pre>{{ bantuanMenu }}</pre> -->
			</template>

			<template v-if="!deprecated">
				<v-container v-if="content && !loading">
					<v-expansion-panels v-model="bantuan_state">
						<v-expansion-panel class="bantuan-panel">
							<v-expansion-panel-header>
								{{ content.name }}
							</v-expansion-panel-header>
							<v-expansion-panel-content>
								<div
									class="text-14 bantuancontent pb-5"
									v-html="content.attributes.content"
								></div>
							</v-expansion-panel-content>
						</v-expansion-panel>
					</v-expansion-panels>
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

				<v-container v-if="content != null">
					<v-row no-gutters align="center" justify="center">
						<v-col md="6" class="text-right pr-1">
							<template v-if="content.attributes.prev">
								<v-card
									color="#ff4200"
									elevation="0"
									class="pa-2"
									:to="
										'/bantuan/detail/' +
										content.attributes.prev.slug
									"
								>
									<div
										class="d-flex align-center justify-space-between"
									>
										<div>
											<v-icon class="mr-5"
												>mdi-chevron-left</v-icon
											>
										</div>
										<div>
											<div
												class="white--text text-12 text-truncate"
												style="max-width: 100px"
											>
												{{
													content.attributes.prev
														.title
												}}
											</div>
											<div class="text-10">
												Sebelumnya
											</div>
										</div>
									</div>
								</v-card>
							</template>
						</v-col>
						<v-col md="6" class="pl-1">
							<template v-if="content.attributes.next">
								<v-card
									color="#ff4200"
									elevation="0"
									class="pa-2"
									:to="
										'/bantuan/detail/' +
										content.attributes.next.slug
									"
								>
									<div
										class="d-flex align-center justify-space-between"
									>
										<div>
											<div
												class="white--text text-12 text-truncate"
												style="max-width: 100px"
											>
												{{
													content.attributes.next
														.title
												}}
											</div>
											<div class="text-10">
												Selanjutnya
											</div>
										</div>
										<div>
											<v-icon class="mr-5"
												>mdi-chevron-right</v-icon
											>
										</div>
									</div>
								</v-card>
							</template>
						</v-col>
					</v-row>
				</v-container>

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
	name: "BantuanDetail",
	layout: "blank",
	components: {
		BantuanNavBar,
		BantuanFooter,
	},
	data() {
		return {
			bantuan_state: 0,
			deprecated: false,
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
		async fetchHelp() {
			try {
				const res = await ArticleService.bantuandetail(
					this.$route.params.slug
				)
				//console.log(JSON.parse(JSON.stringify(res)))

				this.content = res.data.data
				this.others = res.data.other
				this.activemenu = res.data.active_menu
				this.currentID = res.data.data.id
				this.loading = false
			} catch (error) {
				console.log(error)
				this.loading = false
			}
		},
	},
	mounted() {
		this.fetchHelp()
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

.v-expansion-panel.bantuan-panel {
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
		padding-top: 10px;
	}
}
</style>
