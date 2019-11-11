<template>
  <v-row justify="center">
    <v-dialog
      v-model="loginModal"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <v-card class="grey lighten-3">
        <!-- Header -->
        <v-toolbar light color="white">
          <!-- Arrow -->
          <v-btn icon tile style="border-right: 1px solid #717171" light @click="loginModal = false">
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
          class="mx-4"
        >
          <div>
            <Login />
          </div>
        </v-row>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
  import Login from "@/components/Login";
  export default {
    name:"NotVip",
    props: {
      dialogVisible: Boolean,
    },
    data () {
      return {
        dialog: false,
        loginModalVisible: false,
        lazy: 'https://vtcheckout-production-assets.s3.amazonaws.com/snap/logos/M003796/thumb_retina_snap_2Flogos_2FM003796_2F04571408-807d-4315-af80-df2dfbba9ce3_2FPlayworld.png',
        logo: 'https://vtcheckout-production-assets.s3.amazonaws.com/snap/logos/M003796/thumb_retina_snap_2Flogos_2FM003796_2F04571408-807d-4315-af80-df2dfbba9ce3_2FPlayworld.png',
      }
    },
    components: {
        Login
    },
    computed: {
      loginModal: {
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
        myDialogClose () {
            this.loginModalVisible = false
            // other code
        },
    }
  }
</script>