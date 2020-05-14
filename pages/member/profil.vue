<template>
  <v-container>
    <v-row align="center">
      <v-col cols="2" @click="$router.push('/member/pengaturan/profil');drawer = false">
        <v-avatar
          @click="$router.push('/member/pengaturan/profil');drawer = false"
          size="50"
          color="grey"
        >
          <v-img :src="userdata.avatar ? userdata.avatar : '/img/user.jpeg'" :aspect-ratio="1/1"></v-img>
        </v-avatar>
      </v-col>
      <v-col cols="10">
        <v-row>
          <v-col cols="9" @click="$router.push('/member/pengaturan/profil'); drawer = false">
            <strong class="subheading">{{ userdata.first_name }}</strong>
            <div>Pewe ID: {{userdata.id}}</div>
            <div
              class="text-12"
              :class="[userdata.status_expired == 1 ? 'green--text' : 'red--text']"
            >VIP {{userdata.status_expired == 1 ? 'Active' : 'Inactive'}} Until {{userdata.expire}}</div>
          </v-col>
          <v-col cols="3" class="text-right">
            <v-btn @click="logout(); drawer = false" icon dark depressed small>
              <v-icon>mdi-chevron-right</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <div class="devider-small full"></div>

    <!-- USER MENU -->
    <v-list dense color="#545353" class="mt-3 mb-10">
      <v-list-item-group color="dark" v-model="category">
        <template v-for="(item, i) in personmenu">
          <v-list-item :key="'persmenu-'+i" :to="item.to">
            <v-list-item-content>
              <v-list-item-title>
                {{item.name}}
                <template v-if="item.poin">
                  <br />
                  {{mypoint}}
                </template>
              </v-list-item-title>
            </v-list-item-content>
            <v-list-item-icon>
              <v-icon>mdi-chevron-right</v-icon>
            </v-list-item-icon>
          </v-list-item>
          <div :key="'dvdr-'+i" class="devider-small"></div>
        </template>
      </v-list-item-group>
    </v-list>
  </v-container>
</template>
<script>
import UserService from "@/services/UserService";
import "vue2-dropzone/dist/vue2Dropzone.min.css";
import BuyVip from "@/components/modal/BuyVip";

export default {
  middleware: 'auth',
  name: "pengaturanPage",
  data() {
    return {
      profile: null,
      token: null,
      avatar_preview: "",
      data: {
        avatar: "",
        first_name: "",
        last_name: "",
        username: "",
        email: "",
        msisdn: "",
        expire: "",
        instagram: "",
        no_telp: ""
      },
      userdata: [],
      mypoint: null,
      snackbar: false,
      dropOptions: {
        url: "https://s1.playworld.id/api/member/avatar",
        headers: {
          Authorization: "",
          "Cache-Control": ""
        },
        method: "POST",
        paramName: "avatar",
        withCredentials: false,
        thumbnailWidth: 100,
        thumbnailHeight: 100
      },
      isActive: false,
      expire_date: "",
      dialog: false,
      buyVipDialogVisible: false,
      personmenu: [
        {
          name: "Points History",
          to: "/member/histori_penggunaan_poin",
          poin: true
        },
        {
          name: "Purchase VIP Membership",
          to: "/purchase"
        },
        {
          name: "Rewards Status",
          to: "/member/barang_yang_didapat"
        },
        {
          name: "Address List for Rewards",
          to: "/member/pengaturan/daftar-alamat"
        },
        {
          name: "Phone List for Rewards",
          to: "/member/pengaturan/daftar-nomor"
        },
        {
          name: "Bank Transfer Status",
          to: "/member/status_transfer"
        },
        {
          name: "VIP Code from SMS",
          to: "/member/kode-pw"
        },
        {
          name: "Help Desk",
          to: "/bantuan"
        }
      ]
    };
  },
  components: {
    BuyVip
  },
  methods: {
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
      console.log(response.file_name);
      this.data.avatar = response.file_name;
      this.avatar_preview =
        "https://be2ad46f1850a93a8329-aa7428b954372836cd8898750ce2dd71.ssl.cf6.rackcdn.com/avatars/" +
        response.file_name;
    },
    fetchUserdata() {
      this.$auth.fetchUser()

      var res = []
      res.data = this.$auth.user
      this.setProfile(res);
      this.isLoggedIn = true;
      this.userdata = res.data.data;
      this.userdata = res.data.data;
      this.mypoint = res.data.point_total;
    },
    setProfile(res) {
      // console.log("setprof", res);
      this.user_id = res.data.data.id;
      this.profile = res.data.data;
      // console.log(JSON.parse(JSON.stringify(res.data.data)))
      this.dropOptions.headers.Authorization =
        "Bearer " + res.data.token;
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
    },
    async save() {
      let vm = this;
      var params = {
        first_name: this.data.first_name,
        username: this.data.username,
        last_name: this.data.last_name,
        no_telp: this.data.no_telp,
        instagram: this.data.instagram,
        avatar: this.data.avatar
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
    }
  },
  mounted() {
    this.$auth.fetchUser()
    var useres = this.$auth.user

    this.setProfile(useres);
    this.userdata = useres.data.data;
    this.mypoint = useres.data.point_total;
    this.isLoggedIn = true;
  }
};
</script>

<style lang="sass">
.v-item-group.v-bottom-navigation .v-btn .v-btn__content
	color: #fff
	opacity: 1
	.v-item-group.v-bottom-navigation .v-btn.v-btn--active .v-btn__content
		color: var(--primary)!important
</style>
