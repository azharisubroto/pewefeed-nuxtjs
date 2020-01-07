<template>
	<section class="BantuanDetail">
		<v-container v-if="content && !loading">
			<div class="mb-3 caption">
				<span to="/bantuan/">Bantuan</span> / {{activemenu.title}}
			</div>

			<h3 style="font-weight: normal">{{content.title}}</h3>
			<div class="devider-small my-3"></div>

			<div class="text-14 bantuancontent pb-5" v-html="content.content"></div>

		</v-container>

		<!-- LOADING -->
		<v-container v-else class="text-center" align="center">
			<v-progress-circular
				indeterminate
				:size="80"
				:width="8"
				color="deep-orange">
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
		</v-container>
		<br><br><br>

		<!-- ACTION HELP -->
		<div class="action-help">
			<v-container class="pa-0">
				<v-row class="pa-0">
					<v-col cols="6" class="pa-0">
						<v-btn tile depressed block class="makebig dark darken-5" to="/bantuan/">
							<v-icon>mdi-arrow-left</v-icon>
							Back
						</v-btn>
					</v-col>
					<v-col cols="6" class="pa-0">
						<ShareButton
						v-if="content"
						:sharingUrl="'https://m.playworld.id/bantuan/'+content.slug"
						:sharingTitle="'Bantuan Playworld'"
						class="my-0"
						/>
					</v-col>
				</v-row>
			</v-container>
		</div>
	</section>
</template>

<script>
import ArticleService from '@/services/ArticleService'
import ShareButton from '@/components/common/ShareButton'
export default {
	name:"BantuanDetail",
	components: {
		ShareButton
	},
	data(){
		return {
			loading: true,
			content: null,
			others: null,
			slug: null,
			activemenu: null
		}
	},
	methods: {
		async fetchHelp() {
			try {
				const res = await ArticleService.bantuandetail(this.$route.params.slug)
				console.log(JSON.parse(JSON.stringify(res)))

				this.content = res.data.data
				this.others = res.data.other
				this.activemenu = res.data.active_menu
				this.loading = false
			} catch (error) {
				console.log(error)
				this.loading = false
			}
		}
	},
	mounted() {
		this.fetchHelp();
		console.log('BantuanDetail');
	}
}
</script>

<style lang="scss">
	.BantuanDetail {
		margin-top: -43px;
		.bantuan .v-list-item {
			border-bottom: 1px solid #d1d1d1
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
			margin: 0!important;
		}
	}
	.bantuancontent {
		font-size: 14px;
		p {
			font-size: 14px!important;
		}
		p big {
			font-size: 16px;
		}
		img {
			width: 100%!important;
			height: auto!important;
		}
	}
	.BantuanDetail .v-list-item {
		border-bottom: 1px solid #d1d1d1
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
			background-color: #212121!important;
			border-color: #212121!important;
			border-radius: 0;
			height: 68px!important;
			span {
				height: 68px!important;
			}
		}
	}
	.makebig {
		height: 68px!important;
		line-height: 68px!important;
		background: #000!important;
		span {
			height: 68px;
			line-height: 68px;
			color: #fff!important;
		}
	}
	.v-application .action-help .mt-5 {
		margin-top: 0!important;
		button.orange {
			display: block;
			width: 100%;
			background-color: #000!important;
			border-color: #000!important;
			border-radius: 0;
			height: 68px;
			span {
				height: 68px;
			}
		}
	}
	.v-btn {
		text-transform: initial!important;
	}
</style>
