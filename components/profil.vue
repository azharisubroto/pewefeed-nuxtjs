<template>
  <div class="profile-page">
	  <template v-if="login">
		<v-container class="pb-0">
			<v-row align="center" class="profile-bag pb-0">
				<v-col cols="3" @click="$router.push('/member/pengaturan/');drawer = false">
					<v-avatar
						@click="$router.push('/member/pengaturan/profil');drawer = false"
						size="70"
						color="grey"
					>
						<v-img :src="userdata.avatar ? userdata.avatar : '/img/user.jpeg'" :aspect-ratio="1/1"></v-img>
					</v-avatar>
				</v-col>
				<v-col cols="9">
					<v-row align="center">
						<v-col cols="10" class="pr-0" @click="$router.push('/member/pengaturan/'); drawer = false">
							<strong class="subheading text-18">{{ userdata.first_name }}</strong>
							<div class="text-14">PEWE ID: {{userdata.msisdn}}</div>
							<v-btn v-if="!usermentah.verified" class="mt-2 text-10" color="red" dark block small>Verify phone number (+100 POINT)</v-btn>
						</v-col>
						<v-col cols="2" class="text-right">
							<v-btn to="/member/pengaturan/" icon dark depressed small>
								<v-icon>mdi-chevron-right</v-icon>
							</v-btn>
						</v-col>
					</v-row>
				</v-col>
			</v-row>
		</v-container>

		<!-- USER MENU -->
		<v-list color="transparent" class="mb-10">
		<v-list-item-group color="dark">

			<!-- VIP MEMBERSHIP STATUS -->
			<div  class="devider-small"></div>
			<v-list-item class="py-3" to="/purchase/">
				<v-list-item-content>
					<v-list-item-title>
						<span>
							VIP Membership Status
						</span>
						<span class="d-block mt-3"
							:class="[userdata.status_expired == 1 ? 'green--text' : 'red--text']"
						>VIP {{userdata.status_expired == 1 ? 'Active' : 'Inactive'}} Until {{userdata.expire}}</span>
					</v-list-item-title>
				</v-list-item-content>
				<v-list-item-icon>
					<v-icon>mdi-chevron-right</v-icon>
				</v-list-item-icon>
			</v-list-item>

			<div  class="devider-small"></div>
			<v-list-item class="py-3" to="/member/histori_penggunaan_poin">
				<v-list-item-content>
					<v-list-item-title>
						Total Points
						<br />
						<span class="text-20 mt-2 d-inline-block">
							<strong>{{mypoint | thousand}}</strong>
						</span>
					</v-list-item-title>
				</v-list-item-content>
				<v-list-item-icon>
					<v-icon>mdi-chevron-right</v-icon>
				</v-list-item-icon>
			</v-list-item>

			<template v-if="userdata.status_expired == 1">
				<div  class="devider-small"></div>
				<v-list-item class="pt-3 pb-0" to="/member/daily-limit">
					<v-list-item-content class="py-0">
						<v-list-item-title>
							<span class="text-16 d-inline-block">
								VIP Daily Limit: <span class="green--text">{{sekarang}}</span> / {{batas}}
							</span>
						</v-list-item-title>
					</v-list-item-content>
					<v-list-item-icon class="mb-0 mt-2">
						<v-icon>mdi-chevron-right</v-icon>
					</v-list-item-icon>
				</v-list-item>
				<v-list-item class="pt-0" to="/member/daily-limit">
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

			<template v-for="(item, i) in personmenu">
				<div v-if="i==0" :key="'dvdri-'+i" class="devider-small"></div>
				<v-list-item class="py-3" :key="'persmenu-'+i" :to="item.to">
					<v-list-item-content>
					<v-list-item-title>
						{{item.name}}
						<template v-if="item.poin">
						<br />
						<span class="text-20 mt-2 d-inline-block">
							<strong>{{mypoint | thousand}}</strong>
						</span>
						</template>
					</v-list-item-title>
					</v-list-item-content>
					<v-list-item-icon>
					<v-icon>mdi-chevron-right</v-icon>
					</v-list-item-icon>
				</v-list-item>
				<div :key="'dvdr-'+i" class="devider-small"></div>
			</template>
			<v-list-item class="py-3" @click="logout()">
			<v-list-item-content>
				<v-list-item-title class="red--text"><strong>Sign Out</strong></v-list-item-title>
			</v-list-item-content>
			<v-list-item-icon>
				<v-icon>mdi-chevron-right</v-icon>
			</v-list-item-icon>
			</v-list-item>
			<div class="devider-small"></div>
		</v-list-item-group>
		</v-list>
	  </template>
	  <template v-else>
		  <Login class="pt-10"/>
		</template>
  </div>
</template>
<script>
import UserService from "@/services/UserService";
import "vue2-dropzone/dist/vue2Dropzone.min.css";
import BuyVip from "@/components/modal/BuyVip";
import Login from "@/components/Login";

export default {
  middleware: "auth",
  name: "profil",
  data() {
    return {
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
        no_telp: ""
      },
      userdata: [],
      usermentah: [],
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
          to: "/member/barang_yang_didapat"
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
	  batas:0,
	  sekarang: 0,
	  remaining: 0,
    };
  },
  components: {
	BuyVip,
	Login
  },
  filters: {
    thousand (value) {
      return `${value.toLocaleString()}`
    }
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
      location.reload()
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
      console.log(response.file_name);
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
      let vm = this
      this.$auth.fetchUser().then(() => {
        localStorage.setItem("userdata", JSON.stringify(vm.$auth.user));
      });
      // this.$auth.fetchUser();
      if( localStorage.getItem('userdata') ) {
        var res = [];
        res.data = JSON.parse(localStorage.getItem('userdata'));

        this.usermentah = res.data;
        this.userdata = res.data.data;
        this.mypoint = res.data.point_total;
		this.profile = res.data.data;

		var limit = res.data.point_limit
		limit = limit.split('/');
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
        this.login = true
      }
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
	},
	async dailypoint() {
		try {
			const res = await UserService.voucherDailyPoint();
			console.log('daily',res.data.data);
		} catch (error) {
			console.log(error)
		}
	}
  },
  mounted() {
	this.setProfile();
	this.dailypoint();
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

<style lang="scss">
.profile-bag {
  background: transparent;
  color: #fff;
  border-top: 0!important;
  border-bottom: 0 solid transparent!important;
}
.profile-page {
	.v-progress-linear {
		border-radius: 90px!important;
		overflow: hidden;
	}
}
</style>
