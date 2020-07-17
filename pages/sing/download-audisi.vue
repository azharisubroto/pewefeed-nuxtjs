<template>
	<section class="sing">
		<div v-if="label != null" >

			<SingAppBar :back="true" :title="label ? label : 'Sing with Latinka'"/>

			<Video/>

			<template v-if="singtab == 0">
				<section class="toppoin-acc">
					<v-expansion-panels>
						<v-expansion-panel class="mb-0">
							<v-expansion-panel-header class="py-5 text-uppercase">Download Video</v-expansion-panel-header>
							<v-expansion-panel-content class='text-center'>
								<v-btn :href="download" target="_BLANK" color="deep-orange">Download Now</v-btn>
							</v-expansion-panel-content>
						</v-expansion-panel>
					</v-expansion-panels>

					<v-expansion-panels>
						<v-expansion-panel class="mb-0">
							<v-expansion-panel-header class="py-5 text-uppercase">Lirik</v-expansion-panel-header>
							<v-expansion-panel-content class='text-left'>
								<div v-html="lirik"></div>
							</v-expansion-panel-content>
						</v-expansion-panel>
					</v-expansion-panels>
				</section>
			</template>

			<template v-if="singtab == 1">
				<v-container class="text-center pa-10">
					HADIAH
				</v-container>
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
			<v-btn @click="$router.push('/sing/')">
				<span>Join</span>
				<img src="/img/icons/icon-join-orange.png" class="mb-1 d-block" width="20" height="20" />
			</v-btn>
			<v-btn @click="$router.push('/sing/')">
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
import Video from "@/components/sing/Video";
import SingService from '@/services/SingService'

export default {
	name:"Sing",
	components: {
		ShareButton2,
		SingAppBar,
		Video
	},
	data(){
		return {
			singtab: 0,
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
</style>
