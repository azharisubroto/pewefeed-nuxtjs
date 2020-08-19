<template>
	<section class="sing">
		<div v-if="label != null" >

			<SingAppBar :back="true" :title="label ? label : 'Sing with Latinka'"/>

			<Video/>

			<template v-if="maintab == 0">
				<section class="toppoin-acc">
					<div class="devider-small"></div>
					<!-- <a @click="downloadVideo(download)" class="d-block py-2 px-5">
						<v-row align="center">
							<v-col cols="10" class="py-0">Download Now</v-col>
							<v-col cols="2" class="text-right">
								<v-icon>mdi-chevron-right</v-icon>
							</v-col>
						</v-row>
					</a> -->
                    <a target="blank" download :href="download" class="d-block py-2 px-5">
						<v-row align="center">
							<v-col cols="10" class="py-0">Download Now</v-col>
							<v-col cols="2" class="text-right">
								<v-icon>mdi-chevron-right</v-icon>
							</v-col>
						</v-row>
					</a>
					<!-- <v-expansion-panels>
						<v-expansion-panel class="mb-0">
							<v-expansion-panel-header class="py-5 text-uppercase">Download Video</v-expansion-panel-header>
							<v-expansion-panel-content class='text-center'>
								<v-btn :href="download" target="_BLANK" color="deep-orange">Download Now</v-btn>
							</v-expansion-panel-content>
						</v-expansion-panel>
					</v-expansion-panels> -->

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

		<v-overlay
          :opacity="1"
          :value="downloadOverlay"
        >
          <div class="text-center">
			  <v-progress-circular indeterminate size="64"></v-progress-circular>
				<div class="mt-4">
					Downloading Video File...
				</div>
		  </div>
        </v-overlay>
	</section>
</template>

<script>
import ShareButton2 from "@/components/common/ShareButton2";
import SingAppBar from "@/components/sing/SingAppBar";
import SingPrizes from "@/components/sing/SingPrizes";
import Video from "@/components/sing/Video";
import SingService from '@/services/SingService'
import axios from 'axios'

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
			maintab: 0,
			label: 'Download',
			singcontent: [],
			download: null,
			videoName: null,
			lirik: null,
			downloadOverlay: false
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
				this.videoName = data.promoted_video
			} catch (error) {
				console.log(error)
			}
		},
		reqListener () {
			console.log(this.responseText);
		},
		async downloadVideo(url){
			//let blob = await fetch(url).then(r => r.blob());
			// let file = await fetch(url).then(r => r.blob()).then(blobFile => new File([blobFile], this.videoName, { type: "video/mp4" }));
			// console.log(file);
			this.downloadOverlay = true

			axios({
				url: url, //your url
				method: 'GET',
				responseType: 'arraybuffer', // important
			}).then((response) => {
				const url = window.URL.createObjectURL(new Blob([response.data]));
				const link = document.createElement('a');
				link.href = url;
				link.setAttribute('download', this.videoName+'.mp4'); //or any other extension
				document.body.appendChild(link);
				link.click();
				this.downloadOverlay = false
			}).catch(function(error){
				alert("Can't download video file")
				this.downloadOverlay = false;
			});

			// axios.get(url, {responseType: 'arraybuffer'})
			// .then(function (response) {
			// 	var headers = response.headers();
			// 	var blob = new Blob([response.data],{
			// 		type:headers['content-type']
			// 	});
			// 	var link = document.createElement('a');
			// 	link.href = window.URL.createObjectURL(blob);
			// 	link.download = "Your_file_name";
			// 	link.click();
			// });
		}
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
