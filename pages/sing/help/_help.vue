<template>
	<section class="sing-helphero">
		<div v-if="label != null" >

			<SingAppBar :back="true" :title="label ? label : 'Sing with Latinka'"/>



			<template v-if="maintab == 0">
				<v-container>
					<div class="text-center mb-4">
						<div class="singbanner">BANNER</div>
					</div>
					<section class="helpexpandable" v-if="help">
						<v-expansion-panels v-model="helppanel" :accordion="true" focusable>
							<v-expansion-panel v-for="(item,index) in help" :key="index" class="mb-3">
								<v-expansion-panel-header class="py-3 text-16" style="line-height:28px">{{item.title}}</v-expansion-panel-header>
								<v-expansion-panel-content>
									<div v-html="formatText(item.content)" class="text-14 py-4" style="line-height:30px"></div>
								</v-expansion-panel-content>
							</v-expansion-panel>
						</v-expansion-panels>
					</section>
				</v-container>
			</template>

			<template v-if="maintab == 1">
				<Video/>
				<SingPrizes/>
			</template>
		</div>
		<br>
		<br>
		<br>
		<!-- BOTTOM NAVIGATION -->
		<v-bottom-navigation
			fixed
			dark
			grow
			color="white"
			background-color="#2C2C2D"
			v-model="singtab"
			height="80"
			class="pwmenubottom"
		>
			<v-btn @click="maintab = 0">
				<span>Join</span>
				<img src="/img/icons/icon-join-orange.png" class="mb-1 d-block" width="20" height="20" />
			</v-btn>
			<v-btn @click="maintab = 1">
				<span>Prizes</span>
				<img src="/img/tukarpoin/tukarpoin-orange.png" class="mb-1 d-block" width="20" height="20" />
			</v-btn>
			<ShareButton2/>
		</v-bottom-navigation>
	</section>
</template>

<script>
import ShareButton2 from "@/components/common/ShareButton2";
import SingAppBar from "@/components/sing/SingAppBar";
import SingPrizes from "@/components/sing/SingPrizes";
import Video from "@/components/sing/Video";
import SingService from '@/services/SingService'

export default {
	name:"Sing",
	components: {
		ShareButton2,
		SingAppBar,
		SingPrizes,
		Video
	},
	data(){
		return {
			singtab: 0,
			maintab: 0,
			helppanel: 0,
			label: null,
			singcontent: [],
			help: [],
			prizes: null
		}
	},
	methods: {
		async getHelp() {
			try {
				const res = await SingService.getHelpDetail(this.$route.params.help);
				const help =  await res.data.data.subhelps
				this.label = res.data.data.label
				console.log(help)
				let tempHelp = []
				help.forEach(el => {
					tempHelp.push({
						title: el.label,
						content: el.description
					});
				});
				this.help = tempHelp;
			} catch (error) {

			}
		},
		formatText( text ) {
			const doc = text
    		return doc.replace(/(?:\r\n|\r|\n)/g, '<br>');
		},
		async fetchPrizes() {
			try {
				const res = await SingService.getPrizes();
				this.prizes = await res.data.data;
			} catch (error) {
				console.log(error)
			}
		}
	},
	mounted() {
		this.getHelp();
		this.fetchPrizes();
	}
}
</script>

<style lang="scss">
	.sing {
		iframe {
			width: 100%;
			height: 300px;
		}
	}

	.helpexpandable {
		.v-expansion-panels {
			.v-expansion-panel {
				border-radius: 6px;
				&:after {
					opacity:0!important;
				}
				.v-expansion-panel-content__wrap {
					border-top: 1px solid #000;
				}
				.v-expansion-panel-header::before {
					opacity: 0!important
				}
			}
		}
	}

	.singbanner {
		background: linear-gradient(102.55deg, #ED1CFF 13.32%, #FF1C1C 78.48%);
		border-radius: 5px;
		height: 147px;
		line-height: 147px;
		text-align: center;
		font-weight: bold;
	}
</style>
