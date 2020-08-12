<template>
  <section class="tukarpoin-content">
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

    <v-skeleton-loader
      v-if="detail==''"
      class="mx-auto mt-5"
      type="list-item-avatar-three-line, image, article"
    ></v-skeleton-loader>

    <!-- DETAIL REWWARD -->
    <template v-if="detailtab">
      <div v-if="detail" class="py-7 px-3" style="background: #ff9800">
        <v-row align="center">
          <v-col cols="4">
            <img :src="detail.image" alt=""/>
          </v-col>
          <v-col cols="8" class="pr-4">
				<v-row no-gutters class="mx-0">
					<v-col cols="2" class="pr-2">
						<img
						src="/img/icons/poin-black.svg"
						alt
						class="mr-1 mt-1"
						style="vertical-align:top"
						/>
					</v-col>
					<v-col cols="10">
						<strong
						style="text-decoration:line-through"
						class="text-16 black--text"
						v-if="detail.discount > 0"
						>{{detail.point}} POIN</strong>
						<div :class="[detail.discount == 0 ? 'mb-1' : '']"></div>
						<strong class="text-20 black--text" style="line-height:1">{{detail.point - detail.discount}} Poin</strong>
					</v-col>
				</v-row>
				<div class="devider-small my-3" style="border-color:#000"></div>

				<div class="mb-2 text-20 black--text">{{detail.title}}</div>
			</v-col>
        </v-row>
      </div>
      <v-container>
		<v-row>
			<v-col>
				<v-row class="py-4">
					<v-col cols="3">
					<strong>Status</strong>
					<div class="caption"></div>
					</v-col>
					<v-col
					cols="9"
					class="text-right "
					>Tersedia hingga {{ [getTanggal(detail), 'YYYY-MM-DD'] | moment('DD MMM YYYY') }}</v-col>
				</v-row>
				<div class="devider-small"></div>
				<v-row class="py-4">
					<v-col cols="6">
					<strong>Poin Diperlukan</strong>
					</v-col>
					<v-col cols="6" class="text-right">
					<img
						src="/img/icons/poin-p.svg"
						alt
						width="20"
						class="mr-1"
						style="position:relative;top:5px;"
					/>
					<strong class="">{{detail.point}}</strong>
					</v-col>
				</v-row>
				<div class="devider-small"></div>
				<v-row class="py-4">
					<v-col cols="6">
					<strong>Sisa Hadiah</strong>
					</v-col>
					<v-col
					cols="6"
					class="text-right"
					>{{detail.stock ? detail.stock.remaining : '-'}} dari {{detail.stock ? detail.stock.qty : '-'}}</v-col>
				</v-row>
				<div class="devider-small"></div>
				<v-row class="py-4">
					<v-col cols="12">
						<v-expansion-panels v-model="panel" class="nocard">
							<v-expansion-panel>
							<v-expansion-panel-header>
								<div class="text-16 font-weight-bold">Deskripsi</div>
							</v-expansion-panel-header>
							<v-expansion-panel-content>
								<div v-html="detail.description" class="py-3 text-14"></div>
							</v-expansion-panel-content>
							</v-expansion-panel>
						</v-expansion-panels>

						<div class="devider-small mt-7"></div>
					</v-col>
					<v-col cols="12">
						<v-btn
							v-if="detail.stock"
							block
							dark
							depressed
							large
							color="deep-orange"
							:disabled="detail.stock.remaining == 0 || detail.expired ? true : false"
							:style="detail.stock.remaining == 0 ? 'background-color: grey !important;' : ''"
							@click="buyconfirm = !buyconfirm"
						>Tukarkan Poin</v-btn>
						<v-btn
							v-else
							block
							dark
							depressed
							large
							:disabled="detail.expired ? true : false"
							color="deep-orange"
							style="background-color: grey !important;"
							@click="buyconfirm = !buyconfirm"
						>Tukarkan Poin</v-btn>
					</v-col>
				</v-row>
			</v-col>
			<v-col cols="12">
				<v-img @click="$router.push('/toppoin')" src="https://cdn.pewefeed.com/containers/pewefeed/news/007268a8-761a-43c2-8849-517daba96017_1596515421.2159.png"></v-img>
			</v-col>
      	</v-row>
	  </v-container>
    </template>

    <!-- BUY CONFIRM -->
	<v-bottom-sheet v-model="buyconfirm">
		<v-sheet height="100%" color="transparent">
		<v-card style="border-radius: 0!important;">
			<v-toolbar :elevation="1" style="border-top: 2px solid #fff;">
				<v-row class="pa-0" align="center">
					<v-col cols="2">
						<v-btn
							dark
							icon
							tile
							style="border-right: 0px solid #717171"
							light
							@click="buyconfirm = false;"
						>
							<v-icon>mdi-close</v-icon>
						</v-btn>
					</v-col>
					<v-col cols="8" class="deep-orange--text text-center">
						Konfirmasi
					</v-col>
				</v-row>
			</v-toolbar>

			<div class="px-5 pt-10 text-center">
				Anda akan menukarkan koin sebanyak
				<div class="py-5 text-30" style="line-height:1">
				<img src="/img/poin.png" width="40" class="mr-3" style="vertical-align:middle" />
				<strong>{{detail.point}}</strong>
				</div>
				<br>
				<br>
				<br>

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
			</div>


			<v-overlay :value="overlay">
				<v-progress-circular indeterminate size="64"></v-progress-circular>
			</v-overlay>
		</v-card>
		</v-sheet>
	</v-bottom-sheet>

    <!-- HISTORY -->
    <template v-if="hitoritab">
      <v-container>
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
        <div class="py-10 caption grey--text text-center">Loading...</div>
      </template>
      <br />
      <br />
	  </v-container>
    </template>

    <!-- SYARAT -->
    <template v-if="syarattab">
      <!-- <div v-html="detail.term"></div> -->
      <section class="toppoin-acc" v-if="detail.term">
        <v-expansion-panels v-for="(item,index) in detail.term" :key="index">
          <v-expansion-panel class="mb-0">
            <v-expansion-panel-header class="py-5 text-uppercase">{{item.title}}</v-expansion-panel-header>
            <v-expansion-panel-content class="caption">
              <div v-html="item.content"></div>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </section>
    </template>
    <br />
    <br />

    <v-bottom-navigation
      fixed
      dark
      grow
      color="white"
      background-color="#2C2C2D"
      height="80"
      class="pwmenubottom"
      v-model="tptab"
    >
      <v-btn @click="detailtab=true;hitoritab=false;syarattab=false">
        <span class="text-13">Redeem</span>
        <img src="/img/tukarpoin/redeem-orange.png" class="mb-1 d-block" width="25" height="25" />
      </v-btn>
      <v-btn @click="detailtab=false;hitoritab=true;syarattab=false;fetchHistory()">
        <span class="text-13">Redeem History</span>
        <img src="/img/tukarpoin/redeemer-orange.png" class="mb-1 d-block" width="25" height="25" />
      </v-btn>
      <v-btn @click="detailtab=false;hitoritab=false;syarattab=true">
        <span class="text-13">How to</span>
        <img src="/img/tukarpoin/howto-orange.png" class="mb-1 d-block" width="25" height="25" />
      </v-btn>
      <ShareButton2 />
    </v-bottom-navigation>

    <LoginModal :dialogVisible="loginModalVisible" @close="myDialogClose" />
  </section>
</template>

<script>
import TukarPoinService from "@/services/TukarPoinService";
import UserService from "@/services/UserService";
import LoginModal from "@/components/modal/LoginModal";
import ShareButton2 from "@/components/common/ShareButton2";

export default {
  name: "RedeemDetail",
  components: {
    LoginModal,
    ShareButton2
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
      tptab: 0,
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
        // console.log(JSON.parse(JSON.stringify(res.data.data)));
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
            this.histories.push(element);
          });
          //this.histories.push(arr;
        }

        this.historyNext += 1;
        this.moreLoading = false;
        // console.log(JSON.parse(JSON.stringify(res.data.data)));
      } catch (error) {
        console.log(error);
      }
    },
    async tukarPoin() {
      var params = {
        redeem_id: this.detail.id
        // target_point: this.detail.point
      };
      this.overlay = true;
      this.pending = true;
      // console.log(params);
      try {
        const res = await UserService.tukarPoin(params);

        let vm = this;
        this.$auth.fetchUser().then(() => {
          localStorage.setItem("userdata", JSON.stringify(vm.$auth.user));
        });

        // console.log(res);
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
            "Maaf, Reward ini hanya dapat ditukar dengan POIN satu kali per hari.";
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
  .v-expansion-panel {
    background: transparent !important;
  }
  &.v-expansion-panels {
    background: transparent !important;
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
.tukarpoin-content p {
  font-size: 16px !important;
}
.nocard p:only-of-type {
	margin-bottom: 0;
}
</style>
