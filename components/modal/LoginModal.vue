<template>
  <v-bottom-sheet v-model="loginModal">
    <v-sheet height="100%">
      <v-toolbar :elevation="1" style="border-top: 2px solid #fff">
        <!-- Arrow -->
        <v-btn
          dark
          icon
          tile
          style="border-right: 0px solid #717171"
          light
          @click="loginModal = false;"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>

        <!-- Title -->
        <div class="flex-grow-1"></div>
        <v-toolbar-items>
          <v-btn dark text class="deep-orange--text pl-0" style="margin-left:-10px;">Login Required</v-btn>
        </v-toolbar-items>
        <div class="flex-grow-1"></div>
      </v-toolbar>

      <div class="mx-2">
        <v-container class="text-center">
          Untuk dapat menggunakan fitur ini, anda diharuskan untuk Login atau Registrasi terlebih dahulu.
          <br />
          <br />Klik tombol di bawah ini untuk melanjutkan
          <Login :redirect="currenturl"/>
        </v-container>
      </div>
    </v-sheet>
  </v-bottom-sheet>
</template>
<script>
import Login from "@/components/Login";
export default {
  name: "LoginModal",
  props: {
    dialogVisible: Boolean,
    redirect: String
  },
  data() {
    return {
      dialog: false,
      loginModalVisible: false,
      lazy:
        "https://vtcheckout-production-assets.s3.amazonaws.com/snap/logos/M003796/thumb_retina_snap_2Flogos_2FM003796_2F04571408-807d-4315-af80-df2dfbba9ce3_2FPlayworld.png",
      logo: "/pl-logo.png",
      currenturl: this.redirect,
    };
  },
  components: {
    Login,
  },
  computed: {
    loginModal: {
      get: function () {
        if (this.dialogVisible) {
          // Some dialog initialization code could be placed here
          // because it is called only when this.dialogVisible changes
          this.$emit("open");
        }

        return this.dialogVisible;
      },
      set: function (value) {
        if (!value) {
          this.$emit("close");
        }
      },
    },
  },
  methods: {
    myDialogClose() {
      this.loginModalVisible = false;
      // other code
    },
  },
};
</script>

<style lang="scss">
.LoginModal #loginhead {
  display: none !important;
}
</style>
