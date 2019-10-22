<template>
  <v-row justify="center">
    <v-dialog
      v-model="pleaseLoginVisible"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <v-card class="grey lighten-3">
        <!-- Header -->
        <v-toolbar light color="white">
          <!-- Arrow -->
          <v-btn icon tile style="border-right: 1px solid #717171" light @click="pleaseLoginVisible = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>

          <!-- Logo -->
          <v-toolbar-title>
            <v-img
              :src="logo"
              :lazy-src="lazy"
              max-width="40"
              max-height="40"
            >  
            </v-img>
          </v-toolbar-title>

          <!-- Title -->
          <div class="flex-grow-1"></div>
          <v-toolbar-items>
            <v-btn light text>Information</v-btn>
          </v-toolbar-items>
        </v-toolbar>

        <v-row
          align="center"
          justify="center"
        >
          <v-icon color="black" class="display-3" style="margin-top: 60px">mdi-information-outline</v-icon>
        </v-row>
        <v-row
          align="center"
          justify="center"
        >
          <p class="title mt-4">ANDA BELUM LOGIN</p>
        </v-row>
        <v-row
          align="center"
          justify="center"
          class="mx-4"
        >
          <p class="subtitle-1 text-center">Silahkan klik tombol LOGIN dibawah ini untuk bisa mengikuti program ini</p>
        </v-row>
        <v-row
          align="center"
          justify="center"
          class="mx-4"
        >
          <div>
            <v-btn
              @click="$router.push( '/member/login' )"
              dark
              color="deep-orange"
            >
              Login
            </v-btn>
          </div>
        </v-row>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
  export default {
    name:"PleaseLogin",
    props: {
      dialogVisible: Boolean,
    },
    data () {
      return {
        dialog: false,
        lazy: 'https://vtcheckout-production-assets.s3.amazonaws.com/snap/logos/M003796/thumb_retina_snap_2Flogos_2FM003796_2F04571408-807d-4315-af80-df2dfbba9ce3_2FPlayworld.png',
        logo: 'https://vtcheckout-production-assets.s3.amazonaws.com/snap/logos/M003796/thumb_retina_snap_2Flogos_2FM003796_2F04571408-807d-4315-af80-df2dfbba9ce3_2FPlayworld.png',
      }
    },
    computed: {
      pleaseLoginVisible: {
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
    }
  }
</script>