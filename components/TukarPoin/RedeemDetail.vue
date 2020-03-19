<template>
  <section>
    <!-- SNACKBAR SUKSES ATAU FAIL -->
    <v-snackbar v-model="snackbar" :multi-line="true" top>
      {{ tukarmsg }}
      <v-btn color="red" icon @click="snackbar = false">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-snackbar>
    <v-overlay :value="overlay">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>

    <div v-if="detail" class="py-10" style="background: #ff9800">
      <v-row align="center" no-gutters>
        <v-col cols="6">
          <v-img :src="detail.image" :aspect-ratio="1" contain></v-img>
        </v-col>
        <v-col cols="6">
          <div class="pr-4">
            <!-- TITLE -->
            <h2 class="ma-0">{{detail.title}}</h2>
          </div>
        </v-col>
      </v-row>
    </div>

    <v-skeleton-loader
      v-if="detail==''"
      class="mx-auto mt-5"
      type="list-item-avatar-three-line, image, article"
    ></v-skeleton-loader>

    <v-container v-else class="mb-5 pb-5">
      <!-- DETAIL REWWARD -->
      <template v-if="detailtab">
        <v-row>
          <v-col>
            <v-row>
              <v-col cols="3">
                <strong>Status</strong>
                <div class="caption"></div>
              </v-col>
              <v-col cols="9" class="text-right caption pr-0">
                <v-btn
                  small
                  text
                  color="deep-orange"
                >Tersedia hingga {{ [getTanggal(detail), 'YYYY-MM-DD'] | moment('DD MMM YYYY') }}</v-btn>
              </v-col>
            </v-row>
            <div class="devider-small"></div>
            <v-row>
              <v-col cols="6">
                <strong>Poin Diperlukan</strong>
              </v-col>
              <v-col cols="6" class="text-right pr-0">
                <v-btn text small color="deep-orange">
                  <img src="/img/poin.png" alt width="16" class="mr-1" />
                  <strong>{{detail.point}}</strong>
                </v-btn>
              </v-col>
            </v-row>
            <div class="devider-small"></div>
            <v-row>
              <v-col cols="6">
                <strong>Sisa Hadiah</strong>
              </v-col>
              <v-col cols="6" class="text-right pr-0">
                <v-btn
                  small
                  text
                  color="deep-orange"
                >{{detail.stock ? detail.stock.remaining : '-'}} dari {{detail.stock ? detail.stock.qty : '-'}}</v-btn>
              </v-col>
            </v-row>
            <div class="devider-small"></div>
            <v-row class="mt-2">
              <v-col cols="12">
                <v-expansion-panels v-model="panel" class="nocard">
                  <v-expansion-panel>
                    <v-expansion-panel-header>
                      <div class="text-16 font-weight-bold">Deskripsi</div>
                    </v-expansion-panel-header>
                    <v-expansion-panel-content>
                      <div v-html="detail.description" class="py-3"></div>
                    </v-expansion-panel-content>
                  </v-expansion-panel>
                </v-expansion-panels>
              </v-col>
              <v-col>
                <v-btn
                  block
                  dark
                  depressed
                  color="deep-orange"
                  tile
                  @click="buyconfirm = !buyconfirm"
                >Tukarkan Poin</v-btn>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </template>

      <!-- BUY CONFIRM -->
      <v-dialog
        v-model="buyconfirm"
        fullscreen
        hide-overlay
        class="LoginModal"
        transition="dialog-bottom-transition"
      >
        <v-card>
          <!-- Header -->
          <v-toolbar light color="white">
            <!-- Arrow -->
            <v-btn
              icon
              tile
              style="border-right: 1px solid #d1d1d1"
              light
              @click="buyconfirm = !buyconfirm"
            >
              <v-icon>mdi-close</v-icon>
            </v-btn>

            <!-- Logo -->
            <v-toolbar-title>
              <img src="/pl-logo.png" width="130" class="d-inline-block mt-3" />
            </v-toolbar-title>

            <!-- Title -->
            <div class="flex-grow-1"></div>
            <v-toolbar-items>
              <v-btn light text>Konfirmasi</v-btn>
            </v-toolbar-items>
          </v-toolbar>

          <v-container class="py-0">
            <v-row align="center" justify="center">
              <v-col cols="12" class="pb-0">
                <v-alert
                  border="left"
                  colored-border
                  type="info"
                  class="mb-0 mt-4"
                  style="border-top: 1px solid #2095F3; border-bottom: 1px solid #2095F3; border-right: 1px solid #2095F3;"
                >Anda akan menukarkan koin sebanyak</v-alert>

                <div class="text-center px-5 py-10 text-30" style="line-height:1">
                  <img src="/img/poin.png" width="40" class="mr-3" style="vertical-align:middle" />
                  <strong>{{detail.point}}</strong>
                </div>

                <v-btn
                  :loading="pending"
                  block
                  dark
                  depressed
                  color="deep-orange"
                  tile
                  x-large
                  class="tukaryuk"
                  @click="tukarPoin()"
                >LANJUTKAN</v-btn>
              </v-col>
            </v-row>
          </v-container>

          <v-container class="pa-0 LoginModal">
            <Login />
          </v-container>
        </v-card>
      </v-dialog>

      <!-- HISTORY -->
      <template v-if="hitoritab">
        <template v-if="histories && histories.length > 0">
          <div
            class="comment-item mb-2"
            v-for="(history, i) in histories"
            :key="history.id+'-'+i"
            :id="'history'+history.redeem_id"
          >
            <v-row>
              <v-col cols="2">
                <v-avatar size="30">
                  <img
                    :src="history.customer.avatar ? history.customer.avatar : '/img/user.jpeg'"
                    onerror="this.src='/img/user.jpeg';"
                  />
                </v-avatar>
              </v-col>
              <v-col cols="10">
                <strong>{{ history.customer.name }}</strong>
                <br />
                <div class="mt-2 caption text--gray">{{history.date}}</div>
              </v-col>
            </v-row>
          </div>
          <v-btn
            block
            dark
            depressed
            :loading="moreLoading"
            color="deep-orange"
            @click="moreHistory(historyNext)"
          >Load More</v-btn>
        </template>
        <template v-else>
          <div class="py-10 caption grey--text text-center">No data</div>
        </template>
        <br />
        <br />
      </template>

      <!-- SYARAT -->
      <template v-if="syarattab">
        <div v-html="detail.term"></div>
      </template>
    </v-container>
    <br />
    <br />

    <v-bottom-navigation fixed dark grow color="white" background-color="black">
      <v-btn @click="detailtab=true;hitoritab=false;syarattab=false">
        <span>
          Detail
          <br />Reward
        </span>
      </v-btn>
      <v-btn @click="detailtab=false;hitoritab=true;syarattab=false;fetchHistory()">
        <span>
          Histori
          <br />Penukaran
        </span>
      </v-btn>
      <v-btn @click="detailtab=false;hitoritab=false;syarattab=true">
        <span>
          Syarat &amp;
          <br />Ketentuan
        </span>
      </v-btn>
    </v-bottom-navigation>

    <LoginModal :dialogVisible="loginModalVisible" @close="myDialogClose" />
  </section>
</template>

<script>
import TukarPoinService from "@/services/TukarPoinService";
import UserService from "@/services/UserService";
import LoginModal from "@/components/modal/LoginModal";

export default {
  name: "RedeemDetail",
  components: {
    LoginModal
  },
  head() {
    return {
      title: this.title,
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        {
          hid: "description",
          name: "description",
          content: "My custom description"
        }
      ]
    };
  },
  data() {
    return {
      snackbar: false,
      tukarmsg: "",
      overlay: false,
      title: "",
      detail: "",
      detailtab: true,
      hitoritab: false,
      syarattab: false,
      histories: null,
      moreLoading: false,
      historyNext: 2,
      panel: 0,
      loginModalVisible: false,
      buyconfirm: false,
      pending: false
    };
  },
  methods: {
    async fetchDetail() {
      try {
        let res = await TukarPoinService.getRedeemDetail(
          this.$route.params.detail
        );
        this.detail = res.data.data;
        this.title = res.data.data.title;
        console.log(JSON.parse(JSON.stringify(res.data.data)));
      } catch (error) {
        console.log(error);
      }
    },
    async fetchHistory() {
      try {
        let res = await TukarPoinService.getRedeemHistory(
          this.$route.params.detail,
          1
        );
        this.histories = res.data.data;
        //console.log(JSON.parse(JSON.stringify(res.data.data)))
      } catch (error) {
        console.log(error);
      }
    },
    async moreHistory(n) {
      this.moreLoading = true;
      try {
        let res = await TukarPoinService.getRedeemHistory(
          this.$route.params.detail,
          2
        );
        var history = res.data.data;
        if (history && history.length > 0) {
          let arr = [];
          history.forEach(element => {
            arr.push(element);
          });
          this.histories = arr;
        }

        this.historyNext += 1;
        this.moreLoading = false;
        console.log(JSON.parse(JSON.stringify(res.data.data)));
      } catch (error) {
        console.log(error);
      }
    },
    async tukarPoin() {
      var params = {
        redeem_id: this.detail.id,
        target_point: this.detail.point
      };
      this.overlay = true;
      this.pending = true;
      console.log(params);
      try {
        const res = await UserService.tukarPoin(params);
        console.log(res);
        this.overlay = false;
        this.tukarmsg = "Tukar POIN telah berhasil dilakukan";
        this.snackbar = true;
        this.pending = false;
        this.buyconfirm = false;
      } catch (error) {
        console.log(error.response.status);
        this.overlay = false;
        if (error.response.status == 401) {
          //this.$router.push('/member/login')
          this.openModalLogin();
        } else if (error.response.status == 404) {
          alert("Poin Anda Tidak Cukup");
        } else if (error.response.status == 422) {
          this.tukarmsg =
            "Maaf, Reward ini hanya bisa ditukar dengan POIN satu kali per hari.";
          this.snackbar = true;
        } else {
          alert("An Error Ocured");
        }
        this.pending = false;
        this.buyconfirm = false;
      }
    },
    openModalLogin() {
      this.loginModalVisible = true;
    },
    myDialogClose() {
      this.dialog = false;
      this.loginModalVisible = false;
      this.buyVipDialogVisible = false;
      this.pleaseLoginDialogVisible = false;
      this.notVipDialogVisible = false;
      this.KomentarPoinVisible = false;
      // other code
    },
    getTanggal(detail) {
      var detailtanggal = detail.periode ? detail.periode.end_at : "";
      var tanggal = detailtanggal.replace("00:00:00", "");
      tanggal = tanggal.replace(" ", "");
      return tanggal;
    }
  },
  mounted() {
    this.fetchDetail();
  }
};
</script>

<style lang="scss">
.nocard {
  &.v-expansion-panels {
    background: transparent;
    box-shadow: none;
    .v-expansion-panel {
      &:before {
        display: none;
      }
    }
    button {
      padding: 0;
      min-height: inherit;
    }
    .v-expansion-panel-content__wrap {
      padding: 0;
    }
  }
}
.tukaryuk {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
}
</style>
