<template>
  	<v-bottom-sheet v-model="dialogVisible" persistent>
      <v-sheet height="100%" :class="[uploadStatus=='loading' ? 'modalloading' : '']">
        <v-toolbar :elevation="1" style="border-top: 2px solid #fff;">
          <!-- Arrow -->
          <v-btn
            dark
            icon
            tile
            style="border-right: 0px solid #717171"
            light
            @click="closeIt()"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>

          <!-- Title -->
          <v-toolbar-items class="ml-2">
            <v-btn dark text class="white--text pl-0 text-uppercase" style="margin-left:-10px;">Upload</v-btn>
          </v-toolbar-items>
          <div class="flex-grow-1"></div>
        </v-toolbar>

        <div class="mx-2">
          <v-container class="text-left">
			<template v-if="uploadStatus == 'start'">
				<div class="text-12 mb-2">Di platform manakah video di upload?</div>

				<v-btn-toggle
					v-model="uploadType"
					group
					color="deep-orange"
					active-class="deep-orange"
					dark
					dense
					mandatory
					class="uploadtypechoice"
				>
					<v-btn value="instagram" style="border-left-width:1px!important;margin-left:0;">
						Instagram
					</v-btn>
					<v-btn value="youtube" style="border-left-width:1px!important">
						Youtube
					</v-btn>
					<v-btn value="tiktok" style="border-left-width:1px!important">
						TikTok
					</v-btn>
				</v-btn-toggle>

				<div class="text-12 mb-2 mt-4">Paste URL yang kamu dapatkan dari IG, Youtube atau Tiktok</div>
				<v-text-field
					label="Ketikan URL disini"
					solo
					outlined
					dense
					background-color="transparent"
					v-model="ig_url"
				></v-text-field>

				<div class="text-center">
					<v-btn color="deep-orange" dark large @click="uploadVideo();uploadStatus=='loading'">Submit</v-btn>
				</div>
			</template>

			<template v-if="uploadStatus == 'success'">

				<div class="py-8 text-center">
					<img src="/img/checklist.png" width="50">
				</div>

				<v-btn color="deep-orange" dark block large @click="uploadVideo()">Lihat jumlah vote</v-btn>
			</template>
			<template v-if="uploadStatus == 'failed'">

				<div class="py-8 text-center">
					<img src="/img/close.svg" width="50">
				</div>

				<v-btn color="deep-orange" dark block large @click="uploadVideo()">Lihat jumlah vote</v-btn>
			</template>
		  </v-container>
		  <div class="py-4"></div>
        </div>
      </v-sheet>
    </v-bottom-sheet>
</template>

<script>
import SingService from '../../services/SingService'
export default {
  name: "UploadVideo",
  props: {
	dialogVisible: Boolean,
	punyaaku: Array,
	stage: Number
  },
  data() {
    return{
		logo: 'https://vtcheckout-production-assets.s3.amazonaws.com/snap/logos/M003796/thumb_retina_snap_2Flogos_2FM003796_2F04571408-807d-4315-af80-df2dfbba9ce3_2FPlayworld.png',
		uploadStatus: 'start',
		ig_url: null,
		thisVisible: this.dialogVisible,
		uploadType: 'instagram',
    }
  },
  watch: {
	//   uploadStatus: function(newval, oldval) {
	// 	  if( newval == 'success' ) {
	// 		  	var datapunyaku = {
	// 				name: 'Anak Gaul',
	// 				avatar: 'https://via.placeholder.com/80',
	// 				video_thumb: 'https://via.placeholder.com/350x250',
	// 				vote: 0,
	// 				comments: 0,
	// 				star: false,
	// 				slug: 'anak-gaul',
	// 			}
	// 			this.$bus.$emit('datapunyaku', datapunyaku)
	// 	  }
	//  },
  },
  methods: {
    closeIt() {
	  this.$bus.$emit('uploadclose');
	},
	async uploadVideo() {
		const data = {
			'type': this.uploadType,
			'url' : this.ig_url,
			'program_video_id' : this.$store.state.promoted_video_id,
		}
		try {
			const res = await SingService.uploadVideo(data);
			console.log('status',res);
			if( res.status == 200 ) {
				//this.$bus.$emit('uploadclose');
				this.uploadStatus = 'success'
				setTimeout(() => {
					window.location.reload(true);
				}, 2000);
			}
		} catch (error) {
			console.log(error)
			if (error.response && error.response.status == 422) {
				alert(error.response.data.message);
			} else if (error.response && error.response.status == 500) {
				alert("an error occured");
			} else if (error.response && error.response.status == 401) {
				alert('Mohon Maaf :(, Anda harus login')
			} else {
				alert("error! " + error.message);
			}
			this.uploadStatus = 'failed'
		}
	}
  }
}
</script>


<style lang="scss">
  .gray--background {
    background: #f5f5f5!important;
  }
  .whitebox {
    background: #fff;
    padding: 30px;
  }
  .v-dialog {
    z-index:10000;
  }
  .modalloading {
	  cursor: none!important;
	  opacity: .5;
  }
  .uploadtypechoice {
	  &.v-btn-toggle--group > .v-btn.v-btn {
		  border-radius: 4px;
		  background: #404040!important;
		  text-transform: capitalize!important;
	  }
	  .v-btn:not(.v-btn--text):not(.v-btn--outlined).v-btn--active {
		  background: transparent!important;
	  }
	  .v-btn:not(.v-btn--text):not(.v-btn--outlined).v-btn--active:before {
		  opacity: 0!important;
	  }
  }
</style>
