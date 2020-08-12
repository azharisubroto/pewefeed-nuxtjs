<template>
  <!-- MODAL -->
  <v-bottom-sheet v-model="intDialogVisible">
    <v-sheet height="100%" color="transparent">
      <v-card style="border-radius: 0!important;">
        <v-toolbar :elevation="1" style="border-top:2px solid #fff;">
          <!-- Arrow -->
          <v-btn dark icon tile style="border-right: 0px solid #717171" light @click="closeIt()">
            <v-icon>mdi-close</v-icon>
          </v-btn>

          <!-- Title -->
          <div class="flex-grow-1"></div>
          <v-toolbar-items>
            <v-btn dark text class="deep-orange--text">Welcome Back! (+10 Poin)</v-btn>
          </v-toolbar-items>
          <div class="flex-grow-1"></div>
        </v-toolbar>

        <div class="px-4 pt-10 text-center">
          <v-img src="/img/poinextra.png" max-width="60" class="mx-auto"></v-img>
          <div class="mt-5 mb-0 text-14">
            Terima kasih sudah mengunjungi kembali pewefeed.com, untuk itu kamu mendapat 10 Poin Extra. Klaim Sekarang!
          </div>
        </div>

        <v-card-actions class="pb-10">
          <v-spacer></v-spacer>
          <v-btn
            color="deep-orange"
			block
            class="font-weight-bold"
            @click="$router.push('/member/histori_penggunaan_poin'); closeIt()"
          >Klaim Poin</v-btn>
		  <br><br><br>
          <v-spacer></v-spacer>
        </v-card-actions>
        <v-overlay :value="overlay">
          <v-progress-circular indeterminate size="64"></v-progress-circular>
        </v-overlay>
      </v-card>
    </v-sheet>
  </v-bottom-sheet>
</template>

<script>
import UserService from "../../services/UserService";
export default {
  name: "drawerwelcome",
  props: {
    dialogVisible: Boolean
  },
  data() {
    return {
      overlay: false
    };
  },
  computed: {
    /* Init Modal */
    intDialogVisible: {
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
    async claim() {
      this.overlay = true;
      try {
        const res = await UserService.claimDailyPoint();
        this.overlay = false;
        if (res.status == 201) {
          var href = process.env.mobileUrl + "member/histori_penggunaan_poin";
          window.location.href = href;
          this.closeIt();
        }
      } catch (error) {
        this.overlay = false;
        console.log(error);
      }
    },
    closeIt() {
      this.$emit("close");
    }
  }
};
</script>
