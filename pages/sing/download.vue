<template>
	<section class="sing-herodownload">
		<div v-if="label != null" >

			<SingAppBar :back="true" :title="label ? label : 'Sing with Latinka'"/>

			<template v-if="maintab == 0">
				<v-container>
					<div class="singbanner">BANNER</div>
				</v-container>

				<v-container>
					<v-card to="/sing/download-audisi/" color="#404040" class="px-4 py-4 my-3" >
						<div class="d-flex align-center justify-space-between">
							<div>
								<strong class="text-16">
									Video Audisi
								</strong>
							</div>
							<div style="width:20px">
								<v-icon size="30">mdi-chevron-right</v-icon>
							</div>
						</div>
					</v-card>
					<v-card to="/sing/download-semifinal/" color="#404040" disabled class="px-4 py-4 my-3" >
						<div class="d-flex align-center justify-space-between">
							<div>
								<strong class="text-16">
									Video Semi Final
								</strong>
							</div>
							<div style="width:20px">
								<v-icon size="30">mdi-chevron-right</v-icon>
							</div>
						</div>
					</v-card>
					<v-card to="/sing/download-final/" color="#404040" disabled class="px-4 py-4 my-3" >
						<div class="d-flex align-center justify-space-between">
							<div>
								<strong class="text-16">
									Video Semi Final
								</strong>
							</div>
							<div style="width:20px">
								<v-icon size="30">mdi-chevron-right</v-icon>
							</div>
						</div>
					</v-card>
				</v-container>
			</template>

			<template v-if="maintab == 1">
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
				<span>Contestant</span>
				<img src="/img/icons/contestant.svg" class="mb-1 d-block" width="20" height="20" />
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
			label: 'Download',
			singcontent: [],
			download: null,
			lirik: null
		}
	},
	methods: {
		async getPromotedVideo() {
			try {
				const res = await SingService.getPromoted()
				const data = await res.data.data
				console.log(JSON.parse(JSON.stringify(data)));
				this.lirik = data.lirik
				this.download = data.download_video
			} catch (error) {
				console.log(error)
			}
		},
	},
	mounted() {
		this.getPromotedVideo();
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
	.v-list-item--disabled {
		.v-icon {
			opacity: .5;
		}
	}
</style>
