<template>
  <v-dialog
    v-model="loginModal"
    fullscreen
    hide-overlay
    class="LoginModal"
    transition="dialog-bottom-transition"
  >
    <v-card>
      <!-- Header -->
      <v-toolbar light color="white">
        <!-- Arrow -->
        <v-btn icon tile style="border-right: 1px solid #d1d1d1" light @click="loginModal = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>

        <!-- Logo -->
        <v-toolbar-title>
          <img :src="logo" width="130" class="d-inline-block mt-3" />
        </v-toolbar-title>

        <!-- Title -->
        <div class="flex-grow-1"></div>
        <v-toolbar-items>
          <v-btn light text>Information</v-btn>
        </v-toolbar-items>
      </v-toolbar>

      <v-container class="py-0">
        <v-row align="center" justify="center">
          <v-col cols="12" class="pb-0">
            <v-alert
              border="left"
              dense
              colored-border
              type="info"
              class="mb-0"
              style="border-top: 1px solid #2095F3; border-bottom: 1px solid #2095F3; border-right: 1px solid #2095F3;"
            >
              Untuk dapat menggunakan fitur ini, anda diharuskan untuk Login atau Registrasi terlebih dahulu.
              <br />
              <br />Klik tombol di bawah ini untuk melanjutkan
            </v-alert>
          </v-col>
        </v-row>
      </v-container>

      <v-container class="pa-0 LoginModal">
        <Login />
      </v-container>
    </v-card>
  </v-dialog>
</template>
<script>
import Login from "@/components/Login";
export default {
  name: "LoginModal",
  props: {
    dialogVisible: Boolean
  },
  data() {
    return {
      dialog: false,
      loginModalVisible: false,
      lazy:
        "https://vtcheckout-production-assets.s3.amazonaws.com/snap/logos/M003796/thumb_retina_snap_2Flogos_2FM003796_2F04571408-807d-4315-af80-df2dfbba9ce3_2FPlayworld.png",
      logo: "/pl-logo.png"
    };
  },
  components: {
    Login
  },
  computed: {
    loginModal: {
      get: function() {
        if (this.dialogVisible) {
          // Some dialog initialization code could be placed here
          // because it is called only when this.dialogVisible changes
          this.$emit("open");
        }

        return this.dialogVisible;
      },
      set: function(value) {
        if (!value) {
          this.$emit("close");
        }
      }
    }
  },
  methods: {
    myDialogClose() {
      this.loginModalVisible = false;
      // other code
    }
  }
};
</script>

<style lang="scss">
.LoginModal #loginhead {
  display: none !important;
}
</style>
