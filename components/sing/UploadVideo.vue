<template>
  	<v-bottom-sheet v-model="intDialogVisible">
      <v-sheet height="100%">
        <v-toolbar :elevation="1">
          <!-- Arrow -->
          <v-btn
            dark
            icon
            tile
            style="border-right: 0px solid #717171"
            light
            @click="intDialogVisible = false;"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>

          <!-- Title -->
          <div class="flex-grow-1"></div>
          <v-toolbar-items>
            <v-btn dark text class="deep-orange--text pl-0 text-uppercase" style="margin-left:-10px;">Upload Video Kamu</v-btn>
          </v-toolbar-items>
          <div class="flex-grow-1"></div>
        </v-toolbar>

        <div class="mx-2">
          <v-container class="text-center">
			<template v-if="uploadStatus == 'start'">
				<v-alert
					outlined
					type="warning"
					color="white"
					prominent
					border="left"
					class="text-12 text-left"
					>
						Pastikan video sudah kamu upload ke FEED Instagram kamu. Dan pastikan akun instagram kamu tidak digembok.
				</v-alert>

				<v-text-field
					label="tempelkan URL video dari feed instagram kamu di sini"
					solo
				></v-text-field>

				<v-btn color="deep-orange" dark block large @click="uploadStatus='success'">UPLOAD</v-btn>
			</template>

			<template v-if="uploadStatus == 'success'">

				<div class="py-8 text-center">
					<img src="/img/checklist.png" width="50">
				</div>

				<v-btn color="deep-orange" dark block large @click="uploadStatus='success'">Lihat jumlah vote</v-btn>
			</template>
		  </v-container>
        </div>
      </v-sheet>
    </v-bottom-sheet>
</template>

<script>
export default {
  name: "UploadVideo",
  props: {
	dialogVisible: Boolean,
	punyaaku: Array
  },
  data() {
    return{
		logo: 'https://vtcheckout-production-assets.s3.amazonaws.com/snap/logos/M003796/thumb_retina_snap_2Flogos_2FM003796_2F04571408-807d-4315-af80-df2dfbba9ce3_2FPlayworld.png',
		uploadStatus: 'start',
    }
  },
  watch: {
	  uploadStatus: function(newval, oldval) {
		  if( newval == 'success' ) {
			  	var datapunyaku = {
					name: 'Anak Gaul',
					avatar: 'https://via.placeholder.com/80',
					video_thumb: 'https://via.placeholder.com/350x250',
					vote: 0,
					comments: 0,
					star: false,
				}
				this.$bus.$emit('datapunyaku', datapunyaku)
		  }
	  }
  },
  computed: {
    /* Init Modal */
    intDialogVisible: {
      get: function () {
        if (this.dialogVisible) {
          // Some dialog initialization code could be placed here
          // because it is called only when this.dialogVisible changes
          this.$emit('open');
        }

        return this.dialogVisible
      },
      set: function (value) {
        if (!value) {
          this.$emit('close')
        }
      }
    },
    notVipVisible: {
      get: function () {
        if (this.dialogVisible) {
          // Some dialog initialization code could be placed here
          // because it is called only when this.dialogVisible changes
          this.$emit('open');
        }

        return this.dialogVisible
      },
      set: function (value) {
        if (!value) {
          this.$emit('close')
        }
      }
    }
  },
  methods: {
    closeIt() {
      this.$emit('close')
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
</style>
