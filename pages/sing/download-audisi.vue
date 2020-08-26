<template>
	<section class="sing-herodownload">
		<div v-if="label != null" >

			<SingAppBar :back="true" :title="label ? label : 'Sing with Latinka'"/>

			<template v-if="maintab == 0">
				<v-container>
					<div class="singbanner">BANNER</div>
				</v-container>

				<v-container>
					<v-card color="#404040" class="px-4 py-4 my-3">
						<a target="blank" download :href="download">
							<div class="d-flex align-center justify-space-between">
								<div>
									<strong class="text-16">
										Download Now
									</strong>
								</div>
								<div style="width:20px">
									<v-icon size="30">mdi-chevron-right</v-icon>
								</div>
							</div>
						</a>
					</v-card>
					<v-card color="#404040" class="px-4 py-4 my-3">
						<a :href="lirikdownload" target="_BLANK">
						<div class="d-flex align-center justify-space-between">
							<div>
								<strong class="text-16">
									Download Lirik
								</strong>
							</div>
							<div style="width:20px">
								<v-icon size="30">mdi-chevron-right</v-icon>
							</div>
						</div>
						</a>
					</v-card>

					<section class="helpexpandable">
						<v-expansion-panels :accordion="true" focusable>
							<v-expansion-panel class="mb-3">
								<v-expansion-panel-header class="pl-4 pr-3 py-3 text-16" style="line-height:28px;font-weight:bold">Lihat Lirik</v-expansion-panel-header>
								<v-expansion-panel-content>
									<div v-html="lirik" class="text-14 py-4" style="line-height:30px"></div>
								</v-expansion-panel-content>
							</v-expansion-panel>
						</v-expansion-panels>
					</section>
				</v-container>
			</template>

			<template v-if="maintab == 1">
				<SingPrizes/>
			</template>
		</div>

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
			downloadOverlay: false,
			lirikdownload: null,
		}
	},
	methods: {
		async getPromotedVideo() {
			try {
				const res = await SingService.getPromoted()
				const data = await res.data.data
				this.lirikdownload = res.data.dlLyrics
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
</style>
