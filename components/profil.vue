<template>
  <div class="profile-page" :class="[!login ? 'movetop' : '']">
    <div class="bg-profile" ref="profilebg" :style="'opacity:'+profleOpacity">
      <v-img src="/img/profil-bg.png"></v-img>
    </div>
    <template v-if="login && !loading">
      <div class="profile-space"></div>
      <v-stepper v-model="profileStep" style="background: transparent">
        <!-- PROFILE -->
        <v-stepper-content background="transparent" step="1" class="pa-0">
         <!-- <v-container class="pb-0">
            <v-row align="center" class="profile-bag pb-0">
              <v-col
                cols="3"
                @click="
                  $router.push('/member/pengaturan/');
                  drawer = false;c
                "
              >
                <v-avatar
                  @click="
                    $router.push('/member/pengaturan/profil');
                    drawer = false;
                  "
                  size="70"
                  color="grey"
                >
                  <v-img
                    :src="userdata.avatar ? userdata.avatar : '/img/user.jpeg'"
                    :aspect-ratio="1 / 1"
                  ></v-img>
                </v-avatar>
              </v-col>
              <v-col cols="9">
                <v-row align="center">
                  <v-col
                    cols="10"
                    class="pr-0"
                    @click="
                      $router.push('/member/pengaturan/');
                      drawer = false;
                    "
                  >
                    <strong class="subheading text-18">{{
                      userdata.first_name
                    }}</strong>
                    <div class="text-14">PEWE ID: {{ userdata.msisdn }}</div>
                    <v-btn
                      v-if="!usermentah.verified"
                      class="mt-2 text-10"
                      color="red"
                      dark
                      block
                      small
                      >Verify phone number (+100 POINT)</v-btn
                    >
                  </v-col>
                  <v-col cols="2" class="text-right">
                    <v-btn to="/member/pengaturan/" icon dark depressed small>
                      <v-icon>mdi-chevron-right</v-icon>
                    </v-btn>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-container> -->

          <!-- USER MENU -->
          <v-list color="transparent" class="mb-10 profile-menus">
            <v-list-item-group color="dark">
              <!-- WHATSAPP -->

              <v-list-item to="/member/pengaturan/" style="border: 2px solid red">
                <v-list-item-icon class="mr-5 align-self-center">
                  <v-img src="/img/icons/warning.svg"></v-img>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>
                    <strong>Aktifkan Notifikasi Whatsapp</strong>
                    <span class="d-block mt-3">Dapatkan +100 Poin</span>
                  </v-list-item-title>
                </v-list-item-content>
                <v-list-item-icon class="align-self-center">
                  <v-icon>mdi-chevron-right</v-icon>
                </v-list-item-icon>
              </v-list-item>

              <!-- PROFILE DETAIL -->
              <v-list-item to="/member/pengaturan/profil" color="#ff4200" style="background: #ff4200">
                <v-list-item-icon class="mr-5 align-self-center">
                  <v-avatar
                    @click="
                      $router.push('/member/pengaturan/profil');
                      drawer = false;
                    "
                    size="50"
                    color="grey"
                  >
                    <v-img
                      :src="userdata.avatar ? userdata.avatar : '/img/user.jpeg'"
                      :aspect-ratio="1 / 1"
                    ></v-img>
                  </v-avatar>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>
                    <strong class="text-uppercase">{{userdata.first_name + ' ' + userdata.last_name}}</strong>
                    <span class="d-block mt-3">PEWE ID: {{ userdata.msisdn }}</span>
                  </v-list-item-title>
                </v-list-item-content>
                <v-list-item-icon class="align-self-center">
                  <v-icon>mdi-chevron-right</v-icon>
                </v-list-item-icon>
              </v-list-item>
              
              <v-list-item to="/purchase/">
                <v-list-item-icon class="align-self-center mr-5">
                  <v-img src="/img/icons/vip.svg"></v-img>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>
                    <span>VIP Membership Status</span>
                    <span
                      class="d-block mt-3"
                      :class="[
                        userdata.status_expired == 1
                          ? 'green--text'
                          : 'red--text',
                      ]"
                      >VIP
                      {{
                        userdata.status_expired == 1 ? "Active" : "Inactive"
                      }}
                      Until {{ userdata.expire }}</span
                    >
                  </v-list-item-title>
                </v-list-item-content>
                <v-list-item-icon class="align-self-center">
                  <v-icon>mdi-chevron-right</v-icon>
                </v-list-item-icon>
              </v-list-item>

              
              <v-list-item to="/member/histori_penggunaan_poin">
                <v-list-item-icon class="align-self-center mr-5">
                  <v-img src="/img/icons/poin-new.svg"></v-img>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>
                    Total Poin Saya
                    <br />
                    <span class="text-20 mt-2 d-inline-block" style="color:#ff4200">
                      <strong>{{ mypoint | thousand }}</strong>
                    </span>
                  </v-list-item-title>
                </v-list-item-content>
                <v-list-item-icon class="align-self-center">
                  <v-icon>mdi-chevron-right</v-icon>
                </v-list-item-icon>
              </v-list-item>

              <template v-if="userdata.status_expired == 1">
                
                <v-list-item class="pt-3 pb-0 mb-0" to="/member/daily-limit" style="border-radius: 4px 4px 0 0">
                  <v-list-item-content class="py-0">
                    <v-list-item-title>
                      <span class="text-16 d-inline-block">
                        VIP Daily Limit:
                        <span class="green--text">{{ sekarang }}</span>
                        / {{ batas }}
                      </span>
                    </v-list-item-title>
                  </v-list-item-content>
                  <v-list-item-icon class="mb-0 mt-2">
                    <v-icon>mdi-chevron-right</v-icon>
                  </v-list-item-icon>
                </v-list-item>
                <v-list-item class="pt-0 mt-0" to="/member/daily-limit" style="border-radius: 0 0 4px 4px">
                  <v-list-item-content class="pt-0">
                    <v-list-item-title>
                      <v-progress-linear
                        :value="remaining"
                        :buffer-value="batas"
                        color="green"
                        height="20"
                        reactive
                        rounded
                      ></v-progress-linear>
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </template>

              <v-list-item to="/member/rewards-status/">
                <v-list-item-icon class="align-self-center mr-5">
                  <v-img src="/img/icons/rewards-saya.svg"></v-img>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>
                    Rewards saya
                  </v-list-item-title>
                </v-list-item-content>
                <v-list-item-icon class="align-self-center">
                  <v-icon>mdi-chevron-right</v-icon>
                </v-list-item-icon>
              </v-list-item>

              <v-list-item @click="$router.push('/bantuan')">
                <v-list-item-icon class="align-self-center mr-5">
                  <v-img src="/img/icons/help-new.svg"></v-img>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>
                    Bantuan
                  </v-list-item-title>
                </v-list-item-content>
                <v-list-item-icon class="align-self-center">
                  <v-icon>mdi-chevron-right</v-icon>
                </v-list-item-icon>
              </v-list-item>

              <v-list-item @click="logout()">
                <v-list-item-icon class="align-self-center mr-5">
                  <v-img src="/img/icons/logout.svg"></v-img>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>
                    Keluar
                  </v-list-item-title>
                </v-list-item-content>
                <v-list-item-icon class="align-self-center">
                  <v-icon>mdi-chevron-right</v-icon>
                </v-list-item-icon>
              </v-list-item>

              <!-- <v-list-item @click="$router.push('/bantuan')">
                <v-list-item-content>
                  <v-list-item-title> Bantuan </v-list-item-title>
                </v-list-item-content>
                <v-list-item-icon class="align-self-center">
                  <v-icon>mdi-chevron-right</v-icon>
                </v-list-item-icon>
              </v-list-item> -->
              
            </v-list-item-group>
          </v-list>
        </v-stepper-content>
        <v-stepper-content background="transparent" step="2" class="pa-0">
          <help />
        </v-stepper-content>
      </v-stepper>
    </template>
    <template v-else-if="loading && !login">
        <div class="text-center d-flex align-center justify-center" style="height:80vh">
          <v-progress-circular
            indeterminate
            :size="80"
            :width="8"
            color="green"
          >
          </v-progress-circular>
        </div>
    </template>
    <template v-else>
      <div class="profile-space"></div>
      <v-container>
        <v-card color="#404040" class="px-4 pt-4 mb-5" style="border-radius: 5px">
          <Login class="pt-0" />
        </v-card>

        <div class="text-center pewesocials">
          <v-btn href="https://www.facebook.com/pewefeeds" small color="#fff" light>
            <v-icon size="24">mdi-facebook</v-icon>
          </v-btn>
          <v-btn href="https://www.instagram.com/pewefeed/" small color="#fff" light>
            <v-icon>mdi-instagram</v-icon>
          </v-btn>
          <v-btn href="https://twitter.com/pewefeed" small color="#fff" light>
            <v-icon>mdi-twitter</v-icon>
          </v-btn>
          <v-btn href="https://www.youtube.com/channel/UCW7zo9pK4Vgd2xf68ayXlPw" small color="#fff" light>
            <v-icon>mdi-youtube</v-icon>
          </v-btn>
        </div>
      </v-container>
    </template>
  </div>
</template>
<script>
import UserService from "@/services/UserService";
import "vue2-dropzone/dist/vue2Dropzone.min.css";
import BuyVip from "@/components/modal/BuyVip";
import Login from "@/components/Login";
import help from "@/components/help";
import { mapState } from "vuex";

export default {
  middleware: "auth",
  name: "profil",
  data() {
    return {
      loading: true,
      profileStep: 1,
      profile: null,
      token: null,
      avatar_preview: "",
      login: false,
      data: {
        avatar: "",
        first_name: "",
        last_name: "",
        username: "",
        email: "",
        msisdn: "",
        expire: "",
        instagram: "",
        no_telp: "",
      },
      userdata: [],
      usermentah: [],
      mypoint: null,
      snackbar: false,
      dropOptions: {
        url: "https://s1.playworld.id/api/member/avatar",
        headers: {
          Authorization: "",
          "Cache-Control": "",
        },
        method: "POST",
        paramName: "avatar",
        withCredentials: false,
        thumbnailWidth: 100,
        thumbnailHeight: 100,
      },
      isActive: false,
      expire_date: "",
      dialog: false,
      buyVipDialogVisible: false,
      personmenu: [
        // {
        //   name: "Total Points",
        //   to: "/member/histori_penggunaan_poin",
        //   poin: true
        // },
        // {
        //   name: "VIP Membership",
        //   to: "/purchase"
        // },
        {
          name: "Rewards",
        },
        // {
        //   name: "Rewards Contact List",
        //   to: "/member/contact-list/"
        // },
        // {
        //   name: "Bank Payment Status",
        //   to: "/member/status_transfer"
        // },
        // {
        //   name: "VIP Code from SMS",
        //   to: "/member/kode-pw"
        // },
      ],
      batas: 0,
      sekarang: 0,
      remaining: 0,
      profleOpacity: 1,
      rewardsmenu: [
        {
          name: "Rewards Status",
          to: "/member/barang_yang_didapat/",
        },
        {
          name: "Phone List",
          to: "/member/pengaturan/daftar-nomor",
        },
        {
          name: "Address List",
          to: "/member/pengaturan/daftar-alamat",
        },
      ],
    };
  },
  computed: mapState(["storehelpStepRewards"]),
  watch: {
    profileStep(val) {
      this.$store.commit("SET_HELP_REWARDS", val);
    },
    storehelpStepRewards(newValue, oldValue) {
      this.profileStep = newValue;
    },
  },
  components: {
    BuyVip,
    Login,
    help,
  },
  filters: {
    thousand(value) {
      return `${value.toLocaleString()}`;
    },
  },
  methods: {
    logout() {
      let vm = this;
      localStorage.removeItem("loggedin");
      localStorage.removeItem("access-token");
      localStorage.removeItem("userdata");
      localStorage.removeItem("auth._token.local");
      localStorage.removeItem("auth.strategy");
      localStorage.removeItem("useres");
      this.isLoggedIn = false;
      //this.isLogin();
      // if (window.location.pathname == '/member/login') {
      // 	window.location.href = '/'
      // } else {
      // 	window.location.href = window.location.pathname
      // }
      this.$auth.logout();
      location.reload();
    },
    isLogin() {
      return this.isLoggedIn;
    },
    isUserdata() {
      return this.$auth.user;
    },
    removeAllFiles() {
      this.$refs.dropzone.removeAllFiles();
    },
    afterComplete(file, response) {
      //console.log(response.file_name);
      this.data.avatar = response.file_name;
      this.avatar_preview =
        "https://be2ad46f1850a93a8329-aa7428b954372836cd8898750ce2dd71.ssl.cf6.rackcdn.com/avatars/" +
        response.file_name;
    },
    fetchUserdata() {
      this.setProfile();
      this.isLoggedIn = true;
    },
    setProfile() {
      let vm = this;
      this.$auth
        .fetchUser()
        .then(() => {
          localStorage.setItem("userdata", JSON.stringify(vm.$auth.user));
          ////console.log('fetchuser', JSON.parse(JSON.stringify(vm.$auth.user)));

          var res = [];
          res.data = vm.$auth.user;

          this.usermentah = res.data;
          this.userdata = res.data.data;
          this.mypoint = res.data.point_total;
          this.profile = res.data.data;

          var limit = res.data.point_limit;
          limit = limit.split("/");
          this.sekarang = limit[0];
          this.batas = limit[1];
          this.remaining = this.percentage(limit[0], limit[1]);

          this.dropOptions.headers.Authorization = "Bearer " + res.data.token;
          this.avatar_preview = res.data.data.avatar;
          this.data.first_name = res.data.data.first_name;
          this.data.last_name = res.data.data.last_name;
          this.data.username = res.data.data.username;
          this.data.msisdn = res.data.data.msisdn;
          this.data.no_telp = res.data.data.no_telp;
          this.data.instagram = res.data.data.instagram;
          this.data.email = res.data.data.email;
          this.data.expire = res.data.data.expire;
          this.expire_date = this.data.expire;
          if (res.data.data.status_expired == 1) {
            this.isActive = true;
          }
          this.login = true;
          this.loading = false;
        })
        .catch(() => {
          this.loading = false;
        });
    },
    percentage(partialValue, totalValue) {
      return (100 * partialValue) / totalValue;
    },
    async save() {
      let vm = this;
      var params = {
        first_name: this.data.first_name,
        username: this.data.username,
        last_name: this.data.last_name,
        no_telp: this.data.no_telp,
        instagram: this.data.instagram,
        avatar: this.data.avatar,
      };
      try {
        const res = await UserService.updateProfile(params);
        vm.snackbar = true;
      } catch (error) {
        console.log(error);
      }
    },
    myDialogClose() {
      this.buyVipDialogVisible = false;
      // other code
    },
    buyVip() {
      // if not vip, show dialog
      this.notVipVisible = false;
      this.buyVipDialogVisible = true;
    },
    async dailypoint() {
      try {
        const res = await UserService.voucherDailyPoint();
        //console.log("daily", res.data.data);
      } catch (error) {
        console.log(error);
      }
    },
    handleScroll (e) {
      //let targetHeight = this.$refs.profilebg.clientHeight;
      let targetHeight = 200;
      let opacityFormula = (targetHeight - window.scrollY) / targetHeight;
      this.profleOpacity = opacityFormula;
    }
  },
  mounted() {
    this.setProfile();
    this.dailypoint();
    this.isLoggedIn = true;

    this.$bus.$on("profilestep", () => {
      this.profileStep = 2;
    });
  },
  created () {
    window.addEventListener('scroll', this.handleScroll);
  },
  destroyed () {
    window.removeEventListener('scroll', this.handleScroll);
  },
};
</script>

<style lang="sass">
.v-item-group.v-bottom-navigation .v-btn .v-btn__content
  color: #fff
  opacity: 1
  .v-item-group.v-bottom-navigation .v-btn.v-btn--active .v-btn__content
    color: var(--primary)!important
</style>

<style lang="scss">
.profile-bag {
  background: transparent;
  color: #fff;
  border-top: 0 !important;
  border-bottom: 0 solid transparent !important;
}
.profile-page {
  .v-progress-linear {
    border-radius: 90px !important;
    overflow: hidden;
  }
}
.rewardhelpback {
  position: absolute;
  top: 0;
  left: 0;
}

.profile-space {
  width: 100%;
  padding-bottom: 36%;
}

.bg-profile {
  position: fixed;
  top: 56px;
  left: 0;
  right: 0;
  margin: 0 auto;
  z-index: 0;
  img {
    width: 100%;
    height: auto;
  }
}

.profile-menus {
  .v-list-item {
    border-radius: 4px;
    background: #404040;
    overflow: hidden;
    margin: 10px;
  }
}
.pewesocials {
  .v-btn {
    padding: 0!important;
    min-width: unset!important;
    width: 30px!important;
    height: 30px!important;
    line-height: 30px!important;
    border-radius: 8px!important;
    margin: 0 5px!important;
    display: inline-block!important;

    .v-btn__content {
      line-height: 29px;
      display: block;
    }
    .v-icon {
      font-size: 20px;
    }
  }
}

.movetop {
  margin-top: -56px;
  .bg-profile {
    top: 0;
    z-index: 11;
  }
  .container {
    position: relative;
    z-index: 12
  }
}
</style>
