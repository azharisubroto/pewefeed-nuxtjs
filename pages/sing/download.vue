<template>
	<section class="sing">
		<div v-if="label != null" >

			<SingAppBar :back="true" :title="label ? label : 'Sing with Latinka'"/>

			<Video/>

			<template v-if="maintab == 0">
				<v-list color="transparent" class="mb-10">
					<v-list-item-group color="dark">
						<div class="devider-small"></div>
						<v-list-item :to="'/sing/download-audisi/'">
							<v-list-item-content>
								<v-list-item-title>
									Video Audisi
								</v-list-item-title>
							</v-list-item-content>
							<v-list-item-icon>
								<v-icon>mdi-chevron-right</v-icon>
							</v-list-item-icon>
						</v-list-item>
						<div class="devider-small"></div>

						<v-list-item disabled :to="'/sing/download-semifinal/'">
							<v-list-item-content>
								<v-list-item-title>
									Video Semi Final
								</v-list-item-title>
							</v-list-item-content>
							<v-list-item-icon>
								<v-icon>mdi-chevron-right</v-icon>
							</v-list-item-icon>
						</v-list-item>
						<div class="devider-small"></div>

						<v-list-item disabled :to="'/sing/download-final/'">
							<v-list-item-content>
								<v-list-item-title>
									Video Final
								</v-list-item-title>
							</v-list-item-content>
							<v-list-item-icon>
								<v-icon>mdi-chevron-right</v-icon>
							</v-list-item-icon>
						</v-list-item>
						<div class="devider-small"></div>
					</v-list-item-group>
				</v-list>
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
