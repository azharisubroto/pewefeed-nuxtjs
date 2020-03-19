<template>
  <div>
    <v-dialog v-model="notVipVisible" fullscreen hide-overlay transition="dialog-bottom-transition">
      <v-card>
        <!-- Header -->
        <v-toolbar light color="white">
          <!-- Arrow -->
          <v-btn
            icon
            tile
            style="border-right: 1px solid #e5e5e5"
            light
            @click="notVipVisible = false"
          >
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

        <!-- <v-row
          align="center"
          justify="center"
        >
          <v-icon color="black" class="display-3" style="margin-top: 60px">mdi-information-outline</v-icon>
        </v-row>
        <v-row
          align="center"
          justify="center"
        >
          <p class="title mt-4">ANDA BUKAN ANGGOTA VIP</p>
        </v-row>-->

        <v-container>
          <v-alert
            border="left"
            dense
            colored-border
            type="info"
            style="border-top: 1px solid #2095F3; border-bottom: 1px solid #2095F3; border-right: 1px solid #2095F3;"
          >
            Fitur ini diperuntukkan hanya untuk user dengan keanggotaan VIP yang masih aktif.
            <br />
            <br />Untuk mengaktifkan keanggotaan VIP anda, tekan tombol di bawah ini
          </v-alert>

          <v-btn
            @click="buyVip()"
            dark
            block
            large
            color="deep-orange"
            class="text-capitalize"
          >Perpanjang Keanggotaan VIP</v-btn>
        </v-container>
      </v-card>
    </v-dialog>

    <BuyVip :dialogVisible="buyVipDialogVisible" @close="myDialogClose" />
  </div>
</template>
<script>
import BuyVip from "./BuyVip";
export default {
  name: "NotVip",
  props: {
    dialogVisible: Boolean
  },
  data() {
    return {
      dialog: false,
      buyVipDialogVisible: false,
      lazy:
        "https://vtcheckout-production-assets.s3.amazonaws.com/snap/logos/M003796/thumb_retina_snap_2Flogos_2FM003796_2F04571408-807d-4315-af80-df2dfbba9ce3_2FPlayworld.png",
      logo: "/pl-logo.png"
    };
  },
  components: {
    BuyVip
  },
  computed: {
    notVipVisible: {
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
      this.buyVipDialogVisible = false;
      // other code
    },
    buyVip() {
      // if not vip, show dialog
      this.notVipVisible = false;
      this.buyVipDialogVisible = true;
    }
  }
};
</script>
